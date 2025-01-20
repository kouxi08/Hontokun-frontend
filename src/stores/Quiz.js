import { defineStore } from "pinia";

export const useStore = defineStore('quiz', {
  state: () => ({
    name: '登場',
    component: null,
  }),
  actions: {
    setPage(name, component) {
      this.name = name
      this.component = component
    }
  }
})
