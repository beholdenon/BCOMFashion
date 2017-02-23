'use strict';

var APP = {

    cm: 'spring16_cookware',
    isTablet: $('body').hasClass('bl_tablet') ? true : false ,

    social: {
            facebookTitle: 'The Cookware Guide | bloomingdales.com',
            facebookDescription: 'Create your own customized set and learn all the pot and pan particulars.',
            facebookImageFileName: 'social-fb.jpg',
            twitterTitle: 'Create your own customized set and learn all the pot and pan particulars.',
            pinterestTitle: 'The Cookware Guide | bloomingdales.com',
            pinterestImageFileName: 'social-pinterest.jpg',
            facebookURL: null,
            twitterURL: null,
            pinterestURL: null    
    },
    topNav: $('#topNav').offset().top,
    tags: [],

	director: function( ) {

		var section = window.location.search.substring( window.location.search.indexOf('?section=') + 9 );

		if ( $('section#'+section).length <= 0 ) {
			section = 'customize-your-cookware';
			window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?section=customize-your-cookware');
		}

		$('section').hide();
		$('section#'+section).show();
		$('#topNav li[data-param="'+section+'"]').addClass('active').siblings().removeClass('active');

		APP.coremetrics('Pageview', APP.cm, APP.cm + '_' + section);
	},

	coremetrics: function (tagType, categoryID, pageID) {
        var APP = this;

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
            } catch (e) {
                APP.logErr('CoreM_err: ' + e);
            }
            APP.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID);
            } catch (e) {
                APP.logErr('CoreM_err: ' + e);
            }

            APP.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
        }
    },

    socialshare: function() {
        var baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/b/fashion/images/projects' + window.location.pathname;

        APP.social.facebookURL = 'https://www.facebook.com/dialog/feed';
        APP.social.facebookURL += '?app_id=145634995501895';
        APP.social.facebookURL += '&name=' + encodeURIComponent(APP.social.facebookTitle);
        APP.social.facebookURL += '&description=' + encodeURIComponent(APP.social.facebookDescription);
        APP.social.facebookURL += '&link=' + encodeURIComponent(baseURL);
        APP.social.facebookURL += '&picture=' + encodeURIComponent(baseURLAssets + APP.social.facebookImageFileName);
        APP.social.facebookURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        APP.social.twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        APP.social.twitterURL += encodeURIComponent(APP.social.twitterTitle) + ' ' + encodeURIComponent(baseURL);

        APP.social.pinterestURL = 'http://pinterest.com/pin/create/button/?';
        APP.social.pinterestURL += 'url=' + encodeURIComponent(baseURL);
        APP.social.pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + APP.social.pinterestImageFileName);
        APP.social.pinterestURL += '&description=' + encodeURIComponent(APP.social.pinterestTitle);
    },

    logErr: function (log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    },

    scrollMetrics: function () {

        var scrolled = $(window).scrollTop() + $(window).height();

        $('.shop-section').each(function() {
            if ( $(this).is(':visible') && $(this).attr('id') !== undefined && scrolled > $(this).offset().top && APP.tags.indexOf( $(this).attr('id') ) < 0 ) {
                APP.tags.push( $(this).attr('id') );
                APP.coremetrics('Pageview', APP.cm, APP.cm + '_' + $(this).attr('id'));
            }
        });
    },

    calcNavOffset: function () {
        APP.topNav = $('#topNav').offset().top;
    },

    stickyNav: function () {
    	if  ( $(window).scrollTop() > APP.topNav ) {
    		$('#topNav').addClass('sticky');
    		$('.hero').addClass('navPad');
    	} else {
    		$('#topNav').removeClass('sticky');
    		$('.hero').removeClass('navPad');
    	}
    },

    floatingGraphic: function () {
        var windowBottom = $(document).scrollTop() + $(window).height(),
            backBottom = $('.desktop_back_to_top').offset().top + $('.desktop_back_to_top').height(),
            footerBottom = $('.desktop_footer').offset().top + $('.desktop_footer').height();

            console.log(windowBottom);
            console.log(backBottom);
            console.log(footerBottom);
        
        if ( backBottom > windowBottom ) {
            $('.desktop_back_to_top').addClass('float').removeClass('abs').removeAttr('style');
        } else if ( backBottom >= footerBottom ) {
            $('.desktop_back_to_top').addClass('abs').addClass('remove').css('top', $('.desktop_footer').offset().top - ( $('.desktop_back_to_top').height() - $('.desktop_footer').height() ) );
        } else if ( $('.desktop_back_to_top').offset().top + $('.desktop_back_to_top').height() > $('.hero:visible').offset().top + $('.hero:visible').height() ) {
            $('.desktop_back_to_top').show();
        } else {
            $('.desktop_back_to_top').hide();
        }
    },

};

