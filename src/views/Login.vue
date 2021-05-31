<template>
  <Page position="center">
    <LoginForm @onLogin="onLogin" />
  </Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Page from "@/components/ui/objects/Page.vue";
import LoginForm from "@/components/ui/molecules/LoginForm.vue";

export default defineComponent({
  name: "Login",
  components: { Page, LoginForm },
  setup() {
    const router = useRouter();
    const onLogin = async () => {
      router.push({ name: "Home" });
    };

    return {
      onLogin,
    };
  },
});
</script>
