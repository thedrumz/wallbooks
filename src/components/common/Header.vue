<template>
  <header class="header">
    <div class="header__content">
      <img
        class="header__brand"
        src="@/assets/logo-wallbooks.svg"
        alt="logo wallbooks"
      />
      <LogoutButton />
    </div>
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
@import "@/assets/styles/tools/_mixins.sass";
.header
  height: 60px
  background-color: $background-light-color
  &__content
    @include responsive-layout()
    height: 100%
    display: flex
    justify-content: space-between
    align-items: center
  &__brand
    width: 150px
</style>
