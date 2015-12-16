
window.catBrowse = window.catBrowse || {};

var catBrowse = { 
	
	build: function ( data, properties ) {
		var browseClass = properties.gridClasses,
			domTarget = properties.domTarget,
			quickpeekIcon = '<div class="atb_overlay quickPeekIcon" title="Quick Peek"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="30px" viewBox="0 0 512 512" enable-background="new 0 0 30 30" xml:space="preserve"><path id="magnifier-2-icon" fill="#676767" d="M460.355,421.59L353.844,315.078c20.041-27.553,31.885-61.437,31.885-98.037C385.729,124.934,310.793,50,218.686,50C126.58,50,51.645,124.934,51.645,217.041c0,92.106,74.936,167.041,167.041,167.041c34.912,0,67.352-10.773,94.184-29.158L419.945,462L460.355,421.59z M100.631,217.041c0-65.096,52.959-118.056,118.055-118.056c65.098,0,118.057,52.959,118.057,118.056c0,65.096-52.959,118.056-118.057,118.056C153.59,335.097,100.631,282.137,100.631,217.041z"></path></svg></div>';

		$(domTarget+".browseShell").addClass(browseClass);
		if ( properties.categoryName === true ) $(domTarget+".browseShell").append("<h2 class='title'>"+data.category[0].summary.name+"</h2>");
		$(domTarget+".browseShell").append("<ul class='products'></ul>");

		var base = data.category[0].product.product;

		for ( pn = 0; pn < base.length; pn++ ) {
			
			var imgWidth = "&wid=456";
			// if ( $(domTarget+".browseShell").attr("class").indexOf("two-col") >= 0 ) imgWidth = "&wid=" + ($(domTarget+".browseShell .products").width()*0.36).toFixed(0);
			// if ( $(domTarget+".browseShell").attr("class").indexOf("three-col") >= 0 ) imgWidth = "&wid=" + ($(domTarget+".browseShell .products").width()*0.2358).toFixed(0);

			brandMarkup = properties.brand === true ? "<div class='brand'>"+base[pn].summary.brand+"</div>" : "";

			altImg = base[pn].image.length > 1 && base[pn].image[1].imagetype === "ADDITIONAL_IMAGE" && properties.altImages === true ? base[pn].image[1].imageurl+imgWidth : "";

			$(domTarget+".browseShell .products")
				.append("<li id='"+base[pn].id+"' data-num="+pn+">"+
				"<div class='imgBox'><img class='primary' src='"+base[pn].image[0].imageurl+imgWidth+"' data-alt='"+altImg+"'/></div>"+
				"<hr class='breaker'/>"+
				brandMarkup+
				"<div class='name'>"+base[pn].summary.name+"</div>"+
				"</li>"
			);

			// add quick peek icon
			if ( properties.quickpeek === true ) {
				$(domTarget+".browseShell #" + base[pn].id + " .imgBox").append(quickpeekIcon);
				$(domTarget+".browseShell #" + base[pn].id + " .quickPeekIcon").attr("data-id", base[pn].id);
			}

			// add linking on images and product name
			if ( properties.linking === true ) {
				$(domTarget+".browseShell #" + base[pn].id + " .imgBox .primary, "+domTarget+".browseShell #" + base[pn].id + " .name").wrap("<a href='"+base[pn].summary.producturl+"'></a>")
			}

			// Price check and insert
			if ( properties.price === true ) {
				
				if ( base[pn].price.hasOwnProperty("sale") && base[pn].price.sale.hasOwnProperty('high') ) {
					$("<div class='priceNow'>"+(base[pn].price.sale.label)+" $"+(base[pn].price.sale.low).toFixed(2)+" - $"+(base[pn].price.sale.high).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
					$("<div class='priceOriginal'>"+(base[pn].price.regular.label)+" $"+(base[pn].price.regular.low).toFixed(2)+" - $"+(base[pn].price.regular.high).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
				} else if ( base[pn].price.regular.hasOwnProperty('high') ) {
					$("<div class='price'>$"+(base[pn].price.regular.low).toFixed(2)+" - $"+(base[pn].price.regular.high).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
				} else if ( base[pn].price.onsale === true && base[pn].price.hasOwnProperty("current") ) {
					$("<div class='priceNow'>"+(base[pn].price.current.label)+" $"+(base[pn].price.current.value).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
					$("<div class='priceOriginal'>"+(base[pn].price.original.label)+" $"+(base[pn].price.original.value).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
				} else if ( base[pn].price.onsale === true && base[pn].price.hasOwnProperty("regular") ) {
					$("<div class='priceNow'>"+(base[pn].price.sale.label)+" $"+(base[pn].price.sale.value).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
					$("<div class='priceOriginal'>"+(base[pn].price.regular.label)+" $"+(base[pn].price.regular.value).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
				} else {
					$("<div class='price'>$"+(base[pn].price.regular.value).toFixed(2)+"</div>").insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
				}
			}

			swatchCounter = 0;
			if ( properties.swatches === true ) {
				// Colorway check and insert
				for ( imgN = 0; imgN < base[pn].image.length; imgN++ ) {
					var curImg = base[pn].image[imgN]
					
					var status = "";
					if ( swatchCounter == 0 ) status = "active";

					// check if the type is colorway and it has a swatch
					if ( curImg.imagetype === "COLORWAY" && curImg.hasOwnProperty("swatchimage") ) {

						// check if the swatch is white to add a border so it can be seen.
						if (curImg.color.toLowerCase().indexOf("white") >= 0) status += " white";
						var upcImg = "n/a";

						// check to make sure the swatch has a hero image, otherwise use the swatch image.
						if ( curImg.hasOwnProperty("upcprimaryimage") && curImg.upcprimaryimage.hasOwnProperty("imageurl") ) {
							upcImg = curImg.upcprimaryimage.imageurl,
							upcAlt = ( curImg.hasOwnProperty("upcadditionalimage") && properties.altImages === true ) ? curImg.upcadditionalimage[0].imageurl+imgWidth : ""; 

							// set the swatch hero as the primary image of the product and the swatch alt as the alt image.
							if ( swatchCounter == 0 ) {
								$(domTarget+'.browseShell .products #'+ base[pn].id+ " .primary").attr("src", upcImg+imgWidth);
								if (upcAlt != "") $(domTarget+'.browseShell .products #'+ base[pn].id+ " .primary").attr("data-alt", upcAlt);
							}
						}

						var swatch = "<div data-url='"+upcImg+imgWidth+"' data-alt='"+upcAlt+"' class='colorBox "+status+"'><img class='swatch' src='"+curImg.swatchimage.imageurl+"'/></div>";
						$(swatch).insertBefore(domTarget+'.browseShell .products #'+ base[pn].id+ " .brand");

						swatchCounter++;
					}
				}
			}

			if ( $(domTarget+".browseShell .products #" + base[pn].id ).find(".swatch").length <= 1 ) {
				$(domTarget+".browseShell .products #" + base[pn].id ).find(".swatch").hide();
			}

			// Review Hearts check and insert
			if ( base[pn].summary.totalreviews > 0 && properties.reviews === true ) {
				var hearts = "<img src='http://assets.bloomingdales.com/img/catalog/productRating/rating-";
				
				if (base[pn].summary.customerrating === parseInt(base[pn].summary.customerrating, 10)) {
					hearts += base[pn].summary.customerrating +"-0";
				} else {
					var rating = base[pn].summary.customerrating.toString();
					hearts += rating.split(".")[0] + "-" + rating.split(".")[1].charAt(0);
				}

				hearts += ".gif'/>";

				$(hearts).insertAfter(domTarget+'.browseShell .products #'+ base[pn].id+ " .name");
			}
		}
	},

	// Request for grid creation.
	request: function ( properties ) {

		var defaults = {
			altImages: true, // alterate images on mouse over of hero
			brand: true, // brand above product name
			categoryName: true, // display category name above products
			catID: '', // category ID for API call
			domTarget: '', // DOM target for grid placement
			gridClasses: "standard three-col", // classes for special styles. Standard grid is three, but two and four are pre-made
			linking: true,	// have image and product name link to product
			numberOfResults: 96, // number of results to display in the grid
			price: true, // display price under product name
			quickpeek: true, // display quick peek icon in bottom left of product image
			reviews: true, // display review hearts
			sortby: 'bestseller', // allow for special sorting if desired: price, customerrating, name, bestseller, newarrival
			swatches: true, // display swatches and allow swatch functionality
		}

		for( var key in defaults ) { 
		    properties[key] = properties.hasOwnProperty( key ) ? properties[key] : defaults[key];
		}

		SERVICES.category.browseProduct( function(result){
			console.log(result);
			catBrowse.build( result, properties);
		}, properties.catID, properties.numberOfResults, properties.sortby);

		
	},

};


$(document).ready(function($) {
	var tempImg = "",
		tempAlt = "",
		primary = "",
		imgWidth = "";

	// swatch interactions
	$(".browseShell")
		.on("mouseenter", ".swatch", function (){
			if ( !$(this).parent().hasClass('active') ) {
				tempImg = $(this).parent().attr("data-url"),
				primary = $(this).parents("li").find(".primary").attr("src");

				$(this).parents("li").find(".primary").attr("src", tempImg);

			}
		}).on("mouseleave", ".swatch", function () {
			if ( !$(this).parent().hasClass('active') ) {
				$(this).parent().removeClass("focus");

				$(this).parents("li").find(".primary").attr("src", primary);
			}
		}).on("click", ".swatch", function () {
			tempAlt = $(this).parent().attr("data-alt");
			$(this).parent().addClass('active').siblings().removeClass('active');
			if (tempAlt != "") $(this).parents("li").find(".primary").attr("src", tempImg).attr("data-alt", tempAlt);
		});

	$(".browseShell")
		.on("mouseenter", ".primary", function (){			
			if ( $(this).attr("data-alt") !== "" ) {
				primary = $(this).attr("src");
				tempImg = $(this).attr("data-alt");

				if ( $(this).attr("data-alt") != "" ) $(this).attr("src", tempImg);
			}
		}).on("mouseleave", ".primary", function () {
			if ( $(this).attr("data-alt") != "" ) $(this).attr("src", primary);
			primary = "";
			tempImg = "";
		});

});