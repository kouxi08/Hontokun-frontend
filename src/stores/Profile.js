import { defineStore } from 'pinia';
export const useProfileStore = defineStore('profile', {
  state: () => ({
    catName: null,
    catUrl: null,
    accuracy: null
  }),
  actions: {
    setCat(catName, catUrl, accuracy) {
      this.catName = catName
      this.catUrl = catUrl
      this.accuracy = accuracy
    },
    clearCat() {
      this.catName = null
      this.catUrl = null
      this.accuracy = null
    },
  }
});
