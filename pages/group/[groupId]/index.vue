<script setup lang="ts">
import ChatInfo from "~/components/chats/ChatInfo.vue";
import GroupChatWrapper from "~/components/chats/group/GroupChatWrapper.client.vue";
import type { GroupInfo } from "~/types";

definePageMeta({
  layout: "chat",
});

const { params } = useRoute();
const { data: authdata } = useAuth();

const email = computed(() => {
  if (authdata.value) {
    return authdata.value.user?.email as string;
  }
  return "";
});

const { data, error } = await useFetch(`/api/group/${params.groupId}/info`);

const group = computed(() => {
  const groupData = data.value as any;
  return groupData ? (groupData as GroupInfo) : null;
});
</script>

<template>
  <section class="w-full flex">
    <GroupChatWrapper :group="group" :email="email" />
    <ChatInfo :group="group" />
  </section>
</template>
