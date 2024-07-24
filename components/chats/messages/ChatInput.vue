<script setup lang="ts">
import { toast } from "vue-sonner";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import ChatEmojiPicker from "./ChatEmojiPicker.vue";
import ChatImageUpload from "./ChatImageUpload.vue";
import ChatFileUpload from "./ChatFileUpload.vue";
import ChatImageWrapper from "./ChatImageWrapper.vue";
import { cn, formatBytes } from "~/lib/utils";
import type {
  SelectedFile,
  SelectedImage,
  SentSocketMessage,
  SocketMessage,
} from "~/types";
import ChatFileWrapper from "./ChatFileWrapper.vue";

const props = defineProps<{
  send: (data: string | ArrayBuffer | Blob, useBuffer?: boolean) => boolean;
}>();

const message = ref("");
const selectedImage = ref<SelectedImage | null>(null);
const selectedFile = ref<SelectedFile | null>(null);

const setMessageWithEmoji = (emoji: string) => {
  message.value += emoji;
};

const isUploadingImage = ref(false);
const isUploadingFile = ref(false);

const onClearSelectedImages = () => {
  selectedImage.value = null;
};

const onClearSelectedFile = () => {
  selectedFile.value = null;
};

const sendMessage = async () => {
  if (!message.value && !selectedImage.value && !selectedFile.value) {
    return toast("Message is required!");
  }

  const socketMessage: SentSocketMessage = {
    content: message.value,
    file: {
      size: "",
      url: "",
      name: "",
    },
    image: {
      size: "",
      url: "",
      name: "",
    },
  };

  if (selectedImage.value?.imageUrl) {
    socketMessage.image.url = selectedImage.value.imageUrl;
    socketMessage.image.name = selectedImage.value.name;
    socketMessage.image.size = selectedImage.value.size;
  }

  if (selectedFile.value?.fileUrl) {
    socketMessage.file.url = selectedFile.value.fileUrl;
    socketMessage.file.name = selectedFile.value.name;
    socketMessage.file.size = selectedFile.value.size;
  }

  props?.send(JSON.stringify(socketMessage));
  message.value = "";
  onClearSelectedImages();
  onClearSelectedFile();
  await refreshNuxtData();
};

const uploadImageToCloudinary = async (result: string) => {
  isUploadingImage.value = true;
  toast("Uploading image, kindly wait!", {
    position: "top-right",
  });

  const { data, error } = await useFetch("/api/image/upload", {
    method: "POST",
    body: {
      image: result,
    },
  });

  if (error.value) {
    console.log(error.value.statusMessage);
    isUploadingImage.value = false;
    onClearSelectedImages();
    return toast(error.value.statusMessage!);
  }

  selectedImage.value = {
    ...selectedImage.value!,
    imageUrl: data.value?.url!,
    size: `${data.value?.size}`,
  };

  isUploadingImage.value = false;
};

const uploadFileToCloudinary = async (result: string) => {
  isUploadingFile.value = true;
  toast("Uploading File, kindly wait!", {
    position: "top-right",
  });

  const { data, error } = await useFetch("/api/file/upload", {
    method: "POST",
    body: {
      image: result,
      name: selectedFile.value?.name,
    },
  });

  if (error.value) {
    console.log(error.value.statusMessage);
    isUploadingFile.value = false;
    onClearSelectedFile();
    return toast(error.value.statusMessage!);
  }

  selectedFile.value = {
    ...selectedFile.value!,
    fileUrl: data.value?.url!,
    size: `${data.value?.size}`,
  };

  isUploadingFile.value = false;
};

const uploadImage = (e: Event) => {
  const reader = new FileReader();
  if (e.target instanceof HTMLInputElement && e.target.files) {
    selectedImage.value = {
      ...selectedImage.value!,
      name: e.target.files[0].name,
      size: `${e.target.files[0].size}`,
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  reader.onload = async (readerEvent: ProgressEvent<FileReader>) => {
    const result = readerEvent.target?.result as string | null;
    await uploadImageToCloudinary(result!);
  };
};

const uploadFile = (e: Event) => {
  const reader = new FileReader();
  if (e.target instanceof HTMLInputElement && e.target.files) {
    selectedFile.value = {
      ...selectedFile.value!,
      name: e.target.files[0].name,
      size: `${e.target.files[0].size}`,
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  reader.onload = async (readerEvent: ProgressEvent<FileReader>) => {
    const result = readerEvent.target?.result as string | null;
    await uploadFileToCloudinary(result!);
  };
};
</script>

<template>
  <div class="px-3 py-2 backdrop-blur-sm">
    <div class="flex items-center justify-between gap-2">
      <div
        :class="
          cn(
            'bg-white p-1 w-full',
            selectedImage || isUploadingImage || isUploadingFile || selectedFile
              ? 'rounded-xl'
              : 'rounded-full'
          )
        "
      >
        <div v-if="isUploadingImage" class="px-2 py-1 flex gap-3">
          <div
            class="aspect-square h-16 relative group bg-slate-200 animate-pulse rounded-md"
          />
          <div class="text-xs">
            <p>Name: {{ selectedImage?.name }}</p>
            <p>Size: {{ formatBytes(selectedImage?.size!, 2) }}</p>
          </div>
        </div>
        <div v-if="isUploadingFile" class="px-2 py-1 flex gap-3">
          <div
            class="aspect-square h-16 relative group bg-slate-200 animate-pulse rounded-md"
          />
          <div class="text-xs">
            <p>Name: {{ selectedFile?.name }}</p>
            <p>Size: {{ formatBytes(selectedFile?.size!, 2) }}</p>
          </div>
        </div>
        <ChatImageWrapper
          v-if="!isUploadingImage"
          :selectedImage="selectedImage!"
          :onClearSelectedImages="onClearSelectedImages"
          :formatBytes="formatBytes"
        />
        <ChatFileWrapper
          v-if="!isUploadingFile"
          :selectedFile="selectedFile!"
          :onClearSelectedFile="onClearSelectedFile"
        />
        <div class="flex items-center justify-between">
          <ChatEmojiPicker :setMessageWithEmoji="setMessageWithEmoji" />
          <Input
            placeholder="Type message to send..."
            class="border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            autofocus
            v-model="message"
            @keyup.enter="sendMessage"
            :disabled="isUploadingImage || isUploadingFile"
          />
          <div class="flex items-center gap-2 mr-2">
            <ChatFileUpload
              :selectedImage="selectedImage"
              :isUploadingImage="isUploadingImage"
              :uploadFile="uploadFile"
              :isUploadingFile="isUploadingFile"
            />
            <ChatImageUpload
              :uploadImage="uploadImage"
              :selectedImage="selectedImage"
              :isUploadingImage="isUploadingImage"
              :isUploadingFile="isUploadingFile"
            />
          </div>
        </div>
      </div>
      <Button
        @click="sendMessage"
        variant="ghost"
        size="icon"
        :disabled="isUploadingImage"
        class="rounded-full bg-[#d26050] text-white shrink-0 self-end"
      >
        <Icon name="solar:plain-2-broken" class="size-4" />
      </Button>
    </div>
  </div>
</template>
