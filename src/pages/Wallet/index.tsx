import { Accessor, Component, createResource, createSignal } from "solid-js";
import { useParams } from "@solidjs/router";
import { fetchProtoRunesByWallet, fetchRunesByWallet } from "../../utils";
import { AssetSquare } from "../../App";
import { RuneOutput } from "metashrew-runes";
import { Header } from "../../../components/header";
const Wallet: Component = () => {
  const params = useParams();
  const [runes] = createResource(() => fetchRunesByWallet(params.address));
  const [protorunes] = createResource(() =>
    fetchProtoRunesByWallet(params.address)
  );
  const [checked, setChecked] = createSignal<string[]>([]);
  const allAssets = () => {
    // Return an empty array if both resources are still loading
    if (!runes() || !protorunes()) return [];
    return [
      ...(runes()?.balanceSheet || []),
      ...(protorunes()?.balanceSheet || []),
    ];
  };

  return (
    <div class="p-[15px]">
      <Header />
      <div class="flex flex-row">
        <Filter checked={checked} setChecked={setChecked} />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {allAssets()?.map((asset: RuneOutput, index: number) => {
            return AssetSquare({ asset, index });
          })}
        </div>
      </div>
    </div>
  );
};

interface FilterProps {
  checked: Accessor<string[]>; // Define the type of `checked` (in this case, an array)
  setChecked: (value: string[]) => void; // Setter function type for Solid.js
}

const Filter: Component<FilterProps> = (props) => {
  const { checked, setChecked } = props;
  const assetTypes = ["Runes", "Protorunes", "Alkanes"];
  return (
    <div class="p-[15px] w-[15%]">
      <h1 class="text-left mb-[10px]">Filter</h1>
      <ul class="flex flex-col items-start">
        {assetTypes.map((type: string, index: number) => {
          return (
            <div class="flex items-center cursor-pointer">
              <span
                onClick={() => {
                  const isChecked = checked().includes(type);
                  if (isChecked)
                    setChecked([...checked()].filter((type) => type !== type));
                  else setChecked([...checked(), type]);
                }}
              >
                [ <span>{checked().includes(type) ? "X" : ""}</span> ] {type}
              </span>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Wallet;
