import { ApiClient } from "../../../config/axiosConfig";
import type { PaginationMeta, historialParameters } from "../types/historial";

export const GetHistorial = async (payload: historialParameters): Promise<PaginationMeta> => {
    const data = await ApiClient.get<PaginationMeta>("/inventory/historial", {params: {page: payload.page, limit: payload.limit, q: payload.q, id_tipo_movimiento: payload.id_tipo_movimiento, fecha_inicio: payload.fecha_inicio, fecha_fin: payload.fecha_fin}});
    console.log(data.data)
    return data.data;
}