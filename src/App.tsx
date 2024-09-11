import { createSignal, Component } from "solid-js";

type Block = {
  blockNumber: number;
  timestamp: string;
  miner: string;
  txCount: number;
  transactions: Array<string>; // Could be a detailed transaction object
};

const mockBlockData: Block = {
  blockNumber: 1234567,
  timestamp: "2024-09-06 10:45:00",
  miner: "0x1234...abcd",
  txCount: 3,
  transactions: ["0xabc123...def456", "0x789xyz...789abc", "0xdef456...abc123"],
};

const App: Component = () => {
  const [searchInput, setSearchInput] = createSignal("");
  const [block, setBlock] = createSignal<Block | null>(null);
  const [error, setError] = createSignal("");

  const handleSearch = () => {
    // In a real-world app, you'd fetch data from an API using the search input
    // For now, we simulate the block data
    if (searchInput() === "1234567") {
      setBlock(mockBlockData);
      setError("");
    } else {
      setBlock(null);
      setError("Block or transaction not found.");
    }
  };

  return (
    <div class="bg-gradient-1 h-screen p-[15px] ">
      <h1 style={{ "text-align": "center" }}>Alkanes Explorer</h1>

      {/* Search bar */}
      <div class="text-center mb-[20px] flex flex-row justify-center">
        <input
          type="text"
          value={searchInput()}
          onInput={(e) => setSearchInput((e.target as HTMLInputElement).value)}
          placeholder="Search by block number or transaction ID"
          style={{
            padding: "10px",
            "font-size": "16px",
            width: "300px",
            "border-radius": "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            "margin-left": "10px",
            "font-size": "16px",
            cursor: "pointer",
            background: "#007bff",
            color: "#fff",
            border: "none",
            "border-radius": "5px",
          }}
        >
          Search
        </button>
      </div>

      <div class="grid sm:grid-cols-2 sm:gap-2 lg:gap:4 lg:grid-cols-3">
        {[
          { name: "rune1", inscId: "#1234" },
          { name: "rune2", inscId: "#1234" },
          { name: "rune3", inscId: "#1234" },
          { name: "rune4", inscId: "#1234" },
        ].map((asset) => {
          return AssetSquare({ name: asset.name, inscId: asset.inscId });
        })}
      </div>

      {/* Error message */}
      {error() && (
        <p
          style={{ color: "red", "text-align": "center", "margin-top": "20px" }}
        >
          {error()}
        </p>
      )}
    </div>
  );
};

export default App;

const AssetSquare: Component = (props: any) => {
  return (
    <div class=" aspect-square border border-[1px] border-black sm:h-[235px] md:h-[300px] rounded-lg text-black flex flex-col justify-center items-start p-[15px]">
      <span class="bg-stone-400 flex flex-row justify-center items-center w-full aspect-square">
        {props.name}
      </span>
      <span class="bg-black rounded-md px-[1px] py-[2px] text-white mt-[10px]">
        {props.inscId}
      </span>
    </div>
  );
};
