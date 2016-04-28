'use strict';

var APP = {
  cm: 'MBL:spring16_stylish-summer',
  social: {
        facebookTitle: 'SUMMER (STYLE) BUCKET LIST | bloomingdales.com',
        facebookDescription: 'Make the most of every sun-drenched minute with our cheeky checklist for an outrageously stylish summer.',
        facebookImageFileName: 'share_FB.jpg',
        twitterTitle: 'Make the most of every sun-drenched minute with @bloomingdales cheeky checklist for an outrageously stylish summer',
        pinterestTitle: 'SUMMER (STYLE) BUCKET LIST | bloomingdales.com',
        pinterestImageFileName: 'share_Pinterest.jpg',
        facebookURL: null,
        twitterURL: null,
        pinterestURL: null    
  },
  tags: [],
};

//(req) CM business logic
APP.coremetrics = function (tagType, categoryID, pageID) {
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
};

//(req) custom logger for 'dev' environment
APP.logErr = function (log) {
    //log errors only on DEV mode
    if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
        window.console.info(log);
    }
};

//(req) social share business logic
APP.socialshare = function() {
    var baseURL = 'http://' + window.location.host + window.location.pathname,
        baseURLAssets = 'http://' + window.location.host + '/fashion/images/projects' + window.location.pathname;

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
};

APP.scrollMetrics = function () {

    var scrolled = $(window).scrollTop() + $(window).height();

    $('section').each(function() {
        if ( $(this).attr('data-cm') !== undefined && scrolled > $(this).offset().top && APP.tags.indexOf( $(this).attr('data-cm') ) < 0 ) {
            APP.tags.push( $(this).attr('data-cm') );
            APP.coremetrics('Pageview', APP.cm, APP.cm + '_' + $(this).attr('data-cm'));
        }
    });

};

$(document).ready( function() {
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

    $('body').on('click', '.mobile_back_to_top', function() {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {  
            window.scrollTo(200,100);
        } else {
            $('body').animate({scrollTop: 0}, 400);
        }


        APP.coremetrics('Element', APP.cm, APP.cm + '_' + 'back-to-top');
    });

    $(document).on('click', 'a, img', function () { 
         if ( $(this).attr('id') !== undefined ) { APP.coremetrics('Element', APP.cm, APP.cm + '_' + $(this).attr('id')); }
    });

    $(window).scroll(function(){
        APP.scrollMetrics();
    });

    
});

$(window).load(function() {
    APP.socialshare();
    APP.coremetrics('Pageview', APP.cm, APP.cm + '--hp');
});

