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

	getNext: function (arrow) {
		var pos = $('.active').index('#doctors > li');

		if ( arrow.hasClass('arrowR') && pos >= $('#doctors > li').length-1 ) {
			pos = 0;
		} else if ( arrow.hasClass('arrowL') && pos <= 0 ) {
			pos =  $('#doctors > li').length-1;
		} else if ( arrow.hasClass('arrowR') ) {
			pos++;
		} else {
			pos--;
		}
		console.log( $('#doctors > li').eq(pos) );
		return $('#doctors > li').eq(pos);
	}
};

$(document).ready(function() {
	// PINK.updateShop(PINK.products);

	SERVICES.brightCove.getURL(function(res){
		$('#stories').attr('src', res);
	}, 5124807676001 );

	$('#stories').on('click', function () {
		$(this)[0].play();
	});

	$('.arrow').on('click', function () {
		var arrow = $(this),
			activeElem = $('#doctors > li.active'),
			nextElem = PINK.getNext(arrow),
			direction = 1;
			// distance = $('#doctors').width();

		if ( arrow.hasClass('arrowR') ) {
			direction = -1;
		}

		activeElem.removeClass('active').hide();
		nextElem.addClass('active').show();
		$('#doctorDots li').eq( $('.active').index('#doctors > li') ).addClass('active').siblings().removeClass('active');

		// nextElem.css('left', distance*(direction*-1));
		
		// $('.arrow').fadeOut('slow').promise().then( function() {
		// 	$(activeElem, nextElem).animate({left: "+="+distance*direction},500).promise().then(
		// 		function() {
		// 			activeElem.removeClass('active');
		// 			nextElem.addClass('active');

		// 			$('.arrow').fadeIn('slow');

		// 			$('#doctorDots li').eq( $('#doctors li').index('.active') ).addClass('active').siblings().removeClass('active');
		// 	});
		// });
			
	});
});