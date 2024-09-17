import * as bitcoin from "bitcoinjs-lib";
import {
  encodeBlockHeightInput,
  decodeRunesResponse,
} from "metashrew-runes/lib/src.ts/outpoint";
import { decodeWalletOutput, encodeWalletInput } from "metashrew-runes";

export function isValidBitcoinAddress(address: string): boolean {
  try {
    // Check for mainnet
    bitcoin.address.toOutputScript(address, bitcoin.networks.bitcoin);
    return true;
  } catch (e) {
    // Ignore and try the next network
  }

  try {
    // Check for testnet
    bitcoin.address.toOutputScript(address, bitcoin.networks.testnet);
    return true;
  } catch (e) {
    // Ignore and try the next network
  }

  try {
    // Check for regtest
    bitcoin.address.toOutputScript(address, bitcoin.networks.regtest);
    return true;
  } catch (e) {
    // Ignore
  }

  return false; // If no valid network match, return false
}

export function isValidBitcoinTxId(txid: string): boolean {
  // Check if the string is 64 characters long and contains only hex digits (0-9, a-f, A-F)
  const hexRegex = /^[a-fA-F0-9]{64}$/;
  return hexRegex.test(txid);
}

export const fetchRunesByWallet = async (address: string) => {
  const encodedWallet = encodeWalletInput(address);
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "metashrew_view",
        params: ["runesbyaddress", encodedWallet, "latest"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  const result = decodeWalletOutput(response.result);
  return result;
};

export const fetchRunesByBlockHeight = async (block: number) => {
  const encodedBlock = encodeBlockHeightInput(block);
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "metashrew_view",
        params: ["runesbyheight", encodedBlock, "latest"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  const result = decodeRunesResponse(response.result);
  return result;
};
