import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query"
import { ChevronDown, ChevronUp, Plus, Pencil, Trash2, Banknote, Layers, Ruler, AlertCircle, X } from 'lucide-react';
import type { ListCategoriesCount, CreateCategorieI, UpdateCategorieI, DeleteCategorieI } from '../types/categories';
import type { UnitOfMeasure, CreateunitOfMeasure, DeleteunitOfMeasure, UpdateunitOfMeasure } from '../types/measurementUnits';
import type { listCash, updateCash } from '../types/minimumCash';
import { GetCategoriesCount, PostCreateCategorie, PathcUpdateCategorie, ADeleteCategorie } from '../services/categories';
import { GetMeasurements, PostMeasurements, PathcUpdateMeasurements , DeleteMeasurements } from '../services/measurementUnits';
import { GetMinimumCash, PatchMinimumCash } from '../services/minimumCashService';
import Button from '../components/button';
import Confirmation from '../components/confirmation';

function categoriesAndMeasuresPage(){
    const [text, setText] = useState("");
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [error, setError] = useState(false);
    const [headerError, setErrorHeader] = useState(false);
    const [headerErrorCash, setErrorHeaderCash] = useState(false);
    const [selectedCategorieCreate, setSelectedCategorieCreate] = useState(false);
    const [selectedMeasurementCreate, setSelectedMeasurementCreate] = useState(false);
    const [selectedCategorieUpdate, setSelectedCategorieUpdate] = useState<ListCategoriesCount>();
    const [selectedCategorieDelete, setSelectedCategorieDelete] = useState<ListCategoriesCount>();
    const [selectedMeasureUpdate, setSelectedMeasureUpdate] = useState<UnitOfMeasure>();
    const [selectedMeasureDelete, setSelectedMeasureDelete] = useState<UnitOfMeasure>();
    const [confirmation, setConfirmation] = useState(false);
    const [confirmationC, setConfirmationC] = useState(false);
    const [confirmationCD, setConfirmationCD] = useState(false);
    const [confirmationM, setConfirmationM] = useState(false);
    const [confirmationMD, setConfirmationMD] = useState(false);
    const [isMeasuresOpen, setIsMeasuresOpen] = useState(true);
    const [categories, setCategories] = useState<ListCategoriesCount[]>([]);
    const [measures, setMeasures] = useState<UnitOfMeasure[]>([]);
    const [cash, setCash] = useState<listCash | undefined>();

    // Rounding bill state (e.g., $1.00 or 5.00 VES / $0.50)
    const [minBill, setMinBill] = useState<number>(1.00);
    const [isEditingBill, setIsEditingBill] = useState(false);
    const [tempBill, setTempBill] = useState<number>(minBill);
    const [form, setForm] = useState<FormData | undefined>();

    const listCategories = useQuery({queryKey: ['categories', categories], queryFn: () => GetCategoriesCount()})
    const listMeasurementUnits = useQuery({queryKey: ['measurement', measures], queryFn: () => GetMeasurements()})
    const listCash = useQuery({queryKey: ['cash', cash], queryFn: () => GetMinimumCash()})
    const mutationCreateCategorie = useMutation({ mutationFn: PostCreateCategorie })
    const mutationUpdateCategorie = useMutation({ mutationFn: PathcUpdateCategorie })
    const mutationDeleteCategorie = useMutation({ mutationFn: ADeleteCategorie })
    const mutationCreateMeasurement = useMutation({ mutationFn: PostMeasurements })
    const mutationUpdateMeasurement = useMutation({ mutationFn: PathcUpdateMeasurements })
    const mutationDeleteMeasurement = useMutation({ mutationFn: DeleteMeasurements })
    const mutationCash = useMutation({ mutationFn: PatchMinimumCash })

    useEffect(() => {
        setCategories(listCategories.data ?? []);
        setMeasures(listMeasurementUnits.data ?? []);
        setCash(listCash.data);
    }, [listCategories.data, listMeasurementUnits.data, listCash.data])

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

    const createNewMeasurement = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setForm(formData)
        const nombre = formData.get("measurement_name")?.toString() ?? "";
        const abreviatura = formData.get("abbreviate")?.toString() ?? "";
        const codigo = formData.get("code")?.toString() ?? "";

        if(nombre.length < 3 || abreviatura.length <= 1 || codigo.length <= 1){
            setError(true);
            return;
        }

        const payload: CreateunitOfMeasure = {nombre: nombre, abreviatura: abreviatura, codigo: codigo}

        try{
            setError(false)
            await mutationCreateMeasurement.mutateAsync(payload);
            setCategories([]);
            setSelectedMeasurementCreate(false);
        } catch(error: any){
            console.log(error)
            setError(true);
        }

    }

    const UpdateMeasureConfirm = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setForm(formData);
        setText("Esta seguro de modificar la Medida?");
        
        setConfirmationM(true);
    }

    const UpdateMeasurement = async () => {
        setConfirmationM(false);
        const formData = form;
        const id = formData?.get("id_measurement")?.toString() ?? "";
        const nombre = formData?.get("measurement_name")?.toString() ?? "";
        const abreviatura = formData?.get("abbreviate")?.toString() ?? "";
        const codigo = formData?.get("code")?.toString() ?? "";

        if(id == ""){
            setError(true);
            return;
        }

        const payload: UpdateunitOfMeasure = {id: id, nombre: nombre, abreviatura: abreviatura, codigo: codigo}

        try{
            setError(false);
            await mutationUpdateMeasurement.mutateAsync(payload);
            setMeasures([]);
            setSelectedMeasureUpdate(undefined)
        } catch(error: any){
            setError(true);
        }
    }

    const DeleteMeasureConfirm = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setForm(formData);
        setText("Esta seguro de eliminar la Medida?");
        
        setConfirmationMD(true);
    }

    const DeleteMeasurement = async () => {
        setConfirmationMD(false);
        const formData = form;
        const id = formData?.get("id_measurement")?.toString() ?? "";

        if(id == ""){
            setError(true);
            return;
        }

        const payload: DeleteunitOfMeasure = {id: id}

        try{
            setError(false);
            await mutationDeleteMeasurement.mutateAsync(payload);
            setMeasures([]);
            setSelectedMeasureDelete(undefined)
        } catch(error: any){
            setError(true);
        }
    }

    const confirmationUpdateCash = async () => {
        setConfirmation(false)
        const formData = form;
        const id = formData?.get("id")?.toString() ?? "";
        const cash = Number(formData?.get("cash") ?? 0);

        if(cash <= 0 || id == ""){
                setErrorHeaderCash(true);
                return;
        }
    
        const payload: updateCash = {id_billete_visual: id, minimum_cash: cash}

        try{
            setErrorHeaderCash(false)
            await mutationCash.mutateAsync(payload);
            setCash(undefined);
            setIsEditingBill(false);
        } catch(error: any){
            setErrorHeaderCash(true);
        }
    }

    const updateMinimumCash = (e: React.SubmitEvent) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        setForm(formData);
        setText("Esta seguro de cambiar el billete minimo? (Esto Afectara a como se sacan los precios en los productos)");
        setConfirmation(true);
    }


    return (
        <div className="min-h-screen bg-[#F7F6F3] p-6 text-gray-800 font-sans">
        
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    Categorías y Medidas
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gestión de agrupaciones, unidades de venta y regla de redondeo de billete mínimo.
                </p>
                </div>
            </div>

            {headerError && 
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center mb-5">
                    <p className="text-md text-red-700 font-semibold flex">Error: {listCategories.isError || listMeasurementUnits.isError || listCash.isError ? ( listCash.error?.message) : (<p> </p>)}</p>
                </div>
            }

            {headerErrorCash && 
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center mb-5">
                    <p className="text-md text-red-700 font-semibold">Error: Ocurrio un error al actualizar el billete minimo</p>
                </div>
            }

            <div className="space-y-6 max-w-6xl mx-auto">

                {/* SECTION 1: BILLETE MÍNIMO PARA REDONDEO */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100">
                            <Banknote className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                            <h2 className="text-base font-bold text-gray-900">Billete Mínimo de Aceptación (Redondeo PVP)</h2>
                            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                                Regla de Negocio
                            </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">
                            Ajusta automáticamente el PVP final al múltiplo del billete mínimo en efectivo en circulación.
                            </p>
                        </div>
                        </div>

                        {!isEditingBill ? (
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <span className="block text-xs font-medium text-gray-400 uppercase">Mínimo Actual</span>
                                    <span className="text-xl font-extrabold text-gray-900">{cash?.minimum_cash.toFixed(2)} VES</span>
                                </div>
                                <button
                                onClick={() => { setTempBill(minBill); setIsEditingBill(true); }}
                                className="cursor-pointer px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 transition-colors flex items-center gap-1.5"
                                >
                                <Pencil className="w-4 h-4 text-gray-500" />
                                Modificar
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <span className='mx-2 text-gray-900 font-extrabold'>Valor actual: {cash?.minimum_cash}</span>
                                <form onSubmit={updateMinimumCash} method='POST' className="relative flex">
                                    <input type='hidden' name='id' value={cash?.id_billete_visual}/>
                                    <input type="number" name='cash' step="1" min="0" className="w-28 pl-4 pr-3 py-1.5 bg-gray-50 border border-amber-300 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                    {mutationCash.isPending ? 
                                        <button className="h-7 mt- ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors" disabled>
                                            Guardando... 
                                            <div className='text-white animate-spin'></div>
                                        </button> :
                                        <button className="cursor-pointer h-7 mt-1.5 ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors">
                                            Guardar 
                                        </button>
                                    }
                                </form>
                                <button onClick={() => setIsEditingBill(false)} className="cursor-pointer mt-0.5 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-xl transition-colors">
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs text-amber-700 bg-amber-50/50 px-3 py-2 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Los precios calculados en la caja registradora se ajustarán automáticamente hacia arriba tomando como base este monto mínimo.</span>
                    </div>
                </div>

                {/* SECTION 2: CATEGORÍAS (ACORDEÓN) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header Acordeón */}
                <div 
                    onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                    className="flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                >
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
                    <button
                        onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategorieCreate(true);
                        }}
                        className="cursor-pointer px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Nueva Categoría
                    </button>
                    <div className="text-gray-400 p-1 rounded-lg hover:bg-gray-100">
                        {isCategoriesOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                    </div>
                </div>

                {/* Body Acordeón */}
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
                                <button 
                                    onClick={() => setSelectedCategorieUpdate(cat)}
                                    title="Editar Categoría"
                                    className="cursor-pointer p-1.5 text-gray-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => setSelectedCategorieDelete(cat)}
                                    title="Eliminar Categoría"
                                    className="cursor-pointer p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>

                {/* SECTION 3: UNIDADES DE MEDIDA (ACORDEÓN) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header Acordeón */}
                <div 
                    onClick={() => setIsMeasuresOpen(!isMeasuresOpen)}
                    className="flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                >
                    <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
                        <Ruler className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Unidades de Medida</h2>
                        <p className="text-xs text-gray-500">Unidades empleadas para definir presentación y pesaje</p>
                    </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMeasurementCreate(true);
                            }}
                            className="cursor-pointer px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 shadow-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Nueva Medida
                        </button>
                        <div className="text-gray-400 p-1 rounded-lg hover:bg-gray-100">
                            {isMeasuresOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                    </div>
                </div>

                {/* Body Acordeón */}
                {isMeasuresOpen && (
                    <div className="p-5 bg-gray-50/30">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {measures.map((m: UnitOfMeasure) => (
                        <div key={m.id} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between hover:border-blue-200 transition-all">
                            <div>
                            <span className="block font-bold text-gray-800 text-sm">{m.nombre}</span>
                            <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 mt-1 inline-block">
                                {m.abreviatura}
                            </span>
                            </div>

                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => setSelectedMeasureUpdate(m)}
                                    title="Editar Medida"
                                    className="cursor-pointer p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                    onClick={() => setSelectedMeasureDelete(m)}
                                    title="Eliminar Medida"
                                    className="cursor-pointer p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>

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

            {selectedMeasurementCreate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h3 className="font-mono font-bold text-lg text-slate-800">Crear Nueva Unidad Medida</h3>
                            </div>
                            <span onClick={() => setSelectedMeasurementCreate(false)} className="text-slate-400 cursor-pointer hover:text-slate-600 font-bold">
                                <X />
                            </span>
                        </div>

                        <form onSubmit={createNewMeasurement} method='POST'>
                            <div className='text-black mb-5'>
                                <label htmlFor='measurement_name'>Nombre: </label> <br/>
                                <input type='text' id='measurement_name' name='measurement_name' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='Nombre de la medida' required/>
                            </div>
                             <div className='text-black mb-5'>
                                <label htmlFor='abbreviate'>Abreviatura: </label> <br/>
                                <input type='text' id='abbreviate' name='abbreviate' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='abreviatura de la medida' required/>
                            </div>
                             <div className='text-black mb-5'>
                                <label htmlFor='code'>Codigo estandar: </label> <br/>
                                <input type='text' id='code' name='code' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='PKG' required/>
                            </div>
                            <Button loading={mutationCreateCategorie.isPending} textLoad='Creando...' text='Crear unidad de medida' />
                            {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al crear la unidad de medida </p></div>}
                        </form>
                    </div>
                </div>
            )}

            {selectedMeasureUpdate && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h3 className="font-mono font-bold text-lg text-slate-800">Modificar Unidad Medida</h3>
                            </div>
                            <span onClick={() => setSelectedMeasureUpdate(undefined)} className="text-slate-400 cursor-pointer hover:text-slate-600 font-bold">
                                <X />
                            </span>
                        </div>

                        <form onSubmit={UpdateMeasureConfirm} method='POST'>
                            <input type='hidden' name='id_measurement' value={selectedMeasureUpdate.id} readOnly/>
                            <div className='text-black mb-5'>
                                <label htmlFor='measurement_name'>Nombre: </label> <br/>
                                <input type='text' id='measurement_name' name='measurement_name' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='Nombre de la medida'/>
                            </div>
                             <div className='text-black mb-5'>
                                <label htmlFor='abbreviate'>Abreviatura: </label> <br/>
                                <input type='text' id='abbreviate' name='abbreviate' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='abreviatura de la medida'/>
                            </div>
                            <div className='text-black mb-5'>
                                <label htmlFor='code'>Codigo: </label> <br/>
                                <input type='text' id='code' name='code' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='Codigo estandar'/>
                            </div>
                            <Button loading={mutationUpdateCategorie.isPending} textLoad='MOdificando...' text='Modificar unidad de medida' />
                            {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al eliminar la unidad de medida </p></div>}
                        </form>
                    </div>
                </div>
            )}


            {selectedMeasureDelete && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border">
                        <div className="flex justify-between items-center border-b pb-2">
                            <div>
                                <h3 className="font-mono font-bold text-lg text-slate-800">Eliminar Unidad Medida</h3>
                            </div>
                            <span onClick={() => setSelectedMeasureDelete(undefined)} className="text-slate-400 cursor-pointer hover:text-slate-600 font-bold">
                                <X />
                            </span>
                        </div>

                        <form onSubmit={DeleteMeasureConfirm} method='POST'>
                            <input type='hidden' name='id_measurement' value={selectedMeasureDelete.id} readOnly/>
                            <div className='text-black mb-5'>
                                <label htmlFor='measurement_name'>Nombre: </label> <br/>
                                <input type='text' id='measurement_name' name='measurement_name' value={selectedMeasureDelete.nombre} className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='Nombre de la medida' readOnly/>
                            </div>
                            <div className='text-black mb-5'>
                                <label htmlFor='abbreviate'>Abreviatura: </label> <br/>
                                <input type='text' id='abbreviate' name='abbreviate' value={selectedMeasureDelete.abreviatura} className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-3 focus:bg-white focus:outline-amber-200' placeholder='abreviatura de la medida' readOnly/>
                            </div>
                            <Button loading={mutationDeleteCategorie.isPending} textLoad='Eliminando...' text='Eliminar unidad de medida' />
                            {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al eliminar la unidad de medida </p></div>}
                        </form>
                    </div>
                </div>
            )}

            <Confirmation confirmation={confirmation} text={text} confirmationUpdateCash={confirmationUpdateCash} setConfirmation={setConfirmation}/>
            <Confirmation confirmation={confirmationC} text={text} confirmationUpdateCash={UpdaCategorie} setConfirmation={setConfirmationC}/>
            <Confirmation confirmation={confirmationCD} text={text} confirmationUpdateCash={DeleteCategorie} setConfirmation={setConfirmationCD}/>
            <Confirmation confirmation={confirmationM} text={text} confirmationUpdateCash={UpdateMeasurement} setConfirmation={setConfirmationM}/>
            <Confirmation confirmation={confirmationMD} text={text} confirmationUpdateCash={DeleteMeasurement} setConfirmation={setConfirmationMD}/>
        </div>
    );
};

export default categoriesAndMeasuresPage;