import * as gesPres from "./gestionPresupuesto.js";
import * as gesPresWeb from "./gestionPresupuestoWeb.js";

gesPres.actualizarPresupuesto(1500);

gesPresWeb.mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());

let g1 = new gesPres.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let g2 = new gesPres.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")

gesPres.anyadirGasto(g1);
gesPres.anyadirGasto(g2);

gesPresWeb.mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());

gesPresWeb.mostrarDatoEnId("balance-total", gesPres.calcularBalance());

let gastos = gesPres.listarGastos();

for (let g of gastos)
{
    gesPresWeb.mostrarGastoWeb("listado-gastos-completo", g);
}


let gastosFiltrados1 = gesPres.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});

for (let g of gastosFiltrados1)
{   
    gesPresWeb.mostrarGastoWeb("listado-gastos-filtrado-1", g);
}