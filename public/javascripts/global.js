define([
  'backbone',
  'jquery',
  'underscore'
], function(Backbone, $, _) {

	function adjustFlyoutPosition(flyout,totalFOBs,selectedFOBIndex,fobOffset,flyoutWidth,fobMenuWidth){
		var flyoutPos,
			mainNavOffsetLeft = $("#nav ul").offset().left,
			fobOffsetLeft = fobOffset.left,
			NAV_WIDTH = $('#nav .row').width();
		
		if( selectedFOBIndex < (totalFOBs / 2) ){ //left aligned flyout
			if((fobOffsetLeft + (fobMenuWidth/2) - mainNavOffsetLeft) >= (flyoutWidth / 2)){
				flyoutPos = fobOffsetLeft + (fobMenuWidth/2) - (flyoutWidth / 2);
			}else{
				flyoutPos = mainNavOffsetLeft;
			}
		}else{ // right aligned flyout
			if(((mainNavOffsetLeft + NAV_WIDTH) - fobOffsetLeft) >= (flyoutWidth / 2)){
				flyoutPos = (fobOffsetLeft + (fobMenuWidth/2)) - (flyoutWidth / 2);
			}else{
				flyoutPos = (mainNavOffsetLeft + NAV_WIDTH) - flyoutWidth;
			}
		}
		
		flyout.css("left",flyoutPos + "px");
	}
	
	var build = {
		topnav: function(){
			$.ajax({
				url: '/bcom/shop/topnav?application=SITE&jsonp=false',
				contentType: 'application/json; charset=utf-8',
				dataType: "html",
				method: 'GET',
				data: { 
					// 'category'	: val,
					// 'depth'		: '3',
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}).success(function(res){
				$('#nav .row').html(res);
	
				$('#nav #mainNav a').each(function(){
					if ($(this).attr('href').charAt(0) == '/') {
						$(this).attr('href', 'http://www.bloomingdales.com' + $(this).attr('href'));
					}
				});
	
			}).fail(function(){
				console.log('============[ navigation build failure ]============');
			});
		},
		flyouts: function(){
			$.ajax({
				url: '/bcom/shop/flyout?application=SITE&jsonp=false',
				contentType: 'application/json; charset=utf-8',
				dataType: "html",
				method: 'GET',
				data: { 
					'&categoryIds'	: '1003044,1001351,13668,2910,16961,16958,3376,2921,3864,3866,3865,394',
					// 'depth'		: '3',
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}).success(function(res){
				$('#globalFlyouts').html(res);
				$('#globalFlyouts a').each(function(){
					if ($(this).attr('href').charAt(0) == '/') {
						$(this).attr('href', 'http://www.bloomingdales.com' + $(this).attr('href'));
					}
				});
			}).fail(function(){
				console.log('============[ flyout build failure ]============');
			});
		}
	};
	
	var user = {
		get: function () {
			$.ajax({
				method: 'GET',
				dataType:'json',
				url: '/secure/v2/user',
				data: { 
					'show': 'summary',
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}).success(function (res) {
				console.log(res);
				return res;
			});
		},
	};
	
	var bag = {
		get: function() {
			$.ajax({
				method: 'GET',
				dataType:'json',
				url: '/api/v2/shoppingbag',
				data: { 
					'userid': '64354129',
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}).success(function (res) {
				console.log(res);
				return res.bagid;
			});
		},
		add: function(ev, add_id, add_color, add_size, add_type, add_quantity, add_promocode) {
			console.log(add_id);
			$.ajax({
				method: 'POST',
				url: '/api/v2/shoppingbag/item',
				data: {
					'productid': add_id
				}
			}).success(function (res) {
				console.log(res);
			}).fail(function (res){
				console.log('atb failure');
			});
		}, 
		count: function () {
			$.ajax({
				method: 'GET',
				dataType:'json',
				url: '/api/v2/shoppingbag/bagItemCount',
				data: { 
					// 'bagid'	: ,
					'userid': '64354129',
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}).success(function (res) {
				if (res.bagItemCount > 0 ) {
					$('#cartCount').html(res.bagItemCount + " Items");
				} else {
					$('#cartCount').html("(0)");
				}
			});
		},
	};
	
	var init = function() {

		build.topnav();
		build.flyouts();
		
		//var userInfo = user.get();
		//var bagID = bag.get();
		//bag.count(bagID);
		
		// test calls
	
		$('#regTest').on('click', function(){
			test.checkRegistry();
		});
	
		// =========== Flyout handling
		var catNum = '',
			delay = 200, // hover time before flyout appears.
			timeoutConst;
	
		$('#nav').on('mouseenter', '#mainNav li', function(ev){
			var thing = $(this);
			timeoutConst = setTimeout(function() {
				thing.addClass('selected').siblings().removeClass('selected');
				catNum = thing.attr('id').substr( thing.attr('id').lastIndexOf('_')+1 );
				$('#flyout_'+catNum).removeClass('flyout-off').addClass('flyout-on');
	
				adjustFlyoutPosition($('#flyout_'+catNum), $('#mainNav li').length-1, thing.index()+1, $('#nav .row').css('margin-left'), $('#flyout_'+catNum).width(),  962);
			}, delay);
		}).on('mouseleave', '#mainNav li', function(ev){
			clearTimeout(timeoutConst);
			$('#flyout_'+catNum).removeClass('flyout-on').addClass('flyout-off');
			$(this).removeClass('selected');
		});
	
		$('#globalFlyouts').on('mouseenter', function(){
			$('#flyout_'+catNum).addClass('flyout-on').removeClass('flyout-off');
			$('#flexLabel_'+catNum).addClass('selected');
		}).on('mouseleave', function(){
			$('#flyout_'+catNum).removeClass('flyout-on').addClass('flyout-off');
			$('#flexLabel_'+catNum).removeClass('selected');
		});
	
		// =========== Overlay window close function
	
		$('#overlay .close').on('click', function (){
			$(this).parent().hide();
			$('#overlayShield').hide()
		});
	
	
		// =========== Proof of Concept Code
		$('#catGo').click(function(){
			$('.output').html('');
			var val = $('#catID').val();
			$.ajax({
				method: 'GET',
				dataType:'json',
				url: '/api/v3/catalog/category/index',
				data: { 
					'category'	: val,
					'depth'		: '3',
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}).success(function (res) {
				for (var keys in res.category) {
					$('.output').append("<h4>"+res.category[keys].name+"</h4>");
					if (res.category[keys].category != undefined) {
						var next = res.category[keys].category;
						for (var keys in next) {
							$('.output').append("<p>"+next[keys].name+"</p>");
							if (next[keys].category!= undefined) {
								var next2 = next[keys].category;
								$('.output').append("<ul>");
								for (var keys in next2) {
									$('.output').append("<li>"+next2[keys].name+"</li>");
								}
								$('.output').append("</ul>");
							}
						}
					}
				}
			});
		});
	};
	
	return init;
	
});
