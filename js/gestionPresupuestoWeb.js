import * as gesPres from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    document.getElementById(idElemento).innerHTML = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');

    div.className = "gasto";   
    div1.className = "gasto-descripcion";
    div2.className = "gasto-fecha";
    div3.className = "gasto-valor";
    div4.className = "gasto-etiquetas"

    div1.append(gasto.descripcion);
    div2.append(gasto.fecha);
    div3.append(gasto.valor);
    //div4.append(gasto.etiquetas);

    div.append(div1);
    div.append(div2);
    div.append(div3);
    div.append(div4);

    let contenido = document.getElementById(idElemento);
    
    contenido.append(div);  

    for (let etiqueta of gasto.etiquetas)
    {
        let span = document.createElement('span');
        span.className = "gasto-etiquetas-etiqueta";
        span.append(`${etiqueta} , `)
        div4.append(span);
    }
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gesPres.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    let gastos = gesPres.listarGastos();
    for (let g of gastos)
    {
        mostrarGastoWeb("listado-gastos-completo", g);
    }
}

function actualizarPresupuestoWeb()
{
    this.handleEvent = function(e)
    {
        let presupuestoActualizado = prompt("Introduzca otro presupuesto");

        presupuestoActualizado = parseFloat(presupuestoActualizado);

        gesPres.actualizarPresupuesto(presupuestoActualizado);

        repintar();
    }
}

let manejadorActualizar = new actualizarPresupuestoWeb();
let actualizarPres = document.getElementById("actualizarpresupuesto");
actualizarPres.addEventListener ("click", manejadorActualizar);

function nuevoGastoWeb()
{
    this.handleEvent = function (e)
    {
        let nuevaDesc = prompt("Introduce descripcion");
        let nuevoValor = prompt("Introduce valor");
        let nuevaFecha = prompt("introduce una fecha");
        let nuevaEtiqueta = prompt("introduce una etiqueta");
    
        nuevoValor = parseFloat(nuevoValor);
    
        let nuevoGasto = new gesPres.CrearGasto(nuevaDesc, nuevoValor, nuevaFecha, nuevaEtiqueta);
        gesPres.anyadirGasto(nuevoGasto);
    
        repintar();
    } 
}

let manejadorNuevoGasto = new nuevoGastoWeb();
let butAnyadirGasto = document.getElementById("anyadirGasto");
butAnyadirGasto.addEventListener("click", manejadorNuevoGasto);


function nuevoGastoWebFormulario()
{
    this.handleEvent = function (e)
    {
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        let manejadorSubmit = new enviar();
        formulario.addEventListener("submit", manejadorSubmit);

        let manejadorCancelar = new manCancelar()
        let butManejadorCancelar = formulario.querySelector("button.cancelar");
        butManejadorCancelar.addEventListener = ("click", manejadorCancelar);

        document.getElementById("controlesprincipales").append(formulario);
    }
}

let manNuevoGasto = new nuevoGastoWebFormulario();
let butNuevoGastoForm = document.getElementById("anyadirgasto-formulario");
butNuevoGastoForm.addEventListener("click", manNuevoGasto);

function enviar()
{
    this.handleEvent = function (e)
    {
        e.preventDefault();

        let form = e.currentTarget;

        let descForm = form.elements.descripcion.value;
        let valorForm = form.elements.valor.value;
        let fechaForm = form.elements.fecha.value;
        let etiquetaForm = form.elements.etiquetas.value;

        valorForm = parseFloat(valorForm);

        let nuevoGastoForm = new gesPres.CrearGasto(descForm, valorForm, fechaForm, etiquetaForm);

        gesPres.anyadirGasto(nuevoGastoForm);

        repintar();
    }
}

function manCancelar()
{
    this.handleEvent = function(e)
    {
        e.target.form.remove();

        repintar();
    }
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb, 
}