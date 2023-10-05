import { defineStore } from "pinia";

export const useTestStore = defineStore("test", {
  state: () => ({
    todos: [],
    isLoading: true,
  }),
  getters: {},
  actions: {
    notify() {
      const { $toast } = useNuxtApp();

      $toast.error("Error");
      console.log("notify");
    },
  },
});
