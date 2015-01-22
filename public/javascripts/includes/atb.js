$(document).ready(function(){
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
			upcID='';

		if ($(this).parents(".atb").find(".size .active").length <= 0) {
			$(this).parents(".atb").find(".errors").html("<p class='errText'>Please select a size</p>");
			$(this).parents(".atb").find('.size').addClass('error');
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
				for (b=0; b < subUPCs.length; b++){
					if (subUPCs[b].name == 'SIZE_NORMAL') upcSize = subUPCs[b].values[0].value;
					if (subUPCs[b].name == 'COLOR') upcColor = subUPCs[b].values[0].value;
				}

				if (add_size == upcSize && add_color == upcColor) {
					console.log(upcList[a].upcnumber);
					upcID = upcList[a].upcnumber;
				}
			}
			add_quantity = $(this).parents('.atb').find('.quantity select option:selected').text();
			var dataVal = 	{"item": {"quantity": add_quantity,"upcId": upcID.toString()}}

			$.ajax({
				type: "POST",
				dataType:'json',
				contentType: "application/json",
				url: '/v1service/order/v1/bags',
				data: dataVal,
			}).success(function (res) {
				console.log(res);
			}).fail(function (res){
				console.log('atb failure');
			});
		}
	});

	// // Expand and Collapse View Details text ====NOTE: currently disabled due to removal from creative comps
	// $('.details').on('click',function(){
	// 	if ($('.details .description').height() > 40) {
	// 		$('.details .description').animate({'height':'40'},300, function(){
	// 			$('.atb .options, .atb .atbLink').fadeIn(1000);
	// 		}); 
	// 		$('.details .more').text('+');
	// 	} else {
	// 		var curHeight = $('.details .description').height();
	// 		$('.details .description').css('height', 'auto');
	// 		var autoHeight = $('.details .description').height();
	// 		if ( $('.atb .details .description').height()+$('.atbLink').height()+$('.atb .name').height()+$('.atb .price').height()+$('.atb .options').height() > $('.atb .image.left').height() ) {
	// 			$('.details .description').height(curHeight);
	// 			$('.atb .options, .atb .atbLink').fadeOut(300)
	// 				.promise()
	// 				.done( function() {						
	// 					$('.details .description').animate({'height':autoHeight},500); 
	// 				});
	// 		}
			

	// 		$('.details .more').text('-');
	// 	}
	// });

	// close add to bag window

	$('.atb .close').on('click', function(){
		$('.atb, #atbOverlay').hide();
	});

	// PDP OVERLAY BUILD
	$('.atb_overlay').on('click', function(){
		$('#atbLoading').show();
		var item = $(this).data('id');

		$.ajax({
			method: 'GET',
			dataType:'json',
			url: '/api/v4/catalog/product/'+item+'(productdetails(price,summary,availability,primaryimage,childproducts,SizeMap,colormap),upcs(upcdetails))',
			data: { },
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		}).success(function (res) {
			console.log("******Product Data****************");
			console.log(			res 					);
			prodData = res;

			$('#atbLoading').hide();
			if (res.product[0].productDetails.childProducts != undefined) {
				atb.master(res, item);
			} else {
				atb.member(res, item);
			}

		}).fail(function (res) {
			console.log(res);
		});
	});

	// product active element change, swatch and size
	$('.atb').on('click','.swatch li', function(){
		$(this).addClass('active').siblings().removeClass('active');

		if ( $(this).find('.others img').length>0 ) {
			$('.atb .thumbnails').html('');
			$(this).find('.others img').clone().appendTo('.atb .thumbnails');
			$('.atb .thumbnails img').attr('style','');
		}

	});
	$('.atb .size').on('click','li', function(){
		$(this).addClass('active').siblings().removeClass('active');
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
		var swatchName= $(this).data('name');
		$('.atb .color .text .value').text(swatchName);
	})
	.on('mouseenter','.swatch li .inner', function () {
		var swatchImg;
		if ($(this).parent().data('prodimg') != undefined) {
			swatchImg = $(this).parent().data('prodimg');
			$('.atb .image .prodSwatch').html('');
			$('.atb .image .main.product').attr('src', urlStart+swatchImg+urlEnd);
		} else if ($(this).data('swatch') != undefined) {
			swatchImg = $(this).parent().data('swatch');
			$('.atb .image .prodSwatch').html("<img src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+swatchImg+"??wid=100&hei=100&op_sharpen=1&fit=fit,1'/>");
		}
		var swatchName= $(this).parent().data('name');
		$('.atb .color .text .value').text(swatchName);
	})
	.on('mouseout','.swatch li', function () {
		var swatchFront = "http://images.bloomingdales.com/is/image/BLM/products/9/optimized/",
			swatchBack = "?wid=100&amp;hei=100&amp;op_sharpen=1&amp;fit=fit,1";

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
		$('.atb.single, #atbOverlay').hide();
	});

	$('.atb .thumbnails').on('click','.thumb', function(){
		var swatchImg = $(this).data('info');
		$('.atb .image .main.product').attr('src', urlStart+swatchImg+urlEnd);
	});

	$('.atb .options').on('click','.rArrow', function(){
		var location = $('.atb .options').attr('data-pos');
		location++;
		$('.atb .options').attr('data-pos', location);
		// $('.atb .options li').eq(location).hide();
		for (i=0;i<$('.atb .options li').length;i++) {
			if (i<location || i>=location+8) {
				$('.atb .options li').eq(i).hide();
			} else {
				$('.atb .options li').eq(i).show();
			}
		}
	});

});

