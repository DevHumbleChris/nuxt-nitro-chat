<script setup lang="ts">
import { Label } from "~/components/ui/label";
import type { SelectedImage } from "~/types";

const props = defineProps<{
  selectedImage: SelectedImage | null;
  isUploadingImage: boolean;
  uploadFile: (e: Event) => void;
  isUploadingFile: boolean;
}>();
</script>

<template>
  <div>
    <Label
      :disabled="
        (props?.selectedImage ? true : false) ||
        props?.isUploadingImage ||
        props?.isUploadingFile
      "
      for="fileUrl"
      class="rounded-full hover:bg-transparent text-muted-foreground block hover:text-inherit"
      :class="
        props?.selectedImage ||
        props?.isUploadingImage ||
        props?.isUploadingFile
          ? 'cursor-not-allowed'
          : 'cursor-pointer'
      "
    >
      <Icon name="solar:file-send-linear" class="size-6" />
    </Label>
    <input
      id="fileUrl"
      name="imageUrl"
      type="file"
      class="sr-only"
      accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, .xlsx, .xls, .doc, .docx, .zip"
      :disabled="
        (props?.selectedImage ? true : false) ||
        props?.isUploadingImage ||
        props?.isUploadingFile
      "
      @change="props?.uploadFile"
    />
  </div>
</template>
