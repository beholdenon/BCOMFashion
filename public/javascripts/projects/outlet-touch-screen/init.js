/* jshint undef: true, unused: true */
/* globals SERVICES, catBrowse, Hammer*/

'use strict';

var currentPage = 1,
	itemCount = 12,
	totalPages,
	browseImg,
	prodList = [],
	browseAnimation = false,
	properties = {
		categoryName: false,
		linking: false,
		reviews: false,
		swatches: false,
		numberOfResults: itemCount,
		currentPage: 1,
		sortby: 'newarrivals',
		sortorder:'asc',
		gridClasses: 'standard four-col',
		domTarget: '#otc-browse .page-1',
		masterQP: 'master-grid'
	};

$(document).ready(function () {

	app.screenSaver.animation();
	app.screenSaver.setup();
	$(window).on('keyup keypress blur change mousemove tap swipe',function(){
		app.screenSaver.reset();
	});

	$('#otc-screen-saver').on('click tap', function () {
		$(this).hide();
	});

	$('#home').on('click', function () {
		if ( $('#otc-landing').css('left') !== '0px' ) {
			$('#otc-landing').css('display', 'inline-block');
			$('#shop-contents').html('');
			$('#otc-landing, #otc-browse').animate({
				left: '+=100%'
			},
				600, function() {
				
			});
			resetFaceting();
		}
	});

	// activates when you select a new category to look at from the landing page
	$('#otc-landing .categories li').unbind().on('click tap', function () {
		setupCategory( $(this), function () {
			$('#cube-loader').fadeIn();
			$('#otc-browse, #otc-landing').addClass('blur');

			setTimeout(function(){
				$('#cube-loader').fadeOut(400);
				$('#otc-browse, #otc-landing').removeClass('blur');
				$('#otc-landing, #otc-browse').animate({
					left: '-=100%'
				},600);
			}, 1500);
			
		});		
	});

	// activates when you select a new category from the top navigation
	$('#otc-browse .nav .level').unbind().on('click tap', 'li', function () {
 		var target = $(this);
 		$('#cube-loader').fadeIn();
 		$('#otc-browse').addClass('blur');

		$('#shop-contents').fadeOut('fast', function() {
			setupCategory( target, function () {

				setTimeout(function() {
					$('#shop-contents').fadeIn('slow', function() {
						$('#cube-loader').fadeOut(400);
						$('#otc-browse').removeClass('blur');
					});	
				}, 300);
			});
		});
		
	});

	// activates when you change the sorting
	$('#otc-browse').on('click tap', '#sortBox .option', function () {
		properties.sortby = $(this).attr('data-sort');
		
		$('#browse-info .nav .right').removeClass('inactive');
		$('#browse-info .nav .left').addClass('inactive');
		$('#sortBox').hide();
		$('#activeSort').text( $(this).text() );

		currentPage = 1;
		properties.currentPage = currentPage;
		properties.numberOfResults = itemCount;
		properties.domTarget = '#otc-browse .page-' + currentPage;

		$('#shop-contents').slideUp('fast', function() {
			$('#shop-contents').html('<div class="browseShell page-1"></div>');
			app.category.init(properties);
			$('#shop-contents').hide();
			$('#cube-loader').fadeIn(400);

			setTimeout(function(){
				$('#cube-loader').fadeOut(400);
				$('#shop-contents').slideToggle('slow');
			}, 1000);

		});
	});

	function setupCategory(target, callback) {
		var browseCat = target.attr('data-cat');
			browseImg = target.attr('class');

		resetFaceting();
		$('#shop-contents').html('<div class="browseShell page-1"></div>');
		$('#sortBox').val('newarrivals');
		properties.sortby = 'newarrivals';
		// $('#browse-footer').attr('src', '/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg' );
		$('#browse-info .nav .right').removeClass('inactive');
		$('#browse-info .nav .left').addClass('inactive');

		properties.catID = browseCat;
		currentPage = 1;
		properties.numberOfResults = itemCount;
		properties.currentPage = currentPage;
		properties.domTarget = '#otc-browse .page-' + currentPage;

		app.category.init(properties);
		
		if (callback !== undefined) callback();
	}

	// Browse Swipe 

	new Hammer( document.getElementById('shop-contents') ).on('swipe', function (event) {
		if ( event.gesture.direction === 'right' ) {
			$('#browse-info .nav .left').trigger('click');
		} else if ( event.gesture.direction === 'left' ) {
			$('#browse-info .nav .right').trigger('click');
		}
	});

	new Hammer( document.getElementById('singleATB') ).on('swipe', function (event) {
		if ( event.gesture.direction === 'right' ) {
			$('body').find('#productSwitch .arrow.left').trigger('click');
		} else if ( event.gesture.direction === 'left' ) {
			$('body').find('#productSwitch .arrow.right').trigger('click');
		}
	});
		
	// Left or Right buttons on the browse page
	$('#browse-info .nav .left, #browse-info .nav .right').unbind().on('click tap', function () {

		if ( $(this).attr('class').indexOf('inactive') < 0 && browseAnimation === false ) { //check to see if button is disabled
			
			browseAnimation = true;
			
			if ( $(this).attr('class').indexOf('left') >= 0 ) {
				// left

				currentPage--;
				browseAnimation = false;

				$('#otc-browse .browseShell').animate({left: '+=100vw'}, 300, function (){
					
				});

				$('#browse-info .pages .num-one').text(currentPage);

				if ( currentPage === 1 ) {
					$('#browse-info .nav .left').addClass('inactive');
					$('#browse-info .nav .right').removeClass('inactive');
				} else {
					$('#browse-info .nav .right').removeClass('inactive');
				}

			} else {
				// right

				currentPage++;
				properties.currentPage = currentPage;
				properties.numberOfResults = itemCount;
				$('#browse-info .pages .num-one').text(currentPage);

				if ( !$('#otc-browse .page-'+(currentPage+1)).length && currentPage !== totalPages ) {
					$('#otc-browse #shop-contents').append('<div class="browseShell page-' + (currentPage+1) + '" style="left:' + $('#otc-browse .page-1').css('left') + '"></div>');
					properties.domTarget = '#otc-browse .page-' + (currentPage+1);
					properties.currentPage = currentPage+1;
					$('#otc-browse .browseShell').animate({left: '-=100vw'}, 300, function () {
						browseAnimation = false;
					});
					catBrowse.request(properties, function (result) {
						for ( var id = 0; id < result.category[0].product.product.length; id++ ) {
							prodList.push(result.category[0].product.product[id].id);
						}
						// $('#otc-browse .page-' + (currentPage+1)).append('<img class="browse-footer" src="/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg"/>');
					});
				} else {
					$('#otc-browse .browseShell').animate({left: '-=100vw'}, 300, function () {
						browseAnimation = false;
					});
				}

				if ( currentPage === parseInt($('#browse-info .pages .num-two').text()) ) {
					$('#browse-info .nav .right').addClass('inactive');
					$('#browse-info .nav .left').removeClass('inactive');
				} else {
					$('#browse-info .nav .left').removeClass('inactive');
				}

			}
		}
	});

	// interaction facet in top Navigation
	$('#otc-browse .facets').on('click tap', 'td.group', function () {
		var targetBox = $(this).text().replace(/\s+/g, '-').toLowerCase();

		if ( $(this).parent().hasClass('filters') ) {
			$('#otc-browse, #otc-landing').addClass('blur');
			$('#filterGroups .'+targetBox).show().siblings().hide();
			$('#filterOverlay, #filterGroups').fadeIn();	
		} else {
			$('#otc-browse, #otc-landing').addClass('blur');
			$('#filterOverlay, #filterGroups').fadeIn();
		}
		

	});

	// reset facetting
	$('#otc-browse').on('click tap', '.activeFilter .reset', function () {
		$('#otc-browse .nav .subCat .active').trigger('click');
	});

	// A facet has been chosen, fitler that jazz
	$('#filterGroups').on('click tap', '.facetValue', function () {
		 var fProds = [],
			facetChoice = $(this).text().toLowerCase(),
			subtype = $(this).parent().attr('data-type');

		closeFaceting();
		
		$('#otc-browse .filters').hide();
		$('.activeFilter').remove();
		$('<tr class="activeFilter"><td class="group">'+facetChoice+'</td><td class="reset">Remove Facet</td></tr>').insertAfter('#otc-browse .filters');
		$('#otc-browse, #otc-landing').addClass('blur');
		$('#shop-contents').hide();
		$('#cube-loader').fadeIn(400);

		var filters = {
			build: function (fProds){ //, subtype) {
				var filteredProducts = [ [] ],
					// numberOfCalls = 1,
					arrayGroup = [];

				if (fProds.length > 96) {
					arrayGroup = createGroupedArray(fProds, 96);
					console.log(arrayGroup);
					fProds = arrayGroup[0];
				}


				SERVICES.product.get(function(results) {
					$('#otc-browse, #otc-landing').removeClass('blur');
					$('#shop-contents').fadeIn(function () {
						$('#cube-loader').fadeOut(400);
					});
					console.log('length pre 1:  '+filteredProducts[filteredProducts.length-1].length);
					filters.check(results, filteredProducts);
					console.log('length post 1:  '+filteredProducts[filteredProducts.length-1].length);
					console.log(filteredProducts);
					$('#shop-contents').html('');
					$('#cube-loader').fadeOut(400);
					$('#otc-browse').removeClass('blur');
					$('#browse-info .sort').css('opacity', 0);

					if ( arrayGroup.length <= 1 ) {
						filters.browse(filteredProducts);
					}

					var n=1;
					if ( arrayGroup.length > 1 ) {	
						extraFilteredPages(n);
					}

				}, fProds.toString() );

				function extraFilteredPages (n) {
					SERVICES.product.get( function(results) {
						filters.check(results, filteredProducts);
						console.log('length repeat '+n+':  '+filteredProducts[filteredProducts.length-1].length);
						console.log(filteredProducts);
						n++;
						if (n<arrayGroup.length) {
							extraFilteredPages(n);
							console.log('repeat');
						} else {
							console.log('print');
							filters.browse(filteredProducts);
						}
					}, arrayGroup[n].toString() );
				}
			},

			browse: function (filteredProducts) {
				// console.log(filteredProducts);
				var total = 0;
 
				for (var page = 0; page < filteredProducts.length; page++) {
					$('#shop-contents').append('<div class="browseShell page-'+(page+1)+' standard four-col"><ul class="products"></ul></div>');

					for (var product = 0; product < filteredProducts[page].length; product++) {
						var currentProd = filteredProducts[page][product],
							image = '<div class="imgBox"><img class="primary" src="http://images.bloomingdales.com/is/image/BLM/products/6/optimized/'+currentProd.productDetails.primaryImage.imagename+'?bgc=255,255,255&wid=164&qlt=90&layer=comp&op_sharpen=0&resMode=bicub&op_usm=0.7,1.0,0.5,0&fmt=jpeg&wid=456"/><div class="atb_overlay quickPeekIcon master-grid" title="Quick Peek" data-id="'+currentProd.id+'"></div></div>';

						$('#shop-contents .browseShell.page-'+(page+1)+' .products').append('<li id="'+currentProd.id+'" data-num="'+product+'">'+image+'<hr class="breaker"><div class="brand">'+currentProd.productDetails.summary.brand+'</div><div class="name">'+currentProd.productDetails.summary.name+'</div><div class="price">'+currentProd.productDetails.price.retail.pricevalue.low+'</div></li>');
						total++;
					}

				}

				$('#browse-info .count .int').text(total);
				$('#browse-info .pages .num-two').text(filteredProducts.length);
				if (filteredProducts.length === 1) {
					$('#browse-info .nav .right').addClass('inactive');
				} else {
					$('#browse-info .nav .right').removeClass('inactive');
				}
			},

			check: function(results, filteredProducts) {
				var pageCount = filteredProducts[filteredProducts.length-1].length,
					attributes,
					status = false;

				// cycle through products 
				for (var i=0; i< results.product.length; i++) {
					attributes = results.product[i].productDetails.attributes;
					status = false;

					// loop through attributes to find facet match
					for ( var j = 0; j < attributes.length; j++) {
						if ( attributes[j].values[0].value.toString().toLowerCase() === facetChoice ) {
							status = true;
						}
					}

					if ( subtype === 'size' ) {
						console.log(results);
					} else if ( subtype === 'price' ) {
						console.log(results);
					} else if ( subtype === 'color' ) {
						for (var c=0; c < results.product[i].productDetails.colorMap.length-1; c++ ) {
							if (results.product[i].productDetails.colorMap !== undefined && results.product[i].productDetails.colorMap.length > 0) {
								if ( results.product[i].productDetails.colorMap.length > 1 ) {
									status = true;
								} else if ( results.product[i].productDetails.colorMap[c].color!==undefined && results.product[i].productDetails.colorMap[c].colortoLowerCase() === facetChoice) {
									status = true;
								} else if ( results.product[i].productDetails.colorMap[c].colornormal !== undefined && results.product[i].productDetails.colorMap[c].colornormal.toLowerCase() === facetChoice ) {
									status = true;
								}
							}
						}
					}

					if (status === true && pageCount < 12) {
						filteredProducts[filteredProducts.length-1].push(results.product[i]);
						pageCount++;
					} else if (status === true && pageCount >= 12) {
						pageCount = 1;
						filteredProducts[ filteredProducts.length ] = [];
						filteredProducts[ filteredProducts.length-1 ].push(results.product[i]);
					}

				}
			},

			itemList: function (fProds, curPage, subtype) { //, facetChoice, subtype) {

				SERVICES.category.browseProduct(function(result) {
					for ( var k = 0; k < result.category[0].product.product.length; k++ ) {
						fProds.push(result.category[0].product.product[k].id);
					}

					if ( fProds.length < result.category[0].totalproducts ) {
						curPage++;
						filters.itemList(fProds, curPage, subtype);
					} else {
						filters.build(fProds, subtype);	
					}

				}, properties.catID, 96, properties.sortby, curPage);
			},

		};

		filters.itemList(fProds, 1, subtype);

	});

	// close filter overlay
	$('#filterOverlay, #filterGroups .close').on('click tap', function() {
		closeFaceting();
	});

	function closeFaceting () {
		$('#otc-browse, #otc-landing').removeClass('blur');
		$('#filterOverlay, #filterGroups').hide();
	}

	function resetFaceting () {
		$('#otc-browse .activeFilter').remove();
		$('#otc-browse .filters').show();
	}

	// additional quickpeek markup on initial click
	$('body').on('click tap', '.quickPeekIcon', function () {
		var productNumber = 12 * (parseInt( $('#browse-info .pages .num-one').text() )-1) + (parseInt( $(this).parents('li').attr('data-num') )+1) ,
			seeYourAssociate = '<div id="see-your-associate">See an Associate for in-store availability</div><div id="productSwitch"><div class="arrow left">&lsaquo;</div> <div class="product-count"><span>Product </span><span>'+ productNumber +'</span><span> of </span><span>'+$('#browse-info .count .int').text()+'</span></div> <div  class="arrow right">&rsaquo;</div>';
		
		$('#see-your-associate, #productSwitch').remove();
		$('#otc-browse .nav, #shop-contents').addClass('blur');

		$('#singleATB').attr('data-id',$(this).attr('data-id'));
		$('#singleATB .modal.instock .status').text('Available Online');
		
		if ( $('#qrcode').length <= 0 ) {
			$('<div id="qrcode"><img src="/fashion/images/b-logo.png" id="qrCover"></div>').insertAfter('#singleATB .price');
		} else {
			$('#qrcode').html('<img src="/fashion/images/b-logo.png" id="qrCover">');
		}
		$('#qrcode').qrcode({width: 160, height: 160, text: 'http://www.bloomingdales.com/shop/product/?ID='+$('#singleATB').attr('data-id')+'&loadEvent=add-to-wishlist'});

		$(seeYourAssociate).insertBefore('#singleATB .footer');

		if ( parseInt($('#browse-info .pages .num-one').text()) === 1 && $('#singleATB').attr('data-id') === $('.browseShell.page-' +$('#browse-info .pages .num-one').text() + ' li').eq(0).attr('id') ) {
			$('#productSwitch .arrow.left').remove();
		} else if ( parseInt($('#browse-info .pages .num-one').text()) === parseInt($('#browse-info .pages .num-two').text()) && $('#singleATB').attr('data-id') === $('.browseShell.page-' +$('#browse-info .pages .num-one').text() + ' li:last-child').attr('id') ) {
			$('#productSwitch .arrow.right').remove();
		}
	});

	$('body').on('click tap', '#atbOverlay, #singleATB .close', function () {
		$('#otc-browse .nav, #shop-contents').removeClass('blur');
	});

	$('body').on('click tap', '#productSwitch .arrow', function () {
		var arrow = $(this),
			currentID = $(this).parents('#singleATB').attr('data-id'),
			currentPosition = $('#shop-contents').find('#'+currentID).index(),
			page = $('#browse-info .pages .num-one').text(),
			// activePage = parseInt( $('#browse-info .pages .num-one').text() ),
			leftPos = currentPosition-1,
			rightPos = currentPosition+1;

		if (currentPosition === 0 &&  arrow.hasClass('left') ) {
			page--;
			leftPos = 11;
			$('#browse-info .nav .left').trigger('click');
		} else if ( currentPosition === 11 &&  arrow.hasClass('right') ) {
			page++;
			rightPos = 0;
			$('#browse-info .nav .right').trigger('click');
		}

		var leftId = $('#shop-contents .page-'+ page).find('.products li').eq(leftPos),
			rightId = $('#shop-contents .page-'+ page).find('.products li').eq(rightPos);

		$('#singleATB').fadeOut('fast');
		setTimeout(function () {
			if ( arrow.hasClass('left') ) {
				$('#'+leftId.attr('id')).find('.quickPeekIcon').trigger('click');
			} else {
				$('#'+rightId.attr('id')).find('.quickPeekIcon').trigger('click');
			}
		},300);

	});

	$('#activeSort').on('click tap', function () {
		$('#sortBox').slideToggle();
	});

});

