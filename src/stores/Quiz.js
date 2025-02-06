import { defineStore } from "pinia";

export const useStore = defineStore('quiz', {
  state: () => ({
    mode: null,
    difficulty: null,
    answers: [], // 'answer' の綴りを修正し、配列に変更
  }),
  actions: {
    setMode(mode) {
      this.mode = mode
    },
    setDifficulty(difficulty) {
      this.difficulty = difficulty
    },
    addAnswer(answer) { // 'setAnswer' を 'addAnswer' に変更し、配列に追加する動作に
      this.answers.push(answer)
    },
    clearAnswers() { // 答えをクリアするメソッドを追加
      this.answers = []
    }
  }
})
