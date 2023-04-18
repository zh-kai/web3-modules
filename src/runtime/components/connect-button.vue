<template>
  <div v-if="!walletStore.connected">
    <button
      class="py-2 px-4 bg-blue-500 text-white font-medium shadow-normal rounded-xl transform transition duration-200 hover:scale-[1.025] active:scale-[0.975]"
      @click="connectWallet('MetaMask')"
    >
      Connect Wallet
    </button>
  </div>

  <div v-else class="flex gap-3 font-semibold">
    <button
      class="flex items-center gap-2 px-3 bg-white shadow-normal rounded-xl transform transition duration-200 hover:scale-[1.025] active:scale-[0.975]"
    >
      <ChainIcon :chain="walletStore.chain" class="w-5" />
      <span>{{ CHAINS_DETAILS_MAP[walletStore.chain].name }}</span>
    </button>

    <button
      class="flex items-center gap-1 pl-3 bg-white shadow-normal rounded-xl transform transition duration-200 hover:scale-[1.025] active:scale-[0.975]"
    >
      <span>
        {{ formatUnits(accountStore.balance, 18, 4) }}
      </span>
      <span>{{ CHAINS_DETAILS_MAP[walletStore.chain].token }}</span>
      <div class="py-1 px-3 bg-gray-100 border-4 border-white rounded-xl">
        {{ formatAddress(accountStore.account) }}
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { formatAddress, formatUnits } from '../utils/formatter'

const accountStore = useAccountStore()
const walletStore = useWalletStore()
const { connectWallet } = useWallet()
</script>
