window.TEMPLATE = window.TEMPLATE || {};

window.TEMPLATE.vertical = (function(window, document, $) {
    'use strict';

    var APP = {
        cm: 'fall16_shoe_handbag_trends', //coremetrics project prefix
        views: {
            sectionInViewport: null
        },
        state: {
            isDesktop: true
        },
        vars: {
            test: null,
            loadingComplete: false,
            heroHeight: null,
            heroOffset: null,
            navHeight: null,
            sectionID: [],
            sectionPos: []
        },
        social: {
            facebookTitle: 'A LEAGUE OF THEIR OWN: Fall 2016 Shoe & Handbag Trends | bloomingdales.com',
            facebookDescription: 'The season\'s most anticipated styles up your accessories game with new shapes and luxe textures.',
            facebookImageFileName: 'share_FB.jpg',
            twitterTitle: 'Fall\'s top-trending shoes and handbags are in a league of their own. Explore the lookbook @bloomingdales.com ',
            pinterestTitle: 'A LEAGUE OF THEIR OWN: Fall 2016 Shoe & Handbag Trends | bloomingdales.com',
            pinterestImageFileName: 'share_Pinterest.jpg',
            facebookURL: null,
            twitterURL: null,
            pinterestURL: null   
        },
        mobile: {
            topnav: [
                '',
                'malibu-bbq',
                'bondi-pool-party',
                'artist-garden-party',
                'hosts-gifts',
                'guest-house'
            ],
            navActiveSection: null
        }
    };


/***********************************************/
/*           DESKTOP & TABLET CTRLS            */
/***********************************************/     
    //(req) desktop & tablet initialiazation wrapper
    APP.initDesktop = function () {
        var self = this;

        //remove MOBILE nodes
        $('.mobile_main_container').remove();
        
        //define constants 
        self.vars.navHeight = $('.desktop_nav').height() - 2;

        $('img.lazy').show().lazyload({
            threshold: 200,
            effect: 'fadeIn'
        });

        $('.desktop_main_container').show().addClass('loaded');
        $('.desktop_header').addClass('active');

        window.setTimeout(function() {
            self.stickyNav();
            self.deepLinks();
        }, 500);

        self.removeLoader(); 

        self.hotMedia();
        
        self.bindListeners();

        self.vars.loadingComplete = true;
        
        self.coremetrics('Pageview', self.cm, self.cm + '--hp');
    };

    //(req) remove loader after DOM loads
    APP.removeLoader = function () {
        $('.desktop_loader').fadeOut();
        $('.desktop_aside').fadeIn('slow');

        window.setTimeout(function() {
            $('.desktop_loader').remove();
        }, 1000);        
    };

    //(req) add 'active' class on header section when is visible
    APP.desktopHeaderVisible = function () {
        $('.desktop_header').is(':in-viewport') ? $('.desktop_header').addClass('active') : $('.desktop_header').removeClass('active');  // jshint ignore:line
    };

    //(req) enable sticky NAV
    APP.stickyNav = function () {
        var self = this;

        if (self.vars.loadingComplete && $(window).scrollTop() < ($('.desktop_nav_placeholder').offset().top)) {
            var topPos = $('.desktop_nav_placeholder').position().top;

            $('.desktop_nav').css({
                'top': topPos,
                'position': 'absolute'
            });

            //landing on an ancored URL
            if (self.views.sectionInViewport !== null) self.removeActiveNavBtn();
        } else {
            $('.desktop_nav').css({
                'top': 0,
                'position': 'fixed'
            });

            self.markActiveNavBtn();
        }
    };

    //(req) update window.location value via $.address provider
    APP.updateWindowLocation = function (event, hash) {
        event.preventDefault();
        var self = this;

        $.address.value(hash + '/');
        self.scrollToSection(hash);

        self.coremetrics('Element', self.cm, 'top_nav_' + hash);
    };

    //(req) scroll page to a particular section/element in the page
    APP.scrollToSection = function (hash) {
        var self = this;

        if (typeof hash !== 'undefined'){
            var offset = self.vars.navHeight;

            $('section').removeClass('active');
            try {
                $('html, body').animate({ scrollTop: $('#desktop_' + hash).offset().top -  offset}, 'slow');
                $('section#desktop_' + hash).addClass('active');
            } catch (err) {
                $('html, body').scrollTop(0);                
            }
        }
    };

    //(req) when landing on a deeplinked page, use the hash to scroll to the section
    APP.deepLinks = function () {
        var self = this,
            hash = $.address.value();

        if (hash !== '/') {
            hash = hash.substring(1, hash.length - 1);
            self.scrollToSection(hash);
        }
    };

    //(req) NAV menu item 'active' based on the current visible section
    APP.markActiveNavBtn = function () {
        var self = this,
            navElement = '#desktop_nav_',
            activeSection = null,
            windowOffset = $(window).scrollTop();

        if (self.vars.heroOffset === null) {
            var offset = self.vars.isDesktop ? 65 : 8;

            self.vars.heroOffset = self.vars.heroHeight + self.vars.navHeight + offset;
        }

        if (self.vars.sectionID.length === 0) { 
            var _self, hash, index;
            $('.desktop_main_container section').each(function() {
                _self = this;
                hash = $(_self).attr('id'); 
                hash = hash.replace('desktop_', '');
                index = $(_self).position().top;

                self.vars.sectionID.push(hash);
                self.vars.sectionPos.push(index);
            });            
        }

        var i, n = self.vars.sectionID.length, posVal = -99999, buffer, cat, pos = n+1;
        for (i = 0; i < n; i++) { 
            cat = self.vars.sectionPos[i];
            buffer = cat + self.vars.heroOffset - windowOffset;
            
            if (buffer < 0 && buffer > posVal) pos = i;           
        }
//        if (pos < n+1) activeSection = 'section' + (pos+1);  APP.mobile.topnav[pos+1]
        if (pos < n+1) activeSection = APP.mobile.topnav[pos+1] ;

        if (activeSection === null) {
            // reset address
            self.views.sectionInViewport = 'header';
            $.address.value('header/');
        } else if (activeSection && activeSection !== self.views.sectionInViewport){
            self.removeActiveNavBtn();
            $(navElement + activeSection).addClass('active');
            $('.desktop_main_container > section').removeClass('active');
            $('.desktop_main_container > section').eq(pos).addClass('active');

            $.address.value(activeSection + '/');

            self.views.sectionInViewport = activeSection;

            self.coremetrics('Pageview', self.cm, self.cm + '-' + self.views.sectionInViewport);   
        }
    };
    APP.removeActiveNavBtn = function () {
        var self = this;

        $('.desktop_nav > ul > li > a, .desktop_nav > .dropdown > ul > li > a').removeClass('active');
        $.address.value('header/');
        self.views.sectionInViewport = 'header';
    };

    //(req) images and videos that have 'data-url' attribute are marked as 'hot'
    APP.isThisHotMedia = function (elementID) {
        var attr = $(elementID).attr('data-url');
        
        return (typeof attr !== typeof undefined && attr !== false && attr !== '#') ? true : false;
    };

    //(req) images and videos that have 'data-url' attribute populated with a valid url, get a pointer cursor
    APP.hotMedia = function () {
        // for each image check if it has attached a data-url attr to switch to pointer cursor
        $('.desktop_main_container img, .desktop_main_container video').each(function() {
            var attr = $(this).attr('data-url');

            if (typeof attr !== typeof undefined && attr !== false && attr !== '#') {
                $(this).css('cursor', 'pointer');
            }
        });
    };

    //(req) prevent floating graphic to overlap the back-to-top button & remove "origin" class after back-to-top btn clicked
    APP.floatingGraphic = function () {
        if ($('.desktop_back_to_top').is(':in-viewport')) {
            $('.desktop_floating_graphic').css('top', '15%');
        } else {
            $('.desktop_floating_graphic').css('top', '50%');
        }

        window.setTimeout(function() {
            if ($('.desktop_back_to_top').hasClass('origin')) {
                $('.desktop_back_to_top').removeClass('origin');
            }
        }, 5000);
    };

    //(opt) interact with the Brightcove video
    APP.playBrightcoveVideo = function () {
        var self = this;

        //PLAY btn listener
        $('.desktop_brightcove_video_play').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            $(this).remove();
            $('.desktop_brightcove_video').css('background-image', '');
            $('.BrightcoveExperience').css('display', 'block');

            //CM - Element
            self.coremetrics('Element', self.cm, self.cm + '-brightcove-video_play');
        });
    };

    //(opt) interact with image sliders
    APP.slider = function () {
        $('.bxslider').bxSlider({
            pager: false,
            preloadImages: 'all',
            oneToOneTouch: false,
            useCSS: true,
            swipeThreshold: 80,
            onSlideAfter: onSlideAfter,
            onSliderLoad: onSliderLoad
        });        

        function onSlideAfter (slideElement) {
            $(slideElement).siblings().removeClass('active');
            $(slideElement).addClass('active');
        }

        function onSliderLoad () { //arg: currentIndex
            // $('.bx-viewport > ul > li').eq(currentIndex + 1).addClass('active'); //moved on the DOM element 
            $('.bx-clone').attr('id', '');
            APP.hotMedia();
        }        
    };

    //(req) global listeners for interaction & setting CM tags
    APP.bindListeners = function() {
        var self = this;

        //dropdown NAVIGATION: open & close nav
        $('.desktop_nav > .dropdown > a').on('click', function(event) {
            var dropDownNav = $('.desktop_nav > .dropdown > ul');

            event.preventDefault();

            if (dropDownNav.is(':visible')) {
                $('.desktop_nav > .dropdown').addClass('open');
                dropDownNav.slideUp('slow');

                self.coremetrics('Element', self.cm, 'nav_dropdown_close');
            } else {
                $('.desktop_nav > .dropdown').removeClass('open');
                dropDownNav.slideDown('slow');
                
                self.coremetrics('Element', self.cm, '--nav_dropdown_open');
            }
        });

        //dropdown NAVIGATION: close on mouse leaving container
        $('.desktop_nav > .dropdown').on('mouseleave', function() {
            var _self = this,
                ULmarkup = $(_self).children('ul.desktop_nav_ul');

            if (ULmarkup.is(':visible')) {  
                ULmarkup.slideUp('slow');
                
                self.coremetrics('Element', self.cm, 'nav_dropdown_close');                    
            }  

        });

        //NAVIGATION menu item click: go to section
        $('.desktop_nav > ul > li > a').on('click', function(event) {
            var hash = $(this).attr('href');

            hash = hash.substring(1, hash.length);
            self.updateWindowLocation(event, hash);
        });

        //dropdown NAVIGATION menu item click: go to section
        $('.desktop_nav > .dropdown > ul > li > a').on('click', function(event) {
            var hash = $(this).attr('href');

            $('.desktop_nav > .dropdown').removeClass('open');
            $('.desktop_nav > .dropdown > ul').slideUp('slow');
            $('.desktop_nav > .dropdown a').removeClass('active');

            hash = hash.substring(1, hash.length);
            self.updateWindowLocation(event, hash);
        });

        //back to top listener
        $('.desktop_back_to_top').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'slow', function(){
                //scrolling complete; appmed class "origin" to the button node
                $('.desktop_back_to_top').addClass('origin');
            });

            self.coremetrics('Element', self.cm, 'back_to_top');
        });

        //hot images & videos
        $('.desktop_main_container img, .desktop_main_container video').on('click', function() {
            if (self.isThisHotMedia(this)) {
                var hash = $(this).attr('data-url');

                window.open(hash, '_blank');

                hash = hash.replace('http://www1.bloomingdales.com/shop/', '');
                hash = hash.split('?')[0];
                hash = hash.substring(hash.indexOf('/') + 1);
                self.coremetrics('Element', self.cm, 'shop_now_' + hash + '-image');
            }
        });

        //CM: shop buttons 
        $('.desktop_shop_all_collection').on('click', function() {
            self.coremetrics('Element', self.cm, 'bottom_shop_all_collection');
        });
        $('.desktop_shop_all_featured').on('click', function() {
            self.coremetrics('Element', self.cm, 'bottom_shop_all_featured');
        });
        $('.desktop_nav_header_shopall').on('click', function() {
            self.coremetrics('Element', self.cm, 'shop_all_top');
        });

        //CM: NAV left side anchors when dropdown menu
        $('a.desktop_nav_links').on('click', function() {
            var hash = $(this).attr('id');

            hash = hash.substr(hash.lastIndexOf('_'));

            self.coremetrics('Element', self.cm, 'nav-shopbutton_' + hash);
        });

        //CM: ancor tags inside sections
        $('.desktop_main_container section a').on('click', function() {
            var hash = $(this).attr('href');
            hash = hash.replace('http://www1.bloomingdales.com/shop/', '');
            hash = hash.split('?')[0];
            hash = hash.substring(hash.indexOf('/') + 1);
            self.coremetrics('Element', self.cm, 'shop_now_' + hash);
        });

        // social share
        $('.desktop_socialshare_facebook').on('click', function() {
            window.open(self.social.facebookURL, '_blank', 'width=608,height=342');
            self.coremetrics('Element', self.cm, 'social-fb');
        });
        $('.desktop_socialshare_twitter').on('click', function() {
            window.open(self.social.twitterURL, '_blank', 'width=740,height=340');
            self.coremetrics('Element', self.cm, 'social-twitter');
        });
        $('.desktop_socialshare_pinterest').on('click', function() {
            window.open(self.social.pinterestURL, '_blank', 'width=770,height=380');
            self.coremetrics('Element', self.cm, 'social-pinterest');
        });  

        $(window).scroll(function() {
            APP.stickyNav();
            APP.desktopHeaderVisible();
            APP.floatingGraphic();
        });                            
    };

    //(req) CM business logic
    APP.coremetrics = function (tagType, categoryID, pageID) {
        var self = this;

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
            } catch (e) {
                self.logErr('CoreM_err: ' + e);
            }
            self.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
        } else if (tagType === 'Element') {
            try {
//                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID);
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID.substring(0, 49), categoryID);
            } catch (e) {
                self.logErr('CoreM_err: ' + e);
            }
