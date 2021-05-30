<template>
  <div class="home">
    <Page position="center">
      <section class="login">
        <h1 class="login__title">Login</h1>
        <form
          class="login__form"
          novalidate
          @submit.prevent="onSubmit"
          data-testid="form"
        >
          <CustomInput
            label="Email"
            type="text"
            name="email"
            placeholder="Enter your email"
            v-model:value="email"
            :triggerValidation="triggerValidation"
            :validator="emailValidator"
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            v-model:value="password"
            :triggerValidation="triggerValidation"
            :validator="passwordValidator"
          />
          <Button class="login-btn" tag="button" theme="primary"
            >Sign in</Button
          >
        </form>
      </section>
    </Page>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Page from "@/components/ui/objects/Page.vue";
import CustomInput from "@/components/ui/atoms/CustomInput.vue";
import Button from "@/components/ui/atoms/Button.vue";

export default defineComponent({
  name: "Login",
  components: { Page, CustomInput, Button },
  setup() {
    const email = ref("");
    const password = ref("");
    const triggerValidation = ref(false);

    const emailValidator = (): string => {
      if (!email.value) {
        return "Email is required";
      } else if (!/^(.+)@(.+)/.test(email.value)) {
        return "Email is invalid";
      } else {
        return "";
      }
    };

    const passwordValidator = (): string => {
      if (password.value.length < 6) {
        return "The password must be at least 6 characters";
      } else {
        return "";
      }
    };

    const onSubmit = () => {
      triggerValidation.value = true;
    };

    return {
      email,
      password,
      onSubmit,
      triggerValidation,
      emailValidator,
      passwordValidator,
    };
  },
});
</script>

<style lang="sass" scoped>
@import "@/assets/styles/tools/_mixins.sass";
@import "@/assets/styles/settings/_variables.sass";
.login
  width: 30rem
  @include center()
  margin: 0 auto
  padding-bottom: 2.5rem
  background: linear-gradient(45deg,#43cfa8,#398bbc)
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
  &__title
    color: $text-inverted-color
  &__form
    width: 50%
    display: flex
    flex-direction: column
  .login-btn
    margin-top: 2rem
</style>
