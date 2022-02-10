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
				throw "No va";
				
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
	event.preventDefault();
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
	document.getElementById("nombreModal").disabled=true;
	$("#prioridadModal").replaceWith('<input type="text" class="form-control" placeholder="Prioridad"id="prioridadModal" name="prioridadModal" disabled>');
	document.getElementById("precioModal").disabled=true;
	document.getElementById("hipervinculoModal").disabled=true;
	document.getElementById("descripcionModal").disabled=true;
	document.getElementById("guardar").disabled=true;
	document.getElementById("nombreModal").value = oferta.nombre;
	document.getElementById("prioridadModal").value = oferta.prioridad;
	document.getElementById("precioModal").value = oferta.precio;
	document.getElementById("hipervinculoModal").value = oferta.hiperenlace;
	document.getElementById("descripcionModal").value = oferta.descripcion;
	document.getElementById("idModal").value = oferta.id;
}

function actualizar(){
	document.getElementById("nombreModal").disabled=false;
	$("#prioridadModal")
    .replaceWith('<select id="prioridadModal" class="form-select" id="selectProducto" name="prioridad" size="3">' +
          '<option value="Baja">Baja</option>' +
          '<option value="Media">Media</option>' +
          '<option value="Alta">Alta</option>' +
        '</select>');
	document.getElementById("precioModal").disabled=false;
	document.getElementById("hipervinculoModal").disabled=false;
	document.getElementById("descripcionModal").disabled=false;
	document.getElementById("guardar").disabled=false;
}

function actualizarOferta(event){
	var id=document.getElementById("idModal").value;
	var nom = document.getElementById("nombreModal").value;
	var prioridad= document.getElementById("prioridadModal").value;
	var precio = document.getElementById("precioModal").value;
	var hiperenlace = document.getElementById("hipervinculoModal").value;
	var descripcion = document.getElementById("descripcionModal").value;
	
	let oferta=new Oferta();
	oferta.id=parseInt(id);
	oferta.nombre=nom;
	oferta.prioridad=prioridad;
	oferta.precio=precio;
	oferta.hiperenlace=hiperenlace;
	oferta.descripcion=descripcion;
	event.preventDefault();
	fetch('/actualizar', {headers: { "Content-Type": "application/json; charset=utf-8" },
		method: 'PUT',
		body: JSON.stringify(oferta)})
		.then(function(response){
			if(response.ok){

				return response.json();
			}else{
				throw "no existe la oferta";
				
			}
		}).then(res => {
			oferta = res;
			actualizarTabla(oferta);
			$('#modal').modal('toggle');
			console.log(res);
		});
}

function actualizarTabla(oferta){

	var id =Array.from(document.querySelectorAll("tbody th")).find(id =>id.textContent==oferta.id);
	var tr =id.parentNode;
	switch (oferta.prioridad) {
		case "Baja":
		tr.setAttribute('class','table-active');
			break;
		case "Media":
			tr.setAttribute('class','table-warning');
			break;

		case "Alta":
			tr.setAttribute('class','table-danger');
			break;
	}	
	var td=tr.querySelectorAll("td");
	td[0].innerText=oferta.nombre;
	td[1].innerText=oferta.precio;
	
	
}

document.addEventListener("DOMContentLoaded", function() {
	$("#refrescar").click(obtenerOfertas);

	$("#anadir").click(anadirOferta);

	$("#filtrarPorPrioridad").click(filtrar);
	$("#actualizar").click(actualizar);
	$("#guardar").click(actualizarOferta);
	
	var cerrarmodal = document.getElementById("cerrar-modal");
	cerrarmodal.addEventListener("click",function(){
    $('#modal').modal('toggle');
})


});




    