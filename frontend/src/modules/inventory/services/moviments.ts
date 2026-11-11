import { ApiClient } from "../../../config/axiosConfig";
import type { ListMoviment, MovementPayload } from "../types/moviments";

export const GetMoviments = async (): Promise<ListMoviment[]> => {
    const data = await ApiClient.get<ListMoviment[]>("/inventory/moviments");
    console.log(data.data)
    return data.data;
}

export const PostMoviments = async(payload: MovementPayload) => {
    const data = await ApiClient.post("inventory/moviments", payload);
    return data.data;
}