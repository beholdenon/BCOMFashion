'use strict';

var path = require('path');

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    //Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    //Sets the default config specified in the .env for runnning grunt tasks without having to set options
    require('./build/setDefaultEnv')(grunt, '.env');

    grunt.initConfig({
        //Project paths
        node: {
            destination: 'target',
            source: '.'
        },

        //Grunt server settings
        connect: {
            options: {
                port: 3000,
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
            	options: {
            		open: true,
            		base: [
            			'.tmp',
            			'<%= node.source %>'
            		]
            	}
            }
        },

        //Empties folders to start fresh
        clean: {
            all: [
                '<%= node.destination %>/**/*',
                '.tmp/**/*'
            ],
            options: {
                force: true,
                deleteEmptyFolders: false,
                mode: '755'
            }
        },

        //Reads HTML for usemin blocks to enable smart builds that automatically concat, minify and revision files. 
        //Creates configurations in memory so additional tasks can operate on them
        useminPrepare: {
            html: [
            	'<%= node.source %>/server/lib/views/partials/header.html',
            	'<%= node.source %>/server/lib/views/partials/header-mobile.html'
            ],
            options: {
                dest: '<%= node.destination %>/lib/views/partials/'
            }
        },

        //Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= node.destination %>/lib/views/partials/{,*/}*.html'],
            css: ['<%= node.destination %>/public/styles/{,*/}*.css'],
        	js: ['<%= node.destination %>/public/javascripts/{,*/}*.js'],
            options: {
                assetsDirs: ['<%= node.destination %>/lib/views/partials/']
            }
        },

        //Produces minified files in the 'target' folder
        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>/server/lib/views/partials/',
                    src: ['*.html'],
                    dest: '<%= node.destination %>/lib/views/partials/'
                }]
            }
        },

        //Parse CSS and add vendor-prefixed CSS properties using the 'Can I Use' db
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,**/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        copy: {
            raw: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>/',
                    src: [
                        'public/favicon.ico', 
                        'public/images/**',
                        'public/styles/fonts/**'
                    ],
                    dest: '<%= node.destination %>/'
                }, {
                    expand: true,
                    cwd: '<%= node.source %>/public/javascripts/',
                    src: [
                        'main.js',
                        'loader.js',
                        'libs/requirejs.js'
                    ],
                    dest: '<%= node.destination %>/public/javascripts/'
                }, {
                    expand: true,
                    cwd: '<%= node.source %>/server/',
                    src: [
                        'index.js',
                        'lib/**'
                    ],
                    dest: '<%= node.destination %>/'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= node.source %>/public/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        //Handlebars files to compile
        handlebars: {
            options: {
                // Remove folder path name from file
                processName: function(fileName) {
                    return path.basename(fileName, '.hbs');
                },
                namespace: 'Templates',
                wrapped: true,
                amd: true,
                partialsUseNamespace: true,
                partialRegex: /.*/,
                partialsPathRegex: /\/partials\//
            },

            all: {
                files: [{
                    src: [
                    	'<%= node.source %>/public/templates/*.hbs', 
                    	'<%= node.source %>/public/templates/**/*.hbs'
                    ],
                    dest: '<%= node.destination %>/public/javascripts/templates.js'
                        // dest: '.tmp/templates.js'
                }]
            }
        },

        concat: {
            addHBStemplates: {
                src: ['.tmp/concat/public/javascripts/bloomies.js', '.tmp/templates.js'],
                dest: '.tmp/concat/public/javascripts/bloomies.js'
            },
            generated: {
				files: [
					{
						src: [
							'<%= node.source %>/public/javascripts/libs/jquery-1.9.1.min.js',
							'<%= node.source %>/public/javascripts/libs/modernizr-2.6.2-min.js',
							'<%= node.source %>/public/javascripts/libs/hammer-1.0.5-min.js'
						],
						dest: '<%= node.destination %>/public/javascripts/libs/libs.min.js'
					}, {
						src: [
							'.tmp/styles/normalize.css',
							'.tmp/styles/main.css',
							'.tmp/styles/foundation_styles.css'
						],
						dest: '<%= node.destination %>/public/styles/main.css'
					}, {
						src: [
							'.tmp/styles/normalize.css',
							'.tmp/styles/main.css',
							'.tmp/styles/mobile_styles.css',
							'.tmp/styles/foundation_mobile_styles.css'
						],
						dest: '<%= node.destination %>/public/styles/main-mobile.css'
					}		
				],
                nonull: true
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                // '<%= node.source %>/public/javascripts/includes/{,**/}*.js',
                '<%= node.source %>/public/javascripts/projects/{,**/}*.js'
            ]
        },

        //Compile SASS files to CSS
        compass: {
            dist: {
                options: {
                    sassDir: '<%= node.source %>/public/styles/',
                    cacheDir: '.tmp/.sass-cache',
                    cssDir: '.tmp/styles', //'<%= node.destination %>/public/styles'
                    generatedImagesDir: '.tmp/images/generated',
                    imagesDir: '<%= node.source %>/public/images',
                    javascriptsDir: '<%= node.source %>/public/javascripts',
                    fontsDir: '<%= node.source %>/public/styles/fonts',
                    force: true,
                    relativeAssets: false
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        //Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= node.destination %>/public/javascripts/{,*/}*.js',
                        '<%= node.destination %>/public/styles/{,*/}*.css',
                        '<%= node.destination %>/public/styles/fonts/*',
                        '<%= node.destination %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                    ]
                }
            }
        },

        //Run some tasks in parallel to speed up the build process
        concurrent: {
            dev: [
                'nodemon',
                'node-inspector',
                'watch'
            ],
            options: {
                logConcurrentOutput: true
            }
        },

        //Monitor for any changes in your source and automatically restart your server
        nodemon: {
            dev: {
                script: '<%= node.destination %>/index.js',
                options: {
                    nodeArgs: ['--debug'],
                    ignore: ['<%= node.destination %>/lib'],
                    //watch: ['target'],
                }
            }
        },

        'node-inspector': {
            dev: {
                options: {
                    'web-port': 1337
                }
            }
        },

        //Run predefined tasks whenever watched file patterns are added, changed or deleted.
		watch: {
		    js: {
		        files: ['<%= node.source %>/public/javascripts/{,**/}*.js'],
		        tasks: ['jshint']
		    },
		    compass: {
		        files: ['<%= node.source %>/public/styles/{,**/}*.{scss,sass}'],
		        tasks: ['compass:server']
		    },
		    styles: {
		        files: ['<%= node.source %>/public/styles/{,**/}*.css'],
		        tasks: ['copy:styles', 'autoprefixer']
		    },
		    livereload: {
		        options: {
		            livereload: '<%= connect.options.livereload %>'
		        },
		        files: [
		            '<%= node.source %>/public/javascripts/{,**/}*.js',
		            '<%= node.source %>/server/lib/views/{,**/}*.html',
		            '.tmp/styles/{,**/}*.css',
		            '<%= node.source %>/public/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
		        ]
		    }
		}
    });

    grunt.registerTask('build', [
        'clean:all',
        // 'handlebars',
        'useminPrepare',
        'compass:dist',
        'copy:styles',
        'htmlmin',   
        'concat:generated',
        // 'concat:addHBStemplates',
        'copy:raw',
        'autoprefixer',
        // 'cssmin',
        // 'uglify',  
        // 'rev:dist',     
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build',
        'concurrent:dev'
        // 'connect:livereload'
    ]);

};
