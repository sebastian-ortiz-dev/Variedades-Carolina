import { ApiClient }  from "../config/axiosConfig";
import type { productCount } from "../types/interfaceProductCount";

export const GetCountInventory = async(): Promise<productCount> => {
    const data = await ApiClient.get<productCount>("/inventory/products/alerts");
    return data.data;
}