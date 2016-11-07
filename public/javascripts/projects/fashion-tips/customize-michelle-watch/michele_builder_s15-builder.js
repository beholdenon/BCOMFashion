/* jshint ignore:start */
/*
 * @author Emanuel F. Oliveira (U06EXO)
 * @date 2015-03-21
 */

window.blmwbs15 = window.blmwbs15 || {};

window.blmwbs15.builder = ( function bl_mwbs15_builder( window, document,  $, Hammer ) {

    'use strict';

    var app = {
        cache: {},
        consts: {
            headsCategoryId: '1004412',
            strapsCategoryId: '1004564',
            facetNameStrapSize: 'STRAP_SIZE',
            facetNameCollections: 'MICHELE_COLLECTIONS',
            facetNameBandType: 'MICHELE_BAND_TYPE',
            facetNameColor: 'MICHELE_COLOR',
            facetValueBandTypeStrap: 'Strap',
            facetValueBandTypeBracelet: 'Bracelet',
            pdpUrlPath: '/shop/product/?ID={{id}}',
            scene7HeadUrl: 'http://s7d5.scene7.com/is/image/BLMDev/{{id}}?fmt=png-alpha&wid=135&hei=135&resMode=sharp2',
            scene7StrapUrl: 'http://s7d5.scene7.com/is/image/BLMDev/{{id}}?fmt=png-alpha&wid=100&hei=135&resMode=sharp2',
            scene7HeadPDPUrl: 'http://s7d5.scene7.com/is/image/BLMDev/{{id}}?fmt=png-alpha&wid=325&hei=360&resMode=sharp2', // &fit=hfit,1
            scene7MatchUrl: 'http://s7d5.scene7.com/is/image/BLMDev/{{head}}_{{strap}}?fmt=png-alpha&wid=325&hei=360&resMode=sharp2',
            scene7PDPUrlBase: 'http://macys-o.scene7.com/is/image/BLM/products/',
            scene7PDPUrlParams: '?&wid=325&hei=360&qlt=90,0&layer=comp&op_sharpen=0&resMode=sharp2&op_usm=0.7,1.0,0.5,0&fmt=jpeg',
            cookieExpire: 9, // days
            menuViewport: 'blmwbs15_builder_options',
            headSortByViewport: 'blmwbs15_builder_options_sort_heads',
            strapSortByViewport: 'blmwbs15_builder_options_sort_straps',
            noItemsInBagError: 'Please select a product before adding to your brown bag.',
            strapsLoadingNone: 'We\'re sorry\u2014your selection is unavailable. Please choose a different combination and try again.',
            strapsLoadingError: 'We\'re sorry\u2014your selection is unavailable\nat this time. Please choose a different watch\nhead or try again later.',
            addToBagNotAvailableError: 'We\'re sorry the add to bag service is currently unavailable.  If the problem persits please contact us at customer service.',
            onlineUidCookieName: 'bloomingdales_online_uid',
            onlineCookieName: 'bloomingdales_online',
            bagGuidCookieName: 'bloomingdales_bagguid'
        },
        domain: {
            heads: null,
            straps: null,
            bag: null
        },
        control: { actions: { heads: {}, straps: {}, bag: {}, options: {} } },
        views: {
            menu: null,
            heads: null,
            straps: null,
            display: null,
            bag: null
        },
        utils: {
            processors: {}
        },
        routines: { init: {}, runtime: {} },
        queue: new Queue(),
        state: {
            init: 1, // first init stage...
            isBlocked: false,
            log4js: false
        }
    };

    /*
     * Constructors
     */

    // View

    function View() {
        this.selectors = null;
        this.cache = null;
    }

    View.prototype.getGUIElement = function ( n ) {
        var s = this.selectors,
            c = this.cache,
            e = c[n] || null;
        if ( !e && n in s ) {
            e = $( s[n] ).eq( 0 );
            c[n] = e;
        }
        return e;
    };

    // MenuView

    function MenuView( id ) {

        this.isOK = false;
        this.id = id;
        this.cache = {};
        this.onclose = null;

    }

    MenuView.prototype.classNames = {
        active: 'active'
    };

    MenuView.prototype.selectors = {
        options: '.menu_view-options',
        option:  '.menu_view-options > .menu_view-option',
        flyout:  '.menu_view-flyout'
    };

    MenuView.prototype.init = function () {

        var key, sels = this.selectors;

        this.cache.viewport = $( '#' + this.id );

        for ( key in sels ) {
            this.cache[key] = this.cache.viewport.find( sels[key] );
            if ( this.cache[key].length < 1 ) {
                this.cache = null;
                return;
            }
        }

        if ( this.cache.option.length !== this.cache.flyout.length ) {
            this.cache = null;
            return;
        }

        // release dead references...
        key = sels = void 0;

        // add NOP handler...
        this.cache.flyout.on( 'click', function ( event ) {
            if ( event && !$( event.target ).is( 'a.blmwbs15_button' ) ) {
                event.preventDefault();
                event.stopPropagation();
            }
        } );

        this.isOK = true;

    };

    MenuView.prototype.open = function ( index ) {

        var option,
            flyout,
            offset,
            activeClass = this.classNames.active;

        // basic check...
        if ( !this.isOK || index < 0 || index >= this.cache.option.length ) {
            return;
        }

        // return to initial state...
        this.cache.option.removeClass( activeClass );
        this.cache.flyout.hide();

        // get referred items
        option = this.cache.option.eq( index );
        flyout = this.cache.flyout.eq( index );

        // set flyout offset...
        offset = this.cache.options.position();
        offset.top += this.cache.options.outerHeight( false );
        offset.left += option.position().left;
        flyout.css( offset );

        // display correct items...
        option.addClass( activeClass );
        flyout.show();
        this.cache.viewport.addClass( activeClass );

    };

    MenuView.prototype.close = function () {

        var activeClass = this.classNames.active;

        if ( this.isOK && this.cache.viewport.hasClass( activeClass ) ) {
            this.cache.flyout.hide();
            this.cache.option.removeClass( activeClass );
            this.cache.viewport.removeClass( activeClass );
        }

    };

    MenuView.prototype.toggle = function ( index ) {

        var activeClass = this.classNames.active;

        // basic check...
        if ( !this.isOK || index < 0 || index >= this.cache.option.length ) {
            return;
        }

        if ( this.cache.viewport.hasClass( activeClass )
            && this.cache.option.eq( index ).hasClass( activeClass ) ) {
            this.close();
        } else {
            this.open( index );
        }

    };

    // SortByView

    function SortByView( id ) {
        this.id = id;
        this.cache = {};
    }

    SortByView.prototype.classNames = {
        checked: 'checked'
    };

    SortByView.prototype.selectors = {
        checked: '.checked:first'
    };

    SortByView.prototype.init = function () {
        this.cache.viewport = $( '#' + this.id );
        this.cache.options = this.cache.viewport.find( 'a.blmwbs15_checkbox' );
    };

    SortByView.prototype.select = function ( name ) {
        var option, checkedClass = this.classNames.checked;
        if ( typeof name === 'string' ) {
            option = this.cache.options.filter( '[data-name="' + name + '"]' );
            if ( option.hasClass( checkedClass ) ) {
                option.removeClass( checkedClass );
            } else {
                this.cache.options.removeClass( checkedClass );
                option.addClass( checkedClass );
            }
        }
    };

    SortByView.prototype.forceSelection = function ( name ) {
        var checkedClass = this.classNames.checked;
        this.cache.options.removeClass( checkedClass );
        if ( typeof name === 'string' ) {
            this.cache.options.filter( '[data-name="' + name + '"]' ).addClass( checkedClass );
        }
    };

    SortByView.prototype.getSelected = function () {
        var option = this.cache.options.filter( this.selectors.checked ).attr( 'data-name' );
        return ( typeof option === 'string' ? option : null );
    };

    // Refine By View

    function RefineByView( id ) {
        this.isOK = false;
        this.id = id;
        this.container = null;
        this.optionsSource = null;
        this.optionsVersion = 0;
        this.options = null;
    }

    RefineByView.prototype.classNames = {
        optionElementWrapper: 'blmwbs15_option',
        optionElement: 'blmwbs15_checkbox',
        optionElementChecked: 'checked',
        optionElementHidden: 'hidden'
    };

    RefineByView.prototype.selectors = {
        container: 'dl#',
        optionWrappers: 'dd.blmwbs15_option',
        options: 'dd.blmwbs15_option > a.blmwbs15_checkbox'
    };

    RefineByView.prototype.renderOptions = function () {

        var i,
            lim,
            frag,
            dd,
            a,
            option,
            options,
            version,
            container;

        if ( this.isOK ) {

            // release current options...
            this.options = null;

            // remove elements from UI...
            container = this.container;
            container.find( this.selectors.optionWrappers ).remove();

            // get information from data source...
            options = this.optionsSource.getOptions( true );
            version = this.optionsSource.version;

            if ( options.length > 0 ) {
                frag = document.createDocumentFragment();
                for ( i = 0, lim = options.length; i < lim; i++ ) {
                    option = options[i];
                    a = document.createElement( 'a' );
                    a.className = this.classNames.optionElement;
                    a.href = '#';
                    a.appendChild( document.createTextNode( option.name ) );
                    dd = document.createElement( 'dd' );
                    dd.className = this.classNames.optionElementWrapper;
                    dd.appendChild( a );
                    frag.appendChild( dd );
                    options[i] = {
                        element: $( a ),
                        option: option
                    };
                }
                container.get( 0 ).appendChild( frag );
            }

            // update properties...
            this.options = options;
            this.version = version;

        }

    };

    RefineByView.prototype.sync = function () {

        var i,
            lim,
            option,
            element,
            options,
            shouldHide;

        if ( this.isOK && this.options !== null ) {
            shouldHide = true;
            options = this.options;
            for ( i = 0, lim = options.length; i < lim; i++ ) {
                option = options[i].option, element = options[i].element;
                if ( option.count > 0 ) {
                    if ( option.isChecked ) {
                        element.addClass( this.classNames.optionElementChecked );
                    } else {
                        element.removeClass( this.classNames.optionElementChecked );
                    }
                    element.removeClass( this.classNames.optionElementHidden );
                    if ( shouldHide ) {
                        shouldHide = false;
                    }
                } else {
                    element.addClass( this.classNames.optionElementHidden );
                }
            }
            if ( shouldHide ) {
                this.container.addClass( this.classNames.optionElementHidden );
            } else {
                this.container.removeClass( this.classNames.optionElementHidden );
            }
        }

    };

    RefineByView.prototype.commit = function () {

        var i,
            lim,
            options,
            checkedClass;

        if ( this.isOK && this.options !== null ) {
            options = this.options;
            checkedClass = this.classNames.optionElementChecked;
            for ( i = 0, lim = options.length; i < lim; i++ ) {
                options[i].option.setChecked( options[i].element.hasClass( checkedClass ) );
            }
        }

    };

    RefineByView.prototype.render = function () {
        var options;
        if ( this.isOK ) {
            if ( this.options === null || this.optionsVersion !== this.optionsSource.version ) {
                this.renderOptions();
            }
            this.sync();
        }
    };

    RefineByView.prototype.init = function ( optionsSource ) {

        var container,
            checkedClass;

        if ( !optionsSource ) {
            return;
        }

        container = $( this.selectors.container + this.id );
        if ( container.length !== 1 ) {
            return;
        }

        // save checked class name inside closure...
        checkedClass = this.classNames.optionElementChecked;

        // add click handler...
        container.on( 'click', this.selectors.options, null, function ( event ) {
            var prefix,
                target = $( this ),
                text = target.text();
            if ( target.hasClass( checkedClass ) ) {
                target.removeClass( checkedClass );
                prefix = 'Deselect-Refine-';
            } else {
                target.addClass( checkedClass );
                prefix = 'Select-Refine-';
            }
            if ( typeof text === 'string' ) {
                app.utils.coremetrics( 'element', prefix + text.replace( /\W/g, '_' ) );
            }
            event.preventDefault();
            event.stopPropagation();
        } );

        // save state...
        this.container = container;
        this.optionsSource = optionsSource;

        // release refereneces...
        container = optionsSource = void 0;

        // set init flag...
        this.isOK = true;

    };

    RefineByView.prototype.hasChanges = function () {
        return this.isOK ? this.optionsSource.hasChanges() : false;
    };

    RefineByView.prototype.clear = function () {

        var i,
            lim,
            options,
            checkedClass;

        if ( this.isOK && this.options !== null ) {
            options = this.options;
            checkedClass = this.classNames.optionElementChecked;
            for ( i = 0, lim = options.length; i < lim; i++ ) {
                options[i].element.removeClass( checkedClass );
            }
        }

    };


    // DisplayView

    function DisplayView() {

        this.image = null;
        this.classNames = {
            loading: 'blmwbs15_loading'
        };
        this.selectors = {
            viewport: '#blmwbs15_builder_display_watch',
            image:    'img#blmwbs15_builder_display_image',
            message:  '#blmwbs15_builder_display_message',
            control:  '#blmwbs15_builder_display_control'
        };
        this.cache = {
            handler: null
        };

    }

    DisplayView.prototype = new View();
    DisplayView.prototype.setImage = function ( imageUrl ) {

        var self = this;

        // restore image settings...
        self.getGUIElement('image').css( 'visibility', 'hidden' );
        self.getGUIElement('image').css( 'opacity', '1.0' );

        // choose which path to take...
        if ( typeof imageUrl !== 'string' ) {
            self.image = null;
            self.getGUIElement('control').hide();
            self.getGUIElement('message').show();
            return;
        }

        // prepare UI elements...
        self.getGUIElement('message').hide();
        self.getGUIElement('control').show();
        self.getGUIElement('viewport').addClass( self.classNames.loading );

        if ( typeof self.cache.handler !== 'function' ) {

            // create heandler...
            self.cache.handler = function () {

                if ( self.image === this ) {
                    self.getGUIElement('viewport')
                        .removeClass( self.classNames.loading );
                    self.getGUIElement('image')
                        .prop( 'src', self.image.src )
                        .css( 'visibility', 'visible' );
                }

            };

        }

        // load image...
        self.image = document.createElement( 'img' );
        self.image.onload = self.cache.handler;
        self.image.onerror = self.cache.handler;
        self.image.src = imageUrl;

    };

    DisplayView.prototype.toggleHelp = function () {
        var message, image;
        if ( this.image !== null ) {
            message = this.getGUIElement('message');
            image = this.getGUIElement('image');
            if ( message.is( ':visible' ) ) {
                message.hide();
                image.css( 'opacity', '1.0' );
            } else {
                message.show();
                image.css( 'opacity', '0.4' );
            }
        }
    };

    DisplayView.prototype.isHelpOverImage = function () {
        return ( this.image !== null && this.getGUIElement( 'message' ).is( ':visible' ) );
    };

    // CategoryView

    function CategoryView( name ) {

        this.isLocked = false;
        this.isUIBlocked = false;
        // this.handler = null;
        this.name = name;
        this.page = 1;
        this.pageCount = 0;
        this.itemCount = 0;
        this.category = null;
        this.route = '#/builder/' + name + 's/select/';
        this.classNames = {
            item: 'blmwbs15_builder_' + name,
            sale: 'blmwbs15_price_sale',
            button: 'blmwbs15_button',
            loading: 'blmwbs15_loading'
        };
        this.selectors = {
            root:      '#blmwbs15_builder_' + name + 's',
            viewport:  '#blmwbs15_builder_' + name + 's_viewport',
            container: '#blmwbs15_builder_' + name + 's_container',
            arrowUp:   '#blmwbs15_builder_' + name + 's a.blmwbs15_arrow_up',
            arrowDown: '#blmwbs15_builder_' + name + 's a.blmwbs15_arrow_down',
            uiBlocker: '#blmwbs15_builder_' + name + 's .blmwbs15_uiblocker',
            item:      '.blmwbs15_builder_' + name + ':first'
        };
        this.cache = {};

    }

    CategoryView.prototype = new View();

    // CategoryView / Constants

    CategoryView.prototype.pageSize = 6;
    CategoryView.prototype.pageRows = 3;

    CategoryView.prototype.resetCounters = function ( count ) {
        var pageSize = this.pageSize,
            diff = count % pageSize;
        this.page = 1;
        this.pageCount = ( ( count - diff ) / pageSize ) + ( diff > 0 ? 1 : 0 );
        this.itemCount = count;
    };

    CategoryView.prototype.resetView = function () {
        this.getGUIElement('arrowUp').hide();
        this.getGUIElement('arrowDown').hide();
        this.getGUIElement('container').css( 'top', 0 ).empty();
        this.resetCounters( 0 );
    };

    CategoryView.prototype.updateScrollerState = function () {

        var up = this.getGUIElement('arrowUp'),
            down = this.getGUIElement('arrowDown');

        // down arrow
        this.page < this.pageCount ? down.show() : down.hide();
        // up arrow
        this.page > 1 ? up.show() : up.hide();

    };

    CategoryView.prototype.unblockUI = function () {
        this.getGUIElement('container').css( 'opacity', '1.0' );
        this.getGUIElement('uiBlocker').hide();
        this.isUIBlocked = false;
    };

    CategoryView.prototype.blockUI = function () {
        this.getGUIElement('uiBlocker').show();
        this.getGUIElement('container').css( 'opacity', '0.4' );
        this.isUIBlocked = true;
    };

    CategoryView.prototype.displayLoader = function () {
        this.blockUI();
        this.getGUIElement('uiBlocker').addClass( this.classNames.loading );
    };

    CategoryView.prototype.hideLoader = function () {
        this.getGUIElement('uiBlocker').removeClass( this.classNames.loading );
        this.unblockUI();
    };

    CategoryView.prototype.blockSelection = function () {
        var blocker = this.cache.selectionBlocker;
        if ( !blocker ) {
            blocker = $( document.createElement( 'div' ) );
            blocker.css( {
                'display': 'block',
                'position': 'absolute',
                'left': 0,
                'top': 0,
                'width': '100%',
                'height': '100%',
                'background': 'transparent none'
            } );
            this.cache.selectionBlocker = blocker;
        }
        this.getGUIElement('container').append( blocker );
    };

    // not sure if it's needed...
    // CategoryView.prototype.unblockSelection = function () {
    //     var blocker = this.cache.selectionBlocker;
    //     if ( blocker ) {
    //         blocker.detach();
    //     }
    // };

    CategoryView.prototype.renderItems = function ( items ) {

        var i,
            item,
            length,
            childNode,
            parentNode,
            route = this.route,
            itemCls = this.classNames.item,
            saleCls = this.classNames.sale,
            buttonCls = this.classNames.button,
            documentFragment = document.createDocumentFragment();

        for ( i = 0, length = items.length; i < length; i++ ) {

            // create parent node
            item = items[i];
            parentNode = document.createElement( 'div' );
            parentNode.className = itemCls;

            // image
            childNode = document.createElement( 'img' );
            childNode.alt = item.name;
            childNode.title = item.name;
            childNode.src = item.getImage();
            parentNode.appendChild( childNode );

            // price big
            childNode = document.createElement( 'span' );
            childNode.appendChild( document.createTextNode( item.priceBig ) );
            parentNode.appendChild( childNode );

            // price net
            if ( typeof item.priceNet === 'string' && item.priceNet.length > 0 ) {
                childNode = document.createElement( 'span' );
                childNode.className = saleCls;
                childNode.appendChild( document.createTextNode( item.priceNet ) );
                parentNode.appendChild( childNode );
            }

            // link
            childNode = document.createElement( 'a' );
            childNode.className = buttonCls;
            childNode.href = route + item.id;
            childNode.appendChild( document.createTextNode( 'Select' ) );
            parentNode.appendChild( childNode );

            documentFragment.appendChild( parentNode );

        }

        // insert into DOM
        this.getGUIElement( 'container' ).get( 0 ).appendChild( documentFragment );

    };

    CategoryView.prototype.render = function () {
        var items;
        this.resetView();
        if ( this.category ) {
            items = this.category.getItems();
            this.resetCounters( items.length );
            this.renderItems( items );
            this.updateScrollerState();
        }
    };

    CategoryView.prototype.scroll = function ( dir ) {

        var page, self = this;

        if ( self.isLocked ) {
            return;
        }

        if ( dir === 'down' && self.page < self.pageCount ) {
            page = self.page + 1;
        } else if ( dir === 'up' && self.page > 1 ) {
            page = self.page - 1;
        } else return;

        // lock scrolling...
        self.isLocked = true;

        // retrieve scroll height from cache...
        if ( !self.cache.sizeOfScrollRow || !self.cache.sizeOfScrollHeight ) {
            self.cache.sizeOfScrollRow = self.getGUIElement( 'container' ).children( self.selectors.item ).outerHeight( true );
            self.cache.sizeOfScrollHeight = self.cache.sizeOfScrollRow > 0
                ? self.pageRows * self.cache.sizeOfScrollRow
                : 0;
        }

        // retrive handler from cache...
        if ( !self.cache.fnScrollHandler ) {
            self.cache.fnScrollHandler = function () {
                self.updateScrollerState();
                self.isLocked = false;
            };
        }

        // schedule animation...
        self.getGUIElement( 'container' ).animate( {
            top: -1 * ( page - 1 ) * self.cache.sizeOfScrollHeight
        }, 500, 'swing', self.cache.fnScrollHandler );

        // update page...
        self.page = page;

    };

    CategoryView.prototype.rewind = function () {
        if ( !this.isLocked ) {
            this.page = 1;
            this.getGUIElement('container').css( 'top', 0 );
            this.updateScrollerState();
        }
    };

    CategoryView.prototype.init = function ( category ) {

        var gm, self = this;

        // set data source...
        this.category = category;

        // set gesture recognizers...
        gm = new Hammer.Manager( this.getGUIElement( 'viewport' ).get( 0 ) );
        gm.add( new Hammer.Pan( { direction: Hammer.DIRECTION_VERTICAL, threshold: 50 } ) );
        gm.on( 'panstart', function ( e ) {
            self.scroll( e.direction === Hammer.DIRECTION_DOWN ? 'up' : 'down' );
        } );

    };

    // BagView

    function BagView() {

        this.bag = null;
        this.errors = {
            isAnimationRunning: false,
            isTimeoutRunning: false,
            showingFunction: null,
            hidingFunction: null,
            originalMargin: 0,
            timer: null,
            message: null,
            delay: 3500
        };
        this.classNames = {
            checked: 'checked',
            disabled: 'disabled'
        };
        this.selectors = {
            head:           '#blmwbs15_builder_display_item_head',
            headText:       '#blmwbs15_builder_display_item_head a.blmwbs15_text',
            headPrice:      '#blmwbs15_builder_display_item_head span.blmwbs15_price',
            headPriceSale:  '#blmwbs15_builder_display_item_head span.blmwbs15_price_sale',
            headCheckbox:   '#blmwbs15_builder_display_item_head a.blmwbs15_checkbox',
            strap:          '#blmwbs15_builder_display_item_strap',
            strapText:      '#blmwbs15_builder_display_item_strap a.blmwbs15_text',
            strapPrice:     '#blmwbs15_builder_display_item_strap span.blmwbs15_price',
            strapPriceSale: '#blmwbs15_builder_display_item_strap span.blmwbs15_price_sale',
            strapCheckbox:  '#blmwbs15_builder_display_item_strap a.blmwbs15_checkbox',
            total:          '#blmwbs15_builder_display_total > span.blmwbs15_price',
            button:         '#blmwbs15_builder_display_total > a.blmwbs15_button',
            errorMessages:  '#blmwbs15_builder_display_total > #blmwbs15_error_messages'
        };
        this.cache = {};

    }

    BagView.prototype = new View();

    BagView.prototype.resetView = function () {
        this.getGUIElement('head').hide();
        this.getGUIElement('strap').hide();
        this.getGUIElement('total').text( '$0.00' );
    };

    BagView.prototype.render = function () {

        var head,
            strap,
            href = app.consts.pdpUrlPath;

        // head
        if ( ( head = this.bag.getHead() ) !== null ) {
            this.getGUIElement( 'headText' )
                .attr( 'href', href.replace( '{{id}}', head.id ) )
                .html( head.name );
            this.getGUIElement( 'headPrice' ).text( head.priceBig );
            if ( typeof head.priceNet === 'string' && head.priceNet.length > 0 ) {
                this.getGUIElement( 'headPriceSale' ).text( head.priceNet ).show();
            } else {
                this.getGUIElement( 'headPriceSale' ).hide();
            }
            if ( this.bag.getState( 'head' ) ) {
                this.getGUIElement( 'head' ).removeClass( this.classNames.disabled );
                this.getGUIElement( 'headCheckbox' ).addClass( this.classNames.checked );
            } else {
                this.getGUIElement( 'head' ).addClass( this.classNames.disabled );
                this.getGUIElement( 'headCheckbox' ).removeClass( this.classNames.checked );
            }
            this.getGUIElement( 'head' ).show();
        } else {
            this.getGUIElement( 'head' ).hide();
        }

        // strap
        if ( ( strap = this.bag.getStrap() ) !== null ) {
            this.getGUIElement( 'strapText' )
                .attr( 'href', href.replace( '{{id}}', strap.id ) )
                .html( strap.name );
            this.getGUIElement( 'strapPrice' ).text( strap.priceBig );
            if ( typeof strap.priceNet === 'string' && strap.priceNet.length > 0 ) {
                this.getGUIElement( 'strapPriceSale' ).text( strap.priceNet ).show();
            } else {
                this.getGUIElement( 'strapPriceSale' ).hide();
            }
            if ( this.bag.getState( 'strap' ) ) {
                this.getGUIElement( 'strap' ).removeClass( this.classNames.disabled );
                this.getGUIElement( 'strapCheckbox' ).addClass( this.classNames.checked );
            } else {
                this.getGUIElement( 'strap' ).addClass( this.classNames.disabled );
                this.getGUIElement( 'strapCheckbox' ).removeClass( this.classNames.checked );
            }
            this.getGUIElement( 'strap' ).show();
        } else {
            this.getGUIElement( 'strap' ).hide();
        }

        // total
        this.getGUIElement( 'total' ).text( app.utils.moneyFormat( this.bag.getTotal() ) );

    };

    BagView.prototype.displayError = function ( message ) {

        var self = this;

        // same message first
        self.errors.message = message;
        message = void 0;

        if ( self.errors.isAnimationRunning ) {
            // nothing to do...
            return;
        }

        // warm up...

        if ( !self.errors.originalMargin ) {
            self.errors.originalMargin = self.getGUIElement( 'button' ).css( 'marginTop' );
        }

        if ( typeof self.errors.showingFunction !== 'function' ) {
            self.errors.showingFunction = function () {
                self.getGUIElement( 'errorMessages' ).html( self.errors.message ).show();
                self.errors.timer = window.setTimeout( self.errors.hidingFunction, self.errors.delay );
                self.errors.isAnimationRunning = false;
                self.errors.isTimeoutRunning = true;
            };
        }

        if ( typeof self.errors.hidingFunction !== 'function' ) {
            self.errors.hidingFunction = function () {
                self.getGUIElement( 'errorMessages' ).hide();
                self.getGUIElement( 'button' ).animate( {
                    'marginTop': self.errors.originalMargin
                }, 300 );
                self.errors.isTimeoutRunning = false;
            };
        }

        if ( self.errors.isTimeoutRunning ) {
            window.clearTimeout( self.errors.timer );
            self.getGUIElement( 'errorMessages' ).html( self.errors.message );
            self.errors.timer = window.setTimeout( self.errors.hidingFunction, self.errors.delay );
            return;
        }

        // show up...

        self.errors.isAnimationRunning = true;
        self.getGUIElement( 'button' ).animate( {
            'marginTop': 5
        }, 300, 'swing', self.errors.showingFunction );

    };

    BagView.prototype.init = function ( bag ) {
        this.bag = bag;
    };

    // Bag

    function Bag() {

        this.head = {
            ref: null,
            isChecked: true
        };
        this.strap = {
            ref: null,
            isChecked: true
        };

    }

    Bag.prototype.getTotal = function () {
        var total = 0;
        if ( this.head.ref !== null ) {
            if ( this.head.isChecked ) {
                total += this.head.ref.price;
            }
            if ( this.strap.ref !== null && this.strap.isChecked ) {
                total += this.strap.ref.price;
            }
        }
        return total;
    };

    Bag.prototype.setHead = function ( head ) {

        if ( this.head.ref !== head ) {
            // update head...
            this.head.ref = ( typeof head === 'object' ) ? head : null;
            this.head.isChecked = true;
            // reset strap...
            this.strap.ref = null;
            this.strap.isChecked = true;
            return true;
        }

        return false;

    };

    Bag.prototype.setStrap = function ( strap ) {

        if ( this.head.ref !== null && this.strap.ref !== strap ) {
            this.strap.ref = ( typeof strap === 'object' ) ? strap : null;
            this.strap.isChecked = true;
            return true;
        }

        return false;

    };

    Bag.prototype.toggleState = function ( item ) {
        if ( item in this  ) {
            item = this[item];
            if ( item.ref !== null ) {
                item.isChecked = !item.isChecked;
                return true;
            }
        }
        return false;
    };

    Bag.prototype.getState = function ( item ) {
        if ( item in this ) {
            return this[item].isChecked;
        }
        return false;
    };

    Bag.prototype.getHead = function () {
        return this.head.ref;
    };

    Bag.prototype.getStrap = function () {
        return this.strap.ref;
    };

    Bag.prototype.getItemIfChecked = function ( item ) {
        if ( item in this && this[item].isChecked ) {
            return this[item].ref;
        }
        return null;
    };

    // Head

    function Head( id ) {
        this.id = id; // String
        this.size = null; // String
        this.collection = null; // String
        this.imagePdp = null; // String
    }

    Head.prototype = new Item();
    Head.prototype.imageBaseUrl = app.consts.scene7HeadUrl;
    Head.prototype.imagePdpBaseUrl = app.consts.scene7HeadPDPUrl;
    Head.prototype.getPdpImage = function () {

        if ( this.imagePdp === null ) {
            this.imagePdp = this.imagePdpBaseUrl.replace( '{{id}}', this.id );
        }

        return this.imagePdp;

    };

    // Item

    function Item( id ) {
        this.isOK = false; // boolean
        this.id = id; // String
        this.upcId = null; // String
        this.name = null; // String
        this.price = 0; // Number
        this.priceBig = null; // String
        this.priceNet = null; // String
        this.image = null; // String
    }

    Item.prototype.imageBaseUrl = app.consts.scene7StrapUrl;

    Item.prototype.getImage = function () {

        if ( this.image === null ) {
            this.image = this.imageBaseUrl.replace( '{{id}}', this.id );
        }

        return this.image;

    };

    Item.prototype.isValid = function () {

        if ( this.price > 0
            && typeof this.name === 'string' && this.name.length > 0
            && typeof this.priceBig === 'string' && this.priceBig.length > 0 ) {
            return true;
        }

        return false;

    };

    Item.prototype.setName = function ( name ) {
        this.name = typeof name === 'string'
            ? name.replace( /^\s*michele\s*/i, '' )
            : null;
    };

    // FilterOption

    function FilterOption( id, name, count ) {
        this.id = id;
        this.name = name;
        this.count = count;
        this.isChecked = false;
        this.isDirty = false;
    }

    FilterOption.prototype.setChecked = function ( flag ) {
        if ( this.isChecked !== !!flag ) {
            this.isChecked = !this.isChecked;
            this.isDirty = true;
        }
    };

    FilterOption.prototype.clear = function () {
        this.isChecked = false;
        this.isDirty = false;
    };

    // Filter

    function Filter( id, name ) {
        this.id = id;
        this.name = name;
        this.version = 0;
        this.options = {};
        this.savedOptions = null;
    }

    Filter.prototype.sorter = function ( a, b ) {
        return ( a.name < b.name ? -1 : ( a.name > b.name ? 1 : 0 ) );
    };

    Filter.prototype.addOption = function ( option ) {
        var found = option.id in this.options;
        if ( found ) {
            this.options[ option.id ].count += option.count;
        } else {
            this.options[ option.id ] = option;
            this.version++;
        }
    };

    Filter.prototype.getOption = function ( optionId ) {
        var option = null;
        if ( optionId in this.options ) {
            option = this.options[ optionId ];
        }
        return option;
    };

    Filter.prototype.setOptionState = function ( optionId, checked ) {
        var option = this.getOption( optionId );
        if ( option ) {
            option.setChecked( checked );
        }
    };

    Filter.prototype.isOptionChecked = function ( optionId ) {
        var option = this.getOption( optionId );
        return option ? option.isChecked : false;
    };

    Filter.prototype.hasChanges = function () {
        var key, option;
        for ( key in this.options ) {
            option = this.options[ key ];
            if ( option.isDirty ) {
                return true;
            }
        }
        return false;
    };

    Filter.prototype.getOptions = function ( sorted ) {

        var key,
            option,
            options = [];

        for ( key in this.options ) {
            option = this.options[ key ];
            if ( option.isDirty ) {
                option.isDirty = false;
            }
            options.push( option );
        }

        if ( sorted && options.length > 1 ) {
            options.sort( this.sorter );
        }

        return options;

    };

    Filter.prototype.getQueryString = function () {
        var i, lim, option, string = null, options = this.getOptions( true );
        for ( i = 0, lim = options.length; i < lim; i++ ) {
            option = options[i];
            if ( option.isChecked ) {
                if ( string !== null ) {
                    string += ';;' + option.id;
                } else {
                    string = option.id;
                }
            }
        }
        return ( typeof string === 'string' && string.length > 0 ? window.escape( string ) : null );
    };

    Filter.prototype.setFromQueryString = function ( queryString ) {

        var i, lim, option, options;

        if ( typeof queryString !== 'string' || queryString.length < 1 ) {
            return;
        }

        options = window.unescape( queryString ).split( ';;' );
        for ( i = 0, lim = options.length; i < lim; i++ ) {
            option = this.getOption( options[i] );
            if ( option ) {
                option.isChecked = true;
                option.isDirty = false;
            }
        }

    };

    Filter.prototype.getIdsFromCheckedOptions = function () {
        var key, option, options = this.options, checked = [];
        for ( key in options ) {
            option = options[key];
            if ( option.isChecked ) {
                checked.push( option.id );
            }
            if ( option.isDirty ) {
                option.isDirty = false;
            }
        }
        return checked;
    };

    Filter.prototype.clearOptions = function () {
        var key, option, options = this.options;
        for ( key in options ) {
            option = options[ key ];
            option.clear();
        }
    };

    Filter.prototype.reset = function ( keepChecked ) {
        var key, options = this.options;
        for ( key in options ) {
            if ( keepChecked && options[ key ].isChecked ) {
                continue;
            }
            delete options[ key ];
        }
        this.version++;
    };

    Filter.prototype.saveOptionsSnapshot = function () {

        var key,
            savedOptions = {},
            options = this.options;

        for ( key in options ) {
            savedOptions[ key ] = options[ key ];
        }

        // save options snapshot...
        this.savedOptions = savedOptions;

    };

    Filter.prototype.restoreSavedOptions = function () {

        var key,
            option,
            savedOptions = this.savedOptions;

        if ( savedOptions ) {
            // remove all options...
            this.reset( false );
            for ( key in savedOptions ) {
                option = savedOptions[ key ];
                option.clear();
                this.options[ key ] = option;
            }
            this.version++;
        }

    };

    // Category+

    function Category( itemType ) {
        this.itemType = itemType;
        this.map = {};
        this.list = [];
        this.original = null;
        this.total = 0;
        this.sorting = null;
        this.filters = {};
    }

    Category.prototype.addFilter = function ( filter ) {
        var found = filter.id in this.filters;
        if ( !found ) {
            this.filters[ filter.id ] = filter;
            return true;
        }
        return false;
    };

    Category.prototype.getFilter = function ( filterId ) {
        var filter = null;
        if ( filterId in this.filters ) {
            filter = this.filters[ filterId ];
        }
        return filter;
    };

    Category.prototype.add = function ( id ) {
        var found = ( id in this.map );
        if ( !found ) {
            this.map[id] = new this.itemType( id );
            this.total++;
            return true;
        }
        return false;
    };

    Category.prototype.sortingOptions = {
        'price-asc': function ( a, b ) {
            return a.price - b.price;
        },
        'price-desc': function ( a, b ) {
            return b.price - a.price;
        }
    };

    Category.prototype.getItems = function () {

        var i,
            length,
            id,
            item,
            items = [],
            list = this.list,
            map = this.map;

        if ( list ) {
            for ( i = 0, length = list.length; i < length; i++ ) {
                id = list[i];
                if ( id in map ) {
                    item = map[ id ];
                    if ( item.isOK ) {
                        items.push( item );
                    }
                }
            }
            if ( typeof this.sorting === 'string'
                && this.sorting in this.sortingOptions ) {
                items.sort( this.sortingOptions[ this.sorting ] );
            }
        }

        return items;

    };

    Category.prototype.countItems = function () {

        var i,
            id,
            length,
            count = 0,
            list = this.list,
            map = this.map;

        if ( list ) {
            for ( i = 0, length = list.length; i < length; i++ ) {
                id = list[i];
                if ( id in map ) {
                    if ( map[ id ].isOK ) {
                        count++;
                    }
                }
            }
        }

        return count;

    };

    Category.prototype.clear = function () {
        this.list = [];
    };

    Category.prototype.append = function ( list ) {
        var i, length, item;
        for ( i = 0, length = list.length; i < length; i++ ) {
            item = list[i];
            this.add( item );
            this.list.push( item );
        }
    };

    Category.prototype.getInvalidItems = function () {
        var id,
            list = [],
            map = this.map;
        for ( id in map ) {
            if ( !map[id].isOK ) {
                list.push( id );
            }
        }
        return list;
    };

    Category.prototype.isFilterOptionChecked = function ( filterId, optionId ) {
        var filter = this.getFilter( filterId );
        return filter ? filter.isOptionChecked( optionId ) : false;
    };

    Category.prototype.getFilterOptions = function ( filterId, sorted ) {
        var filter = this.getFilter( filterId );
        return filter ? filter.getOptions( sorted ) : null;
    };

    Category.prototype.getQueryStringForFilterOptions = function ( filterId ) {
        var filter = this.getFilter( filterId );
        return filter ? filter.getQueryString() : null;
    };

    Category.prototype.setFilterOptionsFromQueryString = function ( filterId, queryString ) {
        var filter = this.getFilter( filterId );
        if ( filter ) {
            filter.setFromQueryString( queryString );
        }
    };

    Category.prototype.setOriginalList = function () {

        var i,
            lim,
            list = this.list,
            original = [];

        if ( list && list.length > 0 ) {
            for ( i = 0, lim = list.length; i < lim; i++ ) {
                original[i] = list[i];
            }
        }

        this.original = original;

    };

    Category.prototype.filterBy = function ( filterId, prop ) {

        var i,
            j,
            ilim,
            jlim,
            id,
            val,
            found,
            filter,
            checked,
            list,
            map,
            original = this.original;

        if ( original && original.length > 0
            && ( filter = this.getFilter( filterId ) ) !== null ) {
            checked = filter.getIdsFromCheckedOptions();
            if ( checked.length < 1 ) {
                list = original;
            } else {
                map = this.map;
                list = [];
                ilim = original.length;
                jlim = checked.length;
                for ( i = 0; i < ilim; i++ ) {
                    id = original[i];
                    val = map[ id ][ prop ];
                    found = false;
                    for ( j = 0; j < jlim; j++ ) {
                        if ( val === checked[j] ) {
                            found = true;
                            break;
                        }
                    }
                    if ( found ) {
                        list.push( id );
                    }
                }
            }
            this.list = list;
        }

    };

    Category.prototype.restoreOriginalList = function () {

        var i,
            lim,
            original = this.original,
            list = [];

        if ( original && original.length > 0 ) {
            for ( i = 0, lim = original.length; i < lim; i++ ) {
                list[i] = original[i];
            }
        }

        this.list = list;

    };

    Category.prototype.clearFilters = function () {
        var key, filters = this.filters;
        for ( key in filters ) {
            filters[key].clearOptions();
        }
    };

    // Replacer

    function Replacer() {

        var dict = null,
            regex = /\{\{(\w+)\}\}/g,
            replfn = function ( m, n )  {
                return ( n in dict ) ? dict[n] : '';
            };

        this.replace = function ( text, dictionary ) {
            var result;
            dict = dictionary;
            result = text.replace( regex, replfn );
            dict = null;
            return result;
        };

    }

    function Queue() {

        var s = this,
            u = false,
            q = [],
            dq = function dq() {

                var d, n;

                if ( !q || !(n = q.shift()) ) {
                    u = false;
                    return;
                }

                // "done" callback for cooperative task queueing
                d = function ( success, data ) {
                    var cf = success ? n.sc : n.fl;
                    if ( typeof cf !== 'function' ) {
                        window.setTimeout( dq, 0 );
                    } else {
                        window.setTimeout( function () {
                            try { cf.call( s, data ); }
                            finally { window.setTimeout( dq, 0 ); }
                        }, 0 );
                    }
                };

                try {
                    n.fn.call( s, n.dt, d );
                } catch ( e ) {
                    d( false, e );
                }

            };

        s.next = function next( func, data, success, failure ) {
            if ( q ) {
                q.push( { fn: func, dt: data, sc: success, fl: failure } );
                if ( !u ) {
                    u = true;
                    window.setTimeout( dq, 0 );
                }
            }
            return s;
        };

        s.kill = function kill() {
            q = null;
        };

        s.dead = function dead() {
            return !q;
        };

    }

    function ThumbnailAPIParser() {

        // private properties
        this.regexStart = /<div\s+id="(\d+)"\s+class="productThumbnail(?:\s+[^"]*)?"[^>]*>/g; // g
        this.regexImage = /<img\s+class="thumbnailImage(?:\s+[^"]*)?"\s+id="image_(\d+)"\s+src="([^"]+)"/g; // g
        this.regexImageUrl = /\d+\/optimized\/\d+_fpx.tif\b/; // NO g
        this.regexName = /<a\s+id="prodShortDesc_(\d+)"[^>]*>([^<]+)<\/a>/g; // g
		this.regexShortDesc = /<div\s+id="shortDesc_(\d+)"[^>]*>/g; // g
        this.regexBrandName = /\bclass="brandName"[^>]*>\s*<a(?:\s+[^>]*)?>([^<]+)<\/a>\s*<\//g; // g
        this.regexProdName = /\bclass="prodName"[^>]*>\s*<a(?:\s+[^>]*)?>([^<]+)<\/a>\s*<\//g; // g;
        this.regexPrice = /<div\s+id="priceSaleThumbnails_(\d+)"[^>]*>/g;  // g
        this.regexEndPrice = /<input\s+type="hidden"\s+class="netPrice"\s+value="([^"]+)"[^>]*>/g; // g
        this.regexPriceBig = /<div>\s*((?:\S+)?)\s*(\$\d[\d,.]+)/g; // g
        this.regexPriceSale = /<span[^>]*>([^<]+)<\/span>/g; // g
        this.regexNonDigit = /\D+/g; // g

        // public properties
        this.startIndex = 0;
        this.parsedInfo = null;

    }

    ThumbnailAPIParser.prototype.imageUrlBase = app.consts.scene7PDPUrlBase;
    ThumbnailAPIParser.prototype.imageUrlParams = app.consts.scene7PDPUrlParams;

    ThumbnailAPIParser.prototype.reset = function () {
        this.startIndex = 0;
        this.parsedInfo = null;
    };

    ThumbnailAPIParser.prototype.getParsedInfo = function () {
        return this.parsedInfo;
    };

    ThumbnailAPIParser.prototype.parse = function ( text, needsImage ) {

        var match,
            id,
            name,
            price,
            big,
            net = null,
            image = null,
            prices;

        // release previous result
        this.parsedInfo = null;

        /* ID */
        this.regexStart.lastIndex = this.startIndex;
        if ( ( match = this.regexStart.exec( text ) ) === null ) {
            return false;
        }
        this.startIndex = this.regexStart.lastIndex;
        // save id...
        id = match[1];

        /* Image */
        if ( needsImage ) {
            this.regexImage.lastIndex = this.startIndex;
            if ( ( match = this.regexImage.exec( text ) ) === null || match[1] !== id ) {
                return false;
            }
            this.startIndex = this.regexImage.lastIndex;
            // save image address...
            image = match[2];
            // update image address...
            if ( ( match = this.regexImageUrl.exec( image ) ) !== null ) {
                image = this.imageUrlBase + match[0] + this.imageUrlParams;
            }
        }

        /* Name */
        this.regexName.lastIndex = this.startIndex;
		this.regexShortDesc.lastIndex = this.startIndex;
        if ( ( match = this.regexName.exec( text ) ) !== null && match[1] === id ) {
            this.startIndex = this.regexName.lastIndex;
            name = match[2];
        } else if ( ( match = this.regexShortDesc.exec( text ) ) !== null && match[1] === id ) {
            this.startIndex = this.regexShortDesc.lastIndex;
            name = "";
            this.regexBrandName.lastIndex = this.startIndex;
            if ( ( match = this.regexBrandName.exec( text ) ) !== null ) {
                this.startIndex = this.regexBrandName.lastIndex;
                name += match[1];
            }
            this.regexProdName.lastIndex = this.startIndex;
            if ( ( match = this.regexProdName.exec( text ) ) !== null ) {
                this.startIndex = this.regexProdName.lastIndex;
                if ( name.length > 0 && name.charAt( name.length - 1 ) !== " " ) {
                    name += " ";
                }
                name += match[1];
            }
        } else {
            return false;
        }

        /* Price */
        this.regexPrice.lastIndex = this.startIndex;
        if ( ( match = this.regexPrice.exec( text ) ) === null || match[1] !== id ) {
            return false;
        }
        this.startIndex = this.regexPrice.lastIndex;

        /* Price End (Price Net in Hidden Field) */
        this.regexEndPrice.lastIndex = this.startIndex;
        if ( ( match = this.regexEndPrice.exec( text ) ) === null ) {
            return false;
        }
        this.startIndex = this.regexEndPrice.lastIndex;
        // save price..
        price = +( match[1].replace( this.regexNonDigit, '' ) );
        // get prices substring
        prices = text.substring( this.regexPrice.lastIndex, this.regexEndPrice.lastIndex );
        this.regexPriceBig.lastIndex = 0;
        if ( ( match = this.regexPriceBig.exec( prices ) ) !== null ) {
            if ( match[1].length > 0 ) {
                big = match[1] + ' ' + match[2];
                this.regexPriceSale.lastIndex = this.regexPriceBig.lastIndex;
                if ( ( match = this.regexPriceSale.exec( prices ) ) !== null ) {
                    net = match[1];
                }
            } else {
                big = match[2];
            }
        } else {
            return false;
        }


        this.parsedInfo = {
            id: id,
            name: name,
            price: price,
            priceBig: big,
            priceNet: net,
            image: image
        };

        return true;

    };

    function CategoryAPIParser() {

        // private properties
        this.regexIds = /<div\s+id="metaProductIds"[^>]*>([^<]*)<\/div>/g; // g
        this.regexNumbers = /\s*\[\s*(\d+(?:\s*,\s*\d+)*)\s*\]\s*/; // NO g
        this.regexCount = /<div\s+id="metaProductCount"[^>]*>\s*(\d*)\s*<\/div>/g; // g
        this.regexSeparator = /\s*,\s*/; // NO g

        // public properties
        this.ids = null;
        this.count = 0;

    }

    CategoryAPIParser.prototype.parse = function ( text ) {

        var ids, numbers, count, match;

        // initialize...
        this.ids = null;
        this.count = 0;

        // ids...
        this.regexIds.lastIndex = 0;
        if ( ( match = this.regexIds.exec( text ) ) === null ) {
            return false;
        }
        ids = match[1];

        // numbers from ids...
        if ( ( match = this.regexNumbers.exec( ids ) ) !== null ) {
            numbers = match[1].split( this.regexSeparator );
        }

        // count...
        this.regexCount.lastIndex = this.regexIds.lastIndex;
        if ( ( match = this.regexCount.exec( text ) ) === null ) {
            return false;
        }
        count = +match[1];

        // update parsed info...
        this.ids = numbers || [];
        this.count = count;

        return true;

    };

    /*
     * Utils
     */

    app.utils.log = function ( arg ) {
        var expr;
        if ( app.state.log4js ) {
            try {
                expr = '[MWBS15] ';
                if ( typeof arg === 'string' ) {
                    window.console.log( expr + arg );
                } else {
                    window.console.log( expr + 'See below...' );
                    window.console.log( arg );
                }
            } catch ( e ) { /* working silently... */ }
        }
    };

    app.utils.schedule = function ( object, method, data ) {
        if ( typeof object === 'object' && object !== null ) {
            if ( typeof method === 'string' ) {
                method = object[ method ];
            }
            if ( typeof method === 'function' ) {
                window.setTimeout( function scheduledMethod() {
                    method.call( object, data );
                }, 0 );
            }
        }
    };

    app.utils.moneyFormat = function ( number ) {

        var index, digits, money;

        if ( ( number |= 0 ) < 100 ) {
            money = ( number < 10 ? '0.0' : '0.' ) + number;
        } else {
            digits = number + '';
            index = digits.length - 2;
            money = '.' + digits.substr( index, 2 );
            do {
                index -= 3;
                money = ( index <= 0 ? digits.substr( 0, index + 3 ) : ',' + digits.substr( index, 3 ) ) + money;
            } while ( index > 0 );
        }

        return '$' + money;

    };

    app.utils.trySet = function ( obj, attr, val ) {
        if ( typeof obj === 'object' && obj !== null ) {
            obj[attr] = val;
        }
    };

    app.utils.getCategoryUrl = function ( args ) {

        // /catalog/category/facetedmeta?edge=hybrid&parentCategoryId=undefined&categoryId=1003999&dynamicfacet=true&sortBy=ORIGINAL&productsPerPage=96&STRAP_SIZE=16mm&facetName=STRAP_SIZE
        var facet,
            baseUrl = '/catalog/category/facetedmeta?edge=hybrid&parentCategoryId=undefined&categoryId={{categoryId}}&dynamicfacet=true&pageIndex={{pageIndex}}&sortBy={{sortBy}}&productsPerPage=96',
            facetQuery = '&{{facetName}}={{facetValue}}&facetName={{facetName}}',
            url = app.utils.replacer.replace( baseUrl, args );

        // prepare url
        if ( args.facets ) for ( facet in args.facets ) {
            url += app.utils.replacer.replace( facetQuery, {
                facetName: facet,
                facetValue: args.facets[facet]
            } );
        }

        app.utils.log( url );

        return url;

    };

    app.utils.getProductsInfoUrl = function ( args ) {

        // /shop/catalog/product/thumbnail/1?edge=hybrid&limit=none&categoryId=1004564&ids=1277609,1277610,476088,476087,1130536,1124429,483604,1170719,1124426,1214948,878112,833223,833222,615684,605195,605192,584691,568879,495197,484342,483634,455825,1124432,1124428,1124427,1032694,1032693,1026288,1026287,1026286,1026285,1026284,999095,948488,695850,653127,600041,591854,584686,558479,495195,484344,483620,483561,455824,102713,100787
        var slice,
            url = null,
            baseUrl = '/shop/catalog/product/thumbnail/1?edge=hybrid&limit=none&categoryId={{categoryId}}&ids={{ids}}';

        if ( args.startIndex < args.ids.length ) {

            // get partial list of ids
            slice = args.ids.slice( args.startIndex, args.startIndex + 72 );
            args.expectedCount = slice.length;
            args.startIndex += args.expectedCount;

            // build URL
            url = app.utils.replacer.replace( baseUrl, {
                categoryId: args.categoryId,
                ids: slice.join( ',' )
            } );

            app.utils.log( url );

        }

        return url;

    };

    app.utils.getCookie = function ( name ) {

        var match,
            value = null,
            cookies = document.cookie,
            regex = /\s*([^;=]+)=([^;]*);?/g;

        while ( ( match = regex.exec( cookies ) ) !== null) {
            if ( name === match[1] ) {
                value = window.unescape( match[2] );
                break;
             }
         }

        return value;

    };

    app.utils.setCookie = function ( name, value, days ) {

        var expires,
            cookie = name + '=' + window.escape( value );

        if ( days ) {
            expires = new Date();
            expires.setTime( expires.getTime() + ( days * 24 * 3600 * 1000 ) );
            cookie += '; expires=' + expires.toGMTString();
        }

        cookie += '; path=/';

        // save cookie...
        document.cookie = cookie;

    };

    app.utils.getCoremetricsAttributes = function ( attributes ) {

        var i, index, value, list;

        if ( typeof attributes === 'object' && attributes !== null ) {
            list = [];
            for ( index in attributes ) {
                value = attributes[index];
                index = +index - 1;
                for ( i = list.length; i < index; i++ ) {
                    list[i] = '';
                }
                list[index] = value;
            }
            return list.join('-_-');
        }

        return null;

    };

    app.utils.coremetrics = function ( type, tag, attributes ) {

        var category = 'spring15_michele';
        if ($('.bl_mobile').length > 0){
            category = 'mbl:' + category;
        }

        try {
            switch ( type ) {
            case 'page':
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(
                    category + '--' + tag,
                    category
                );
                break;
            case 'element':
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(
                    tag,
                    category,
                    app.utils.getCoremetricsAttributes( attributes )
                );
                break;
            case 'shop':
                window.cmCreateShopAction5Tag(
                    attributes.id,
                    attributes.name,
                    attributes.quantity,
                    attributes.price,
                    category
                );
                window.cmDisplayShop5s();
                break;
            }
        } catch ( e ) { /* silence is golden... */ }

    };

    // single objects
    app.utils.replacer = new Replacer();
    app.utils.categoryAPIParser = new CategoryAPIParser();
    app.utils.thumbnailAPIParser = new ThumbnailAPIParser();

    // support
    app.utils.Queue = Queue;

    /*
     * Utils / Processors
     */

    app.utils.processors.parseStrapSizes = function ( response ) {

        var name,
            count,
            match,
            straps = [],
            regexName = /\sclass="STRAP_SIZE"[^>]*>(\d+mm)<\//g,
            regexCount = /\sid="count_STRAP_SIZE_(\d+mm)"[^>]*>\[(\d+)\]<\//g;

        while ( (match = regexName.exec( response )) !== null ) {
            // save name
            name = match[1], count = 0;
            // search for count
            regexCount.lastIndex = regexName.lastIndex;
            if ( (match = regexCount.exec( response )) !== null
                && match[1] === name ) {
                count = +match[2];
            }
            straps.push( { name: name, count: count } );
        }

        return {
            id: app.consts.facetNameStrapSize,
            name: 'Band Size',
            options: straps
        };

    };

    app.utils.processors.parseMicheleCollections = function ( response ) {

        var name,
            count,
            match,
            collections = [],
            regexName = /\sclass="(?:MICHELE_COLLECTIONS|MICHELE_COLLECTIONS hiddenSingleSelectFactes)"[^>]*>([^<]+)<\//g,
            regexCount = /\sid="count_MICHELE_COLLECTIONS_(?:[^"]+)"[^>]*>\[(\d+)\]<\//g;

        while ( (match = regexName.exec( response )) !== null ) {
            // save name
            name = match[1], count = 0;
            // search for count
            regexCount.lastIndex = regexName.lastIndex;
            if ( (match = regexCount.exec( response )) !== null ) {
                count = +match[1];
            }
            collections.push( { name: name, count: count } );
        }

        return {
            id: app.consts.facetNameCollections,
            name: 'Collections',
            options: collections
        };

    };

    app.utils.processors.parseMicheleColors = function ( response ) {

        var name,
            count,
            match,
            colors = [],
            regexName = /\sclass="(?:MICHELE_COLOR|MICHELE_COLOR hiddenSingleSelectFactes)"[^>]*>([^<]+)<\//g,
            regexCount = /\sid="count_MICHELE_COLOR_(?:[^"]+)"[^>]*>\[(\d+)\]<\//g;

        while ( (match = regexName.exec( response )) !== null ) {
            // save name
            name = match[1], count = 0;
            // search for count
            regexCount.lastIndex = regexName.lastIndex;
            if ( (match = regexCount.exec( response )) !== null ) {
                count = +match[1];
            }
            colors.push( { name: name, count: count } );
        }

        return {
            id: app.consts.facetNameColor,
            name: 'Band Color',
            options: colors
        };

    };

    /*
     * Routines
     */

    /**
     * @note Uses v1 add to bag api
     * @see api docs http://developer.bloomingdales.com/io-docs
     */
    app.routines.addToBag = function ( args ) {
        var defaultBagGuidCookie = app.utils.getCookie(app.consts.bagGuidCookieName),
            requestMethod = 'post', //defaultBagGuidCookie ? 'PATCH' : 'POST', // @see 'add to bag' and 'update bag' functionality at http://developer.bloomingdales.com/io-docs
            bagRequestPath = '/bag/add', //+ (defaultBagGuidCookie ? '/' + defaultBagGuidCookie + '/items' : ''), // same as above @see
            requestParamsList = args.upcIds.reduce(function (out, upcId) {
                out.push({
                    item: {
                        upcId: upcId,
                        quantity: 1
                    },
                });
                return out;
            }, []),
            nextCallArgs = $.extend(true, {
                result: null,
                error: null
            }, args),
            bagRequestSuccess = function( response ) {
                // Seed params to forward to next add to bag handler
                // Reduce items list to expect parameters object
                nextCallArgs = response.bag.items.reduce(function (out, item) {
                        out[item.upcId] = {
                            id: item.productId,
                            upcId: item.upcId,
                            error: item.errors ? item.errors.slice(0) : null,
                            isOK: true
                        };
                        return out;
                    },
                    // reduce on aggregator
                    nextCallArgs
                );

                // 'online_uid' cookie
                if ( response.bag.owner.userId && !app.utils.getCookie( app.consts.onlineCookieName ) ) {
                    app.utils.setCookie( app.consts.onlineCookieName, response.bag.owner.userId, app.consts.cookieExpire );
                }

                // 'online' cookie
                if ( response.machineId && !app.utils.getCookie( app.const.onlineUidCookieName ) ) {
                    app.utils.setCookie( app.consts.onlineUidCookieName, response.machineId, app.consts.cookieExpire );
                }

                // 'baguid' cookie
                if ( response.bag.bagGUID && !app.utils.getCookie( app.consts.bagGuidCookieName ) ) {
                    app.utils.setCookie( app.consts.bagGuidCookieName, response.bag.bagGUID, app.consts.cookieExpire );
                }
            },

            // Forward the rest of the add to bag functionality here
            allBagRequestsComplete = function () {
                app.utils.schedule( nextCallArgs, 'callback' );
            },

            bagRequestFailure = function (error) {
                app.utils.log( 'ROUTINES/ADDTOBAG: UNEXPECTED ERROR...' );
                nextCallArgs.error = error;
                app.utils.schedule( nextCallArgs, 'callback' );
                console.error('Failed to add to bag.  Error recieved: ', error);
                app.routines.runtime.displayErrorMessage( app.consts.addToBagNotAvailableError );
                app.views.heads.unblockUI();
                app.views.straps.hideLoader();
            },

            // Make all requests
            requests = requestParamsList.map(function (item) {

                // If an update is required then api requires this variable set
                // @see update bag at http://developer.bloomingdales.com/io-docs
                // if (requestMethod === 'patch') {
                //     item.item.sequenceNumber = 22;
                // }
                
                // Using $.ajax instead of shorthand ($.post, etc.) to allow using 'PATCH' request
                // method for updates (as per api docs http://developer.bloomingdales.com/io-docs)
                return $.ajax({
                        url: bagRequestPath,
                        method: requestMethod,
                        dataType: 'json',
                        data: JSON.stringify(item)
                    })
                    .then(
                        bagRequestSuccess
                    );
            });

        // Wait for all requests to complete
        $.when(requests)
            .then(allBagRequestsComplete)
            .fail(bagRequestFailure);
    };

    app.routines.ensureBagGuid = function () {
        var bagGuid = app.utils.getCookie(app.consts.bagGuidCookieName);

        // Make request for bag and store it
        if (bagGuid) {

        }
    };

    app.routines.getProductInfo = function ( args ) {

        var url = '/catalog/product/quickview/?id={{id}}',
            callback = function () {
                app.utils.schedule( args, 'callback' );
            };

        // set output data...
        args.isOK = false;
        args.response = null;
        args.error = null;

        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: '/p' + url.replace( '{{id}}', args.id ),
            error: callback,
            success: function( response ) {
                try {
                    args.response = $.parseJSON( response.replace( /[\n\r]+/g, '' ) );
                    args.isOK = true;
                } catch (e) {
                    args.error = e;
                    app.utils.log( 'ROUTINES/GETPRODUCTINFO: ERROR PARSING JSON RESPONSE...' );
                } finally { callback(); }
            }
        });

    };

    app.routines.getCategoryItems = function ( args ) {

        var key, defs = {
                isOK: false,
                categoryId: null, // String
                sortBy: 'ORIGINAL',
                pageIndex: 1, // Number
                facets: null, // Object
                processors: null, // Array
                results: null, // Array
                count: 0,
                items: null // Array
            },
            callback = function callback() {
                app.utils.schedule( args, 'callback' );
            };

        // reproduce default structure
        for ( key in defs ) {
            if ( !(key in args) ) {
                args[key] = defs[key];
            }
        }

        if ( typeof args.categoryId !== 'string'
            || args.categoryId.length < 1 ) {
            throw 'ROUTINES/GETCATEGORYITEMS: BAD PARAMETERS';
        }

        // no need to waste memory...
        defs = key = void 0;

        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: '/p' + app.utils.getCategoryUrl( args ),
            error: callback,
            success: function ( response ) {

                var processor,
                    parser = app.utils.categoryAPIParser;

                // execute addtiona data processors...
                if ( args.processors ) while ( args.processors.length > 0 ) {
                    processor = args.processors.shift();
                    if ( typeof processor === 'function' ) {
                        if ( !args.results ) {
                            args.results = [];
                        }
                        args.results.push( processor.call( args, response ) );
                    }
                }

                if ( parser.parse( response ) ) {
                    args.count = parser.count;
                    args.items = args.items ? args.items.concat( parser.ids ) : parser.ids;
                    if ( args.items.length < args.count ) {
                        args.pageIndex = parser.ids.length > 0 ? args.pageIndex + 1 : 1;
                        app.utils.schedule( app.routines, 'getCategoryItems', args );
                        // prevent callback from being called
                        return;
                    }
                    args.isOK = args.count === 0 || ( args.count > 0 && args.count === args.items.length );
                } else {
                    args.isOK = false;
                }

                // run callback
                callback();

            }
        });

    };

    app.routines.getProductsInfo = function ( args ) {

        var key, defs = {
                isOK: false,
                categoryId: null, // String
                startIndex: 0,
                expectedCount: 0,
                needsImage: false,
                ids: null, // Array
                count: 0,
                items: null // Object
            },
            callback = function callback() {
                app.utils.schedule( args, 'callback' );
            };

        // reproduce default structure
        for ( key in defs ) {
            if ( !(key in args) ) {
                args[key] = defs[key];
            }
        }

        if ( typeof args.categoryId !== 'string'
            || args.categoryId.length < 1
            || typeof args.ids !== 'object'
            || args.ids === null
            || args.ids.length < 1
            || args.ids.length <= args.startIndex ) {
            throw 'ROUTINES/GETPRODUCTSINFO: BAD PARAMETERS';
        }

        // let's save some memory...
        defs = key = void 0;

        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: '/p' + app.utils.getProductsInfoUrl( args ),
            error: callback,
            success: function ( response ) {

                var item,
                    isOK = true,
                    needsImage = args.needsImage,
                    // retrievedCount = 0,
                    parser = app.utils.thumbnailAPIParser;

                if ( typeof args.items !== 'object' || args.items === null ) {
                    args.items = {};
                    args.count = 0;
                }

                parser.reset();
                while ( parser.parse( response, needsImage ) ) {
                    item = parser.getParsedInfo();
                    // // repeated?
                    // if ( item.id in args.items ) {
                    //     isOK = false;
                    //     break;
                    // }
                    args.items[ item.id ] = item;
                    args.count++;
                    // retrievedCount++;
                }

                // // check if retrieved count matches expected count...
                // if ( isOK && retrievedCount !== args.expectedCount ) {
                //     isOK = false;
                // }

                if ( isOK && args.startIndex < args.ids.length ) {
                    app.utils.schedule( app.routines, 'getProductsInfo', args );
                    // prevent callback from being called
                    return;
                }

                // set succcess flag
                args.isOK = isOK;

                // run callback
                callback();

            }
        });

    };

    /*
     * Routines / Runtime
     */

    app.routines.runtime.exception = function ( data ) {
        app.utils.log( 'ROUTINES/RUNTIME/EXCEPTION' );
        app.utils.log( data );
    };

    app.routines.runtime.verifyStrapsRetrieval = function ( qData, qCallback ) {

        var i,
            len,
            tasks = qData.tasks,
            hasErrors = false;

        // update color facets...
        if ( qData.colorFacetQueryString ) {
            app.domain.straps.setFilterOptionsFromQueryString( app.consts.facetNameColor, qData.colorFacetQueryString );
        }

        // check for errors...
        for ( i = 0, len = tasks.length; i < len; i++ ) {
            if ( !tasks[i].isOK ) {
                hasErrors = true;
                break;
            }
        }

        // check if result set is empty...
        if ( app.domain.straps.countItems() < 1 ) {
            if ( hasErrors ) {
                app.utils.log( 'ROUTINES/RUNTIME/VERIFYSTRAPSRETRIEVAL: Error on API calls...' );
                app.utils.log( qData );
                // display error message...
                app.routines.runtime.displayErrorMessage( app.consts.strapsLoadingError );
            } else {
                // display empty result set message...
                app.routines.runtime.displayErrorMessage( app.consts.strapsLoadingNone );
            }
        }

        // invoke callback if any...
        if ( typeof qData.callback === 'function' ) {
            window.setTimeout( qData.callback, 0 );
        }

        // notify queue...
        qCallback( true, null );

    };

    app.routines.runtime.updateViewsForHeadSelection = function () {

        // update state of heads view...
        app.views.heads.unblockUI();

        // update straps view...
        app.views.straps.resetView();
        app.views.straps.render();
        app.views.straps.hideLoader();

    };

    app.routines.runtime.updateStrapFilters = function ( struct, shouldReset ) {

        var filter, options, option;

        if ( typeof struct !== 'object' || struct === null ) {
            return;
        }

        filter = app.domain.straps.getFilter( struct.id );
        if ( filter ) {
            if ( shouldReset ) {
                filter.reset( true );
            }
            options = struct.options;
            for (var i = 0; i < options.length; i++ ) {
                option = options[i];
                filter.addOption( new FilterOption( option.name, option.name, option.count ) );
            }
        }

    };

    app.routines.runtime.loadStraps = function ( qData, qCallback ) {

        var prefix = 'ROUTINES/RUNTIME/LOADSTRAPS: ';

        // make sure there is a selected head...
        if ( typeof qData !== 'object' || qData === null ) {
            qCallback( false, prefix + 'Invalid Argument...' );
            return;
        }

        // issue API call...
        app.routines.getCategoryItems( {
            categoryId: app.consts.strapsCategoryId,
            processors: [ app.utils.processors.parseMicheleColors ],
            facets: typeof qData.facets === 'object' ? qData.facets : null,
            callback: function () {
                if ( this.isOK ) {
                    if ( this.items && this.items.length > 0 ) {
                        app.domain.straps.append( this.items );
                    }
                    if ( this.results && this.results.length > 0 ) {
                        app.routines.runtime.updateStrapFilters( this.results[0], qData.shouldResetFilters );
                    }
                    app.utils.trySet( qData, 'isOK', true );
                    qCallback( true, null );
                } else {
                    qCallback( false, prefix + 'Bad API Response...' );
                }
            }
        } );

    };

    app.routines.runtime.loadStrapsInfo = function ( qData, qCallback ) {

        var invalidIds = app.domain.straps.getInvalidItems();
        if ( invalidIds.length < 1 ) {
            app.utils.trySet( qData, 'isOK', true );
            qCallback( true, null );
            return;
        }

        // issue API call...
        app.routines.getProductsInfo( {
            categoryId: app.consts.strapsCategoryId,
            ids: invalidIds,
            callback: function () {

                var id,
                    item,
                    items,
                    strap,
                    map = app.domain.straps.map,
                    errCount = 0,
                    prefix = 'ROUTINES/RUNTIME/LOADSTRAPSINFO: ';

                if ( this.isOK && this.items !== null
                    && typeof this.items === 'object' ) {
                    items = this.items;
                    for ( id in items ) {
                        item = items[id];
                        strap = map[id];
                        if ( strap ) {
                            strap.setName( item.name );
                            strap.price = item.price;
                            strap.priceBig = item.priceBig;
                            strap.priceNet = item.priceNet;
                            strap.isOK = strap.isValid();
                            if ( !strap.isOK ) {
                                errCount++;
                                app.utils.log( prefix + 'INVALID INFO FOR STRAP ID #' + id );
                            }
                        } else {
                            errCount++;
                            app.utils.log( prefix + 'ID #' + id + ' NOT FOUND IN LOCAL DATA' );
                        }
                    }
                    if ( errCount > 0 ) {
                        app.utils.log( prefix + errCount + ' ERROR(S) WHILE LOADING STRAP INFO' );
                    }
                    app.utils.trySet( qData, 'isOK', true );
                    qCallback( true, null );
                } else {
                    qCallback( false, prefix + 'Bad API Response...' );
                }
            }
        } );

    };

    app.routines.runtime.performStrapsRetrieval = function ( callback ) {

        var i,
            args,
            head,
            sizeFacet,
            colorFacet,
            bandTypeFacet,
            needsStrap,
            needsBracelet,
            context = {
                callback: callback,
                colorFacetQueryString: null,
                tasks: []
            };

        // reset list of straps in model...
        app.domain.straps.clear();

        // get color facets...
        colorFacet = app.domain.straps.getQueryStringForFilterOptions( app.consts.facetNameColor );
        if ( colorFacet ) {
            context.colorFacetQueryString = colorFacet;
        }

        // check if any head is selected...
        head = app.domain.bag.getHead();
        if ( head ) {

            // use head size as size facet...
            sizeFacet = window.escape( head.size );

            // check if bracelets are checked...
            needsBracelet = app.domain.straps.isFilterOptionChecked(
                app.consts.facetNameBandType,
                app.consts.facetValueBandTypeBracelet
            );

            // check if straps are checked...
            needsStrap = app.domain.straps.isFilterOptionChecked(
                app.consts.facetNameBandType,
                app.consts.facetValueBandTypeStrap
            );

            // bracelets request...
            if ( needsBracelet || !needsStrap ) {
                args = { isOK: false, task: app.routines.runtime.loadStraps, facets: {}, shouldResetFilters: true  };
                args.facets[ app.consts.facetNameBandType ] = app.consts.facetValueBandTypeBracelet;
                args.facets[ app.consts.facetNameCollections ] = window.escape( head.collection ); // set bracelet collection...
                args.facets[ app.consts.facetNameStrapSize ] = sizeFacet;
                if ( colorFacet ) {
                    args.facets[ app.consts.facetNameColor ] = colorFacet;
                }
                context.tasks.push( args );
            }

            // straps request...
            if ( needsStrap || !needsBracelet ) {
                args = { isOK: false, task: app.routines.runtime.loadStraps, facets: {}, shouldResetFilters: ( context.tasks.length < 1 ) };
                args.facets[ app.consts.facetNameBandType ] = app.consts.facetValueBandTypeStrap;
                args.facets[ app.consts.facetNameStrapSize ] = sizeFacet;
                if ( colorFacet ) {
                    args.facets[ app.consts.facetNameColor ] = colorFacet;
                }
                context.tasks.push( args );
            }

        } else {

            // since no head is selected, a single request is enough...
            args = { isOK: false, task: app.routines.runtime.loadStraps, facets: {}, shouldResetFilters: true };

            // strap size...
            sizeFacet = app.domain.heads.getQueryStringForFilterOptions( app.consts.facetNameStrapSize );
            if ( sizeFacet ) {
                args.facets[ app.consts.facetNameStrapSize ] = sizeFacet;
            }

            // band type...
            bandTypeFacet = app.domain.straps.getQueryStringForFilterOptions( app.consts.facetNameBandType );
            if ( bandTypeFacet ) {
                args.facets[ app.consts.facetNameBandType ] = bandTypeFacet;
            }

            // strap color...
            if ( colorFacet ) {
                args.facets[ app.consts.facetNameColor ] = colorFacet;
            }

            context.tasks.push( args );

        }

        // create task for information loading...
        context.tasks.push( {
            isOK: false,
            task: app.routines.runtime.loadStrapsInfo
        } );

        // enqueue tasks...
        for ( i = 0; i < context.tasks.length; i++ ) {
            args = context.tasks[i];
            app.queue.next( args.task, args, null, app.routines.runtime.exception );
        }

        // enqueue verification task (the last one)...
        app.queue.next(
            app.routines.runtime.verifyStrapsRetrieval,
            context,
            null,
            null
        );

    };

    app.routines.runtime.doSelectStrap = function ( strap ) {

        var image;

        // set selected strap...
        if ( app.domain.bag.setStrap( strap ) ) {
            app.views.bag.render();
            // display image of head and strap match...
            image = app.utils.replacer.replace( app.consts.scene7MatchUrl, {
                    head: ( app.domain.bag.getHead() ).id,
                    strap: ( app.domain.bag.getStrap() ).id
                }
            );
            app.views.display.setImage( image );
        }

    };

    app.routines.runtime.doSelectHead = function ( head ) {

        if ( app.views.heads.isUIBlocked ) {
            // nothing to do if UI is blocked...
            return;
        }

        // set selected head...
        if ( !app.domain.bag.setHead( head ) ) {
            // nothing to do... this is the currently selected head...
            return;
        }

        // update views...
        app.views.heads.blockUI();
        app.views.straps.displayLoader();
        app.views.display.setImage( head.getPdpImage() );
        app.views.bag.render();

        // self explained...
        app.routines.runtime.performStrapsRetrieval( app.routines.runtime.updateViewsForHeadSelection );

    };

    app.routines.runtime.refineHeadsByStrapSize = function () {

        // perform filtering
        app.domain.heads.filterBy( app.consts.facetNameStrapSize, 'size' );
        window.setTimeout( app.routines.runtime.updateHeadsCategoryView, 100 );

    };

    app.routines.runtime.doRefineBy = function () {

        // will heads be refined?
        if ( app.views.refine.size.hasChanges() ) {
            // unselect head (and consequently strap), if any...
            if ( app.domain.bag.setHead( null ) ) {
                app.views.display.setImage( null );
                app.views.bag.render();
            }
            // update category view UI and schedule local refine by...
            app.views.heads.displayLoader();
            window.setTimeout( app.routines.runtime.refineHeadsByStrapSize, 500 );
        }

        // will straps be refined?
        if ( app.views.refine.size.hasChanges()
            || app.views.refine.type.hasChanges()
            || app.views.refine.color.hasChanges() ) {
            // update category view UI and retrieve straps from server...
            app.views.straps.displayLoader();
            app.routines.runtime.performStrapsRetrieval( app.routines.runtime.updateStrapsCategoryView );
        }

    };

    app.routines.runtime.displayAppFailureMessage = function () {

        var intro = $( '#blmwbs15_intro' );

        $( '#blmwbs15_intro_main, #blmwbs15_intro_ie8' ).hide();
        $( '#blmwbs15_intro_error' ).show();
        $( '#blmwbs15_contents, #blmwbs15_bar' ).hide();
        if ( intro.is( ':animated' ) ) {
            intro.fadeIn( 400 );
        } else {
            intro.show();
        }

        // coremetrics...
        app.utils.coremetrics( 'page', 'error-failure' );

    };

    app.routines.runtime.displayErrorMessage = function ( message, href ) {

        var jObj = app.cache.jErrorMessageOverlay;

        // cache miss...
        if ( !jObj ) {
            jObj = $( '#blmwbs15_overlay_error_message' );
            app.cache.jErrorMessageOverlay = jObj;
        }

        // display blocker without loader...
        app.routines.runtime.setBlockedState( true, false );

        // set href...
        if ( typeof href !== 'string' ) {
            href = '#/builder/acknowledge';
        }

        // prepare overlay...
        jObj.find( 'span.blmwbs15_text' ).html( message );
        jObj.find( 'a.blmwbs15_button' ).attr( 'href', href );
        jObj.show();

    };

    app.routines.runtime.setBlockedState = function ( isBlocked, showLoader ) {

        var blocker = $( '#blmwbs15_full_uiblocker' );

        // app state...
        if ( isBlocked ) {
            app.state.isBlocked = true;
            blocker.show();
        } else {
            app.state.isBlocked = false;
            blocker.children( 'div.blmwbs15_overlay' ).hide();
            blocker.hide();
        }

        // loader state...
        if ( showLoader ) {
            blocker.addClass( 'blmwbs15_loading' );
        } else {
            blocker.removeClass( 'blmwbs15_loading' );
        }

    };

    app.routines.runtime.addToBagError = function ( data ) {

        var message = typeof data === 'string'
            ? data
            : 'Error adding products to bag... Please try again later.';

        app.routines.runtime.displayErrorMessage( message );

        // coremetrics...
        app.utils.coremetrics( 'element', 'error', { '32': message } );

    };

    app.routines.runtime.addToBagSuccess = function ( data ) {

        app.routines.runtime.setBlockedState( true, false );
        $( '#blmwbs15_a2b_confirmation' ).show();

        // coremetrics...
        if ( data.head ) {
            app.utils.coremetrics( 'shop', null, {
                id: data.head.id,
                name: data.head.name,
                quantity: 1,
                price: app.utils.moneyFormat( data.head.price )
            } );
        }
        if ( data.strap ) {
            app.utils.coremetrics( 'shop', null, {
                id: data.strap.id,
                name: data.strap.name,
                quantity: 1,
                price: app.utils.moneyFormat( data.strap.price )
            } );
        }

    };

    app.routines.runtime.findUpcId = function ( qData, qCallback ) {

        var item = qData;

        app.routines.getProductInfo( {
            id: item.id,
            callback: function () {
                var upcId, isOK = false;
                if ( this.isOK ) {
                    try {
                        upcId = this.response.upcmap[0].upcID;
                        if ( typeof upcId === 'number'
                            || ( typeof upcId === 'string' && upcId.length > 0 ) ) {
                            item.upcId = upcId + '';
                            isOK = true;
                        }
                    } catch ( e ) { /* silently leave... */ }
                }
                qCallback( isOK, isOK ? null : {
                    info: 'ROUTINES/RUNTIME/FINDUPCID: ERROR RETRIEVING PRODUCT UPCID...',
                    item: item
                } );
            }
        } );

    };

    app.routines.runtime.tryAddingToBag = function ( qData, qCallback ) {

        var head = qData.head,
            strap = qData.strap,
            upcIds = [];

        // check if information was correctly retrieved...
        if ( ( head && !head.upcId ) || ( strap && !strap.upcId ) ) {
            qCallback( false, 'Error retrieving product information. Please, try again later.' );
            return;
        }

        if ( head ) {
            upcIds.push( head.upcId );
        }

        if ( strap ) {
            upcIds.push( strap.upcId );
        }

        if ( upcIds.length < 1 ) {
            qCallback( false, app.consts.noItemsInBagError );
            return;
        }

        // send add to bag call
        app.routines.addToBag( {
            upcIds: upcIds,
            callback: function () {
                var key,
                    item,
                    errorMessage = '',
                    isOK = true;
                if ( this.error !== null ) {
                    isOK = false;
                    errorMessage = 'Unexpected error while adding to bag... Please try again later.';
                } else for ( key in this.result ) {
                    item = this.result[key];
                    if ( !item.isOK ) {
                        isOK = false;
                        if ( item.errors && item.errors.length > 0 ) {
                            if ( errorMessage.length > 0 ) {
                                errorMessage += '\n';
                            }
                            errorMessage += ( head && head.upcId === item.upcId ? 'Head' : 'Strap' ) + ':\n';
                            errorMessage += item.errors.join( '\n' ) + '\n';
                        }
                    }
                }
                qCallback( isOK, isOK ? qData : errorMessage );
            }
        } );

    };

    app.routines.runtime.doAddToBag = function () {

        var context,
            head = app.domain.bag.getItemIfChecked( 'head' ),
            strap = app.domain.bag.getItemIfChecked( 'strap' );

        if ( app.state.isBlocked ) {
            return;
        }

        if ( !head && !strap ) {
            // none selected...
            app.routines.runtime.displayErrorMessage( app.consts.noItemsInBagError );
            return;
        }

        // block app...
        app.routines.runtime.setBlockedState( true, true );

        context = {
            head: head,
            strap: strap
        };

        if ( head && !head.upcId ) {
            app.queue.next(
                app.routines.runtime.findUpcId,
                head,
                null,
                app.routines.runtime.exception
            );
        }

        if ( strap && !strap.upcId ) {
            app.queue.next(
                app.routines.runtime.findUpcId,
                strap,
                null,
                app.routines.runtime.exception
            );
        }

        // try adding to bag
        app.queue.next(
            app.routines.runtime.tryAddingToBag,
            context,
            app.routines.runtime.addToBagSuccess,
            app.routines.runtime.addToBagError
        );

    };

    app.routines.runtime.updateHeadsCategoryView = function () {
        app.views.heads.render()
        app.views.heads.hideLoader();
    };

    app.routines.runtime.updateStrapsCategoryView = function () {
        app.views.straps.render()
        app.views.straps.hideLoader();
        if ( !app.domain.bag.getHead() ) {
            app.views.straps.blockSelection();
        }
    };

    /*
     * Routines / Init
     */

    app.routines.init.failure = function ( data ) {

        // stop queue...
        this.kill();

        // log error...
        app.utils.log( 'ROUTINES/INIT/FAILURE: Error on stage #' + app.state.init );

        // display a nice message to user...
        app.routines.runtime.displayAppFailureMessage();

    };

    app.routines.init.progress = function ( data ) {
        // increment init state...
        app.state.init++;
    };

    app.routines.init.success = function ( data ) {

        var colorFilter;

        // save current list of straps as original list...
        app.domain.straps.setOriginalList();

        // save filter's initial state
        colorFilter = app.domain.straps.getFilter( app.consts.facetNameColor );
        if ( colorFilter ) {
            colorFilter.saveOptionsSnapshot();
        }

        // launch UI

        // heads view
        app.views.heads.render();
        app.views.heads.hideLoader();

        // straps view
        app.views.straps.render();
        app.views.straps.hideLoader();
        app.views.straps.blockUI();

        // log...
        app.utils.log( 'MICHELE WATCH BUILDER SUCCESSFULLY INITIALIZED!' );

    };

    app.routines.init.loadAllHeadIds = function ( qData, qCallback ) {

        app.routines.getCategoryItems( {
            categoryId: app.consts.headsCategoryId,
            processors: [
                app.utils.processors.parseStrapSizes,
                app.utils.processors.parseMicheleCollections
            ],
            callback: function () {

                var i, j, filter, option, result;

                if ( this.isOK
                    && this.items && this.items.length > 0
                    && this.results && this.results.length === 2 ) {
                    // update app domain
                    app.domain.heads.append( this.items );
                    for ( i = 0; i < this.results.length; i++ ) {
                        result = this.results[i];
                        filter = app.domain.heads.getFilter( result.id );
                        if ( !filter ) {
                            filter = new Filter( result.id, result.name );
                            app.domain.heads.addFilter( filter );
                        }
                        for ( j = 0; j < result.options.length; j++ ) {
                            option = result.options[j];
                            filter.addOption( new FilterOption( option.name, option.name, option.count ) );
                        }
                    }
                    qCallback( true, null );
                } else {
                    app.utils.log( 'ROUTINES/INIT/LOADALLHEADIDS: UNEXPECTED API CALL RESULT' );
                    qCallback( false, null );
                }

            }
        } );

    };

    app.routines.init.loadHeadsInfo = function ( qData, qCallback ) {

        app.routines.getProductsInfo( {
            categoryId: app.consts.headsCategoryId,
            ids: app.domain.heads.list,
            // needsImage: true,
            callback: function () {

                var id,
                    item,
                    head,
                    map,
                    errCount = 0,
                    prefix = 'ROUTINES/INIT/LOADHEADSINFO: ';

                if ( this.isOK && this.items !== null
                    && typeof this.items === 'object' ) {
                    map = app.domain.heads.map;
                    for ( id in map ) {
                        item = this.items[id];
                        if ( item ) {
                            head = map[id];
                            head.setName( item.name );
                            head.price = item.price;
                            head.priceBig = item.priceBig;
                            head.priceNet = item.priceNet;
                            // head.imagePdp = item.image;
                        } else {
                            errCount++;
                            app.utils.log( prefix + 'NO INFO FOUND FOR HEAD ID #' + id );
                        }
                    }
                    if ( errCount > 0 ) {
                        app.utils.log( prefix + errCount + ' ERROR(S) WHILE LOADING HEADS INFO' );
                    }
                    qCallback( true, null );
                } else {
                    qCallback( false, prefix + 'Bad API Response...' );
                }
            }
        } );

    };

    app.routines.init.loadFilteringInfo = function ( qData, qCallback ) {

        var fnAssign,
            fnCallback,
            fnDispatch,
            dtOption,
            dtOptions = app.domain.heads.getFilterOptions( qData.filter, false );

        if ( !dtOptions || dtOptions.length < 1 ) {
            qCallback( false, null );
            app.utils.log( 'ROUTINES/INIT/LOADFILTERINGINFO: NO OPTIONS FOUND FOR FILTER "' + qData.filter + '"' );
            return;
        }

        fnAssign = function ( ids, attrVal ) {
            var i,
                id,
                len = ids.length,
                attr = qData.attribute,
                heads = app.domain.heads.map;
            for ( i = 0; i < len; i++ ) {
                id = ids[i];
                if ( id in heads ) {
                    heads[id][attr] = attrVal;
                }
            }
        },
        fnCallback = function () {
            if ( this.isOK ) {
                fnAssign( this.items, dtOption.id );
                fnDispatch( this );
            } else {
                qCallback( false, null );
            }
        },
        fnDispatch = function ( args ) {
            if ( dtOptions.length <= 0 ) {
                qCallback( true, null );
            } else {
                // get next strap size in queue
                dtOption = dtOptions.shift();
                // update args object and recall 
                args.facets[ qData.filter ] = dtOption.id;
                args.pageIndex = 1;
                args.items = null;
                args.count = 0;
                app.routines.getCategoryItems( args );
            }
        };

        // dispatch request
        fnDispatch( {
            categoryId: app.consts.headsCategoryId,
            callback: fnCallback,
            facets: {}
        } );

    };

    app.routines.init.verifyHeads = function ( qData, qCallback ) {
        var id, head, count = 0, heads = app.domain.heads.map;
        for ( id in heads ) {
            head = heads[ id ];
            if ( head.isValid()
                && typeof head.collection === 'string'
                && head.collection.length > 0
                && typeof head.size === 'string'
                && head.size.length > 0 ) {
                head.isOK = true;
                continue;
            }
            count++;
            app.utils.log( 'ROUTINES/INIT/VERIFYHEADS: HEAD #' + id + ' DID NOT PASS VALIDATION...' );
        }
        if ( count > 0 ) {
            app.utils.log( 'ROUTINES/INIT/VERIFYHEADS: ' + count + ' INVALID HEADS...' );
        }
        // save current list as original list...
        app.domain.heads.setOriginalList();
        qCallback( true, null );
    };

    app.routines.init.loadStraps = function ( qData, qCallback ) {

        // issue API call...
        app.routines.getCategoryItems( {
            categoryId: app.consts.strapsCategoryId,
            processors: [ app.utils.processors.parseMicheleColors ],
            // facets: {
            //     'MICHELE_BAND_TYPE': 'Strap',
            //     'STRAP_SIZE': '16mm'
            // },
            callback: function () {
                if ( this.isOK ) {
                    if ( this.items && this.items.length > 0 ) {
                        // add just a subset of returned items...
                        app.domain.straps.append( this.items );
                        // app.domain.straps.append( this.items.slice(0, 6) );
                        if ( this.results && this.results.length > 0 ) {
                            app.routines.runtime.updateStrapFilters( this.results[0], true );
                        }
                    }
                    qCallback( true, null );
                } else {
                    qCallback( false, 'ROUTINES/INIT/LOADSTRAPS: Bad API Response...' );
                }
            }
        } );

    };

    app.routines.init.initMainFilters = function () {

        var filter;

        // band size filter... ( heads )
        filter = new Filter( app.consts.facetNameStrapSize, 'Band Size' );
        app.domain.heads.addFilter( filter );

        // band type filter... ( straps )
        filter = new Filter( app.consts.facetNameBandType, 'Band Type' );
        filter.addOption( new FilterOption( app.consts.facetValueBandTypeBracelet, 'Bracelet', 1 ) );
        filter.addOption( new FilterOption( app.consts.facetValueBandTypeStrap, 'Strap', 1 ) );
        app.domain.straps.addFilter( filter );

        // band color filter... ( straps )
        filter = new Filter( app.consts.facetNameColor, 'Band Color' );
        app.domain.straps.addFilter( filter );

    };

    app.routines.init.start = function () {

        app.domain.heads = new Category( Head );
        app.domain.straps = new Category( Item );
        app.domain.bag = new Bag();

        // initialize strap filters
        app.routines.init.initMainFilters();

        // create heads view
        app.views.heads = new CategoryView( 'head' );
        app.views.heads.init( app.domain.heads );
        app.views.heads.resetView();
        app.views.heads.displayLoader();

        // create straps view
        app.views.straps = new CategoryView( 'strap' );
        app.views.straps.init( app.domain.straps );
        app.views.straps.resetView();
        app.views.straps.displayLoader();

        // create display view
        app.views.display = new DisplayView();
        app.views.display.setImage( null );

        // create bag view
        app.views.bag = new BagView();
        app.views.bag.init( app.domain.bag );
        app.views.bag.resetView();

        // create sorting views
        app.views.sorting = {
            heads:  new SortByView( app.consts.headSortByViewport ),
            straps: new SortByView( app.consts.strapSortByViewport )
        };
        app.views.sorting.heads.init();
        app.views.sorting.straps.init();

        // create refine views
        app.views.refine = {
            size:  new RefineByView( 'blmwbs15_builder_options_refine_size' ),
            type:  new RefineByView( 'blmwbs15_builder_options_refine_type' ),
            color: new RefineByView( 'blmwbs15_builder_options_refine_color' )
        };
        app.views.refine.size.init( app.domain.heads.getFilter( app.consts.facetNameStrapSize ) );
        app.views.refine.type.init( app.domain.straps.getFilter( app.consts.facetNameBandType ) );
        app.views.refine.color.init( app.domain.straps.getFilter( app.consts.facetNameColor ) );

        // create menu view
        app.views.menu = new MenuView( app.consts.menuViewport );
        app.views.menu.init();

        // enqueue tasks
        app.queue.next(
            app.routines.init.loadAllHeadIds, // #1
            null,
            app.routines.init.progress,
            app.routines.init.failure
        ).next(
            app.routines.init.loadHeadsInfo, // #2
            null,
            app.routines.init.progress,
            app.routines.init.failure
        ).next(
            app.routines.init.loadFilteringInfo, // #3
            {
                filter: app.consts.facetNameStrapSize,
                attribute: 'size'
            },
            app.routines.init.progress,
            app.routines.init.failure
        ).next(
            app.routines.init.loadFilteringInfo, // #4
            {
                filter: app.consts.facetNameCollections,
                attribute: 'collection'
            },
            app.routines.init.progress,
            app.routines.init.failure
        ).next(
            app.routines.init.verifyHeads, // #5
            null,
            app.routines.init.progress,
            app.routines.init.failure
        ).next(
            app.routines.init.loadStraps, // #6
            null,
            app.routines.init.progress,
            app.routines.init.failure
        ).next(
            app.routines.runtime.loadStrapsInfo, // #7 ~ this is the only runtime routine in init process...
            null,
            app.routines.init.success,
            app.routines.init.failure
        );

    };

    /*
     * Actions
     */

    app.control.actions.heads.select = function ( frags, href ) {

        var head,
            heads = app.domain.heads.map,
            id = frags && frags[0];

        if ( id && id in heads ) {
            head = heads[id];
            app.routines.runtime.doSelectHead( head );
            app.utils.coremetrics( 'element', 'Select-Watch', { '29': head.id } );
        }

    };

    app.control.actions.straps.select = function ( frags, href ) {

        var strap,
            straps = app.domain.straps.map,
            id = frags && frags[0];

        if ( id && id in straps ) {
            strap = straps[id];
            app.routines.runtime.doSelectStrap( strap );
            app.utils.coremetrics( 'element', 'Select-Band', { '29': strap.id } );
        }

    };

    app.control.actions.heads.scroll = function ( frags, href ) {

        if ( frags && frags[0] ) {
            app.views.heads.scroll( frags[0] );
        }

    };

    app.control.actions.straps.scroll = function ( frags, href ) {

        if ( frags && frags[0] ) {
            app.views.straps.scroll( frags[0] );
        }

    };

    app.control.actions.bag.checkbox = function ( frags, href ) {

        var type, tag, id;

        if ( frags && frags[0] ) {
            type = frags[0];
            if ( app.domain.bag.toggleState( type ) ) {
                app.views.bag.render();

                // coremetrics...
                tag = app.domain.bag.getState( type ) ? 'Add' : 'Remove';
                if ( type === 'head' ) {
                    tag += '-Watch';
                    id = (app.domain.bag.getHead()).id
                } else {
                    tag += '-Band';
                    id = (app.domain.bag.getStrap()).id
                }
                app.utils.coremetrics( 'element', tag, { '29': id } );

            }
        }

    };

    app.control.actions.bag.add = function ( frags, href ) {
        app.routines.runtime.doAddToBag();
    };

    app.control.actions.bag.confirmation = function ( frags, href ) {

        // if ( app.domain.bag.getState( 'head' ) ) {
        //     app.domain.bag.toggleState( 'head' );
        // }

        // if ( app.domain.bag.getState( 'strap' ) ) {
        //     app.domain.bag.toggleState( 'strap' );
        // }

        // app.views.bag.render();

        app.routines.runtime.setBlockedState( false );

    };

    app.control.actions.options.refine = function ( frags, href ) {

        var operation = frags && frags[0];
        switch ( operation ) {
            case 'submit':
                app.views.refine.size.commit();
                app.views.refine.type.commit();
                app.views.refine.color.commit();
                app.routines.runtime.doRefineBy();
                app.views.menu.close();
                break;
            case 'clear':
                app.views.refine.size.clear();
                app.views.refine.type.clear();
                app.views.refine.color.clear();
                break;
        }

    };

    app.control.actions.options.sorting = function ( frags, href ) {
        var prefix, sel, id = frags && frags[0];
        switch ( id ) {
            case 'straps':
            case 'heads':
                sel = frags[1];
                prefix = sel !== app.views.sorting[id].getSelected() ? 'Select-Sort-' : 'Deselect-Sort-';
                app.views.sorting[id].select( sel );
                app.utils.coremetrics( 'element', prefix + id + '-' + sel );
                break;
            case 'submit':
                sel = app.views.sorting.heads.getSelected();
                if ( app.domain.heads.sorting !== sel ) {
                    app.views.heads.displayLoader();
                    app.domain.heads.sorting = sel;
                    app.utils.schedule( app.routines.runtime, 'updateHeadsCategoryView' );
                }
                sel = app.views.sorting.straps.getSelected();
                if ( app.domain.straps.sorting !== sel ) {
                    app.views.straps.displayLoader();
                    app.domain.straps.sorting = sel;
                    app.utils.schedule( app.routines.runtime, 'updateStrapsCategoryView' );
                }
                app.views.menu.close();
                break;
        }
    };

    app.control.actions.menu = function ( frags, href ) {
        var option = frags && frags[0];
        if ( option === 'refine' || option === 'sort' ) {
            // update refine view...
            app.views.refine.size.render();
            app.views.refine.type.render();
            app.views.refine.color.render();
            // update sorting views...
            app.views.sorting.heads.forceSelection( app.domain.heads.sorting );
            app.views.sorting.straps.forceSelection( app.domain.straps.sorting );
            // open menu...
            app.views.menu.toggle( option === 'sort' ? 1 : 0 );
        } else if ( option === 'close' ) {
            app.views.menu.close();
        }
    };

    app.control.actions.help = function ( frags, href ) {

        // clear display
        app.views.display.toggleHelp();

    };

    app.control.actions.clear = function ( frags, href ) {

        var colorFilter;

        // clear display
        app.views.display.setImage( null );

        // bag
        app.domain.bag.setHead( null );
        app.views.bag.render();

        // domains
        app.domain.heads.clearFilters();
        app.domain.heads.restoreOriginalList();
        app.domain.heads.sorting = null;
        app.domain.straps.clearFilters();
        app.domain.straps.restoreOriginalList();
        app.domain.straps.sorting = null;

        // grids
        app.views.heads.render();
        app.views.straps.render();
        app.views.straps.blockUI();

        // filters
        colorFilter = app.domain.straps.getFilter( app.consts.facetNameColor );
        if ( colorFilter ) {
            colorFilter.restoreSavedOptions();
        }

    };

    app.control.actions.acknowledge = function () {

        // just remove ui blocker and any overlays...
        app.routines.runtime.setBlockedState( false );

    };

    app.control.actions.show = function ( frags, href ) {

        // app.utils.log( 'Fragments: ' + frags.join(', ') );
        // app.utils.log( 'Href: ' + href );

        var hash = '/builder',
            intro = $( '#blmwbs15_intro' );

        $( '#blmwbs15_tabs > a' ).removeClass( 'selected' );
        $( '#blmwbs15_tab_builder' ).addClass( 'selected' );
        $( '#blmwbs15_builder' ).show();
        $( '#blmwbs15_featured' ).hide();
        $( '#blmwbs15_contents, #blmwbs15_bar' ).show();

        // change hash...
        if ( intro.is( ':visible' ) ) {
            intro.fadeOut( 500, function () {
                window.location.hash = hash;
            } );
        } else {
            window.location.hash = hash;
        }

        // set selected tab...
        window.blmwbs15.main.selected = 'builder';

        // page view...
        app.utils.coremetrics( 'page', 'builder' );

    };

    /*
     * Entry Point
     */

    app.start = function () {

        var queryString, loggerRegex = /\blog4js=true\b/;
        try {
            queryString = window.location.search + '';
            app.state.log4js = loggerRegex.test( queryString );
        } catch ( e ) { /* silence is golden... */ }

        window.setTimeout( app.routines.init.start, 0 );

    };

    return app;

} )( window, window.document, jQuery, Hammer );
