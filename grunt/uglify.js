module.exports = {
  dist: {
    options: {
      mangle: false
    },
    files: {
      '<%= clientDest %>/assets/scripts/coremetrics/cmcustom.js': ['<%= brandSrc %>/scripts/coremetrics/cmcustom.js']
    }
  }
};