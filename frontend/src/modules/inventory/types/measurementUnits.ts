export interface UnitOfMeasure {
  id: string;
  nombre: string;
  abreviatura: string;
}

export interface CreateunitOfMeasure {
  nombre: string;
  abreviatura: string;
  codigo: string;
}

export interface UpdateunitOfMeasure{
    id: string;
    nombre: string;
    abreviatura: string;
    codigo: string;
}

export interface DeleteunitOfMeasure{
    id: string;
}