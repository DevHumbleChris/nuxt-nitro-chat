<script setup lang="ts">
import Connection from "~/components/test/Connection.client.vue";

definePageMeta({
  auth: {
    unauthenticatedOnly: false,
  },
});
</script>

<template>
  <Connection />
</template>
