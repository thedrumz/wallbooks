<template>
  <component :is="tag" :class="`btn btn--${theme} ${block && 'btn--block'}`">
    <slot />
  </component>
</template>

<script lang="ts">
export default {
  props: {
    tag: {
      type: String,
      default: "a",
      validator(value: string) {
        return ["a", "button", "router-link"].includes(value);
      },
    },
    theme: {
      type: String,
      default: "default",
      validator(value: string) {
        const themes = ["primary", "default"];
        return themes.includes(value);
      },
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.btn
  display: inline-block
  padding: 0.75rem 1.87rem
  font-weight: 600
  font-size: $fs-btn
  letter-spacing: 0.03em
  text-align: center
  text-transform: uppercase
  text-decoration: none
  border: none
  border-radius: 0.3rem
  cursor: pointer
  transition: all 0.2s
  &--block
    display: block
    width: 100%
  &--primary
    color: $primary-color
    background: $btn-primary-color
    &:hover,
    &:focus
      background: mix($btn-primary-color, $primary-color, 80%)
</style>
