import { Search, TriangleAlert, ArrowLeft } from "lucide-react"
import { useState } from "react";
import type { ListCategories } from "../types/categories";

function HeaderListInventory({lowStock, setLowStock, categories, setListProducts, setPayload, payload}: any){
    const [categorie, setCategorie] = useState(false)
    const [q, setQ] = useState("");

    const ChangeSearch = (q: string) => {
        setListProducts([]);
        setPayload((prev: any) => ({
            ...prev,
            q: q,
            cursor: ""
        }));
    }

    const ChangeCategorie = (selectCategorie: string) => {
        if(selectCategorie != payload.categoria){
            setListProducts([]);
            setPayload((prev: any) => ({
                ...prev,
                categoria: selectCategorie,
                cursor: ""
            }));
        }
    }

    const ChangeLowStock = () => {
        setListProducts([]);
        setLowStock(!lowStock);
        setPayload((prev: any) => ({
            ...prev,
            lowStock: !lowStock,
            cursor: ""
        }));
    }
    
    return(
        <>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="relative w-full md:w-80">
                    <Search onClick={() => ChangeSearch(q)} className="cursor-pointer absolute size-5.5 inset-y-0 left-0 flex items-center ml-2 mt-2 text-gray-400 hover:text-gray-700 hover:duration-500"/>
                    <input
                        id="q"
                        type="text"
                        placeholder="Buscar por nombre o código..."
                        onChange={(e) => setQ(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-amber-500 transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <div onClick={() => setCategorie(!categorie)} className="cursor-pointer inline-flex items-center-safe py-2 px-3 text-sm bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none hover:bg-gray-100">
                        <p>Categorías</p>
                        <ArrowLeft className={"size-4.5 ml-1 mt-0.5 " + (categorie ? "-rotate-90 duration-250" : "-rotate-0 duration-250")}/>
                    </div>
                    <div className={"absolute z-20 rounded-md bg-white max-h-45 mt-54.5 mr-32 overflow-y-auto " + (categorie ? "block" : "hidden")}>
                        <p onClick={() => ChangeCategorie("")} className="cursor-pointer px-2 py-1 hover:bg-gray-100 hover:duration-350">Todos los productos</p>
                        {categories?.map((categorie: ListCategories) => (
                            <p key={categorie.id} onClick={() => ChangeCategorie(categorie.id)} className="cursor-pointer px-2 py-1 hover:bg-gray-100 hover:duration-350">{categorie.nombre}</p>
                        ))}
                    </div>

                    <button onClick={() => ChangeLowStock()} className={"cursor-pointer px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all " + (lowStock ? "bg-yellow-100 border-yellow-300 text-black hover:bg-yellow-200" : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100")}>
                        <TriangleAlert className={"" + (lowStock ? "text-red-500" : "text-yellow-500")}/>
                        <span>Stock Bajo</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default HeaderListInventory;