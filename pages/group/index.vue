<script setup lang="ts">
import { Loader } from "lucide-vue-next";

definePageMeta({
  layout: "chat",
});

const { data: auth } = useAuth();

const { data, error, status } = await useFetch("/api/profile/create", {
  method: "POST",
  body: {
    name: auth.value?.user?.name,
    email: auth.value?.user?.email,
    imageUrl: auth.value?.user?.image,
  },
});

onBeforeMount(() => {
  if (data.value) {
    navigateTo({
      path: `/group/${data.value.id}`,
    });
  }
});
</script>

<template>
  <section
    v-if="status === 'pending'"
    class="w-full flex flex-col items-center py-[10rem] font-bold"
  >
    <Icon name="solar:gallery-circle-linear" class="size-24 animate-spin" />
    <p>Loading!</p>
  </section>
  <section
    v-else-if="error"
    class="w-full flex flex-col items-center py-[10rem] font-bold"
  >
    <Icon name="solar:server-square-cloud-broken" class="size-24" />
    <p>Something wrong happened! 😔</p>
  </section>
  <section v-else class="w-full flex flex-col items-center py-[8rem]">
    <Loader class="size-16 animate-spin" />
    <p>Redirecting...!</p>
  </section>
</template>
