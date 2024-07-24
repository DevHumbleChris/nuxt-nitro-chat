<script setup lang="ts">
import { MessagesSquareIcon, PinIcon } from "lucide-vue-next";
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
import UserChat from "./UserChat.vue";

const props = defineProps<{
  email: string;
}>();

const { data } = await useFetch(`/api/group/all/${props?.email}`);
</script>

<template>
  <ScrollArea class="h-screen">
    <div class="space-y-1">
      <h3 class="text-sm text-zinc-600 font-medium flex items-center gap-1">
        <Icon name="solar:pin-outline" class="size-4 shrink-0" />
        Pinned Messages
      </h3>
      <div class="space-y-2">
        <!-- <UserChat />
        <UserChat />
        <UserChat /> -->
      </div>
    </div>
    <div class="mt-3 space-y-1">
      <h3 class="text-sm text-zinc-600 font-medium flex items-center gap-1">
        <Icon name="solar:chat-round-dots-outline" class="size-4 shrink-0" />
        All Messages
      </h3>
      <div class="space-y-2">
        <!-- <UserChat />
        <UserChat /> -->
      </div>
    </div>
  </ScrollArea>
</template>
