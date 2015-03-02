BLOOMIES.isTouch = Modernizr.touch;
BLOOMIES.coremetrics.pageViewExploreAttributes = new BLOOMIES.coremetrics.exploreAttributes();

$(document).ready(function(){
  var $ = jQuery,
      coreMetricsDefaultPageID = 'spring15_luxshoehandbag',
      pageViewFlag = Date.now(),
      nua = navigator.userAgent,
      is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1)),
      lookbooks, currentLookbook;

    function runDesktopLookbooks(){
      window.shoeLookBook = new BloomiesLookbook($('#qa-auto-look-book'), {
                                initialLoop: false,
                                loop: false,
                                showLeftNavOnOne: false,
                                startPage: 0,
                                stickyNav: false,
                                transitionDirection: 'vertical',
                                transitionStyle: 'pageScroll'
                              });

      window.shoeLookBook.activate();

      // tablet navigation
      if ($('header.tablet').length > 0) {
        window.shoeLookBook.kill();
        $('.pagination-item').on('touchstart', function(event) {
// console.log($('#qa-auto-look-book *[data-page-number="'+ $(this).data('for-page-number') +'"]'));
          if ($('#qa-auto-look-book *[data-page-number="'+ $(this).data('for-page-number') +'"]').length > 0) {
            $('body, html').animate({scrollTop: $('#qa-auto-look-book *[data-page-number="'+ $(this).data('for-page-number') +'"]').offset().top}, 500);
          }

        });
      }

      if (BLOOMIES.isTouch) {
        $('.lookbook-wrapper').addClass('is-touch');
      }

    }


    // lazy load
    var lazyFlag = false,
        elems = document.querySelectorAll('.js-lazy');

    elems = [].slice.call(elems);
    
    function lazyLoad(event){
      elems.forEach(function(element) {

          // swap image
          element.setAttribute('src', element.getAttribute('data-img-src'));
          
          // update classes
          $(element).removeClass('js-lazy');
          $(element).addClass('js-lazy-loaded');

          // update elems array
          elems = document.querySelectorAll('.js-lazy');
          elems = [].slice.call(elems);
      });

    }


    function fireCmPageTagsOnScroll(){
      var elems = document.querySelectorAll('.lookbook-page');

          elems = [].slice.call(elems);

          elems.forEach(function(element){
            if (element.getBoundingClientRect().top > 0 && 
                element.getBoundingClientRect().top <= 100) {

                if ( (pageViewFlag + 500) <= Date.now() ) {
                  BLOOMIES.coremetrics.cmCreatePageviewTag(element.getAttribute('data-cm-pageview-tag'), coreMetricsDefaultPageID);
                  pageViewFlag = Date.now();
                }

            }
          });
    }

    function stickyFooter() {
      var lookbookFooter = document.querySelectorAll('.lookbook-footer')[0],
          heroWrap = document.querySelectorAll('.hero-wrapper')[0],
          siteFooter = document.querySelectorAll('#cmFooterBar')[0];
      
      if (heroWrap.getBoundingClientRect().top < 0 && 
          siteFooter.getBoundingClientRect().top >= window.innerHeight) {
        $(lookbookFooter).addClass('is-stuck');
      } else {
        $(lookbookFooter).removeClass('is-stuck');
      }
    }


    // lock menu -- add a wrapper and stuck/unstick based on the position of the wrapper
    // THIS IS WRITTEN FOR ONE ELEMENT ONLY!!! DON'T JUST COPY/PASTE UNLESS YOU HAVE ONLY ONE
    // ELEMENT TO STICK!!!
    function addStickyWrapper () {
      var elem = document.querySelectorAll('.js-sticky')[0];
      elem.insertAdjacentHTML('beforebegin', '<div class="js-sticky-wrapper sticky-wrapper"></div>');
    }

    function copyElIntoWrapper(){
      var elemWrapper = document.querySelectorAll('.js-sticky-wrapper')[0],
          elem = document.querySelectorAll('.js-sticky')[0];

      elemWrapper.appendChild(elem);

      // the right thing to do would be to compute the width, height, and position of the
      // wrapped element and apply the to the wrapper...i'm not going to do that here though
    }

    function lockToTop(){
      var elemWrapper = document.querySelectorAll('.js-sticky-wrapper')[0],
          elem = document.querySelectorAll('.js-sticky')[0];

      if (elemWrapper.getBoundingClientRect().top <= 0) {
        $(elem).addClass('is-stuck');
      } else {
        $(elem).removeClass('is-stuck');
      }

    }

    function attachDesktopEvents(){

      // wack navigation for a elements in pagination qa-auto-pagination_container
      $('.lookbook-pagination a[href^=#], .lookbook-footer .back-to-top').click(function(event) {
        var href = $(this).attr('href');
        if ( typeof href === 'string' && href.indexOf('#') === 0 ) {
          event.preventDefault();
          window.location.hash = href.replace(/#([^\/].*)$/, '#/$1');
        }
      });

      //open/close nav menu
      var paginationWrapper = document.querySelectorAll('.lookbook-pagination')[0],
          paginationWrapperBG = document.querySelectorAll('.lookbook-pagination-bg')[0],
          pagFlag = 0;

      $(paginationWrapper).on('click touchstart', function(){
        if (Date.now() <= (pagFlag + 500)) { 
          
        } else {
          if ($(paginationWrapper).hasClass('is-open')) {
            $(paginationWrapper).removeClass('is-open');
            $(paginationWrapperBG).removeClass('is-open');
            $(paginationWrapper).scrollTop(0);
          } else {
            $(paginationWrapper).addClass('is-open');
            $(paginationWrapperBG).addClass('is-open');
          }
          pagFlag = Date.now();
        }
        
      });

      $(paginationWrapperBG).on('mousedown touchstart', function(){
        $(paginationWrapper).trigger('click');
      });

      // $('*[data-cm-pageview-tag]').on('mousedown touchstart', function(event) {
      //   var thisPageViewID = $(this).data('cm-pageview-tag'),
      //       thisCategory = coreMetricsDefaultPageID;

      //   BLOOMIES.coremetrics.cmCreatePageviewTag(thisPageViewID, thisCategory);
      // });

      $('*[data-cm-element-tag]').on('mousedown touchstart', function(event) {
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

      // fire pageview tags on scroll
      window.addEventListener('scroll', fireCmPageTagsOnScroll);

      // sticky footer
      window.addEventListener('scroll', stickyFooter);     

      // lazy load
      lazyLoad(); 

      // sticky header
      addStickyWrapper();
      copyElIntoWrapper();
      window.addEventListener('scroll', lockToTop);

      // show/hide animations
      if ($('html').hasClass('no-cssanimations') || is_android) {
        $('.hero-copy').addClass('is-visible');
        $('.lookbook-pagination').addClass('is-visible');
      } else {
        $(".hero-wrapper").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){ 
          $('.hero-copy').addClass('is-visible');
          $('.lookbook-pagination').addClass('is-visible');
        });        
      }

      // hack alert!
      window.setTimeout(function(){
         $('body, html').scrollTop(0);
        
        // if ($('body').scrollTop() > 700 || $('html').scrollTop() > 700) {
        //  $('.lookbook-pagination').removeClass('is-stuck');
        //  $('.lookbook-pagination').addClass('is-stuck');
        // }
        // $(window).one('scroll', function(event) {
        //  $('body, html').scrollTop(0);

        //   // $('.lookbook-pagination').css('position', 'absolute');
        //   // $('.lookbook-pagination').css('position', 'fixed');
        //   // $('.lookbook-pagination').animate({top: 1}, 500);
        // });
      }, 500);

    }



    // SOCIAL
    var facebookURL = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.origin + window.location.pathname,
        pinterestMedia = window.location.origin + "/web20/assets/img/specialProjects/premium-shoes-handbags-spring-collections-2015/Pinterest.jpg",
        pinterestDescription = "PREMIUM SHOES & HANDBAGS: ALL THE EXTRAS | bloomingdales.com",
        pinterestURL = "http://pinterest.com/pin/create/button/?url=" + window.location.origin + window.location.pathname + "&media=" + pinterestMedia + "&description=" + pinterestDescription,
        twitterURL = "https://twitter.com/home?status=ALL THE EXTRAS: Bloomingdale's kicks it into high gear with revved-up shoes and carryalls that take you places. http://bit.ly/1yJg1cv";

    $('.social-btn-facebook').attr('href', facebookURL);
    $('.social-btn-twitter').attr('href', twitterURL);
    $('.social-btn-pinterest').attr('href', pinterestURL);

    // START THE LOOKBOOK

    if ( BLOOMIES && BLOOMIES.isMEW || $('body').hasClass('isMewInt')) {
      loadCSS(window.location.origin + '/web20/assets/style/specialProjects/premium-shoes-handbags-spring-collections-2015/template_base.css');
      
      // This is the dirtiest thing ever. LoadCSS returns a <link> object whose href value I search for the string"web20"
      // If that exists, then I initialize the mobile lookbook..."why?", you ask? Laziness. Laziness and the desire to avoid a race 
      // condition where the lookbook is initialized before the css file is loaded.
      if ( loadCSS(window.location.origin + '/web20/assets/style/specialProjects/premium-shoes-handbags-spring-collections-2015/premium-shoes-handbags-spring-collections-2015.css').href.indexOf('web20') !== -1 ) {
       

        window.setTimeout(function(){

          var mobileLookBook =  new BloomiesLookbook($('#qa-auto-look-book-2'), {
                                  breakpoint: 10,
                                  initialLoop: false,
                                  loop: true,
                                  showLeftNavOnOne: false,
                                  startPage: 1,
                                  stickyNav: false,
                                  transitionDirection: 'horizontal',
                                  transitionStyle: 'fade'
                                }),
              hammer = new Hammer($('#qa-auto-look-book-2'));

          $('body').addClass('meow');
          $('.layout-mobile').show();
          mobileLookBook.activate();

          hammer.on('swipeleft', function(){
            mobileLookBook.goToNext();
          });
          hammer.on('swiperight', function(){
            mobileLookBook.goToPrev();
          });
          
        }, 500);
      }

      BLOOMIES.coremetrics.cmCreatePageviewTag('spring15_luxshoehandbag_static', coreMetricsDefaultPageID);

    } else {

      $('.layout-desktop').css('display', 'block');
      $('#qa-auto-look-book').prependTo('#bl_main_wrapper');

      runDesktopLookbooks();
      attachDesktopEvents();

      // Fire general pageview tag
      // BLOOMIES.coremetrics.cmCreatePageviewTag('spring15_luxshoehandbag_static', coreMetricsDefaultPageID);
    }

});
