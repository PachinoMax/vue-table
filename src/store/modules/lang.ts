import { defineStore } from 'pinia';
import { LocalStorage } from '@/plugins/localStorage';

const localStorage = new LocalStorage();

export interface State {
  lang: string;
}

export const useLangStore = defineStore('lang', {
  state: (): State => {
    return {
      lang: ''
    }
  },
  getters: {
    currentLang() {
      if (!this.lang) this.lang = localStorage.get('lang');
      return this.lang
    },
  },
  actions: {
    async changeLang(lang: string) {
      if (this.lang === lang) return;
      this.lang = lang;
      localStorage.set('lang', lang);
    },
    async setLang() {
      this.lang = 'en';
      localStorage.set('lang', this.lang);
    }
  },
})