$(document).ready(function() {

	if ( window.location.href.indexOf( '?' ) >= 0 ) {
		APP.director();
	} else if ( window.location.href.indexOf( '?' ) < 0  && window.location.href.indexOf( '#' ) >= 0 ) {
		window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?section=customize-your-cookware'+window.location.hash);
	}
	
	$('#topNav li.sect, .section-links .link').on('click', function() {
		var page = $(this).attr('data-param'),
			parameters = 'section=' + page;

		$(this).addClass('active').siblings().removeClass('active');
		window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?' + parameters);
		APP.director();
		$('html, body').animate({scrollTop: 0});
	});

	APP.socialshare();

	$('.desktop_socialshare_facebook').on('click', function() {
	    window.open(APP.social.facebookURL, '_blank', 'width=608,height=342');
		APP.coremetrics('Element', APP.cm, 'social-fb');
	});
	$('.desktop_socialshare_twitter').on('click', function() {
	    window.open(APP.social.twitterURL, '_blank', 'width=740,height=340');
	    APP.coremetrics('Element', APP.cm, 'social-twitter');
	});
	$('.desktop_socialshare_pinterest').on('click', function() {
	    window.open(APP.social.pinterestURL, '_blank', 'width=770,height=380');
	    APP.coremetrics('Element', APP.cm, 'social-pinterest');
	}); 

	$('.desktop_back_to_top').on('click', function() {
	    $('html, body').animate({
	        scrollTop: 0
	    }, 'slow', function(){
	        //scrolling complete; appmed class "origin" to the button node
	        $('.desktop_back_to_top').addClass('origin');
	    });

	    APP.coremetrics('Element', APP.cm, 'back-to-top');
	});

	$('section .hero a, #bottom-links a').on('click', function() {
		var elementText = $(this).text().toLowerCase().replace(/\s+/g,'-').replace('é','e');

		if ( $(this).parents('#bottom-links').length > 0  ) elementText = 'footer-links_' + elementText;
		if ( $(this).parents('section .hero').length > 0 ) elementText = 'hero_' + elementText;

		APP.coremetrics('Element', APP.cm, elementText);
	});

	$('#topNav li').on('click', function() {
		var elementText = 'topNav_' + $(this).text().toLowerCase().replace(/\s+/g,'-');
		APP.coremetrics('Element', APP.cm, elementText);
	});

    $('.shop-section').on('click', function() { APP.coremetrics('Element', APP.cm, APP.cm + '_shop_' + $(this).attr('id') ); });
    $('#shop-all-collection').on('click', function() { APP.coremetrics('Element', APP.cm, 'footer_shop-all-cookware' ); });


	$('.loyalist-gift-card').on('click', function() { APP.coremetrics('Element', APP.cm, 'loyalist-gift-card'); });
	$('.loyalist-sign-up').on('click', function() { APP.coremetrics('Element', APP.cm, 'loyalist-sign-up'); });

	$(window).scroll(function(){
		//APP.floatingGraphic();
		APP.scrollMetrics();
        if( ! APP.isTablet ) {
		  APP.stickyNav();
        }
	});

    setTimeout(function() {
        APP.calcNavOffset();
    }, 4000);

    if( ! APP.isTablet ) {
	   APP.stickyNav();
    }

});

$(window).load(function() {
	var section = function () {
		if ( window.location.href.indexOf( '?' ) >= 0 || window.location.href.indexOf( '#' ) >= 0) {
			return window.location.search.substring( window.location.search.indexOf('?section=') + 9 );
		} else {
			return 'customize-your-cookware';
		}
	};

	//APP.floatingGraphic();
	APP.coremetrics('Pageview', APP.cm, APP.cm + '_'+section());
});
