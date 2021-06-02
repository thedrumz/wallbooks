<template>
  <section class="paginator" v-if="pagesLength > 1">
    <div v-for="index in pagesLength" :key="index">
      <button
        class="paginator__button"
        @click="handleClick(index)"
        :to="{ name: 'Home', query: index }"
      >
        {{ index }}
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/runtime-core";
import { useChangePage, usePagesLength } from "@/use/usePaginator";

export default defineComponent({
  setup() {
    const pagesLength = usePagesLength();
    const changePage = useChangePage();

    onMounted(() => {
      changePage();
    });

    const handleClick = (page: number) => {
      changePage(page);
    };

    return { handleClick, pagesLength };
  },
});
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.paginator
  display: flex
  margin-top: 2rem
  margin-bottom: 2rem
  margin-left: auto
  border-radius: 4px
  box-shadow: 0px 2px 7px 1px #dadada
  &__button
    width: 3rem
    height: 3rem
    border: none
    background-color: $paginator-bg-color
    transition: background-color 0.3s ease
    &:hover, &.active
      background-color: $paginator-bg-color-hover
      cursor: pointer
</style>
