<template>
  <span class="validation-error">
    <slot />
  </span>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";

.validation-error
  font-size: $fs-input-error
  font-weight: 500
  color: $error-color
  letter-spacing: 1px
</style>
