import { encodeOutpointInput } from "metashrew-runes";
import { createSignal, Component, createResource } from "solid-js";

const fetchRunesByAddress = async (address: string) => {
  const encodedAddress = encodeOutpointInput(address, 0);
  const response = await fetch("http://localhost:8080", {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      method: "metashrew_view",
      params: ["runesbyaddress", encodedAddress],
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await response.json());
  return await response.json();
};

const App: Component = () => {
  const [searchInput, setSearchInput] = createSignal("");
  const [rune, setRune] = createSignal(null);
  //const [runes] = createResource(rune, fetchRunesByAddress);

  const handleSearch = async () => {
    await fetchRunesByAddress(
      "bcrt1p5cyxnuxmeuwuvkwfem96lqzszd02n6xdcjrs20cac6yqjjwudpxqvg32hk"
    );
  };

  return (
    <div class="bg-gradient-1 h-screen p-[15px]">
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
        {[
          { name: "rune1", inscId: "#1234" },
          { name: "rune2", inscId: "#1234" },
          { name: "rune3", inscId: "#1234" },
          { name: "rune4", inscId: "#1234" },
        ].map((asset) => {
          return AssetSquare({ name: asset.name, inscId: asset.inscId });
        })}
      </div>
    </div>
  );
};

export default App;

const AssetSquare: Component = (props: any) => {
  return (
    <div class="border border-black rounded-lg flex flex-col justify-start items-center p-[15px]">
      {/* Square inside the rectangle */}
      <div class="bg-stone-400 w-full aspect-square flex justify-center items-center">
        {props.name}
      </div>
      <span class="bg-black self-start rounded-md px-[2px] py-[2px] text-white mt-[10px]">
        {props.inscId}
      </span>
    </div>
  );
};
