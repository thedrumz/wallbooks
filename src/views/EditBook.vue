<template>
  <Page>
    <section class="add-book">
      <h1 class="add-book__title">Edit book</h1>
      <BookForm
        v-if="book"
        buttonText="Create book"
        @onValidSubmit="onValidSubmit"
        :title="book.title"
        :author="book?.author"
        :imageUrl="book?.imageUrl"
        :description="book?.description"
        :publishDate="book?.publishDate"
      />
    </section>
  </Page>
</template>

<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { Book } from "@/types/Book";
import { useCreateBook, useGetBook } from "@/use/useBooks";
import Page from "@/components/ui/objects/Page.vue";
import BookForm from "@/components/ui/objects/BookForm.vue";

export default {
  components: { Page, BookForm },
  setup() {
    const createBook = useCreateBook();
    const router = useRouter();
    const route = useRoute();
    const book = useGetBook(route.params.id as string);

    const onValidSubmit = async (book: Book) => {
      await createBook(book);
      router.push({ name: "Home" });
    };

    return { onValidSubmit, book };
  },
};
</script>

<style lang="sass"></style>
