import * as bitcoin from "bitcoinjs-lib";
import {
  encodeBlockHeightInput,
  decodeRunesResponse,
} from "metashrew-runes/lib/src.ts/outpoint";
import { decodeWalletOutput, encodeWalletInput } from "metashrew-runes";
import {
  encodeProtorunesWalletInput,
  decodeRuntimeOutput,
} from "protorune/lib/src.ts/wallet";
import { getAddressType } from "@oyl/sdk";

export function isValidBitcoinAddress(address: string): boolean {
  const valid = getAddressType(address);
  if (valid) {
    return true;
  }
  return false;
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
  console.log(result);
  return result;
};

export const fetchProtoRunesByWallet = async (address: string) => {
  console.log(address);
  const encodedWallet = encodeProtorunesWalletInput(address, 64n);
  const response = await (
    await fetch("http://localhost:8080", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "metashrew_view",
        params: ["protorunesbyaddress", encodedWallet, "latest"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  const result = decodeWalletOutput(response.result);
  console.log(result);
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

export const getCurrentBlock = async () => {
  const response = await (
    await fetch("http://localhost:3000/v1/regtest", {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "btc_getblockcount",
        params: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).json();
  return response.result;
};

export const fetchRunesByCurrentBlockHeight = async () => {
  const currentBlock = await getCurrentBlock();
  console.log(currentBlock);
  const encodedBlock = encodeBlockHeightInput(await getCurrentBlock());
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
  console.log(result);
  return result;
};
