import { ApiClient } from "../../../config/axiosConfig";
import type { ListIva } from "../types/iva";

export const GetIva = async (): Promise<ListIva[]> => {
    const data = await ApiClient.get<ListIva[]>("/inventory/iva");
    return data.data;
}
