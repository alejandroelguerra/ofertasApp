function obtenerOfertas() {
	let resultados = document.getElementById("resultados");
	resultados.replaceChildren();
	fetch('/todos', { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
			for (let oferta of response) {
				let tr = document.createElement('tr');
				var cel1 = document.createElement("th");
				var cel2 = document.createElement("td");
				var cel3 = document.createElement("td");
				cel1.textContent = oferta.id;
				cel2.textContent = oferta.nombre;
				cel3.textContent = oferta.precio;
				tr.appendChild(cel1);
				tr.appendChild(cel2);
				tr.appendChild(cel3);

				switch (oferta.prioridad) {
					case "Baja":
						var claseprioridad = document.createAttribute("class");
						claseprioridad.value = "table-active";
						tr.setAttributeNode(claseprioridad);
						break;
					case "Media":
						var claseprioridad = document.createAttribute("class");
						claseprioridad.value = "table-warning";
						tr.setAttributeNode(claseprioridad);
						break;

					case "Alta":
						var claseprioridad = document.createAttribute("class");
						claseprioridad.value = "table-danger";
						tr.setAttributeNode(claseprioridad);
						break;
				}

				var cel4 = document.createElement("td");
				var boton = document.createElement("button");
				var clase = document.createAttribute("class");
				var valor = document.createAttribute("type");
				var click = document.createAttribute("onclick");
				click.value = "infoFila(this)";
				clase.value = "btn btn-info";
				valor.value = "button";
				boton.setAttributeNode(clase);
				boton.setAttributeNode(valor);
				boton.setAttributeNode(click);
				boton.textContent = "info";
				cel4.appendChild(boton);
				tr.appendChild(cel4);

				var cel5 = document.createElement("td");
				var boton = document.createElement("button");
				var clase = document.createAttribute("class");
				var valor = document.createAttribute("type");
				var click = document.createAttribute("onclick");
				click.value = "eliminarFila(this)";
				clase.value = "btn btn-danger";
				valor.value = "button";
				boton.setAttributeNode(clase);
				boton.setAttributeNode(valor);
				boton.setAttributeNode(click);
				boton.textContent = "borrar";
				cel5.appendChild(boton);
				tr.appendChild(cel5);
				resultados.appendChild(tr);
			}
		})
}

function eliminarFila(i) {

	var p = i.parentNode.parentNode;
	var id = p.querySelector("th").innerText;
	fetch("/borrar/" + id, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(data => console.log(data));
	p.parentNode.removeChild(p);

}

function anadirOferta() {

	var nombre = document.getElementById("inputNombre").value;
	var prioridad = document.getElementById("selectProducto").value;
	var precio = document.getElementById("inputPrecio").value;
	var hipervinculo = document.getElementById("inputEnlace").value;
	var descripcion = document.getElementById("inputDescripcion").value;

	let ofertica = new Oferta(nombre, prioridad, precio, hipervinculo, descripcion);
	
	fetch('/anadir', {
		headers: { "Content-Type": "application/json; charset=utf-8" },
		method: 'POST',
		body: JSON.stringify(ofertica)
		/*body: JSON.stringify({nombre: $('#inputNombre').val(), prioridad: $('#selectProducto').val(),precio: $('#inputPrecio').val(),
		 hipervinculo: $('#inputEnlace').val(),descripcion: $('#inputDescripcion').val()})*/
		//data: { "nombre": nombre, "precio": precio, "prioridad": prioridad, "hipervinculo": hipervinculo, "descripcion": descripcion }
	})
		.then(function(response){
			if(response.ok){
				return response.json();
			
			}else{
				throw "de locos";
				
			}
		}).then(res => {
			ofertica = res;
			anadirFila(ofertica);
			console.log(res);
		});
	
}


function anadirFila(ofertica) {
	let resultados = document.getElementById("resultados");
	let tr = document.createElement('tr');
	var cel1 = document.createElement("th");
	var cel2 = document.createElement("td");
	var cel3 = document.createElement("td");
	cel1.textContent = ofertica.id;
	cel2.textContent = ofertica.nombre;
	cel3.textContent = ofertica.precio;
	tr.appendChild(cel1);
	tr.appendChild(cel2);
	tr.appendChild(cel3);

	switch (ofertica.prioridad) {
		case "Baja":
			var claseprioridad = document.createAttribute("class");
			claseprioridad.value = "table-active";
			tr.setAttributeNode(claseprioridad);
			break;
		case "Media":
			var claseprioridad = document.createAttribute("class");
			claseprioridad.value = "table-warning";
			tr.setAttributeNode(claseprioridad);
			break;

		case "Alta":
			var claseprioridad = document.createAttribute("class");
			claseprioridad.value = "table-danger";
			tr.setAttributeNode(claseprioridad);
			break;
	}

	var cel4 = document.createElement("td");
	var boton = document.createElement("button");
	var clase = document.createAttribute("class");
	var valor = document.createAttribute("type");
	var click = document.createAttribute("onclick");
	click.value = "infoFila(this)";
	clase.value = "btn btn-info";
	valor.value = "button";
	boton.setAttributeNode(clase);
	boton.setAttributeNode(valor);
	boton.setAttributeNode(click);
	boton.textContent = "info";
	cel4.appendChild(boton);
	tr.appendChild(cel4);

	var cel5 = document.createElement("td");
	var boton = document.createElement("button");
	var clase = document.createAttribute("class");
	var valor = document.createAttribute("type");
	var click = document.createAttribute("onclick");
	click.value = "eliminarFila(this)";
	clase.value = "btn btn-danger";
	valor.value = "button";
	boton.setAttributeNode(clase);
	boton.setAttributeNode(valor);
	boton.setAttributeNode(click);
	boton.textContent = "borrar";
	cel5.appendChild(boton);
	tr.appendChild(cel5);
	resultados.appendChild(tr);
	document.getElementById("inputNombre").value = '';
	document.getElementById("selectProducto").value = '';
	document.getElementById("inputPrecio").value = '';
	document.getElementById("inputEnlace").value = '';
	document.getElementById("inputDescripcion").value = '';
}


document.addEventListener("DOMContentLoaded", function() {
	$("#refrescar").click(obtenerOfertas);

	$("#anadir").click(anadirOferta);
	//Hola Caracola


});