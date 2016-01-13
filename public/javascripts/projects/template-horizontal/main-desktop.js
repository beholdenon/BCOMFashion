window.TEMPLATE = window.TEMPLATE || {};

window.TEMPLATE.horizontal = (function(window, $) {
    'use strict';   

    var APP = {
        cm: 'prjprefix',
        social: {
            facebookTitle: 'ACCESSORIES-PACKED GETAWAY | bloomingdales.com',
            facebookDescription: 'We toted the season\'s top accessories to the stylish @ViceroySM for our latest lookbook...',
            facebookImageFileName: 'share_FB.jpg',
            twitterTitle: 'We toted the season\'s top accessories to the stylish @ViceroySM for our latest lookbook @bloomingdales.com http://bit.ly/1C51Mnv',
            pinterestTitle: 'ACCESSORIES-PACKED GETAWAY | bloomingdales.com',
            pinterestImageFileName: 'share_Pinterest.jpg',
            facebookURL: null,
            twitterURL: null,
            pinterestURL: null            
        },
        slider: null,
        hideShopAllSlideIndex: [2, 3] //(opt) slide indexes where shop app btn is hidden; starts from 1
    };

/***********************************************/
/*           DESKTOP & TABLET CTRLS            */
/***********************************************/   
    //(req) desktop & tablet initialiazation wrapper
    APP.initDesktop = function() {
        var self = this;

        self.deepLinks();
        self.bindListeners();
        self.socialshare();
        self.coremetrics('Pageview', self.cm, self.cm + '--hp');

        self.removeLoader();
    };

    //(req) remove loader after DOM loads
    APP.removeLoader = function() {
        $('.desktop_loader').fadeOut('slow');

        window.setTimeout(function() {
            $('.desktop_loader').remove();
            $('.desktop_main_container, #bl_main_container').addClass('loaded');
        }, 1000);
    };

    //(req) update window.location value via $.address provider
    APP.updateLocation = function(hash) {

        $.address.value(hash + '/');
    };

    //(req) when landing on a deeplinked page, use the hash to scroll to the section
    APP.deepLinks = function() {
        var self = this,
            index = $.address.value();

        if (index != '/') {
            index = index.substring(1, index.length - 1);
            self.slider.goToSlide(index-1);
            self.markActiveNavBtn(index);
        }
    };

    //(req) NAV menu item 'active' based on the current visible slide
    APP.markActiveNavBtn = function(index) {
        $('.desktop_slidecontrollers > ul > li > a.active').removeClass('active');

        window.setTimeout(function() {
            $('#desktop_slide_controller' + index).addClass('active');
        }, 10);
    };

    //(req) images and videos that have 'data-url' attribute populated with a valid url, get a pointer cursor
    APP.hotMedia = function() {
        var self = this;

        // for each image check if it has attached a data-url attr to switch to pointer cursor
        $('.desktop_header > div > div.bx-viewport > ul > li img, .desktop_header > div > div.bx-viewport > ul > li video').each(function() {
            var _self = this,
                attr = $(_self).attr('data-url');

            if (typeof attr !== typeof undefined && attr !== false && attr !== '#') {
                $(_self).css('cursor', 'pointer');
            } else if ($(_self).siblings('a.slide_cta').length > 0) {
                var href = $(_self).siblings('a.slide_cta').attr('href');

                $(_self).attr('data-url', href);
                $(_self).css('cursor', 'pointer');
            }
        });
    };

    //(req) images and videos that have 'data-url' attribute are marked as 'hot'
    APP.isThisHotMedia = function(elem) {
        var attr = $(elem).attr('data-url');

        return (typeof attr !== typeof undefined && attr !== false && attr !== '#') ? true : false;
    };

    //(req) global listeners for interaction & setting CM tags
    APP.bindListeners = function() {
        var self = this;

        //dropdown NAVIGATION: open & close nav
        $('.desktop_slidecontrollers > .dropdown > a').on('click', function(event) {
            var dropDownNav = $('.desktop_slidecontrollers > .dropdown > ul');

            event.preventDefault();

            if (dropDownNav.is(':visible')) {
                $('.desktop_slidecontrollers > .dropdown').addClass('open');
                dropDownNav.slideUp('slow');

                self.coremetrics('Element', self.cm, 'nav_dropdown_close');
            } else {
                $('.desktop_slidecontrollers > .dropdown').removeClass('open');
                $('.desktop_nav_ul').css('top', -1 * ($('.desktop_nav_ul').height() + 15));
                dropDownNav.slideDown('slow');
                
                self.coremetrics('Element', self.cm, '--nav_dropdown_open');
            }
        });

        //dropdown NAVIGATION: close on mouse leaving container
        $('.desktop_slidecontrollers > .dropdown').on('mouseleave', function() {
            var _self = this,
                ULmarkup = $(_self).children('ul.desktop_nav_ul');

            if (ULmarkup.is(':visible')) {  
                ULmarkup.slideUp('slow');
                
                self.coremetrics('Element', self.cm, 'nav_dropdown_close');                    
            }  

        });

        //click on a hot media element
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

        //NAV ctrl
        $('.desktop_main_container a.desktop_slidecontrollers_ctrl').on('click', function(event) {
            var target = $(this),
                index = parseInt(target.data('slide'), 10),
                targetID = target.attr('id'),
                goToSlideIndex,
                updateLocationIndex;
            
            event.stopPropagation();
            event.preventDefault();

            self.coremetrics('Element', self.cm, 'nav-control-' + (index + 1));

            if ($('.dropdown').length == 0) {
                goToSlideIndex = index;
                updateLocationIndex = index + 1;                
            } else {
                goToSlideIndex = index - 1;
                updateLocationIndex = index; 
            }

            self.slider.goToSlide(goToSlideIndex);
            self.updateLocation(updateLocationIndex);

            self.coremetrics('Pageview', self.cm, self.cm + '-slide-' + (index + 1));
        });

        //slider arrows ctrl
        $('.desktop_header > div > div.bx-controls.bx-has-controls-direction > div > a').on('click', function(event) {
            var index = self.slider.getCurrentSlide();

            self.updateLocation(index + 1);

            self.coremetrics('Element', self.cm, 'slider-arrow');
            self.coremetrics('Pageview', self.cm, self.cm + '-slide-' + (index + 1));
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

        $('.desktop_shop_this_page').on('click', function(event) {
            event.stopPropagation();
            event.preventDefault();

            var index = self.slider.getCurrentSlide(),
                url = $('#' + self.projectPrefix + '_slide_' + (index + 1) + ' > img').attr('data-url');

            window.open(url, '_blank');

            self.coremetrics('Element', self.cm, 'shop_this_page');
        });

        $('.desktop_button').on('click', function() {
            var tag; //set tag relevant to element (eg. parse the href attr and retain a unique portion, OR add a "data-cm" attr to each anchor and use it's value)

            self.coremetrics('Element', self.cm, 'shop_btn_' + tag);
        });
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

    //(req) CM business logic
    APP.coremetrics = function(tagType, categoryID, pageID) {
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
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID);
            } catch (e) {
                self.logErr('CoreM_err: ' + e);
            }

            self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
        }
    };

    //(req) custom logger for 'dev' environment
    APP.logErr = function(log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) window.console && console.info(log);
    };

    //(req) desktop & tablet auto-play HTML5 video
    APP.playHTML5Video = function(index) {
        var prevVideo = $('.desktop_header > div > div.bx-viewport > ul > li').eq(index-1).children('video').get(0),
            currentVideo = $('.desktop_header > div > div.bx-viewport > ul > li').eq(index).children('video').get(0),
            iscurrentBrightcove = $('.desktop_header > div > div.bx-viewport > ul > li').eq(index).hasClass('ht_desktop_brightcove_video'),
            isPrevBrightcove = $('.desktop_header > div > div.bx-viewport > ul > li').eq(index).children('object.BrightcoveExperience');

        if (typeof prevVideo !== 'undefined') prevVideo.pause();
        if (typeof BrightcoveVideoPlayer !== 'undefined') {
            if (iscurrentBrightcove) {
                BrightcoveVideoPlayer.play();
            } else {
                BrightcoveVideoPlayer.pause();
            }
        } 
        if (typeof currentVideo !== 'undefined') currentVideo.play();

        $('.desktop_header > div > div.bx-viewport > ul > li').eq(index).addClass('active');
    };

    //(opt) interact with the Brightcove video
    APP.playBrightcoveVideo = function () {
        var self = this;

        //PLAY btn listener
        $('.desktop_brightcove_video_play').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            var _self = this,
                videoMarkup = $(_self).siblings('.BrightcoveExperience');

            $(_self).remove();
            $(_self).parent().css('background-image', '');
            videoMarkup.css('display', 'block');
            videoMarkup.click();

            //CM - Element
            self.coremetrics('Element', self.cm, self.cm + '-brightcove-video_play');
        });
    };

