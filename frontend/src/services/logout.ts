import { ApiClient }  from "../config/axiosConfig";
import type { responseLogout } from "../types/insterfacesLogout";

export const LogOutSession = async(): Promise<responseLogout> => {
    const data = await ApiClient.post<responseLogout>("/auth/logout");
    return data.data;
}