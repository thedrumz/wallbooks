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
  &__content
    flex: 1 1 auto
    padding: $spacing-s $spacing-s * 2
    display: flex
    &--top
      align-items: flex-start
    &--center
      align-items: center
    &--bottom
      align-items: flex-end
</style>
