<template>
  <div class="lang-decision">
    <label v-for="language in languages" :key="language" :for="language">
      <input
        type="radio"
        name="radio"
        :value="language"
        :checked="currentLang === language"
        @input="$emit('changeLang', $event.target.value)"
      />
      {{ language }}
    </label>
  </div>
</template>

<script lang ="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LangChange",
  props: ["currentLang", "languages"],
  emits: ["changeLang"],
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/app.scss";
</style>