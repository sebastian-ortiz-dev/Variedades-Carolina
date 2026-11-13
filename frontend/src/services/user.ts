import { ApiClient }  from "../config/axiosConfig";
import type { userdata } from "../types/interfacesUser";

export const GetUserMe = async(): Promise<userdata> => {
    const data = await ApiClient.get<userdata>("/auth/me");
    return data.data;
}