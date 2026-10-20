import logo from '../assets/screen.png';
import { X, LayoutDashboard, Package, ReceiptText, UserRoundMinusIcon, Coins, Cog, ArrowLeft, LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from "react-router";
import { LogOutSession } from "../services/logout";

interface propHidden{
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBarComponent({ hidden, setHidden }: propHidden){
    const logoutMutation = useMutation({mutationFn: LogOutSession})
    const[inventory, setInventory] = useState(false);
    const navigate = useNavigate();

    const clearSession = async() => {
        const data = await logoutMutation.mutateAsync();
        data.message
        localStorage.clear();
        navigate("/login"); 
    }

    return(
        <>
            <nav className={'fixed h-full w-90 z-40 bg-white shadow-md ' + (hidden ? "block" : "hidden" )}>
                <div className='w-full items-center-safe border-b-2 border-slate-300'>
                    <X onClick={() => setHidden(!hidden)} className='absolute ml-80 mt-2 md:hidden lg:hidden'/>
                    <div className='ml-36 mt-2'>
                        <img src={logo} alt='variedades_carolina_logo' className='w-19 h-19 border border-amber-200 rounded-[50%]'/>
                    </div>
                    <p className='text-center'>Nombre</p>
                    <p className='text-center mb-2'>Administrador</p>
                </div>
                <div className='flex-row'>
                    <div onClick={() => navigate("/dashboard")} className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-2'>
                        <div className='inline-flex pt-4.5'>
                            <h2 className='mr-5 ml-2'>Vista General</h2>
                            <LayoutDashboard />
                        </div>
                    </div>
                    <div onClick={() => setInventory(!inventory)} className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-250 hover:duration-200 hover:bg-amber-300 hover:text-white hover:pl-2'>
                        <div className='inline-flex pt-4.5'>
                            <h2 className='mr-5 ml-2'>Inventario</h2>
                            <Package className='mr-2' />
                            <ArrowLeft className={'' + (inventory ? "-rotate-90 duration-250 ml-45" : "-rotate-0 duration-250 ml-45")} />
                        </div>
                    </div>
                    <div className={'' + (inventory ? "block" : "hidden")}>
                        <div onClick={() => navigate("/inventory")} className='h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
                            <h2 className='ml-4'>Listado de productos</h2>
                        </div>
                        <div className='h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
                            <h2 className='ml-4'>Movimientos</h2>
                        </div>
                        <div className='h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
                            <h2 className='ml-4'>Historial de movimientos</h2>
                        </div>
                        <div className='h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
                            <h2 className='ml-4'>Categorias y Medidas</h2>
                        </div>
                    </div>
                    <div className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-2'>
                        <div className='inline-flex pt-4.5'>
                            <h2 className='mr-5 ml-2'>Ventas</h2>
                            <ReceiptText />
                        </div>
                    </div>
                    <div className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-2'>
                        <div className='inline-flex  pt-4.5'>
                            <h2 className='mr-5 ml-2'>Deudas</h2>
                            <UserRoundMinusIcon />
                        </div>
                    </div>
                    <div className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-2'>
                        <div className='inline-flex pt-4.5'>
                            <h2 className='mr-5 ml-2'>Moneda y Tasas</h2>
                            <Coins />
                        </div>
                    </div>
                    <div className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-2'>
                        <div className='inline-flex pt-4.5'>
                            <h2 className='mr-5 ml-2'>Administración</h2>
                            <Cog />
                        </div>
                    </div>
                    <div onClick={clearSession} className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-250 hover:bg-red-500 hover:text-white hover:duration-200 hover:pl-2'>
                        <div className='inline-flex pt-4.5'>
                            <h2 className='mr-5 ml-2'>Cerrar Sesion</h2>
                            <LogOut />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBarComponent;