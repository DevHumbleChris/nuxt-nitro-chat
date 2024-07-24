<script setup lang="ts">
import type { SocketMessage } from "~/types";
import ChatBotMessage from "./ChatBotMessage.vue";
import ChatSenderMessage from "./ChatSenderMessage.vue";
import ChatYourMessage from "./ChatYourMessage.vue";

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
  <div>
    <div>
      <div v-if="socket.user.name === 'Server'" class="w-full p-4 space-y-2">
        <!-- Bot Server Message -->
        <ChatBotMessage :socket="socket" :profile-id="profileId" />
        <!-- End Of Bot Server Message -->
      </div>
      <div v-else class="w-full p-4 space-y-2">
        <div class="grid" v-if="profileId !== socket.user.profileId">
          <!-- Sender Message -->
          <ChatSenderMessage :socket="socket" :profile-id="profileId" />
          <!-- End Of Sender Message -->
        </div>
        <!-- Your Message -->
        <div v-else class="flex gap-2.5 justify-end">
          <ChatYourMessage :socket="socket" />
        </div>
        <!-- End of Your Message -->
      </div>
    </div>
  </div>
</template>
