<template>
  <div class="page">
    <Header />
    <main :class="`page__content page__content--${position}`">
      <slot />
    </main>
    <Footer />
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
.page
  display: flex
  flex-direction: column
  min-height: 100vh
  background-color: $background-extra-light-color
  &__content
    flex: 1 1 auto
    display: flex
    flex-direction: column
    padding: $spacing-s $spacing-s * 2
    &--top
      justify-content: flex-start
    &--center
      justify-content: center
    &--bottom
      justify-content: flex-end
</style>
