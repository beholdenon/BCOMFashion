var path = require("path");

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
	        src: ['**', '!public/styles/**/*.scss', '!public/styles/*.scss'],
	        dest: destination + "/"
	      }
	    ]
  	  }
	},

	handlebars: {
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
	      src: [source + "public/templates/*.hbs", source + "public/templates/**/*.hbs"],
	      dest: destination + "/public/templates/templates.js"
	    }]
	  }
	},

	compass: {
		dist: {
			options: {
			    force: true,
			    sassDir: source + "public/styles/",
			    cssDir: destination + "/public/styles"
		    }
		}
	}

  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-compass');
  
  grunt.registerTask('default', 'build');
	
  grunt.registerTask('build', 'Builds a development version of the app.', function() {
    grunt.task.run([
      'clean',
      'handlebars',
      //'sass',
      'copy',
      'compass:dist'
    ]);
  });

};