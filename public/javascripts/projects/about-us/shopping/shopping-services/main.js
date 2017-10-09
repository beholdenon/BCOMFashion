'use strict';

require( [ "jquery" ], function ( $ ) {

	$(document).ready(function(){
		
      	$('[data-cm-link-click]').each(function () {
        	generateCoremetricsLink(this);
      	});

	    function generateCoremetricsLink(link) {
	      var linkName = $(link).data('cm-link-click'),
        	href = $(link).attr('href') || document.location.href;
        	
	      href += '?cm_sp=shopping_services-_-' + linkName + '-_-n';

	      $(link).attr('href', href);
	    }

	});
});
