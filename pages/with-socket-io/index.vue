<script setup lang="ts">
import SocketComponent from "~/components/socket-io/Component.client.vue";
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
  },
});
</script>

<template>
  <SocketComponent />
</template>
