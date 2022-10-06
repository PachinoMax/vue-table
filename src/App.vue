<template>
  <header>
    <LangChange
      v-model="currentLang"
      :currentLang="currentLang"
      :languages="availableLanguages"
      @changeLang="changeLanguage"
    />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useLangStore } from "@/store/modules/lang";
import { storeToRefs } from "pinia";
import pinia from "@/store";
import { useCookie } from "vue-cookie-next";
import LangChange from "@/components/LangChange.vue";

export default defineComponent({
  name: "App",
  components: { LangChange },
  setup() {
    const store = useLangStore(pinia());
    const { setCookie } = useCookie();
    const { currentLang, availableLanguages } = storeToRefs(store);
    const { changeLang } = useLangStore();

    const changeLanguage = (newlangValue: string) => {
      changeLang(newlangValue);
    };
    onMounted(() => {
      setCookie("lang", currentLang.value);
    });

    return {
      currentLang,
      availableLanguages,
      changeLanguage,
    };
  },
});
</script>

<style lang="scss">
@import "./style/app.scss";
</style>