//            self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
            self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID.substring(0, 49));            
        }
    };

    //(req) social share business logic
    APP.socialshare = function() {
        var self = this,
            baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/fashion/images/projects' + window.location.pathname;

        self.social.facebookURL = 'https://www.facebook.com/dialog/feed';
        self.social.facebookURL += '?app_id=145634995501895';
        self.social.facebookURL += '&name=' + encodeURIComponent(self.social.facebookTitle);
        self.social.facebookURL += '&description=' + encodeURIComponent(self.social.facebookDescription);
        self.social.facebookURL += '&link=' + encodeURIComponent(baseURL);
        self.social.facebookURL += '&picture=' + encodeURIComponent(baseURLAssets + self.social.facebookImageFileName);
        self.social.facebookURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        self.social.twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        self.social.twitterURL += encodeURIComponent(self.social.twitterTitle);

        self.social.pinterestURL = 'http://pinterest.com/pin/create/button/?';
        self.social.pinterestURL += 'url=' + encodeURIComponent(baseURL);
        self.social.pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + self.social.pinterestImageFileName);
        self.social.pinterestURL += '&description=' + encodeURIComponent(self.social.pinterestTitle);
    };

    //(req) custom logger for 'dev' environment
    APP.logErr = function (log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };      

/***********************************************/
/*                  TABLET CTRLS               */
/***********************************************/  
    //(req) full screen fix
    APP.zoomFixTAB = function () {
        $('html, body').css({
            'width': '100vw',
            'zoom': '1'
        });        
    };

    //(opt: only for HTML5 video components) HTML5 video ctrl for tablet
    APP.autoPlayHTML5VideoTAB = function () {
        var video = $('.desktop_main_container section video').get(0);
        
        //force video re-play automatically after 1s
        setTimeout(function(){
            $('body').one('touchstart load',function(){
                video.play();
            }).trigger('load');
        },1000);        
    };

    //(opt: only for Brightcove video components) replace Brightcove flash video with HTML5 video objects
    APP.dynamicBrightcoveVideoInsertTAB = function () {
        var self = this,
            videoMarkup = '<video class="BrightcoveExperience tablet" width="100%" height="100%" src="" controls="controls"></video>';
        
        $('.BrightcoveExperience').remove();
        $(videoMarkup).insertAfter('.desktop_brightcove_video_play');
        
        _getBrightcoveVideoURL('http://api.brightcove.com/services/library?command=find_video_by_id&video_id=4427047176001&video_fields=FLVURL&media_delivery=http&token=2uKb24EVrCM2ytEfXsGX91YC2eB41If1K6i82P-j9GATvAlc5o-kKg..');

        //PLAY btn listener
        $('.desktop_brightcove_video_play').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            var _self = this,
                videoMarkup = $(_self).siblings('.BrightcoveExperience'),
                video = $(_self).siblings('.BrightcoveExperience').get(0);

            $(_self).remove();
            $(_self).parent().css('background-image', '');
            video.play();
            videoMarkup.css('display', 'block');

            try {
                if (typeof video.mozRequestFullScreen === 'function') {
                    video.mozRequestFullScreen();
                } else {
                    video.webkitEnterFullscreen();
                }
            } catch (e) {}

            //CM - Element
            self.coremetrics('Element', self.cm, self.cm + '-brightcove-video_play');
        });

        //get video URL via AJAX call
        function _getBrightcoveVideoURL(url) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'jsonp',
                cache: false,
                crossDomain: true,
                processData: true,
                success: function(res) {
                    $('.BrightcoveExperience').attr('src', res.FLVURL);
                },
                error: function(xhr, status, errorThrown) {
                    console.error('BRIGHTCOVE API ERR:: ' + errorThrown + '\n' + status + '\n' + xhr.statusText);
                }
            });
        }
    };

/***********************************************/
/*                   BOOTSTRAP                 */
/***********************************************/      
    $(window).load(function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            //TABLET
            APP.vars.isDesktop = false;

            APP.zoomFixTAB();

            APP.initDesktop();
        } else {
            //DESKTOP
            
            APP.initDesktop();

            //add hover state to the NAV menu items
            $('.desktop_main_container a, .desktop_socialshare_container li').on('mouseenter', function(){
                $(this).addClass('hover');
            }).on('mouseleave', function(){
                $(this).removeClass('hover');
            });  
        }

        APP.socialshare();


    });    

    return APP;

}(window, document, jQuery));