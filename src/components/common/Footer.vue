<template>
  <footer class="footer">
    <div class="copyright">© 2021. Wallbooks, S.L.</div>
    <div class="author">Max Gómez</div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.footer
  height: 60px
  display: flex
  justify-content: space-between
  padding: $spacing-s $spacing-s * 2
  background-color: $background-light-color
</style>
