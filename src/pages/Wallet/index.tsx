import { Component } from "solid-js";

const Wallet: Component = () => {
  const [searchInput, setSearchInput] = createSignal("");
  const [allRunes, setAllRunes] = createSignal<{
    outpoints: OutPoint[];
    balanceSheet: any[];
  }>({ outpoints: [], balanceSheet: [] });
  // const [runes] = createResource(fetchRunesByWallet);

  return (
    <div class="p-[15px]">
      <h1 class="text-center mb-[10px]">Alkanes Explorer</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allRunes().balanceSheet.map((asset, index) => {
          return AssetSquare({ asset, index });
        })}
      </div>
    </div>
  );
};

export default Wallet;
