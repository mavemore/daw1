$(document).ready(function(){
	init();
});


function init(){
	$("#btnSubmit").click(function()
	{
		var tipoUsuario = $("select option:selected").text();
		if( tipoUsuario == "Cliente"){
			window.location.href = "usuarios.html";
		}else if( tipoUsuario == "Operario"){
			window.location.href = "operarios.html";
		}
	});
}