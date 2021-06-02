<template>
  <form
    class="book-form"
    novalidate
    @submit.prevent="onSubmit"
    data-testid="form"
  >
    <section class="book-form__content">
      <CustomInput
        label="Book title"
        type="text"
        name="title"
        placeholder="The lord of the rings"
        required
        v-model:value="book.title"
        :triggerValidation="triggerValidation"
        :validator="requiredValidator"
      />
      <CustomInput
        label="Author"
        type="text"
        name="author"
        placeholder="J.R.R. Tolkien"
        required
        v-model:value="book.author"
        :triggerValidation="triggerValidation"
        :validator="requiredValidator"
      />
      <CustomInput
        label="Book image (URL)"
        type="text"
        name="imageUrl"
        placeholder="https://lord-of-the-rings.com/cover.jpg"
        required
        v-model:value="book.imageUrl"
        :triggerValidation="triggerValidation"
        :validator="requiredValidator"
      />
      <CustomInput
        label="Book publish date"
        type="date"
        name="publishDate"
        required
        v-model:value="publishDateRef"
        :triggerValidation="triggerValidation"
        :validator="requiredValidator"
      />
      <CustomTextarea
        label="Description"
        :rows="5"
        name="description"
        placeholder="Bilbo celebrates his 111th birthday and leaves the Shire suddenly without warning, leaving the Ring to Frodo Baggins, his cousin[c] and heir. Neither hobbit is aware of the Ring's nature, but the wizard Gandalf realises that it is a Ring of Power."
        required
        v-model:value="book.description"
        :triggerValidation="triggerValidation"
        :validator="requiredValidator"
      />
    </section>
    <footer class="book-form__footer">
      <Button class="book-form__btn" tag="button" theme="primary">
        {{ buttonText }}
      </Button>
    </footer>
  </form>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { toISO } from "@/utils/dates";
import CustomInput from "@/components/ui/atoms/CustomInput.vue";
import CustomTextarea from "@/components/ui/atoms/CustomTextarea.vue";
import Button from "@/components/ui/atoms/Button.vue";
import { Book } from "@/types/Book";

export default defineComponent({
  name: "UserForm",
  components: { CustomInput, Button, CustomTextarea },
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    publishDate: {
      type: Date,
      default: null,
    },
    buttonText: {
      type: String,
      default: "",
    },
  },
  emits: ["onValidSubmit"],
  setup(props, { emit }) {
    const triggerValidation = ref(false);
    const book = ref<Book>({ ...props });
    const publishDateRef = ref(
      props.publishDate ? toISO(props.publishDate) : ""
    );

    const requiredValidator = (value: string): string => {
      if (!value) {
        return "Field is required";
      } else {
        return "";
      }
    };

    const onSubmit = () => {
      triggerValidation.value = true;
      book.value.publishDate = new Date(publishDateRef.value);

      if (!validateFields(book)) return;

      emit("onValidSubmit", book.value);
    };

    return {
      onSubmit,
      book,
      publishDateRef,
      requiredValidator,
      triggerValidation,
    };
  },
});

const validateFields = (book: Ref<Book>) => {
  if (!book.value.title) return false;
  if (!book.value.imageUrl) return false;
  if (!book.value.author) return false;
  if (!book.value.description) return false;
  if (!book.value.publishDate) return false;
  return true;
};
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.book-form
  position: relative
  width: 90%
  margin: 0 auto
  padding: 2.5rem
  background: $background-white
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
  &__content
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))
    gap: $spacing-m
    @media (max-width: $tablet - 1)
      grid-template-columns: 1fr
  &__title
    color: $text-inverted-color
  &__footer
    display: flex
    justify-content: center
    align-items: center
    padding-top: 2.5rem
</style>
