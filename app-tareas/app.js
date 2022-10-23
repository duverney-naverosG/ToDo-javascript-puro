
//OBTENEMOS TODOS LOS ELEMENTOS NECESARIOS
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fechaTarea");
const containerTodo = document.getElementById("container-too");
let tareas = [];

//INSERTAR TAREA
const insertar = (nombre, descripcion, fecha) => {
    var tarea = {
        id: uuidv4(),
        nombre,
        descripcion,
        fecha,
        estado: false
    }

    tareas.push(tarea);
    localStorage.setItem('tareastodo', JSON.stringify(tareas))
    mostrar()
}

//ELIMINAR TAREA
const eliminar = (id) =>{
    tareas = []
    const tarea= (JSON.parse(localStorage.getItem('tareastodo')));
    tareas=tarea.filter((tarea) => tarea.id !== id)
    localStorage.setItem('tareastodo', JSON.stringify(tareas))

    mostrar()
}

//CAMBIAR ESTADO DE LA TAREA
const cambiarEstado = (id) =>{
    tareas = []
    const tarea= (JSON.parse(localStorage.getItem('tareastodo')));
    tarea.map((tarea)=>{
        if(tarea.id===id){
            var tareau = {
                ...tarea,
                estado: !tarea.estado
            }
        }
        tareas.push(tareau||tarea);
    })
    localStorage.setItem('tareastodo', JSON.stringify(tareas))
    mostrar()

}

//VACIAR TODAS  LAS TAREAS
const borrarTodo =()=>{
    tareas = []
    localStorage.setItem('tareastodo', JSON.stringify(tareas))
    mostrar()
}

//FUNCION GENERA ID ALEATORIOS 
const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

//FUNCION DIBUJA LAS TAREAS
const mostrar = () => {
    containerTodo.innerHTML = " ";

    if (JSON.parse(localStorage.getItem('tareastodo')).length === 0) {
        containerTodo.innerHTML = `<h3 class="mt-4"><mark>SIN TAREAS</mark></h4>
        <div class="mt-5"><i class="fa-regular  fa-8x fa-thumbs-up fa-beat" style="--fa-beat-scale: 2.0;"></i></div>`
    } else {
        tareas = (JSON.parse(localStorage.getItem('tareastodo'))).concat();
        containerTodo.innerHTML += `
                      <label class="position-relative">
                      <h2 class="mb-3"><mark>LISTA DE TAREAS</mark>
                      <span class="position-absolute rounded-pill bg-danger">
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        ${JSON.parse(localStorage.getItem('tareastodo')).length}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </label>`

        tareas.forEach(tarea => {
            if (tarea.estado === false) {
                containerTodo.innerHTML +=  `<div class="alert alert-danger text-start" role="alert">
                <h4 class="alert-heading">${tarea.nombre}</h4>
                <p>${tarea.descripcion}</p>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row">
                        <p>FECHA DE ENTREGA: </p>
                        <input type="date" id="descripcion" class="form-control mb-0" disabled
                        value="${tarea.fecha}" />
                    </div>
                
                    <div class="d-flex flex-row">
                        <button type="button" data-id="${tarea.id}" id="check" class="btn btn-primary"><i class="fa-solid fa-check"></i></button>
                        <button type="button" data-id="${tarea.id}" id="delete" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
                </div>`
            }else{
                containerTodo.innerHTML +=  `<div class="alert alert-success text-start" role="alert">
                <h4 class="alert-heading">${tarea.nombre}</h4>
                <p>${tarea.descripcion}</p>
                <hr>
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row">
                        <p>FECHA DE ENTREGA: </p>
                        <input type="date" id="descripcion" class="form-control mb-0" disabled
                        value="${tarea.fecha}" />
                    </div>
                
                    <div class="d-flex flex-row">
                        <button type="button" data-id="${tarea.id}" id="check" class="btn btn-info"><i class="fa-solid fa-thumbtack"></i></i></button>
                        <button type="button" data-id="${tarea.id}" id="delete" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
                </div>`
            }

        })
        
        containerTodo.innerHTML += `<div class=" text-end mb-3 me-3 fixed-bottom container-fluid">
        <button type="button" class="btn btn-warning" id="eliminar"><i class="fa-solid fa-trash fa-beat-fade" style="--fa-beat-fade-opacity: 0.67; --fa-beat-fade-scale: 1.075;" ></i> eliminar</button>
      </div>`
        
      const eliminarlocal= document.getElementById("eliminar");
      eliminarlocal.addEventListener('click',()=>{
        borrarTodo();
      })
    }
}

//PROCESA EL FORMULARIO Y SU EVENTO
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    insertar(nombre.value, descripcion.value, fecha.value);
    formulario.reset();
    mostrar();
});

//EVENTOS DE LAS TAREAS
containerTodo.addEventListener("click",(e)=>{
    
    if(e.path[1].attributes[2].nodeValue ==="delete" ){
        eliminar(e.path[1].dataset.id);
    }
    
    if(e.path[1].attributes[2].nodeValue ==="check" ){
        cambiarEstado(e.path[1].dataset.id)
    }
})

window.addEventListener('DOMContentLoaded', (e) => {
    if(JSON.parse(localStorage.getItem('tareastodo'))){
       mostrar() 
    }else{
        localStorage.setItem('tareastodo', JSON.stringify(tareas))
        mostrar() 
    }
    
});
