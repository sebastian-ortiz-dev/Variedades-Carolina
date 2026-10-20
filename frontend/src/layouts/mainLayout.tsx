import { Outlet } from 'react-router';
import logo from '../assets/screen.png';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import NavBarComponent from '../components/navBar';

function NavbarNavegation(){
    const[navHidden, setNavHidden] = useState(false);

    return(
        <>
            <NavBarComponent hidden={navHidden} setHidden={setNavHidden} />

            <header className={'h-max bg-white shadow-sm py-2 md:py-3 lg:py-3' + (navHidden ? "md:w-6.5xl md:ml-90 lg:w-6.5xl lg:ml-90": "md:w-full lg:w-full" )}>
                <div className='flex items-center-safe md:flex md:items-center-safe lg:flex lg:items-center-safe'>
                    {navHidden ? <X onClick={() => setNavHidden(!navHidden)} className='cursor-pointer ml-1 md:ml-4 lg:ml-5'/> : <Menu onClick={() => setNavHidden(!navHidden)} className='cursor-pointer ml-1 md:ml-4 lg:ml-5 '/>}
                    <div className='mx-1 md:mx-4 md:relative lg:mx-5 lg:relative'>
                        <img src={logo} alt='variedades_carolina_logo' className='w-20 h-20 border border-amber-200 rounded-[50%]'/>
                    </div>
                    <div className='w-max items-center-safe'>
                        <h1 className='text-[18px] lg:text-3xl md:w-full lg:w-ful font-bold'> Variedades Carolina </h1>
                    </div>

                    <div className='ml-auto inline-flex items-end-safe w-max bg-green-200 text-green-900 border border-green-400 rounded-xl mb-1 mt-6 mr-1 md:mt-0 md:mb-0 md:ml-auto md:mr-10 lg:mt-0 lg:mb-0 lg:ml-auto lg:mr-10'>
                        <span className='absolute inline-flex animate-ping size-3 rounded-full bg-green-600 opacity-75 mb-1.5 ml-2'></span>
                        <span className="inline-flex size-3 rounded-full bg-green-500 items-center mb-1.5 ml-2"></span>
                        <span className='px-1'>● Sistema Local activo</span>
                    </div>
                </div>
            </header>

            <main className={'mt-1 h-max px-5 ' + (navHidden ? "md:w-6.5xl md:ml-90 lg:w-6.5xl lg:ml-90": "md:w-full lg:w-full" )}>
                <Outlet />
            </main>
        </>
    )
}

export default NavbarNavegation