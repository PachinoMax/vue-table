/* eslint-disable @typescript-eslint/no-explicit-any */
export default class LocalStorage {
  namespace: string;
  constructor(namespace?: string) {
    if (!namespace) namespace = '_app';
    this.namespace = `${namespace}.`;
  }
  get(key: string, defaultValue: any = null) {
    if (!key) throw new Error('Ошибка передан пуской параметр key');
    key = `${this.namespace}${key}`;
    const value = window.localStorage.getItem(key);
    if (!value) return defaultValue;
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (e) {
      return value;
    }
  }

  set(key: string, value: string | object = '') {
    if (!key) throw new Error('Ошибка передан пуской параметр key');
    key = `${this.namespace}${key}`;
    if (typeof (value) == 'object') value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  }

  remove(key: string) {
    if (!key) throw new Error('Ошибка передан пуской параметр key');
    key = `${this.namespace}${key}`;
    window.localStorage.removeItem(key);
  }

  clear() {
    window.localStorage.clear();
  }
}

export { LocalStorage };
