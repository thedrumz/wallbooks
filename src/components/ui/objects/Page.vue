<template>
  <div class="page">
    <Header class="page__header" />
    <main :class="`page__content page__content--${position}`">
      <slot />
    </main>
    <Footer class="page__footer" />
  </div>
</template>

<script lang="ts">
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

export default {
  props: {
    position: {
      type: String,
      default: "top",
      validator(value: string) {
        return ["top", "center", "bottom"].includes(value);
      },
    },
  },
  components: { Header, Footer },
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
@import "@/assets/styles/tools/_mixins.sass";
.page
  display: flex
  flex-direction: column
  min-height: 100vh
  background-color: $background-extra-light-color
  &__content
    @include responsive-layout()
    flex: 1 1 auto
    display: flex
    flex-direction: column
    padding-top: $spacing-s
    padding-bottom: $spacing-s
    &--top
      justify-content: flex-start
    &--center
      justify-content: center
    &--bottom
      justify-content: flex-end
</style>
