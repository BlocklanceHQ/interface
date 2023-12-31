import type { FC, PropsWithChildren } from "react";
import {
  WagmiConfig,
  createConfig,
  configureChains,
  Chain,
  mainnet,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const baseChain: Chain = {
  ...mainnet,
  id: 84531,
  name: "Base Goerli",
  rpcUrls: {
    default: {
      http: ["https://goerli.base.org"],
    },
    public: {
      http: ["https://goerli.base.org"],
    },
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseChain],
  [
    alchemyProvider({
      apiKey: "isUqQYX_Of0e0lxaQnItg2NSkvQy_PSx",
    }),
    publicProvider(),
  ]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "Blocklance",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Binance Wallet",
        shimDisconnect: true,
        getProvider: () =>
          //@ts-expect-error - BinanceChain is not defined in window
          typeof window !== "undefined" ? window.BinanceChain : undefined,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default WalletProvider;
