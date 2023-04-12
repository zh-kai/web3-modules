export const WALLETS = {
  METAMASK: "MetaMask",
  COINBASE: "Coinbase",
  WALLETCONNECT: "WalletConnect",
  IMTOKEN: "imToken",
  TOKENPOCKET: "TokenPocket",
  MATHWALLET: "MathWallet",
  TRUSTWALLET: "TrustWallet",
  BITKEEP: "BitKeep",
  FRONTIER: "Frontier",
  OKX: "OKX",
} as const;

export type Wallet = typeof WALLETS[keyof typeof WALLETS];

export const WALLETS_WEBSITE: Partial<Record<Wallet, string>> = {
  [WALLETS.METAMASK]: "https://metamask.io/",
  [WALLETS.IMTOKEN]: "https://token.im/",
  [WALLETS.TOKENPOCKET]: "https://www.tokenpocket.pro/",
  [WALLETS.MATHWALLET]: "https://mathwallet.org/",
  [WALLETS.TRUSTWALLET]: "https://trustwallet.com/",
  [WALLETS.BITKEEP]: "https://bitkeep.com/",
  [WALLETS.FRONTIER]: "https://www.frontier.xyz/",
  [WALLETS.OKX]: "https://www.okx.com/",
};
