var userID = 64354129;

var test = {
	
	checkRegistry: function (){
		$.ajax({
			url: "/auth/",
			headers: {
				'Content-Type': 'application/json',
			}
		}).success(function(res){
			$('#overlay').show().css('left',$('.content').offset().left+$('.content').width()/6);
			$('#overlayShield').show();
		}).fail(function(res){
			console.log('============[ registry view failure ]============');
			console.log(res);
		});
	},

}

