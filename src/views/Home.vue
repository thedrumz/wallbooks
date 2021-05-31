<template>
  <Page>
    <h1>Home</h1>
    <BookList :books="books" />
  </Page>
</template>

<script>
import { defineComponent } from "vue";
import Page from "@/components/ui/objects/Page.vue";
import BookList from "@/components/ui/objects/BookList.vue";

export default defineComponent({
  name: "Home",
  components: { Page, BookList },
});
</script>

<style></style>
