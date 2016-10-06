/**
 * Created by Alessandro Ribeiro on 10/05/16.
 */

'use strict';

require([
    'jquery',
    'coremetrics',
], function( $, Coremetrics ) {

	var APP = {
		cm: 'BWEDD',
		cmElementCat: 'BWEDD_Checklist'
	};

	APP.init = function () {
		var self = this;

		self.listeners();

		window.BLOOMIES.coremetrics.pageViewExploreAttributes.append({
			9: '?',
			37: '0037-A|0090-A',
			48: 'guest|Y|Not soft sign in'
		});

        window.BLOOMIES.coremetrics.cmCreatePageviewTag( self.cmElementCat, self.cm, '', '' );
	};

	APP.fireSectionCoremetrics = function( $section ) {
		var self = this,
			sectionName = $section.find( '.rwc-title' ).text().trim().replace( ' ', '_' ) || 'Hero',
			elementCM = {
				elementID: self.cmElementCat + '-' + sectionName,
				elementCategory: self.cmElementCat
			};

		Coremetrics.elementTag( elementCM );
	};

	APP.listeners = function () {
		$( window ).on( 'scroll', function() {
			var $sections = $( 'section.rwc-section' );

			$sections.each( function( i, el ) {
				var $section = $( el ),
					sectionTopPos = $section.offset().top,
					sectionTopMaxPos = sectionTopPos + $section.height(),
					windowTopPos = $( window ).scrollTop();

				if ( !$section.data( 'cmFired' ) && 
						( windowTopPos >= sectionTopPos &&
						windowTopPos <= sectionTopMaxPos ) ) {
					APP.fireSectionCoremetrics( $section );
					$section.data( 'cmFired', true );
					return false;
				}
			} );
		} );
	};

	$( window ).load(function() {
		APP.init();
	});

});
