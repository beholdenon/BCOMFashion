/* globals SERVICES */
'use strict';

var PINK = {

	cm: {
		category: '',
	},
	products: [1797784, 1797783, 1693401, 1465431, 1805172, 1822574, 1511841, 1801586, 1801585],

	// updates the dynamicPROs
	updateShop: function( data ) {
		var products,
			html = "",
			baseImgURL = "http://images.bloomingdales.com/is/image/BLM/products/4/optimized/";
		
		// get product data from WSSG
		SERVICES.product.get(function(res){
			console.log(res);

			if ( res === 'error') {
				$('#pink-products').hide();
			} else {
				products = res.product;

				// build HTML in SHOP THE LOOK section
				$.each( products, function(i, value) {
					html += "<li class='prod-"+i+"'><a target='_blank' href='"+value.productDetails.summary.productURL+"'><img src='"+baseImgURL+value.productDetails.primaryImage.imagename+"'><p class='name'>"+value.productDetails.summary.brand+" "+value.productDetails.summary.name.replace(value.productDetails.summary.brand)+", $"+value.upcs[0].upcDetails.price.retail.pricevalue+"</p><p class='description'>"+value.productDetails.summary.description+"</p></li>";
				});

				$('#pink-products').html(html);
			}
			
		}, data.join(","));
	},
	
};

$(document).ready(function() {
	// PINK.updateShop(PINK.products);
});