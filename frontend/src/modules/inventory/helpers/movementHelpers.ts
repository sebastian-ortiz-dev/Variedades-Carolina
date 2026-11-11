export function isSalidaName(nombre: string): boolean {
  return ["Salida", "Ajuste Negativo / Merma", "Devolución a Proveedor"].some((word) => nombre.includes(word));
}

export function isEntradaName(nombre: string): boolean {
  return ["Entrada", "Devolución de Cliente", "Ajuste Positivo"].some((word) => nombre.includes(word));
}

export function movementTone(nombre: string, NEW_PRODUCT_MOVEMENT: string){
    if (nombre === NEW_PRODUCT_MOVEMENT) {
        return {
        icon: "bg-blue-50 text-blue-600 border-blue-100",
        badge: "bg-blue-50 text-blue-700 border-blue-100",
        };
    }

    if (isSalidaName(nombre)) {
        return {
        icon: "bg-amber-50 text-amber-600 border-amber-100",
        badge: "bg-amber-50 text-amber-700 border-amber-100",
        };
    }

    if (isEntradaName(nombre)) {
        return {
        icon: "bg-emerald-50 text-emerald-600 border-emerald-100",
        badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
        };
    }

    return {
        icon: "bg-slate-50 text-slate-600 border-slate-100",
        badge: "bg-slate-50 text-slate-700 border-slate-100",
    };
}

export function movementHelper(nombre: string, NEW_PRODUCT_MOVEMENT: String): string {
    if (nombre === NEW_PRODUCT_MOVEMENT){ 
        return "Crea el producto y su stock inicial";
    }

    if (isSalidaName(nombre)){ 
        return "Resta unidades del stock";
    }

    if (isEntradaName(nombre)){ 
        return "Suma unidades al stock";
    }

    return "Movimiento sobre el inventario";
}