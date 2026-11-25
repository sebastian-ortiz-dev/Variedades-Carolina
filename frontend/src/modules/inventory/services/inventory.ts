import { ApiClient }  from '../../../config/axiosConfig';
import type { ListParameters, ListCatalogComplete, GetInventoryCatalog }  from "../types/inventoryInterfaces";

export const GetListInventory = async (filters: ListParameters): Promise<ListCatalogComplete> => {
    const data = await ApiClient.get<ListCatalogComplete>("/inventory/products", {params: {
      q: filters.q || "",             
      categoria: filters.categoria || "",
      lowStock: filters.lowStock,
      cursor: filters.cursor || "",
      limit: filters.limit || 12,
    },})
    return data.data;
};

export const GetProducts = async(payload: string): Promise<GetInventoryCatalog[]> => {
  const data = await ApiClient.get<GetInventoryCatalog[]>(`inventory/products/search?q=${payload}`);
  return data.data;
}

export const DeleteProduct = async(payload: string) => {
  const data = await ApiClient.delete(`inventory/products/${payload}`);
  return data;
}