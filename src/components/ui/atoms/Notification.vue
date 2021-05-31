<template>
  <teleport to="body">
    <div v-if="isVisible" :class="`notification notification--${type}`">
      {{ message }}
    </div>
  </teleport>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";

interface Props {
  message: string;
  type?: string;
  timer?: number;
}
export default {
  props: {
    message: {
      type: String,
      default: "",
      required: true,
    },
    type: {
      type: String,
      default: "success",
      validator(value: string) {
        const themes = ["success", "error"];
        return themes.includes(value);
      },
    },
    timer: {
      type: Number,
      default: 3000,
    },
  },
  setup(props: Props) {
    const isVisible = ref(true);

    onMounted(() => {
      setTimeout(() => {
        isVisible.value = false;
      }, props.timer);
    });

    return { isVisible };
  },
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.notification
  position: absolute
  width: 100%
  top: 60px
  padding: 1rem 2rem
  &--success
    background-color: rgba($success-color, .7)
    color: $text-inverted-color
  &--error
    background-color: rgba($error-color, .7)
    color: $text-inverted-color
</style>
