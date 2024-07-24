<script setup lang="ts">
const modalStore = useModalStore();

const onGetStarted = () => {
  modalStore?.onOpen("signin");
  modalStore?.setIsOpen(true);
};
</script>

<template>
  <div class="w-full md:w-1/2 lg:w-4/12 xl:w-6/12 p-8">
    <h1 class="mb-9 text-7xl font-bold font-heading md:max-w-2xl leading-none">
      Meet similar minded people
    </h1>
    <div class="space-y-4">
      <p class="text-base text-gray-900 font-medium md:max-w-sm">
        Welcome to Nuxt Nitro Chat! 🚀 This Nuxt app uses experimental web
        sockets for real-time group chat in Nuxt.js. 💬✨
      </p>
      <div class="md:inline-block">
        <button
          @click="onGetStarted"
          class="py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 ease-in-out duration-200 transform hover:-translate-y-1 transition duration-400"
          type="button"
        >
          Get Started
        </button>
      </div>
      <h3 class="mb-3 text-gray-900 font-semibold">Trusted by 1M+ customers</h3>
      <div class="flex flex-wrap items-center">
        <div class="w-auto p-1">
          <div class="flex flex-wrap items-center -m-0.5 gap-1">
            <Icon
              v-for="_ in 5"
              :key="_"
              name="material-symbols:kid-star"
              class="size-5 text-indigo-600"
            />
          </div>
        </div>
        <div class="w-auto p-1">
          <div class="flex flex-wrap -m-0.5">
            <div class="w-auto p-0.5">
              <p class="text-gray-900 font-bold">4.2/5</p>
            </div>
            <div class="w-auto p-0.5">
              <p class="text-gray-600 font-medium">(45k Reviews)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
