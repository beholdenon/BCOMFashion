'use strict';
module.exports = {
  src: [
    '<%= commonSrc %>/scripts/router/_app/handlers/*.js'
  ],
  options: {
    outputFile: '<%= clientDest %>/assets/scripts/router/_handlers.js',
  }
};
