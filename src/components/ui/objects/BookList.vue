<template>
  <p v-if="!books || !books.length">There are no books, please create some</p>
  <div class="book-list" v-for="book of books" :key="book.id">
    <Book
      :id="book.id"
      :imageUrl="book.imageUrl"
      :title="book.title"
      :author="book.author"
      :description="book.description"
      :publishDate="book.publishDate"
    />
  </div>
</template>

<script lang="ts">
import Book from "@/components/ui/molecules/Book.vue";

export default {
  props: {
    books: {
      type: Array,
    },
  },
  components: { Book },
};
</script>

<style></style>
