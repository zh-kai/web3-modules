export const CHAINS = {
  ETH: 1,
  ROPSTEN: 3,
  RINKEBY: 4,
  GOERLI: 5,
  BSC: 56,
  BSCTEST: 97,
  ARBITRUM_ONE: 42161,
  KILN: 1337802,
} as const;
export type Chain = typeof CHAINS[keyof typeof CHAINS];

export const CHAINS_DETAILS = [
  {
    id: CHAINS.ETH,
    name: "Ethereum",
    explorer: "https://etherscan.io",
  },
  {
    id: CHAINS.ARBITRUM_ONE,
    name: "Arbitrum One",
    explorer: "https://arbiscan.io",
  },
];

export const CHAINS_DETAILS_MAP = Object.fromEntries(
  CHAINS_DETAILS.map((item) => [item.id, item])
);
