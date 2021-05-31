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
        const themes = ["secondary", "primary", "default"];
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
  line-height: 1.15
  &--block
    display: block
    width: 100%
  &--default
    color: $btn-default-color
    background-color: $btn-default-bg-color
    &:hover,
    &:focus
      background: mix($btn-default-bg-color, $btn-default-color, 80%)
  &--primary
    color: $primary-color
    background: $btn-primary-color
    &:hover,
    &:focus
      background: mix($btn-primary-color, $primary-color, 80%)
  &--secondary
    color: $text-inverted-color
    background: $btn-secondary-color
    border: 1px solid $border-color-inverted
    &:hover,
    &:focus
      border: 1px solid mix($btn-primary-color, $primary-color, 60%)
</style>
