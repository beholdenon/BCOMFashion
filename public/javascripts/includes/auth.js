$(window).ready(function(){
	$('.authRequest').on('click', function (ev){
		window.location.href='https://auth.bloomingdales.com/v2/oauth2/authorize?scope=t&client_id=yccsf9ccz5gdux24yq84p4yd&response_type=token&redirect_uri=http://sample.com';
	});
});