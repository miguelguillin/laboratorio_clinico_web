//Definición de variables
const url = 'http://localhost:3050/api/pacientes/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const id_usuario = document.getElementById('id_usuario')
const nombre = document.getElementById('nombre')
const edad = document.getElementById('edad')
const telefono = document.getElementById('telefono')
const id_examen = document.getElementById('id_examen')
const estado = document.getElementById('estado')
const fechahora = document.getElementById('fechahora')

var opcion = ''

btnCrear.addEventListener('click', ()=>{

    id_usuario.value = ''
    nombre.value = ''
    edad.value = ''
    telefono.value = ''
    id_examen.value = ''
    estado.value = ''
    fechahora.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (paciente) => {
    paciente.forEach(pacientes => {
        resultados += `<tr>
                            <td>${pacientes.id_paciente}</td>
                            <td>${pacientes.id_usuario}</td>
                            <td>${pacientes.nombre}</td>
                            <td>${pacientes.edad}</td>
                            <td>${pacientes.telefono}</td>
                            <td>${pacientes.id_examen}</td>
                            <td>${pacientes.estado}</td>
                            <td>${pacientes.fechahora}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id_paciente = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function  (){
        fetch(url+id_paciente, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let id_pacienteForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    id_pacienteForm = fila.children[0].innerHTML
    const Id_usuarioForm = fila.children[1].innerHTML
    const nombreForm = fila.children[2].innerHTML
    const edadForm = fila.children[3].innerHTML
    const telefonoForm = fila.children[4].innerHTML
    const id_examenForm = fila.children[5].innerHTML
    const estadoForm = fila.children[6].innerHTML
    const fechahoraForm= fila.children[7].innerHTML
    
    id_usuario.value =  Id_usuarioForm
    nombre.value =  nombreForm
    edad.value =  edadForm
    telefono.value =  telefonoForm
    id_examen.value =  id_examenForm
    estado.value =  estadoForm
    fechahora.value =  fechahoraForm
    
    opcion = 'editar'
    modalArticulo.show()
     
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id_usuario:id_usuario.value,
                nombre:nombre.value, 
                edad:edad.value, 
                telefono:telefono.value,
                id_examen:id_examen.value, 
                estado:estado.value, 
                fechahora:fechahora.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+id_pacienteForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id_usuario:id_usuario.value,
                nombre:nombre.value, 
                edad:edad.value, 
                telefono:telefono.value,
                id_examen:id_examen.value, 
                estado:estado.value, 
                fechahora:fechahora.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})

