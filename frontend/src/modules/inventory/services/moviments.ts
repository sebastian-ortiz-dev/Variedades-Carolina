import { ApiClient } from "../../../config/axiosConfig";
import type { ListMoviment } from "../types/moviments";

export const GetMoviments = async (): Promise<ListMoviment[]> => {
    const data = await ApiClient.get<ListMoviment[]>("/inventory/moviments");
    console.log(data.data)
    return data.data;
}