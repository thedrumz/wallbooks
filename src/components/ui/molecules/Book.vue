<template>
  <article class="book" data-testid="book">
    <header class="book__header">
      <img class="book__image" :src="imageUrl" alt="book image" />
    </header>
    <main class="book__content">
      <h2 class="book__title">{{ title }}</h2>
      <h3 class="book__author">{{ author }}</h3>
      <p class="book__description">{{ truncatedText }}</p>
      <span class="publish__publish-date">{{ formattedDate }}</span>
    </main>
    <footer class="book__footer">
      <Button tag="router-link" :to="`/books/edit/${id}`"> Edit book </Button>
      <Button theme="danger" @click="handleDelete"> Delete </Button>
    </footer>
  </article>
</template>

<script lang="ts">
import Button from "@/components/ui/atoms/Button.vue";
import { Book } from "@/types/Book";
import { useDeleteBook } from "@/use/useBooks";
import { dateToString } from "@/utils/dates";
import { truncate } from "@/utils/text";

const DESCRIPTION_MAX_LENGTH = 200;
const DESCRIPTION_ELLIPSIS = "...";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
  },
  components: { Button },
  setup(props: Book) {
    const deleteBook = useDeleteBook();
    const formattedDate = dateToString(props.publishDate);
    const truncatedText = truncate(
      props.description,
      DESCRIPTION_MAX_LENGTH,
      DESCRIPTION_ELLIPSIS
    );

    const handleDelete = () => deleteBook(props.id);

    return { formattedDate, truncatedText, handleDelete };
  },
};
</script>

<style lang="sass">
@import "@/assets/styles/settings/_variables.sass";
.book
  height: 100%
  display: flex
  flex-direction: column
  background-color: $background-white
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)
  transition: all 0.3s cubic-bezier(.25,.8,.25,1)
  &:hover
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)
  &__image
    width: 100%
    height: 300px
    object-fit: cover
  &__content
    flex: 1 1 auto
    padding: $spacing-m $spacing-m 0
  &__title
    margin: 0
  &__author
    margin: 0
    color: $text-primary-color
    font-size: $fs-text-m
    font-weight: 500
  &__footer
    display: flex
    justify-content: space-between
    align-items: center
    padding: $spacing-m
</style>
