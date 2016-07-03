$(document).ready(function(){
	init();
});


function init(){
	$("#btnSubmit").click(function()
	{
		var tipoUsuario = $("select option").val();
		if( tipoUsuario == "Cliente")
			window.location.href = "usuarios.html";
	});
}