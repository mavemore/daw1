$(document).ready(function(){
	init();
	cargarDatos();
});


function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	$("#info-lateral button").click(editarDatos);
}

function cargarDatos(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				var json = JSON.parse(xhttp.responseText);
				console.log(json);
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
	for(i=0;i<inp.length;i++)
		inp[i].attr('readonly', !inp[i].attr('readonly'));
	if($('#info-cliente').hasClass("consulta")){

	}else{
		
	}
}