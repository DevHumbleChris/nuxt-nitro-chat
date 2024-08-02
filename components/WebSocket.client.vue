<script setup lang="ts">
// In prod: check if secure, then use wss://
const { status, data, send, open, close } = useWebSocket(
  `ws://localhost:3000/api/websocket`
);
</script>

<template>
  <div class="grid min-h-screen place-content-center text-center">
    <h1 class="font-bold text-xl">With useWebSocket vueuse utility</h1>
    <p>Status: {{ status === "OPEN" ? "connected" : "disconnected" }}</p>
  </div>
</template>
