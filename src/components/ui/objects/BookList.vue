<template>
  <p v-if="!books || !books.length">There are no books, please create some</p>
  <div class="book-list">
    <div v-for="book of books" :key="book.id">
      <Book
        :id="book.id"
        :imageUrl="book.imageUrl"
        :title="book.title"
        :author="book.author"
        :description="book.description"
        :publishDate="book.publishDate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useGetBooks } from "@/use/useBooks";
import Book from "@/components/ui/molecules/Book.vue";

export default {
  components: { Book },
  setup() {
    const books = useGetBooks();

    return { books };
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/settings/_variables.sass";
.book-list
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))
  grid-auto-rows: 1fr
  gap: $spacing-m
  margin: 1rem 0
</style>
