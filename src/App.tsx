import { OutPoint } from "metashrew-runes";
import { createSignal, Component, createResource } from "solid-js";
import {
  fetchRunesByBlockHeight,
  fetchRunesByWallet,
  isValidBitcoinAddress,
  isValidBitcoinTxId,
} from "./utils";

const App: Component = () => {
  const [searchInput, setSearchInput] = createSignal("");
  const [allRunes, setAllRunes] = createSignal<{
    outpoints: OutPoint[];
    balanceSheet: any[];
  }>({ outpoints: [], balanceSheet: [] });
  const [runes] = createResource(() => fetchRunesByBlockHeight(263));

  const handleSearch = async () => {
    const input = searchInput();
    const isAddress = isValidBitcoinAddress(input);
    const isBlock = !isNaN(Number(input));
    const isTxn = isValidBitcoinTxId(input);
    if (isAddress) {
      const ret = await fetchRunesByWallet(searchInput());
      console.log(ret);
      setAllRunes(ret);
    }

    // if (isBlock) {
    //   const ret = await fetchRunesByBlockHeight(Number(input));
    //   console.log(ret);
    //   setAllRunes(ret);
    // }

    // if (isTxn) {
    //   const ret = await fetchRunesByTxn(input);
    //   console.log(ret);
    //   setAllRunes(ret);
    // }
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
        {runes()?.runes?.map((asset, index) => {
          return BlockAssetSquare({ asset, index });
        })}
      </div>
    </div>
  );
};

export default App;

export const AssetSquare: Component = (props: any) => {
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

export const BlockAssetSquare: Component = (props: any) => {
  const rune = props?.asset;

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
          {"Block: " + rune.runeId.split(":")[0]}
        </span>
        <span class="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
          {"Tx #: " + rune.runeId.split(":")[1]}
        </span>
      </div>
    </div>
  );
};
