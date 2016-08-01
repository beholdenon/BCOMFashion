/* globals SERVICES */
'use strict';

var APP = {
	
	cm: {
		category: "fall16_makeupdate"
	},
	currentPage: 0,
	currentHero: 1,
	markup: [],
	pageview: "",

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

	updateNav: function () {
		$.each( $('section'), function() {
			var box = $(this)[0].getBoundingClientRect();
			if ( box.top <= ( 0 + $(window).height() / 3) && box.bottom >= ( 0 + $(window).height() / 3) ) {
				var activeElem = $(this);
				$.each( $('#navigation .point'), function () {
					if ( activeElem.attr("id") === $(this).attr("data-scroll") || activeElem.attr("data-pseudo") === $(this).attr("data-scroll") ) {
						$(this).css("text-decoration", "underline");
					} else {
						$(this).css("text-decoration","none");
					}
				});

				// Coremetrics firing on scroll
				if ( activeElem.attr("data-pageView") !== undefined && APP.pageview !== activeElem.attr("data-pageView") ) {
					APP.pageview = activeElem.attr("data-pageView");
					APP.coremetrics('Pageview', APP.cm.category, APP.pageview );
				}

			}
		});

	},

	updateShop: function( data ) {
		var products,
			html = "<ul class='shopContainer'>",
			baseImgURL = "http://images.bloomingdales.com/is/image/BLM/products/4/optimized/";
		
		APP.markup = [];
		APP.currentPage = 0;

		// get product data from WSSG
		SERVICES.product.upcGet(function(res){
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
			$('#prodShell').html(html);
			$('#dynamicPROs .pagn .cur').text(1);
			$('#dynamicPROs .pagn .tot').text( Math.ceil( products.length/5 ) );

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
		}, 2200);
	},

	coremetrics: function (tagType, categoryID, pageID, attributes) {
        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
            } catch (e) {
                APP.logErr('CoreM_err: ' + e);
            }
            APP.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID, attributes || null );
            } catch (e) {
                APP.logErr('CoreM_err: ' + e);
            }

            APP.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
        }
    },

    logErr: function (log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    },

};

$(window).load(function() {
	APP.coremetrics('Pageview', APP.cm.category, APP.cm.category.concat("--hp") );
});

$(document).ready(function() {
	APP.navStart = $("header").height() + $("#makeup_hero").height() + 1;
	APP.stickyNav();
	APP.heroRotation();

	$(window).resize( function(){
		APP.navStart = $("header").height() + $("#makeup_hero").height() + 1;
		APP.stickyNav();
	});

	$.getJSON('/fashion/javascripts/projects/makeup-date/fall-2016-tutorial/shop.json', function(json) {
		APP.products = json.products;
		console.log('data call complete');
	}).done( function () {
		console.log('starting build');
		APP.updateShop( APP.products[ $("#videoBox .active").attr("data-upc") ].upc );
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
		$('#makeupVideo').attr("data-name", $(this).attr("data-element"));

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

	// COREMETRICS ELEMENT TAGS

	$("[data-element]").on("click", function () {
		APP.coremetrics('Element', APP.cm.category, $(this).attr("data-element") );
	});

	$("#samples .sample").on("click", function () {
		APP.coremetrics('Element', APP.cm.category, "exclusive-gift_".concat( $(this).find(".name").text().replace(/\s+/g, '-') ).slice(0, 50) );
	});

	$("#dynamicPROs").on("click", "li", function() {
		console.log($(this).attr("class"));
		APP.coremetrics('Element', APP.cm.category, ("videos_products-" + $(this).parents("#dynamicPROs").find(".pagn .cur").text() + $(this).find(".name").text().replace(/\s+/g, '-') ).slice(0, 50) );
	});

	var video = {start:0, stop:0};

	$("#makeupVideo").on('ended',function() {
		var vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-3";
        APP.coremetrics('Element', APP.cm.category, "videos" + $(this).attr("data-name"), vid);
    });

    $("#makeupVideo").on("play", function () {
    	var vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-1";
    	APP.coremetrics('Element', APP.cm.category, "videos" + $(this).attr("data-name"), vid);
		video.start = $("#makeupVideo").get(0).currentTime;
    });

    $("#makeupVideo").on("pause", function () {
    	if ( $("#makeupVideo").get(0).ended !== true ) {
    		var vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-2";
    		video.stop = $("#makeupVideo").get(0).currentTime;
    		APP.coremetrics('Element', APP.cm.category, "videos" + $(this).attr("data-name"), vid);
    	}
    });

    

	// $("#makeupVideo").on("click", function() {

	// 	if ( $(this).get(0).paused ) {
	// 		console.log("PAUSED");
	// 	} else {
	// 		console.log("PLAYING");
	// 	}

	// });
	// videos_products-<page number>-<product-name>

});


