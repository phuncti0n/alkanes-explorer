import { Provider } from "@oyl/sdk";
import { bitcoin, regtest } from "bitcoinjs-lib/src/cjs/networks";

export const defaultProvider = {
  bitcoin: new Provider({
    url: "https://mainnet.sandshrew.io",
    projectId: process.env.SANDSHREW_PROJECT_ID!,
    network: bitcoin,
    networkType: "mainnet",
    apiUrl: "https://staging-api.oyl.gg",
  }),
  regtest: new Provider({
    url: "http://localhost:3000",
    projectId: "regtest",
    network: regtest,
    networkType: "regtest",
    apiUrl: "https://staging-api.oyl.gg",
  }),
};
