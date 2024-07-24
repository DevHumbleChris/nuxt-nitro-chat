<script setup lang="ts">
import { MessagesSquareIcon, PinIcon } from "lucide-vue-next";
import ScrollArea from "~/components/ui/scroll-area/ScrollArea.vue";
import UserChat from "./UserChat.vue";
import type { GroupWithMessages } from "~/types";

const props = defineProps<{
  email: string;
}>();

const { data: groupsData, status } = await useFetch(
  `/api/group/all/${props?.email}`
);

const groups = computed(() => {
  const dataGroups = groupsData.value as any as GroupWithMessages[];
  return dataGroups;
});
</script>

<template>
  <ScrollArea class="h-screen">
    <LazyChatsSkeletonChat v-if="status === 'pending'" />
    <div v-else>
      <div class="space-y-1">
        <h3 class="text-sm text-zinc-600 font-medium flex items-center gap-1">
          <Icon name="solar:pin-outline" class="size-4 shrink-0" />
          Pinned Groups
        </h3>
        <div class="space-y-2">
          <!-- <UserChat />
          <UserChat />
          <UserChat /> -->
        </div>
      </div>
      <div class="mt-3 space-y-1">
        <h3 class="text-sm text-zinc-600 font-medium flex items-center gap-1">
          <Icon
            name="solar:users-group-two-rounded-broken"
            class="size-4 shrink-0"
          />
          All Groups
        </h3>
        <div class="space-y-2">
          <UserChat v-for="group in groups" :key="group.id" :group="group" />
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
