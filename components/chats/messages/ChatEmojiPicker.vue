<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

const props = defineProps<{
  setMessageWithEmoji: (emoji: string) => void;
}>();

const selectedEmoji = ref();

const onSelectEmoji = (emoji: any) => {
  selectedEmoji.value = emoji.i;
  props?.setMessageWithEmoji(selectedEmoji.value);
};
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <Button
        variant="ghost"
        size="icon"
        class="rounded-full text-muted-foreground"
      >
        <Icon name="solar:emoji-funny-circle-linear" class="size-6" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="">
      <NuxtEmojiPicker
        :hide-search="false"
        theme="light"
        @select="onSelectEmoji"
      />
    </PopoverContent>
  </Popover>
</template>
