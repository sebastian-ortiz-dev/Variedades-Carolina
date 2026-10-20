import { Search, TriangleAlert, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { GetListInventory } from "../services/getInventory"
import type { ListParameters }  from "../types/inventoryInterfaces";

function inventory(){
    const [lowStock, setLowStock] = useState(false)
    const [categorie, setCategorie] = useState(false)
    var payload: ListParameters = {q: "", cursor: "", limit: 12, categoria:"", lowStock: lowStock}
    const product = useQuery({ queryKey: ['products'], queryFn: GetListInventory(payload)})
    
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
                    <div className={"absolute z-20 rounded-md bg-white mt-25 mr-32 " + (categorie ? "block" : "hidden")}>
                        <p className="px-2 py-1">Todas las categorías</p>
                        <p className="px-2 py-1">Snacks y Golosinas</p>
                    </div>

                    {/* Botón Toggle Stock Bajo (lowstock) */}
                    <button onClick={() => setLowStock(!lowStock)} className={"cursor-pointer px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all " + (lowStock ? "bg-yellow-100 border-yellow-300 text-black hover:bg-yellow-200" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100")}>
                        <TriangleAlert className={"" + (lowStock ? "text-red-500" : "text-yellow-500")}/>
                        <span>Stock Bajo</span>
                    </button>
                </div>
            </div>

            {/* 2. GRID DE PRODUCTOS (3 Columnas en lg) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                
                {/* TARJETA DE PRODUCTO (Estilo Comercial) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between">
                
                    <div>
                        {/* Header de Tarjeta: Categoría y Cantidad en Badge */}
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                                Snacks y Golosinas
                            </span>
                            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                20 Unid.
                            </span>
                        </div>

                        {/* Placeholder / Imagen */}
                        <div className="w-full h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-3xl border border-dashed border-gray-200">
                        🍪
                        </div>

                        {/* Nombre y Código de Barras */}
                        <h3 className="font-bold text-gray-800 text-base leading-snug">
                        Marilu
                        </h3>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                        Cod: 7591082010283
                        </p>

                        {/* Desglose de Costo y Ganancia */}
                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                            <div>
                                <span className="text-[10px] text-gray-400 font-bold block uppercase">Costo</span>
                                <span className="font-semibold text-gray-600">$12.00 USD</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-emerald-600 font-bold block uppercase">Ganancia (+70%)</span>
                                <span className="font-bold text-emerald-600">+$8.40 USD</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer de Tarjeta: PVP Calculado Dual (USD / VES) */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between bg-amber-50/50 -mx-4 -mb-4 p-3 rounded-b-2xl border-t-amber-100/50">
                        <div>
                        <span className="text-[10px] font-bold text-amber-800 uppercase block leading-tight">PVP Venta</span>
                        <span className="text-lg font-extrabold text-gray-900">$20.40 <span className="text-xs text-gray-500 font-bold">USD</span></span>
                        </div>
                        <div className="text-right">
                        <span className="text-xs font-extrabold text-amber-900 block">744.60 VES</span>
                        <span className="text-[9px] text-gray-400 font-medium">Tasa BCV</span>
                        </div>
                    </div>

                </div>

            </div>

            {/* 3. BOTÓN CARGAR MÁS / SPINNER (Cursor & HasMore) */}
            <div className="py-4 flex justify-center">
                <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2">
                {/* Ejemplo de Spinner Tailwind */}
                <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Cargando más productos...</span>
                </button>
            </div>

        </div>
        </>
    )
}

export default inventory