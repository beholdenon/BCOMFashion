'use strict';

var path = require('path');

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    //Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    //Sets the default config specified in the .env for runnning grunt tasks without having to set options
    require('./build/setDefaultEnv')(grunt, '.env');
    var NODE_ENV = process.env.NODE_ENV = grunt.option('env') || process.env.NODE_ENV; // jshint ignore:line

    grunt.initConfig({
        //Project paths
        node: {
            destination: 'target',
            source: '.'
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
            css: ['.tmp/styles/{,*/}*.css'],
            options: {
                assetsDirs: [
                    '<%= node.destination %>/lib/views/partials/',
                	'.tmp'
                ]               
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
            all: {
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
                        '**/*.js'
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
                }, {
                    expand: true,
                    cwd: '.tmp',
                    src: [
                        'styles/**'
                    ],
                    dest: '<%= node.destination %>/public'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>/public/javascripts/',
                    src: [
                        '**/*.js'
                    ],
                    dest: '<%= node.destination %>/public/javascripts/'
                }, {
                    expand: true,
                    cwd: '<%= node.source %>/server/',
                    src: [
                        'index.js',
                        'lib/**/*.js'
                    ],
                    dest: '<%= node.destination %>/'
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    cwd: '.tmp',
                    src: [
                        'styles/**'
                    ],
                    dest: '<%= node.destination %>/public'
                }]
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
                src: [
                    '.tmp/concat/public/javascripts/bloomies.js', 
                    '.tmp/templates.js'                  
                    ],
                dest: '.tmp/concat/public/javascripts/bloomies.js'
            },
            generated: {
                nonull: true
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'gruntfile.js',
                '<%= node.source %>/server/{,**/}*.js',
                '<%= node.source %>/public/javascripts/includes/{,**/}*.js',
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
                    noLineComments: true,
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

        //Replace strings on files by using string or regex patters
        'string-replace': {
            inline: {
                files: [{
                  expand: true,
                  cwd: '<%= node.destination %>/lib/views/layout/',
                  src: 'layout.html',
                  dest: '<%= node.destination %>/lib/views/layout/'
                }],                
                options: {
                    replacements: [{
                            pattern: '<script type="text/javascript">var ENV_CONFIG = "dev";</script>',
                            replacement: '<script type="text/javascript">var ENV_CONFIG = "'+ NODE_ENV +'";</script>'
                        }
                    ]
                }
            }
        },

        //Automatic notifications when Grunt tasks execute/fail
        notify: {
            build: {
                options: {
                    title: 'Build complete',
                    message: 'All the grunt tasks are finished.'
                }
            },
            compass: {
                options: {
                    title: 'Compass',
                    message: 'Tasks complete'
                }
            },
            handlebars: {
                options: {
                    title: 'Handlebars',
                    message: 'Tasks complete'
                }
            },
            assets: {
                options: {
                    title: 'Assets',
                    message: 'Client assets copy complete'
                }
            },
            clientReload: {
                options: {
                    title: 'Client LiveReload',
                    message: 'Reload complete'
                }
            },
            serverReload: {
                options: {
                    title: 'Server LiveReload',
                    message: 'Reload complete'
                }
            },
            grunt: {
                options: {
                    title: 'Grunt',
                    message: 'Grunt config change complete'
                }
            }
        },

        //Monitor for any changes in your source and automatically restart your server
        nodemon: {
            dev: {
                script: '<%= node.destination %>/index.js',
                options: {
                    nodeArgs: ['--debug']                   
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
		        files: [
                    'gruntfile.js',
                    '<%= node.source %>/server/{,**/}*.js',
					'<%= node.source %>/public/javascripts/includes/{,**/}*.js',
					'<%= node.source %>/public/javascripts/projects/{,**/}*.js'
		    	],
		        tasks: [
		        	'jshint', 
		        	// 'concat:generated',
                    'copy:js'
		        ]
		    },
		    styles: {
		        files: [
		    		'<%= node.source %>/public/styles/{,**/}*.{scss,sass,css}'
		    	],
		        tasks: [
		        	'compass:dist', 
		        	'copy:styles'
		        ]
		    },
		    html: {
		        files: [
		    		'<%= node.source %>/server/lib/views/{,**/}*.html'
		    	],
		        tasks: [
		        	'useminPrepare',
		        	'htmlmin',
		        	'usemin'
		        ]
		    },
			livereload: {
                options: {
                    livereload: 35729
                },                
				files: [
					'<%= node.destination %>/lib/{,**/}*.{js, html}',
					'<%= node.destination %>/public/{,**/}*.{js, css}'
				]
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
        }        
    });

    grunt.registerTask('build', [
        'clean:all',
        'useminPrepare',
        'compass:dist',
        // 'autoprefixer',
        'htmlmin',   
        // 'handlebars',
        // 'concat:generated',
        // 'concat:addHBStemplates',
        'copy:all',
        // 'cssmin',
        // 'uglify',  
        // 'rev:dist',     
        'usemin',
        'string-replace'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build',
        'concurrent:dev'
    ]);

};
