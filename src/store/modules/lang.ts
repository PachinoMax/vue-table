import { defineStore } from 'pinia';

export enum Languages {
  en = 'en',
  fr = 'fr',
}

export const useLangStore = defineStore('lang', {
  state: () => {
    return {
      lang: Languages.en,
      availableLanguages: [Languages.en, Languages.fr]
    }
  },
  getters: {
    currentLang(): string {
      return this.lang
    },
  },
  actions: {
    async changeLang(lang: string) {
      if (this.lang === lang) return;
      this.lang = lang;
      return this.lang;
    }
  },
})