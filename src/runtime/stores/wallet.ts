import { defineStore } from "pinia";
import { Wallet } from "../constants/wallet";
import { Chain } from "../constants/chain";

interface WalletStoreState {
  walletType: Wallet | "";
  connected: boolean;
  chain: Chain | -1;
}

export const useWalletStore = defineStore("wallet", {
  state: () =>
    ({
      walletType: "",
      connected: false,
      chain: -1,
    } as WalletStoreState),
  actions: {
    setWallet(walletType: WalletStoreState["walletType"]) {
      this.walletType = walletType;
    },
    setConnected(connected: boolean) {
      this.connected = connected;
    },
    setChain(chain: WalletStoreState["chain"]) {
      this.chain = chain;
    },
  },
});
