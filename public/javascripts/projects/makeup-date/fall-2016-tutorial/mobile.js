/* globals SERVICES */
'use strict';

var APP = {
	
	cm: {
		category: "MBL:fall16_makeupdate",
	},
	currentPage: 0,
	currentHero: 1,
	markup: [],
	vSection: [
		"#Light-Red .prodShell",
		"#Medium-Red .prodShell",
		"#Dark-Red .prodShell"
	],

	stickyNav: function () {
		// below starting position of nav
		if ( $(document).scrollTop() > APP.navStart + $("header").height() ) {
			$('#stickyNav').css('top', $(document).scrollTop() - $("header").height() - 5 + 'px');
		
		// above starting position of nav
		} else if ( $(document).scrollTop() <= APP.navStart ) {
			$('#stickyNav').css('top', APP.navStart + 'px');
		}
	},

	scrollTo: function (tar) {
		tar = $('#'+tar).offset().top - $('#stickyNav').height() + 5 ;
		$("html, body").animate({scrollTop: tar}, 500);
	},

	srcSwitcher: function (target, source) {
		$(target).attr('src', source);
	},

	updateNav: function () {
		$.each( $('section'), function() {
			var box = $(this)[0].getBoundingClientRect();
			if ( box.top <= $('#stickyNav').height() && box.bottom >= ( $('#stickyNav').height() + 5 ) ) {
				var activeElem = $(this);
				$.each( $('#stickyNav .point'), function () {
					if ( activeElem.attr("id") === $(this).attr("data-scroll") || activeElem.attr("data-pseudo") === $(this).attr("data-scroll")  ) {
						var tar = $(this);
						$("#stickyNav h3").text( tar.attr("data-scroll") );
						tar.addClass('active').siblings().removeClass('active');
					}
				});
			}
		});

	},

	updateShop: function( data, target ) {
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
				var li = "<li class='prod-"+i+"'><a href='"+value.productDetails.summary.productURL+"'><img src='"+baseImgURL+value.productDetails.primaryImage.imagename+"'><p class='brand'>"+value.productDetails.summary.brand+"</p><p class='name'>"+value.productDetails.summary.name.replace(value.productDetails.summary.brand, '')+"</p></li>";
				APP.markup[Math.floor(i/5)].push(li);
			});

			$.each(APP.markup[APP.currentPage], function(i, value) {
				html += value;
			});

			html+="</ul>";
			$(target).html(html);

		}, data.join(","));
	},

	heroRotation: function() {
		setTimeout(function(){
			var fade = APP.currentHero;
			if ( APP.currentHero >= 3 ) {
				APP.currentHero = 1;
			} else {
				APP.currentHero++;	
			} 

			$('#hero-'+fade).css('z-index',4);
			$('#hero-'+APP.currentHero).css('z-index',5).animate({
				'opacity': 1},
				1200, function() {
				$('#hero-'+fade).css({"opacity":0});
			});

			APP.heroRotation();
		}, 3200);
	},

};

$(document).ready(function() {
	APP.navStart = $("#makeup_hero").height();
	$("#stickyNav").css("top", APP.navStart );

	APP.stickyNav();
	APP.heroRotation();

	$(window).resize( function(){
		APP.navStart = $("#makeup_hero").height();
		APP.stickyNav();
	});

	$.getJSON('/fashion/javascripts/projects/makeup-date/fall-2016-tutorial/shop.json', function(json) {
		APP.products = json.products;
		console.log('data call complete');
	}).done( function () {
		console.log('starting build');
		var n = 0;
		$.each(APP.products, function(i) {
			APP.updateShop( APP.products[i].upc, APP.vSection[n] );	
			n++;
		});
	});

	$("#stickyNav h3").on("click", function () {
		$("#stickyNav h3").toggleClass('open');
		$("#stickyNav ul").toggle();
	});

	$("#stickyNav ul li").on("click", function () {
		// var tar = $(this);
		// if ( $("#stickyNav h3").hasClass('open') ) {
		// 	$("#stickyNav h3").text( tar.attr("data-scroll") );
		// 	tar.addClass('active').siblings().removeClass('active');
		// }

		$("#stickyNav h3").toggleClass('open');
		$("#stickyNav ul").toggle();
	});

	$(document).scroll( function() {
		APP.stickyNav();
		APP.updateNav();
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

