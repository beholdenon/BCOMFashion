// [Optimizes the javascript files for the build](https://github.com/gruntjs/grunt-contrib-requirejs)
module.exports = {
  compile: {
    options: {
      mainConfigFile: "<%= clientDest %>/assets/scripts/main.js", 
      baseUrl: "<%= clientDest %>/assets/scripts",
      name: "main",
      out: "<%= clientDest %>/assets/scripts/main.js",
      findNestedDependencies: true,
      preserveLicenseComments: false,
      optimize: 'uglify2',
      generateSourceMaps: true
    }
  }
};