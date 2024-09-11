import {
  OutPoint,
  decodeWalletOutput,
  encodeOutpointInput,
} from "metashrew-runes";
import { encodeWalletInput } from "metashrew-runes/lib/src.ts/wallet";
import { createSignal, Component, createResource } from "solid-js";

const fetchRunesByWallet = async (address: string) => {
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

const App: Component = () => {
  const [searchInput, setSearchInput] = createSignal("");
  const [allRunes, setAllRunes] = createSignal<{
    outpoints: OutPoint[];
    balanceSheet: any[];
  }>({ outpoints: [], balanceSheet: [] });
  // const [runes] = createResource(fetchRunesByWallet);

  const handleSearch = async () => {
    const ret = await fetchRunesByWallet(searchInput());
    console.log(ret);
    setAllRunes(ret);
  };

  return (
    <div class="p-[15px]">
      <h1 class="text-center mb-[10px]">Alkanes Explorer</h1>

      {/* Search bar */}
      <div class="text-center mb-[20px] flex flex-row justify-center ">
        <span class="rounded-[5px] border border-gray-300 p-[3px]">
          <input
            type="text"
            value={searchInput()}
            onInput={(e) =>
              setSearchInput((e.target as HTMLInputElement).value)
            }
            placeholder="Search by block number or transaction ID"
            class="p-[10px] text-[16px] w-[410px] rounded-[5px]"
          />
          <button
            onClick={handleSearch}
            class="p-[10px] text-[16px] bg-black text-white rounded-[5px] hover:bg-lime-200 hover:text-black"
          >
            Search
          </button>
        </span>
      </div>

      {/* Responsive Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allRunes().balanceSheet.map((asset, index) => {
          return AssetSquare({ asset, index });
        })}
      </div>
    </div>
  );
};

export default App;

const AssetSquare: Component = (props: any) => {
  const rune = props?.asset.rune;
  const balance = props?.asset.balance;

  return (
    <div class="border border-black rounded-lg flex flex-col justify-start items-center p-[15px]">
      {/* Square inside the rectangle */}
      <div class="bg-stone-400 w-full aspect-square flex justify-center items-center flex-col">
        <span>{"Name: " + rune.name}</span>
        <span>{"Divisibility: " + rune.divisibility}</span>
        <span>{"Spacers: " + rune.spacers}</span>
        <span>{"Symbol: " + rune.symbol}</span>
      </div>
      <div class="flex flex-row justify-between w-full">
        <span class="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
          {"Rune Id: " + rune.id}
        </span>
        <span class="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
          {"Balance:" + Number(balance)}
        </span>
      </div>
    </div>
  );
};
