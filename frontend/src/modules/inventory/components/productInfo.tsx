import { X } from "lucide-react"
import type { GetInventoryCatalog } from "../types/inventoryInterfaces";

interface productInfoProps{
    selectedProduct: GetInventoryCatalog | undefined;
    setProduct: React.Dispatch<React.SetStateAction<GetInventoryCatalog | undefined>>;
}

function ProductInfor({selectedProduct, setProduct}: productInfoProps){
    return(
        <>
        {selectedProduct && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h3 className="font-mono font-bold text-lg text-slate-800">Informacion del producto</h3>
                            </div>
                            <span onClick={() => setProduct(undefined)} className="text-slate-400 cursor-pointer hover:text-slate-600 font-bold">
                                <X />
                            </span>
                        </div>
                        <div className="space-y-3 text-sm">
                       
                            <div className="flex justify-center mb-3">
                                <img  src={selectedProduct.imagen != "product_defecto.jpg" ? import.meta.env.VITE_IMAGES + "/products/" + selectedProduct.imagen : import.meta.env.VITE_IMAGES + '/' + selectedProduct.imagen}  alt={"imagen_" + selectedProduct.nombre.toLocaleLowerCase().replaceAll(" ", "_").trim()}  className="w-28 h-28 object-cover rounded-md border" />
                            </div>

                            <div>
                                <span className="text-xs text-slate-400 uppercase font-semibold">Nombre</span>
                                <p className="font-medium text-slate-700">{selectedProduct.nombre}</p>
                                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${(selectedProduct.iva ?? 0) > 0 ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                                    {(selectedProduct.iva ?? 0) > 0 ? `IVA ${selectedProduct.iva}%` : "Exento"}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold">Categoría</span>
                                    <p className="text-slate-700">{selectedProduct.categoria}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold">Medida</span>
                                    <p className="text-slate-700">{selectedProduct.medida}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 border-t pt-2">
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold">ID Visual</span>
                                    <p className="font-mono text-xs text-slate-600 ">{selectedProduct.id_product_visual}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold">Código de Barras</span>
                                    <p className="font-mono text-xs text-slate-600 truncate">{selectedProduct.product_codigo_barra}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 border-t pt-2 bg-slate-50 p-2 rounded-md">
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold block">Stock</span>
                                    <span className="font-bold text-slate-800">{selectedProduct.cantidad}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold block">Compra</span>
                                    <span className="font-bold text-slate-800">${selectedProduct.precio_compra}</span>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 uppercase font-semibold block">Ganancia</span>
                                    <span className="font-bold text-emerald-600">{selectedProduct.porcentaje_ganancia}%</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        )}
        </>
    )
}

export default ProductInfor;