'use strict';

define([
  'underscore',
  'logger'
], function ( _, log ) {

  const validEventTypes = [
    'view',
    'link',
  ];

  function isAllOK( eventType, data ) {
    if ( _.isUndefined( eventType ) || _.isUndefined( data ) ) {
      log.error( 'Tag Manager Exception : eventType and/or data missing!' );
      return false;
    }

    if (_.indexOf(validEventTypes, eventType) < 0) {
      log.error('Tag Manager Exception : invalid eventType!');
      return false;
    }

    if ( _.isUndefined( window.utag ) ) {
      log.error( 'Tag Manager Exception: window.utag missing!' );
      return false;
    }

    if ( _.isUndefined( window.utag[ eventType ] ) ) {
      log.error( 'Tag Manager Exception: utag.' + eventType + ' missing!' );
      return false;
    }

    return true;
  }

  return {
    fireTag: function ( eventType, data ) {
      if ( isAllOK( eventType, data ) ) {
        window.utag[ eventType ]( data );
      }
    }
  };
});
