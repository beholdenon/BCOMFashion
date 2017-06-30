'use strict';

(function () {

  $('.checklist .box').on('click', function() {

    if ( $(this).siblings('.check').hasClass('hidden') ) {
      $(this).siblings('.check').removeClass('hidden');
    } else {
      $(this).siblings('.check').addClass('hidden');
    }
      
  });

  $('.checklist .check').on('click', function() {

    if ( $(this).hasClass('hidden') ) {
      $(this).removeClass('hidden');
    } else {
      $(this).addClass('hidden');
    }
      
  });

  $('#carouselLeft').on('click', function() {
    carousel('left');
  });

  $('#carouselRight').on('click', function() {
    carousel('right');
  });

  function carousel(dir) {
    var dirClass = 'rs';
    if ( dir === 'right' ) dirClass = 'ls';    

    function findNext () {
      var currentActive =  parseInt( $('.carousel .slide.active').attr('id').replace('slide-','') );
      var newActive;

      if ( dir === 'right' ) {
        if ( currentActive + 1 > $('.carousel .slide').length ) {
          newActive = 1;
        } else {
          newActive = currentActive + 1;
        }

      } else {
        if (  currentActive - 1 <= 0 ) {
          newActive = $('.carousel .slide').length;
        } else {
          newActive = currentActive - 1;
        } 
      }

      return newActive;
    }

    var next = findNext();
    
    $('.carousel .slide.active').addClass( dirClass ).removeClass('active');
    $('.carousel #slide-' + next ).removeClass('ls rs').addClass('active');
    $('#carousel-dots .dot-' + next).addClass('active').siblings().removeClass('active');

  }

})();