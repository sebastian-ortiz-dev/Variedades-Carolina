import { ApiClient } from "../../../config/axiosConfig";
import type { ListCategories, ListCategoriesCount, CreateCategorieI } from "../types/categories";

export const GetCategories = async (): Promise<ListCategories[]> => {
    const data = await ApiClient.get<ListCategories[]>("/inventory/categories");
    return data.data;
}

export const GetCategoriesCount = async (): Promise<ListCategoriesCount[]> => {
    const data = await ApiClient.get<ListCategoriesCount[]>("/inventory/categories-count");
    return data.data;
}

export const PostCreateCategorie = async (nombre: CreateCategorieI) =>    {
    const data = await ApiClient.post("/inventory/categories", nombre);
    return data;
}