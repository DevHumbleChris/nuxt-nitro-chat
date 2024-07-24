<script setup lang="ts">
import { Label } from "~/components/ui/label";
import type { SelectedImage } from "~/types";

const props = defineProps<{
  uploadImage: (e: Event) => void;
  selectedImage: SelectedImage | null;
  isUploadingImage: boolean;
  isUploadingFile: boolean;
}>();
</script>

<template>
  <div>
    <Label
      for="imageUrl"
      class="rounded-full hover:bg-transparent text-muted-foreground block hover:text-inherit"
      :disabled="
        (props?.selectedImage ? true : false) ||
        props?.isUploadingImage ||
        props?.isUploadingFile
      "
      :class="
        props?.selectedImage ||
        props?.isUploadingImage ||
        props?.isUploadingFile
          ? 'cursor-not-allowed'
          : 'cursor-pointer'
      "
    >
      <Icon name="solar:album-outline" class="size-6" />
    </Label>
    <input
      id="imageUrl"
      name="imageUrl"
      type="file"
      class="sr-only"
      accept="image/*"
      @change="props?.uploadImage"
      :disabled="
        (props?.selectedImage ? true : false) ||
        props?.isUploadingImage ||
        props?.isUploadingFile
      "
    />
  </div>
</template>
