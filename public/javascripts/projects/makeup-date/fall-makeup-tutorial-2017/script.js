/* globals SERVICES*/
'use strict';

(function($) {

  // REMOVE BEFORE TEST
  $("#floating-nav").remove();
  // REMOVE

  $('#arrow-link').on('click tap', function() {
    var ele;

    if ( $('#gift-with-purchase').is(':visible') ) {
        ele = $('#gift-with-purchase');
    } else {
      ele = $('#week-one');
    }

    $('html, body').animate({
      scrollTop: ele.offset().top },
    250);
  });


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

      $( '<div class="arrow leftArrow" tabindex="0"></div>' ).prependTo( $(e) );
      $( '<div class="arrow rightArrow" tabindex="0"></div>' ).appendTo( $(e) );

      // get Data based on UPC list
      SERVICES.product.upcGet( function (res) {
        var resArray = res.product;

        // create products append to appropriate group after AJAX data request
        for ( var p = 0; p < resArray.length; p++ ) {

          var brand = resArray[p].productDetails.summary.brand;
          var name = resArray[p].productDetails.summary.name.replace( brand, '');
          // if ( name.length > 44 ) name = name.substring(0,41) + '...';

          var markup = '<a href="'+resArray[p].productDetails.summary.productURL+'"class="product" data-id=' + resArray[p].id + '>';
          markup += '<img src="https://images.bloomingdales.com/is/image/BLM/products/4/optimized/'+resArray[p].productDetails.summary.primaryPortraitSource+'" alt="" />';
          markup += '<h4>'+ brand +'</h4>';
          markup += '<p>'+ name +'</p>';
          markup += '</a>';

          $( markup ).appendTo( $(e).find('.group').eq( Math.floor( p/groupSize ) ) );
        }

      }, products );

      

    },

    rotate: function (ele, dir) {
      var groupLength = ele.find('.group').length;
      var active = ele.find('.group.active').index();

      console.log( active );

      ele.find('.active').removeClass('active').prop('tabindex', "-1");

      if ( dir === 'left' ) {
        if ( active - 1 < 0 ) {
          ele.find('.group').eq( groupLength - 1 ).addClass('active').prop('tabindex', 0);
        } else {
          ele.find('.group').eq( active - 1 ).addClass('active').prop('tabindex', 0);
        }
      } else if ( dir === 'right' ) {
        if ( active + 1 >= groupLength ) {
          ele.find('.group').eq( 0 ).addClass('active').prop('tabindex', 0);
        } else {
          ele.find('.group').eq( active + 1 ).addClass('active').prop('tabindex', 0);
        }
      }

    },

  };

  carousel.init();

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

})(jQuery);