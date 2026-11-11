import { useState } from "react";
import { ArrowLeftRight, Info, PackagePlus } from "lucide-react";
import type { ListMoviment } from "../types/moviments";
import { GetMoviments } from "../services/moviments";
import { useQuery } from "@tanstack/react-query";
import MovementTypeCard from "../components/movimentTypeCard";
import MovementForm from "../components/movementForm";

const noop = (): void => undefined;

export default function MovementsPage() {
  const NEW_PRODUCT_MOVEMENT = "Entrada nuevo producto";
  const [selected, setSelected] = useState<ListMoviment | null>(null);
  const moviment = useQuery({queryKey: ["moviments"], queryFn: () => GetMoviments()})

  const handleSelect = (movement: ListMoviment) => {
    setSelected(movement);
  };

  return (
    <div className="p-6 bg-[#F7F6F3] min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Movimientos de Inventario
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Selecciona un movimiento y registra el cambio sobre el stock.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 self-start md:self-auto bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Info className="w-3.5 h-3.5 text-emerald-600" />
            Cada movimiento queda en el historial
          </span>
        </div>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-gray-100">
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
              <ArrowLeftRight className="w-5 h-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Tipo de movimiento
              </h2>
              <p className="text-xs text-gray-500">
                Elige qué vas a registrar. El formulario cambia según el
                movimiento.
              </p>
            </div>
          </div>

          <div className="p-5 bg-gray-50/30">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {moviment.data?.map((movement: ListMoviment) => (
                <MovementTypeCard key={movement.id} movement={movement} selected={selected?.id === movement.id} new_product={NEW_PRODUCT_MOVEMENT} onSelect={handleSelect}/>
              ))}
            </div>
          </div>
        </section>

        {selected ? (
          <MovementForm key={selected.id} movement={selected} new_product={NEW_PRODUCT_MOVEMENT} onRegistered={noop} onError={noop}/>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-8 text-center">
            <PackagePlus className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-sm font-semibold text-gray-500 mt-3">
              Selecciona un movimiento para empezar
            </p>
            <p className="text-xs text-gray-400 mt-1">
              El formulario aparecerá aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

