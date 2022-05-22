const url = 'http://localhost:3050/api/resultadoinner/'
const contenedor = document.querySelector('tbody')
let resultados = ''





//funcion para mostrar los resultados
const mostrar = (result) => {
    result.forEach(resulta => {
        resultados += `<tr>
                            <td>${resulta.id_resultado}</td>
                            <td>${resulta.nombre_examen}</td>
                            <td>${resulta.nombre}</td>
                            <td>${resulta.descrip_resultado}</td>
                            <td>${resulta.recomendacion}</td>
            
                            <td>${resulta.fechahora}</td>
                            
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