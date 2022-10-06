<template>
  <div class="table">
    <div class="table-header">
      <table class="table-body">
        <thead>
          <tr class="header-cell">
            <th class="table-headers-row">
              <div class="search-block">
                <input
                  type="text"
                  class="search-input"
                  v-model="searchValue"
                  @input.prevent="$emit('searchQuestion', searchValue)"
                />
                <button class="search-button" @click="handleClear">
                  <ClearIcon />
                </button>
              </div>
            </th>
            <th
              class="main-table"
              v-for="(item, index) in filters"
              :key="index"
            >
              <span class="scroll-container">{{ item[currentLang] }}</span>
            </th>
          </tr>
        </thead>
        <tbody class="body-index-table">
          <tr v-for="(question, index) in questions" :key="index">
            <td>
              <span> {{ question.labels[currentLang] }}</span>
            </td>
            <td v-for="filter in filters" :key="filter._id">
              <span
                :class="{
                  bad: setScores(filter._id, question._id) < 40,
                  ok:
                    setScores(filter._id, question._id) > 40 &&
                    setScores(filter._id, question._id) < 60,
                  good: setScores(filter._id, question._id) >= 60,
                }"
                >{{ setScores(filter._id, question._id) }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ClearIcon from "@/assets/icons/ClearIcon.vue";
import { IScore, IScores } from "@/interfaces/scores";

export default defineComponent({
  name: "HomeView",
  components: { ClearIcon },
  props: ["currentLang", "filters", "questions", "scores"],
  emits: ["clearSearch", "searchQuestion"],
  setup(props, { emit }) {
    const searchValue = ref<string>("");
    const setScores = (filter: string, question: string) => {
      return parseFloat(
        props.scores
          .filter((s: IScores) => s.question_id === question)[0]
          .scores.flat()
          .find((t: IScore) => t.filter_id === filter).value
      )
        .toFixed(1)
        .replace(/.0$/, "");
    };
    const handleClear = () => {
      emit("clearSearch");
      searchValue.value = "";
    };
    return {
      setScores,
      searchValue,
      handleClear,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "../style/table.scss";
</style>
