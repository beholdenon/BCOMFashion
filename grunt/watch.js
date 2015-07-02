// [Watch files and re-compiles them when the specified directory/files changed](https://github.com/gruntjs/grunt-contrib-watch)
module.exports = {
  compass: {
    files: [
      '<%= commonSrc %>/styles/**',
      '<%= commonSrc %>/images/icon2x/*', 
      '<%= brandSrc %>/styles/**',
      '<%= brandSrc %>/images/icon2x/*'
    ],
    tasks: ['compass:dev', /* 'copy:sprite', */ 'notify:compass']
  },
  handlebars: {
    files: [
      '<%= commonSrc %>/templates/{,**/}*.hbs',
      '<%= brandSrc %>/templates/{,**/}*.hbs'
    ],
    tasks: ['handlebars', 'notify:handlebars']
  },
  assets: {
    files: [
      '<%= commonSrc %>/{scripts,fonts,images}/{,*/}*',
      '<%= brandSrc %>/{scripts,fonts,images}/{,*/}*',
      '!<%= brandSrc %>/images/icon2x*',
      '!<%= commonSrc %>/scripts/main.js',
      '!<%= brandSrc %>/index.html'
    ],
    tasks: ['copy:client', 'notify:assets']
  },
  html: {
    files: [
      '<%= brandSrc %>/index.html'
    ],
    tasks: ['inject']
  },
  main: {
    files: [
      '<%= commonSrc %>/scripts/main.js'
    ],
    tasks: ['requirejsconfig']
  },
  clientReload: {
    // Limit the client reload files to one per type of file to prevent EMFILE error
    files: [
      '<%= clientDest %>/index.html',
      '<%= clientDest %>/scripts/{_router.js,templates/templates.js,main.js}',
      '<%= clientDest %>/styles/css/main.css'
    ],
    options: {
      livereload: true
    },
    tasks: ['notify:clientReload']
  },
  jasmine: {
    files: ['<%= commonSrc %>/test/jasmine/spec/*', '<%= brandSrc %>/test/jasmine/spec/*'],
    tasks: ['runjasmine:dev']
  },
  // Reload grunt config when files change
  grunt: {
    files: [
      'Gruntfile.js',
      'grunt/**'
    ],
    tasks: ['notify:grunt'],
    options: {
      reload: true
    }
  }
};
