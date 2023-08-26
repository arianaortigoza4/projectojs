const CLAVE_LOCALSTORAGE = "lista_tareas";

const $contenedorTareas = document.querySelector("#contenedorTareas");

const refrescarLista = (posibleLista) => {
    console.log("TAREAS");
    for (const key in posibleLista) {
        if(posibleLista[key].terminada){
            const $li = document.createElement("li");
            console.log(posibleLista[key].tarea);
            $li.innerText = posibleLista[key].tarea;
            $contenedorTareas.appendChild($li);
        }
    }
};

const obtenerTareasDeAlmacenamiento = () => {
    const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
    if (posibleLista) {
        console.log(posibleLista);
        refrescarLista(posibleLista);
        return posibleLista;
    } else {
        return [];
    }
};

obtenerTareasDeAlmacenamiento(); 