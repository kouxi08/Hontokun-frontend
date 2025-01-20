import { defineStore } from 'pinia';
export const useStore = defineStore('main', {
  state: () => ({
    name: 'メイン',
    component: null,
  }),
  actions: {
    setPage(name, component, props = {}) {
      this.name = name
      this.component = component
    },
  }
});
