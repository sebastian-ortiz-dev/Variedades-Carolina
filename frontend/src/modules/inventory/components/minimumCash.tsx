import { Pencil, Banknote, AlertCircle } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { listCash, updateCash } from '../types/minimumCash';
import { GetMinimumCash, PatchMinimumCash } from '../services/minimumCashService';
import Confirmation from './confirmation';

interface propsCash{
    setErrorHeader: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorHeaderCash: React.Dispatch<React.SetStateAction<boolean>>;
}

function MinimumCash({setErrorHeader, setErrorHeaderCash}: propsCash){
    const [text, setText] = useState("");
    const [cash, setCash] = useState<listCash | undefined>();
    const [isEditingBill, setIsEditingBill] = useState(false);
    const [form, setForm] = useState<FormData | undefined>();
    const [confirmation, setConfirmation] = useState(false);
    const listCash = useQuery({queryKey: ['cash', cash], queryFn: () => GetMinimumCash()})
    const mutationCash = useMutation({ mutationFn: PatchMinimumCash })
    setErrorHeader(listCash.isError);

    useEffect(() => {
            setCash(listCash.data);
    }, [listCash.data])

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

    return(
        <>
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
                            <button onClick={() => { setIsEditingBill(true); }} className="cursor-pointer px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 transition-colors flex items-center gap-1.5">
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
            <Confirmation confirmation={confirmation} text={text} action={confirmationUpdateCash} setConfirmation={setConfirmation}/>
        </>
    )
}

export default MinimumCash;