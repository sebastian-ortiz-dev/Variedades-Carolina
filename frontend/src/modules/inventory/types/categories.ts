export interface ListCategories{
    id: string;
    nombre: string;
}

export interface ListCategoriesCount{
    id: string;
    nombre: string;
    cantidad: number;
}

export interface CreateCategorieI{
    nombre: string;
}