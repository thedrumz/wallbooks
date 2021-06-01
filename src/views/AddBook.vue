<template>
  <Page>
    <section class="add-book">
      <h1 class="add-book__title">Add new book</h1>
      <BookForm buttonText="Create book" @onValidSubmit="onValidSubmit" />
    </section>
  </Page>
</template>

<script lang="ts">
import Page from "@/components/ui/objects/Page.vue";
import BookForm from "@/components/ui/objects/BookForm.vue";

export default {
  components: { Page, BookForm },
  setup() {
    const onValidSubmit = () => {
      console.log("valid submit");
    };

    return { onValidSubmit };
  },
};
</script>

<style lang="sass"></style>
