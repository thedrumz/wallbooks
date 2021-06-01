import { onMounted, Ref, ref } from "vue";
import { getLoggedUser } from "@/services/userRepository";
import { User } from "@/types/User";

export default (): Ref<User | null> => {
  const loggedUser = ref<User | null>(null);
  onMounted(async (): Promise<void> => {
    const user = await getLoggedUser();
    loggedUser.value = user;
  });
  return loggedUser;
};
