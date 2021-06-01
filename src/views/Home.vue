<template>
  <Page class="home">
    <header class="home__header">
      <h1>Home</h1>
      <Button role="button" tag="router-link" theme="primary" to="/books/add">
        Add new book
      </Button>
    </header>
    <BookList :books="books" />
  </Page>
</template>

<script>
import { defineComponent } from "vue";
import { useGetBooks } from "@/use/useBooks";
import Page from "@/components/ui/objects/Page.vue";
import BookList from "@/components/ui/objects/BookList.vue";
import Button from "@/components/ui/atoms/Button.vue";

export default defineComponent({
  name: "Home",
  components: { Page, BookList, Button },
  setup() {
    const books = useGetBooks();
    return { books };
  },
});
</script>

<style lang="sass">
.home
  &__header
    display: flex
    justify-content: space-between
    align-items: center
</style>
