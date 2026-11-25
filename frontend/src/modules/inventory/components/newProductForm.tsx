import { useQuery } from "@tanstack/react-query";
import type { NewProductDraft } from "../types/moviments";
import type { ListCategories } from "../types/categories";
import type { UnitOfMeasure } from "../types/measurementUnits";
import type { ListIva } from "../types/iva";
import { GetCategories } from "../services/categories";
import { GetMeasurements } from "../services/measurementUnits";
import { GetIva } from "../services/iva";
import { Info } from "lucide-react";

interface NewProductFieldsProps {
  draft: NewProductDraft;
  updateDraft: (field: keyof NewProductDraft, value: string) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

function NewProductFields({draft, updateDraft, quantity, setQuantity, description, setDescription}: NewProductFieldsProps) {
  const listCategories = useQuery({queryKey: ['categories'], queryFn: () => GetCategories()});
  const categorie = listCategories.data ?? [];
  const listMeasurementUnits = useQuery({queryKey: ['measurement'], queryFn: () => GetMeasurements()});
  const measurement = listMeasurementUnits.data ?? [];
  const listIva = useQuery({queryKey: ['iva'], queryFn: () => GetIva()});
  const alicuotas = listIva.data ?? [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre del producto
          </label>
          <input
            value={draft.nombre}
            onChange={(event) => updateDraft("nombre", event.target.value)}
            placeholder="Ej: Harina Mary 1Kg"
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Código de barras
          </label>
          <input
            value={draft.codigo}
            onChange={(event) => updateDraft("codigo", event.target.value)}
            placeholder="Ej: 7591473005393"
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Stock mínimo
          </label>
          <input
            type="number"
            min={0}
            value={draft.cantidad_minima}
            onChange={(event) =>
              updateDraft("cantidad_minima", event.target.value)
            }
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={draft.id_categoria}
            onChange={(event) => updateDraft("id_categoria", event.target.value)}
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11"
            disabled={listCategories.isLoading || listCategories.isError}
          >
            <option value="">
              {listCategories.isLoading ? "Cargando..." : "Selecciona una categoría"}
            </option>

            {categorie.map((categorie: ListCategories) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nombre}
              </option>
            ))}
          </select>

          {listCategories.isError &&
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center mb-5">
              <p className="text-md text-red-700 font-semibold flex">Error: Ha ocurrido un error con lascategoriasa! Recargue la pagina o intentelo mas tarde</p>
            </div>
          }
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Unidad de medida
          </label>
          <select
            value={draft.id_medida}
            onChange={(event) => updateDraft("id_medida", event.target.value)}
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11"
            disabled={listMeasurementUnits.isLoading || listMeasurementUnits.isError}
          >
            <option value="">
              {listMeasurementUnits.isLoading ? "Cargando..." : "Selecciona una medida"}
            </option>

            {measurement.map((unit: UnitOfMeasure) => (
              <option key={unit.id} value={unit.id}>
                {unit.nombre} ({unit.abreviatura})
              </option>
            ))}
          </select>

          {listMeasurementUnits.isError &&
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center mb-5">
              <p className="text-md text-red-700 font-semibold flex">Error: Ha ocurrido un error con las unidades de medida! Recargue la pagina o intentelo mas tarde</p>
            </div>
          }
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Precio de compra (USD)
          </label>
          <input
            type="number"
            min={0}
            step="1"
            value={draft.precio_compra}
            onChange={(event) =>
              updateDraft("precio_compra", event.target.value)
            }
            placeholder="0.00"
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Ganancia (%)
          </label>
          <input
            type="number"
            min={0}
            step="0.01"
            value={draft.porcentaje_ganancia}
            onChange={(event) =>
              updateDraft("porcentaje_ganancia", event.target.value)
            }
            placeholder="Ej: 30"
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Alícuota de IVA
          </label>
          <select
            value={draft.iva}
            onChange={(event) => updateDraft("iva", event.target.value)}
            required
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11"
            disabled={listIva.isLoading || listIva.isError}
          >
            <option value="">
              {listIva.isLoading ? "Cargando..." : "Selecciona la alícuota"}
            </option>

            {alicuotas.map((alicuota: ListIva) => (
              <option key={alicuota.id} value={alicuota.id}>
                {alicuota.iva > 0 ? `${alicuota.iva}%` : "Exento (0%)"}
              </option>
            ))}
          </select>

          {listIva.isError &&
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center mb-5">
              <p className="text-md text-red-700 font-semibold flex">Error: Ha ocurrido un error con las alícuotas de IVA! Recargue la pagina o intentelo mas tarde</p>
            </div>
          }
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Cantidad inicial
          </label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Motivo del movimiento (opcional)
          </label>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Si lo dejas vacío se usará: Creación de producto"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción del producto (opcional)
          </label>
          <textarea
            rows={2}
            value={draft.descripcion_producto}
            onChange={(event) => updateDraft("descripcion_producto", event.target.value)}
            placeholder="Detalles adicionales del producto..."
            className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all resize-none py-2.5"
          />
        </div>
      </div>

      <div className="flex items-start gap-2 text-xs text-blue-800 bg-blue-50 border border-blue-100 rounded-xl p-3">
        <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue-600" />
        <p> El producto se crea con la cantidad inicial indicada y queda registrado en el historial como su primer movimiento.</p>
      </div>
    </div>
  );
}

export default NewProductFields;