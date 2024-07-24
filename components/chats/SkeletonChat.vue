<script setup lang="ts"></script>

<template>
  <div class="space-y-3 my-3">
    <div
      v-for="x in 4"
      :key="x"
      class="space-y-1 animate-pulse flex w-full gap-2"
    >
      <div class="size-10 bg-slate-200 rounded-full flex-shrink-0"></div>
      <div class="grid grid-cols-2 w-full">
        <div class="bg-slate-200 rounded-full h-3"></div>
        <div class="bg-slate-200 rounded-full h-2 col-span-full"></div>
      </div>
    </div>
  </div>
</template>
