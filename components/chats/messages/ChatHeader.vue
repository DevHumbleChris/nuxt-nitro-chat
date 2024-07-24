<script setup lang="ts">
import type { WebSocketStatus } from "@vueuse/core";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import type { GroupInfo } from "~/types";

const props = defineProps<{
  group: GroupInfo;
  status: WebSocketStatus;
}>();

const status = computed(() => {
  return props?.status;
});
</script>

<template>
  <div class="p-3 border-b flex items-center justify-between bg-white">
    <div class="flex gap-3">
      <Avatar class="size-12">
        <AvatarImage :src="props?.group?.imageUrl!" :alt="props?.group?.name" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <p class="text-lg font-bold">{{ props?.group?.name }}</p>
        <div class="text-sm flex items-center gap-2">
          <p class="text-muted-foreground">
            {{
              props?.group?.members.length! > 1
                ? `${props?.group?.members.length} Members`
                : `${props?.group?.members.length} Member`
            }}
          </p>
          <div class="size-1 bg-muted-foreground rounded-full"></div>
          <Badge
            :class="
              cn(
                status === 'OPEN'
                  ? 'bg-emerald-600 hover:bg-emerald-400'
                  : 'bg-rose-600 hover:bg-rose-400',
                'px-4 py-0 text-xs cursor-pointer'
              )
            "
            >{{ status === "OPEN" ? "LIVE" : status }}</Badge
          >
        </div>
      </div>
    </div>
    <div class="flex gap-2 items-center">
      <Button variant="ghost" size="icon" class="rounded-full">
        <Icon name="solar:videocamera-add-outline" class="size-6" />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-full">
        <Icon name="solar:phone-rounded-linear" class="size-6" />
      </Button>
      <Button variant="ghost" size="icon" class="rounded-full">
        <Icon name="solar:menu-dots-circle-broken" class="size-6" />
      </Button>
    </div>
  </div>
</template>
