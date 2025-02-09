import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    mode: null,
    difficulty: null,
    catName: null,
    questions: [], // 問題を保存する配列
    answers: [], // ユーザーの回答を保存する配列
  }),
  actions: {
    setMode(mode) {
      this.mode = mode;
    },
    setDifficulty(difficulty) {
      this.difficulty = difficulty;
    },
    setCatName(catName) {
      this.catName = catName;
    },
    setQuestions(questions) {
      this.questions = questions;
    },
    addAnswer(answer) {
      this.answers.push(answer);
    },
    clearAnswers() {
      this.answers = [];
    },
  },
  getters: {
    tableContent() {
      return this.questions.map((question, index) => ({
        id: index + 1,
        correction: question.correctAnswer,
        yourAnswer: this.answers[index] || "",
      }));
    },
  },
});
