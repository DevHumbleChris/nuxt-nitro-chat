<script setup lang="ts">
import { Button } from "~/components/ui/button";
import type { SelectedImage } from "~/types";

const props = defineProps<{
  selectedImage: SelectedImage;
  onClearSelectedImages: () => void;
  formatBytes: (size: string, decimals?: number) => string;
}>();
</script>

<template>
  <div v-if="selectedImage?.name" class="px-2 py-1 flex justify-between">
    <div class="flex gap-2 w-full">
      <div class="aspect-square h-16 relative group">
        <NuxtImg
          :src="props?.selectedImage.imageUrl"
          class="w-full h-full object-cover rounded-md group-hover:opacity-45 group-hover:grayscale border-2 cursor-pointer"
          :alt="props?.selectedImage.name"
        />
      </div>
      <div class="text-xs">
        <p>Name: {{ selectedImage?.name }}</p>
        <p>Size: {{ formatBytes(selectedImage?.size!, 2) }}</p>
      </div>
    </div>
    <Button
      @click="props?.onClearSelectedImages"
      size="icon"
      variant="ghost"
      class="hover:bg-transparent text-muted-foreground self-start -mt-2"
    >
      <Icon name="solar:close-circle-broken" class="size-5" />
    </Button>
  </div>
</template>
