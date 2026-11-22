import { X, LayoutDashboard, Package, ReceiptText, UserRoundMinusIcon, Coins, Cog, ArrowLeft, LogOut, TriangleAlert } from 'lucide-react';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router";
import { LogOutSession } from "../services/logout";
import type { UseQueryResult } from '@tanstack/react-query';
import type { userdata } from '../types/interfacesUser';
import { GetCountInventory } from '../services/inventory';

interface propHidden{
    hidden: boolean;
    setHidden: React.Dispatch<React.SetStateAction<boolean>>;
    userData: UseQueryResult<userdata, Error>;
}

function NavBarComponent({ hidden, setHidden, userData }: propHidden){
    const logoutMutation = useMutation({mutationFn: LogOutSession})
    const [inventory, setInventory] = useState(false);
    const navigate = useNavigate();
    const countData = useQuery({queryKey: ['count'], queryFn: () => GetCountInventory()})
    const count = countData.data ?? 0;
    const user = userData.data
    const rolUser = userData.data?.rol ?? 'Trabajador'

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
                    { userData.isError ? (<>    
                        <div className='bg-red-300 border border-red-600'>
                            <p className='text-center'>Error al cargar los datos de sesion</p> 
                        </div>   
                        </>) : 
                        userData.isLoading ? (
                            <>
                                <div className='ml-36 mt-2 animate-spin text-amber-200'></div>
                                <p className='text-center'>Cargando datos...</p>
                            </>
                        )
                        :
                        (
                            <>
                                <div className='ml-36 mt-2'>
                                    <img src={user?.imagen} alt={`${user?.name}_imagen`} className='w-19 h-19 border border-amber-200 rounded-[50%] text-[12px]'/>
                                </div>
                                <p className='text-center'>{user?.name}</p>
                                <p className='text-center mb-2'>{user?.rol}</p>
                            </>
                        )
                    }
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
                        <div onClick={() => navigate("/inventory/list")} className='flex justify-between h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
                            <h2 className='ml-4'>Listado de productos</h2>
                            <TriangleAlert className={`mr-4 ` + (count > 5 ? 'text-red-500' : count < 5 ? 'text-yellow-500' : 'hidden')} />
                        </div>
                        <div onClick={() => navigate("/inventory/moviments")} className='h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
                            <h2 className='ml-4'>Movimientos</h2>
                        </div>
                        <div onClick={() => navigate("/inventory/historial")} className='h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
                            <h2 className='ml-4'>Historial de movimientos</h2>
                        </div>
                        <div  onClick={() => navigate("/inventory/categories-measurement")} className='h-10 cursor-pointer pt-2 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-6'>
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
                    {rolUser.toLowerCase() !== 'trabajador' && (
                        <div className='cursor-pointer w-full h-15 items-center-safe boder-t-2 border-slate-500 duration-200 hover:duration-250 hover:bg-amber-300 hover:text-white hover:pl-2'>
                            <div className='inline-flex pt-4.5'>
                                <h2 className='mr-5 ml-2'>Administración</h2>
                                <Cog />
                            </div>
                        </div>
                    )}
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