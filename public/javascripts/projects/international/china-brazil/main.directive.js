'use strict';

angular
    .module('directives')
    .directive('globalNav', function() {
        return {
            templateUrl: 'components/global-nav.html'
        };
    })
    .directive('contactUs', function() {
        return {
            templateUrl: 'components/contact-us.html'
        };
    })

    /**
    * @desc: preventDefault on anchor tags
    * @example: <a></a>
    */       
    .directive('a', function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function(e) {
                        e.preventDefault();
                    });
                }
            }
        };
    })

    /**
    * @desc: apply element text content as html
    * @example: <div text-to-html></div>
    */    
    .directive('textToHtml', function($timeout) {
        return {
            restrict: 'A',
            replace: true,
            link: function($scope, elem, attrs) {
                $scope.$watch(attrs.textToHtml, function(newValue) {
                    jQuery(elem).hide();
                    
                    $timeout(function(){
                        elem.html(newValue);
                        jQuery(elem).show();
                    }, 1);
                });         
            }
        };
    })

    /**
    * @desc: calendar for contact us form
    * @example: <div pick-date></div>
    */       
    .directive('pickDate', function() {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, el) {
                var options1 = {
                        format: 'mm-dd-yyyy',
                        disableDblClickSelection: true
                    },
                    options2 = {
                        closeButton: true
                    };

                // set up datapicker on load
                angular.element(document).ready(function() {
                    scope.$pick1 = jQuery(el).fdatepicker(options1);
                    scope.$pick2 = jQuery(el).fdatepicker(options2);
                });

                // // implementation of disabled form fields
                var nowTemp = new Date();
                var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
                var checkin = jQuery('.arriving-input').fdatepicker({
                    onRender: function(date) {
                        return date.valueOf() < now.valueOf() ? 'disabled' : '';
                    }
                }).on('changeDate', function(ev) {
                    if (ev.date.valueOf() > checkout.date.valueOf()) {
                        var newDate = new Date(ev.date);
                        scope.cu.arrivingdate = jQuery('.arriving-input').val();
                        newDate.setDate(newDate.getDate() + 1);
                        checkout.update(newDate);
                        scope.cu.departingdate = jQuery('.departing-input').val();
                    }
                    checkin.hide();
                    scope.emailForm.arrivingdate.$setDirty();
                    jQuery('.departing-input')[0].focus();
                }).data('datepicker');
                var checkout = jQuery('.departing-input').fdatepicker({
                    onRender: function(date) {
                        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
                    }
                }).on('changeDate', function() {
                    scope.cu.departingdate = jQuery('.departing-input').val();
                    checkout.hide();
                    scope.emailForm.departingdate.$setDirty();
                }).data('datepicker');
            }
        };
    })

    /**
    * @desc: sticky nav directive; ref: https://github.com/d-oliveros/ngSticky
    * @example: <div sticky></div>
    */     
    .directive('sticky', ['$window', function($window) {
        return {
            restrict: 'A', // this directive can only be used as an attribute.
            scope: {
                disabled: '=disabledSticky'
            },
            link: function linkFn($scope, $elem, $attrs) {
                // Setting scope
                var scrollableNodeTagName = 'sticky-scroll'; // convention used in the markup for annotating scrollable container of these stickies
                var stickyLine;
                var stickyBottomLine = 0;
                var placeholder;
                var isSticking = false;
                var originalOffset;

                // Optional Classes
                var stickyClass = $attrs.stickyClass || '';
                var unstickyClass = $attrs.unstickyClass || '';
                var bodyClass = $attrs.bodyClass || '';
                var bottomClass = $attrs.bottomClass || '';

                // Find scrollbar
                var scrollbar = deriveScrollingViewport($elem);

                // Define elements
                var windowElement = angular.element($window);
                var scrollbarElement = angular.element(scrollbar);
                var $body = angular.element(document.body);

                // Define options
                var usePlaceholder = ($attrs.usePlaceholder !== 'false');
                var anchor = $attrs.anchor === 'bottom' ? 'bottom' : 'top';
                var confine = ($attrs.confine === 'true');
                // flag: can react to recalculating the initial CSS dimensions later as link executes prematurely. defaults to immediate checking
                var isStickyLayoutDeferred = $attrs.isStickyLayoutDeferred !== undefined ? ($attrs.isStickyLayoutDeferred === 'true') : false;

                // flag: is sticky content constantly observed for changes. Should be true if content uses ngBind to show text that may vary in size over time
                var isStickyLayoutWatched = $attrs.isStickyLayoutWatched !== undefined ? ($attrs.isStickyLayoutWatched === 'true') : true;
                var initialPosition = $elem.css('position'); // preserve this original state

                var offset = $attrs.offset ? parseInt($attrs.offset.replace(/px;?/, '')) : 0;
                var onStickyContentLayoutHeightWatchUnbind;

                // initial style
                var initialStyle = $elem.attr('style') || '';
                var initialCSS; 

                /**
                 * Initialize Sticky
                 */
                var initSticky = function() {
                    // Listeners
                    scrollbarElement.on('scroll', checkIfShouldStick);
                    windowElement.on('resize', $scope.$apply.bind($scope, onResize));

                    memorizeDimensions(); // remember sticky's layout dimensions

                    // Clean up
                    $scope.$on('$destroy', onDestroy);
                };

                /**
                 * need to recall sticky's DOM attributes ( make sure layout has occured)
                 */
                function memorizeDimensions() {
                    // immediate assignment, but there is the potential for wrong values if content not ready
                    initialCSS = $scope.calculateStickyContentInitialDimensions();

                    // option to calculate the dimensions when layout is 'ready'
                    if (isStickyLayoutDeferred) {

                        // logic: when this directive link() runs before the content has had a chance to layout on browser, height could be 0
                        if (!$elem[0].getBoundingClientRect().height) {

                            onStickyContentLayoutHeightWatchUnbind = $scope.$watch(
                                function() {
                                    return $elem.height();
                                },

                                // state change: sticky content's height set
                                function onStickyContentLayoutInitialHeightSet(newValue) {
                                    if (newValue > 0) {
                                        // now can memorize
                                        initialCSS = $scope.calculateStickyContentInitialDimensions();

                                        if (!isStickyLayoutWatched) {
                                            // preference was to do just a one-time async watch on the sticky's content; now stop watching
                                            onStickyContentLayoutHeightWatchUnbind();
                                        }
                                    }
                                }
                            );
                        }

                        // any processing for when sticky layout is immediate
                    }
                }

                /**
                 * Determine if the element should be sticking or not.
                 */
                var checkIfShouldStick = function() {
                    // Check media query and disabled attribute
                    if (($scope.disabled === true || mediaQueryMatches()) && isSticking) {
                        return unStickElement();
                    }

                    // What's the document client top for?
                    var scrollbarPosition = scrollbarYPos();
                    var shouldStick;

                    if (anchor === 'top') {
                        if (confine === true) {
                            shouldStick = scrollbarPosition > stickyLine && scrollbarPosition <= stickyBottomLine;
                        } else {
                            shouldStick = scrollbarPosition > stickyLine;
                        }
                    } else {
                        shouldStick = scrollbarPosition <= stickyLine;
                    }

                    // Switch the sticky mode if the element crosses the sticky line
                    // $attrs.stickLimit - when it's equal to true it enables the user
                    // to turn off the sticky function when the elem height is
                    // bigger then the viewport
                    var closestLine = getClosest(scrollbarPosition, stickyLine, stickyBottomLine);

                    if (shouldStick && !shouldStickWithLimit($attrs.stickLimit) && !isSticking) {
                        stickElement(closestLine);
                    } else if (!shouldStick && isSticking) {
                        unStickElement(closestLine, scrollbarPosition);
                    } else if (confine && !shouldStick) {
                        // If we are confined to the parent, refresh, and past the stickyBottomLine
                        // We should 'remember' the original offset and unstick the element which places it at the stickyBottomLine
                        originalOffset = elementsOffsetFromTop($elem[0]);

                        unStickElement(closestLine, scrollbarPosition);
                    }
                };

                /**
                 * determine the respective node that handles scrolling, defaulting to browser window
                 */
                function deriveScrollingViewport(stickyNode) {
                    // derive relevant scrolling by ascending the DOM tree
                    var match = findAncestorTag(scrollableNodeTagName, stickyNode);
                    return (match.length === 1) ? match[0] : $window;
                }

                /**
                 * since jqLite lacks closest(), this is a pseudo emulator ( by tag name )
                 */
                function findAncestorTag(tag, context) {
                    var m = [], // nodelist container
                        n = context.parent(), // starting point
                        p;

                    do {
                        var node = n[0]; // break out of jqLite
                        // limit DOM territory
                        if (node.nodeType !== 1) {
                            break;
                        }

                        // success
                        if (node.tagName.toUpperCase() === tag.toUpperCase()) {
                            return n;
                        }

                        p = n.parent();
                        n = p; // set to parent
                    } while (p.length !== 0);

                    return m; // empty set
                }

                /**
                 * Seems to be undocumented functionality
                 */
                function shouldStickWithLimit(shouldApplyWithLimit) {
                    if (shouldApplyWithLimit === 'true') {
                        return ($window.innerHeight - ($elem[0].offsetHeight + parseInt(offset)) < 0);
                    } else {
                        return false;
                    }
                }

                /**
                 * Finds the closest value from a set of numbers in an array.
                 */
                function getClosest(scrollTop, stickyLine, stickyBottomLine) {
                    var closest = 'top';
                    var topDistance = Math.abs(scrollTop - stickyLine);
                    var bottomDistance = Math.abs(scrollTop - stickyBottomLine);

                    if (topDistance > bottomDistance) {
                        closest = 'bottom';
                    }

                    return closest;
                }

                /**
                 * Unsticks the element
                 */
                function unStickElement(fromDirection) {
                    $elem.attr('style', initialStyle);
                    isSticking = false;

                    $body.removeClass(bodyClass);
                    $elem.removeClass(stickyClass);
                    $elem.addClass(unstickyClass);

                    if (fromDirection === 'top') {
                        $elem.removeClass(bottomClass);

                        $elem
                            .css('z-index', 10)
                            .css('width', $elem[0].offsetWidth)
                            .css('top', initialCSS.top)
                            .css('position', initialCSS.position)
                            .css('left', initialCSS.cssLeft)
                            .css('margin-top', initialCSS.marginTop)
                            .css('height', initialCSS.height);
                    } else if (fromDirection === 'bottom' && confine === true) {
                        $elem.addClass(bottomClass);

                        // It's possible to page down page and skip the 'stickElement'.
                        // In that case we should create a placeholder so the offsets don't get off.
                        createPlaceholder();

                        $elem
                            .css('z-index', 10)
                            .css('width', $elem[0].offsetWidth)
                            .css('top', '')
                            .css('bottom', 0)
                            .css('position', 'absolute')
                            .css('left', initialCSS.cssLeft)
                            .css('margin-top', initialCSS.marginTop)
                            .css('margin-bottom', initialCSS.marginBottom)
                            .css('height', initialCSS.height);
                    }

                    if (placeholder && fromDirection === anchor) {
                        placeholder.remove();
                    }
                }

                /**
                 * Sticks the element
                 */
                function stickElement() {
                    // Set sticky state
                    isSticking = true;

                    initialCSS.offsetWidth = $elem[0].offsetWidth;

                    $body.addClass(bodyClass);
                    $elem.removeClass(unstickyClass);
                    $elem.removeClass(bottomClass);
                    $elem.addClass(stickyClass);

                    createPlaceholder();

                    $elem
                        .css('z-index', '10')
                        .css('width', $elem[0].offsetWidth + 'px')
                        .css('position', 'fixed')
                        .css('left', $elem.css('left').replace('px', '') + 'px')
                        .css(anchor, (offset + elementsOffsetFromTop(scrollbar)) + 'px')
                        .css('margin-top', 0);

                    if (jQuery($elem).hasClass('nav-wrapper')) $elem.css('z-index', '12');

                    if ($elem.hasClass('dropdown-cnbr')) {
                        $elem
                            .css('left', '50%')
                            .css('width', '962px')
                            .css('margin-left', '-481px');
                    }

                    if ($elem.hasClass('cnbr-header-store')) {
                        $elem
                            .css('width', '100%');
                    }

                    if (anchor === 'bottom') {
                        $elem.css('margin-bottom', 0);
                    }
                }

                /**
                 * Clean up directive
                 */
                var onDestroy = function() {
                    scrollbarElement.off('scroll', checkIfShouldStick);
                    windowElement.off('resize', onResize);


                    $body.removeClass(bodyClass);

                    if (placeholder) {
                        placeholder.remove();
                    }
                };

                /**
                 * Updates on resize.
                 */
                var onResize = function() {
                    unStickElement(anchor);
                    checkIfShouldStick();
                };

                /**
                 * Triggered on load / digest cycle
                 */
                var onDigest = function() {
                    if ($scope.disabled === true) {
                        return unStickElement();
                    }

                    if (anchor === 'top') {
                        return (originalOffset || elementsOffsetFromTop($elem[0])) - elementsOffsetFromTop(scrollbar) + scrollbarYPos();
                    } else {
                        return elementsOffsetFromTop($elem[0]) - scrollbarHeight() + $elem[0].offsetHeight + scrollbarYPos();
                    }
                };

                /**
                 * Triggered on change
                 */
                var onChange = function(newVal, oldVal) {
                    if ((newVal !== oldVal || typeof stickyLine === 'undefined') &&
                        (!isSticking && !isBottomedOut())) {
                        stickyLine = newVal - offset;

                        // IF the sticky is confined, we want to make sure the parent is relatively positioned,
                        // otherwise it won't bottom out properly
                        if (confine) {
                            $elem.parent().css({
                                'position': 'relative'
                            });
                        }

                        // Get Parent height, so we know when to bottom out for confined stickies
                        var parent = $elem.parent()[0];
                        // Offset parent height by the elements height, if we're not using a placeholder
                        var parentHeight = parseInt(parent.offsetHeight) - (usePlaceholder ? 0 : $elem[0].offsetHeight);

                        // and now lets ensure we adhere to the bottom margins
                        // TODO: make this an attribute? Maybe like ignore-margin?
                        var marginBottom = parseInt($elem.css('margin-bottom').replace(/px;?/, '')) || 0;

                        // specify the bottom out line for the sticky to unstick
                        var elementsDistanceFromTop = elementsOffsetFromTop($elem[0]);
                        var parentsDistanceFromTop = elementsOffsetFromTop(parent);
                        var scrollbarDistanceFromTop = elementsOffsetFromTop(scrollbar);

                        var elementsDistanceFromScrollbarStart = elementsDistanceFromTop - scrollbarDistanceFromTop;
                        var elementsDistanceFromBottom = parentsDistanceFromTop + parentHeight - elementsDistanceFromTop;

                        stickyBottomLine = elementsDistanceFromScrollbarStart + elementsDistanceFromBottom - $elem[0].offsetHeight - marginBottom - offset + scrollbarYPos();

                        checkIfShouldStick();
                    }
                };

                /**
                 * Helper Functions
                 */

                /**
                 * Create a placeholder
                 */
                function createPlaceholder() {
                    if (usePlaceholder) {
                        // Remove the previous placeholder
                        if (placeholder) {
                            placeholder.remove();
                        }

                        placeholder = angular.element('<div>');
                        placeholder.css('height', $elem[0].offsetHeight + 'px');

                        $elem.after(placeholder);
                    }
                }

                /**
                 * Are we bottomed out of the parent element?
                 */
                function isBottomedOut() {
                    if (confine && scrollbarYPos() > stickyBottomLine) {
                        return true;
                    }

                    return false;
                }

                /**
                 * Fetch top offset of element
                 */
                function elementsOffsetFromTop(element) {
                    var offset = 0;

                    if (element.getBoundingClientRect) {
                        offset = element.getBoundingClientRect().top;
                    }

                    return offset;
                }

                /**
                 * Retrieves top scroll distance
                 */
                function scrollbarYPos() {
                    var position;

                    if (typeof scrollbar.scrollTop !== 'undefined') {
                        position = scrollbar.scrollTop;
                    } else if (typeof scrollbar.pageYOffset !== 'undefined') {
                        position = scrollbar.pageYOffset;
                    } else {
                        position = document.documentElement.scrollTop;
                    }

                    return position;
                }

                /**
                 * Determine scrollbar's height
                 */
                function scrollbarHeight() {
                    var height;

                    if (scrollbarElement[0] instanceof HTMLElement) {
                        // isn't bounding client rect cleaner than insane regex mess?
                        height = $window.getComputedStyle(scrollbarElement[0], null)
                            .getPropertyValue('height')
                            .replace(/px;?/, '');
                    } else {
                        height = $window.innerHeight;
                    }

                    return parseInt(height) || 0;
                }

                /**
                 * Checks if the media matches
                 */
                function mediaQueryMatches() {
                    var mediaQuery = $attrs.mediaQuery || false;
                    var matchMedia = $window.matchMedia;

                    return mediaQuery && !(matchMedia('(' + mediaQuery + ')').matches || matchMedia(mediaQuery).matches);
                }

                // Setup watcher on digest and change
                $scope.$watch(onDigest, onChange);

                // public accessors for the controller to hitch into. Helps with external API access
                $scope.getElement = function() {
                    return $elem;
                };
                $scope.getScrollbar = function() {
                    return scrollbar;
                };
                $scope.getInitialCSS = function() {
                    return initialCSS;
                };
                $scope.getAnchor = function() {
                    return anchor;
                };
                $scope.isSticking = function() {
                    return isSticking;
                };
                $scope.getOriginalInitialCSS = function() {
                    return originalInitialCSS;
                };
                // pass through aliases
                $scope.processUnStickElement = function(anchor) {
                    unStickElement(anchor);
                };
                $scope.processCheckIfShouldStick = function() {
                    checkIfShouldStick();
                };

                /**
                 * set the dimensions for the defaults of the content block occupied by the sticky element
                 */
                $scope.calculateStickyContentInitialDimensions = function() {
                    return {
                        zIndex: $elem.css('z-index'),
                        top: $elem.css('top'),
                        position: initialPosition, // revert to true initial state
                        marginTop: $elem.css('margin-top'),
                        marginBottom: $elem.css('margin-bottom'),
                        cssLeft: $elem.css('left'),
                        height: $elem.css('height')
                    };
                };

                /**
                 * only change content box dimensions
                 */
                $scope.updateStickyContentUpdateDimensions = function(width, height) {
                    if (width && height) {
                        initialCSS.width = width + 'px';
                        initialCSS.height = height + 'px';
                        // if a dimensionless pair of arguments was supplied.
                    }
                };

                // ----------- configuration -----------

                var originalInitialCSS = $scope.calculateStickyContentInitialDimensions(); // preserve a copy
                // Init the directive
                initSticky();
            },

            /**
             * +++++++++ public APIs+++++++++++++
             */
            controller: ['$scope', '$window', function($scope, $window) {

                /**
                 * integration method allows for an outside client to reset the pinned state back to unpinned.
                 * Useful for when refreshing the scrollable DIV content completely
                 * if newWidth and newHeight integer values are not supplied then function will make a best guess
                 */
                this.resetLayout = function(newWidth, newHeight) {

                    var scrollbar = $scope.getScrollbar(),
                        initialCSS = $scope.getInitialCSS(),
                        anchor = $scope.getAnchor();

                    function _resetScrollPosition() {

                        // reset means content is scrolled to anchor position
                        if (anchor === 'top') {
                            // window based scroller
                            if (scrollbar === $window) {
                                $window.scrollTo(0, 0);
                                // DIV based sticky scroller
                            } else {
                                if (scrollbar.scrollTop > 0) {
                                    scrollbar.scrollTop = 0;
                                }
                            }
                        }
                        // todo: need bottom use case
                    }

                    // only if pinned, force unpinning, otherwise height is inadvertently reset to 0
                    if ($scope.isSticking()) {
                        $scope.processUnStickElement(anchor);
                        $scope.processCheckIfShouldStick();
                    }
                    // remove layout-affecting attribures that were modified by this sticky
                    $scope.getElement().css({
                        'width': '',
                        'height': '',
                        'position': '',
                        'top': '',
                        zIndex: ''
                    });
                    // model resets
                    initialCSS.position = $scope.getOriginalInitialCSS().position; // revert to original state
                    delete initialCSS.offsetWidth; // stickElement affected

                    // use this directive element's as default, if no measurements passed in
                    if (newWidth === undefined && newHeight === undefined) {
                        var eBcr = $scope.getElement()[0].getBoundingClientRect();
                        newWidth = eBcr.width;
                        newHeight = eBcr.height;
                    }

                    // update model with new dimensions ( if supplied from client's own measurement )
                    $scope.updateStickyContentUpdateDimensions(newWidth, newHeight); // update layout dimensions only

                    _resetScrollPosition();
                };

                /**
                 * return a reference to the scrolling element ( window or DIV with overflow )
                 */
                this.getScrollbar = function() {
                    return $scope.getScrollbar();
                };
            }]
        };
    }])


    /**
    * @desc: directive used as an attribute to create equal height content on your page
    * @example: <div equalized-element></div>
    */     
    .directive('equalizedElement', function($window, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, elem) {
                function eqFunction(elem) {
                    var el = jQuery(elem),
                        index = jQuery(elem).index(),
                        elHeight = el.height(),
                        elPrev = null,
                        prevHeight = null,
                        screenWidth = jQuery(window).width(),
                        isSmallScreen = (screenWidth < 640) ? true : false;
                    
                    if (!isSmallScreen && !el.hasClass('odd') && index%2 !== 0) {
                        elPrev = el.parent().children(':eq('+ (index-1) +')');
                        prevHeight = elPrev.height();

                        if (prevHeight > elHeight) {
                            el.css('height', prevHeight+1);
                        }
                        // console.log(prevHeight + ' - ' + elHeight);
                    } else if (!isSmallScreen && el.hasClass('odd') && index !==0 && index%2 === 0) {
                        // this is a particular use case for the "In-Store Dining" section in the /visit-our-stores view
                        elPrev = el.parent().children(':eq('+ (index-1) +')');
                        prevHeight = elPrev.height();

                        if (prevHeight > elHeight) {
                            el.css('height', prevHeight+1);
                        }

                        // console.log(prevHeight + ' > ' + elHeight);
                    }       
                }

                var windowElement = angular.element($window);
                var onResize = function() {
                    // console.log(1);
                    eqFunction(elem);
                };
                windowElement.on('resize orientationchange', $scope.$apply.bind($scope, onResize));


                $timeout(function(){
                    eqFunction(elem);
                }, 400);
            }
        };
    });
