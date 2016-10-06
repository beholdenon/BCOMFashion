require(['jquery', 'backbone'], function($, Backbone){
    'use strict';

    var namespace = {
        projectGlobalPrefix: 'hawaii_f15',
        environment: 'astra', //legacy || astra 
        environmentProjectFolder: 'cat_splash', // for a Legacy project, set this to the folder name which is created in the /specialProjects,
        // for an Astra project, set this to { homepage_pools || cat_splash }
        coremetrics: 'fall15_hawaii',
        views: {
            sectionInViewport: 'header'
        },
        state: {
            isDesktop: true
        },
        variables: {
            n: 0
        },
        socialShare:{
            facebookTitle: 'BLOOMINGADALE\'S ALA MOANA | WELCOME TO FASHION PARADISE',
            facebookDescription: 'Like no other store in the world, in a place like no other. At Bloomingdale\'s Ala Moana you will discover the most coveted fashion, beauty and accessory brands in a true style paradise. Catch all the excitement on November 12.',
            facebookImageFileName: 'F15-HAWAII_FBIcon.jpg',
            twitterTitle: 'Discover fashion paradise at Bloomingdale\'s Ala Moana bit.ly/hawaiiblm',
            pinterestTitle: 'BLOOMINGADALE\'S ALA MOANA | WELCOME TO FASHION PARADISE',
            pinterestImageFileName: 'F15-HAWAII_Pinterest.jpg'
        },
        urls: {
            pageURL: '/fashion-index/hawaii-ala-moana.jsp',
            baseURL: 'http://www.bloomingdales.com',
            serverURL: 'http://' + window.location.host,
            facebookShareURL: '',
            twitterShareURL: '',
            pinterestShareURL: '',
            weiboShareURL: 'http://weibo.com/bloomingdalesusa'
        },
        slider: {
            totalSlides: '',
            currentPos: '',
            nextPos: '',
            prevPos: '',
        },
        globals: {
            getCoremetricsAttributes: function ( attributes ) {
                var i, index, value, list;
                if ( typeof attributes === 'object' && attributes !== null ) {
                    list = [];
                    for ( index in attributes ) {
                        if (attributes.hasOwnProperty(index)) {
                            value = attributes[index];
                            index = +index - 1;
                            for (i = list.length; i < index; i++) {
                                list[i] = '';
                            }
                            list[index] = value;
                        }
                    }
                    return list.join('-_-');
                }
                return null;
            }
        }

    };

    var languageControl = {
        currentLang: 'en',
        cmDictionary: {
            en: '',
            eng: '',
            jp: 'japanese',
            cn: 'chinese',
            ko: 'korean'
        },
        name: {
            en: 'english',
            eng: 'english',
            jp: 'japanese',
            cn: 'chinese',
            ko: 'korean'
        }
    };

    $(window).load(function(){
        //detect device 
        var deviceDetected = window.Detect({ useUA: true }),
            ua = navigator.userAgent;
        if( deviceDetected === 'mobiledevice' || deviceDetected === 'smartphone' || ( deviceDetected === 'firefox' && ua.match('Mobile') )) {
            namespace.state.isDesktop = false;
            namespace.coremetrics = 'MBL:' + namespace.coremetrics;
            initMobile();
        }else{
            var isAndroid = ua.search(/\bAndroid\b/) !== -1;
            if (deviceDetected === 'tablet' || deviceDetected === 'ipad' || isAndroid ){
                // remove hover class on tablet
                $('#hawaii_f15_desktop_nav').removeClass('nav_desktop_hover_state');
            }
            initDesktop();
            removeLoader();
        }

        // listeners:

        $( 'li.languageOption' ).on( 'click', function ( ) {

            var langChoice = $(this).data('lang');
            var clickSource = 'dropdown-nav_';
            languageControl.currentLang = langChoice;
            try {
                localStorage.setItem( 'hawaii_15_languageChoice', langChoice );
            } catch (e) {
                console.log('Error trying to save data to the localStorage. If you are using Private Navigation this might be the reason. Error:', e);
            }

            switchLanguage(langChoice);
            hrouter.navigate(langChoice);
            if($( '#languageOverlay' ).is(':visible')) {
                $( '#languageOverlay' ).css({ 'display' : 'none' });
                $( 'body' ).removeClass('languageOverlayActive');
                clickSource = '';
            }

            /* jshint ignore:start */
            coreMetrics("Element",namespace.coremetrics, clickSource + 'language_' + languageControl.name[langChoice] );
            /* jshint ignore:end */
        });


        $( 'a.desktop-artwork-link, a.mobile-artwork-link' ).on( 'click', function (  ) {
            var attrCm = $(this).data('cm');
            if ( typeof attrCm === 'string' && attrCm.length > 0 ) {
                /* jshint ignore:start */
                BLOOMIES.coremetrics.cmCreatePageElementTag( attrCm, namespace.coremetrics + languageControl.cmDictionary[languageControl.currentLang]);
                /* jshint ignore:end */
            }
        });

        $('#'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a, a.project_link').on("click", function(event) {
            var hash = $(this).attr('href');
            hash = hash.substring(1, hash.length);
            console.log(hash);
            addressChange(event, hash);
        });

        /* jshint ignore:start */
        $('#'+ namespace.projectGlobalPrefix +'_desktop_back_to_top').on('click', function(){
            $("html, body").animate({ scrollTop: 0 }, "slow");
            coreMetrics("Element",namespace.coremetrics,"back_to_top");
        });
        $('#'+ namespace.projectGlobalPrefix +'_desktop_shop_all_collection').on('click', function(){
            coreMetrics("Element",namespace.coremetrics,"bottom_shop_all_collection");
        });
        $('#'+ namespace.projectGlobalPrefix +'_desktop_shop_all_featured').on('click', function(){
            coreMetrics("Element",namespace.coremetrics,"bottom_shop_all_featured");
        });
        $('#'+ namespace.projectGlobalPrefix +'_desktop_nav_shopall').on('click', function(){
            coreMetrics("Element",namespace.coremetrics,"shop_all_top");
        });

        $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container img').on('click', function(){
            if (isHotImages(this)){
                var hash = $(this).attr('data-url');
                window.open(hash, '_self');
                hash = hash.replace('http://www1.bloomingdales.com/shop/','');
                hash = hash.split('?')[0];
                hash = hash.substring(hash.indexOf("/") + 1);
                coreMetrics("Element",namespace.coremetrics,"shop_now_"+ hash +"-image");
            }
        });

        $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container img').on('click', function(){
            if (isHotImages(this)){
                var hash = $(this).attr('data-url');
                var cmTag = $(this).attr('data-cm');
                window.open(hash, '_self');
                // hash = hash.replace('http://m.bloomingdales.com/shop/','');
                // hash = hash.split('?')[0];
                // hash = hash.substring(hash.indexOf("/") + 1);
                coreMetrics("Element",namespace.coremetrics,"shop_now_"+ cmTag +"-image");
            }
        });
        $('#'+ namespace.projectGlobalPrefix +'_mobile_shop_all').on('click', function(){
            coreMetrics("Element",namespace.coremetrics,"shop_all_bottom");
        });
        $('#'+ namespace.projectGlobalPrefix +'_mobile_info_header > a').on('click', function(){
            coreMetrics("Element",namespace.coremetrics,"shop_all_top");
        });
        $('#'+ namespace.projectGlobalPrefix +'_mobile_back_to_top').on('click', function(){
            $("html, body").animate({ scrollTop: 0 }, "slow");
            coreMetrics("Element",namespace.coremetrics,"back_to_top");
        });


        // social share
        $('#'+ namespace.projectGlobalPrefix +'_desktop_socialshare_facebook').on('click', function(){
            window.open(namespace.urls.facebookShareURL, '_blank', 'width=608,height=342');
            coreMetrics('Element',namespace.coremetrics,'social-fb');
        });
        $('#'+ namespace.projectGlobalPrefix +'_desktop_socialshare_twitter').on('click', function(){
            window.open(namespace.urls.twitterShareURL, '_blank', 'width=740,height=340');
            coreMetrics('Element',namespace.coremetrics,'social-twitter');
        });
        $('#'+ namespace.projectGlobalPrefix +'_desktop_socialshare_weibo').on('click', function(){
            window.open(namespace.urls.weiboShareURL, '_blank');
            coreMetrics('Element',namespace.coremetrics,'social-weibo');
        });
        $('#'+ namespace.projectGlobalPrefix +'_desktop_socialshare_pinterest').on('click', function(){
            window.open(namespace.urls.pinterestShareURL, '_blank', 'width=770,height=380');
            coreMetrics('Element',namespace.coremetrics,'social-pinterest');
        });

        $('#'+ namespace.projectGlobalPrefix +'_mobile_socialshare_facebook').on('click', function(){
            window.open(namespace.urls.facebookShareURL, '_blank', 'width=608,height=342');
            coreMetrics('Element',namespace.coremetrics,'social-fb');
        });
        $('#'+ namespace.projectGlobalPrefix +'_mobile_socialshare_twitter').on('click', function(){
            window.open(namespace.urls.twitterShareURL, '_blank', 'width=740,height=340');
            coreMetrics('Element',namespace.coremetrics,'social-twitter');
        });
        $('#'+ namespace.projectGlobalPrefix +'_mobile_socialshare_pinterest').on('click', function(){
            window.open(namespace.urls.pinterestShareURL, '_blank', 'width=770,height=380');
            coreMetrics('Element',namespace.coremetrics,'social-pinterest');
        });
        /* jshint ignore:end */

        socialShare();
    });

    $(window).scroll(function(){
        if (namespace.state.isDesktop){
            stickyNav();
            desktopHeaderVisible();
            //  floatingGrasphic();
        } else {
            // mobileStickyFooter();
            // mobileSectionCoreMetrics();
        }
    });

    /* jshint ignore:start */
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    /* jshint ignore:end */

    function initDesktop(){
        stickyNav();
        deepLinks();
        languageChoiceChecker();

        $("img.lazy").show().lazyload({
            threshold : 200,
            effect : "fadeIn"
        });

        $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container').addClass('loaded');
        $('#'+ namespace.projectGlobalPrefix +'_desktop_header').addClass('active');

        /* jshint ignore:start */
        coreMetrics('Pageview',namespace.coremetrics, namespace.coremetrics + '--hp');
        /* jshint ignore:end */
    }

    function languageChoiceChecker(){
        if(!localStorage.getItem('hawaii_15_languageChoice')) {
            $( '#languageOverlay' ).css({ 'display' : 'block' });
            $( 'body' ).addClass('languageOverlayActive');
        } else {
            var langChoice = localStorage.getItem('hawaii_15_languageChoice');
            languageControl.currentLang = langChoice;
            switchLanguage(langChoice);
        }
    }

    function switchLanguage(langChoice){
        $( '.engContent, .jpContent, .cnContent, .koContent' ).css({ 'display' : 'none' });
        $( '.' + langChoice + 'Content' ).css({ 'display' : 'block' });
    }

    function removeLoader(){
        $('#'+ namespace.projectGlobalPrefix +'_desktop_loader').fadeOut('slow');
    }

    function desktopHeaderVisible(){
        return $('#'+ namespace.projectGlobalPrefix +'_desktop_header').is(':in-viewport') ? $('#'+ namespace.projectGlobalPrefix +'_desktop_header').addClass('active') : $('#'+ namespace.projectGlobalPrefix +'_desktop_header').removeClass('active');
    }

    function stickyNav(){
        if($(window).scrollTop() < ($('#'+ namespace.projectGlobalPrefix +'_desktop_nav_placeholder').offset().top)){
            $('#'+ namespace.projectGlobalPrefix +'_desktop_nav').css({
                'position':'relative',
                'margin-top': '-42px'
            });

            // updateHash('');
        }else{
            $('#'+ namespace.projectGlobalPrefix +'_desktop_nav').css({
                'top': 0,
                'position':'fixed',
                'margin-top': '0'
            });
        }
    }

    function addressChange(event, hash){
        event.preventDefault();
        $.address.value(hash + "/");
        goToSection(hash);
        /* jshint ignore:start */
        coreMetrics("Element",namespace.coremetrics,"top_nav_"+ hash);
        /* jshint ignore:end */
    }

    function goToSection(hash){

        var scrollPosition = hash === 'brands' ? $('#bl_main_lookbook_container').offset().top : $('#' + namespace.projectGlobalPrefix + '_desktop_nav_placeholder' ).offset().top;

        $('#hawaii_f15_desktop_landing').hide();
        $('#hawaii_f15_desktop_main_container').show();
        $('html, body').animate({ scrollTop: scrollPosition }, 500);
        $( '#' + namespace.projectGlobalPrefix + '_desktop_' + hash ).fadeIn().siblings().fadeOut();
        $( '#' + namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').removeClass('active');
        $( '.' + namespace.projectGlobalPrefix + '_desktop_nav_' + hash ).addClass('active');
        if ( hash !== '' ) {
            /* jshint ignore:start */
            coreMetrics("Pageview", namespace.coremetrics, namespace.coremetrics + "--" + hash);
            /* jshint ignore:end */
        }


    }

    function deepLinks(){
        var hash = $.address.value();
        if (hash !== '/'){
            hash = hash.substring(1, hash.length-1);
            goToSection(hash);
        }
    }

    /* jshint ignore:start */
    function isHotImages(elementID){
        var attr = $(elementID).attr('data-url');
        return (typeof attr !== typeof undefined && attr !== false && attr !== '#') ? true : false;
    }
    /* jshint ignore:end */

    function switchLanguageMobile ( opt ) {
        var clickSource = 'dropdown-nav_';
        $( '.enMobileContent, .jpMobileContent, .cnMobileContent, .koMobileContent' ).css({ 'display' : 'none' });
        $( '.' + opt + 'MobileContent' ).css({ 'display' : 'block' });
        languageControl.currentLang = opt;
        localStorage.setItem( 'mbl_hawaii_languageChoice', opt );
        if($( '#mobileLanguageOverlay' ).is(':visible')) {
            $( '#mobileLanguageOverlay' ).css({ 'display' : 'none' });
            $( 'body' ).removeClass('languageOverlayActive');
            clickSource = '';
        }
        /* jshint ignore:start */
        coreMetrics("Element",namespace.coremetrics, clickSource + 'language_' + languageControl.name[opt] );
        /* jshint ignore:end */
    }

    function initMobile(){

        var cont, arts, acts;

        // important!

        //loadMobileCSS( '/dyn_img/cat_splash/hawaii_f15_style-mobile.css' );

        // DEBUG ONLY
        // $( 'header, footer' ).remove();
        // $( '#bl_main_wrapper' ).css({ 'min-width' : '100%' });

        // mobile articles...
        /* jshint ignore:start */
        arts = {
            lnd: { isVisible: true, hndl: null }, // landing article (page)...
            cnt: { // content article (page)...
                isHidden: true,
                hndl: null,
                currSect: null,
                sects: {},
                nav: {
                    hndl: null,
                    dropdown: null,
                    flags: 0,
                    transitionend: function ( e ) {
                        var nav = arts.cnt.nav;
                        if ( ( nav.flags & 1 ) === 0 ) // lock bit needs to be enabled...
                            return;
                        if ( ( nav.flags & 2 ) === 0 ) // hides if no longer visible...
                        // nav.hndl.css( 'display', 'none' );
                        // nav.hndl.slideUp();
                        // unlock...
                            nav.flags ^= 1;
                    }
                }
            }
        };
        /* jshint ignore:end */

        // mobile actions...
        acts = {
            nop: function (  ) {
                // silence is golden...
            },
            content: function ( opt ) {
                var lnd = arts.lnd, cnt = arts.cnt;
                if ( lnd.isVisible && cnt.isHidden ) {
                    lnd.hndl.css( 'display', 'none' );
                    cnt.hndl.css( 'display', 'block' );
                    lnd.isVisible = false;
                    cnt.isHidden = false;
                }
                if ( opt in cnt.sects ) {
                    if ( cnt.currSect ) {
                        cnt.currSect.css( 'display', 'none' );
                        cnt.currSect = null;
                    }
                    cnt.currSect = cnt.sects[ opt ];
                    cnt.currSect.css( 'display', 'block' );
                    acts.nav( 'hide' );
                    // schedule page view tag...
                    /* jshint ignore:start */
                    window.setTimeout( function () {
                        var pageTag = "fall15_hawaii--" + opt.replace( /-+/g, '_' );
                        try {
                            coreMetrics( "Pageview", namespace.coremetrics, pageTag );
                        } catch ( e ) { /* silence is golden... */ }
                    }, 50 );
                    $( "html, body" ).animate( { scrollTop: cont.offset().top } );
                    /* jshint ignore:end */
                }
            },
            nav: function ( opt ) {
                if( opt === 'toggle' ) {
                    arts.cnt.nav.hndl.slideToggle();
                } else if( opt === 'hide' ) {
                    arts.cnt.nav.hndl.slideUp();
                }
            },
            landing: function ( ) {
                var lnd = arts.lnd, cnt = arts.cnt;
                if ( !lnd.isVisible && !cnt.isHidden ) {
                    lnd.hndl.css( 'display', 'block' );
                    cnt.hndl.css( 'display', 'none' );
                    lnd.isVisible = true;
                    cnt.isHidden = true;
                    cnt.currSect.css( 'display', 'none' );
                    cnt.currSect = null;
                }
                acts.nav( 'hide' );
            },
            language: switchLanguageMobile
        };

        // init root container...
        cont = $( '#hawaii_f15_mobile_main_container' );

        cont.on( 'click', 'a', function ( e ) {

            var a = $( this ),
                href = a.attr( 'href'),
                cm = a.attr( 'data-cm' ),
                actionGroup,
                action,
                match;

            if ( typeof cm === 'string' && cm.length > 0 ) {
                try {
                    /* jshint ignore:start */
                    coreMetrics( 'Element', namespace.coremetrics, cm );
                    /* jshint ignore:end */
                } catch ( e ) { /* silence is golden... */ }
            }

            if ( typeof href === 'string' && ( match = href.match( /#\/mobile\/([\w\-]+)\/([\w\-]*)/ ) ) !== null ) {
                e.preventDefault();
                e.stopPropagation();
                actionGroup = match[1];
                action = match[2];
                if ( actionGroup in acts ) {
                    acts[ actionGroup ].call( this, action );
                }
            }

        } );

        // init articles...
        arts.lnd.hndl = cont.find( 'article.landing' );
        arts.cnt.hndl = cont.find( 'article.content' ).css( 'display', 'none' );
        arts.cnt.hndl.find( 'section' ).each( function () {
            var sect = $( this );
            sect.css( 'display', 'none' );
            arts.cnt.sects[ sect.attr( 'class' ) ] = sect;
        } );
        arts.cnt.nav.hndl = cont.find( 'nav.flying' ).css( 'display', 'none' );
        // arts.cnt.nav.dropdown = arts.cnt.nav.hndl.find( 'div.dropdown' );
        // arts.cnt.nav.dropdown.on( 'transitionend webkitTransitionEnd', arts.cnt.nav.transitionend );

        // lazy loading of images...
        cont.find( "img.hawaii_f15-lazy" ).each( function () {
            var img = $( this ),
                src = img.attr( 'data-lazy' );
            img.removeAttr( 'data-lazy' );
            img.attr( 'src', src );
        } );

        /* jshint ignore:start */
        window.setTimeout( function() {
            $('#bl_main_lookbook_container').addClass(namespace.projectGlobalPrefix +'_mobile_main_container-bl_main_container_reset');
            $( '#hawaii_f15_desktop_main_container, #hawaii_f15_desktop_landing' ).hide();
            cont.addClass( 'loaded' ).show();
            removeLoader();
            mobileLanguageChoiceChecker();
            coreMetrics( "Pageview", namespace.coremetrics, "fall15_hawaii--hp" );
        }, 250);
        /* jshint ignore:end */

    }
    /* jshint ignore:start */
    function mobileLanguageChoiceChecker(){
        if(!localStorage.getItem('mbl_hawaii_languageChoice')) {
            $( '#mobileLanguageOverlay' ).css({ 'display' : 'block' });
            $( 'body' ).addClass('languageOverlayActive');
        } else {
            var langChoice = localStorage.getItem('mbl_hawaii_languageChoice');
            languageControl.currentLang = langChoice;
            $( '.enMobileContent, .jpMobileContent, .cnMobileContent, .koMobileContent' ).css({ 'display' : 'none' });
            $( '.' + langChoice + 'MobileContent' ).css({ 'display' : 'block' });

        }
    }

    function loadMobileCSS( href, before, media ){
        // ARGUMENTS EXPLAINED:
        // `href` is the URL for your CSS file.
        // `before` optionally defines the element we'll use as a reference for injecting our <link>
        // By default, `before` uses the first <script> element in the page.
        // However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
        // If so, pass a different reference element to the `before` argument and it'll insert before that instead
        // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
        var ss = window.document.createElement( "link" );
        var ref = before || window.document.getElementsByTagName( "script" )[ 0 ];
        var sheets = window.document.styleSheets;
        ss.rel = "stylesheet";
        ss.href = href;
        // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
        ss.media = "only x";
        // inject link
        ref.parentNode.insertBefore( ss, ref );
        // This function sets the link's media back to `all` so that the stylesheet applies once it loads
        // It is designed to poll until document.styleSheets includes the new sheet.
        function toggleMedia(){
            var defined;
            for( var i = 0; i < sheets.length; i++ ){
                if( sheets[ i ].href && sheets[ i ].href.indexOf( href ) > -1 ){
                    defined = true;
                }
            }
            if( defined ){
                ss.media = media || "all";
            }
            else {
                setTimeout( toggleMedia );
            }
        }
        toggleMedia();
        return ss;
    }

    function mobileStickyFooter(){
        if ($('.mvBloomMenuHeader').is(':in-viewport')){
            $('#'+ namespace.projectGlobalPrefix +'_mobile_back_to_top_container').css({
                'position': 'relative',
                'bottom': '215px'
            });
        } else {
            $('#'+ namespace.projectGlobalPrefix +'_mobile_back_to_top_container').css({
                'position': 'fixed',
                'bottom': 0
            });
        }
    }
    function mobileSectionCoreMetrics(){
        var sectionsInViewport = [];

        category_name = category_name + languageControl.cmDictionary[languageControl.currentLang];

        $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section:in-viewport').each(function(){
            var hash = $(this).attr('id');
            hash = hash.replace(namespace.projectGlobalPrefix +'_mobile_','');
            sectionsInViewport.push(hash);
        });

        if (sectionsInViewport.length === 1){
            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section').removeClass('active');
            $('#'+ namespace.projectGlobalPrefix +'_mobile_'+ sectionsInViewport[0]).addClass('active');

            if (namespace.views.sectionInViewport !== sectionsInViewport[0]){
                namespace.views.sectionInViewport = sectionsInViewport[0];
                coreMetrics('Pageview', namespace.coremetrics, namespace.coremetrics+ '-section-'+ namespace.views.sectionInViewport);
            }
        } else if (sectionsInViewport.length === 2){
            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section').removeClass('active');

            $('#'+ namespace.projectGlobalPrefix +'_mobile_main_container section').each(function(){
                var el = $(this).attr('id');
                if (el.indexOf(namespace.views.sectionInViewport) > -1){
                    $('#'+ namespace.projectGlobalPrefix +'_mobile_'+ el).addClass('active');
                }
            });
        }
    }
    function coreMetrics(tag_type, category_name, tag_value){
        category_name = category_name + languageControl.cmDictionary[languageControl.currentLang];
        if(tag_type=="Pageview"){
            try {
                BLOOMIES.coremetrics.cmCreatePageviewTag(tag_value, category_name);
            } catch (e) {
                trace("Coremetrics Library Not Found..." + e);
            }
            trace("{{{{{{{{ Pageview- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
        }else if(tag_type=="Element"){
            try {
                BLOOMIES.coremetrics.cmCreatePageElementTag(tag_value, category_name);
            } catch (e) {
                trace("Coremetrics Library Not Found... " + e);
            }

            trace("{{{{{{{{ Element- category_name: "+category_name+" tag_value: "+tag_value+" }}}}}}}}");
        }
    }
    /* jshint ignore:end */

    function trace(logString){
        if (window.location.href.indexOf('bloomingdales.com') < 0) {
            console.info(logString);
        }
    }

    function socialShare(){
        var baseURL = null;

        try {
            if (namespace.urls.serverURL.indexOf('.fds.com') !== -1){
                baseURL = namespace.urls.serverURL;
            } else {
                baseURL = namespace.urls.baseURL;
            }
        } catch (e) {
            trace('Social share issue: ' + e);
        }

        var pageURL = namespace.urls.pageURL;
        pageURL = pageURL.substr(pageURL.lastIndexOf('/'));
        pageURL = pageURL.slice(0,-4);
        var baseURLAssets;
        try {
            if (namespace.environment === 'legacy'){
                baseURLAssets = 'http://assets.'+ (window.location.host).replace('mdev1.','') +'/web20/assets/img/specialProjects/'+ namespace.environmentProjectFolder +'/';
            } else if (namespace.environment === 'astra'){
                baseURLAssets = 'http://'+ (window.location.host).replace('mdev1.','') +'/dyn_img/cat_splash/';
            }
        } catch (e) {
            trace('Social share issue: ' + e);
        }

        namespace.urls.pageURL = baseURL + namespace.urls.pageURL;

        namespace.urls.facebookShareURL = 'https://www.facebook.com/dialog/feed';
        namespace.urls.facebookShareURL += '?app_id=145634995501895';
        namespace.urls.facebookShareURL += '&name=' + encodeURIComponent(namespace.socialShare.facebookTitle);
        namespace.urls.facebookShareURL += '&description=' + encodeURIComponent(namespace.socialShare.facebookDescription);
        namespace.urls.facebookShareURL += '&link=' + encodeURIComponent(namespace.urls.pageURL);
        namespace.urls.facebookShareURL += '&picture=' + encodeURIComponent(baseURLAssets + namespace.socialShare.facebookImageFileName);
        namespace.urls.facebookShareURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        namespace.urls.twitterShareURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        namespace.urls.twitterShareURL += encodeURIComponent(namespace.socialShare.twitterTitle);

        namespace.urls.pinterestShareURL = 'http://pinterest.com/pin/create/button/?';
        namespace.urls.pinterestShareURL += 'url=' + encodeURIComponent(namespace.urls.pageURL);
        namespace.urls.pinterestShareURL += '&media=' + encodeURIComponent(baseURLAssets + namespace.socialShare.pinterestImageFileName);
        namespace.urls.pinterestShareURL += '&description=' + encodeURIComponent(namespace.socialShare.pinterestTitle);
    }

/*    var timer;
    var currentHash;*/

/*    function getHash() {
        var hash = window.location.hash;
        if ( typeof hash !== 'string' ) {
            hash = '';
        }
        if ( hash.indexOf('#') === 0 ) {
            hash = hash.substring(1);
        }
        return hash;
    }*/

/*    function hashUpdater() {
        var hash = getHash();
        if ( hash !== currentHash && namespace.state.isDesktop ) {
            window.location.hash = currentHash === '' ? '#/' : '#/' + currentHash + '/';
            if ( currentHash !== '' ) {
                coreMetrics("Pageview", namespace.coremetrics, namespace.coremetrics + "--" + currentHash);
            }
        }
        timer = void 0;
    }*/

/*    function updateHash(newHash) {
        if ( currentHash !== newHash ) {
            currentHash = newHash;
            if ( typeof timer !== 'undefined' ) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(hashUpdater, 500);
        }
    }*/

/*    function removeActiveNavBtn(){
        return $('.'+ namespace.projectGlobalPrefix +'_desktop_nav > ul > li > a').removeClass('active');
    }*/

/*    function hotImages(){
        // for each image check if it has attached a data-url attr to switch to pointer cursor
        $('#'+ namespace.projectGlobalPrefix +'_desktop_main_container img').each(function(){
            var attr = $(this).attr('data-url');

            if (typeof attr !== typeof undefined && attr !== false && attr !== '#'){
                $(this).css('cursor','pointer');
                addImageID(this);
            }
        });
    }*/




    /* Start Deep Links functionality */
    var HRouter = Backbone.Router.extend({

        routes: {
            "*actions": "defaultAction"
        },
        defaultAction: function(lang){

            var aliases = {
              en    : 'eng',
              japan : 'jp',
              china : 'ch',
              korea : 'ko'
            };

            if (aliases[lang]){
                lang = aliases[lang];
            }

            var savedLang = localStorage.getItem('hawaii_15_languageChoice');
            console.log('lang = ', lang, savedLang);

            if (typeof languageControl.name[lang] === 'undefined'){
                lang = '';
            }
            if (! lang || lang === null){
                lang = '';
            }
            if (!savedLang && !lang){
                return languageChoiceChecker();
            }
            if (!lang){
                lang = savedLang;
            }
            languageControl.currentLang = lang;

            var ok = true;
            try {
                localStorage.setItem( 'hawaii_15_languageChoice', lang );
                localStorage.setItem( 'mbl_hawaii_languageChoice', lang );
            } catch (e) {
                console.log('Error trying to save data to the localStorage. If you are using Private Navigation this might be the reason. Error:', e);
                ok = false;
            }
            if (! ok) {
                switchLanguage(lang);
                switchLanguageMobile(lang);
            }
        }
    });

    var hrouter = new HRouter();

    // this is just to shut jshint up
    $.noop(hrouter);

    Backbone.history.start({
        root: '/landing-page/hawaii-ala-moana/',
        pushState: true
    });
    /* End Deep Links functionality */

    /*    function decodeHtmlEntity(str) {
     return str.replace(/&#(\d+);/g, function(match, dec) {
     return String.fromCharCode(dec);
     });
     }

     function encodeHtmlEntity(str) {
     var buf = [];
     for (var i=str.length-1;i>=0;i--) {
     buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
     }
     return buf.join('');
     }
     */
    /*
     function addImageID(elementID){
     var attr = $(elementID).attr('src');

     if (attr.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
     return $(elementID).attr('id', attr.substr(attr.lastIndexOf('/') + 1).slice(0,-4));
     } else {
     attr = $(elementID).attr('data-original');
     return $(elementID).attr('id', attr.substr(attr.lastIndexOf('/') + 1).slice(0,-4));
     }
     }

     function floatingGrasphic () {
     if ($('#hawaii_f15_desktop_back_to_top').is(':in-viewport')){
     $('#hawaii_f15_desktop_floating_graphic').css('top','30%');
     } else {
     $('#hawaii_f15_desktop_floating_graphic').css('top','50%');
     }
     }
     */



    // Export
    //window.hawaii_f15 = namespace.globals;

});
