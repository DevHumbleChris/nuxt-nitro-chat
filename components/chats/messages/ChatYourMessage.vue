<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import { Button } from "~/components/ui/button";
import { downloadContent, getFileExtension } from "~/lib/utils";
import type { SocketMessage } from "~/types";

const props = defineProps<{
  socket: SocketMessage;
}>();

const socket = computed(() => {
  return props?.socket;
});
</script>

<template>
  <div class="flex gap-2.5">
    <div class="grid md:w-[20rem]">
      <div class="flex items-center justify-end gap-3">
        <h5
          class="text-gray-900 dark:text-white text-sm font-semibold leading-snug pb-1 flex items-center"
        >
          You
        </h5>
        <p class="text-gray-500 dark:text-zinc-200 text-xs">
          {{ useTimeAgo(socket.message.createdAt) }}
        </p>
      </div>
      <div class="w-full max-w-xs grid">
        <div
          class="px-3.5 py-2 bg-white dark:bg-background dark:border-gray-300 dark:border rounded-3xl rounded-tl-none flex flex-col gap-2"
        >
          <div
            v-if="socket.message.fileUrl"
            class="flex justify-between items-center bg-secondary dark:bg-transparent pl-2 pr-1 py-1 rounded-lg group"
          >
            <div class="flex gap-2">
              <Icon
                name="solar:notification-unread-lines-linear"
                class="size-8"
              />
              <div class="text-xs">
                <p>
                  File type:
                  <span class="font-bold">{{
                    getFileExtension(socket.message.fileUrl)
                  }}</span>
                </p>
              </div>
            </div>
            <Button
              @click="
                downloadContent({
                  name: `${socket.user.name}-file-${getFileExtension(
                    socket.message.fileUrl
                  )}`,
                  url: socket.message.fileUrl,
                })
              "
              variant="ghost"
              size="icon"
            >
              <Icon
                name="solar:download-minimalistic-bold"
                class="size-5 group-hover:animate-bounce"
              />
            </Button>
          </div>
          <div
            v-if="socket.message.imageUrl"
            class="relative aspect-square rounded-md mt-2 overflow-hidden flex items-center bg-secondary dark:bg-transparent dark:border-0 w-full h-auto"
          >
            <NuxtImg
              :src="socket.message.imageUrl"
              :alt="socket.message.imageUrl"
              class="object-cover rounded-md w-full"
            />
          </div>
          <p v-if="socket.message.content" class="font-normal text-sm">
            {{ socket.message.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
