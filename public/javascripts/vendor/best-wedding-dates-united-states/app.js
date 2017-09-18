
function bestDayOnReady(e) {
    console.log( "BEST DAY READY" );
    window.removeEventListener("load",bestDayOnReady,!1)
    if ( Distilled.core ) return;
    // window.$ = jQuery || $b;
    if ( window.require !== undefined ) { require(["BestDayCore", "BestDayView"], bestDayInit)}
    else { bestDayInit(); }
}

function bestDayInit() {
    Distilled.core = new Distilled.Core;
    new Distilled.View;
    Distilled.core.loaded()
}

(function () {

  var ua = window.navigator.userAgent
    isIE = ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0;

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;

})();

var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
            var i, n, a, s, o = function() {
                    e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                },
                r = _gsScope._gsDefine.globals,
                l = {},
                d = o.prototype = new e("css");
            d.constructor = o, o.version = "1.19.1", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, d = "px", o.suffixMap = {
                top: d,
                right: d,
                bottom: d,
                left: d,
                width: d,
                height: d,
                fontSize: d,
                padding: d,
                margin: d,
                perspective: d,
                lineHeight: ""
            };
            var u, c, h, p, m, g, f, _, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                w = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                b = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                C = /(?:\d|\-|\+|=|#|\.)*/g,
                T = /opacity *= *([^)]*)/i,
                k = /opacity:([^;]*)/i,
                x = /alpha\(opacity *=.+?\)/i,
                S = /^(rgb|hsl)/,
                A = /([A-Z])/g,
                M = /-([a-z])/gi,
                O = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                D = function(e, t) {
                    return t.toUpperCase()
                },
                P = /(?:Left|Right|Width)/i,
                L = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                I = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                N = /,(?=[^\)]*(?:\(|$))/gi,
                E = /[\s,\(]/i,
                F = Math.PI / 180,
                R = 180 / Math.PI,
                H = {},
                B = {
                    style: {}
                },
                W = _gsScope.document || {
                    createElement: function() {
                        return B
                    }
                },
                z = function(e, t) {
                    return W.createElementNS ? W.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : W.createElement(e)
                },
                j = z("div"),
                X = z("img"),
                Y = o._internals = {
                    _specialProps: l
                },
                U = (_gsScope.navigator || {}).userAgent || "",
                V = function() {
                    var e = U.indexOf("Android"),
                        t = z("a");
                    return h = -1 !== U.indexOf("Safari") && -1 === U.indexOf("Chrome") && (-1 === e || parseFloat(U.substr(e + 8, 2)) > 3), m = h && parseFloat(U.substr(U.indexOf("Version/") + 8, 2)) < 6, p = -1 !== U.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(U) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(U)) && (g = parseFloat(RegExp.$1)), !!t && (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity))
                }(),
                G = function(e) {
                    return T.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                q = function(e) {
                    _gsScope.console && console.log(e)
                },
                K = "",
                J = "",
                Z = function(e, t) {
                    t = t || j;
                    var i, n, a = t.style;
                    if (void 0 !== a[e]) return e;
                    for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === a[i[n] + e];);
                    return n >= 0 ? (J = 3 === n ? "ms" : i[n], K = "-" + J.toLowerCase() + "-", J + e) : null
                },
                $ = W.defaultView ? W.defaultView.getComputedStyle : function() {},
                Q = o.getStyle = function(e, t, i, n, a) {
                    var s;
                    return V || "opacity" !== t ? (!n && e.style[t] ? s = e.style[t] : (i = i || $(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(A, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == a || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : a) : G(e)
                },
                ee = Y.convertToPixels = function(e, i, n, a, s) {
                    if ("px" === a || !a) return n;
                    if ("auto" === a || !n) return 0;
                    var r, l, d, u = P.test(i),
                        c = e,
                        h = j.style,
                        p = 0 > n,
                        m = 1 === n;
                    if (p && (n = -n), m && (n *= 100), "%" === a && -1 !== i.indexOf("border")) r = n / 100 * (u ? e.clientWidth : e.clientHeight);
                    else {
                        if (h.cssText = "border:0 solid red;position:" + Q(e, "position") + ";line-height:0;", "%" !== a && c.appendChild && "v" !== a.charAt(0) && "rem" !== a) h[u ? "borderLeftWidth" : "borderTopWidth"] = n + a;
                        else {
                            if (c = e.parentNode || W.body, l = c._gsCache, d = t.ticker.frame, l && u && l.time === d) return l.width * n / 100;
                            h[u ? "width" : "height"] = n + a
                        }
                        c.appendChild(j), r = parseFloat(j[u ? "offsetWidth" : "offsetHeight"]), c.removeChild(j), u && "%" === a && o.cacheWidths !== !1 && (l = c._gsCache = c._gsCache || {}, l.time = d, l.width = r / n * 100), 0 !== r || s || (r = ee(e, i, n, a, !0))
                    }
                    return m && (r /= 100), p ? -r : r
                },
                te = Y.calculateOffset = function(e, t, i) {
                    if ("absolute" !== Q(e, "position", i)) return 0;
                    var n = "left" === t ? "Left" : "Top",
                        a = Q(e, "margin" + n, i);
                    return e["offset" + n] - (ee(e, t, parseFloat(a), a.replace(C, "")) || 0)
                },
                ie = function(e, t) {
                    var i, n, a, s = {};
                    if (t = t || $(e, null))
                        if (i = t.length)
                            for (; --i > -1;) a = t[i], (-1 === a.indexOf("-transform") || Oe === a) && (s[a.replace(M, D)] = t.getPropertyValue(a));
                        else
                            for (i in t)(-1 === i.indexOf("Transform") || Me === i) && (s[i] = t[i]);
                    else if (t = e.currentStyle || e.style)
                        for (i in t) "string" == typeof i && void 0 === s[i] && (s[i.replace(M, D)] = t[i]);
                    return V || (s.opacity = G(e)), n = je(e, t, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Pe && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                },
                ne = function(e, t, i, n, a) {
                    var s, o, r, l = {},
                        d = e.style;
                    for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = i[o]) || a && a[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(b, "") ? s : 0 : te(e, o), void 0 !== d[o] && (r = new ve(d, o, d[o], r)));
                    if (n)
                        for (o in n) "className" !== o && (l[o] = n[o]);
                    return {
                        difs: l,
                        firstMPT: r
                    }
                },
                ae = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                se = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                oe = function(e, t, i) {
                    if ("svg" === (e.nodeName + "").toLowerCase()) return (i || $(e))[t] || 0;
                    if (e.getCTM && Be(e)) return e.getBBox()[t] || 0;
                    var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                        a = ae[t],
                        s = a.length;
                    for (i = i || $(e, null); --s > -1;) n -= parseFloat(Q(e, "padding" + a[s], i, !0)) || 0, n -= parseFloat(Q(e, "border" + a[s] + "Width", i, !0)) || 0;
                    return n
                },
                re = function(e, t) {
                    if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
                    (null == e || "" === e) && (e = "0 0");
                    var i, n = e.split(" "),
                        a = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
                        s = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
                    if (n.length > 3 && !t) {
                        for (n = e.split(", ").join(",").split(","), e = [], i = 0; i < n.length; i++) e.push(re(n[i]));
                        return e.join(",")
                    }
                    return null == s ? s = "center" === a ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === a || isNaN(parseFloat(a)) && -1 === (a + "").indexOf("=")) && (a = "50%"), e = a + " " + s + (n.length > 2 ? " " + n[2] : ""), t && (t.oxp = -1 !== a.indexOf("%"), t.oyp = -1 !== s.indexOf("%"), t.oxr = "=" === a.charAt(1), t.oyr = "=" === s.charAt(1), t.ox = parseFloat(a.replace(b, "")), t.oy = parseFloat(s.replace(b, "")), t.v = e), t || e
                },
                le = function(e, t) {
                    return "function" == typeof e && (e = e(_, f)), "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
                },
                de = function(e, t) {
                    return "function" == typeof e && (e = e(_, f)), null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e) || 0
                },
                ue = function(e, t, i, n) {
                    var a, s, o, r, l, d = 1e-6;
                    return "function" == typeof e && (e = e(_, f)), null == e ? r = t : "number" == typeof e ? r = e : (a = 360, s = e.split("_"), l = "=" === e.charAt(1), o = (l ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === e.indexOf("rad") ? 1 : R) - (l ? 0 : t), s.length && (n && (n[i] = t + o), -1 !== e.indexOf("short") && (o %= a, o !== o % (a / 2) && (o = 0 > o ? o + a : o - a)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * a) % a - (o / a | 0) * a : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * a) % a - (o / a | 0) * a)), r = t + o), d > r && r > -d && (r = 0), r
                },
                ce = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                he = function(e, t, i) {
                    return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 255 * (1 > 6 * e ? t + (i - t) * e * 6 : .5 > e ? i : 2 > 3 * e ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
                },
                pe = o.parseColor = function(e, t) {
                    var i, n, a, s, o, r, l, d, u, c, h;
                    if (e)
                        if ("number" == typeof e) i = [e >> 16, e >> 8 & 255, 255 & e];
                        else {
                            if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), ce[e]) i = ce[e];
                            else if ("#" === e.charAt(0)) 4 === e.length && (n = e.charAt(1), a = e.charAt(2), s = e.charAt(3), e = "#" + n + n + a + a + s + s), e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & 255, 255 & e];
                            else if ("hsl" === e.substr(0, 3))
                                if (i = h = e.match(v), t) {
                                    if (-1 !== e.indexOf("=")) return e.match(y)
                                } else o = Number(i[0]) % 360 / 360, r = Number(i[1]) / 100, l = Number(i[2]) / 100, a = .5 >= l ? l * (r + 1) : l + r - l * r, n = 2 * l - a, i.length > 3 && (i[3] = Number(e[3])), i[0] = he(o + 1 / 3, n, a), i[1] = he(o, n, a), i[2] = he(o - 1 / 3, n, a);
                            else i = e.match(v) || ce.transparent;
                            i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                        } else i = ce.black;
                    return t && !h && (n = i[0] / 255, a = i[1] / 255, s = i[2] / 255, d = Math.max(n, a, s), u = Math.min(n, a, s), l = (d + u) / 2, d === u ? o = r = 0 : (c = d - u, r = l > .5 ? c / (2 - d - u) : c / (d + u), o = d === n ? (a - s) / c + (s > a ? 6 : 0) : d === a ? (s - n) / c + 2 : (n - a) / c + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * r + .5 | 0, i[2] = 100 * l + .5 | 0), i
                },
                me = function(e, t) {
                    var i, n, a, s = e.match(ge) || [],
                        o = 0,
                        r = s.length ? "" : e;
                    for (i = 0; i < s.length; i++) n = s[i], a = e.substr(o, e.indexOf(n, o) - o), o += a.length + n.length, n = pe(n, t), 3 === n.length && n.push(1), r += a + (t ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                    return r + e.substr(o)
                },
                ge = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (d in ce) ge += "|" + d + "\\b";
            ge = new RegExp(ge + ")", "gi"), o.colorStringFilter = function(e) {
                var t, i = e[0] + e[1];
                ge.test(i) && (t = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), e[0] = me(e[0], t), e[1] = me(e[1], t)), ge.lastIndex = 0
            }, t.defaultStringFilter || (t.defaultStringFilter = o.colorStringFilter);
            var fe = function(e, t, i, n) {
                    if (null == e) return function(e) {
                        return e
                    };
                    var a, s = t ? (e.match(ge) || [""])[0] : "",
                        o = e.split(s).join("").match(w) || [],
                        r = e.substr(0, e.indexOf(o[0])),
                        l = ")" === e.charAt(e.length - 1) ? ")" : "",
                        d = -1 !== e.indexOf(" ") ? " " : ",",
                        u = o.length,
                        c = u > 0 ? o[0].replace(v, "") : "";
                    return u ? a = t ? function(e) {
                        var t, h, p, m;
                        if ("number" == typeof e) e += c;
                        else if (n && N.test(e)) {
                            for (m = e.replace(N, "|").split("|"), p = 0; p < m.length; p++) m[p] = a(m[p]);
                            return m.join(",")
                        }
                        if (t = (e.match(ge) || [s])[0], h = e.split(t).join("").match(w) || [], p = h.length, u > p--)
                            for (; ++p < u;) h[p] = i ? h[(p - 1) / 2 | 0] : o[p];
                        return r + h.join(d) + d + t + l + (-1 !== e.indexOf("inset") ? " inset" : "")
                    } : function(e) {
                        var t, s, h;
                        if ("number" == typeof e) e += c;
                        else if (n && N.test(e)) {
                            for (s = e.replace(N, "|").split("|"), h = 0; h < s.length; h++) s[h] = a(s[h]);
                            return s.join(",")
                        }
                        if (t = e.match(w) || [], h = t.length, u > h--)
                            for (; ++h < u;) t[h] = i ? t[(h - 1) / 2 | 0] : o[h];
                        return r + t.join(d) + l
                    } : function(e) {
                        return e
                    }
                },
                _e = function(e) {
                    return e = e.split(","),
                        function(t, i, n, a, s, o, r) {
                            var l, d = (i + "").split(" ");
                            for (r = {}, l = 0; 4 > l; l++) r[e[l]] = d[l] = d[l] || d[(l - 1) / 2 >> 0];
                            return a.parse(t, r, s, o)
                        }
                },
                ve = (Y._setPluginRatio = function(e) {
                    this.plugin.setRatio(e);
                    for (var t, i, n, a, s, o = this.data, r = o.proxy, l = o.firstMPT, d = 1e-6; l;) t = r[l.v], l.r ? t = Math.round(t) : d > t && t > -d && (t = 0), l.t[l.p] = t, l = l._next;
                    if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(r.rotation, this.t) : r.rotation), 1 === e || 0 === e)
                        for (l = o.firstMPT, s = 1 === e ? "e" : "b"; l;) {
                            if (i = l.t, i.type) {
                                if (1 === i.type) {
                                    for (a = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) a += i["xn" + n] + i["xs" + (n + 1)];
                                    i[s] = a
                                }
                            } else i[s] = i.s + i.xs0;
                            l = l._next
                        }
                }, function(e, t, i, n, a) {
                    this.t = e, this.p = t, this.v = i, this.r = a, n && (n._prev = this, this._next = n)
                }),
                ye = (Y._parseToProxy = function(e, t, i, n, a, s) {
                    var o, r, l, d, u, c = n,
                        h = {},
                        p = {},
                        m = i._transform,
                        g = H;
                    for (i._transform = null, H = t, n = u = i.parse(e, t, n, a), H = g, s && (i._transform = m, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
                        if (n.type <= 1 && (r = n.p, p[r] = n.s + n.c, h[r] = n.s, s || (d = new ve(n, "s", r, d, n.r), n.c = 0), 1 === n.type))
                            for (o = n.l; --o > 0;) l = "xn" + o, r = n.p + "_" + l, p[r] = n.data[l], h[r] = n[l], s || (d = new ve(n, l, r, d, n.rxp[l]));
                        n = n._next
                    }
                    return {
                        proxy: h,
                        end: p,
                        firstMPT: d,
                        pt: u
                    }
                }, Y.CSSPropTween = function(e, t, n, a, o, r, l, d, u, c, h) {
                    this.t = e, this.p = t, this.s = n, this.c = a, this.n = l || t, e instanceof ye || s.push(this.n), this.r = d, this.type = r || 0, u && (this.pr = u, i = !0), this.b = void 0 === c ? n : c, this.e = void 0 === h ? n + a : h, o && (this._next = o, o._prev = this)
                }),
                we = function(e, t, i, n, a, s) {
                    var o = new ye(e, t, i, n - i, a, -1, s);
                    return o.b = i, o.e = o.xs0 = n, o
                },
                be = o.parseComplex = function(e, t, i, n, a, s, r, l, d, c) {
                    i = i || s || "", "function" == typeof n && (n = n(_, f)), r = new ye(e, t, 0, 0, r, c ? 2 : 1, null, !1, l, i, n), n += "", a && ge.test(n + i) && (n = [i, n], o.colorStringFilter(n), i = n[0], n = n[1]);
                    var h, p, m, g, w, b, C, T, k, x, S, A, M, O = i.split(", ").join(",").split(" "),
                        D = n.split(", ").join(",").split(" "),
                        P = O.length,
                        L = u !== !1;
                    for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (O = O.join(" ").replace(N, ", ").split(" "), D = D.join(" ").replace(N, ", ").split(" "), P = O.length), P !== D.length && (O = (s || "").split(" "), P = O.length), r.plugin = d, r.setRatio = c, ge.lastIndex = 0, h = 0; P > h; h++)
                        if (g = O[h], w = D[h], T = parseFloat(g), T || 0 === T) r.appendXtra("", T, le(w, T), w.replace(y, ""), L && -1 !== w.indexOf("px"), !0);
                        else if (a && ge.test(g)) A = w.indexOf(")") + 1, A = ")" + (A ? w.substr(A) : ""), M = -1 !== w.indexOf("hsl") && V, g = pe(g, M), w = pe(w, M), k = g.length + w.length > 6, k && !V && 0 === w[3] ? (r["xs" + r.l] += r.l ? " transparent" : "transparent", r.e = r.e.split(D[h]).join("transparent")) : (V || (k = !1), M ? r.appendXtra(k ? "hsla(" : "hsl(", g[0], le(w[0], g[0]), ",", !1, !0).appendXtra("", g[1], le(w[1], g[1]), "%,", !1).appendXtra("", g[2], le(w[2], g[2]), k ? "%," : "%" + A, !1) : r.appendXtra(k ? "rgba(" : "rgb(", g[0], w[0] - g[0], ",", !0, !0).appendXtra("", g[1], w[1] - g[1], ",", !0).appendXtra("", g[2], w[2] - g[2], k ? "," : A, !0), k && (g = g.length < 4 ? 1 : g[3], r.appendXtra("", g, (w.length < 4 ? 1 : w[3]) - g, A, !1))), ge.lastIndex = 0;
                    else if (b = g.match(v)) {
                        if (C = w.match(y), !C || C.length !== b.length) return r;
                        for (m = 0, p = 0; p < b.length; p++) S = b[p], x = g.indexOf(S, m), r.appendXtra(g.substr(m, x - m), Number(S), le(C[p], S), "", L && "px" === g.substr(x + S.length, 2), 0 === p), m = x + S.length;
                        r["xs" + r.l] += g.substr(m)
                    } else r["xs" + r.l] += r.l || r["xs" + r.l] ? " " + w : w;
                    if (-1 !== n.indexOf("=") && r.data) {
                        for (A = r.xs0 + r.data.s, h = 1; h < r.l; h++) A += r["xs" + h] + r.data["xn" + h];
                        r.e = A + r["xs" + h]
                    }
                    return r.l || (r.type = -1, r.xs0 = r.e), r.xfirst || r
                },
                Ce = 9;
            for (d = ye.prototype, d.l = d.pr = 0; --Ce > 0;) d["xn" + Ce] = 0, d["xs" + Ce] = "";
            d.xs0 = "", d._next = d._prev = d.xfirst = d.data = d.plugin = d.setRatio = d.rxp = null, d.appendXtra = function(e, t, i, n, a, s) {
                var o = this,
                    r = o.l;
                return o["xs" + r] += s && (r || o["xs" + r]) ? " " + e : e || "", i || 0 === r || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", r > 0 ? (o.data["xn" + r] = t + i, o.rxp["xn" + r] = a, o["xn" + r] = t, o.plugin || (o.xfirst = new ye(o, "xn" + r, t, i, o.xfirst || o, 0, o.n, a, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                    s: t + i
                }, o.rxp = {}, o.s = t, o.c = i, o.r = a, o)) : (o["xs" + r] += t + (n || ""), o)
            };
            var Te = function(e, t) {
                    t = t || {}, this.p = t.prefix ? Z(e) || e : e, l[e] = l[this.p] = this, this.format = t.formatter || fe(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
                },
                ke = Y._registerComplexSpecialProp = function(e, t, i) {
                    "object" != typeof t && (t = {
                        parser: i
                    });
                    var n, a, s = e.split(","),
                        o = t.defaultValue;
                    for (i = i || [o], n = 0; n < s.length; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || o, a = new Te(s[n], t)
                },
                xe = Y._registerPluginProp = function(e) {
                    if (!l[e]) {
                        var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                        ke(e, {
                            parser: function(e, i, n, a, s, o, d) {
                                var u = r.com.greensock.plugins[t];
                                return u ? (u._cssRegister(), l[n].parse(e, i, n, a, s, o, d)) : (q("Error: " + t + " js file not loaded."), s)
                            }
                        })
                    }
                };
            d = Te.prototype, d.parseComplex = function(e, t, i, n, a, s) {
                var o, r, l, d, u, c, h = this.keyword;
                if (this.multi && (N.test(i) || N.test(t) ? (r = t.replace(N, "|").split("|"), l = i.replace(N, "|").split("|")) : h && (r = [t], l = [i])), l) {
                    for (d = l.length > r.length ? l.length : r.length, o = 0; d > o; o++) t = r[o] = r[o] || this.dflt, i = l[o] = l[o] || this.dflt, h && (u = t.indexOf(h), c = i.indexOf(h), u !== c && (-1 === c ? r[o] = r[o].split(h).join("") : -1 === u && (r[o] += " " + h)));
                    t = r.join(", "), i = l.join(", ")
                }
                return be(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, a, s)
            }, d.parse = function(e, t, i, n, s, o, r) {
                return this.parseComplex(e.style, this.format(Q(e, this.p, a, !1, this.dflt)), this.format(t), s, o)
            }, o.registerSpecialProp = function(e, t, i) {
                ke(e, {
                    parser: function(e, n, a, s, o, r, l) {
                        var d = new ye(e, a, 0, 0, o, 2, a, !1, i);
                        return d.plugin = r, d.setRatio = t(e, n, s._tween, a), d
                    },
                    priority: i
                })
            }, o.useSVGTransformAttr = !0;
            var Se, Ae = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                Me = Z("transform"),
                Oe = K + "transform",
                De = Z("transformOrigin"),
                Pe = null !== Z("perspective"),
                Le = Y.Transform = function() {
                    this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(o.defaultForce3D === !1 || !Pe) && (o.defaultForce3D || "auto")
                },
                Ie = _gsScope.SVGElement,
                Ne = function(e, t, i) {
                    var n, a = W.createElementNS("http://www.w3.org/2000/svg", e),
                        s = /([a-z])([A-Z])/g;
                    for (n in i) a.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                    return t.appendChild(a), a
                },
                Ee = W.documentElement || {},
                Fe = function() {
                    var e, t, i, n = g || /Android/i.test(U) && !_gsScope.chrome;
                    return W.createElementNS && !n && (e = Ne("svg", Ee), t = Ne("rect", e, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), i = t.getBoundingClientRect().width, t.style[De] = "50% 50%", t.style[Me] = "scaleX(0.5)", n = i === t.getBoundingClientRect().width && !(p && Pe), Ee.removeChild(e)), n
                }(),
                Re = function(e, t, i, n, a, s) {
                    var r, l, d, u, c, h, p, m, g, f, _, v, y, w, b = e._gsTransform,
                        C = ze(e, !0);
                    b && (y = b.xOrigin, w = b.yOrigin), (!n || (r = n.split(" ")).length < 2) && (p = e.getBBox(), 0 === p.x && 0 === p.y && p.width + p.height === 0 && (p = {
                        x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                        y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                        width: 0,
                        height: 0
                    }), t = re(t).split(" "), r = [(-1 !== t[0].indexOf("%") ? parseFloat(t[0]) / 100 * p.width : parseFloat(t[0])) + p.x, (-1 !== t[1].indexOf("%") ? parseFloat(t[1]) / 100 * p.height : parseFloat(t[1])) + p.y]), i.xOrigin = u = parseFloat(r[0]), i.yOrigin = c = parseFloat(r[1]), n && C !== We && (h = C[0], p = C[1], m = C[2], g = C[3], f = C[4], _ = C[5], v = h * g - p * m, v && (l = u * (g / v) + c * (-m / v) + (m * _ - g * f) / v, d = u * (-p / v) + c * (h / v) - (h * _ - p * f) / v, u = i.xOrigin = r[0] = l, c = i.yOrigin = r[1] = d)), b && (s && (i.xOffset = b.xOffset, i.yOffset = b.yOffset, b = i), a || a !== !1 && o.defaultSmoothOrigin !== !1 ? (l = u - y, d = c - w, b.xOffset += l * C[0] + d * C[2] - l, b.yOffset += l * C[1] + d * C[3] - d) : b.xOffset = b.yOffset = 0), s || e.setAttribute("data-svg-origin", r.join(" "))
                },
                $e = function(e) {
                    var t, i = z("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                        n = this.parentNode,
                        a = this.nextSibling,
                        s = this.style.cssText;
                    if (Ee.appendChild(i), i.appendChild(this), this.style.display = "block", e) try {
                        t = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = $e
                    } catch (e) {} else this._originalGetBBox && (t = this._originalGetBBox());
                    return a ? n.insertBefore(this, a) : n.appendChild(this), Ee.removeChild(i), this.style.cssText = s, t
                },
                He = function(e) {
                    try {
                        return e.getBBox()
                    } catch (t) {
                        return $e.call(e, !0)
                    }
                },
                Be = function(e) {
                    return !(!(Ie && e.getCTM && He(e)) || e.parentNode && !e.ownerSVGElement)
                },
                We = [1, 0, 0, 1, 0, 0],
                ze = function(e, t) {
                    var i, n, a, s, o, r, l = e._gsTransform || new Le,
                        d = 1e5,
                        u = e.style;
                    if (Me ? n = Q(e, Oe, null, !0) : e.currentStyle && (n = e.currentStyle.filter.match(L), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, i && Me && ((r = "none" === $(e).display) || !e.parentNode) && (r && (s = u.display, u.display = "block"), e.parentNode || (o = 1, Ee.appendChild(e)), n = Q(e, Oe, null, !0), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? u.display = s : r && Ve(u, "display"), o && Ee.removeChild(e)), (l.svg || e.getCTM && Be(e)) && (i && -1 !== (u[Me] + "").indexOf("matrix") && (n = u[Me], i = 0), a = e.getAttribute("transform"), i && a && (-1 !== a.indexOf("matrix") ? (n = a, i = 0) : -1 !== a.indexOf("translate") && (n = "matrix(1,0,0,1," + a.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return We;
                    for (a = (n || "").match(v) || [], Ce = a.length; --Ce > -1;) s = Number(a[Ce]), a[Ce] = (o = s - (s |= 0)) ? (o * d + (0 > o ? -.5 : .5) | 0) / d + s : s;
                    return t && a.length > 6 ? [a[0], a[1], a[4], a[5], a[12], a[13]] : a
                },
                je = Y.getTransform = function(e, i, n, a) {
                    if (e._gsTransform && n && !a) return e._gsTransform;
                    var s, r, l, d, u, c, h = n ? e._gsTransform || new Le : new Le,
                        p = h.scaleX < 0,
                        m = 2e-5,
                        g = 1e5,
                        f = Pe ? parseFloat(Q(e, De, i, !1, "0 0 0").split(" ")[2]) || h.zOrigin || 0 : 0,
                        _ = parseFloat(o.defaultTransformPerspective) || 0;
                    if (h.svg = !(!e.getCTM || !Be(e)), h.svg && (Re(e, Q(e, De, i, !1, "50% 50%") + "", h, e.getAttribute("data-svg-origin")), Se = o.useSVGTransformAttr || Fe), s = ze(e), s !== We) {
                        if (16 === s.length) {
                            var v, y, w, b, C, T = s[0],
                                k = s[1],
                                x = s[2],
                                S = s[3],
                                A = s[4],
                                M = s[5],
                                O = s[6],
                                D = s[7],
                                P = s[8],
                                L = s[9],
                                I = s[10],
                                N = s[12],
                                E = s[13],
                                F = s[14],
                                H = s[11],
                                B = Math.atan2(O, I);
                            h.zOrigin && (F = -h.zOrigin, N = P * F - s[12], E = L * F - s[13], F = I * F + h.zOrigin - s[14]), h.rotationX = B * R, B && (b = Math.cos(-B), C = Math.sin(-B), v = A * b + P * C, y = M * b + L * C, w = O * b + I * C, P = A * -C + P * b, L = M * -C + L * b, I = O * -C + I * b, H = D * -C + H * b, A = v, M = y, O = w), B = Math.atan2(-x, I), h.rotationY = B * R, B && (b = Math.cos(-B), C = Math.sin(-B), v = T * b - P * C, y = k * b - L * C, w = x * b - I * C, L = k * C + L * b, I = x * C + I * b, H = S * C + H * b, T = v, k = y, x = w), B = Math.atan2(k, T), h.rotation = B * R, B && (b = Math.cos(-B), C = Math.sin(-B), T = T * b + A * C, y = k * b + M * C, M = k * -C + M * b, O = x * -C + O * b, k = y), h.rotationX && Math.abs(h.rotationX) + Math.abs(h.rotation) > 359.9 && (h.rotationX = h.rotation = 0, h.rotationY = 180 - h.rotationY), h.scaleX = (Math.sqrt(T * T + k * k) * g + .5 | 0) / g, h.scaleY = (Math.sqrt(M * M + L * L) * g + .5 | 0) / g, h.scaleZ = (Math.sqrt(O * O + I * I) * g + .5 | 0) / g, h.rotationX || h.rotationY ? h.skewX = 0 : (h.skewX = A || M ? Math.atan2(A, M) * R + h.rotation : h.skewX || 0, Math.abs(h.skewX) > 90 && Math.abs(h.skewX) < 270 && (p ? (h.scaleX *= -1, h.skewX += h.rotation <= 0 ? 180 : -180, h.rotation += h.rotation <= 0 ? 180 : -180) : (h.scaleY *= -1, h.skewX += h.skewX <= 0 ? 180 : -180))), h.perspective = H ? 1 / (0 > H ? -H : H) : 0, h.x = N, h.y = E, h.z = F, h.svg && (h.x -= h.xOrigin - (h.xOrigin * T - h.yOrigin * A), h.y -= h.yOrigin - (h.yOrigin * k - h.xOrigin * M))
                        } else if (!Pe || a || !s.length || h.x !== s[4] || h.y !== s[5] || !h.rotationX && !h.rotationY) {
                            var W = s.length >= 6,
                                z = W ? s[0] : 1,
                                j = s[1] || 0,
                                X = s[2] || 0,
                                Y = W ? s[3] : 1;
                            h.x = s[4] || 0, h.y = s[5] || 0, l = Math.sqrt(z * z + j * j), d = Math.sqrt(Y * Y + X * X), u = z || j ? Math.atan2(j, z) * R : h.rotation || 0, c = X || Y ? Math.atan2(X, Y) * R + u : h.skewX || 0, Math.abs(c) > 90 && Math.abs(c) < 270 && (p ? (l *= -1, c += 0 >= u ? 180 : -180, u += 0 >= u ? 180 : -180) : (d *= -1, c += 0 >= c ? 180 : -180)), h.scaleX = l, h.scaleY = d, h.rotation = u, h.skewX = c, Pe && (h.rotationX = h.rotationY = h.z = 0, h.perspective = _, h.scaleZ = 1), h.svg && (h.x -= h.xOrigin - (h.xOrigin * z + h.yOrigin * X), h.y -= h.yOrigin - (h.xOrigin * j + h.yOrigin * Y))
                        }
                        h.zOrigin = f;
                        for (r in h) h[r] < m && h[r] > -m && (h[r] = 0)
                    }
                    return n && (e._gsTransform = h, h.svg && (Se && e.style[Me] ? t.delayedCall(.001, function() {
                        Ve(e.style, Me)
                    }) : !Se && e.getAttribute("transform") && t.delayedCall(.001, function() {
                        e.removeAttribute("transform")
                    }))), h
                },
                Xe = function(e) {
                    var t, i, n = this.data,
                        a = -n.rotation * F,
                        s = a + n.skewX * F,
                        o = 1e5,
                        r = (Math.cos(a) * n.scaleX * o | 0) / o,
                        l = (Math.sin(a) * n.scaleX * o | 0) / o,
                        d = (Math.sin(s) * -n.scaleY * o | 0) / o,
                        u = (Math.cos(s) * n.scaleY * o | 0) / o,
                        c = this.t.style,
                        h = this.t.currentStyle;
                    if (h) {
                        i = l, l = -d, d = -i, t = h.filter, c.filter = "";
                        var p, m, f = this.t.offsetWidth,
                            _ = this.t.offsetHeight,
                            v = "absolute" !== h.position,
                            y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + r + ", M12=" + l + ", M21=" + d + ", M22=" + u,
                            w = n.x + f * n.xPercent / 100,
                            b = n.y + _ * n.yPercent / 100;
                        if (null != n.ox && (p = (n.oxp ? f * n.ox * .01 : n.ox) - f / 2, m = (n.oyp ? _ * n.oy * .01 : n.oy) - _ / 2, w += p - (p * r + m * l), b += m - (p * d + m * u)), v ? (p = f / 2, m = _ / 2, y += ", Dx=" + (p - (p * r + m * l) + w) + ", Dy=" + (m - (p * d + m * u) + b) + ")") : y += ", sizingMethod='auto expand')", -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = t.replace(I, y) : c.filter = y + " " + t, (0 === e || 1 === e) && 1 === r && 0 === l && 0 === d && 1 === u && (v && -1 === y.indexOf("Dx=0, Dy=0") || T.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !v) {
                            var k, x, S, A = 8 > g ? 1 : -1;
                            for (p = n.ieOffsetX || 0, m = n.ieOffsetY || 0, n.ieOffsetX = Math.round((f - ((0 > r ? -r : r) * f + (0 > l ? -l : l) * _)) / 2 + w), n.ieOffsetY = Math.round((_ - ((0 > u ? -u : u) * _ + (0 > d ? -d : d) * f)) / 2 + b), Ce = 0; 4 > Ce; Ce++) x = se[Ce], k = h[x], i = -1 !== k.indexOf("px") ? parseFloat(k) : ee(this.t, x, parseFloat(k), k.replace(C, "")) || 0, S = i !== n[x] ? 2 > Ce ? -n.ieOffsetX : -n.ieOffsetY : 2 > Ce ? p - n.ieOffsetX : m - n.ieOffsetY, c[x] = (n[x] = Math.round(i - S * (0 === Ce || 2 === Ce ? 1 : A))) + "px"
                        }
                    }
                },
                Ye = Y.set3DTransformRatio = Y.setTransformRatio = function(e) {
                    var t, i, n, a, s, o, r, l, d, u, c, h, m, g, f, _, v, y, w, b, C, T, k, x = this.data,
                        S = this.t.style,
                        A = x.rotation,
                        M = x.rotationX,
                        O = x.rotationY,
                        D = x.scaleX,
                        P = x.scaleY,
                        L = x.scaleZ,
                        I = x.x,
                        N = x.y,
                        E = x.z,
                        R = x.svg,
                        H = x.perspective,
                        B = x.force3D,
                        W = x.skewY,
                        z = x.skewX;
                    if (W && (z += W, A += W), ((1 === e || 0 === e) && "auto" === B && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !B) && !E && !H && !O && !M && 1 === L || Se && R || !Pe) return void(A || z || R ? (A *= F, T = z * F, k = 1e5, i = Math.cos(A) * D, s = Math.sin(A) * D, n = Math.sin(A - T) * -P, o = Math.cos(A - T) * P, T && "simple" === x.skewType && (t = Math.tan(T - W * F), t = Math.sqrt(1 + t * t), n *= t, o *= t, W && (t = Math.tan(W * F), t = Math.sqrt(1 + t * t), i *= t, s *= t)), R && (I += x.xOrigin - (x.xOrigin * i + x.yOrigin * n) + x.xOffset, N += x.yOrigin - (x.xOrigin * s + x.yOrigin * o) + x.yOffset, Se && (x.xPercent || x.yPercent) && (f = this.t.getBBox(), I += .01 * x.xPercent * f.width, N += .01 * x.yPercent * f.height), f = 1e-6, f > I && I > -f && (I = 0), f > N && N > -f && (N = 0)), w = (i * k | 0) / k + "," + (s * k | 0) / k + "," + (n * k | 0) / k + "," + (o * k | 0) / k + "," + I + "," + N + ")", R && Se ? this.t.setAttribute("transform", "matrix(" + w) : S[Me] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix(" : "matrix(") + w) : S[Me] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix(" : "matrix(") + D + ",0,0," + P + "," + I + "," + N + ")");
                    if (p && (f = 1e-4, f > D && D > -f && (D = L = 2e-5), f > P && P > -f && (P = L = 2e-5), !H || x.z || x.rotationX || x.rotationY || (H = 0)), A || z) A *= F, _ = i = Math.cos(A), v = s = Math.sin(A), z && (A -= z * F, _ = Math.cos(A), v = Math.sin(A), "simple" === x.skewType && (t = Math.tan((z - W) * F), t = Math.sqrt(1 + t * t), _ *= t, v *= t, x.skewY && (t = Math.tan(W * F), t = Math.sqrt(1 + t * t), i *= t, s *= t))), n = -v, o = _;
                    else {
                        if (!(O || M || 1 !== L || H || R)) return void(S[Me] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) translate3d(" : "translate3d(") + I + "px," + N + "px," + E + "px)" + (1 !== D || 1 !== P ? " scale(" + D + "," + P + ")" : ""));
                        i = o = 1, n = s = 0
                    }
                    u = 1, a = r = l = d = c = h = 0, m = H ? -1 / H : 0, g = x.zOrigin, f = 1e-6, b = ",", C = "0", A = O * F, A && (_ = Math.cos(A), v = Math.sin(A), l = -v, c = m * -v, a = i * v, r = s * v, u = _, m *= _, i *= _, s *= _), A = M * F, A && (_ = Math.cos(A), v = Math.sin(A), t = n * _ + a * v, y = o * _ + r * v, d = u * v, h = m * v, a = n * -v + a * _, r = o * -v + r * _, u *= _, m *= _, n = t, o = y), 1 !== L && (a *= L, r *= L, u *= L, m *= L), 1 !== P && (n *= P, o *= P, d *= P, h *= P), 1 !== D && (i *= D, s *= D, l *= D, c *= D), (g || R) && (g && (I += a * -g, N += r * -g, E += u * -g + g), R && (I += x.xOrigin - (x.xOrigin * i + x.yOrigin * n) + x.xOffset, N += x.yOrigin - (x.xOrigin * s + x.yOrigin * o) + x.yOffset), f > I && I > -f && (I = C), f > N && N > -f && (N = C), f > E && E > -f && (E = 0)), w = x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix3d(" : "matrix3d(", w += (f > i && i > -f ? C : i) + b + (f > s && s > -f ? C : s) + b + (f > l && l > -f ? C : l), w += b + (f > c && c > -f ? C : c) + b + (f > n && n > -f ? C : n) + b + (f > o && o > -f ? C : o), M || O || 1 !== L ? (w += b + (f > d && d > -f ? C : d) + b + (f > h && h > -f ? C : h) + b + (f > a && a > -f ? C : a), w += b + (f > r && r > -f ? C : r) + b + (f > u && u > -f ? C : u) + b + (f > m && m > -f ? C : m) + b) : w += ",0,0,0,0,1,0,", w += I + b + N + b + E + b + (H ? 1 + -E / H : 1) + ")", S[Me] = w
                };
            d = Le.prototype, d.x = d.y = d.z = d.skewX = d.skewY = d.rotation = d.rotationX = d.rotationY = d.zOrigin = d.xPercent = d.yPercent = d.xOffset = d.yOffset = 0, d.scaleX = d.scaleY = d.scaleZ = 1, ke("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function(e, t, i, n, s, r, l) {
                    if (n._lastParsedTransform === l) return s;
                    n._lastParsedTransform = l;
                    var d, u = l.scale && "function" == typeof l.scale ? l.scale : 0;
                    "function" == typeof l[i] && (d = l[i], l[i] = t), u && (l.scale = u(_, e));
                    var c, h, p, m, g, v, y, w, b, C = e._gsTransform,
                        T = e.style,
                        k = 1e-6,
                        x = Ae.length,
                        S = l,
                        A = {},
                        M = "transformOrigin",
                        O = je(e, a, !0, S.parseTransform),
                        D = S.transform && ("function" == typeof S.transform ? S.transform(_, f) : S.transform);
                    if (n._transform = O, D && "string" == typeof D && Me) h = j.style, h[Me] = D, h.display = "block", h.position = "absolute", W.body.appendChild(j), c = je(j, null, !1), O.svg && (v = O.xOrigin, y = O.yOrigin, c.x -= O.xOffset, c.y -= O.yOffset, (S.transformOrigin || S.svgOrigin) && (D = {}, Re(e, re(S.transformOrigin), D, S.svgOrigin, S.smoothOrigin, !0), v = D.xOrigin, y = D.yOrigin, c.x -= D.xOffset - O.xOffset, c.y -= D.yOffset - O.yOffset), (v || y) && (w = ze(j, !0), c.x -= v - (v * w[0] + y * w[2]), c.y -= y - (v * w[1] + y * w[3]))), W.body.removeChild(j), c.perspective || (c.perspective = O.perspective), null != S.xPercent && (c.xPercent = de(S.xPercent, O.xPercent)), null != S.yPercent && (c.yPercent = de(S.yPercent, O.yPercent));
                    else if ("object" == typeof S) {
                        if (c = {
                                scaleX: de(null != S.scaleX ? S.scaleX : S.scale, O.scaleX),
                                scaleY: de(null != S.scaleY ? S.scaleY : S.scale, O.scaleY),
                                scaleZ: de(S.scaleZ, O.scaleZ),
                                x: de(S.x, O.x),
                                y: de(S.y, O.y),
                                z: de(S.z, O.z),
                                xPercent: de(S.xPercent, O.xPercent),
                                yPercent: de(S.yPercent, O.yPercent),
                                perspective: de(S.transformPerspective, O.perspective)
                            }, g = S.directionalRotation, null != g)
                            if ("object" == typeof g)
                                for (h in g) S[h] = g[h];
                            else S.rotation = g;
                            "string" == typeof S.x && -1 !== S.x.indexOf("%") && (c.x = 0, c.xPercent = de(S.x, O.xPercent)), "string" == typeof S.y && -1 !== S.y.indexOf("%") && (c.y = 0, c.yPercent = de(S.y, O.yPercent)), c.rotation = ue("rotation" in S ? S.rotation : "shortRotation" in S ? S.shortRotation + "_short" : "rotationZ" in S ? S.rotationZ : O.rotation, O.rotation, "rotation", A), Pe && (c.rotationX = ue("rotationX" in S ? S.rotationX : "shortRotationX" in S ? S.shortRotationX + "_short" : O.rotationX || 0, O.rotationX, "rotationX", A), c.rotationY = ue("rotationY" in S ? S.rotationY : "shortRotationY" in S ? S.shortRotationY + "_short" : O.rotationY || 0, O.rotationY, "rotationY", A)), c.skewX = ue(S.skewX, O.skewX), c.skewY = ue(S.skewY, O.skewY)
                    }
                    for (Pe && null != S.force3D && (O.force3D = S.force3D, m = !0), O.skewType = S.skewType || O.skewType || o.defaultSkewType, p = O.force3D || O.z || O.rotationX || O.rotationY || c.z || c.rotationX || c.rotationY || c.perspective, p || null == S.scale || (c.scaleZ = 1); --x > -1;) b = Ae[x], D = c[b] - O[b], (D > k || -k > D || null != S[b] || null != H[b]) && (m = !0, s = new ye(O, b, O[b], D, s), b in A && (s.e = A[b]), s.xs0 = 0, s.plugin = r, n._overwriteProps.push(s.n));
                    return D = S.transformOrigin, O.svg && (D || S.svgOrigin) && (v = O.xOffset, y = O.yOffset, Re(e, re(D), c, S.svgOrigin, S.smoothOrigin), s = we(O, "xOrigin", (C ? O : c).xOrigin, c.xOrigin, s, M), s = we(O, "yOrigin", (C ? O : c).yOrigin, c.yOrigin, s, M), (v !== O.xOffset || y !== O.yOffset) && (s = we(O, "xOffset", C ? v : O.xOffset, O.xOffset, s, M), s = we(O, "yOffset", C ? y : O.yOffset, O.yOffset, s, M)), D = "0px 0px"), (D || Pe && p && O.zOrigin) && (Me ? (m = !0, b = De, D = (D || Q(e, b, a, !1, "50% 50%")) + "", s = new ye(T, b, 0, 0, s, -1, M), s.b = T[b], s.plugin = r, Pe ? (h = O.zOrigin, D = D.split(" "), O.zOrigin = (D.length > 2 && (0 === h || "0px" !== D[2]) ? parseFloat(D[2]) : h) || 0, s.xs0 = s.e = D[0] + " " + (D[1] || "50%") + " 0px", s = new ye(O, "zOrigin", 0, 0, s, -1, s.n), s.b = h, s.xs0 = s.e = O.zOrigin) : s.xs0 = s.e = D) : re(D + "", O)), m && (n._transformType = O.svg && Se || !p && 3 !== this._transformType ? 2 : 3), d && (l[i] = d), u && (l.scale = u), s
                },
                prefix: !0
            }), ke("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), ke("borderRadius", {
                defaultValue: "0px",
                parser: function(e, t, i, s, o, r) {
                    t = this.format(t);
                    var l, d, u, c, h, p, m, g, f, _, v, y, w, b, C, T, k = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        x = e.style;
                    for (f = parseFloat(e.offsetWidth), _ = parseFloat(e.offsetHeight), l = t.split(" "), d = 0; d < k.length; d++) this.p.indexOf("border") && (k[d] = Z(k[d])), h = c = Q(e, k[d], a, !1, "0px"), -1 !== h.indexOf(" ") && (c = h.split(" "), h = c[0], c = c[1]), p = u = l[d], m = parseFloat(h), y = h.substr((m + "").length), w = "=" === p.charAt(1), w ? (g = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), g *= parseFloat(p), v = p.substr((g + "").length - (0 > g ? 1 : 0)) || "") : (g = parseFloat(p), v = p.substr((g + "").length)), "" === v && (v = n[i] || y), v !== y && (b = ee(e, "borderLeft", m, y), C = ee(e, "borderTop", m, y), "%" === v ? (h = b / f * 100 + "%", c = C / _ * 100 + "%") : "em" === v ? (T = ee(e, "borderLeft", 1, "em"), h = b / T + "em", c = C / T + "em") : (h = b + "px", c = C + "px"), w && (p = parseFloat(h) + g + v, u = parseFloat(c) + g + v)), o = be(x, k[d], h + " " + c, p + " " + u, !1, "0px", o);
                    return o
                },
                prefix: !0,
                formatter: fe("0px 0px 0px 0px", !1, !0)
            }), ke("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function(e, t, i, n, s, o) {
                    return be(e.style, i, this.format(Q(e, i, a, !1, "0px 0px")), this.format(t), !1, "0px", s)
                },
                prefix: !0,
                formatter: fe("0px 0px", !1, !0)
            }), ke("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(e, t, i, n, s, o) {
                    var r, l, d, u, c, h, p = "background-position",
                        m = a || $(e, null),
                        f = this.format((m ? g ? m.getPropertyValue(p + "-x") + " " + m.getPropertyValue(p + "-y") : m.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                        _ = this.format(t);
                    if (-1 !== f.indexOf("%") != (-1 !== _.indexOf("%")) && _.split(",").length < 2 && (h = Q(e, "backgroundImage").replace(O, ""), h && "none" !== h)) {
                        for (r = f.split(" "), l = _.split(" "), X.setAttribute("src", h), d = 2; --d > -1;) f = r[d], u = -1 !== f.indexOf("%"), u !== (-1 !== l[d].indexOf("%")) && (c = 0 === d ? e.offsetWidth - X.width : e.offsetHeight - X.height, r[d] = u ? parseFloat(f) / 100 * c + "px" : parseFloat(f) / c * 100 + "%");
                        f = r.join(" ")
                    }
                    return this.parseComplex(e.style, f, _, s, o)
                },
                formatter: re
            }), ke("backgroundSize", {
                defaultValue: "0 0",
                formatter: function(e) {
                    return e += "", re(-1 === e.indexOf(" ") ? e + " " + e : e)
                }
            }), ke("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), ke("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), ke("transformStyle", {
                prefix: !0
            }), ke("backfaceVisibility", {
                prefix: !0
            }), ke("userSelect", {
                prefix: !0
            }), ke("margin", {
                parser: _e("marginTop,marginRight,marginBottom,marginLeft")
            }), ke("padding", {
                parser: _e("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), ke("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(e, t, i, n, s, o) {
                    var r, l, d;
                    return 9 > g ? (l = e.currentStyle, d = 8 > g ? " " : ",", r = "rect(" + l.clipTop + d + l.clipRight + d + l.clipBottom + d + l.clipLeft + ")", t = this.format(t).split(",").join(d)) : (r = this.format(Q(e, this.p, a, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, r, t, s, o)
                }
            }), ke("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), ke("autoRound,strictUnits", {
                parser: function(e, t, i, n, a) {
                    return a
                }
            }), ke("border", {
                defaultValue: "0px solid #000",
                parser: function(e, t, i, n, s, o) {
                    var r = Q(e, "borderTopWidth", a, !1, "0px"),
                        l = this.format(t).split(" "),
                        d = l[0].replace(C, "");
                    return "px" !== d && (r = parseFloat(r) / ee(e, "borderTopWidth", 1, d) + d), this.parseComplex(e.style, this.format(r + " " + Q(e, "borderTopStyle", a, !1, "solid") + " " + Q(e, "borderTopColor", a, !1, "#000")), l.join(" "), s, o)
                },
                color: !0,
                formatter: function(e) {
                    var t = e.split(" ");
                    return t[0] + " " + (t[1] || "solid") + " " + (e.match(ge) || ["#000"])[0]
                }
            }), ke("borderWidth", {
                parser: _e("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), ke("float,cssFloat,styleFloat", {
                parser: function(e, t, i, n, a, s) {
                    var o = e.style,
                        r = "cssFloat" in o ? "cssFloat" : "styleFloat";
                    return new ye(o, r, 0, 0, a, -1, i, !1, 0, o[r], t)
                }
            });
            var Ue = function(e) {
                var t, i = this.t,
                    n = i.filter || Q(this.data, "filter") || "",
                    a = this.s + this.c * e | 0;
                100 === a && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), t = !Q(this.data, "filter")) : (i.filter = n.replace(x, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + a + ")"), -1 === n.indexOf("pacity") ? 0 === a && this.xn1 || (i.filter = n + " alpha(opacity=" + a + ")") : i.filter = n.replace(T, "opacity=" + a))
            };
            ke("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(e, t, i, n, s, o) {
                    var r = parseFloat(Q(e, "opacity", a, !1, "1")),
                        l = e.style,
                        d = "autoAlpha" === i;
                    return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + r), d && 1 === r && "hidden" === Q(e, "visibility", a) && 0 !== t && (r = 0), V ? s = new ye(l, "opacity", r, t - r, s) : (s = new ye(l, "opacity", 100 * r, 100 * (t - r), s), s.xn1 = d ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = Ue), d && (s = new ye(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== r ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                }
            });
            var Ve = function(e, t) {
                    t && (e.removeProperty ? (("ms" === t.substr(0, 2) || "webkit" === t.substr(0, 6)) && (t = "-" + t), e.removeProperty(t.replace(A, "-$1").toLowerCase())) : e.removeAttribute(t))
                },
                Ge = function(e) {
                    if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                        this.t.setAttribute("class", 0 === e ? this.b : this.e);
                        for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : Ve(i, t.p), t = t._next;
                        1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            ke("className", {
                parser: function(e, t, n, s, o, r, l) {
                    var d, u, c, h, p, m = e.getAttribute("class") || "",
                        g = e.style.cssText;
                    if (o = s._classNamePT = new ye(e, n, 0, 0, o, 2), o.setRatio = Ge, o.pr = -11, i = !0, o.b = m, u = ie(e, a), c = e._gsClassPT) {
                        for (h = {}, p = c.data; p;) h[p.p] = 1, p = p._next;
                        c.setRatio(1)
                    }
                    return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : m.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", o.e), d = ne(e, u, ie(e), l, h), e.setAttribute("class", m), o.data = d.firstMPT, e.style.cssText = g, o = o.xfirst = s.parse(e, d.difs, o, r)
                }
            });
            var qe = function(e) {
                if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var t, i, n, a, s, o = this.t.style,
                        r = l.transform.parse;
                    if ("all" === this.e) o.cssText = "", a = !0;
                    else
                        for (t = this.e.split(" ").join("").split(","), n = t.length; --n > -1;) i = t[n], l[i] && (l[i].parse === r ? a = !0 : i = "transformOrigin" === i ? De : l[i].p), Ve(o, i);
                    a && (Ve(o, Me), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                }
            };
            for (ke("clearProps", {
                    parser: function(e, t, n, a, s) {
                        return s = new ye(e, n, 0, 0, s, 2), s.setRatio = qe, s.e = t, s.pr = -10, s.data = a._tween, i = !0, s
                    }
                }), d = "bezier,throwProps,physicsProps,physics2D".split(","), Ce = d.length; Ce--;) xe(d[Ce]);
            d = o.prototype, d._firstPT = d._lastParsedTransform = d._transform = null, d._onInitTween = function(e, t, r, d) {
                if (!e.nodeType) return !1;
                this._target = f = e, this._tween = r, this._vars = t, _ = d, u = t.autoRound, i = !1, n = t.suffixMap || o.suffixMap, a = $(e, ""), s = this._overwriteProps;
                var p, g, v, y, w, b, C, T, x, S = e.style;
                if (c && "" === S.zIndex && (p = Q(e, "zIndex", a), ("auto" === p || "" === p) && this._addLazySet(S, "zIndex", 0)), "string" == typeof t && (y = S.cssText, p = ie(e, a), S.cssText = y + ";" + t, p = ne(e, p, ie(e)).difs, !V && k.test(t) && (p.opacity = parseFloat(RegExp.$1)), t = p, S.cssText = y), t.className ? this._firstPT = g = l.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = g = this.parse(e, t, null), this._transformType) {
                    for (x = 3 === this._transformType, Me ? h && (c = !0, "" === S.zIndex && (C = Q(e, "zIndex", a), ("auto" === C || "" === C) && this._addLazySet(S, "zIndex", 0)), m && this._addLazySet(S, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (x ? "visible" : "hidden"))) : S.zoom = 1, v = g; v && v._next;) v = v._next;
                    T = new ye(e, "transform", 0, 0, null, 2), this._linkCSSP(T, null, v), T.setRatio = Me ? Ye : Xe, T.data = this._transform || je(e, a, !0), T.tween = r, T.pr = -1, s.pop()
                }
                if (i) {
                    for (; g;) {
                        for (b = g._next, v = y; v && v.pr > g.pr;) v = v._next;
                        (g._prev = v ? v._prev : w) ? g._prev._next = g: y = g, (g._next = v) ? v._prev = g : w = g, g = b
                    }
                    this._firstPT = y
                }
                return !0
            }, d.parse = function(e, t, i, s) {
                var o, r, d, c, h, p, m, g, v, y, w = e.style;
                for (o in t) p = t[o], "function" == typeof p && (p = p(_, f)), r = l[o], r ? i = r.parse(e, p, o, this, i, s, t) : (h = Q(e, o, a) + "", v = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || v && S.test(p) ? (v || (p = pe(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = be(w, o, h, p, !0, "transparent", i, 0, s)) : v && E.test(p) ? i = be(w, o, h, p, !0, null, i, 0, s) : (d = parseFloat(h), m = d || 0 === d ? h.substr((d + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (d = oe(e, o, a), m = "px") : "left" === o || "top" === o ? (d = te(e, o, a), m = "px") : (d = "opacity" !== o ? 0 : 1, m = "")), y = v && "=" === p.charAt(1), y ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), g = p.replace(C, "")) : (c = parseFloat(p), g = v ? p.replace(C, "") : ""), "" === g && (g = o in n ? n[o] : m), p = c || 0 === c ? (y ? c + d : c) + g : t[o], m !== g && "" !== g && (c || 0 === c) && d && (d = ee(e, o, d, m), "%" === g ? (d /= ee(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = d + "%")) : "em" === g || "rem" === g || "vw" === g || "vh" === g ? d /= ee(e, o, 1, g) : "px" !== g && (c = ee(e, o, c, g), g = "px"), y && (c || 0 === c) && (p = c + d + g)), y && (c += d), !d && 0 !== d || !c && 0 !== c ? void 0 !== w[o] && (p || p + "" != "NaN" && null != p) ? (i = new ye(w, o, c || d || 0, 0, i, -1, o, !1, 0, h, p), i.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : q("invalid " + o + " tween value: " + t[o]) : (i = new ye(w, o, d, c - d, i, 0, o, u !== !1 && ("px" === g || "zIndex" === o), 0, h, p), i.xs0 = g))), s && i && !i.plugin && (i.plugin = s);
                return i
            }, d.setRatio = function(e) {
                var t, i, n, a = this._firstPT,
                    s = 1e-6;
                if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; a;) {
                            if (t = a.c * e + a.s, a.r ? t = Math.round(t) : s > t && t > -s && (t = 0), a.type)
                                if (1 === a.type)
                                    if (n = a.l, 2 === n) a.t[a.p] = a.xs0 + t + a.xs1 + a.xn1 + a.xs2;
                                    else if (3 === n) a.t[a.p] = a.xs0 + t + a.xs1 + a.xn1 + a.xs2 + a.xn2 + a.xs3;
                            else if (4 === n) a.t[a.p] = a.xs0 + t + a.xs1 + a.xn1 + a.xs2 + a.xn2 + a.xs3 + a.xn3 + a.xs4;
                            else if (5 === n) a.t[a.p] = a.xs0 + t + a.xs1 + a.xn1 + a.xs2 + a.xn2 + a.xs3 + a.xn3 + a.xs4 + a.xn4 + a.xs5;
                            else {
                                for (i = a.xs0 + t + a.xs1, n = 1; n < a.l; n++) i += a["xn" + n] + a["xs" + (n + 1)];
                                a.t[a.p] = i
                            } else -1 === a.type ? a.t[a.p] = a.xs0 : a.setRatio && a.setRatio(e);
                            else a.t[a.p] = t + a.xs0;
                            a = a._next
                        } else
                            for (; a;) 2 !== a.type ? a.t[a.p] = a.b : a.setRatio(e), a = a._next;
                    else
                        for (; a;) {
                            if (2 !== a.type)
                                if (a.r && -1 !== a.type)
                                    if (t = Math.round(a.s + a.c), a.type) {
                                        if (1 === a.type) {
                                            for (n = a.l, i = a.xs0 + t + a.xs1, n = 1; n < a.l; n++) i += a["xn" + n] + a["xs" + (n + 1)];
                                            a.t[a.p] = i
                                        }
                                    } else a.t[a.p] = t + a.xs0;
                            else a.t[a.p] = a.e;
                            else a.setRatio(e);
                            a = a._next
                        }
            }, d._enableTransforms = function(e) {
                this._transform = this._transform || je(this._target, a, !0), this._transformType = this._transform.svg && Se || !e && 3 !== this._transformType ? 2 : 3
            };
            var Ke = function(e) {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            d._addLazySet = function(e, t, i) {
                var n = this._firstPT = new ye(e, t, 0, 0, this._firstPT, 2);
                n.e = i, n.setRatio = Ke, n.data = this
            }, d._linkCSSP = function(e, t, i, n) {
                return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, n = !0), i ? i._next = e : n || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i), e
            }, d._mod = function(e) {
                for (var t = this._firstPT; t;) "function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1), t = t._next
            }, d._kill = function(t) {
                var i, n, a, s = t;
                if (t.autoAlpha || t.alpha) {
                    s = {};
                    for (n in t) s[n] = t[n];
                    s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                }
                for (t.className && (i = this._classNamePT) && (a = i.xfirst, a && a._prev ? this._linkCSSP(a._prev, i._next, a._prev._prev) : a === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, a._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(t), n = i.plugin), i = i._next;
                return e.prototype._kill.call(this, s)
            };
            var Je = function(e, t, i) {
                var n, a, s, o;
                if (e.slice)
                    for (a = e.length; --a > -1;) Je(e[a], t, i);
                else
                    for (n = e.childNodes, a = n.length; --a > -1;) s = n[a], o = s.type, s.style && (t.push(ie(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Je(s, t, i)
            };
            return o.cascadeTo = function(e, i, n) {
                var a, s, o, r, l = t.to(e, i, n),
                    d = [l],
                    u = [],
                    c = [],
                    h = [],
                    p = t._internals.reservedProps;
                for (e = l._targets || l.target, Je(e, u, h), l.render(i, !0, !0), Je(e, c), l.render(0, !0, !0), l._enabled(!0), a = h.length; --a > -1;)
                    if (s = ne(h[a], u[a], c[a]), s.firstMPT) {
                        s = s.difs;
                        for (o in n) p[o] && (s[o] = n[o]);
                        r = {};
                        for (o in s) r[o] = u[a][o];
                        d.push(t.fromTo(h[a], i, r, s))
                    }
                return d
            }, e.activate([o]), o
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "function" == typeof define && define.amd ? define("CSSPlugin",["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = t())
    }("CSSPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(e) {
            var t, i, n, a = _gsScope.GreenSockGlobals || _gsScope,
                s = a.com.greensock,
                o = 2 * Math.PI,
                r = Math.PI / 2,
                l = s._class,
                d = function(t, i) {
                    var n = l("easing." + t, function() {}, !0),
                        a = n.prototype = new e;
                    return a.constructor = n, a.getRatio = i, n
                },
                u = e.register || function() {},
                c = function(e, t, i, n, a) {
                    var s = l("easing." + e, {
                        easeOut: new t,
                        easeIn: new i,
                        easeInOut: new n
                    }, !0);
                    return u(s, e), s
                },
                h = function(e, t, i) {
                    this.t = e, this.v = t, i && (this.next = i, i.prev = this, this.c = i.v - t, this.gap = i.t - e)
                },
                p = function(t, i) {
                    var n = l("easing." + t, function(e) {
                            this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0),
                        a = n.prototype = new e;
                    return a.constructor = n, a.getRatio = i, a.config = function(e) {
                        return new n(e)
                    }, n
                },
                m = c("Back", p("BackOut", function(e) {
                    return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
                }), p("BackIn", function(e) {
                    return e * e * ((this._p1 + 1) * e - this._p1)
                }), p("BackInOut", function(e) {
                    return (e *= 2) < 1 ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
                })),
                g = l("easing.SlowMo", function(e, t, i) {
                    t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
                }, !0),
                f = g.prototype = new e;
            return f.constructor = g, f.getRatio = function(e) {
                var t = e + (.5 - e) * this._p;
                return e < this._p1 ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
            }, g.ease = new g(.7, .7), f.config = g.config = function(e, t, i) {
                return new g(e, t, i)
            }, t = l("easing.SteppedEase", function(e) {
                e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
            }, !0), f = t.prototype = new e, f.constructor = t, f.getRatio = function(e) {
                return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
            }, f.config = t.config = function(e) {
                return new t(e)
            }, i = l("easing.RoughEase", function(t) {
                t = t || {};
                for (var i, n, a, s, o, r, l = t.taper || "none", d = [], u = 0, c = 0 | (t.points || 20), p = c, m = t.randomize !== !1, g = t.clamp === !0, f = t.template instanceof e ? t.template : null, _ = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;) i = m ? Math.random() : 1 / c * p, n = f ? f.getRatio(i) : i, "none" === l ? a = _ : "out" === l ? (s = 1 - i, a = s * s * _) : "in" === l ? a = i * i * _ : .5 > i ? (s = 2 * i, a = s * s * .5 * _) : (s = 2 * (1 - i), a = s * s * .5 * _), m ? n += Math.random() * a - .5 * a : p % 2 ? n += .5 * a : n -= .5 * a, g && (n > 1 ? n = 1 : 0 > n && (n = 0)), d[u++] = {
                    x: i,
                    y: n
                };
                for (d.sort(function(e, t) {
                        return e.x - t.x
                    }), r = new h(1, 1, null), p = c; --p > -1;) o = d[p], r = new h(o.x, o.y, r);
                this._prev = new h(0, 0, 0 !== r.t ? r : r.next)
            }, !0), f = i.prototype = new e, f.constructor = i, f.getRatio = function(e) {
                var t = this._prev;
                if (e > t.t) {
                    for (; t.next && e >= t.t;) t = t.next;
                    t = t.prev
                } else
                    for (; t.prev && e <= t.t;) t = t.prev;
                return this._prev = t, t.v + (e - t.t) / t.gap * t.c
            }, f.config = function(e) {
                return new i(e)
            }, i.ease = new i, c("Bounce", d("BounceOut", function(e) {
                return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
            }), d("BounceIn", function(e) {
                return (e = 1 - e) < 1 / 2.75 ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
            }), d("BounceInOut", function(e) {
                var t = .5 > e;
                return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
            })), c("Circ", d("CircOut", function(e) {
                return Math.sqrt(1 - (e -= 1) * e)
            }), d("CircIn", function(e) {
                return -(Math.sqrt(1 - e * e) - 1)
            }), d("CircInOut", function(e) {
                return (e *= 2) < 1 ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
            })), n = function(t, i, n) {
                var a = l("easing." + t, function(e, t) {
                        this._p1 = e >= 1 ? e : 1, this._p2 = (t || n) / (1 > e ? e : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                    }, !0),
                    s = a.prototype = new e;
                return s.constructor = a, s.getRatio = i, s.config = function(e, t) {
                    return new a(e, t)
                }, a
            }, c("Elastic", n("ElasticOut", function(e) {
                return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * this._p2) + 1
            }, .3), n("ElasticIn", function(e) {
                return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2))
            }, .3), n("ElasticInOut", function(e) {
                return (e *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * this._p2) * .5 + 1
            }, .45)), c("Expo", d("ExpoOut", function(e) {
                return 1 - Math.pow(2, -10 * e)
            }), d("ExpoIn", function(e) {
                return Math.pow(2, 10 * (e - 1)) - .001
            }), d("ExpoInOut", function(e) {
                return (e *= 2) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
            })), c("Sine", d("SineOut", function(e) {
                return Math.sin(e * r)
            }), d("SineIn", function(e) {
                return -Math.cos(e * r) + 1
            }), d("SineInOut", function(e) {
                return -.5 * (Math.cos(Math.PI * e) - 1)
            })), l("easing.EaseLookup", {
                find: function(t) {
                    return e.map[t]
                }
            }, !0), u(a.SlowMo, "SlowMo", "ease,"), u(i, "RoughEase", "ease,"), u(t, "SteppedEase", "ease,"), m
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function() {
        "use strict";
        var e = function() {
            return _gsScope.GreenSockGlobals || _gsScope
        };
        "function" == typeof define && define.amd ? define("EasePack",["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = e())
    }(), ! function(e, t) {
        "use strict";
        var i = {},
            n = e.document,
            a = e.GreenSockGlobals = e.GreenSockGlobals || e;
        if (!a.TweenLite) {
            var s, o, r, l, d, u = function(e) {
                    var t, i = e.split("."),
                        n = a;
                    for (t = 0; t < i.length; t++) n[i[t]] = n = n[i[t]] || {};
                    return n
                },
                c = u("com.greensock"),
                h = 1e-10,
                p = function(e) {
                    var t, i = [],
                        n = e.length;
                    for (t = 0; t !== n; i.push(e[t++]));
                    return i
                },
                m = function() {},
                g = function() {
                    var e = Object.prototype.toString,
                        t = e.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && e.call(i) === t)
                    }
                }(),
                f = {},
                _ = function(n, s, o, r) {
                    this.sc = f[n] ? f[n].sc : [], f[n] = this, this.gsClass = null, this.func = o;
                    var l = [];
                    this.check = function(d) {
                        for (var c, h, p, m, g, v = s.length, y = v; --v > -1;)(c = f[s[v]] || new _(s[v], [])).gsClass ? (l[v] = c.gsClass, y--) : d && c.sc.push(this);
                        if (0 === y && o) {
                            if (h = ("com.greensock." + n).split("."), p = h.pop(), m = u(h.join("."))[p] = this.gsClass = o.apply(o, l), r)
                                if (a[p] = i[p] = m, g = "undefined" != typeof module && module.exports, !g && "function" == typeof define && define.amd) define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                    return m
                                });
                                else if (g)
                                if (n === t) {
                                    module.exports = i[t] = m;
                                    for (v in i) m[v] = i[v]
                                } else i[t] && (i[t][p] = m);
                            for (v = 0; v < this.sc.length; v++) this.sc[v].check()
                        }
                    }, this.check(!0)
                },
                v = e._gsDefine = function(e, t, i, n) {
                    return new _(e, t, i, n)
                },
                y = c._class = function(e, t, i) {
                    return t = t || function() {}, v(e, [], function() {
                        return t
                    }, i), t
                };
            v.globals = a;
            var w = [0, 0, 1, 1],
                b = y("easing.Ease", function(e, t, i, n) {
                    this._func = e, this._type = i || 0, this._power = n || 0, this._params = t ? w.concat(t) : w
                }, !0),
                C = b.map = {},
                T = b.register = function(e, t, i, n) {
                    for (var a, s, o, r, l = t.split(","), d = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --d > -1;)
                        for (s = l[d], a = n ? y("easing." + s, null, !0) : c.easing[s] || {}, o = u.length; --o > -1;) r = u[o], C[s + "." + r] = C[r + s] = a[r] = e.getRatio ? e : e[r] || new e
                };
            for (r = b.prototype, r._calcEnd = !1, r.getRatio = function(e) {
                    if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
                    var t = this._type,
                        i = this._power,
                        n = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : .5 > e ? n / 2 : 1 - n / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = s.length; --o > -1;) r = s[o] + ",Power" + o, T(new b(null, null, 1, o), r, "easeOut", !0), T(new b(null, null, 2, o), r, "easeIn" + (0 === o ? ",easeNone" : "")), T(new b(null, null, 3, o), r, "easeInOut");
            C.linear = c.easing.Linear.easeIn, C.swing = c.easing.Quad.easeInOut;
            var k = y("events.EventDispatcher", function(e) {
                this._listeners = {}, this._eventTarget = e || this
            });
            r = k.prototype, r.addEventListener = function(e, t, i, n, a) {
                a = a || 0;
                var s, o, r = this._listeners[e],
                    u = 0;
                for (this !== l || d || l.wake(), null == r && (this._listeners[e] = r = []), o = r.length; --o > -1;) s = r[o], s.c === t && s.s === i ? r.splice(o, 1) : 0 === u && s.pr < a && (u = o + 1);
                r.splice(u, 0, {
                    c: t,
                    s: i,
                    up: n,
                    pr: a
                })
            }, r.removeEventListener = function(e, t) {
                var i, n = this._listeners[e];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === t) return void n.splice(i, 1)
            }, r.dispatchEvent = function(e) {
                var t, i, n, a = this._listeners[e];
                if (a)
                    for (t = a.length, t > 1 && (a = a.slice(0)), i = this._eventTarget; --t > -1;) n = a[t], n && (n.up ? n.c.call(n.s || i, {
                        type: e,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var x = e.requestAnimationFrame,
                S = e.cancelAnimationFrame,
                A = Date.now || function() {
                    return (new Date).getTime()
                },
                M = A();
            for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !x;) x = e[s[o] + "RequestAnimationFrame"], S = e[s[o] + "CancelAnimationFrame"] || e[s[o] + "CancelRequestAnimationFrame"];
            y("Ticker", function(e, t) {
                var i, a, s, o, r, u = this,
                    c = A(),
                    p = !(t === !1 || !x) && "auto",
                    g = 500,
                    f = 33,
                    _ = "tick",
                    v = function(e) {
                        var t, n, l = A() - M;
                        l > g && (c += l - f), M += l, u.time = (M - c) / 1e3, t = u.time - r, (!i || t > 0 || e === !0) && (u.frame++, r += t + (t >= o ? .004 : o - t), n = !0), e !== !0 && (s = a(v)), n && u.dispatchEvent(_)
                    };
                k.call(u), u.time = u.frame = 0, u.tick = function() {
                    v(!0)
                }, u.lagSmoothing = function(e, t) {
                    g = e || 1 / h, f = Math.min(t, g, 0)
                }, u.sleep = function() {
                    null != s && (p && S ? S(s) : clearTimeout(s), a = m, s = null, u === l && (d = !1))
                }, u.wake = function(e) {
                    null !== s ? u.sleep() : e ? c += -M + (M = A()) : u.frame > 10 && (M = A() - g + 5), a = 0 === i ? m : p && x ? x : function(e) {
                        return setTimeout(e, 1e3 * (r - u.time) + 1 | 0)
                    }, u === l && (d = !0), v(2)
                }, u.fps = function(e) {
                    return arguments.length ? (i = e, o = 1 / (i || 60), r = this.time + o, void u.wake()) : i
                }, u.useRAF = function(e) {
                    return arguments.length ? (u.sleep(), p = e, void u.fps(i)) : p
                }, u.fps(e), setTimeout(function() {
                    "auto" === p && u.frame < 5 && "hidden" !== n.visibilityState && u.useRAF(!1)
                }, 1500)
            }), r = c.Ticker.prototype = new c.events.EventDispatcher, r.constructor = c.Ticker;
            var O = y("core.Animation", function(e, t) {
                if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, q) {
                    d || l.wake();
                    var i = this.vars.useFrames ? G : q;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = O.ticker = new c.Ticker, r = O.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
            var D = function() {
                d && A() - M > 2e3 && l.wake(), setTimeout(D, 2e3)
            };
            D(), r.play = function(e, t) {
                return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
            }, r.pause = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!0)
            }, r.resume = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!1)
            }, r.seek = function(e, t) {
                return this.totalTime(Number(e), t !== !1)
            }, r.restart = function(e, t) {
                return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
            }, r.reverse = function(e, t) {
                return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
            }, r.render = function(e, t, i) {}, r.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, r.isActive = function() {
                var e, t = this._timeline,
                    i = this._startTime;
                return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime(!0)) >= i && e < i + this.totalDuration() / this._timeScale
            }, r._enabled = function(e, t) {
                return d || l.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
            }, r._kill = function(e, t) {
                return this._enabled(!1, !1)
            }, r.kill = function(e, t) {
                return this._kill(e, t), this
            }, r._uncache = function(e) {
                for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
                return this
            }, r._swapSelfInParams = function(e) {
                for (var t = e.length, i = e.concat(); --t > -1;) "{self}" === e[t] && (i[t] = this);
                return i
            }, r._callback = function(e) {
                var t = this.vars,
                    i = t[e],
                    n = t[e + "Params"],
                    a = t[e + "Scope"] || t.callbackScope || this,
                    s = n ? n.length : 0;
                switch (s) {
                    case 0:
                        i.call(a);
                        break;
                    case 1:
                        i.call(a, n[0]);
                        break;
                    case 2:
                        i.call(a, n[0], n[1]);
                        break;
                    default:
                        i.apply(a, n)
                }
            }, r.eventCallback = function(e, t, i, n) {
                if ("on" === (e || "").substr(0, 2)) {
                    var a = this.vars;
                    if (1 === arguments.length) return a[e];
                    null == t ? delete a[e] : (a[e] = t, a[e + "Params"] = g(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, a[e + "Scope"] = n), "onUpdate" === e && (this._onUpdate = t)
                }
                return this
            }, r.delay = function(e) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
            }, r.duration = function(e) {
                return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, r.totalDuration = function(e) {
                return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
            }, r.time = function(e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
            }, r.totalTime = function(e, t, i) {
                if (d || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > e && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            a = this._timeline;
                        if (e > n && !i && (e = n), this._startTime = (this._paused ? this._pauseTime : a._time) - (this._reversed ? n - e : e) / this._timeScale, a._dirty || this._uncache(!1), a._timeline)
                            for (; a._timeline;) a._timeline._time !== (a._startTime + a._totalTime) / a._timeScale && a.totalTime(a._totalTime, !0), a = a._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && (E.length && J(), this.render(e, t, !1), E.length && J())
                }
                return this
            }, r.progress = r.totalProgress = function(e, t) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * e, t) : i ? this._time / i : this.ratio
            }, r.startTime = function(e) {
                return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
            }, r.endTime = function(e) {
                return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
            }, r.timeScale = function(e) {
                if (!arguments.length) return this._timeScale;
                if (e = e || h, this._timeline && this._timeline.smoothChildTiming) {
                    var t = this._pauseTime,
                        i = t || 0 === t ? t : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / e
                }
                return this._timeScale = e, this._uncache(!1)
            }, r.reversed = function(e) {
                return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, r.paused = function(e) {
                if (!arguments.length) return this._paused;
                var t, i, n = this._timeline;
                return e != this._paused && n && (d || e || l.wake(), t = n.rawTime(), i = t - this._pauseTime, !e && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== i && this._initted && this.duration() && (t = n.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, this.render(t, t === this._totalTime, !0))), this._gc && !e && this._enabled(!0, !1), this
            };
            var P = y("core.SimpleTimeline", function(e) {
                O.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            r = P.prototype = new O, r.constructor = P, r.kill()._gc = !1, r._first = r._last = r._recent = null, r._sortChildren = !1, r.add = r.insert = function(e, t, i, n) {
                var a, s;
                if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), a = this._last, this._sortChildren)
                    for (s = e._startTime; a && a._startTime > s;) a = a._prev;
                return a ? (e._next = a._next, a._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = a, this._recent = e, this._timeline && this._uncache(!0), this
            }, r._remove = function(e, t) {
                return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, r.render = function(e, t, i) {
                var n, a = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = e; a;) n = a._next, (a._active || e >= a._startTime && !a._paused) && (a._reversed ? a.render((a._dirty ? a.totalDuration() : a._totalDuration) - (e - a._startTime) * a._timeScale, t, i) : a.render((e - a._startTime) * a._timeScale, t, i)), a = n
            }, r.rawTime = function() {
                return d || l.wake(), this._totalTime
            };
            var L = y("TweenLite", function(t, i, n) {
                    if (O.call(this, i, n), this.render = L.prototype.render, null == t) throw "Cannot tween a null target.";
                    this.target = t = "string" != typeof t ? t : L.selector(t) || t;
                    var a, s, o, r = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? V[L.defaultOverwrite] : "number" == typeof l ? l >> 0 : V[l], (r || t instanceof Array || t.push && g(t)) && "number" != typeof t[0])
                        for (this._targets = o = p(t), this._propLookup = [], this._siblings = [], a = 0; a < o.length; a++) s = o[a], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(a--, 1), this._targets = o = o.concat(p(s))) : (this._siblings[a] = Z(s, this, !1), 1 === l && this._siblings[a].length > 1 && Q(s, this, null, 1, this._siblings[a])) : (s = o[a--] = L.selector(s), "string" == typeof s && o.splice(a + 1, 1)) : o.splice(a--, 1);
                    else this._propLookup = {}, this._siblings = Z(t, this, !1), 1 === l && this._siblings.length > 1 && Q(t, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -h, this.render(Math.min(0, -this._delay)))
                }, !0),
                I = function(t) {
                    return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
                },
                N = function(e, t) {
                    var i, n = {};
                    for (i in e) U[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!j[i] || j[i] && j[i]._autoCSS) || (n[i] = e[i], delete e[i]);
                    e.css = n
                };
            r = L.prototype = new O, r.constructor = L, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = r._lazy = !1, L.version = "1.19.1", L.defaultEase = r._ease = new b(null, null, 1, 1), L.defaultOverwrite = "auto", L.ticker = l, L.autoSleep = 120, L.lagSmoothing = function(e, t) {
                l.lagSmoothing(e, t)
            }, L.selector = e.$ || e.jQuery || function(t) {
                var i = e.$ || e.jQuery;
                return i ? (L.selector = i, i(t)) : "undefined" == typeof n ? t : n.querySelectorAll ? n.querySelectorAll(t) : n.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
            };
            var E = [],
                F = {},
                R = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                H = function(e) {
                    for (var t, i = this._firstPT, n = 1e-6; i;) t = i.blob ? 1 === e ? this.end : e ? this.join("") : this.start : i.c * e + i.s, i.m ? t = i.m(t, this._target || i.t) : n > t && t > -n && !i.blob && (t = 0), i.f ? i.fp ? i.t[i.p](i.fp, t) : i.t[i.p](t) : i.t[i.p] = t, i = i._next
                },
                B = function(e, t, i, n) {
                    var a, s, o, r, l, d, u, c = [],
                        h = 0,
                        p = "",
                        m = 0;
                    for (c.start = e, c.end = t, e = c[0] = e + "", t = c[1] = t + "", i && (i(c), e = c[0], t = c[1]), c.length = 0, a = e.match(R) || [], s = t.match(R) || [], n && (n._next = null, n.blob = 1, c._firstPT = c._applyPT = n), l = s.length, r = 0; l > r; r++) u = s[r], d = t.substr(h, t.indexOf(u, h) - h), p += d || !r ? d : ",", h += d.length, m ? m = (m + 1) % 5 : "rgba(" === d.substr(-5) && (m = 1), u === a[r] || a.length <= r ? p += u : (p && (c.push(p), p = ""), o = parseFloat(a[r]), c.push(o), c._firstPT = {
                        _next: c._firstPT,
                        t: c,
                        p: c.length - 1,
                        s: o,
                        c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
                        f: 0,
                        m: m && 4 > m ? Math.round : 0
                    }), h += u.length;
                    return p += t.substr(h), p && c.push(p), c.setRatio = H, c
                },
                W = function(e, t, i, n, a, s, o, r, l) {
                    "function" == typeof n && (n = n(l || 0, e));
                    var d, u = typeof e[t],
                        c = "function" !== u ? "" : t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3),
                        h = "get" !== i ? i : c ? o ? e[c](o) : e[c]() : e[t],
                        p = "string" == typeof n && "=" === n.charAt(1),
                        m = {
                            t: e,
                            p: t,
                            s: h,
                            f: "function" === u,
                            pg: 0,
                            n: a || t,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: p ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - h || 0
                        };
                    return ("number" != typeof h || "number" != typeof n && !p) && (o || isNaN(h) || !p && isNaN(n) || "boolean" == typeof h || "boolean" == typeof n ? (m.fp = o, d = B(h, p ? m.s + m.c : n, r || L.defaultStringFilter, m), m = {
                        t: d,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: a || t,
                        pr: 0,
                        m: 0
                    }) : (m.s = parseFloat(h), p || (m.c = parseFloat(n) - m.s || 0))), m.c ? ((m._next = this._firstPT) && (m._next._prev = m), this._firstPT = m, m) : void 0
                },
                z = L._internals = {
                    isArray: g,
                    isSelector: I,
                    lazyTweens: E,
                    blobDif: B
                },
                j = L._plugins = {},
                X = z.tweenLookup = {},
                Y = 0,
                U = z.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1
                },
                V = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                G = O._rootFramesTimeline = new P,
                q = O._rootTimeline = new P,
                K = 30,
                J = z.lazyRender = function() {
                    var e, t = E.length;
                    for (F = {}; --t > -1;) e = E[t], e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
                    E.length = 0
                };
            q._startTime = l.time, G._startTime = l.frame, q._active = G._active = !0, setTimeout(J, 1), O._updateRoot = L.render = function() {
                var e, t, i;
                if (E.length && J(), q.render((l.time - q._startTime) * q._timeScale, !1, !1), G.render((l.frame - G._startTime) * G._timeScale, !1, !1), E.length && J(), l.frame >= K) {
                    K = l.frame + (parseInt(L.autoSleep, 10) || 120);
                    for (i in X) {
                        for (t = X[i].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
                        0 === t.length && delete X[i]
                    }
                    if (i = q._first, (!i || i._paused) && L.autoSleep && !G._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", O._updateRoot);
            var Z = function(e, t, i) {
                    var n, a, s = e._gsTweenID;
                    if (X[s || (e._gsTweenID = s = "t" + Y++)] || (X[s] = {
                            target: e,
                            tweens: []
                        }), t && (n = X[s].tweens, n[a = n.length] = t, i))
                        for (; --a > -1;) n[a] === t && n.splice(a, 1);
                    return X[s].tweens
                },
                $ = function(e, t, i, n) {
                    var a, s, o = e.vars.onOverwrite;
                    return o && (a = o(e, t, i, n)), o = L.onOverwrite, o && (s = o(e, t, i, n)), a !== !1 && s !== !1
                },
                Q = function(e, t, i, n, a) {
                    var s, o, r, l;
                    if (1 === n || n >= 4) {
                        for (l = a.length, s = 0; l > s; s++)
                            if ((r = a[s]) !== t) r._gc || r._kill(null, e, t) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var d, u = t._startTime + h,
                        c = [],
                        p = 0,
                        m = 0 === t._duration;
                    for (s = a.length; --s > -1;)(r = a[s]) === t || r._gc || r._paused || (r._timeline !== t._timeline ? (d = d || ee(t, 0, m), 0 === ee(r, d, m) && (c[p++] = r)) : r._startTime <= u && r._startTime + r.totalDuration() / r._timeScale > u && ((m || !r._initted) && u - r._startTime <= 2e-10 || (c[p++] = r)));
                    for (s = p; --s > -1;)
                        if (r = c[s],
                            2 === n && r._kill(i, e, t) && (o = !0), 2 !== n || !r._firstPT && r._initted) {
                            if (2 !== n && !$(r, t)) continue;
                            r._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                ee = function(e, t, i) {
                    for (var n = e._timeline, a = n._timeScale, s = e._startTime; n._timeline;) {
                        if (s += n._startTime, a *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= a, s > t ? s - t : i && s === t || !e._initted && 2 * h > s - t ? h : (s += e.totalDuration() / e._timeScale / a) > t + h ? 0 : s - t - h
                };
            r._init = function() {
                var e, t, i, n, a, s, o = this.vars,
                    r = this._overwrittenProps,
                    l = this._duration,
                    d = !!o.immediateRender,
                    u = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), a = {};
                    for (n in o.startAt) a[n] = o.startAt[n];
                    if (a.overwrite = !1, a.immediateRender = !0, a.lazy = d && o.lazy !== !1, a.startAt = a.delay = null, this._startAt = L.to(this.target, 0, a), d)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (d = !1), i = {};
                        for (n in o) U[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = d && o.lazy !== !1, i.immediateRender = d, this._startAt = L.to(this.target, 0, i), d) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = u = u ? u instanceof b ? u : "function" == typeof u ? new b(u, o.easeParams) : C[u] || L.defaultEase : L.defaultEase, o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, e = 0; s > e; e++) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], r ? r[e] : null, e) && (t = !0);
                else t = this._initProps(this.target, this._propLookup, this._siblings, r, 0);
                if (t && L._onPluginEvent("_onInitAllProps", this), r && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, r._initProps = function(t, i, n, a, s) {
                var o, r, l, d, u, c;
                if (null == t) return !1;
                F[t._gsTweenID] && J(), this.vars.css || t.style && t !== e && t.nodeType && j.css && this.vars.autoCSS !== !1 && N(this.vars, t);
                for (o in this.vars)
                    if (c = this.vars[o], U[o]) c && (c instanceof Array || c.push && g(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this));
                    else if (j[o] && (d = new j[o])._onInitTween(t, this.vars[o], this, s)) {
                    for (this._firstPT = u = {
                            _next: this._firstPT,
                            t: d,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: d._priority,
                            m: 0
                        }, r = d._overwriteProps.length; --r > -1;) i[d._overwriteProps[r]] = this._firstPT;
                    (d._priority || d._onInitAllProps) && (l = !0), (d._onDisable || d._onEnable) && (this._notifyPluginsOfEnabled = !0), u._next && (u._next._prev = u)
                } else i[o] = W.call(this, t, o, "get", c, o, 0, null, this.vars.stringFilter, s);
                return a && this._kill(a, t) ? this._initProps(t, i, n, a, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && Q(t, this, i, this._overwrite, n) ? (this._kill(i, t), this._initProps(t, i, n, a, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (F[t._gsTweenID] = !0), l)
            }, r.render = function(e, t, i) {
                var n, a, s, o, r = this._time,
                    l = this._duration,
                    d = this._rawPrevTime;
                if (e >= l - 1e-7 && e >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, a = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (0 > d || 0 >= e && e >= -1e-7 || d === h && "isPause" !== this.data) && d !== e && (i = !0, d > h && (a = "onReverseComplete")), this._rawPrevTime = o = !t || e || d === e ? e : h);
                else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== r || 0 === l && d > 0) && (a = "onReverseComplete", n = this._reversed), 0 > e && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (d >= 0 && (d !== h || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !t || e || d === e ? e : h)), this._initted || (i = !0);
                else if (this._totalTime = this._time = e, this._easeType) {
                    var u = e / l,
                        c = this._easeType,
                        p = this._easePower;
                    (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === p ? u *= u : 2 === p ? u *= u * u : 3 === p ? u *= u * u * u : 4 === p && (u *= u * u * u * u), 1 === c ? this.ratio = 1 - u : 2 === c ? this.ratio = u : .5 > e / l ? this.ratio = u / 2 : this.ratio = 1 - u / 2
                } else this.ratio = this._ease.getRatio(e / l);
                if (this._time !== r || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = r, this._rawPrevTime = d, E.push(this), void(this._lazy = [e, t]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== r && e >= 0 && (this._active = !0), 0 === r && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : a || (a = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (0 > e && this._startAt && e !== -1e-4 && this._startAt.render(e, t, i), t || (this._time !== r || n || i) && this._callback("onUpdate")), a && (!this._gc || i) && (0 > e && this._startAt && !this._onUpdate && e !== -1e-4 && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[a] && this._callback(a), 0 === l && this._rawPrevTime === h && o !== h && (this._rawPrevTime = 0))
                }
            }, r._kill = function(e, t, i) {
                if ("all" === e && (e = null), null == e && (null == t || t === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                t = "string" != typeof t ? t || this._targets || this.target : L.selector(t) || t;
                var n, a, s, o, r, l, d, u, c, h = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((g(t) || I(t)) && "number" != typeof t[0])
                    for (n = t.length; --n > -1;) this._kill(e, t[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (t === this._targets[n]) {
                                r = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], a = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (t !== this.target) return !1;
                        r = this._propLookup, a = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                    }
                    if (r) {
                        if (d = e || r, u = e !== a && "all" !== a && e !== r && ("object" != typeof e || !e._tempKill), i && (L.onOverwrite || this.vars.onOverwrite)) {
                            for (s in d) r[s] && (c || (c = []), c.push(s));
                            if ((c || !e) && !$(this, i, t, c)) return !1
                        }
                        for (s in d)(o = r[s]) && (h && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(d) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete r[s]), u && (a[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, r.invalidate = function() {
                return this._notifyPluginsOfEnabled && L._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], O.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -h, this.render(Math.min(0, -this._delay))), this
            }, r._enabled = function(e, t) {
                if (d || l.wake(), e && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = Z(n[i], this, !0);
                    else this._siblings = Z(this.target, this, !0)
                }
                return O.prototype._enabled.call(this, e, t), !(!this._notifyPluginsOfEnabled || !this._firstPT) && L._onPluginEvent(e ? "_onEnable" : "_onDisable", this)
            }, L.to = function(e, t, i) {
                return new L(e, t, i)
            }, L.from = function(e, t, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new L(e, t, i)
            }, L.fromTo = function(e, t, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new L(e, t, n)
            }, L.delayedCall = function(e, t, i, n, a) {
                return new L(t, 0, {
                    delay: e,
                    onComplete: t,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: t,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: a,
                    overwrite: 0
                })
            }, L.set = function(e, t) {
                return new L(e, 0, t)
            }, L.getTweensOf = function(e, t) {
                if (null == e) return [];
                e = "string" != typeof e ? e : L.selector(e) || e;
                var i, n, a, s;
                if ((g(e) || I(e)) && "number" != typeof e[0]) {
                    for (i = e.length, n = []; --i > -1;) n = n.concat(L.getTweensOf(e[i], t));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], a = i; --a > -1;) s === n[a] && n.splice(i, 1)
                } else
                    for (n = Z(e).concat(), i = n.length; --i > -1;)(n[i]._gc || t && !n[i].isActive()) && n.splice(i, 1);
                return n
            }, L.killTweensOf = L.killDelayedCallsTo = function(e, t, i) {
                "object" == typeof t && (i = t, t = !1);
                for (var n = L.getTweensOf(e, t), a = n.length; --a > -1;) n[a]._kill(i, e)
            };
            var te = y("plugins.TweenPlugin", function(e, t) {
                this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = te.prototype
            }, !0);
            if (r = te.prototype, te.version = "1.19.0", te.API = 2, r._firstPT = null, r._addTween = W, r.setRatio = H, r._kill = function(e) {
                    var t, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != e[this._propName]) this._overwriteProps = [];
                    else
                        for (t = i.length; --t > -1;) null != e[i[t]] && i.splice(t, 1);
                    for (; n;) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, r._mod = r._roundProps = function(e) {
                    for (var t, i = this._firstPT; i;) t = e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")], t && "function" == typeof t && (2 === i.f ? i.t._applyPT.m = t : i.m = t), i = i._next
                }, L._onPluginEvent = function(e, t) {
                    var i, n, a, s, o, r = t._firstPT;
                    if ("_onInitAllProps" === e) {
                        for (; r;) {
                            for (o = r._next, n = a; n && n.pr > r.pr;) n = n._next;
                            (r._prev = n ? n._prev : s) ? r._prev._next = r: a = r, (r._next = n) ? n._prev = r : s = r, r = o
                        }
                        r = t._firstPT = a
                    }
                    for (; r;) r.pg && "function" == typeof r.t[e] && r.t[e]() && (i = !0), r = r._next;
                    return i
                }, te.activate = function(e) {
                    for (var t = e.length; --t > -1;) e[t].API === te.API && (j[(new e[t])._propName] = e[t]);
                    return !0
                }, v.plugin = function(e) {
                    if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
                    var t, i = e.propName,
                        n = e.priority || 0,
                        a = e.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        o = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            te.call(this, i, n), this._overwriteProps = a || []
                        }, e.global === !0),
                        r = o.prototype = new te(i);
                    r.constructor = o, o.API = e.API;
                    for (t in s) "function" == typeof e[t] && (r[s[t]] = e[t]);
                    return o.version = e.version, te.activate([o]), o
                }, s = e._gsQueue) {
                for (o = 0; o < s.length; o++) s[o]();
                for (r in f) f[r].func || e.console.log("GSAP encountered missing dependency: " + r)
            }
            d = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(e, t, i) {
            var n = function(t) {
                    e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0
                },
                a = 1e-10,
                s = t._internals,
                o = s.lazyTweens,
                r = s.lazyRender,
                l = _gsScope._gsDefine.globals,
                d = new i(null, null, 1, 0),
                u = n.prototype = new e;
            return u.constructor = n, u.kill()._gc = !1, n.version = "1.19.1", u.invalidate = function() {
                return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
            }, u.addCallback = function(e, i, n, a) {
                return this.add(t.delayedCall(0, e, n, a), i)
            }, u.removeCallback = function(e, t) {
                if (e)
                    if (null == t) this._kill(null, e);
                    else
                        for (var i = this.getTweensOf(e, !1), n = i.length, a = this._parseTimeOrLabel(t); --n > -1;) i[n]._startTime === a && i[n]._enabled(!1, !1);
                return this
            }, u.removePause = function(t) {
                return this.removeCallback(e._internals.pauseCallback, t)
            }, u.tweenTo = function(e, i) {
                i = i || {};
                var n, a, s, o = {
                        ease: d,
                        useFrames: this.usesFrames(),
                        immediateRender: !1
                    },
                    r = i.repeat && l.TweenMax || t;
                for (a in i) o[a] = i[a];
                return o.time = this._parseTimeOrLabel(e), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new r(this, n, o), o.onStart = function() {
                    s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                }, s
            }, u.tweenFromTo = function(e, t, i) {
                i = i || {}, e = this._parseTimeOrLabel(e), i.startAt = {
                    onComplete: this.seek,
                    onCompleteParams: [e],
                    callbackScope: this
                }, i.immediateRender = i.immediateRender !== !1;
                var n = this.tweenTo(t, i);
                return n.duration(Math.abs(n.vars.time - e) / this._timeScale || .001)
            }, u.render = function(e, t, i) {
                this._gc && this._enabled(!0, !1);
                var n, s, l, d, u, c, h, p, m = this._dirty ? this.totalDuration() : this._totalDuration,
                    g = this._duration,
                    f = this._time,
                    _ = this._totalTime,
                    v = this._startTime,
                    y = this._timeScale,
                    w = this._rawPrevTime,
                    b = this._paused,
                    C = this._cycle;
                if (e >= m - 1e-7 && e >= 0) this._locked || (this._totalTime = m, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, d = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || 0 > w || w === a) && w !== e && this._first && (u = !0, w > a && (d = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : a, this._yoyo && 0 !== (1 & this._cycle) ? this._time = e = 0 : (this._time = g, e = g + 1e-4);
                else if (1e-7 > e)
                    if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== f || 0 === g && w !== a && (w > 0 || 0 > e && w >= 0) && !this._locked) && (d = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = s = !0, d = "onReverseComplete") : w >= 0 && this._first && (u = !0), this._rawPrevTime = e;
                    else {
                        if (this._rawPrevTime = g || !t || e || this._rawPrevTime === e ? e : a, 0 === e && s)
                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                        e = 0, this._initted || (u = !0)
                    } else if (0 === g && 0 > w && (u = !0), this._time = this._rawPrevTime = e, this._locked || (this._totalTime = e, 0 !== this._repeat && (c = g + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && e >= _ && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 !== (1 & this._cycle) && (this._time = g - this._time), this._time > g ? (this._time = g, e = g + 1e-4) : this._time < 0 ? this._time = e = 0 : e = this._time)), this._hasPause && !this._forcingPlayhead && !t && g > e) {
                    if (e = this._time, e >= f || this._repeat && C !== this._cycle)
                        for (n = this._first; n && n._startTime <= e && !h;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (h = n), n = n._next;
                    else
                        for (n = this._last; n && n._startTime >= e && !h;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (h = n), n = n._prev;
                    h && (this._time = e = h._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                if (this._cycle !== C && !this._locked) {
                    var T = this._yoyo && 0 !== (1 & C),
                        k = T === (this._yoyo && 0 !== (1 & this._cycle)),
                        x = this._totalTime,
                        S = this._cycle,
                        A = this._rawPrevTime,
                        M = this._time;
                    if (this._totalTime = C * g, this._cycle < C ? T = !T : this._totalTime += g, this._time = f, this._rawPrevTime = 0 === g ? w - 1e-4 : w, this._cycle = C, this._locked = !0, f = T ? 0 : g, this.render(f, t, 0 === g), t || this._gc || this.vars.onRepeat && (this._cycle = S, this._locked = !1, this._callback("onRepeat")), f !== this._time) return;
                    if (k && (this._cycle = C, this._locked = !0, f = T ? g + 1e-4 : -1e-4, this.render(f, !0, !1)), this._locked = !1, this._paused && !b) return;
                    this._time = M, this._totalTime = x, this._cycle = S, this._rawPrevTime = A
                }
                if (!(this._time !== f && this._first || i || u || h)) return void(_ !== this._totalTime && this._onUpdate && (t || this._callback("onUpdate")));
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== _ && e > 0 && (this._active = !0), 0 === _ && this.vars.onStart && (0 === this._totalTime && this._totalDuration || t || this._callback("onStart")), p = this._time, p >= f)
                    for (n = this._first; n && (l = n._next, p === this._time && (!this._paused || b));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (h === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = l;
                else
                    for (n = this._last; n && (l = n._prev, p === this._time && (!this._paused || b));) {
                        if (n._active || n._startTime <= f && !n._paused && !n._gc) {
                            if (h === n) {
                                for (h = n._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (e - h._startTime) * h._timeScale : (e - h._startTime) * h._timeScale, t, i), h = h._prev;
                                h = null, this.pause()
                            }
                            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
                        }
                        n = l
                    }
                this._onUpdate && (t || (o.length && r(), this._callback("onUpdate"))), d && (this._locked || this._gc || (v === this._startTime || y !== this._timeScale) && (0 === this._time || m >= this.totalDuration()) && (s && (o.length && r(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[d] && this._callback(d)))
            }, u.getActive = function(e, t, i) {
                null == e && (e = !0), null == t && (t = !0), null == i && (i = !1);
                var n, a, s = [],
                    o = this.getChildren(e, t, i),
                    r = 0,
                    l = o.length;
                for (n = 0; l > n; n++) a = o[n], a.isActive() && (s[r++] = a);
                return s
            }, u.getLabelAfter = function(e) {
                e || 0 !== e && (e = this._time);
                var t, i = this.getLabelsArray(),
                    n = i.length;
                for (t = 0; n > t; t++)
                    if (i[t].time > e) return i[t].name;
                return null
            }, u.getLabelBefore = function(e) {
                null == e && (e = this._time);
                for (var t = this.getLabelsArray(), i = t.length; --i > -1;)
                    if (t[i].time < e) return t[i].name;
                return null
            }, u.getLabelsArray = function() {
                var e, t = [],
                    i = 0;
                for (e in this._labels) t[i++] = {
                    time: this._labels[e],
                    name: e
                };
                return t.sort(function(e, t) {
                    return e.time - t.time
                }), t
            }, u.invalidate = function() {
                return this._locked = !1, e.prototype.invalidate.call(this)
            }, u.progress = function(e, t) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - e : e) + this._cycle * (this._duration + this._repeatDelay), t) : this._time / this.duration()
            }, u.totalProgress = function(e, t) {
                return arguments.length ? this.totalTime(this.totalDuration() * e, t) : this._totalTime / this.totalDuration()
            }, u.totalDuration = function(t) {
                return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
            }, u.time = function(e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), e > this._duration && (e = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? e = this._duration - e + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (e += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(e, t)) : this._time
            }, u.repeat = function(e) {
                return arguments.length ? (this._repeat = e, this._uncache(!0)) : this._repeat
            }, u.repeatDelay = function(e) {
                return arguments.length ? (this._repeatDelay = e, this._uncache(!0)) : this._repeatDelay
            }, u.yoyo = function(e) {
                return arguments.length ? (this._yoyo = e, this) : this._yoyo
            }, u.currentLabel = function(e) {
                return arguments.length ? this.seek(e, !0) : this.getLabelBefore(this._time + 1e-8)
            }, n
        }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(e, t, i) {
            var n = function(e) {
                    t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                    var i, n, a = this.vars;
                    for (n in a) i = a[n], l(i) && -1 !== i.join("").indexOf("{self}") && (a[n] = this._swapSelfInParams(i));
                    l(a.tweens) && this.add(a.tweens, 0, a.align, a.stagger)
                },
                a = 1e-10,
                s = i._internals,
                o = n._internals = {},
                r = s.isSelector,
                l = s.isArray,
                d = s.lazyTweens,
                u = s.lazyRender,
                c = _gsScope._gsDefine.globals,
                h = function(e) {
                    var t, i = {};
                    for (t in e) i[t] = e[t];
                    return i
                },
                p = function(e, t, i) {
                    var n, a, s = e.cycle;
                    for (n in s) a = s[n], e[n] = "function" == typeof a ? a(i, t[i]) : a[i % a.length];
                    delete e.cycle
                },
                m = o.pauseCallback = function() {},
                g = function(e) {
                    var t, i = [],
                        n = e.length;
                    for (t = 0; t !== n; i.push(e[t++]));
                    return i
                },
                f = n.prototype = new t;
            return n.version = "1.19.1", f.constructor = n, f.kill()._gc = f._forcingPlayhead = f._hasPause = !1, f.to = function(e, t, n, a) {
                var s = n.repeat && c.TweenMax || i;
                return t ? this.add(new s(e, t, n), a) : this.set(e, n, a)
            }, f.from = function(e, t, n, a) {
                return this.add((n.repeat && c.TweenMax || i).from(e, t, n), a)
            }, f.fromTo = function(e, t, n, a, s) {
                var o = a.repeat && c.TweenMax || i;
                return t ? this.add(o.fromTo(e, t, n, a), s) : this.set(e, a, s)
            }, f.staggerTo = function(e, t, a, s, o, l, d, u) {
                var c, m, f = new n({
                        onComplete: l,
                        onCompleteParams: d,
                        callbackScope: u,
                        smoothChildTiming: this.smoothChildTiming
                    }),
                    _ = a.cycle;
                for ("string" == typeof e && (e = i.selector(e) || e), e = e || [], r(e) && (e = g(e)), s = s || 0, 0 > s && (e = g(e), e.reverse(), s *= -1), m = 0; m < e.length; m++) c = h(a), c.startAt && (c.startAt = h(c.startAt), c.startAt.cycle && p(c.startAt, e, m)), _ && (p(c, e, m), null != c.duration && (t = c.duration, delete c.duration)), f.to(e[m], t, c, m * s);
                return this.add(f, o)
            }, f.staggerFrom = function(e, t, i, n, a, s, o, r) {
                return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(e, t, i, n, a, s, o, r)
            }, f.staggerFromTo = function(e, t, i, n, a, s, o, r, l) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(e, t, n, a, s, o, r, l)
            }, f.call = function(e, t, n, a) {
                return this.add(i.delayedCall(0, e, t, n), a)
            }, f.set = function(e, t, n) {
                return n = this._parseTimeOrLabel(n, 0, !0), null == t.immediateRender && (t.immediateRender = n === this._time && !this._paused), this.add(new i(e, 0, t), n)
            }, n.exportRoot = function(e, t) {
                e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
                var a, s, o = new n(e),
                    r = o._timeline;
                for (null == t && (t = !0), r._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = r._time, a = r._first; a;) s = a._next, t && a instanceof i && a.target === a.vars.onComplete || o.add(a, a._startTime - a._delay), a = s;
                return r.add(o, 0), o
            }, f.add = function(a, s, o, r) {
                var d, u, c, h, p, m;
                if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, a)), !(a instanceof e)) {
                    if (a instanceof Array || a && a.push && l(a)) {
                        for (o = o || "normal", r = r || 0, d = s, u = a.length, c = 0; u > c; c++) l(h = a[c]) && (h = new n({
                            tweens: h
                        })), this.add(h, d), "string" != typeof h && "function" != typeof h && ("sequence" === o ? d = h._startTime + h.totalDuration() / h._timeScale : "start" === o && (h._startTime -= h.delay())), d += r;
                        return this._uncache(!0)
                    }
                    if ("string" == typeof a) return this.addLabel(a, s);
                    if ("function" != typeof a) throw "Cannot add " + a + " into the timeline; it is not a tween, timeline, function, or string.";
                    a = i.delayedCall(0, a)
                }
                if (t.prototype.add.call(this, a, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                    for (p = this, m = p.rawTime() > a._startTime; p._timeline;) m && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
                return this
            }, f.remove = function(t) {
                if (t instanceof e) {
                    this._remove(t, !1);
                    var i = t._timeline = t.vars.useFrames ? e._rootFramesTimeline : e._rootTimeline;
                    return t._startTime = (t._paused ? t._pauseTime : i._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale, this
                }
                if (t instanceof Array || t && t.push && l(t)) {
                    for (var n = t.length; --n > -1;) this.remove(t[n]);
                    return this
                }
                return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
            }, f._remove = function(e, i) {
                t.prototype._remove.call(this, e, i);
                var n = this._last;
                return n ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
            }, f.append = function(e, t) {
                return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
            }, f.insert = f.insertMultiple = function(e, t, i, n) {
                return this.add(e, t || 0, i, n)
            }, f.appendMultiple = function(e, t, i, n) {
                return this.add(e, this._parseTimeOrLabel(null, t, !0, e), i, n)
            }, f.addLabel = function(e, t) {
                return this._labels[e] = this._parseTimeOrLabel(t), this
            }, f.addPause = function(e, t, n, a) {
                var s = i.delayedCall(0, m, n, a || this);
                return s.vars.onComplete = s.vars.onReverseComplete = t, s.data = "isPause", this._hasPause = !0, this.add(s, e)
            }, f.removeLabel = function(e) {
                return delete this._labels[e], this
            }, f.getLabelTime = function(e) {
                return null != this._labels[e] ? this._labels[e] : -1
            }, f._parseTimeOrLabel = function(t, i, n, a) {
                var s;
                if (a instanceof e && a.timeline === this) this.remove(a);
                else if (a && (a instanceof Array || a.push && l(a)))
                    for (s = a.length; --s > -1;) a[s] instanceof e && a[s].timeline === this && this.remove(a[s]);
                if ("string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof t && null == this._labels[i] ? t - this.duration() : 0, n);
                if (i = i || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
                else {
                    if (s = t.indexOf("="), -1 === s) return null == this._labels[t] ? n ? this._labels[t] = this.duration() + i : i : this._labels[t] + i;
                    i = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, n) : this.duration()
                }
                return Number(t) + i
            }, f.seek = function(e, t) {
                return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
            }, f.stop = function() {
                return this.paused(!0)
            }, f.gotoAndPlay = function(e, t) {
                return this.play(e, t)
            }, f.gotoAndStop = function(e, t) {
                return this.pause(e, t)
            }, f.render = function(e, t, i) {
                this._gc && this._enabled(!0, !1);
                var n, s, o, r, l, c, h, p = this._dirty ? this.totalDuration() : this._totalDuration,
                    m = this._time,
                    g = this._startTime,
                    f = this._timeScale,
                    _ = this._paused;
                if (e >= p - 1e-7 && e >= 0) this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (s = !0, r = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= e && e >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === a) && this._rawPrevTime !== e && this._first && (l = !0, this._rawPrevTime > a && (r = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : a, e = p + 1e-4;
                else if (1e-7 > e)
                    if (this._totalTime = this._time = 0, (0 !== m || 0 === this._duration && this._rawPrevTime !== a && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (r = "onReverseComplete", s = this._reversed), 0 > e) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, r = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = e;
                    else {
                        if (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : a, 0 === e && s)
                            for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                        e = 0, this._initted || (l = !0)
                    } else {
                    if (this._hasPause && !this._forcingPlayhead && !t) {
                        if (e >= m)
                            for (n = this._first; n && n._startTime <= e && !c;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (c = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= e && !c;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (c = n), n = n._prev;
                        c && (this._time = e = c._startTime, this._totalTime = e + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    this._totalTime = this._time = this._rawPrevTime = e
                }
                if (this._time !== m && this._first || i || l || c) {
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== m && e > 0 && (this._active = !0), 0 === m && this.vars.onStart && (0 === this._time && this._duration || t || this._callback("onStart")), h = this._time, h >= m)
                        for (n = this._first; n && (o = n._next, h === this._time && (!this._paused || _));)(n._active || n._startTime <= h && !n._paused && !n._gc) && (c === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)), n = o;
                    else
                        for (n = this._last; n && (o = n._prev, h === this._time && (!this._paused || _));) {
                            if (n._active || n._startTime <= m && !n._paused && !n._gc) {
                                if (c === n) {
                                    for (c = n._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (e - c._startTime) * c._timeScale : (e - c._startTime) * c._timeScale, t, i), c = c._prev;
                                    c = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (e - n._startTime) * n._timeScale, t, i) : n.render((e - n._startTime) * n._timeScale, t, i)
                            }
                            n = o
                        }
                    this._onUpdate && (t || (d.length && u(), this._callback("onUpdate"))), r && (this._gc || (g === this._startTime || f !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (d.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this._callback(r)))
                }
            }, f._hasPausedChild = function() {
                for (var e = this._first; e;) {
                    if (e._paused || e instanceof n && e._hasPausedChild()) return !0;
                    e = e._next
                }
                return !1
            }, f.getChildren = function(e, t, n, a) {
                a = a || -9999999999;
                for (var s = [], o = this._first, r = 0; o;) o._startTime < a || (o instanceof i ? t !== !1 && (s[r++] = o) : (n !== !1 && (s[r++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, n)), r = s.length))), o = o._next;
                return s
            }, f.getTweensOf = function(e, t) {
                var n, a, s = this._gc,
                    o = [],
                    r = 0;
                for (s && this._enabled(!0, !0), n = i.getTweensOf(e), a = n.length; --a > -1;)(n[a].timeline === this || t && this._contains(n[a])) && (o[r++] = n[a]);
                return s && this._enabled(!1, !0), o
            }, f.recent = function() {
                return this._recent
            }, f._contains = function(e) {
                for (var t = e.timeline; t;) {
                    if (t === this) return !0;
                    t = t.timeline
                }
                return !1
            }, f.shiftChildren = function(e, t, i) {
                i = i || 0;
                for (var n, a = this._first, s = this._labels; a;) a._startTime >= i && (a._startTime += e), a = a._next;
                if (t)
                    for (n in s) s[n] >= i && (s[n] += e);
                return this._uncache(!0)
            }, f._kill = function(e, t) {
                if (!e && !t) return this._enabled(!1, !1);
                for (var i = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), n = i.length, a = !1; --n > -1;) i[n]._kill(e, t) && (a = !0);
                return a
            }, f.clear = function(e) {
                var t = this.getChildren(!1, !0, !0),
                    i = t.length;
                for (this._time = this._totalTime = 0; --i > -1;) t[i]._enabled(!1, !1);
                return e !== !1 && (this._labels = {}), this._uncache(!0)
            }, f.invalidate = function() {
                for (var t = this._first; t;) t.invalidate(), t = t._next;
                return e.prototype.invalidate.call(this)
            }, f._enabled = function(e, i) {
                if (e === this._gc)
                    for (var n = this._first; n;) n._enabled(e, !0), n = n._next;
                return t.prototype._enabled.call(this, e, i)
            }, f.totalTime = function(t, i, n) {
                this._forcingPlayhead = !0;
                var a = e.prototype.totalTime.apply(this, arguments);
                return this._forcingPlayhead = !1, a
            }, f.duration = function(e) {
                return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
            }, f.totalDuration = function(e) {
                if (!arguments.length) {
                    if (this._dirty) {
                        for (var t, i, n = 0, a = this._last, s = 999999999999; a;) t = a._prev, a._dirty && a.totalDuration(), a._startTime > s && this._sortChildren && !a._paused ? this.add(a, a._startTime - a._delay) : s = a._startTime, a._startTime < 0 && !a._paused && (n -= a._startTime, this._timeline.smoothChildTiming && (this._startTime += a._startTime / this._timeScale), this.shiftChildren(-a._startTime, !1, -9999999999), s = 0), i = a._startTime + a._totalDuration / a._timeScale, i > n && (n = i), a = t;
                        this._duration = this._totalDuration = n, this._dirty = !1
                    }
                    return this._totalDuration
                }
                return e && this.totalDuration() ? this.timeScale(this._totalDuration / e) : this
            }, f.paused = function(t) {
                if (!t)
                    for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                return e.prototype.paused.apply(this, arguments)
            }, f.usesFrames = function() {
                for (var t = this._timeline; t._timeline;) t = t._timeline;
                return t === e._rootFramesTimeline
            }, f.rawTime = function(e) {
                return e && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(e) - this._startTime) * this._timeScale
            }, n
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "function" == typeof define && define.amd ? define("TimelineMax",["TweenLite"], t) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = t())
    }("TimelineMax"), "function" != typeof Object.create && (Object.create = function(e) {
        var t = function() {};
        return function(i, n) {
            if (i !== Object(i) && null !== i) throw TypeError("Argument must be an object, or null");
            t.prototype = i || {};
            var a = new t;
            return t.prototype = null, n !== e && Object.defineProperties(a, n), null === i && (a.__proto__ = null), a
        }
    }()), String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
    }),
    function(e) {
        "function" == typeof define && define.amd ? define("BestDayEmbed",["jquery", "BestDaySocialLikes"], e) : e(jQuery)
    }(function($x, e) {
        "use strict";
        var i = $("#embed");
        $(".embedLink").on("click", function(e) {
            e.preventDefault(), i.hasClass("visible") ? i.animate({
                bottom: "-200px"
            }, 200).fadeOut({
                queue: !1
            }, 200).removeClass("visible") : i.animate({
                bottom: "10px"
            }, 300).fadeIn({
                queue: !1
            }, 300).addClass("visible")
        })
    }),
    function(e) {
        "function" == typeof define && define.amd ? define("BestDaySocialLikes",["jquery"], e) : e(jQuery)
    }(function($x, e) {
        "use strict";

        function t(e, t) {
            this.container = e, this.options = t, this.init()
        }

        function i(e, t) {
            this.widget = e, this.options = $.extend({}, t), this.detectService(), this.service && this.init()
        }

        function n(e) {
            function t(e, t) {
                return t.toUpper()
            }
            var i = {},
                n = e.data();
            for (var a in n) {
                var s = n[a];
                "yes" === s ? s = !0 : "no" === s && (s = !1), i[a.replace(/-(\w)/g, t)] = s
            }
            return i
        }

        function a(e, t) {
            return s(e, t, encodeURIComponent)
        }

        function s(e, t, i) {
            return e.replace(/\{([^}]+)\}/g, function(e, n) {
                return n in t ? i ? i(t[n]) : t[n] : e
            })
        }

        function o(e, t) {
            var i = u + e;
            return i + " " + i + "_" + t
        }

        function r(e, t) {
            function i(s) {
                "keydown" === s.type && 27 !== s.which || $(s.target).closest(e).length || (e.removeClass(c), n.off(a, i), $.isFunction(t) && t())
            }
            var n = $(document),
                a = "click touchstart keydown";
            n.on(a, i)
        }

        function l(e) {
            var t = 10;
            if (document.documentElement.getBoundingClientRect) {
                var i = parseInt(e.css("left"), 10),
                    n = parseInt(e.css("top"), 10),
                    a = e[0].getBoundingClientRect();
                a.left < t ? e.css("left", t - a.left + i) : a.right > window.innerWidth - t && e.css("left", window.innerWidth - a.right - t + i), a.top < t ? e.css("top", t - a.top + n) : a.bottom > window.innerHeight - t && e.css("top", window.innerHeight - a.bottom - t + n)
            }
            e.addClass(c)
        }
        var d = "social-likes",
            u = d + "__",
            c = d + "_opened",
            h = "https:" === location.protocol ? "https:" : "http:",
            p = {
                facebook: {
                    counterUrl: "https://graph.facebook.com/?id={url}",
                    convertNumber: function(e) {
                        return e.share.share_count
                    },
                    popupUrl: "https://www.facebook.com/sharer/sharer.php?u={url}",
                    popupWidth: 600,
                    popupHeight: 359
                },
                twitter: {
                    counters: !1,
                    popupUrl: "https://twitter.com/intent/tweet?url={url}&text={title}",
                    popupWidth: 600,
                    popupHeight: 250,
                    click: function() {
                        return /[.?:\-–—]\s*$/.test(this.options.title) || (this.options.title += ":"), !0
                    }
                },
                mailru: {
                    counterUrl: h + "//connect.mail.ru/share_count?url_list={url}&callback=1&func=?",
                    convertNumber: function(e) {
                        for (var t in e)
                            if (e.hasOwnProperty(t)) return e[t].shares
                    },
                    popupUrl: "https://connect.mail.ru/share?share_url={url}&title={title}",
                    popupWidth: 492,
                    popupHeight: 500
                },
                vkontakte: {
                    counterUrl: "https://vk.com/share.php?act=count&url={url}&index={index}",
                    counter: function(e, t) {
                        var i = p.vkontakte;
                        i._ || (i._ = [], window.VK || (window.VK = {}), window.VK.Share = {
                            count: function(e, t) {
                                i._[e].resolve(t)
                            }
                        });
                        var n = i._.length;
                        i._.push(t), $.getScript(a(e, {
                            index: n
                        })).fail(t.reject)
                    },
                    popupUrl: "https://vk.com/share.php?url={url}&title={title}",
                    popupWidth: 655,
                    popupHeight: 450
                },
                odnoklassniki: {
                    counterUrl: h + "//connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",
                    counter: function(e, t) {
                        var i = p.odnoklassniki;
                        i._ || (i._ = [], window.ODKL || (window.ODKL = {}), window.ODKL.updateCount = function(e, t) {
                            i._[e].resolve(t)
                        });
                        var n = i._.length;
                        i._.push(t), $.getScript(a(e, {
                            index: n
                        })).fail(t.reject)
                    },
                    popupUrl: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",
                    popupWidth: 580,
                    popupHeight: 336
                },
                plusone: {
                    counterUrl: h + "//share.yandex.ru/gpp.xml?url={url}&callback=?",
                    convertNumber: function(e) {
                        return parseInt(e.replace(/\D/g, ""), 10)
                    },
                    popupUrl: "https://plus.google.com/share?url={url}",
                    popupWidth: 500,
                    popupHeight: 550
                },
                pinterest: {
                    counterUrl: h + "//api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
                    convertNumber: function(e) {
                        return e.count
                    },
                    popupUrl: "https://pinterest.com/pin/create/button/?url={url}&description={title}",
                    popupWidth: 740,
                    popupHeight: 550
                }
            },
            m = {
                promises: {},
                fetch: function(e, t, i) {
                    m.promises[e] || (m.promises[e] = {});
                    var n = m.promises[e];
                    if (!i.forceUpdate && n[t]) return n[t];
                    var s = $.extend({}, p[e], i),
                        o = $.Deferred(),
                        r = s.counterUrl && a(s.counterUrl, {
                            url: t
                        });
                    return r && $.isFunction(s.counter) ? s.counter(r, o) : s.counterUrl ? $.getJSON(r).done(function(e) {
                        try {
                            var t = e;
                            $.isFunction(s.convertNumber) && (t = s.convertNumber(e)), o.resolve(t)
                        } catch (e) {
                            o.reject()
                        }
                    }).fail(o.reject) : o.reject(), n[t] = o.promise(), n[t]
                }
            };
        $.fn.socialLikes = function(e) {
            return this.each(function() {
                var i = $(this),
                    a = i.data(d);
                a ? $.isPlainObject(e) && a.update(e) : (a = new t(i, $.extend({}, $.fn.socialLikes.defaults, e, n(i))), i.data(d, a))
            })
        }, $.fn.socialLikes.defaults = {
            url: window.location.href.replace(window.location.hash, ""),
            title: document.title,
            counters: !0,
            zeroes: !1,
            wait: 500,
            timeout: 1e4,
            popupCheckInterval: 500,
            singleTitle: "Share"
        }, t.prototype = {
            init: function() {
                this.container.addClass(d), this.single = this.container.hasClass(d + "_single"), this.initUserButtons(), this.countersLeft = 0, this.number = 0, this.container.on("counter." + d, $.proxy(this.updateCounter, this));
                var e = this.container.children();
                this.makeSingleButton(), this.buttons = [], e.each($.proxy(function(e, t) {
                    var n = new i($(t), this.options);
                    this.buttons.push(n), n.options.counterUrl && this.countersLeft++
                }, this)), this.options.counters ? (this.timer = setTimeout($.proxy(this.appear, this), this.options.wait), this.timeout = setTimeout($.proxy(this.ready, this, !0), this.options.timeout)) : this.appear()
            },
            initUserButtons: function() {
                !this.userButtonInited && window.socialLikesButtons && $.extend(!0, p, socialLikesButtons), this.userButtonInited = !0
            },
            makeSingleButton: function() {
                if (this.single) {
                    var e = this.container;
                    e.addClass(d + "_vertical"), e.wrap($("<div>", {
                        class: d + "_single-w"
                    })), e.wrapInner($("<div>", {
                        class: d + "__single-container"
                    }));
                    var t = e.parent(),
                        i = $("<div>", {
                            class: o("widget", "single")
                        }),
                        n = $(s('<div class="{buttonCls}"><span class="{iconCls}"></span>{title}</div>', {
                            buttonCls: o("button", "single"),
                            iconCls: o("icon", "single"),
                            title: this.options.singleTitle
                        }));
                    i.append(n), t.append(i), i.on("click", function() {
                        var t = d + "__widget_active";
                        return i.toggleClass(t), i.hasClass(t) ? (e.css({
                            left: -(e.width() - i.width()) / 2,
                            top: -e.height()
                        }), l(e), r(e, function() {
                            i.removeClass(t)
                        })) : e.removeClass(c), !1
                    }), this.widget = i
                }
            },
            update: function(e) {
                if (e.forceUpdate || e.url !== this.options.url) {
                    this.number = 0, this.countersLeft = this.buttons.length, this.widget && this.widget.find("." + d + "__counter").remove(), $.extend(this.options, e);
                    for (var t = 0; t < this.buttons.length; t++) this.buttons[t].update(e)
                }
            },
            updateCounter: function(e, t, i) {
                i = i || 0, (i || this.options.zeroes) && (this.number += i, this.single && this.getCounterElem().text(this.number)), this.countersLeft--, 0 === this.countersLeft && (this.appear(), this.ready())
            },
            appear: function() {
                this.container.addClass(d + "_visible")
            },
            ready: function(e) {
                this.timeout && clearTimeout(this.timeout), this.container.addClass(d + "_ready"), e || this.container.trigger("ready." + d, this.number)
            },
            getCounterElem: function() {
                var e = this.widget.find("." + u + "counter_single");
                return e.length || (e = $("<span>", {
                    class: o("counter", "single")
                }), this.widget.append(e)), e
            }
        }, i.prototype = {
            init: function() {
                this.detectParams(), this.initHtml(), setTimeout($.proxy(this.initCounter, this), 0)
            },
            update: function(e) {
                $.extend(this.options, {
                    forceUpdate: !1
                }, e), this.widget.find("." + d + "__counter").remove(), this.initCounter()
            },
            detectService: function() {
                var e = this.widget.data("service");
                if (!e) {
                    for (var t = this.widget[0], i = t.classList || t.className.split(" "), n = 0; n < i.length; n++) {
                        var a = i[n];
                        if (p[a]) {
                            e = a;
                            break
                        }
                    }
                    if (!e) return
                }
                this.service = e, $.extend(this.options, p[e])
            },
            detectParams: function() {
                var e = this.widget.data();
                if (e.counter) {
                    var t = parseInt(e.counter, 10);
                    isNaN(t) ? this.options.counterUrl = e.counter : this.options.counterNumber = t
                }
                e.title && (this.options.title = e.title), e.url && (this.options.url = e.url)
            },
            initHtml: function() {
                var e = this.options,
                    t = this.widget,
                    i = t.find("a");
                i.length && this.cloneDataAttrs(i, t);
                var n = $("<span>", {
                    class: this.getElementClassNames("button"),
                    html: t.html()
                });
                if (e.clickUrl) {
                    var s = a(e.clickUrl, {
                            url: e.url,
                            title: e.title
                        }),
                        o = $("<a>", {
                            href: s
                        });
                    this.cloneDataAttrs(t, o), t.replaceWith(o), this.widget = t = o
                } else t.on("click", $.proxy(this.click, this));
                t.removeClass(this.service), t.addClass(this.getElementClassNames("widget")), n.prepend($("<span>", {
                    class: this.getElementClassNames("icon")
                })), t.empty().append(n), this.button = n
            },
            initCounter: function() {
                if (this.options.counters)
                    if (this.options.counterNumber) this.updateCounter(this.options.counterNumber);
                    else {
                        var e = {
                            counterUrl: this.options.counterUrl,
                            forceUpdate: this.options.forceUpdate
                        };
                        m.fetch(this.service, this.options.url, e).always($.proxy(this.updateCounter, this))
                    }
            },
            cloneDataAttrs: function(e, t) {
                var i = e.data();
                for (var n in i) i.hasOwnProperty(n) && t.data(n, i[n])
            },
            getElementClassNames: function(e) {
                return o(e, this.service)
            },
            updateCounter: function(e) {
                e = parseInt(e, 10) || 0;
                var t = {
                    class: this.getElementClassNames("counter"),
                    text: e
                };
                e || this.options.zeroes || (t.class += " " + d + "__counter_empty", t.text = "");
                var i = $("<span>", t);
                this.widget.append(i), this.widget.trigger("counter." + d, [this.service, e])
            },
            click: function(e) {
                var t = this.options,
                    i = !0;
                if ($.isFunction(t.click) && (i = t.click.call(this, e)), i) {
                    var n = a(t.popupUrl, {
                        url: t.url,
                        title: t.title
                    });
                    n = this.addAdditionalParamsToUrl(n), this.openPopup(n, {
                        width: t.popupWidth,
                        height: t.popupHeight
                    })
                }
                return !1
            },
            addAdditionalParamsToUrl: function(e) {
                var t = $.param($.extend(this.widget.data(), this.options.data));
                if ($.isEmptyObject(t)) return e;
                var i = e.indexOf("?") === -1 ? "?" : "&";
                return e + i + t
            },
            openPopup: function(t, i) {
                var n = window.screenLeft !== e ? window.screenLeft : screen.left,
                    a = window.screenTop !== e ? window.screenTop : screen.top,
                    s = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                    o = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                    r = Math.round(s / 2 - i.width / 2) + n,
                    l = 0;
                o > i.height && (l = Math.round(o / 3 - i.height / 2) + a);
                var u = window.open(t, "sl_" + this.service, "left=" + r + ",top=" + l + ",width=" + i.width + ",height=" + i.height + ",personalbar=0,toolbar=0,scrollbars=1,resizable=1");
                if (u) {
                    u.focus(), this.widget.trigger("popup_opened." + d, [this.service, u]);
                    var c = setInterval($.proxy(function() {
                        u.closed && (clearInterval(c), this.widget.trigger("popup_closed." + d, this.service))
                    }, this), this.options.popupCheckInterval)
                } else location.href = t
            }
        }, $(function() {
            $("." + d).socialLikes()
        })
    }),
    function(e) {
        "function" == typeof define && define.amd ? define("BestDayCalendar",["jquery"], e) : e(jQuery)
    }(function() {
        var e = function(e, t) {
            this.element = e, this.element.addClass("calendar"), this._initializeEvents(t), this._initializeOptions(t), this._render()
        };
        e.prototype = {
            constructor: e,
            _initializeOptions: function(e) {
                null == e && (e = []), this.options = {
                    startYear: isNaN(parseInt(e.startYear)) ? (new Date).getFullYear() : parseInt(e.startYear),
                    startMonth: isNaN(parseInt(e.startMonth)) ? 0 : parseInt(e.startMonth),
                    minDate: e.minDate instanceof Date ? e.minDate : null,
                    maxDate: e.maxDate instanceof Date ? e.maxDate : null,
                    language: null != e.language && null != t[e.language] ? e.language : "en",
                    allowOverlap: null == e.allowOverlap || e.allowOverlap,
                    displayWeekNumber: null != e.displayWeekNumber && e.displayWeekNumber,
                    alwaysHalfDay: null != e.alwaysHalfDay && e.alwaysHalfDay,
                    enableRangeSelection: null != e.enableRangeSelection && e.enableRangeSelection,
                    disabledDays: e.disabledDays instanceof Array ? e.disabledDays : [],
                    roundRangeLimits: null != e.roundRangeLimits && e.roundRangeLimits,
                    dataSource: e.dataSource instanceof Array != null ? e.dataSource : [],
                    style: "background" == e.style || "border" == e.style || "custom" == e.style ? e.style : "border",
                    enableContextMenu: null != e.enableContextMenu && e.enableContextMenu,
                    contextMenuItems: e.contextMenuItems instanceof Array ? e.contextMenuItems : [],
                    customDayRenderer: $.isFunction(e.customDayRenderer) ? e.customDayRenderer : null,
                    customDataSourceRenderer: $.isFunction(e.customDataSourceRenderer) ? e.customDataSourceRenderer : null,
                    showDays: e.showDays ? e.showDays : null,
                    showHeader: e.showHeader ? e.showHeader : null,
                    showYear: e.showYear ? e.showYear : null
                }, this._initializeDatasourceColors()
            },
            _initializeEvents: function(e) {
                null == e && (e = []), e.renderEnd && this.element.bind("renderEnd", e.renderEnd), e.clickDay && this.element.bind("clickDay", e.clickDay), e.dayContextMenu && this.element.bind("dayContextMenu", e.dayContextMenu), e.selectRange && this.element.bind("selectRange", e.selectRange), e.mouseOnDay && this.element.bind("mouseOnDay", e.mouseOnDay), e.mouseOutDay && this.element.bind("mouseOutDay", e.mouseOutDay), e.mouseClickMonth && this.element.bind("mouseClickMonth", e.mouseClickMonth)
            },
            _initializeDatasourceColors: function() {
                for (var e in this.options.dataSource) null == this.options.dataSource[e].color && (this.options.dataSource[e].color = i[e % i.length])
            },
            _render: function() {
                this.element.empty(), this.options.showHeader && 1 == this.options.showHeader && this._renderHeader(), this._renderBody(), this._renderDataSource(), this._applyEvents(), this.element.find(".months-container").fadeIn(500), this._triggerEvent("renderEnd", {
                    currentYear: this.options.startYear
                })
            },
            _renderHeader: function() {
                var e = $(document.createElement("div"));
                e.addClass("calendar-header panel panel-default");
                var t = $(document.createElement("table")),
                    i = $(document.createElement("th"));
                i.addClass("prev"), null != this.options.minDate && this.options.minDate > new Date(this.options.startYear - 1, 11, 31) && i.addClass("disabled");
                var n = $(document.createElement("span"));
                n.addClass("glyphicon glyphicon-chevron-left"), i.append(n), t.append(i);
                var a = $(document.createElement("th"));
                a.addClass("year-title year-neighbor2 hidden-sm hidden-xs"), a.text(this.options.startYear - 2), null != this.options.minDate && this.options.minDate > new Date(this.options.startYear - 2, 11, 31) && a.addClass("disabled"), t.append(a);
                var s = $(document.createElement("th"));
                s.addClass("year-title year-neighbor hidden-xs"), s.text(this.options.startYear - 1), null != this.options.minDate && this.options.minDate > new Date(this.options.startYear - 1, 11, 31) && s.addClass("disabled"), t.append(s);
                var o = $(document.createElement("th"));
                o.addClass("year-title"), o.text(this.options.startYear), t.append(o);
                var r = $(document.createElement("th"));
                r.addClass("year-title year-neighbor hidden-xs"), r.text(this.options.startYear + 1), null != this.options.maxDate && this.options.maxDate < new Date(this.options.startYear + 1, 0, 1) && r.addClass("disabled"), t.append(r);
                var l = $(document.createElement("th"));
                l.addClass("year-title year-neighbor2 hidden-sm hidden-xs"), l.text(this.options.startYear + 2), null != this.options.maxDate && this.options.maxDate < new Date(this.options.startYear + 2, 0, 1) && l.addClass("disabled"), t.append(l);
                var d = $(document.createElement("th"));
                d.addClass("next"), null != this.options.maxDate && this.options.maxDate < new Date(this.options.startYear + 1, 0, 1) && d.addClass("disabled");
                var u = $(document.createElement("span"));
                u.addClass("glyphicon glyphicon-chevron-right"), d.append(u), t.append(d), e.append(t), this.element.append(e)
            },
            _renderBody: function() {
                var e = $(document.createElement("div"));
                e.addClass("months-container");
                var i = 0,
                    n = this.options.startYear,
                    a = new Date;
                this.options.startMonth && (i = this.options.startMonth);
                for (var s = 0; s < 12; s++) {
                    var o = $(document.createElement("div"));
                    o.addClass("month-container"), o.data("month-id", i);
                    var r = new Date(n, i, 1),
                        l = $(document.createElement("table"));
                    l.addClass("month");
                    var d = $(document.createElement("thead")),
                        u = $(document.createElement("tr")),
                        c = t[this.options.language].months[i];
                    (0 == i || 0 == s && this.options.showYear) && (c += " <span class='year'>" + r.getFullYear() + "</span>");
                    var h = $(document.createElement("th"));
                    if (h.addClass("month-title"), h.attr("tabindex", 0), h.attr("colspan", this.options.displayWeekNumber ? 8 : 7), h.html(c), u.append(h), d.append(u), this.options.showDays && 1 == this.options.showDays) {
                        var p = $(document.createElement("tr"));
                        if (this.options.displayWeekNumber) {
                            var m = $(document.createElement("th"));
                            m.addClass("week-number"), m.text(t[this.options.language].weekShort), p.append(m)
                        }
                        var g = t[this.options.language].weekStart;
                        do {
                            var f = $(document.createElement("th"));
                            f.addClass("day-header"), f.text(t[this.options.language].daysMin[g]), p.append(f), g++, g >= 7 && (g = 0)
                        } while (g != t[this.options.language].weekStart);
                        d.append(p)
                    }
                    l.append(d);
                    for (var _ = new Date(r.getTime()), v = new Date(n, i + 1, 0), y = t[this.options.language].weekStart; _.getDay() != y;) _.setDate(_.getDate() - 1);
                    for (; _ <= v;) {
                        var w = $(document.createElement("tr"));
                        if (w.addClass("week"), this.options.displayWeekNumber) {
                            var m = $(document.createElement("td"));
                            m.addClass("week-number"), m.text(this.getWeekNumber(_)), w.append(m)
                        }
                        do {
                            var b = $(document.createElement("td"));
                            if (b.addClass("day"), _ < r) b.addClass("old");
                            else if (_ > v) b.addClass("new");
                            else {
                                if (null != this.options.minDate && _ < this.options.minDate || null != this.options.maxDate && _ > this.options.maxDate) b.addClass("disabled");
                                else if (this.options.disabledDays.length > 0)
                                    for (var g in this.options.disabledDays)
                                        if (_.getTime() == this.options.disabledDays[g].getTime()) {
                                            b.addClass("disabled");
                                            break
                                        }
                                b.attr("tabindex", ""), b.addClass("focusable"), b.data("date", new Date(_.getTime()));
                                var C = $(document.createElement("div"));
                                C.addClass("day-content"), C.text(_.getDate()), b.append(C), _ < a && b.addClass("old"), this.options.customDayRenderer && this.options.customDayRenderer(C, _)
                            }
                            w.append(b), _.setDate(_.getDate() + 1)
                        } while (_.getDay() != y);
                        l.append(w)
                    }
                    o.append(l), e.append(o), i++, i >= 12 && (i = 0, n++)
                }
                this.element.append(e)
            },
            _renderDataSource: function() {
                var e = this;
                null != this.options.dataSource && this.options.dataSource.length > 0 && this.element.find(".month-container").each(function() {
                    var t = $(this).data("month-id"),
                        i = new Date(e.options.startYear, t, 1),
                        n = new Date(e.options.startYear, t + 1, 0);
                    if ((null == e.options.minDate || n >= e.options.minDate) && (null == e.options.maxDate || i <= e.options.maxDate)) {
                        var a = [];
                        for (var s in e.options.dataSource) e.options.dataSource[s].startDate > n && !(e.options.dataSource[s].endDate < i) || a.push(e.options.dataSource[s]);
                        a.length > 0 && $(this).find(".day-content").each(function() {
                            var i = new Date(e.options.startYear, t, $(this).text()),
                                n = [];
                            if ((null == e.options.minDate || i >= e.options.minDate) && (null == e.options.maxDate || i <= e.options.maxDate)) {
                                for (var s in a) a[s].startDate <= i && a[s].endDate >= i && n.push(a[s]);
                                n.length > 0 && e._renderDataSourceDay($(this), i, n)
                            }
                        })
                    }
                })
            },
            _renderDataSourceDay: function(e, t, i) {
                switch (this.options.style) {
                    case "border":
                        var n = 0;
                        if (1 == i.length ? n = 4 : i.length <= 3 ? n = 2 : e.parent().css("box-shadow", "inset 0 -4px 0 0 black"), n > 0) {
                            var a = "";
                            for (var s in i) "" != a && (a += ","), a += "inset 0 -" + (parseInt(s) + 1) * n + "px 0 0 " + i[s].color;
                            e.parent().css("box-shadow", a)
                        }
                        break;
                    case "background":
                        e.parent().css("background-color", i[i.length - 1].color);
                        var o = t.getTime();
                        if (i[i.length - 1].startDate.getTime() == o)
                            if (e.parent().addClass("day-start"), i[i.length - 1].startHalfDay || this.options.alwaysHalfDay) {
                                e.parent().addClass("day-half");
                                for (var r = "transparent", s = i.length - 2; s >= 0; s--)
                                    if (i[s].startDate.getTime() != o || !i[s].startHalfDay && !this.options.alwaysHalfDay) {
                                        r = i[s].color;
                                        break
                                    }
                                e.parent().css("background", "linear-gradient(-45deg, " + i[i.length - 1].color + ", " + i[i.length - 1].color + " 49%, " + r + " 51%, " + r + ")")
                            } else this.options.roundRangeLimits && e.parent().addClass("round-left");
                        else if (i[i.length - 1].endDate.getTime() == o)
                            if (e.parent().addClass("day-end"), i[i.length - 1].endHalfDay || this.options.alwaysHalfDay) {
                                e.parent().addClass("day-half");
                                for (var r = "transparent", s = i.length - 2; s >= 0; s--)
                                    if (i[s].endDate.getTime() != o || !i[s].endHalfDay && !this.options.alwaysHalfDay) {
                                        r = i[s].color;
                                        break
                                    }
                                e.parent().css("background", "linear-gradient(135deg, " + i[i.length - 1].color + ", " + i[i.length - 1].color + " 49%, " + r + " 51%, " + r + ")")
                            } else this.options.roundRangeLimits && e.parent().addClass("round-right");
                        break;
                    case "custom":
                        this.options.customDataSourceRenderer && this.options.customDataSourceRenderer.call(this, e, t, i)
                }
            },
            _applyEvents: function() {
                var e = this;
                this.element.find(".year-neighbor, .year-neighbor2").click(function() {
                    $(this).hasClass("disabled") || e.setYear(parseInt($(this).text()))
                }), this.element.find(".calendar-header .prev").click(function() {
                    $(this).hasClass("disabled") || e.element.find(".months-container").animate({
                        "margin-left": "100%"
                    }, 100, function() {
                        e.element.find(".months-container").hide(), e.element.find(".months-container").css("margin-left", "0"), setTimeout(function() {
                            e.setYear(e.options.startYear - 1)
                        }, 50)
                    })
                }), this.element.find(".calendar-header .next").click(function() {
                    $(this).hasClass("disabled") || e.element.find(".months-container").animate({
                        "margin-left": "-100%"
                    }, 100, function() {
                        e.element.find(".months-container").hide(), e.element.find(".months-container").css("margin-left", "0"), setTimeout(function() {
                            e.setYear(e.options.startYear + 1)
                        }, 50)
                    })
                });
                var t = this.element.find(".day:not(.old, .new, .disabled)");
                t.click(function(t) {
                    var i = e._getDate($(this));
                    e._triggerEvent("clickDay", {
                        element: $(this),
                        which: t.which,
                        date: i,
                        events: e.getEvents(i)
                    })
                }), t.bind("contextmenu", function(t) {
                    e.options.enableContextMenu && (t.preventDefault(), e.options.contextMenuItems.length > 0 && e._openContextMenu($(this)));
                    var i = e._getDate($(this));
                    e._triggerEvent("dayContextMenu", {
                        element: $(this),
                        date: i,
                        events: e.getEvents(i)
                    })
                }), this.options.enableRangeSelection && (t.mousedown(function(t) {
                    if (1 == t.which) {
                        var i = e._getDate($(this));
                        (e.options.allowOverlap || 0 == e.getEvents(i).length) && (e._mouseDown = !0, e._rangeStart = e._rangeEnd = i, e._refreshRange())
                    }
                }), t.mouseenter(function(t) {
                    if (e._mouseDown) {
                        var i = e._getDate($(this));
                        if (!e.options.allowOverlap) {
                            var n = new Date(e._rangeStart.getTime());
                            if (n < i)
                                for (var a = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1); n < i && !(e.getEvents(a).length > 0);) n.setDate(n.getDate() + 1), a.setDate(a.getDate() + 1);
                            else
                                for (var a = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 1); n > i && !(e.getEvents(a).length > 0);) n.setDate(n.getDate() - 1), a.setDate(a.getDate() - 1);
                            i = n
                        }
                        var s = e._rangeEnd;
                        e._rangeEnd = i, s.getTime() != e._rangeEnd.getTime() && e._refreshRange()
                    }
                }), $(window).mouseup(function(t) {
                    if (e._mouseDown) {
                        e._mouseDown = !1, e._refreshRange();
                        var i = e._rangeStart < e._rangeEnd ? e._rangeStart : e._rangeEnd,
                            n = e._rangeEnd > e._rangeStart ? e._rangeEnd : e._rangeStart;
                        e._triggerEvent("selectRange", {
                            startDate: i,
                            endDate: n
                        })
                    }
                })), t.on("mouseenter", function(t) {
                    if (!e._mouseDown) {
                        var i = e._getDate($(this));
                        e._triggerEvent("mouseOnDay", {
                            element: $(this),
                            date: i,
                            events: e.getEvents(i)
                        })
                    }
                }), t.on("mouseleave", function(t) {
                    var i = e._getDate($(this));
                    e._triggerEvent("mouseOutDay", {
                        element: $(this),
                        date: i,
                        events: e.getEvents(i)
                    })
                });
                var i = this.element.find(".month-container");
                i.on("click", function(t) {
                    var i = e._getDate($(this));
                    e._triggerEvent("mouseClickMonth", {
                        element: $(this),
                        date: i,
                        events: e.getEvents(i)
                    })
                })
            },
            _refreshRange: function() {
                var e = this;
                if (this.element.find("td.day.range").removeClass("range"), this.element.find("td.day.range-start").removeClass("range-start"), this.element.find("td.day.range-end").removeClass("range-end"), this._mouseDown) {
                    var t = !0,
                        i = !1,
                        n = e._rangeStart < e._rangeEnd ? e._rangeStart : e._rangeEnd,
                        a = e._rangeEnd > e._rangeStart ? e._rangeEnd : e._rangeStart;
                    this.element.find(".month-container").each(function() {
                        var t = $(this).data("month-id");
                        n.getMonth() <= t && a.getMonth() >= t && $(this).find("td.day:not(.old, .new)").each(function() {
                            var t = e._getDate($(this));
                            t >= n && t <= a && ($(this).addClass("range"), t.getTime() == n.getTime() && $(this).addClass("range-start"), t.getTime() == a.getTime() && $(this).addClass("range-end"))
                        })
                    })
                }
            },
            _openContextMenu: function(e) {
                var t = $(".calendar-context-menu");
                t.length > 0 ? (t.hide(), t.empty()) : (t = $(document.createElement("div")), t.addClass("calendar-context-menu"), $("body").append(t));
                var i = this._getDate(e),
                    n = this.getEvents(i);
                for (var a in n) {
                    var s = $(document.createElement("div"));
                    s.addClass("item"), s.css("border-left", "4px solid " + n[a].color);
                    var o = $(document.createElement("div"));
                    o.addClass("content"), o.text(n[a].name), s.append(o);
                    var r = $(document.createElement("span"));
                    r.addClass("glyphicon glyphicon-chevron-right"), s.append(r), this._renderContextMenuItems(s, this.options.contextMenuItems, n[a]), t.append(s)
                }
                t.children().length > 0 && (t.css("left", e.offset().left + 25 + "px"), t.css("top", e.offset().top + 25 + "px"), t.show(), $(window).one("mouseup", function() {
                    t.hide()
                }))
            },
            _renderContextMenuItems: function(e, t, i) {
                var n = $(document.createElement("div"));
                n.addClass("submenu");
                for (var a in t)
                    if (!t[a].visible || t[a].visible(i)) {
                        var s = $(document.createElement("div"));
                        s.addClass("item");
                        var o = $(document.createElement("div"));
                        o.addClass("content"), o.text(t[a].text), s.append(o), t[a].click && ! function(e) {
                            s.click(function() {
                                t[e].click(i)
                            })
                        }(a);
                        var r = $(document.createElement("span"));
                        r.addClass("glyphicon glyphicon-chevron-right"), s.append(r), t[a].items && t[a].items.length > 0 && this._renderContextMenuItems(s, t[a].items, i), n.append(s)
                    }
                n.children().length > 0 && e.append(n)
            },
            _getColor: function(e) {
                var t = $("<div />");
                t.css("color", e)
            },
            _getDate: function(e) {
                var t = e.children(".day-content").text(),
                    i;
                i = e.hasClass("month-container") ? e.data("month-id") : e.closest(".month-container").data("month-id");
                var n = this.options.startYear;
                return i < this.options.startMonth && n++, new Date(n, i, t)
            },
            _triggerEvent: function(e, t) {
                var i = $.Event(e);
                for (var n in t) i[n] = t[n];
                this.element.trigger(i)
            },
            getWeekNumber: function(e) {
                var t = new Date(e.getTime());
                t.setHours(0, 0, 0, 0), t.setDate(t.getDate() + 3 - (t.getDay() + 6) % 7);
                var i = new Date(t.getFullYear(), 0, 4);
                return 1 + Math.round(((t.getTime() - i.getTime()) / 864e5 - 3 + (i.getDay() + 6) % 7) / 7)
            },
            getEvents: function(e) {
                var t = [];
                if (this.options.dataSource && e)
                    for (var i in this.options.dataSource) this.options.dataSource[i].startDate <= e && this.options.dataSource[i].endDate >= e && t.push(this.options.dataSource[i]);
                return t
            },
            getYear: function() {
                return this.options.startYear
            },
            setYear: function(e) {
                var t = parseInt(e);
                isNaN(t) || (this.options.startYear = t, this._render())
            },
            getMinDate: function() {
                return this.options.minDate
            },
            setMinDate: function(e) {
                e instanceof Date && (this.options.minDate = e, this._render())
            },
            getMaxDate: function() {
                return this.options.maxDate
            },
            setMaxDate: function(e) {
                e instanceof Date && (this.options.maxDate = e, this._render())
            },
            getStyle: function() {
                return this.options.style
            },
            setStyle: function(e) {
                this.options.style = "background" == e || "border" == e || "custom" == e ? e : "border", this._render()
            },
            getAllowOverlap: function() {
                return this.options.allowOverlap
            },
            setAllowOverlap: function(e) {
                this.options.allowOverlap = e
            },
            getDisplayWeekNumber: function() {
                return this.options.displayWeekNumber
            },
            setDisplayWeekNumber: function(e) {
                this.options.displayWeekNumber = e, this._render()
            },
            getAlwaysHalfDay: function() {
                return this.options.alwaysHalfDay
            },
            setAlwaysHalfDay: function(e) {
                this.options.alwaysHalfDay = e, this._render()
            },
            getEnableRangeSelection: function() {
                return this.options.enableRangeSelection
            },
            setEnableRangeSelection: function(e) {
                this.options.enableRangeSelection = e, this._render()
            },
            getDisabledDays: function() {
                return this.options.disabledDays
            },
            setDisabledDays: function(e) {
                this.options.disabledDays = e instanceof Array ? e : [], this._render()
            },
            getRoundRangeLimits: function() {
                return this.options.roundRangeLimits
            },
            setRoundRangeLimits: function(e) {
                this.options.roundRangeLimits = e, this._render()
            },
            getEnableContextMenu: function() {
                return this.options.enableContextMenu
            },
            setEnableContextMenu: function(e) {
                this.options.enableContextMenu = e, this._render()
            },
            getContextMenuItems: function() {
                return this.options.contextMenuItems
            },
            setContextMenuItems: function(e) {
                this.options.contextMenuItems = e instanceof Array ? e : [], this._render()
            },
            getCustomDayRenderer: function() {
                return this.options.customDayRenderer
            },
            setCustomDayRenderer: function(e) {
                this.options.customDayRenderer = $.isFunction(e) ? e : null, this._render()
            },
            getCustomDataSourceRenderer: function() {
                return this.options.customDataSourceRenderer
            },
            setCustomDataSourceRenderer: function(e) {
                this.options.customDataSourceRenderer = $.isFunction(e) ? e : null, this._render()
            },
            getLanguage: function() {
                return this.options.language
            },
            setLanguage: function(e) {
                null != e && null != t[e] && (this.options.language = e, this._render())
            },
            getDataSource: function() {
                return this.options.dataSource
            },
            setDataSource: function(e) {
                this.options.dataSource = e instanceof Array ? e : [], this._initializeDatasourceColors(), this._render()
            },
            addEvent: function(e) {
                this.options.dataSource.push(e), this._render()
            },
            update: function() {
                this._render()
            }
        }, $.fn.calendar = function(t) {
            var i = new e($(this), t);
            return $(this).data("calendar", i), i
        }, $.fn.renderEnd = function(e) {
            $(this).bind("renderEnd", e)
        }, $.fn.clickDay = function(e) {
            $(this).bind("clickDay", e)
        }, $.fn.dayContextMenu = function(e) {
            $(this).bind("dayContextMenu", e)
        }, $.fn.selectRange = function(e) {
            $(this).bind("selectRange", e)
        }, $.fn.mouseOnDay = function(e) {
            $(this).bind("mouseOnDay", e)
        }, $.fn.mouseOutDay = function(e) {
            $(this).bind("mouseOutDay", e)
        }, $.fn.mouseClickMonth = function(e) {
            $(this).bind("mouseClickMonth", e)
        };
        var t = $.fn.calendar.dates = {
                en: {
                    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    daysMin: ["S", "M", "T", "W", "T", "F", "S", "S"],
                    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    weekShort: "W",
                    weekStart: 1
                }
            },
            i = $.fn.calendar.colors = ["#2C8FC9", "#9CB703", "#F5BB00", "#FF4A32", "#B56CE2", "#45A597"];
        $(function() {
            $('[data-provide="calendar"]').each(function() {
                $(this).calendar()
            })
        })
    }),
    function(e) {
        "use strict";
        "function" == typeof define && define.amd ? define("BestDaySlick",["jquery"], e) : "undefined" != typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
    }(function() {
        "use strict";
        var e = window.Slick || {};
        e = function() {
            function e(e, i) {
                var n = this,
                    a;
                n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: $(e),
                    appendDots: $(e),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                    nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function(e, t) {
                        return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(t + 1)
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: .35,
                    fade: !1,
                    focusOnSelect: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3
                }, n.initials = {
                    animating: !1,
                    dragging: !1,
                    autoPlayTimer: null,
                    currentDirection: 0,
                    currentLeft: null,
                    currentSlide: 0,
                    direction: 1,
                    $dots: null,
                    listWidth: null,
                    listHeight: null,
                    loadIndex: 0,
                    $nextArrow: null,
                    $prevArrow: null,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1
                }, $.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = $(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, a = $(e).data("slick") || {}, n.options = $.extend({}, n.defaults, i, a), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = $.proxy(n.autoPlay, n), n.autoPlayClear = $.proxy(n.autoPlayClear, n), n.autoPlayIterator = $.proxy(n.autoPlayIterator, n), n.changeSlide = $.proxy(n.changeSlide, n), n.clickHandler = $.proxy(n.clickHandler, n), n.selectHandler = $.proxy(n.selectHandler, n), n.setPosition = $.proxy(n.setPosition, n), n.swipeHandler = $.proxy(n.swipeHandler, n), n.dragHandler = $.proxy(n.dragHandler, n), n.keyHandler = $.proxy(n.keyHandler, n), n.instanceUid = t++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
            }
            var t = 0;
            return e
        }(), e.prototype.activateADA = function() {
            var e = this;
            e.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        }, e.prototype.addSlide = e.prototype.slickAdd = function(e, t, i) {
            var n = this;
            if ("boolean" == typeof t) i = t, t = null;
            else if (t < 0 || t >= n.slideCount) return !1;
            n.unload(), "number" == typeof t ? 0 === t && 0 === n.$slides.length ? $(e).appendTo(n.$slideTrack) : i ? $(e).insertBefore(n.$slides.eq(t)) : $(e).insertAfter(n.$slides.eq(t)) : i === !0 ? $(e).prependTo(n.$slideTrack) : $(e).appendTo(n.$slideTrack), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slides.each(function(e, t) {
                $(t).attr("data-slick-index", e)
            }), n.$slidesCache = n.$slides, n.reinit()
        }, e.prototype.animateHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.animate({
                    height: t
                }, e.options.speed)
            }
        }, e.prototype.animateSlide = function(e, t) {
            var i = {},
                n = this;
            n.animateHeight(), n.options.rtl === !0 && n.options.vertical === !1 && (e = -e),
                n.transformsEnabled === !1 ? n.options.vertical === !1 ? n.$slideTrack.animate({
                    left: e
                }, n.options.speed, n.options.easing, t) : n.$slideTrack.animate({
                    top: e
                }, n.options.speed, n.options.easing, t) : n.cssTransitions === !1 ? (n.options.rtl === !0 && (n.currentLeft = -n.currentLeft), $({
                    animStart: n.currentLeft
                }).animate({
                    animStart: e
                }, {
                    duration: n.options.speed,
                    easing: n.options.easing,
                    step: function(e) {
                        e = Math.ceil(e), n.options.vertical === !1 ? (i[n.animType] = "translate(" + e + "px, 0px)", n.$slideTrack.css(i)) : (i[n.animType] = "translate(0px," + e + "px)", n.$slideTrack.css(i))
                    },
                    complete: function() {
                        t && t.call()
                    }
                })) : (n.applyTransition(), e = Math.ceil(e), n.options.vertical === !1 ? i[n.animType] = "translate3d(" + e + "px, 0px, 0px)" : i[n.animType] = "translate3d(0px," + e + "px, 0px)", n.$slideTrack.css(i), t && setTimeout(function() {
                    n.disableTransition(), t.call()
                }, n.options.speed))
        }, e.prototype.getNavTarget = function() {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = $(t).not(e.$slider)), t
        }, e.prototype.asNavFor = function(e) {
            var t = this,
                i = t.getNavTarget();
            null !== i && "object" == typeof i && i.each(function() {
                var t = $(this).slick("getSlick");
                t.unslicked || t.slideHandler(e, !0)
            })
        }, e.prototype.applyTransition = function(e) {
            var t = this,
                i = {};
            t.options.fade === !1 ? i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
        }, e.prototype.autoPlay = function() {
            var e = this;
            e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
        }, e.prototype.autoPlayClear = function() {
            var e = this;
            e.autoPlayTimer && clearInterval(e.autoPlayTimer)
        }, e.prototype.autoPlayIterator = function() {
            var e = this,
                t = e.currentSlide + e.options.slidesToScroll;
            e.paused || e.interrupted || e.focussed || (e.options.infinite === !1 && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 === 0 && (e.direction = 1))), e.slideHandler(t))
        }, e.prototype.buildArrows = function() {
            var e = this;
            e.options.arrows === !0 && (e.$prevArrow = $(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = $(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
            }))
        }, e.prototype.buildDots = function() {
            var e = this,
                t, i;
            if (e.options.dots === !0 && e.slideCount > e.options.slidesToShow) {
                for (e.$slider.addClass("slick-dotted"), i = $("<ul />").addClass(e.options.dotsClass), t = 0; t <= e.getDotCount(); t += 1) i.append($("<li />").append(e.options.customPaging.call(this, e, t)));
                e.$dots = i.appendTo(e.options.appendDots), e.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
            }
        }, e.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function(e, t) {
                $(t).attr("data-slick-index", e).data("originalStyling", $(t).attr("style") || "")
            }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? $('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), e.options.centerMode !== !0 && e.options.swipeToSlide !== !0 || (e.options.slidesToScroll = 1), $("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
        }, e.prototype.buildRows = function() {
            var e = this,
                t, i, n, a, s, o, r;
            if (a = document.createDocumentFragment(), o = e.$slider.children(), e.options.rows > 1) {
                for (r = e.options.slidesPerRow * e.options.rows, s = Math.ceil(o.length / r), t = 0; t < s; t++) {
                    var l = document.createElement("div");
                    for (i = 0; i < e.options.rows; i++) {
                        var d = document.createElement("div");
                        for (n = 0; n < e.options.slidesPerRow; n++) {
                            var u = t * r + (i * e.options.slidesPerRow + n);
                            o.get(u) && d.appendChild(o.get(u))
                        }
                        l.appendChild(d)
                    }
                    a.appendChild(l)
                }
                e.$slider.empty().append(a), e.$slider.children().children().children().css({
                    width: 100 / e.options.slidesPerRow + "%",
                    display: "inline-block"
                })
            }
        }, e.prototype.checkResponsive = function(e, t) {
            var i = this,
                n, a, s, o = !1,
                r = i.$slider.width(),
                l = window.innerWidth || $(window).width();
            if ("window" === i.respondTo ? s = l : "slider" === i.respondTo ? s = r : "min" === i.respondTo && (s = Math.min(l, r)), i.options.responsive && i.options.responsive.length && null !== i.options.responsive) {
                a = null;
                for (n in i.breakpoints) i.breakpoints.hasOwnProperty(n) && (i.originalSettings.mobileFirst === !1 ? s < i.breakpoints[n] && (a = i.breakpoints[n]) : s > i.breakpoints[n] && (a = i.breakpoints[n]));
                null !== a ? null !== i.activeBreakpoint ? (a !== i.activeBreakpoint || t) && (i.activeBreakpoint = a, "unslick" === i.breakpointSettings[a] ? i.unslick(a) : (i.options = $.extend({}, i.originalSettings, i.breakpointSettings[a]), e === !0 && (i.currentSlide = i.options.initialSlide), i.refresh(e)), o = a) : (i.activeBreakpoint = a, "unslick" === i.breakpointSettings[a] ? i.unslick(a) : (i.options = $.extend({}, i.originalSettings, i.breakpointSettings[a]), e === !0 && (i.currentSlide = i.options.initialSlide), i.refresh(e)), o = a) : null !== i.activeBreakpoint && (i.activeBreakpoint = null, i.options = i.originalSettings, e === !0 && (i.currentSlide = i.options.initialSlide), i.refresh(e), o = a), e || o === !1 || i.$slider.trigger("breakpoint", [i, o])
            }
        }, e.prototype.changeSlide = function(e, t) {
            var i = this,
                n = $(e.currentTarget),
                a, s, o;
            switch (n.is("a") && e.preventDefault(), n.is("li") || (n = n.closest("li")), o = i.slideCount % i.options.slidesToScroll !== 0, a = o ? 0 : (i.slideCount - i.currentSlide) % i.options.slidesToScroll, e.data.message) {
                case "previous":
                    s = 0 === a ? i.options.slidesToScroll : i.options.slidesToShow - a, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide - s, !1, t);
                    break;
                case "next":
                    s = 0 === a ? i.options.slidesToScroll : a, i.slideCount > i.options.slidesToShow && i.slideHandler(i.currentSlide + s, !1, t);
                    break;
                case "index":
                    var r = 0 === e.data.index ? 0 : e.data.index || n.index() * i.options.slidesToScroll;
                    i.slideHandler(i.checkNavigable(r), !1, t), n.children().trigger("focus");
                    break;
                default:
                    return
            }
        }, e.prototype.checkNavigable = function(e) {
            var t = this,
                i, n;
            if (i = t.getNavigableIndexes(), n = 0, e > i[i.length - 1]) e = i[i.length - 1];
            else
                for (var a in i) {
                    if (e < i[a]) {
                        e = n;
                        break
                    }
                    n = i[a]
                }
            return e
        }, e.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && $("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", $.proxy(e.interrupt, e, !0)).off("mouseleave.slick", $.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), $(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && $(e.$slideTrack).children().off("click.slick", e.selectHandler), $(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), $(window).off("resize.slick.slick-" + e.instanceUid, e.resize), $("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), $(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), $(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", $.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", $.proxy(e.interrupt, e, !1))
        }, e.prototype.cleanUpRows = function() {
            var e = this,
                t;
            e.options.rows > 1 && (t = e.$slides.children().children(), t.removeAttr("style"), e.$slider.empty().append(t))
        }, e.prototype.clickHandler = function(e) {
            var t = this;
            t.shouldClick === !1 && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
        }, e.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), $(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                $(this).attr("style", $(this).data("originalStyling"))
            }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
        }, e.prototype.disableTransition = function(e) {
            var t = this,
                i = {};
            i[t.transitionType] = "", t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i)
        }, e.prototype.fadeSlide = function(e, t) {
            var i = this;
            i.cssTransitions === !1 ? (i.$slides.eq(e).css({
                zIndex: i.options.zIndex
            }), i.$slides.eq(e).animate({
                opacity: 1
            }, i.options.speed, i.options.easing, t)) : (i.applyTransition(e), i.$slides.eq(e).css({
                opacity: 1,
                zIndex: i.options.zIndex
            }), t && setTimeout(function() {
                i.disableTransition(e), t.call()
            }, i.options.speed))
        }, e.prototype.fadeSlideOut = function(e) {
            var t = this;
            t.cssTransitions === !1 ? t.$slides.eq(e).animate({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
                opacity: 0,
                zIndex: t.options.zIndex - 2
            }))
        }, e.prototype.filterSlides = e.prototype.slickFilter = function(e) {
            var t = this;
            null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
        }, e.prototype.focusHandler = function() {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(t) {
                t.stopImmediatePropagation();
                var i = $(this);
                setTimeout(function() {
                    e.options.pauseOnFocus && (e.focussed = i.is(":focus"), e.autoPlay())
                }, 0)
            })
        }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
            var e = this;
            return e.currentSlide
        }, e.prototype.getDotCount = function() {
            var e = this,
                t = 0,
                i = 0,
                n = 0;
            if (e.options.infinite === !0)
                for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else if (e.options.centerMode === !0) n = e.slideCount;
            else if (e.options.asNavFor)
                for (; t < e.slideCount;) ++n, t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            else n = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
            return n - 1
        }, e.prototype.getLeft = function(e) {
            var t = this,
                i, n, a = 0,
                s;
            return t.slideOffset = 0, n = t.$slides.first().outerHeight(!0), t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, a = n * t.options.slidesToShow * -1), t.slideCount % t.options.slidesToScroll !== 0 && e + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (e > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (e - t.slideCount)) * t.slideWidth * -1, a = (t.options.slidesToShow - (e - t.slideCount)) * n * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, a = t.slideCount % t.options.slidesToScroll * n * -1))) : e + t.options.slidesToShow > t.slideCount && (t.slideOffset = (e + t.options.slidesToShow - t.slideCount) * t.slideWidth, a = (e + t.options.slidesToShow - t.slideCount) * n), t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0, a = 0), t.options.centerMode === !0 && t.options.infinite === !0 ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : t.options.centerMode === !0 && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)), i = t.options.vertical === !1 ? e * t.slideWidth * -1 + t.slideOffset : e * n * -1 + a, t.options.variableWidth === !0 && (s = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(e) : t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow), i = t.options.rtl === !0 ? s[0] ? (t.$slideTrack.width() - s[0].offsetLeft - s.width()) * -1 : 0 : s[0] ? s[0].offsetLeft * -1 : 0, t.options.centerMode === !0 && (s = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(e) : t.$slideTrack.children(".slick-slide").eq(e + t.options.slidesToShow + 1), i = t.options.rtl === !0 ? s[0] ? (t.$slideTrack.width() - s[0].offsetLeft - s.width()) * -1 : 0 : s[0] ? s[0].offsetLeft * -1 : 0, i += (t.$list.width() - s.outerWidth()) / 2)), i
        }, e.prototype.getOption = e.prototype.slickGetOption = function(e) {
            var t = this;
            return t.options[e]
        }, e.prototype.getNavigableIndexes = function() {
            var e = this,
                t = 0,
                i = 0,
                n = [],
                a;
            for (e.options.infinite === !1 ? a = e.slideCount : (t = e.options.slidesToScroll * -1, i = e.options.slidesToScroll * -1, a = 2 * e.slideCount); t < a;) n.push(t), t = i + e.options.slidesToScroll, i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return n
        }, e.prototype.getSlick = function() {
            return this
        }, e.prototype.getSlideCount = function() {
            var e = this,
                t, i, n;
            return n = e.options.centerMode === !0 ? e.slideWidth * Math.floor(e.options.slidesToShow / 2) : 0, e.options.swipeToSlide === !0 ? (e.$slideTrack.find(".slick-slide").each(function(t, a) {
                if (a.offsetLeft - n + $(a).outerWidth() / 2 > e.swipeLeft * -1) return i = a, !1
            }), t = Math.abs($(i).attr("data-slick-index") - e.currentSlide) || 1) : e.options.slidesToScroll
        }, e.prototype.goTo = e.prototype.slickGoTo = function(e, t) {
            var i = this;
            i.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(e)
                }
            }, t)
        }, e.prototype.init = function(e) {
            var t = this;
            $(t.$slider).hasClass("slick-initialized") || ($(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
        }, e.prototype.initADA = function() {
            var e = this;
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                "aria-hidden": "true",
                tabindex: "-1"
            }).find("a, input, button, select").attr({
                tabindex: "-1"
            }), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
                $(this).attr({
                    role: "option",
                    "aria-describedby": "slick-slide" + e.instanceUid + t
                })
            }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function(t) {
                $(this).attr({
                    role: "presentation",
                    "aria-selected": "false",
                    "aria-controls": "navigation" + e.instanceUid + t,
                    id: "slick-slide" + e.instanceUid + t
                })
            }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
        }, e.prototype.initArrowEvents = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
                message: "previous"
            }, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
                message: "next"
            }, e.changeSlide))
        }, e.prototype.initDotEvents = function() {
            var e = this;
            e.options.dots === !0 && e.slideCount > e.options.slidesToShow && $("li", e.$dots).on("click.slick", {
                message: "index"
            }, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && $("li", e.$dots).on("mouseenter.slick", $.proxy(e.interrupt, e, !0)).on("mouseleave.slick", $.proxy(e.interrupt, e, !1))
        }, e.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", $.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", $.proxy(e.interrupt, e, !1)))
        }, e.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), $(document).on(e.visibilityChange, $.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && $(e.$slideTrack).children().on("click.slick", e.selectHandler), $(window).on("orientationchange.slick.slick-" + e.instanceUid, $.proxy(e.orientationChange, e)), $(window).on("resize.slick.slick-" + e.instanceUid, $.proxy(e.resize, e)), $("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), $(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), $(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
        }, e.prototype.initUI = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.show()
        }, e.prototype.keyHandler = function(e) {
            var t = this;
            e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && t.options.accessibility === !0 ? t.changeSlide({
                data: {
                    message: t.options.rtl === !0 ? "next" : "previous"
                }
            }) : 39 === e.keyCode && t.options.accessibility === !0 && t.changeSlide({
                data: {
                    message: t.options.rtl === !0 ? "previous" : "next"
                }
            }))
        }, e.prototype.lazyLoad = function() {
            function e(e) {
                $("img[data-lazy]", e).each(function() {
                    var e = $(this),
                        i = $(this).attr("data-lazy"),
                        n = document.createElement("img");
                    n.onload = function() {
                        e.animate({
                            opacity: 0
                        }, 100, function() {
                            e.attr("src", i).animate({
                                opacity: 1
                            }, 200, function() {
                                e.removeAttr("data-lazy").removeClass("slick-loading")
                            }), t.$slider.trigger("lazyLoaded", [t, e, i])
                        })
                    }, n.onerror = function() {
                        e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), t.$slider.trigger("lazyLoadError", [t, e, i])
                    }, n.src = i
                })
            }
            var t = this,
                i, n, a, s;
            t.options.centerMode === !0 ? t.options.infinite === !0 ? (a = t.currentSlide + (t.options.slidesToShow / 2 + 1), s = a + t.options.slidesToShow + 2) : (a = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), s = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (a = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, s = Math.ceil(a + t.options.slidesToShow), t.options.fade === !0 && (a > 0 && a--, s <= t.slideCount && s++)), i = t.$slider.find(".slick-slide").slice(a, s), e(i), t.slideCount <= t.options.slidesToShow ? (n = t.$slider.find(".slick-slide"), e(n)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (n = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), e(n)) : 0 === t.currentSlide && (n = t.$slider.find(".slick-cloned").slice(t.options.slidesToShow * -1), e(n))
        }, e.prototype.loadSlider = function() {
            var e = this;
            e.setPosition(), e.$slideTrack.css({
                opacity: 1
            }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
        }, e.prototype.next = e.prototype.slickNext = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, e.prototype.orientationChange = function() {
            var e = this;
            e.checkResponsive(), e.setPosition()
        }, e.prototype.pause = e.prototype.slickPause = function() {
            var e = this;
            e.autoPlayClear(), e.paused = !0
        }, e.prototype.play = e.prototype.slickPlay = function() {
            var e = this;
            e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
        }, e.prototype.postSlide = function(e) {
            var t = this;
            t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && t.initADA())
        }, e.prototype.prev = e.prototype.slickPrev = function() {
            var e = this;
            e.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, e.prototype.preventDefault = function(e) {
            e.preventDefault()
        }, e.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var t = this,
                i = $("img[data-lazy]", t.$slider),
                n, a, s;
            i.length ? (n = i.first(), a = n.attr("data-lazy"), s = document.createElement("img"), s.onload = function() {
                n.attr("src", a).removeAttr("data-lazy").removeClass("slick-loading"), t.options.adaptiveHeight === !0 && t.setPosition(), t.$slider.trigger("lazyLoaded", [t, n, a]), t.progressiveLazyLoad()
            }, s.onerror = function() {
                e < 3 ? setTimeout(function() {
                    t.progressiveLazyLoad(e + 1)
                }, 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), t.$slider.trigger("lazyLoadError", [t, n, a]), t.progressiveLazyLoad())
            }, s.src = a) : t.$slider.trigger("allImagesLoaded", [t])
        }, e.prototype.refresh = function(e) {
            var t = this,
                i, n;
            n = t.slideCount - t.options.slidesToShow, !t.options.infinite && t.currentSlide > n && (t.currentSlide = n), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), i = t.currentSlide, t.destroy(!0), $.extend(t, t.initials, {
                currentSlide: i
            }), t.init(), e || t.changeSlide({
                data: {
                    message: "index",
                    index: i
                }
            }, !1)
        }, e.prototype.registerBreakpoints = function() {
            var e = this,
                t, i, n, a = e.options.responsive || null;
            if ("array" === $.type(a) && a.length) {
                e.respondTo = e.options.respondTo || "window";
                for (t in a)
                    if (n = e.breakpoints.length - 1, i = a[t].breakpoint, a.hasOwnProperty(t)) {
                        for (; n >= 0;) e.breakpoints[n] && e.breakpoints[n] === i && e.breakpoints.splice(n, 1), n--;
                        e.breakpoints.push(i), e.breakpointSettings[i] = a[t].settings
                    }
                e.breakpoints.sort(function(t, i) {
                    return e.options.mobileFirst ? t - i : i - t
                })
            }
        }, e.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && $(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
        }, e.prototype.resize = function() {
            var e = this;
            $(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function() {
                e.windowWidth = $(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
            }, 50))
        }, e.prototype.removeSlide = e.prototype.slickRemove = function(e, t, i) {
            var n = this;
            return "boolean" == typeof e ? (t = e, e = t === !0 ? 0 : n.slideCount - 1) : e = t === !0 ? --e : e, !(n.slideCount < 1 || e < 0 || e > n.slideCount - 1) && (n.unload(), i === !0 ? n.$slideTrack.children().remove() : n.$slideTrack.children(this.options.slide).eq(e).remove(), n.$slides = n.$slideTrack.children(this.options.slide), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.append(n.$slides), n.$slidesCache = n.$slides, void n.reinit())
        }, e.prototype.setCSS = function(e) {
            var t = this,
                i = {},
                n, a;
            t.options.rtl === !0 && (e = -e), n = "left" == t.positionProp ? Math.ceil(e) + "px" : "0px", a = "top" == t.positionProp ? Math.ceil(e) + "px" : "0px", i[t.positionProp] = e, t.transformsEnabled === !1 ? t.$slideTrack.css(i) : (i = {}, t.cssTransitions === !1 ? (i[t.animType] = "translate(" + n + ", " + a + ")", t.$slideTrack.css(i)) : (i[t.animType] = "translate3d(" + n + ", " + a + ", 0px)", t.$slideTrack.css(i)))
        }, e.prototype.setDimensions = function() {
            var e = this;
            e.options.vertical === !1 ? e.options.centerMode === !0 && e.$list.css({
                padding: "0px " + e.options.centerPadding
            }) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), e.options.centerMode === !0 && e.$list.css({
                padding: e.options.centerPadding + " 0px"
            })), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), e.options.vertical === !1 && e.options.variableWidth === !1 ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : e.options.variableWidth === !0 ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
            var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
            e.options.variableWidth === !1 && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
        }, e.prototype.setFade = function() {
            var e = this,
                t;
            e.$slides.each(function(i, n) {
                t = e.slideWidth * i * -1, e.options.rtl === !0 ? $(n).css({
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                }) : $(n).css({
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: e.options.zIndex - 2,
                    opacity: 0
                })
            }), e.$slides.eq(e.currentSlide).css({
                zIndex: e.options.zIndex - 1,
                opacity: 1
            })
        }, e.prototype.setHeight = function() {
            var e = this;
            if (1 === e.options.slidesToShow && e.options.adaptiveHeight === !0 && e.options.vertical === !1) {
                var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                e.$list.css("height", t)
            }
        }, e.prototype.setOption = e.prototype.slickSetOption = function() {
            var e = this,
                t, i, n, a, s = !1,
                o;
            if ("object" === $.type(arguments[0]) ? (n = arguments[0], s = arguments[1], o = "multiple") : "string" === $.type(arguments[0]) && (n = arguments[0], a = arguments[1], s = arguments[2], "responsive" === arguments[0] && "array" === $.type(arguments[1]) ? o = "responsive" : "undefined" != typeof arguments[1] && (o = "single")), "single" === o) e.options[n] = a;
            else if ("multiple" === o) $.each(n, function(t, i) {
                e.options[t] = i
            });
            else if ("responsive" === o)
                for (i in a)
                    if ("array" !== $.type(e.options.responsive)) e.options.responsive = [a[i]];
                    else {
                        for (t = e.options.responsive.length - 1; t >= 0;) e.options.responsive[t].breakpoint === a[i].breakpoint && e.options.responsive.splice(t, 1), t--;
                        e.options.responsive.push(a[i])
                    }
            s && (e.unload(), e.reinit())
        }, e.prototype.setPosition = function() {
            var e = this;
            e.setDimensions(), e.setHeight(), e.options.fade === !1 ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
        }, e.prototype.setProps = function() {
            var e = this,
                t = document.body.style;
            e.positionProp = e.options.vertical === !0 ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || e.options.useCSS === !0 && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && e.animType !== !1 && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && e.animType !== !1
        }, e.prototype.setSlideClasses = function(e) {
            var t = this,
                i, n, a, s;
            n = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), t.$slides.eq(e).addClass("slick-current"), t.options.centerMode === !0 ? (i = Math.floor(t.options.slidesToShow / 2), t.options.infinite === !0 && (e >= i && e <= t.slideCount - 1 - i ? t.$slides.slice(e - i, e + i + 1).addClass("slick-active").attr("aria-hidden", "false") : (a = t.options.slidesToShow + e, n.slice(a - i + 1, a + i + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - t.options.slidesToShow).addClass("slick-center") : e === t.slideCount - 1 && n.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(e).addClass("slick-center")) : e >= 0 && e <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(e, e + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= t.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (s = t.slideCount % t.options.slidesToShow, a = t.options.infinite === !0 ? t.options.slidesToShow + e : e, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - e < t.options.slidesToShow ? n.slice(a - (t.options.slidesToShow - s), a + s).addClass("slick-active").attr("aria-hidden", "false") : n.slice(a, a + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === t.options.lazyLoad && t.lazyLoad()
        }, e.prototype.setupInfinite = function() {
            var e = this,
                t, i, n;
            if (e.options.fade === !0 && (e.options.centerMode = !1), e.options.infinite === !0 && e.options.fade === !1 && (i = null, e.slideCount > e.options.slidesToShow)) {
                for (n = e.options.centerMode === !0 ? e.options.slidesToShow + 1 : e.options.slidesToShow, t = e.slideCount; t > e.slideCount - n; t -= 1) i = t - 1, $(e.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");
                for (t = 0; t < n; t += 1) i = t, $(e.$slides[i]).clone(!0).attr("id", "").attr("data-slick-index", i + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");
                e.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    $(this).attr("id", "")
                })
            }
        }, e.prototype.interrupt = function(e) {
            var t = this;
            e || t.autoPlay(), t.interrupted = e
        }, e.prototype.selectHandler = function(e) {
            var t = this,
                i = $(e.target).is(".slick-slide") ? $(e.target) : $(e.target).parents(".slick-slide"),
                n = parseInt(i.attr("data-slick-index"));
            return n || (n = 0), t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(n), void t.asNavFor(n)) : void t.slideHandler(n)
        }, e.prototype.slideHandler = function(e, t, i) {
            var n, a, s, o, r = null,
                l = this,
                d;
            if (t = t || !1, (l.animating !== !0 || l.options.waitForAnimate !== !0) && !(l.options.fade === !0 && l.currentSlide === e || l.slideCount <= l.options.slidesToShow)) return t === !1 && l.asNavFor(e), n = e, r = l.getLeft(n), o = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? o : l.swipeLeft, l.options.infinite === !1 && l.options.centerMode === !1 && (e < 0 || e > l.getDotCount() * l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(o, function() {
                l.postSlide(n)
            }) : l.postSlide(n))) : l.options.infinite === !1 && l.options.centerMode === !0 && (e < 0 || e > l.slideCount - l.options.slidesToScroll) ? void(l.options.fade === !1 && (n = l.currentSlide, i !== !0 ? l.animateSlide(o, function() {
                l.postSlide(n)
            }) : l.postSlide(n))) : (l.options.autoplay && clearInterval(l.autoPlayTimer), a = n < 0 ? l.slideCount % l.options.slidesToScroll !== 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + n : n >= l.slideCount ? l.slideCount % l.options.slidesToScroll !== 0 ? 0 : n - l.slideCount : n, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, a]), s = l.currentSlide, l.currentSlide = a, l.setSlideClasses(l.currentSlide), l.options.asNavFor && (d = l.getNavTarget(), d = d.slick("getSlick"), d.slideCount <= d.options.slidesToShow && d.setSlideClasses(l.currentSlide)), l.updateDots(), l.updateArrows(), l.options.fade === !0 ? (i !== !0 ? (l.fadeSlideOut(s), l.fadeSlide(a, function() {
                l.postSlide(a)
            })) : l.postSlide(a), void l.animateHeight()) : void(i !== !0 ? l.animateSlide(r, function() {
                l.postSlide(a)
            }) : l.postSlide(a)))
        }, e.prototype.startLoad = function() {
            var e = this;
            e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), e.options.dots === !0 && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
        }, e.prototype.swipeDirection = function() {
            var e, t, i, n, a = this;
            return e = a.touchObject.startX - a.touchObject.curX, t = a.touchObject.startY - a.touchObject.curY, i = Math.atan2(t, e), n = Math.round(180 * i / Math.PI), n < 0 && (n = 360 - Math.abs(n)), n <= 45 && n >= 0 ? a.options.rtl === !1 ? "left" : "right" : n <= 360 && n >= 315 ? a.options.rtl === !1 ? "left" : "right" : n >= 135 && n <= 225 ? a.options.rtl === !1 ? "right" : "left" : a.options.verticalSwiping === !0 ? n >= 35 && n <= 135 ? "down" : "up" : "vertical";
        }, e.prototype.swipeEnd = function(e) {
            var t = this,
                i, n;
            if (t.dragging = !1, t.interrupted = !1, t.shouldClick = !(t.touchObject.swipeLength > 10), void 0 === t.touchObject.curX) return !1;
            if (t.touchObject.edgeHit === !0 && t.$slider.trigger("edge", [t, t.swipeDirection()]), t.touchObject.swipeLength >= t.touchObject.minSwipe) {
                switch (n = t.swipeDirection()) {
                    case "left":
                    case "down":
                        i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide + t.getSlideCount()) : t.currentSlide + t.getSlideCount(), t.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        i = t.options.swipeToSlide ? t.checkNavigable(t.currentSlide - t.getSlideCount()) : t.currentSlide - t.getSlideCount(), t.currentDirection = 1
                }
                "vertical" != n && (t.slideHandler(i), t.touchObject = {}, t.$slider.trigger("swipe", [t, n]))
            } else t.touchObject.startX !== t.touchObject.curX && (t.slideHandler(t.currentSlide), t.touchObject = {})
        }, e.prototype.swipeHandler = function(e) {
            var t = this;
            if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && e.type.indexOf("mouse") !== -1)) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
                case "start":
                    t.swipeStart(e);
                    break;
                case "move":
                    t.swipeMove(e);
                    break;
                case "end":
                    t.swipeEnd(e)
            }
        }, e.prototype.swipeMove = function(e) {
            var t = this,
                i = !1,
                n, a, s, o, r;
            return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!t.dragging || r && 1 !== r.length) && (n = t.getLeft(t.currentSlide), t.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, t.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), t.options.verticalSwiping === !0 && (t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)))), a = t.swipeDirection(), "vertical" !== a ? (void 0 !== e.originalEvent && t.touchObject.swipeLength > 4 && e.preventDefault(), o = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), t.options.verticalSwiping === !0 && (o = t.touchObject.curY > t.touchObject.startY ? 1 : -1), s = t.touchObject.swipeLength, t.touchObject.edgeHit = !1, t.options.infinite === !1 && (0 === t.currentSlide && "right" === a || t.currentSlide >= t.getDotCount() && "left" === a) && (s = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), t.options.vertical === !1 ? t.swipeLeft = n + s * o : t.swipeLeft = n + s * (t.$list.height() / t.listWidth) * o, t.options.verticalSwiping === !0 && (t.swipeLeft = n + s * o), t.options.fade !== !0 && t.options.touchMove !== !1 && (t.animating === !0 ? (t.swipeLeft = null, !1) : void t.setCSS(t.swipeLeft))) : void 0)
        }, e.prototype.swipeStart = function(e) {
            var t = this,
                i;
            return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (i = e.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : e.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : e.clientY, void(t.dragging = !0))
        }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
            var e = this;
            null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
        }, e.prototype.unload = function() {
            var e = this;
            $(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        }, e.prototype.unslick = function(e) {
            var t = this;
            t.$slider.trigger("unslick", [t, e]), t.destroy()
        }, e.prototype.updateArrows = function() {
            var e = this,
                t;
            t = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        }, e.prototype.updateDots = function() {
            var e = this;
            null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
        }, e.prototype.visibility = function() {
            var e = this;
            e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
        }, $.fn.slick = function() {
            var t = this,
                i = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                a = t.length,
                s, o;
            for (s = 0; s < a; s++)
                if ("object" == typeof i || "undefined" == typeof i ? t[s].slick = new e(t[s], i) : o = t[s].slick[i].apply(t[s].slick, n), "undefined" != typeof o) return o;
            return t
        }
    });

    var dateFormat = function() {
    var e = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        t = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        i = /[^-+\dA-Z]/g,
        n = function(e, t) {
            for (e = String(e), t = t || 2; e.length < t;) e = "0" + e;
            return e
        };
    return function(a, s, o) {
        var r = dateFormat;
        if (1 != arguments.length || "[object String]" != Object.prototype.toString.call(a) || /\d/.test(a) || (s = a, a = void 0), a = a ? new Date(a) : new Date, isNaN(a)) throw SyntaxError("invalid date");
        s = String(r.masks[s] || s || r.masks.default), "UTC:" == s.slice(0, 4) && (s = s.slice(4), o = !0);
        var l = o ? "getUTC" : "get",
            d = a[l + "Date"](),
            u = a[l + "Day"](),
            c = a[l + "Month"](),
            h = a[l + "FullYear"](),
            p = a[l + "Hours"](),
            m = a[l + "Minutes"](),
            g = a[l + "Seconds"](),
            f = a[l + "Milliseconds"](),
            _ = o ? 0 : a.getTimezoneOffset(),
            v = {
                d: d,
                dd: n(d),
                ddd: r.i18n.dayNames[u],
                dddd: r.i18n.dayNames[u + 7],
                m: c + 1,
                mm: n(c + 1),
                mmm: r.i18n.monthNames[c],
                mmmm: r.i18n.monthNames[c + 12],
                yy: String(h).slice(2),
                yyyy: h,
                h: p % 12 || 12,
                hh: n(p % 12 || 12),
                H: p,
                HH: n(p),
                M: m,
                MM: n(m),
                s: g,
                ss: n(g),
                l: n(f, 3),
                L: n(f > 99 ? Math.round(f / 10) : f),
                t: p < 12 ? "a" : "p",
                tt: p < 12 ? "am" : "pm",
                T: p < 12 ? "A" : "P",
                TT: p < 12 ? "AM" : "PM",
                Z: o ? "UTC" : (String(a).match(t) || [""]).pop().replace(i, ""),
                o: (_ > 0 ? "-" : "+") + n(100 * Math.floor(Math.abs(_) / 60) + Math.abs(_) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };
        return s.replace(e, function(e) {
            return e in v ? v[e] : e.slice(1, e.length - 1)
        })
    }
}();
dateFormat.masks = {
        default: "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    }, dateFormat.i18n = {
        dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }, Date.prototype.format = function(e, t) {
        return dateFormat(this, e, t)
    }, ! function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("BestDayAccessibleAutocomplete",[], t) : "object" == typeof exports ? exports.accessibleAutocomplete = t() : e.accessibleAutocomplete = t()
    }(this, function() {
        return function(e) {
            function t(n) {
                if (i[n]) return i[n].exports;
                var a = i[n] = {
                    i: n,
                    l: !1,
                    exports: {}
                };
                return e[n].call(a.exports, a, a.exports, t), a.l = !0, a.exports
            }
            var i = {};
            return t.m = e, t.c = i, t.i = function(e) {
                return e
            }, t.d = function(e, i, n) {
                t.o(e, i) || Object.defineProperty(e, i, {
                    configurable: !1,
                    enumerable: !0,
                    get: n
                })
            }, t.n = function(e) {
                var i = e && e.__esModule ? function() {
                    return e.default
                } : function() {
                    return e
                };
                return t.d(i, "a", i), i
            }, t.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t)
            }, t.p = "/", t(t.s = 4)
        }([function(e, t, i) {
            ! function() {
                "use strict";

                function t() {}

                function i(e, i) {
                    var n, a, s, o, r = I;
                    for (o = arguments.length; o-- > 2;) L.push(arguments[o]);
                    for (i && null != i.children && (L.length || L.push(i.children), delete i.children); L.length;)
                        if ((a = L.pop()) && void 0 !== a.pop)
                            for (o = a.length; o--;) L.push(a[o]);
                        else !0 !== a && !1 !== a || (a = null), (s = "function" != typeof e) && (null == a ? a = "" : "number" == typeof a ? a = String(a) : "string" != typeof a && (s = !1)), s && n ? r[r.length - 1] += a : r === I ? r = [a] : r.push(a), n = s;
                    var l = new t;
                    return l.nodeName = e, l.children = r, l.attributes = null == i ? void 0 : i, l.key = null == i ? void 0 : i.key, void 0 !== P.vnode && P.vnode(l), l
                }

                function n(e, t) {
                    for (var i in t) e[i] = t[i];
                    return e
                }

                function a(e, t) {
                    return i(e.nodeName, n(n({}, e.attributes), t), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children)
                }

                function s(e) {
                    !e.__d && (e.__d = !0) && 1 == E.push(e) && (P.debounceRendering || setTimeout)(o)
                }

                function o() {
                    var e, t = E;
                    for (E = []; e = t.pop();) e.__d && S(e)
                }

                function r(e, t, i) {
                    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && l(e, t.nodeName) : i || e._componentConstructor === t.nodeName
                }

                function l(e, t) {
                    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase()
                }

                function d(e) {
                    var t = n({}, e.attributes);
                    t.children = e.children;
                    var i = e.nodeName.defaultProps;
                    if (void 0 !== i)
                        for (var a in i) void 0 === t[a] && (t[a] = i[a]);
                    return t
                }

                function u(e, t) {
                    var i = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);
                    return i.__n = e, i
                }

                function c(e) {
                    e.parentNode && e.parentNode.removeChild(e)
                }

                function h(e, t, i, n, a) {
                    if ("className" === t && (t = "class"), "key" === t);
                    else if ("ref" === t) i && i(null), n && n(e);
                    else if ("class" !== t || a)
                        if ("style" === t) {
                            if (n && "string" != typeof n && "string" != typeof i || (e.style.cssText = n || ""), n && "object" == typeof n) {
                                if ("string" != typeof i)
                                    for (var s in i) s in n || (e.style[s] = "");
                                for (var s in n) e.style[s] = "number" == typeof n[s] && !1 === N.test(s) ? n[s] + "px" : n[s]
                            }
                        } else if ("dangerouslySetInnerHTML" === t) n && (e.innerHTML = n.__html || "");
                    else if ("o" == t[0] && "n" == t[1]) {
                        var o = t !== (t = t.replace(/Capture$/, ""));
                        t = t.toLowerCase().substring(2), n ? i || e.addEventListener(t, m, o) : e.removeEventListener(t, m, o), (e.__l || (e.__l = {}))[t] = n
                    } else if ("list" !== t && "type" !== t && !a && t in e) p(e, t, null == n ? "" : n), null != n && !1 !== n || e.removeAttribute(t);
                    else {
                        var r = a && t !== (t = t.replace(/^xlink\:?/, ""));
                        null == n || !1 === n ? r ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof n && (r ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), n) : e.setAttribute(t, n))
                    } else e.className = n || ""
                }

                function p(e, t, i) {
                    try {
                        e[t] = i
                    } catch (e) {}
                }

                function m(e) {
                    if(isIE && e.type === 'blur' && document.activeElement.id === 'city_autocomplete_container') {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        e.target.focus();
                        return;
                    }
                    return this.__l[e.type](P.event && P.event(e) || e)
                }

                function g() {
                    for (var e; e = F.pop();) P.afterMount && P.afterMount(e), e.componentDidMount && e.componentDidMount()
                }

                function f(e, t, i, n, a, s) {
                    R++ || (H = null != a && void 0 !== a.ownerSVGElement, B = null != e && !("__preactattr_" in e));
                    var o = _(e, t, i, n, s);
                    return a && o.parentNode !== a && a.appendChild(o), --R || (B = !1, s || g()), o
                }

                function _(e, t, i, n, a) {
                    var s = e,
                        o = H;
                    if (null == t && (t = ""), "string" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || a) ? e.nodeValue != t && (e.nodeValue = t) : (s = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(s, e), y(e, !0))), s.__preactattr_ = !0, s;
                    if ("function" == typeof t.nodeName) return A(e, t, i, n);
                    if (H = "svg" === t.nodeName || "foreignObject" !== t.nodeName && H, (!e || !l(e, String(t.nodeName))) && (s = u(String(t.nodeName), H), e)) {
                        for (; e.firstChild;) s.appendChild(e.firstChild);
                        e.parentNode && e.parentNode.replaceChild(s, e), y(e, !0)
                    }
                    var r = s.firstChild,
                        d = s.__preactattr_ || (s.__preactattr_ = {}),
                        c = t.children;
                    return !B && c && 1 === c.length && "string" == typeof c[0] && null != r && void 0 !== r.splitText && null == r.nextSibling ? r.nodeValue != c[0] && (r.nodeValue = c[0]) : (c && c.length || null != r) && v(s, c, i, n, B || null != d.dangerouslySetInnerHTML), b(s, t.attributes, d), H = o, s
                }

                function v(e, t, i, n, a) {
                    var s, o, l, d, u = e.childNodes,
                        h = [],
                        p = {},
                        m = 0,
                        g = 0,
                        f = u.length,
                        v = 0,
                        w = t ? t.length : 0;
                    if (0 !== f)
                        for (var b = 0; b < f; b++) {
                            var C = u[b],
                                T = C.__preactattr_,
                                k = w && T ? C._component ? C._component.__k : T.key : null;
                            null != k ? (m++, p[k] = C) : (T || (void 0 !== C.splitText ? !a || C.nodeValue.trim() : a)) && (h[v++] = C)
                        }
                    if (0 !== w)
                        for (var b = 0; b < w; b++) {
                            l = t[b], d = null;
                            var k = l.key;
                            if (null != k) m && void 0 !== p[k] && (d = p[k], p[k] = void 0, m--);
                            else if (!d && g < v)
                                for (s = g; s < v; s++)
                                    if (void 0 !== h[s] && r(o = h[s], l, a)) {
                                        d = o, h[s] = void 0, s === v - 1 && v--, s === g && g++;
                                        break
                                    }(d = _(d, l, i, n)) && d !== e && (b >= f ? e.appendChild(d) : d !== u[b] && (d === u[b + 1] ? c(u[b]) : e.insertBefore(d, u[b] || null)))
                        }
                    if (m)
                        for (var b in p) void 0 !== p[b] && y(p[b], !1);
                    for (; g <= v;) void 0 !== (d = h[v--]) && y(d, !1)
                }

                function y(e, t) {
                    var i = e._component;
                    i ? M(i) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || c(e), w(e))
                }

                function w(e) {
                    for (e = e.lastChild; e;) {
                        var t = e.previousSibling;
                        y(e, !0), e = t
                    }
                }

                function b(e, t, i) {
                    var n;
                    for (n in i) t && null != t[n] || null == i[n] || h(e, n, i[n], i[n] = void 0, H);
                    for (n in t) "children" === n || "innerHTML" === n || n in i && t[n] === ("value" === n || "checked" === n ? e[n] : i[n]) || h(e, n, i[n], i[n] = t[n], H)
                }

                function C(e) {
                    var t = e.constructor.name;
                    (W[t] || (W[t] = [])).push(e)
                }

                function T(e, t, i) {
                    var n, a = W[e.name];
                    if (e.prototype && e.prototype.render ? (n = new e(t, i), O.call(n, t, i)) : (n = new O(t, i), n.constructor = e, n.render = k), a)
                        for (var s = a.length; s--;)
                            if (a[s].constructor === e) {
                                n.__b = a[s].__b, a.splice(s, 1);
                                break
                            }
                    return n
                }

                function k(e, t, i) {
                    return this.constructor(e, i)
                }

                function x(e, t, i, n, a) {
                    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || a ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, n), n && n !== e.context && (e.__c || (e.__c = e.context), e.context = n), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== i && (1 !== i && !1 === P.syncComponentUpdates && e.base ? s(e) : S(e, 1, a)), e.__r && e.__r(e))
                }

                function S(e, t, i, a) {
                    if (!e.__x) {
                        var s, o, r, l = e.props,
                            u = e.state,
                            c = e.context,
                            h = e.__p || l,
                            p = e.__s || u,
                            m = e.__c || c,
                            _ = e.base,
                            v = e.__b,
                            w = _ || v,
                            b = e._component,
                            C = !1;
                        if (_ && (e.props = h, e.state = p, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(l, u, c) ? C = !0 : e.componentWillUpdate && e.componentWillUpdate(l, u, c), e.props = l, e.state = u, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !C) {
                            s = e.render(l, u, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));
                            var k, A, O = s && s.nodeName;
                            if ("function" == typeof O) {
                                var D = d(s);
                                o = b, o && o.constructor === O && D.key == o.__k ? x(o, D, 1, c, !1) : (k = o, e._component = o = T(O, D, c), o.__b = o.__b || v, o.__u = e, x(o, D, 0, c, !1), S(o, 1, i, !0)), A = o.base
                            } else r = w, k = b, k && (r = e._component = null), (w || 1 === t) && (r && (r._component = null), A = f(r, s, c, i || !_, w && w.parentNode, !0));
                            if (w && A !== w && o !== b) {
                                var L = w.parentNode;
                                L && A !== L && (L.replaceChild(A, w), k || (w._component = null, y(w, !1)))
                            }
                            if (k && M(k), e.base = A, A && !a) {
                                for (var I = e, N = e; N = N.__u;)(I = N).base = A;
                                A._component = I, A._componentConstructor = I.constructor
                            }
                        }
                        if (!_ || i ? F.unshift(e) : C || (g(), e.componentDidUpdate && e.componentDidUpdate(h, p, m), P.afterUpdate && P.afterUpdate(e)), null != e.__h)
                            for (; e.__h.length;) e.__h.pop().call(e);
                        R || a || g()
                    }
                }

                function A(e, t, i, n) {
                    for (var a = e && e._component, s = a, o = e, r = a && e._componentConstructor === t.nodeName, l = r, u = d(t); a && !l && (a = a.__u);) l = a.constructor === t.nodeName;
                    return a && l && (!n || a._component) ? (x(a, u, 3, i, n), e = a.base) : (s && !r && (M(s), e = o = null), a = T(t.nodeName, u, i), e && !a.__b && (a.__b = e, o = null), x(a, u, 1, i, n), e = a.base, o && e !== o && (o._component = null, y(o, !1))), e
                }

                function M(e) {
                    P.beforeUnmount && P.beforeUnmount(e);
                    var t = e.base;
                    e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;
                    var i = e._component;
                    i ? M(i) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, c(t), C(e), w(t)), e.__r && e.__r(null)
                }

                function O(e, t) {
                    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {}
                }

                function D(e, t, i) {
                    return f(i, e, {}, !1, t, !1)
                }
                var P = {},
                    L = [],
                    I = [],
                    N = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
                    E = [],
                    F = [],
                    R = 0,
                    H = !1,
                    B = !1,
                    W = {};
                n(O.prototype, {
                    setState: function(e, t) {
                        var i = this.state;
                        this.__s || (this.__s = n({}, i)), n(i, "function" == typeof e ? e(i, this.props) : e), t && (this.__h = this.__h || []).push(t), s(this)
                    },
                    forceUpdate: function(e) {
                        e && (this.__h = this.__h || []).push(e), S(this, 2)
                    },
                    render: function() {}
                });
                var z = {
                    h: i,
                    createElement: i,
                    cloneElement: a,
                    Component: O,
                    render: D,
                    rerender: o,
                    options: P
                };
                e.exports = z
            }()
        }, function(e, t, i) {
            "use strict";

            function n(e) {
                if (!e.element) throw new Error("element is not defined");
                if (!e.id) throw new Error("id is not defined");
                if (!e.source) throw new Error("source is not defined");
                Array.isArray(e.source) && (e.source = l(e.source, e.showAllValues)), (0, s.render)((0, s.createElement)(r.default, e), e.element)
            }
            var a = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var i = arguments[t];
                        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                    }
                    return e
                },
                s = i(0),
                o = i(2),
                r = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(o),
                l = function(e, t) {
                    return function(i, n) {
                        var a = [];
                        (t || "" !== i) && (a = e.filter(function(e) {
                            return -1 !== e.toLowerCase().indexOf(i.toLowerCase())
                        })), n(a)
                    }
                };
            n.enhanceSelectElement = function(e) {
                if (!e.selectElement) throw new Error("selectElement is not defined");
                if (!e.source) {
                    var t = [].filter.call(e.selectElement.options, function(t) {
                        return t.value || e.preserveNullOptions
                    });
                    e.source = t.map(function(e) {
                        return e.innerHTML
                    })
                }
                e.onConfirm = e.onConfirm || function(t) {
                    var i = [].filter.call(e.selectElement.options, function(e) {
                        return e.innerHTML === t
                    })[0];
                    i && (i.selected = !0)
                }, (e.selectElement.value || void 0 === e.defaultValue) && (e.defaultValue = e.selectElement.options[e.selectElement.options.selectedIndex].innerHTML), e.name = e.name || "", e.id = e.id || e.selectElement.id || "", e.autoselect = e.autoselect || !0;
                var i = document.createElement("span");
                e.selectElement.parentNode.insertBefore(i, e.selectElement), n(a({}, e, {
                    element: i
                })), e.selectElement.style.display = "none", e.selectElement.id = e.selectElement.id + "-select"
            }, e.exports = n
        }, function(e, t, i) {
            "use strict";

            function n(e, t) {}

            function a(e, t) {
                if (e) return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                "function" != typeof t && null !== t || (e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t))
            }

            function o() {
                return !(!navigator.userAgent.match(/(iPod|iPhone|iPad)/g) || !navigator.userAgent.match(/AppleWebKit/g))
            }

            function r(e) {
                return e > 47 && e < 58 || 32 === e || 8 === e || e > 64 && e < 91 || e > 95 && e < 112 || e > 185 && e < 193 || e > 218 && e < 223
            }

            function l(e) {
                return g ? {
                    onInput: e
                } : f ? {
                    onChange: e
                } : void 0
            }
            t.__esModule = !0, t.default = void 0;
            var d, u, c = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var i = arguments[t];
                        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
                    }
                    return e
                },
                h = i(0),
                p = i(3),
                m = function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                }(p),
                g = !0,
                f = !1,
                _ = {
                    13: "enter",
                    27: "escape",
                    38: "up",
                    40: "down"
                },
                v = function() {
                    var e = document.createElement("x");
                    return e.style.cssText = "pointer-events:auto", "auto" === e.style.pointerEvents
                }(),
                y = (u = d = function(e) {
                    function t(i) {
                        n(this, t);
                        var s = a(this, e.call(this, i));
                        return s.elementRefs = {}, s.state = {
                            focused: null,
                            hovered: null,
                            menuOpen: !1,
                            options: i.defaultValue ? [i.defaultValue] : [],
                            query: i.defaultValue,
                            selected: null
                        }, s.handleComponentBlur = s.handleComponentBlur.bind(s), s.handleKeyDown = s.handleKeyDown.bind(s), s.handleUpArrow = s.handleUpArrow.bind(s), s.handleDownArrow = s.handleDownArrow.bind(s), s.handleEnter = s.handleEnter.bind(s), s.handlePrintableKey = s.handlePrintableKey.bind(s), s.handleOptionBlur = s.handleOptionBlur.bind(s), s.handleOptionClick = s.handleOptionClick.bind(s), s.handleOptionFocus = s.handleOptionFocus.bind(s), s.handleOptionMouseDown = s.handleOptionMouseDown.bind(s), s.handleOptionMouseEnter = s.handleOptionMouseEnter.bind(s), s.handleOptionMouseOut = s.handleOptionMouseOut.bind(s), s.handleInputBlur = s.handleInputBlur.bind(s), s.handleInputChange = s.handleInputChange.bind(s), s.handleInputFocus = s.handleInputFocus.bind(s), s.pollInputElement = s.pollInputElement.bind(s), s.getDirectInputChanges = s.getDirectInputChanges.bind(s), s
                    }
                    return s(t, e), t.prototype.componentDidMount = function() {
                        this.pollInputElement()
                    }, t.prototype.componentWillUnmount = function() {
                        clearTimeout(this.$pollInput)
                    }, t.prototype.pollInputElement = function() {
                        var e = this;
                        this.getDirectInputChanges(), this.$pollInput = setTimeout(function() {
                            e.pollInputElement()
                        }, 100)
                    }, t.prototype.getDirectInputChanges = function() {
                        var e = this.elementRefs[-1];
                        e.value !== this.state.query && this.handleInputChange({
                            target: {
                                value: e.value
                            }
                        })
                    }, t.prototype.componentDidUpdate = function(e, t) {
                        var i = this.state.focused,
                            n = null === i,
                            a = t.focused !== i;
                        a && !n && this.elementRefs[i].focus();
                        var s = -1 === i,
                            o = a && null === t.focused;
                        if (s && o) {
                            var r = this.elementRefs[i];
                            r.setSelectionRange(0, r.value.length)
                        }
                    }, t.prototype.hasAutoselect = function() {
                        return !o() && this.props.autoselect
                    }, t.prototype.templateInputValue = function(e) {
                        var t = this.props.templates && this.props.templates.inputValue;
                        return t ? t(e) : e
                    }, t.prototype.templateSuggestion = function(e) {
                        var t = this.props.templates && this.props.templates.suggestion;
                        return t ? t(e) : e
                    }, t.prototype.handleComponentBlur = function(e) {
                        var t = this.state,
                            i = t.options,
                            n = t.query,
                            a = t.selected,
                            s = void 0;
                        this.props.confirmOnBlur ? (s = e.query || n, this.props.onConfirm(i[a])) : s = n, 
                        this.setState({
                            focused: null,
                            menuOpen: false,//e.menuOpen || !1,
                            query: s,
                            selected: null
                        })
                    }, t.prototype.handleOptionBlur = function(e, t) {
                        var i = this.state,
                            n = i.focused,
                            a = i.menuOpen,
                            s = i.options,
                            r = i.selected,
                            l = null === e.relatedTarget,
                            d = e.relatedTarget === this.elementRefs[-1],
                            u = n !== t && -1 !== n;
                        if (l || !u && !d) {
                            var c = a && o();
                            this.handleComponentBlur({
                                menuOpen: c,
                                query: this.templateInputValue(s[r])
                            })
                        }
                    }, t.prototype.handleInputBlur = function(e) {

                        var t = this.state,
                            i = t.focused,
                            n = t.menuOpen,
                            a = t.options,
                            s = t.query,
                            r = t.selected;
                            // console.log( "HANDLE INPUT BLUR", i, n, a, s, r );
                        if (-1 === i) {
                            var l = n && o(),
                                d = o() ? s : this.templateInputValue(a[r]);
                                // console.log( "HANDLE INPUT BLUR", l, d );
                            this.handleComponentBlur({
                                menuOpen: l,
                                query: d
                            })
                        }
                    }, t.prototype.handleInputChange = function(e) {
                        var t = this,
                            i = this.props,
                            n = i.minLength,
                            a = i.source,
                            s = i.showAllValues,
                            o = this.hasAutoselect(),
                            r = e.target.value,
                            l = 0 === r.length,
                            d = this.state.query.length !== r.length,
                            u = r.length >= n;
                        this.setState({
                            query: r
                        }), s || !l && d && u ? a(r, function(e) {
                            var i = e.length > 0;
                            t.setState({
                                menuOpen: i,
                                options: e,
                                selected: o && i ? 0 : -1
                            })
                        }) : !l && u || this.setState({
                            menuOpen: !1,
                            options: []
                        })
                    }, t.prototype.handleInputClick = function(e) {
                        this.handleInputChange(e)
                    }, t.prototype.handleInputFocus = function(e) {
                        this.setState({
                            menuOpen: !0,
                            focused: -1
                        }), this.handleInputChange(e)
                    }, t.prototype.handleOptionFocus = function(e) {
                        this.setState({
                            focused: e,
                            hovered: null,
                            selected: e
                        })
                    }, t.prototype.handleOptionMouseEnter = function(e, t) {
                        this.setState({
                            hovered: t
                        })
                    }, t.prototype.handleOptionMouseOut = function(e, t) {
                        this.setState({
                            hovered: null
                        })
                    }, t.prototype.handleOptionClick = function(e, t) {
                        var i = this.state.options[t],
                            n = this.templateInputValue(i);
                        this.props.onConfirm(i), this.setState({
                            focused: -1,
                            menuOpen: !1,
                            query: n,
                            selected: -1
                        })
                    }, t.prototype.handleOptionMouseDown = function(e) {
                        e.preventDefault()
                    }, t.prototype.handleUpArrow = function(e) {
                        e.preventDefault();
                        var t = this.state,
                            i = t.menuOpen,
                            n = t.selected; - 1 !== n && i && this.handleOptionFocus(n - 1)
                    }, t.prototype.handleDownArrow = function(e) {
                        e.preventDefault();
                        var t = this.state,
                            i = t.menuOpen,
                            n = t.options,
                            a = t.selected;
                        a !== n.length - 1 && i && this.handleOptionFocus(a + 1)
                    }, t.prototype.handleEnter = function(e) {
                        this.state.menuOpen && (e.preventDefault(), this.state.selected >= 0 && this.handleOptionClick(e, this.state.selected))
                    }, t.prototype.handlePrintableKey = function(e) {
                        var t = this.elementRefs[-1];
                        e.target === t || this.handleInputFocus()
                    }, t.prototype.handleKeyDown = function(e) {
                        switch (_[e.keyCode]) {
                            case "up":
                                this.handleUpArrow(e);
                                break;
                            case "down":
                                this.handleDownArrow(e);
                                break;
                            case "enter":
                                this.handleEnter(e);
                                break;
                            case "escape":
                                this.handleComponentBlur({
                                    query: this.state.query
                                });
                                break;
                            default:
                                r(e.keyCode) && this.handlePrintableKey(e)
                        }
                    }, t.prototype.render = function() {
                        var e = this,
                            t = this.props,
                            i = t.cssNamespace,
                            n = t.displayMenu,
                            a = t.id,
                            s = t.minLength,
                            o = t.name,
                            r = t.placeholder,
                            d = t.required,
                            u = this.state,
                            p = u.focused,
                            g = u.hovered,
                            f = u.menuOpen,
                            _ = u.options,
                            y = u.query,
                            w = u.selected,
                            b = this.hasAutoselect(),
                            C = -1 === p,
                            T = 0 === _.length,
                            k = 0 !== y.length,
                            x = y.length >= s,
                            S = this.props.showNoOptionsFound && C && T && k && x,
                            A = i + "__wrapper",
                            M = i + "__input",
                            O = null !== p,
                            D = O ? " " + M + "--focused" : "",
                            P = -1 !== p && null !== p,
                            L = i + "__menu",
                            I = L + "--" + n,
                            N = f || S,
                            E = L + "--" + (N ? "visible" : "hidden"),
                            F = i + "__option",
                            R = i + "__hint",
                            H = this.templateInputValue(_[w]),
                            B = H && 0 === H.toLowerCase().indexOf(y.toLowerCase()),
                            W = B && b ? y + H.substr(y.length) : "",
                            z = v && W;
                        return (0, h.createElement)("div", {
                            className: A,
                            onKeyDown: this.handleKeyDown
                        }, (0, h.createElement)(m.default, {
                            length: _.length,
                            queryLength: y.length,
                            minQueryLength: s,
                            selectedOption: this.templateInputValue(_[w])
                        }), z && (0, h.createElement)("span", null, (0, h.createElement)("input", {
                            className: R,
                            readonly: !0,
                            tabIndex: "-1",
                            value: W
                        })), (0, h.createElement)("input", c({
                            "aria-activedescendant": !!P && a + "__option--" + p,
                            "aria-expanded": f,
                            "aria-owns": a + "__listbox",
                            autoComplete: "off",
                            className: "" + M + D,
                            id: a,
                            onClick: function(t) {
                                return e.handleInputClick(t)
                            },
                            onBlur: this.handleInputBlur
                        }, l(this.handleInputChange), {
                            onFocus: this.handleInputFocus,
                            name: o,
                            placeholder: r,
                            ref: function(t) {
                                e.elementRefs[-1] = t
                            },
                            role: "combobox",
                            type: "text",
                            required: d,
                            value: y
                        })), (0, h.createElement)("ul", {
                            className: L + " " + I + " " + E,
                            id: a + "__listbox",
                            role: "listbox"
                        }, _.map(function(t, i) {
                            var n = -1 === p ? w === i : p === i,
                                s = n && null === g ? " " + F + "--focused" : "",
                                o = i % 2 ? " " + F + "--odd" : "";
                            return (0, h.createElement)("li", {
                                "aria-selected": p === i,
                                className: "" + F + s + o,
                                dangerouslySetInnerHTML: {
                                    __html: e.templateSuggestion(t)
                                },
                                id: a + "__option--" + i,
                                key: i,
                                onBlur: function(t) {
                                    return e.handleOptionBlur(t, i)
                                },
                                onClick: function(t) {
                                    return e.handleOptionClick(t, i)
                                },
                                onMouseDown: e.handleOptionMouseDown,
                                onMouseEnter: function(t) {
                                    return e.handleOptionMouseEnter(t, i)
                                },
                                onMouseOut: function(t) {
                                    return e.handleOptionMouseOut(t, i)
                                },
                                ref: function(t) {
                                    e.elementRefs[i] = t
                                },
                                role: "option",
                                tabIndex: "-1"
                            })
                        }), S && (0, h.createElement)("li", {
                            className: F + " " + F + "--no-results"
                        }, "No results found")))
                    }, t
                }(h.Component), d.defaultProps = {
                    autoselect: !1,
                    cssNamespace: "autocomplete",
                    defaultValue: "",
                    displayMenu: "inline",
                    minLength: 0,
                    name: "input-autocomplete",
                    placeholder: "",
                    onConfirm: function() {},
                    confirmOnBlur: !0,
                    showNoOptionsFound: !0,
                    showAllValues: !1,
                    required: !1
                }, u);
            t.default = y
        }, function(e, t, i) {
            "use strict";

            function n(e, t) {}

            function a(e, t) {
                if (e) return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                "function" != typeof t && null !== t || (e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t))
            }
            t.__esModule = !0, t.default = void 0;
            var o = i(0),
                r = function(e) {
                    function t() {
                        var i, s, o;
                        n(this, t);
                        for (var r = arguments.length, l = Array(r), d = 0; d < r; d++) l[d] = arguments[d];
                        return i = s = a(this, e.call.apply(e, [this].concat(l))), s.state = {
                            bump: !1
                        }, o = i, a(s, o)
                    }
                    return s(t, e), t.prototype.componentWillReceiveProps = function(e) {
                        e.queryLength !== this.props.queryLength && this.setState(function(e) {
                            return {
                                bump: !e.bump
                            }
                        })
                    }, t.prototype.render = function() {
                        var e = this.props,
                            t = e.length,
                            i = e.queryLength,
                            n = e.minQueryLength,
                            a = e.selectedOption,
                            s = this.state.bump,
                            r = {
                                result: 1 === t ? "result" : "results",
                                is: 1 === t ? "is" : "are"
                            },
                            l = i < n,
                            d = 0 === t,
                            u = a ? (0, o.createElement)("span", null, a, " (1 of ", t, ") is selected.") : null,
                            c = null;
                        return c = l ? (0, o.createElement)("span", null, "Type in ", n, " or more characters for results.") : d ? (0, o.createElement)("span", null, "No search results.") : (0, o.createElement)("span", null, t, " ", r.result, " ", r.is, " available. ", u), (0, o.createElement)("div", {
                            "aria-atomic": "true",
                            "aria-live": "polite",
                            role: "status",
                            style: {
                                border: "0",
                                clip: "rect(0 0 0 0)",
                                height: "1px",
                                marginBottom: "-1px",
                                marginRight: "-1px",
                                overflow: "hidden",
                                padding: "0",
                                position: "absolute",
                                whiteSpace: "nowrap",
                                width: "1px"
                            }
                        }, c, (0, o.createElement)("span", null, s ? "," : ",,"))
                    }, t
                }(o.Component);
            t.default = r
        }, function(e, t, i) {
            e.exports = i(1)
        }])
    }),











(function(factory) {  // Try to register as an anonymous AMD module
        if (typeof define === 'function' && define.amd) {
            define( "BestDayLocation", ['jquery','TweenLite'], factory);
        }
        else {
            factory(jQuery, TweenLite);
        }
    }(function() {
        
        this.Distilled = this.Distilled || {};
        var e = function(e, t, n) {
            this._init(e, t, n)
        };
        e.prototype = {
            mData: null,
            mMonths: null,
            mPerfectFactorSummer: null,
            mPerfectFactorSpring: null,
            mPerfectFactorWinter: null,
            mPerfectFactorAutumn: null,
            mPerfectDay: null,
            mPerfectDaySummer: null,
            mPerfectDaySpring: null,
            mPerfectDayWinter: null,
            mPerfectDayAutumn: null,
            load: function(e) {
                this._load(e)
            },
            setDay: function(e, t) {
                if (!this.mData) return null;
                var n = $(e),
                    i = new Date(t),
                    a = i.getMonth(),
                    o = i.getDate() - 1,
                    s = i.getFullYear(),
                    r = this.mMonths[a][o],
                    l = "highlight_" + r.colour;
                1 == r.isPerfectDay && s == r.year && (l += " perfect_day");
                var u = n.parent();
                // console.log( "JQUERY VERSION:", $.fn.jquery );
                u.data("day", r),
                u.attr("data-day", JSON.stringify(r)), 
                u.addClass(l)
            },
            getLocationTitle: function() {
                return this.mData.name
            },
            getTwitterDate: function() {
                return this.mPerfectDaySummer.date.format("mmm d")
            },
            getPerfectDay: function() {
                var e = this.mPerfectDay;
                return e.dateHTML = this._formatDate(e.date) + "<span class='asterisk'>&#42;</span>", e
            },
            getPerfectSummer: function() {
                var e = this.mPerfectDaySummer.date;
                return this._formatDate(e)
            },
            getPerfectSpring: function() {
                var e = this.mPerfectDaySpring.date;
                return this._formatDate(e)
            },
            getPerfectAutumn: function() {
                var e = this.mPerfectDayAutumn.date;
                return this._formatDate(e)
            },
            getPerfectWinter: function() {
                var e = this.mPerfectDayWinter.date;
                return this._formatDate(e)
            },
            _init: function(e, t, n) {
                this.mCompleteCallback = e, this.mErrorCallback = t, this.mCallbackScope = n
            },
            _format: function(e) {
                this.mData = e, this._calculateScore(), this._getMonths(), this.mCompleteCallback.call(this.mCallbackScope)
            },
            _calculateScore: function() {
                for (var e, t, n, i, a, o, s, r = this.mData.months, l = r.length, u = Math.abs, d = null, c = null, h = new Date, p = h.getDate(), f = h.getMonth(), m = h.getFullYear(), g = 0; g < l; g++) {
                    e = r[g], t = parseInt(e.id) - 1, days = e.days, totalDays = days.length;
                    for (var v = 0; v < totalDays; v++) o = new Date(a, t, v + 1), s = o.getDay(), a = t == f && s <= p ? m + 1 : t < f ? m + 1 : m, n = days[v], i = u(parseFloat(n.perfectFactor)), n.perfectFactor = i, n.isWeekend = !1, n.isPerfectDay = !1, n.date = o, n.id = v, n.month = g, n.year = a, n.humidity = (100 * n.humidity).toFixed(1), n.chanceClear = (100 * n.chanceClear).toFixed(1), n.chanceRain = (100 * n.chanceRain).toFixed(1), 6 != s && 0 != s || (n.isWeekend = !0, t >= 2 && t <= 4 ? (null == this.mPerfectFactorSpring || i < this.mPerfectFactorSpring) && (this.mPerfectFactorSpring = i, this.mPerfectDaySpring = n) : t >= 5 && t <= 7 ? (null == this.mPerfectFactorSummer || i < this.mPerfectFactorSummer) && (this.mPerfectFactorSummer = i, this.mPerfectDaySummer = n) : t >= 8 && t <= 10 ? (null == this.mPerfectFactorAutumn || i < this.mPerfectFactorAutumn) && (this.mPerfectFactorAutumn = i, this.mPerfectDayAutumn = n) : 0 != t && 1 != t && 11 != t || (null == this.mPerfectFactorWinter || i < this.mPerfectFactorWinter) && (this.mPerfectFactorWinter = i, this.mPerfectDayWinter = n), (null == d || i < d) && (d = i), (null == c || i > c) && (c = i))
                }
                this.mPerfectDaySummer.season = "summer", this.mPerfectDaySpring.season = "spring", this.mPerfectDayAutumn.season = "fall", this.mPerfectDayWinter.season = "winter";
                var y = this.mPerfectDaySummer;
                this.mPerfectDaySpring.perfectFactor < y.perfectFactor && (y = this.mPerfectDaySpring), this.mPerfectDayAutumn.perfectFactor < y.perfectFactor && (y = this.mPerfectDayAutumn), this.mPerfectDayWinter.perfectFactor < y.perfectFactor && (y = this.mPerfectDayWinter), y.isPerfectDay = !0, this.mPerfectDay = y
            },
            _getMonths: function() {
                for (var e, t, n = this.mData.months, i = {}, a = n.length, o = 0; o < a; o++) e = n[o], t = parseInt(e.id) - 1, i[t] = e.days;
                this.mMonths = i
            },
            _sortByName: function(e, t) {
                return e.name < t.name ? -1 : e.name > t.name ? 1 : 0
            },
            _load: function(e) {
                this._reset();
                var t = window.location.origin;
                window.location.origin || (t = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""));
                var n = t + "/b/fashion/assets/projects/best-wedding-dates-united-states/" + e + ".json",
                // var n = t + window.location.pathname + "data/"+ e +".json",
                // var n = "data/"+ e +".json",
                    i = this;
                $.ajax({
                    dataType: "json",
                    url: n,
                    success: function(e) {
                        i._format(e)
                    },
                    fail: function(e, t) {
                        i._error()
                    }
                })
            },
            _reset: function() {
                this.mData = null, this.mMonths = null, this.mPerfectFactorSummer = null, this.mPerfectFactorSpring = null, this.mPerfectFactorWinter = null, this.mPerfectFactorAutumn = null, this.mPerfectDaySummer = null, this.mPerfectDaySpring = null, this.mPerfectDayWinter = null, this.mPerfectDayAutumn = null
            },
            _error: function() {
                this.mErrorCallback.call(this.mCallbackScope)
            },
            _formatDate: function(e) {
                return "<span class='month'>" + e.format("mmmm dS") + ",</span> <span class='year'>" + e.format("yyyy") + "</span>"
            }
        }, this.Distilled.Location = e
    })),
    (function(factory) {  // Try to register as an anonymous AMD module
        if (typeof define === 'function' && define.amd) {
            define( "BestDayLocations", ['jquery','TweenLite'], factory);
        }
        else {
            factory(jQuery, TweenLite);
        }
    }(function($x, TweenLite) {
        
        this.Distilled = this.Distilled || {};
        var e = function() {
            this._init()
        };
        e.prototype = {
            mData: null,
            getData: function() {
                for (var e = [], t = this.mData, n = t.length, i = 0; i < n; i++) e.push(t[i].name);
                return e
            },
            getComboHTML: function() {
                for (var e, t, n = this.mData, i = n.length, a = '<option value="">Select a location...</option>', o = 0; o < i; o++) e = n[o].slug, t = n[o].name, a += '<option value="' + e + '">' + t + "</option>";
                return a
            },
            find: function(e) {
                if (!e) return null;
                for (var t = this.mData, n = t.length, i = null, a = 0; a < n; a++)
                    if (t[a].slug == e || t[a].name == e) {
                        i = t[a];
                        break
                    }
                return i
            },
            _init: function() {
                this._load()
            },
            _format: function(e) {
                this.mData = e, this.mData.sort(this._sortByName)
            },
            _sortByName: function(e, t) {
                return e.name < t.name ? -1 : e.name > t.name ? 1 : 0
            },
            _load: function() {
                this._format([{
                    slug: "abilene-tx",
                    id: 0,
                    name: "Abilene, TX"
                }, {
                    slug: "addison-il",
                    id: 1,
                    name: "Addison, IL"
                }, {
                    slug: "akron-oh",
                    id: 2,
                    name: "Akron, OH"
                }, {
                    slug: "alameda-ca",
                    id: 3,
                    name: "Alameda, CA"
                }, {
                    slug: "albany-ga",
                    id: 4,
                    name: "Albany, GA"
                }, {
                    slug: "albany-ny",
                    id: 5,
                    name: "Albany, NY"
                }, {
                    slug: "albany-or",
                    id: 6,
                    name: "Albany, OR"
                }, {
                    slug: "albuquerque-nm",
                    id: 7,
                    name: "Albuquerque, NM"
                }, {
                    slug: "alexandria-la",
                    id: 8,
                    name: "Alexandria, LA"
                }, {
                    slug: "alexandria-va",
                    id: 9,
                    name: "Alexandria, VA"
                }, {
                    slug: "alhambra-ca",
                    id: 10,
                    name: "Alhambra, CA"
                }, {
                    slug: "aliso-viejo-ca",
                    id: 11,
                    name: "Aliso Viejo, CA"
                }, {
                    slug: "allen-tx",
                    id: 12,
                    name: "Allen, TX"
                }, {
                    slug: "allentown-pa",
                    id: 13,
                    name: "Allentown, PA"
                }, {
                    slug: "alpharetta-ga",
                    id: 14,
                    name: "Alpharetta, GA"
                }, {
                    slug: "altamonte-springs-fl",
                    id: 15,
                    name: "Altamonte Springs, FL"
                }, {
                    slug: "altoona-pa",
                    id: 16,
                    name: "Altoona, PA"
                }, {
                    slug: "amarillo-tx",
                    id: 17,
                    name: "Amarillo, TX"
                }, {
                    slug: "ames-ia",
                    id: 18,
                    name: "Ames, IA"
                }, {
                    slug: "anaheim-ca",
                    id: 19,
                    name: "Anaheim, CA"
                }, {
                    slug: "anchorage-ak",
                    id: 20,
                    name: "Anchorage, AK"
                }, {
                    slug: "anderson-in",
                    id: 21,
                    name: "Anderson, IN"
                }, {
                    slug: "ankeny-ia",
                    id: 22,
                    name: "Ankeny, IA"
                }, {
                    slug: "ann-arbor-mi",
                    id: 23,
                    name: "Ann Arbor, MI"
                }, {
                    slug: "annapolis-md",
                    id: 24,
                    name: "Annapolis, MD"
                }, {
                    slug: "antioch-ca",
                    id: 25,
                    name: "Antioch, CA"
                }, {
                    slug: "apache-junction-az",
                    id: 26,
                    name: "Apache Junction, AZ"
                }, {
                    slug: "apex-nc",
                    id: 27,
                    name: "Apex, NC"
                }, {
                    slug: "apopka-fl",
                    id: 28,
                    name: "Apopka, FL"
                }, {
                    slug: "apple-valley-ca",
                    id: 29,
                    name: "Apple Valley, CA"
                }, {
                    slug: "apple-valley-mn",
                    id: 30,
                    name: "Apple Valley, MN"
                }, {
                    slug: "appleton-wi",
                    id: 31,
                    name: "Appleton, WI"
                }, {
                    slug: "arcadia-ca",
                    id: 32,
                    name: "Arcadia, CA"
                }, {
                    slug: "arlington-heights-il",
                    id: 33,
                    name: "Arlington Heights, IL"
                }, {
                    slug: "arlington-tx",
                    id: 34,
                    name: "Arlington, TX"
                }, {
                    slug: "arvada-co",
                    id: 35,
                    name: "Arvada, CO"
                }, {
                    slug: "asheville-nc",
                    id: 36,
                    name: "Asheville, NC"
                }, {
                    slug: "athens-ga",
                    id: 37,
                    name: "Athens, GA"
                }, {
                    slug: "atlanta-ga",
                    id: 38,
                    name: "Atlanta, GA"
                }, {
                    slug: "atlantic-city-nj",
                    id: 39,
                    name: "Atlantic City, NJ"
                }, {
                    slug: "attleboro-ma",
                    id: 40,
                    name: "Attleboro, MA"
                }, {
                    slug: "auburn-al",
                    id: 41,
                    name: "Auburn, AL"
                }, {
                    slug: "auburn-wa",
                    id: 42,
                    name: "Auburn, WA"
                }, {
                    slug: "augusta-ga",
                    id: 43,
                    name: "Augusta, GA"
                }, {
                    slug: "aurora-co",
                    id: 44,
                    name: "Aurora, CO"
                }, {
                    slug: "aurora-il",
                    id: 45,
                    name: "Aurora, IL"
                }, {
                    slug: "austin-tx",
                    id: 46,
                    name: "Austin, TX"
                }, {
                    slug: "aventura-fl",
                    id: 47,
                    name: "Aventura, FL"
                }, {
                    slug: "avondale-az",
                    id: 48,
                    name: "Avondale, AZ"
                }, {
                    slug: "azusa-ca",
                    id: 49,
                    name: "Azusa, CA"
                }, {
                    slug: "bakersfield-ca",
                    id: 50,
                    name: "Bakersfield, CA"
                }, {
                    slug: "baldwin-park-ca",
                    id: 51,
                    name: "Baldwin Park, CA"
                }, {
                    slug: "baltimore-md",
                    id: 52,
                    name: "Baltimore, MD"
                }, {
                    slug: "barnstable-town-ma",
                    id: 53,
                    name: "Barnstable Town, MA"
                }, {
                    slug: "bartlett-il",
                    id: 54,
                    name: "Bartlett, IL"
                }, {
                    slug: "bartlett-tn",
                    id: 55,
                    name: "Bartlett, TN"
                }, {
                    slug: "baton-rouge-la",
                    id: 56,
                    name: "Baton Rouge, LA"
                }, {
                    slug: "battle-creek-mi",
                    id: 57,
                    name: "Battle Creek, MI"
                }, {
                    slug: "bayonne-nj",
                    id: 58,
                    name: "Bayonne, NJ"
                }, {
                    slug: "baytown-tx",
                    id: 59,
                    name: "Baytown, TX"
                }, {
                    slug: "beaumont-ca",
                    id: 60,
                    name: "Beaumont, CA"
                }, {
                    slug: "beaumont-tx",
                    id: 61,
                    name: "Beaumont, TX"
                }, {
                    slug: "beavercreek-oh",
                    id: 62,
                    name: "Beavercreek, OH"
                }, {
                    slug: "beaverton-or",
                    id: 63,
                    name: "Beaverton, OR"
                }, {
                    slug: "bedford-tx",
                    id: 64,
                    name: "Bedford, TX"
                }, {
                    slug: "bell-gardens-ca",
                    id: 65,
                    name: "Bell Gardens, CA"
                }, {
                    slug: "belleville-il",
                    id: 66,
                    name: "Belleville, IL"
                }, {
                    slug: "bellevue-ne",
                    id: 67,
                    name: "Bellevue, NE"
                }, {
                    slug: "bellevue-wa",
                    id: 68,
                    name: "Bellevue, WA"
                }, {
                    slug: "bellflower-ca",
                    id: 69,
                    name: "Bellflower, CA"
                }, {
                    slug: "bellingham-wa",
                    id: 70,
                    name: "Bellingham, WA"
                }, {
                    slug: "beloit-wi",
                    id: 71,
                    name: "Beloit, WI"
                }, {
                    slug: "bend-or",
                    id: 72,
                    name: "Bend, OR"
                }, {
                    slug: "bentonville-ar",
                    id: 73,
                    name: "Bentonville, AR"
                }, {
                    slug: "berkeley-ca",
                    id: 74,
                    name: "Berkeley, CA"
                }, {
                    slug: "berwyn-il",
                    id: 75,
                    name: "Berwyn, IL"
                }, {
                    slug: "bethlehem-pa",
                    id: 76,
                    name: "Bethlehem, PA"
                }, {
                    slug: "beverly-ma",
                    id: 77,
                    name: "Beverly, MA"
                }, {
                    slug: "billings-mt",
                    id: 78,
                    name: "Billings, MT"
                }, {
                    slug: "biloxi-ms",
                    id: 79,
                    name: "Biloxi, MS"
                }, {
                    slug: "binghamton-ny",
                    id: 80,
                    name: "Binghamton, NY"
                }, {
                    slug: "birmingham-al",
                    id: 81,
                    name: "Birmingham, AL"
                }, {
                    slug: "bismarck-nd",
                    id: 82,
                    name: "Bismarck, ND"
                }, {
                    slug: "blacksburg-va",
                    id: 83,
                    name: "Blacksburg, VA"
                }, {
                    slug: "blaine-mn",
                    id: 84,
                    name: "Blaine, MN"
                }, {
                    slug: "bloomington-il",
                    id: 85,
                    name: "Bloomington, IL"
                }, {
                    slug: "bloomington-in",
                    id: 86,
                    name: "Bloomington, IN"
                }, {
                    slug: "bloomington-mn",
                    id: 87,
                    name: "Bloomington, MN"
                }, {
                    slug: "blue-springs-mo",
                    id: 88,
                    name: "Blue Springs, MO"
                }, {
                    slug: "boca-raton-fl",
                    id: 89,
                    name: "Boca Raton, FL"
                }, {
                    slug: "boise-city-id",
                    id: 90,
                    name: "Boise City, ID"
                }, {
                    slug: "bolingbrook-il",
                    id: 91,
                    name: "Bolingbrook, IL"
                }, {
                    slug: "bonita-springs-fl",
                    id: 92,
                    name: "Bonita Springs, FL"
                }, {
                    slug: "bossier-city-la",
                    id: 93,
                    name: "Bossier City, LA"
                }, {
                    slug: "boston-ma",
                    id: 94,
                    name: "Boston, MA"
                }, {
                    slug: "boulder-co",
                    id: 95,
                    name: "Boulder, CO"
                }, {
                    slug: "bountiful-ut",
                    id: 96,
                    name: "Bountiful, UT"
                }, {
                    slug: "bowie-md",
                    id: 97,
                    name: "Bowie, MD"
                }, {
                    slug: "bowling-green-ky",
                    id: 98,
                    name: "Bowling Green, KY"
                }, {
                    slug: "boynton-beach-fl",
                    id: 99,
                    name: "Boynton Beach, FL"
                }, {
                    slug: "bozeman-mt",
                    id: 100,
                    name: "Bozeman, MT"
                }, {
                    slug: "bradenton-fl",
                    id: 101,
                    name: "Bradenton, FL"
                }, {
                    slug: "brea-ca",
                    id: 102,
                    name: "Brea, CA"
                }, {
                    slug: "bremerton-wa",
                    id: 103,
                    name: "Bremerton, WA"
                }, {
                    slug: "brentwood-ca",
                    id: 104,
                    name: "Brentwood, CA"
                }, {
                    slug: "brentwood-tn",
                    id: 105,
                    name: "Brentwood, TN"
                }, {
                    slug: "bridgeport-ct",
                    id: 106,
                    name: "Bridgeport, CT"
                }, {
                    slug: "bristol-ct",
                    id: 107,
                    name: "Bristol, CT"
                }, {
                    slug: "brockton-ma",
                    id: 108,
                    name: "Brockton, MA"
                }, {
                    slug: "broken-arrow-ok",
                    id: 109,
                    name: "Broken Arrow, OK"
                }, {
                    slug: "brookfield-wi",
                    id: 110,
                    name: "Brookfield, WI"
                }, {
                    slug: "brookhaven-ga",
                    id: 111,
                    name: "Brookhaven, GA"
                }, {
                    slug: "brooklyn-park-mn",
                    id: 112,
                    name: "Brooklyn Park, MN"
                }, {
                    slug: "broomfield-co",
                    id: 113,
                    name: "Broomfield, CO"
                }, {
                    slug: "brownsville-tx",
                    id: 114,
                    name: "Brownsville, TX"
                }, {
                    slug: "bryan-tx",
                    id: 115,
                    name: "Bryan, TX"
                }, {
                    slug: "buckeye-az",
                    id: 116,
                    name: "Buckeye, AZ"
                }, {
                    slug: "buena-park-ca",
                    id: 117,
                    name: "Buena Park, CA"
                }, {
                    slug: "buffalo-grove-il",
                    id: 118,
                    name: "Buffalo Grove, IL"
                }, {
                    slug: "buffalo-ny",
                    id: 119,
                    name: "Buffalo, NY"
                }, {
                    slug: "bullhead-city-az",
                    id: 120,
                    name: "Bullhead City, AZ"
                }, {
                    slug: "burbank-ca",
                    id: 121,
                    name: "Burbank, CA"
                }, {
                    slug: "burien-wa",
                    id: 122,
                    name: "Burien, WA"
                }, {
                    slug: "burleson-tx",
                    id: 123,
                    name: "Burleson, TX"
                }, {
                    slug: "burlington-nc",
                    id: 124,
                    name: "Burlington, NC"
                }, {
                    slug: "burlington-vt",
                    id: 125,
                    name: "Burlington, VT"
                }, {
                    slug: "burnsville-mn",
                    id: 126,
                    name: "Burnsville, MN"
                }, {
                    slug: "caldwell-id",
                    id: 127,
                    name: "Caldwell, ID"
                }, {
                    slug: "calexico-ca",
                    id: 128,
                    name: "Calexico, CA"
                }, {
                    slug: "calumet-city-il",
                    id: 129,
                    name: "Calumet City, IL"
                }, {
                    slug: "camarillo-ca",
                    id: 130,
                    name: "Camarillo, CA"
                }, {
                    slug: "cambridge-ma",
                    id: 131,
                    name: "Cambridge, MA"
                }, {
                    slug: "camden-nj",
                    id: 132,
                    name: "Camden, NJ"
                }, {
                    slug: "campbell-ca",
                    id: 133,
                    name: "Campbell, CA"
                }, {
                    slug: "canton-oh",
                    id: 134,
                    name: "Canton, OH"
                }, {
                    slug: "cape-coral-fl",
                    id: 135,
                    name: "Cape Coral, FL"
                }, {
                    slug: "cape-girardeau-mo",
                    id: 136,
                    name: "Cape Girardeau, MO"
                }, {
                    slug: "carlsbad-ca",
                    id: 137,
                    name: "Carlsbad, CA"
                }, {
                    slug: "carmel-in",
                    id: 138,
                    name: "Carmel, IN"
                }, {
                    slug: "carol-stream-il",
                    id: 139,
                    name: "Carol Stream, IL"
                }, {
                    slug: "carpentersville-il",
                    id: 140,
                    name: "Carpentersville, IL"
                }, {
                    slug: "carrollton-tx",
                    id: 141,
                    name: "Carrollton, TX"
                }, {
                    slug: "carson-city-nv",
                    id: 142,
                    name: "Carson City, NV"
                }, {
                    slug: "carson-ca",
                    id: 143,
                    name: "Carson, CA"
                }, {
                    slug: "cary-nc",
                    id: 144,
                    name: "Cary, NC"
                }, {
                    slug: "casa-grande-az",
                    id: 145,
                    name: "Casa Grande, AZ"
                }, {
                    slug: "casper-wy",
                    id: 146,
                    name: "Casper, WY"
                }, {
                    slug: "castle-rock-co",
                    id: 147,
                    name: "Castle Rock, CO"
                }, {
                    slug: "cathedral-city-ca",
                    id: 148,
                    name: "Cathedral City, CA"
                }, {
                    slug: "cedar-falls-ia",
                    id: 149,
                    name: "Cedar Falls, IA"
                }, {
                    slug: "cedar-hill-tx",
                    id: 150,
                    name: "Cedar Hill, TX"
                }, {
                    slug: "cedar-park-tx",
                    id: 151,
                    name: "Cedar Park, TX"
                }, {
                    slug: "cedar-rapids-ia",
                    id: 152,
                    name: "Cedar Rapids, IA"
                }, {
                    slug: "centennial-co",
                    id: 153,
                    name: "Centennial, CO"
                }, {
                    slug: "ceres-ca",
                    id: 154,
                    name: "Ceres, CA"
                }, {
                    slug: "cerritos-ca",
                    id: 155,
                    name: "Cerritos, CA"
                }, {
                    slug: "champaign-il",
                    id: 156,
                    name: "Champaign, IL"
                }, {
                    slug: "chandler-az",
                    id: 157,
                    name: "Chandler, AZ"
                }, {
                    slug: "chapel-hill-nc",
                    id: 158,
                    name: "Chapel Hill, NC"
                }, {
                    slug: "charleston-sc",
                    id: 159,
                    name: "Charleston, SC"
                }, {
                    slug: "charleston-wv",
                    id: 160,
                    name: "Charleston, WV"
                }, {
                    slug: "charlotte-nc",
                    id: 161,
                    name: "Charlotte, NC"
                }, {
                    slug: "charlottesville-va",
                    id: 162,
                    name: "Charlottesville, VA"
                }, {
                    slug: "chattanooga-tn",
                    id: 163,
                    name: "Chattanooga, TN"
                }, {
                    slug: "chelsea-ma",
                    id: 164,
                    name: "Chelsea, MA"
                }, {
                    slug: "chesapeake-va",
                    id: 165,
                    name: "Chesapeake, VA"
                }, {
                    slug: "chesterfield-mo",
                    id: 166,
                    name: "Chesterfield, MO"
                }, {
                    slug: "cheyenne-wy",
                    id: 167,
                    name: "Cheyenne, WY"
                }, {
                    slug: "chicago-il",
                    id: 168,
                    name: "Chicago, IL"
                }, {
                    slug: "chico-ca",
                    id: 169,
                    name: "Chico, CA"
                }, {
                    slug: "chicopee-ma",
                    id: 170,
                    name: "Chicopee, MA"
                }, {
                    slug: "chino-hills-ca",
                    id: 171,
                    name: "Chino Hills, CA"
                }, {
                    slug: "chino-ca",
                    id: 172,
                    name: "Chino, CA"
                }, {
                    slug: "chula-vista-ca",
                    id: 173,
                    name: "Chula Vista, CA"
                }, {
                    slug: "cicero-il",
                    id: 174,
                    name: "Cicero, IL"
                }, {
                    slug: "cincinnati-oh",
                    id: 175,
                    name: "Cincinnati, OH"
                }, {
                    slug: "citrus-heights-ca",
                    id: 176,
                    name: "Citrus Heights, CA"
                }, {
                    slug: "clarksville-tn",
                    id: 177,
                    name: "Clarksville, TN"
                }, {
                    slug: "clearwater-fl",
                    id: 178,
                    name: "Clearwater, FL"
                }, {
                    slug: "cleveland-heights-oh",
                    id: 179,
                    name: "Cleveland Heights, OH"
                }, {
                    slug: "cleveland-oh",
                    id: 180,
                    name: "Cleveland, OH"
                }, {
                    slug: "cleveland-tn",
                    id: 181,
                    name: "Cleveland, TN"
                }, {
                    slug: "clifton-nj",
                    id: 182,
                    name: "Clifton, NJ"
                }, {
                    slug: "clovis-ca",
                    id: 183,
                    name: "Clovis, CA"
                }, {
                    slug: "clovis-nm",
                    id: 184,
                    name: "Clovis, NM"
                }, {
                    slug: "coachella-ca",
                    id: 185,
                    name: "Coachella, CA"
                }, {
                    slug: "coconut-creek-fl",
                    id: 186,
                    name: "Coconut Creek, FL"
                }, {
                    slug: "coeur-d-alene-id",
                    id: 187,
                    name: "Coeur d'Alene, ID"
                }, {
                    slug: "college-station-tx",
                    id: 188,
                    name: "College Station, TX"
                }, {
                    slug: "collierville-tn",
                    id: 189,
                    name: "Collierville, TN"
                }, {
                    slug: "colorado-springs-co",
                    id: 190,
                    name: "Colorado Springs, CO"
                }, {
                    slug: "colton-ca",
                    id: 191,
                    name: "Colton, CA"
                }, {
                    slug: "columbia-mo",
                    id: 192,
                    name: "Columbia, MO"
                }, {
                    slug: "columbia-sc",
                    id: 193,
                    name: "Columbia, SC"
                }, {
                    slug: "columbus-ga",
                    id: 194,
                    name: "Columbus, GA"
                }, {
                    slug: "columbus-in",
                    id: 195,
                    name: "Columbus, IN"
                }, {
                    slug: "columbus-oh",
                    id: 196,
                    name: "Columbus, OH"
                }, {
                    slug: "commerce-city-co",
                    id: 197,
                    name: "Commerce City, CO"
                }, {
                    slug: "compton-ca",
                    id: 198,
                    name: "Compton, CA"
                }, {
                    slug: "concord-ca",
                    id: 199,
                    name: "Concord, CA"
                }, {
                    slug: "concord-nc",
                    id: 200,
                    name: "Concord, NC"
                }, {
                    slug: "concord-nh",
                    id: 201,
                    name: "Concord, NH"
                }, {
                    slug: "conroe-tx",
                    id: 202,
                    name: "Conroe, TX"
                }, {
                    slug: "conway-ar",
                    id: 203,
                    name: "Conway, AR"
                }, {
                    slug: "coon-rapids-mn",
                    id: 204,
                    name: "Coon Rapids, MN"
                }, {
                    slug: "coppell-tx",
                    id: 205,
                    name: "Coppell, TX"
                }, {
                    slug: "coral-gables-fl",
                    id: 206,
                    name: "Coral Gables, FL"
                }, {
                    slug: "coral-springs-fl",
                    id: 207,
                    name: "Coral Springs, FL"
                }, {
                    slug: "corona-ca",
                    id: 208,
                    name: "Corona, CA"
                }, {
                    slug: "corpus-christi-tx",
                    id: 209,
                    name: "Corpus Christi, TX"
                }, {
                    slug: "corvallis-or",
                    id: 210,
                    name: "Corvallis, OR"
                }, {
                    slug: "costa-mesa-ca",
                    id: 211,
                    name: "Costa Mesa, CA"
                }, {
                    slug: "council-bluffs-ia",
                    id: 212,
                    name: "Council Bluffs, IA"
                }, {
                    slug: "covina-ca",
                    id: 213,
                    name: "Covina, CA"
                }, {
                    slug: "covington-ky",
                    id: 214,
                    name: "Covington, KY"
                }, {
                    slug: "cranston-ri",
                    id: 215,
                    name: "Cranston, RI"
                }, {
                    slug: "crystal-lake-il",
                    id: 216,
                    name: "Crystal Lake, IL"
                }, {
                    slug: "culver-city-ca",
                    id: 217,
                    name: "Culver City, CA"
                }, {
                    slug: "cupertino-ca",
                    id: 218,
                    name: "Cupertino, CA"
                }, {
                    slug: "cutler-bay-fl",
                    id: 219,
                    name: "Cutler Bay, FL"
                }, {
                    slug: "cuyahoga-falls-oh",
                    id: 220,
                    name: "Cuyahoga Falls, OH"
                }, {
                    slug: "cypress-ca",
                    id: 221,
                    name: "Cypress, CA"
                }, {
                    slug: "dallas-tx",
                    id: 222,
                    name: "Dallas, TX"
                }, {
                    slug: "daly-city-ca",
                    id: 223,
                    name: "Daly City, CA"
                }, {
                    slug: "danbury-ct",
                    id: 224,
                    name: "Danbury, CT"
                }, {
                    slug: "danville-ca",
                    id: 225,
                    name: "Danville, CA"
                }, {
                    slug: "danville-va",
                    id: 226,
                    name: "Danville, VA"
                }, {
                    slug: "davenport-ia",
                    id: 227,
                    name: "Davenport, IA"
                }, {
                    slug: "davie-fl",
                    id: 228,
                    name: "Davie, FL"
                }, {
                    slug: "davis-ca",
                    id: 229,
                    name: "Davis, CA"
                }, {
                    slug: "dayton-oh",
                    id: 230,
                    name: "Dayton, OH"
                }, {
                    slug: "daytona-beach-fl",
                    id: 231,
                    name: "Daytona Beach, FL"
                }, {
                    slug: "dekalb-il",
                    id: 232,
                    name: "DeKalb, IL"
                }, {
                    slug: "desoto-tx",
                    id: 233,
                    name: "DeSoto, TX"
                }, {
                    slug: "dearborn-heights-mi",
                    id: 234,
                    name: "Dearborn Heights, MI"
                }, {
                    slug: "dearborn-mi",
                    id: 235,
                    name: "Dearborn, MI"
                }, {
                    slug: "decatur-al",
                    id: 236,
                    name: "Decatur, AL"
                }, {
                    slug: "decatur-il",
                    id: 237,
                    name: "Decatur, IL"
                }, {
                    slug: "deerfield-beach-fl",
                    id: 238,
                    name: "Deerfield Beach, FL"
                }, {
                    slug: "delano-ca",
                    id: 239,
                    name: "Delano, CA"
                }, {
                    slug: "delray-beach-fl",
                    id: 240,
                    name: "Delray Beach, FL"
                }, {
                    slug: "deltona-fl",
                    id: 241,
                    name: "Deltona, FL"
                }, {
                    slug: "denton-tx",
                    id: 242,
                    name: "Denton, TX"
                }, {
                    slug: "denver-co",
                    id: 243,
                    name: "Denver, CO"
                }, {
                    slug: "des-moines-ia",
                    id: 244,
                    name: "Des Moines, IA"
                }, {
                    slug: "des-plaines-il",
                    id: 245,
                    name: "Des Plaines, IL"
                }, {
                    slug: "detroit-mi",
                    id: 246,
                    name: "Detroit, MI"
                }, {
                    slug: "diamond-bar-ca",
                    id: 247,
                    name: "Diamond Bar, CA"
                }, {
                    slug: "doral-fl",
                    id: 248,
                    name: "Doral, FL"
                }, {
                    slug: "dothan-al",
                    id: 249,
                    name: "Dothan, AL"
                }, {
                    slug: "dover-de",
                    id: 250,
                    name: "Dover, DE"
                }, {
                    slug: "downers-grove-il",
                    id: 251,
                    name: "Downers Grove, IL"
                }, {
                    slug: "downey-ca",
                    id: 252,
                    name: "Downey, CA"
                }, {
                    slug: "draper-ut",
                    id: 253,
                    name: "Draper, UT"
                }, {
                    slug: "dublin-ca",
                    id: 254,
                    name: "Dublin, CA"
                }, {
                    slug: "dublin-oh",
                    id: 255,
                    name: "Dublin, OH"
                }, {
                    slug: "dubuque-ia",
                    id: 256,
                    name: "Dubuque, IA"
                }, {
                    slug: "duluth-mn",
                    id: 257,
                    name: "Duluth, MN"
                }, {
                    slug: "duncanville-tx",
                    id: 258,
                    name: "Duncanville, TX"
                }, {
                    slug: "dunwoody-ga",
                    id: 259,
                    name: "Dunwoody, GA"
                }, {
                    slug: "durham-nc",
                    id: 260,
                    name: "Durham, NC"
                }, {
                    slug: "eagan-mn",
                    id: 261,
                    name: "Eagan, MN"
                }, {
                    slug: "east-lansing-mi",
                    id: 262,
                    name: "East Lansing, MI"
                }, {
                    slug: "east-orange-nj",
                    id: 263,
                    name: "East Orange, NJ"
                }, {
                    slug: "east-providence-ri",
                    id: 264,
                    name: "East Providence, RI"
                }, {
                    slug: "eastvale-ca",
                    id: 265,
                    name: "Eastvale, CA"
                }, {
                    slug: "eau-claire-wi",
                    id: 266,
                    name: "Eau Claire, WI"
                }, {
                    slug: "eden-prairie-mn",
                    id: 267,
                    name: "Eden Prairie, MN"
                }, {
                    slug: "edina-mn",
                    id: 268,
                    name: "Edina, MN"
                }, {
                    slug: "edinburg-tx",
                    id: 269,
                    name: "Edinburg, TX"
                }, {
                    slug: "edmond-ok",
                    id: 270,
                    name: "Edmond, OK"
                }, {
                    slug: "edmonds-wa",
                    id: 271,
                    name: "Edmonds, WA"
                }, {
                    slug: "el-cajon-ca",
                    id: 272,
                    name: "El Cajon, CA"
                }, {
                    slug: "el-centro-ca",
                    id: 273,
                    name: "El Centro, CA"
                }, {
                    slug: "el-monte-ca",
                    id: 274,
                    name: "El Monte, CA"
                }, {
                    slug: "el-paso-tx",
                    id: 275,
                    name: "El Paso, TX"
                }, {
                    slug: "elgin-il",
                    id: 276,
                    name: "Elgin, IL"
                }, {
                    slug: "elizabeth-nj",
                    id: 277,
                    name: "Elizabeth, NJ"
                }, {
                    slug: "elk-grove-ca",
                    id: 278,
                    name: "Elk Grove, CA"
                }, {
                    slug: "elkhart-in",
                    id: 279,
                    name: "Elkhart, IN"
                }, {
                    slug: "elmhurst-il",
                    id: 280,
                    name: "Elmhurst, IL"
                }, {
                    slug: "elyria-oh",
                    id: 281,
                    name: "Elyria, OH"
                }, {
                    slug: "encinitas-ca",
                    id: 282,
                    name: "Encinitas, CA"
                }, {
                    slug: "enid-ok",
                    id: 283,
                    name: "Enid, OK"
                }, {
                    slug: "erie-pa",
                    id: 284,
                    name: "Erie, PA"
                }, {
                    slug: "escondido-ca",
                    id: 285,
                    name: "Escondido, CA"
                }, {
                    slug: "euclid-oh",
                    id: 286,
                    name: "Euclid, OH"
                }, {
                    slug: "eugene-or",
                    id: 287,
                    name: "Eugene, OR"
                }, {
                    slug: "euless-tx",
                    id: 288,
                    name: "Euless, TX"
                }, {
                    slug: "evanston-il",
                    id: 289,
                    name: "Evanston, IL"
                }, {
                    slug: "evansville-in",
                    id: 290,
                    name: "Evansville, IN"
                }, {
                    slug: "everett-ma",
                    id: 291,
                    name: "Everett, MA"
                }, {
                    slug: "everett-wa",
                    id: 292,
                    name: "Everett, WA"
                }, {
                    slug: "fairfield-ca",
                    id: 293,
                    name: "Fairfield, CA"
                }, {
                    slug: "fairfield-oh",
                    id: 294,
                    name: "Fairfield, OH"
                }, {
                    slug: "fall-river-ma",
                    id: 295,
                    name: "Fall River, MA"
                }, {
                    slug: "fargo-nd",
                    id: 296,
                    name: "Fargo, ND"
                }, {
                    slug: "farmington-hills-mi",
                    id: 297,
                    name: "Farmington Hills, MI"
                }, {
                    slug: "farmington-nm",
                    id: 298,
                    name: "Farmington, NM"
                }, {
                    slug: "fayetteville-ar",
                    id: 299,
                    name: "Fayetteville, AR"
                }, {
                    slug: "fayetteville-nc",
                    id: 300,
                    name: "Fayetteville, NC"
                }, {
                    slug: "federal-way-wa",
                    id: 301,
                    name: "Federal Way, WA"
                }, {
                    slug: "findlay-oh",
                    id: 302,
                    name: "Findlay, OH"
                }, {
                    slug: "fishers-in",
                    id: 303,
                    name: "Fishers, IN"
                }, {
                    slug: "fitchburg-ma",
                    id: 304,
                    name: "Fitchburg, MA"
                }, {
                    slug: "flagstaff-az",
                    id: 305,
                    name: "Flagstaff, AZ"
                }, {
                    slug: "flint-mi",
                    id: 306,
                    name: "Flint, MI"
                }, {
                    slug: "florence-al",
                    id: 307,
                    name: "Florence, AL"
                }, {
                    slug: "florence-sc",
                    id: 308,
                    name: "Florence, SC"
                }, {
                    slug: "florissant-mo",
                    id: 309,
                    name: "Florissant, MO"
                }, {
                    slug: "flower-mound-tx",
                    id: 310,
                    name: "Flower Mound, TX"
                }, {
                    slug: "folsom-ca",
                    id: 311,
                    name: "Folsom, CA"
                }, {
                    slug: "fond-du-lac-wi",
                    id: 312,
                    name: "Fond du Lac, WI"
                }, {
                    slug: "fontana-ca",
                    id: 313,
                    name: "Fontana, CA"
                }, {
                    slug: "fort-collins-co",
                    id: 314,
                    name: "Fort Collins, CO"
                }, {
                    slug: "fort-lauderdale-fl",
                    id: 315,
                    name: "Fort Lauderdale, FL"
                }, {
                    slug: "fort-myers-fl",
                    id: 316,
                    name: "Fort Myers, FL"
                }, {
                    slug: "fort-pierce-fl",
                    id: 317,
                    name: "Fort Pierce, FL"
                }, {
                    slug: "fort-smith-ar",
                    id: 318,
                    name: "Fort Smith, AR"
                }, {
                    slug: "fort-wayne-in",
                    id: 319,
                    name: "Fort Wayne, IN"
                }, {
                    slug: "fort-worth-tx",
                    id: 320,
                    name: "Fort Worth, TX"
                }, {
                    slug: "fountain-valley-ca",
                    id: 321,
                    name: "Fountain Valley, CA"
                }, {
                    slug: "franklin-tn",
                    id: 322,
                    name: "Franklin, TN"
                }, {
                    slug: "frederick-md",
                    id: 323,
                    name: "Frederick, MD"
                }, {
                    slug: "freeport-ny",
                    id: 324,
                    name: "Freeport, NY"
                }, {
                    slug: "fremont-ca",
                    id: 325,
                    name: "Fremont, CA"
                }, {
                    slug: "fresno-ca",
                    id: 326,
                    name: "Fresno, CA"
                }, {
                    slug: "friendswood-tx",
                    id: 327,
                    name: "Friendswood, TX"
                }, {
                    slug: "frisco-tx",
                    id: 328,
                    name: "Frisco, TX"
                }, {
                    slug: "fullerton-ca",
                    id: 329,
                    name: "Fullerton, CA"
                }, {
                    slug: "gainesville-fl",
                    id: 330,
                    name: "Gainesville, FL"
                }, {
                    slug: "gaithersburg-md",
                    id: 331,
                    name: "Gaithersburg, MD"
                }, {
                    slug: "galveston-tx",
                    id: 332,
                    name: "Galveston, TX"
                }, {
                    slug: "garden-grove-ca",
                    id: 333,
                    name: "Garden Grove, CA"
                }, {
                    slug: "gardena-ca",
                    id: 334,
                    name: "Gardena, CA"
                }, {
                    slug: "garland-tx",
                    id: 335,
                    name: "Garland, TX"
                }, {
                    slug: "gary-in",
                    id: 336,
                    name: "Gary, IN"
                }, {
                    slug: "gastonia-nc",
                    id: 337,
                    name: "Gastonia, NC"
                }, {
                    slug: "georgetown-tx",
                    id: 338,
                    name: "Georgetown, TX"
                }, {
                    slug: "germantown-tn",
                    id: 339,
                    name: "Germantown, TN"
                }, {
                    slug: "gilbert-az",
                    id: 340,
                    name: "Gilbert, AZ"
                }, {
                    slug: "gilroy-ca",
                    id: 341,
                    name: "Gilroy, CA"
                }, {
                    slug: "glendale-az",
                    id: 342,
                    name: "Glendale, AZ"
                }, {
                    slug: "glendale-ca",
                    id: 343,
                    name: "Glendale, CA"
                }, {
                    slug: "glendora-ca",
                    id: 344,
                    name: "Glendora, CA"
                }, {
                    slug: "glenview-il",
                    id: 345,
                    name: "Glenview, IL"
                }, {
                    slug: "goodyear-az",
                    id: 346,
                    name: "Goodyear, AZ"
                }, {
                    slug: "goose-creek-sc",
                    id: 347,
                    name: "Goose Creek, SC"
                }, {
                    slug: "grand-forks-nd",
                    id: 348,
                    name: "Grand Forks, ND"
                }, {
                    slug: "grand-island-ne",
                    id: 349,
                    name: "Grand Island, NE"
                }, {
                    slug: "grand-junction-co",
                    id: 350,
                    name: "Grand Junction, CO"
                }, {
                    slug: "grand-prairie-tx",
                    id: 351,
                    name: "Grand Prairie, TX"
                }, {
                    slug: "grand-rapids-mi",
                    id: 352,
                    name: "Grand Rapids, MI"
                }, {
                    slug: "grapevine-tx",
                    id: 353,
                    name: "Grapevine, TX"
                }, {
                    slug: "great-falls-mt",
                    id: 354,
                    name: "Great Falls, MT"
                }, {
                    slug: "greeley-co",
                    id: 355,
                    name: "Greeley, CO"
                }, {
                    slug: "green-bay-wi",
                    id: 356,
                    name: "Green Bay, WI"
                }, {
                    slug: "greenacres-fl",
                    id: 357,
                    name: "Greenacres, FL"
                }, {
                    slug: "greenfield-wi",
                    id: 358,
                    name: "Greenfield, WI"
                }, {
                    slug: "greensboro-nc",
                    id: 359,
                    name: "Greensboro, NC"
                }, {
                    slug: "greenville-nc",
                    id: 360,
                    name: "Greenville, NC"
                }, {
                    slug: "greenville-sc",
                    id: 361,
                    name: "Greenville, SC"
                }, {
                    slug: "greenwood-in",
                    id: 362,
                    name: "Greenwood, IN"
                }, {
                    slug: "gresham-or",
                    id: 363,
                    name: "Gresham, OR"
                }, {
                    slug: "grove-city-oh",
                    id: 364,
                    name: "Grove City, OH"
                }, {
                    slug: "gulfport-ms",
                    id: 365,
                    name: "Gulfport, MS"
                }, {
                    slug: "hackensack-nj",
                    id: 366,
                    name: "Hackensack, NJ"
                }, {
                    slug: "hagerstown-md",
                    id: 367,
                    name: "Hagerstown, MD"
                }, {
                    slug: "hallandale-beach-fl",
                    id: 368,
                    name: "Hallandale Beach, FL"
                }, {
                    slug: "haltom-city-tx",
                    id: 369,
                    name: "Haltom City, TX"
                }, {
                    slug: "hamilton-oh",
                    id: 370,
                    name: "Hamilton, OH"
                }, {
                    slug: "hammond-in",
                    id: 371,
                    name: "Hammond, IN"
                }, {
                    slug: "hampton-va",
                    id: 372,
                    name: "Hampton, VA"
                }, {
                    slug: "hanford-ca",
                    id: 373,
                    name: "Hanford, CA"
                }, {
                    slug: "hanover-park-il",
                    id: 374,
                    name: "Hanover Park, IL"
                }, {
                    slug: "harlingen-tx",
                    id: 375,
                    name: "Harlingen, TX"
                }, {
                    slug: "harrisburg-pa",
                    id: 376,
                    name: "Harrisburg, PA"
                }, {
                    slug: "harrisonburg-va",
                    id: 377,
                    name: "Harrisonburg, VA"
                }, {
                    slug: "hartford-ct",
                    id: 378,
                    name: "Hartford, CT"
                }, {
                    slug: "hattiesburg-ms",
                    id: 379,
                    name: "Hattiesburg, MS"
                }, {
                    slug: "haverhill-ma",
                    id: 380,
                    name: "Haverhill, MA"
                }, {
                    slug: "hawthorne-ca",
                    id: 381,
                    name: "Hawthorne, CA"
                }, {
                    slug: "hayward-ca",
                    id: 382,
                    name: "Hayward, CA"
                }, {
                    slug: "hemet-ca",
                    id: 383,
                    name: "Hemet, CA"
                }, {
                    slug: "hempstead-ny",
                    id: 384,
                    name: "Hempstead, NY"
                }, {
                    slug: "henderson-nv",
                    id: 385,
                    name: "Henderson, NV"
                }, {
                    slug: "hendersonville-tn",
                    id: 386,
                    name: "Hendersonville, TN"
                }, {
                    slug: "hesperia-ca",
                    id: 387,
                    name: "Hesperia, CA"
                }, {
                    slug: "hialeah-fl",
                    id: 388,
                    name: "Hialeah, FL"
                }, {
                    slug: "hickory-nc",
                    id: 389,
                    name: "Hickory, NC"
                }, {
                    slug: "high-point-nc",
                    id: 390,
                    name: "High Point, NC"
                }, {
                    slug: "highland-ca",
                    id: 391,
                    name: "Highland, CA"
                }, {
                    slug: "hillsboro-or",
                    id: 392,
                    name: "Hillsboro, OR"
                }, {
                    slug: "hilton-head-island-sc",
                    id: 393,
                    name: "Hilton Head Island, SC"
                }, {
                    slug: "hoboken-nj",
                    id: 394,
                    name: "Hoboken, NJ"
                }, {
                    slug: "hoffman-estates-il",
                    id: 395,
                    name: "Hoffman Estates, IL"
                }, {
                    slug: "hollywood-fl",
                    id: 396,
                    name: "Hollywood, FL"
                }, {
                    slug: "holyoke-ma",
                    id: 397,
                    name: "Holyoke, MA"
                }, {
                    slug: "homestead-fl",
                    id: 398,
                    name: "Homestead, FL"
                }, {
                    slug: "honolulu-hi",
                    id: 399,
                    name: "Honolulu, HI"
                }, {
                    slug: "hoover-al",
                    id: 400,
                    name: "Hoover, AL"
                }, {
                    slug: "houston-tx",
                    id: 401,
                    name: "Houston, TX"
                }, {
                    slug: "huber-heights-oh",
                    id: 402,
                    name: "Huber Heights, OH"
                }, {
                    slug: "huntersville-nc",
                    id: 403,
                    name: "Huntersville, NC"
                }, {
                    slug: "huntington-beach-ca",
                    id: 404,
                    name: "Huntington Beach, CA"
                }, {
                    slug: "huntington-park-ca",
                    id: 405,
                    name: "Huntington Park, CA"
                }, {
                    slug: "huntington-wv",
                    id: 406,
                    name: "Huntington, WV"
                }, {
                    slug: "huntsville-al",
                    id: 407,
                    name: "Huntsville, AL"
                }, {
                    slug: "huntsville-tx",
                    id: 408,
                    name: "Huntsville, TX"
                }, {
                    slug: "hurst-tx",
                    id: 409,
                    name: "Hurst, TX"
                }, {
                    slug: "hutchinson-ks",
                    id: 410,
                    name: "Hutchinson, KS"
                }, {
                    slug: "idaho-falls-id",
                    id: 411,
                    name: "Idaho Falls, ID"
                }, {
                    slug: "independence-mo",
                    id: 412,
                    name: "Independence, MO"
                }, {
                    slug: "indianapolis-in",
                    id: 413,
                    name: "Indianapolis, IN"
                }, {
                    slug: "indio-ca",
                    id: 414,
                    name: "Indio, CA"
                }, {
                    slug: "inglewood-ca",
                    id: 415,
                    name: "Inglewood, CA"
                }, {
                    slug: "iowa-city-ia",
                    id: 416,
                    name: "Iowa City, IA"
                }, {
                    slug: "irvine-ca",
                    id: 417,
                    name: "Irvine, CA"
                }, {
                    slug: "irving-tx",
                    id: 418,
                    name: "Irving, TX"
                }, {
                    slug: "jackson-ms",
                    id: 419,
                    name: "Jackson, MS"
                }, {
                    slug: "jackson-tn",
                    id: 420,
                    name: "Jackson, TN"
                }, {
                    slug: "jacksonville-fl",
                    id: 421,
                    name: "Jacksonville, FL"
                }, {
                    slug: "jacksonville-nc",
                    id: 422,
                    name: "Jacksonville, NC"
                }, {
                    slug: "janesville-wi",
                    id: 423,
                    name: "Janesville, WI"
                }, {
                    slug: "jefferson-city-mo",
                    id: 424,
                    name: "Jefferson City, MO"
                }, {
                    slug: "jeffersonville-in",
                    id: 425,
                    name: "Jeffersonville, IN"
                }, {
                    slug: "jersey-city-nj",
                    id: 426,
                    name: "Jersey City, NJ"
                }, {
                    slug: "johns-creek-ga",
                    id: 427,
                    name: "Johns Creek, GA"
                }, {
                    slug: "johnson-city-tn",
                    id: 428,
                    name: "Johnson City, TN"
                }, {
                    slug: "joliet-il",
                    id: 429,
                    name: "Joliet, IL"
                }, {
                    slug: "jonesboro-ar",
                    id: 430,
                    name: "Jonesboro, AR"
                }, {
                    slug: "joplin-mo",
                    id: 431,
                    name: "Joplin, MO"
                }, {
                    slug: "jupiter-fl",
                    id: 432,
                    name: "Jupiter, FL"
                }, {
                    slug: "jurupa-valley-ca",
                    id: 433,
                    name: "Jurupa Valley, CA"
                }, {
                    slug: "kalamazoo-mi",
                    id: 434,
                    name: "Kalamazoo, MI"
                }, {
                    slug: "kannapolis-nc",
                    id: 435,
                    name: "Kannapolis, NC"
                }, {
                    slug: "kansas-city-ks",
                    id: 436,
                    name: "Kansas City, KS"
                }, {
                    slug: "kansas-city-mo",
                    id: 437,
                    name: "Kansas City, MO"
                }, {
                    slug: "kearny-nj",
                    id: 438,
                    name: "Kearny, NJ"
                }, {
                    slug: "keizer-or",
                    id: 439,
                    name: "Keizer, OR"
                }, {
                    slug: "keller-tx",
                    id: 440,
                    name: "Keller, TX"
                }, {
                    slug: "kenner-la",
                    id: 441,
                    name: "Kenner, LA"
                }, {
                    slug: "kennewick-wa",
                    id: 442,
                    name: "Kennewick, WA"
                }, {
                    slug: "kenosha-wi",
                    id: 443,
                    name: "Kenosha, WI"
                }, {
                    slug: "kent-wa",
                    id: 444,
                    name: "Kent, WA"
                }, {
                    slug: "kentwood-mi",
                    id: 445,
                    name: "Kentwood, MI"
                }, {
                    slug: "kettering-oh",
                    id: 446,
                    name: "Kettering, OH"
                }, {
                    slug: "killeen-tx",
                    id: 447,
                    name: "Killeen, TX"
                }, {
                    slug: "kingsport-tn",
                    id: 448,
                    name: "Kingsport, TN"
                }, {
                    slug: "kirkland-wa",
                    id: 449,
                    name: "Kirkland, WA"
                }, {
                    slug: "kissimmee-fl",
                    id: 450,
                    name: "Kissimmee, FL"
                }, {
                    slug: "knoxville-tn",
                    id: 451,
                    name: "Knoxville, TN"
                }, {
                    slug: "kokomo-in",
                    id: 452,
                    name: "Kokomo, IN"
                }, {
                    slug: "la-crosse-wi",
                    id: 453,
                    name: "La Crosse, WI"
                }, {
                    slug: "la-habra-ca",
                    id: 454,
                    name: "La Habra, CA"
                }, {
                    slug: "la-mesa-ca",
                    id: 455,
                    name: "La Mesa, CA"
                }, {
                    slug: "la-mirada-ca",
                    id: 456,
                    name: "La Mirada, CA"
                }, {
                    slug: "la-puente-ca",
                    id: 457,
                    name: "La Puente, CA"
                }, {
                    slug: "la-quinta-ca",
                    id: 458,
                    name: "La Quinta, CA"
                }, {
                    slug: "lacey-wa",
                    id: 459,
                    name: "Lacey, WA"
                }, {
                    slug: "lafayette-in",
                    id: 460,
                    name: "Lafayette, IN"
                }, {
                    slug: "lafayette-la",
                    id: 461,
                    name: "Lafayette, LA"
                }, {
                    slug: "laguna-niguel-ca",
                    id: 462,
                    name: "Laguna Niguel, CA"
                }, {
                    slug: "lake-charles-la",
                    id: 463,
                    name: "Lake Charles, LA"
                }, {
                    slug: "lake-elsinore-ca",
                    id: 464,
                    name: "Lake Elsinore, CA"
                }, {
                    slug: "lake-forest-ca",
                    id: 465,
                    name: "Lake Forest, CA"
                }, {
                    slug: "lake-havasu-city-az",
                    id: 466,
                    name: "Lake Havasu City, AZ"
                }, {
                    slug: "lake-oswego-or",
                    id: 467,
                    name: "Lake Oswego, OR"
                }, {
                    slug: "lakeland-fl",
                    id: 468,
                    name: "Lakeland, FL"
                }, {
                    slug: "lakeville-mn",
                    id: 469,
                    name: "Lakeville, MN"
                }, {
                    slug: "lakewood-ca",
                    id: 470,
                    name: "Lakewood, CA"
                }, {
                    slug: "lakewood-co",
                    id: 471,
                    name: "Lakewood, CO"
                }, {
                    slug: "lakewood-oh",
                    id: 472,
                    name: "Lakewood, OH"
                }, {
                    slug: "lakewood-wa",
                    id: 473,
                    name: "Lakewood, WA"
                }, {
                    slug: "lancaster-ca",
                    id: 474,
                    name: "Lancaster, CA"
                }, {
                    slug: "lancaster-oh",
                    id: 475,
                    name: "Lancaster, OH"
                }, {
                    slug: "lancaster-pa",
                    id: 476,
                    name: "Lancaster, PA"
                }, {
                    slug: "lancaster-tx",
                    id: 477,
                    name: "Lancaster, TX"
                }, {
                    slug: "lansing-mi",
                    id: 478,
                    name: "Lansing, MI"
                }, {
                    slug: "laredo-tx",
                    id: 479,
                    name: "Laredo, TX"
                }, {
                    slug: "largo-fl",
                    id: 480,
                    name: "Largo, FL"
                }, {
                    slug: "las-cruces-nm",
                    id: 481,
                    name: "Las Cruces, NM"
                }, {
                    slug: "las-vegas-nv",
                    id: 482,
                    name: "Las Vegas, NV"
                }, {
                    slug: "lauderhill-fl",
                    id: 483,
                    name: "Lauderhill, FL"
                }, {
                    slug: "lawrence-in",
                    id: 484,
                    name: "Lawrence, IN"
                }, {
                    slug: "lawrence-ks",
                    id: 485,
                    name: "Lawrence, KS"
                }, {
                    slug: "lawrence-ma",
                    id: 486,
                    name: "Lawrence, MA"
                }, {
                    slug: "lawton-ok",
                    id: 487,
                    name: "Lawton, OK"
                }, {
                    slug: "layton-ut",
                    id: 488,
                    name: "Layton, UT"
                }, {
                    slug: "league-city-tx",
                    id: 489,
                    name: "League City, TX"
                }, {
                    slug: "lee-s-summit-mo",
                    id: 490,
                    name: "Lee's Summit, MO"
                }, {
                    slug: "leesburg-va",
                    id: 491,
                    name: "Leesburg, VA"
                }, {
                    slug: "lehi-ut",
                    id: 492,
                    name: "Lehi, UT"
                }, {
                    slug: "lenexa-ks",
                    id: 493,
                    name: "Lenexa, KS"
                }, {
                    slug: "leominster-ma",
                    id: 494,
                    name: "Leominster, MA"
                }, {
                    slug: "lewisville-tx",
                    id: 495,
                    name: "Lewisville, TX"
                }, {
                    slug: "lexington-fayette-ky",
                    id: 496,
                    name: "Lexington-Fayette, KY"
                }, {
                    slug: "lima-oh",
                    id: 497,
                    name: "Lima, OH"
                }, {
                    slug: "lincoln-park-mi",
                    id: 498,
                    name: "Lincoln Park, MI"
                }, {
                    slug: "lincoln-ca",
                    id: 499,
                    name: "Lincoln, CA"
                }, {
                    slug: "lincoln-ne",
                    id: 500,
                    name: "Lincoln, NE"
                }, {
                    slug: "linden-nj",
                    id: 501,
                    name: "Linden, NJ"
                }, {
                    slug: "little-rock-ar",
                    id: 502,
                    name: "Little Rock, AR"
                }, {
                    slug: "littleton-co",
                    id: 503,
                    name: "Littleton, CO"
                }, {
                    slug: "livermore-ca",
                    id: 504,
                    name: "Livermore, CA"
                }, {
                    slug: "livonia-mi",
                    id: 505,
                    name: "Livonia, MI"
                }, {
                    slug: "lodi-ca",
                    id: 506,
                    name: "Lodi, CA"
                }, {
                    slug: "logan-ut",
                    id: 507,
                    name: "Logan, UT"
                }, {
                    slug: "lombard-il",
                    id: 508,
                    name: "Lombard, IL"
                }, {
                    slug: "lompoc-ca",
                    id: 509,
                    name: "Lompoc, CA"
                }, {
                    slug: "long-beach-ca",
                    id: 510,
                    name: "Long Beach, CA"
                }, {
                    slug: "longmont-co",
                    id: 511,
                    name: "Longmont, CO"
                }, {
                    slug: "longview-tx",
                    id: 512,
                    name: "Longview, TX"
                }, {
                    slug: "lorain-oh",
                    id: 513,
                    name: "Lorain, OH"
                }, {
                    slug: "los-angeles-ca",
                    id: 514,
                    name: "Los Angeles, CA"
                }, {
                    slug: "louisville-ky",
                    id: 515,
                    name: "Louisville, KY"
                }, {
                    slug: "loveland-co",
                    id: 516,
                    name: "Loveland, CO"
                }, {
                    slug: "lowell-ma",
                    id: 517,
                    name: "Lowell, MA"
                }, {
                    slug: "lubbock-tx",
                    id: 518,
                    name: "Lubbock, TX"
                }, {
                    slug: "lynchburg-va",
                    id: 519,
                    name: "Lynchburg, VA"
                }, {
                    slug: "lynn-ma",
                    id: 520,
                    name: "Lynn, MA"
                }, {
                    slug: "lynwood-ca",
                    id: 521,
                    name: "Lynwood, CA"
                }, {
                    slug: "macon-ga",
                    id: 522,
                    name: "Macon, GA"
                }, {
                    slug: "madera-ca",
                    id: 523,
                    name: "Madera, CA"
                }, {
                    slug: "madison-al",
                    id: 524,
                    name: "Madison, AL"
                }, {
                    slug: "madison-wi",
                    id: 525,
                    name: "Madison, WI"
                }, {
                    slug: "malden-ma",
                    id: 526,
                    name: "Malden, MA"
                }, {
                    slug: "manassas-va",
                    id: 527,
                    name: "Manassas, VA"
                }, {
                    slug: "manchester-nh",
                    id: 528,
                    name: "Manchester, NH"
                }, {
                    slug: "manhattan-ks",
                    id: 529,
                    name: "Manhattan, KS"
                }, {
                    slug: "mankato-mn",
                    id: 530,
                    name: "Mankato, MN"
                }, {
                    slug: "mansfield-oh",
                    id: 531,
                    name: "Mansfield, OH"
                }, {
                    slug: "mansfield-tx",
                    id: 532,
                    name: "Mansfield, TX"
                }, {
                    slug: "manteca-ca",
                    id: 533,
                    name: "Manteca, CA"
                }, {
                    slug: "maple-grove-mn",
                    id: 534,
                    name: "Maple Grove, MN"
                }, {
                    slug: "maplewood-mn",
                    id: 535,
                    name: "Maplewood, MN"
                }, {
                    slug: "marana-az",
                    id: 536,
                    name: "Marana, AZ"
                }, {
                    slug: "margate-fl",
                    id: 537,
                    name: "Margate, FL"
                }, {
                    slug: "maricopa-az",
                    id: 538,
                    name: "Maricopa, AZ"
                }, {
                    slug: "marietta-ga",
                    id: 539,
                    name: "Marietta, GA"
                }, {
                    slug: "marlborough-ma",
                    id: 540,
                    name: "Marlborough, MA"
                }, {
                    slug: "martinez-ca",
                    id: 541,
                    name: "Martinez, CA"
                }, {
                    slug: "marysville-wa",
                    id: 542,
                    name: "Marysville, WA"
                }, {
                    slug: "mcallen-tx",
                    id: 543,
                    name: "McAllen, TX"
                }, {
                    slug: "mckinney-tx",
                    id: 544,
                    name: "McKinney, TX"
                }, {
                    slug: "medford-ma",
                    id: 545,
                    name: "Medford, MA"
                }, {
                    slug: "medford-or",
                    id: 546,
                    name: "Medford, OR"
                }, {
                    slug: "melbourne-fl",
                    id: 547,
                    name: "Melbourne, FL"
                }, {
                    slug: "memphis-tn",
                    id: 548,
                    name: "Memphis, TN"
                }, {
                    slug: "menifee-ca",
                    id: 549,
                    name: "Menifee, CA"
                }, {
                    slug: "mentor-oh",
                    id: 550,
                    name: "Mentor, OH"
                }, {
                    slug: "merced-ca",
                    id: 551,
                    name: "Merced, CA"
                }, {
                    slug: "meriden-ct",
                    id: 552,
                    name: "Meriden, CT"
                }, {
                    slug: "meridian-id",
                    id: 553,
                    name: "Meridian, ID"
                }, {
                    slug: "meridian-ms",
                    id: 554,
                    name: "Meridian, MS"
                }, {
                    slug: "mesa-az",
                    id: 555,
                    name: "Mesa, AZ"
                }, {
                    slug: "mesquite-tx",
                    id: 556,
                    name: "Mesquite, TX"
                }, {
                    slug: "methuen-ma",
                    id: 557,
                    name: "Methuen, MA"
                }, {
                    slug: "miami-beach-fl",
                    id: 558,
                    name: "Miami Beach, FL"
                }, {
                    slug: "miami-gardens-fl",
                    id: 559,
                    name: "Miami Gardens, FL"
                }, {
                    slug: "miami-fl",
                    id: 560,
                    name: "Miami, FL"
                }, {
                    slug: "middletown-ct",
                    id: 561,
                    name: "Middletown, CT"
                }, {
                    slug: "middletown-oh",
                    id: 562,
                    name: "Middletown, OH"
                }, {
                    slug: "midland-mi",
                    id: 563,
                    name: "Midland, MI"
                }, {
                    slug: "midland-tx",
                    id: 564,
                    name: "Midland, TX"
                }, {
                    slug: "midwest-city-ok",
                    id: 565,
                    name: "Midwest City, OK"
                }, {
                    slug: "milford-ct",
                    id: 566,
                    name: "Milford, CT"
                }, {
                    slug: "milpitas-ca",
                    id: 567,
                    name: "Milpitas, CA"
                }, {
                    slug: "milwaukee-wi",
                    id: 568,
                    name: "Milwaukee, WI"
                }, {
                    slug: "minneapolis-mn",
                    id: 569,
                    name: "Minneapolis, MN"
                }, {
                    slug: "minnetonka-mn",
                    id: 570,
                    name: "Minnetonka, MN"
                }, {
                    slug: "minot-nd",
                    id: 571,
                    name: "Minot, ND"
                }, {
                    slug: "miramar-fl",
                    id: 572,
                    name: "Miramar, FL"
                }, {
                    slug: "mishawaka-in",
                    id: 573,
                    name: "Mishawaka, IN"
                }, {
                    slug: "mission-viejo-ca",
                    id: 574,
                    name: "Mission Viejo, CA"
                }, {
                    slug: "mission-tx",
                    id: 575,
                    name: "Mission, TX"
                }, {
                    slug: "missoula-mt",
                    id: 576,
                    name: "Missoula, MT"
                }, {
                    slug: "missouri-city-tx",
                    id: 577,
                    name: "Missouri City, TX"
                }, {
                    slug: "mobile-al",
                    id: 578,
                    name: "Mobile, AL"
                }, {
                    slug: "modesto-ca",
                    id: 579,
                    name: "Modesto, CA"
                }, {
                    slug: "moline-il",
                    id: 580,
                    name: "Moline, IL"
                }, {
                    slug: "monroe-la",
                    id: 581,
                    name: "Monroe, LA"
                }, {
                    slug: "monrovia-ca",
                    id: 582,
                    name: "Monrovia, CA"
                }, {
                    slug: "montclair-ca",
                    id: 583,
                    name: "Montclair, CA"
                }, {
                    slug: "montebello-ca",
                    id: 584,
                    name: "Montebello, CA"
                }, {
                    slug: "monterey-park-ca",
                    id: 585,
                    name: "Monterey Park, CA"
                }, {
                    slug: "montgomery-al",
                    id: 586,
                    name: "Montgomery, AL"
                }, {
                    slug: "moore-ok",
                    id: 587,
                    name: "Moore, OK"
                }, {
                    slug: "moorhead-mn",
                    id: 588,
                    name: "Moorhead, MN"
                }, {
                    slug: "moreno-valley-ca",
                    id: 589,
                    name: "Moreno Valley, CA"
                }, {
                    slug: "morgan-hill-ca",
                    id: 590,
                    name: "Morgan Hill, CA"
                }, {
                    slug: "mount-pleasant-sc",
                    id: 591,
                    name: "Mount Pleasant, SC"
                }, {
                    slug: "mount-prospect-il",
                    id: 592,
                    name: "Mount Prospect, IL"
                }, {
                    slug: "mount-vernon-ny",
                    id: 593,
                    name: "Mount Vernon, NY"
                }, {
                    slug: "mountain-view-ca",
                    id: 594,
                    name: "Mountain View, CA"
                }, {
                    slug: "muncie-in",
                    id: 595,
                    name: "Muncie, IN"
                }, {
                    slug: "murfreesboro-tn",
                    id: 596,
                    name: "Murfreesboro, TN"
                }, {
                    slug: "murray-ut",
                    id: 597,
                    name: "Murray, UT"
                }, {
                    slug: "murrieta-ca",
                    id: 598,
                    name: "Murrieta, CA"
                }, {
                    slug: "muskegon-mi",
                    id: 599,
                    name: "Muskegon, MI"
                }, {
                    slug: "muskogee-ok",
                    id: 600,
                    name: "Muskogee, OK"
                }, {
                    slug: "nampa-id",
                    id: 601,
                    name: "Nampa, ID"
                }, {
                    slug: "napa-ca",
                    id: 602,
                    name: "Napa, CA"
                }, {
                    slug: "naperville-il",
                    id: 603,
                    name: "Naperville, IL"
                }, {
                    slug: "nashua-nh",
                    id: 604,
                    name: "Nashua, NH"
                }, {
                    slug: "nashville-davidson-tn",
                    id: 605,
                    name: "Nashville-Davidson, TN"
                }, {
                    slug: "national-city-ca",
                    id: 606,
                    name: "National City, CA"
                }, {
                    slug: "new-bedford-ma",
                    id: 607,
                    name: "New Bedford, MA"
                }, {
                    slug: "new-berlin-wi",
                    id: 608,
                    name: "New Berlin, WI"
                }, {
                    slug: "new-braunfels-tx",
                    id: 609,
                    name: "New Braunfels, TX"
                }, {
                    slug: "new-britain-ct",
                    id: 610,
                    name: "New Britain, CT"
                }, {
                    slug: "new-brunswick-nj",
                    id: 611,
                    name: "New Brunswick, NJ"
                }, {
                    slug: "new-haven-ct",
                    id: 612,
                    name: "New Haven, CT"
                }, {
                    slug: "new-orleans-la",
                    id: 613,
                    name: "New Orleans, LA"
                }, {
                    slug: "new-rochelle-ny",
                    id: 614,
                    name: "New Rochelle, NY"
                }, {
                    slug: "new-york-ny",
                    id: 615,
                    name: "New York, NY"
                }, {
                    slug: "newark-ca",
                    id: 616,
                    name: "Newark, CA"
                }, {
                    slug: "newark-nj",
                    id: 617,
                    name: "Newark, NJ"
                }, {
                    slug: "newark-oh",
                    id: 618,
                    name: "Newark, OH"
                }, {
                    slug: "newport-beach-ca",
                    id: 619,
                    name: "Newport Beach, CA"
                }, {
                    slug: "newport-news-va",
                    id: 620,
                    name: "Newport News, VA"
                }, {
                    slug: "newton-ma",
                    id: 621,
                    name: "Newton, MA"
                }, {
                    slug: "niagara-falls-ny",
                    id: 622,
                    name: "Niagara Falls, NY"
                }, {
                    slug: "noblesville-in",
                    id: 623,
                    name: "Noblesville, IN"
                }, {
                    slug: "norfolk-va",
                    id: 624,
                    name: "Norfolk, VA"
                }, {
                    slug: "normal-il",
                    id: 625,
                    name: "Normal, IL"
                }, {
                    slug: "norman-ok",
                    id: 626,
                    name: "Norman, OK"
                }, {
                    slug: "north-charleston-sc",
                    id: 627,
                    name: "North Charleston, SC"
                }, {
                    slug: "north-las-vegas-nv",
                    id: 628,
                    name: "North Las Vegas, NV"
                }, {
                    slug: "north-lauderdale-fl",
                    id: 629,
                    name: "North Lauderdale, FL"
                }, {
                    slug: "north-little-rock-ar",
                    id: 630,
                    name: "North Little Rock, AR"
                }, {
                    slug: "north-miami-beach-fl",
                    id: 631,
                    name: "North Miami Beach, FL"
                }, {
                    slug: "north-miami-fl",
                    id: 632,
                    name: "North Miami, FL"
                }, {
                    slug: "north-port-fl",
                    id: 633,
                    name: "North Port, FL"
                }, {
                    slug: "north-richland-hills-tx",
                    id: 634,
                    name: "North Richland Hills, TX"
                }, {
                    slug: "northglenn-co",
                    id: 635,
                    name: "Northglenn, CO"
                }, {
                    slug: "norwalk-ca",
                    id: 636,
                    name: "Norwalk, CA"
                }, {
                    slug: "norwalk-ct",
                    id: 637,
                    name: "Norwalk, CT"
                }, {
                    slug: "norwich-ct",
                    id: 638,
                    name: "Norwich, CT"
                }, {
                    slug: "novato-ca",
                    id: 639,
                    name: "Novato, CA"
                }, {
                    slug: "novi-mi",
                    id: 640,
                    name: "Novi, MI"
                }, {
                    slug: "o-fallon-mo",
                    id: 641,
                    name: "O'Fallon, MO"
                }, {
                    slug: "oak-lawn-il",
                    id: 642,
                    name: "Oak Lawn, IL"
                }, {
                    slug: "oak-park-il",
                    id: 643,
                    name: "Oak Park, IL"
                }, {
                    slug: "oakland-park-fl",
                    id: 644,
                    name: "Oakland Park, FL"
                }, {
                    slug: "oakland-ca",
                    id: 645,
                    name: "Oakland, CA"
                }, {
                    slug: "oakley-ca",
                    id: 646,
                    name: "Oakley, CA"
                }, {
                    slug: "ocala-fl",
                    id: 647,
                    name: "Ocala, FL"
                }, {
                    slug: "oceanside-ca",
                    id: 648,
                    name: "Oceanside, CA"
                }, {
                    slug: "ocoee-fl",
                    id: 649,
                    name: "Ocoee, FL"
                }, {
                    slug: "odessa-tx",
                    id: 650,
                    name: "Odessa, TX"
                }, {
                    slug: "ogden-ut",
                    id: 651,
                    name: "Ogden, UT"
                }, {
                    slug: "oklahoma-city-ok",
                    id: 652,
                    name: "Oklahoma City, OK"
                }, {
                    slug: "olathe-ks",
                    id: 653,
                    name: "Olathe, KS"
                }, {
                    slug: "olympia-wa",
                    id: 654,
                    name: "Olympia, WA"
                }, {
                    slug: "omaha-ne",
                    id: 655,
                    name: "Omaha, NE"
                }, {
                    slug: "ontario-ca",
                    id: 656,
                    name: "Ontario, CA"
                }, {
                    slug: "orange-ca",
                    id: 657,
                    name: "Orange, CA"
                }, {
                    slug: "orem-ut",
                    id: 658,
                    name: "Orem, UT"
                }, {
                    slug: "orland-park-il",
                    id: 659,
                    name: "Orland Park, IL"
                }, {
                    slug: "orlando-fl",
                    id: 660,
                    name: "Orlando, FL"
                }, {
                    slug: "ormond-beach-fl",
                    id: 661,
                    name: "Ormond Beach, FL"
                }, {
                    slug: "oro-valley-az",
                    id: 662,
                    name: "Oro Valley, AZ"
                }, {
                    slug: "oshkosh-wi",
                    id: 663,
                    name: "Oshkosh, WI"
                }, {
                    slug: "overland-park-ks",
                    id: 664,
                    name: "Overland Park, KS"
                }, {
                    slug: "owensboro-ky",
                    id: 665,
                    name: "Owensboro, KY"
                }, {
                    slug: "oxnard-ca",
                    id: 666,
                    name: "Oxnard, CA"
                }, {
                    slug: "pacifica-ca",
                    id: 667,
                    name: "Pacifica, CA"
                }, {
                    slug: "palatine-il",
                    id: 668,
                    name: "Palatine, IL"
                }, {
                    slug: "palm-bay-fl",
                    id: 669,
                    name: "Palm Bay, FL"
                }, {
                    slug: "palm-beach-gardens-fl",
                    id: 670,
                    name: "Palm Beach Gardens, FL"
                }, {
                    slug: "palm-coast-fl",
                    id: 671,
                    name: "Palm Coast, FL"
                }, {
                    slug: "palm-desert-ca",
                    id: 672,
                    name: "Palm Desert, CA"
                }, {
                    slug: "palm-springs-ca",
                    id: 673,
                    name: "Palm Springs, CA"
                }, {
                    slug: "palmdale-ca",
                    id: 674,
                    name: "Palmdale, CA"
                }, {
                    slug: "palo-alto-ca",
                    id: 675,
                    name: "Palo Alto, CA"
                }, {
                    slug: "panama-city-fl",
                    id: 676,
                    name: "Panama City, FL"
                }, {
                    slug: "paramount-ca",
                    id: 677,
                    name: "Paramount, CA"
                }, {
                    slug: "park-ridge-il",
                    id: 678,
                    name: "Park Ridge, IL"
                }, {
                    slug: "parker-co",
                    id: 679,
                    name: "Parker, CO"
                }, {
                    slug: "parma-oh",
                    id: 680,
                    name: "Parma, OH"
                }, {
                    slug: "pasadena-ca",
                    id: 681,
                    name: "Pasadena, CA"
                }, {
                    slug: "pasadena-tx",
                    id: 682,
                    name: "Pasadena, TX"
                }, {
                    slug: "pasco-wa",
                    id: 683,
                    name: "Pasco, WA"
                }, {
                    slug: "passaic-nj",
                    id: 684,
                    name: "Passaic, NJ"
                }, {
                    slug: "paterson-nj",
                    id: 685,
                    name: "Paterson, NJ"
                }, {
                    slug: "pawtucket-ri",
                    id: 686,
                    name: "Pawtucket, RI"
                }, {
                    slug: "peabody-ma",
                    id: 687,
                    name: "Peabody, MA"
                }, {
                    slug: "peachtree-corners-ga",
                    id: 688,
                    name: "Peachtree Corners, GA"
                }, {
                    slug: "pearland-tx",
                    id: 689,
                    name: "Pearland, TX"
                }, {
                    slug: "pembroke-pines-fl",
                    id: 690,
                    name: "Pembroke Pines, FL"
                }, {
                    slug: "pensacola-fl",
                    id: 691,
                    name: "Pensacola, FL"
                }, {
                    slug: "peoria-az",
                    id: 692,
                    name: "Peoria, AZ"
                }, {
                    slug: "peoria-il",
                    id: 693,
                    name: "Peoria, IL"
                }, {
                    slug: "perris-ca",
                    id: 694,
                    name: "Perris, CA"
                }, {
                    slug: "perth-amboy-nj",
                    id: 695,
                    name: "Perth Amboy, NJ"
                }, {
                    slug: "petaluma-ca",
                    id: 696,
                    name: "Petaluma, CA"
                }, {
                    slug: "pflugerville-tx",
                    id: 697,
                    name: "Pflugerville, TX"
                }, {
                    slug: "pharr-tx",
                    id: 698,
                    name: "Pharr, TX"
                }, {
                    slug: "phenix-city-al",
                    id: 699,
                    name: "Phenix City, AL"
                }, {
                    slug: "philadelphia-pa",
                    id: 700,
                    name: "Philadelphia, PA"
                }, {
                    slug: "phoenix-az",
                    id: 701,
                    name: "Phoenix, AZ"
                }, {
                    slug: "pico-rivera-ca",
                    id: 702,
                    name: "Pico Rivera, CA"
                }, {
                    slug: "pine-bluff-ar",
                    id: 703,
                    name: "Pine Bluff, AR"
                }, {
                    slug: "pinellas-park-fl",
                    id: 704,
                    name: "Pinellas Park, FL"
                }, {
                    slug: "pittsburg-ca",
                    id: 705,
                    name: "Pittsburg, CA"
                }, {
                    slug: "pittsburgh-pa",
                    id: 706,
                    name: "Pittsburgh, PA"
                }, {
                    slug: "pittsfield-ma",
                    id: 707,
                    name: "Pittsfield, MA"
                }, {
                    slug: "placentia-ca",
                    id: 708,
                    name: "Placentia, CA"
                }, {
                    slug: "plainfield-il",
                    id: 709,
                    name: "Plainfield, IL"
                }, {
                    slug: "plainfield-nj",
                    id: 710,
                    name: "Plainfield, NJ"
                }, {
                    slug: "plano-tx",
                    id: 711,
                    name: "Plano, TX"
                }, {
                    slug: "plantation-fl",
                    id: 712,
                    name: "Plantation, FL"
                }, {
                    slug: "pleasanton-ca",
                    id: 713,
                    name: "Pleasanton, CA"
                }, {
                    slug: "plymouth-mn",
                    id: 714,
                    name: "Plymouth, MN"
                }, {
                    slug: "pocatello-id",
                    id: 715,
                    name: "Pocatello, ID"
                }, {
                    slug: "pomona-ca",
                    id: 716,
                    name: "Pomona, CA"
                }, {
                    slug: "pompano-beach-fl",
                    id: 717,
                    name: "Pompano Beach, FL"
                }, {
                    slug: "pontiac-mi",
                    id: 718,
                    name: "Pontiac, MI"
                }, {
                    slug: "port-arthur-tx",
                    id: 719,
                    name: "Port Arthur, TX"
                }, {
                    slug: "port-orange-fl",
                    id: 720,
                    name: "Port Orange, FL"
                }, {
                    slug: "port-st.-lucie-fl",
                    id: 721,
                    name: "Port St. Lucie, FL"
                }, {
                    slug: "portage-mi",
                    id: 722,
                    name: "Portage, MI"
                }, {
                    slug: "porterville-ca",
                    id: 723,
                    name: "Porterville, CA"
                }, {
                    slug: "portland-me",
                    id: 724,
                    name: "Portland, ME"
                }, {
                    slug: "portland-or",
                    id: 725,
                    name: "Portland, OR"
                }, {
                    slug: "portsmouth-va",
                    id: 726,
                    name: "Portsmouth, VA"
                }, {
                    slug: "poway-ca",
                    id: 727,
                    name: "Poway, CA"
                }, {
                    slug: "prescott-valley-az",
                    id: 728,
                    name: "Prescott Valley, AZ"
                }, {
                    slug: "prescott-az",
                    id: 729,
                    name: "Prescott, AZ"
                }, {
                    slug: "providence-ri",
                    id: 730,
                    name: "Providence, RI"
                }, {
                    slug: "provo-ut",
                    id: 731,
                    name: "Provo, UT"
                }, {
                    slug: "pueblo-co",
                    id: 732,
                    name: "Pueblo, CO"
                }, {
                    slug: "puyallup-wa",
                    id: 733,
                    name: "Puyallup, WA"
                }, {
                    slug: "quincy-il",
                    id: 734,
                    name: "Quincy, IL"
                }, {
                    slug: "quincy-ma",
                    id: 735,
                    name: "Quincy, MA"
                }, {
                    slug: "racine-wi",
                    id: 736,
                    name: "Racine, WI"
                }, {
                    slug: "raleigh-nc",
                    id: 737,
                    name: "Raleigh, NC"
                }, {
                    slug: "rancho-cordova-ca",
                    id: 738,
                    name: "Rancho Cordova, CA"
                }, {
                    slug: "rancho-cucamonga-ca",
                    id: 739,
                    name: "Rancho Cucamonga, CA"
                }, {
                    slug: "rancho-palos-verdes-ca",
                    id: 740,
                    name: "Rancho Palos Verdes, CA"
                }, {
                    slug: "rancho-santa-margarita-ca",
                    id: 741,
                    name: "Rancho Santa Margarita, CA"
                }, {
                    slug: "rapid-city-sd",
                    id: 742,
                    name: "Rapid City, SD"
                }, {
                    slug: "reading-pa",
                    id: 743,
                    name: "Reading, PA"
                }, {
                    slug: "redding-ca",
                    id: 744,
                    name: "Redding, CA"
                }, {
                    slug: "redlands-ca",
                    id: 745,
                    name: "Redlands, CA"
                }, {
                    slug: "redmond-wa",
                    id: 746,
                    name: "Redmond, WA"
                }, {
                    slug: "redondo-beach-ca",
                    id: 747,
                    name: "Redondo Beach, CA"
                }, {
                    slug: "redwood-city-ca",
                    id: 748,
                    name: "Redwood City, CA"
                }, {
                    slug: "reno-nv",
                    id: 749,
                    name: "Reno, NV"
                }, {
                    slug: "renton-wa",
                    id: 750,
                    name: "Renton, WA"
                }, {
                    slug: "revere-ma",
                    id: 751,
                    name: "Revere, MA"
                }, {
                    slug: "rialto-ca",
                    id: 752,
                    name: "Rialto, CA"
                }, {
                    slug: "richardson-tx",
                    id: 753,
                    name: "Richardson, TX"
                }, {
                    slug: "richland-wa",
                    id: 754,
                    name: "Richland, WA"
                }, {
                    slug: "richmond-ca",
                    id: 755,
                    name: "Richmond, CA"
                }, {
                    slug: "richmond-va",
                    id: 756,
                    name: "Richmond, VA"
                }, {
                    slug: "rio-rancho-nm",
                    id: 757,
                    name: "Rio Rancho, NM"
                }, {
                    slug: "riverside-ca",
                    id: 758,
                    name: "Riverside, CA"
                }, {
                    slug: "riverton-ut",
                    id: 759,
                    name: "Riverton, UT"
                }, {
                    slug: "roanoke-va",
                    id: 760,
                    name: "Roanoke, VA"
                }, {
                    slug: "rochester-hills-mi",
                    id: 761,
                    name: "Rochester Hills, MI"
                }, {
                    slug: "rochester-mn",
                    id: 762,
                    name: "Rochester, MN"
                }, {
                    slug: "rochester-ny",
                    id: 763,
                    name: "Rochester, NY"
                }, {
                    slug: "rock-hill-sc",
                    id: 764,
                    name: "Rock Hill, SC"
                }, {
                    slug: "rock-island-il",
                    id: 765,
                    name: "Rock Island, IL"
                }, {
                    slug: "rockford-il",
                    id: 766,
                    name: "Rockford, IL"
                }, {
                    slug: "rocklin-ca",
                    id: 767,
                    name: "Rocklin, CA"
                }, {
                    slug: "rockville-md",
                    id: 768,
                    name: "Rockville, MD"
                }, {
                    slug: "rockwall-tx",
                    id: 769,
                    name: "Rockwall, TX"
                }, {
                    slug: "rocky-mount-nc",
                    id: 770,
                    name: "Rocky Mount, NC"
                }, {
                    slug: "rogers-ar",
                    id: 771,
                    name: "Rogers, AR"
                }, {
                    slug: "rohnert-park-ca",
                    id: 772,
                    name: "Rohnert Park, CA"
                }, {
                    slug: "romeoville-il",
                    id: 773,
                    name: "Romeoville, IL"
                }, {
                    slug: "rosemead-ca",
                    id: 774,
                    name: "Rosemead, CA"
                }, {
                    slug: "roseville-ca",
                    id: 775,
                    name: "Roseville, CA"
                }, {
                    slug: "roseville-mi",
                    id: 776,
                    name: "Roseville, MI"
                }, {
                    slug: "roswell-ga",
                    id: 777,
                    name: "Roswell, GA"
                }, {
                    slug: "roswell-nm",
                    id: 778,
                    name: "Roswell, NM"
                }, {
                    slug: "round-rock-tx",
                    id: 779,
                    name: "Round Rock, TX"
                }, {
                    slug: "rowlett-tx",
                    id: 780,
                    name: "Rowlett, TX"
                }, {
                    slug: "roy-ut",
                    id: 781,
                    name: "Roy, UT"
                }, {
                    slug: "royal-oak-mi",
                    id: 782,
                    name: "Royal Oak, MI"
                }, {
                    slug: "sacramento-ca",
                    id: 783,
                    name: "Sacramento, CA"
                }, {
                    slug: "saginaw-mi",
                    id: 784,
                    name: "Saginaw, MI"
                }, {
                    slug: "salem-ma",
                    id: 785,
                    name: "Salem, MA"
                }, {
                    slug: "salem-or",
                    id: 786,
                    name: "Salem, OR"
                }, {
                    slug: "salina-ks",
                    id: 787,
                    name: "Salina, KS"
                }, {
                    slug: "salinas-ca",
                    id: 788,
                    name: "Salinas, CA"
                }, {
                    slug: "salt-lake-city-ut",
                    id: 789,
                    name: "Salt Lake City, UT"
                }, {
                    slug: "sammamish-wa",
                    id: 790,
                    name: "Sammamish, WA"
                }, {
                    slug: "san-angelo-tx",
                    id: 791,
                    name: "San Angelo, TX"
                }, {
                    slug: "san-antonio-tx",
                    id: 792,
                    name: "San Antonio, TX"
                }, {
                    slug: "san-bernardino-ca",
                    id: 793,
                    name: "San Bernardino, CA"
                }, {
                    slug: "san-bruno-ca",
                    id: 794,
                    name: "San Bruno, CA"
                }, {
                    slug: "san-clemente-ca",
                    id: 795,
                    name: "San Clemente, CA"
                }, {
                    slug: "san-diego-ca",
                    id: 796,
                    name: "San Diego, CA"
                }, {
                    slug: "san-francisco-ca",
                    id: 797,
                    name: "San Francisco, CA"
                }, {
                    slug: "san-gabriel-ca",
                    id: 798,
                    name: "San Gabriel, CA"
                }, {
                    slug: "san-jacinto-ca",
                    id: 799,
                    name: "San Jacinto, CA"
                }, {
                    slug: "san-jose-ca",
                    id: 800,
                    name: "San Jose, CA"
                }, {
                    slug: "san-leandro-ca",
                    id: 801,
                    name: "San Leandro, CA"
                }, {
                    slug: "san-luis-obispo-ca",
                    id: 802,
                    name: "San Luis Obispo, CA"
                }, {
                    slug: "san-marcos-ca",
                    id: 803,
                    name: "San Marcos, CA"
                }, {
                    slug: "san-marcos-tx",
                    id: 804,
                    name: "San Marcos, TX"
                }, {
                    slug: "san-mateo-ca",
                    id: 805,
                    name: "San Mateo, CA"
                }, {
                    slug: "san-rafael-ca",
                    id: 806,
                    name: "San Rafael, CA"
                }, {
                    slug: "san-ramon-ca",
                    id: 807,
                    name: "San Ramon, CA"
                }, {
                    slug: "sandy-springs-ga",
                    id: 808,
                    name: "Sandy Springs, GA"
                }, {
                    slug: "sandy-ut",
                    id: 809,
                    name: "Sandy, UT"
                }, {
                    slug: "sanford-fl",
                    id: 810,
                    name: "Sanford, FL"
                }, {
                    slug: "santa-ana-ca",
                    id: 811,
                    name: "Santa Ana, CA"
                }, {
                    slug: "santa-barbara-ca",
                    id: 812,
                    name: "Santa Barbara, CA"
                }, {
                    slug: "santa-clara-ca",
                    id: 813,
                    name: "Santa Clara, CA"
                }, {
                    slug: "santa-clarita-ca",
                    id: 814,
                    name: "Santa Clarita, CA"
                }, {
                    slug: "santa-cruz-ca",
                    id: 815,
                    name: "Santa Cruz, CA"
                }, {
                    slug: "santa-fe-nm",
                    id: 816,
                    name: "Santa Fe, NM"
                }, {
                    slug: "santa-maria-ca",
                    id: 817,
                    name: "Santa Maria, CA"
                }, {
                    slug: "santa-monica-ca",
                    id: 818,
                    name: "Santa Monica, CA"
                }, {
                    slug: "santa-rosa-ca",
                    id: 819,
                    name: "Santa Rosa, CA"
                }, {
                    slug: "santee-ca",
                    id: 820,
                    name: "Santee, CA"
                }, {
                    slug: "sarasota-fl",
                    id: 821,
                    name: "Sarasota, FL"
                }, {
                    slug: "savannah-ga",
                    id: 822,
                    name: "Savannah, GA"
                }, {
                    slug: "sayreville-nj",
                    id: 823,
                    name: "Sayreville, NJ"
                }, {
                    slug: "schaumburg-il",
                    id: 824,
                    name: "Schaumburg, IL"
                }, {
                    slug: "schenectady-ny",
                    id: 825,
                    name: "Schenectady, NY"
                }, {
                    slug: "scottsdale-az",
                    id: 826,
                    name: "Scottsdale, AZ"
                }, {
                    slug: "scranton-pa",
                    id: 827,
                    name: "Scranton, PA"
                }, {
                    slug: "seattle-wa",
                    id: 828,
                    name: "Seattle, WA"
                }, {
                    slug: "shakopee-mn",
                    id: 829,
                    name: "Shakopee, MN"
                }, {
                    slug: "shawnee-ks",
                    id: 830,
                    name: "Shawnee, KS"
                }, {
                    slug: "sheboygan-wi",
                    id: 831,
                    name: "Sheboygan, WI"
                }, {
                    slug: "shelton-ct",
                    id: 832,
                    name: "Shelton, CT"
                }, {
                    slug: "sherman-tx",
                    id: 833,
                    name: "Sherman, TX"
                }, {
                    slug: "shoreline-wa",
                    id: 834,
                    name: "Shoreline, WA"
                }, {
                    slug: "shreveport-la",
                    id: 835,
                    name: "Shreveport, LA"
                }, {
                    slug: "sierra-vista-az",
                    id: 836,
                    name: "Sierra Vista, AZ"
                }, {
                    slug: "simi-valley-ca",
                    id: 837,
                    name: "Simi Valley, CA"
                }, {
                    slug: "sioux-city-ia",
                    id: 838,
                    name: "Sioux City, IA"
                }, {
                    slug: "sioux-falls-sd",
                    id: 839,
                    name: "Sioux Falls, SD"
                }, {
                    slug: "skokie-il",
                    id: 840,
                    name: "Skokie, IL"
                }, {
                    slug: "smyrna-ga",
                    id: 841,
                    name: "Smyrna, GA"
                }, {
                    slug: "smyrna-tn",
                    id: 842,
                    name: "Smyrna, TN"
                }, {
                    slug: "somerville-ma",
                    id: 843,
                    name: "Somerville, MA"
                }, {
                    slug: "south-bend-in",
                    id: 844,
                    name: "South Bend, IN"
                }, {
                    slug: "south-gate-ca",
                    id: 845,
                    name: "South Gate, CA"
                }, {
                    slug: "south-jordan-ut",
                    id: 846,
                    name: "South Jordan, UT"
                }, {
                    slug: "south-san-francisco-ca",
                    id: 847,
                    name: "South San Francisco, CA"
                }, {
                    slug: "southaven-ms",
                    id: 848,
                    name: "Southaven, MS"
                }, {
                    slug: "southfield-mi",
                    id: 849,
                    name: "Southfield, MI"
                }, {
                    slug: "spanish-fork-ut",
                    id: 850,
                    name: "Spanish Fork, UT"
                }, {
                    slug: "sparks-nv",
                    id: 851,
                    name: "Sparks, NV"
                }, {
                    slug: "spartanburg-sc",
                    id: 852,
                    name: "Spartanburg, SC"
                }, {
                    slug: "spokane-valley-wa",
                    id: 853,
                    name: "Spokane Valley, WA"
                }, {
                    slug: "spokane-wa",
                    id: 854,
                    name: "Spokane, WA"
                }, {
                    slug: "springdale-ar",
                    id: 855,
                    name: "Springdale, AR"
                }, {
                    slug: "springfield-il",
                    id: 856,
                    name: "Springfield, IL"
                }, {
                    slug: "springfield-ma",
                    id: 857,
                    name: "Springfield, MA"
                }, {
                    slug: "springfield-mo",
                    id: 858,
                    name: "Springfield, MO"
                }, {
                    slug: "springfield-oh",
                    id: 859,
                    name: "Springfield, OH"
                }, {
                    slug: "springfield-or",
                    id: 860,
                    name: "Springfield, OR"
                }, {
                    slug: "st.-charles-mo",
                    id: 861,
                    name: "St. Charles, MO"
                }, {
                    slug: "st.-clair-shores-mi",
                    id: 862,
                    name: "St. Clair Shores, MI"
                }, {
                    slug: "st.-cloud-fl",
                    id: 863,
                    name: "St. Cloud, FL"
                }, {
                    slug: "st.-cloud-mn",
                    id: 864,
                    name: "St. Cloud, MN"
                }, {
                    slug: "st.-george-ut",
                    id: 865,
                    name: "St. George, UT"
                }, {
                    slug: "st.-joseph-mo",
                    id: 866,
                    name: "St. Joseph, MO"
                }, {
                    slug: "st.-louis-park-mn",
                    id: 867,
                    name: "St. Louis Park, MN"
                }, {
                    slug: "st.-louis-mo",
                    id: 868,
                    name: "St. Louis, MO"
                }, {
                    slug: "st.-paul-mn",
                    id: 869,
                    name: "St. Paul, MN"
                }, {
                    slug: "st.-peters-mo",
                    id: 870,
                    name: "St. Peters, MO"
                }, {
                    slug: "st.-petersburg-fl",
                    id: 871,
                    name: "St. Petersburg, FL"
                }, {
                    slug: "stamford-ct",
                    id: 872,
                    name: "Stamford, CT"
                }, {
                    slug: "stanton-ca",
                    id: 873,
                    name: "Stanton, CA"
                }, {
                    slug: "state-college-pa",
                    id: 874,
                    name: "State College, PA"
                }, {
                    slug: "sterling-heights-mi",
                    id: 875,
                    name: "Sterling Heights, MI"
                }, {
                    slug: "stillwater-ok",
                    id: 876,
                    name: "Stillwater, OK"
                }, {
                    slug: "stockton-ca",
                    id: 877,
                    name: "Stockton, CA"
                }, {
                    slug: "streamwood-il",
                    id: 878,
                    name: "Streamwood, IL"
                }, {
                    slug: "strongsville-oh",
                    id: 879,
                    name: "Strongsville, OH"
                }, {
                    slug: "suffolk-va",
                    id: 880,
                    name: "Suffolk, VA"
                }, {
                    slug: "sugar-land-tx",
                    id: 881,
                    name: "Sugar Land, TX"
                }, {
                    slug: "summerville-sc",
                    id: 882,
                    name: "Summerville, SC"
                }, {
                    slug: "sumter-sc",
                    id: 883,
                    name: "Sumter, SC"
                }, {
                    slug: "sunnyvale-ca",
                    id: 884,
                    name: "Sunnyvale, CA"
                }, {
                    slug: "sunrise-fl",
                    id: 885,
                    name: "Sunrise, FL"
                }, {
                    slug: "surprise-az",
                    id: 886,
                    name: "Surprise, AZ"
                }, {
                    slug: "syracuse-ny",
                    id: 887,
                    name: "Syracuse, NY"
                }, {
                    slug: "tacoma-wa",
                    id: 888,
                    name: "Tacoma, WA"
                }, {
                    slug: "tallahassee-fl",
                    id: 889,
                    name: "Tallahassee, FL"
                }, {
                    slug: "tamarac-fl",
                    id: 890,
                    name: "Tamarac, FL"
                }, {
                    slug: "tampa-fl",
                    id: 891,
                    name: "Tampa, FL"
                }, {
                    slug: "taunton-ma",
                    id: 892,
                    name: "Taunton, MA"
                }, {
                    slug: "taylor-mi",
                    id: 893,
                    name: "Taylor, MI"
                }, {
                    slug: "taylorsville-ut",
                    id: 894,
                    name: "Taylorsville, UT"
                }, {
                    slug: "temecula-ca",
                    id: 895,
                    name: "Temecula, CA"
                }, {
                    slug: "tempe-az",
                    id: 896,
                    name: "Tempe, AZ"
                }, {
                    slug: "temple-tx",
                    id: 897,
                    name: "Temple, TX"
                }, {
                    slug: "terre-haute-in",
                    id: 898,
                    name: "Terre Haute, IN"
                }, {
                    slug: "texarkana-tx",
                    id: 899,
                    name: "Texarkana, TX"
                }, {
                    slug: "texas-city-tx",
                    id: 900,
                    name: "Texas City, TX"
                }, {
                    slug: "the-colony-tx",
                    id: 901,
                    name: "The Colony, TX"
                }, {
                    slug: "thornton-co",
                    id: 902,
                    name: "Thornton, CO"
                }, {
                    slug: "thousand-oaks-ca",
                    id: 903,
                    name: "Thousand Oaks, CA"
                }, {
                    slug: "tigard-or",
                    id: 904,
                    name: "Tigard, OR"
                }, {
                    slug: "tinley-park-il",
                    id: 905,
                    name: "Tinley Park, IL"
                }, {
                    slug: "titusville-fl",
                    id: 906,
                    name: "Titusville, FL"
                }, {
                    slug: "toledo-oh",
                    id: 907,
                    name: "Toledo, OH"
                }, {
                    slug: "topeka-ks",
                    id: 908,
                    name: "Topeka, KS"
                }, {
                    slug: "torrance-ca",
                    id: 909,
                    name: "Torrance, CA"
                }, {
                    slug: "tracy-ca",
                    id: 910,
                    name: "Tracy, CA"
                }, {
                    slug: "trenton-nj",
                    id: 911,
                    name: "Trenton, NJ"
                }, {
                    slug: "troy-mi",
                    id: 912,
                    name: "Troy, MI"
                }, {
                    slug: "troy-ny",
                    id: 913,
                    name: "Troy, NY"
                }, {
                    slug: "tucson-az",
                    id: 914,
                    name: "Tucson, AZ"
                }, {
                    slug: "tulare-ca",
                    id: 915,
                    name: "Tulare, CA"
                }, {
                    slug: "tulsa-ok",
                    id: 916,
                    name: "Tulsa, OK"
                }, {
                    slug: "turlock-ca",
                    id: 917,
                    name: "Turlock, CA"
                }, {
                    slug: "tuscaloosa-al",
                    id: 918,
                    name: "Tuscaloosa, AL"
                }, {
                    slug: "tustin-ca",
                    id: 919,
                    name: "Tustin, CA"
                }, {
                    slug: "twin-falls-id",
                    id: 920,
                    name: "Twin Falls, ID"
                }, {
                    slug: "tyler-tx",
                    id: 921,
                    name: "Tyler, TX"
                }, {
                    slug: "union-city-ca",
                    id: 922,
                    name: "Union City, CA"
                }, {
                    slug: "union-city-nj",
                    id: 923,
                    name: "Union City, NJ"
                }, {
                    slug: "upland-ca",
                    id: 924,
                    name: "Upland, CA"
                }, {
                    slug: "urbana-il",
                    id: 925,
                    name: "Urbana, IL"
                }, {
                    slug: "urbandale-ia",
                    id: 926,
                    name: "Urbandale, IA"
                }, {
                    slug: "utica-ny",
                    id: 927,
                    name: "Utica, NY"
                }, {
                    slug: "vacaville-ca",
                    id: 928,
                    name: "Vacaville, CA"
                }, {
                    slug: "valdosta-ga",
                    id: 929,
                    name: "Valdosta, GA"
                }, {
                    slug: "vallejo-ca",
                    id: 930,
                    name: "Vallejo, CA"
                }, {
                    slug: "valley-stream-ny",
                    id: 931,
                    name: "Valley Stream, NY"
                }, {
                    slug: "vancouver-wa",
                    id: 932,
                    name: "Vancouver, WA"
                }, {
                    slug: "ventura-ca",
                    id: 933,
                    name: "Ventura, CA"
                }, {
                    slug: "victoria-tx",
                    id: 934,
                    name: "Victoria, TX"
                }, {
                    slug: "victorville-ca",
                    id: 935,
                    name: "Victorville, CA"
                }, {
                    slug: "vineland-nj",
                    id: 936,
                    name: "Vineland, NJ"
                }, {
                    slug: "virginia-beach-va",
                    id: 937,
                    name: "Virginia Beach, VA"
                }, {
                    slug: "visalia-ca",
                    id: 938,
                    name: "Visalia, CA"
                }, {
                    slug: "vista-ca",
                    id: 939,
                    name: "Vista, CA"
                }, {
                    slug: "waco-tx",
                    id: 940,
                    name: "Waco, TX"
                }, {
                    slug: "walnut-creek-ca",
                    id: 941,
                    name: "Walnut Creek, CA"
                }, {
                    slug: "waltham-ma",
                    id: 942,
                    name: "Waltham, MA"
                }, {
                    slug: "warner-robins-ga",
                    id: 943,
                    name: "Warner Robins, GA"
                }, {
                    slug: "warren-mi",
                    id: 944,
                    name: "Warren, MI"
                }, {
                    slug: "warren-oh",
                    id: 945,
                    name: "Warren, OH"
                }, {
                    slug: "warwick-ri",
                    id: 946,
                    name: "Warwick, RI"
                }, {
                    slug: "washington-dc",
                    id: 947,
                    name: "Washington, DC"
                }, {
                    slug: "waterbury-ct",
                    id: 948,
                    name: "Waterbury, CT"
                }, {
                    slug: "waterloo-ia",
                    id: 949,
                    name: "Waterloo, IA"
                }, {
                    slug: "watsonville-ca",
                    id: 950,
                    name: "Watsonville, CA"
                }, {
                    slug: "waukegan-il",
                    id: 951,
                    name: "Waukegan, IL"
                }, {
                    slug: "waukesha-wi",
                    id: 952,
                    name: "Waukesha, WI"
                }, {
                    slug: "wausau-wi",
                    id: 953,
                    name: "Wausau, WI"
                }, {
                    slug: "wauwatosa-wi",
                    id: 954,
                    name: "Wauwatosa, WI"
                }, {
                    slug: "wellington-fl",
                    id: 955,
                    name: "Wellington, FL"
                }, {
                    slug: "weslaco-tx",
                    id: 956,
                    name: "Weslaco, TX"
                }, {
                    slug: "west-allis-wi",
                    id: 957,
                    name: "West Allis, WI"
                }, {
                    slug: "west-covina-ca",
                    id: 958,
                    name: "West Covina, CA"
                }, {
                    slug: "west-des-moines-ia",
                    id: 959,
                    name: "West Des Moines, IA"
                }, {
                    slug: "west-haven-ct",
                    id: 960,
                    name: "West Haven, CT"
                }, {
                    slug: "west-jordan-ut",
                    id: 961,
                    name: "West Jordan, UT"
                }, {
                    slug: "west-new-york-nj",
                    id: 962,
                    name: "West New York, NJ"
                }, {
                    slug: "west-palm-beach-fl",
                    id: 963,
                    name: "West Palm Beach, FL"
                }, {
                    slug: "west-sacramento-ca",
                    id: 964,
                    name: "West Sacramento, CA"
                }, {
                    slug: "west-valley-city-ut",
                    id: 965,
                    name: "West Valley City, UT"
                }, {
                    slug: "westerville-oh",
                    id: 966,
                    name: "Westerville, OH"
                }, {
                    slug: "westfield-ma",
                    id: 967,
                    name: "Westfield, MA"
                }, {
                    slug: "westland-mi",
                    id: 968,
                    name: "Westland, MI"
                }, {
                    slug: "westminster-ca",
                    id: 969,
                    name: "Westminster, CA"
                }, {
                    slug: "westminster-co",
                    id: 970,
                    name: "Westminster, CO"
                }, {
                    slug: "weston-fl",
                    id: 971,
                    name: "Weston, FL"
                }, {
                    slug: "weymouth-town-ma",
                    id: 972,
                    name: "Weymouth Town, MA"
                }, {
                    slug: "wheaton-il",
                    id: 973,
                    name: "Wheaton, IL"
                }, {
                    slug: "wheeling-il",
                    id: 974,
                    name: "Wheeling, IL"
                }, {
                    slug: "white-plains-ny",
                    id: 975,
                    name: "White Plains, NY"
                }, {
                    slug: "whittier-ca",
                    id: 976,
                    name: "Whittier, CA"
                }, {
                    slug: "wichita-falls-tx",
                    id: 977,
                    name: "Wichita Falls, TX"
                }, {
                    slug: "wichita-ks",
                    id: 978,
                    name: "Wichita, KS"
                }, {
                    slug: "wilkes-barre-pa",
                    id: 979,
                    name: "Wilkes-Barre, PA"
                }, {
                    slug: "wilmington-de",
                    id: 980,
                    name: "Wilmington, DE"
                }, {
                    slug: "wilmington-nc",
                    id: 981,
                    name: "Wilmington, NC"
                }, {
                    slug: "wilson-nc",
                    id: 982,
                    name: "Wilson, NC"
                }, {
                    slug: "winston-salem-nc",
                    id: 983,
                    name: "Winston-Salem, NC"
                }, {
                    slug: "winter-garden-fl",
                    id: 984,
                    name: "Winter Garden, FL"
                }, {
                    slug: "woburn-ma",
                    id: 985,
                    name: "Woburn, MA"
                }, {
                    slug: "woodbury-mn",
                    id: 986,
                    name: "Woodbury, MN"
                }, {
                    slug: "woodland-ca",
                    id: 987,
                    name: "Woodland, CA"
                }, {
                    slug: "woonsocket-ri",
                    id: 988,
                    name: "Woonsocket, RI"
                }, {
                    slug: "worcester-ma",
                    id: 989,
                    name: "Worcester, MA"
                }, {
                    slug: "wylie-tx",
                    id: 990,
                    name: "Wylie, TX"
                }, {
                    slug: "wyoming-mi",
                    id: 991,
                    name: "Wyoming, MI"
                }, {
                    slug: "yakima-wa",
                    id: 992,
                    name: "Yakima, WA"
                }, {
                    slug: "yonkers-ny",
                    id: 993,
                    name: "Yonkers, NY"
                }, {
                    slug: "yorba-linda-ca",
                    id: 994,
                    name: "Yorba Linda, CA"
                }, {
                    slug: "york-pa",
                    id: 995,
                    name: "York, PA"
                }, {
                    slug: "youngstown-oh",
                    id: 996,
                    name: "Youngstown, OH"
                }, {
                    slug: "yuba-city-ca",
                    id: 997,
                    name: "Yuba City, CA"
                }, {
                    slug: "yucaipa-ca",
                    id: 998,
                    name: "Yucaipa, CA"
                }, {
                    slug: "yuma-az",
                    id: 999,
                    name: "Yuma, AZ"
                }])
            }
        }, this.Distilled.Locations = e
    })),
    (function(factory) {  // Try to register as an anonymous AMD module
        if (typeof define === 'function' && define.amd) {
            define( "BestDayView",['jquery','TweenLite', "BestDayAccessibleAutocomplete", "BestDayLocation", "BestDayLocations", "BestDaySlick", "BestDaySocialLikes", "BestDayCalendar", "BestDayEmbed"], factory);
        }
        else {
            factory(jQuery, TweenLite, accessibleAutocomplete);
        }
    }(function($x, TweenLite, accessibleAutocomplete, socialLikes) {
        
        this.Distilled = this.Distilled || {};
        var e = function() {
            this._init()
        };
        e.prototype = {
            mShowingCalendar: null,
            mShowingTooltip: null,
            mLocations: null,
            mLocation: null,
            mCalendars: null,
            mTypeAhead: null,
            mCurrentLocation: null,
            mMobileView: null,
            mSlick: null,
            mLookingAhead: null,
            mFocusedMonth: null,
            mEnteredMonth: null,
            _init: function() {
                this._checkSize(), this.mLocations = new Distilled.Locations, this.mLocation = new Distilled.Location(this._onLocationLoadComplete, this._onLocationLoadError, this), this._setupInput(), this._setupCalendar(), this._addEventListeners()
            },
            _checkSize: function() {
                var height = window.innerHeight,
                    width = window.innerWidth,
                    min = Math.min( height, width ),
                    max = Math.max( height, width );

                this.mMobileView = null;

                if ( min < 768 && Distilled.core.HAS_TOUCH || $( "body" ).is( ".bl_mobile" ))
                {
                    this.mMobileView = true;

                    $( "html" ).addClass( "mobile_view" );
                
                    var fixedDiv = $("<div id='best_day_fixed_div' class='best_day'></div>");

                    $( "#methodology" ).appendTo( fixedDiv );
                    $( "#mobile_calendar_block" ).appendTo( fixedDiv );
                    $( "div.social.social-likes" ).appendTo( fixedDiv );

                    $( "body" ).append( fixedDiv );
                }
            },
            _setupInput: function() {
                var e, t = this,
                    n = this.mLocations.getData();
                if (Distilled.core.HASH) {
                    var i = this.mLocations.find(Distilled.core.HASH);
                    i && (e = i.name)
                }
                var calendarUpdate = new CustomEvent('calendar-update');
                var a = null,
                    o = null,
                    s = function() {
                        var e = $("#city_autocomplete").val();
                        return null !== a && void 0 !== a ? a : e.length > 0 ? e : null
                    },
                    r = function() {
                        s() ? $("#city_autocomplete_container .autocomplete__wrapper").addClass("autocomplete__value") : $("#city_autocomplete_container .autocomplete__wrapper").removeClass("autocomplete__value")
                    };
                accessibleAutocomplete({
                    element: document.querySelector("#city_autocomplete_container"),
                    id: "city_autocomplete",
                    source: n,
                    placeholder: "enter city",
                    showNoOptionsFound: !1,
                    autoselect: !1,
                    showAllValues: !0,
                    minLength: 0,
                    displayMenu: "overlay",
                    defaultValue: e,
                    onConfirm: function(e) {
                        a = e, r();
                        // var n = s();
                        
                        // t._locationSelected(n), n && ($("#best_day_submit_btn").focus(), setTimeout(function() {
                        //     $("#best_day_submit_btn").focus()
                        // }, 100));
                    }
                });

                r()
                
                $(window).on("keyup", function(e) {
                    16 != e.keyCode && (o = e.keyCode)
                }), $("#city_autocomplete").on("input", function(e) {
                    dispatchEvent(calendarUpdate);
                    r()
                }), $("#best_day_submit_btn").on("click", function() {
                    var e = s();
                    t._locationSelected(e)
                    dispatchEvent(calendarUpdate);
                }), $("#city_autocomplete_container .autocomplete__wrapper").append("<button tabindex='0' id='autocomplete__clear' class='autocomplete__clear clear_btn'><span class='autocomplete__clear_label'>Clear</span></button>"), $("#autocomplete__clear").on("click", function(e) {
                    a = null, o = null, $("#city_autocomplete").val(""), r(), setTimeout(function() {
                        o = null, $("#city_autocomplete").val(""), $("#city_autocomplete").focus()
                    }, 100)
                }), $("#city_autocomplete_container .autocomplete__wrapper").append("<div id='autocomplete__combo' class='autocomplete__combo combo_btn'></div>"), Distilled.core.HASH && this._locationSelected(Distilled.core.HASH)
            },
            _setupCalendar: function() {
                var e = new Date,
                    t = e.getMonth(),
                    n = e.getFullYear();
                12 == ++t && (t = 0, n++);
                var i = {};
                if (1 == this.mMobileView ? i.mouseClickMonth = this._onMouseClickMonth.bind(this) : (i.mouseOnDay = this._onMouseOverDay.bind(this), i.mouseOutDay = this._onMouseOutDay.bind(this)), this.mCalendars = [], this._createCalendar("#calendar_container", "calendar_01", t, n, i, !0), n++, this._createCalendar("#calendar_container", "calendar_02", t, n, i), 1 == this.mMobileView) {
                    n = e.getFullYear();
                    (i = {}).mouseOnDay = this._onMouseOverDayMobile.bind(this), this._createCalendar("#mobile_calendar_container", "mobile_calendar_01", t, n, i, !0)
                } else $("#mobile_calendar_container").remove()
            },
            _addEventListeners: function() {
                var e = {
                    self: this
                };
                $(".look_ahead_btn").on("click", e, this._onLookAheadClick), 
                $("#methodology_open_btn").on("click", e, this._onMethodologyOpenClick), $("#methodology_close_btn").on("click", e, this._onMethodologyCloseClick), $("#tooltip_close_btn").on("click", e, this._onTooltipCloseClick), $(document).on("focusin", e, this._onFocus), $(document).on("keydown", e, this._onDocumentKeyDown)
            },
            _createCalendar: function(e, t, n, i, a, o) {
                $(e).append("<div id='" + t + "' class='clearfix'></div>");
                var s = this,
                    r = $("#" + t).calendar({
                        startYear: i,
                        startMonth: n,
                        showDays: !0,
                        showYear: o,
                        customDayRenderer: function(e, t) {
                            s.mLocation.setDay(e, t)
                        },
                        mouseOnDay: a.mouseOnDay,
                        mouseOutDay: a.mouseOutDay,
                        mouseClickMonth: a.mouseClickMonth
                    });
                this.mCalendars.push(r)
            },
            _locationSelected: function(e) {
                var t = this.mLocations.find(e);
                if (t && this.mCurrentLocation != t.slug) {
                    if (1 == this.mShowingCalendar) return this._hideDates(), this._hideCalendar(), this._hideLookAhead(), void TweenLite.delayedCall(.5, this._locationSelected, [e], this);
                    this.mCurrentLocation = t.slug, this._showLoading(), this.mLoadingComplete = null, Distilled.core.setHash(t.slug), this.mLocation.load(t.slug);
                    var event = new CustomEvent('calendarLoad');
                    window.dispatchEvent(event);
                }
            },
            _setData: function() {
                this._hideLoading();
                for (var e = this.mCalendars, t = e.length, n = 0; n < t; n++) e[n].update();
                var i = this.mLocation.getPerfectDay(),
                    a = i.season;
                $(".dates_block").removeClass("not_summer not_winter not_fall not_spring"), $(".calendar_block").removeClass("summer winter fall spring"), $(".dates_block").addClass("not_" + a), $(".calendar_block").addClass(a), $("#perfect_day").html(i.dateHTML), $("#perfect_summer").html(this.mLocation.getPerfectSummer()), $("#perfect_spring").html(this.mLocation.getPerfectSpring()), $("#perfect_fall").html(this.mLocation.getPerfectAutumn()), $("#perfect_winter").html(this.mLocation.getPerfectWinter());
                var o = this.mLocation.getLocationTitle(),
                    s = "The best day for a wedding in " + o + " is " + this.mLocation.getTwitterDate() + ". Find your perfect wedding day";
                $(".social-likes").socialLikes({
                    title: s,
                    via: "Bloomingdales"
                }), $("#typeahead__input").val(o), this._showCalendar(), this._showDates(), 1 == this.mMobileView && this._setupMobileCalendar()
            },
            _showLoading: function() {
                TweenLite.set("#loading", {
                    y: -50,
                    autoAlpha: 0,
                    height: "auto"
                });
                var e = $("#loading").outerHeight();
                TweenLite.set("#loading", {
                    height: 0
                }), TweenLite.to("#loading", .25, {
                    autoAlpha: 1,
                    height: e,
                    y: 0,
                    ease: Sine.easeInOut
                }), this.mLoadingDelayComplete = null;
                var t = this;
                TweenLite.delayedCall(1, function() {
                    t.mLoadingDelayComplete = !0, 1 == t.mLoadingComplete && t._setData()
                })
            },
            _hideLoading: function() {
                TweenLite.to("#loading", .5, {
                    autoAlpha: 0,
                    y: -50,
                    ease: Sine.easeInOut
                }), TweenLite.to("#loading", .25, {
                    height: 0,
                    delay: .5,
                    ease: Sine.easeInOut
                })
            },
            _showCalendar: function() {
                var e = $(".calendar_block").first();
                TweenLite.set(".look_ahead", {
                    autoAlpha: 1,
                    height: "auto"
                }), TweenLite.set(e, {
                    display: "block",
                    height: "auto"
                });
                var t = e.outerHeight();
                TweenLite.set(e, {
                    height: 0,
                    y: -50
                }), TweenLite.to(e, .25, {
                    height: t,
                    delay: .5,
                    ease: Sine.easeInOut,
                    onComplete: this._resetHeight,
                    onCompleteParams: [e],
                    onCompleteScope: this
                }), TweenLite.to(e, .5, {
                    autoAlpha: 1,
                    y: 0,
                    delay: 1,
                    ease: Sine.easeInOut
                }), this.mShowingCalendar = !0, this.mLookingAhead = null, setTimeout(function() {
                    $("#calendar_title").focus()
                }, 500)
            },
            _hideCalendar: function() {
                var e = $(".calendar_block").first();
                TweenLite.to(e, .5, {
                    autoAlpha: 0,
                    y: -50,
                    ease: Sine.easeInOut
                }), TweenLite.to(e, .25, {
                    height: 0,
                    delay: .5,
                    ease: Sine.easeInOut
                }), this.mShowingCalendar = null
            },
            _showDates: function() {
                var e = $(".dates_block").first();
                TweenLite.set(e, {
                    display: "block",
                    height: "auto"
                });
                var t = e.outerHeight();
                TweenLite.set(e, {
                    height: 0,
                    y: -50
                }), TweenLite.to(e, .25, {
                    height: t,
                    delay: 1,
                    ease: Sine.easeInOut,
                    onComplete: this._resetHeight,
                    onCompleteParams: [e],
                    onCompleteScope: this
                }), TweenLite.to(e, .5, {
                    autoAlpha: 1,
                    y: 0,
                    delay: 1.5,
                    ease: Sine.easeInOut
                })
            },
            _hideDates: function() {
                var e = $(".dates_block").first();
                TweenLite.to(e, .5, {
                    autoAlpha: 0,
                    y: -50,
                    ease: Sine.easeInOut
                }), TweenLite.to(e, .25, {
                    height: 0,
                    delay: .5,
                    ease: Sine.easeInOut
                })
            },
            _showLookAhead: function() {
                var e = $("#calendar_02");
                TweenLite.set(e, {
                    display: "inline-block",
                    height: "auto"
                });
                var t = e.outerHeight();
                TweenLite.set(e, {
                    height: 0
                }), TweenLite.to(e, .25, {
                    height: t,
                    ease: Sine.easeInOut
                }), TweenLite.to(e, .5, {
                    autoAlpha: 1,
                    delay: .5,
                    ease: Sine.easeInOut
                }), TweenLite.to(".look_ahead", .25, {
                    autoAlpha: 0,
                    height: 0,
                    ease: Sine.easeInOut
                }), this.mLookingAhead = !0
            },
            _hideLookAhead: function() {
                var e = $("#calendar_02");
                TweenLite.to(e, .5, {
                    autoAlpha: 0,
                    ease: Sine.easeInOut
                }), TweenLite.to(e, .25, {
                    height: 0,
                    delay: .5,
                    ease: Sine.easeInOut
                })
            },
            _showMobileCalendar: function(e) {
                e++;
                var t = null;
                $("#mobile_calendar_container .month-container").each(function(n) {
                    $(this).data("month-id") == e && (t = n)
                }), this.mSlick[0].slick.goTo(t), TweenLite.set(".mobile_calendar", {
                    display: "block",
                    left: 0,
                    autoAlpha: 0
                }), TweenLite.to(".mobile_calendar", .5, {
                    autoAlpha: 1,
                    ease: Sine.easeInOut
                })
            },
            _hideMobileCalendar: function() {
                TweenLite.to(".mobile_calendar", .5, {
                    autoAlpha: 0,
                    ease: Sine.easeInOut,
                    onComplete: function() {
                        TweenLite.set(".mobile_calendar", {
                            display: "none"
                        })
                    }
                })
            },
            _showTooltip: function(e, t) {
                var n = e.position(),
                    i = e.outerWidth(),
                    a = e.outerHeight();
                n.top += a, n.left += .5 * i, n.top += 10, n.left = n.left >> 0, n.top = n.top >> 0;
                // console.log( "JQUERY VERSION:", $.fn.jquery );
                var o = $("#calendar_tooltip"),
                    z = e.attr( "data-day" ),
                    s = e.data("day"),
                    r = t.format("mmmm dS, yyyy");
                if ( !s ) s=JSON.parse(z);
                var l = this._getTooltipContent(s, r),
                    u = this._getTooltipText(s, t);
                this._updateCalendarStatus(u), o.find(".tooltip_inner").html(l);
                var d = Math.min(window.innerWidth, 962),
                    c = .5 * o.outerWidth(),
                    h = d - c,
                    p = 0;
                n.left > h ? (p = n.left - h, n.left = h) : n.left < 110 && (p = n.left - 110, n.left = 110), o.find(".tooltip_arrow").css("left", c + p), TweenLite.killTweensOf(o), TweenLite.set(o, n), TweenLite.to(o, .25, {
                    autoAlpha: 1,
                    ease: Sine.easeInOut
                }), this.mShowingTooltip = !0
            },
            _hideTooltip: function(e) {
                var t = this;
                TweenLite.to("#calendar_tooltip", .25, {
                    autoAlpha: 0,
                    delay: e ? 0 : 1,
                    ease: Sine.easeInOut,
                    onStart: function() {
                        t.mShowingTooltip = null
                    },
                    onComplete: function() {
                        $("#calendar_tooltip").attr("aria-hidden", "true")
                    }
                })
            },
            _setupMobileCalendar: function(e) {
                this.mSlick = $("#mobile_calendar_container .months-container").slick({
                    dots: !1,
                    infinite: !1,
                    speed: 300,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    adaptiveHeight: !1,
                    arrows: !0,
                    slickGoTo: e,
                    nextArrow: '<button type="button" class="slick-next"></button>',
                    prevArrow: '<button type="button" class="slick-prev"></button>'
                }), TweenLite.set("#mobile_calendar_block", {
                    display: "none"
                }), $("#full_year_btn").on("click", {
                    self: this
                }, this._onfullYearClick), $("#tooltip_clear_btn").on("click", {
                    self: this
                }, this._onTooltipClearClick), $("#mobile_calendar_container .months-container").on("beforeChange", {
                    self: this
                }, this._onMobileCarouselMonthChange)
            },
            _getTooltipContent: function(e, t) {
                var n = "";
                return n += "<h4>" + t + (1 == e.isPerfectDay ? " - your perfect day" : "") + "</h4>", n += "<p>Average temperature <span class='value'>" + e.tempAvg + "&#x2109;</span></p>", n += "<p>Chance of rain <span class='value'>" + e.chanceRain + "%</span></p>", n += "<p>Chance of clear sky <span class='value'>" + e.chanceClear + "%</span></p>", n += "<p>Humidity <span class='value'>" + e.humidity + "%</span></p>"
            },
            _getTooltipText: function(e, t) {
                var n = t.format("dS") + " of " + t.format("mmmm") + ", " + t.format("yyyy") + (1 == e.isPerfectDay ? " - your perfect day" : "");
                return n += ", Average temperature " + e.tempAvg + "&#x2109;", n += ", Chance of rain " + e.chanceRain + "%", n += ", Chance of clear sky " + e.chanceClear + "%", n += ", Humidity " + e.humidity + "%"
            },
            _resetHeight: function(e) {
                TweenLite.set(e, {
                    height: "auto"
                })
            },
            _getMonthContainer: function(e) {
                var t = this.mFocusedMonth,
                    n = e.closest(".month-container");
                t && t.not(n).length > 0 && this._exitMonth(), this.mFocusedMonth = n, console.log("[View] FOCUSED MONTH:", n.find(".month-title").text())
            },
            _enterMonth: function() {
                var e = this.mFocusedMonth.find(".day.focusable");
                e.attr("tabindex", "0"), e.first().focus(), this.mEnteredMonth = !0
            },
            _exitMonth: function() {
                this.mFocusedMonth && this.mFocusedMonth.find(".day.focusable").attr("tabindex", ""), this.mEnteredMonth = null
            },
            _selectDay: function() {
                var e = this.mFocusedMonth.find(".day.focusable:focus");
                if (e.length > 0) {
                    var t = e.data("date");
                    this._showTooltip(e, t)
                }
            },
            _updateCalendarStatus: function(e) {
                $("#calendar_status").remove();
                var t = "<div id='calendar_status' aria-atomic='true' aria-live='assertive' role='alert' style='border: 0px; clip: rect(0px 0px 0px 0px); height: 1px; margin-bottom: -1px; margin-right: -1px; overflow: hidden; padding: 0px; position: absolute; white-space: nowrap; width: 1px;'>";
                t += e, t += "</div>", $("#calendar_container").append(t)
            },
            _onLookAheadClick: function(e) {
                var t = e.data.self;
                return e.preventDefault(), t._showLookAhead(), !1
            },
            _onLocationLoadComplete: function() {
                this.mLoadingComplete = !0, 1 == this.mLoadingDelayComplete && this._setData()
            },
            _onLocationLoadError: function() {
                this._hideLoading()
            },
            _onMouseOverDay: function(e) {
                this._showTooltip(e.element, e.date)
            },
            _onMouseOutDay: function() {
                this._hideTooltip()
            },
            _onMouseClickMonth: function(e) {
                var t = e.date.getMonth();
                this._showMobileCalendar(t)
            },
            _onMouseOverDayMobile: function(e) {
                var t = e.element.data("day"),
                    n = e.date.format("mmmm dS, yyyy"),
                    i = this._getTooltipContent(t, n),
                    a = $("#mobile_calendar_tooltip");
                a.find(".tooltip_inner").html(i), a.addClass("show"), TweenLite.to(a, .25, {
                    autoAlpha: 1,
                    ease: Sine.easeInOut
                })
            },
            _onfullYearClick: function(e) {
                var t = e.data.self;
                $("#mobile_calendar_tooltip").removeClass("show"), t._hideMobileCalendar()
            },
            _onTooltipClearClick: function(e) {
                $("#mobile_calendar_tooltip").removeClass("show")
            },
            _onMobileCarouselMonthChange: function(e, t, n, i) {
                e.data.self;
                $("#mobile_calendar_tooltip").removeClass("show")
            },
            _onMethodologyOpenClick: function(e) {
                var t = e.data.self;
                TweenLite.set("#methodology", {
                    display: "block",
                    autoAlpha: 0
                }), TweenLite.to("#methodology", .25, {
                    autoAlpha: 1,
                    zIndex:100,
                    ease: Sine.easeInOut
                }), $(document).on("keydown", e.data, t._onMethodologyCloseClick), TweenLite.delayedCall(.25, function() {
                    $("#methodology").focus()
                })
            },
            _onMethodologyCloseClick: function(e) {
                e.data.self;
                e.keyCode && 27 !== e.keyCode || ($(document).off("keydown"), $("#methodology_open_btn").focus(), TweenLite.to("#methodology", .25, {
                    autoAlpha: 0,
                    ease: Sine.easeInOut,
                    onComplete: function() {
                        TweenLite.set("#methodology", {
                            display: "none",
                            autoAlpha: 0
                        })
                    }
                }))
            },
            _onTooltipCloseClick: function(e) {
                e.data.self;
                TweenLite.to("#calendar_tooltip", .25, {
                    autoAlpha: 0,
                    ease: Sine.easeInOut
                })
            },
            _onFocus: function(e) {
                var t = e.data.self,
                    n = $(e.target);
                if (t._hideTooltip(), n.hasClass("month-title")) {
                    t._getMonthContainer(n);
                    var i = n.text() + ", to navigate the month press enter.";
                    t._updateCalendarStatus(i)
                } else if (n.hasClass("day")) {
                    var a = n.data("date");
                    if (t._showTooltip(n, a), null == t.mFocusedMonth) return void t._getMonthContainer(n);
                    0 == t.mFocusedMonth.has(".day.focusable:focus").length && t._getMonthContainer(n)
                } else t.mFocusedMonth = null
            },
            _onDocumentKeyDown: function(e) {
                var t = e.data.self;
                if (t.mFocusedMonth) {
                    if (13 == e.keyCode) return void(t.mShowingTooltip ? t._hideTooltip(!0) : t._enterMonth());
                    if (9 == e.keyCode && t._hideTooltip(!0), 27 == e.keyCode) return void(t.mShowingTooltip ? t._hideTooltip(!0) : (t.mFocusedMonth.find(".month-title").focus(), t._exitMonth()));
                    if (t.mEnteredMonth) {
                        var n = t.mFocusedMonth.find(".day.focusable:focus");
                        if (n.length > 0) {
                            if (39 != e.keyCode && 37 != e.keyCode || t._hideTooltip(!0), 39 == e.keyCode) {
                                var i = n.next(".day.focusable");
                                if (i.length > 0) i.focus();
                                else {
                                    var a = n.parent().next(".week");
                                    if (a.length > 0) a.find(".day.focusable").first().focus();
                                    else {
                                        var o = t.mFocusedMonth.next(".month-container");
                                        if (o.length > 0) t._exitMonth(), t.mFocusedMonth = null, o.find(".month-title").focus();
                                        else {
                                            var s = t.mFocusedMonth.closest(".calendar").next(".calendar:visible");
                                            s.length > 0 && (t._exitMonth(), t.mFocusedMonth = null, s.find(".month-title").first().focus())
                                        }
                                    }
                                }
                            }
                            if (37 == e.keyCode) {
                                var r = n.prev(".day.focusable");
                                if (r.length > 0) r.focus();
                                else {
                                    var l = n.parent().prev(".week");
                                    l.length > 0 ? l.find(".day.focusable").last().focus() : t.mFocusedMonth.find(".month-title").focus()
                                }
                            }
                        } else 39 == e.keyCode && t.mFocusedMonth.find(".day.focusable").first().focus()
                    }
                }
            }
        }, this.Distilled.View = e
    })),
    (function(factory) {  // Try to register as an anonymous AMD module
        if (typeof define === 'function' && define.amd) {
            define( "BestDayCore", ['jquery','TweenLite'], factory);
        }
        else {
            factory(jQuery, TweenLite);
        }
    }(function($x, TweenLite) {
        
        this.Distilled = this.Distilled || {};
        var e = function() {
            this._init()
        };
        e.prototype = {
            IS_MOBILE: null,
            IS_TABLET: null,
            IS_DESKTOP: null,
            IS_IE: null,
            HAS_TOUCH: null,
            IE_VERSION: null,
            HASH: null,
            loaded: function() {
                setTimeout(function() {
                    $(".loading").removeClass("loading")
                }, 100)
            },
            setHash: function(e) {
                window.location.hash = "#" + e
            },
            _init: function() {
                this._getHash(), this._getDeviceType(), this._checkBrowser(), this._checkForTouch(), console.log("[Core] IS IE:", this.IS_IE), console.log("[Core] IE VERSION:", this.IE_VERSION), console.log("[Core] HAS TOUCH:", this.HAS_TOUCH)
            },
            _getHash: function(e) {
                window.location.hash ? this.HASH = window.location.hash.substring(1) : this.HASH = null, console.log("[Core] HASH:", this.HASH)
            },
            _getDeviceType: function() {
                var e = this._isMobileCheck(navigator.userAgent || navigator.vendor || window.opera),
                    t = /ipad|android 3|android|sch-i800|playbook|tablet|kindle|gt-p1000|sgh-t849|shw-m180s|a510|a511|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase()),
                    n = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
                this.IS_MOBILE = 1 == e || null, this.IS_TABLET = 1 == t || null, this.IS_DESKTOP = 1 == n || null, console.log("[Core] IS MOBILE:", this.IS_MOBILE), console.log("[Core] IS TABLET:", this.IS_TABLET), console.log("[Core] IS DESKTOP:", this.IS_DESKTOP), this.IS_MOBILE && (this.IS_TABLET = !1, this.IS_DESKTOP = !1), this.IS_TABLET && (this.IS_MOBILE = !1, this.IS_DESKTOP = !1), this.IS_DESKTOP && (this.IS_MOBILE = !1, this.IS_TABLET = !1), this.IS_MOBILE && $("html").addClass("mobile"), this.IS_TABLET && $("html").addClass("tablet"), this.IS_DESKTOP && $("html").addClass("desktop")
            },
            _checkBrowser: function() {
                var e = window.navigator.userAgent,
                    t = e.indexOf("MSIE ");
                if (t > 0) return this.IS_IE = !0, void(this.IE_VERSION = parseInt(e.substring(t + 5, e.indexOf(".", t)), 10));
                if (e.indexOf("Trident/") > 0) {
                    var n = e.indexOf("rv:");
                    return this.IS_IE = !0, void(this.IE_VERSION = parseInt(e.substring(n + 3, e.indexOf(".", n)), 10))
                }
                var i = e.indexOf("Edge/");
                return i > 0 ? (this.IS_IE = !0, void(this.IE_VERSION = parseInt(e.substring(i + 5, e.indexOf(".", i)), 10))) : (this.IS_IE = null, void(this.IE_VERSION = null))
            },
            _isMobileCheck: function(e) {
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))
            },
            _checkForTouch: function() {
                this.HAS_TOUCH = "ontouchstart" in window || navigator.maxTouchPoints || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, 0 == this.HAS_TOUCH ? (this.HAS_TOUCH = null, $("html").addClass("notouch")) : $("html").addClass("touch")
            },
            _fixScreenSize: function() {
                $("#content").height("auto");
                var e = window.innerHeight;
                console.log("INNER HEIGHT:", window.innerHeight), console.log("OUTER HEIGHT:", window.outerHeight), console.log("CLIENT HEIGHT:", document.body.clientHeight), $("#content").height(e)
            },
            _scrollToBottom: function() {
                setTimeout(function() {
                    window.scrollTo(0, 1)
                }, 500)
            },
            _preventScroll: function() {
                window.addEventListener("gesturestart", function(e) {
                    e.preventDefault()
                }), document.addEventListener("gesturestart", function(e) {
                    e.preventDefault()
                })
            },
            _onResize: function(e) {
                var t = e.data.self;
                t._fixScreenSize(), setTimeout(function() {
                    t._fixScreenSize()
                }, 250), setTimeout(function() {
                    t._fixScreenSize()
                }, 500), setTimeout(function() {
                    t._fixScreenSize()
                }, 1), setTimeout(function() {
                    t._fixScreenSize()
                }, 2)
            }
        }, this.Distilled.Core = e
    })), this.Distilled = this.Distilled || {}, Distilled.DEBUG = !0, "loading"==document.readyState?(window.addEventListener("load",bestDayOnReady,!1)):bestDayOnReady();
