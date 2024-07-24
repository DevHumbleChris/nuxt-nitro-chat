<script setup lang="ts">
import ModalProvider from "~/components/providers/ModalProvider.vue";
import { Toaster } from "~/components/ui/sonner";
import Sidebar from "~/components/chats/Sidebar.vue";

useHead({
  meta: [
    { property: "og:title", content: `Nuxt Nitro Chat` },
    {
      name: "description",
      content: "Diversify your revenue streams. Go from creator, to business.",
    },
    {
      property: "og:description",
      content: "Diversify your revenue streams. Go from creator, to business.",
    },
    { property: "og:url", content: "https://admin.kreativestores.com" },
    { name: "twitter:title", content: "Nuxt Nitro Chat" },
    {
      name: "twitter:description",
      content: "Diversify your revenue streams. Go from creator, to business.",
    },
    { name: "twitter:site", content: "https://admin.kreativestores.com" },
  ],
  title: `Nuxt Nitro Chat`,
});
</script>

<template>
  <main>
    <NuxtLoadingIndicator />
    <Toaster :close-button="true" />
    <ModalProvider />
    <section class="flex">
      <Sidebar />
      <slot />
    </section>
  </main>
</template>
