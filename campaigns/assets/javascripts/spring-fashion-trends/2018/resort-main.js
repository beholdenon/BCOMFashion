/* jshint ignore:start */

/*
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
                !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();

resources.load([
    //'img/sprites.png',
    //'img/terrain.png'
]);
resources.onReady(init);
*/

(function(){
    // Your base, I'm in it!
    var originalAddClassMethod = jQuery.fn.addClass;

    jQuery.fn.addClass = function(){
        // Execute the original method.
        var result = originalAddClassMethod.apply( this, arguments );

        // trigger a custom event
        jQuery(this).trigger('cssClassChanged');

        // return the original result
        return result;
    }
})();




$(function() {

    /*
    function wheel(event) {
        var delta = 0;
        if (event.wheelDelta) {(delta = event.wheelDelta / 120);}
        else if (event.detail) {(delta = -event.detail / 3);}

        handle(delta);
        if (event.preventDefault) {(event.preventDefault());}
        event.returnValue = false;
    }

    function handle(delta) {
        var time = 600;
        var distance = 300;

        $('html, body').stop().animate({
            scrollTop: $(window).scrollTop() - (distance * delta)
        }, time );
    }

    if (window.addEventListener) {window.addEventListener('DOMMouseScroll', wheel, false);}
    window.onmousewheel = document.onmousewheel = wheel;
    */
    // ---- use matter.js – start


    var blockAnimation = (function($) {

        // module aliases
        var Engine    = Matter.Engine,
            Render    = Matter.Render,
            World     = Matter.World,
            Bodies    = Matter.Bodies,
            Body      = Matter.Body,
            Composite = Matter.Composite,
            Vector    = Matter.Vector;

        var winW = window.innerWidth,
            winH = window.innerHeight;

        // variables for where the script looks for the scrolling elements
        //var $scrollerContainer = $('section');
        var $scrollerContainer = $('.resort-wrapper');

        var $scrollEventGenerator = $(window);
        var navContainer = $('.resort-nav'); //document.querySelector(".resort-nav"); //$('#resort-nav-container');

        // var $lang = $('.lang-toggle');



        // if an element has this class, the script will put a block for it in the physics world
        var makeBlockClass = 'make-block';
        // if an element has this class in addition to the above class, the script will wrap each
        // line in spans for a more complex typographic layout (instead of making a container for the whole element)
        var decomposeLinesClass = 'decompose-lines';

        var canvas;

        // collision filtering categories
        var defaultCategory = 0x0001,
            noCollideCategory = 0x0002;

        var blockSettings;

        var picOriginalWidth = 140;
        var picOriginalHeight = 196;
        var picGap = 60;
        
        var picRows = 5;

        var canvasHeight = winH + 40; //(picOriginalHeight + picGap) * picRows;


        function init(sttgs) {

            blockSettings = sttgs;


            if($scrollerContainer.length != 0) {

                var engine = initEngine();

                var render = initRenderer(engine);

                if(winW < blockSettings.breakpoint) {
                    initBlocks(blockSettings.mobile, engine);
                } else {
                    initBlocks(blockSettings.desktop, engine);
                }

                var scrollBlocks = initScroller(engine);

                Engine.run(engine);

                Render.run(render);

                /////////window.onresize = doOnWindowResize.bind(null, scrollBlocks);
            }
        }

        function initEngine() {
            var engine = Engine.create();
            engine.world.gravity.x = engine.world.gravity.y = 0;

            return engine;
        }

        function initRenderer(engine) {
            // make the rendering canvas
            var canvas = document.createElement('canvas');
            //var context = canvas.getContext('2d');

            //document.body.appendChild(canvas);
            //var canvasContainer = document.getElementById('resort-image-grid-container');
            var canvasContainer = $('.resort-image-grid-container')[0];
            //document.body.insertBefore(canvas, canvasContainer.firstChild);
            canvasContainer.appendChild(canvas);

            return Render.create({
                canvas: canvas,
                engine: engine,
                options: {
                    width: winW,
                    height: canvasHeight,
                    background: 'rgba(255,255,255,0)',
                    hasBounds: false,
                    enabled: true,
                    wireframes: false,
                    showSleeping: false,
                    showDebug: false,
                    showBroadphase: false,
                    showBounds: false,
                    showVelocity: false,
                    showCollisions: false,
                    showSeparations: false,
                    showAxes: false,
                    showPositions: false,
                    showAngleIndicator: false,
                    showIds: false,
                    showShadows: false,
                    showVertexNumbers: false,
                    showConvexHulls: false,
                    showInternalEdges: false,
                    showMousePosition: false
                }
            });

        }

        function initBlocks(bSettings, engine) {
            // the top / bottom / left / right / dim properties in bSettings determine the initial coverage of blocks in the window.
            // the variables are expressed as proportions of window dimension so they range from 0-1

            var blocks = [];

            // var rows = winH * (1 - bSettings.top - bSettings.bottom) / bSettings.dim,
            // 	cols = winW * (1 - bSettings.left - bSettings.right) / bSettings.dim,
            // 	startX = winW * bSettings.left,
            // 	startY = winH * bSettings.top;

            var cols = 6,
                startX = winW * bSettings.left,
                startY = winH * bSettings.top;
            //var picCount = 0;

            var cf = { mask: defaultCategory };
            var picOpacity = 1;
            for(var j = 0; j < picRows; j++) {
                for(var i = 0; i < cols; i += 1) {

                    // we'll use picIndex to get pic's file name
                    var picIndex = j * 6 + i + 1;

                    // make section for "text block"
                    if (picIndex ===16 || picIndex === 17 || picIndex === 18) {
                        cf = {mask: noCollideCategory};
                        picOpacity = 0;
                    } else {
                        cf = { mask: defaultCategory };
                        picOpacity = 1;
                    }

                    var _density = Math.random() / 10;
                    var _friction = Math.random() / 10;
                    console.log(_density);
                    
                    //var _frictionAir = Math.random() / 30;
                    blocks.push(

                        // Bodies.rectangle(
                        // 	startX + (i + 0.5) * bSettings.dim,
                        // 	startY + (j + 0.5) * bSettings.dim,
                        // 	bSettings.dim,
                        // 	bSettings.dim,
                        // 	{
                        // 		collisionFilter: { mask: defaultCategory },
                        // 		render: {

                        // 			fillStyle: 'rgb(192,0,192)'

                        // 		}
                        // 	}
                        // )


                        //if (picIndex)
                        Bodies.rectangle(
                            //startX + (i+.5) * (140+70),
                            //startY + (j+.5) * (210+70),
                            startX + (i+.5) * (picOriginalWidth + picGap),
                            startY + (j+.5) * (picOriginalHeight + picGap),
                            140,
                            196,
                            {
                                collisionFilter: cf,
                                render: {
                                    strokeStyle: 'rgba(0,0,0,0)',
                                    fillStyle:   'rgba(0,0,0,0)',
                                    opacity: picOpacity,
                                    sprite: {
                                        //texture: '/b/fashion/images/projects/2017-box/box'+ ( j*6+i+1 ) +'.jpg'
                                        texture: '/b/fashion/campaigns/images/spring-fashion-trends/2018/image-grid/pic'+ picIndex +'.jpg'
                                    }
                                },
                                //restitution (elasticity) of the body. 
                                // The value is always positive and is in the range (0, 1). 
                                // A value of 0 means collisions may be perfectly inelastic and no bouncing may occur. 
                                // A value of 0.8 means the body may bounce back with approximately 80% of its kinetic energy
                                restitution: .5,
                                // frictionAir – the air friction of the body (air resistance); default: 0.01
                                frictionAir: 0.03,
                                friction: _friction,
                                density: _density
                            }
                        )
                    );
                    // }

                    //picCount++;
                }


            }


            World.add(engine.world, blocks);

            // walls ???

            World.add(engine.world, [
                // walls
                // Bodies.rectangle(0, 0, (winW*2), 10*2, { isStatic: true }),
                // Bodies.rectangle(0, 0, 10*2, (winH*2), { isStatic: true }),
                // Bodies.rectangle((winW-10*2), 0, 10, (winH*2), { isStatic: true }),
                //Bodies.rectangle(0, (winH), (winW*2), 10, { isStatic: true })

                //Bodies.rectangle(0, (winH), (winW*2), 10, { isStatic: true })
            ]);

        }





        function initScroller(engine) {
            // will search inside the element scrollerContainer for elements with class 'make-block'
            // and create blocks for these elements. furthermore if a particular element has class 'decompose-lines'
            // the individual lines within the block will be broken into spans and blocks made for these.

            //var velocityScale = 0.01; // fudge factor for velocity of the scrolling blocks created by the scroll action
            //var velocityScale = 0.03;

            var velocityScale = 0.025;

            ////////////////
            /*
             var blocks = [];

             $scrollerContainer.find('.' + makeBlockClass).each(function() {
             var $el = $(this);
             if($el.hasClass(decomposeLinesClass)) {
             // wrap all <br>-delineated lines by spans
             var wrappedHtml = '<span class="scroll-block">' + $el.html() + '</span>';
             wrappedHtml = wrappedHtml.replace(/<br\s*[\/]?>/gi, '</span><br><span class="scroll-block">');
             $el.html(wrappedHtml);

             // make blocks from the spans
             $el.find('span.scroll-block').each(function() {
             var $spanEl = $(this);
             var block = makeBlockFromElementBBox($spanEl);
             blocks.push(block);
             });
             } else {
             $el.addClass('scroll-block');
             var block = makeBlockFromElementBBox($el);
             blocks.push(block);
             }
             });

             World.add(engine.world, blocks);
             */

            // all pages as a single block
            var blocks = [];
            var pagesWrapper = $('.resort-pages-wrapper');

            //pagesWrapper.css('margin-top', canvasHeight - $('.resort-intro-message').height()+ 160 );
            pagesWrapper.css('margin-top', canvasHeight);
            //pagesWrapper.addClass('was-scrolled');
            
            var bb = makeBlockFromElementBBox($('.resort-page'));
            blocks.push(bb);
            World.add(engine.world, blocks);


            // also add the nav block and language block, which will be static normally but scroll on mobile
            // if the window is below the breakpoint, these elements will not collide with the blocks by default

            ////var navEl = navContainer.get(0);
            ////var navBBox = navEl.getBoundingClientRect();

            var navBBox = navContainer[0].getBoundingClientRect();
            var navBlock = Bodies.rectangle(navBBox.left + navBBox.width / 2,
                navBBox.top + navBBox.height / 2,

                navBBox.width, navBBox.height,
                {
                    isStatic: true,
                    collisionFilter: { mask: (winW < blockSettings.breakpoint) ? noCollideCategory : defaultCategory },
                    render: { fillStyle: 'rgba(255,0,0,0)', strokeStyle: 'rgba(255,0,0,0)' }
                });

            /*
             var langEl = $lang.get(0);
             var langBBox = langEl.getBoundingClientRect();
             var langBlock = Bodies.rectangle(langBBox.left + langBBox.width / 2, langBBox.top + langBBox.height / 2, langBBox.width, langBBox.height, {
             isStatic: true,
             collisionFilter: { mask: (winW < blockSettings.breakpoint) ? noCollideCategory : defaultCategory },
             render: { fillStyle: 'rgba(255,0,0,0)' }
             });
             */
            //World.add(engine.world, [navBlock, langBlock]);


            /////// World.add(engine.world, [navBlock]);


            var lastScrollTop = $scrollEventGenerator.scrollTop();
            $scrollEventGenerator.scroll(function() {
                var thisScrollTop = $scrollEventGenerator.scrollTop();
                var dS = thisScrollTop - lastScrollTop;

                for(var i = 0; i < blocks.length; i++) {
                    Body.translate(blocks[i], Vector.create(0, -dS));
                    Body.setVelocity(blocks[i], Vector.create(0, -dS * velocityScale));
                    
                    Body.setAngularVelocity( blocks[i], Math.PI/36);
                }

                /////////////var navBBoxScroll = navEl.getBoundingClientRect();
                ////////////Body.setPosition(navBlock, Vector.create(navBBoxScroll.left + navBBoxScroll.width / 2, navBBoxScroll.top + navBBoxScroll.height / 2));

                lastScrollTop = thisScrollTop;

                ///console.log(thisScrollTop);

                //engine.world.gravity.x = .025;
                engine.world.gravity.y = .3;

                $('.resort-intro-message').addClass('animated fadeOutUp');



            });

            return {
                ////blocks: blocks,
                navBlock: navBlock
                //langBlock: langBlock
            };
        }

        function makeBlockFromElementBBox($element) {
            var bbox = $element.get(0).getBoundingClientRect();
            //return Bodies.rectangle(bbox.left + bbox.width / 2, bbox.top + bbox.height / 2, bbox.width, bbox.height , {
            return Bodies.rectangle(bbox.left + 524, bbox.top + 10000 + 128, 1048, 20000 , {
                isStatic: true,
                collisionFilter: { mask: defaultCategory },
                render: { fillStyle: 'rgba(0,0,0,0)', strokeStyle: 'rgba(0,0,0,0)'}
                //render: { fillStyle: 'rgba(0,0,0,.5)'}
            });
        }

        //////////
        /*
         function updateBlockBounds($el, block) {
         var bbox = $el.get(0).getBoundingClientRect();

         Body.setVertices(block, Matter.Vertices.create([
         {x: bbox.left,  y: bbox.top},
         {x: bbox.right, y: bbox.top},
         {x: bbox.right, y: bbox.bottom},
         {x: bbox.left,  y: bbox.bottom}
         ]));

         /////Body.setPosition(block, Vector.create(bbox.left + bbox.width / 2, bbox.top + bbox.height / 2));
         Body.setPosition(block, Vector.create(bbox.left + bbox.width , bbox.top + bbox.height));
         }

         function doOnWindowResize(scrollBlocks) {
         winW = window.innerWidth;
         winH = window.innerHeight;

         canvas.width = winW;
         canvas.height = winH;

         // move the blocks in the scrolling element based on the updated positions of their respective DOM elements
         $scrollerContainer.find('.scroll-block').each(function(i) {
         updateBlockBounds($(this), scrollBlocks.blocks[i]);
         });

         // change the collision category of the nav and lang element so that they will not collide when below the breakpoint
         if(winW < blockSettings.breakpoint) {
         scrollBlocks.navBlock.collisionFilter.mask = scrollBlocks.navBlock.collisionFilter.mask = noCollideCategory;
         } else {
         scrollBlocks.navBlock.collisionFilter.mask = scrollBlocks.navBlock.collisionFilter.mask = defaultCategory;
         }

         // do the same for the nav element and lang element since they can scroll in mobile
         updateBlockBounds(navContainer, scrollBlocks.navBlock);
         //updateBlockBounds($nav, scrollBlocks.langBlock);

         }
         */

        return {
            init: init
        };

    })(jQuery);

    var leftPosition = $('.resort-main').offset().left / $(window).width();
    var settings = {

        desktop: {
            top: 0,
            bottom: 0,
            //left: 0.25,
            left: leftPosition,
            right: 0
            //dim: 210
        },

        mobile: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
            //dim: 35
        },

        breakpoint: 900

    };



    ///////////// 

    blockAnimation.init(settings);








    var matter_js_url = "/b/fashion/campaigns/javascripts/spring-fashion-trends/2018/libs/matter.min.js";
    var matter_js_cdn = 'https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.12.0/matter.min.js';

    var test = "/b/fashion/campaigns/javascripts/spring-fashion-trends/2018/init-matter.js";
    
    


    
    // ---- use matter.js - end
    

    //$(window).one('scroll', function(){
       // introMessage.addClass('animated fadeOutUpBig')
    //});

    // Scroll to a certain element

    /*
    $('.resort-aside-nav-item').on('click', function () {
       $(this).removeClass('resort-current-item');
    });
    
    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }
                    });
                }
            }
        });
*/
    //--------

    // Cache selectors
    //var firstHash = "#section-1";
    //var headerHeight = $('header').outerHeight();
    //var navBar = $('.nav-bar-wrapper');
    //var navBarHeight = navBar.outerHeight();

// All navigation items

    var categoryID = "spring18_resort";
    
    var navItems = $('.resort-nav__menu').find('a').not('.resort-external-link');

// Anchors corresponding to nav items
    var webPageSections = navItems.map(function () {
        var item = $($(this).attr('href'));
        if (item.length) {
            return item;
        }
    });

    var ci = "";
    ///var navItemsClicked = false;
// Click handler to nav items
    navItems.on('click', function(e){
        var sectionName = $(this).attr('href');
        // ci = sectionName.replace('#','');
        //navItemsClicked = true;
        
        var offsetTop = sectionName === "#" ? 0 : $(sectionName).offset().top + 60;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300 );

        e.preventDefault();
    });

    var backToTopBtnHolder = $('.resort-back-to-top-btn-holder');
    var scrollDownBtnHolder = $('.resort-scroll-down-btn-holder');
    var vh = $(window).height() * 1.5;

    //console.log('vh: ' + vh);
    backToTopBtnHolder.hide();
    
    $(window).scroll(function () {
        // var windowScrollTop = $(this).scrollTop();

        // Underline nav button according to scroll position.
        // var fromTop = windowScrollTop; //+ navBarHeight;

        var fromTop = $(this).scrollTop();

        if(fromTop > $(window).height() * 0.8) {
            scrollDownBtnHolder.hide();
        } else {
            scrollDownBtnHolder.show();
        }
        if(fromTop > vh) {
            
            backToTopBtnHolder.show();
            backToTopBtnHolder.removeClass('fadeOutDown').addClass('animated fadeInUp');
        } else {
            backToTopBtnHolder.removeClass('fadeInUp').addClass('animated fadeOutDown');
            
        }
        
        //console.log('fromTop: ' + fromTop);
        
        var currentItem = webPageSections.map(function () {
            if ($(this).offset().top < fromTop) {
                return this;
            }
        });
        currentItem = currentItem[currentItem.length - 1];
        var id = currentItem && currentItem.length ? currentItem[0].id : "";
        navItems.removeClass('resort-current-item').end()
            .filter('[href=#' + id + ']')
            .addClass('resort-current-item');


        //if (!navItemsClicked) {
        // fire once
        if (id != ci) {
            //$.fn.coreTag('Pageview', navItems.end().filter('[href=#' + id + ']').attr("coremetricTag"));
            $.fn.coreTag('Pageview', categoryID + '__'  +id.toUpperCase());
            ci = id;
        }
        //}


        navItems.blur();

       

        //$(this).one($.fn.coreTag('Element', navItems.attr( "coremetricTag" )));

        // Change url hash without page jump
        if (history.pushState) {
            if (id != '') {
                history.pushState(null, null, '#' + id);
            } else {

                //history.pushState(null, null, firstHash);
            }
        }

        /*
        //Select the last nav bar item on the bottom of the page if pages are too short
        var lastNavItem = navItems.last();
        var scrollHeight = $(document).height();
        var scrollPosition = $(this).height() + windowScrollTop;
        if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
            history.pushState(null, null, lastNavItem.attr('href'));
            navItems.parent().removeClass("active");
            lastNavItem.parent().addClass("active");
        }
        */
        
        
        
    });

    $('.resort-back-to-top-btn, .resort-scroll-down-btn').on('click', function (e) {
        e.preventDefault();
        scrollDownBtnHolder.hide();
        $('html, body').stop().animate({
            scrollTop: $('#florals').offset().top - 90
        }, 300 );

        $('a[coremetricTag="aside-nav-Florals"]').addClass('resort-current-item');
        
    });


    /*
     $('.resort-nav').pin({
     containerSelector: '.resort-aside',
     minWidth: 1024
     });
     $('.resort-intro-message').pin({
     containerSelector: '.resort-main',
     padding: {top: 576}
     });
     */
    // 576px – fixed top position based on image grid rows height
    //

    // $('.resort-back-to-top-btn-holder').stickySidebar({
    //     topSpacing: 600,
    //     bottomSpacing: 40
    //
    // });

    $('.resort-nav').stickySidebar({
        topSpacing: 0,
        bottomSpacing: 40,
        minWidth: 1024
    });

    var introMessage = $('.resort-intro-message');
    $('.resort-intro-message-holder').stickySidebar({
        topSpacing: 0,
        bottomSpacing: 0
    });

    // ----------- Mobile nav switcher
    var mainContainer = $('.resort-wrapper');
    var viewportWidth = $(window).width();
    $('#mobile-nav-switcher').on('click', function () {
        mainContainer.toggleClass('mobile-nav-is-open');
    });
    $(window).resize(function() {
        if(viewportWidth >= 1024){
            mainContainer.removeClass('mobile-nav-is-open');
        }
    });

    // ------- 

    

    //_btn.hide();
    
    var _resortFlorals = $('.resort-florals-1');
    emergence.init({
        //container: window,
        //reset: true,
        //handheld: true,
        throttle: 50,
        elemCushion: .75,
        //offsetTop: 0,
        //offsetRight: 0,
        //offsetBottom: 32,
        //offsetLeft: 0,
        callback: function(element, state) {
            if (state === 'visible') {
                console.log('Element is visible.');
                console.log(element.getAttribute('id'));
                backToTopBtnHolder.addClass('is-not-fixed');
                if(element.getAttribute('id') === 'btt-visibility-trigger') {
                   // _btn.hide();
                }
            } else if (state === 'reset') {
                console.log('Element is hidden with reset.');
                backToTopBtnHolder.removeClass('is-not-fixed');
                if(element.getAttribute('id') === 'btt-visibility-trigger') {
                   // _btn.show();
                }
            } else if (state === 'noreset') {
                console.log('Element is hidden with NO reset.');
            }
        }
    });

});

