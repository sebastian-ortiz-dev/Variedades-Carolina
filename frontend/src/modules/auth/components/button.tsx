import { LogIn, LoaderCircleIcon } from 'lucide-react';

export function ButtonForm({ isLoading }){
    return(
        <>
            { isLoading ? 
            <button type='submit' className='w-full flex items-center-safe justify-center-safe cursor-pointer bg-amber-500  text-white py-1.5 rounded-md hover:duration-300 hover:bg-amber-600 focus:outline-offset-2 focus:outline-amber-500 active:bg-amber-700' disabled>
            <LoaderCircleIcon className='size-5 mx-1 animate-spin'/>
            Ingresando...
            </button> : 
            <button type='submit' className='w-full flex items-center-safe justify-center-safe cursor-pointer bg-amber-500  text-white py-1.5 rounded-md hover:duration-300 hover:bg-amber-600 focus:outline-offset-2 focus:outline-amber-500 active:bg-amber-700'>
            <LogIn className='size-5 mx-1 '/>
            Ingresar
            </button>
            }
        </>
    )
}