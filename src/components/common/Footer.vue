<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="copyright">© 2021. Wallbooks, S.L.</div>
      <div class="author">Max Gómez</div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
@import "@/assets/styles/tools/_mixins.sass";
.footer
  height: 60px
  background-color: $background-light-color
  &__content
    @include responsive-layout()
    height: 100%
    display: flex
    justify-content: space-between
    align-items: center
</style>
