'use strict';
// [Runs nodemon to restart the server when .js files change](https://github.com/ChrisWren/grunt-nodemon)
module.exports = {
  dev: {
    script: '<%= clientDest %>/index.js' ,
    options: {
      nodeArgs: ['--debug'],
      ignore: ['<%= clientDest %>/proxy'],
      watch: ['<%= clientDest %>'],
      callback: function(nodemon) {
        nodemon.on('log', function(event) {
          console.log(event.colour);
        });

        // refreshes browser when server reboots
        /*nodemon.on('restart', function() {
          setTimeout(function() {
            require('fs').writeFileSync('.grunt/rebooted', 'rebooted');
          }, 1000);
        });*/
      }
    }
  }
};
