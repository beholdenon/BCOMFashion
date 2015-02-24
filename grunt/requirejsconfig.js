module.exports = {
  dev: {
    src: "<%= commonSrc %>/scripts/main.js",
    dest: "<%= clientDest %>/assets/scripts/main.js",
    options: {
      shim: '<%= shim %>',
      paths: '<%= paths %>',
      map: '<%= map %>'
    }
  },
   
  karmatest: {
    src: "<%= common %>/test/test-main.js",
    dest: "<%= clientDest %>/assets/test/test-main.js",
    options: {
      shim: '<%= shim %>',
      paths: '<%= paths %>',
      map: '<%= map %>',
      baseUrl: '/base/target/<%=brand%>/assets/scripts'
    }
  }
};