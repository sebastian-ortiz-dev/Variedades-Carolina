import { ApiClient } from "../../../config/axiosConfig";
import type { UnitOfMeasure, CreateunitOfMeasure } from "../types/measurementUnits";

export const GetMeasurements = async (): Promise<UnitOfMeasure[]> => {
    const data = await ApiClient.get<UnitOfMeasure[]>("/inventory/measurement-units");
    return data.data;
}

export const PostMeasurements = async (payload: CreateunitOfMeasure) => {
    const data = await ApiClient.post("/inventory/measurement-units", payload);
    return data;
}