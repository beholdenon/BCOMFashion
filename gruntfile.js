module.exports = function(grunt) {
  var destination =  "target",
  	  source = "./";

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
    },

    clean: {
	  all: destination,
	  options: {
	    force: true
	  }
	},

	copy: {
	  client: {
	    files: [
	      {
	        expand: true,
	        cwd: source,
	        src: ['**'],
	        dest: destination + "/"
	      }
	    ]
  	  }
	}
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  //grunt.registerTask('default', ['sass']);
  
  grunt.registerTask('default', 'build');
	
  grunt.registerTask('build', 'Builds a development version of the app.', function() {
    grunt.task.run([
      'clean',
      //'sass',
      'copy'
    ]);
  });

};