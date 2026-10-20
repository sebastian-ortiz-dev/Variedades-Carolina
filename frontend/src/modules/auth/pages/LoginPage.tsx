import { FormLogin } from '../components/form';
import logo from '../../../assets/screen.png';

function App() {
  return (
    <>
    <title>Iniciar Sessión</title>

      <header className='w-full h-max bg-white shadow-sm py-2 md:py-3 lg:py-3'>
        <div className='md:flex md:justify-between md:items-center-safe lg:flex lg:justify-between lg:items-center-safe'>
          <div className='absolute px-1 md:px-4 lg:px-5'>
            <img src={logo} alt='variedades_carolina_logo' className='w-20 h-20 border border-amber-200 rounded-[50%]'/>
          </div>
          <div className='flex-col px-22 md:px-25 lg:px-30'>
            <div className='w-max flex items-center-safe '>
              <h1 className='text-xl lg:text-3xl md:w-full lg:w-full font-bold'> Variedades Carolina </h1>
              <span className='w-19 ml-2 md:w-28 lg:w-28 inline-flex text-sm md:px-2 lg:px-2 py-0.5 text-amber-900 text-center-safe font-medium bg-amber-100 border border-amber-300 rounded-md'>ERP LOCAL</span>
            </div> 

            <p className='py-1'>Todo en un solo lugar</p>
          </div>

          <div className='relative inline-flex items-end-safe w-max bg-green-200 text-green-900 border border-green-400 rounded-xl ml-11 mb-1 mt-6 mr-1 md:mt-0 md:mb-0 md:ml-0 md:mr-10 lg:mt-0 lg:mb-0 lg:ml-0 lg:mr-10'>
            <span className='absolute inline-flex animate-ping size-3 rounded-full bg-green-600 opacity-75 mb-1.5 ml-2'></span>
            <span className="inline-flex size-3 rounded-full bg-green-500 items-center mb-1.5 ml-2"></span>
            <span className='px-1'>● Sistema Local activo • Modo Offline</span>
          </div>
        </div>
      </header>

      <main className='flex-wrap p-4'>
        <FormLogin />
      </main>

      <footer className='w-full h-max bg-white shadow-sm py-5 mt-55 md:mt-auto lg:mt-20 '>
        <p className=' md:ml-5 lg:ml-5'>
          <strong>Variedades Carolina</strong> ● Todo en un solo lugar
        </p>
        
      </footer>
    </>
  )
}

export default App