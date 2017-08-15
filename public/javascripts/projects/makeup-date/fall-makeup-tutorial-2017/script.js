/* globals SERVICES*/
'use strict';

(function($) {

  // promotional date check. Promotion ends 08/30/17 @ 12:01am
  var promoEnd = new Date("August 30, 2017 00:00:01");
  var now = new Date();

  if ( promoEnd - now < 0 ) {
    $('.limited-promo').remove();
  }

  // floating left nav check and active assignment functionality
  if ( $('#floating-nav')[0] !== undefined ) {
    var asideStartingLocation = $('#floating-nav').offset().top;

    $(window).scroll(function() {

      if ( $(document).scrollTop() >= asideStartingLocation ) {
        $('#floating-nav').css({
          'position': 'fixed',
          'top': '8%'
        });
      } else {
        $('#floating-nav').removeAttr('style');
      }

      $.each( $('#makeup-date .section'), function() {
        var box = $(this)[0].getBoundingClientRect();
        if ( box.top <= ( 0 + $(window).height() / 4) && box.bottom >= ( 0 + $(window).height() / 4) ) {
          var activeElem = $(this);
          $.each( $('#floating-nav .link a'), function () {
            if ( '#' + activeElem.attr("id") === $(this).attr("href") ) {
              $(this).addClass('current');
            } else {
              $(this).removeClass('current');
            }
          });

        }
      });

    });
  }

  // hero image arrow slide-down
  $('#arrow-link').on('click tap', function() {
    var ele;

    if ( $('#Gift-with-Purchase').is(':visible') ) {
        ele = $('#Gift-with-Purchase');
    } else {
      ele = $('#Week1');
    }

    $('html, body').animate({
      scrollTop: ele.offset().top },
    250);
  });



  // MOBILE actions

  function mobileNav(ele) {
    var table = $(ele).parents('.week');
    if ( table.hasClass('active') ) {
      table.removeClass('active');
    } else {
      table.addClass('active');
    }
  }

  $('.mobile .week .bar').on('click tap', function() {
    mobileNav(this);
  });

  $('.mobile .week .bar').keypress( '.arrow', function(ev) {
    if ( ev.keyCode === 13 || ev.keyCode === 32 ) {
      mobileNav(this);
    }
  });


  // Carousel functionality module
  var carousel = {

    init: function () {
      $(".carousel-shell").each(function(index, el) {
        carousel.setupCarousel(el);
      });
    },


    // Housing div required to have data-items as comma separated items and a 
    // group size attribute that informs how many items per group
    setupCarousel: function (e) {
      var products = $(e).attr('data-items');
      var productArray = products.split(',');
      var groupSize = parseInt( $(e).attr("data-groupSize") );
      var totalGroups = Math.ceil( productArray.length / groupSize );
      var size;

      switch (groupSize) {
        case 1: 
          size = 'one';
          break;
        case 2: 
          size = 'two';
          break;
        case 3: 
          size = 'three';
          break;
        case 4: 
          size = 'four';
          break;
        case 5: 
          size = 'five';
          break;
        default:
          size = 'three';
      }

      // create group shells
      for ( var g = 0; g < totalGroups; g++ ) {

        $( '<div class="group '+ size +' " data-num="'+g+'"></div>' ).appendTo( $(e) );

        if ( g === 0 ) {
          $(e).children().eq(g).addClass('active');
        } else {
          $(e).children().eq(g).prop('tabindex', "-1");
        }
      }

      // get Data based on UPC list
      SERVICES.product.get( function (res) {
        var resArray = res.product;

        // create products append to appropriate group after AJAX data request
        for ( var p = 0; p < resArray.length; p++ ) {

          var brand = resArray[p].productDetails.summary.brand;
          var name = resArray[p].productDetails.summary.name.replace( brand, '');
          // if ( name.length > 44 ) name = name.substring(0,41) + '...';

          var startingItems = 'tabindex="-1"';
          if ( Math.floor( p/groupSize ) === 0 ) {
            startingItems = 'tabindex="0"';
          }

          var markup = '<a href="'+resArray[p].productDetails.summary.productURL+'" class="product" data-id=' + resArray[p].id +  ' ' + startingItems + '>';
          markup += '<img src="https://images.bloomingdales.com/is/image/BLM/products/4/optimized/'+resArray[p].productDetails.summary.primaryPortraitSource+'" alt="" />';
          markup += '<p class="heading">'+ brand +'</p>';
          markup += '<p>'+ name +'</p>';
          markup += '</a>';

          $( markup ).appendTo( $(e).find('.group').eq( Math.floor( p/groupSize ) ) );
        }

      }, products );

      if ( $(e).find('.group').length >= 2 ) {
        $( '<button class="arrow leftArrow" tabindex="0" arial-label="carousel left"></button>' ).prependTo( $(e) );
        $( '<button class="arrow rightArrow" tabindex="0" arial-label="carousel right"></button>' ).appendTo( $(e) );  
      }

    },

    rotate: function (ele, dir) {
      var groupLength = ele.find('.group').length;
      var active = ele.find('.group.active').index( '#' + ele.attr('id') +' .group');

      console.log(active);
      console.log(groupLength);

      ele.find('.group.active').removeClass('active').find('a').attr('tabindex', -1);

      if ( dir === 'left' ) {
        if ( active - 1 < 0 ) {
          ele.find('.group').eq( groupLength - 1 ).addClass('active').find('a').attr('tabindex', 0);
        } else {
          ele.find('.group').eq( active - 1 ).addClass('active').find('a').attr('tabindex', 0);
        }
      } else if ( dir === 'right' ) {
        if ( active + 1 >= groupLength ) {
          ele.find('.group').eq( 0 ).addClass('active').find('a').attr('tabindex', 0);
        } else {
          ele.find('.group').eq( active + 1 ).addClass('active').find('a').attr('tabindex', 0);
        }
      }

    },

  };

  $('.carousel-shell').on('click tap', '.arrow', function() {
    if ( $(this).hasClass('leftArrow') ) {
      carousel.rotate( $(this).parents('.carousel-shell'), 'left' );
    } else {
      carousel.rotate( $(this).parents('.carousel-shell'), 'right' );
    }

  });

  $('document').keypress( '.arrow', function(ev) {
    if ( ev.keyCode === 13 ) {
      $(this).click();
    }
  });

  $(".makeup-video").each(function() {
    var tar = $(this),
      id = tar.attr('data-id');
    
    SERVICES.brightCove.getURL( function(res) {
      tar.attr('src', res).prop('controls', 'true');
    }, id);
  });

  // back-to-top click action
  $("#footer .btt").on('click tap', function() {
    event.preventDefault();
    $('#href_StoresEvents').focus();
  });

  $('#footer .btt').keypress( function(ev) {
    if ( ev.keyCode === 13 ) {
      $(this).click();
    }
  });

  carousel.init();

})(jQuery);