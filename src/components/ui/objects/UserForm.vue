<template>
  <section class="user-form">
    <h1 class="user-form__title">{{ title }}</h1>
    <form
      class="user-form__form"
      novalidate
      @submit.prevent="onSubmit"
      data-testid="form"
    >
      <slot name="content" />
      <Button class="user-form__btn" tag="button" theme="primary">
        {{ buttonText }}
      </Button>
    </form>
    <slot name="footer" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/ui/atoms/Button.vue";

export default defineComponent({
  name: "UserForm",
  components: { Button },
  props: {
    title: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    onSubmit: {
      type: Function,
      reqired: true,
    },
  },
});
</script>

<style lang="sass" scoped>
@import "@/assets/styles/tools/_mixins.sass";
@import "@/assets/styles/settings/_variables.sass";
.user-form
  position: relative
  max-width: 32rem
  width: 100%
  @include center()
  margin: 0 auto
  padding-bottom: 2.5rem
  background: linear-gradient(45deg,#43cfa8,#398bbc)
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
  &__title
    color: $text-inverted-color
  &__form
    width: 60%
    display: flex
    flex-direction: column
</style>
