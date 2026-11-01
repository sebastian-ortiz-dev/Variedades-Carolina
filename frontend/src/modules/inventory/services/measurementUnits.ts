import { ApiClient } from "../../../config/axiosConfig";
import type { UnitOfMeasure, CreateunitOfMeasure, UpdateunitOfMeasure, DeleteunitOfMeasure } from "../types/measurementUnits";

export const GetMeasurements = async (): Promise<UnitOfMeasure[]> => {
    const data = await ApiClient.get<UnitOfMeasure[]>("/inventory/measurement-units");
    return data.data;
}

export const PostMeasurements = async (payload: CreateunitOfMeasure) => {
    const data = await ApiClient.post("/inventory/measurement-units", payload);
    return data;
}

export const PathcUpdateMeasurements = async (payload: UpdateunitOfMeasure) =>    {
    const data = await ApiClient.patch(`/inventory/measurement-units/${payload.id}`, {abreviatura:payload.abreviatura, codigo:payload.codigo ,nombre: payload.nombre});
    return data;
}

export const DeleteMeasurements = async (payload: DeleteunitOfMeasure) =>    {
    const data = await ApiClient.delete(`/inventory/measurement-units/${payload.id}`);
    return data;
}