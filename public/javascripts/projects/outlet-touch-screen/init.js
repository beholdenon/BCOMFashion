/* jshint undef: true, unused: true */
/* globals SERVICES, catBrowse*/

'use strict';

var currentPage = 1,
	totalPages,
	browseImg,
	browseAnimation = false,
	properties = {
		categoryName: false,
		linking: false,
		reviews: false,
		swatches: false,
		numberOfResults: 16,
		currentPage: 1,
		sortby: 'newarrivals',
		gridClasses: 'standard four-col',
		domTarget: '#otc-browse .page-1',
		masterQP: 'master-grid'
	};

$(document).ready(function () {

	// app.screenSaver.setup();
	// $(window).on('keyup keypress blur change mousemove tap swipe',function(){
	// 	app.screenSaver.reset();
	// });

	$('#otc-screen-saver').on('click tap', function () {
		$(this).hide();
	});

	$('#home').on('click', function () {
		$('#otc-landing').css('display', 'inline-block');
		$('#shop-contents').html('');
		$('#otc-landing, #otc-browse').animate({
			left: '+=100%'
		},
			600, function() {
			
		});
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
	$('#sortBox').change(function () {
		properties.sortby = $(this).find(':selected').attr('data-sort');
		
		$('#shop-contents').html('<div class="browseShell page-1"></div>');
		$('#browse-info .nav .right').removeClass('inactive');
		$('#browse-info .nav .left').addClass('inactive');

		currentPage = 1;
		properties.currentPage = currentPage;
		properties.domTarget = '#otc-browse .page-' + currentPage;

		$('#shop-contents').fadeOut('fast', function() {
			app.category.init(properties);
			setTimeout(function() {
				$('#shop-contents').slideDown('slow');	
			}, 300);
		});
	});

	function setupCategory(target, callback) {
		var browseCat = target.attr('data-cat');
			browseImg = target.attr('class');

		$('#shop-contents').html('<div class="browseShell page-1"></div>');
		$('#sortBox').val('newarrivals');
		properties.sortby = 'newarrivals';
		// $('#browse-footer').attr('src', '/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg' );
		$('#browse-info .nav .right').removeClass('inactive');
		$('#browse-info .nav .left').addClass('inactive');

		properties.catID = browseCat;
		currentPage = 1;
		properties.currentPage = currentPage;
		properties.domTarget = '#otc-browse .page-' + currentPage;

		app.category.init(properties);
		
		if (callback !== undefined) callback();
	}
		
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
				} else {
					$('#browse-info .nav .right').removeClass('inactive');
				}

			} else {
				// right

				currentPage++;
				properties.currentPage = currentPage;
				$('#browse-info .pages .num-one').text(currentPage);

				if ( !$('#otc-browse .page-'+(currentPage+1)).length && currentPage !== totalPages ) {
					$('#otc-browse #shop-contents').append('<div class="browseShell page-' + (currentPage+1) + '" style="left:' + $('#otc-browse .page-1').css('left') + '"></div>');
					properties.domTarget = '#otc-browse .page-' + (currentPage+1);
					properties.currentPage = currentPage+1;
					$('#otc-browse .browseShell').animate({left: '-=100vw'}, 300, function () {
						browseAnimation = false;
					});
					catBrowse.request(properties, function () {
						$('#otc-browse .page-' + (currentPage+1)).append('<img class="browse-footer" src="/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg"/>');
					});
				} else {
					$('#otc-browse .browseShell').animate({left: '-=100vw'}, 300, function () {
						browseAnimation = false;
					});
				}

				if ( currentPage === parseInt($('#browse-info .pages .num-two').text()) ) {
					$('#browse-info .nav .right').addClass('inactive');
				} else {
					$('#browse-info .nav .left').removeClass('inactive');
				}

			}
		}
	});

	// interaction with a main facet on browse.
	$('#otc-browse .facets').on('click tap', 'td.group', function () {
		var targetBox = $(this).text().replace(/\s+/g, '-').toLowerCase(),
			currentTab = $(this);

		$('#otc-browse, #otc-landing').addClass('blur');
		$('#filterGroups .'+targetBox).show().siblings().hide();
		$('#filterOverlay, #filterGroups').fadeIn();

	});

	// close filter overlay
	$('#filterOverlay, #filterGroups .close').on('click tap', function() {
		closeFaceting();
	});

	function closeFaceting () {
		$('#otc-browse, #otc-landing').removeClass('blur');
		$('#filterOverlay, #filterGroups').hide();
	}

	// additional quickpeek markup on initial click
	$('body').on('click tap', '.quickPeekIcon', function () {
		console.log('quickpeek');
		$('#otc-browse .nav, #shop-contents').addClass('blur');

		var seeYourAssociate = '<div id="see-your-associate">See an Associate for more details</div><div id="productSwitch"><div class="arrow">&lsaquo;</div> <div class="product-count"><span>Product </span><span>1</span><span> of </span><span>123</span></div> <div  class="arrow">&rsaquo;</div>';

		if ( $('#see-your-associate').length < 1 ) {
			$(seeYourAssociate).insertBefore('#singleATB .footer');
		}
	});

	$('body').on('click tap', '#atbOverlay, #singleATB .close', function () {
		$('#otc-browse .nav, #shop-contents').removeClass('blur');
	});

});

