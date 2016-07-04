$(document).ready(function(){
	init();
});

function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	
	$(function() {
		$( "#pickDesde" ).datepicker();
	});
	$(function() {
		$( "#pickHasta" ).datepicker();
	});
}