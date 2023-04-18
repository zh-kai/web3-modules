import { defineStore } from "pinia";

interface AccountStoreState {
  account: string;
  balance: BigInt;
}

export const useAccountStore = defineStore("account", {
  state: () =>
    ({
      account: "",
      balance: BigInt(0),
    } as AccountStoreState),
  actions: {
    setAccount(account: string) {
      this.account = account;
    },
    setBalance(balance: BigInt) {
      this.balance = balance;
    },
  },
});
