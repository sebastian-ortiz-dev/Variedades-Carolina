import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useOutletContext } from "react-router";
import type { UseQueryResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ListMoviment, NewProductDraft, MovementPayload } from "../types/moviments";
import type { ApiErrorBody } from "../../../types/errorBody";
import type { GetInventoryCatalog } from "../types/inventoryInterfaces";
import type { userdata } from "../../../types/interfacesUser";
import { PackagePlus, ArrowUpRight, ArrowDownLeft, ArrowLeftRight} from "lucide-react";
import { isSalidaName, isEntradaName, movementTone, movementHelper } from "../helpers/movementHelpers";
import { PostMoviments } from "../services/moviments";
import NewProductFields from "./newProductForm";
import ExistingProductFields from "./existingProductsForm";

export interface MovementFormProps {
  movement: ListMoviment;
  new_product: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setMessage:  React.Dispatch<React.SetStateAction<string | null>>;
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

function MovementForm({ movement, new_product, setError, setMessage }: MovementFormProps) {
  const isNewProduct = movement.nombre === new_product;
  const isSalida = isSalidaName(movement.nombre);
  const isEntrada = isEntradaName(movement.nombre);
  const tone = movementTone(movement.nombre, new_product);

  const Icon = isNewProduct ? PackagePlus : isSalida ? ArrowUpRight : isEntrada ? ArrowDownLeft : ArrowLeftRight;

  const [product, setProduct] = useState<GetInventoryCatalog | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [description, setDescription] = useState("");
  const [draft, setDraft] = useState<NewProductDraft>({ ...emptyDraft });
  const createMoviment = useMutation({ mutationFn: PostMoviments });
  const userData = useOutletContext<UseQueryResult<userdata, Error>>();
  const idUsuario = userData?.data?.id ?? "";

  const amount = Number(quantity) || 0;
  const currentStock = product?.cantidad ?? 0;
  const resultingStock = isEntrada ? currentStock + amount : currentStock - amount;
  const insufficient = Boolean(product) && isSalida && amount > currentStock;

  const updateDraft = (field: keyof NewProductDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setProduct(null);
    setQuantity("1");
    setDescription("");
    setDraft({ ...emptyDraft });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!idUsuario) {
      setError("No se pudieron cargar los datos de la sesión.");
      return;
    }

    if (amount <= 0) {
      setError("La cantidad debe ser mayor que cero.");
      return;
    }

    if (!isNewProduct && !product) {
      setError("Selecciona un producto.");
      return;
    }

    const payload: MovementPayload = {
      id_tipo_movimiento: movement.id,
      id_producto: isNewProduct ? "" : product?.id_product_visual ?? "",
      id_usuario: idUsuario,
      cantidad: amount,
      descripcion: description.trim() || undefined,
    };

    if (isNewProduct) {
      payload.nombre = draft.nombre.trim();
      payload.product_codigo_barra = draft.codigo.trim();
      payload.precio_compra = Number(draft.precio_compra) || 0;
      payload.porcentaje_ganancia = Number(draft.porcentaje_ganancia) || 0;
      payload.id_categoria = draft.id_categoria;
      payload.id_medida = draft.id_medida;
      payload.descripcion_producto = draft.descripcion_producto.trim() || undefined;
      payload.cantidad_minima = Number(draft.cantidad_minima) || 0;
    }

    try {
      await createMoviment.mutateAsync(payload);
      setMessage(isNewProduct ? "Producto creado correctamente." : "Movimiento registrado correctamente.");
      resetForm();
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorBody>;
      const message = axiosError.response?.data?.detail ?? axiosError.response?.data?.message ?? "No se pudo registrar el movimiento.";
      setError(message);
    }
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

      <form onSubmit={handleSubmit} className="p-5 space-y-5">
        {isNewProduct ? (
          <NewProductFields draft={draft} updateDraft={updateDraft} quantity={quantity} setQuantity={setQuantity} description={description} setDescription={setDescription} />
        ) : (
          <ExistingProductFields product={product} setProduct={setProduct} quantity={quantity} setQuantity={setQuantity} description={description} setDescription={setDescription} isSalida={isSalida} currentStock={currentStock} resultingStock={resultingStock} insufficient={insufficient} amount={amount} />
        )}

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button type="submit" className={`cursor-pointer flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-colors ${
              isSalida
                ? "bg-amber-600 hover:bg-amber-700"
                : "bg-emerald-700 hover:bg-emerald-800"
            }`}
            disabled={insufficient}
            >
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