<script setup lang="ts">
import WebSocketClient from "~/components/WebSocket.client.vue";
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
  },
});
</script>

<template>
  <WebSocketClient />
</template>
