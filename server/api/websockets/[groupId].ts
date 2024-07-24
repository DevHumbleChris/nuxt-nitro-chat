import type { Peer, Message } from "crossws";
import { getQuery, encodeParam } from "ufo";
import prisma from "~/lib/prisma";
import { SentSocketMessage, SocketMessage } from "~/types";

const users = new Map<string, { online: boolean }>();

let room = "group";
export default defineWebSocketHandler({
  async open(peer) {
    const groupId = getGroupId(peer);
    room = groupId;

    const group = await getGroupInfo(groupId);

    const profileId = getProfile(peer);
    const profile = await getProfileInfo(profileId);

    users.set(profileId, { online: true });
    const stats = getStats();

    console.log("opened WS", groupId, profileId);

    peer.send({
      user: {
        name: "Server",
        imgUrl: "/images/bot.png",
        profileId: "bot-server",
      },
      message: {
        id: new Date().getTime(),
        content: `Welcome to ${group?.name} Group! (Online users: ${stats.online}/${stats.total})`,
        createdAt: new Date().toLocaleString(),
        fileUrl: "",
        deleted: false,
      },
    });

    // peer.subscribe("chat");
    peer.subscribe(room);
    // peer.publish(room, "Another user joined the chat");
    peer.publish(room, {
      user: {
        name: "Server",
        imgUrl: "/images/bot.png",
        profileId: "bot-server",
      },
      message: {
        id: new Date().getTime(),
        content: `${profile?.name} joined!`,
        createdAt: new Date().toLocaleString(),
        fileUrl: "",
        deleted: false,
      },
    });
  },
  close(peer) {
    console.log("closed WS", peer);
  },
  error(peer, error) {
    console.log("error on WS", peer, error);
  },
  async message(peer, message) {
    console.log("message on WS", peer, message);

    const groupId = getGroupId(peer);

    const profileId = getProfile(peer);
    const profile = await getProfileInfo(profileId);

    const group = await prisma.group.findFirst({
      where: {
        id: groupId,
        members: {
          some: {
            profileId: profile?.id,
          },
        },
      },
      include: {
        members: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    let _message: SocketMessage;

    if (message.text() === "ping") {
      _message = {
        user: {
          name: "Server",
          imgUrl: "/images/bot.png",
          profileId: "bot-server",
        },
        message: {
          id: `${new Date().getTime()}`,
          content: "pong",
          createdAt: new Date(),
          fileUrl: "",
          imageUrl: "",
          deleted: false,
        },
      };
      peer.send(_message);
      peer.publish(room, _message);

      return;
    }

    const sentMessage = JSON.parse(message.text()) as SentSocketMessage;

    if (sentMessage.image.url) {
      await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          medias: {
            create: [
              {
                imageUrl: sentMessage.image.url,
                name: sentMessage.image.name,
                size: sentMessage.image.size,
              },
            ],
          },
        },
      });
    }

    if (sentMessage.file.url) {
      await prisma.group.update({
        where: {
          id: groupId,
        },
        data: {
          files: {
            create: [
              {
                fileUrl: sentMessage.file.url,
                name: sentMessage.file.name,
                size: sentMessage.file.size,
              },
            ],
          },
        },
      });
    }

    const member = group?.members.find(
      (member) => member.profileId === profile?.id
    );

    const newMessage = await prisma.message.create({
      data: {
        content: sentMessage.content,
        memberId: member?.id as string,
        groupId,
        imageUrl: sentMessage.image.url,
        fileUrl: sentMessage.file.url,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    _message = {
      user: {
        name: profile?.name as string,
        imgUrl: profile?.imageUrl as string,
        profileId: profile?.id as string,
      },
      message: {
        id: newMessage.id,
        content: newMessage.content,
        createdAt: newMessage.createdAt,
        deleted: newMessage.deleted,
        fileUrl: newMessage.fileUrl,
        imageUrl: newMessage.imageUrl,
      },
    };

    peer.send(_message); // echo back
    peer.publish(room, _message);
  },
});

async function getGroupInfo(groupId: string) {
  return await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });
}

function getProfile(peer: Peer) {
  const query = getQuery(peer.url);
  return query.profileId as string;
}

async function getProfileInfo(profileId: string) {
  const profile = await prisma.profile.findUnique({
    where: {
      id: profileId,
    },
  });
  return profile;
}

function getGroupId(peer: Peer) {
  const pathParts = peer.url.split("/");
  const groupdId = pathParts[3].split("?")[0];
  return groupdId;
}

function getStats() {
  const online = Array.from(users.values()).filter((u) => u.online).length;
  return { online, total: users.size };
}
