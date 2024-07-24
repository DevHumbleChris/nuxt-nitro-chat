<script setup lang="ts">
import type { GroupInfo } from "~/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Media } from "@prisma/client";
import { computed } from "vue";
import { downloadContent, formatBytes, shortenFileName } from "~/lib/utils";

const props = defineProps<{
  group: GroupInfo;
}>();

const limitedMedias = computed(() => {
  return props.group?.medias.slice(0, 3) || [];
});

const limitedFiles = computed(() => {
  return props.group?.files.slice(0, 2) || [];
});
</script>

<template>
  <aside
    class="w-[20rem] sticky top-0 h-screen border space-y-3 overflow-hidden flex-shrink-0 hidden lg:block"
  >
    <div class="p-3 border-b">
      <h2 class="font-bold text-sm">Group Info</h2>
    </div>
    <div
      class="flex flex-col items-center justify-center space-y-1 py-3 border-b"
    >
      <Avatar class="size-20">
        <AvatarImage :src="props?.group?.imageUrl!" :alt="props?.group?.name" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="text-center">
        <h4 class="font-bold">{{ props?.group?.name }}</h4>
        <p class="text-sm text-muted-foreground">
          {{
            props?.group?.members.length! > 1
              ? `${props?.group?.members.length} Members`
              : `${props?.group?.members.length} Member`
          }}
        </p>
      </div>
    </div>
    <div class="px-3 border-b pb-4">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <Icon name="solar:chat-round-line-linear" />
          <p class="text-sm font-semibold">Description</p>
        </div>
        <p class="text-xs">
          {{ props?.group?.bio }}
        </p>
      </div>
    </div>
    <div class="px-3 border-b pb-5">
      <div>
        <div class="flex items-center">
          <div class="flex items-center gap-2">
            <Icon name="solar:video-frame-play-horizontal-broken" />
            <p class="text-sm font-semibold">Media</p>
          </div>
          <Button variant="link" class="ml-auto text-xs">View All</Button>
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="media in limitedMedias"
            :key="media.id"
            class="aspect-square rounded-md relative group"
          >
            <NuxtImg
              :src="media.imageUrl"
              class="w-full h-full object-cover rounded-md group-hover:opacity-45 group-hover:grayscale"
              :alt="media.name"
            />
            <Button
              @click="
                downloadContent({
                  name: media.name,
                  url: media.imageUrl,
                })
              "
              variant="ghost"
              size="icon"
              class="ml-auto hidden group-hover:block absolute top-1 right-0 hover:bg-transparent"
            >
              <Icon
                name="solar:download-minimalistic-bold"
                class="size-5 group-hover:animate-bounce"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
    <div class="px-3 pb-4 sapce-y-2">
      <div class="flex items-center">
        <div class="flex items-center gap-2">
          <Icon name="solar:notification-unread-lines-linear" />
          <p class="text-sm font-semibold">Files</p>
        </div>
        <Button variant="link" class="ml-auto text-xs">View All</Button>
      </div>
      <div class="space-y-2">
        <div
          v-for="file in limitedFiles"
          class="flex items-center gap-3 group border px-2 py-1 rounded-md bg-secondary"
        >
          <Icon name="solar:notification-unread-lines-linear" class="size-8" />
          <div>
            <p class="text-xs font-bold">{{ shortenFileName(file.name) }}</p>
            <div class="text-xs text-muted-foreground flex items-center gap-1">
              <p>{{ formatBytes(file.size) }}</p>
              <div class="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <p>{{ useTimeAgo(file.createdAt) }}</p>
            </div>
          </div>
          <Button
            @click="
              downloadContent({
                name: file.name,
                url: file.fileUrl,
              })
            "
            variant="ghost"
            size="icon"
            class="ml-auto"
          >
            <Icon
              name="solar:download-minimalistic-bold"
              class="size-5 group-hover:animate-bounce"
            />
          </Button>
        </div>
      </div>
    </div>
  </aside>
</template>
