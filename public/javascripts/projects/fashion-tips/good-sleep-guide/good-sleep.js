require( [ 'jquery', window.BLOOMIES.coremetrics ], function ( $, Coremetrics ) {
	document.body.className += ' fall15_utilityfinder_loading';

	var isDebugMode = window.location.search && window.location.search.indexOf('debug=true'),
		$ = jQuery,
		baseUrlAssets = '/fashion/images/projects/fashion-tips/good-sleep-guide/',
  		baseUrlScriptAssets = '/fashion/javascripts/projects/fashion-tips/good-sleep-guide/',
  		baseUrlStyleAssets = '/fashion/styles/projects/fashion-tips/good-sleep-guide/',
		CHOICE_LINK_MAP = {
			'on-my-side:down':                '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type,Pillow_density,Productsperpage/Pillow,Duck%20Down%7CAllergy%20Free%20Down%7CFeather%2FDown,Firm,180?id=1004679',
			'on-my-side:down-alternative':    '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type_site,Pillow_density_site/Pillow,Down Alternative,Firm?id=1004679',
			'on-my-side:memory-foam':         '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type_site,Pillow_density_site/Pillow,Memory Foam,Firm?id=1004679',
			'on-my-back:down':                '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type,Pillow_density,Productsperpage/Pillow,Duck%20Down%7CAllergy%20Free%20Down%7CFeather%2FDown,Medium,180?id=1004679',
			'on-my-back:down-alternative':    '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type_site,Pillow_density_site/Pillow,Down Alternative,Medium|Medium%2FFirm|Soft%2FMedium?id=1004679',
			'on-my-back:memory-foam':         '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type_site,Pillow_density_site/Pillow,Memory Foam,Medium|Medium%2FFirm?id=1004679',
			'on-my-stomach:down':             '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type,Pillow_density,Productsperpage/Pillow,Duck%20Down%7CAllergy%20Free%20Down%7CFeather%2FDown,Soft,180?id=1004679',
			'on-my-stomach:down-alternative': '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type_site,Pillow_density_site/Pillow,Down Alternative,Soft?id=1004679',
			'on-my-stomach:memory-foam':      '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Fill_type_site,Pillow_density_site/Pillow,Memory Foam,Soft?id=1004679',
			'warm-and-cozy:yes':              '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Comforter_weight,Fill_type,Productsperpage/Comforter,Heavy%7CMedium,Down%20Alternative%7CAllergy%20Free%20Down,180?id=1004679',
			'warm-and-cozy:no':               '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Comforter_weight_site,Fill_type_site/Comforter,Heavy|Medium,Duck Down?id=1004679',
			'a-little-cooler:yes':            '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Comforter_weight,Fill_type,Productsperpage/Comforter,Light%7CMedium,Down%20Alternative%7CAllergy%20Free%20Down,180?id=1004679',
			'a-little-cooler:no':             '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,Comforter_weight_site,Fill_type_site/Comforter,Light|Medium,Duck Down?id=1004679'
		};

	var Utils = {};

	Utils.options = function(options, option, value) {
		if(typeof option === 'undefined') {
			return options;
		}
		else if(typeof option === 'string') {
			if(typeof value === 'undefined') return options[option];
			if(typeof options[option] === 'undefined') return;
			options[option] = value;
		}
		else if(typeof option === 'object') {
			for(var i in options) {
				if(typeof option[i] !== 'undefined') {
					options[i] = option[i];
				}
			}
		}
	};

	Utils.throttle = function(fn, threshold, scope) {
		threshold || (threshold = 250);
		var ran = false;
		var next,
		deferTimer;
		return function() {
			var context = scope || this;
			var now = +new Date,
			args = arguments;
			if(next && now < next) {
				clearTimeout(deferTimer);
				deferTimer = setTimeout(function() {
					next += threshold;
					fn.apply(context, args);
				}, next - now);
			}
			else {
				next = (next || now) + threshold;
				fn.apply(context, args);
				ran = true;
			}
		};
	};

	var Coremetrics = (function() {
		var opts = {
			debug: false,
			mobile: false,
			prefix: ''
		},
		categoryName = '';

		this.lastPageView =  null;

		this.convertAttributes = function(attributes) {
			var i, index, value, list;
			if (typeof attributes === 'object' && attributes !== null) {
				list = [];
				for (index in attributes) {
					value = attributes[index];
					index = +index - 1;
					for (i = list.length; i < index; i++) {
						list[i] = '';
					}
					list[index] = value;
				}
				return list.join('-_-');
			}
			return null;
		};

		this.pageView = function(key, attributes) {
			if(key == this.lastPageView) return;
			this.lastPageView = key;
			var newKey = opts.prefix + '--' + key;
			this.trigger(newKey, attributes, 'cmCreatePageviewTag');
		};

		this.element = function(key, attributes) {
			this.trigger(key, attributes, 'cmCreatePageElementTag');
		};

		this.trigger = function(tagValue, attributes, tagFunction) {
			var cmAttributes = Coremetrics.convertAttributes(attributes),
				preparedTagValue = (window.BLOOMIES.isMobile ? 'mbl:' + tagValue : tagValue);
			if(opts.debug) {
				console.log('Coremetrics', tagFunction, categoryName, preparedTagValue, cmAttributes);
			}
			try {
				Coremetrics[tagFunction](preparedTagValue, categoryName, cmAttributes);
			}
			catch(e) {
				console.log('Coremetrics is not enabled');
			}
		};

		this.options = function(option, value) {
			var options = Utils.options(opts, option, value);
			if(typeof options !== 'undefined') return options;
			categoryName = (opts.mobile ? 'mbl:' : '') + opts.prefix;
		};

		return this;

	}());

	var Sections = (function(selector) {

		selector || (selector = 'body');

		var module = {};

		module.$window;
		module.$element = null;
		module.currentSection = null;
		module.sections = {};

		// Detect and configure all the sections for the given selector
		module.configureSections = function() {
			module.$element.find('[data-section]').each(function(index, element) {
				var $element = $(element);
				var id = $element.attr('data-section');
				module.sections[id] = {
					'id': id,
					'$element': $element,
					'main': typeof $element.attr('data-section-main') !== 'undefined'
				};
			});
		};

		// Set the height of each section
		module.defineSectionsHeight = function() {
			if(!module.$element.is(':visible')) return;
			var sections = module.sections;
			for(var i in sections) {
				var currentSection = sections[i];
				currentSection.begin = currentSection.$element.offset().top;
				currentSection.height = currentSection.$element.height();
				currentSection.end = currentSection.begin + currentSection.height;
			}
		};

		// Update the URL hash with the current section
		module.updateCurrentSection = function() {
			if(!module.$element.is(':visible')) return;
			var section = module.getCurrentSection();
			if(!module.currentSection || (module.currentSection && section && module.currentSection.id != section.id)) {
				module.currentSection = section;
				!section || $.address.value(section.id);
				Coremetrics.pageView(section && section.id && !section.main ? section.id : 'hp');
			}
		};

		// Returns how much percent of a section is visible in the browser's viewport
		module.getSectionVisibility = function(vp, sec) {
			var visibleHeight;
			if(sec.begin > vp.end) {
				return 0;
			}
			else if(sec.begin < vp.begin) {
				if(sec.end < vp.begin) {
					return 0;
				}
				else if(sec.end <= vp.end) {
					visibleHeight = (sec.end - vp.begin);
				}
				else {
					visibleHeight = (sec.height - (vp.begin - sec.begin) - (sec.end - vp.end));
				}
			}
			else {
				if(sec.end <= vp.end) {
					visibleHeight = sec.height;
				}
				else {
					visibleHeight = (vp.end - sec.begin);
				}
			}
			return visibleHeight / sec.height;
		};

		// Get the current section based on section's visibility percentage
		module.getCurrentSection = function() {
			var secs = module.sections;
			var visible = [];

			var vp = {};
			vp.begin = module.$window.scrollTop();
			vp.height = module.$window.height();
			vp.end = vp.begin + vp.height;

			for(var i in secs) {
				var sec = secs[i];
				var visibility = module.getSectionVisibility(vp, sec);
				if(visibility) {
					visible.push([sec, visibility]);
				}
			}

			if(visible.length === 1) {
				return visible[0][0];
			}
			else if(visible.length) {
				return visible.sort(function(a, b) {
					return a[1] - b[1];
				}).pop()[0];
			}
			return null;
		};

		// Define the event handlers for the module
		module.eventHandlers = {
			resize: Utils.throttle(module.defineSectionsHeight),
			scroll: Utils.throttle(module.updateCurrentSection)
		};

		// Define the event listeners for the module
		module.defineEventListeners = function() {
			module.$window.on('resize', module.eventHandlers.resize);
			module.$window.on('scroll', module.eventHandlers.scroll);
		};

		module.init = function() {
			module.$window = $(window);
			module.$element = $(selector);
			module.configureSections();
			module.defineSectionsHeight();
			module.defineEventListeners();
			module.updateCurrentSection();
		};

		module.init();

		return module;

	});

	var ScrollerSections = (function(config) {

		config || (config = {});
		config.margin || (config.margin = 0);

		var module = Sections(config.selector);

		module.config = config;
		module.scrolling = false;

		var originalUpdateCurrentSection = module.updateCurrentSection;
		module.updateCurrentSection = function() {
			if(!module.scrolling) {
				originalUpdateCurrentSection.apply(this, arguments);
			}
		}

		// Check if the given keyCode is a key that triggers scroll
		module.isScrollKey = function(keyCode) {
			return keyCode === 9 || (keyCode > 31 && keyCode < 41);
		}

		// Scroll the window to a specific element
		module.scrollToElement = function(selector, duration) {
			duration || (duration = 1000);
			var offset = $(selector).offset();
			if(!offset) return;
			module.scrolling = true;
			$('html, body').stop().animate({scrollTop: offset.top - module.config.margin}, duration, module.eventHandlers.animateScroll);
		};

		// Scroll the window to a named section
		module.scrollToSection = function(sectionId, duration) {
			if(sectionId && module.sections[sectionId]) {
				module.scrollToElement(module.sections[sectionId].$element, duration);
			}
		};

		// Cancel scroll when the user interact with the page while it's scrolling
		module.cancelScroll = function(e) {
			if(e && e.type === 'keyup' && !module.isScrollKey(e.which)) return;
			$('body').stop();
			module.scrolling = false;
			module.updateCurrentSection();
		};

		// Increment the event handlers for the module
		module.$window.off('scroll', module.eventHandlers.scroll);
		module.eventHandlers.scroll = function() {
			if(!module.scrolling) {
				module.updateCurrentSection();
				module.cancelScroll();
			}
		};
		module.eventHandlers.cancelScroll = Utils.throttle(module.cancelScroll);
		module.eventHandlers.animateScroll = function() {
			module.scrolling = false;
		};

		// Define the event listeners for the module
		module.defineEventListeners = function() {
			$('body').on('mousedown DOMMouseScroll mousewheel keyup touchmove', module.eventHandlers.cancelScroll);
			module.$window.on('resize orientationchange', module.eventHandlers.cancelScroll)
			module.$window.on('scroll', Utils.throttle(module.eventHandlers.scroll));
		};

		module.init = function(sections) {
			module.defineEventListeners();
		};

		module.init();

		return module;

	});

	var SocialMedia = (function() {

		var module = {};

		var base = {
			facebook: '//www.facebook.com/dialog/feed?app_id=145634995501895&',
			pinterest: '//pinterest.com/pin/create/button/?',
			twitter: '//twitter.com/home?'
		};

		module.config = null;

		module.configure = function() {
			var assetsHost = module.config.assetsHost || '';
			var serverURL = 'http://' + location.hostname;
			var baseURL = 'http://www.bloomingdales.com';
			module.config.pageURL = (serverURL.indexOf('.fds.com') !== -1 ? serverURL : baseURL) + module.config.pageURL;

			module.config.facebook.link = module.config.pageURL;
			module.config.facebook.redirect_uri = 'https://www.facebook.com/';
			module.config.facebook.picture = assetsHost + module.config.facebook.picture;

			module.config.pinterest.url = module.config.pageURL;
			module.config.pinterest.media = assetsHost + module.config.pinterest.media;
		};

		module.getURL = function(social) {
			return base[social] + $.param(module.config[social]);
		};

		module.init = function(config) {
			module.config = config;

			module.configure();

			$(config.selector).find('a[data-social]').each(function() {
				var $element = $(this);
				$element.attr('href', module.getURL($element.attr('data-social')));
			});
		};

		return module;

	})();

	var StickyTopMenu = (function(config) {

		var module = {};

		module.config = config;

		var $sticky = $(config.selector);
		var $carrot = $(config.carrotSelector);
		var $links = $(config.linksSelector);

		var duration = config.animationDuration || 400;

		// Reposition the carrot according to the selected link
		module.reposition = function(path) {
			var $link = $links.filter('[href="#/' + path + '"]');
			$link.length || ($link = $links.filter('[href="#/"]'));
			var width = $link.width();
			var left = parseInt($link.css('marginLeft')) + $link.position().left;
			$links.removeClass(config.markedClass);
			$link.addClass(config.markedClass);
			$carrot.stop().animate({
				left: left,
				width: width
			}, duration);
		};

		// Define the event handlers for the module
		module.eventHandlers = {
			addressChange: function(event) {
				var path = event.path.replace('/', '');
				module.reposition(path);
			}
		};

		// Define the event listeners for the module
		module.defineEventListeners = function() {
			$.address.change(module.eventHandlers.addressChange);
		};

		module.init = function() {
			module.defineEventListeners();
			$carrot.css('visibility', 'visible');
		};

		module.init();

		return module;

	});

	var Chapters = (function() {

		var module = {};

		var $container;
		var $chapters;

		module.currentChapter = null;

		// Define the event handlers for the module
		module.eventHandlers = {
			addressChange: function(event) {
				var chapterId = event.path.replace('/', '');
				var selector = '[data-chapter="' + chapterId + '"]';
				var footerID = $chapters.filter(selector).attr('data-footer');
				$chapters.not(selector).hide();
				$('.fall15_utilityfinder_footer').hide();
				$chapters.filter(selector).show();
				if(footerID){
					$( '#fall15_utilityfinder_footer-' + footerID ).show();
				}
				module.currentChapter = chapterId;
				if(chapterId === '') {
					Coremetrics.pageView('hp');
				} else {
					Coremetrics.pageView(chapterId);
				}
			}
		};

		// Define the event listeners for the module
		module.defineEventListeners = function() {
			$.address.change(module.eventHandlers.addressChange);
		};

		module.init = function(config) {
			$container = $(config.containerSelector);
			$chapters = $container.find(config.chapterSelector);
			module.defineEventListeners();
		};

		return module;

	})();

	var Common = (function() {

		var module = {};

		module.config = null;
		module.sections = null;

		// Define the event handlers for the module
		module.eventHandlers = {
			linkClick: function(event) {
				Coremetrics.element($(this).attr('data-cm'));
				event.stopPropagation();
			}
		};

		// Define the event listeners for the module
		module.defineEventListeners = function() {
			// Trigger Coremetrics for each link
			$(module.config.container).find('a[data-cm]').on('click', module.eventHandlers.linkClick);
		};

		module.init = function(config) {
			$(document.body).removeClass('fall15_utilityfinder_loading').addClass('fall15_utilityfinder_loaded');
			$(config.container).css('display', 'block');
			module.config = config;
			Coremetrics.options(module.config.coremetrics);
			SocialMedia.init(module.config.socialMedia);
			module.defineEventListeners();
			module.config.mainModule.init(module.config);
		};
		return module;

	})();

	var Desktop = (function() {

		var module = {};

		module.$window = null;
		module.pageSlider = null;

		// Change the page's viewport to fit on tablets
		module.changeViewport = function() {
			$('meta[name=viewport]').remove();
			$('<meta name="viewport" content="width=1000, zoom=0.8" />').appendTo('head');
		};

		// Define the event handlers for the module
		module.eventHandlers = {
		};

		// Define the event listeners for the module
		module.defineEventListeners = function() {
		};

		module.init = function(config) {
			module.$window = $(window);
			module.config = config;
			module.changeViewport();
			module.stickyTopMenu = new StickyTopMenu(config.stickyTopMenu);
			Chapters.init(config.chapters);
			module.defineEventListeners();
		};

		return module;

	})();

	var Mobile = (function() {

		var module = {};

		module.$window = null;
		module.config = null;
		module.isBusy = false;
		module.isRestoringState = false;
		module.scrollerSections = null;
		module.rootNode = null;
		module.pages = null;
		module.selectedPage = null;
		module.answers = null;
		module.menu = null;
		module.links = CHOICE_LINK_MAP;

		// Load the Mobile CSS
		module.loadCSS = function( callback ) {
			var stylesURL = window.baseUrlStyleAssets || '';
			$('html').attr('style', $('#fall15_utilityfinder_loader').attr('style')).css('height', '100%');
		};

		module.loadImages = function () {
			module.rootNode.find( 'img.lazy-img' ).each( function () {
				var img = $( this ),
					src = img.attr( 'data-lazy-img' );
				img.removeAttr( 'data-lazy-img' );
				img.attr( 'src', src );
			} );
		};

		// Define the event handlers for the module
		module.eventHandlers = {
			nearJump: function ( innerPageId, callback ) {
				if ( !module.isBusy && module.selectedPage ) {
					module.isBusy = true;
					module.selectedPage.goToPage( innerPageId, true, function () {
						module.saveState();
						module.isBusy = false;
						( typeof callback === 'function' && callback.call( module ) );
						window.setTimeout( function () {
							var attr = module.selectedPage.getCurrentPageDOMAttr( 'data-cmpid' );
							if ( attr ) {
								Coremetrics.pageView( attr );
							}
						}, 0 );
					} );
				}
			},
			farJump: function ( outerPageId, innerPageId, callback ) {
				var sel, outerPage;
				if ( module.isBusy ) {
					return;
				}
				outerPage = module.getPageById( outerPageId ),
				sel = ( module.selectedPage || null );
				if ( outerPage !== null && ( sel === null || sel.id !== outerPageId ) ) {
					module.isBusy = true;
					if ( sel ) {
						sel.hide( true );
					}
					outerPage.goToPage( innerPageId, false );
					outerPage.show( true, function () {
						module.selectedPage = outerPage;
						module.saveState();
						module.isBusy = false;
						( typeof callback === 'function' && callback.call( module ) );
						window.setTimeout( function () {
							var attr = outerPage.getCurrentPageDOMAttr( 'data-cmpid' );
							if ( attr ) {
								Coremetrics.pageView( attr );
							}
						}, 0 );
					} );
					module.switchTopNav();
				}
			},
			pickOption: function ( option, innerPageId ) {
				var match,
					qk, qv,
					regex = /^(q[12]):([\w\-]+)$/;
				if ( ( match = regex.exec(option) ) !== null ) {
					qk = match[1], qv = match[2];
					if ( qk === 'q1' ) {
						module.answers.q2 = null;
					}
					module.answers[qk] = qv;
				}
				if ( innerPageId ) {
					module.eventHandlers.nearJump.call( module, innerPageId );
				} else if ( module.answers.q1 && module.answers.q2
					&& ( qk = module.answers.q1 + ':' + module.answers.q2 ) in module.links ) {
					window.open( module.links[qk] );
				}
			},
			topNav: function ( option ) {
				var img, flyingNav = module.menu.filter( '.flying' );
				if ( option === 'switch' ) {
					img = flyingNav.children( 'a' ).eq( 1 ).children( 'img' ).eq( 0 );
					module.eventHandlers.farJump.call( module, img.attr( 'data-target' ), 'start' );
				}
				flyingNav.css( 'display', ( flyingNav.is( ':visible' ) ? 'none' : 'block' ) );
			}
		};

		// Define the event listeners for the module
		module.defineEventListeners = function () {
			module.rootNode.on( 'click', 'a', function ( event ) {
				var match,
					args,
					regex = /\/([^\/]+)/g,
					anchor = $( this ),
					cmid = anchor.attr( 'data-cmid' ),
					href = anchor.attr( 'href' );
				if ( typeof cmid === 'string' ) {
					Coremetrics.element( cmid );
				}
				if ( typeof href === 'string' && href.indexOf( '#/' ) === 0 ) {
					event.preventDefault();
					event.stopPropagation();
					args = [];
					while ( ( match = regex.exec( href ) ) !== null ) {
						args.push( match[1] );
					}
					if ( args.length > 0 ) {
						match = args.shift();
						if ( match in module.eventHandlers ) {
							module.eventHandlers[match].apply( module, args );
						}
					}
				}
			} );
			window.addEventListener( 'popstate', function ( event ) {
				if (isDebugMode) {
					console.log(event);
				}
				var args,
					action,
					page,
					subpage,
					q1, q2,
					selPage = module.selectedPage;
				if ( selPage && event.state && event.state.page ) {
					page = event.state.page;
					subpage = event.state.subpage;
					q1 = event.state.q1, q2 = event.state.q2;
					if ( selPage.id !== page ) {
						action = 'farJump';
						args = [ page, subpage ];
					} else if ( subpage ) {
						action = 'nearJump';
						args = [ subpage ];
					}
					if ( action ) {
						args.push( function () {
							module.answers.q1 = q1;
							module.answers.q2 = q2;
							module.isRestoringState = false;
						} );
						module.isRestoringState = true;
						module.eventHandlers[action].apply( module, args );
					}
				}
			}, false );
			// //{ DEBUG ONLY
			// $( 'body' ).on( 'keydown', function ( event ) {
			// 	var action, args;
			// 	event.preventDefault();
			// 	switch ( String.fromCharCode( event.keyCode ) ) {
			// 		case 'A':
			// 			action = 'farJump';
			// 			args = [ 'the-good-sleep-guide', 'start' ];
			// 			break;
			// 		case 'B':
			// 			action = 'farJump';
			// 			args = [ 'bedding-basics', 'start' ];
			// 			break;
			// 	}
			// 	if ( action && args ) {
			// 		module.eventHandlers[action].apply( module, args );
			// 	}
			// } );
			// //}
		};

		module.cssCallback = function () {
			// module.scrollerSections = ScrollerSections();
		};

		module.loadExternalModules = function () {
			window.require( [ '/fashion/javascripts/projects/fashion-tips/good-sleep-guide/mobile-pages.js' ], function ( pagesModule ) {
				module.rootNode.find( 'section[data-page-type]' ).each( function ( index, element ) {
					var page = pagesModule.pageWithSubpages( element, $( element ).attr( 'data-page-type' ) );
					if ( page !== null ) {
						page.id = page.rootNode.attr( 'data-id' );
						page.index = index;
						page.hide( false );
						module.pages.push( page );
					}
				} );
				( module.pages.length > 0 && ( ( module.selectedPage = module.pages[0] ).show( false ) ) );
				module.saveState();
				Coremetrics.pageView( 'hp' );
			} );
		};

		module.getPageById = function ( pageId ) {
			var i, limit, found = null;
			for ( i = 0, limit = module.pages.length; i < limit; i++ ) {
				if ( module.pages[i].id === pageId ) {
					found = module.pages[i];
					break;
				}
			}
			return found;
		};

		module.saveState = function () {
			if ( module.isRestoringState ) {
				return;
			}
			try {
				var subpage, page = module.selectedPage;
				if ( page ) {
					subpage = page.getCurrentPageId();
					page = page.id;
					window.history.pushState( {
						page: page,
						subpage: subpage,
						q1: module.answers.q1,
						q2: module.answers.q2
					}, null, '#/' + page + ( subpage ? '/' + subpage : '' ) );
				}
			} catch ( e ) { /* silence is golden... */ }
		};

		module.switchTopNav = function () {
			( module.menu && module.menu.each( function ( index, element ) {
				var ia, ib, aa, ab, a = $( element ).children( 'a' );
				if ( a.length === 2 ) {
					aa = a.eq( 0 ), ab = a.eq( 1 );
					ia = aa.children( 'img' ).eq( 0 );
					ib = ab.children( 'img' ).eq( 0 );
					aa.prepend( ib.remove() );
					ab.append( ia.remove() );
				}
			} ) );
		};

		module.init = function( config ) {

			module.$window = $( window );
			module.config = config;
			module.isBusy = false;
			module.isRestoringState = false;
			module.rootNode = $( config.container ).eq( 0 );
			module.pages = [];
			module.selectedPage = null;
			module.answers = { q1: null, q2: null };
			module.menu = module.rootNode.children( 'nav' );
			module.defineEventListeners();
			module.loadImages();
			module.loadExternalModules();

		};

		return module;

	})();

	jQuery(window).ready(function() {
		var coremetricsCategory = 'fall15_utility';
		var assetsHost = typeof baseUrlAssets !== 'undefined' ? baseUrlAssets : '';

		var getSocialMediaSettings = function(selector) {
			return {
				selector: selector,
				assetsHost: assetsHost,
				pageURL: '//fashion.bloomingdales.com/fashion-tips/good-sleep-guide/',
				facebook: {
					name: 'THE GOOD SLEEP GUIDE | bloomingdales.com',
					description: 'Discover the perfect pillows and comforters based on how you sleep with our simple guide. The rest is easy.',
					picture: 'F15_Utility_Facebook.jpg'
				},
				twitter: {
					status: 'Discover the perfect pillows and comforters based on how you sleep @bloomingdales.com' + getSocialMediaSettings.pageURL
				},
				pinterest: {
					description: 'THE GOOD SLEEP GUIDE | bloomingdales.com',
					media: 'F15_Utility_Pinterest.jpg'
				}
			};
		};

		var desktopSettings = {
			mainModule: Desktop,
			container: '#fall15_utilityfinder_desktop',
			coremetrics: {
				mobile: false,
				prefix: coremetricsCategory
			},
			stickyTopMenu: {
				selector: '#fall15_utilityfinder_navbar',
				carrotSelector: '#fall15_utilityfinder_carrot',
				linksSelector: '#fall15_utilityfinder_navbar > a',
				markedClass: 'fall15_utilityfinder_marked'
			},
			chapters: {
				containerSelector: '#fall15_utilityfinder_desktop',
				chapterSelector: '.fall15_utilityfinder_chapter'
			},
			socialMedia: getSocialMediaSettings('#fall15_utilityfinder_social')
		};

		var mobileSettings = {
			mainModule: Mobile,
			container: '#fall15_utilityfinder_mobile',
			coremetrics: {
				mobile: true,
				prefix: coremetricsCategory
			},
			socialMedia: getSocialMediaSettings('#fall15_utilityfinder_mob_social')
		}

		// Detect Device and get its settings
		var config = window.BLOOMIES.isMobile ? mobileSettings : desktopSettings;

		// Initialize modules
		Common.init(config);

		$('.basics-links').on('click', function ( event ) {
			event.preventDefault();
			var targetID = $(this).data('cm'),
				scrollPosition = $('#' + targetID ).offset().top;
			$('html, body').animate({ scrollTop: scrollPosition }, 500);
    	});

    	$('.footer-learnmore').on('click', function ( event ) {
    		
    		var targetID = $(this).data('target'),
    			scrollPosition;
    		setTimeout(function() {
    			scrollPosition = $('#' + targetID ).offset().top;
    			$('html, body').animate({ scrollTop: scrollPosition }, 500);
    		}, 200);
    			
    	});

    	$('.basics-to-finder').on('click', function ( event ) {
    		
    		setTimeout(function() {
    			var scrollPosition = $('#fall15_utilityfinder_desktop').offset().top;
    			$('html, body').animate({ scrollTop: scrollPosition }, 500);
    		}, 200);
    			
    	});

    	$('.quiz-option-link').on('click', function ( event ) {
    		var baseBeddingURL = '//www.bloomingdales.com/shop/home/designer-down-pillows-comforters/Bed_type,',
    			linkProjectID = '?id=1004679',
    			pillowFilter = 'Fill_type,Pillow_density/Pillow,',
    			comforterFilter = 'Comforter_weight,Fill_type/Comforter,',
    			choiceID = $(this).data('choice');

			// Comforters
    		if( choiceID === 'Heavy' || choiceID === 'Light' ) {
    			$( '#fall15_utilityfinder_comforters-yes' ).attr( 'href', baseBeddingURL + comforterFilter + choiceID + '|Medium,Down Alternative' + linkProjectID );
    			$( '#fall15_utilityfinder_comforters-no' ).attr( 'href',  baseBeddingURL + comforterFilter + choiceID + '|Medium,Duck Down' + linkProjectID );
			}

			// Pillows
    		else {
				$( '#fall15_utilityfinder_pillows-down' ).attr( 'href', baseBeddingURL + pillowFilter + 'Duck Down,' + choiceID + linkProjectID );
    			$( '#fall15_utilityfinder_pillows-down_alternative' ).attr( 'href', baseBeddingURL + pillowFilter + 'Down Alternative,' + choiceID + linkProjectID );
    			$( '#fall15_utilityfinder_pillows-memory_foam' ).attr( 'href', baseBeddingURL + pillowFilter + 'Memory Foam,' + choiceID + linkProjectID );
    		}
    	});
	});

});

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
/*! jQuery Address v1.6 | (c) 2009, 2013 Rostislav Hristov | jquery.org/license */
(function(c){c.address=function(){var s=function(a){a=c.extend(c.Event(a),function(){for(var b={},f=c.address.parameterNames(),m=0,p=f.length;m<p;m++)b[f[m]]=c.address.parameter(f[m]);return{value:c.address.value(),path:c.address.path(),pathNames:c.address.pathNames(),parameterNames:f,parameters:b,queryString:c.address.queryString()}}.call(c.address));c(c.address).trigger(a);return a},g=function(a){return Array.prototype.slice.call(a)},k=function(){c().bind.apply(c(c.address),Array.prototype.slice.call(arguments));return c.address},da=function(){c().unbind.apply(c(c.address),Array.prototype.slice.call(arguments));return c.address},G=function(){return A.pushState&&d.state!==h},T=function(){return("/"+n.pathname.replace(new RegExp(d.state),"")+n.search+(H()?"#"+H():"")).replace(S,"/")},H=function(){var a=n.href.indexOf("#");return a!=-1?n.href.substr(a+1):""},q=function(){return G()?T():H()},U=function(){return"javascript"},M=function(a){a=a.toString();return(d.strict&&a.substr(0,1)!="/"?"/":"")+a},t=function(a,b){return parseInt(a.css(b),10)},C=function(){if(!I){var a=q();if(decodeURI(e)!=decodeURI(a))if(v&&x<7)n.reload();else{v&&!J&&d.history&&u(N,50);e=a;B(o)}}},B=function(a){u(ea,10);return s(V).isDefaultPrevented()||s(a?W:X).isDefaultPrevented()},ea=function(){if(d.tracker!=="null"&&d.tracker!==D){var a=c.isFunction(d.tracker)?d.tracker:i[d.tracker],b=(n.pathname+n.search+(c.address&&!G()?c.address.value():"")).replace(/\/\//,"/").replace(/^\/$/,"");if(c.isFunction(a))a(b);else if(c.isFunction(i.urchinTracker))i.urchinTracker(b);else if(i.pageTracker!==h&&c.isFunction(i.pageTracker._trackPageview))i.pageTracker._trackPageview(b);else i._gaq!==h&&c.isFunction(i._gaq.push)&&i._gaq.push(["_trackPageview",decodeURI(b)])}},N=function(){var a=U()+":"+o+";document.open();document.writeln('<html><head><title>"+l.title.replace(/\'/g,"\\'")+"</title><script>var "+y+' = "'+encodeURIComponent(q()).replace(/\'/g,"\\'")+(l.domain!=n.hostname?'";document.domain="'+l.domain:"")+"\";<\/script></head></html>');document.close();";if(x<7)j.src=a;else j.contentWindow.location.replace(a)},Z=function(){if(E&&Y!=-1){var a,b,f=E.substr(Y+1).split("&");for(a=0;a<f.length;a++){b=f[a].split("=");if(/^(autoUpdate|history|strict|wrap)$/.test(b[0]))d[b[0]]=isNaN(b[1])?/^(true|yes)$/i.test(b[1]):parseInt(b[1],10)!==0;if(/^(state|tracker)$/.test(b[0]))d[b[0]]=b[1]}E=D}e=q()},aa=function(){if(!$){$=r;Z();c('a[rel*="address:"]').address();if(d.wrap){var a=c("body");c("body > *").wrapAll('<div style="padding:'+(t(a,"marginTop")+t(a,"paddingTop"))+"px "+(t(a,"marginRight")+t(a,"paddingRight"))+"px "+(t(a,"marginBottom")+t(a,"paddingBottom"))+"px "+(t(a,"marginLeft")+t(a,"paddingLeft"))+'px;" />').parent().wrap('<div id="'+y+'" style="height:100%;overflow:auto;position:relative;'+(K&&!window.statusbar.visible?"resize:both;":"")+'" />');c("html, body").css({height:"100%",margin:0,padding:0,overflow:"hidden"});K&&c('<style type="text/css" />').appendTo("head").text("#"+y+"::-webkit-resizer { background-color: #fff; }")}if(v&&!J){a=l.getElementsByTagName("frameset")[0];j=l.createElement((a?"":"i")+"frame");j.src=U()+":"+o;if(a){a.insertAdjacentElement("beforeEnd",j);a[a.cols?"cols":"rows"]+=",0";j.noResize=r;j.frameBorder=j.frameSpacing=0}else{j.style.display="none";j.style.width=j.style.height=0;j.tabIndex=-1;l.body.insertAdjacentElement("afterBegin",j)}u(function(){c(j).bind("load",function(){var b=j.contentWindow;e=b[y]!==h?b[y]:"";if(e!=q()){B(o);n.hash=e}});j.contentWindow[y]===h&&N()},50)}u(function(){s("init");B(o)},1);if(!G())if(v&&x>7||!v&&J)if(i.addEventListener)i.addEventListener(F,C,o);else i.attachEvent&&i.attachEvent("on"+F,C);else fa(C,50);"state"in window.history&&c(window).trigger("popstate")}},ga=function(a){a=a.toLowerCase();a=/(chrome)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},h,D=null,y="jQueryAddress",F="hashchange",V="change",W="internalChange",X="externalChange",r=true,o=false,d={autoUpdate:r,history:r,strict:r,wrap:o},z=function(){var a={},b=ga(navigator.userAgent);if(b.browser){a[b.browser]=true;a.version=b.version}if(a.chrome)a.webkit=true;else if(a.webkit)a.safari=true;return a}(),x=parseFloat(z.version),K=z.webkit||z.safari,v=!c.support.opacity,i=function(){try{return top.document!==h&&top.document.title!==h?top:window}catch(a){return window}}(),l=i.document,A=i.history,n=i.location,fa=setInterval,u=setTimeout,S=/\/{2,9}/g;z=navigator.userAgent;var J="on"+F in i,j,E=c("script:last").attr("src"),Y=E?E.indexOf("?"):-1,O=l.title,I=o,$=o,ba=r,L=o,e=q();if(v){x=parseFloat(z.substr(z.indexOf("MSIE")+4));if(l.documentMode&&l.documentMode!=x)x=l.documentMode!=8?7:8;var ca=l.onpropertychange;l.onpropertychange=function(){ca&&ca.call(l);if(l.title!=O&&l.title.indexOf("#"+q())!=-1)l.title=O}}if(A.navigationMode)A.navigationMode="compatible";if(document.readyState=="complete")var ha=setInterval(function(){if(c.address){aa();clearInterval(ha)}},50);else{Z();c(aa)}c(window).bind("popstate",function(){if(decodeURI(e)!=decodeURI(q())){e=q();B(o)}}).bind("unload",function(){if(i.removeEventListener)i.removeEventListener(F,C,o);else i.detachEvent&&i.detachEvent("on"+F,C)});return{bind:function(){return k.apply(this,g(arguments))},unbind:function(){return da.apply(this,g(arguments))},init:function(){return k.apply(this,["init"].concat(g(arguments)))},change:function(){return k.apply(this,[V].concat(g(arguments)))},internalChange:function(){return k.apply(this,[W].concat(g(arguments)))},externalChange:function(){return k.apply(this,[X].concat(g(arguments)))},baseURL:function(){var a=n.href;if(a.indexOf("#")!=-1)a=a.substr(0,a.indexOf("#"));if(/\/$/.test(a))a=a.substr(0,a.length-1);return a},autoUpdate:function(a){if(a!==h){d.autoUpdate=a;return this}return d.autoUpdate},history:function(a){if(a!==h){d.history=a;return this}return d.history},state:function(a){if(a!==h){d.state=a;var b=T();if(d.state!==h)if(A.pushState)b.substr(0,3)=="/#/"&&n.replace(d.state.replace(/^\/$/,"")+b.substr(2));else b!="/"&&b.replace(/^\/#/,"")!=H()&&u(function(){n.replace(d.state.replace(/^\/$/,"")+"/#"+b)},1);return this}return d.state},strict:function(a){if(a!==h){d.strict=a;return this}return d.strict},tracker:function(a){if(a!==h){d.tracker=a;return this}return d.tracker},wrap:function(a){if(a!==h){d.wrap=a;return this}return d.wrap},update:function(){L=r;this.value(e);L=o;return this},title:function(a){if(a!==h){u(function(){O=l.title=a;if(ba&&j&&j.contentWindow&&j.contentWindow.document){j.contentWindow.document.title=a;ba=o}},50);return this}return l.title},value:function(a){if(a!==h){a=M(a);if(a=="/")a="";if(e==a&&!L)return;e=a;if(d.autoUpdate||L){if(B(r))return this;if(G())A[d.history?"pushState":"replaceState"]({},"",d.state.replace(/\/$/,"")+(e===""?"/":e));else{I=r;if(K)if(d.history)n.hash="#"+e;else n.replace("#"+e);else if(e!=q())if(d.history)n.hash="#"+e;else n.replace("#"+e);v&&!J&&d.history&&u(N,50);if(K)u(function(){I=o},1);else I=o}}return this}return M(e)},path:function(a){if(a!==h){var b=this.queryString(),f=this.hash();this.value(a+(b?"?"+b:"")+(f?"#"+f:""));return this}return M(e).split("#")[0].split("?")[0]},pathNames:function(){var a=this.path(),b=a.replace(S,"/").split("/");if(a.substr(0,1)=="/"||a.length===0)b.splice(0,1);a.substr(a.length-1,1)=="/"&&b.splice(b.length-1,1);return b},queryString:function(a){if(a!==h){var b=this.hash();this.value(this.path()+(a?"?"+a:"")+(b?"#"+b:""));return this}a=e.split("?");return a.slice(1,a.length).join("?").split("#")[0]},parameter:function(a,b,f){var m,p;if(b!==h){var P=this.parameterNames();p=[];b=b===h||b===D?"":b.toString();for(m=0;m<P.length;m++){var Q=P[m],w=this.parameter(Q);if(typeof w=="string")w=[w];if(Q==a)w=b===D||b===""?[]:f?w.concat([b]):[b];for(var R=0;R<w.length;R++)p.push(Q+"="+w[R])}c.inArray(a,P)==-1&&b!==D&&b!==""&&p.push(a+"="+b);this.queryString(p.join("&"));return this}if(b=this.queryString()){f=[];p=b.split("&");for(m=0;m<p.length;m++){b=p[m].split("=");b[0]==a&&f.push(b.slice(1).join("="))}if(f.length!==0)return f.length!=1?f:f[0]}},parameterNames:function(){var a=this.queryString(),b=[];if(a&&a.indexOf("=")!=-1){a=a.split("&");for(var f=0;f<a.length;f++){var m=a[f].split("=")[0];c.inArray(m,b)==-1&&b.push(m)}}return b},hash:function(a){if(a!==h){this.value(e.split("#")[0]+(a?"#"+a:""));return this}a=e.split("#");return a.slice(1,a.length).join("#")}}}();c.fn.address=function(s){this.data("address")||this.on("click",function(g){if(g.shiftKey||g.ctrlKey||g.metaKey||g.which==2)return true;var k=g.currentTarget;if(c(k).is("a")){g.preventDefault();g=s?s.call(k):/address:/.test(c(k).attr("rel"))?c(k).attr("rel").split("address:")[1].split(" ")[0]:c.address.state()!==undefined&&!/^\/?$/.test(c.address.state())?c(k).attr("href").replace(new RegExp("^(.*"+c.address.state()+"|\\.)"),""):c(k).attr("href").replace(/^(#\!?|\.)/,"");c.address.value(g)}}).on("submit",function(g){var k=g.currentTarget;if(c(k).is("form")){g.preventDefault();g=c(k).attr("action");k=s?s.call(k):(g.indexOf("?")!=-1?g.replace(/&$/,""):g+"?")+c(k).serialize();c.address.value(k)}}).data("address",true);return this}})(jQuery);
