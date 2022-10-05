import { defineStore } from 'pinia';
import filters from '@/data/filters.json';
import questions from '@/data/questions.json';
import scores from '@/data/scores.json';
import { IFilter } from '@/interfaces/filters/index';
import { IQuestions } from '@/interfaces/questions/index';
import { IScores } from '@/interfaces/scores/index';

export interface TableState {
  filters: IFilter[] | null,
  questions: IQuestions[] | null,
  scores: IScores[] | null,
}
export const useTableStore = defineStore('table', {
  state: (): TableState => {
    return {
      filters: null,
      questions: null,
      scores: null
    }
  },
  actions: {
    async getFilters() {
      this.filters = filters;
      return Promise.resolve(filters);
    },
    async getQuestions() {
      this.questions = questions;
      return Promise.resolve(questions);
    },
    async getScores() {
      this.scores = scores;
      return Promise.resolve(scores);
    },
    resetSearch() {
      this.questions = questions;
      return questions;
    }
  }
})