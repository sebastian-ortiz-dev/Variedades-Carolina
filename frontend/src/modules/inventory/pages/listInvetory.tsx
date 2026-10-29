import { useState, useEffect , useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { GetListInventory } from "../services/getInventory"
import type { ListParameters, GetInventoryCatalog }  from "../types/inventoryInterfaces";
import { GetCategories } from "../services/getCategories";
import useIsVisible from "../hooks/itIsVisible";
import HeaderListInventory from "../components/headerListInventory";
import ListProducts from "../components/listProducts";

function inventory(){
    const [lowStock, setLowStock] = useState(false)
    const elementoRef = useRef<HTMLDivElement | null>(null);
    const estaVisible = useIsVisible(elementoRef);
    const [listProducts, setListProducts] = useState<GetInventoryCatalog[]>([]);
    const [payload, setPayload] = useState<ListParameters>({
    q: "", 
    cursor: "", 
    limit: 16, 
    categoria: "", 
    lowStock: lowStock
    });
    const query = useQuery({ queryKey: ['productsList', payload], queryFn: () => GetListInventory(payload)});
    const products = query.data?.products;
    const nextCursor = query.data?.nextCursor;
    const hasMore = query.data?.more;
    const listCategories = useQuery({ queryKey: ['categoriesList'], queryFn: GetCategories});
    const categories = listCategories.data;

    useEffect(() => {
        return () => {
            setListProducts([]);
            setPayload(prev => ({ ...prev, cursor: "" }));
        };
    }, []);

    useEffect(() => {
        if(products != undefined){
            setListProducts(prevProducts => [...prevProducts, ...products ?? []])
        }

    }, [products])

    useEffect(() => {
        if(!hasMore){
            const node = elementoRef.current

            if(node == null){
                return
            }

            node.classList.add('hidden');
        }
    }, [hasMore])
    
    useEffect(() => {
        if(estaVisible){
            ChangeCursor(nextCursor ?? "") 
        }
    }, [estaVisible]);

    const ChangeCursor = (cursor: string) =>{
        setPayload(prev => ({
            ...prev,
            cursor: cursor ?? ""
        }));
    }
    
    return(
        <>
        <div className="space-y-6">
            <HeaderListInventory lowStock={lowStock} setLowStock={setLowStock} categories={categories} setListProducts={setListProducts} setPayload={setPayload} payload={payload} />

            {query.isError && 
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center">
                <p className="text-md text-red-700 font-semibold">Error: {query.error?.message}</p>
            </div>
            }

            <ListProducts loading={query.isLoading} listProducts={listProducts}/>

            <div ref={elementoRef} className="py-4 flex justify-center">
                <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Cargando más productos...</span>
                </button>
            </div>

        </div>
        </>
    )
}

export default inventory;