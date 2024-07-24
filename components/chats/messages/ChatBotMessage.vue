<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { SocketMessage } from "~/types";

const props = defineProps<{
  socket: SocketMessage;
  profileId: string | undefined;
}>();

const socket = computed(() => {
  return props?.socket;
});

const profileId = computed(() => {
  return props?.profileId;
});
</script>

<template>
  <div class="grid">
    <div class="flex gap-2.5">
      <Avatar>
        <AvatarImage :src="socket.user.imgUrl" :alt="socket.user.name" />
        <AvatarFallback>{{ socket.user.name }}</AvatarFallback>
      </Avatar>
      <div class="grid md:w-[20rem]">
        <div class="flex items-center gap-3">
          <h5
            class="text-gray-900 dark:text-white text-sm font-semibold leading-snug pb-1 flex items-center capitalize"
          >
            Bot {{ socket.user.name }}
          </h5>
          <p class="text-gray-500 dark:text-zinc-200 text-xs">
            {{ useTimeAgo(socket.message.createdAt) }}
          </p>
        </div>
        <div class="w-full max-w-xs grid">
          <div class="relative">
            <div
              class="px-3.5 py-2 bg-white dark:bg-background dark:border-gray-300 dark:border rounded-3xl rounded-tl-none flex flex-col gap-2"
            >
              <p class="font-normal text-sm">
                {{ socket.message.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
