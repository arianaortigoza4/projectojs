const CLAVE_LOCALSTORAGE = "lista_tareas";


document.addEventListener("DOMContentLoaded", () => {
	let tareas = []; // El arreglo global que vamos a manejar
	// Declaración de elementos del DOM
	const $contenedorTareas = document.querySelector("#contenedorTareas"),
		$btnGuardarTarea = document.querySelector("#btnAgregarTarea"),
		$inputNuevaTarea = document.querySelector("#inputNuevaTarea");

	// Escuchar clic del botón para agregar nueva tarea
	$btnGuardarTarea.onclick = () => {
		const tarea = $inputNuevaTarea.value;
		if (!tarea) {
			console.log("No se escribio nada")
			return;
		}
		tareas.push({
			tarea: tarea,
			terminada: false,
		});
		$inputNuevaTarea.value = "";
		//Agrego modal para que cuando agregue una tarea me avise con SweetAlert
		Swal.fire({

			title: "Tarea agregada",
	  
			icon: "success",
	  
		});
		guardarTareasEnAlmacenamiento();
		refrescarListaDeTareas();
	};

	const obtenerTareasDeAlmacenamiento = () => {
		const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
		if (posibleLista) {
			return posibleLista;
		} else {
			return [];
		}
	};

	const guardarTareasEnAlmacenamiento = () => {
		localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));

	};

	// Definir función que refresca la lista de tareas a partir del arreglo global
	const refrescarListaDeTareas = () => {
		$contenedorTareas.innerHTML = "";
		for (const [indice, tarea] of tareas.entries()) {
			// Crear el enlace para eliminar la tarea
			const $enlaceParaEliminar = document.createElement("a");
			$enlaceParaEliminar.classList.add("enlace-eliminar");
			$enlaceParaEliminar.innerHTML = "&times;";
			$enlaceParaEliminar.href = "";
			$enlaceParaEliminar.onclick
			$enlaceParaEliminar.onclick = (evento) => {
				evento.preventDefault();
				//Agrego modal para eliminar tarea utilizando sweetAlert
				Swal.fire({
					title: "¿Estás seguro/a de eliminar la tarea?",
					icon: "warning",
					showCancelButton: true,
					confirmButtonText: "Si",
					cancelButtonText: "No",
				  }).then((result) => {
					if (result.isConfirmed) {
						console.log(result)
						tareas.splice(indice, 1);
						// Guardar los cambios
						guardarTareasEnAlmacenamiento(tareas);
						refrescarListaDeTareas();
					}
				  });
			};
			// El input para marcar la tarea como terminada
			const $checkbox = document.createElement("input");
			$checkbox.type = "checkbox";
			$checkbox.onchange = function () { // No es una función flecha porque quiero acceder al elemento a través de this
				if (this.checked) {
					tareas[indice].terminada = true;
				} else {
					tareas[indice].terminada = false;
				}
				guardarTareasEnAlmacenamiento(tareas);
				refrescarListaDeTareas();
			}

			// El span que llevará el contenido de la tarea
			const $span = document.createElement("span");
			$span.textContent = tarea.tarea;
			// Y finalmente el elemento de la lista
			const $li = document.createElement("li");
			// Verificamos si la tarea está marcada para marcar los elementos
			if (tarea.terminada) {
				$checkbox.checked = true;
				$span.classList.add("tachado");
			}
			$li.appendChild($checkbox);
			$li.appendChild($span);
			$li.appendChild($enlaceParaEliminar);
			$contenedorTareas.appendChild($li);
		}
	};
	// Llamar a la función la primera vez
	tareas = obtenerTareasDeAlmacenamiento();
	refrescarListaDeTareas(); 

	
	function buscarTarea(){
		//console.log($inputTarea.value);
		const $contenedorTareas2 = document.querySelector("#contenedorTareas2");
		$contenedorTareas2.innerHTML = "";
		let coincidencias = false;
		tareas.forEach(element => {
			//console.log(element.tarea);
			if (element.tarea.includes($inputTarea.value)) {
				coincidencias = true;
				const $li = document.createElement("li");
				$li.textContent = element.tarea; 
				$contenedorTareas2.appendChild($li);
				console.log(element.tarea);
			}
		}); 
		
		if (coincidencias == false) {
			const $li = document.createElement("li");
			$li.textContent = "NO HAY COINCIDENCIAS"; 
			$contenedorTareas2.appendChild($li);
		}
		
		
	}
	
	
	
	const $inputTarea = document.querySelector("#searchInput");
	
	$inputTarea.addEventListener("change",buscarTarea);
	
	
//Funcion que me elimina toda la lista 	
	function deleteAll(){
		tareas = [];
		guardarTareasEnAlmacenamiento(tareas);
		refrescarListaDeTareas();
		
	}
	
	const btnDeleteAll_Element = document.getElementById("btnDeleteAll");
	
	btnDeleteAll_Element.addEventListener("click",deleteAll);
});


