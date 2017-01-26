$(document).ready( function($) {

	'use strict';

    //$('body').removeClass('bl_trulyResponsive');

	var social = {
		facebookTitle: '100% Bloomingdale\'s | bloomingdales.com',
		facebookDescription: 'Exclusive Pieces Created Just for Us (and You)',
		facebookImageFileName: 'S17_Spring-Facebook.jpg',
		twitterTitle: 'The new 100% @bloomingdales collection is here—and it\'s full of standout pieces from their exclusive designer collaborations!  http://fashion.bloomingdales.com/2017-spring-campaign-100-percent-exclusive/',
		pinterestTitle: '100% Bloomingdale\'s | bloomingdales.com',
		pinterestImageFileName: 'S17_Spring-Pinterest.jpg',
		facebookURL: null,
		twitterURL: null,
		pinterestURL: null    
    };
	
	function socialSetup () {
        var baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/fashion/images/projects/2017-spring-campaign-100-percent-exclusive/';

        var facebookURL = 'https://www.facebook.com/dialog/feed';
        facebookURL += '?app_id=145634995501895';
        facebookURL += '&name=' + encodeURIComponent(social.facebookTitle);
        facebookURL += '&description=' + encodeURIComponent(social.facebookDescription);
        facebookURL += '&link=' + encodeURIComponent(baseURL);
        facebookURL += '&picture=' + encodeURIComponent(baseURLAssets + social.facebookImageFileName);
        facebookURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        var twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        twitterURL += encodeURIComponent(social.twitterTitle);

        var pinterestURL = 'http://pinterest.com/pin/create/button/?';
        pinterestURL += 'url=' + encodeURIComponent(baseURL);
        pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + social.pinterestImageFileName);
        pinterestURL += '&description=' + encodeURIComponent(social.pinterestTitle);

        $('.facebookLink').attr('href', facebookURL);
        $('.instagramLink').attr('href', "https://www.instagram.com/bloomingdales/");
        $('.pinterestLink').attr('href', pinterestURL);
        $('.twitterLink').attr('href', twitterURL);

    }

    window.lazySizesConfig = window.lazySizesConfig || {};
    lazySizesConfig.expand = 1000;
    
	//refresh page after each element is loaded to reset element height if needed.
	$(document).on('lazybeforeunveil', function(){
		$(window).trigger('resize');
	});

	var hasMBL = (isDevice() ? "mbl:" : "");
    $(document).foundation();

    // init global app namespace object
    window.Globals = {
        env: window.ENV_CONFIG || 'dev',
        deviceType: null,
        mobileOS: window.MOBILE_OS,
        Coremetrics: {
            pageID: null,
            catID: null,
            attr42: null
        }
    };

//===============================================================================================================//
//===============================================================================================================//

    $('.backToTop').on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, 700
        );
    });



    // $( window ).on( "scroll resize", function( ) {
    //     checkPlayOnceVideos();
    // });

    // function checkPlayOnceVideos() {
    //     $( ".play_once_videos" ).each( function() {
    //         if( !$(this).hasClass("played") ){
    //             if( $(this).isVisible() === true){
    //                 $(this)[0].play();
    //                 $(this).addClass("played");
    //             }else{
    //                 $(this)[0].pause();
    //             }
    //         }
    //     });
    // }

/*
        $(document).click(function(event) {
            $.fn.trace("whahah"+event.target+"   asdfasdf");

            // if (e.target.id !== 'spring17_topnav_women' && e.target.id !== 'spring17_topnav_men' && e.target.id !== 'spring17_topnav_home' && !$('#info').find(e.target).length  ) {
            //     $(".spring17_topnav_menucontent").children('ul').removeClass( "submenu_open" );
            // }
        });
*/
    
    $( window ).on( "load resize", function( ) {
        if( !isDevice() )$('#spring17_topnav').find('.spring17_topnav_active').find('.spring17_topnav_underline').addClass('spring17_topnav_underline_drawn');
        else $('#spring17_topnav').find('.spring17_topnav_active').find('.spring17_topnav_underline').removeClass('spring17_topnav_underline_drawn');
    });

	$( window ).load(function() {
        
        //$.fn.coreTag('Pageview', 'spring17_100percent-coming_soon' );

        $('#spring17_topnav_women, #spring17_topnav_men, #spring17_topnav_home').click(function() {
            $(this).siblings().find('ul').removeClass( "submenu_open" );
            $(this).find('ul').toggleClass( "submenu_open" );
        });

        $(".nav_hamburger").on('click', function(){
            $(this).toggleClass('nav_hamburger_open');
            $(this).parent().children('ul').toggleClass( 'mobile_menu_opened' );
            $(this).parent().find('.spring17_topnav_animated').removeClass( 'submenu_open' );       
        });

	    socialSetup();

	    $('[coremetricTag]').click(function() {
	        $.fn.coreTag('Element', $( this ).attr( "coremetricTag" ));
	    });

	    $('[linkURL]').click(function() {
            window.open($( this ).attr( "linkURL"), "_self");
	    });

        $('[linkURLblank]').click(function() {
            window.open( $( this ).attr( "linkURLblank"), "_blank");
        });

        $('[linkURL],[linkURLblank]').css({
            'cursor':'pointer'
        });

	});

    $.fn.coreTag = function(tagType, pageID) {
        
        var thisCategoryID = "spring17_100percent";

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL+pageID, hasMBL+thisCategoryID, '', '');        
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Pageview; thisCategoryID: ' +hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL+pageID.substring(0, 49), hasMBL+thisCategoryID);
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Element; thisCategoryID: ' +hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID.substring(0, 49));            
        }
    };

    $.fn.isVisible = function() {
        var rect = this[0].getBoundingClientRect();
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    $.fn.trace = function(log) {
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };
    
    $.fn.preload = function(thisSrc) {
        $('<img/>')[0].src = thisSrc;
    };

    $.fn.visible = function() {
        return this.css('visibility', 'visible');
    };

    $.fn.invisible = function() {
        return this.css('visibility', 'hidden');
    };

    function isDevice () {
        return ($("#spring17_topnav .logo").css("float") === "none" );
        //return 'ontouchstart' in window;
        //return ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)) )
        //return ( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
    }

    initCoreMetrics();

    function setEnvironment() {
        if (window.Globals.env === 'dev') {
            return cmSetTest(); // jshint ignore:line
        } else if (window.Globals.env === 'production') {
            if (window.location.host === 'fashion.bloomingdales.com'){
                return cmSetProduction(); // jshint ignore:line
            } else {
                return cmSetTest(); // jshint ignore:line
            }
        } else {
            throw 'ERROR: unidentified env variable';
        }
    }

    function pageName() {
        //return the last segment of the page URL to be used as an pageview CM id
        var path = window.location.pathname.split('/');
        return path[path.length - 2];
    }

    function initCoreMetrics(categoryID) {
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();
        
        var pageID = 'fashion_' + pageName(),
            catID = categoryID || 'xx-xx-xx-xx',
            attr = '';
        
        //populate the Globals ns
        window.Globals.Coremetrics.pageID = pageID;
        window.Globals.Coremetrics.catID = catID;

        if (window.BLOOMIES && window.BLOOMIES.coremetrics) {
            setEnvironment();

            if ($(window).width() < 980 && window.Globals.deviceType !== 'mobile'){
                attr = 'Desktop Minimized';
            } else {
                attr = '';
            }
            window.Globals.Coremetrics.attr42 = attr;
        }
    }
    
});
