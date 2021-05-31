<template>
  <header class="header">
    <img
      class="header__brand"
      src="@/assets/logo-wallbooks.svg"
      alt="logo wallbooks"
    />
    <LogoutButton />
  </header>
</template>

<script lang="ts">
import LogoutButton from "@/components/ui/molecules/LogoutButton.vue";

export default {
  components: { LogoutButton },
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.header
  height: 60px
  display: flex
  justify-content: space-between
  align-items: center
  padding: $spacing-s $spacing-s * 2
  background-color: $background-light-color
  &__brand
    width: 150px
</style>
