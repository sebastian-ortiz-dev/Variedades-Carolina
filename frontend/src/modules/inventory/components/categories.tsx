import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query"
import { ChevronDown, ChevronUp, Plus, Pencil, Trash2,  Layers, X } from 'lucide-react';
import type { ListCategoriesCount, CreateCategorieI, UpdateCategorieI, DeleteCategorieI } from '../types/categories';
import { GetCategoriesCount, PostCreateCategorie, PathcUpdateCategorie, ADeleteCategorie } from '../services/categories';
import Button from './button';
import Confirmation from './confirmation';

interface propsCategories{
    setErrorHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

function Categories({setErrorHeader}: propsCategories){
    const [text, setText] = useState("");
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [error, setError] = useState(false);
    const [selectedCategorieCreate, setSelectedCategorieCreate] = useState(false);
    const [confirmationC, setConfirmationC] = useState(false);
    const [confirmationCD, setConfirmationCD] = useState(false);
    const [selectedCategorieUpdate, setSelectedCategorieUpdate] = useState<ListCategoriesCount>();
    const [selectedCategorieDelete, setSelectedCategorieDelete] = useState<ListCategoriesCount>();
    const [categories, setCategories] = useState<ListCategoriesCount[]>([]);
    const [form, setForm] = useState<FormData | undefined>();
    const listCategories = useQuery({queryKey: ['categories', categories], queryFn: () => GetCategoriesCount()})
    const mutationCreateCategorie = useMutation({ mutationFn: PostCreateCategorie })
    const mutationUpdateCategorie = useMutation({ mutationFn: PathcUpdateCategorie })
    const mutationDeleteCategorie = useMutation({ mutationFn: ADeleteCategorie })
    setErrorHeader(listCategories.isError);

    useEffect(() => {
        setCategories(listCategories.data ?? []);
    }, [listCategories.data])

    const createNewCategorie = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const nombre = formData.get("categorie_name")?.toString() ?? "";

        if(nombre == "" || nombre.length <= 3){
            setError(true);
            return;
        }

        const payload: CreateCategorieI = {nombre: nombre}

        try{
            setError(false)
            const data = await mutationCreateCategorie.mutateAsync(payload);
            if(data.status == 201){
                setCategories([]);
                setSelectedCategorieCreate(false);
            }
        } catch(error: any){
            setError(true);
        }

    }

    const UpdateCategorieConfirm = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setForm(formData);
        setText("Esta seguro de cambiar el nombre de la categoria? (Esto Afectara a los productos que pertenecen a la categoria)");
        
