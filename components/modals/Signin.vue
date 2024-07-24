<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useModalStore } from "~/stores/useModalStore";
import { Button } from "../ui/button";

const { signIn } = useAuth();
const modalStore = useModalStore();

const isModalOpen = computed(() => {
  return modalStore?.type === "signin" && modalStore?.isOpen;
});

const onClose = () => {
  modalStore?.setIsOpen(false);
  modalStore?.onClose();
};

const signInWithGithub = async () => {
  onClose();
  await signIn("github");
};

const signInWithGoogle = async () => {
  onClose();
  await signIn("google");
};
</script>

<template>
  <Dialog :open="isModalOpen" @update:open="onClose">
    <DialogContent>
      <DialogHeader>
        <DialogTitle
          class="text-center text-3xl font-semibold tracking-tighter text-gray-900"
        >
          Nuxt Nitro Chat
        </DialogTitle>
        <DialogDescription class="text-center font-medium text-gray-500">
          Welcome to Nuxt Nitro Chat! 🚀 This Nuxt app uses experimental web
          sockets for real-time group chat in Nuxt.js. 💬✨
        </DialogDescription>
      </DialogHeader>
      <Button
        @click="signInWithGithub"
        class="rounded-xl w-full h-12 gap-3 px-5 py-3"
        type="button"
        aria-label="Sign in with Github"
      >
        <Icon
          name="uiw:github"
          role="img"
          class="md hydrated size-5"
          aria-label="logo github"
        />
        <span>Sign in with Github</span>
      </Button>
      <Button
        @click="signInWithGoogle"
        class="rounded-xl w-full h-12 gap-3 px-5 py-3"
        type="button"
        aria-label="Sign in with Google"
      >
        <Icon
          name="flowbite:google-solid"
          role="img"
          class="md hydrated size-5"
          aria-label="logo google"
        />
        <span>Sign in with Google</span>
      </Button>
    </DialogContent>
  </Dialog>
</template>
