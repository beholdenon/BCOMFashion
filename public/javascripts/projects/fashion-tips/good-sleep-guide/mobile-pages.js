/* global window */

	"use strict";

	define( [ 'jquery', window ], function ( $, g ) {
		var kTypeFn = 'function',
			kTypeObj = 'object',
			kAnimSpeed = 450,
			kDisplayVisible = 'block',
			kDisplayHidden = 'none',
			kClassFadingOut = 'page-fading-out';

		var DOMRootElement = $( 'html, body' );

		/*
		 * Constructor
		 */

		function Page( rootNode ) {
			this.isLocked = false;
			this.isShowing = true;
			this.id = null;
			this.index = 0;
			this.rootNode = ( rootNode !== null && typeof rootNode === kTypeObj ) ? $( rootNode ) : null;
		}

		Page.prototype.show = function ( animated, callback ) {

			var self = this;

			if ( self.isLocked || self.isShowing ) {
				return;
			}

			if ( animated ) {
				self.isLocked = true;
				self.rootNode.css( { 'opacity': 0.0, 'display': kDisplayVisible } ).fadeTo( kAnimSpeed, 1.0, function () {
					self.isLocked = false;
					self.isShowing = true;
					( typeof callback === kTypeFn && callback.call( g, self ) );
				} );
			} else {
				self.rootNode.css( { 'display': kDisplayVisible, 'opacity': 1.0 } );
				self.isShowing = true;
			}

		};

		Page.prototype.hide = function ( animated, callback ) {

			var self = this;

			if ( self.isLocked || !self.isShowing ) {
				return;
			}

			if ( animated ) {
				self.isLocked = true;
				self.rootNode.addClass( kClassFadingOut ).fadeTo( kAnimSpeed, 0.0, function () {
					self.rootNode.css( 'display', kDisplayHidden ).removeClass( kClassFadingOut );
					self.isShowing = false;
					self.isLocked = false;
					( typeof callback === kTypeFn && callback.call( g, self ) );
				} );
			} else {
				self.rootNode.css( 'display', kDisplayHidden );
				self.isShowing = false;
			}

		};

		function SingleSelectionPage( rootNode ) {

			var self;

			if ( rootNode === null || typeof rootNode !== kTypeObj ) {
				throw ( this.kErrPrefix + 'Invalid Root Node' );
			}

			self = this;
			self.rootNode = $( rootNode );
			self.pages = [];
			self.currentlyShowing = null;

			self.rootNode.children( 'article[data-id]' ).each( function ( index, element ) {
				element = new Page( element );
				element.index = index;
				element.id = element.rootNode.attr( 'data-id' );
				element.hide( false );
				self.pages.push( element );
			} );

			( self.pages.length > 0 && ( ( self.currentlyShowing = self.pages[0] ).show( false ) ) );

		}

		SingleSelectionPage.prototype = new Page( null );
		SingleSelectionPage.prototype.kErrPrefix = 'SingleSelectionPage: ';
		SingleSelectionPage.prototype.getCurrentPageId = function () {
			var id = null;
			if ( this.currentlyShowing ) {
				id = this.currentlyShowing.id;
			}
			return id;
		};
		SingleSelectionPage.prototype.getCurrentPageDOMAttr = function ( attrName ) {
			var attrVal = null;
			if ( this.currentlyShowing ) {
				attrVal = this.currentlyShowing.rootNode.attr( attrName );
			}
			return attrVal;
		};
		SingleSelectionPage.prototype.goToPage = function ( pageId, animated, callback ) {

			var i,
				sel,
				pages = this.pages,
				limit = pages.length;

			for ( i = 0; i < limit; i++ ) {
				if ( pages[i].id === pageId ) {
					sel = pages[i];
					break;
				}
			}

			if ( sel && sel.id !== this.currentlyShowing.id ) {
				this.currentlyShowing.hide( animated );
				( this.currentlyShowing = sel ).show( animated, callback ); 
			}

		};


		function MultipleScrollingPage( rootNode ) {

			var self;

			if ( rootNode === null || typeof rootNode !== kTypeObj ) {
				throw ( this.kErrPrefix + 'Invalid Root Node' );
			}

			self = this;
			self.isScrolling = false;
			self.rootNode = $( rootNode );
			self.pages = [];
			self.currentlyShowing = null;

			self.rootNode.children( 'article[data-id]' ).each( function ( index, element ) {
				element = new Page( element );
				element.index = index;
				element.id = element.rootNode.attr( 'data-id' );
				self.pages.push( element );
			} );

			( self.pages.length > 0 && ( ( self.currentlyShowing = self.pages[0] ).show( false ) ) );

		}

		MultipleScrollingPage.prototype = new Page( null );
		MultipleScrollingPage.prototype.kErrPrefix = 'MultipleScrollingPage: ';
		MultipleScrollingPage.prototype.getCurrentPageId = SingleSelectionPage.prototype.getCurrentPageId;
		MultipleScrollingPage.prototype.getCurrentPageDOMAttr = SingleSelectionPage.prototype.getCurrentPageDOMAttr;
		MultipleScrollingPage.prototype.goToPage = function ( pageId, animated, callback ) {

			var i, offset, found, limit, self = this;

			if ( self.isScrolling ) {
				return;
			}

			for ( i = 0, limit = self.pages.length; i < limit; i++ ) {
				if ( self.pages[i].id === pageId ) {
					found = self.pages[i];
					break;
				}
			}

			if ( found ) {
				if ( !animated ) {
					self.currentlyShowing = found;
					return;
				}
				offset = found.rootNode.offset();
				if ( offset ) {
					self.isScrolling = true;
					DOMRootElement.animate( { scrollTop: offset.top }, kAnimSpeed, function () {
						if ( self ) {
							self.currentlyShowing = found;
							self.isScrolling = false;
							( typeof callback === kTypeFn && callback.call( g, self ) );
							self = null; // prevent callback being triggered twice...
						}
					} );
				}
			}

		};

		/*
		 * Utility Functions
		 */

		/*
		 * Exported Module
		 */

		var exportedModule = {
			'Page': Page,
			'SingleSelectionPage': SingleSelectionPage,
			'MultipleScrollingPage': MultipleScrollingPage,
			'pageWithSubpages': function ( rootNode, pageType ) {
				var ObjType;
				if ( typeof pageType === 'string'
					&& pageType.search( /^[A-Z]/ ) === 0
					&& pageType in exportedModule ) {
					ObjType = exportedModule[ pageType ];
					return new ObjType( rootNode );
				}
				return null;
			}
		};

		return exportedModule;

	} );