var atb = {
	currencyCheck: function() {
		if ($('#bl_nav_account_flag > a span').text().toLowerCase() == 'usd') $('.atb.single .price .currency').text('$');
		return false;
	},
	quantityBuilder: function (num) {
		$('.atb.single .quantity select').html('');
		for (i=1;i <= num; i++) {
			$('.atb.single .quantity select').append('<option value='+i+'>'+i+'</value>');
		}
	},
	swatchMap: function (full) {
		var map = full.product[0].productDetails.colorMap,
			setMain = true,
			urlStart = "http://images.bloomingdales.com/is/image/BLM/products/9/optimized/",
			urlEnd = "?wid=400&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg";

		if (map.length>1) $('.atb.single .color').append("<ul class='swatch'></ul>");
		for (i=0;i<map.length; i++) {
			(i==0) ? active = 'active' : active ='';
			if (map[i].upcprimaryimage != undefined && map[i].swatchimage != undefined) {
				if (setMain == true) {
					var url = urlStart+map[i].upcprimaryimage.imagename+urlEnd;
					$('.atb .image .main.product').attr('src', url).attr('default',url);
					setMain = false;
				}
				$('.atb.single ul.swatch').append('<li id="upc'+i+'" class="'+active+'" data-name="'+map[i].color+'" data-upc="" data-prodImg="'+map[i].upcprimaryimage.imagename+'"><img src="http://images.bloomingdales.com/is/image/BLM/products/0/optimized/'+map[i].swatchimage.imagename+'?wid=27&hei=27&op_sharpen=1&fit=fit,1"/></li>');
				
				// additional images
				$('.atb ul.swatch #upc'+i).append("<div class='others'></div>");
				if (map[i].upcadditionalimage != undefined) {
					$('.atb ul.swatch #upc'+i+' .others').append("<img id='"+map[i].color+"0'' class='thumb' data-info='"+map[i].upcprimaryimage.imagename+"' style='display:none' src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].upcprimaryimage.imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
					for (j=0;j<map[i].upcadditionalimage.length; j++) {
						$('.atb ul.swatch #upc'+i+' .others').append("<img id='"+map[i].color+(j+1)+"'' class='thumb' data-info='"+map[i].upcadditionalimage[j].imagename+"' style='display:none' src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].upcadditionalimage[j].imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
					}
				}

			} else if (map[i].upcprimaryimage == undefined && map[i].swatchimage != undefined) {
				$('.atb.single ul.swatch').append('<li class="'+active+'" data-name="'+map[i].color+'" data-swatch="'+map[i].swatchimage.imagename+'"><img src="http://images.bloomingdales.com/is/image/BLM/products/0/optimized/'+map[i].swatchimage.imagename+'?wid=27&hei=27&op_sharpen=1&fit=fit,1"/></li>');
				if (active == 'active') $('.atb .image .prodSwatch').html("<img src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+map[i].swatchimage.imagename+"??wid=100&hei=100&op_sharpen=1&fit=fit,1'/>");
			}
		}
	},
	sizeMap: function (full) {
		var map = full.product[0].productDetails.SizeMap;
		$('.atb.single .size .options').html('');
		$('.atb .size .options').attr('data-pos',0);
		for (i=0;i<map.length; i++) {
			if ( i<8 ) {
				$('.atb .size .options').append('<li data-sizeid="'+map[i].sizeid+'">'+map[i].sizenormal+'</li>');
			} else {
				$('.atb .size .options').append('<li style="display:none" data-sizeid="'+map[i].sizeid+'">'+map[i].sizenormal+'</li>');
			}
		}

		if ($('.atb.single .size .options li').length > 8) {
			$('.atb.single .size .options').addClass('expandable').append('<div class="rArrow"></div>');
		}
	},

	member: function (res, item) {
		$('.atb.single .prime h3.name').text(res.product[0].productDetails.summary.name);
		atb.currencyCheck(); //check and change currency based on header country flag
		atb.quantityBuilder(res.product[0].productDetails.summary.maxQuantity);

		$('.footer .details_link').attr('href','http://www1.bloomingdales.com/shop/product/?ID='+item);
		$('.atb.single img.product.main').attr('src','http://images.bloomingdales.com/is/image/BLM/products/9/optimized/'+res.product[0].productDetails.primaryImage.imagename+'?wid=400&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg');
		$('.atb.single .thumbnails').html("");
		if (res.product[0].productDetails.summary.additionalImageSource != undefined) {
			$('.atb.single .thumbnails').append("<img class='thumb' data-info="+res.product[0].productDetails.primaryImage.imagename+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+res.product[0].productDetails.primaryImage.imagename+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
			for (j=0;j<res.product[0].productDetails.summary.additionalImageSource.length;j++) {
				$('.atb.single .thumbnails').append("<img class='thumb' data-info="+res.product[0].productDetails.summary.additionalImageSource[j]+" src='http://images.bloomingdales.com/is/image/BLM/products/9/optimized/"+res.product[0].productDetails.summary.additionalImageSource[j]+"?wid=95&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg'/>");
			}
		}

		$('.atb .prodSwatch img').remove();
		
		if (res.product[0].productDetails.SizeMap != undefined) {
			atb.sizeMap(res);
			$('.atb.single .size').show();
		} else {
			$('.atb.single .size').hide();
		}

		if (res.product[0].upcs[0].upcDetails.availability.upcAvailabilityMessage != undefined && res.product[0].upcs[0].upcDetails.availability.upcAvailabilityMessage != "") {
			$('.atb table.add .availability').text(res.product[0].upcs[0].upcDetails.availability.upcAvailabilityMessage);
		}

		$('.atb.single .color .swatch').remove();
		if (res.product[0].productDetails.colorMap != undefined) atb.swatchMap(res);

		if (res.product[0].productDetails.colorMap[0].color != undefined) {
			$('.atb.single .color .text .value').text(res.product[0].productDetails.colorMap[0].color);
			$('.atb .image .main.product').attr('name',res.product[0].productDetails.colorMap[0].color);
		}
		
		if (res.product[0].productDetails.price.retail.pricevalue.high == undefined) {
			$('.atb.single .price .value').text( (res.product[0].productDetails.price.retail.pricevalue.low).formatMoney(2,'.',',') );
		} else {
			$('.atb.single .price .value').text(res.product[0].productDetails.price.retail.pricevalue.low + ' - ' + res.product[0].productDetails.price.retail.pricevalue.high);
		}
		$('.atb.single, #atbOverlay').show();
	},

	master: function (res, item) {
		console.log("MASTER MODE");
		
		$('.footer .details_link').attr('href','http://www1.bloomingdales.com/shop/product/?ID='+item);
		$('.atb.single img.product.main').attr('src','http://images.bloomingdales.com/is/image/BLM/products/9/optimized/'+res.product[0].productDetails.primaryImage.imagename+'?wid=400&qlt=80,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg');
		$('.atb.single .thumbnails').html("");

		atb.currencyCheck(); //check and change currency based on header country flag
		atb.quantityBuilder(res.product[0].productDetails.summary.maxQuantity);

		$('.atb.single .color .swatch').remove();
		if (res.product[0].productDetails.colorMap != undefined) atb.swatchMap(res);

		if (res.product[0].productDetails.price.retail.pricevalue.high == undefined) {
			$('.atb.single .price .value').text( (res.product[0].productDetails.price.retail.pricevalue.low).formatMoney(2,'.',',').toFixed(2) );
		} else {
			$('.atb.single .price .value').text(res.product[0].productDetails.price.retail.pricevalue.low.toFixed(2) + ' - ' + res.product[0].productDetails.price.retail.pricevalue.high.toFixed(2));
		}
		$('.atb.single, #atbOverlay').show();

		if (res.product[0].productDetails.colorMap != undefined) {
			var map = res.product[0].productDetails.colorMap;
			for (q=0; q<map.length; q++) {
				(q==0) ? active = 'active' : active ='';
				
				console.log(map[q]);
			}
		}

		
	},
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