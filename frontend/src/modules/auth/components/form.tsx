import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { RectangleEllipsis, UserRound, EyeClosed, Eye } from 'lucide-react';
import { PostUserByEmail } from '../services/userServices';
import { type UserDataEntry } from '../types/interfaces';
import { ButtonForm } from './button';

export function FormLogin(){
    const loginMutation = useMutation({ mutationFn: PostUserByEmail });
    const navigate = useNavigate();
    const [type, setType] = useState("password");
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    function changeInputType(){
        if(type == 'password'){
          setType("text");
          setShow(true);
        }else{
          setType("password");
          setShow(false);
        }
    }

    const validate = async(e: React.SubmitEvent) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const email = formData.get("correo");
      const password = formData.get("password");

      if(email == "" || password == ""){
        return;
      }

      const payload: UserDataEntry = {Email: email as string, Password: password as string};
      
      try{
        setError(false)
        const data = await loginMutation.mutateAsync(payload);
        localStorage.setItem("token", data.token); 
        localStorage.setItem("expireIn", data.expireIn.toString());
        navigate("/dashboard");
      } catch(error: any){
        setError(true);
        console.log(error)
      }
      
    }
    
    return(
        <>
        <form onSubmit={validate} method='POST' className='bg-white my-8 p-6 text-stone-800 w-[85%] lg:w-full max-w-md space-y-4 m-auto rounded-md shadow-sm hover:shadow-md' >
          <h2 className='text-xl text-center font-bold'>Acceso al Sistema</h2>
          <h2 className='text-center text-gray-600'>Ingresa tus credenciales para iniciar sessión</h2>
          <div className='text-black'>
            <label>Correo Electrónico: </label> <br/>
            <UserRound className='absolute text-gray-400 mt-2 ml-1'/>
            <input type='text' name='correo' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-8 focus:bg-white focus:outline-amber-200' placeholder='Correo Electronico' required/>
          </div>

          <div className='text-black'>
              <label>Contraseña: </label> <br/>
              <RectangleEllipsis className='absolute text-gray-400 mt-2 ml-1'/>
              {show ? <Eye onClick={changeInputType} className='absolute cursor-pointer text-gray-400 mt-2 ml-52 md:ml-90 lg:ml-90'/> : <EyeClosed onClick={changeInputType} className='absolute cursor-pointer text-gray-400 mt-2 ml-52 md:ml-90 lg:ml-90'/>}
              <input type={type} name='password' className='w-full h-10 bg-gray-50 border border-gray-200 rounded-md px-8 focus:bg-white focus:outline-amber-200' placeholder='Contraseña' required/>
          </div>
          <ButtonForm isLoading={loginMutation.isPending} />
          <div className='w-full flex p-1 bg-amber-100/95 border border-amber-400 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M21,12.22C21,6.73,16.74,3,12,3c-4.69,0-9,3.65-9,9.28C2.4,12.62,2,13.26,2,14v2c0,1.1,0.9,2,2,2h1v-6.1 c0-3.87,3.13-7,7-7s7,3.13,7,7V19h-8v2h8c1.1,0,2-0.9,2-2v-1.22c0.59-0.31,1-0.92,1-1.64v-2.3C22,13.14,21.59,12.53,21,12.22z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M18,11.03C17.52,8.18,15.04,6,12.05,6c-3.03,0-6.29,2.51-6.03,6.45c2.47-1.01,4.33-3.21,4.86-5.89 C12.19,9.19,14.88,11,18,11.03z"/></g></g></svg>
            <p>
              <strong>¿Olvidaste tu contraseña?</strong> Solicita autorización al dueño.
            </p>
          </div>
          {error &&<div className='w-full flex p-1 bg-amber-100/95 border border-red-500 rounded-md'> <p> Error! correo o contraseña invalido </p></div>}
        </form>
        </>
    )
}