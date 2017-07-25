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

})(jQuery);