module.exports = function(grunt) {
  grunt.initConfig ({
    sass: {
      dist: {
        options: {
          require: 'sass-globbing',
        },
        files: [{
          expand: true,
          cwd: './sass',
          src: ['**/*.scss'],
          dest: './public/stylesheets',
          ext: '.css'
        }]
      }
    },
    watch: {
      source: {
        files: ['sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass']);

}