var app = {
	
	category: {

		filters: function (result) {
			// build out category filtering
			SERVICES.category.index( function (res) {

				$('#otc-browse .category .subCat').html('');
				
				for ( var i=0; i<res.category[0].category.length; i++) {
					if (res.category[0].category[i].mobileName !== undefined) {
						$('#otc-browse .category .subCat').append( '<li class="'+(res.category[0].name).toLowerCase()+'" data-cat="'+res.category[0].category[i].id+'"><span>'+res.category[0].category[i].mobileName+'</span></li>' );
					} else {
						$('#otc-browse .category .subCat').append( '<li class="'+(res.category[0].name).toLowerCase()+'" data-cat="'+res.category[0].category[i].id+'"><span>'+res.category[0].category[i].name+'</span></li>' );
					}
				}

				$('#otc-browse .category .subCat li:contains('+result.category[0].summary.name+')').addClass('active').siblings().removeClass('active');

			}, result.category[0].parentcategory.id);
		},

		init: function (properties) {

			prodList = [];

			catBrowse.request(properties, function (result) {
				totalPages = Math.ceil(result.category[0].totalproducts / properties.numberOfResults);

				$('#browse-info .count .int').text(result.category[0].totalproducts);
				$('#browse-info .pages .num-one').text(currentPage);
				$('#browse-info .pages .num-two').text(totalPages);
				$('#otc-browse .nav .level .' + (result.category[0].parentcategory.summary.name).toLowerCase() ) .addClass('active').siblings().removeClass('active');
				
				for ( var id = 0; id < result.category[0].product.product.length; id++ ) {
					prodList.push(result.category[0].product.product[id].id);
				}

				app.category.faceting(result);
				app.category.filters(result);

				if ( totalPages > 1 ) {
					$('#otc-browse #shop-contents').append('<div class="browseShell page-' + (currentPage+1) + '"></div>');
					properties.domTarget = '#otc-browse .page-' + (currentPage+1);
					properties.currentPage = currentPage+1;
					catBrowse.request(properties, function (result) {
						// $('#otc-browse .browseShell').append('<img class="browse-footer" src="/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg"/>');
						for ( var id = 0; id < result.category[0].product.product.length; id++ ) {
							prodList.push(result.category[0].product.product[id].id);
						}
					});
				} else {
					// $('#otc-browse .browseShell').append('<img class="browse-footer" src="/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg"/>');
				}

			});
		},

		faceting: function (result) {
			var baseNode = $('#otc-browse .nav .facets .filters'),
				filterData = result.category[0].facet;

			baseNode.html('');
			$('#filterGroups .content').html('');

			for (var i=0; i < filterData.length; i++) {
				baseNode.append('<td class="group">'+ filterData[i].displayname +'</td>');

				var facetMarkup = '';

				for (var j=0; j<filterData[i].value.length; j++) {
					facetMarkup += '<div class="facetValue">'+filterData[i].value[j].name+'</div>';
				}

				$('#filterGroups .content').append( '<div class="filterBox '+filterData[i].displayname.replace(/\s+/g, '-').toLowerCase()+'" data-type="'+filterData[i].displayname.replace(/\s+/g, '-').toLowerCase()+'">'+ facetMarkup + '</div>' );
			}
		},

	},

	screenSaver: {

		homescreen: function () {
			$('#singleATB .close').trigger('click');
			$('#otc-screen-saver').fadeIn(1000, function () {
				$('#otc-landing').css('left','0');
				$('#otc-browse').css('left','100%');
				$('#shop-contents').html('');
			});
		},

		setup: function () {
			this.screenSaverTimeout = window.setInterval( function() {
				this.homescreen();
				console.log('screensaved');
			}.bind(this), 180000 );
		},

		reset: function () {
			window.clearInterval(this.screenSaverTimeout);
			this.setup();
		},

		animation: function () {
			window.setInterval( function() {
				$('#otc-screen-saver .rotating-bg:first-of-type').animate({'opacity': 0}, 3000, function() {
					$('#otc-screen-saver .rotating-bg:first-of-type').appendTo('#otc-screen-saver');	
					$('#otc-screen-saver .rotating-bg:first-of-type').animate({'opacity': 1}, 3000);
				});
			}, 10000);
		},

	}


};

var createGroupedArray = function(arr, chunkSize) {
    var groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
};