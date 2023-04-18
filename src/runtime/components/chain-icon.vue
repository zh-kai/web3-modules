<template>
  <img v-if="chain === CHAINS.ETH" src="../../assets/eth.svg" alt="" />
  <img v-else-if="chain === CHAINS.POLYGON" src="../../assets/polygon.svg" alt="" />
</template>

<script setup lang="ts">
import { Chain } from "../constants/chain";

defineProps<{ chain: Chain | -1 }>();
</script>

<style></style>
