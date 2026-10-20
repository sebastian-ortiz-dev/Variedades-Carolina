export interface ListParameters{
    q: 				string;
	cursor: 		string;
	limit:			number;
	categoria:		string;
	lowStock:		boolean;
} 

interface GetInventoryCatalog{
    IdVisual:        string;
	CodeBearer:      string;
	Nombre:          string;
	Imagen:			 string;
    Cantidad:        number;
	Precio_Com:      number;
	Porcentaje_Gan:  number;
	Categoria:    	 string;
	Medida:       	 string;
}

export interface ListCatalogComplete{
    Products:		GetInventoryCatalog[];
	NextCursor:		string;
	HasMore:		boolean;
}