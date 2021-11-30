//variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(presupuestoActualizado)
{
    let presAux = presupuestoActualizado;

    if (presAux >= 0)
    {
        presupuesto = presAux;
    }
    else
    {
        presupuesto = -1;
    }

    return presupuesto;
}

function mostrarPresupuesto()
{
    let x = presupuesto;
    return (`Tu presupuesto actual es de ${x} €.`)
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas)
{
    this.descripcion = descripcion;

    if (valor >= 0) 
    {
        this.valor = valor;
    }
    else 
    {
        this.valor = 0;
    }

    if (fecha)
    {
        this.fecha = Date.parse(fecha)
    }
    else
    {               
        this.fecha = Date.now(fecha);  
    }

    if (etiquetas === null)
    {
        this.etiquetas = [];
    }
    else
    {
        this.etiquetas = etiquetas;
    }

    this.mostrarGasto = function()
    {
        return (`Gasto correspondinete a ${this.descripcion} con valor ${this.valor} €.`)
    }

    this.actualizarDescripcion = function(descripcionActualizada) 
    {
        this.descripcion = descripcionActualizada;
    }

    this.actualizarValor = function(valorActualizado)
    {
        if(valorActualizado >= 0)
        {
            this.valor = valorActualizado;
        }
    }

    this.actualizarFecha = function (fechaActualizada)
    {
        if(fechaActualizada != Date.parse(fechaActualizada))
        {
            this.fecha = this.fecha;
        }
        else
        {
            this.fecha = fechaActualizada;
        }
    }

    this.anyadirEtiquetas = function(...etiquetas)
    {
        for (let et of etiquetas)
        {
            if (!etiquetas.includes(et))
            {
                etiquetas.push(et);
            }
        }
    }
}

function filtrarGastos(opciones)
{
    return gastos.filter(function(gasto)
    {
        let resultado = true;

        if(opciones.fechaDesde)
        {
            if (gasto.fecha < opciones.fechaDesde)
            {
                resultado = false;
            }
        }
        if(opciones.fechaHasta)
        {
            if(gasto.fecha > opciones.fechaHasta)
            {
                resultado = false;
            }
        }
        if(opciones.valorMinimo)
        {
            if(gasto.valor < opciones.valorMinimo)
            {
                resultado =false;
            }
        }
        if(opciones.valorMaximo)
        {
            if(gasto.valor > opciones.valorMaximo)
            {
                resultado =false;
            }
        }
        return resultado;
    });
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function calcularTotalGastos()
{
    let sumarTotalGastos = 0;

    for (let i = 0; i < gastos.length; i++)
    {
        sumarTotalGastos = sumarTotalGastos + gastos[i].valor;
    }

    return sumarTotalGastos;
}

function calcularBalance()
{
    let balance;

    balance = presupuesto - calcularTotalGastos();

    return balance;
}

function listarGastos()
{
    return gastos;
}

export {
    actualizarPresupuesto,
    mostrarPresupuesto,
    CrearGasto,
    listarGastos, 
    anyadirGasto, 
    calcularTotalGastos, 
    calcularBalance, 
    filtrarGastos,
}