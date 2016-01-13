/* jshint ignore:start */ 

var activeProduct;

$(document).ready( function () {
	var prodData,
		urlStart = "http://images.bloomingdales.com/is/image/BLM/products/9/optimized/",
		urlEnd = "?wid=400&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg";
	
	//ADD TO BAG CLICK
	$('.atb .atbLink').on('click', function (ev) {
		var add_id='',
			add_color='',
			add_size='',
			add_type='',
			add_quantity='',
			add_promocode='',
			upcColor='',
			upcSize='',
			upcID='',
			hasColor = true,
			hasSize = true;

		if ( $(this).parents('.atb').find(".color .swatch li").length <=0 ) hasColor = false;
		if ( $(this).parents('.atb').find(".size .options li").length <=0 ) hasSize = false;

		if ($(this).parents(".atb").find(".size .active").length <= 0 && hasSize == true ) {
			
			$(this).parents(".atb").find(".errors").html("<p class='errText'>Please select a size</p>");
			$(this).parents(".atb").find('.size').addClass('error');

		} else if ( $(this).parents(".atb").find(".color .active").length <= 0 && hasColor == true  ) {
			
			$(this).parents(".atb").find(".errors").html("<p class='errText'>Please select a color</p>");
			$(this).parents(".atb").find('.color').addClass('error');

		} else {
			
			$(this).parents(".atb").find('.error').removeClass('error');
			$(this).parents(".atb").find(".errors").text('');

			if ( $(this).parents('.atb').find('.size .active').length > 0 ) add_size = $(this).parents('.atb').find('.size .active').text();
			if ( $(this).parents('.atb').find('.swatch .active').length > 0  ) add_color = $(this).parents('.atb').find('.swatch .active').data("name");

			console.log('Size: '+add_size);
			console.log('Color: '+add_color);

			var upcList = prodData.product[0].upcs;

			for (a=0; a < upcList.length; a++) {
				var subUPCs = upcList[a].upcDetails.attributes

				// console.log(a);
				// console.log(upcList[a]);
				// console.log("+=============+");

				if ( subUPCs != undefined ) {
					for (b=0; b < subUPCs.length; b++){
						
						if (subUPCs[b].name == 'SIZE_NORMAL') upcSize = subUPCs[b].values[0].value;
						if (subUPCs[b].name == 'COLOR') upcColor = subUPCs[b].values[0].value;

					}
				}

				if (add_size == upcSize && add_color == upcColor) {
					// console.log(upcList);
					// console.log(a);
					// console.log(upcList[a].upcnumber);
					// console.log(upcList[a].upcDetails.skuid);
					// upcID = upcList[a].upcnumber;
					upcID = upcList[a].upcDetails.skuid;
				}
			}

			add_quantity = $(this).parents('.atb').find('.quantity select option:selected').text();
			var dataVal = 	{"item": {"quantity": add_quantity,"upcId": upcID.toString()}}

			var target = $(this);
            	// upcId = target.attr("data-upc");

	        SERVICES.bag.add( function(output) {
	        	console.log("Add to Bag:");
	        	console.log(output);
	        	console.log("---------------------------------");
	        	
	        	localStorage.setItem('bagUserID', output.bag.owner.userId);
	        	localStorage.setItem('bagGUID', output.bag.bagGUID);
	        	
	        	setTimeout(function(){
	        		SERVICES.bag.get(function(output){
		        		console.log("Retrieve Bag:");
	        			console.log(output);
	        			console.log("---------------------------------");
		        		// $('#brownBagItemsTotal').hide().text(output.bag.items[0].quantity).fadeIn(400);
		        	}, '', '', '', localStorage.bagGUID);
	        	}, 500);
	        	

	        }, upcID, add_quantity, localStorage.bagUserID);
			
		}
	});

	// close add to bag window
	$('.atb .close').on('click', function(){
		$('.atb, #atbOverlay').hide();
	});


	// return to grid on master-grid view
	$(".atb.masterGrid .back").on('click', function() {
		$(".atb.masterGrid .member").hide();
		$(".atb.masterGrid .grid").fadeIn();
	});


	// PDP OVERLAY BUILD
	$(document).on('click', '.atb_overlay', function(){
		var target = $(this),
			prodID = target.attr("data-id");

		currentThumbnailGroup = 1; //resets thumbnail arrows back to default

		if ( target.parents(".atb").hasClass("masterGrid") ) $(".masterGrid .grid").hide();

		$('#atbLoading').show();

        SERVICES.product.get(function(output) {
            // console.log(output);
            $('#atbLoading').hide();
            prodData = output;

            if (output.product[0].productDetails.childProducts != undefined) {
				( target.hasClass('master-grid') ) ? atb.gridMaster(output, prodID) : atb.defaultMaster(output, prodID);
			} else if ( target.parents(".atb").hasClass("masterGrid") ) {
				atb.member(output, prodID, ".atb.masterGrid .member")
			} else {
				// console.log(output);
				atb.member(output, prodID);
			}
        
        }, prodID);

	});

	// product active element change, swatch and size
	$('.atb').on('click','.swatch li', function(){
		$(this).addClass('active').siblings().removeClass('active');

		if ( $(this).find('.others img').length>0 ) {
			$('.atb .thumbnails').html('');
			$(this).find('.others img').clone().appendTo('.atb .thumbnails');
			$('.atb .thumbnails img').attr('style','');
		}

		// checks for unavailable color/size combo.
		if ( prodData.product[0].productDetails.SizeMap != undefined ) {
			availability.color(prodData, $(this) );
		}
	});

	$('.atb .size').on('click','li', function(){
		$(this).addClass('active').siblings().removeClass('active');

		availability.size(prodData, $(this) );
	});


	$(".atb").on("click", ".options li span, .swatch li", function() {
		if ( $(this).parent().hasClass('unavailable') || $(this).hasClass('unavailable') ) {

			$(".modal.outofstock").css("display","block");
			$(".atb .modal.instock").hide();

		} else {

			$(".modal.outofstock").hide(); 
			console.log(activeProduct);
			availability.currentItem("#" + $(this).parents(".atb").attr("id") );

		}
	});


	// product image change on swatch mouseover, switch back on mouseout
	$('.atb .color').on('mouseenter','.swatch li', function () {
		var swatchImg;
		if ($(this).data('prodimg') != undefined) {
			swatchImg = $(this).data('prodimg');
			$('.atb .image .main.product').attr('src', urlStart+swatchImg+urlEnd);
			$('.atb .image .prodSwatch').html('');
		} else if ($(this).data('swatch') != undefined) {
			swatchImg = $(this).data('swatch');
			$('.atb .image .prodSwatch').html("<img src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+swatchImg+"??wid=100&hei=100&op_sharpen=1&fit=fit,1'/>");
		}

		if ( $(this).hasClass('unavailable') ) {
			$(".color .modal.outofstock").show();
			$(".color .text .value").hide();
		}

		var swatchName= $(this).data('name');
		$('.atb .color .text .value').text(swatchName);
	})
	.on('mouseleave','.swatch li', function () {
		var swatchFront = "http://images.bloomingdales.com/is/image/BLM/products/9/optimized/",
			swatchBack = "?wid=100&amp;hei=100&amp;op_sharpen=1&amp;fit=fit,1";
		
		$(".color .modal.outofstock").hide();
		$(".color .text .value").show();

		if ($(this).hasClass('active')) {
			if ($(this).data('prodimg') != undefined) {
				// clicked and full image
				swatchImg = $(this).data('prodimg');
				swatchName= $(this).data('name');
				$('.atb .image .main.product').attr('src', urlStart+swatchImg+urlEnd);
			} else {
				// clicked and just a swatch
				$('.atb .image .main.product').attr('src', $('.atb .image .main.product').attr('default'));
				swatchName= $(this).data('name');
				swatchImg = $(this).data('swatch');
				$('.atb .image .prodSwatch').attr('src', swatchFront+swatchImg+swatchBack);
			}
		} else {
			if ($(this).siblings('.active').data('prodimg') != undefined) {
				// not clicked and active has full image
				swatchImg = $(this).siblings('.active').data('prodimg');
				swatchName= $(this).siblings('.active').data('name');
				$('.atb .image .main.product').attr('src', urlStart+swatchImg+urlEnd);
				$('.atb .image .prodSwatch img').remove();
			} else {
				// not clicked and active has just a swatch
				swatchImg = $(this).siblings('.active').data('swatch');
				swatchName= $(this).siblings('.active').data('name');
				$('.atb .image .main.product').attr('src', $('.atb .image .main.product').attr('default'));
				$('.atb .image .prodSwatch').html("<img src=''/>")
				$('.atb .image .prodSwatch img').attr('src', swatchFront+swatchImg+swatchBack);
			}
		}

		$('.atb .color .text .value').text(swatchName);
	});

	$('#atbOverlay').on('click', function(){
		$('.atb, #atbOverlay').hide();
	});

	$('.atb .thumbnails').on('click','.thumb', function(){
		var swatchImg = $(this).data('info');
		$('.atb .image .main.product').attr('src', urlStart+swatchImg+urlEnd);
	});

	var currentThumbnailGroup = 1;
	$('.atb .thumbnails').on('click','.thumbArrow', function(){
		
		currentThumbnailGroup = atb.moreThumbnails( $(this).data('direction'), $(this), currentThumbnailGroup );
	});

});

//  ==== End document.ready ===== //


var atb = {
	currencyCheck: function() {
		if ($('#bl_nav_account_flag > a span').text().toLowerCase() == 'usd') $('.atb .price .currency').text('$');
		return false;
	},
	quantityBuilder: function (num) {
		$('.atb .quantity select').html('');
		for (i=1;i <= num; i++) {
			$('.atb .quantity select').append('<option value='+i+'>'+i+'</value>');
		}
	},

	swatchMap: function (full) {
		var map = full.product[0].productDetails.colorMap,
			setMain = true,
			urlStart = "http://images.bloomingdales.com/is/image/BLM/products/9/optimized/",
			urlEnd = "?wid=400&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg";

		if (map.length>1) $('.atb .color').append("<ul class='swatch'></ul>");
	// console.log(map);
	// console.log(full.product[0].upcs);
		for (i=0;i<map.length; i++) {
			(i==0) ? active = 'active' : active ='';

			if (map[i].upcprimaryimage != undefined && map[i].swatchimage != undefined) {
				
				if (setMain == true) {
					var url = urlStart+map[i].upcprimaryimage.imagename+urlEnd;
					
					// set primary image
					$('.atb .image .main.product').attr('src', url).attr('default',url);
					
					// remove and reset thumbnail images
					$(".atb .thumbnails").html("");
					$('.atb .thumbnails').append("<img class='thumb' data-info="+map[i].upcprimaryimage.imagename+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].upcprimaryimage.imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
					
					if ( map[i].upcadditionalimage != undefined && map[i].upcadditionalimage.length>0) {
						for (j=0; j< map[i].upcadditionalimage.length; j++) {
							$('.atb .thumbnails').append("<img class='thumb' data-info="+map[i].upcadditionalimage[j].imagename+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].upcadditionalimage[j].imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
						}
					}

					setMain = false;
				}
				$('.atb ul.swatch').append('<li id="upc'+i+'" class="'+active+'" data-name="'+map[i].color+'" data-colorId="'+map[i].colorwayid+'" data-prodImg="'+map[i].upcprimaryimage.imagename+'"><img src="http://images.bloomingdales.com/is/image/BLM/products/0/optimized/'+map[i].swatchimage.imagename+'?wid=27&hei=27&op_sharpen=1&fit=fit,1"/></li>');

				// additional images
				$('.atb ul.swatch #upc'+i).append("<div class='others'></div>");

				if (map[i].upcadditionalimage != undefined) {
					$('.atb ul.swatch #upc'+i+' .others').append("<img id='"+map[i].color+"0'' class='thumb' data-info='"+map[i].upcprimaryimage.imagename+"' style='display:none' src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].upcprimaryimage.imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
					for (j=0;j<map[i].upcadditionalimage.length; j++) {
						$('.atb ul.swatch #upc'+i+' .others').append("<img id='"+map[i].color+(j+1)+"'' class='thumb' data-info='"+map[i].upcadditionalimage[j].imagename+"' style='display:none' src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].upcadditionalimage[j].imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
					}
				}

			} else if (map[i].upcprimaryimage == undefined && map[i].swatchimage != undefined) {
				$('.atb ul.swatch').append('<li class="'+active+'" data-name="'+map[i].color+'" data-swatch="'+map[i].swatchimage.imagename+'"><img src="http://images.bloomingdales.com/is/image/BLM/products/0/optimized/'+map[i].swatchimage.imagename+'?wid=27&hei=27&op_sharpen=1&fit=fit,1"/></li>');
				if (active == 'active') $('.atb .image .prodSwatch').html("<img src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].swatchimage.imagename+"??wid=100&hei=100&op_sharpen=1&fit=fit,1'/>");
			}
		}

		if ( full.product[0].productDetails.SizeMap != undefined ) {
			availability.color(full, $(" .atb .color .swatch li:first-child "));
		}
	},

	sizeMap: function (full) {
		var map = full.product[0].productDetails.SizeMap;
		$('.atb .size .options').html('');
		$('.atb .size .options').attr('data-pos',0);
		for (i=0;i<map.length; i++) {
			// if ( i<8 ) {
				$('.atb .size .options').append('<li data-sizeId="'+map[i].sizeid+'"><span>'+map[i].sizenormal+'</span></li>');
			// } else {
			// 	$('.atb .size .options').append('<li style="display:none" data-sizeId="'+map[i].sizeid+'">'+map[i].sizenormal+'</li>');
			// }
		}

		if ($('.atb .size .options li').length > 8) {
			$('.atb .size .options').addClass('expandable').append('<div class="rArrow"></div>');
		}
	},

	member: function (res, item, subTarget) {

		var targetNode = ( subTarget != undefined ) ? subTarget : ".atb.single" ;
		$(".atb .modal.instock").hide();

		activeProduct = res;

		// console.log(res);

		$(targetNode + ' p.brand').text(res.product[0].productDetails.summary.brand);
		$(targetNode + ' p.name').text(res.product[0].productDetails.summary.name.replace(res.product[0].productDetails.summary.brand, ""));
		atb.currencyCheck(); //check and change currency based on header country flag
		atb.quantityBuilder(res.product[0].productDetails.summary.maxQuantity);

		$('.footer .details_link').attr('href','http://www1.bloomingdales.com/shop/product/?ID='+item);
		$(targetNode + ' img.product.main').attr('src','http://images.bloomingdales.com/is/image/BLM/products/9/optimized/'+res.product[0].productDetails.primaryImage.imagename+'?wid=400&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg');
		$(targetNode + ' .thumbnails').html("");

		$(".atb.single .atbLink").attr("data-id",res.product[0].id);

		if (res.product[0].productDetails.summary.additionalImageSource != undefined) {
			$(targetNode + ' .thumbnails').append("<img class='thumb' data-info="+res.product[0].productDetails.primaryImage.imagename+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+res.product[0].productDetails.primaryImage.imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
			for (j=0;j<res.product[0].productDetails.summary.additionalImageSource.length;j++) {
				$(targetNode + ' .thumbnails').append("<img class='thumb' data-info="+res.product[0].productDetails.summary.additionalImageSource[j]+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+res.product[0].productDetails.summary.additionalImageSource[j]+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
			}
		}

		$('.atb .prodSwatch img').remove();
		
		if (res.product[0].productDetails.SizeMap != undefined) {
			atb.sizeMap(res);
			$(targetNode + ' .size').show();
		} else {
			$(targetNode + ' .size').hide().find(".options").html("");
		}

		if (res.product[0].upcs[0].upcDetails.availability.upcAvailabilityMessage != undefined && res.product[0].upcs[0].upcDetails.availability.upcAvailabilityMessage != "") {
			$('.atb table.add .availability').text(res.product[0].upcs[0].upcDetails.availability.upcAvailabilityMessage);
		}

		$(targetNode + ' .color .swatch').remove();
		if (res.product[0].productDetails.colorMap != undefined) atb.swatchMap(res);

		if (res.product[0].productDetails.colorMap[0].color != undefined) {
			$(targetNode + ' .color .text .value').text(res.product[0].productDetails.colorMap[0].color);
			$('.atb .image .main.product').attr('name',res.product[0].productDetails.colorMap[0].color);
		}
		
		if (res.product[0].productDetails.price.retail.pricevalue.high == undefined) {
			$(targetNode + ' .price .value').text( (res.product[0].productDetails.price.retail.pricevalue.low).formatMoney(2,'.',',') );
		} else {
			$(targetNode + ' .price .value').text(res.product[0].productDetails.price.retail.pricevalue.low + ' - ' + res.product[0].productDetails.price.retail.pricevalue.high);
		}

		availability.currentItem(targetNode);
		
		setTimeout( function () {
			if ( $(targetNode + ' .color .value').text().toLowerCase() == "no color") $(targetNode + ' .color').hide();
			$(targetNode + ', #atbOverlay').fadeIn();
		}, 200);
	},

	// MASTER PRODUCTS
	defaultMaster: function (res, item) {
		console.log("MASTER MODE");
		console.log(res);

		var product = res.product[0];
		
		$('.atb.master .footer .details_link').attr('href','http://www1.bloomingdales.com/shop/product/?ID='+item);
		$('.atb.master img.product.main').attr('src','http://images.bloomingdales.com/is/image/BLM/products/9/optimized/'+product.productDetails.primaryImage.imagename+'?wid=400&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg');
		$('.atb.master .thumbnails').html("");
		$(".atb.master .prime .RS .name").text( product.productDetails.summary.name );
		$(".atb.master .info .content").text( product.productDetails.summary.description );
		
		$(".atb.master .thumbnails").hide();
		$(".atb.master .footer .social").attr("colspan", 1);

		if (product.productDetails.additionalImages != undefined && product.productDetails.additionalImages.length > 1) 

		atb.currencyCheck(); //check and change currency based on header country flag
		atb.quantityBuilder(product.productDetails.summary.maxQuantity);

		$('.atb.master .color .swatch').remove();
		// if (product.productDetails.colorMap != undefined) atb.swatchMap(res);

		var additionalThumbnails = 3;

		// other master-member thumbnails
		if ( product.productDetails.additionalImages != undefined && product.productDetails.additionalImages.length > 1 ) {
			$('.atb.master .thumbnails').append("<img class='thumb' data-info="+product.productDetails.primaryImage.imagename+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+product.productDetails.primaryImage.imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
			$(".atb.master .thumbnails").show();
			$(".atb.master .footer .social").attr("colspan", 2);

			for ( p=0; p < product.productDetails.additionalImages.length ; p++ ) {
				var hideThumb = "",
					current = product.productDetails.additionalImages[p],
					itemImg = current.imagename;

				if ( p >= additionalThumbnails ) hideThumb = "style='display:none'";

				$('.atb.master .thumbnails').append("<img "+hideThumb+"class='thumb' data-info="+itemImg+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+itemImg+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");

			}
			if ( p >= additionalThumbnails ) {
				$('.atb.master .thumbnails').append("<img class='thumbArrow' data-direction='down' id='thumbBottomArrow' src='/fashion/images/atb/thumbnail_arrow.png'>").prepend("<img class='inactive thumbArrow' data-direction='up' id='thumbTopArrow' src='/fashion/images/atb/thumbnail_arrow.png'>");
			}
		}

		if (product.productDetails.price.retail.pricevalue.high == undefined) {
			$('.atb.master .price .value').text( (product.productDetails.price.retail.pricevalue.low).formatMoney(2,'.',',').toFixed(2) );
		} else {
			$('.atb.master .price .value').text(product.productDetails.price.retail.pricevalue.low.toFixed(2) + ' - ' + product.productDetails.price.retail.pricevalue.high.toFixed(2));
		}
		$('.atb.master, #atbOverlay').show();

		// if (product.productDetails.colorMap != undefined) {
		// 	var map = product.productDetails.colorMap;
		// 	for (q=0; q<map.length; q++) {
		// 		(q==0) ? active = 'active' : active ='';
				
		// 	}
		// }

		
	},

	gridMaster: function (res, item) {
		console.log("GRID MODE");
		console.log(res);

		var product = res.product[0];

		$('.atb.masterGrid #grid-members').html("");
		$('.atb.masterGrid #master-grid-primary').attr('src','http://images.bloomingdales.com/is/image/BLM/products/9/optimized/'+product.productDetails.primaryImage.imagename+'?wid=300&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg');

		for ( p=0; p < product.productDetails.childProducts.length ; p++ ) {
			var childMarkup = '',
				current = product.productDetails.childProducts[p];

			// var price = function () {
			// 	if (current.productDetails.price.hasOwnProperty("onsale") && current.productDetails.price.hasOwnProperty("sale") ) {

			// 	}
			// }

			childMarkup += '<li class="grid-member">';
			childMarkup += '<a class="memberLink atb_overlay" data-id="'+current.id+'">';
			childMarkup += '<img class="memberImage" src="http://images.bloomingdales.com/is/image/BLM/products/9/optimized/'+current.productDetails.primaryImage.imagename+'?wid=125&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg"/>';
			childMarkup += '</a>';
			childMarkup += '<p class="memberBrand">'+current.productDetails.brand.brandname+'</p>';
			childMarkup += '<p class="memberName">'+current.productDetails.summary.name+'</p>';
			// childMarkup += '<p class="memberPrice">'+price+'</p>';
			childMarkup += '</li>';

			$('.atb.masterGrid #grid-members').append(childMarkup);

		 // <li class="grid-member">
		 //      <a class="memberLink" href="">  
		 //        <img class="memberImage" src=""/>
		 //      </a>
		 //      <p class="memberBrand"></p>
		 //      <p class="memberName"></p>
		 //      <p class="memberPrice"></p>
		 //    </li>
		}

		if ( product.productDetails.childProducts.length % 3 != 0 ) {
			var remainder = product.productDetails.childProducts.length % 3;

			for ( j=0; j <= remainder; j++ ) {
				$('.atb.masterGrid #grid-members').append('<li class="grid-member"></li>');
			}

		}

		$('.atb.masterGrid, #atbOverlay, .atb.masterGrid .grid').show();
		$('.atb.masterGrid .member').hide();
	},

	moreThumbnails: function (direction, targ, currentThumbnailGroup) {
		var tCount = targ.parents(".atb").find(".thumbnails .thumb").length,
			thumbnailsPerPage = 4,
			max = Math.ceil( tCount / thumbnailsPerPage );

		if ( currentThumbnailGroup == 1 ) targ.parents(".thumbnails").css("height", targ.parents(".thumbnails").height() +35 );
		
		if ( direction === 'down' && currentThumbnailGroup < max && !targ.hasClass('inactive') ) {

			currentThumbnailGroup++;
			
			if ( currentThumbnailGroup >= max ) {
				targ.addClass('inactive');
			}

			if ( currentThumbnailGroup > 1 ) {
				targ.siblings(".thumbArrow").removeClass('inactive');
			}

			thumbPagination(currentThumbnailGroup);

		} else if ( direction === 'up' && currentThumbnailGroup > 1 && !targ.hasClass('inactive') ) {

			currentThumbnailGroup--;
			
			if ( currentThumbnailGroup <= 1 ) {
				targ.addClass('inactive');
			}

			if ( currentThumbnailGroup >= 1 ) {
				targ.siblings(".thumbArrow").removeClass('inactive');
			}

			thumbPagination(currentThumbnailGroup);
		}

		// hide all thumbnails, then show the current "page"
		function thumbPagination () {
			targ.siblings(".thumb").hide();
			var curPageStart = (currentThumbnailGroup-1)*thumbnailsPerPage,
				curPageEnd = currentThumbnailGroup*thumbnailsPerPage-1;

			for ( i=curPageStart; i <= curPageEnd; i++ ) {
				console.log(i);
				targ.siblings(".thumb").eq(i).show();
			}

		}

		return currentThumbnailGroup;

	}
}

var availability = { // checks for unavailable color/size combo.

	color: function (prodData, targ) {
		
		for ( i=0; i < prodData.product[0].upcs.length; i++) {
			for (j=0; j< prodData.product[0].upcs[i].upcDetails.attributes.length; j++) {
				
				if ( targ.data("name") ==  prodData.product[0].upcs[i].upcDetails.attributes[j].values[0].value) {
					var sizeCk = prodData.product[0].upcs[i].upcDetails.sizeid;
					
					if ( prodData.product[0].upcs[i].upcDetails.availability.available === false ) {
						$(".size .options").find("li[data-sizeid='"+sizeCk+"']").addClass('unavailable');
					} else {
						$(".size .options").find("li[data-sizeid='"+sizeCk+"']").removeClass('unavailable');
					}
					
				}
			}
		}
	},

	size: function (prodData, targ) {
		
		for ( i=0; i < prodData.product[0].upcs.length; i++) {		
				if ( targ.data("sizeid") ==  prodData.product[0].upcs[i].upcDetails.sizeid) {
					var colorCk = prodData.product[0].upcs[i].upcDetails.colorwayid;
					
					if ( prodData.product[0].upcs[i].upcDetails.availability.available === false ) {
						$(".color .swatch").find("li[data-colorid='"+colorCk+"']").addClass('unavailable');
					} else {
						$(".color .swatch").find("li[data-colorid='"+colorCk+"']").removeClass('unavailable');
					}
					
				}
		}	
	},

	// checks the availability of a UPC ID after the user selects all available options in the Quick Peek.
	currentItem: function (target) {
		console.log("=== Active Product ===");
		console.log(activeProduct);
		if ( $(target + " .size .options").length > 0 && $(target + " .color .swatch").length > 0) {
			// if both color and size are options, inform user of the shipping days data value
			for (i=0; i < activeProduct.product[0].upcs.length; i++) {
				if ( $('.atb .swatch .active').attr("data-colorid") == activeProduct.product[0].upcs[i].upcDetails.colorwayid && $('.atb .options .active').attr("data-sizeid") == activeProduct.product[0].upcs[i].upcDetails.sizeid ) {
					var daysVal = activeProduct.product[0].upcs[i].upcDetails.availability.shipDays;

					$(".atb .modal.instock").show().find(".days").html(daysVal);
				}

			}
		} else if ( $(target + " .size .options").length > 0 ) {
			// if only size exists
			for (i=0; i < activeProduct.product[0].upcs.length; i++) {
				if ( $('.atb .options .active').attr("data-sizeid") == activeProduct.product[0].upcs[i].upcDetails.sizeid ) {
					var daysVal = activeProduct.product[0].upcs[i].upcDetails.availability.shipDays;

					$(".atb .modal.instock").show().find(".days").html(daysVal);
				}

			}
		} else if ( $(target + " .color .swatch").length > 0 ) {
			// if only color exists
			for (i=0; i < activeProduct.product[0].upcs.length; i++) {
				if ( $('.atb .swatch .active').attr("data-colorid") == activeProduct.product[0].upcs[i].upcDetails.colorwayid) {
					var daysVal = activeProduct.product[0].upcs[i].upcDetails.availability.shipDays;

					$(".atb .modal.instock").show().find(".days").html(daysVal);
				}

			}
		}

	}

}

Number.prototype.formatMoney = function(c, d, t){
	var n = this, 
	    c = isNaN(c = Math.abs(c)) ? 2 : c, 
	    d = d == undefined ? "." : d, 
	    t = t == undefined ? "," : t, 
	    s = n < 0 ? "-" : "", 
	    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
	    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

/* jshint ignore:end */
