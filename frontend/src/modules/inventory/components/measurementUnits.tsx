import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@tanstack/react-query"
import { ChevronDown, ChevronUp, Plus, Pencil, Trash2, Ruler, X } from 'lucide-react';
import type { UnitOfMeasure, CreateunitOfMeasure, DeleteunitOfMeasure, UpdateunitOfMeasure } from '../types/measurementUnits';
import { GetMeasurements, PostMeasurements, PathcUpdateMeasurements , DeleteMeasurements } from '../services/measurementUnits';
import Button from '../components/button';
import Confirmation from '../components/confirmation';

interface propsMeasurements{
    setNotification: React.Dispatch<React.SetStateAction<string>>;
    setErrorHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

function Measurements({setNotification, setErrorHeader}: propsMeasurements){
    const [text, setText] = useState("");
    const [error, setError] = useState(false);
    const [selectedMeasurementCreate, setSelectedMeasurementCreate] = useState(false);
    const [selectedMeasureUpdate, setSelectedMeasureUpdate] = useState<UnitOfMeasure>();
    const [selectedMeasureDelete, setSelectedMeasureDelete] = useState<UnitOfMeasure>();
    const [confirmationM, setConfirmationM] = useState(false);
    const [confirmationMD, setConfirmationMD] = useState(false);
    const [isMeasuresOpen, setIsMeasuresOpen] = useState(true);
    const [measures, setMeasures] = useState<UnitOfMeasure[]>([]);
    const [form, setForm] = useState<FormData | undefined>();
    const listMeasurementUnits = useQuery({queryKey: ['measurement', measures], queryFn: () => GetMeasurements()})
    const mutationCreateMeasurement = useMutation({ mutationFn: PostMeasurements })
    const mutationUpdateMeasurement = useMutation({ mutationFn: PathcUpdateMeasurements })
    const mutationDeleteMeasurement = useMutation({ mutationFn: DeleteMeasurements })
    setErrorHeader(listMeasurementUnits.isError);
    
    useEffect(() => {
        setMeasures(listMeasurementUnits.data ?? []);
    }, [listMeasurementUnits.data])

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
            setMeasures([]);
            setNotification(`La unidad de medida ${nombre} (${abreviatura}) se registró correctamente.`)
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
            setNotification(`Los cambios en la unidad ${selectedMeasureUpdate?.nombre} ${selectedMeasureUpdate?.abreviatura} se guardaron correctamente.`)
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
            setNotification(`La unidad de medida ${selectedMeasureDelete?.nombre} ${selectedMeasureDelete?.abreviatura} fue eliminada del sistema.`)
            setSelectedMeasureDelete(undefined)
        } catch(error: any){
            setError(true);
        }
    }

    return(
        <>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div onClick={() => setIsMeasuresOpen(!isMeasuresOpen)} className="flex items-center justify-between p-5 cursor-pointer bg-white hover:bg-gray-50/50 transition-colors border-b border-gray-100">
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
                        <button onClick={(e) => {e.stopPropagation(); setSelectedMeasurementCreate(true);}} className="cursor-pointer px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 shadow-sm">
                            <Plus className="w-4 h-4" />
                            Nueva Medida
                        </button>
                        <div className="text-gray-400 p-1 rounded-lg hover:bg-gray-100">
                            {isMeasuresOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                    </div>
                </div>

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
                                    <button onClick={() => setSelectedMeasureUpdate(m)} title="Editar Medida" className="cursor-pointer p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => setSelectedMeasureDelete(m)} title="Eliminar Medida" className="cursor-pointer p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

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
                            <Button loading={mutationCreateMeasurement.isPending} textLoad='Creando...' text='Crear unidad de medida' />
                            {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al crear la unidad de medida (No pueden haber dos medidas con el mismo nombre) </p></div>}
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
                            <Button loading={mutationUpdateMeasurement.isPending} textLoad='Modificando...' text='Modificar unidad de medida' />
                            {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al eliminar la unidad de medida (No pueden haber dos medidas con el mismo nombre) </p></div>}
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
                            <Button loading={mutationDeleteMeasurement.isPending} textLoad='Eliminando...' text='Eliminar unidad de medida' />
                            {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md mt-4'> <p> Ha ocurrido un error al eliminar la unidad de medida </p></div>}
                        </form>
                    </div>
                </div>
            )}

            <Confirmation confirmation={confirmationM} text={text} action={UpdateMeasurement} setConfirmation={setConfirmationM}/>
            <Confirmation confirmation={confirmationMD} text={text} action={DeleteMeasurement} setConfirmation={setConfirmationMD}/>
        </>
    )
}

export default Measurements;