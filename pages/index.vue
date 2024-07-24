<script setup lang="ts">
import HeroInfo from "~/components/homepage/HeroInfo.vue";
import HeroImages from "~/components/homepage/HeroImages.vue";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/group",
  },
});
</script>

<template>
  <section class="relative">
    <div class="overflow-hidden pt-20 px-6">
      <div class="relative container px-4 mx-auto">
        <div class="flex flex-wrap -m-8">
          <HeroInfo />
          <HeroImages />
        </div>
      </div>
    </div>
  </section>
</template>
