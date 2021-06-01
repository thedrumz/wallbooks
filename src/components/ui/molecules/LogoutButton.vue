<template>
  <Button v-if="isLoggedIn" @click="handleLogout" tag="button">Logout</Button>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { logout } from "@/services/userRepository";
import useLoggedUser from "@/use/useLoggedUser";
import Button from "@/components/ui/atoms/Button.vue";

export default {
  components: { Button },
  setup() {
    const router = useRouter();
    const isLoggedIn = useLoggedUser();

    const handleLogout = () => {
      logout();
      router.push({ name: "Login" });
    };

    return { handleLogout, isLoggedIn };
  },
};
</script>

<style lang="sass" scoped></style>
