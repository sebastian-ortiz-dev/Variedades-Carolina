import { ApiClient } from "../../../config/axiosConfig";
import type { listCash } from "../types/minimumCash";

export const GetMinimumCash = async (): Promise<listCash> => {
    const data = await ApiClient.get<listCash>("/inventory/settings/minimum-cash");
    return data.data;
}

export const PostMinimumCash = async (payload: listCash) => {
    const data = await ApiClient.post(`/inventory/settings/minimum-cash/${payload.id_billete_visual}`, payload.minimim_cash);
    return data;
}