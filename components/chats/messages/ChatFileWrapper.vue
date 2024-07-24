<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { formatBytes } from "~/lib/utils";
import type { SelectedFile } from "~/types";

const props = defineProps<{
  selectedFile: SelectedFile;
  onClearSelectedFile: () => void;
}>();
</script>

<template>
  <div v-if="selectedFile?.name" class="px-2 py-1 flex justify-between">
    <div class="flex gap-2 w-full">
      <Icon name="solar:notification-unread-lines-linear" class="size-8" />
      <div class="text-xs">
        <p>Name: {{ selectedFile?.name }}</p>
        <p>Size: {{ formatBytes(selectedFile?.size!, 2) }}</p>
      </div>
    </div>
    <Button
      @click="props?.onClearSelectedFile"
      size="icon"
      variant="ghost"
      class="hover:bg-transparent text-muted-foreground self-start -mt-2"
    >
      <Icon name="solar:close-circle-broken" class="size-5" />
    </Button>
  </div>
</template>
