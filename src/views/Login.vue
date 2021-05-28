<template>
  <div class="home">
    <Page></Page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Page from "@/components/ui/objects/Page.vue";

export default defineComponent({
  name: "Login",
  components: { Page },
});
</script>
