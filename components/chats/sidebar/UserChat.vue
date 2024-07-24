<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message } from "@prisma/client";
import type { GroupWithMessages } from "~/types";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";

const props = defineProps<{
  group: GroupWithMessages;
}>();

const group = computed(() => {
  return props?.group;
});

const getLastMessage = (messages: Message[]) => {
  return messages[0] ? messages[0].content : "";
};
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div
        class="flex gap-2 text-sm hover:bg-[#fff2f0] p-2 rounded-md cursor-pointer"
      >
        <Avatar>
          <AvatarImage :src="group.imageUrl" :alt="group.name" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div>
            <h4 class="font-bold">{{ group.name }}</h4>
          </div>
          <p class="text-xs truncate w-[90%]">
            {{ getLastMessage(group.messages) }}
          </p>
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem class="gap-2">
        <Icon name="solar:pin-outline" />
        Pin to top
      </ContextMenuItem>
      <ContextMenuItem class="gap-2">
        <Icon name="solar:users-group-two-rounded-broken" />
        View group
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
