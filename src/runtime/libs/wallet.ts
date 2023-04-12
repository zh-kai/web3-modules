import { BrowserProvider, JsonRpcSigner } from "ethers";

export default {
  origin: undefined,
  provider: undefined,
  signer: undefined,
} as {
  origin?: any;
  provider?: BrowserProvider;
  signer?: JsonRpcSigner;
};
