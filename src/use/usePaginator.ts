import { computed } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export const useChangePage = () => {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  return (goTo?: number) => {
    const page = goTo || route.query?.page || 1;
    router.push({ name: "Home", query: { page: page } });
    store.commit("CHANGE_PAGE", page);
  };
};

export const usePagesLength = () => {
  const store = useStore();
  return computed(() => store.getters.getPagesLength());
};
