import { ApiClient } from "../../../config/axiosConfig";
import type { ListCategories } from "../types/categories";

export const GetCategories = async (): Promise<ListCategories[]> => {
    const data = await ApiClient.get<ListCategories[]>("/inventory/categories");
    return data.data;
}