import { Info } from "lucide-react"

function Confirmation({confirmation, text, confirmationUpdateCash, setConfirmation}: any){
    return(
        <>
        {confirmation && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 " >
                    <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-5 space-y-4 border text-center items-center-safe">
                        <Info className='w-35 h-35 text-blue-400 mx-auto'/>
                        <p className='text-slate-900'>{text}</p>
                        <div className='flex justify-center-safe gap-3'> 
                            <button onClick={confirmationUpdateCash} className="cursor-pointer ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 hover:duration-500 text-white text-md font-semibold rounded-xl transition-colors">
                                Confirmar 
                            </button>
                            <button onClick={() => setConfirmation(false)} className="cursor-pointer  px-3 py-1.5 bg-gray-200 hover:bg-gray-300 hover:duration-500 text-gray-700 text-md font-semibold rounded-xl transition-colors">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Confirmation;