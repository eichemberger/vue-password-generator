import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {

  state: () => ({
    message: '',
    isActive: false,
  }),
  actions: {
    show(message: string) {
      this.message = message;
      this.isActive = true;

      setTimeout(() => {
        this.isActive = false;
      }, 3000);
    },

    close() {
      this.isActive = false;
    }
  }
})