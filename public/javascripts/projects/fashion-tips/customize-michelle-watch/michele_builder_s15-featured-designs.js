'use strict';
/*jshint camelcase:false */

window.blmwbs15 = window.blmwbs15 || {};

window.blmwbs15.featuredDesigns = ( function bl_mwbs15_featuredDesigns( window, document,  $ ) {

    var app = {
        flags: {
            initialized: false,
            loading: false,
            loaded: false
        },
        builder: window.blmwbs15.builder,
        actions: {},
        cache: {},
        data: [
            { head: "1153766", strap: "948485"  },
            { head: "1277617", strap: "1170714" },
            { head: "1065223", strap: "483603"  },
            { head: "1130542", strap: "1124439" },
            { head: "483610",  strap: "1124426" }
        ]
    };

    /*
     * Constructors
     */

    function Item( id ) {
        this.id = id;
        this.upcId = null;
        this.name = null;
        this.priceBig = null;
        this.priceNet = null;
        this.price = 0;
        this.isChecked = true;
        this.isAvailable = false;
    }

    function PriceParser() {

        // private properties...
        this.regexPriceBigWithText = /<span>([^<]+)<\/span><span\s+class="priceBig">([^<]+)<\/span>/; // NO g
        this.regexPriceBig = /<span\s+class="priceBig">([^<]+)<\/span>/; // NO g
        this.regexPriceSale = /<span\s+class="priceSale">([^<]+)<\/span>/; // NO g

        // public properties...
        this.priceBig = null;
        this.priceNet = null;

    }

    PriceParser.prototype.parse = function ( text ) {

        var match;

        // reset...
        this.priceBig = null;
        this.priceNet = null;

        // match regular expresions...
        if ( ( match = this.regexPriceBigWithText.exec( text ) ) !== null ) {
            this.priceBig = match[1] + match[2];
            if ( ( match = this.regexPriceSale.exec( text ) ) !== null ) {
                this.priceNet = match[1];
            }
            return true;
        } else if ( ( match = this.regexPriceBig.exec( text ) ) !== null ) {
            this.priceBig = match[1];
            return true;
        }

        return false;

    };

    /*
     * Actions
     */

    app.actions.show = function ( ) {

        if ( !app.flags.loaded && !app.flags.loading ) {
            app.load();
        }

        app.render();

        // set selected tab...
        window.blmwbs15.main.selected = 'featured-designs';

    };

    app.actions.checkboxes = function ( frags) {

        var id,
            tag,
            jObj,
            jObjParent,
            item,
            total = 0,
            type = frags[0],
            i = +frags[1],
            slideItem = app.data[i - 1];

        if ( slideItem && type in slideItem ) {

            // find item...
            item = slideItem[type];
            item.isChecked = !item.isChecked;

            // prepare coremetrics information...
            id = item.id;
            tag = ( type === 'head' ) ? 'Watch' : 'Band';

            // update view...
            jObjParent = $( '#blmwbs15_featured_slide_' + i + ' > div.blmwbs15_featured_description' );
            jObj = jObjParent.children( 'div.blmwbs15_featured_' + ( type === 'head' ? 'face' : 'strap' ) );
            if ( item.isChecked ) {
                jObj.removeClass( 'disabled' );
                jObj.children( 'a.blmwbs15_checkbox' ).addClass( 'checked' );
                tag = 'Select-' + tag;
            } else {
                jObj.addClass( 'disabled' );
                jObj.children( 'a.blmwbs15_checkbox' ).removeClass( 'checked' );
                tag = 'Remove-' + tag;
            }

            for ( type in slideItem ) {
                if (slideItem.hasOwnProperty(type)) {
                    item = slideItem[type];
                    if (item.isAvailable && item.isChecked) {
                        total += item.price;
                    }
                }
            }

            // set new total
            jObjParent.find('div.blmwbs15_featured_totalprice > span').text( app.builder.utils.moneyFormat( total ) );

            // coremetrics...
            app.builder.utils.coremetrics( 'element', tag, { '29': id } );

        }

    };

    app.actions.edit = function ( frags ) {

        var head,
            strap,
            filter,
            message = 'This combination is currently unavailable on builder... Please try again later.',
            builder = app.builder,
            slide = app.data[+frags[0] - 1],
            item = slide ? slide.head : null;

        if ( item && item.isAvailable && item.id in builder.domain.heads.map ) {

            // get head and check if it's available on builder...
            head = builder.domain.heads.map[ item.id ];
            if ( !head.isOK ) {
                builder.routines.runtime.displayErrorMessage( message, '#/featured-designs/acknowledge' );
                return;
            }
            if ( !head.upcId ) {
                head.upcId = item.upcId;
            }

            // first: clean up!
            // reset all filters...
            filter = builder.domain.straps.getFilter( builder.consts.facetNameColor );
            if ( filter ) {
                filter.restoreSavedOptions();
            }
            builder.domain.heads.clearFilters();
            builder.domain.straps.clearFilters();
            // reset original heads list and request view render...
            builder.domain.heads.restoreOriginalList();
            builder.views.heads.render();

            // schedule head selection...
            app.builder.utils.schedule( app.builder.routines.runtime, 'doSelectHead', head );

            // attempt to select strap...
            item = slide.strap;
            if ( item.isAvailable ) {
                if ( item.id in builder.domain.straps.map ) {
                    strap = builder.domain.straps.map[ item.id ];
                    if ( !strap.upcId ) {
                        strap.upcId = item.upcId;
                    }
                } else {
                    builder.domain.straps.add( item.id );
                    strap = builder.domain.straps.map[ item.id ];
                    strap.setName( item.name );
                    strap.price = item.price;
                    strap.priceBig = item.priceBig;
                    strap.priceNet = item.priceNet;
                    strap.upcId = item.upcId;
                    strap.isOK = strap.isValid();
                }
                if ( strap.isOK ) {
                    app.builder.utils.schedule( app.builder.routines.runtime, 'doSelectStrap', strap );
                }
            }

            // switch to builder
            app.builder.utils.schedule( app.builder.control.actions, 'show' );

        }

    };

    app.actions.add = function ( frags ) {

        var type,
            item,
            context,
            slide = app.data[+frags[0] - 1];

        if ( slide ) {
            // block ui...
            app.builder.routines.runtime.setBlockedState( true, true );
            // prepare add to bag context...
            context = { head: null, strap: null };
            for ( type in slide ) {
                if ( type in context ) {
                    item = slide[type];
                    if ( item.isAvailable && item.isChecked ) {
                        context[type] = item;
                    }
                }
            }
            ( app.getQueue() ).next(
                app.builder.routines.runtime.tryAddingToBag,
                context,
                app.addToBagSuccess,
                app.addToBagError
            );
        }

    };

    app.actions.acknowledge = function ( ) {

        app.builder.routines.runtime.setBlockedState( false );

    };

    /*
     * Utils
     */

    app.priceParser = new PriceParser();

    app.getQueue = function () {
        var q = app.cache.queue;
        if ( !q ) {
            q = new app.builder.utils.Queue();
            app.cache.queue = q;
        }
        return q;
    };

    app.isShowing = function () {
        return window.blmwbs15.main.selected === 'featured-designs';
    };

    app.addToBagError = function ( data ) {

        var message = typeof data === 'string' ? data : 'Error adding products to bag... Please try again later.';

        app.builder.routines.runtime.displayErrorMessage( message, '#/featured-designs/acknowledge' );

        // coremetrics...
        app.builder.utils.coremetrics( 'element', 'error-featured-designs', { '32': message } );

    };

    app.addToBagSuccess = function ( data ) {

        app.builder.routines.runtime.setBlockedState( true, false );
        $( '#blmwbs15_featured_a2b_confirmation' ).show();

        // coremetrics...
        if ( data.head ) {
            app.builder.utils.coremetrics( 'shop', null, {
                id: data.head.id,
                name: data.head.name,
                quantity: 1,
                price: app.builder.utils.moneyFormat( data.head.price )
            } );
        }
        if ( data.strap ) {
            app.builder.utils.coremetrics( 'shop', null, {
                id: data.strap.id,
                name: data.strap.name,
                quantity: 1,
                price: app.builder.utils.moneyFormat( data.strap.price )
            } );
        }

    };

    app.loadError = function ( data ) {
        app.builder.utils.log( 'FEATURED/LOADERROR:' );
        app.builder.utils.log( data );
    };

    app.loadDone = function ( qData, qCallback ) {
        app.flags.loading = false;
        app.flags.loaded = true;
        if ( !app.flags.initialized && app.isShowing() ) {
            app.init();
        }
        qCallback( true, null );
    };

    app.loadItem = function ( qData, qCallback ) {
        app.builder.routines.getProductInfo( {
            id: qData.id,
            callback: function () {
                var price,
                    available,
                    nonDigitRegex = /\D+/g,
                    parser = app.priceParser,
                    isOK = false;

                if ( this.isOK ) {
                    try {
                        available = this.response.upcmap && this.response.upcmap.length > 0 ? this.response.upcmap[0].isAvailable : false;
                        if ( typeof available !== 'boolean' ) {
                            available = ( available === 'true' );
                        }
                        if ( available ) {
                            qData.upcId = this.response.upcmap[0].upcID ? this.response.upcmap[0].upcID + '' : null;
                            qData.name = this.response.memberProductName.replace( /^\s*michele\s*/i, '' );
                            if ( !parser.parse( this.response.memberProductPrice ) ) {
                                throw 'Pricing data could not be found...';
                            }
                            qData.priceBig = parser.priceBig;
                            qData.priceNet = parser.priceNet;
                            price = qData.priceNet || qData.priceBig;
                            qData.price = +( price.replace( nonDigitRegex, '' ) );
                            qData.isAvailable = typeof qData.upcId === 'string' && typeof qData.name === 'string' && qData.name.length > 0 && qData.price > 0;
                        }
                        isOK = true;
                    } catch ( e ) {
                        this.error = e;
                    }
                }
                qCallback( isOK, isOK ? null : this );
            }
        } );
    };

    app.load = function () {

        var i,
            length,
            slideItem,
            item,
            q;

        if ( app.flags.loading || app.flags.loaded ) {
            return;
        }

        // set loading flag...
        app.flags.loading = true;

        // initialize featured content queue...
        q = app.getQueue();

        // enqueue quick peek requests...
        for ( i = 0, length = app.data.length; i < length; i++ ) {
            slideItem = app.data[i];
            slideItem.head = new Item( slideItem.head );
            slideItem.strap = new Item( slideItem.strap );
            for ( item in slideItem ) {
                if (slideItem.hasOwnProperty(item)) {
                    q.next(
                        app.loadItem,
                        slideItem[item],
                        null,
                        app.loadError
                    );
                }
            }
        }

        // enqueue done handler...
        q.next(
            app.loadDone,
            null,
            null,
            null
        );

        app.builder.utils.log( 'FEATURED/LOAD/: LOADING...' );

    };

    app.render = function () {

        var hash = '/featured-designs',
            intro = $( '#blmwbs15_intro' );

        $( '#blmwbs15_tabs > a' ).removeClass( 'selected' );
        $( '#blmwbs15_tab_featured' ).addClass( 'selected' );
        $( '#blmwbs15_builder' ).hide();
        $( '#blmwbs15_featured' ).show();
        $( '#blmwbs15_contents, #blmwbs15_bar' ).show();

        if ( app.flags.loaded && !app.flags.initialized ) {
            app.init();
        }

        // change hash...
        if ( intro.is( ':visible' ) ) {
            intro.fadeOut( 500, function () {
                window.location.hash = hash;
            } );
        } else {
            window.location.hash = hash;
        }

    };

    app.init = function () {

        var slider = $('#blmwbs15_featured ul.bxslider').bxSlider({
            pager: false,
            preloadImages: 'visible',
            oneToOneTouch: false,
            useCSS: true,
            swipeThreshold: 80,
            onSlideBefore: onSlideBefore,
            onSlideAfter: onSlideAfter,
            onSlideNext: onSliderSwipeRight,
            onSlidePrev: onSliderSwipeLeft,
            onSliderLoad: onSliderLoad
        });

        function onSliderSwipeRight() {
            app.builder.utils.coremetrics( 'element', 'Right-Arrow' );
        }

        function onSliderSwipeLeft() {
            app.builder.utils.coremetrics( 'element', 'Left-Arrow' );
        }

        function onSliderLoad() {

            var i, length, slide, strap, head, total;

            for ( i = 0, length = app.data.length; i < length; i++ ) {

                head = app.data[i].head;
                strap = app.data[i].strap;

                slide = $( '#blmwbs15_featured ul.bxslider > li#blmwbs15_featured_slide_' + ( i + 1 ) + ' > div.blmwbs15_featured_description' );

                if ( head.isAvailable ) {
                    slide.find( 'div.blmwbs15_featured_face > span.blmwbs15_item_name' ).html( head.name );
                    slide.find( 'div.blmwbs15_featured_face > span.blmwbs15_item_price').text( head.priceBig );
                    if ( head.priceNet ) {
                        slide.find( 'div.blmwbs15_featured_face > span.blmwbs15_item_price')
                            .append( '<span> ' + head.priceNet + '</span>' );
                    }
                } else {
                    slide.find( 'a.blmwbs15_button.blmwbs15_featured_edit' ).remove();
                    slide.find( 'a.blmwbs15_button.blmwbs15_featured_add' ).remove();
                    slide.find( 'div.blmwbs15_featured_totalprice' ).remove();
                    slide.find( 'div.blmwbs15_featured_face' ).html( '' ).css( 'padding', '0' );
                }

                if ( strap.isAvailable ) {
                    slide.find( 'div.blmwbs15_featured_strap > span.blmwbs15_item_name' ).html( strap.name );
                    slide.find( 'div.blmwbs15_featured_strap > span.blmwbs15_item_price' ).text( strap.priceBig + '' );
                    if ( strap.priceNet ) {
                        slide.find( 'div.blmwbs15_featured_strap > span.blmwbs15_item_price' ).append( '<span> ' + strap.priceNet + '</span>' );
                    }
                } else {
                    slide.find( 'div.blmwbs15_featured_strap' ).remove();
                }

                if ( !head.isAvailable && !strap.isAvailable ) {
                    slide.find( 'div.blmwbs15_featured_strap, div.blmwbs15_featured_totalprice, a.blmwbs15_button.blmwbs15_featured_edit, a.blmwbs15_button.blmwbs15_featured_add' ).remove();
                    slide.find( 'div.blmwbs15_featured_face' ).html( '<span class="blmwbs15_featured_unavailable">Unfortunately, styles shown are<br/>no longer available.</span>' );
                } else {
                    total = ( head.isAvailable ? head.price : 0 ) + ( strap.isAvailable ? strap.price : 0 );
                    slide.find( 'div.blmwbs15_featured_totalprice > span' ).text( app.builder.utils.moneyFormat( total ) );
                }

            }

            app.builder.utils.coremetrics( 'page', 'featured-designs-1' );

        }

        function onSlideBefore() {
            var index = slider.getCurrentSlide() + 1;
            $( '#blmwbs15_featured_slide_' + index + ' > div.blmwbs15_featured_description' ).hide();
        }

        function onSlideAfter() {
            var index = slider.getCurrentSlide() + 1;
            $( '#blmwbs15_featured_slide_' + index + ' > div.blmwbs15_featured_description' ).fadeIn('slow');
            app.builder.utils.coremetrics( 'page', 'featured-designs-' + index );
        }

        // hide loader...
        $('#blmwbs15_featured ul.bxslider').css( 'visibility', 'visible' );
        $('#blmwbs15_featured_loader').hide();

        // fade first description in...
        $( '#blmwbs15_featured_slide_1 > div.blmwbs15_featured_description' ).fadeIn('slow');

        app.flags.initialized = true;

    };

    return app;

} )( window, window.document, jQuery );