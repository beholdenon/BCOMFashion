$(document).ready(function(){

	$('.link').on('click', function(){
		$('.guide').hide();
		$('#'+$(this).data('link')).show();
	});

});