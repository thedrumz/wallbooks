<template>
  <Notification v-if="signupSuccess" message="Welcome to WallBooks !!" />
  <Notification v-if="signupError" :message="signupError" type="error" />
  <UserForm
    class="signup"
    title="Create account"
    buttonText="Sign up"
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
        :validator="passwordValidator(password)"
      />
      <CustomInput
        label="Repeat password"
        type="password"
        name="re-password"
        placeholder="Password"
        theme="primary"
        v-model:value="rePassword"
        :triggerValidation="triggerValidation"
        :validator="passwordValidator(rePassword)"
      />
    </template>
    <template v-slot:footer>
      <div class="login">
        <p class="login__copy">Already have an account ?</p>
        <Button
          class="login__btn"
          tag="router-link"
          theme="secondary"
          to="/login"
        >
          Login
        </Button>
      </div>
    </template>
  </UserForm>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { createUser } from "@/services/userRepository";
import UserForm from "@/components/ui/objects/UserForm.vue";
import CustomInput from "@/components/ui/atoms/CustomInput.vue";
import Button from "@/components/ui/atoms/Button.vue";
import Notification from "@/components/ui/atoms/Notification.vue";

export default defineComponent({
  name: "Login",
  components: { UserForm, CustomInput, Button, Notification },
  emits: ["onSignup"],
  setup(props, { emit }) {
    const email = ref("");
    const password = ref("");
    const rePassword = ref("");
    const triggerValidation = ref(false);
    const signupSuccess = ref(false);
    const signupError = ref("");

    const emailValidator = (): string => {
      if (!email.value) {
        return "Email is required";
      } else if (!/^(.+)@(.+)/.test(email.value)) {
        return "Email is invalid";
      } else {
        return "";
      }
    };

    const passwordValidator = (field: string) => (): string => {
      if (field.length < 6) {
        return "The password must be at least 6 characters";
      } else if (password.value !== rePassword.value) {
        return "Passwords doesn't match";
      } else {
        return "";
      }
    };

    const onSubmit = async () => {
      const isValidForm =
        !emailValidator() &&
        !passwordValidator(password.value)() &&
        !passwordValidator(rePassword.value)();
      triggerValidation.value = true;

      if (isValidForm) {
        try {
          await createUser({ email: email.value, password: password.value });
          signupSuccess.value = true;
          signupError.value = "";
          emit("onSignup");
        } catch (error) {
          signupError.value = error.message;
        }
      }
    };

    return {
      email,
      password,
      rePassword,
      onSubmit,
      triggerValidation,
      emailValidator,
      passwordValidator,
      signupSuccess,
      signupError,
    };
  },
});
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
.signup
  background: linear-gradient(45deg,#398bbc,#43cfa8)
  &__btn
    margin-top: 2rem
  .login
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
