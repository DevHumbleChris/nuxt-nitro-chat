<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const { data } = useAuth();

const user = computed(() => {
  return data.value?.user;
});
</script>

<template>
  <aside
    class="hidden sm:w-[17rem] sticky top-0 h-screen space-y-2 sm:border p-3 overflow-hidden flex-shrink-0"
  >
    <div class="flex gap-2">
      <Avatar class="">
        <AvatarImage :src="user?.image!" :alt="user?.name" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div class="w-full">
        <p class="capitalize font-bold truncate w-[95%] text-sm">
          {{ user?.name }}
        </p>
        <p class="truncate w-[95%] text-xs">{{ user?.email }}</p>
      </div>
    </div>
    <div class="flex items-center justify-between">
      <h2 class="font-bold">Messages</h2>
      <div class="flex items-center gap-1">
        <!-- Icons here -->
        <Button variant="ghost" size="icon" class="rounded-full">
          <Icon name="solar:pen-new-round-broken" class="size-6" />
        </Button>
        <Button variant="ghost" size="icon" class="rounded-full">
          <Icon name="solar:rounded-magnifer-linear" class="size-6" />
        </Button>
      </div>
    </div>
    <ChatsSidebarTabs :email="user?.email!" />
  </aside>
</template>
