<template>
  <div class="page">
    <Header />
    <main class="page__content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/common/Header.vue";
import Footer from "@/components/common/Footer.vue";

export default defineComponent({
  name: "Login",
  components: { Header, Footer },
});
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.page
  display: flex
  flex-direction: column
  min-height: 100vh
  &__content
    flex: 1 1 auto
</style>
