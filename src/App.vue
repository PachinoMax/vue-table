<template>
  <header>
    <ul class="language">
      <li
        :class="currentLang === 'en' ? 'active' : ''"
        @click="changeLanguage('en')"
      >
        EN
      </li>
      <li
        :class="currentLang === 'fr' ? 'active' : ''"
        @click="changeLanguage('fr')"
      >
        FR
      </li>
    </ul>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useLangStore } from "./store/modules/lang";
import { storeToRefs } from "pinia";
import pinia from "./store";

export default defineComponent({
  name: "App",
  setup() {
    const store = useLangStore(pinia());
    const { currentLang } = storeToRefs(store);
    const { changeLang } = useLangStore();

    const changeLanguage = (lang: string) => {
      changeLang(lang);
    };
    return {
      currentLang,
      changeLanguage,
    };
  },
});
</script>

<style lang="scss">
header {
  display: flex;
  justify-content: flex-end;
  background-color: #4086d2;
  margin: 10px 40px;
}
main {
  padding: 1rem 3rem;
  min-height: calc(100vh - 15rem);
}
.language {
  border-radius: 5px;
  font-size: 0.7rem;
  display: flex;
  margin-right: 2%;
}
.active {
  border: 1px solid #ccc;
  background-color: #d18d3f;
  color: #fff;
  border-radius: 3px;
}

li {
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  text-transform: uppercase;
  list-style-type: none;

  &:hover {
    cursor: pointer;
  }
}
</style>
