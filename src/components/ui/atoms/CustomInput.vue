<template>
  <div class="custom-input">
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
      {{ validator() }}
    </ValidationError>
  </div>
</template>
<script lang="ts">
import ValidationError from "@/components/ui/atoms/ValidationError.vue";

export default {
  name: "InputEmail",
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
  },
  components: { ValidationError },
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.custom-input
  display: flex
  flex-direction: column
  position: relative
  padding-top: 1rem
  padding-bottom: 2rem
  &__label
    display: flex
    flex-direction: column
    text-transform: uppercase
    font-size: $fs-input-label
    letter-spacing: 1.3px
    color: $text-inverted-color
    font-weight: 500
  &__input
    padding: .4rem 0 .3rem
    border: none
    border-bottom: 1px solid hsla(0,0%,100%,.8)
    background: transparent
    letter-spacing: 1.2px
    color: $text-inverted-color
    font-size: $fs-input
    &::placeholder
      color: $text-inverted-color
    &:focus
      outline: none
  &__error
    position: absolute
    bottom: 10px
</style>
