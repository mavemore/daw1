$(document).ready(function(){
	cargarCentros();
	init();
});

function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	$("#btnBuscarId").click(cargarNombre);
	$("#btnElim").click(buscarMuestra);
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
	$(".dropdown-menu li a[class='hidden']").removeClass("hidden");
}