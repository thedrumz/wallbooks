<template>
  <div :class="`custom-input custom-input--${theme}`">
    <label class="custom-input__label">
      {{ label }}
      <input
        class="custom-input__input"
        :type="type"
        :value="value"
        :name="name"
        :placeholder="placeholder"
        @input="$emit('update:value', $event.target.value)"
      />
    </label>
    <ValidationError class="custom-input__error" v-if="triggerValidation">
      {{ validator(value) }}
    </ValidationError>
  </div>
</template>
<script lang="ts">
import ValidationError from "@/components/ui/atoms/ValidationError.vue";

export default {
  name: "CustomInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    triggerValidation: {
      type: Boolean,
      default: false,
    },
    validator: {
      type: Function,
    },
    theme: {
      type: String,
      default: "default",
      validator(value: string) {
        const themes = ["primary", "default"];
        return themes.includes(value);
      },
    },
  },
  components: { ValidationError },
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.custom-input
  display: flex
  flex-direction: column
  justify-content: flex-end
  position: relative
  padding-top: 1rem
  padding-bottom: 2rem
  &__label
    display: flex
    flex-direction: column
    text-transform: uppercase
    font-size: $fs-input-label
    letter-spacing: 1.3px
    font-weight: 500
  &__input
    padding: .4rem 0 .3rem
    border: none
    background: transparent
    letter-spacing: 1.2px
    font-size: $fs-input
    &:focus
      outline: none
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active
      -webkit-box-shadow: 0 0 0px 1000px transparent inset
      transition: background-color 5000s ease-in-out 0s
  &__error
    position: absolute
    bottom: 10px
  &--default
    .custom-input__label
      color: $text-primary-color
      border-bottom: 1px solid $border-color-primary
    .custom-input__input
      color: $text-primary-color
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active
        -webkit-text-fill-color: $text-primary-color
      &::placeholder
        color: rgba($text-primary-color, .5)
  &--primary
    .custom-input__label
      color: $text-inverted-color
      border-bottom: 1px solid $border-color-inverted
    .custom-input__input
      color: $text-inverted-color
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active
        -webkit-text-fill-color: $text-inverted-color
      &::placeholder
        color: rgba($text-inverted-color, .5)
</style>
