var path = require("path");

module.exports = {
  options: {
    // Remove folder path name from file
    processName: function(fileName) {
      return path.basename(fileName, ".hbs");
    },
    namespace: "Templates",
    wrapped: true,
    amd: true,
    partialsUseNamespace: true,
    partialRegex: /.*/,
    partialsPathRegex: /\/partials\//
  },

  // Handlebars files to compile
  all: {
    files: [{
      src: ["<%= commonSrc %>/templates/*.hbs","<%= commonSrc %>/templates/**/*.hbs",
          "<%= brandSrc %>/templates/*.hbs","<%= brandSrc %>/templates/**/*.hbs"],
      dest: "<%= clientDest %>/assets/scripts/templates/templates.js"
    }]
  }
};