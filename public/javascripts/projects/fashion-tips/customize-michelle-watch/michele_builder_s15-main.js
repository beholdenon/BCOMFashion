'use strict';
/*jshint camelcase:false */

window.blmwbs15 = window.blmwbs15 || {};

window.blmwbs15.main = ( function bl_mwbs15_main( window, document,  $ ) {

    var app = {
        selected: null,
        routes: {
            'builder': window.blmwbs15.builder.control.actions,
            'featured-designs': window.blmwbs15.featuredDesigns.actions,
            sharing: function ( fragments ) {
                var url, sharing = app.cache.sharing;
                if ( !sharing ) {
                    sharing = app.getSharingLinks();
                    app.cache.sharing = sharing;
                }
                url = sharing[fragments[0]];
                if ( url ) {
                    window.open( url );
                    // app.utils.log( url );
                }
            }
        },
        cache: {}
    };

    app.init = function () {

        $( '#blmwbs15_intro' ).show();

        // intro
        if ( document.getElementById( 'blmwbs15_ie8only' ) ) {
            // IE 8 or earlier
            $( '#blmwbs15_intro_ie8' ).show();
            window.blmwbs15.builder.utils.coremetrics( 'page', 'error-ie8' );
        } else {
            $( '#blmwbs15_intro_main' ).show();
            window.blmwbs15.builder.utils.coremetrics( 'page', 'hp' );
            // initialize builder...
            window.blmwbs15.builder.start();
        }

        $( '#blmwbs15_intro_loader' ).fadeOut( 400 );


    };

    app.router = function ( route ) {

        var frags,
            action,
            actions = app.routes;

        frags = route.split('/');
        while ( ( action = frags.shift() ) && ( action = actions[action] ) ) {
            if ( typeof action !== 'object' ) {
                break;
            }
            actions = action;
        }
        if ( typeof action === 'function' ) {
            action( frags, route );
            return true;
        }

        return false;

    };

    app.listener = function ( event ) {

        var self = $( event.target ),
            href = self.attr( 'href' ),
            dataCm = self.attr( 'data-cm' ),
            match;

        // handle coremetrics...
        if ( typeof dataCm === 'string' && dataCm.length > 0 ) {
            window.blmwbs15.builder.utils.coremetrics( 'element', dataCm );
        }

        if ( typeof href === 'string' && ( match = href.match( /#((?:\/[\w\-]+)+)\/?$/ ) ) !== null ) {
            if ( app.router( match[1].substring(1) ) ) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

    };

    app.dismissBlocker = function ( event ) {

        var jObj;

        if ( event.target === this ) {
            // @todo check if any overlay is visible...
            jObj = app.cache.fullUIBlockerOverlays;
            if ( !jObj ) {
                jObj = $( '#blmwbs15_full_uiblocker > div.blmwbs15_overlay' );
                app.cache.fullUIBlockerOverlays = jObj;
            }
            if ( jObj.is( ':visible' ) ) {
                window.blmwbs15.builder.routines.runtime.setBlockedState( false );
            }
        }

    };

    app.dismissAll = function (  ) {

        var displayView;

        try {
            // help view...
            displayView = window.blmwbs15.builder.views.display;
            if ( displayView.isHelpOverImage() ) {
                displayView.toggleHelp();
            }
            // help view...
            displayView = window.blmwbs15.builder.views.menu;
            displayView.close();
        } catch ( e ) { /* silence is golden... */ }

    };

    app.tabletCentralization = function () {

        var top;

        try {

            if ( window.orientation === 90 || window.orientation === -90 || window.matchMedia("(orientation: landscape)").matches ) {
                top = $( '#globalNavigation, #globalNavigation #mainNav' ).offset().top;
                $( 'body, html' ).animate( {
                    scrollTop: top
                }, 500 );
            }

        } catch ( e ) { /* silence is golden... */ }

    };

    app.getSharingLinks = function () {

        var pageUrl = '/fashion-index/michele-watch-builder.jsp',
            mediaUrl = '/dyn_img/cat_splash',
            productionUrl = 'http://www.bloomingdales.com',
            serverURL = 'http://' + window.location.host,
            assetsHost = window.assetsServer || productionUrl,
            links = {
                facebook: '',
                pinterest: '',
                twitter: ''
            };

        // adjust pageUrl and mediaUrl
        pageUrl = ( serverURL.indexOf('.fds.com') !== -1 ? serverURL : productionUrl ) + pageUrl;
        mediaUrl = assetsHost + mediaUrl;

        // facebook
        links.facebook += 'https://www.facebook.com/dialog/feed';
        links.facebook += '?app_id=145634995501895';
        links.facebook += '&name=' + window.encodeURIComponent( 'MICHELE: MIX. MATCH. MAKE TIME. | bloomingdales.com' );
        links.facebook += '&description=' + window.encodeURIComponent( 'Dazzling dials. Striking straps. And everything in between. Customize a statement timepiece with our new tool.' );
        links.facebook += '&link=' + window.encodeURIComponent( pageUrl );
        links.facebook += '&picture=' + window.encodeURIComponent( mediaUrl + '/michele_builder_s15-facebook.jpg' );
        links.facebook += '&redirect_uri=' + window.encodeURIComponent( 'https://www.facebook.com/' );

        // pinterest
        links.pinterest += 'http://pinterest.com/pin/create/button/';
        links.pinterest += '?url=' + window.encodeURIComponent( pageUrl );
        links.pinterest += '&description=' + window.encodeURIComponent( 'MICHELE MIX & MATCH TOOL | bloomingdales.com' );
        links.pinterest += '&media=' + window.encodeURIComponent( mediaUrl + '/michele_builder_s15-pinterest.jpg' );

        // twitter
        links.twitter += 'http://twitter.com/intent/tweet?source=webclient&text=';
        links.twitter += window.encodeURIComponent( 'Talk about you-time: Create your own watch with our MICHELE Mix & Match Tool @bloomingdales. http://bit.ly/1IKteb9' );

        return links;

    };

    /*
     * Bootstrap
     */

    $( document ).ready( function () {


        if ($('.bl_mobile').length > 0) {
            window.blmwbs15.mobile.start();
        } else {
            if ( $('.bl_tablet').length > 0) {
                try {
                    window.addEventListener( 'orientationchange', app.tabletCentralization, false);
                    $( window ).on( 'load',  app.tabletCentralization );
                } catch ( e ) { /* silence is golden... */ }
            }
            app.init();
        }
        // setup buttons listener
        $( '#blmwbs15_window' ).on( 'click', 'a.blmwbs15_button', null, app.listener );

        // setup buttons listener
        $( '#blmwbs15_full_uiblocker' ).on( 'click', null, null, app.dismissBlocker );

        // setup hide help handler
        $( document.body ).on( 'click', null, null, app.dismissAll );

    } );

    return app;

} )( window, window.document, jQuery );