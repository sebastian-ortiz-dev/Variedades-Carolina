export interface ListParameters{
    q: 				string;
	cursor: 		string;
	limit:			number;
	categoria:		string;
	lowStock:		boolean;
} 

interface GetInventoryCatalog{
    id_product_visual:        	string;
	product_codigo_barra:     	string;
	nombre:          			string;
	imagen:			 			string;
    cantidad:        			number;
	precio_compra:      		number;
	porcentaje_ganancia:  		number;
	categoria:    	 			string;
	medida:       	 			string;
}

export interface ListCatalogComplete{
    products:		GetInventoryCatalog[];
	nextCursor:		string;
	more:			boolean;
}