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

	SERVICES.brightCove.getURL(function(res){
		$('#stories').attr('src', res);
	}, 5124807676001 );

	$('#stories').on('click', function () {
		$(this)[0].play();
	});

	$('.arrow').on('click', function () {
		var arrow = $(this);
		if ( !$(this).hasClass('locked') ) {
			var activeElem = $('#doctors li.active'),
				nextElem = getNext(),
				direction = -1,
				distance = $('#doctors').width();

			$('.arrow').addClass('locked');


			if ( arrow.hasClass('arrowL') ) {
				direction = 1;
				nextElem.css('left', distance*-1);
			} else {
				nextElem.css('left', distance);
			}

			console.log('==========');
			// console.log(nextElem);

			$(activeElem, nextElem).animate(
				{left: "+="+distance*direction},
				500, 
				function() {
					activeElem.removeClass('active');
					nextElem.addClass('active');

					console.log($('#doctors li.active'));

					$('.arrow').removeClass('locked');

					$('#doctorDots li').eq( $('#doctors li').index('.active') ).addClass('active').siblings().removeClass('active');
			});

			function getNext() {
				var pos = $('#doctors li').index('.active');
				// console.log('1:'+pos);

				if ( arrow.hasClass('arrowR') && pos >= $('#doctors li').length-1 ) {
					pos = 0;
					// console.log('2:'+pos);
				} else if ( arrow.hasClass('arrowL') && pos <= 0 ) {
					pos =  $('#doctors li').length-1;
					// console.log('3:'+pos);
				} else if ( arrow.hasClass('arrowR') ) {
					pos++;
					// console.log('4:'+pos);
				} else {
					pos--;
					// console.log('5:'+pos);
				}

				// console.log('6:'+pos);

				return $('#doctors li').eq(pos);
			}
		}
	});
});