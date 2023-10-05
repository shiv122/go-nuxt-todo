import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
