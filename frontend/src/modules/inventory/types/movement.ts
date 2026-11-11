import type { ListMoviment } from "./moviments";
import type { GetInventoryCatalog } from "./inventoryInterfaces";
import type { ListCategories } from "./categories";
import type { UnitOfMeasure } from "./measurementUnits";

export interface MovementPayload {
  id_tipo_movimiento: string;
  id_producto: string;
  id_usuario: string;
  cantidad: number;
  descripcion?: string;
  product_codigo_barra?: string;
  nombre?: string;
  precio_compra?: number;
  porcentaje_ganancia?: number;
  id_categoria?: string;
  id_medida?: string;
  descripcion_producto?: string;
  cantidad_minima?: number;
  imagen?: string;
}

export interface ApiErrorBody {
  detail?: string;
  message?: string;
}

export interface NewProductDraft {
  nombre: string;
  codigo: string;
  id_categoria: string;
  id_medida: string;
  precio_compra: string;
  porcentaje_ganancia: string;
  cantidad_minima: string;
  descripcion_producto: string;
}

export interface MovementTypeCardProps {
  movement: ListMoviment;
  selected: boolean;
  onSelect: (movement: ListMoviment) => void;
}

export interface MovementFormProps {
  movement: ListMoviment;
  onRegistered: (message: string) => void;
  onError: (message: string) => void;
}

export interface ExistingProductFieldsProps {
  query: string;
  setQuery: (value: string) => void;
  debouncedQuery: string;
  product: GetInventoryCatalog | null;
  setProduct: (product: GetInventoryCatalog | null) => void;
  products: GetInventoryCatalog[];
  searching: boolean;
  searchError: boolean;
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

export interface NewProductFieldsProps {
  draft: NewProductDraft;
  updateDraft: (field: keyof NewProductDraft, value: string) => void;
  categories: ListCategories[];
  units: UnitOfMeasure[];
  categoriesLoading: boolean;
  unitsLoading: boolean;
  quantity: string;
  setQuantity: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}
