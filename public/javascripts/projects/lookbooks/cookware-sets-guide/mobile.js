'use strict';

var APP = {

    cm: 'mbl:spring16_cookware',

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
    tags: [],

    director: function( ) {

		var preString = "?section=";
        var paramSplitter = "&";
        var section = window.location.search.split(preString)[1].split(paramSplitter)[0];

		if ( $('article#'+section).length <= 0 ) {
			section = 'customize-your-cookware';
			window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?section=customize-your-cookware');
		} else if ( $('article#'+section).is(':visible') ) {
            window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?section=' + section + location.hash);
        }

		$('article').hide();
		$('article#'+section).show();
        console.log( $('#top-nav .nav-option[data-target="'+section+'"]').text() );
        $('#top-nav .menu').text( $('#top-nav .nav-option[data-target="'+section+'"]').text() );
		$('#top-nav .nav-option[data-target="'+section+'"]').hide();

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

        $('section').each(function() {
            if ( $(this).is(':visible') && $(this).attr('id') !== undefined && scrolled > $(this).offset().top && APP.tags.indexOf( $(this).attr('id') ) < 0 ) {
                APP.tags.push( $(this).attr('id') );
                APP.coremetrics('Pageview', APP.cm, APP.cm + '_' + $(this).attr('id'));
            }
        });

    },

};

$(document).ready(function() {

	if ( window.location.href.indexOf( '?' ) >= 0 ) {
		APP.director();
	} else if ( window.location.href.indexOf( '?' ) < 0  && window.location.href.indexOf( '#' ) >= 0 ) {
		window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?section=customize-your-cookware'+window.location.hash);
	}

	APP.socialshare();

    // social share
    $('.mobile_socialshare_facebook').on('click', function() {
        window.open(APP.social.facebookURL, '_blank', 'width=608,height=342');
        APP.coremetrics('Element', APP.cm, APP.cm + '_' + 'social-fb');
    });
    $('.mobile_socialshare_twitter').on('click', function() {
        window.open(APP.social.twitterURL, '_blank', 'width=740,height=340');
        APP.coremetrics('Element', APP.cm, APP.cm + '_' + 'social-twitter');
    });
    $('.mobile_socialshare_pinterest').on('click', function() {
        window.open(APP.social.pinterestURL, '_blank', 'width=770,height=380');
        APP.coremetrics('Element', APP.cm, APP.cm + '_' + 'social-pinterest');
    }); 
	
	$('#top-nav .menu').on('click', function(){
		var target = $(this);

		if (!target.hasClass('open')){
			target.siblings().css('display','block');
			for ( var i=0; i < $('#top-nav .nav-option').length; i++) {
				if ( $( $('#top-nav .nav-option')[i] ).text() === $('#top-nav .menu').text() ) {
					$( $('#top-nav .nav-option')[i] ).hide();	
				} 
			}
			target.addClass('open');
		} else {
			target.siblings().hide();
			target.removeClass('open');
		}
	});

	$('.nav-option').on('click', function(){
		var elem = $(this),
			target = $(this).attr('data-target');

		$('#top-nav .menu').text( elem.text() );
		elem.hide().siblings().hide();
		$('#top-nav .menu').show().removeClass('open');

		$('article').hide();
		$('article#'+target).show();

        if (target !== undefined) {
            APP.coremetrics('Pageview', APP.cm, APP.cm + '_'+target);
            APP.coremetrics('Element', APP.cm, 'mbl:topNav_' + target);   
        }

        window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?section=' + target);
	});

    $('#top-nav a').on('click', function(){
        APP.coremetrics('Element', APP.cm, 'mbl:topNav_shop-all-cookware');  
    });

    $('.mobile_back_to_top').on('click tap', function() {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {  
            window.scrollTo(0,100);
        } else {
            $('body').animate({scrollTop: 0}, 400);
        }

        APP.coremetrics('Element', APP.cm, APP.cm + '_' + 'back-to-top');
    });

    $('.hero > a').on('click', function() {
        APP.coremetrics('Element', APP.cm, 'mbl:hero_' + $(this).text().replace(/ /g,"-").replace('é','e') );
    });

    $('.loyalist-shop, .loyalist-bottom').on('click', function() {
        APP.coremetrics('Element', APP.cm, APP.cm + '_' + $(this).attr('class') );
    });

    $('article > a').on('click', function() { APP.coremetrics('Element', APP.cm, APP.cm + '_shop_' + $(this).find('section').attr('id') ); });

    $('#tools-footer > a, #materials-footer > a').on('click', function() {
        APP.coremetrics('Element', APP.cm, 'mbl:footer-links_' + $(this).text().replace(/ /g,"-").replace('é','e') );
    });

    $(window).scroll(function(){
        APP.scrollMetrics();
    });

});

$(window).load(function() {
    var section = function () {
        if ( window.location.href.indexOf( '?' ) >= 0 || window.location.href.indexOf( '#' ) >= 0) {
            return window.location.search.substring( window.location.search.indexOf('?section=') + 9 );
        } else {
            return 'customize-your-cookware';
        }
    };

    APP.coremetrics('Pageview', APP.cm, APP.cm + '_'+section());
});
