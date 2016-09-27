'use strict';

var path = require('path');

module.exports = function(grunt) {

    //Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    //Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    //Sets the default config specified in the .env for runnning grunt tasks without having to set options
    require('./build/setDefaultEnv')(grunt, '.env');
    var NODE_ENV = grunt.option('env') || process.env.NODE_ENV;

    //Sets current project folder path ( can be empty as '' )
    var PROJECT_DIR = grunt.option('pf') || process.env.PROJECT_DIR;

    grunt.loadTasks('./build/grunt-compile-handlebars/tasks');

    grunt.initConfig({
        //Project paths
        node: {
            destination: 'target',
            source: '.',
            port: grunt.option('env') || process.env.PORT
        },
        // convert ES6 modules to ES5 AMD modules
        "babel": {
            options: {
                sourceMap: true,
                presets: ['es2015'],
                plugins: ['transform-es2015-modules-amd']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './public',
                    src: ['**/*.es6'],
                    dest: './public',
                    ext: '-compiled.js'
                }]
            }
        },
        // compile hbs files in server/lib/views, to for example build
        // html for navigation using handlebars components (partials)
        // This plugin has been customized for this project, it adds
        // data from the first line of the hbs file if the first line
        // of that file is a comment.
        'compile-handlebars': {
            dynamicTemplateData: {
                files: [{
                    expand:true,
                    cwd: './server/',
                    src: ['lib/views/**/index.hbs', 'lib/views/**/index-mobile.hbs'],
                    dest: './target/',
                    ext: '.html'
                }],
                helpers: ['./build/breadCrumbNav.js',
                    './build/titleImageSrc.js',
                    './build/titleImageSrcCached.js',
                    './build/selectedClass.js',
                    './build/hideLevel.js',
                    './build/coremetrics.js'
                ],
                templateData: './server/lib/views/navdata.js',
                partials: ['./server/lib/views/partials/leftnav.hbs',
                    './server/lib/views/partials/breadcrumbs.hbs',
                    './server/lib/views/partials/title.hbs',
                    './server/lib/views/partials/titleimage.hbs',
                    './server/lib/views/partials/titleimagec.hbs',
                    './server/lib/views/partials/navitem.hbs',
                    './server/lib/views/partials/atyourservice.hbs'

                ]
            }
        },
        htmlSnapshot: {
            all: {
                options: {
                    //that's the path where the snapshots should be placed
                    //it's empty by default which means they will go into the directory
                    //where your Gruntfile.js is placed
                    snapshotPath: 'snapshots/',
                    //This should be either the base path to your index.html file
                    //or your base URL. Currently the task does not use it's own
                    //webserver. So if your site needs a webserver to be fully
                    //functional configure it here.
                    sitePath: 'http://localhost:3000/',
                    //you can choose a prefix for your snapshots
                    //by default it's 'snapshot_'
                    fileNamePrefix: 'sp_',
                    //by default the task waits 500ms before fetching the html.
                    //this is to give the page enough time to to assemble itself.
                    //if your page needs more time, tweak here.
                    msWaitForPages: 3000,
                    //sanitize function to be used for filenames. Converts '#!/' to '_' as default
                    //has a filename argument, must have a return that is a sanitized string
                    //sanitize: function (requestUri) {
                    //    //returns 'index.html' if the url is '/', otherwise a prefix
                    //    if (/\/$/.test(requestUri)) {
                    //        return 'index.html';
                    //    } else {
                    //        return requestUri.replace(/\//g, 'prefix-');
                    //    }
                    //},
                    //if you would rather not keep the script tags in the html snapshots
                    //set `removeScripts` to true. It's false by default
                    removeScripts: true,
                    //set `removeLinkTags` to true. It's false by default
                    //removeLinkTags: true,
                    //set `removeMetaTags` to true. It's false by default
                    //removeMetaTags: true,
                    //Replace arbitrary parts of the html
                    //replaceStrings:[
                    //    {'this': 'will get replaced by this'},
                    //    {'/old/path/': '/new/path'}
                    //],
                    // allow to add a custom attribute to the body
                    //bodyAttr: 'data-prerendered',
                    //here goes the list of all urls that should be fetched
                    urls: [
                        'about-us/help-usa-b-cause-philanthropy/'
                    ],
                    // a list of cookies to be put into the phantomjs cookies jar for the visited page
                    //cookies: [
                    //    {"path": "/", "domain": "localhost", "name": "lang", "value": "en-gb"}
                    //],
                    // options for phantomJs' page object
                    // see http://phantomjs.org/api/webpage/ for available options
                    pageOptions: {
                        viewportSize : {
                            width: 1200,
                            height: 800
                        }
                    }
                }
            }
        },
        // creates the nav data by reading the config files
        // for the client side nav component used in the MacysUI leftNav component
        execute: {
            target: {
                src: ['./build/generate_nav_files.js']
            }
        },
        shell: {
            npmVersion: 'npm -v'
        },
        checkPages: {
            development: {
                options: {
                    pageUrls: [
                        'http://localhost:3000/about-us/help-usa-b-cause-philanthropy/'
                    ],
                    checkLinks: true,
                    linksToIgnore: [],
                    //noEmptyFragments: true,
                    //noLocalLinks: true,
                    //noRedirects: true,
                    //onlySameDomain: true,
                    //preferSecure: true,
                    //queryHashes: true,
                    //checkCaching: true,
                    checkCompression: true,
                    //checkXhtml: true,
                    summary: true,
                    //terse: true,
                    maxResponseTime: 500
                    //userAgent: 'custom-user-agent/1.2.3'
                }
            }
        },
        //Empties folders to start fresh
        clean: {
            all: [
                '<%= node.destination %>/**/*',
                '.tmp/**/*'
            ],
            projectFolderImages: [
                '<%= node.destination %>/public/images/projects'+PROJECT_DIR
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
                        '**/*.{js,json}',
                        '**/*.map'
                    ],
                    dest: '<%= node.destination %>/public/javascripts/'
                }, {
                    expand: true,
                    cwd: '<%= node.source %>/server/',
                    src: [
                        'index.js',
                        'lib/**',
                        '!**/*.hbs'
                        //'!lib/views'
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
            projectFolderImageClient: {
                files: [{
                    expand: true,
                    cwd: '<%= node.source %>/public/images/projects'+PROJECT_DIR,
                    src: [
                        '**/*.{gif,jpg,png}'
                    ],
                    dest: '<%= node.destination %>/public/images/projects'+PROJECT_DIR
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
                        'Procfile',
                        '.env'
                    ],
                    dest: '<%= node.destination %>'
                }]                
            },
            // the handlebars partial 'titleimagec' creates image files,
            // copy these to target
            titleImages: {
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: [
                        'titles/**.*'
                    ],
                    dest: 'target/public/images'
                }]
            },
            cucumberjs: {
                src: 'test/features',
                options: {
                    steps: 'test/features/step_definitions',
                    format: 'pretty'
                }
            },
            // create index-mobile.hbs version of hbs files if not already exist
            createMobile: {
                files: [
                    {
                        expand: true,
                        src: [
                            './server/lib/views/about-us/**/*.hbs',
                            './server/lib/views/media/about/**/*.hbs'
                        ],
                        rename: function(dest, src) {
                            var name =  src.replace(/(\.*)\.hbs$/, "$1-mobile.hbs");
                            return name;
                        },
                        ext: '.hbs',
                        filter: function (filepath) {
                            if (/mobile/.test(filepath)){return false;}
                            // Return false if the mobile version of the file exists.
                            filepath = filepath.replace(/(\.*)\.hbs$/, "$1-mobile.hbs");
                            if (grunt.file.exists(filepath)) {return false;}
                            return true;
                        }
                    }
                ]
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
                  cwd: '<%= node.destination %>/lib/views/partials/',
                  src: '*.html',
                  dest: '<%= node.destination %>/lib/views/partials/'
                }],                
                options: {
                    replacements: [{
                            pattern: '<script type="text/javascript">var ENV_CONFIG = "dev";</script>',
                            replacement: '<script type="text/javascript">var ENV_CONFIG = "'+ NODE_ENV +'";</script>'
                        }
                    ]
                }
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= node.destination %>/lib/views/about-us/',
                        src: '**/*mobile.html',
                        dest: '<%= node.destination %>/lib/views/about-us/'
                    },
                    {
                        expand: true,
                        cwd: '<%= node.destination %>/lib/views/media/',
                        src: '**/*mobile.html',
                        dest: '<%= node.destination %>/lib/views/media/'
                    }
                ],
                options: {
                    replacements: [
                        {
                            pattern: /data-pageid="(.*?)"/ig,
                            replacement: 'data-pageid="mbl: $1"'
                        },
                        {
                            pattern: /data-categoryid="(.*?)"/ig,
                            replacement: 'data-categoryid="mbl: $1"'
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
                    verbose: true,
                    watch: ['<%= node.destination %>'],
                    ext: 'js,html',
                    ignore: ['<%= node.destination %>/public/{,**/}*'],
                    callback: function(nodemon) {
                        nodemon.on('log', function(event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function() {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('open')('http://localhost:3000' + ((PROJECT_DIR!=='') ? PROJECT_DIR : '/about-us/buy-online-pickup-in-store/')     );
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
            projectFolderImageClient: {
                files: [
                    '<%= node.source %>/public/images/projects'+ PROJECT_DIR +'{,**/}*.{gif,jpg,png}'
                ],
                tasks: [
                    'clean:projectFolderImages',
                    'copy:projectFolderImageClient'
                ],
                options: {
                    reload: true
                }                
            },            
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
                    '<%= node.destination %>/public/images/{,**/}*.{gif,png,jpg}',
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
                //'node-inspector',
                'notify:build'
            ],
            options: {
                logConcurrentOutput: true
            }
        }        
    });
    grunt.registerTask('createMobile', 'copy:createMobile');
    grunt.registerTask('default', 'build');
    grunt.registerTask('test', 'checkPages:development');
    grunt.registerTask('build', 'Build based on the NODE_ENV value.', function() {   
        grunt.task.run([

            'babel',
            'jshint',
            'clean:all',
            'useminPrepare',
            'compass:dist',
            'htmlmin',   
            // 'handlebars',
            // 'concat:generated',
            // 'concat:addHBStemplates',
            'copy:all',
            'execute', // create the nav data used in the compile-handlebars step
            'compile-handlebars', // this processes files in the views folder and overwrites files in target
            'copy:titleImages', // handlebars optionally creates titles images, need to copy those after handlebars run
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