var app = {
	
	category: {

		filters: function (result) {
			// build out category filtering
			SERVICES.category.index( function (res) {
				console.log(res);

				$('#otc-browse .category .subCat').html('');
				
				for ( var i=0; i<res.category[0].category.length; i++) {
					if (res.category[0].category[i].mobileName !== undefined) {
						$('#otc-browse .category .subCat').append( '<li class="'+(res.category[0].name).toLowerCase()+'" data-cat="'+res.category[0].category[i].id+'">'+res.category[0].category[i].mobileName+'</li>' );
					} else {
						$('#otc-browse .category .subCat').append( '<li class="'+(res.category[0].name).toLowerCase()+'" data-cat="'+res.category[0].category[i].id+'">'+res.category[0].category[i].name+'</li>' );
					}
				}

				$('#otc-browse .category .subCat li:contains('+result.category[0].summary.name+')').addClass('active').siblings().removeClass('active');

			}, result.category[0].parentcategory.id);
		},

		init: function (properties) {

			catBrowse.request(properties, function (result) {
				totalPages = Math.ceil(result.category[0].totalproducts / properties.numberOfResults);

				$('#browse-info .count .int').text(result.category[0].totalproducts);
				$('#browse-info .pages .num-one').text(currentPage);
				$('#browse-info .pages .num-two').text(totalPages);
				$('#otc-browse .nav .level .' + (result.category[0].parentcategory.summary.name).toLowerCase() ) .addClass('active').siblings().removeClass('active');
				
				console.log(result);
				app.category.faceting(result);
				app.category.filters(result);

				if ( totalPages > 1 ) {

					$('#otc-browse #shop-contents').append('<div class="browseShell page-' + (currentPage+1) + '"></div>');
					properties.domTarget = '#otc-browse .page-' + (currentPage+1);
					properties.currentPage = currentPage+1;
					catBrowse.request(properties, function () {
						$('#otc-browse .browseShell').append('<img class="browse-footer" src="/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg"/>');
					});
				} else {
					$('#otc-browse .browseShell').append('<img class="browse-footer" src="/fashion/images/projects/outlet-touch-screen/' + browseImg + '.jpg"/>');
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

				$('#filterGroups .content').append( '<div class="filterBox '+filterData[i].displayname.replace(/\s+/g, '-').toLowerCase()+'">'+ facetMarkup + '</div>' );
			}
		},

	},

	screenSaver: {

		homescreen: function () {
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
		}

	}


};