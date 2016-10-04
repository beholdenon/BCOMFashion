
/*
 * function(){b.stickyNav===!0&&$(window).scroll(function(){var a=$(window).scrollTop(),b=c.lookbook.offset().top,d=c.lookbook.children(".lookbook-pagination");a>b&&a<b+(c.lookbook.height()-$(window).height())?d.addClass("lookbook-sticky"):d.removeClass("lookbook-sticky")})}
 */

(function(){
    b.stickyNav === !0 && $(window).scroll(function() {
        var e = c.lookbook.children(".lookbook-pagination"),
        p = $(window).scrollTop() - c.lookbook.offset().top,
        n = 35,
        m = c.lookbook.height() - e.outerHeight();
        e.css('top', p < n ? n : (p > m ? m : p));
    });
})();

(function(){
    b.stickyNav === true && ((function ($w, $t, _s, _c, _t) {
        var $e = $t.children(".lookbook-pagination").eq(0),
            ct = { h: 300, z: 500, d: 20, r: 10, v: 1.5, n: 20, m: 0 },
            vt = { s0: 0, sf: 0, s: 0, t0: 0, t: 0, rs: null, rt: null },
            fn = {
                eq: function (t, b, c, d) {
                    t /= d;
                    return -c * t * (t - 2) + b;
                },
                tt: function () {
                    var dt = _t() - vt.t0;
                    if (dt > vt.t)
                        dt = vt.t;
                    $e.css('top', fn.eq(dt, vt.s0, vt.s, vt.t));
                    if (dt < vt.t) {
                        if (vt.rt) _c(vt.rt);
                        vt.rt = _s(fn.tt, ct.d);
                    }
                },
                so: function () {
                    var s, t = _t();
                    if (vt.rt) _c(vt.rt);
                    ct.m = $t.innerHeight() - $e.outerHeight();
                    vt.t0 = t;
                    vt.s0 = $e.position().top;
                    vt.sf = $w.scrollTop() - $t.offset().top + ct.n;
                    if (vt.sf < ct.n) vt.sf = ct.n;
                    else if (vt.sf > ct.m) vt.sf = ct.m;
                    vt.s = vt.sf - vt.s0;
                    s = vt.s < 0 ? -vt.s : vt.s;
                    if (s >= ct.r) {
                        vt.t = s / ct.v;
                        if (vt.t < ct.z) vt.t = ct.z;
                        vt.rt = _s(fn.tt, ct.d);
                    }
                },
                sh: function () {
                    var t = _t();
                    if ( t - vt.t0 > ct.h ) {
                        _s(fn.so, ct.h);
                    } else {
                        if (vt.rs) _c(vt.rs);
                        vt.rs = _s(fn.sh, ct.h);
                    }
                }
            };
            $w.scroll(fn.sh);
    })($(window),c.lookbook,window.setTimeout,window.clearTimeout,(Date.now||(function(){return((new Date()).getTime());}))));
})

