import type { ListMoviment } from "../types/moviments";
import { CheckCircle2, PackagePlus, ArrowUpRight, ArrowDownLeft, ArrowLeftRight} from "lucide-react";
import { isSalidaName, isEntradaName, movementTone, movementHelper } from "../helpers/movementHelpers";

interface MovementTypeCardProps {
  movement: ListMoviment;
  selected: boolean;
  new_product: string;
  onSelect: (movement: ListMoviment) => void;
}

function MovementTypeCard({movement, selected, new_product, onSelect}: MovementTypeCardProps) {
  const tone = movementTone(movement.nombre, new_product);

  const Icon =
    movement.nombre === new_product
      ? PackagePlus
      : isSalidaName(movement.nombre)
        ? ArrowUpRight
        : isEntradaName(movement.nombre)
          ? ArrowDownLeft
          : ArrowLeftRight;

  return (
    <button type="button" onClick={() => onSelect(movement)}
      className={`text-left rounded-xl border p-4 transition-all duration-350 cursor-pointer ${selected
          ? "border-emerald-400 bg-emerald-50/60 ring-2 ring-emerald-500/15 shadow-sm"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"}`}>
      <div className="flex items-start justify-between gap-2">
        <span className={`p-2 rounded-lg border ${tone.icon}`}>
          <Icon className="w-5 h-5" />
        </span>
        {selected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
      </div>

      <p className="mt-3 text-sm font-bold text-gray-900 leading-snug">
        {movement.nombre}
      </p>
      <p className="mt-0.5 text-[11px] text-gray-500">
        {movementHelper(movement.nombre, new_product)}
      </p>
    </button>
  );
}

export default MovementTypeCard;