import { useState } from 'react';
import MinimumCash from '../components/minimumCash';
import Categories from '../components/categories';
import Measurements from '../components/measurementUnits';

function categoriesAndMeasuresPage(){
    const [headerError, setErrorHeader] = useState(false);
    const [headerErrorCash, setErrorHeaderCash] = useState(false);    

    return (
        <div className="min-h-screen bg-[#F7F6F3] p-6 text-gray-800 font-sans">
        
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    Categorías y Medidas
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Gestión de agrupaciones, unidades de venta y regla de redondeo de billete mínimo.
                </p>
                </div>
            </div>

            {headerError && 
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center mb-5">
                    <p className="text-md text-red-700 font-semibold flex">Error: Ha ocurrido un error al tratar de conectar con el servidor!</p>
                </div>
            }

            {headerErrorCash && 
                <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-md flex flex-col md:flex-row items-center mb-5">
                    <p className="text-md text-red-700 font-semibold">Error: Ocurrio un error al actualizar el billete minimo</p>
                </div>
            }

            <div className="space-y-6 max-w-6xl mx-auto">
                <MinimumCash setErrorHeader={setErrorHeader} setErrorHeaderCash={setErrorHeaderCash}/>

                <Categories setErrorHeader={setErrorHeader}/>

                <Measurements setErrorHeader={setErrorHeader}/>
            </div>
        </div>
    );
};

export default categoriesAndMeasuresPage;