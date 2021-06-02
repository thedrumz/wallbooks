<template>
  <Page class="home">
    <header class="home__header">
      <h1>Home</h1>
      <Button role="button" tag="router-link" theme="primary" to="/books/add">
        Add new book
      </Button>
    </header>
    <BookList />
    <Paginator />
  </Page>
</template>

<script>
import { defineComponent } from "vue";
import Page from "@/components/ui/objects/Page.vue";
import BookList from "@/components/ui/objects/BookList.vue";
import Button from "@/components/ui/atoms/Button.vue";
import Paginator from "@/components/ui/molecules/Paginator.vue";

export default defineComponent({
  name: "Home",
  components: { Page, BookList, Button, Paginator },
});
</script>

<style lang="sass">
.home
  &__header
    display: flex
    justify-content: space-between
    align-items: center
</style>
