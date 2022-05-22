const url = 'http://localhost:3050/api/pacientesasc/'
const contenedor = document.querySelector('tbody')
let resultados = ''





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
