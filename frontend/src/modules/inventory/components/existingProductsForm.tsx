import type { GetInventoryCatalog } from "../types/inventoryInterfaces";
import { Minus, Package, Plus, Search, TriangleAlert, X, PackageXIcon, GlobeX } from "lucide-react";
import { GetProducts } from "../services/inventory";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

export interface ExistingProductFieldsProps {
  product: GetInventoryCatalog | null;
  setProduct: (product: GetInventoryCatalog | null) => void;
  quantity: string;
  setQuantity: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  isSalida: boolean;
  currentStock: number;
  resultingStock: number;
  insufficient: boolean;
  amount: number;
}

function ExistingProductFields({product, setProduct, quantity, setQuantity, description, setDescription, isSalida, currentStock, resultingStock, insufficient, amount}: ExistingProductFieldsProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ref, setRef] = useState<HTMLInputElement | null>();
  const [q, setQ] = useState("");
  const productsData = useQuery({queryKey: ["products", q], queryFn: () => GetProducts(q)})
  const productsList = productsData.data ?? [];
  console.log(productsList)

  const putEmpty = () => {
    const reference = inputRef.current;
    setRef(reference)
    if(reference != null){
      reference.value = "";
      setQ("");
    }
    return
  }

  function temporizatorQ(q: string){
    setQ(q);
  }

  const decrease = () => {
    setQuantity(String(Math.max(1, (Number(quantity) || 1) - 1)));
  };

  const increase = () => {
    setQuantity(String((Number(quantity) || 0) + 1));
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Producto
        </label>

        {product ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-emerald-600" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {product.nombre}
                </p>
                <p className="text-[11px] font-mono text-gray-400 truncate">
                  {product.product_codigo_barra}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-gray-700 bg-white border border-gray-200 rounded-full px-2.5 py-1">
                {product.cantidad} Unid.
              </span>

              <button type="button" onClick={() => setProduct(null)} className="cursor-pointer text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                Cambiar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                ref={inputRef}
                onChange={(event) => {setTimeout(() => temporizatorQ(event.target.value), 2000); }}
                placeholder="Buscar por nombre o código de barras..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all h-11 pl-9 pr-9"
              />

              {ref?.value != "" && (
                <button type="button" onClick={() => putEmpty()} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label="Limpiar búsqueda">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {q.length < 2 ? (
              <p className="text-md text-gray-700 mt-2">
                Escribe al menos 2 letras para buscar.
              </p>
            ) : productsData.isLoading ? (
              <p className="text-xs text-gray-400 mt-2">Buscando...</p>
            ) : productsData.isError ? (
             <div className="flex mt-3 min-h-15 max-h-64 overflow-y-auto items-center justify-center-safe rounded-xl border border-gray-100 divide-y divide-gray-100">
                <p className="text-md text-red-500">
                  No se pudo buscar productos.
                </p>
                <GlobeX className="w-6 h-6 ml-1.5 text-red-500" />
              </div>
            ) : productsList.length === 0 ? (
              <div className="flex mt-3 min-h-15 max-h-64 overflow-y-auto items-center justify-center-safe rounded-xl border border-gray-100 divide-y divide-gray-100">
                <p className="text-md text-gray-700">
                  No se encontraron resultados.
                </p>
                <PackageXIcon className="w-6 h-6 ml-1.5 text-gray-700" />
              </div>
            ) : (
              <div className="mt-3 max-h-64 overflow-y-auto rounded-xl border border-gray-100 divide-y divide-gray-100">
                {productsList.map((item) => (
                  <button
                    type="button"
                    key={item.id_product_visual}
                    onClick={() => setProduct(item)}
                    className="cursor-pointer w-full flex items-center justify-between gap-3 p-3 text-left bg-white hover:bg-amber-50/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {item.nombre}
                      </p>
                      <p className="text-[11px] font-mono text-gray-400 truncate">
                        {item.product_codigo_barra}
                      </p>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2 py-0.5 shrink-0">
                      {item.cantidad} Unid.
                    </span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {product && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cantidad
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decrease}
                  className="cursor-pointer w-11 h-11 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                  aria-label="Restar una unidad"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="w-24 h-11 text-center text-lg font-extrabold font-mono text-gray-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={increase}
                  className="cursor-pointer w-11 h-11 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                  aria-label="Sumar una unidad"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            {isSalida}
            <div
              
              className={`rounded-xl border p-4 ${
                isSalida
                  ? "bg-amber-50/50 border-amber-100"
                  : "bg-emerald-50/50 border-emerald-100"
              }`}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Stock resultante
              </p>

              <div className="flex items-end gap-3 mt-1">
                <span className="text-xl font-extrabold font-mono text-gray-900">
                  {currentStock}
                </span>
                <span className="text-gray-400 mb-1">→</span>
                <span
                  className={`text-2xl font-extrabold font-mono ${
                    insufficient || resultingStock < 0
                      ? "text-rose-600"
                      : isSalida
                        ? "text-amber-700"
                        : "text-emerald-700"
                  }`}
                >
                  {resultingStock}
                </span>
              </div>

              <p className="text-[11px] text-gray-500 mt-1">
                {isSalida
                  ? `Se restan ${amount} unidades.`
                  : `Se suman ${amount} unidades.`}
              </p>

              {insufficient && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <TriangleAlert className="w-3 h-3" />
                  Solo hay {currentStock} unidades disponibles.
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Motivo del movimiento
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={
                isSalida
                  ? "Ej: venta, producto dañado, vencimiento, conteo físico..."
                  : "Ej: compra a proveedor, reposición de mercancía..."
              }
              className= "w-full bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 transition-all resize-none py-2.5"
            />

            <p className="text-[11px] text-gray-400 mt-1">
              Obligatorio. El motivo queda en el historial y es lo que permite
              auditar el stock.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ExistingProductFields;