$(document).ready(function(){
	cargarCentros();
	cargarLabs();
	init();
});

function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	$(".fades-in").hide();
	$("#btnBuscarId").click(cargarNombre);
	$("#btnBuscar").click(buscarMuestra);
	$("#btnEditarExam").click(editarExamenes);
	$(".btnTemporal").click(volverNormal);
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
		hid[i].classList.remove("hidden");
	}
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
}