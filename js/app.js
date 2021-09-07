// Constructores
function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo
}
// proto Seguro
Seguro.prototype.cotizando = function(){ // Esta funcion retorna un resultado para ser reutilizable
    /*
     value "1"= 1.15 Americano
     value "2"= 1.05 Asiatico
     value "3"= 1.35 Europeo
    */
   let cantidad;
   const precioBase = 2000;
   switch(this.marca){
       case '1':
           cantidad = precioBase * 1.15;
           break;
        case '2':
           cantidad = precioBase * 1.05;
           break;
        case '3':
            cantidad = precioBase * 1.35;
           break;
       default:
           break;
   }
   const diferencia = new Date().getFullYear() - this.year;
   cantidad -=((diferencia * 3)*cantidad)/100;
   /*
    Si el tipo de seguro es básico se incrementa un 30%
    Si el tipo de seguro es completo se incrementa un 50%
   */ 
   if(this.tipo ==='basico'){
       cantidad *= 1.30;
   } else {
       cantidad *= 1.50;
   }
   return cantidad.toFixed(2); // toFixed(cantidad) limita la cant de decimales
}

function UI(){}
//proto UI
UI.prototype.llenaropciones = ()=>{
    const max = new Date().getFullYear(),
          min = max -20;
    const select = document.querySelector('#year');

    for(let i= max;i>=min;--i){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
}
UI.prototype.mostrarMensaje = (mensaje,tipo)=>{
    const div = document.createElement('div');
    div.classList.add('mensaje','mt-3');
    div.textContent = mensaje;
    if(tipo === 'error'){
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));
    setTimeout(()=>{
        div.remove();
    },3000);
}
UI.prototype.mostrarResultado = (total,seguro)=>{
    const {marca,year,tipo} = seguro;
    let textoMarca;
    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
             break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML =`
    <p class="header"> Tu Resumen</p>
    <p class="font-bold"> Marca: <span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold"> Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold"> Tipo: <span class="font-normal capitalize">${tipo}</span></p>
    <p class="font-bold"> Total: <span class="font-normal">$${total}</span></p>
    `
    const resultadoDiv = document.querySelector('#resultado');
    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block';
    setTimeout(()=>{
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    },3000)
    

}
// Instanciar
const ui = new UI();

// Eventos
document.addEventListener('DOMContentLoaded',()=>{
    ui.llenaropciones();
})
eventListeners();
function eventListeners (){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);
}
function cotizarSeguro(e){
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value
    console.log(tipo)
    
    // Validación
    if (marca ===''||year ===''||tipo ===''){
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return;
    }
    ui.mostrarMensaje('Cotizando...','exito');
    
    // para ocultar cotizaciones previas -- IMPORTANTE -- entenderla
    const resultado = document.querySelector('#resultado div');
    if(resultado != null){
        resultado.remove();
    }


    // Instanciar Seguro
    const seguro = new Seguro(marca,year,tipo);
    const totalSeguro = seguro.cotizando();
   
    ui.mostrarResultado(totalSeguro,seguro);

    // Reiniciar formulario
    const formulario = document.querySelector('#cotizar-seguro');
    setTimeout(()=>{
        formulario.reset();
    },3000)
   
}