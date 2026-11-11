import { useState } from "react";
import type { ListMoviment } from "../types/moviments";
import type { GetInventoryCatalog } from "../types/inventoryInterfaces";
import type { NewProductDraft } from "../types/movement";
import { PackagePlus, ArrowUpRight, ArrowDownLeft, ArrowLeftRight} from "lucide-react";
import { isSalidaName, isEntradaName, movementTone, movementHelper } from "../helpers/movementHelpers";
import NewProductFields from "./newProductForm";
import ExistingProductFields from "./existingProductsForm";

export interface MovementFormProps {
  movement: ListMoviment;
  new_product: string;
  onRegistered: (message: string) => void;
  onError: (message: string) => void;
}

const emptyDraft: NewProductDraft = {
  nombre: "",
  codigo: "",
  id_categoria: "",
  id_medida: "",
  precio_compra: "",
  porcentaje_ganancia: "",
  cantidad_minima: "0",
  descripcion_producto: "",
};

function MovementForm({ movement, new_product }: MovementFormProps) {
  const isNewProduct = movement.nombre === new_product;
  const isSalida = isSalidaName(movement.nombre);
  const isEntrada = isEntradaName(movement.nombre);
  const tone = movementTone(movement.nombre, new_product);

  const Icon = isNewProduct
    ? PackagePlus
    : isSalida
      ? ArrowUpRight
      : isEntrada
        ? ArrowDownLeft
        : ArrowLeftRight;

  const [query, setQuery] = useState("");
  const [product, setProduct] = useState<GetInventoryCatalog | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState("");
  const [draft, setDraft] = useState<NewProductDraft>({ ...emptyDraft });

  const amount = Number(quantity) || 0;
  const currentStock = product?.cantidad ?? 0;
  const resultingStock = isEntrada ? currentStock - amount : currentStock + amount;
  const insufficient = Boolean(product) && isSalida && amount > currentStock;

  const updateDraft = (field: keyof NewProductDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setQuery("");
    setProduct(null);
    setQuantity("1");
    setDescription("");
    setDraft({ ...emptyDraft });
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl border ${tone.icon}`}>
            <Icon className="w-5 h-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {movement.nombre}
            </h2>
            <p className="text-xs text-gray-500">
              {movementHelper(movement.nombre, new_product)}
            </p>
          </div>
        </div>

        <span className={`self-start sm:self-auto text-[11px] font-bold px-2.5 py-1 rounded-full border ${tone.badge}`}>
          {isNewProduct
            ? "Producto nuevo"
            : isSalidaName(movement.nombre)
              ? "Resta stock"
              : isEntradaName(movement.nombre)
                ? "Suma stock"
                : "Movimiento"}
        </span>
      </div>

      <form onSubmit={(event) => event.preventDefault()} className="p-5 space-y-5">
        {isNewProduct ? (
          <NewProductFields draft={draft} updateDraft={updateDraft} quantity={quantity} setQuantity={setQuantity} description={description} setDescription={setDescription} />
        ) : (
          <ExistingProductFields query={query} setQuery={setQuery} product={product} setProduct={setProduct} quantity={quantity} setQuantity={setQuantity} description={description} setDescription={setDescription} isSalida={isSalida} currentStock={currentStock} resultingStock={resultingStock} insufficient={insufficient} amount={amount} />
        )}

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button type="submit" className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors ${
              isSalida
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-emerald-700 hover:bg-emerald-800"
            }`}>
            <Icon className="w-4 h-4" />
            {isNewProduct ? "Crear producto" : `Registrar ${movement.nombre.toLowerCase()}`}
          </button>

          <button type="button" onClick={resetForm} className="px-4 py-2.5 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors cursor-pointer">
            Limpiar
          </button>
        </div>
      </form>
    </section>
  );
}

export default MovementForm;