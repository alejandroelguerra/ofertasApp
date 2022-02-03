window.onload=obtenerOfertas;

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
				var botoninf = document.createElement("button");
				var clase = document.createAttribute("class");
				var valor = document.createAttribute("type");
				var name = document.createAttribute("name");
				botoninf.addEventListener("click",function(){
					$(modal).modal();
					rellenarModal(oferta);
				});
				name.value = "mostrar_info";
				clase.value = "btn btn-info";
				valor.value = "button";
				botoninf.setAttributeNode(clase);
				botoninf.setAttributeNode(valor);
				botoninf.setAttributeNode(name);
				botoninf.textContent = "info";
				
				cel4.appendChild(botoninf);
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

	let oferta = new Oferta(nombre, prioridad, precio, hipervinculo, descripcion);
	
	fetch('/anadir', {
		headers: { "Content-Type": "application/json; charset=utf-8" },
		method: 'POST',
		body: JSON.stringify(oferta)
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
			oferta = res;
			anadirFila(oferta);
			console.log(res);
		});
	
}


function anadirFila(oferta) {
	let resultados = document.getElementById("resultados");
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
	var botoninf = document.createElement("button");
	var clase = document.createAttribute("class");
	var valor = document.createAttribute("type");
	var name = document.createAttribute("name");
	botoninf.addEventListener("click",function(){
					$(modal).modal();
					rellenarModal(oferta);
				});
	name.value = "mostrar_info";
	clase.value = "btn btn-info";
	valor.value = "button";
	botoninf.setAttributeNode(clase);
	botoninf.setAttributeNode(valor);
	botoninf.setAttributeNode(name);
	botoninf.textContent = "info";
	cel4.appendChild(botoninf);
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

function filtrar(event){
	event.preventDefault()
   var tipo= document.querySelector('input[name="prioridad"]:checked').value;
    editartabla();
    
    fetch('/filtrar?prioridad='+tipo, { headers: { "Content-Type": "application/json; charset=utf-8" } })
		.then(res => res.json())
		.then(response => {
			for(let oferta of response){
				anadirFila(oferta);
			}
		
		});   
}

function editartabla(){
    var tabla= document.getElementById("resultados");
    var nuevatabla=document.createElement("tbody");
    var id=document.createAttribute("id");
    id.value="resultados";
    nuevatabla.setAttributeNode(id);
    tabla.parentNode.replaceChild(nuevatabla,tabla);
}

function rellenarModal(oferta){
	document.getElementById("nombreModal").value = oferta.nombre;
	//document.getElementById("selectProducto").options.selectedIndex = oferta.prioridad;
	document.getElementById("prioridadModal").value = oferta.prioridad;
	document.getElementById("precioModal").value = oferta.precio;
	document.getElementById("hipervinculoModal").value = oferta.hiperenlace;
	document.getElementById("descripcionModal").value = oferta.descripcion;
}

document.addEventListener("DOMContentLoaded", function() {
	$("#refrescar").click(obtenerOfertas);

	$("#anadir").click(anadirOferta);
	//Hola Caracolas~
	$("#filtrarPorPrioridad").click(filtrar);
	
	var cerrarmodal = document.getElementById("cerrar-modal");
	cerrarmodal.addEventListener("click",function(){
    $('#modal').modal('toggle');
})


});




    