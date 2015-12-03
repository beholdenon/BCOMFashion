
window.catBrowse = window.catBrowse || {};

var catBrowse = { 
	
	build: function ( data, browseClass ) {

		$("#browseShell").addClass(browseClass);
		$("#browseShell").append("<h2 class='title'>"+data.category[0].summary.name+"</h2>");
		$("#browseShell").append("<ul class='products'></ul>");
		console.log(data.category);

		var base = data.category[0].product.product;

		for ( pn = 0; pn < base.length; pn++ ) {

			var imgWidth = "";
			if ( $("#browseShell").attr("class").indexOf("two-col") >= 0 ) imgWidth = "&wid=" + ($("#browseShell .products").width()*0.36).toFixed(0);
			if ( $("#browseShell").attr("class").indexOf("three-col") >= 0 ) imgWidth = "&wid=" + ($("#browseShell .products").width()*0.2358).toFixed(0);

			$("#browseShell .products")
				.append("<li id='"+base[pn].id+"' data-num="+pn+">"+
				"<div class='imgBox'><img class='primary' src='"+base[pn].image[0].imageurl+imgWidth+"'/></div>"+
				"<hr class='breaker'/>"+
				"<div class='brand'>"+base[pn].summary.brand+"</div>"+
				"<div class='name'>"+base[pn].summary.name+"</div>"+
				"</li>"
			);

			// Price check and insert
			if ( base[pn].price.onsale === true && base[pn].price.hasOwnProperty("current") ) {
				$("<div class='priceNow'>"+(base[pn].price.current.label)+" $"+(base[pn].price.current.value).toFixed(2)+"</div>").insertAfter('#browseShell .products #'+ base[pn].id+ " .name");
				$("<div class='priceOriginal'>"+(base[pn].price.original.label)+" $"+(base[pn].price.original.value).toFixed(2)+"</div>").insertAfter('#browseShell .products #'+ base[pn].id+ " .name");
			} else if ( base[pn].price.onsale === true && base[pn].price.hasOwnProperty("regular") ) {
				$("<div class='priceNow'>"+(base[pn].price.sale.label)+" $"+(base[pn].price.sale.value).toFixed(2)+"</div>").insertAfter('#browseShell .products #'+ base[pn].id+ " .name");
				$("<div class='priceOriginal'>"+(base[pn].price.regular.label)+" $"+(base[pn].price.regular.value).toFixed(2)+"</div>").insertAfter('#browseShell .products #'+ base[pn].id+ " .name");
			} else {
				$("<div class='price'>$"+(base[pn].price.regular.value).toFixed(2)+"</div>").insertAfter('#browseShell .products #'+ base[pn].id+ " .name");
			}
			


			swatchCounter = 0;

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
						upcImg = curImg.upcprimaryimage.imageurl;
						if ( swatchCounter == 0 ) $('#browseShell .products #'+ base[pn].id+ " .primary").attr("src", upcImg+imgWidth);
					}

					var swatch = "<div data-url='"+upcImg+imgWidth+"' class='colorBox "+status+"'><img class='swatch' src='"+curImg.swatchimage.imageurl+"'/></div>";
					$(swatch).insertBefore('#browseShell .products #'+ base[pn].id+ " .brand");

					swatchCounter++;
				}
			}

			if ( $("#browseShell .products #" + base[pn].id ).find(".swatch").length <= 1 ) {
				$("#browseShell .products #" + base[pn].id ).find(".swatch").hide();
			}

			// Review Hearts check and insert
			if ( base[pn].summary.totalreviews > 0 ) {
				var hearts = "<img src='http://assets.bloomingdales.com/img/catalog/productRating/rating-";
				
				if (base[pn].summary.customerrating === parseInt(base[pn].summary.customerrating, 10)) {
					hearts += base[pn].summary.customerrating +"-0";
				} else {
					var rating = base[pn].summary.customerrating.toString();
					hearts += rating.split(".")[0] + "-" + rating.split(".")[1].charAt(0);
				}

				hearts += ".gif'/>";

				$(hearts).insertAfter('#browseShell .products #'+ base[pn].id+ " .name");
			}
		}
	},

	request: function ( catID, browseClass ) {
		SERVICES.category.browseProduct(function(result){
			
			catBrowse.build( result, browseClass );

		}, catID);
	},

};


$(document).ready(function($) {
	var tempImg = "",
		primary = "",
		imgWidth = "";

	// swatch interactions
	$("#browseShell")
		.on("mouseenter", ".swatch", function (ev){
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
			$(this).parent().addClass('active').siblings().removeClass('active');
			$(this).parents("li").find(".primary").attr("src", tempImg);
		});

});