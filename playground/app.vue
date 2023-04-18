<template>
  <div class="min-h-screen p-6 bg-gray-50">
    <div class="mb-4">
      <ConnectButton />
    </div>

    <!-- <button class="py-2 px-4 bg-white shadow-lg rounded-md" @click="signMessage">Sign</button> -->

    <div class="flex flex-col gap-6 my-6">
      <p v-for="i in 5" :key="i">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus assumenda, at eius error, deserunt, nulla
        ullam vitae dicta a dignissimos consequuntur ex neque nam recusandae tempora nisi obcaecati id necessitatibus?
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAddress } from 'ethers'
const { wallet } = useWallet()
const accountStore = useAccountStore()

const signMessage = async () => {
  if (!wallet.signer) return

  const nonce = await wallet.signer.getNonce()

  const message = `service.invalid wants you to sign in with your Ethereum account:
${getAddress(accountStore.account)}

I accept the ServiceOrg Terms of Service: https://service.invalid/tos

URI: https://service.invalid/login
Version: 1
Chain ID: 1
Nonce: 00000001
Issued At: 2021-09-30T16:25:24Z`

  const result = await wallet.signer!.signMessage(message)
  console.log('sign result', result)
}
</script>
