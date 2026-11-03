import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import type { ListParameters, GetInventoryCatalog }  from "../types/inventoryInterfaces";
import { GetCategories } from "../services/categories";
import HeaderListInventory from "../components/headerListInventory";
import ListProducts from "../components/listProducts";

function inventory(){
    const [lowStock, setLowStock] = useState(false)
    const [listProducts, setListProducts] = useState<GetInventoryCatalog[]>([]);
    const [payload, setPayload] = useState<ListParameters>({q: "", cursor: "", limit: 16, categoria: "", lowStock: lowStock});
    const listCategories = useQuery({ queryKey: ['categoriesList'], queryFn: GetCategories});
    const categories = listCategories.data;
    
    return(
        <>
        <title>Inventario</title>
        <div className="space-y-6">
            <HeaderListInventory lowStock={lowStock} setLowStock={setLowStock} categories={categories} setListProducts={setListProducts} setPayload={setPayload} payload={payload} />

            <ListProducts listProducts={listProducts} setListProducts={setListProducts} payload={payload} setPayload={setPayload} />
        </div>
        </>
    )
}

export default inventory;