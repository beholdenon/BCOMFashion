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

    setupCarousel: function (e) {
      var products = $(e).attr('data-items').split(',');
      var groupSize = $(e).attr("data-groupSize");
      var groups = Math.ceil( products.length / groupSize );

      // create groups
      for ( var g = 0; g < groups; g++ ) {

        $( '<div class="group"></div>' ).appendTo( $(e) );

        if ( g === 0 ) {
          $(e).children().eq(g).addClass('active');
        } else if ( g === $(e).children().length - 1 && $(e).children().length > 2 ) {
          $(e).children().eq(g).addClass('last');
        }
      }

      // create products append to appropriate group
      for ( var p = 0; p < products.length; p++ ) {

        var markup = '<div class="product" data-upc='+products[p]+'>';
        markup += '<img src="" alt="" />';
        markup += '<h4>Item Name</h4>';
        markup += '<p>Item Description</p>';
        markup += '</div>';

        $( markup ).appendTo( $(e).find('.group').eq( Math.floor( p/groupSize ) ) );
      }

    },

  };

  carousel.init();

})(jQuery);