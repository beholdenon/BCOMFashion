'use strict';

(function($) {

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

    totalCarousels: 0,

    init: function () {
      $(".carousel-shell").each(function(index, el) {
        carousel.setupCarousel(el);
      });
    },

    setupCarousel: function (e) {
      carousel.totalCarousels = carousel.totalCarousels++;

      for( var i = $(e).length; i >= 0; i-- ) {

        console.log(carousel.totalCarousels + " | " + $(e)[i].attr("class") );

      }
    },

  };

  carousel.init();

})(jQuery);