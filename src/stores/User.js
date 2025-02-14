import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    userName: null,
    level: null,
    experience: null,
  }),
  actions: {
    setUser(user) {
      this.userName = user.nickname;
      this.level = user.level;
      this.experience = user.experience;
    },
    clearCat() {
      this.userName = null;
      this.level = null;
      this.experience = null;
    },
  },
});
