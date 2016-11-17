/* Globals Hammer */ 

(function() {
  var $ = jQuery,
    coreMetricsDefaultPageID = 'fall14_newbornessentials',
    lookbooks, currentLookbook;


  $(document).ready(function() {

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

      // SHOW OVERLAY
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

          BLOOMIES.coremetrics.cmCreatePageviewTag(thisPageViewID, thisCategory);
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

          BLOOMIES.coremetrics.cmCreatePageElementTag(thisElementTag, thisCategory);
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
            var o,
                a = $(this),
                n = a.attr('name');
            if ( typeof n === 'string' ) {
              o = +(a.data('scroll-offset')) || 0;
              anchors['/' + n] = Math.floor(a.offset().top + o) - getScrollTopOffset($w, getPageHeader());
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
                  scrollTop: anchors[hash] - getScrollTopOffset($w, getPageHeader())
              }, 500);
            }, 500);
          }

        });

        // BLOOMIES.coremetrics.cmCreatePageElementTag(cmCatId, cmCategory, attributes);
        // BLOOMIES.coremetrics.cmCreatePageviewTag(cmPageID, cmCategoryID, searchTerm, searchResults);
      }

      function getAssetsHost () {
          var $paramsElm = $("#bcom_serverside_parameters"),
              localHostUrl = "http://" + window.location.host,
              paramsElmHostUrl = $paramsElm && $paramsElm.attr("data-host-assets") ? $paramsElm.attr("data-host-assets") : "";
          return paramsElmHostUrl.length > 0 ? paramsElmHostUrl : localHostUrl;
      }

      // SOCIAL
      var sharingLinks = (function ($, location) {

            // Get page url for Pinterest share url
            var pageURL = escape(location.protocol + "//" + location.host + location.pathname),

                // Get asset host and with protocol
                assetsHost = getAssetsHost(),

                // Get 'og:*' properties and compose Facebook share popup url
                $ogProperties = $('[property^="og"]'),
                fbTitle = $ogProperties.filter('[property="og:title"]').eq(0).attr('content'),
                fbDescription = $ogProperties.filter('[property="og:description"]').eq(0).attr('content'),
                fbImageUrl = $ogProperties.filter('[property="og:image"]').eq(0).attr('content'),
                fbPath = $ogProperties.filter('[property="og:url"]').eq(0).attr('content'),
                fbUrl = 'https://www.facebook.com/dialog/feed' + '?app_id=145634995501895' +
                  '&name=' + encodeURIComponent(fbTitle) +
                  '&description=' + encodeURIComponent(fbDescription) +
                  '&link=' + encodeURIComponent(assetsHost) + fbPath +
                  '&picture=' + encodeURIComponent('http://' + window.location.host + fbImageUrl) +
                  '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/'),

                // Compose pinterest url
                pinterestMedia = escape(assetsHost + "/fashion/images/projects/fashion-tips/baby-essentials-must-haves-checklist/icon_pinterest.jpg"),
                pinterestDescription = escape(fbTitle);

          // Forward link urls to requester
          return {
              facebook: fbUrl,
              pinterest: "http://pinterest.com/pin/create/button/?url=" + pageURL + "&media=" + pinterestMedia + "&description=" + pinterestDescription,
              twitter: "https://twitter.com/home?status=Shopping%20for%20two%3F%20Check%20out%20our%20list%20of%20baby%20essentials%20@bloomingdales.com%20http%3A//bit.ly/1CpFCyP"
          };
      })($, window.location);

      // START THE LOOKBOOK
      $('.sprite-btn-facebook').attr('href', sharingLinks.facebook);
        // .click(function (e) {
        //     e.preventDefault();
        //         // core metrics
        //         // share on facebook
        //     window.open(sharingLinks.facebookURL, '_blank', 'width=608,height=342'); 
        //     // self.coremetrics('Element', self.cm, 'social-fb');
        // });

      $('.sprite-btn-twitter').attr('href', sharingLinks.twitter);
      $('.sprite-btn-pinterest').attr('href', sharingLinks.pinterest);

      runDesktopLookbooks();
      attachDesktopEvents();

      // fix white border issue
      $('#bl_main_wrapper').css('min-width', '1000px');

  });

  $(function () {

    // Fire general pageview tag
    BLOOMIES.coremetrics.cmCreatePageviewTag('fall14_newbornessentials-hp', coreMetricsDefaultPageID);

  });

})();
