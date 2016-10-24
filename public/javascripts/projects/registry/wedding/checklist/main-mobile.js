/**
 * Created by Alessandro Ribeiro on 10/05/16.
 */

'use strict';

require([
    'jquery'
], function( $ ) {

	var APP = {
		cm: 'BWEDD',
		cmElementCat: 'MBL:BWEDD_Checklist'
	};

	APP.init = function () {
		var self = this;

		self.topNavPos = $('.rwc-topnav-container').offset().top;
        self.listeners();

		window.BLOOMIES.coremetrics.pageViewExploreAttributes.append({
			9: '?',
			37: '0037-A|0090-A',
			48: 'guest|Y|Not soft sign in'
		});

        window.BLOOMIES.coremetrics.cmCreatePageviewTag( self.cmElementCat, self.cm, '', '' );
	};

	APP.fireSectionCoremetrics = function( $section, isPageViewTag, attributes ) {
		var self = this,
			sectionName = $section.find( '.rwc-title' ).text().trim().replace( ' ', '_' ) || 'Hero',
			elementID = self.cmElementCat + '-' + sectionName,
			elementCat = self.cmElementCat,
			attrVal;
			
		if ( attributes ) {
			for (var attrNum in attributes) {
				if (attributes.hasOwnProperty( attrNum )) {
					attrVal = attributes[ attrNum ];
					for ( var i = parseInt( attrNum ); i > 1; i-- ) {
						attrVal = '-_-' + attrVal;
					}
				}
			}
		}

		if ( isPageViewTag ) {
			window.BLOOMIES.coremetrics.pageViewExploreAttributes = '';
			window.BLOOMIES.coremetrics.cmCreatePageviewTag( elementID, elementCat.replace('MBL:', ''), '', '' );
		} else {
			window.BLOOMIES.coremetrics.cmCreatePageElementTag( elementID, elementCat, attrVal );
		}
	};

	APP.stickyTopNav = function( windowTopPos ) {
		var topnav = $('.rwc-topnav-container'),
			rwcContainer = $('.registry-wedding-checklist'),
			body = $( 'body' );


		if ( windowTopPos >= APP.topNavPos ) {
			if ( !topnav.hasClass( 'sticky' ) ) {
				topnav.remove();
				body.append( topnav );
				topnav.addClass('sticky');
				APP.handleTopNav();
			}
		} else {
			if ( topnav.hasClass( 'sticky' ) ) {
				topnav.remove();
				rwcContainer.prepend( topnav );
				topnav.removeClass('sticky');
				APP.handleTopNav();
			}
		}
	};

	APP.handleTopNav = function() {
		var menu = $( '.rwc-topnav-sub' ),
			head = $( '.rwc-topnav-head' );

		head.on( 'click', function() {
			if ( menu.hasClass( 'opened' ) ) {
				menu.slideUp( 300 ).removeClass( 'opened' );
				head.removeClass( 'opened' );
			} else {
				menu.slideDown( 300 ).addClass( 'opened' );
				head.addClass( 'opened' );
			}
		} );

		$( '.rwc-topnav-sublink' ).on( 'click', function() {
			var sectionName = this.href.substring( ( this.href.indexOf( '#' ) + 1 ), this.href.length ),
				$section = $( 'section.rwc-' + sectionName ),
				topPos = sectionName === 'settings' ? 130 : 80;

			menu.slideUp( 300 ).removeClass( 'opened' );
			head.removeClass( 'opened' );

			$('html, body').animate({
				scrollTop: $('.rwc-' + sectionName).offset().top - topPos
			}, 'slow');

			APP.fireSectionCoremetrics( $section, false, {
				2: APP.cmElementCat
			} );
		} );
	};

	APP.handleScroll = function() {
		$( window ).on( 'scroll', function() {
			var $sections = $( 'section.rwc-section' ),
				windowTopPos = $( window ).scrollTop();

			$sections.each( function( i, el ) {
				var $section = $( el ),
					sectionTopPos = $section.offset().top,
					sectionTopMaxPos = sectionTopPos + $section.height();

				if ( !$section.data( 'cmFired' ) && ( windowTopPos >= sectionTopPos && windowTopPos <= sectionTopMaxPos ) ) {
					APP.fireSectionCoremetrics( $section, true );
					$section.data( 'cmFired', true );
					return false;
				}
			} );

			APP.stickyTopNav( windowTopPos );
		} );
	};

	APP.listeners = function () {
		APP.handleScroll();
		APP.handleTopNav();
	};

	$( window ).load(function() {
		APP.init();
	});

});
