'use strict';

var path = require('path');

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    //Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    //Sets the default config specified in the .env for runnning grunt tasks without having to set options
    require('./build/setDefaultEnv')(grunt, '.env');
    var NODE_ENV = grunt.option('env') || process.env.NODE_ENV;

    grunt.initConfig({
        //Project paths
        node: {
            destination: 'target',
            source: '.',
            port: grunt.option('env') || process.env.PORT
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

        copy: {      	
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>/',
                    src: [
                        'public/favicon.ico', 
                        'public/images/**',
                        'public/styles/fonts/**',
                        'public/assets/**'
                    ],
                    dest: '<%= node.destination %>/'
                }, {
                    expand: true,
                    cwd: '<%= node.source %>/public/javascripts/',
                    src: [
                        '**/*.{js,json}'
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
            viewsProjects: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>/server/lib/views/',
                    src: [
                        '**',
                        '!**/partials/**',
                        '!**/layout/**',
                        '!**/errors/**'
                    ],
                    dest: '<%= node.destination %>/lib/views/'
                }]
            },            
            jsClient: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>/public/javascripts/',
                    src: [
                        '**/*.{js,json}'
                    ],
                    dest: '<%= node.destination %>/public/javascripts/'
                }]
            },
            jsServer: {
                files: [{
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
            },
            prodSpecific: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>',
                    src: [
                        'package.json',
                        'Procfile'
                    ],
                    dest: '<%= node.destination %>'
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
                '<%= node.source %>/public/javascripts/includes/{,**/}*.{js,json}',
                '<%= node.source %>/public/javascripts/projects/{,**/}*.{js,json}'
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
                        '<%= node.destination %>/public/javascripts/{,*/}*.{js,json}',
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
                  src: '*.html',
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
                    message: 'Compass tasks complete'
                }
            },
            views: {
                options: {
                    title: 'Views',
                    message: 'Views copy complete'
                }
            },
            handlebars: {
                options: {
                    title: 'Handlebars',
                    message: 'Handlebars tasks complete'
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

        //Inject scripts during development
        inject: { 
            livereload: {
                scriptSrc: './build/inject.js',
                files: [{
                  expand: true,
                  cwd: '<%= node.destination %>/lib/views/layout/',
                  src: '*.html',
                  dest: '<%= node.destination %>/lib/views/layout/'
                }]
            }
        },

        //Monitor for any changes in the server-side code base to auto restart server & refresh browser
        nodemon: {
            dev: {
                script: '<%= node.destination %>/index.js',
                options: {
                    nodeArgs: ['--debug'],
                    versobe: true,
                    watch: ['<%= node.destination %>'],
                    ignore: ['<%= node.destination %>/public/{,**/}*'],
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('open')('http://d4378572:3000/international/china-brazil/');
                            }, 1000);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function() {
                            setTimeout(function() {
                                require('fs').writeFileSync('.tmp/rebooted.file', 'node server rebooted');
                            }, 1000);
                        });
                    }
                }
            }
        },

        //Node inspector URL: http://localhost:1337/
        'node-inspector': {
            dev: {
                options: {
                    'web-port': 1337
                }
            }
        },

        //Run predefined tasks whenever watched file patterns are added, changed or deleted.
		watch: {
		    jsClient: {
		        files: [
                    '<%= node.source %>/public/javascripts/main.js',
                    '<%= node.source %>/public/javascripts/includes/{,**/}*.{js,json}',
                    '<%= node.source %>/public/javascripts/projects/{,**/}*.{js,json}'
                ],
                tasks: [
                    'jshint', 
                    // 'concat:generated',
                    'copy:jsClient'
                ]
            },
            jsServer: {
                files: [
                    '<%= node.source %>/server/{,**/}*.js'
                ],
                tasks: [
                    'jshint', 
                    // 'concat:generated',
                    'copy:jsServer'
                ]
            },            
		    styles: {
		        files: [
		    		'<%= node.source %>/public/styles/{,**/}*.{scss,sass,css}'
		    	],
		        tasks: [
		        	'compass:dist', 
		        	'copy:styles',
                    'notify:compass'
		        ]
		    },
		    views: {
		        files: [
                    '<%= node.source %>/server/lib/views/partials/{,**/}*.html',
                    '<%= node.source %>/server/lib/views/layout/{,**/}*.html',
		    		'<%= node.source %>/server/lib/views/errors/{,**/}*.html'
		    	],
		        tasks: [
		        	'useminPrepare',
		        	'htmlmin',
		        	'usemin',
                    'notify:views'
		        ]
		    },
            viewsProjects: {
                files: [
                    '<%= node.source %>/server/lib/views/lookbooks/{,**/}*.html',
                    '<%= node.source %>/server/lib/views/international/{,**/}*.html'                    
                ],
                tasks: [
                    'copy:viewsProjects'
                ]                
            },
            clientReload: {
                // Limit the client reload files to one per file type to prevent EMFILE error
                files: [
                    '<%= node.destination %>/lib/views/{,**/}*.html',
                    '<%= node.destination %>/public/javascripts/{,**/}*.{js,json}',
                    '<%= node.destination %>/public/styles/{,**/}*.css'
                ],
                options: {
                    livereload: true,
                    debounceDelay: 1000
                },
                tasks: ['notify:clientReload']
            },            
            serverReload: {
                files: ['.tmp/rebooted.file'],
                options: {
                    livereload: true
                },
                tasks: ['notify:serverReload']
            },            
            grunt: {
                files: [
                    '.env',
                    'gruntfile.js',
                    'grunt/**'
                ],
                tasks: ['notify:grunt'],
                options: {
                    reload: true
                }
            }
		},

        //Run some tasks in parallel to speed up the build process
        concurrent: {
            dev: [
                'nodemon',
                'watch',
                'node-inspector',
                'notify:build'
            ],
            options: {
                logConcurrentOutput: true
            }
        }        
    });

    grunt.registerTask('default', 'build');

    grunt.registerTask('build', 'Build based on the NODE_ENV value.', function() {   
        grunt.task.run([
            'clean:all',
            'useminPrepare',
            'compass:dist',
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

        if (NODE_ENV === 'dev') {
            grunt.task.run([
                'inject:livereload',
                'concurrent:dev'
            ]);
        } else if (NODE_ENV === 'prod' || NODE_ENV === 'production') {
            grunt.task.run([
                'copy:prodSpecific'
            ]);
        }
    });
};
