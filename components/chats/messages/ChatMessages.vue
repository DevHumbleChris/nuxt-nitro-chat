<script setup lang="ts">
import type { SocketMessage } from "~/types";
import ChatItem from "./ChatItem.vue";

const props = defineProps<{
  socketMessages: SocketMessage[];
  profileId: string | undefined;
}>();

const socketMessages = computed(() => {
  return props?.socketMessages;
});

const bottomRef = ref<HTMLDivElement | null>(null);

watch(props?.socketMessages, () => {
  setTimeout(() => {
    bottomRef.value?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
});

onMounted(() => {
  setTimeout(() => {
    bottomRef.value?.scrollIntoView({
      behavior: "smooth",
    });
  }, 100);
});
</script>

<template>
  <div
    class="flex-1 flex flex-col py-4 overflow-y-auto [&::-webkit-scrollbar]:w-[0.2rem] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-background"
  >
    <ChatItem
      v-if="socketMessages"
      v-for="(socket, index) in socketMessages"
      :key="index"
      :socket="socket"
      :profileId="props?.profileId"
    />
    <div ref="bottomRef" />
  </div>
</template>
