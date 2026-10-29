import { PackageSearch } from "lucide-react"
import type { GetInventoryCatalog } from "../types/inventoryInterfaces";

interface listProductsProps{
    loading: boolean;
    listProducts: GetInventoryCatalog[]; 
}

function ListProducts({loading, listProducts}: listProductsProps){
    return(
        <>
        {loading ? 
        <div className="flex items-center-safe justify-center-safe h-80">
                <span className="text-xl">Cargando Productos...</span>
                <div className="w-7 h-7 ml-2 mt-1.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div> 
        : 
        (listProducts.length > 0 ? 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {listProducts.map((product: GetInventoryCatalog) => (
                    <div key={product.id_product_visual} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between"> 
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                                    {product.categoria}
                                </span>
                                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                                    {product.cantidad} Unid.
                                </span>
                            </div>

                            <div className="w-full h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-3xl border border-dashed border-gray-200">
                                {product.imagen}
                            </div>

                            <h3 className="font-bold text-gray-800 text-base leading-snug">
                                {product.nombre}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                                Cod: {product.product_codigo_barra}
                            </p>

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
                </div>
                )
        }
        </>
    )
}

export default ListProducts;