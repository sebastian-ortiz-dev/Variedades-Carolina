import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft} from 'lucide-react';
import type { historialParameters } from '../types/historial';
import type { ListMoviment } from '../types/moviments';
import { GetHistorial } from '../services/historial';
import { GetMoviments } from '../services/moviments';

export default function historialMovimientosView() {
  // Estados de filtros y paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(15); // 10 o 15 por defecto
  const [moviment, setMoviment] = useState(""); // 10 o 15 por defecto
  const todayStr = new Date().toISOString().split('T')[0];
  const [payload, setPayload] = useState<historialParameters>({fecha_fin: todayStr, fecha_inicio: todayStr, id_tipo_movimiento: "", limit: 15, page: 1, q: ""})
  const historial = useQuery({queryKey: ["historial", payload], queryFn: () => GetHistorial(payload)})
  const movimentsList = useQuery({queryKey: ["moviments"], queryFn: () => GetMoviments() })
  const moviments = movimentsList.data;
  const [fechaDesde, setFechaDesde] = useState(todayStr);
  const [fechaHasta, setFechaHasta] = useState(todayStr);
  
  const total_pages = historial.data?.total_pages ?? 1;
  const total_items = historial.data?.total_items ?? 0;
  const current_page = historial.data?.current_page ?? 1;
  const limitPage = historial.data?.limit ?? 15;

  const limitPerPage = (limit: number) => {
    console.log(limit)
    setPayload((prev: historialParameters) => ({
      ...prev,
      limit: limit,
    }));
  }

  const typeMoviment = (moviment: string) => {
    console.log(moviment)
    setPayload((prev: historialParameters) => ({
      ...prev,
      id_tipo_movimiento: moviment,
    }));
  }

  useEffect(() => {
    setPayload((prev: historialParameters) => ({
      ...prev,
      fecha_inicio: fechaDesde,
      fecha_fin: fechaHasta,
    }));
  }, [fechaDesde, fechaHasta])


  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Cabecera y Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-lg border-gray-100 shadow-sm">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-800">Historial de Movimientos</h1>
          <p className="text-xs text-slate-500">Auditoría de movimientos del inventario.</p>
        </div>

        {/* Filtros de Fecha y Límite */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex cursor-pointer items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-md border-gray-100 text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 font-medium">Desde:</span>
            <input 
              type="date" 
              value={fechaDesde} 
              onChange={(e) => setFechaDesde(e.target.value)}
              className="bg-transparent text-slate-700 outline-none font-mono"
            />
          </div>

          <div className="flex cursor-pointer items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-md border-gray-900 text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-500 font-medium">Hasta:</span>
            <input 
              type="date" 
              value={fechaHasta} 
              onChange={(e) => setFechaHasta(e.target.value)}
              className="bg-transparent text-slate-700 outline-none font-mono"
            />
          </div>

          <select 
            value={moviment} 
            onChange={(e) =>  { setMoviment(e.target.value); typeMoviment(e.target.value); setCurrentPage(1); }}
            className="bg-slate-50 border-gray-100 px-3 py-1.5 rounded-md text-xs text-slate-700 font-medium outline-none cursor-pointer"
          >
            <option value="">Listar por movimento</option>
            {moviments?.map((moviment: ListMoviment) => (
              <option value={moviment.id}>{moviment.nombre}</option>
            ))}
          </select>

          <select 
            value={limit} 
            onChange={(e) =>  { setLimit(Number(e.target.value)); limitPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="bg-slate-50 border-gray-100 px-3 py-1.5 rounded-md text-xs text-slate-700 font-medium outline-none cursor-pointer"
          >
            <option value={10}>10 por pág</option>
            <option value={15}>15 por pág</option>
            <option value={25}>25 por pág</option>
          </select>
        </div>
      </div>

      {/* Tabla de Movimientos */}
      <div className="bg-white rounded-lg shadow-sm border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-gray-400-collapse text-sm">
            <thead>
              <tr className="bg-slate-100/70 border-gray-400-b text-slate-600 text-xs uppercase font-mono">
                <th className="p-3">Tipo</th>
                <th className="p-3">Producto</th>
                <th className="p-3 text-center">Cantidad</th>
                <th className="p-3">Descripción / Motivo</th>
                <th className="p-3">Usuario</th>
                <th className="p-3">Fecha y Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historial.data?.data.length ?? 0 > 0 ? 
                (historial.data?.data.map((item: any, idx: any) => {
                  const isEntrada = item.tipo_movimiento.toUpperCase().includes('ENTREGA') || item.tipo_movimiento.toUpperCase().includes('ENTRADA');
                  return (
                    <tr key={item.id_historial_visual || idx} className="hover:bg-slate-50/80 transition-colors">
                      {/* Tipo de Movimiento */}
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                          isEntrada 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {isEntrada ? <ArrowDownLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                          {item.tipo_movimiento}
                        </span>
                      </td>

                      {/* Producto */}
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {item.producto.imagen ? (
                            <img src={item.producto.imagen} alt="" className="w-9 h-9 object-cover rounded border-gray-100" />
                          ) : (
                            <div className="w-9 h-9 bg-slate-100 rounded border-gray-100 flex items-center justify-center text-xs font-bold text-slate-400">
                              PROD
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-slate-800 text-xs">{item.producto.nombre}</p>
                            <span className="font-mono text-[11px] text-slate-400">{item.producto.codigo_barra}</span>
                          </div>
                        </div>
                      </td>

                      {/* Cantidad */}
                      <td className="p-3 text-center font-mono font-bold text-slate-700">
                        <span className={isEntrada ? 'text-emerald-600' : 'text-slate-700'}>
                          {isEntrada ? `+${item.cantidad}` : `-${item.cantidad}`}
                        </span>
                      </td>

                      {/* Descripción */}
                      <td className="p-3 text-slate-600 text-xs max-w-xs truncate" title={item.descripcion}>
                        {item.descripcion || <span className="text-slate-300 italic">Sin descripción</span>}
                      </td>

                      {/* Usuario */}
                      <td className="p-3 text-xs text-slate-700 font-medium">
                        {item.usuario.nombre}
                      </td>

                      {/* Fecha y Hora */}
                      <td className="p-3 font-mono text-xs text-slate-500">
                        {item.fecha_hora}
                      </td>
                    </tr>
                  );
                })
                ) 
                : 
                (<tr>
                    <td colSpan={6} className="text-center py-8 text-slate-400 text-sm">
                      No se encontraron registros de movimientos.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t gap-3 bg-white text-xs text-slate-500">
          <div>
            Mostrando <span className="font-bold text-slate-700">{(current_page - 1) * limitPage + 1}</span> a <span className="font-bold text-slate-700">{Math.min(current_page * limit, total_items)}</span> de <span className="font-bold text-slate-700">{total_items}</span> registros
          </div>

          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={current_page <= 1}
              className="cursor-pointer p-2 border rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Generador simple de botones de páginas 1-2-3... */}
            {Array.from({ length: historial.data?.total_pages ?? 0 }, (_, i) => i + 1).map((page) => {
              const isSelected = page === historial.data?.current_page;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`cursor-pointer px-3 py-1.5 rounded-md font-mono font-medium transition-colors ${
                    isSelected 
                      ? 'bg-slate-800 text-white' 
                      : 'border hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, total_pages))}
              disabled={current_page >= total_pages}
              className="cursor-pointer p-2 border rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-600"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}