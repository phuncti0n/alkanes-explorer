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
    <div style={{ padding: "20px", "font-family": "Arial, sans-serif" }}>
      <h1 style={{ "text-align": "center" }}>Alkanes Explorer</h1>

      {/* Search bar */}
      <div style={{ "text-align": "center", "margin-bottom": "20px" }}>
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

      {/* Block information */}
      {block() && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            "border-radius": "10px",
          }}
        >
          <h2>Block Details</h2>
          <a href={"/block/" + block()?.blockNumber}>
            <strong>Block Number:</strong> {block()?.blockNumber}
          </a>
          <p>
            <strong>Timestamp:</strong> {block()?.timestamp}
          </p>
          <p>
            <strong>Miner:</strong> {block()?.miner}
          </p>
          <p>
            <strong>Transaction Count:</strong> {block()?.txCount}
          </p>

          {/* Transactions */}
          <h3>Transactions</h3>
          <ul>
            {block()?.transactions.map((tx) => (
              <li>{tx}</li>
            ))}
          </ul>
        </div>
      )}

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