        setConfirmationC(true);
    }

    const UpdaCategorie = async () => {
        setConfirmationC(false);
        const formData = form;
        const id = formData?.get("id_categorie")?.toString() ?? "";
        const categoriaNombre = formData?.get("categorie_name")?.toString() ?? "";

        if(categoriaNombre.length < 3 || id == ""){
            setError(true);
            return;
        }

        const payload: UpdateCategorieI = {id: id, nombre: categoriaNombre}

        try{
            setError(false);
            await mutationUpdateCategorie.mutateAsync(payload);
            setCategories([]);
            setSelectedCategorieUpdate(undefined)
        } catch(error: any){
            setError(true);
        }
    }

    const DeleteCategorieConfirm = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setForm(formData);
        setText("Esta seguro de eliminar la categoria?");
        
        setConfirmationCD(true);
    }

    const DeleteCategorie = async () => {
        setConfirmationCD(false);
        const formData = form;
        const id = formData?.get("id_categorie")?.toString() ?? "";

        if(id == ""){
            setError(true);
            return;
        }

        const payload: DeleteCategorieI= {id: id}

        try{
            setError(false);
            await mutationDeleteCategorie.mutateAsync(payload);
            setCategories([]);
            setSelectedCategorieDelete(undefined)
        } catch(error: any){
            setError(true);
        }
    }

    return(
        <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div onClick={() => setIsCategoriesOpen(!isCategoriesOpen)} className="flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                    <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 border border-emerald-100">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Categorías de Productos</h2>
                        <p className="text-xs text-gray-500">Agrupaciones principales para el catálogo del inventario</p>
                    </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={(e) => {e.stopPropagation; setSelectedCategorieCreate(true);}} className="cursor-pointer px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 shadow-sm">
                            <Plus className="w-4 h-4" />
                            Nueva Categoría
                        </button>
                        <div className="text-gray-400 p-1 rounded-lg hover:bg-gray-100">
                            {isCategoriesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                    </div>
                </div>

                {isCategoriesOpen && (
                    <div className="p-5 bg-gray-50/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {categories.map((cat: ListCategoriesCount) => (
                            <div key={cat.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between hover:border-emerald-200 transition-all">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-gray-800 text-sm">{cat.nombre}</span>
                                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                                        {cat.cantidad} Unid.
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <button onClick={() => setSelectedCategorieUpdate(cat)} title="Editar Categoría" className="cursor-pointer p-1.5 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors">
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => setSelectedCategorieDelete(cat)} title="Eliminar Categoría" className="cursor-pointer p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {selectedCategorieCreate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h3 className="font-mono font-bold text-lg text-slate-800">Crear Nueva Categoria</h3>
                            </div>
                            <span onClick={() => setSelectedCategorieCreate(false)} className="text-slate-400 cursor-pointer hover:text-slate-600 font-bold">
                                <X />
                            </span>
                        </div>

                        <form onSubmit={createNewCategorie} method='POST'>
                            <div className='text-black mb-5'>
                                <label htmlFor='categorie_name'>Nombre: </label> <br/>
                                <input type='text' name='categorie_name' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='Nombre de categoria' required/>
                            </div>
                            <Button loading={mutationCreateCategorie.isPending} textLoad='Creando...' text='Crear Categoria' />
                        </form>
                        {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al tratar de crear la categoria </p></div>}
                    </div>
                </div>
            )}

            {selectedCategorieUpdate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-40">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h3 className="font-mono font-bold text-lg text-slate-800">Actualizar Categoria</h3>
                            </div>
                            <span onClick={() => setSelectedCategorieUpdate(undefined)} className="text-slate-400 cursor-pointer hover:text-slate-600 font-bold">
                                <X />
                            </span>
                        </div>

                        <form onSubmit={UpdateCategorieConfirm} method='POST'>
                            <div className='text-black mb-5'>
                                <input type='hidden' name='id_categorie' value={selectedCategorieUpdate.id} readOnly/>
                                <label htmlFor='categorie_name'>Nombre: </label> <br/>
                                <input type='text' name='categorie_name' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='Nombre de categoria' required/>
                            </div>
                            <Button loading={mutationUpdateCategorie.isPending} textLoad='Actualizando...' text='Actualizar Categoria' />
                        </form>
                        {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al actualizar la categoria </p></div>}
                    </div>
                </div>
            )}

            {selectedCategorieDelete && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-40">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h3 className="font-mono font-bold text-lg text-slate-800">Eliminar Categoria</h3>
                            </div>
                            <span onClick={() => setSelectedCategorieDelete(undefined)} className="text-slate-400 cursor-pointer hover:text-slate-600 font-bold">
                                <X />
                            </span>
                        </div>

                        <form onSubmit={DeleteCategorieConfirm} method='POST'>
                            <div className='text-black mb-5'>
                                <input type='hidden' name='id_categorie' value={selectedCategorieDelete.id} readOnly/>
                                <label htmlFor='categorie_name'>Nombre: </label> <br/>
                                <input type='text' name='categorie_name' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' value={selectedCategorieDelete.nombre} placeholder='Nombre de categoria' readOnly/>
                            </div>
                            <Button loading={mutationCreateCategorie.isPending} textLoad='Borrando...' text='Borrar Categoria' />
                        </form>
                        {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al tratar de borrar la categoria </p></div>}
                    </div>
                </div>
            )}

            <Confirmation confirmation={confirmationC} text={text} action={UpdaCategorie} setConfirmation={setConfirmationC}/>
            <Confirmation confirmation={confirmationCD} text={text} action={DeleteCategorie} setConfirmation={setConfirmationCD}/>
        </>
    )
}

export default Categories;