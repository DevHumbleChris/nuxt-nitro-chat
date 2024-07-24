import type { ModalType } from "~/types";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
}

export const useModalStore = defineStore("modalStore", {
  state: (): ModalStore => ({
    isOpen: false,
    type: null,
  }),
  actions: {
    onOpen(type: ModalType): void {
      this.type = type;
    },
    onClose(): void {
      this.type = null;
    },
    setIsOpen(state: boolean) {
      this.isOpen = state;
    },
  },
  persist: true,
});
