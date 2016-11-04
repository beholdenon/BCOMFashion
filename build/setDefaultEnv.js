// Gets default environment properties from a given file
module.exports = function(grunt, file) {
  'use strict';

  var defaultEnv = {};

  //if the file doesn't exist in 'dev' mode, copy it from the Heroku QA config and place it in the root location
  if (!grunt.file.exists(file)) {
    var fs = require('fs');
    fs.createReadStream('./envconfigs/qa/.env-props').pipe(fs.createWriteStream(file));
  }

  var envContents = grunt.file.read(file);
  envContents.split('\n')
      .filter(function(envLine) {
        return envLine.indexOf('#') === -1;
      })
      .forEach(function(envLine) {
        var key = envLine.trim().split('=')[0];
        var value = envLine.trim().split('=')[1];
        if (!process.env[key]) {
          process.env[key] = value;
        }
      });

  return defaultEnv;
};
