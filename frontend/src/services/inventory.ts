import { ApiClient }  from "../config/axiosConfig";

export const GetCountInventory = async(): Promise<number> => {
    const data = await ApiClient.get<number>("/inventory/products/alerts");
    return data.data;
}