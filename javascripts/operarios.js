$(document).ready(function(){
	cargarCentros();
	cargarLabs();
	cargarDatosModMuestrasEditar();
	init();
});

function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	$(".fades-in").hide();
	$("#codigoGen").hide();
	$("#btnBuscarId").click(cargarNombre);
	$("#btnBuscar").click(buscarMuestra);
	$("#btnEditarExam").click(editarExamenes);
	$("#btnCodigo").click(generarCodigo);
	$(".btnTemporal").click(volverNormal);
	$("#btnDescartar-edit").click(function(){
		window.location.href = "mod_muestra.html";
	});
	$(".fechaForm").hide();
	$(".checkbox label input").click(mostrarFechas);
	$(function() {
		$( "#pickDesde" ).datepicker();
	});
	$(function() {
		$( "#pickHasta" ).datepicker();
	});
}

function cargarCentros(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			var select = $("#centromed");
			json.forEach(function(centro){
					var txt = centro.nombre;
					select.append($('<option>').text(txt));
			});
		}
	};
	xhttp.open("GET","json/centros.json", true);
	xhttp.send();
}

function cargarNombre(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			json.forEach(function(usuario){
				if(usuario.cedula == $("#inputID").val()){
					$("#nombrePaciente").val(usuario.nombres);
					$("#apellidoPaciente").val(usuario.apellidos);
				}else{
					$("#nombrePaciente").val("");
					$("#apellidoPaciente").val("");
				}
			});
		}
	};
	xhttp.open("GET","json/usuarios.json", true);
	xhttp.send();
}

function buscarMuestra(){
	var hid = $(".hidden");
	for(i=0;i<hid.length;i++){
		console.log(hid[i]);
		hid[i].className =- "hidden";
	}
	$(".table td").remove();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			console.log(json);
			json.forEach(function(examen){
				if(examen.codigo == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false'></td>");
					$(fila).append("<td id='cod'>"+examen.codigo+"</td>");/*.click(crearCookie(examen.codigo));*/
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
					$("#cod").click(function(event){event.preventDefault();$("#cod").click(crearCookie(examen.codigo));});
				}else if(examen.paciente.cedula == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false'></td>");
					$(fila).append("<td id='cod'>"+examen.codigo+"</td>");
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
					$("#cod").click(function(event){event.preventDefault();$("#cod").click(crearCookie(examen.codigo));});
				}
				else if(examen.paciente.nombre+" "+examen.paciente.apellido == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false'></td>");
					$(fila).append("<td id='cod'>"+examen.codigo+"</td>");
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
					$("#cod").click(function(event){event.preventDefault();$("#cod").click(crearCookie(examen.codigo));});
				}
			
			
			});
		}
	};
	
	xhttp.open("GET","json/infoexamenes.json", true);
	xhttp.send();
}

function crearCookie(cod){
	document.cookie = cod;
	console.log(document.cookie);
	window.location.href = "mod_muestra_editar.html";
}

function mostrarFechas(){
	if($(this).is(":checked")){
		$(".fechaForm").show();
	}else{
		$(".fechaForm").hide();
	}
}

function cargarLabs(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			var select = $("#laboratorio");
			json.forEach(function(lab){
					var txt = lab.nombre;
					select.append($('<option>').text(txt));
			});
		}
	};
	xhttp.open("GET","json/laboratorios.json", true);
	xhttp.send();
}

function editarExamenes(){
	$("#fade").addClass("disabled");
	$("#fade").fadeTo(500,.25);
	$(".fades-in").show();
}

function volverNormal(){
	$("#fade").removeClass("disabled");
	$("#fade").fadeTo(500,1);
	$(".fades-in").hide();
	$("#codigoGen").hide();
}

function generarCodigo(){
	$("#fade").addClass("disabled");
	$("#fade").fadeTo(500,.25);
	$("#codigoGen").show();
	$("#bcTarget").barcode("1234567890128", "ean13",{barWidth:2, barHeight:30});
}

function cargarDatosModMuestrasEditar(){

	$(".table td").remove();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			var i=0;
			json.forEach(function(examenes){
				console.log(document.cookie);
				if(document.cookie==examenes.codigo){
					$("#nombrePaciente-edit").val(examenes.paciente.nombre);
					$("#apellidoPaciente-edit").val(examenes.paciente.apellido);
					$("#centromed-edit").append($('<option>').text(examenes.centroMed));
					$("#laboratorio-edit").append($('<option>').text(examenes.laboratorio));
					var fila = $("<tr>");
					$(fila).append("<td>"+examenes.fecha.dia+"/"+examenes.fecha.mes+"/"+examenes.fecha.anio+"</td>");
					$(fila).append("<td>"+examenes.tipo+"</td>");
					$(".table").append(fila);
				}
				i++;
			});
		}
	};
	xhttp.open("GET","json/infoexamenes.json", true);
	xhttp.send();
}