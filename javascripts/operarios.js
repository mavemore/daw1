$(document).ready(function(){
	init();
});

function init(){
	$("header button").click(function()
	{
		window.location.href = "index.html";
	});
	
	$(function() {
		$('#pickDesde').datetimepicker({
		  pickTime: false
		});
	});
	$(function() {
		$('#pickHasta').datetimepicker({
		  pickTime: false
		});
	});
}