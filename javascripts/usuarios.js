$(document).ready(function(){
	cargarDatosExamenes();
	cargarDatosUsuario();
	cargarCentros();
	init();
});


function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	$("#info-lateral button").click(editarDatos);
	$("#info-med").hide();
}

function cargarDatosExamenes(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				var json = JSON.parse(xhttp.responseText);
					var tabla = document.getElementById("tblExamen");
					
					json.forEach(function(examen){
						var tablaFila = document.createElement("tr");
						var datos1 = document.createElement("td");
						var datos2 = document.createElement("td");
						var datos3 = document.createElement("td");
						datos1.textContent = examen.fecha.dia +"/"+ examen.fecha.mes +"/"+examen.fecha.anio;
						datos3.textContent = examen.estado;
						if(examen.examenes.length >1){
							for(i=0;i<examen.examenes.length;i++){
								var tablaFila2 = document.createElement("tr");
								var datos4 = document.createElement("td");
								var datos5 = document.createElement("td");
								var datos6 = document.createElement("td");
								datos4.textContent = datos1.textContent;
								datos5.textContent = examen.examenes[i].nombre;
								datos6.textContent = datos3.textContent;
								
								tablaFila2.appendChild(datos4);
								tablaFila2.appendChild(datos5);
								tablaFila2.appendChild(datos6);
								
								tabla.appendChild(tablaFila2);
							}
						}else{
							datos2.textContent = examen.examenes.nombre;
							tablaFila.appendChild(datos1);
							tablaFila.appendChild(datos2);
							tablaFila.appendChild(datos3);
							
							tabla.appendChild(tablaFila);
						}
					});
			}
		};
		
		xhttp.open("GET","json/examenes.json", true);
		xhttp.send();
}

function editarDatos(){
	var inp = $(".form-group input").get();
	if($('#info-cliente').hasClass("consulta")){
		for(i=0;i<inp.length;i++){
			inp[i].removeAttribute("readonly");
		}
		$('#info-cliente').removeClass("consulta");
		$("#btnEditar small").text("Guardar Cambios");
		$("#btnEditar span").hide();
	}else{
		guardarCambios();
		location.reload();
	}
}

function cargarDatosUsuario(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			json.forEach(function(usuario){
				if(usuario.nomusuario == "mavemore"){
					$("#nombreUsuario").val(usuario.nombres);
					$("#apellidoUsuario").val(usuario.apellidos);
					$("#IDUsuario").val(usuario.cedula);
					$("#emailUsuario").val(usuario.correo);
					$("#dirUsuario").val(usuario.direccion);
					$("#telUsuario").val(usuario.telefono[0]);
					$("#imgUsuario").attr("src",usuario.foto);
				}
			});
		}
	};
	xhttp.open("GET","json/usuarios.json", true);
	xhttp.send();
}

function mostrarCentro(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			json.forEach(function(centro){
				if(centro.nombre == $(".dropdown-menu li a[class='active']").text()){
					$("#nomCentro").text(centro.nombre);
					$("#horarioCentro").text(centro.horarios);
					$("#dirCentro").text(centro.direccion);
					$("#descripCentro").text(centro.descripcion);
				}
			});
		}
	};
	xhttp.open("GET","json/centros.json", true);
	xhttp.send();
	$("#info-med").show();
}

function cargarCentros(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			var ul = $(".dropdown-menu");
			json.forEach(function(centro){
					var txt = centro.nombre;
					ul.append($('<li>').append($('<a>').attr('href','#').text(txt)));
					$(".dropdown-menu li a").click(function(){
						$(".dropdown-menu li a[class='active']").removeClass("active");
						$(this).addClass("active");
						mostrarCentro();
						$("#dropdownMenu1").text($(this).text());
					});
			});
		}
	};
	xhttp.open("GET","json/centros.json", true);
	xhttp.send();
}

function guardarCambios(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			json.forEach(function(usuario){
				if(usuario.nomusuario == "mavemore"){
					usuario.nombres = $("#nombreUsuario").text();
				}
			});
		}
	};
	xhttp.open("POST","json/usuarios.json", true);
	xhttp.send();
}