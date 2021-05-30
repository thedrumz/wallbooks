<template>
  <Page position="center">
    <section class="login">
      <span class="login-success" v-if="loginSuccess">Login success !!</span>
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
        <ValidationError v-if="loginError">{{ loginError }}</ValidationError>
        <Button class="login__btn" tag="button" theme="primary">Sign in</Button>
      </form>
      <div class="signup">
        <p class="signup__copy">Don't have an account ?</p>
        <Button
          class="signup__btn"
          tag="router-link"
          theme="secondary"
          to="/sign-up"
        >
          Sign up
        </Button>
      </div>
    </section>
  </Page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Page from "@/components/ui/objects/Page.vue";
import CustomInput from "@/components/ui/atoms/CustomInput.vue";
import Button from "@/components/ui/atoms/Button.vue";
import ValidationError from "@/components/ui/atoms/ValidationError.vue";
import { loginUser } from "@/services/userRepository";

export default defineComponent({
  name: "Login",
  components: { Page, CustomInput, Button, ValidationError },
  setup() {
    const email = ref("");
    const password = ref("");
    const triggerValidation = ref(false);
    const loginSuccess = ref(false);
    const loginError = ref("");

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

    const onSubmit = async () => {
      const isValidForm = !emailValidator() && !passwordValidator();
      triggerValidation.value = true;

      if (isValidForm) {
        try {
          await loginUser({ email: email.value, password: password.value });
          loginSuccess.value = true;
          loginError.value = "";
        } catch (error) {
          loginError.value = error.message;
        }
      }
    };

    return {
      email,
      password,
      onSubmit,
      triggerValidation,
      emailValidator,
      passwordValidator,
      loginSuccess,
      loginError,
    };
  },
});
</script>

<style lang="sass" scoped>
@import "@/assets/styles/tools/_mixins.sass";
@import "@/assets/styles/settings/_variables.sass";
.login
  position: relative
  width: 32rem
  @include center()
  margin: 0 auto
  padding-bottom: 2.5rem
  background: linear-gradient(45deg,#43cfa8,#398bbc)
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)
  &__title
    color: $text-inverted-color
  &__form
    width: 60%
    display: flex
    flex-direction: column
  &__btn
    margin-top: 2rem
  .login-success
    position: absolute
    top: -26px
    background-color: white
    border: 1px solid $primary-color
    padding: 8px 25px
    text-transform: uppercase
    border-radius: 4px
    font-weight: 700
    color: $primary-color
  .signup
    width: 60%
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: .5rem
    &__copy
      color: $text-inverted-color
</style>
