<script setup lang="ts">
import type { GroupInfo, SocketMessage } from "~/types";
import ChatHeader from "../messages/ChatHeader.vue";
import ChatMessages from "../messages/ChatMessages.vue";
import ChatInput from "../messages/ChatInput.vue";
import type { Profile } from "@prisma/client";

const props = defineProps<{
  group: GroupInfo;
  email: string;
}>();

const { data: profileData } = await useFetch(`/api/profile/${props?.email}`, {
  method: "get",
});

const profile = computed(() => {
  const dataProfile = profileData.value as any;
  return dataProfile ? (dataProfile as Profile) : null;
});

const { status, data, send, open, close } = useWebSocket(
  `ws://localhost:3000/api/websockets/${props?.group?.id}?profileId=${profile?.value?.id}`
);

const messages = useState<SocketMessage[]>(() => []);

watch(data, (newValue: any) => {
  console.log("Received WebSocket data:", newValue);
  if (newValue && typeof newValue === "string") {
    try {
      const parsedValue = JSON.parse(newValue);
      console.log("Parsed WebSocket data:", parsedValue);
      if (parsedValue.user && parsedValue.message) {
        messages.value.push(parsedValue);
      } else {
        console.warn(
          "Parsed data is missing required properties:",
          parsedValue
        );
      }
    } catch (e) {
      console.error("Failed to parse WebSocket data:", e);
    }
  } else {
    console.warn("Received data is not a string:", newValue);
  }
});

if (messages.value.length <= 0) {
  const { data: groupData } = useFetch(
    `/api/group/${props?.group?.id}/messages`
  );
  const groupMessageData = groupData.value as any;
  const allMessages: SocketMessage[] = groupMessageData?.messages.map(
    (message: any) => {
      return {
        user: {
          name: message.member.profile.name,
          imgUrl: message.member.profile.imageUrl,
          profileId: message.member.profile.id,
        },
        message: {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          fileUrl: message.fileUrl,
          deleted: message.deleted,
          imageUrl: message.imageUrl,
        },
      };
    }
  );
  messages.value = allMessages;
}
</script>

<template>
  <div class="w-full flex-col h-screen flex bg-[#f8ede2]">
    <ChatHeader :group="props?.group" :status="status" />
    <ChatMessages
      :socketMessages="messages"
      :id="group?.id as string"
      :profileId="profile?.id"
    />
    <ChatInput :send="send" />
  </div>
</template>
