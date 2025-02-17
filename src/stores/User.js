import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    name: null,
    level: null,
    experience: null,
    birthday: null,
  }),
  actions: {
    setUser(user) {
      this.name = user.nickname;
      this.level = user.level;
      this.experience = user.experience;
    },
    setUserName(name) {
      this.name = name;
    },
    setBirthday(date) {
      this.birthday = date
    },
    clearCat() {
      this.name = null;
      this.level = null;
      this.experience = null;
    },
  },
});
