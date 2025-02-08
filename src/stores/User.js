import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    userName: null,
    level: null,
    experience: null,
  }),
  actions: {
    setUser(userName, level, experience) {
      this.userName = userName;
      this.level = level;
      this.experience = experience;
    },
    clearCat() {
      this.userName = null;
      this.level = null;
      this.experience = null;
    },
  },
});