/***********************************************/
/*                  TABLET CTRLS               */
/***********************************************/   
    //(opt: only for HTML5 video components) HTML5 video ctrl for tablet
    APP.autoPlayHTML5VideoTablet = function () {
        var video = $('.desktop_HTML5_video > video').get(0);
        
        //force video re-play automatically after 1s
        setTimeout(function(){
            $('body').one('touchstart load',function(){
                video.play();
            }).trigger('load');
        },1000);        
    };

    //(opt: only for Brightcove video components) replace Brightcove flash video with HTML5 video objects
    APP.dynamicBrightcoveVideoInsertTablet = function () {
        var self = this, 
            videoMarkup = '<video class="BrightcoveExperience tablet" width="100%" height="100%" src="" controls=""></video>';
        
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

            videoMarkup.css('display', 'block');

            video.play();

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
    }

    //(opt) hide shop all button on certain slides
    APP.hideShopAllBtn = function (index) {
        if ($.inArray( index, APP.hideShopAllSlideIndex ) > -1) {
            $('.desktop_shop_all_container').addClass('hidden');
        } else {
            $('.desktop_shop_all_container').removeClass('hidden');
        }
    }

/***********************************************/
/*                   BOOTSTRAP                 */
/***********************************************/ 
    $(window).load(function() {
        APP.slider = $('.bxslider').bxSlider({
            pager: false,
            preloadImages: 'visible',
            infiniteLoop: true,
            oneToOneTouch: false,
            useCSS: true,
            swipeThreshold: 80,
            onSlideAfter: function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
                var index = currentSlideHtmlObject + 1;

                $('.desktop_header > div > div.bx-viewport > ul > li.active, .dropdown .desktop_slidecontrollers_ctrl.active, .dropdown .desktop_slidecontrollers_ctrl.active').removeClass('active');
                $('.desktop_header > div > div.bx-viewport > ul > li').eq(index).addClass('active');
                $('.desktop_slidecontrollers > .dropdown > ul').slideUp('slow');                 

                APP.markActiveNavBtn(index);
                APP.playHTML5Video(index);
                APP.hideShopAllBtn(index);
            },
            onSliderLoad: function(currentIndex) {
                $('.desktop_header > div > div.bx-viewport > ul > li').eq(currentIndex + 1).addClass('active');
                $('.bx-clone').attr('id', '');

                APP.hotMedia();
            }
        });

        if (window.Detect({ useUA: true }) === 'desktop' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            //TABLET
            APP.autoPlayHTML5VideoTablet(); //---> add this when your app includes HTML5 video

            APP.dynamicBrightcoveVideoInsertTablet(); //---> add this when your app includes BRIGHTCOVE video
        } else {
            //DESKTOP
            APP.playBrightcoveVideo(); //---> add this when your app includes BRIGHTCOVE video

            //add hover state to the NAV menu items
            $('.desktop_main_container a, .desktop_socialshare_container li').on('mouseenter', function(){
                $(this).addClass('hover');
            }).on('mouseleave', function(){
                $(this).removeClass('hover');
            });  
        }

        APP.initDesktop();
    });

    return APP;

}(window, jQuery));