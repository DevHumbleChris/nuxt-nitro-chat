<script setup lang="ts">
// In prod: check if secure, then use wss://
const { status, data, send, open, close } = useWebSocket(
  `ws://localhost:3000/api/websocket`
);

const history = ref<string[]>([]);
watch(data, (newValue: string) => {
  history.value.push(`server: ${newValue}`);
});

const message = ref("");

function sendData() {
  history.value.push(`client: ${message.value}`);
  send(message.value);
  message.value = "";
}
</script>

<template>
  <div>
    <h1>WebSocket - let's go!</h1>
    <form @submit.prevent="sendData">
      <input v-model="message" />
      <button type="submit">Send</button>
    </form>
    <div>
      <p v-for="entry in history">{{ entry }}</p>
    </div>
  </div>
</template>
