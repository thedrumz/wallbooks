<template>
  <header class="header">
    <img
      class="header__brand"
      src="@/assets/logo-wallbooks.svg"
      alt="logo wallbooks"
    />
  </header>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.header
  height: 60px
  padding: $spacing-s $spacing-s * 2
  background-color: $background-light-color
  &__brand
    width: 150px
</style>
