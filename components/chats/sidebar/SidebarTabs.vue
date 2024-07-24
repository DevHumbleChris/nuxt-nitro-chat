<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllMessages from "./AllMessages.vue";
import GroupsMessages from "./GroupsMessages.vue";

const props = defineProps<{
  email: string;
}>();
</script>

<template>
  <Tabs default-value="all" class="w-full">
    <TabsList class="flex w-full justify-between rounded-2xl">
      <TabsTrigger
        value="all"
        class="data-[state=active]:rounded-xl data-[state=active]:bg-[#be4536] data-[state=active]:text-white px-10"
      >
        All
      </TabsTrigger>
      <TabsTrigger
        value="groups"
        class="data-[state=active]:rounded-xl data-[state=active]:bg-[#be4536] px-10 data-[state=active]:text-white"
      >
        Groups
      </TabsTrigger>
    </TabsList>
    <TabsContent value="all">
      <AllMessages :email="props?.email" />
    </TabsContent>
    <TabsContent value="groups">
      <GroupsMessages :email="props?.email" />
    </TabsContent>
  </Tabs>
</template>
