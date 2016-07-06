$(document).ready(function(){
	init();
});


function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	$("#btnBuscar-recibomuestra").click(buscarMuestra);
	$(".fades-in").hide();
	$("#btnRecibir").click(recibirExamenes);
	$(".btnTemporal").click(volverNormal);
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
			json.forEach(function(examen){
				if(examen.codigo == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false' checked></td>");
					$(fila).append("<td id='cod'>"+examen.codigo+"</td>");/*.click(crearCookie(examen.codigo));*/
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
				}else if(examen.paciente.cedula == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false' checked></td>");
					$(fila).append("<td id='cod'>"+examen.codigo+"</td>");
					$(fila).append("<td>"+examen.fecha.dia+"/"+examen.fecha.mes+"/"+examen.fecha.anio+"</td>");
					$(fila).append("<td>"+examen.paciente.nombre+" "+examen.paciente.apellido+"</td>");
					$(fila).append("<td>"+examen.estado+"</td>");
					$(".table").append(fila);
				}
				else if(examen.paciente.nombre+" "+examen.paciente.apellido == $("#inputBusqueda").val()){
					var fila = $("<tr>");
					$(fila).append("<td><input type='checkbox' name='seleccion' value='false' checked></td>");
					$(fila).append("<td id='cod'>"+examen.codigo+"</td>");
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

function recibirExamenes(){
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