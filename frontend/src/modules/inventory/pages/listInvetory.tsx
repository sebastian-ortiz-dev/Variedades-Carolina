import { Search, TriangleAlert, ArrowLeft, PackageSearch } from "lucide-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { GetListInventory } from "../services/getInventory"
import type { ListParameters }  from "../types/inventoryInterfaces";
import { GetCategories } from "../services/getCategories";
import type { ListCategories } from "../types/categories";

function inventory(){
    const [lowStock, setLowStock] = useState(false)
    const [categorie, setCategorie] = useState(false)
    const [payload, setPayload] = useState<ListParameters>({
    q: "", 
    cursor: "", 
    limit: 2, 
    categoria: "", 
    lowStock: lowStock
    });
    const query = useQuery({ queryKey: ['productsList', payload], queryFn: () => GetListInventory(payload)});
    var IsError = query.isError;
    const loading = query.isLoading;
    const products = query.data?.products;
    const nextCursor = query.data?.nextCursor;
    const hasMore = query.data?.more;
    const listCategories = useQuery({ queryKey: ['categoriesList'], queryFn: GetCategories});
    IsError = listCategories.isError;
    const categories = listCategories.data

    const ChangeCursor = () =>{
        setPayload(prev => ({
            ...prev,
            cursor: nextCursor ?? ''
        }));
    }

    const ChangeCategorie = (selectCategorie: string) => {
        setPayload(prev => ({
            ...prev,
            categoria: selectCategorie,
            cursor: ""
        }));
    }
    
    return(
        <>
        <div className="space-y-6">
            
            {/* 1. BARRA DE FILTROS */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Input Búsqueda (q) */}
                <div className="relative w-full md:w-80">
                    <Search  className="absolute size-5.5 inset-y-0 left-0 flex items-center ml-2 mt-2 text-gray-400"/>
                    <input
                        id="q"
                        type="text"
                        placeholder="Buscar por nombre o código..."
                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                </div>

                {/* Filtros de Categoría y LowStock */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <div onClick={() => setCategorie(!categorie)} className="cursor-pointer inline-flex items-center-safe py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none hover:bg-gray-100">
                        <p>Categorías</p>
                        <ArrowLeft className={"size-4.5 ml-1 mt-0.5 " + (categorie ? "-rotate-90 duration-250" : "-rotate-0 duration-250")}/>
                    </div>
                    <div className={"absolute z-20 rounded-md bg-white mt-60 mr-32 " + (categorie ? "block" : "hidden")}>
                        {categories?.map((categorie: ListCategories) => (
                            <p key={categorie.id} onClick={() => ChangeCategorie(categorie.id)} className="cursor-pointer px-2 py-1 hover:bg-gray-100 hover:duration-350">{categorie.nombre}</p>
                        ))}
                    </div>

                    {/* Botón Toggle Stock Bajo (lowstock) */}
                    <button onClick={() => setLowStock(!lowStock)} className={"cursor-pointer px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all " + (lowStock ? "bg-yellow-100 border-yellow-300 text-black hover:bg-yellow-200" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100")}>
                        <TriangleAlert className={"" + (lowStock ? "text-red-500" : "text-yellow-500")}/>
                        <span>Stock Bajo</span>
                    </button>
                </div>
            </div>

            {IsError && 
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center">
                <p className="text-md text-red-700 font-semibold">Error: {query.error?.message}</p>
            </div>
            }

            {loading ? <div>cargando</div> : <p className="hidden">cargado</p>}
            
            {products?.length ?? 0 > 0 ? 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {products?.map(product => (
                        <div key={product.id_product_visual} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between">
                        
                            <div>
                                {/* Header de Tarjeta: Categoría y Cantidad en Badge */}
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                                        {product.categoria}
                                    </span>
                                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                        {product.cantidad} Unid.
                                    </span>
                                </div>

                                {/* Placeholder / Imagen */}
                                <div className="w-full h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-3xl border border-dashed border-gray-200">
                                {product.imagen}
                                </div>

                                {/* Nombre y Código de Barras */}
                                <h3 className="font-bold text-gray-800 text-base leading-snug">
                                {product.nombre}
                                </h3>
                                <p className="text-xs text-gray-400 font-mono mt-0.5">
                                Cod: {product.product_codigo_barra}
                                </p>

                                {/* Desglose de Costo y Ganancia */}
                                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                                    <div>
                                        <span className="text-[10px] text-gray-400 font-bold block uppercase">Costo</span>
                                        <span className="font-semibold text-gray-600">${product.precio_compra} USD</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-emerald-600 font-bold block uppercase">Ganancia</span>
                                        <span className="font-bold text-emerald-600">%{product.porcentaje_ganancia}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer de Tarjeta: PVP Calculado Dual (USD / VES) */}
                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between bg-amber-50/50 -mx-4 -mb-4 p-3 rounded-b-2xl border-t-amber-100/50">
                                <div>
                                    <span className="text-[10px] font-bold text-amber-800 uppercase block leading-tight">Tasa BCV</span>
                                    <span className="text-lg font-extrabold text-gray-900">744.60 <span className="text-xs text-gray-500 font-bold">VES</span></span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs font-extrabold text-amber-900 block">$20.40 USD</span>
                                    <span className="text-[9px] text-gray-400 font-medium">PVP Venta</span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div> : 


                <div className="flex items-center-safe justify-center-safe h-80">
                    <PackageSearch className="size-10 mr-2" />
                    <span>No se encontraron productos.</span>

                </div>}

            {hasMore && 
            <div className="py-4 flex justify-center">
                <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Cargando más productos...</span>
                </button>
            </div>}

        </div>
        </>
    )
}

export default inventory