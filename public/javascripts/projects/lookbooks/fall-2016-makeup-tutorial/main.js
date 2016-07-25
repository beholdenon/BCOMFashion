/* globals SERVICES */
'use strict';

var APP = {
	
	cm: {
		category: "fall16_makeupdate",
	},
	currentPage: 0,
	markup: [],

	stickyNav: function () {
		if ( $(document).scrollTop() > APP.navStart ) {
			$('#navigation').css('top', $(document).scrollTop() - $('header').height() - 1 + 'px');
		} else if ( $(document).scrollTop() <= APP.navStart ) {
			$('#navigation').css('top', APP.navStart - $('header').height() - 1 + 'px');
		}
	},

	scrollTo: function (tar) {
		tar = $('#'+tar).offset().top;
		$("html, body").animate({scrollTop: tar}, 500);
	},

	srcSwitcher: function (target, source) {
		$(target).attr('src', source);
	},

	updateShop: function( data ) {
		var products,
			html = "<ul class='shopContainer'>",
			baseImgURL = "http://images.bloomingdales.com/is/image/BLM/products/4/optimized/";
		
		APP.markup = [];
		APP.currentPage = 0;

		// get product data from WSSG
		SERVICES.product.upcGet(function(res){
			console.log(res.product);
			products = res.product;

			// build HTML in SHOP THE LOOK section
			$.each( products, function(i, value) {
				if ( APP.markup[Math.floor(i/5)] === undefined ) APP.markup[Math.floor(i/5)] = [];
				var li = "<li class='prod-"+i+"'><img src='"+baseImgURL+value.productDetails.primaryImage.imagename+"'><p class='brand'>"+value.productDetails.summary.brand+"</p><p class='name'>"+value.productDetails.summary.name.replace(value.productDetails.summary.brand, '')+"</p></li>";
				APP.markup[Math.floor(i/5)].push(li);
			});

			$.each(APP.markup[APP.currentPage], function(i, value) {
				html += value;
			});

			html+="</ul>";
			$('#prodShell').html(html);
			$('#dynamicPROs .pagn .cur').text(1);
			$('#dynamicPROs .pagn .tot').text( Math.ceil( products.length/5 ) );

		}, data.join(","));
	}

};

$(document).ready(function() {
	APP.navStart = $('#navigation').offset().top - 1;
	APP.stickyNav();

	$.getJSON('/fashion/javascripts/projects/lookbooks/fall-2016-makeup-tutorial/shop.json', function(json) {
		APP.products = json.products;
		console.log('data call complete');
	}).done( function () {
		console.log('starting build');
		APP.updateShop( APP.products[ $("#videoBox .active").attr("data-upc") ].upc );
	});

	$(document).scroll( function() {
		APP.stickyNav();
	});

	$(".point").on("click", function () {
		APP.scrollTo( $(this).attr("data-scroll") );
	});

	// VIDEO SWITCH
	$("#videoBox .vidBox").on("click", function () {
		$(this).addClass('active').siblings().removeClass('active');
		APP.srcSwitcher( "#makeupVideo", $(this).attr("data-source") );

		$('#prodShell').html("<img class='loader' src='/fashion/images/ajax-loader.gif'/>");
		APP.updateShop( APP.products[ $(this).attr("data-upc") ].upc );
	});

	$("#prosLeft").on("click", function () {
		APP.currentPage --;
		if (APP.currentPage < 0) APP.currentPage = APP.markup.length-1;

		var html = "<ul class='shopContainer'>";
		$.each(APP.markup[APP.currentPage], function(i, value) {
			html += value;
		});

		html+="</ul>";
		$('#prodShell').html(html);
		$('#dynamicPROs .pagn .cur').text(APP.currentPage+1);		
	});

	$("#prosRight").on("click", function () {
		APP.currentPage ++;
		if (APP.currentPage >= APP.markup.length) APP.currentPage = 0;

		var html = "<ul class='shopContainer'>";
		$.each(APP.markup[APP.currentPage], function(i, value) {
			html += value;
		});

		html+="</ul>";
		$('#prodShell').html(html);
		$('#dynamicPROs .pagn .cur').text(APP.currentPage+1);
	});

});

$(window).load(function () {
	
});

