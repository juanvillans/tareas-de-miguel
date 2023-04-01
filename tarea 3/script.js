const textInp = document.querySelector("#tareaInp")
const botonEnviar = document.querySelector("#submit")
const lista = document.querySelector("ul")
const btn_publico = document.querySelector('#publico')
const btn_privado = document.querySelector('#privado')
// obtener el arreglo con los valores guardado en el localstore y sessionStore
let tareasPublicas = JSON.parse(localStorage.getItem('tareasPublicasMigue')) || []
let tareasPrivadas = JSON.parse(sessionStorage.getItem('tareasPrivadasMigue')) || []

// botonEnviar.onclick = (e) => {
   
// }

// actualizar la lista en pantalla
function mostrarListaDeTareas(tareas){
    tareas.forEach((tarea, index) => {
        const li = document.createElement('li')
        const btn_editar = document.createElement('button')
        btn_editar.classList.add('btn_editar')
        btn_editar.textContent= 'Actualizar'
        btn_editar.dataset.id= index
        li.textContent = tarea
        const btn_eliminar = document.createElement('button')
        btn_eliminar.textContent = 'X'
        btn_eliminar.classList.add('btn_eliminar')
        btn_eliminar.dataset.id= index
        li.append(btn_eliminar)
        li.append(btn_editar)
        lista.prepend(li)
    });
}

mostrarListaDeTareas(tareasPublicas)

btn_privado.onclick = (e) => {
    lista.style.display= 'none'
}
btn_publico.onclick = (e) => {
    lista.style.display= 'block'
}

document.onclick = (e) =>{
    const el = e.target
    if (el.classList.contains('btn_eliminar')) {
        tareasPublicas.splice(el.dataset.id, 1)
        localStorage.setItem('tareasPublicasMigue', JSON.stringify(tareasPublicas))
       lista.innerHTML =''
        mostrarListaDeTareas(tareasPublicas)
        
    }
    if (el.classList.contains('btn_editar')) {
        textInp.value = tareasPublicas[el.dataset.id].trim()
        textInp.focus()
        botonEnviar.value = 'Editar'
        botonEnviar.dataset.id = el.dataset.id
        
    }
    if(el === botonEnviar && botonEnviar.value === 'Guardar') {
        e.preventDefault()
        if ( btn_privado.checked === true) {
            tareasPrivadas.push(textInp.value.trim())
            sessionStorage.setItem('tareasPrivadasMigue', JSON.stringify(tareasPrivadas))
        } else {
            lista.innerHTML = ''
            tareasPublicas.push(textInp.value.trim())
        // insertar en el arreglo el nuevo valor (tarea) y guardarlo en el local y session storage
            localStorage.setItem('tareasPublicasMigue', JSON.stringify(tareasPublicas))
            mostrarListaDeTareas(tareasPublicas)
        }
        textInp.value = ''
        textInp.focus()
    }
    if(el === botonEnviar && botonEnviar.value === 'Editar') {
        e.preventDefault()
        if ( btn_privado.checked === true) {
            tareasPrivadas[+botonEnviar.dataset.id] = textInp.value
            sessionStorage.setItem('tareasPrivadasMigue', JSON.stringify(tareasPrivadas))
        } else {
            lista.innerHTML = ''
            console.log(+botonEnviar.dataset.id)
            console.log( tareasPublicas[botonEnviar.dataset.id])
            console.log( tareasPublicas[0])
            tareasPublicas[+botonEnviar.dataset.id] = textInp.value
        // insertar en el arreglo el nuevo valor (tarea) y guardarlo en el local y session storage
            localStorage.setItem('tareasPublicasMigue', JSON.stringify(tareasPublicas))
            mostrarListaDeTareas(tareasPublicas)
        }
        textInp.value = ''
        botonEnviar.value = 'Guardar'
    }
}
// console.log(botones_eliminar)
