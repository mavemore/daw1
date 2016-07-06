$(document).ready(function(){
	cargarCentros();
	cargarLabs();
	cargarOpsExamenes();
	init();
});

function init(){
	$(".fechaForm").hide();
	$(".fades-in").hide();
	$("#codigoGen").hide();
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	$("#btnBuscarId").click(cargarNombre);
	$("#btnBuscar").click(buscarMuestra);
	$("#btnEditarExam").click(editarExamenes);
	$("#btnCodigo").click(generarCodigo);
	$("#btnDescartar").click(volverNormal);
	$("#btnGuardar").click(guardarExamenes);
	$(".checkbox label input").click(mostrarFechas);
	$(function() {
		$("#pickDesde").datepicker();
	});
	$(function() {
		$("#pickHasta").datepicker();
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
		hid[i].classList.remove("hidden");
	}
	$(".table td").remove();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			json.forEach(function(examen){
				if(examen.codigo == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false'></td>");
					$(fila).append("<td>"+examen.codigo+"</td>").click(crearCookie(examen.codigo));
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
				}else if(examen.paciente.cedula == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false'></td>");
					$(fila).append("<td><a href='mod_muestra_editar.html'>"+examen.codigo+"</td>");
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
				}
				else if(examen.paciente.nombre+" "+examen.paciente.apellido == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false'></td>");
					$(fila).append("<td><a href='mod_muestra_editar.html'>"+examen.codigo+"</td>");
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
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

function cargarOpsExamenes(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			json.forEach(function(examen){
				var fila = $("<tr>");
				fila.append("<td><input type='checkbox' name='seleccion' value='false'></td>");
				fila.append($("<td><input type='text' class='objListaExam'></td>"));
				fila.append($('<td>').text(examen.nombre));
				fila.children('td:first').click(function(){
					var fecha = $(this).closest('tr').children('td:nth-child(2)').children('input');
					fecha.datepicker();
				});
				$(".scroll table").append(fila);
			});
		}
	};
	xhttp.open("GET","json/listaexamenes.json", true);
	xhttp.send();
}

function guardarExamenes(){
	volverNormal();
	/*$("#examTable tr").remove();
	var row = $("<tr>");
	var col1 = $("<th>").text("Fecha Toma Muestra");
	var col2 = $("<th>").text("Tipo Examen");
	row.append(col1);
	row.append(col2);*/
}