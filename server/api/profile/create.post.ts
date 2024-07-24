import { getServerSession } from "#auth";
import prisma from "~/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const {
    email,
    imageUrl,
    name,
  }: { name: string; email: string; imageUrl: string } = await readBody(event);

  const session = await getServerSession(event);

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: "name is required!",
    });
  }

  if (!imageUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "imageUrl is required!",
    });
  }

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: "email is required!",
    });
  }

  // Check for an existing profile
  let profile = await prisma.profile.findUnique({
    where: {
      email,
    },
    include: {
      groups: true,
    },
  });

  // If profile exists, ensure they are part of a group
  if (profile) {
    const existingGroup = await prisma.group.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (existingGroup) {
      return existingGroup;
    }

    // If no group found for existing profile, add to the first available group
    const availableGroup = await prisma.group.findFirst();
    if (availableGroup) {
      await prisma.group.update({
        where: {
          id: availableGroup.id,
        },
        data: {
          members: {
            create: [{ profileId: profile.id, role: MemberRole.GUEST }],
          },
        },
      });
      return availableGroup;
    }
  } else {
    // Create a new profile
    profile = await prisma.profile.create({
      data: {
        email,
        imageUrl,
        name,
      },
      include: {
        groups: true,
      },
    });
  }

  // Check for an available group or create a new group
  let group = await prisma.group.findFirst();
  if (!group) {
    group = await prisma.group.create({
      data: {
        name: "Nuxt Nitro Chat",
        imageUrl: "https://nuxt.com/assets/design-kit/icon-green.svg",
        bio: "Welcome to Nuxt Nitro Chat! 🚀 This Nuxt app uses experimental web sockets for real-time group chat in Nuxt.js. 💬✨",
        inviteCode: uuidv4(),
        profileId: profile?.id as string,
        members: {
          create: [
            { profileId: profile?.id as string, role: MemberRole.ADMIN },
          ],
        },
      },
    });
  } else {
    // Add the new profile to the existing group
    await prisma.group.update({
      where: {
        id: group.id,
      },
      data: {
        members: {
          create: [
            { profileId: profile?.id as string, role: MemberRole.GUEST },
          ],
        },
      },
    });
  }
  return group;
});
