/*!
 loadCSS: load a CSS file asynchronously.
 [c]2014 @scottjehl, Filament Group, Inc.
 Licensed MIT
 */
function loadCSS(href, before, media) {
    "use strict";
    // Arguments explained:
    // `href` is the URL for your CSS file.
    // `before` optionally defines the element we'll use as a reference for injecting our <link>
    // By default, `before` uses the first <script> element in the page.
    // However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
    // If so, pass a different reference element to the `before` argument and it'll insert before that instead
    // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
    var ss = window.document.createElement("link");
    var ref = before || window.document.getElementsByTagName("script")[0];
    var sheets = window.document.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
    ss.media = "only x";
    // inject link
    ref.parentNode.insertBefore(ss, ref);
    // This function sets the link's media back to `all` so that the stylesheet applies once it loads
    // It is designed to poll until document.styleSheets includes the new sheet.
    function toggleMedia() {
        var defined;
        for (var i = 0; i < sheets.length; i++) {
            if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
                defined = true;
            }
        }
        if (defined) {
            ss.media = media || "all";
        }
        else {
            setTimeout(toggleMedia);
        }
    }

    toggleMedia();
    return ss;
};

var cl = function (a) {
}, BloomiesLookbook = function (a, b) {
    "use strict";

    function getPageHeader () {
        return $('#bcomFashion > header.responsive');
    }

    function isTabletView () {
        return window.innerWidth <= 1024 && window.innerWidth >= 768;
    }

    var $ = jQuery, x, c = {}, d = function () {
        c = {}, c.lookbook = a, c.pages = [], c.lookbook.children(".lookbook-page-wrapper").children(".lookbook-page").each(function (a, b) {
            c.pages[a] = $(b)
        }), c.pagination = [], c.lookbook.find("*[data-for-page-number]").each(function (a, b) {
            c.pagination[a] = $(b)
        }), c.nav = {
            nextBtn: c.lookbook.children(".lookbook-nav-arrow.go-to-next"),
            prevBtn: c.lookbook.children(".lookbook-nav-arrow.go-to-prev")
        }, window.$cache = c
    }, e = function () {
        var a = 0, b = 0;
        return $.each(c.pages, function (c, d) {
            a = d.height() > a ? d.height() : a, b = d.width() > b ? d.width() : b
        }), {height: a, width: b}
    }, f = function (a) {
        return a = -1 === a ? 1 : a, $.each(c.pages, function (a, b) {
            b.removeClass("current-page")
        }), c.lookbook.removeClass("on-start-page on-last-page"), $(c.pages).filter(function () {
            return $(this).data("page-number") === a
        })[0].addClass("current-page"), c.pagination.length > 0 && ($.each(c.pagination, function (a, b) {
            b.removeClass("current-page")
        }), $(c.pagination).filter(function () {
            return $(this).data("for-page-number") === a
        })[0].addClass("current-page")), g().data("page-number") === b.startPage ? c.lookbook.addClass("on-start-page") : g().data("page-number") === c.pages[c.pages.length - 1].data("page-number") && c.lookbook.addClass("on-last-page"), g()
    }, g = function () {
        return $(c.pages).filter(function () {
            return $(this).hasClass("current-page")
        })[0]
    }, h = function (a, d, e) {
        (g().data("page-number") !== e || b.stickyNav === true) && ((e > c.pages.length || e < b.startPage) && (e = "introPage" === a ? b.introPage : "backward" === a ? b.startPage : b.loop !== !1 ? b.startPage : c.pages.length), d(a, e))
    }, i = function (a, b) {
        g(), f(b)
    }, j = function (a, b) {
        var d, h, o = 0,
            $pageHeader = getPageHeader(),
            headerOffset = isTabletView() && $pageHeader && $pageHeader.length > 0 ? $pageHeader.eq(0).height() : 0;
        try {
            d = $(c.pages).filter(function () {
                return $(this).data("page-number") === b
            })[0];
            h = d.children("a.scroll-anchor").filter('[name="' + (x || "") + '"]');
            if (h.length === 1) {
                o = +h.data("scroll-offset") || 0;
                d = h
            }
            $("body, html").animate({scrollTop: d.offset().top + o - headerOffset}, 500)
        } catch (e) {
        } finally {
            f(b)
        }
    }, k = function () {
    }, l = function (a, b) {
        var d = 0;
        $.each(c.pages, function (a, c) {
            $(c).data("page-number") < b && (d += $(c).width())
        }), f(b), c.lookbook.children(".lookbook-page-wrapper").children(".slide-wrapper").css({
            transform: "translateX(-" + d + "px)",
            "-webkit-transform": "translateX(-" + d + "px)"
        })
    }, m = function (a, b) {
        g().data("page-number") <= b ? f(b).addClass("transition-stack-above") : (g().removeClass("transition-stack-above"), f(b))
    };
    return {
        state: {
            cache: c,
            handlersSet: !1,
            introPageDisplayed: !1,
            isActive: !1,
            nameSpace: null,
            optionsSet: !1,
            transition: function (a) {
                l(a)
            },
            transitionDirection: "horizontal",
            transitionStyle: "slide"
        }, activate: function (z) {
            var a = this;
            if (!($("html.lt-ie9").length > 0)) {
                if (null === a.state.nameSpace && (a.state.nameSpace = "lookBook" + Date.now()), $.isEmptyObject(c) && d(), void 0 !== typeof BLOOMIES != !0 && BLOOMIES.isMEW === !0 && (c.lookbook.addClass("in-MEW"), loadCSS(window.location.origin + "/web20/assets/style/specialProjects/lookbook-horizontal/lookbook-horizontal.css")), !a.state.optionsSet) {
                    for (var g in a.setOptions)a.setOptions[g].apply(a);
                    a.state.optionsSet = !0
                }
                if ($(window).width() < b.breakPoint)return void a.kill();
                c.lookbook.addClass("is-active"), c.lookbook.children(".lookbook-page-wrapper").css("height", e().height), $.each(c.pages, function (a, b) {
                    cl("in sctivate"), b.css("width", c.lookbook.width()), b.css("position", "absolute")
                }), a.setEventHandlers(), f(1), z !== true && a.goToPage(b.introPage ? b.introPage : 1), a.state.isActive = !0
            }
        }, kill: function () {
            var b = this;
            a.removeClass("is-active").addClass("is-deactivated").css("height", ""), a.find(".lookbook-page, .slide-wrapper").css({
                width: "",
                left: "",
                opacity: "",
                position: ""
            }), b.state.isActive = !1
        }, setOptions: {
            arrowPosition: function () {
                "vertical" === b.arrowPosition ? c.lookbook.find(".lookbook-nav-arrow").removeClass("layout-horizontal").addClass("layout-vertical") : "horizontal" === b.arrowPosition && c.lookbook.find(".lookbook-nav-arrow").removeClass("layout-vertical").addClass("layout-horizontal")
            }, backToTop: function () {
                b.backToTop === !0
            }, breakPoint: function () {
                var a = this, c = new Date(0), d = !1, e = 100, f = function () {
                    new Date - c < e ? window.setTimeout(f, e) : (d = !1, $(window).width() < b.breakPoint && a.state.isActive ? a.kill() : $(window).width() > b.breakPoint && a.activate())
                };
                "number" == typeof b.breakPoint && $(window).resize(function () {
                    c = new Date, d === !1 && (d = !0, window.setTimeout(f, e))
                })
            }, initialLoop: function () {
                var a, d = this, e = 0;
                c.lookbook.hasClass("is-deactivated") || b.initialLoop !== !1 && (a = setInterval(function () {
                    e < c.pages.length ? (d.goToNext(), e++) : (d.goToPage(1), clearInterval(a), c.lookbook.addClass("qa-auto-initial-loop-ended"))
                }, 1e3))
            }, startPage: function () {
                b.startPage = b.startPage ? b.startPage : 1
            }, stickyNav: (function () {
                b.stickyNav === true && function ($w, $t, _s, _c, _t) {
                    var $e = $t.children(".lookbook-pagination").eq(0), ct = {
                        h: 300,
                        z: 500,
                        d: 20,
                        r: 10,
                        v: 1.5,
                        n: 20,
                        m: 0
                    }, vt = {s0: 0, sf: 0, s: 0, t0: 0, t: 0, rs: null, rt: null}, fn = {
                        eq: function (t, b, c, d) {
                            t /= d;
                            return -c * t * (t - 2) + b
                        }, tt: function () {
                            var dt = _t() - vt.t0;
                            if (dt > vt.t)dt = vt.t;
                            $e.css("top", fn.eq(dt, vt.s0, vt.s, vt.t));
                            if (dt < vt.t) {
                                if (vt.rt)_c(vt.rt);
                                vt.rt = _s(fn.tt, ct.d)
                            }
                        }, so: function () {
                            var s, t = _t();
                            if (vt.rt)_c(vt.rt);
                            ct.m = $t.innerHeight() - $e.outerHeight() - 38;
                            vt.t0 = t;
                            vt.s0 = $e.position().top;
                            vt.sf = $w.scrollTop() - $t.offset().top + ct.n;
                            if (vt.sf < ct.n)vt.sf = ct.n; else if (vt.sf > ct.m)vt.sf = ct.m;
                            vt.s = vt.sf - vt.s0;
                            s = vt.s < 0 ? -vt.s : vt.s;
                            if (s >= ct.r) {
                                vt.t = s / ct.v;
                                if (vt.t < ct.z)vt.t = ct.z;
                                vt.rt = _s(fn.tt, ct.d)
                            }
                        }, sh: function () {
                            var t = _t();
                            if (t - vt.t0 > ct.h) {
                                _s(fn.so, ct.h)
                            } else {
                                if (vt.rs)_c(vt.rs);
                                vt.rs = _s(fn.sh, ct.h)
                            }
                        }
                    };
                    $w.scroll(fn.sh)
                }($(window), c.lookbook, window.setTimeout, window.clearTimeout, Date.now || function () {
                        return (new Date).getTime()
                    })
            }), introPage: function () {
            }, transitionDirection: function () {
                var a = this;
                void 0 !== b.transitionDirection ? (c.lookbook.addClass("transition-direction-" + b.transitionDirection), a.state.transitionDirection = b.transitionDirection) : c.lookbook.addClass("transition-direction-horizontal")
            }, transitionStyle: function () {
                var a = this;
                switch (void 0 !== b.transitionStyle && (a.state.transitionStyle = b.transitionStyle), b.transitionStyle) {
                    case"fade":
                        $.each(c.pages, function (a, b) {
                            $(b).addClass("transition-fade")
                        }), a.state.transition = function (b, c) {
                            $(window).trigger("pageChangeStart." + a.state.nameSpace), h(b, i, c), $(window).trigger("pageChangeEnd." + a.state.nameSpace)
                        };
                        break;
                    case"pageScroll":
                        $.each(c.pages, function (a, b) {
                            $(b).addClass("transition-page-scroll")
                        }), c.lookbook.children(".lookbook-page-wrapper").addClass("page-scroll"), a.state.transition = function (b, c) {
                            $(window).trigger("pageChangeStart." + a.state.nameSpace), h(b, j, c), $(window).trigger("pageChangeEnd." + a.state.nameSpace)
                        };
                        break;
                    case"skip":
                        k();
                        break;
                    case"stack":
                        $.each(c.pages, function (a, b) {
                            $(b).addClass("transition-stack")
                        }), a.state.transition = function (b, c) {
                            $(window).trigger("pageChangeStart." + a.state.nameSpace), h(b, m, c), $(window).trigger("pageChangeEnd." + a.state.nameSpace)
                        };
                        break;
                    default:
                        $.each(c.pages, function (a, b) {
                            cl("in default"), b.css("width", c.lookbook.outerWidth(!0)), b.css("position", "absolute")
                        }), c.lookbook.children(".lookbook-page-wrapper").wrapInner('<div class="slide-wrapper"></div>'), c.lookbook.children(".lookbook-page-wrapper").children(".slide-wrapper").css("width", function () {
                            var a = 0;
                            return $.each(c.pages, function (b, c) {
                                cl($(c)), a += $(c).width()
                            }), 2 * a
                        }), $.each(c.pages, function (a, b) {
                            $(b).addClass("transition-slide")
                        }), a.state.transition = function (b, c) {
                            $(window).trigger("pageChangeStart." + a.state.nameSpace), h(b, l, c), $(window).trigger("pageChangeEnd." + a.state.nameSpace)
                        }
                }
            }
        }, setEventHandlers: function () {
            var a = this, b = !1, d = null;
            a.state.handlersSet !== !0 && (c.nav.nextBtn.on("click", function () {
                a.goToNext()
            }), c.nav.prevBtn.on("click", function () {
                a.goToPrev()
            }), $.each(c.pagination, function (b, c) {
                $(c).on("click", function () {
                    var s = $(this);
                    x = s.data("context");
                    a.goToPage(s.data("for-page-number"))
                })
            }), c.lookbook.on("touchstart", function (a) {/*return b=!0,d={x:a.originalEvent.changedTouches[0].pageX,y:a.originalEvent.changedTouches[0].pageY},!1*/
            }), c.lookbook.on("touchend", function (c) {/*var e=80;b=!1,"horizontal"===a.state.transitionDirection?Math.abs(c.originalEvent.changedTouches[0].pageX-d.x)>e&&(c.originalEvent.changedTouches[0].pageX>d.x?a.goToPrev():a.goToNext()):Math.abs(c.originalEvent.changedTouches[0].pageY-d.y)>e&&(c.originalEvent.changedTouches[0].pageY>d.y?a.goToPrev():a.goToNext())*/
            }), c.lookbook.on("touchmove mousemove", function () {
            }), c.lookbook.find(".back-to-top-button").click(function () {
                $("body, html").animate({scrollTop: 0}, 500)
            }), a.state.handlersSet = !0)
        }, goToNext: function () {
            var a = this;
            a.state.transition("forward", g().data("page-number") + 1)
        }, goToPrev: function () {
            var a = this;
            a.state.transition("backward", g().data("page-number") - 1)
        }, goToPage: function (a) {
            var b = this;
            b.state.transition("forward", a)
        }
    }
};
;
