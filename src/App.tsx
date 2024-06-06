import { osmosis, osmosisAssetList } from "@nabla-studio/chain-registry";
import { QuirksConfig } from "@quirks/react";
import { Config } from "@quirks/store";
import { keplrExtension, leapExtension } from "@quirks/wallets";
import type { PropsWithChildren } from "react";

// Setup the configuration
const config: Config = {
  wallets: [keplrExtension, leapExtension], // use a list of wallet, like keplr and leap, from wallets
  chains: [osmosis], // use a list of chains, like osmosis, from chain-registry
  assetsLists: [osmosisAssetList], // use a list of assetlist, like the osmosis one, from chain-registry
};

export const App = ({ children }: PropsWithChildren<unknown>) => {
  // Use the component
  return <QuirksConfig config={config}>{children}</QuirksConfig>;
};