import { LoaderCircleIcon } from "lucide-react";

interface buttonProps{
    loading: any;
    textLoad : string;
    text: string;
}

function Button({loading, textLoad, text}: buttonProps){
    return(
        <>
        { loading ? 
            <button type='submit' className='w-full flex items-center-safe justify-center-safe cursor-pointer bg-green-500  text-white py-1.5 rounded-md hover:duration-300 hover:bg-green-600 focus:outline-offset-2 focus:outline-green-500 active:bg-green-700' disabled>
                <LoaderCircleIcon className='size-5 mx-1 animate-spin'/>
                {textLoad}
            </button> :

            <button type='submit' className='w-full flex items-center-safe justify-center-safe cursor-pointer bg-green-500  text-white py-1.5 rounded-md hover:duration-300 hover:bg-green-600 focus:outline-offset-2 focus:outline-green-500 active:bg-green-700'>
                {text}
            </button>    
        }
        </>
    )
}

export default Button;