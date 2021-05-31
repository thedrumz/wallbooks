<template>
  <article class="book">
    <header class="book__header">
      <img :src="imageUrl" alt="book image" />
    </header>
    <main>
      <h2 class="book__title">{{ title }}</h2>
      <h3 class="book__author">{{ author }}</h3>
      <p class="book__description">{{ description }}</p>
      <span class="publish__publish-date">{{ formattedDate }}</span>
    </main>
    <footer>
      <Button
        class="signup__btn"
        tag="router-link"
        theme="primary"
        :to="`/books/edit/${id}`"
      >
        Edit book
      </Button>
      <Button
        class="signup__btn"
        tag="router-link"
        theme="secondary"
        :to="`/books/delete/${id}`"
      >
        Delete
      </Button>
    </footer>
  </article>
</template>

<script lang="ts">
import Button from "@/components/ui/atoms/Button.vue";
import { dateToString } from "@/utils/dates";

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
  setup(props) {
    const formattedDate = dateToString(props.publishDate);

    return { formattedDate };
  },
};
</script>

<style lang="sass"></style>
