import { Store, NotepadText, TriangleAlert } from "lucide-react"

function dashboard(){
    return(
        <>
            <title>Dashboard</title>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="mt-2">
                    <div className="flex items-center gap-2">
                    <Store className="size-15 text-gray-600" />
                    <h1 className="text-2xl font-bold text-gray-800">Panel Principal</h1>
                    </div>
                    <p className="text-xl text-gray-500 mt-1">Resumen operativo de la tienda</p>
                </div>


                <div className="flex items-center gap-3 bg-amber-50/90 border border-amber-200/80 px-4 py-2.5 rounded-2xl w-fit">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center font-bold text-amber-800 text-xs shrink-0">
                    BCV
                    </div>
                    <div>
                    <span className="text-md uppercase font-bold text-amber-700/90 block leading-tight">
                        Tasa Oficial del Día
                    </span>
                    <span className="text-base font-extrabold text-amber-950">
                        36.50 VES/USD
                    </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-1 lg:col-span-1 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Ventas Hoy
                        </span>
                        <span className="px-2 py-0.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full">
                            ↑ +15%
                        </span>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-2xl md:text-3xl font-extrabold text-gray-900">
                            $450.00 <span className="text-xs font-bold text-gray-500">USD</span>
                        </span>
                        <span className="text-base md:text-lg font-bold text-gray-500">
                            / 16,425.00 <span className="text-xs font-semibold">VES</span>
                        </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                    Calculado a la tasa actual activa
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
                        Cuentas por Cobrar
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
                        $480.00 <span className="text-xs font-bold text-gray-500">USD</span>
                    </h3>
                    <p className="text-xs text-indigo-600 font-medium mt-1">
                        3 clientes pendientes
                    </p>
                    </div>
                    <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold shrink-0">
                        <NotepadText />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                    <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block">
                        Stock Crítico
                    </span>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-amber-600 mt-1">
                        12 <span className="text-base font-bold text-gray-700">Alertas</span>
                    </h3>
                    <p className="text-xs text-amber-600 font-medium mt-1">
                        Por debajo del stock mínimo
                    </p>
                    </div>
                    <div className="w-11 h-11 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold shrink-0">
                        <TriangleAlert />
                    </div>
                </div>

                <div className="col-span-1 mg:col-span-2 lg:col-span-2 gap-3 ">
                    <div className="lg:col-span-2 md:col-span-2 bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-base md:text-lg font-bold text-gray-800">
                            Tendencia de Ventas Semanales (USD)
                            </h2>
                            <p className="text-xs text-gray-400">Comparativa diaria de ingresos</p>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                            Últimos 7 días
                        </span>
                        </div>
                        
                        <div className="h-64 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400">
                            <span className="text-2xl">📊</span>
                            <span className="text-xs font-medium">[ Contenedor para Gráfico de Recharts / Chart.js ]</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">

                    <div className="bg-white p-5 lg:col-span-6 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base md:text-lg font-bold text-gray-800">
                            Cuentas por Cobrar (Deudores)
                        </h2>
                        <button className="cursor-pointer text-xs text-indigo-600 font-bold hover:underline">Ver todos</button>
                        </div>

                        <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                            <p className="text-sm font-semibold text-gray-800">Juan Pérez</p>
                            <p className="text-xs text-gray-400">30 días de mora</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900">$150.00 USD</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                            <p className="text-sm font-semibold text-gray-800">María García</p>
                            <p className="text-xs text-gray-400">15 días de mora</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900">$90.00 USD</span>
                        </div>
                        </div>
                    </div>
                
                </div>

                <div className="lg:col-span-1">

                    <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base md:text-lg font-bold text-gray-800">
                                Stock por Agotarse
                                </h2>
                                <span className="px-2.5 py-0.5 text-xs font-bold text-red-700 bg-red-50 rounded-full">
                                Urgente
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl border border-red-100/80">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Harina PAN 1kg</p>
                                        <p className="text-xs text-red-600 font-medium mt-0.5">Quedan 2 unidades</p>
                                    </div>
                                <button className="px-3 py-1 text-xs font-semibold text-red-700 bg-white border border-red-200 rounded-lg shadow-2xs hover:bg-red-50 transition-colors">
                                    Reponer
                                </button>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl border border-amber-100/80">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Leche Completa 1L</p>
                                        <p className="text-xs text-amber-700 font-medium mt-0.5">Quedan 5 unidades</p>
                                    </div>
                                    <button className="px-3 py-1 text-xs font-semibold text-amber-800 bg-white border border-amber-200 rounded-lg shadow-2xs hover:bg-amber-50 transition-colors">
                                        Reponer
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button className="w-full cursor-pointer mt-4 py-2 text-xs font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                        Ver Todo el Inventario →
                        </button>
                    </div>
                </div>

                <div className="bg-white p-5 lg:col-span-1  md:p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base md:text-lg font-bold text-gray-800">
                            Últimas Transacciones
                        </h2>
                        <button className="cursor-pointer text-xs text-emerald-600 font-bold hover:underline">Ir a Caja</button>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg">#00154</span>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">Venta de Contado</p>
                                <p className="text-xs text-gray-400">14:32 PM - Pago Móvil</p>
                            </div>
                            </div>
                            <span className="text-sm font-bold text-emerald-600">+$12.50 USD</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <div className="bg-white p-5 lg:col-span-6 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                        <h2 className="text-base md:text-lg font-bold text-gray-800">
                            Tasas de Cambio
                        </h2>
                        <button className="cursor-pointer text-xs text-green-800 font-bold hover:underline">Ver todos</button>
                        </div>

                        <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                            <p className="text-sm font-semibold text-gray-800">Dolar BCV</p>
                            </div>
                            <span className="text-sm font-bold text-gray-900">150.00 BS</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div>
                            <p className="text-sm font-semibold text-gray-800">EURO</p>
                            
                            </div>
                            <span className="text-sm font-bold text-gray-900">190.00 BS</span>
                        </div>
                        </div>
                    </div>
                
                </div>
                
        
            </div>
        </>
    )
}

export default dashboard