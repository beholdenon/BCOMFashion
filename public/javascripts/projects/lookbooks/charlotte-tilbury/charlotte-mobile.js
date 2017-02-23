/* globals SERVICES, Hammer */
'use strict';

var CHARLOTTE = {

	cm: {
		category: "mbl:fall16_CharlotteTilbury"
	},
	baseHeader: '/b/fashion/images/projects/lookbooks/charlotte-tilbury/hero-',
	currentHeader: 1,

	// changes header image 

	rotateHeader: function () {
		CHARLOTTE.currentHeader++;
		if (CHARLOTTE.currentHeader > 3) CHARLOTTE.currentHeader = 1;

		setTimeout( function() {
			$('#CT-Header').css('background-image', 'url('+CHARLOTTE.baseHeader+CHARLOTTE.currentHeader+'.jpg)');
			CHARLOTTE.rotateHeader();
		}, 1500);

	},

	// updates the products
	updateShop: function( data ) {
		var products,
			itemsPerPage = 6,
			html = "",
			baseImgURL = "http://images.bloomingdales.com/is/image/BLM/products/4/optimized/";
		
		CHARLOTTE.markup = [];
		CHARLOTTE.currentPage = 0;

		// get product data from WSSG
		SERVICES.product.upcGet( function(res){
			
			if ( res === "error" ) {
				$('#signature-looks #products').hide();
				console.log("Product UPC ID error from WSSG");
			} else {
				
				products = res.product;
				// build HTML in SHOP THE LOOK section
				$.each( products, function(i, value) {
					if ( CHARLOTTE.markup[Math.floor(i/itemsPerPage)] === undefined ) CHARLOTTE.markup[Math.floor(i/itemsPerPage)] = [];
					var li = "<li class='product'><a target='_blank' href='"+value.productDetails.summary.productURL+"'><img src='"+baseImgURL+value.productDetails.primaryImage.imagename+"'><p class='name'>"+value.productDetails.summary.name+"</p></li>";
					CHARLOTTE.markup[Math.floor(i/itemsPerPage)].push(li);
				});

				$.each(CHARLOTTE.markup[CHARLOTTE.currentPage], function(i, value) {
					html += value;
				});

				$('#signature-looks #products ul').html(html);
				
				$('#products .pagn .cur').text(1);
				$('#products .pagn .tot').text( Math.ceil( products.length/itemsPerPage ) );	
			}

		}, data.join(","));
	},

	coremetrics: function (tagType, categoryID, pageID, attributes) {
        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
            } catch (e) {
                CHARLOTTE.logErr('CoreM_err: ' + e);
            }
            CHARLOTTE.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID, attributes || null );
            } catch (e) {
                CHARLOTTE.logErr('CoreM_err: ' + e);
            }

            CHARLOTTE.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
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
	CHARLOTTE.coremetrics('Pageview', CHARLOTTE.cm.category, CHARLOTTE.cm.category );
});

$(document).ready( function () {

	// CHARLOTTE.updateShop([5060332322381, 5060332320035, 5060332323760, 5060332320172, 5060332323463, 5060332320370, 5060332320325, 5060332324378, 5060332320271, 5060332320721, 5060332321308, 5060332320226, 5060332320882, 5060332322923]);
	
	// CHARLOTTE.rotateHeader();

	SERVICES.brightCove.getURL( function(res) {
		$('#signature-video').attr('src', res);
	}, $('#signature-video').attr('data-id') );

	$('#signature-video').on('click', function () {
		if ( $('#signature-video')[0].paused === true ) {
			$('#signature-video')[0].play();	
		} else {
			$('#signature-video')[0].pause();
		}
	});

	$('#exclusive-placeholder').on('click', function () {
		$(this).hide();
		$('#signature-video').show().get(0).play();
	});

	$("#left-arrow, #right-arrow").on("click", function(ev) {
		ev.stopPropagation();
		if ( !$("#left-arrow, #right-arrow").hasClass('locked') ){
			$("#left-arrow, #right-arrow").addClass('locked');

			var curPage = $(".videoSlide.active").attr("data-slide"),
				prevPage = $(".videoSlide.active").attr("data-slide"),
				direction;

			if ( $(this).attr('id') === 'left-arrow' ) {
				curPage--;
				if (curPage <= 0 ) curPage = 6;
				direction = 1;
			} else {
				curPage++;
				if (curPage > 6 ) curPage = 1; 
				direction = -1;
			}
			
			$('#best-sellers [data-slide='+prevPage+'] .tablet-image').animate({opacity:0.25}, 500);
			$('#best-sellers [data-slide='+curPage+'] .tablet-image').animate({opacity:1}, 500);
			$("#essential-arrows .arrow").animate({"opacity": 0}, 500).promise().then( function() {
				
				$("#essential-arrows .arrow .current").text( curPage );
				$('#best-sellers [data-slide='+curPage+']').addClass('active').css("left", $(window).width()*direction*-1 );

				$('#best-sellers [data-slide='+curPage+'], #best-sellers [data-slide='+prevPage+'] ').animate({"left": "+=" + $(window).width() *direction }, 1000).promise().then(function() {
					$('#best-sellers [data-slide='+prevPage+']').removeClass('active');
					$("#essential-arrows .arrow").animate({"opacity": 1}, 500).promise().then( function(){
						$("#left-arrow, #right-arrow").removeClass('locked');
					});
				});

			});
		}	
	});

	var sellerSwipe = new Hammer( document.getElementById('best-sellers') );
	sellerSwipe.on('swipe', function(ev) {
		//Hammer.js: left = 2, right = 4
		if ( ev.direction === 2 ) {
			$("#right-arrow").trigger('click');
		} else if ( ev.direction === 4) {
			$("#left-arrow").trigger('click');
		}
	});

	// COREMETRICS
	$("[data-element]").on("click", function () {

		if ( $(this)[0].hasAttribute('data-attribute') ) {
			var attr = $(this).attr('data-attribute'),
				attrNum = attr.substring(0, attr.indexOf(':')),
				attrVal = attr.substring(attr.indexOf(':')+1);

			for ( var i= parseInt(attrNum); i > 1; i-- ) {
				attrVal = '-_-' + attrVal;
			}

			CHARLOTTE.coremetrics('Element', CHARLOTTE.cm.category, 'mbl:' + $(this).attr("data-element"), attrVal );
		} else {
			CHARLOTTE.coremetrics('Element', CHARLOTTE.cm.category, 'mbl:' + $(this).attr("data-element") );
		}
		
	});

	$("video").on("play", function() {
		var attrNum = 16,
			attrVal = 2;

		for ( var i= parseInt(attrNum); i > 1; i-- ) {
			attrVal = '-_-' + attrVal;
		}

		CHARLOTTE.coremetrics('Element', CHARLOTTE.cm.category, 'mbl:' +$(this).attr("data-video"), attrVal );
	});

	$("video").on("pause", function() {
		var attrNum = 16,
			attrVal = 1;

		for ( var i= parseInt(attrNum); i > 1; i-- ) {
			attrVal = '-_-' + attrVal;
		}
			
		CHARLOTTE.coremetrics('Element', CHARLOTTE.cm.category, 'mbl:' +$(this).attr("data-video"), attrVal );
	});

});