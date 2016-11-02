$(document).ready(function(){

  var $ = jQuery,
        coreMetricsDefaultPageID = 'MBL:fall14_newbornessentials',
        lookbooks, currentLookbook;

    function runDesktopLookbooks(){
      var newbornLookBook = new BloomiesLookbook($('#qa-auto-look-book'), {
                                initialLoop: false,
                                loop: false,
                                showLeftNavOnOne: false,
                                startPage: 0,
                                stickyNav: true,
                                transitionDirection: 'vertical',
                                transitionStyle: 'pageScroll'
                              }),
      toysLookBook =  new BloomiesLookbook($('.toys-lookbook'), {
                                initialLoop: false,
                                transitionStyle: 'slide'
                              }),
      clothingLookBook =  new BloomiesLookbook($('.clothing-lookbook'), {
                                initialLoop: false,
                                transitionStyle: 'slide'
                              }),
      beddingLookBook =   new BloomiesLookbook($('.bedding-lookbook'), {
                                initialLoop: false,
                                transitionStyle: 'slide'
                              }),
      feedingLookBook =   new BloomiesLookbook($('.feeding-lookbook'), {
                                initialLoop: false,
                                transitionStyle: 'slide'
                              }),
      gearLookBook =  new BloomiesLookbook($('.gear-lookbook'), {
                                initialLoop: false,
                                transitionStyle: 'slide'
                              });

      newbornLookBook.activate(true);
      toysLookBook.activate();
      clothingLookBook.activate();
      beddingLookBook.activate();
      feedingLookBook.activate();
      gearLookBook.activate();

      // save loobook refs
      lookbooks = {
        'toys': toysLookBook,
        'clothing': clothingLookBook,
        'bedding': beddingLookBook,
        'feeding': feedingLookBook,
        'gear': gearLookBook
      };

    }

    function showOverlay(overlayName){
      var overlayElement = $('.overlay-wrapper'),
          overlayTop = $(window).scrollTop() - overlayElement.parent().offset().top,
          overlayLeft = overlayElement.parent().width() / 2 - 465;
      $('.overlay-background').addClass('is-visible');
      overlayElement.addClass('is-visible').css({
          top: (overlayTop > 0 ? overlayTop : 0) + 10,
          left: overlayLeft
      });
      $('.overlay-header')
        .removeClass()
        .addClass('overlay-header ' + overlayName);

      $('.overlay-action-items')
        .removeClass()
        .addClass('overlay-action-items ' + overlayName);

      $('.lookbook-wrapper').removeClass('is-visible');
      $('.' + overlayName + '-lookbook').addClass('is-visible');

      $('.overlay-tips-wrapper').addClass('is-visible');

      $('.tip-section').removeClass('is-visible');
      $('.tip-section.' + overlayName).addClass('is-visible');

      $('.sprite-shop-all').removeClass('is-visible');
      $('.sprite-shop-all.' + overlayName).addClass('is-visible');

      $('[data-cm-category-base]').data('cm-category-base', overlayName);

      if (lookbooks && overlayName in lookbooks) {
        currentLookbook = lookbooks[overlayName];
      }

    }

    function hideOverlay(){
      $('.overlay-background, .overlay-wrapper, .overlay-size-chart').removeClass('is-visible');
      if ( currentLookbook ) {
        currentLookbook.goToPage(1);
        currentLookbook = void 0;
      }
      $('[data-cm-category-base]').data('cm-category-base', "");
    }

    function attachDesktopEvents(){
      $('.launch-overlay').click(function(event) {
        showOverlay($(this).data('show-overlay'));
      });

      // HIDE OVERLAY
      $('.overlay-background, .overlay-close').click(function(event) {
        hideOverlay();
      });

      // wack navigation for a elements in pagination qa-auto-pagination_container
      $('.lookbook-pagination a[href^=#], .lookbook-footer .back-to-top').click(function(event) {
        var href = $(this).attr('href');
        if ( typeof href === 'string' && href.indexOf('#') === 0 ) {
          event.preventDefault();
          window.location.hash = href.replace(/#([^\/].*)$/, '#/$1');
        }
      });

      $('.overlay-general.btn-size').click(function(event) {
        $('.overlay-size-chart').addClass('is-visible');
      });

      $('.size-chart-close-button, .size-chart-background').click(function(event) {
        $('.overlay-size-chart').removeClass('is-visible');
      });

      $('*[data-cm-pageview-tag]').click(function(event) {
        var thisPageViewID = $(this).data('cm-pageview-tag'),
            thisCategory = coreMetricsDefaultPageID;

        BLOOMIES.coremetrics.cmCreatePageviewTag('mbl:' + thisPageViewID, thisCategory);
      });

      $('*[data-cm-element-tag]').click(function(event) {
        var thisElementTag = $(this).data('cm-element-tag'),
            thisCategory = coreMetricsDefaultPageID;

        if ($(this).data('cm-prepend-cat') === true) {
          thisElementTag = $('[data-cm-category-base]').data('cm-category-base') + '-' + thisElementTag;
        }

        if ($(this).data('cm-append-cat') === true) {
          thisElementTag = thisElementTag + '-' + $('[data-cm-category-base]').data('cm-category-base') ;
        }

        BLOOMIES.coremetrics.cmCreatePageElementTag('mbl:' + thisElementTag, thisCategory);
      });

      // swipe events
      Hammer('.overlay-wrapper .lookbook-page-wrapper').on('swipe drag', function (e) {
        var d, s;
        // stop default actions
        e.gesture.stopPropagation();
        e.gesture.preventDefault();
        // check for swipe
        if ( e.type === 'swipe' ) {
          d = e.gesture.direction;
          if ( d === Hammer.DIRECTION_LEFT || d === Hammer.DIRECTION_RIGHT ) {
            s = (d === Hammer.DIRECTION_RIGHT) ? '.btn-prev' : '.btn-next';
            $(this).siblings(s).trigger('click');
          }
        }
      });

      // update url hash when scrolling
      $(window).load(function () {

        var timer,
            hash,
            anchors = {},
            currentHash,
            $w = $(window);

        function getHash() {
          var hash = window.location.hash;
          if ( typeof hash !== 'string' ) {
            hash = '';
          }
          if ( hash.indexOf('#') === 0 ) {
            hash = hash.substring(1);
          }
          return hash;
        }

        function hashUpdater() {
          var hash = getHash();
          if ( hash !== currentHash ) {
            window.location.hash = currentHash;
          }
          timer = void 0;
        }

        function updateHash(newHash) {
          if ( currentHash !== newHash ) {
            currentHash = newHash;
            if ( typeof timer !== 'undefined' ) {
              window.clearTimeout(timer);
            }
            timer = window.setTimeout(hashUpdater, 500);
          }
        }

        $('a.scroll-anchor').each(function () {
          var o, n, a = $(this);
          n = a.attr('name');
          if ( typeof n === 'string' ) {
            o = +(a.data('scroll-offset')) || 0;
            anchors['/' + n] = Math.floor(a.offset().top + o);
          }
        });

        $w.scroll(function () {
          var n, t, nh, h = 0, st = $w.scrollTop();
          if ( st === 0 ) {
            nh = '#';
          } else {
            for ( n in anchors ) {
              t = anchors[n];
              if ( st >= t && t > h ) {
                  h = t;
                  nh = n;
              }
            }
          }
          if ( nh ) {
            updateHash(nh);
          }
        });

        // navigate to hash on load
        if ( (hash = getHash()) in anchors ) {
          window.setTimeout(function () {
            $("body, html").animate({
                scrollTop: anchors[hash]
            }, 500);
          }, 500);
        }

      });

      // BLOOMIES.coremetrics.cmCreatePageElementTag(cmCatId, cmCategory, attributes);
      // BLOOMIES.coremetrics.cmCreatePageviewTag(cmPageID, cmCategoryID, searchTerm, searchResults);
    }

    function getAssetsHost () {
      var $paramsElm = $("#bcom_serverside_parameters"),
          localHostUrl = "//" + window.location.host,
          paramsElmHostUrl = $paramsElm && $paramsElm.attr("data-host-assets") ?  $paramsElm.attr("data-host-assets") : "";
      return paramsElmHostUrl.length > 0 ? paramsElmHostUrl : localHostUrl;
    }

    function getShraringLinks () {
        var location = window.location,
            pageURL = escape(location.protocol + "//" + location.host + location.pathname),
            assetsHost = getAssetsHost(),
            pinterestMedia = escape(assetsHost + "/images/projects/fashion-tips/baby-essentials-must-haves-checklist/icon_pinterest.jpg"),
            pinterestDescription = escape("The Essentials: Baby Love | bloomingdales.com");
        return {
            facebook: "https://www.facebook.com/sharer/sharer.php?u=" + pageURL,
            pinterest: "http://pinterest.com/pin/create/button/?url=" + pageURL + "&media=" + pinterestMedia + "&description=" + pinterestDescription,
            twitter: "https://twitter.com/home?status=Shopping%20for%20two%3F%20Check%20out%20our%20list%20of%20baby%20essentials%20@bloomingdales.com%20http%3A//bit.ly/1CpFCyP"
        };
    }

    $('div.layout-desktop').hide();
    $('div.layout-mobile').show();

    var categoryName = 'fall15_babylove',
        wasClick = false,
        hash = window.location.hash,
        sharingLinks = getShraringLinks();

    // if( hash == '') {
    //   hash = '#/mbl_clothing';
    //   window.location.hash = hash;
    //   BLOOMIES.coremetrics.cmCreatePageviewTag('fall15_babylove--hp', categoryName);
    // }

    window.setTimeout(function () {
      navigateToSection(hash);
    }, 2000);
    
    $( 'div.mobile-menu-link' ).on( 'click', function ( event ) {

      event.stopPropagation();

      wasClick = true;
      
      var target = $( this ),
          targetArrow = $( this ).children( 'i' ),
          drawerCM = target.data( 'cm' );

          console.log(target);
          
       if( target.siblings().hasClass( 'active' ) ) {
        target.siblings().slideUp('fast').removeClass( 'active' );
        targetArrow.removeClass( 'fa-angle-up' ).addClass( 'fa-angle-down' );
        BLOOMIES.coremetrics.cmCreatePageElementTag( 'mbl:' + drawerCM + '-close_drawer', categoryName );
      } else {
        target.parent().siblings().children('.section-content').removeClass('active').slideUp('fast').siblings().children('i').removeClass( 'fa-angle-up' ).addClass( 'fa-angle-down' );
        targetArrow.removeClass( 'fa-angle-down' ).addClass( 'fa-angle-up' );
        target.siblings().slideDown('fast').addClass( 'active' );


        BLOOMIES.coremetrics.cmCreatePageElementTag( 'mbl:' + drawerCM + '-expand_drawer', categoryName );
        BLOOMIES.coremetrics.cmCreatePageviewTag('mbl:fall15_babylove--' + drawerCM, categoryName);

        window.setTimeout(function () {
          $('html, body').animate({ scrollTop: target.offset().top }, 500);
        }, 350);

      }

    } );

    $( 'a.mobile-artwork-link' ).click( function ( event ) {
    var attrCm = $(this).data('cm');
    if ( typeof attrCm === 'string' && attrCm.length > 0 ) {
        BLOOMIES.coremetrics.cmCreatePageElementTag( 'mbl:' + attrCm, categoryName );
    }
  });

    function navigateToSection(sectionID) {

      var emptyHash = false;

      console.log(sectionID);

      if( sectionID == '') {
        sectionID = '#/mbl_clothing';
        emptyHash = true;
        BLOOMIES.coremetrics.cmCreatePageviewTag('mbl:fall15_babylove--hp', categoryName);
      }

      console.log(sectionID);


      var currentSection = sectionID.substring(2) + '-menu',
          target = $( '#' + currentSection ),
          targetArrow = target.children( 'i' ),
          drawerCM = target.data( 'cm' );

      if( !target.siblings().hasClass( 'active' ) ) {
        target.parent().siblings().children('.section-content').removeClass('active').slideUp('fast').siblings().children('i').removeClass( 'fa-angle-up' ).addClass( 'fa-angle-down' );
        targetArrow.removeClass( 'fa-angle-down' ).addClass( 'fa-angle-up' );
        target.siblings().slideDown('fast').addClass( 'active' );
        BLOOMIES.coremetrics.cmCreatePageviewTag('mbl:fall15_babylove--' + drawerCM, categoryName);

      }
      window.setTimeout(function () {
        if( !emptyHash ){
          $('html, body').animate({ scrollTop: target.offset().top }, 500);
        }else {
          $('html, body').animate({ scrollTop: 0 }, 500);              
        }
      }, 350);
    }         

    // fire page view tag for mobile

    $( window ).on( 'hashchange' , function() {

      var hash = window.location.hash;
      if ( ( hash.indexOf( '#/' ) >= 0 || hash === '' ) && !wasClick ) {
        navigateToSection(hash);
      }
        wasClick = false;
    });

    $('.btn-facebook').attr('href', sharingLinks.facebook);
    $('.btn-twitter').attr('href', sharingLinks.twitter);
    $('.btn-pinterest').attr('href', sharingLinks.pinterest);
    
});