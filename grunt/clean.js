// Cleans up previously built files
// https://github.com/gruntjs/grunt-contrib-clean
module.exports = {
  all: ["<%= clientDest %>"], 
  options: {
    force: true
  }
};