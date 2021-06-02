<template>
  <Notification v-if="loginSuccess" message="Login success !!" />
  <Notification v-if="loginError" :message="loginError" type="error" />
  <UserForm
    class="login"
    title="Login"
    buttonText="Sign in"
    :onSubmit="onSubmit"
  >
    <template v-slot:content>
      <CustomInput
        label="Email"
        type="text"
        name="email"
        placeholder="Enter your email"
        theme="primary"
        v-model:value="email"
        :triggerValidation="triggerValidation"
        :validator="emailValidator"
      />
      <CustomInput
        label="Password"
        type="password"
        name="password"
        placeholder="Password"
        theme="primary"
        v-model:value="password"
        :triggerValidation="triggerValidation"
        :validator="passwordValidator"
      />
    </template>
    <template v-slot:footer>
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
    </template>
  </UserForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { loginUser } from "@/services/userRepository";
import UserForm from "@/components/ui/objects/UserForm.vue";
import CustomInput from "@/components/ui/atoms/CustomInput.vue";
import Button from "@/components/ui/atoms/Button.vue";
import Notification from "@/components/ui/atoms/Notification.vue";

export default defineComponent({
  name: "Login",
  components: { UserForm, CustomInput, Button, Notification },
  emits: ["onLogin"],
  setup(props, { emit }) {
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
          emit("onLogin");
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
@import "@/assets/styles/settings/_variables.sass";
.login
  &__btn
    margin-top: 2rem
  .signup
    width: 60%
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    align-items: center
    margin-top: .5rem
    &__copy
      margin-right: .5rem
      color: $text-inverted-color
</style>
