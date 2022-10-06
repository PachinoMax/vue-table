<template>
  <Table
    :currentLang="currentLang"
    :filters="filters"
    :questions="questions"
    :scores="scores"
    @clearSearch="clearSearch"
    @searchQuestion="searchQuestion"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import pinia from "@/store";
import { storeToRefs } from "pinia";
import { useLangStore } from "@/store/modules/lang";
import { useTableStore } from "@/store/modules/table";
import { IScores, IScore } from "@/interfaces/scores";
import { ILabel, IQuestions } from "@/interfaces/questions";
import Table from "../components/Table.vue";

export default defineComponent({
  name: "HomeView",
  components: {
    Table: Table,
  },
  setup() {
    const store = useLangStore(pinia());
    const tableStore = useTableStore(pinia());
    const { currentLang } = storeToRefs(store);
    const { filters, questions, scores } = storeToRefs(tableStore);
    const { getFilters, getQuestions, getScores, resetSearch } = tableStore;

    const setScores = (filter: string, question: string) => {
      return parseFloat(
        scores.value
          .filter((s: IScores) => s.question_id === question)[0]
          .scores.flat()
          .find((t: IScore) => t.filter_id === filter).value
      )
        .toFixed(1)
        .replace(/.0$/, "");
    };

    const clearSearch = () => {
      resetSearch();
    };

    const searchQuestion = (searchValue: string) => {
      resetSearch();
      if (!searchValue) return questions.value;

      return (questions.value = [...questions.value].filter((q: IQuestions) => {
        let item = q.labels[currentLang.value as keyof ILabel];
        return item
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      }));
    };

    onMounted(() => {
      getFilters();
      getQuestions();
      getScores();
    });
    return {
      currentLang,
      filters,
      questions,
      scores,
      setScores,
      searchQuestion,
      resetSearch,
      getFilters,
      getQuestions,
      getScores,
      onMounted,
      clearSearch,
    };
  },
});
</script>
<style lang="scss">
@import "../style/app.scss";
</style>
