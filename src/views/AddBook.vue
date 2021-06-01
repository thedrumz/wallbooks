<template>
  <Page>
    <section class="add-book">
      <h1 class="add-book__title">Add new book</h1>
      <BookForm buttonText="Create book" @onValidSubmit="onValidSubmit" />
    </section>
  </Page>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { Book } from "@/types/Book";
import { useCreateBook } from "@/use/useBooks";
import Page from "@/components/ui/objects/Page.vue";
import BookForm from "@/components/ui/objects/BookForm.vue";

export default {
  components: { Page, BookForm },
  setup() {
    const createBook = useCreateBook();
    const router = useRouter();

    const onValidSubmit = async (book: Book) => {
      await createBook(book);
      router.push({ name: "Home" });
    };

    return { onValidSubmit };
  },
};
</script>

<style lang="sass"></style>
