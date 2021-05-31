<template>
  <Page position="center">
    <SignupForm @onSignup="onSignup"> </SignupForm>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import Page from "@/components/ui/objects/Page.vue";
import SignupForm from "@/components/ui/molecules/SignupForm.vue";

export default defineComponent({
  name: "Signup",
  components: { Page, SignupForm },
  setup() {
    const router = useRouter();
    const onSignup = async () => {
      router.push({ name: "Home" });
    };

    return {
      onSignup,
    };
  },
});
</script>
