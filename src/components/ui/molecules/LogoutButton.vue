<template>
  <Button v-if="isLoggedIn" @click="handleLogout" tag="button">Logout</Button>
</template>

<script lang="ts">
import { onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { getLoggedUser, logout } from "@/services/userRepository";
import Button from "@/components/ui/atoms/Button.vue";

export default {
  components: { Button },
  setup() {
    const router = useRouter();
    const isLoggedIn = checkIsLoggedIn();

    const handleLogout = () => {
      logout();
      router.push({ name: "Login" });
    };

    return { handleLogout, isLoggedIn };
  },
};

const checkIsLoggedIn = (): Ref<boolean> => {
  const isLoggedIn = ref(false);
  onMounted(async (): Promise<void> => {
    const user = await getLoggedUser();
    isLoggedIn.value = !!user;
  });
  return isLoggedIn;
};
</script>

<style lang="sass" scoped></style>
