import { PackageSearch, Info, Pencil, Trash2 } from "lucide-react"
import { useOutletContext } from "react-router";
import type { UseQueryResult } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import type { userdata } from "../../../types/interfacesUser";
import type { AxiosError } from "axios";
import type { ApiErrorBody } from "../../../types/errorBody";
import type { GetInventoryCatalog, ListParameters } from "../types/inventoryInterfaces";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useIsVisible from "../hooks/itIsVisible";
import { GetListInventory, DeleteProduct } from "../services/inventory";
import { useLocation } from 'react-router';
import ProductInfor from "./productInfo";
import Confirmation from "./confirmation";

interface listProductsProps{
    listProducts: GetInventoryCatalog[]; 
    setListProducts: React.Dispatch<React.SetStateAction<GetInventoryCatalog[]>>;
    payload: ListParameters;
    setPayload: React.Dispatch<React.SetStateAction<ListParameters>>;
}

function ListProducts({listProducts, setListProducts, payload, setPayload}: listProductsProps){
    const queryClient = useQueryClient();
    const location = useLocation();
    const eliminarProducto = useMutation({mutationFn: DeleteProduct});
    const [error, setError] = useState<string | null>();
    const [mensaje, setMensaje] = useState<string | null>(location.state?.mensaje || null);
    const elementoRef = useRef<HTMLDivElement | null>(null);
    const estaVisible = useIsVisible(elementoRef);
    const [product, setProduct] = useState<GetInventoryCatalog>();
    const [productBorrar, setProductBorrar] = useState<GetInventoryCatalog>();
    const [confiBorrar, setConfiBorrar] = useState<boolean>(false);
    const query = useQuery({ queryKey: ['productsList', payload], queryFn: () => GetListInventory(payload)});
    const products = query.data?.products;
    const nextCursor = query.data?.nextCursor;
    const hasMore = query.data?.more;
    const userData = useOutletContext<UseQueryResult<userdata, Error>>();
    const rolUsuario = userData?.data?.rol ?? "Trabajador";
   
    useEffect(() => {
        return () => {
            setListProducts([]);
            setPayload(prev => ({ ...prev, cursor: "" }));
        };
    }, []);

    const timeoutNotification = setTimeout(() => {
        setMensaje(null)
    }, 25000)

    useEffect(() => {
        timeoutNotification
        clearTimeout(timeoutNotification)
    }, [mensaje])

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
        setPayload((prev: ListParameters) => ({
            ...prev,
            cursor: cursor ?? ""
        }));
    }

     const DeleteProducto = async () => {
            setConfiBorrar(false);

            const id = productBorrar?.id_product_visual ?? '';

            if(id == ""){
                setError(`Ha ocurrido un error al eliminar el producto ${product?.nombre}, Recargue la pagina o intentelo mas tarede.`);
                setProductBorrar(undefined);
                return;
            }
    
            try{
                await eliminarProducto.mutateAsync(id);
                setProductBorrar(undefined);
                setMensaje("El producto se ha eliminado de forma correcta.");
                ChangeCursor("");
                setListProducts([]);
                await queryClient.invalidateQueries({queryKey: ["productsList"]});
            } catch(error: any){
                const axiosError = error as AxiosError<ApiErrorBody>;
                const message = axiosError.response?.data?.detail ?? axiosError.response?.data?.message ?? "No se pudo eliminar el producto.";
                setError(message);
                setProductBorrar(undefined);
            }
        }


    return(
        <>
        {query.isError && 
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center">
                <p className="text-md text-red-700 font-semibold">Error: {query.error?.message}</p>
            </div>
        }

        {mensaje && 
                <div className="bg-green-50 p-4 rounded-2xl border border-green-200 shadow-md flex flex-col md:flex-row items-center mb-5">
                    <p className="text-md text-green-700 font-semibold flex">{mensaje}</p>
                </div>
        }

        {error && 
            <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center">
                <p className="text-md text-red-700 font-semibold">Error: {error}</p>
            </div>
        }

        {query.isLoading ? 
            <div className="flex items-center-safe justify-center-safe h-80">
                    <span className="text-xl">Cargando Productos...</span>
                    <div className="w-7 h-7 ml-2 mt-1.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div> 
        : 
        (listProducts.length > 0 ? 
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

                            <img  src={product.imagen != "product_defecto.jpg" ? import.meta.env.VITE_IMAGES + "/products/" + product.imagen : import.meta.env.VITE_IMAGES + '/' + product.imagen } alt={"imagen_" + product.nombre.toLocaleLowerCase().replaceAll(" ", "_").trim()} className="w-full h-28 bg-gray-50 rounded-xl mb-3 flex items-center justify-center text-xl text-center border border-dashed border-gray-200" />

                            <h3 className="font-bold text-gray-800 text-base leading-snug">
                                {product.nombre}
                            </h3>
                            <p className="text-xs text-gray-400 font-mono mt-0.5">
                                Cod: {product.product_codigo_barra}
                            </p>

                            <span className={`inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-md ${(product.iva ?? 0) > 0 ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                                {(product.iva ?? 0) > 0 ? `IVA ${product.iva}%` : "Exento"}
                            </span>

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
                            <div className="flex items-center gap-1">
                                <button onClick={() => setProduct(product)} title="Editar Medida" className="cursor-pointer p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                    <Info className="w-4.5 h-4.5" />
                                </button>
                                {rolUsuario.toLowerCase() !== "trabajador" && (
                                    <>
                                        <button title="Editar Medida" className="cursor-pointer p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Pencil className="w-4.5 h-4.5" />
                                        </button>
                                        <button onClick={() => {setProductBorrar(product); setConfiBorrar(true)}} title="Eliminar Medida" className="cursor-pointer p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4.5 h-4.5"/>
                                        </button>
                                    </>
                                )}
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

        <div ref={elementoRef} className="py-4 flex justify-center">
            <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Cargando más productos...</span>
            </button>
        </div>

        <ProductInfor selectedProduct={product} setProduct={setProduct} />
        <Confirmation confirmation={confiBorrar} text={`¿Eliminar ${productBorrar?.nombre} (${productBorrar?.product_codigo_barra})? Dejará de aparecer en el inventario y no podrá venderse, pero conserva su historial de movimientos.`} action={DeleteProducto} setConfirmation={setConfiBorrar} />
        </>
    )
}

export default ListProducts;