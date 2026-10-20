import { ApiClient }  from '../../../config/axiosConfig';
import type { ListParameters, ListCatalogComplete }  from "../types/inventoryInterfaces";

export const GetListInventory = async (filters: ListParameters): Promise<ListCatalogComplete> => {
    const data = await ApiClient.get<ListCatalogComplete>("/inventory/products", {params: {
      q: filters.q || "",             
      categoria: filters.categoria || "",
      lowStock: filters.lowStock,
      cursor: filters.cursor || "",
      limit: filters.limit || 12,
    },})
    console.log(filters)
    console.log(data)
    return data.data;
};