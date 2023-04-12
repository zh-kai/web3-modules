import { ref } from "vue";

export default function () {
  const walletName = ref("");
  return {
    walletName,
  };
}
