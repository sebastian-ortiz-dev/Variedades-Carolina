import { ApiClient }  from '../../../config/axiosConfig';
import type { UserDataEntry, UserDataResponse }  from '../types/interfaces';

export const PostUserByEmail = async (payload: UserDataEntry): Promise<UserDataResponse> => {
    const data = await ApiClient.post<UserDataResponse>("/auth/login", payload);
    return data.data;
};