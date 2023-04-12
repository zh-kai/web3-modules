<template>
  <div>
    <p>
      Nuxt module playground! {{ walletStore.walletType }}
      {{ walletStore.account }}
    </p>
    <button @click="connectWallet('WalletConnect')">Connect</button>
    <button @click="signMessage">Sign message</button>
  </div>
</template>

<script setup lang="ts">
const { wallet, connectWallet } = useWallet();
const walletStore = useWalletStore();

const signMessage = async () => {
  if (!wallet.signer) return;

  const message = "test message";
  const result = await wallet.signer!.signMessage(message);
  console.log("sign result", result);
};
</script>
