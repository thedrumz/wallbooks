<template>
  <div class="home">
    <Page>
      <section class="login">
        <h1>Login</h1>
        <form novalidate @submit.prevent="onSubmit" data-testid="form">
          <label>
            Email
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              required
              v-model="email"
            />
          </label>
          <span v-if="invalidEmail">{{ invalidEmail }}</span>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              v-model="password"
            />
          </label>
          <span v-if="invalidPassword">{{ invalidPassword }}</span>
          <button type="submit">Sign in</button>
        </form>
      </section>
    </Page>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Page from "@/components/ui/objects/Page.vue";

export default defineComponent({
  name: "Login",
  components: { Page },
  setup() {
    const email = ref("");
    const password = ref("");
    const invalidEmail = ref("");
    const invalidPassword = ref("");

    const onSubmit = () => {
      if (!email.value) invalidEmail.value = "Email is required";
      else if (!/^(.+)@(.+)/.test(email.value))
        invalidEmail.value = "Email is invalid";
      else invalidEmail.value = "";

      if (password.value.length < 6)
        invalidPassword.value = "The password must be at least 6 characters";
      else invalidPassword.value = "";
    };

    return { email, password, invalidEmail, invalidPassword, onSubmit };
  },
});
</script>

<style lang="sass" scoped>
@import "@/assets/styles/settings/_variables.sass";
@import "@/assets/styles/tools/_mixins.sass";
.login
  @include center()
</style>
