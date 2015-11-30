
window.catBrowse = window.catBrowse || {};

var catBrowse = { 
	
	build: function ( data ) {

	},

	request: function (catID) {
		SERVICES.category.browse(function(result){
			alert(result)
		}, catID);
	},

};
