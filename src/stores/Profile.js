import { defineStore } from "pinia";
export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: null,
    catName: null,
    catUrl: null,
    accuracy: null,
  }),
  actions: {
    setCat(id, catName, catUrl, accuracy) {
      this.id = id;
      this.catName = catName;
      this.catUrl = catUrl;
      this.accuracy = accuracy;
    },
    clearCat() {
      this.catName = null;
      this.catUrl = null;
      this.accuracy = null;
    },
  },
});
