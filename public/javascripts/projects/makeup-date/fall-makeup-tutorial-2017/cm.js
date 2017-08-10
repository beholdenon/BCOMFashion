/* globals BLOOMIES*/
'use strict';

(function(){

  // create new empty attributes value to avoid console errors.
  window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

  var CM = {
    category: 'fall17_makeupdate',
    mbl: function () {
      if ( BLOOMIES.isMobile ) {
        return 'mbl:';
      } else {
        return '';
      }
    },

  };

  var category = CM.mbl() + CM.category;
  var sections = [];

  // pageview
  window.BLOOMIES.coremetrics.cmCreatePageviewTag( CM.mbl() + "fall17_makeupdate", category );


  // =========Section Element Tags
  $(window).scroll(function() {

    $.each( $('#makeup-date .section'), function() {
      var box = $(this)[0].getBoundingClientRect();
      if ( box.top <= ( 0 + $(window).height() / 4) && box.bottom >= ( 0 + $(window).height() / 4) ) {
        var activeElem = $(this);

        if ( sections.indexOf(activeElem.attr('id')) < 0 ) {
          window.BLOOMIES.coremetrics.cmCreatePageElementTag( CM.mbl() + 'fall17_makeupdate--' + activeElem.attr('id') , category); 
          sections.push(activeElem.attr('id'));
        }

      }
    });

  });


  $('#makeup-date').on('click tap', 'a', function() {
    
    var id;
    if ( $(this).attr('href').indexOf('/shop/product/') >= 0 ) {
      id = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-" + $(this).attr('data-id');
      window.BLOOMIES.coremetrics.cmCreatePageElementTag( CM.mbl() + 'fall17_makeupdate--' + $(this).text().replace(/\s+/g, '-') + '--link', category, id); 
    } else {
      window.BLOOMIES.coremetrics.cmCreatePageElementTag( CM.mbl() + 'fall17_makeupdate--' + $(this).text().replace(/\s+/g, '-') + '--link', category); 
    }
    
  });

  $('.mobile .week .bar').on('click tap', function() {
    window.BLOOMIES.coremetrics.cmCreatePageElementTag( CM.mbl() + 'fall17_makeupdate--' + $(this).text().replace(/\s+/g, '-') + '--nav-click', category); 
  });


  // ========Video Tags

  $(".makeup-video").on('ended',function() {
    var vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-3-_-"+Math.round($(this)[0].duration);
        window.BLOOMIES.coremetrics.cmCreatePageElementTag( CM.mbl() + 'fall17_makeupdate--' + $(this).attr('alt').replace(/\s+/g, '-') + '-video_play', category, vid);
    });

    $(".makeup-video").on("play", function () {
      var vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-1-_-"+Math.round($(this)[0].duration);
      window.BLOOMIES.coremetrics.cmCreatePageElementTag( CM.mbl() + 'fall17_makeupdate--' + $(this).attr('alt').replace(/\s+/g, '-') + '-video_play', category, vid);
    });

    $(".makeup-video").on("pause", function () {
      if ( $(this)[0].ended !== true ) {
        var vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-2-_-"+Math.round($(this)[0].duration);
        window.BLOOMIES.coremetrics.cmCreatePageElementTag( CM.mbl() + 'fall17_makeupdate--' + $(this).attr('alt').replace(/\s+/g, '-') + '-video_play', category, vid);
      }
    });

})();