<template>
  <div>Nuxt module playground! {{ walletName }}</div>
</template>

<script setup lang="ts">
const { walletName } = useWallet();
const tmp = ref("1");
onMounted(() => (walletName.value = "123"));
</script>
