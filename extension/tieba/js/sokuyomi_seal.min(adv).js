/*!
    HTML5 Viewer Seal
    version 1.0.0
    Copyright (C) 2012 BrainGear.co.,ltd.
    http://braingear.co.jp
*/
window.addEventListener("message", function(e)
{
	console.log(e.data);
}, false);

;var _ua = (function() {
    return {
        ltIE6: typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
        ltIE7: typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
        ltIE8: typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
        ltIE9: document.uniqueID && typeof window.matchMedia == "undefined",
        gtIE10: document.uniqueID && window.matchMedia,
        Trident: document.uniqueID,
        Gecko: "MozAppearance"in document.documentElement.style,
        Presto: window.opera,
        Blink: window.chrome,
        Webkit: typeof window.chrome == "undefined" && "WebkitAppearance"in document.documentElement.style,
        Touch: typeof document.ontouchstart != "undefined",
        Mobile: typeof window.orientation != "undefined",
        ltAd4_4: typeof window.orientation != "undefined" && typeof (EventSource) == "undefined",
        Pointer: window.navigator.pointerEnabled,
        MSPoniter: window.navigator.msPointerEnabled,
        isIE: (this.ltIE6 || this.ltIE7 || this.ltIE8 || this.ltIE9 || this.gtIE10 || this.Trident) ? true : false
    }
}
)();
$.browser = _ua;
var userAgent = window.navigator.userAgent.toLowerCase();
if (userAgent.indexOf("window") > -1) {
    os_nm = "Windows";
    if (userAgent.indexOf("window phone") > -1) {
        os_nm = "Windows Phone"
    }
} else {
    if (userAgent.indexOf("linux") > -1) {
        os_nm = "Linux";
        if (userAgent.indexOf("android") > -1) {
            os_nm = "Android"
        }
    } else {
        if (userAgent.indexOf("mac") > -1) {
            os_nm = "Mac";
            if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1) {
                os_nm = "iOS"
            }
        } else {
            os_nm = "Unknown"
        }
    }
}
$.os = {
    windows: (os_nm == "Windows"),
    linux: (os_nm == "Linux"),
    mac: (os_nm == "Mac"),
    android: (os_nm == "Android"),
    ios: (os_nm == "iOS"),
    is_iOS: (os_nm == "iOS") ? true : false,
    is_Android: (os_nm == "Android") ? true : false,
    is_Pc: (os_nm != "iOS" && os_nm != "Android") ? true : false
};
(function(c) {
    var b = 5
      , d = "data-jquery-gesture-tap";
    c.fn.tapGesture = function(f, e) {
        this.each(function() {
            a(this, f, e)
        });
        return this
    }
    ;
    function a(x, l, y) {
        var m = ("ontouchstart"in document.documentElement) ? "touchstart" : "mousedown";
        var t = ("ontouchstart"in document.documentElement) ? "touchmove" : "mousemove";
        var z = ("ontouchstart"in document.documentElement) ? "touchend" : "mouseup";
        var q = ("ontouchstart"in document.documentElement) ? "touchleave" : "mouseleave";
        m += ".tapGesture";
        t += ".tapGesture";
        z += ".tapGesture";
        q += ".tapGesture";
        var h = c(x);
        if (h.attr(d)) {
            if (y) {
                x.func_list = [l];
                return
            } else {
                x.func_list.push(l);
                return
            }
        }
        h.attr(d, 1);
        x.func_list = [l];
        var o = false
          , e = false
          , w = 0
          , v = 0
          , p = 0
          , n = 0;
        function u(C) {
            var D = C;
            if (C.originalEvent) {
                D = C.originalEvent
            }
            var A = null;
            if (D.touches) {
                A = [];
                for (var B = 0; B < D.touches.length; B++) {
                    var E = D.touches[B];
                    A.push({
                        clientX: E.clientX,
                        clientY: E.clientY,
                        offsetX: E.offsetX,
                        offsetY: E.offsetY,
                        pageX: E.pageX,
                        pageY: E.pageY,
                        screenX: E.screenX,
                        screenY: E.screenY,
                        layerX: E.layerX,
                        layerY: E.layerY
                    })
                }
            } else {
                A = [{
                    clientX: D.clientX,
                    clientY: D.clientY,
                    offsetX: D.offsetX,
                    offsetY: D.offsetY,
                    pageX: D.pageX,
                    pageY: D.pageY,
                    screenX: D.screenX,
                    screenY: D.screenY,
                    layerX: D.layerX,
                    layerY: D.layerY
                }]
            }
            return A
        }
        function g() {
            return !e
        }
        function f(A) {
            if (c(this).attr("disabled")) {
                return
            }
            A = A.originalEvent;
            e = true;
            o = true;
            var B = u(A);
            w = p = B[0]["pageX"];
            v = n = B[0]["pageY"]
        }
        function s(C) {
            if (!o) {
                return
            }
            C = C.originalEvent;
            var D = u(C);
            p = D[0]["pageX"];
            n = D[0]["pageY"];
            var B = Math.abs(w - p)
              , A = Math.abs(v - n);
            if (e && (B > b || A > b)) {
                e = false;
                o = false;
                return
            }
            C.preventDefault();
            C.stopPropagation()
        }
        function i(B) {
            if (!o) {
                return
            }
            o = false;
            for (var A = 0; A < this.func_list.length; A++) {
                this.func_list[A].apply(x, [B])
            }
            B.preventDefault();
            B.stopPropagation()
        }
        h.on("click", "a", g);
        h.on(m, f);
        h.on(t, s);
        h.on(z + " " + q, i)
    }
}
)(jQuery);
var isSupportedWebkitTransform = (document.createElement("div").style.WebkitTransform !== undefined);
var isSupportedMozTransform = (document.createElement("div").style.MozTransform !== undefined);
var isSupportedOTransform = (document.createElement("div").style.OTransform !== undefined);
var isSupportedMSTransform = (document.createElement("div").style.msTransform !== undefined);
var AnimationLibrary = {
    setOrigin: function(c, a, b) {
        if (isSupportedWebkitTransform) {
            $(c).css({
                "-webkit-transition-origin": a + " " + b
            });
            $(c).css({
                "-webkit-transform-origin": a + " " + b
            })
        } else {
            if (isSupportedMozTransform) {
                $(c).css({
                    "-moz-transition-origin": a + " " + b
                });
                $(c).css({
                    "-moz-transform-origin": a + " " + b
                })
            } else {
                if (isSupportedOTransform) {
                    $(c).css({
                        "-o-transition-origin": a + " " + b
                    });
                    $(c).css({
                        "-o-transform-origin": a + " " + b
                    })
                } else {
                    if (isSupportedMSTransform) {
                        $(c).css({
                            "-ms-transition-origin": a + " " + b
                        });
                        $(c).css({
                            "-ms-transform-origin": a + " " + b
                        })
                    } else {
                        $(c).css({
                            "transition-origin": a + " " + b
                        });
                        $(c).css({
                            "transform-origin": a + " " + b
                        })
                    }
                }
            }
        }
    },
    startRotate: function(e, c, a) {
        var d = 0;
        var b = window.setInterval(function() {
            d += c;
            if (d >= 360) {
                d = 360 - d
            }
            $(e).rotate(d)
        }, a);
        return b
    },
    stopRotate: function(a) {
        window.clearInterval(a)
    },
    startTranslate: function(f, n) {
        var m = 0;
        var c = false;
        var a = function() {
            m++;
            if (m >= f.length && !c) {
                c = true;
                if (n) {
                    n()
                }
            }
        };
        var g = f.length;
        for (var d = 0; d < g; d++) {
            var l = f[d].element;
            var h = f[d];
            var b = f[d].duration;
            var e = "translate(" + h.x + "px, " + h.y + "px) ";
            if (h.x.toString().indexOf("%") >= 0 || h.y.toString().indexOf("%") >= 0) {
                e = "translate(" + h.x + ", " + h.y + ") "
            }
            if (isSupportedWebkitTransform) {
                $(l).css({
                    "-webkit-transition-duration": b + "s"
                });
                $(l).css({
                    "-webkit-transform": e
                }).one("webkitTransitionEnd", function() {
                    a()
                })
            } else {
                if (isSupportedMozTransform) {
                    $(l).css({
                        "-moz-transition-duration": b + "s"
                    });
                    $(l).css({
                        "-moz-transform": e
                    }).one("transitionend", function() {
                        a()
                    })
                } else {
                    if (isSupportedOTransform) {
                        $(l).css({
                            "-o-transition-duration": b + "s"
                        });
                        $(l).css({
                            "-o-transform": e
                        }).one("oTransitionEnd", function() {
                            a()
                        })
                    } else {
                        if (isSupportedMSTransform) {
                            $(l).css({
                                "-ms-transition-duration": b + "s"
                            });
                            $(l).css({
                                msTransform: e
                            }).one("transitionend", function() {
                                a()
                            });
                            if (!$.browser.Trident) {
                                setTimeout(a, b * 1000 + 100)
                            }
                        } else {
                            $(l).css({
                                "transition-duration": b + "s"
                            });
                            $(l).css({
                                transform: e
                            }).one("transitionend", function() {
                                a()
                            });
                            if (!$.browser.Trident) {
                                setTimeout(a, b * 1000 + 100)
                            }
                        }
                    }
                }
            }
            if (b <= 0) {
                a()
            }
        }
    },
    setTranslate: function(e, a, d, c) {
        if (null == c) {
            c = "0.0"
        }
        var b = "translate(" + a + "px, " + d + "px) ";
        if (a.toString().indexOf("%") >= 0 || d.toString().indexOf("%") >= 0) {
            b = "translate(" + a + ", " + d + ") "
        }
        if (isSupportedWebkitTransform) {
            $(e).css({
                "-webkit-transition-duration": c + "s"
            });
            $(e).css({
                "-webkit-transform": b
            })
        } else {
            if (isSupportedMozTransform) {
                $(e).css({
                    "-moz-transition-duration": c + "s"
                });
                $(e).css({
                    "-moz-transform": b
                })
            } else {
                if (isSupportedOTransform) {
                    $(e).css({
                        "-o-transition-duration": c + "s"
                    });
                    $(e).css({
                        "-o-transform": b
                    })
                } else {
                    if (isSupportedMSTransform) {
                        $(e).css({
                            "-ms-transition-duration": c + "s"
                        });
                        $(e).css({
                            "-ms-transform": b
                        })
                    } else {
                        $(e).css({
                            "transition-duration": c + "s"
                        });
                        $(e).css({
                            transform: b
                        })
                    }
                }
            }
        }
    },
    setScale: function(b, a) {
        if (isSupportedWebkitTransform) {
            $(b).css({
                "-webkit-transform": "scale(" + a + ")"
            })
        } else {
            if (isSupportedMozTransform) {
                $(b).css({
                    "-moz-transform": "scale(" + a + ")"
                })
            } else {
                if (isSupportedOTransform) {
                    $(b).css({
                        "-o-transform": "scale(" + a + ")"
                    })
                } else {
                    if (isSupportedMSTransform) {
                        $(b).css({
                            "-ms-transform": "scale(" + a + ")"
                        })
                    } else {
                        $(b).css({
                            transform: "scale(" + a + ")"
                        })
                    }
                }
            }
        }
    },
    setTransform: function(f, a, e) {
        var b = "";
        for (var c in a) {
            switch (c) {
            case "translate":
                if (a.translate.x.toString().indexOf("%") >= 0 || a.translate.y.toString().indexOf("%") >= 0) {
                    b += "translate(" + a.translate.x + ", " + a.translate.y + ") "
                } else {
                    b += "translate(" + a.translate.x + "px, " + a.translate.y + "px) "
                }
                break;
            case "scale":
                b += "scale(" + a.scale + ") ";
                break
            }
        }
        var d = 0;
        if ("duration"in a) {
            d = a.duration
        }
        if (isSupportedWebkitTransform) {
            $(f).css({
                "-webkit-transition-duration": d + "s"
            });
            $(f).css({
                "-webkit-transform": b
            }).one("webkitTransitionEnd", function() {
                if (e) {
                    e()
                }
            })
        } else {
            if (isSupportedMozTransform) {
                $(f).css({
                    "-moz-transition-duration": d + "s"
                });
                $(f).css({
                    "-moz-transform": b
                }).one("transitionend", function() {
                    if (e) {
                        e()
                    }
                })
            } else {
                if (isSupportedOTransform) {
                    $(f).css({
                        "-o-transition-duration": d + "s"
                    });
                    $(f).css({
                        "-o-transform": b
                    }).one("oTransitionEnd", function() {
                        if (e) {
                            e()
                        }
                    })
                } else {
                    if (isSupportedMSTransform) {
                        $(f).css({
                            "-ms-transition-duration": d + "s"
                        });
                        $(f).css({
                            "-ms-transform": b
                        }).one("transitionend", function() {
                            if (e) {
                                e()
                            }
                        })
                    } else {
                        $(f).css({
                            "transition-duration": d + "s"
                        });
                        $(f).css({
                            transform: b
                        }).one("transitionend", function() {
                            if (e) {
                                e()
                            }
                        })
                    }
                }
            }
        }
    },
    clearTransform: function(a) {
        if (isSupportedWebkitTransform) {
            $(a).css({
                "-webkit-transform": ""
            })
        } else {
            if (isSupportedMozTransform) {
                $(a).css({
                    "-moz-transform": ""
                })
            } else {
                if (isSupportedOTransform) {
                    $(a).css({
                        "-o-transform": ""
                    })
                } else {
                    if (isSupportedMSTransform) {
                        $(a).css({
                            "-ms-transform": ""
                        })
                    } else {
                        $(a).css({
                            transform: ""
                        })
                    }
                }
            }
        }
    },
    getMatrix: function(d) {
        try {
            if (typeof WebKitCSSMatrix != "undefined" && null != WebKitCSSMatrix) {
                matrix = new WebKitCSSMatrix(d.style.webkitTransform);
                return {
                    scaleX: matrix.a,
                    rotateP: matrix.b,
                    rotateM: matrix.c,
                    scaleY: matrix.d,
                    translateX: matrix.e,
                    translateY: matrix.f
                }
            } else {
                var b = d.currentStyle || document.defaultView.getComputedStyle(d, "");
                var a = null;
                if ("msTransform"in b) {
                    a = b.msTransform
                } else {
                    if ("mozTransform"in b) {
                        a = b.mozTransform
                    } else {
                        if ("oTransform"in b) {
                            a = b.oTransform
                        } else {
                            if ("transform"in b) {
                                a = b.transform
                            }
                        }
                    }
                }
                if (null != a && typeof a == "string") {
                    a = a.replace("matrix3d(", "").replace("matrix(", "").replace(")", "").split(",");
                    if (a.length == 6) {
                        a = {
                            scaleX: Number(a[0].trim()),
                            rotateP: Number(a[1].trim()),
                            rotateM: Number(a[2].trim()),
                            scaleY: Number(a[3].trim()),
                            translateX: Number(a[4].trim()),
                            translateY: Number(a[5].trim())
                        }
                    } else {
                        a = {
                            scaleX: Number(a[0].trim()),
                            rotateP: Number(a[1].trim()),
                            rotateM: Number(a[4].trim()),
                            scaleY: Number(a[5].trim()),
                            translateX: Number(a[12].trim()),
                            translateY: Number(a[13].trim())
                        }
                    }
                }
                return a
            }
        } catch (c) {
            return null
        }
    }
};
function findstyle_for_crossbrowser(a, c) {
    for (var b in c) {
        if (typeof a[c[b]] != "undefined") {
            return c[b]
        }
    }
    a[c[b]] = "";
    return c[b]
}
(function(c) {
    if (c.cssHooks) {
        c.cssHooks.rotate = {
            get: function(f, e, d) {
                return c(f).rotate()
            },
            set: function(d, e) {
                c(d).rotate(e);
                return e
            }
        };
        c.cssHooks.scale = {
            get: function(f, e, d) {
                return c(f).scale()
            },
            set: function(d, e) {
                c(d).scale(e);
                return e
            }
        };
        c.cssHooks.transform = {
            get: function(g, f, d) {
                var e = findstyle_for_crossbrowser(g.style, ["WebkitTransform", "MozTransform", "OTransform", "msTransform", "transform"]);
                return g.style[e]
            },
            set: function(e, f) {
                var d = findstyle_for_crossbrowser(e.style, ["WebkitTransform", "MozTransform", "OTransform", "msTransform", "transform"]);
                e.style[d] = f;
                return f
            }
        }
    } else {
        var a = c.style;
        var b = c.curCSS;
        jQuery.extend({
            style: function(e, d, f) {
                switch (d) {
                case "rotate":
                    c(e).rotate(f);
                    return f;
                case "scale":
                    c(e).scale(f);
                    return f;
                case "transform":
                    d = findstyle_for_crossbrowser(e.style || e, ["WebkitTransform", "MozTransform", "OTransform", "msTransform", "transform"]);
                    break
                }
                return a.apply(this, [e, d, f])
            },
            curCSS: function(e, d, f) {
                switch (d) {
                case "rotate":
                    return c(e).rotate();
                case "scale":
                    return c(e).scale();
                case "transform":
                    d = findstyle_for_crossbrowser(e.style || e, ["WebkitTransform", "MozTransform", "OTransform", "msTransform", "transform"]);
                    break
                }
                return b.apply(this, [e, d, f])
            }
        })
    }
    jQuery.fn.rotate = function(e) {
        if (typeof e == "undefined") {
            if (jQuery.browser.opera) {
                var d = this.css("transform").match(/rotate\((.*?)\)/);
                return (d && d[1]) ? Math.round(parseFloat(d[1]) * 180 / Math.PI) : 0
            } else {
                var d = this.css("transform").match(/rotate\((.*?)\)/);
                return (d && d[1]) ? parseInt(d[1]) : 0
            }
        }
        this.css("transform", this.css("transform").replace(/none|rotate\(.*?\)/, "") + "rotate(" + parseInt(e) + "deg)");
        return this
    }
    ;
    jQuery.fn.scale = function(e) {
        if (typeof e == "undefined") {
            var d = this.css("transform").match(/scale\((.*?)\)/);
            return (d && d[1]) ? parseFloat(d[1]) : 1
        }
        this.css("transform", this.css("transform").replace(/none|scale\(.*?\)/, "") + "scale(" + parseFloat(e) + ")");
        return this
    }
    ;
    jQuery.fx.step.rotate = function(d) {
        if (d.state == 0) {
            d.start = c(d.elem).rotate();
            d.now = d.start
        }
        c(d.elem).rotate(d.now)
    }
    ;
    jQuery.fx.step.scale = function(d) {
        if (d.state == 0) {
            d.start = c(d.elem).scale();
            d.now = d.start
        }
        c(d.elem).scale(d.now)
    }
}
)(jQuery);
(function(e) {
    if (e.browser && e.browser.Trident && !e.browser.ltIE8) {
        function b(h) {
            var i = h;
            var g = i.offsetLeft;
            var l = i.offsetTop;
            while (i.offsetParent) {
                i = i.offsetParent;
                g += i.offsetLeft;
                l += i.offsetTop;
                if (i != document.body && i != document.documentElement) {
                    g -= i.scrollLeft;
                    l -= i.scrollTop
                }
            }
            return {
                x: g,
                y: l
            }
        }
        function c(g) {
            if (g.currentStyle.position != "static") {
                return
            }
            var i = document.createElement("div");
            i.style.left = g.style.left;
            i.style.left = g.style.left;
            i.style.width = g.style.width;
            i.style.height = g.style.height;
            g.parentNode.appendChild(i);
            var h = b(g);
            g.style.position = "absolute";
            g.style.left = h.x + "px";
            g.style.top = h.y + "px"
        }
        function d(i, y) {
            var A, m, l;
            var I = 1;
            var H = 1;
            var o = 1;
            var n = 1;
            if (typeof i.style.msTransform != "undefined") {
                return true
            }
            c(i);
            A = y.match(/rotate\((.*?)\)/);
            var D = (A && A[1]) ? parseInt(A[1]) : 0;
            D = D % 360;
            if (D < 0) {
                D = 360 + D
            }
            var z = D * Math.PI / 180;
            var t = Math.cos(z);
            var C = Math.sin(z);
            I *= t;
            H *= -C;
            o *= C;
            n *= t;
            A = y.match(/skewX\((.*?)\)/);
            var s = (A && A[1]) ? parseFloat(A[1]) : 0;
            A = y.match(/skewY\((.*?)\)/);
            var q = (A && A[1]) ? parseFloat(A[1]) : 0;
            A = y.match(/skew\((.*?)(?:,(.*?))?\)/);
            if (A) {
                s = (A[1]) ? parseFloat(A[1]) : 0;
                q = (A[2]) ? parseFloat(A[2]) : 0
            }
            s = s % 360;
            if (s < 0) {
                s = 360 + s
            }
            q = q % 360;
            if (q < 0) {
                q = 360 + q
            }
            H = H + Math.tan(s * Math.PI / 180);
            o = o + Math.tan(q * Math.PI / 180);
            A = y.match(/scaleX\((.*?)\)/);
            m = (A && A[1]) ? parseFloat(A[1]) : undefined;
            A = y.match(/scaleY\((.*?)\)/);
            l = (A && A[1]) ? parseFloat(A[1]) : undefined;
            A = y.match(/scale\((.*?)(?:,(.*?))?\)/);
            var G = (A && A[1]) ? parseFloat(A[1]) : (typeof m != "undefined" ? m : 1);
            var F = (A && A[2]) ? parseFloat(A[2]) : (typeof l != "undefined" ? l : G);
            I *= G;
            H *= G;
            o *= F;
            n *= F;
            i.style.filter = (i.style.filter || "").replace(/progid:DXImageTransform\.Microsoft\.Matrix\([^)]*\)/, "") + ("progid:DXImageTransform.Microsoft.Matrix(M11=" + I + ",M12=" + H + ",M21=" + o + ",M22=" + n + ",FilterType='bilinear',sizingMethod='auto expand')");
            var v = parseInt(i.offsetWidth);
            var E = parseInt(i.offsetHeight);
            ow = parseInt(i.style.width);
            oh = parseInt(i.style.height);
            var p = (D % 90) * Math.PI / 180;
            var B = Math.cos(p);
            var g = Math.sin(p);
            var x = 1 / 2 * (v - E * g - v * B);
            var u = 1 / 2 * (E - v * g - E * B);
            x = x - ow / 2 * Math.tan(s * Math.PI / 180);
            u = u - oh / 2 * Math.tan(q * Math.PI / 180);
            x = x - (((ow * G) - ow) / 2);
            u = u - (((oh * F) - oh) / 2);
            i.style.marginLeft = Math.floor(x) + "px";
            i.style.marginTop = Math.floor(u) + "px";
            return (true)
        }
        if (e.cssHooks) {
            var a = e.cssHooks.transform.set;
            e.cssHooks.transform.set = function(g, h) {
                a.apply(this, [g, h]);
                d(g, h);
                return h
            }
        } else {
            var f = e.style;
            jQuery.extend({
                style: function(i, g, l) {
                    var h = f.apply(this, [i, g, l]);
                    switch (g) {
                    case "transform":
                        d(i, l);
                        break
                    }
                    return h
                }
            })
        }
    }
}
)(jQuery);
var CommonLibrary = {
    loadScripts: function(a, l, f) {
        if (!Array.isArray(a)) {
            a = [a]
        }
        var e = [];
        var c = [];
        for (var b = 0, d = a.length; b < d; b++) {
            var g = document.createElement("script");
            g.src = a[b];
            g.type = "text/javascript";
            g.charset = "utf-8";
            g.async = true;
            if (f && f.length >= b + 1) {
                data = f[b];
                for (var h in data) {
                    g.setAttribute("data-" + h, data[h])
                }
            }
            g.onload = g.onerror = function(i) {
                e = array_remove(e, this);
                c.push(i.currentTarget);
                if (null == e || 0 >= e.length) {
                    if (typeof l == "function") {
                        l(c)
                    }
                }
            }
            ;
            e.push(g);
            document.head.appendChild(g)
        }
    },
    loadStyleSheets: function(a, l, g) {
        if (!Array.isArray(a)) {
            a = [a]
        }
        var f = [];
        var d = [];
        for (var b = 0, e = a.length; b < e; b++) {
            var c = document.createElement("link");
            c.href = a[b];
            c.rel = "stylesheet";
            c.type = "text/css";
            c.charset = "utf-8";
            c.async = true;
            if (g && g.length >= b + 1) {
                data = g[b];
                for (var h in data) {
                    c.setAttribute("data-" + h, data[h])
                }
            }
            c.onload = c.onerror = function(i) {
                f = array_remove(f, this);
                d.push(i.currentTarget);
                if (null == f || 0 >= f.length) {
                    if (typeof l == "function") {
                        l(d)
                    }
                }
            }
            ;
            f.push(c);
            document.head.appendChild(c)
        }
    },
    basename: function(a) {
        return a.replace(/\\/g, "/").replace(/.*\//, "")
    },
    dirname: function(a) {
        return a.replace(/\\/g, "/").replace(/\/[^\/]*$/, "")
    },
    resizeFullScreen: function() {
        try {
            window.moveTo(0, 1);
            window.resizeTo(screen.availWidth, screen.availHeight)
        } catch (a) {}
    },
    getPos: function(a) {
        if (typeof a == "string") {
            a = document.getElementById(a)
        } else {
            if (a instanceof jQuery) {
                a = a.get(0)
            }
        }
        var b = curtop = 0;
        if (a && a.offsetParent) {
            do {
                b += a.offsetLeft;
                curtop += a.offsetTop
            } while ((a = a.offsetParent))
        }
        return [b, curtop]
    },
    getActualDimension: function(f) {
        var e, d, a, c, b = "actual";
        if ("naturalWidth"in f) {
            return {
                width: f.naturalWidth,
                height: f.naturalHeight
            }
        }
        if ("src"in f) {
            if (f[b] && f[b].src === f.src) {
                return f[b]
            }
            if (document.uniqueID) {
                e = f.runtimeStyle;
                d = {
                    w: e.width,
                    h: e.height
                };
                e.width = "auto";
                e.height = "auto";
                a = f.width;
                c = f.height;
                e.width = d.w;
                e.height = d.h
            } else {
                d = {
                    w: f.width,
                    h: f.height
                };
                f.removeAttribute("width");
                f.removeAttribute("height");
                a = f.width;
                c = f.height;
                f.width = d.w;
                f.height = d.h
            }
            return f[b] = {
                width: a,
                height: c,
                src: f.src
            }
        }
        return {
            width: f.width,
            height: f.height
        }
    },
    getGestureEventPos: function(c) {
        var d = c;
        if (c.originalEvent) {
            d = c.originalEvent
        }
        var a = null;
        if (d.touches && d.touches.length > 0) {
            a = [];
            for (var b = 0; b < d.touches.length; b++) {
                var f = d.touches[b];
                a.push({
                    clientX: f.clientX,
                    clientY: f.clientY,
                    offsetX: f.offsetX,
                    offsetY: f.offsetY,
                    pageX: f.pageX,
                    pageY: f.pageY,
                    screenX: f.screenX,
                    screenY: f.screenY,
                    layerX: f.layerX,
                    layerY: f.layerY
                })
            }
        } else {
            if (d.changedTouches && d.changedTouches.length > 0) {
                a = [];
                for (var b = 0; b < d.changedTouches.length; b++) {
                    var f = d.changedTouches[b];
                    a.push({
                        clientX: f.clientX,
                        clientY: f.clientY,
                        offsetX: f.offsetX,
                        offsetY: f.offsetY,
                        pageX: f.pageX,
                        pageY: f.pageY,
                        screenX: f.screenX,
                        screenY: f.screenY,
                        layerX: f.layerX,
                        layerY: f.layerY
                    })
                }
            } else {
                a = [{
                    clientX: d.clientX,
                    clientY: d.clientY,
                    offsetX: d.offsetX,
                    offsetY: d.offsetY,
                    pageX: d.pageX,
                    pageY: d.pageY,
                    screenX: d.screenX,
                    screenY: d.screenY,
                    layerX: d.layerX,
                    layerY: d.layerY
                }]
            }
        }
        return a
    },
    arrayContainIndexOf: function(a, e, g, b) {
        var d;
        if (null != g && g !== undefined) {
            if (g < 0) {
                d = g + a.length;
                if (d < 0) {
                    return -1
                }
            } else {
                d = g
            }
        } else {
            d = 0
        }
        for (var c = d; c < a.length; c++) {
            if (null != b) {
                if (b(a[c], e)) {
                    return c
                }
            } else {
                if (a[c] === e) {
                    return c
                }
            }
        }
        return -1
    }
};
array_remove = function(b, c) {
    var a = b.indexOf(c);
    while (a >= 0) {
        b.splice(a, 1);
        a = b.indexOf(c)
    }
    return b
}
;
(function(a) {
    var b = a.Uint8Array, d = a.HTMLCanvasElement, c = d && d.prototype, e = /\s*;\s*base64\s*(?:;|$)/i, f = "toDataURL", h, g = function(s) {
        var t = s.length, o = new b(t / 4 * 3 | 0), q = 0, v = 0, w = [0, 0], l = 0, u = 0, p, m, n;
        while (t--) {
            m = s.charCodeAt(q++);
            p = h[m - 43];
            if (p !== 255 && p !== n) {
                w[1] = w[0];
                w[0] = m;
                u = (u << 6) | p;
                l++;
                if (l === 4) {
                    o[v++] = u >>> 16;
                    if (w[1] !== 61) {
                        o[v++] = u >>> 8
                    }
                    if (w[0] !== 61) {
                        o[v++] = u
                    }
                    l = 0
                }
            }
        }
        return o
    };
    if (b) {
        h = new b([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51])
    }
    if (d && (!c.toBlob || !c.toBlobHD)) {
        if (!c.toBlob) {
            c.toBlob = function(s, p) {
                if (!p) {
                    p = "image/png"
                }
                if (this.mozGetAsFile) {
                    s(this.mozGetAsFile("canvas", p));
                    return
                }
                if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(p)) {
                    s(this.msToBlob());
                    return
                }
                var o = Array.prototype.slice.call(arguments, 1), m = this[f].apply(this, o), l = m.indexOf(","), q = m.substring(l + 1), i = e.test(m.substring(0, l)), n;
                if (Blob.fake) {
                    n = new Blob;
                    if (i) {
                        n.encoding = "base64"
                    } else {
                        n.encoding = "URI"
                    }
                    n.data = q;
                    n.size = q.length
                } else {
                    if (b) {
                        if (i) {
                            n = new Blob([g(q)],{
                                type: p
                            })
                        } else {
                            n = new Blob([decodeURIComponent(q)],{
                                type: p
                            })
                        }
                    }
                }
                s(n)
            }
        }
        if (!c.toBlobHD && c.toDataURLHD) {
            c.toBlobHD = function() {
                f = "toDataURLHD";
                var i = this.toBlob();
                f = "toDataURL";
                return i
            }
        } else {
            c.toBlobHD = c.toBlob
        }
    }
}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this));
var ConnectStreaming = function(a) {
    this.initialize.apply(this, arguments)
};
ConnectStreaming.prototype = {
    initialize: function(a) {
        this.settings = a;
        jQuery.support.cors = true
    },
    initConnection: function(c) {
        var b;
        if (true == this.settings.isStandAlone) {
            this.apiUrl = this.settings.contentsServerPath + this.settings.downloadApiPath;
            b = this.apiUrl;
            this.dataAccessType = 0;
            if (PARAM_DATA_ACCESS_TYPE in h5vParams.queryParams) {
                this.dataAccessType = (h5vParams.queryParams[PARAM_DATA_ACCESS_TYPE] == 1) ? 1 : 0
            }
        } else {
            b = this.settings.otkUrl
        }
        var a = this.makeApiSendData(DTYPE_CONTENT_XML);
        $.ajax({
            contentType: "application/x-www-form-urlencoded",
            async: true,
            cache: false,
            type: "GET",
            dataType: "xml",
            url: b,
            data: a,
            success: function(d) {
                c({
                    response: d,
                    error: false
                })
            },
            error: function(d, f, e) {
                c({
                    response: null,
                    error: true,
                    thrown: e
                })
            }
        })
    },
    getPuzzleImagePath: function(a, f) {
        if (this.dataAccessType=0,this.dataAccessType == 0) {
            var o = this.makeApiSendData(DTYPE_CONTENT_PAGE_DATA,hack=true);
            o += "&" + PARAM_PAGE_NO + "=" + a.toString();
            if (null != f) {
                o += "&" + PARAM_PYRAMID_SIZE_NO + "=" + f.toString()
            }
            return this.apiUrl + "?" + o
        } else {
            var b = this.settings.contentsServerPath + "data/";
            for (var g = 0, m = h5vParams.contentsKeys.length; g < m; g++) {
                b += h5vParams.contentsKeys[g] + "/"
            }
            var c = ("0000" + a).slice(-4);
            c = h5vParams.contentsKeys[2] + "_" + h5vParams.contentsKeys[3].substring(0, 6) + "_" + c;
            b += "puz/img/" + c + ".jpg";
            var n = this.serverTimeStamp + (Math.round((new Date()).getTime() / 1000) - this.startTimeStamp) + this.availableTime;
            var d = this.settings.cdnSaltKey + b + "?e=" + n;
            var l = HashLibrary.MD5.calc(d);
            return b + "?e=" + n + "&h=" + l
        }
    },
    downloadPuzzleImage: function(b, a, d) {
        var c = this.getPuzzleImagePath(b, a);
        jQuery.ajax({
            async: true,
            cache: false,
            type: "GET",
            dataType: "binary",
            url: c,
            crossDomain: true,
            beforeSend: function(e) {
                e.overrideMimeType("text/plain; charset=x-user-defined");
                e.withCredentials = true
            },
            success: function(e) {
                d({
                    data: e,
                    error: false
                })
            },
            error: function(e, g, f) {
                d({
                    data: null,
                    error: true,
                    thrown: f
                })
            }
        })
    },
    downloadPuzzleJson: function(pageNo, sizeNo, callback) {
        if (this.dataAccessType=0,this.dataAccessType == 0) {
            var sendData = this.makeApiSendData(DTYPE_CONTENT_PUZZLE_DATA,hack=true);
            sendData += "&" + PARAM_PAGE_NO + "=" + pageNo.toString();
            if (null != sizeNo) {
                sendData += "&" + PARAM_PYRAMID_SIZE_NO + "=" + sizeNo.toString()
            }
            jQuery.ajax({
                async: true,
                cache: false,
                type: "GET",
                dataType: "jsonp",
                url: this.apiUrl,
                data: sendData,
                crossDomain: true,
                jsonp: "callback",
                success: function(res) {
                    eval(res)
                },
                beforeSend: function(xhr) {
                    xhr.overrideMimeType("text/plain; charset=x-user-defined");
                    xhr.withCredentials = true
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    callback({
                        data: null,
                        error: true,
                        thrown: errorThrown
                    })
                }
            })
        } else {
            var url = this.settings.contentsServerPath + "data/";
            for (var i = 0, len = h5vParams.contentsKeys.length; i < len; i++) {
                url += h5vParams.contentsKeys[i] + "/"
            }
            var fileNm = ("000" + pageNo).slice(-3);
            url += "puz/json/points_" + fileNm + ".js";
            var e = this.serverTimeStamp + (Math.round((new Date()).getTime() / 1000) - this.startTimeStamp) + this.availableTime;
            var hashUrl = this.settings.cdnSaltKey + url + "?e=" + e;
            var h = HashLibrary.MD5.calc(hashUrl);
            src = url + "?e=" + e + "&h=" + h;
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = src;
            var scripts = document.getElementsByTagName("script");
            if (null != scripts && 0 < scripts.length) {
                for (i = scripts.length - 1; i >= 0; i--) {
                    var s = scripts[i];
                    if (0 > s.src.indexOf(url)) {
                        continue
                    }
                    s.parentElement.removeChild(s);
                    s = null;
                    delete s
                }
                scripts = null;
                delete scripts
            }
            document.getElementsByTagName("head")[0].appendChild(script);
            return
        }
    },
    getHtmlPagePath: function(a) {
        if (this.dataAccessType=0,this.dataAccessType == 0) {
            var n = this.makeApiSendData(DTYPE_CONTENT_HTML_DATA);
            n += "&" + PARAM_PAGE_NO + "=" + a.toString();
            return this.apiUrl + "?" + n
        } else {
            var b = this.settings.contentsServerPath + "data/";
            for (var f = 0, l = h5vParams.contentsKeys.length; f < l; f++) {
                b += h5vParams.contentsKeys[f] + "/"
            }
            var c = ("0000" + a).slice(-4);
            c = h5vParams.contentsKeys[2] + "_" + h5vParams.contentsKeys[3] + "_" + c;
            b += "puz/html/" + c + ".html";
            var m = this.serverTimeStamp + (Math.round((new Date()).getTime() / 1000) - this.startTimeStamp) + this.availableTime;
            var d = this.settings.cdnSaltKey + b + "?e=" + m;
            var g = HashLibrary.MD5.calc(d);
            return b + "?e=" + m + "&h=" + g
        }
    },
    downloadHtml: function(a, b, c) {
        jQuery.ajax({
            async: true,
            cache: false,
            dataType: "html",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            url: b,
            data: null,
            beforeSend: function(d) {
                d.overrideMimeType("text/html; charset=UTF-8");
                d.withCredentials = true
            },
            success: function(d) {
                c({
                    data: d,
                    pageNo: a,
                    error: false
                })
            },
            error: function(d, f, e) {
                c({
                    data: null,
                    pageNo: a,
                    error: true,
                    thrown: e
                })
            }
        })
    },
    downloadNombreXml: function(m) {
        if (this.dataAccessType=0,this.dataAccessType == 0) {
            var b = this.makeApiSendData(DTYPE_NOMBRE_XML);
            jQuery.ajax({
                async: true,
                cache: false,
                dataType: "xml",
                url: this.apiUrl,
                data: b,
                beforeSend: function(e) {
                    e.overrideMimeType("application/xml; charset=utf-8")
                },
                success: function(e) {
                    m({
                        response: e,
                        error: false
                    })
                },
                error: function(e, i, h) {
                    m({
                        response: null,
                        error: true,
                        thrown: h
                    })
                }
            })
        } else {
            var c = this.settings.contentsServerPath + "data/";
            for (var f = 0, a = h5vParams.contentsKeys.length; f < a; f++) {
                c += h5vParams.contentsKeys[f] + "/"
            }
            c += "xml/nombre.xml";
            var l = this.serverTimeStamp + (Math.round((new Date()).getTime() / 1000) - this.startTimeStamp) + this.availableTime;
            var d = this.settings.cdnSaltKey + c + "?e=" + l;
            var g = HashLibrary.MD5.calc(d);
            src = c + "?e=" + l + "&h=" + g;
            jQuery.ajax({
                async: true,
                cache: false,
                dataType: "xml",
                url: src,
                beforeSend: function(e) {
                    e.overrideMimeType("application/xml; charset=utf-8");
                    e.withCredentials = true
                },
                success: function(e) {
                    m({
                        response: e,
                        error: false
                    })
                },
                error: function(e, i, h) {
                    m({
                        response: null,
                        error: true,
                        thrown: h
                    })
                }
            });
            return
        }
    },
    getThumbnailImagePath: function() {
        if (this.dataAccessType=0,this.dataAccessType == 0) {
            var b = this.makeApiSendData(DTYPE_THUMBNAIL_IMAGE);
            return this.apiUrl + "?" + b
        } else {
            var d = this.settings.contentsServerPath + "data/";
            for (var g = 0, a = h5vParams.contentsKeys.length; g < a; g++) {
                d += h5vParams.contentsKeys[g] + "/"
            }
            var c = "tn";
            d += "puz/img/" + c + ".jpg";
            var m = this.serverTimeStamp + (Math.round((new Date()).getTime() / 1000) - this.startTimeStamp) + this.availableTime;
            var f = this.settings.cdnSaltKey + d + "?e=" + m;
            var l = HashLibrary.MD5.calc(f);
            return d + "?e=" + m + "&h=" + l
        }
    },
    makeApiSendData: function(c,hack=false) {
        var a = "";
        a += PARAM_DTYPE + "=" + c;
        for (var b = 0; b < h5vParams.contentsKeys.length; b++) {
            a += "&" + PARAM_BOOK_ID + (b + 1) + "=" + h5vParams.contentsKeys[b]
        }
        a += "&" + PARAM_BUY_FLAG + "=" + (hack ? 1 : h5vParams.readType);
        a += "&" + PARAM_START_PAGE + "=" + h5vParams.startPage;
        a += "&" + PARAM_HASH + "=" + (hack ? h5vParams.paramHash_hack: h5vParams.paramHash);
        if (null != h5vParams.paramOtk && "undefined" != h5vParams.paramOtk) {
            a += "&" + PARAM_OTK + "=" + h5vParams.paramOtk
        }
        if ($.os.ios) {
            a += "&" + PARAM_UA_TYPE + "=1"
        } else {
            if ($.os.android) {
                a += "&" + PARAM_UA_TYPE + "=2"
            } else {
                a += "&" + PARAM_UA_TYPE + "=9"
            }
        }
        return a
    }
};
$.ajaxTransport("+binary", function(a, c, b) {
    if (window.FormData && ((a.dataType && (a.dataType == "binary")) || (a.data && ((window.ArrayBuffer && a.data instanceof ArrayBuffer) || (window.Blob && a.data instanceof Blob))))) {
        return {
            send: function(e, p) {
                var q = new XMLHttpRequest()
                  , d = a.url
                  , m = a.type
                  , f = a.async || true
                  , n = a.responseType || "blob"
                  , l = a.data || null
                  , h = a.username || null
                  , o = a.password || null;
                q.addEventListener("load", function() {
                    var i = {};
                    i[a.dataType] = q.response;
                    p(q.status, q.statusText, i, q.getAllResponseHeaders())
                });
                q.open(m, d, f, h, o);
                for (var g in e) {
                    q.setRequestHeader(g, e[g])
                }
                q.responseType = n;
                q.send(l)
            },
            abort: function() {
                b.abort()
            }
        }
    }
});
var Connector = function(a) {
    this.initialize.apply(this, arguments)
};
Connector.prototype = {
    initialize: function(a) {
        this.settings = a;
        this.Connect = (serverSettings.isStreaming) ? new ConnectStreaming(this.settings) : null;
        this.Callcack = null;
        this.dataAccessType = 0;
        if (PARAM_DATA_ACCESS_TYPE in h5vParams.queryParams) {
            this.dataAccessType = (h5vParams.queryParams[PARAM_DATA_ACCESS_TYPE] == 1) ? 1 : 0
        }
    },
    initConnection: function(b) {
        var a = this;
        this.Connect.initConnection(function(d) {
            /*if (d.error) {
                H5V.showError(TranslateMessages.message["msg_contentsxml_error"], TranslateMessages.message["title_error"]);
                return
            }*/
            var c = a.parseContentsXml(d.response);
            if (false == a.settings.isStandAlone || a.dataAccessType == 1) {
                a.Connect.settings.contentsServerPath = "https://ct.sokuyomi.jp/stream/";//c[contentsXmlParams.contentsServerPath]["val"];
                a.Connect.apiUrl = a.Connect.settings.contentsServerPath + a.settings.downloadApiPath;
                a.dataAccessType = 0;//c[contentsXmlParams.dataAccessType]["val"];
                a.Connect.dataAccessType = a.dataAccessType;
                if (a.dataAccessType == 1) {
                    a.Connect.serverTimeStamp = parseInt(c[contentsXmlParams.serverTimestamp]["val"]);
                    a.Connect.availableTime = parseInt(c[contentsXmlParams.availableTime]["val"]);
                    a.Connect.startTimeStamp = parseInt(Math.round((new Date()).getTime() / 1000))
                }
            }
            b(c)
        })
    },
    getPuzzleImagePath: function(b, a) {
        return this.Connect.getPuzzleImagePath(b, a)
    },
    getThumbnailImagePath: function() {
        return this.Connect.getThumbnailImagePath()
    },
    getHtmlPagePath: function(a) {
        return this.Connect.getHtmlPagePath(a)
    },
    getInnerFileDownloadPath: function(a) {
        return this.Connect.getInnerFileDownloadPath(a)
    },
    downloadPuzzleJson: function(c, b) {
        var a = this;
        this.Connect.downloadPuzzleJson(c, b, function(d) {
            a.jsonCallBack({
                data: d.data
            }, d.error, d.thrown)
        })
    },
    downloadHtml: function(a, b, c) {
        this.Connect.downloadHtml(a, b, c)
    },
    downloadNombre: function(b) {
        var a = this;
        this.Connect.downloadNombreXml(function(d) {
            if (d.error) {
                b(false);
                return
            }
            var c = a.parseNombreXml(d.response);
            b(c)
        })
    },
    downloadClickableMap: function(a) {
        this.Connect.downloadClickableMap(a)
    },
    downloadHtmlPageList: function(a) {
        this.Connect.downloadHtmlPageList(a)
    },
    downloadPyramidSetting: function(b) {
        var a = this;
        this.Connect.downloadPyramidSetting(function(d) {
            if (d.error) {
                b(d);
                return
            }
            var c = a.parsePyramidXml(d.data);
            b({
                data: c
            })
        })
    },
    jsonCallBack: function(b, a, c) {
        if (!a) {
            a = false
        }
        if (!c) {
            c = null
        }
        $(this).trigger("jsoncallback", [{
            data: b.data,
            error: a,
            message: c
        }])
    },
    searchText: function(a, b) {
        this.Connect.searchText(a, b)
    },
    parseContentsXml: function(b) {
        var a = {};
        $(b).find(contentsXmlParams.rootElement).each(function(d, m) {
            var l = m.childNodes;
            for (var g = 0; g < l.length; g++) {
                var h = l[g];
                if (h.nodeType != 1) {
                    continue
                }
                var f = h.tagName;
                a[f] = new Array();
                for (var e = 0; e < h.attributes.length; e++) {
                    var c = h.attributes[e];
                    a[f][c.name] = c.value
                }
            }
            return false
        });
        return a
    },
    parseNombreXml: function(b) {
        var a = {};
        $(b).find(nombreXmlParams.pageElement).each(function(c, h) {
            var f = h;
            if (f.nodeType != 1) {
                return
            }
            var e = f.tagName.toLowerCase();
            if (e != "page") {
                return
            }
            var d = parseInt(f.getAttribute("number"));
            var g = (f.hasAttribute("nombre")) ? f.getAttribute("nombre") : null;
            a[d] = g
        });
        return a
    },
    parsePyramidXml: function(b) {
        var a = {};
        var d = $(b).find(pyramidXmlParams.rootElement);
        var c = parseInt(d.attr(pyramidXmlParams.countAttribute));
        if (isNaN(c)) {
            return null
        }
        a.count = c;
        a.width = parseInt(d.attr(pyramidXmlParams.srcWidthAttribute));
        a.height = parseInt(d.attr(pyramidXmlParams.srcHeightAttribute));
        a.images = {};
        d.find(pyramidXmlParams.imageElement).each(function(f, h) {
            var g = parseInt($(this).attr(pyramidXmlParams.imageNoAttribute));
            var e = parseInt($(this).attr(pyramidXmlParams.imageHeightAttribute));
            a.images[g] = e
        });
        return a
    },
    parseMovieXml: function(c) {
        var b = new Object();
        var a = new Object();
        var d = new Object;
        $(c).find(movieXmlParams.moviesElement).each(function(f, o) {
            var n = o.childNodes;
            for (var l = 0; l < n.length; l++) {
                var m = n[l];
                if (m.nodeType != 1) {
                    continue
                }
                var g = {};
                var f = 0;
                for (var h = 0; h < m.attributes.length; h++) {
                    var e = m.attributes[h];
                    g[e.name] = e.value;
                    if (e.name == "index") {
                        f = e.value
                    }
                }
                b[f] = g
            }
        });
        $(c).find(movieXmlParams.pageLinksElement).each(function(f, o) {
            var n = o.childNodes;
            for (var h = 0; h < n.length; h++) {
                var m = n[h];
                if (m.nodeType != 1) {
                    continue
                }
                var l = {};
                var f = 0;
                for (var g = 0; g < m.attributes.length; g++) {
                    var e = m.attributes[g];
                    l[e.name] = e.value;
                    if (e.name == "page") {
                        f = e.value
                    }
                }
                a[f] = l
            }
        });
        $(c).find(movieXmlParams.settingsElement).each(function(f, o) {
            var n = o.childNodes;
            for (var h = 0; h < n.length; h++) {
                var m = n[h];
                if (m.nodeType != 1) {
                    continue
                }
                var l = {};
                for (var g = 0; g < m.attributes.length; g++) {
                    var e = m.attributes[g];
                    l[e.name] = e.value
                }
                d[m.tagName] = l
            }
        });
        return {
            Movies: b,
            PageLinks: a,
            Settings: d
        }
    }
};
var DTYPE_CONTENT_XML = "0";
var DTYPE_CONTENT_PAGE_DATA = "1";
var DTYPE_CONTENT_PUZZLE_DATA = "2";
var DTYPE_NOMBRE_XML = "10";
var DTYPE_THUMBNAIL_IMAGE = "11";
var PARAM_DTYPE = "dtype";
var PARAM_BOOK_ID = "key";
var PARAM_HASH = "shd";
var PARAM_HASH_HACK = "shd_hack";
var PARAM_PAGE_NO = "pno";
var PARAM_BUY_FLAG = "re";
var PARAM_START_PAGE = "sp";
var PARAM_DATA_ACCESS_TYPE = "cdn";
var PARAM_OTK = "otk";
var PARAM_UA_TYPE = "ua";
var PARAM_LAST_CLOSE = "ls";
var MAX_BOOK_ID_NUMBER = 100;
var MIN_BOOK_ID_LENGTH = 1;
var MAX_BOOK_ID_LENGTH = 50;
var PUZZLE_DATA_SEPCOUNT = 1;
var BEFOREHAND_AHEAD_PAGE_COUNT = 10;
var BEFOREHAND_BACK_PAGE_COUNT = 4;
var CACHE_IMAGE_AHEAD_COUNT = 16;
var CACHE_IMAGE_BACK_COUNT = 6;
var THUMBNAIL_WIDTH = 60;
var THUMBNAIL_HEIGHT = 80;
VERTICAL_PAGE_INTERVAL = 15;
DOUBLE_PAGE_MIN_WIDTH = 900;
DOUBLE_PAGE_MIN_HEIGHT = 500;
FLICK_RECOGNIZE_TIME = 30;
FLICK_RECOGNIZE_SPEED = 2;
FLICK_RECOGNIZE_SPEED_SP = 0.4;
var VIEW_TYPE = {
    rtl: 0,
    ltr: 1
};
var isPointer = (window.PointerEvent) ? true : false;
var isMSPointer = (window.MSPointerEvent) ? true : false;
var isTouch = ("ontouchstart"in document.documentElement);
var startEvent = (window.PointerEvent) ? "pointerdown" : (window.MSPointerEvent) ? "mspointerdown" : ("ontouchstart"in document.documentElement) ? "touchstart" : "mousedown";
var moveEvent = (window.PointerEvent) ? "pointermove" : (window.MSPointerEvent) ? "mspointermove" : ("ontouchstart"in document.documentElement) ? "touchmove" : "mousemove";
var endEvent = (window.PointerEvent) ? "pointerup" : (window.MSPointerEvent) ? "mspointerup" : ("ontouchstart"in document.documentElement) ? "touchend" : "mouseup";
var leaveEvent = (window.PointerEvent) ? "pointerleave" : (window.MSPointerEvent) ? "mspointerleave" : ("ontouchstart"in document.documentElement) ? "touchleave" : "mouseleave";
var MSG_RESUME_CONFIRM = "読みかけの作品です（前回の閲覧情報があります）";
var MSG_TRIAL_JUMP_CONFIRM = "ご購入は、作品詳細ページにて、「ショッピングカートに入れる」<br />をクリックしてください。<br />作品詳細ページにジャンプします。よろしいですか？";
var MSG_VIEWER_CLOSE_CONFIRM = "閲覧を終了しますか？";
var MSG_CONTENTS_XML_ERROR = "初期化中にエラーが発生しました";
var MSG_PAGE_IMAGE_ERROR = "ページの取得中にエラーが発生しました";
var MSG_PUZZLE_DATA_ERROR = "データ取得中にエラーが発生しました";
var MSG_PUZZLE_IMAGE_ERROR = "画像データ表示中にエラーが発生しました";
var CueManager = function() {};
CueManager.prototype = {
    setCue: function(b) {
        if (!this._cue) {
            this._cue = []
        }
        if (!this._waitcue) {
            this._waitcue = []
        }
        b = parseInt(b);
        var a = this._waitcue.indexOf(b);
        if (a >= 0) {
            return
        }
        var a = this._cue.indexOf(b);
        if (a < 0) {
            this._cue.push(b);
            return
        }
        this._cue.splice(a, 1);
        this._cue.unshift(b)
    },
    deleteCue: function(b) {
        if (!this._cue) {
            return
        }
        b = parseInt(b);
        var a = this._cue.indexOf(b);
        if (a >= 0) {
            this._cue.splice(a, 1)
        }
        a = this._waitcue.indexOf(b);
        if (a >= 0) {
            this._waitcue.splice(a, 1)
        }
    },
    shiftCue: function() {
        if (!this._cue || 0 >= this._cue.length) {
            return null
        }
        var a = this._cue.shift();
        a = parseInt(a);
        if (0 <= a) {
            this._waitcue.push(a)
        }
        return a
    }
};
var GestureService = function() {};
GestureService.prototype = {
    INTERVAL_TIME_HOLD: 1000,
    INTERVAL_TIME_TAP_DELAY: 200,
    THRESHOLD_MOVE_PIXEL: 3,
    THRESHOLD_FLICK_MIN_PIXEL: 15,
    THRESHOLD_FLICK_MAX_PIXEL: 80,
    THRESHOLD_FLICK_TIME: 400,
    THRESHOLD_PINCH_DISTANCE_PIXEL: 3,
    MOVE_EVENT_THROTTLE_TIME: 50,
    isBubling: false,
    attach: function(a) {
        if (typeof (a) == "string") {
            a = $("#" + a)
        } else {
            if (!(a instanceof jQuery)) {
                a = $(a)
            }
        }
        if (a.length <= 0) {
            return
        }
        this.$wrapper = a;
        this.init()
    },
    init: function() {
        if ($.os.is_Pc && "onmousedown"in document.documentElement) {
            this.setupMouseHandle()
        }
        if ("ontouchstart"in document.documentElement) {
            this.setupTouchHandle()
        }
        this.disabled = false;
        this.$wrapper.get(0).GestureService = this
    },
    setupPointerHandle: function(b) {
        var a = this;
        this.$wrapper.on(b + "pointerdown", function(c) {
            a.clearGesture();
            a._gestureType = "pointer";
            a.$wrapper.off(".gesture");
            a.isGesturing = true;
            a.setPosition(c);
            a.$wrapper.on(b + "pointermove.gesture", function(d) {
                if (a._gestureType != "pointer") {
                    return
                }
                a.setPosition(d);
                a.setMoveEvent(d)
            }).on(b + "pointerup.gesture " + b + "pointerleave.gesture", function(d) {
                if (a._gestureType != "pointer") {
                    return
                }
                a.$wrapper.off(".gesture");
                a.setPosition(d);
                a.setEndEvent(d);
                a._gestureType = null;
                a.isGesturing = false
            });
            a.setStartEvent(c)
        })
    },
    setupMouseHandle: function() {
        var a = this;
        this.$wrapper.on("mousedown", function(b) {
            a.clearGesture();
            a._gestureType = "mouse";
            a.$wrapper.off(".gesture");
            a.isGesturing = true;
            a.setPosition(b);
            a.$wrapper.on("mousemove.gesture", function(c) {
                if (a._gestureType != "mouse") {
                    return
                }
                a.setPosition(c);
                a.setMoveEvent(c)
            }).on("mouseup.gesture mouseleave.gesture", function(c) {
                if (a._gestureType != "mouse") {
                    return
                }
                a.$wrapper.off(".gesture");
                a.setPosition(c);
                a.setEndEvent(c);
                a._gestureType = null;
                a.isGesturing = false
            });
            a.setStartEvent(b)
        })
    },
    setupTouchHandle: function() {
        var a = this;
        this.$wrapper.on("touchstart", function(b) {
            if (a._gestureType == "touch" && a.isGesturing && b.originalEvent.changedTouches.length >= 2) {
                a.setPosition(b);
                a.setStartEvent(b);
                return
            }
            a.clearGesture();
            a._gestureType = "touch";
            a.$wrapper.off(".gesture");
            a.isGesturing = true;
            a.setPosition(b);
            a.$wrapper.on("touchmove.gesture", function(c) {
                if (a._gestureType != "touch") {
                    return
                }
                a.setPosition(c);
                a.setMoveEvent(c)
            }).on("touchend.gesture touchcancel.gesture", function(c) {
                if (a._gestureType != "touch") {
                    return
                }
                if (!c.touches || c.touches.length <= 0) {
                    a.$wrapper.off(".gesture")
                }
                a.setPosition(c);
                a.setEndEvent(c);
                a._gestureType = null;
                a.isGesturing = false
            });
            a.setStartEvent(b)
        })
    },
    setPosition: function(l) {
        var o, n, m;
        var h = false;
        var b = new Date();
        if (l.originalEvent) {
            l = l.originalEvent
        }
        if (l.type == "touchend" || l.type == "touchcancel") {
            if (l.touches && l.touches.length >= 1) {
                var a = [];
                var m = l.touches[0]["identifier"];
                for (var g = 0; g < this.position.length; g++) {
                    if (this.position[g]["identifier"] != m) {
                        a.push(this.position[g])
                    }
                }
                this.position = a
            } else {
                return
            }
        }
        if (l.type == "mouseup" || l.type == "mouseleave" || l.type == "pointerup" || l.type == "pointerleave") {
            return
        }
        if (l.type == "touchstart" && l.touches && l.touches.length <= 1) {
            this.lastPosition = this.position;
            this.position = null
        }
        if (l.type == "mousedown" || l.type == "pointerdown") {
            this.lastPosition = this.position;
            this.position = null
        }
        var f;
        if (l.touches || l.changeTouches) {
            f = (l.changeTouches) ? l.changeTouches[0] : l.touches[0]
        } else {
            f = l
        }
        o = (f.clientX) ? f.clientX : f.pageX;
        n = (f.clientY) ? f.clientY : f.pageY;
        var c = $(l.currentTarget).offset();
        o = (o - c.left) + document.body.scrollLeft + document.documentElement.scrollLeft;
        n = (n - c.top) + document.body.scrollTop + document.documentElement.scrollTop;
        m = f.identifier || 0;
        var d = {
            time: b.getTime(),
            identifier: m,
            x: o,
            y: n
        };
        if (null == this.position) {
            this.position = []
        }
        if (this.position.length <= 0) {
            this.position.push({
                start: d
            })
        } else {
            if (!("start"in this.position[0])) {
                this.position[0] = {
                    start: d
                }
            } else {
                var p = (this.position[0]["current"]) ? this.position[0]["current"] : this.position[0]["start"];
                this.position[0]["current"] = d;
                this.position[0]["latest"] = p
            }
        }
        if (l.touches && l.touches.length >= 2) {
            f = (l.changeTouches) ? l.changeTouches[1] : l.touches[1];
            o = (f.clientX) ? f.clientX : f.pageX;
            n = (f.clientY) ? f.clientY : f.pageY;
            var c = $(l.currentTarget).offset();
            o = (o - c.left) + document.body.scrollLeft + document.documentElement.scrollLeft;
            n = (n - c.top) + document.body.scrollTop + document.documentElement.scrollTop;
            m = f.identifier || 1;
            var d = {
                time: b.getTime(),
                identifier: m,
                x: o,
                y: n
            };
            if (this.position.length <= 1) {
                this.position.push({
                    start: d
                })
            } else {
                if (!("start"in this.position[1])) {
                    this.position[1] = {
                        start: d
                    }
                } else {
                    var p = (this.position[1]["current"]) ? this.position[1]["current"] : this.position[1]["start"];
                    this.position[1]["current"] = d;
                    this.position[1]["latest"] = p
                }
            }
        }
    },
    setStartEvent: function(b) {
        var a = this;
        this.isGesturing = true;
        if (this.holdTimeInterval) {
            clearTimeout(this.holdTimeInterval);
            this.holdTimeInterval = null;
            this.isHold = false
        }
        if (this.tapDelayInterval) {
            clearTimeout(this.tapDelayInterval);
            this.tapDelayInterval = null
        }
        this.moveType = null;
        this.moveTypeChangePosition = null;
        if (this.position.length < 2) {
            this.holdTimeInterval = setTimeout(function() {
                a.holdTimeInterval = null;
                a.onHold()
            }, this.INTERVAL_TIME_HOLD);
            this.isTapDelay = true
        } else {
            if (this.holdTimeInterval) {
                clearTimeout(this.holdTimeInterval);
                this.holdTimeInterval = null;
                this.isHold = false
            }
            if (this.tapDelayInterval) {
                clearTimeout(this.tapDelayInterval);
                this.tapDelayInterval = null
            }
        }
        this.preventDefaults(b)
    },
    setMoveEvent: function(v) {
        if (!this.isGesturing) {
            return
        }
        if (this.position.length < 2) {
            var d = this.position[0];
            var u = d.start["x"];
            var g = d.latest["x"];
            var m = d.current["x"];
            var s = d.start["y"];
            var f = d.latest["y"];
            var l = d.current["y"];
            if (this.isTapDelay) {
                var o = m - u;
                var n = l - s;
                if (Math.abs(o) > this.THRESHOLD_MOVE_PIXEL || Math.abs(n) > this.THRESHOLD_MOVE_PIXEL) {
                    this.isTapDelay = false;
                    if (this.holdTimeInterval) {
                        clearTimeout(this.holdTimeInterval);
                        this.holdTimeInterval = null;
                        this.isHold = false
                    }
                } else {
                    return
                }
            }
            var o = m - g;
            var n = l - f;
            this.onDrag();
            if (o != 0 || n != 0) {
                var c = this.moveType;
                if (Math.abs(o) < Math.abs(n)) {
                    if (n < 0) {
                        this.moveType = "btt"
                    } else {
                        this.moveType = "ttb"
                    }
                } else {
                    if (o < 0) {
                        this.moveType = "rtl"
                    } else {
                        this.moveType = "ltr"
                    }
                }
                if (c != this.moveType) {
                    this.moveTypeChangePosition = d.latest
                }
            }
        } else {
            this.isTapDelay = false;
            var q, p, x, w, A, z;
            if (this.position[1]["current"]) {
                q = this.position[0]["latest"];
                p = this.position[1]["latest"];
                A = q.x - p.x;
                z = q.y - p.y;
                var t = Math.sqrt(Math.pow(A, 2) + Math.pow(z, 2));
                x = this.position[0]["current"];
                w = this.position[1]["current"];
                A = x.x - w.x;
                z = x.y - w.y;
                var B = Math.sqrt(Math.pow(A, 2) + Math.pow(z, 2));
                if (Math.abs(B - t) >= this.THRESHOLD_PINCH_DISTANCE_PIXEL) {
                    var i = Math.round((x.x + w.x) / 2);
                    var h = Math.round((x.y + w.y) / 2);
                    var y = Math.round(B / t * 1000) / 1000;
                    this.onPinch({
                        x: i,
                        y: h
                    }, y)
                }
            }
        }
        this.preventDefaults(v)
    },
    setEndEvent: function(h) {
        if (!this.isGesturing) {
            return
        }
        var c = this;
        var f = new Date();
        if (this.position.length < 2) {
            if (this.holdTimeInterval) {
                clearTimeout(this.holdTimeInterval);
                this.holdTimeInterval = null
            }
            if (this.isHold) {
                this.onHoldEnd()
            }
            if (this.isTapDelay) {
                if (this.lastTapTime && f.getTime() - this.lastTapTime < this.INTERVAL_TIME_TAP_DELAY) {
                    if (this.tapDelayInterval) {
                        clearTimeout(this.tapDelayInterval);
                        this.tapDelayInterval = null
                    }
                    this.onDoubleTap()
                } else {
                    this.lastTapTime = f.getTime();
                    this.tapDelayInterval = setTimeout(function() {
                        c.lastTapTime = null;
                        c.tapDelayInterval = null;
                        c.onTap()
                    }, this.INTERVAL_TIME_TAP_DELAY)
                }
            }
            if (this.isDragging) {
                this.onDragEnd()
            }
            if (this.moveType != null) {
                var g, d, b, a;
                switch (this.moveType) {
                case "ltr":
                case "rtl":
                    g = this.moveTypeChangePosition.x || 0;
                    d = this.position[0]["current"]["x"] || 0;
                    a = this.$wrapper.width() * 0.1;
                    break;
                case "ttb":
                case "btt":
                    g = this.moveTypeChangePosition.y || 0;
                    d = this.position[0]["current"]["y"] || 0;
                    a = this.$wrapper.height() * 0.1;
                    break
                }
                b = d - g;
                if (a < this.THRESHOLD_FLICK_MIN_PIXEL) {
                    a = this.THRESHOLD_FLICK_MIN_PIXEL
                }
                if (a > this.THRESHOLD_FLICK_MAX_PIXEL) {
                    a = this.THRESHOLD_FLICK_MAX_PIXEL
                }
                if (Math.abs(b) >= a) {
                    this.onFlick(this.moveType, {
                        start: this.moveTypeChangePosition,
                        current: this.position[0]["current"]
                    })
                }
            }
            this.clearGesture()
        }
        this.preventDefaults(h)
    },
    onTap: function() {
        var a = this.makeEventArgs("tap", {
            position: this.position[0]["start"]
        });
        this.$wrapper.trigger("tap", a)
    },
    onDoubleTap: function() {
        var a = this.makeEventArgs("doubletap", {
            position: this.position[0]["start"]
        });
        this.$wrapper.trigger("doubleTap", a)
    },
    onDrag: function() {
        if (!this.isDragging) {
            this.isDragging = true;
            var a = this.makeEventArgs("dragstart", {
                positions: this.position[0]
            });
            this.$wrapper.trigger("dragStart", a)
        } else {
            var a = this.makeEventArgs("dragging", {
                positions: this.position[0]
            });
            this.$wrapper.trigger("dragging", a)
        }
    },
    onDragEnd: function() {
        this.isDragging = false;
        var a = this.makeEventArgs("dragend", {
            positions: this.position[0]
        });
        this.$wrapper.trigger("dragEnd", a)
    },
    onFlick: function(h, i) {
        var e = ($.os && $.os.is_Pc) ? 100 : 30;
        var b = new Date().getTime();
        var a = i.current["time"] - i.start["time"];
        var g = Math.sqrt(Math.pow(i.current["x"] - i.start["x"], 2) + Math.pow(i.current["y"] - i.start["y"], 2));
        var c = Math.round(g / a * 100000) / 100000;
        var d = ($.os.is_Pc) ? 1.2 : 0.5;
        if (a <= this.THRESHOLD_FLICK_TIME && Math.abs(g) >= e && c > d) {
            var f = this.makeEventArgs("flick", {
                direction: h,
                positions: i,
                progress: a,
                speed: c
            });
            this.$wrapper.trigger("flick", f)
        }
    },
    onPinch: function(a, c) {
        var b = this.makeEventArgs("pinch", {
            positions: this.position,
            center: a,
            differenceRatio: c
        });
        this.$wrapper.trigger("pinch", b)
    },
    onHold: function() {
        this.isHold = true;
        var a = this.makeEventArgs("hold", {
            position: this.position[0]["start"]
        });
        this.$wrapper.trigger("hold", a)
    },
    onHoldEnd: function() {
        this.isHold = false;
        var a = this.makeEventArgs("holdend", {
            position: this.position[0]["current"]
        });
        this.$wrapper.trigger("holdEnd", a)
    },
    makeEventArgs: function(b, a) {
        if (!a) {
            a = {}
        }
        a.type = b;
        return a
    },
    clearGesture: function() {
        this.isGesturing = false;
        this._gestureType = null;
        this.isHold = false;
        this.isDragging = false;
        this.isTapDelay = false;
        this.moveType = null;
        this._moveEventLastTime = null;
        if (this.holdTimeInterval) {
            clearTimeout(this.holdTimeInterval);
            this.holdTimeInterval = null
        }
        this.$wrapper.off(".gesture")
    },
    preventDefaults: function(a) {
        if (this.isBubling) {
            return
        }
        if (!a) {
            a = window.event
        }
        if (a.preventDefault) {
            a.preventDefault()
        }
        if (a.stopPropagation) {
            a.stopPropagation()
        }
        a.returnValue = false;
        if (document.selection) {
            try {
                document.selection.empty()
            } catch (a) {}
        }
    }
};
var HashLibrary = {
    MD5: {
        int2hex8_Fx: function(a) {
            return this.int2hex8((a[1] * 65536) + a[0])
        },
        update_Fx: function(n, M) {
            var w = this.a_[0];
            var y = this.a_[1];
            var l = this.b_[0];
            var m = this.b_[1];
            var L = this.c_[0];
            var O = this.c_[1];
            var x = this.d_[0];
            var z = this.d_[1];
            var J, I, H, G, F, E, D, C, B, A, i, h, g, f, e, d;
            var c, b, a, U, T, S, R, Q, P, N, v, u, s, q, p, o;
            if (M == 1) {
                J = n.charCodeAt(0) | (n.charCodeAt(1) << 8);
                c = n.charCodeAt(2) | (n.charCodeAt(3) << 8);
                I = n.charCodeAt(4) | (n.charCodeAt(5) << 8);
                b = n.charCodeAt(6) | (n.charCodeAt(7) << 8);
                H = n.charCodeAt(8) | (n.charCodeAt(9) << 8);
                a = n.charCodeAt(10) | (n.charCodeAt(11) << 8);
                G = n.charCodeAt(12) | (n.charCodeAt(13) << 8);
                U = n.charCodeAt(14) | (n.charCodeAt(15) << 8);
                F = n.charCodeAt(16) | (n.charCodeAt(17) << 8);
                T = n.charCodeAt(18) | (n.charCodeAt(19) << 8);
                E = n.charCodeAt(20) | (n.charCodeAt(21) << 8);
                S = n.charCodeAt(22) | (n.charCodeAt(23) << 8);
                D = n.charCodeAt(24) | (n.charCodeAt(25) << 8);
                R = n.charCodeAt(26) | (n.charCodeAt(27) << 8);
                C = n.charCodeAt(28) | (n.charCodeAt(29) << 8);
                Q = n.charCodeAt(30) | (n.charCodeAt(31) << 8);
                B = n.charCodeAt(32) | (n.charCodeAt(33) << 8);
                P = n.charCodeAt(34) | (n.charCodeAt(35) << 8);
                A = n.charCodeAt(36) | (n.charCodeAt(37) << 8);
                N = n.charCodeAt(38) | (n.charCodeAt(39) << 8);
                i = n.charCodeAt(40) | (n.charCodeAt(41) << 8);
                v = n.charCodeAt(42) | (n.charCodeAt(43) << 8);
                h = n.charCodeAt(44) | (n.charCodeAt(45) << 8);
                u = n.charCodeAt(46) | (n.charCodeAt(47) << 8);
                g = n.charCodeAt(48) | (n.charCodeAt(49) << 8);
                s = n.charCodeAt(50) | (n.charCodeAt(51) << 8);
                f = n.charCodeAt(52) | (n.charCodeAt(53) << 8);
                q = n.charCodeAt(54) | (n.charCodeAt(55) << 8);
                e = n.charCodeAt(56) | (n.charCodeAt(57) << 8);
                p = n.charCodeAt(58) | (n.charCodeAt(59) << 8);
                d = n.charCodeAt(60) | (n.charCodeAt(61) << 8);
                o = n.charCodeAt(62) | (n.charCodeAt(63) << 8)
            } else {
                J = n.charCodeAt(0);
                c = n.charCodeAt(1);
                I = n.charCodeAt(2);
                b = n.charCodeAt(3);
                H = n.charCodeAt(4);
                a = n.charCodeAt(5);
                G = n.charCodeAt(6);
                U = n.charCodeAt(7);
                F = n.charCodeAt(8);
                T = n.charCodeAt(9);
                E = n.charCodeAt(10);
                S = n.charCodeAt(11);
                D = n.charCodeAt(12);
                R = n.charCodeAt(13);
                C = n.charCodeAt(14);
                Q = n.charCodeAt(15);
                B = n.charCodeAt(16);
                P = n.charCodeAt(17);
                A = n.charCodeAt(18);
                N = n.charCodeAt(19);
                i = n.charCodeAt(20);
                v = n.charCodeAt(21);
                h = n.charCodeAt(22);
                u = n.charCodeAt(23);
                g = n.charCodeAt(24);
                s = n.charCodeAt(25);
                f = n.charCodeAt(26);
                q = n.charCodeAt(27);
                e = n.charCodeAt(28);
                p = n.charCodeAt(29);
                d = n.charCodeAt(30);
                o = n.charCodeAt(31)
            }
            var K;
            w += ((l & L) | (~l & x)) + J + 42104;
            y += ((m & O) | (~m & z)) + c + 55146;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 9) | ((w << 7) & 65535);
            y = (w >> 9) | ((y << 7) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & l) | (~w & L)) + I + 46934;
            z += ((y & m) | (~y & O)) + b + 59591;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 4) | ((x << 12) & 65535);
            z = (x >> 4) | ((z << 12) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & w) | (~x & l)) + H + 28891;
            O += ((z & y) | (~z & m)) + a + 9248;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 15) | ((O << 1) & 65535);
            O = (O >> 15) | ((L << 1) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & x) | (~L & w)) + G + 52974;
            m += ((O & z) | (~O & y)) + U + 49597;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 10) | ((m << 6) & 65535);
            m = (m >> 10) | ((l << 6) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l & L) | (~l & x)) + F + 4015;
            y += ((m & O) | (~m & z)) + T + 62844;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 9) | ((w << 7) & 65535);
            y = (w >> 9) | ((y << 7) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & l) | (~w & L)) + E + 50730;
            z += ((y & m) | (~y & O)) + S + 18311;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 4) | ((x << 12) & 65535);
            z = (x >> 4) | ((z << 12) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & w) | (~x & l)) + D + 17939;
            O += ((z & y) | (~z & m)) + R + 43056;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 15) | ((O << 1) & 65535);
            O = (O >> 15) | ((L << 1) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & x) | (~L & w)) + C + 38145;
            m += ((O & z) | (~O & y)) + Q + 64838;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 10) | ((m << 6) & 65535);
            m = (m >> 10) | ((l << 6) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l & L) | (~l & x)) + B + 39128;
            y += ((m & O) | (~m & z)) + P + 27008;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 9) | ((w << 7) & 65535);
            y = (w >> 9) | ((y << 7) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & l) | (~w & L)) + A + 63407;
            z += ((y & m) | (~y & O)) + N + 35652;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 4) | ((x << 12) & 65535);
            z = (x >> 4) | ((z << 12) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & w) | (~x & l)) + i + 23473;
            O += ((z & y) | (~z & m)) + v + 65535;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 15) | ((O << 1) & 65535);
            O = (O >> 15) | ((L << 1) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & x) | (~L & w)) + h + 55230;
            m += ((O & z) | (~O & y)) + u + 35164;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 10) | ((m << 6) & 65535);
            m = (m >> 10) | ((l << 6) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l & L) | (~l & x)) + g + 4386;
            y += ((m & O) | (~m & z)) + s + 27536;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 9) | ((w << 7) & 65535);
            y = (w >> 9) | ((y << 7) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & l) | (~w & L)) + f + 29075;
            z += ((y & m) | (~y & O)) + q + 64920;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 4) | ((x << 12) & 65535);
            z = (x >> 4) | ((z << 12) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & w) | (~x & l)) + e + 17294;
            O += ((z & y) | (~z & m)) + p + 42617;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 15) | ((O << 1) & 65535);
            O = (O >> 15) | ((L << 1) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & x) | (~L & w)) + d + 2081;
            m += ((O & z) | (~O & y)) + o + 18868;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 10) | ((m << 6) & 65535);
            m = (m >> 10) | ((l << 6) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l & x) | (L & ~x)) + I + 9570;
            y += ((m & z) | (O & ~z)) + b + 63006;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 11) | ((w << 5) & 65535);
            y = (w >> 11) | ((y << 5) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & L) | (l & ~L)) + D + 45888;
            z += ((y & O) | (m & ~O)) + R + 49216;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 7) | ((x << 9) & 65535);
            z = (x >> 7) | ((z << 9) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & l) | (w & ~l)) + h + 23121;
            O += ((z & m) | (y & ~m)) + u + 9822;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 2) | ((L << 14) & 65535);
            O = (L >> 2) | ((O << 14) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & w) | (x & ~w)) + J + 51114;
            m += ((O & y) | (z & ~y)) + c + 59830;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 12) | ((m << 4) & 65535);
            m = (m >> 12) | ((l << 4) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l & x) | (L & ~x)) + E + 4189;
            y += ((m & z) | (O & ~z)) + S + 54831;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 11) | ((w << 5) & 65535);
            y = (w >> 11) | ((y << 5) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & L) | (l & ~L)) + i + 5203;
            z += ((y & O) | (m & ~O)) + v + 580;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 7) | ((x << 9) & 65535);
            z = (x >> 7) | ((z << 9) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & l) | (w & ~l)) + d + 59009;
            O += ((z & m) | (y & ~m)) + o + 55457;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 2) | ((L << 14) & 65535);
            O = (L >> 2) | ((O << 14) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & w) | (x & ~w)) + F + 64456;
            m += ((O & y) | (z & ~y)) + T + 59347;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 12) | ((m << 4) & 65535);
            m = (m >> 12) | ((l << 4) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l & x) | (L & ~x)) + A + 52710;
            y += ((m & z) | (O & ~z)) + N + 8673;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 11) | ((w << 5) & 65535);
            y = (w >> 11) | ((y << 5) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & L) | (l & ~L)) + e + 2006;
            z += ((y & O) | (m & ~O)) + p + 49975;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 7) | ((x << 9) & 65535);
            z = (x >> 7) | ((z << 9) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & l) | (w & ~l)) + G + 3463;
            O += ((z & m) | (y & ~m)) + U + 62677;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 2) | ((L << 14) & 65535);
            O = (L >> 2) | ((O << 14) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & w) | (x & ~w)) + B + 5357;
            m += ((O & y) | (z & ~y)) + P + 17754;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 12) | ((m << 4) & 65535);
            m = (m >> 12) | ((l << 4) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l & x) | (L & ~x)) + f + 59653;
            y += ((m & z) | (O & ~z)) + q + 43491;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 11) | ((w << 5) & 65535);
            y = (w >> 11) | ((y << 5) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w & L) | (l & ~L)) + H + 41976;
            z += ((y & O) | (m & ~O)) + a + 64751;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 7) | ((x << 9) & 65535);
            z = (x >> 7) | ((z << 9) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x & l) | (w & ~l)) + C + 729;
            O += ((z & m) | (y & ~m)) + Q + 26479;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 2) | ((L << 14) & 65535);
            O = (L >> 2) | ((O << 14) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L & w) | (x & ~w)) + g + 19594;
            m += ((O & y) | (z & ~y)) + s + 36138;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 12) | ((m << 4) & 65535);
            m = (m >> 12) | ((l << 4) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l ^ L) ^ x) + E + 14658;
            y += ((m ^ O) ^ z) + S + 65530;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 12) | ((w << 4) & 65535);
            y = (w >> 12) | ((y << 4) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w ^ l) ^ L) + B + 63105;
            z += ((y ^ m) ^ O) + P + 34673;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 5) | ((x << 11) & 65535);
            z = (x >> 5) | ((z << 11) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x ^ w) ^ l) + h + 24866;
            O += ((z ^ y) ^ m) + u + 28061;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 16) | ((O << 0) & 65535);
            O = (O >> 16) | ((L << 0) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L ^ x) ^ w) + e + 14348;
            m += ((O ^ z) ^ y) + p + 64997;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 9) | ((m << 7) & 65535);
            m = (m >> 9) | ((l << 7) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l ^ L) ^ x) + I + 59972;
            y += ((m ^ O) ^ z) + b + 42174;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 12) | ((w << 4) & 65535);
            y = (w >> 12) | ((y << 4) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w ^ l) ^ L) + F + 53161;
            z += ((y ^ m) ^ O) + T + 19422;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 5) | ((x << 11) & 65535);
            z = (x >> 5) | ((z << 11) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x ^ w) ^ l) + C + 19296;
            O += ((z ^ y) ^ m) + Q + 63163;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 16) | ((O << 0) & 65535);
            O = (O >> 16) | ((L << 0) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L ^ x) ^ w) + i + 48240;
            m += ((O ^ z) ^ y) + v + 48831;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 9) | ((m << 7) & 65535);
            m = (m >> 9) | ((l << 7) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l ^ L) ^ x) + f + 32454;
            y += ((m ^ O) ^ z) + q + 10395;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 12) | ((w << 4) & 65535);
            y = (w >> 12) | ((y << 4) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w ^ l) ^ L) + J + 10234;
            z += ((y ^ m) ^ O) + c + 60065;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 5) | ((x << 11) & 65535);
            z = (x >> 5) | ((z << 11) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x ^ w) ^ l) + G + 12421;
            O += ((z ^ y) ^ m) + U + 54511;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 16) | ((O << 0) & 65535);
            O = (O >> 16) | ((L << 0) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L ^ x) ^ w) + D + 7429;
            m += ((O ^ z) ^ y) + R + 1160;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 9) | ((m << 7) & 65535);
            m = (m >> 9) | ((l << 7) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += ((l ^ L) ^ x) + A + 53305;
            y += ((m ^ O) ^ z) + N + 55764;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 12) | ((w << 4) & 65535);
            y = (w >> 12) | ((y << 4) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += ((w ^ l) ^ L) + g + 39397;
            z += ((y ^ m) ^ O) + s + 59099;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 5) | ((x << 11) & 65535);
            z = (x >> 5) | ((z << 11) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += ((x ^ w) ^ l) + d + 31992;
            O += ((z ^ y) ^ m) + o + 8098;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (L >> 16) | ((O << 0) & 65535);
            O = (O >> 16) | ((L << 0) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += ((L ^ x) ^ w) + H + 22117;
            m += ((O ^ z) ^ y) + a + 50348;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 9) | ((m << 7) & 65535);
            m = (m >> 9) | ((l << 7) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += (L ^ ((65535 - x) | l)) + J + 8772;
            y += (O ^ ((65535 - z) | m)) + c + 62505;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 10) | ((w << 6) & 65535);
            y = (w >> 10) | ((y << 6) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += (l ^ ((65535 - L) | w)) + C + 65431;
            z += (m ^ ((65535 - O) | y)) + Q + 17194;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 6) | ((x << 10) & 65535);
            z = (x >> 6) | ((z << 10) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += (w ^ ((65535 - l) | x)) + e + 9127;
            O += (y ^ ((65535 - m) | z)) + p + 43924;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 1) | ((L << 15) & 65535);
            O = (L >> 1) | ((O << 15) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += (x ^ ((65535 - w) | L)) + E + 41017;
            m += (z ^ ((65535 - y) | O)) + S + 64659;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 11) | ((m << 5) & 65535);
            m = (m >> 11) | ((l << 5) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += (L ^ ((65535 - x) | l)) + g + 22979;
            y += (O ^ ((65535 - z) | m)) + s + 25947;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 10) | ((w << 6) & 65535);
            y = (w >> 10) | ((y << 6) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += (l ^ ((65535 - L) | w)) + G + 52370;
            z += (m ^ ((65535 - O) | y)) + U + 36620;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 6) | ((x << 10) & 65535);
            z = (x >> 6) | ((z << 10) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += (w ^ ((65535 - l) | x)) + i + 62589;
            O += (y ^ ((65535 - m) | z)) + v + 65519;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 1) | ((L << 15) & 65535);
            O = (L >> 1) | ((O << 15) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += (x ^ ((65535 - w) | L)) + I + 24017;
            m += (z ^ ((65535 - y) | O)) + b + 34180;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 11) | ((m << 5) & 65535);
            m = (m >> 11) | ((l << 5) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += (L ^ ((65535 - x) | l)) + B + 32335;
            y += (O ^ ((65535 - z) | m)) + P + 28584;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 10) | ((w << 6) & 65535);
            y = (w >> 10) | ((y << 6) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += (l ^ ((65535 - L) | w)) + d + 59104;
            z += (m ^ ((65535 - O) | y)) + o + 65068;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 6) | ((x << 10) & 65535);
            z = (x >> 6) | ((z << 10) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += (w ^ ((65535 - l) | x)) + D + 17172;
            O += (y ^ ((65535 - m) | z)) + R + 41729;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 1) | ((L << 15) & 65535);
            O = (L >> 1) | ((O << 15) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += (x ^ ((65535 - w) | L)) + f + 4513;
            m += (z ^ ((65535 - y) | O)) + q + 19976;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 11) | ((m << 5) & 65535);
            m = (m >> 11) | ((l << 5) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            w += (L ^ ((65535 - x) | l)) + F + 32386;
            y += (O ^ ((65535 - z) | m)) + T + 63315;
            y += w >> 16;
            w &= 65535;
            y &= 65535;
            K = (y >> 10) | ((w << 6) & 65535);
            y = (w >> 10) | ((y << 6) & 65535);
            w = K + l;
            y += m;
            if (w > 65535) {
                w &= 65535;
                y++
            }
            y &= 65535;
            x += (l ^ ((65535 - L) | w)) + h + 62005;
            z += (m ^ ((65535 - O) | y)) + u + 48442;
            z += x >> 16;
            x &= 65535;
            z &= 65535;
            K = (z >> 6) | ((x << 10) & 65535);
            z = (x >> 6) | ((z << 10) & 65535);
            x = K + w;
            z += y;
            if (x > 65535) {
                x &= 65535;
                z++
            }
            z &= 65535;
            L += (w ^ ((65535 - l) | x)) + H + 53947;
            O += (y ^ ((65535 - m) | z)) + a + 10967;
            O += L >> 16;
            L &= 65535;
            O &= 65535;
            K = (O >> 1) | ((L << 15) & 65535);
            O = (L >> 1) | ((O << 15) & 65535);
            L = K + x;
            O += z;
            if (L > 65535) {
                L &= 65535;
                O++
            }
            O &= 65535;
            l += (x ^ ((65535 - w) | L)) + A + 54161;
            m += (z ^ ((65535 - y) | O)) + N + 60294;
            m += l >> 16;
            l &= 65535;
            m &= 65535;
            K = (l >> 11) | ((m << 5) & 65535);
            m = (m >> 11) | ((l << 5) & 65535);
            l = K + L;
            m += O;
            if (l > 65535) {
                l &= 65535;
                m++
            }
            m &= 65535;
            K = this.a_[0] += w;
            this.a_[1] += y;
            if (K > 65535) {
                this.a_[0] -= 65536;
                this.a_[1]++
            }
            this.a_[1] &= 65535;
            K = this.b_[0] += l;
            this.b_[1] += m;
            if (K > 65535) {
                this.b_[0] -= 65536;
                this.b_[1]++
            }
            this.b_[1] &= 65535;
            K = this.c_[0] += L;
            this.c_[1] += O;
            if (K > 65535) {
                this.c_[0] -= 65536;
                this.c_[1]++
            }
            this.c_[1] &= 65535;
            K = this.d_[0] += x;
            this.d_[1] += z;
            if (K > 65535) {
                this.d_[0] -= 65536;
                this.d_[1]++
            }
            this.d_[1] &= 65535
        },
        int2hex8: function(d) {
            var b, f, a = "";
            var e = "0123456789abcdef";
            for (b = 0; b < 4; b++) {
                f = d >>> (b * 8);
                a += e.charAt((f >> 4) & 15);
                a += e.charAt(f & 15)
            }
            return a
        },
        update_std: function(z, x) {
            var C = this.a_
              , B = this.b_
              , A = this.c_
              , y = this.d_;
            var w, v, t, s, p, n, l, h, f, e, u, q, o, m, i, g;
            if (x == 1) {
                w = z.charCodeAt(0) | (z.charCodeAt(1) << 8) | (z.charCodeAt(2) << 16) | (z.charCodeAt(3) << 24);
                v = z.charCodeAt(4) | (z.charCodeAt(5) << 8) | (z.charCodeAt(6) << 16) | (z.charCodeAt(7) << 24);
                t = z.charCodeAt(8) | (z.charCodeAt(9) << 8) | (z.charCodeAt(10) << 16) | (z.charCodeAt(11) << 24);
                s = z.charCodeAt(12) | (z.charCodeAt(13) << 8) | (z.charCodeAt(14) << 16) | (z.charCodeAt(15) << 24);
                p = z.charCodeAt(16) | (z.charCodeAt(17) << 8) | (z.charCodeAt(18) << 16) | (z.charCodeAt(19) << 24);
                n = z.charCodeAt(20) | (z.charCodeAt(21) << 8) | (z.charCodeAt(22) << 16) | (z.charCodeAt(23) << 24);
                l = z.charCodeAt(24) | (z.charCodeAt(25) << 8) | (z.charCodeAt(26) << 16) | (z.charCodeAt(27) << 24);
                h = z.charCodeAt(28) | (z.charCodeAt(29) << 8) | (z.charCodeAt(30) << 16) | (z.charCodeAt(31) << 24);
                f = z.charCodeAt(32) | (z.charCodeAt(33) << 8) | (z.charCodeAt(34) << 16) | (z.charCodeAt(35) << 24);
                e = z.charCodeAt(36) | (z.charCodeAt(37) << 8) | (z.charCodeAt(38) << 16) | (z.charCodeAt(39) << 24);
                u = z.charCodeAt(40) | (z.charCodeAt(41) << 8) | (z.charCodeAt(42) << 16) | (z.charCodeAt(43) << 24);
                q = z.charCodeAt(44) | (z.charCodeAt(45) << 8) | (z.charCodeAt(46) << 16) | (z.charCodeAt(47) << 24);
                o = z.charCodeAt(48) | (z.charCodeAt(49) << 8) | (z.charCodeAt(50) << 16) | (z.charCodeAt(51) << 24);
                m = z.charCodeAt(52) | (z.charCodeAt(53) << 8) | (z.charCodeAt(54) << 16) | (z.charCodeAt(55) << 24);
                i = z.charCodeAt(56) | (z.charCodeAt(57) << 8) | (z.charCodeAt(58) << 16) | (z.charCodeAt(59) << 24);
                g = z.charCodeAt(60) | (z.charCodeAt(61) << 8) | (z.charCodeAt(62) << 16) | (z.charCodeAt(63) << 24)
            } else {
                w = z.charCodeAt(0) | (z.charCodeAt(1) << 16);
                v = z.charCodeAt(2) | (z.charCodeAt(3) << 16);
                t = z.charCodeAt(4) | (z.charCodeAt(5) << 16);
                s = z.charCodeAt(6) | (z.charCodeAt(7) << 16);
                p = z.charCodeAt(8) | (z.charCodeAt(9) << 16);
                n = z.charCodeAt(10) | (z.charCodeAt(11) << 16);
                l = z.charCodeAt(12) | (z.charCodeAt(13) << 16);
                h = z.charCodeAt(14) | (z.charCodeAt(15) << 16);
                f = z.charCodeAt(16) | (z.charCodeAt(17) << 16);
                e = z.charCodeAt(18) | (z.charCodeAt(19) << 16);
                u = z.charCodeAt(20) | (z.charCodeAt(21) << 16);
                q = z.charCodeAt(22) | (z.charCodeAt(23) << 16);
                o = z.charCodeAt(24) | (z.charCodeAt(25) << 16);
                m = z.charCodeAt(26) | (z.charCodeAt(27) << 16);
                i = z.charCodeAt(28) | (z.charCodeAt(29) << 16);
                g = z.charCodeAt(30) | (z.charCodeAt(31) << 16)
            }
            C += w + 3614090360 + ((B & A) | (~B & y));
            C = B + ((C << 7) | (C >>> 25));
            y += v + 3905402710 + ((C & B) | (~C & A));
            y = C + ((y << 12) | (y >>> 20));
            A += t + 606105819 + ((y & C) | (~y & B));
            A = y + ((A << 17) | (A >>> 15));
            B += s + 3250441966 + ((A & y) | (~A & C));
            B = A + ((B << 22) | (B >>> 10));
            C += p + 4118548399 + ((B & A) | (~B & y));
            C = B + ((C << 7) | (C >>> 25));
            y += n + 1200080426 + ((C & B) | (~C & A));
            y = C + ((y << 12) | (y >>> 20));
            A += l + 2821735955 + ((y & C) | (~y & B));
            A = y + ((A << 17) | (A >>> 15));
            B += h + 4249261313 + ((A & y) | (~A & C));
            B = A + ((B << 22) | (B >>> 10));
            C += f + 1770035416 + ((B & A) | (~B & y));
            C = B + ((C << 7) | (C >>> 25));
            y += e + 2336552879 + ((C & B) | (~C & A));
            y = C + ((y << 12) | (y >>> 20));
            A += u + 4294925233 + ((y & C) | (~y & B));
            A = y + ((A << 17) | (A >>> 15));
            B += q + 2304563134 + ((A & y) | (~A & C));
            B = A + ((B << 22) | (B >>> 10));
            C += o + 1804603682 + ((B & A) | (~B & y));
            C = B + ((C << 7) | (C >>> 25));
            y += m + 4254626195 + ((C & B) | (~C & A));
            y = C + ((y << 12) | (y >>> 20));
            A += i + 2792965006 + ((y & C) | (~y & B));
            A = y + ((A << 17) | (A >>> 15));
            B += g + 1236535329 + ((A & y) | (~A & C));
            B = A + ((B << 22) | (B >>> 10));
            C += v + 4129170786 + ((B & y) | (A & ~y));
            C = B + ((C << 5) | (C >>> 27));
            y += l + 3225465664 + ((C & A) | (B & ~A));
            y = C + ((y << 9) | (y >>> 23));
            A += q + 643717713 + ((y & B) | (C & ~B));
            A = y + ((A << 14) | (A >>> 18));
            B += w + 3921069994 + ((A & C) | (y & ~C));
            B = A + ((B << 20) | (B >>> 12));
            C += n + 3593408605 + ((B & y) | (A & ~y));
            C = B + ((C << 5) | (C >>> 27));
            y += u + 38016083 + ((C & A) | (B & ~A));
            y = C + ((y << 9) | (y >>> 23));
            A += g + 3634488961 + ((y & B) | (C & ~B));
            A = y + ((A << 14) | (A >>> 18));
            B += p + 3889429448 + ((A & C) | (y & ~C));
            B = A + ((B << 20) | (B >>> 12));
            C += e + 568446438 + ((B & y) | (A & ~y));
            C = B + ((C << 5) | (C >>> 27));
            y += i + 3275163606 + ((C & A) | (B & ~A));
            y = C + ((y << 9) | (y >>> 23));
            A += s + 4107603335 + ((y & B) | (C & ~B));
            A = y + ((A << 14) | (A >>> 18));
            B += f + 1163531501 + ((A & C) | (y & ~C));
            B = A + ((B << 20) | (B >>> 12));
            C += m + 2850285829 + ((B & y) | (A & ~y));
            C = B + ((C << 5) | (C >>> 27));
            y += t + 4243563512 + ((C & A) | (B & ~A));
            y = C + ((y << 9) | (y >>> 23));
            A += h + 1735328473 + ((y & B) | (C & ~B));
            A = y + ((A << 14) | (A >>> 18));
            B += o + 2368359562 + ((A & C) | (y & ~C));
            B = A + ((B << 20) | (B >>> 12));
            C += n + 4294588738 + ((B ^ A) ^ y);
            C = B + ((C << 4) | (C >>> 28));
            y += f + 2272392833 + ((C ^ B) ^ A);
            y = C + ((y << 11) | (y >>> 21));
            A += q + 1839030562 + ((y ^ C) ^ B);
            A = y + ((A << 16) | (A >>> 16));
            B += i + 4259657740 + ((A ^ y) ^ C);
            B = A + ((B << 23) | (B >>> 9));
            C += v + 2763975236 + ((B ^ A) ^ y);
            C = B + ((C << 4) | (C >>> 28));
            y += p + 1272893353 + ((C ^ B) ^ A);
            y = C + ((y << 11) | (y >>> 21));
            A += h + 4139469664 + ((y ^ C) ^ B);
            A = y + ((A << 16) | (A >>> 16));
            B += u + 3200236656 + ((A ^ y) ^ C);
            B = A + ((B << 23) | (B >>> 9));
            C += m + 681279174 + ((B ^ A) ^ y);
            C = B + ((C << 4) | (C >>> 28));
            y += w + 3936430074 + ((C ^ B) ^ A);
            y = C + ((y << 11) | (y >>> 21));
            A += s + 3572445317 + ((y ^ C) ^ B);
            A = y + ((A << 16) | (A >>> 16));
            B += l + 76029189 + ((A ^ y) ^ C);
            B = A + ((B << 23) | (B >>> 9));
            C += e + 3654602809 + ((B ^ A) ^ y);
            C = B + ((C << 4) | (C >>> 28));
            y += o + 3873151461 + ((C ^ B) ^ A);
            y = C + ((y << 11) | (y >>> 21));
            A += g + 530742520 + ((y ^ C) ^ B);
            A = y + ((A << 16) | (A >>> 16));
            B += t + 3299628645 + ((A ^ y) ^ C);
            B = A + ((B << 23) | (B >>> 9));
            C += w + 4096336452 + (A ^ (~y | B));
            C = B + ((C << 6) | (C >>> 26));
            y += h + 1126891415 + (B ^ (~A | C));
            y = C + ((y << 10) | (y >>> 22));
            A += i + 2878612391 + (C ^ (~B | y));
            A = y + ((A << 15) | (A >>> 17));
            B += n + 4237533241 + (y ^ (~C | A));
            B = A + ((B << 21) | (B >>> 11));
            C += o + 1700485571 + (A ^ (~y | B));
            C = B + ((C << 6) | (C >>> 26));
            y += s + 2399980690 + (B ^ (~A | C));
            y = C + ((y << 10) | (y >>> 22));
            A += u + 4293915773 + (C ^ (~B | y));
            A = y + ((A << 15) | (A >>> 17));
            B += v + 2240044497 + (y ^ (~C | A));
            B = A + ((B << 21) | (B >>> 11));
            C += f + 1873313359 + (A ^ (~y | B));
            C = B + ((C << 6) | (C >>> 26));
            y += g + 4264355552 + (B ^ (~A | C));
            y = C + ((y << 10) | (y >>> 22));
            A += l + 2734768916 + (C ^ (~B | y));
            A = y + ((A << 15) | (A >>> 17));
            B += m + 1309151649 + (y ^ (~C | A));
            B = A + ((B << 21) | (B >>> 11));
            C += p + 4149444226 + (A ^ (~y | B));
            C = B + ((C << 6) | (C >>> 26));
            y += q + 3174756917 + (B ^ (~A | C));
            y = C + ((y << 10) | (y >>> 22));
            A += t + 718787259 + (C ^ (~B | y));
            A = y + ((A << 15) | (A >>> 17));
            B += e + 3951481745 + (y ^ (~C | A));
            B = A + ((B << 21) | (B >>> 11));
            this.a_ = (this.a_ + C) & 4294967295;
            this.b_ = (this.b_ + B) & 4294967295;
            this.c_ = (this.c_ + A) & 4294967295;
            this.d_ = (this.d_ + y) & 4294967295
        },
        fillzero: function(c) {
            var a = "";
            for (var b = 0; b < c; b++) {
                a += "\x00"
            }
            return a
        },
        main: function(b, c, f, a, e) {
            if (e == 1) {
                var d = c * 8;
                while (c >= 64) {
                    a[f](b, e);
                    b = b.substr(64);
                    c -= 64
                }
                b += "\x80";
                if (c >= 56) {
                    b += this.fillzero(63 - c);
                    a[f](b, e);
                    b = this.fillzero(56)
                } else {
                    b += this.fillzero(55 - c)
                }
                b += String.fromCharCode(d & 255, (d >>> 8) & 255, (d >>> 16) & 255, d >>> 24);
                b += "\x00\x00\x00\x00";
                a[f](b, e)
            } else {
                var d = c * 16;
                while (c >= 32) {
                    a[f](b, e);
                    b = b.substr(32);
                    c -= 32
                }
                b += "\x80";
                if (c >= 28) {
                    b += this.fillzero(31 - c);
                    a[f](b, e);
                    b = this.fillzero(28)
                } else {
                    b += this.fillzero(27 - c)
                }
                b += String.fromCharCode(d & 65535, d >>> 16);
                b += "\x00\x00";
                a[f](b, e)
            }
        },
        VERSION: "1.0",
        BY_ASCII: 0,
        BY_UTF16: 1,
        calc_Fx: function(b, a) {
            var c = (arguments.length == 2 && a == this.BY_UTF16) ? 2 : 1;
            this.a_ = [8961, 26437];
            this.b_ = [43913, 61389];
            this.c_ = [56574, 39098];
            this.d_ = [21622, 4146];
            this.main(b, b.length, "update_Fx", this, c);
            return this.int2hex8_Fx(this.a_) + this.int2hex8_Fx(this.b_) + this.int2hex8_Fx(this.c_) + this.int2hex8_Fx(this.d_)
        },
        calc_std: function(b, a) {
            var c = (arguments.length == 2 && a == this.BY_UTF16) ? 2 : 1;
            this.a_ = 1732584193;
            this.b_ = 4023233417;
            this.c_ = 2562383102;
            this.d_ = 271733878;
            this.main(b, b.length, "update_std", this, c);
            return this.int2hex8(this.a_) + this.int2hex8(this.b_) + this.int2hex8(this.c_) + this.int2hex8(this.d_)
        }
    },
    SHA1: {
        int16toBE: function(b) {
            b &= 65535;
            if (b < 0) {
                b += 65536
            }
            var a = Number(b).toString(16);
            return new Array(5 - a.length).join("0") + a
        },
        int32toBE: function(a) {
            return this.int16toBE(a >>> 16) + this.int16toBE(a & 65535)
        },
        swap32: function(a) {
            return (a << 24) | ((a << 8) & 16711680) | ((a >> 8) & 65280) | (a >>> 24)
        },
        swap16: function(a) {
            return (a >> 8) | ((a << 8) & 65280)
        },
        put: function(a) {
            a |= 0;
            document.write("0x" + Number(a < 0 ? a + 4294967296 : a).toString(16) + "<br>")
        },
        update_Fx: function(u, l) {
            var w = [];
            var a = [];
            if (l == 1) {
                for (var o = 0; o < 16; o++) {
                    var h = u.charCodeAt(o * 4 + 0);
                    w[o] = u.charCodeAt(o * 4 + 3) | (u.charCodeAt(o * 4 + 2) << 8) | (u.charCodeAt(o * 4 + 1) << 16) | ((h & 7) << 24);
                    a[o] = h >>> 3
                }
            } else {
                for (var o = 0; o < 16; o++) {
                    var h = this.swap16(u.charCodeAt(o * 2 + 0));
                    w[o] = this.swap16(u.charCodeAt(o * 2 + 1)) | ((h & 2047) << 16);
                    a[o] = h >>> 11
                }
            }
            for (var o = 16; o < 80; o++) {
                var s = w[o - 3] ^ w[o - 8] ^ w[o - 14] ^ w[o - 16];
                var v = a[o - 3] ^ a[o - 8] ^ a[o - 14] ^ a[o - 16];
                w[o] = (v >>> 4) | ((s << 1) & 134217727);
                a[o] = (s >>> 26) | ((v << 1) & 31)
            }
            var d = this.H_[0];
            var f = this.H_[1];
            var m = this.H_[2];
            var p = this.H_[3];
            var b = this.H_[4];
            var c = this.H_[5];
            var e = this.H_[6];
            var g = this.H_[7];
            var n = this.H_[8];
            var q = this.H_[9];
            var h;
            for (var o = 0; o < 20; o += 5) {
                n += ((m & b) | (~m & e)) + w[o] + (((d & 4194303) << 5) | f) + 42105241;
                q += ((p & c) | (~p & g)) + a[o] + (d >>> 22) + 11 + (n >>> 27);
                n &= 134217727;
                q &= 31;
                h = (m >>> 2) | ((p & 3) << 25);
                p = (p >>> 2) | ((m & 3) << 3);
                m = h;
                e += ((d & m) | (~d & b)) + w[o + 1] + (((n & 4194303) << 5) | q) + 42105241;
                g += ((f & p) | (~f & c)) + a[o + 1] + (n >>> 22) + 11 + (e >>> 27);
                e &= 134217727;
                g &= 31;
                h = (d >>> 2) | ((f & 3) << 25);
                f = (f >>> 2) | ((d & 3) << 3);
                d = h;
                b += ((n & d) | (~n & m)) + w[o + 2] + (((e & 4194303) << 5) | g) + 42105241;
                c += ((q & f) | (~q & p)) + a[o + 2] + (e >>> 22) + 11 + (b >>> 27);
                b &= 134217727;
                c &= 31;
                h = (n >>> 2) | ((q & 3) << 25);
                q = (q >>> 2) | ((n & 3) << 3);
                n = h;
                m += ((e & n) | (~e & d)) + w[o + 3] + (((b & 4194303) << 5) | c) + 42105241;
                p += ((g & q) | (~g & f)) + a[o + 3] + (b >>> 22) + 11 + (m >>> 27);
                m &= 134217727;
                p &= 31;
                h = (e >>> 2) | ((g & 3) << 25);
                g = (g >>> 2) | ((e & 3) << 3);
                e = h;
                d += ((b & e) | (~b & n)) + w[o + 4] + (((m & 4194303) << 5) | p) + 42105241;
                f += ((c & g) | (~c & q)) + a[o + 4] + (m >>> 22) + 11 + (d >>> 27);
                d &= 134217727;
                f &= 31;
                h = (b >>> 2) | ((c & 3) << 25);
                c = (c >>> 2) | ((b & 3) << 3);
                b = h
            }
            for (var o = 20; o < 40; o += 5) {
                n += (m ^ b ^ e) + w[o] + (((d & 4194303) << 5) | f) + 114944929;
                q += (p ^ c ^ g) + a[o] + (d >>> 22) + 13 + (n >>> 27);
                n &= 134217727;
                q &= 31;
                h = (m >>> 2) | ((p & 3) << 25);
                p = (p >>> 2) | ((m & 3) << 3);
                m = h;
                e += (d ^ m ^ b) + w[o + 1] + (((n & 4194303) << 5) | q) + 114944929;
                g += (f ^ p ^ c) + a[o + 1] + (n >>> 22) + 13 + (e >>> 27);
                e &= 134217727;
                g &= 31;
                h = (d >>> 2) | ((f & 3) << 25);
                f = (f >>> 2) | ((d & 3) << 3);
                d = h;
                b += (n ^ d ^ m) + w[o + 2] + (((e & 4194303) << 5) | g) + 114944929;
                c += (q ^ f ^ p) + a[o + 2] + (e >>> 22) + 13 + (b >>> 27);
                b &= 134217727;
                c &= 31;
                h = (n >>> 2) | ((q & 3) << 25);
                q = (q >>> 2) | ((n & 3) << 3);
                n = h;
                m += (e ^ n ^ d) + w[o + 3] + (((b & 4194303) << 5) | c) + 114944929;
                p += (g ^ q ^ f) + a[o + 3] + (b >>> 22) + 13 + (m >>> 27);
                m &= 134217727;
                p &= 31;
                h = (e >>> 2) | ((g & 3) << 25);
                g = (g >>> 2) | ((e & 3) << 3);
                e = h;
                d += (b ^ e ^ n) + w[o + 4] + (((m & 4194303) << 5) | p) + 114944929;
                f += (c ^ g ^ q) + a[o + 4] + (m >>> 22) + 13 + (d >>> 27);
                d &= 134217727;
                f &= 31;
                h = (b >>> 2) | ((c & 3) << 25);
                c = (c >>> 2) | ((b & 3) << 3);
                b = h
            }
            for (var o = 40; o < 60; o += 5) {
                n += ((m & (b | e)) | (b & e)) + w[o] + (((d & 4194303) << 5) | f) + 119258332;
                q += ((p & (c | g)) | (c & g)) + a[o] + (d >>> 22) + 17 + (n >>> 27);
                n &= 134217727;
                q &= 31;
                h = (m >>> 2) | ((p & 3) << 25);
                p = (p >>> 2) | ((m & 3) << 3);
                m = h;
                e += ((d & (m | b)) | (m & b)) + w[o + 1] + (((n & 4194303) << 5) | q) + 119258332;
                g += ((f & (p | c)) | (p & c)) + a[o + 1] + (n >>> 22) + 17 + (e >>> 27);
                e &= 134217727;
                g &= 31;
                h = (d >>> 2) | ((f & 3) << 25);
                f = (f >>> 2) | ((d & 3) << 3);
                d = h;
                b += ((n & (d | m)) | (d & m)) + w[o + 2] + (((e & 4194303) << 5) | g) + 119258332;
                c += ((q & (f | p)) | (f & p)) + a[o + 2] + (e >>> 22) + 17 + (b >>> 27);
                b &= 134217727;
                c &= 31;
                h = (n >>> 2) | ((q & 3) << 25);
                q = (q >>> 2) | ((n & 3) << 3);
                n = h;
                m += ((e & (n | d)) | (n & d)) + w[o + 3] + (((b & 4194303) << 5) | c) + 119258332;
                p += ((g & (q | f)) | (q & f)) + a[o + 3] + (b >>> 22) + 17 + (m >>> 27);
                m &= 134217727;
                p &= 31;
                h = (e >>> 2) | ((g & 3) << 25);
                g = (g >>> 2) | ((e & 3) << 3);
                e = h;
                d += ((b & (e | n)) | (e & n)) + w[o + 4] + (((m & 4194303) << 5) | p) + 119258332;
                f += ((c & (g | q)) | (g & q)) + a[o + 4] + (m >>> 22) + 17 + (d >>> 27);
                d &= 134217727;
                f &= 31;
                h = (b >>> 2) | ((c & 3) << 25);
                c = (c >>> 2) | ((b & 3) << 3);
                b = h
            }
            for (var o = 60; o < 80; o += 5) {
                n += (m ^ b ^ e) + w[o] + (((d & 4194303) << 5) | f) + 40026582;
                q += (p ^ c ^ g) + a[o] + (d >>> 22) + 25 + (n >>> 27);
                n &= 134217727;
                q &= 31;
                h = (m >>> 2) | ((p & 3) << 25);
                p = (p >>> 2) | ((m & 3) << 3);
                m = h;
                e += (d ^ m ^ b) + w[o + 1] + (((n & 4194303) << 5) | q) + 40026582;
                g += (f ^ p ^ c) + a[o + 1] + (n >>> 22) + 25 + (e >>> 27);
                e &= 134217727;
                g &= 31;
                h = (d >>> 2) | ((f & 3) << 25);
                f = (f >>> 2) | ((d & 3) << 3);
                d = h;
                b += (n ^ d ^ m) + w[o + 2] + (((e & 4194303) << 5) | g) + 40026582;
                c += (q ^ f ^ p) + a[o + 2] + (e >>> 22) + 25 + (b >>> 27);
                b &= 134217727;
                c &= 31;
                h = (n >>> 2) | ((q & 3) << 25);
                q = (q >>> 2) | ((n & 3) << 3);
                n = h;
                m += (e ^ n ^ d) + w[o + 3] + (((b & 4194303) << 5) | c) + 40026582;
                p += (g ^ q ^ f) + a[o + 3] + (b >>> 22) + 25 + (m >>> 27);
                m &= 134217727;
                p &= 31;
                h = (e >>> 2) | ((g & 3) << 25);
                g = (g >>> 2) | ((e & 3) << 3);
                e = h;
                d += (b ^ e ^ n) + w[o + 4] + (((m & 4194303) << 5) | p) + 40026582;
                f += (c ^ g ^ q) + a[o + 4] + (m >>> 22) + 25 + (d >>> 27);
                d &= 134217727;
                f &= 31;
                h = (b >>> 2) | ((c & 3) << 25);
                c = (c >>> 2) | ((b & 3) << 3);
                b = h
            }
            h = this.H_[0] + d;
            this.H_[1] = (this.H_[1] + f + (h >>> 27)) & 31;
            this.H_[0] = h & 134217727;
            h = this.H_[2] + m;
            this.H_[3] = (this.H_[3] + p + (h >>> 27)) & 31;
            this.H_[2] = h & 134217727;
            h = this.H_[4] + b;
            this.H_[5] = (this.H_[5] + c + (h >>> 27)) & 31;
            this.H_[4] = h & 134217727;
            h = this.H_[6] + e;
            this.H_[7] = (this.H_[7] + g + (h >>> 27)) & 31;
            this.H_[6] = h & 134217727;
            h = this.H_[8] + n;
            this.H_[9] = (this.H_[9] + q + (h >>> 27)) & 31;
            this.H_[8] = h & 134217727
        },
        update_std: function(x, Z) {
            var V, U, S, Q, O, N, M, L, K, I;
            var H, G, F, E, D, C, B, A, z, y;
            var w, v, s, p, n, l, i, h, g, f;
            var Y, X, W, T, R, P;
            if (Z == 1) {
                V = x.charCodeAt(3) | (x.charCodeAt(2) << 8) | (x.charCodeAt(1) << 16) | (x.charCodeAt(0) << 24);
                U = x.charCodeAt(7) | (x.charCodeAt(6) << 8) | (x.charCodeAt(5) << 16) | (x.charCodeAt(4) << 24);
                S = x.charCodeAt(11) | (x.charCodeAt(10) << 8) | (x.charCodeAt(9) << 16) | (x.charCodeAt(8) << 24);
                Q = x.charCodeAt(15) | (x.charCodeAt(14) << 8) | (x.charCodeAt(13) << 16) | (x.charCodeAt(12) << 24);
                O = x.charCodeAt(19) | (x.charCodeAt(18) << 8) | (x.charCodeAt(17) << 16) | (x.charCodeAt(16) << 24);
                N = x.charCodeAt(23) | (x.charCodeAt(22) << 8) | (x.charCodeAt(21) << 16) | (x.charCodeAt(20) << 24);
                M = x.charCodeAt(27) | (x.charCodeAt(26) << 8) | (x.charCodeAt(25) << 16) | (x.charCodeAt(24) << 24);
                L = x.charCodeAt(31) | (x.charCodeAt(30) << 8) | (x.charCodeAt(29) << 16) | (x.charCodeAt(28) << 24);
                K = x.charCodeAt(35) | (x.charCodeAt(34) << 8) | (x.charCodeAt(33) << 16) | (x.charCodeAt(32) << 24);
                I = x.charCodeAt(39) | (x.charCodeAt(38) << 8) | (x.charCodeAt(37) << 16) | (x.charCodeAt(36) << 24);
                H = x.charCodeAt(43) | (x.charCodeAt(42) << 8) | (x.charCodeAt(41) << 16) | (x.charCodeAt(40) << 24);
                G = x.charCodeAt(47) | (x.charCodeAt(46) << 8) | (x.charCodeAt(45) << 16) | (x.charCodeAt(44) << 24);
                F = x.charCodeAt(51) | (x.charCodeAt(50) << 8) | (x.charCodeAt(49) << 16) | (x.charCodeAt(48) << 24);
                E = x.charCodeAt(55) | (x.charCodeAt(54) << 8) | (x.charCodeAt(53) << 16) | (x.charCodeAt(52) << 24);
                D = x.charCodeAt(59) | (x.charCodeAt(58) << 8) | (x.charCodeAt(57) << 16) | (x.charCodeAt(56) << 24);
                C = x.charCodeAt(63) | (x.charCodeAt(62) << 8) | (x.charCodeAt(61) << 16) | (x.charCodeAt(60) << 24)
            } else {
                V = this.swap32(x.charCodeAt(0) | (x.charCodeAt(1) << 16));
                U = this.swap32(x.charCodeAt(2) | (x.charCodeAt(3) << 16));
                S = this.swap32(x.charCodeAt(4) | (x.charCodeAt(5) << 16));
                Q = this.swap32(x.charCodeAt(6) | (x.charCodeAt(7) << 16));
                O = this.swap32(x.charCodeAt(8) | (x.charCodeAt(9) << 16));
                N = this.swap32(x.charCodeAt(10) | (x.charCodeAt(11) << 16));
                M = this.swap32(x.charCodeAt(12) | (x.charCodeAt(13) << 16));
                L = this.swap32(x.charCodeAt(14) | (x.charCodeAt(15) << 16));
                K = this.swap32(x.charCodeAt(16) | (x.charCodeAt(17) << 16));
                I = this.swap32(x.charCodeAt(18) | (x.charCodeAt(19) << 16));
                H = this.swap32(x.charCodeAt(20) | (x.charCodeAt(21) << 16));
                G = this.swap32(x.charCodeAt(22) | (x.charCodeAt(23) << 16));
                F = this.swap32(x.charCodeAt(24) | (x.charCodeAt(25) << 16));
                E = this.swap32(x.charCodeAt(26) | (x.charCodeAt(27) << 16));
                D = this.swap32(x.charCodeAt(28) | (x.charCodeAt(29) << 16));
                C = this.swap32(x.charCodeAt(30) | (x.charCodeAt(31) << 16))
            }
            var ae = this.H_[0];
            var ad = this.H_[1];
            var ac = this.H_[2];
            var ab = this.H_[3];
            var aa = this.H_[4];
            var u = 1518500249;
            var q = 1859775393;
            var o = 2400959708;
            var m = 3395469782;
            var J;
            J = E ^ K ^ S ^ V;
            B = (J << 1) | (J >>> 31);
            J = D ^ I ^ Q ^ U;
            A = (J << 1) | (J >>> 31);
            J = C ^ H ^ O ^ S;
            z = (J << 1) | (J >>> 31);
            J = B ^ G ^ N ^ Q;
            y = (J << 1) | (J >>> 31);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & ac) | (~ad & ab)) + V + u;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & ad) | (~ae & ac)) + U + u;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & ae) | (~aa & ad)) + S + u;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & aa) | (~ab & ae)) + Q + u;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & ab) | (~ac & aa)) + O + u;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & ac) | (~ad & ab)) + N + u;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & ad) | (~ae & ac)) + M + u;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & ae) | (~aa & ad)) + L + u;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & aa) | (~ab & ae)) + K + u;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & ab) | (~ac & aa)) + I + u;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & ac) | (~ad & ab)) + H + u;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & ad) | (~ae & ac)) + G + u;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & ae) | (~aa & ad)) + F + u;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & aa) | (~ab & ae)) + E + u;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & ab) | (~ac & aa)) + D + u;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & ac) | (~ad & ab)) + C + u;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & ad) | (~ae & ac)) + B + u;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & ae) | (~aa & ad)) + A + u;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & aa) | (~ab & ae)) + z + u;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & ab) | (~ac & aa)) + y + u;
            ac = (ac << 30) | (ac >>> 2);
            J = A ^ F ^ M ^ O;
            w = (J << 1) | (J >>> 31);
            J = z ^ E ^ L ^ N;
            v = (J << 1) | (J >>> 31);
            J = y ^ D ^ K ^ M;
            s = (J << 1) | (J >>> 31);
            J = w ^ C ^ I ^ L;
            p = (J << 1) | (J >>> 31);
            J = v ^ B ^ H ^ K;
            n = (J << 1) | (J >>> 31);
            J = s ^ A ^ G ^ I;
            l = (J << 1) | (J >>> 31);
            J = p ^ z ^ F ^ H;
            i = (J << 1) | (J >>> 31);
            J = n ^ y ^ E ^ G;
            h = (J << 1) | (J >>> 31);
            J = l ^ w ^ D ^ F;
            g = (J << 1) | (J >>> 31);
            J = i ^ v ^ C ^ E;
            f = (J << 1) | (J >>> 31);
            J = h ^ s ^ B ^ D;
            Y = (J << 1) | (J >>> 31);
            J = g ^ p ^ A ^ C;
            X = (J << 1) | (J >>> 31);
            J = f ^ n ^ z ^ B;
            W = (J << 1) | (J >>> 31);
            J = Y ^ l ^ y ^ A;
            T = (J << 1) | (J >>> 31);
            J = X ^ i ^ w ^ z;
            R = (J << 1) | (J >>> 31);
            J = W ^ h ^ v ^ y;
            P = (J << 1) | (J >>> 31);
            J = T ^ g ^ s ^ w;
            V = (J << 1) | (J >>> 31);
            J = R ^ f ^ p ^ v;
            U = (J << 1) | (J >>> 31);
            J = P ^ Y ^ n ^ s;
            S = (J << 1) | (J >>> 31);
            J = V ^ X ^ l ^ p;
            Q = (J << 1) | (J >>> 31);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + w + q;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + v + q;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + s + q;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + p + q;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + n + q;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + l + q;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + i + q;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + h + q;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + g + q;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + f + q;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + Y + q;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + X + q;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + W + q;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + T + q;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + R + q;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + P + q;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + V + q;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + U + q;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + S + q;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + Q + q;
            ac = (ac << 30) | (ac >>> 2);
            J = U ^ W ^ i ^ n;
            O = (J << 1) | (J >>> 31);
            J = S ^ T ^ h ^ l;
            N = (J << 1) | (J >>> 31);
            J = Q ^ R ^ g ^ i;
            M = (J << 1) | (J >>> 31);
            J = O ^ P ^ f ^ h;
            L = (J << 1) | (J >>> 31);
            J = N ^ V ^ Y ^ g;
            K = (J << 1) | (J >>> 31);
            J = M ^ U ^ X ^ f;
            I = (J << 1) | (J >>> 31);
            J = L ^ S ^ W ^ Y;
            H = (J << 1) | (J >>> 31);
            J = K ^ Q ^ T ^ X;
            G = (J << 1) | (J >>> 31);
            J = I ^ O ^ R ^ W;
            F = (J << 1) | (J >>> 31);
            J = H ^ N ^ P ^ T;
            E = (J << 1) | (J >>> 31);
            J = G ^ M ^ V ^ R;
            D = (J << 1) | (J >>> 31);
            J = F ^ L ^ U ^ P;
            C = (J << 1) | (J >>> 31);
            J = E ^ K ^ S ^ V;
            B = (J << 1) | (J >>> 31);
            J = D ^ I ^ Q ^ U;
            A = (J << 1) | (J >>> 31);
            J = C ^ H ^ O ^ S;
            z = (J << 1) | (J >>> 31);
            J = B ^ G ^ N ^ Q;
            y = (J << 1) | (J >>> 31);
            J = A ^ F ^ M ^ O;
            w = (J << 1) | (J >>> 31);
            J = z ^ E ^ L ^ N;
            v = (J << 1) | (J >>> 31);
            J = y ^ D ^ K ^ M;
            s = (J << 1) | (J >>> 31);
            J = w ^ C ^ I ^ L;
            p = (J << 1) | (J >>> 31);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & (ac | ab)) | (ac & ab)) + O + o;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & (ad | ac)) | (ad & ac)) + N + o;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & (ae | ad)) | (ae & ad)) + M + o;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & (aa | ae)) | (aa & ae)) + L + o;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & (ab | aa)) | (ab & aa)) + K + o;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & (ac | ab)) | (ac & ab)) + I + o;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & (ad | ac)) | (ad & ac)) + H + o;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & (ae | ad)) | (ae & ad)) + G + o;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & (aa | ae)) | (aa & ae)) + F + o;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & (ab | aa)) | (ab & aa)) + E + o;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & (ac | ab)) | (ac & ab)) + D + o;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & (ad | ac)) | (ad & ac)) + C + o;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & (ae | ad)) | (ae & ad)) + B + o;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & (aa | ae)) | (aa & ae)) + A + o;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & (ab | aa)) | (ab & aa)) + z + o;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + ((ad & (ac | ab)) | (ac & ab)) + y + o;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + ((ae & (ad | ac)) | (ad & ac)) + w + o;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + ((aa & (ae | ad)) | (ae & ad)) + v + o;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + ((ab & (aa | ae)) | (aa & ae)) + s + o;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + ((ac & (ab | aa)) | (ab & aa)) + p + o;
            ac = (ac << 30) | (ac >>> 2);
            J = v ^ B ^ H ^ K;
            n = (J << 1) | (J >>> 31);
            J = s ^ A ^ G ^ I;
            l = (J << 1) | (J >>> 31);
            J = p ^ z ^ F ^ H;
            i = (J << 1) | (J >>> 31);
            J = n ^ y ^ E ^ G;
            h = (J << 1) | (J >>> 31);
            J = l ^ w ^ D ^ F;
            g = (J << 1) | (J >>> 31);
            J = i ^ v ^ C ^ E;
            f = (J << 1) | (J >>> 31);
            J = h ^ s ^ B ^ D;
            Y = (J << 1) | (J >>> 31);
            J = g ^ p ^ A ^ C;
            X = (J << 1) | (J >>> 31);
            J = f ^ n ^ z ^ B;
            W = (J << 1) | (J >>> 31);
            J = Y ^ l ^ y ^ A;
            T = (J << 1) | (J >>> 31);
            J = X ^ i ^ w ^ z;
            R = (J << 1) | (J >>> 31);
            J = W ^ h ^ v ^ y;
            P = (J << 1) | (J >>> 31);
            J = T ^ g ^ s ^ w;
            V = (J << 1) | (J >>> 31);
            J = R ^ f ^ p ^ v;
            U = (J << 1) | (J >>> 31);
            J = P ^ Y ^ n ^ s;
            S = (J << 1) | (J >>> 31);
            J = V ^ X ^ l ^ p;
            Q = (J << 1) | (J >>> 31);
            J = U ^ W ^ i ^ n;
            O = (J << 1) | (J >>> 31);
            J = S ^ T ^ h ^ l;
            N = (J << 1) | (J >>> 31);
            J = Q ^ R ^ g ^ i;
            M = (J << 1) | (J >>> 31);
            J = O ^ P ^ f ^ h;
            L = (J << 1) | (J >>> 31);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + n + m;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + l + m;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + i + m;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + h + m;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + g + m;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + f + m;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + Y + m;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + X + m;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + W + m;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + T + m;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + R + m;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + P + m;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + V + m;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + U + m;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + S + m;
            ac = (ac << 30) | (ac >>> 2);
            aa += ((ae << 5) | (ae >>> 27)) + (ad ^ ac ^ ab) + Q + m;
            ad = (ad << 30) | (ad >>> 2);
            ab += ((aa << 5) | (aa >>> 27)) + (ae ^ ad ^ ac) + O + m;
            ae = (ae << 30) | (ae >>> 2);
            ac += ((ab << 5) | (ab >>> 27)) + (aa ^ ae ^ ad) + N + m;
            aa = (aa << 30) | (aa >>> 2);
            ad += ((ac << 5) | (ac >>> 27)) + (ab ^ aa ^ ae) + M + m;
            ab = (ab << 30) | (ab >>> 2);
            ae += ((ad << 5) | (ad >>> 27)) + (ac ^ ab ^ aa) + L + m;
            ac = (ac << 30) | (ac >>> 2);
            this.H_[0] = (this.H_[0] + ae) & 4294967295;
            this.H_[1] = (this.H_[1] + ad) & 4294967295;
            this.H_[2] = (this.H_[2] + ac) & 4294967295;
            this.H_[3] = (this.H_[3] + ab) & 4294967295;
            this.H_[4] = (this.H_[4] + aa) & 4294967295
        },
        fillzero: function(c) {
            var a = "";
            for (var b = 0; b < c; b++) {
                a += "\x00"
            }
            return a
        },
        main: function(b, c, f, a, e) {
            if (e == 1) {
                var d = c * 8;
                while (c >= 64) {
                    a[f](b, e);
                    b = b.substr(64);
                    c -= 64
                }
                b += "\x80";
                if (c >= 56) {
                    b += this.fillzero(63 - c);
                    a[f](b, e);
                    b = this.fillzero(56)
                } else {
                    b += this.fillzero(55 - c)
                }
                b += "\x00\x00\x00\x00";
                b += String.fromCharCode(d >>> 24, (d >>> 16) & 255, (d >>> 8) & 255, d & 255);
                a[f](b, e)
            } else {
                var d = c * 16;
                while (c >= 32) {
                    a[f](b, e);
                    b = b.substr(32);
                    c -= 32
                }
                b += "\x80";
                if (c >= 28) {
                    b += this.fillzero(31 - c);
                    a[f](b, e);
                    b = this.fillzero(28)
                } else {
                    b += this.fillzero(27 - c)
                }
                b += "\x00\x00";
                d = this.swap32(d);
                b += String.fromCharCode(d & 65535, d >>> 16);
                a[f](b, e)
            }
        },
        VERSION: "1.0",
        BY_ASCII: 0,
        BY_UTF16: 1,
        calc_Fx: function(d, c) {
            var e = (arguments.length == 2 && c == this.BY_UTF16) ? 2 : 1;
            this.H_ = [121971457, 12, 130919305, 29, 12246270, 19, 3298422, 2, 64152048, 24];
            this.main(d, d.length, "update_Fx", this, e);
            var a = "";
            for (var b = 0; b < 5; b++) {
                a += this.int32toBE((this.H_[2 * b + 1] << 27) + this.H_[2 * b])
            }
            return a
        },
        calc_std: function(d, c) {
            var e = (arguments.length == 2 && c == this.BY_UTF16) ? 2 : 1;
            this.H_ = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            this.main(d, d.length, "update_std", this, e);
            var a = "";
            for (var b = 0; b < 5; b++) {
                a += this.int32toBE(this.H_[b])
            }
            return a
        }
    }
};
new function() {
    HashLibrary.MD5.calc = navigator.userAgent.match(/Firefox/) ? HashLibrary.MD5.calc_Fx : HashLibrary.MD5.calc_std;
    HashLibrary.SHA1.calc = HashLibrary.SHA1.calc_std
}
;
var _ua = (function() {
    return {
        ltIE6: typeof window.addEventListener == "undefined" && typeof document.documentElement.style.maxHeight == "undefined",
        ltIE7: typeof window.addEventListener == "undefined" && typeof document.querySelectorAll == "undefined",
        ltIE8: typeof window.addEventListener == "undefined" && typeof document.getElementsByClassName == "undefined",
        ltIE9: document.uniqueID && typeof window.matchMedia == "undefined",
        gtIE10: document.uniqueID && window.matchMedia,
        Trident: document.uniqueID,
        Gecko: "MozAppearance"in document.documentElement.style,
        Presto: window.opera,
        Blink: window.chrome,
        Webkit: typeof window.chrome == "undefined" && "WebkitAppearance"in document.documentElement.style,
        Touch: typeof document.ontouchstart != "undefined",
        Mobile: typeof window.orientation != "undefined",
        ltAd4_4: typeof window.orientation != "undefined" && typeof (EventSource) == "undefined",
        Pointer: window.navigator.pointerEnabled,
        MSPoniter: window.navigator.msPointerEnabled,
        isIE: (this.ltIE6 || this.ltIE7 || this.ltIE8 || this.ltIE9 || this.gtIE10 || this.Trident) ? true : false
    }
}
)();
$.browser = _ua;
var userAgent = window.navigator.userAgent.toLowerCase();
if (userAgent.indexOf("window") > -1) {
    os_nm = "Windows";
    if (userAgent.indexOf("window phone") > -1) {
        os_nm = "Windows Phone"
    }
} else {
    if (userAgent.indexOf("linux") > -1) {
        os_nm = "Linux";
        if (userAgent.indexOf("android") > -1) {
            os_nm = "Android"
        }
    } else {
        if (userAgent.indexOf("mac") > -1) {
            os_nm = "Mac";
            if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1) {
                os_nm = "iOS"
            }
        } else {
            os_nm = "Unknown"
        }
    }
}
$.os = {
    windows: (os_nm == "Windows"),
    linux: (os_nm == "Linux"),
    mac: (os_nm == "Mac"),
    android: (os_nm == "Android"),
    ios: (os_nm == "iOS"),
    is_iOS: (os_nm == "iOS") ? true : false,
    is_Android: (os_nm == "Android") ? true : false,
    is_Pc: (os_nm != "iOS" && os_nm != "Android") ? true : false
};
function Loading(h, e) {
    var g = {
        radius: 80,
        dotRadius: 6,
        backgroundColor: "#ffffff",
        iconColor: "rgb(0,0,255)",
        interval: 40
    };
    if (typeof (e) == "object") {
        g.radius = e.radius ? e.radius : g.radius;
        g.color = e.color ? e.color : g.color;
        g.dotRadius = e.dotRadius ? e.dotRadius : g.dotRadius;
        g.backgroundColor = e.backgroundColor ? e.backgroundColor : g.backgroundColor;
        g.iconColor = e.iconColor ? e.iconColor : g.iconColor;
        g.interval = e.interval ? e.interval : g.interval
    }
    this.radius = g.radius;
    this.x = g.radius / 2;
    this.y = g.radius / 2;
    this.iconColor = g.iconColor;
    this.dotRadius = g.dotRadius;
    this.backgroundColor = g.backgroundColor;
    this.opacity = 1;
    this.numDots = 8;
    this.dots = new Array();
    this.degrees = Math.PI * 2 / this.numDots;
    this.interval = g.interval;
    if (typeof h == "string") {
        h = $("#" + h)
    } else {
        if (!(h instanceof jQuery)) {
            h = $(h)
        }
    }
    var c = document.createElement("div");
    $(c).css({
        width: "100%",
        height: "100%",
        position: "absolute",
        left: "0",
        top: "0",
        "z-index": "9999",
        visibility: "hidden",
        "text-align": "center",
        "vertical-align": "middle",
        "background-color": this.backgroundColor
    }).appendTo(h);
    this._loadingContainer = $(c);
    var d = '<canvas width="' + this.radius + '" height="' + this.radius + '"></canvas>';
    var b = "<div></div>";
    this._loadingPanel = $(b).appendTo(this._loadingContainer).css({
        position: "absolute",
        top: "50%",
        left: "50%",
        margin: (0 - this.radius / 2) + "px 0 0 " + (0 - this.radius / 2) + "px",
        width: this.radius + "px",
        height: this.radius + "px"
    });
    this._loadingCanvas = $(d).appendTo(this._loadingPanel).css({
        position: "relative",
        width: "100%",
        height: "100%"
    });
    this._loadingCanvasCtx = this._loadingCanvas.get(0).getContext("2d");
    for (var f = 0; f < this.numDots; f++) {
        var a = f + 1;
        this.dots.push({
            x: Math.cos(this.degrees * a) * this.radius / Math.PI,
            y: Math.sin(this.degrees * a) * this.radius / Math.PI,
            opacity: Math.ceil(a / this.numDots * 10) / 10
        })
    }
    this.isDraw = false;
    this.draw = function() {
        this._loadingCanvasCtx.restore();
        var m = this._loadingPanel.width();
        var l = this._loadingPanel.height();
        this._loadingCanvasCtx.clearRect(0, 0, this.radius, this.radius);
        this._loadingCanvasCtx.globalAlpha = 1;
        this._loadingCanvasCtx.fillStyle = this.backgroundColor;
        this._loadingCanvasCtx.fillRect(0, 0, this.radius, this.radius);
        var i = this.dots.length;
        for (f = 0; f < i; f++) {
            this.dots[f].opacity -= 1 / this.numDots;
            if (this.dots[f].opacity < 0) {
                this.dots[f].opacity = 1
            }
            this._loadingCanvasCtx.beginPath();
            this._loadingCanvasCtx.globalAlpha = this.dots[f].opacity;
            this._loadingCanvasCtx.fillStyle = this.iconColor;
            this._loadingCanvasCtx.arc((this.dots[f].x + (this.radius / 2)) | 0, (this.dots[f].y + (this.radius / 2)) | 0, this.dotRadius | 0, 0, Math.PI * 2, true);
            this._loadingCanvasCtx.fill()
        }
        this._loadingCanvasCtx.save()
    }
    ;
    this._loadingCanvasCtx.save();
    this.start = function() {
        if (!this.isDraw) {
            this.draw();
            this.isDraw = true
        }
        this._loadingContainer.css("visibility", "visible");
        if (this.IndicatorAnimation) {
            return
        }
        this.IndicatorAnimation = AnimationLibrary.startRotate(this._loadingCanvas, 10, this.interval)
    }
    ;
    this.stop = function() {
        this._loadingContainer.css("visibility", "hidden");
        if (null == this.IndicatorAnimation) {
            return
        }
        AnimationLibrary.stopRotate(this.IndicatorAnimation);
        delete this.IndicatorAnimation
    }
}
(function(a) {
    window.StorageManager = {
        canUseStorage: (window.localStorage) ? true : false,
        getItem: function(b) {
            if (this.canUseStorage) {
                return window.localStorage.getItem(b)
            } else {
                return a.cookie(b)
            }
        },
        setItem: function(b, c) {
            if (null == c || c == "") {
                if (this.canUseStorage) {
                    return window.localStorage.removeItem(b)
                } else {
                    return a.cookie(b, null)
                }
            } else {
                if (this.canUseStorage) {
                    return window.localStorage.setItem(b, c)
                } else {
                    return a.cookie(b, c)
                }
            }
        }
    }
}
)($);
var H5V_Navigation = function(a) {
    this.initialize.apply(this, arguments)
};
H5V_Navigation.prototype = {
    initialize: function(a) {
        this.xml = a
    },
    start: function() {
        var b = this;
        this.initDisplaySettings();
        this.isDoublePageMode = this.isDoublePage();
        var f = null;
        if (1 != h5vParams.paramLastClose && contentsXmlParams.buyUrl in this.xml && "" != this.xml[contentsXmlParams.buyUrl]["url"]) {
            f = this.xml[contentsXmlParams.buyUrl]["url"]
        }
        this.Pager = new PageManager(this.xml,f,applicationSettings.pageStuffMode);
        this.Pager.initialize(this.isDoublePageMode);
        this.DownloadPuzzleImageCue = new CueManager();
        this.DownloadPuzzleJsonCue = new CueManager();
        this._DownloadPuzzleImageInterval = setInterval(function() {
            var g = b.DownloadPuzzleImageCue.shiftCue();
            if (null != g && 0 <= g) {
                b._downloadPuzzleImage(g)
            }
            g = b.DownloadPuzzleJsonCue.shiftCue();
            if (null != g && 0 <= g) {
                b._downloadPuzzleJson(g)
            }
        }, 300);
        var e = "";
        for (var d = 0, a = h5vParams.contentsKeys.length; d < a; d++) {
            var c = h5vParams.contentsKeys[d];
            e += c
        }
        this._resumeKey = e;
        this._resumeData = StorageManager.getItem(e);
        if (null != this._resumeData) {
            this._resumeData = JSON.parse(this._resumeData)
        }
        if (typeof this._resumeData == "number") {
            this._resumeData = {
                pageNo: this._resumeData
            }
        }
        this.registDialog();
        $(this).trigger("init");
        H5V.Connector.downloadNombre(function(g) {
            b._initializeNombre(g)
        });
        this.addNavigationEvents();
        this.ScrollView = new H5V_ScrollView("H5V_CONTENTS_CONTAINER",0,this.UserSettings.scrollDirection,this.UserSettings.horizontalFit,this.Pager);
        $(this.ScrollView).on("pagedemand", function(h, g) {
            b._downloadPage(g)
        }).on("pagechanging", function(h, g) {
            $(b).trigger("pagechanging", [g])
        }).on("pagechanged", function(h, g) {
            if (b._resumeKey && g.newValue.page_noes[0] >= 0) {
                b.setResumeData("pageNo", g.newValue.page_noes[0])
            }
            b.dispButtomCheck();
            b.PageNoes = g.newValue.page_noes;
            b.pauseKeyEventCapture = false;
            if (g.newValue.page_noes[0] < 0) {
                b.GestureService.isBubling = true;
                $(b).trigger("htmlshown.lastpage", [g.newValue.page_noes])
            } else {
                b.GestureService.isBubling = false
            }
            $(b).trigger("pagechanged", [g])
        }).on("pagedraw", function(h, g) {
            b.dispButtomCheck();
            $(b).trigger("pagedraw", [g])
        }).on("disposing", function(h, g) {
            b.DownloadPuzzleImageCue.deleteCue(g);
            b.DownloadPuzzleJsonCue.deleteCue(g);
            $(b).trigger("disposing", [g])
        }).on("dispose", function(h, g) {
            $(b).trigger("dispose", [g])
        }).on("horizontalfitchange", function(g, h) {
            b.dispButtomCheck();
            $(b).trigger("directionlock", [h, b.UserSettings.scrollDirection])
        }).on("scrollstart", function(g) {
            b.hideController()
        }).on("holdend", function() {
            if (applicationSettings.useLoupe && $.os.is_Pc) {
                b.startGestureHandle()
            }
        }).on("displastpage", function(g) {
            if (null != b.Pager.lastHtmlPageUrl && "" != b.Pager.lastHtmlPageUrl) {
                /*if (applicationSettings.lastPageType == 2) {
                    jConfirm(TranslateMessages.message.msg_lastpage_jump, TranslateMessages.message.title_confirm, function(h) {
                        if (h == true) {
                            b.ScrollView.getCurrentPageView().clear();
                            window.location.href = b.Pager.lastHtmlPageUrl
                        }
                    }, TranslateMessages.message.btn_yes, TranslateMessages.message.btn_no)
                } else {
                    if (applicationSettings.lastPageType != 1) {
                        $("#H5V_SPLASH_SCREEN").css("display", "block");
                        window.location.href = b.Pager.lastHtmlPageUrl
                    }
                }*/
            }
        });
        if (applicationSettings.useWaterMark && contentsXmlParams.customerId in this.xml) {
            applicationSettings.waterMarkText = this.xml[contentsXmlParams.customerId]["id"];
            this.ScrollView.setWaterMark(applicationSettings.waterMarkText)
        }
        ResizeAgent.trigger(window);
        this._downloadThumbnail();
        this.startResume();
        this.dispButtomCheck();
        $(this).trigger("directionchange", [this.ScrollView.DispDirection])
    },
    dispButtomCheck: function() {
        if (this.ScrollView.DispDirection == 1) {
            if (this.ScrollView.canMovePrev()) {
                $("#NAVI_TOP").css("display", "block")
            } else {
                $("#NAVI_TOP").css("display", "none")
            }
            if (this.ScrollView.canMoveNext()) {
                $("#NAVI_BOTTOM").css("display", "block")
            } else {
                $("#NAVI_BOTTOM").css("display", "none")
            }
            $("#NAVI_LEFT").css("display", "none");
            $("#NAVI_RIGHT").css("display", "none")
        } else {
            if (this.ScrollView.canMoveLeft()) {
                $("#NAVI_LEFT").css("display", "block")
            } else {
                $("#NAVI_LEFT").css("display", "none")
            }
            if (this.ScrollView.canMoveRight()) {
                $("#NAVI_RIGHT").css("display", "block")
            } else {
                $("#NAVI_RIGHT").css("display", "none")
            }
            $("#NAVI_TOP").css("display", "none");
            $("#NAVI_BOTTOM").css("display", "none")
        }
    },
    initDisplaySettings: function() {
        var a = StorageManager.getItem("h5v_settings");
        if (null != a) {
            a = JSON.parse(a);
            if (!("horizontalFit"in a)) {
                a.horizontalFit = 1
            }
        } else {
            a = {
                horizontalFit: 1,
                scrollDirection: 0,
                scrollAnimation: 1
            }
        }
        if ($.os.is_Pc) {
            a.horizontalFit = 0
        }
        this.UserSettings = a;
        $("[data-translate]").each(function() {
            var b = $(this).data("translate");
            var c = b.split(":");
            var d = TranslateMessages[c[0]][c[1]];
            if (typeof d != "undefined" && null != d) {
                $(this).html(d)
            }
        })
    },
    getTranslateText: function(a) {
        var b = a.split(":");
        var c = TranslateMessages[b[0]][b[1]];
        return c
    },
    setUserSetting: function(b, c) {
        var a = this;
        setTimeout(function() {
            switch (b) {
            case "horizontal_fit":
                if (a.UserSettings.horizontalFit == parseInt(c)) {
                    return
                }
                a.UserSettings.horizontalFit = parseInt(c);
                a.pageViewModeChange();
                a.dispButtomCheck();
                break;
            case "scroll_direction":
                if (a.UserSettings.scrollDirection == parseInt(c)) {
                    return
                }
                a.UserSettings.scrollDirection = parseInt(c);
                $("#NAVI_LEFT").css("display", "none");
                $("#NAVI_RIGHT").css("display", "none");
                $("#NAVI_TOP").css("display", "none");
                $("#NAVI_BOTTOM").css("display", "none");
                a.ScrollView.directionChange(a.UserSettings.scrollDirection);
                a.dispButtomCheck();
                $(a).trigger("directionchange", [a.UserSettings.scrollDirection]);
                break;
            case "scroll_animation":
                if (a.UserSettings.scrollAnimation == parseInt(c)) {
                    return
                }
                a.UserSettings.scrollAnimation = parseInt(c);
                break
            }
            StorageManager.setItem("h5v_settings", JSON.stringify(a.UserSettings))
        }, 100)
    },
    registDialog: function(b, c) {
        if (!this._dialog) {
            this._dialog = {}
        }
        if (b && c) {
            this._dialog[b] = c;
            return
        }
        var a = this;
        $(".h5v-dialog").each(function() {
            var d = $(this).data("key");
            var e = this.id;
            if (d && e) {
                a._dialog[d] = e
            }
        })
    },
    addNavigationEvents: function() {
        var _self = this;
        if (!$.os.is_Pc) {
            _self._isPauseResizeEvent = false;
            _self._isPausingOrientationChanged = false;
            _self._focusTarget = null;
            var focuscheck_type = ["text", "textarea", "search", "tel", "url", "email", "password"];
            $(document).on("DOMFocusIn", function(e) {
                if (!e.target) {
                    return
                }
                var is_target = false;
                for (var i = 0; i < focuscheck_type.length; i++) {
                    if (e.target.type === focuscheck_type[i]) {
                        is_target = true;
                        break
                    }
                }
                if (!is_target) {
                    return
                }
                _self._focusTarget = e.target;
                _self._isStopResizeEvent = true
            }).on("DOMFocusOut", function(e) {
                if (null == _self._focusTarget || _self._focusTarget != e.target) {
                    return
                }
                _self._focusTarget = null;
                setTimeout(function() {
                    if (null != _self._focusTarget) {
                        return
                    }
                    _self._isStopResizeEvent = false;
                    if (_self._isPausingOrientationChanged) {
                        ResizeAgent.trigger(window)
                    }
                }, 1000)
            });
            $(window).on("orientationchange", function() {
                _self._isPausingOrientationChanged = true
            })
        }
        ResizeAgent.attach(window, function(e) {
            _self._onWindowResize(e)
        });
        var moveEvent = (window.PointerEvent) ? "pointermove" : (window.MSPointerEvent) ? "mspointermove" : "mousemove";
        $("#H5V_CONTENTS_CONTAINER").on(moveEvent, function(e) {
            if (!_self.DisplayInfo) {
                return
            }
            var cursor = "default";
            var x = 0
              , y = 0;
            x = (e.clientX) ? e.clientX : e.pageX;
            y = (e.clientY) ? e.clientY : e.pageY;
            var offset = $(e.currentTarget).offset();
            x = (x - offset.left) + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = (y - offset.top) + document.body.scrollTop + document.documentElement.scrollTop;
            var menuDispHandleArea = (0 == _self.ScrollView.DispDirection) ? applicationSettings.menuDispHandleArea.horizon : applicationSettings.menuDispHandleArea.vertical;
            var left = _self.DisplayInfo.contentWidth * menuDispHandleArea.left;
            var right = _self.DisplayInfo.contentWidth * menuDispHandleArea.right;
            var top = _self.DisplayInfo.contentHeight * menuDispHandleArea.top;
            var bottom = _self.DisplayInfo.contentHeight * menuDispHandleArea.bottom;
            if ((x > left && x < right) || (y > top && y < bottom)) {
                cursor = "default"
            } else {
                if (0 == _self.ScrollView.DispDirection) {
                    if (x <= _self.DisplayInfo.contentWidth / 2) {
                        if (_self.ScrollView && _self.ScrollView.canMoveLeft()) {
                            cursor = ($.browser.isIE || $.browser.Blink) ? "url(./img/left-cursor.cur), url(./img/left-cursor.ico), url(./img/left-cursor.png), default" : "url(./img/left-cursor.cur), url(./img/left-cursor.ico), default"
                        }
                    } else {
                        if (_self.ScrollView && _self.ScrollView.canMoveRight()) {
                            cursor = ($.browser.isIE || $.browser.Blink) ? "url(./img/right-cursor.cur), url(./img/right-cursor.ico), url(./img/right-cursor.png), default" : "url(./img/right-cursor.cur), url(./img/right-cursor.ico), default"
                        }
                    }
                } else {
                    if (y <= _self.DisplayInfo.contentHeight / 2) {
                        if (_self.ScrollView && _self.ScrollView.canMovePrev()) {
                            cursor = ($.browser.isIE || $.browser.Blink) ? "url(./img/top-cursor.cur), url(./img/top-cursor.ico), url(./img/top-cursor.png), default" : "url(./img/top-cursor.cur), url(./img/top-cursor.ico), default"
                        }
                    } else {
                        if (_self.ScrollView && _self.ScrollView.canMoveNext()) {
                            cursor = ($.browser.isIE || $.browser.Blink) ? "url(./img/bottom-cursor.cur), url(./img/bottom-cursor.ico), url(./img/bottom-cursor.png), default" : "url(./img/bottom-cursor.cur), url(./img/bottom-cursor.ico), default"
                        }
                    }
                }
            }
            $(this).css("cursor", cursor)
        });
        this.GestureService = new GestureService();
        this.GestureService.isBubling = false;
        this.GestureService.attach("H5V_CONTENTS_CONTAINER");
        this._isStopGestureHandle = false;
        this._lastHideDatetime = null;
        this.count = 0;
        $("#H5V_CONTENTS_CONTAINER").on("tap", function(e, args) {
            if (_self._isStopGestureHandle) {
                return
            }
            var x = args.position.x;
            var y = args.position.y;
            var menuDispHandleArea = (0 == _self.ScrollView.DispDirection) ? applicationSettings.menuDispHandleArea.horizon : applicationSettings.menuDispHandleArea.vertical;
            var left = _self.DisplayInfo.width * menuDispHandleArea.left;
            var right = _self.DisplayInfo.width * menuDispHandleArea.right;
            var top = _self.DisplayInfo.height * menuDispHandleArea.top;
            var bottom = _self.DisplayInfo.height * menuDispHandleArea.bottom;
            if ((x > left && x < right) || (y > top && y < bottom)) {
                _self.dispController()
            } else {
                if (0 == _self.ScrollView.DispDirection) {
                    if (x <= _self.DisplayInfo.contentWidth / 2) {
                        if (_self.ScrollView && _self.ScrollView.canMoveLeft()) {
                            _self.ScrollView.scrollLeft(_self.UserSettings.scrollAnimation)
                        } else {
                            _self.dispController()
                        }
                    } else {
                        if (_self.ScrollView && _self.ScrollView.canMoveRight()) {
                            _self.ScrollView.scrollRight(_self.UserSettings.scrollAnimation)
                        } else {
                            _self.dispController()
                        }
                    }
                } else {
                    if (y <= _self.DisplayInfo.contentHeight / 2) {
                        if (_self.ScrollView && _self.ScrollView.canMovePrev()) {
                            _self.ScrollView.scrollTop(_self.UserSettings.scrollAnimation)
                        } else {
                            _self.dispController()
                        }
                    } else {
                        if (_self.ScrollView && _self.ScrollView.canMoveNext()) {
                            _self.ScrollView.scrollBottom(_self.UserSettings.scrollAnimation)
                        } else {
                            _self.dispController()
                        }
                    }
                }
            }
        }).on("doubleTap", function(e, args) {
            _self.ScrollView.stepScaling(args.position)
        }).on("dragStart", function(e, args) {
            _self.ScrollView.dragStart(args.positions)
        }).on("dragging", function(e, args) {
            cursor = "default";
            $(this).css("cursor", cursor);
            _self.ScrollView.dragging(args.positions)
        }).on("dragEnd", function(e, args) {
            _self.ScrollView.dragEnd(args.positions)
        }).on("pinch", function(e, args) {
            if (!applicationSettings.usePinch) {
                return
            }
            _self.ScrollView.pinch(args)
        });
        $("#NAVI_TOP").tapGesture(function() {
            _self.ScrollView.scrollTop(_self.UserSettings.scrollAnimation)
        });
        $("#NAVI_BOTTOM").tapGesture(function() {
            _self.ScrollView.scrollBottom(_self.UserSettings.scrollAnimation)
        });
        $("#NAVI_LEFT").tapGesture(function() {
            _self.ScrollView.scrollLeft(_self.UserSettings.scrollAnimation)
        });
        $("#NAVI_RIGHT").tapGesture(function() {
            _self.ScrollView.scrollRight(_self.UserSettings.scrollAnimation)
        });
        $("#H5V_DIALOG_OVERLAY").tapGesture(function() {
            _self.hideDialog()
        });
        if ($.os.is_Pc && applicationSettings.useKeyDownCapture) {
            this._captureKeyDown = true;
            $(document).on("keydown", function(e) {
                _self._onKeyDown(e)
            }).on("mousewheel", function(e) {
                _self._onMouseWheel(e.originalEvent)
            })
        }
        $(H5V.Connector).on("jsoncallback", function(e, data) {
            if (data.error) {
                return
            }
            var res = _self._decUnicode(data.data);
            eval("var data = " + res);
            if (null == data) {
                return
            }
            for (var i in data) {
                if (!isFinite(i)) {
                    continue
                }
                var obj = {
                    type: "json",
                    content: data[i]
                };
                _self.DownloadPuzzleJsonCue.deleteCue(+i);
                _self.ScrollView.setPage(+i, obj)
            }
        });
        $("#H5V_TASKBAR_CONTAINER .close-button").tapGesture(function() {
            _self.closeTaskbar()
        })
    },
    startResume: function() {
        var b = (this._resumeData && null != this._resumeData.pageNo) ? this._resumeData.pageNo : null;
        if (!b) {
            b = this.Pager.minPageNo
        } else {
            b = parseInt(b)
        }
        $(this).trigger("initresume");
        if (b < this.Pager.minPageNo) {
            b = this.Pager.minPageNo
        }
        if (b > this.Pager.maxPageNo) {
            b = this.Pager.maxPageNo
        }
        var a = this;
        if (b > this.Pager.minPageNo) {
            jConfirm(TranslateMessages.message.msg_rejume, TranslateMessages.message.title_confirm, function(c) {
                if (c !== true) {
                    b = a.Pager.minPageNo
                }
                a.ScrollView.movePage(b)
            }, TranslateMessages.message.btn_rejume_continue, TranslateMessages.message.btn_rejume_biggin)
        } else {
            this.ScrollView.movePage(b)
        }
    },
    setResumeData: function(a, b) {
        if (!this._resumeData) {
            this._resumeData = {}
        }
        this._resumeData[a] = b;
        StorageManager.setItem(this._resumeKey, JSON.stringify(this._resumeData));
        $(this).trigger("resumechange", [a, b])
    },
    getResumeData: function(a) {
        if (!this._resumeData) {
            this._resumeData = {}
        }
        if (a in this._resumeData) {
            return this._resumeData[a]
        }
        return null
    },
    saveStoragePageData: function(b, f) {
        var e = "";
        for (var d = 0, a = h5vParams.contentsKeys.length; d < a; d++) {
            var c = h5vParams.contentsKeys[d];
            e += c
        }
        e += "_" + b + "_" + this.ScrollView._currentPageNoes[0];
        StorageManager.setItem(e, JSON.stringify(f))
    },
    loadStoragePageData: function(b) {
        var e = "";
        for (var d = 0, a = h5vParams.contentsKeys.length; d < a; d++) {
            var c = h5vParams.contentsKeys[d];
            e += c
        }
        e += "_" + b + "_" + this.ScrollView._currentPageNoes[0];
        var f = StorageManager.getItem(e);
        if (null != f) {
            f = JSON.parse(f)
        }
        return f
    },
    getReferencePoint: function() {
        return this.ScrollView.getReferencePoint()
    },
    getNombre: function(a) {
        if (null != this._nombreData && a in this._nombreData && this._nombreData[a] != "") {
            return this._nombreData[a]
        }
        return a
    },
    getInnerFileDownloadPath: function(a) {
        return H5V.Connector.getInnerFileDownloadPath(a)
    },
    movePage: function(a) {
        if (!this.ScrollView || !this.ScrollView._currentPageNoes) {
            return
        }
        this.hideController();
        this.ScrollView.movePage(a);
        this.CurrentPageNoes = this.ScrollView._currentPageNoes;
        this.CurrentPageNo = this.ScrollView._currentPageNoes[0];
        return this.CurrentPageNo
    },
    scrollPrev: function() {
        if (this.ScrollView.DispDirection == 0) {
            if (this.xml[contentsXmlParams.pageViewType]["flag"] == VIEW_TYPE.rtl) {
                this.ScrollView.scrollRight(this.UserSettings.scrollAnimation)
            } else {
                this.ScrollView.scrollLeft(this.UserSettings.scrollAnimation)
            }
        } else {
            this.ScrollView.scrollTop(this.UserSettings.scrollAnimation)
        }
    },
    scrollNext: function() {
        if (this.ScrollView.DispDirection == 0) {
            if (this.xml[contentsXmlParams.pageViewType]["flag"] != VIEW_TYPE.rtl) {
                this.ScrollView.scrollRight(this.UserSettings.scrollAnimation)
            } else {
                this.ScrollView.scrollLeft(this.UserSettings.scrollAnimation)
            }
        } else {
            this.ScrollView.scrollBottom(this.UserSettings.scrollAnimation)
        }
    },
    scrollTop: function() {
        this.ScrollView.scrollTop(this.UserSettings.scrollAnimation)
    },
    scrollBottom: function() {
        this.ScrollView.scrollBottom(this.UserSettings.scrollAnimation)
    },
    scrollLeft: function() {
        this.ScrollView.scrollLeft(this.UserSettings.scrollAnimation)
    },
    scrollRight: function() {
        this.ScrollView.scrollRight(this.UserSettings.scrollAnimation)
    },
    isDoublePage: function() {
        var b = false;
        var c = $(window).width();
        var a = $(window).height();
        if (this.UserSettings.horizontalFit == 0 && (a > DOUBLE_PAGE_MIN_HEIGHT || c > DOUBLE_PAGE_MIN_WIDTH)) {
            b = (c > a) ? true : false
        }
        return b
    },
    isFitDisplay: function() {
        if (this.ScrollView.isScaled()) {
            return false
        }
        if ((this.DisplayInfo.contentWidth < this.DisplayInfo.height || this.UserSettings.horizontalFit == 0)) {
            return true
        }
        return false
    },
    pageViewModeChange: function() {
        var a = this.isDoublePage();
        if (this.isDoublePageMode != a) {
            this.isDoublePageMode = a;
            this.Pager.initialize(this.isDoublePageMode)
        }
        this.ScrollView.redraw(this.UserSettings.horizontalFit, this.Pager)
    },
    refreshDisplayInfo: function(c, g) {
        var f = $(window);
        var d = $("#H5V_MAIN_CONTAINER");
        this._isStopResizeEvent = true;
        var b = false;
        if (this.UserSettings.dispPageMode == 0) {
            b = (f.width() > f.height()) ? true : false
        } else {
            b = (this.UserSettings.dispPageMode == 1 || this.UserSettings.dispPageMode == 3) ? false : true
        }
        this.DisplayInfo = {
            width: f.outerWidth(),
            height: f.outerHeight(),
            innerWidth: f.innerWidth(),
            innerHeight: f.innerHeight(),
            contentWidth: d.innerWidth(),
            contentHeight: d.innerHeight(),
            doublePageMode: b
        };
        var a = window.innerHeight;
        $("body").css("min-height", a);
        $("body").css("height", a);
        d.css("height", a);
        if (null != g) {
            g()
        }
        this._isStopResizeEvent = false
    },
    stopGestureHandle: function() {
        this._isStopGestureHandle = true;
        $("#H5V_GESTURE_HANDLE_PANEL").css("display", "none")
    },
    startGestureHandle: function() {
        $("#H5V_GESTURE_HANDLE_PANEL").css("display", "block");
        this._isStopGestureHandle = false
    },
    stopKeyEventCapture: function() {
        this.pauseKeyEventCapture = true
    },
    startKeyEventCapture: function() {
        this.pauseKeyEventCapture = false
    },
    dispController: function() {
        if (!this._isControllerShown) {
            this.showController()
        } else {
            this.hideController()
        }
    },
    showController: function() {
        if (this._isTaskbarOpen) {
            this.closeTaskbar(function() {
                H5V.Navigation.showController()
            });
            return
        }
        if (this._lastHideDatetime) {
            var a = Date.now();
            if (a - this._lastHideDatetime < 600) {
                return
            }
        }
        this.hideController();
        $("#H5V_GESTURE_HANDLE_PANEL").css("display", "none");
        $("#H5V_CONTROLLER_CONTAINER, #NAVI_LEFT, #NAVI_RIGHT, #NAVI_TOP, #NAVI_BOTTOM").css("visibility", "visible");
        $(this).trigger("controllershown");
        this._isControllerShown = true
    },
    hideController: function() {
        $("#H5V_CONTROLLER_CONTAINER, #NAVI_LEFT, #NAVI_RIGHT, #NAVI_TOP, #NAVI_BOTTOM").css("visibility", "hidden");
        if (!this._isStopGestureHandle) {
            $("#H5V_GESTURE_HANDLE_PANEL").css("display", "block")
        }
        $(this).trigger("controllerhide");
        this._isControllerShown = false;
        this._lastHideDatetime = Date.now()
    },
    openTaskbar: function(f) {
        var b = this;
        this.hideController();
        $(this).trigger("taskbaropening." + f, [f]);
        $("#H5V_TASKBAR_CONTAINER div[data-taskbar-type]").css("display", "none");
        $("#H5V_TASKBAR_CONTAINER div[data-taskbar-type=" + f + "]").css("display", "block");
        $("#H5V_TASKBAR_CONTAINER").css("display", "block");
        if (!this._isOpenTaskBar) {
            var a, h;
            var e = $("#H5V_TASKBAR_CONTAINER").css("right").replace("px", "");
            var d = $("#H5V_TASKBAR_CONTAINER").css("bottom").replace("px", "");
            var g = $("#H5V_TASKBAR_CONTAINER").css("top").replace("px", "");
            if (e != "" && parseInt(e) < 0) {
                a = 0 - $("#H5V_TASKBAR_CONTAINER").width();
                h = 0
            } else {
                if (d != "" && parseInt(d) < 0) {
                    a = 0;
                    h = 0 - $("#H5V_TASKBAR_CONTAINER").height()
                } else {
                    if (g != "" && parseInt(g) < 0) {
                        a = 0;
                        h = $("#H5V_TASKBAR_CONTAINER").height()
                    } else {
                        a = $("#H5V_TASKBAR_CONTAINER").width;
                        h = 0
                    }
                }
            }
            var c = [];
            c.push({
                element: document.getElementById("H5V_TASKBAR_CONTAINER"),
                x: a,
                y: h,
                duration: 0.5
            });
            AnimationLibrary.startTranslate(c, function() {
                $(b).trigger("taskbaropen." + f, [f])
            })
        } else {
            $(this).trigger("taskbaropen." + f, [f])
        }
        this._isOpenTaskBar = true;
        this.OpenTaskBarType = f
    },
    closeTaskbar: function(c) {
        if (!this._isOpenTaskBar) {
            if (c) {
                c()
            }
            return
        }
        var a = this;
        $(this).trigger("taskbarclosing." + this.OpenTaskBarType);
        var b = [];
        b.push({
            element: document.getElementById("H5V_TASKBAR_CONTAINER"),
            x: 0,
            y: 0,
            duration: 0.5
        });
        AnimationLibrary.startTranslate(b, function() {
            $("#H5V_TASKBAR_CONTAINER").css("display", "none");
            $(a).trigger("taskbarclose." + a.OpenTaskBarType);
            if (c) {
                c()
            }
        });
        this._isOpenTaskBar = false;
        this.OpenTaskBarType = null
    },
    showDialog: function(a, b) {
        if (!(a in this._dialog)) {
            return false
        }
        var c = this._dialog[a];
        this.pauseKeyEventCapture = true;
        $("#H5V_DIALOG_CONTAINER").css("display", "block");
        if (b) {
            $("#H5V_DIALOG_OVERLAY").css("display", "none")
        } else {
            $("#H5V_DIALOG_OVERLAY").css("display", "block")
        }
        $(this).trigger("dialogshowing." + a, [a, c]);
        $("#H5V_DIALOG_CONTAINER").css("visibility", "visible");
        $("#" + c).css({
            visibility: "visible",
            "z-index": 2
        });
        this._shownDialogKey = a;
        $(this).trigger("dialogshown." + a, [a, c]);
        return true
    },
    hideDialog: function() {
        if (this._shownDialogKey && this._shownDialogKey in this._dialog) {
            var a = this._dialog[this._shownDialogKey];
            $("#" + this._shownDialogId).css("visibility", "hidden");
            $(this).trigger("dialoghide." + this._shownDialogKey, [this._shownDialogKey, a])
        }
        $("#H5V_DIALOG_CONTAINER").css({
            visibility: "hidden",
            display: "none"
        });
        this._shownDialogKey = null;
        this.pauseKeyEventCapture = false
    },
    registFunction: function(a, b) {
        if (!this._func) {
            this._func = {}
        }
        this._func[a] = b
    },
    callFunction: function(b, a) {
        if (!this._func || !(b in this._func)) {
            return
        }
        this._func[b](a)
    },
    _downloadPage: function(b) {
        if (b < 0) {
            var a = this;
            H5V.Connector.downloadHtml(b, this.Pager.lastHtmlPageUrl, function(c) {
                if (c.error) {
                    return
                }
                a.ScrollView.setLastPageHtml(c.data)
            });
            return
        }
        this.DownloadPuzzleImageCue.setCue(b);
        this.DownloadPuzzleJsonCue.setCue(b)
    },
    _downloadPuzzleImage: function(b) {
        var a = this;
        var e = H5V.Connector.getPuzzleImagePath(b);
        var d = $("<img>");
        var c = (H5V.Connector.dataAccessType == 0) ? "use-credentials" : "anonymous";
        d.attr({
            "data-page-no": b,
            crossOrigin: c
        });
        d.on("load", function(h) {
            var g = {
                type: "img",
                content: this
            };
            var f = $(this).attr("data-page-no");
            a.DownloadPuzzleImageCue.deleteCue(f);
            a.ScrollView.setPage(f, g)
        }).on("error", function(g) {
            var f = $(this).attr("data-page-no");
            a.DownloadPuzzleImageCue.deleteCue(f);
            a.DownloadPuzzleImageCue.setCue(f);
            H5V.showError(TranslateMessages.message.msg_puzzleimage_error, TranslateMessages.message.title_error)
        }).attr("src", e)
    },
    _downloadPuzzleJson: function(a) {
        H5V.Connector.downloadPuzzleJson(a)
    },
    _decUnicode: function(a) {
        return a.replace(/&#(\d+);/g, function(b, c) {
            return String.fromCharCode(c)
        })
    },
    _downloadThumbnail: function() {
        var a = this;
        var c = H5V.Connector.getThumbnailImagePath();
        var b = document.createElement("img");
        $(b).on("load", function(d) {
            a.thumbnailImage = this;
            $(a).trigger("loadthumbnail", [this])
        }).attr("src", c)
    },
    _initializeNombre: function(a) {
        this._nombreData = a;
        if (false == a) {
            this._nombreData = {
                1: "表紙"
            }
        }
        $(this).trigger("initnombre", [this._nombreData])
    },
    _onWindowResize: function(c) {
        if (this._isStopResizeEvent) {
            return
        }
        this._isPausingOrientationChanged = false;
        this.hideDialog();
        this.closeTaskbar();
        this.hideController();
        var b = this.Pager.isDoublePageMode;
        var a = this;
        this.refreshDisplayInfo(c, function() {
            $(a).trigger("resize", [c]);
            if (a.isDoublePage() != b) {
                a.pageViewModeChange(a.isDoublePage())
            }
        })
    },
    _onKeyDown: function(h) {
        if (this._isStopGestureHandle) {
            return
        }
        if (this._keyEventRunning || this.pauseKeyEventCapture) {
            return
        }
        this.keyEventRunning = true;
        var b, d;
        if (h != null) {
            keycode = h.which;
            d = typeof h.modifiers == "undefined" ? h.ctrlKey : h.modifiers & Event.CONTROL_MASK;
            b = typeof h.modifiers == "undefined" ? h.shiftKey : h.modifiers & Event.SHIFT_MASK
        } else {
            keycode = event.keyCode;
            d = event.ctrlKey;
            b = event.shiftKey
        }
        if (this._captureKeyDown && applicationSettings.stopRepeatedKeyDown) {
            if (this._captureKeySleep == true && this._captureKeyLastCode == keycode) {
                this._keyEventRunning = false;
                return
            }
            if (typeof this._captureKeyLastTime == "undefined") {
                this._captureKeyLastTime = new Date().getTime();
                this._captureKeyLastCode = keycode;
                this._captureKeyCount = 0;
                this._captureKeySleep = false
            } else {
                var c = new Date().getTime();
                if (this._captureKeyLastCode != keycode) {
                    this._captureKeyLastTime = new Date().getTime();
                    this._captureKeyLastCode = keycode;
                    this._captureKeyCount = 0;
                    this._captureKeySleep = false
                } else {
                    var g = c - this._captureKeyLastTime;
                    if (typeof this._captureKeyInterval == "undefined") {
                        this._captureKeyLastTime = c;
                        this._captureKeyInterval = g
                    } else {
                        var f = Math.abs(g - this._captureKeyInterval);
                        if (f < applicationSettings.captureKeyDownIntervalThreshold) {
                            this._captureKeyCount++
                        } else {
                            this._captureKeyCount = 0
                        }
                        if (this._captureKeyCount >= applicationSettings.captureKeyDownLimit) {
                            this._captureKeySleep = true;
                            var a = this;
                            setTimeout(function() {
                                a._captureKeySleep = false;
                                delete a._keyEventRunning
                            }, 5000);
                            this._keyEventRunning = false;
                            return
                        }
                        this._captureKeyLastTime = c;
                        this._captureKeyInterval = g
                    }
                }
            }
        }
        if (this.ScrollView.keyDown(keycode, d, b, this.UserSettings.scrollAnimation)) {
            if (h != null) {
                h.preventDefault();
                h.stopPropagation()
            } else {
                event.returnValue = false;
                event.cancelBubble = true
            }
        }
        $(this).trigger("keydown", [keycode, d, b]);
        this._keyEventRunning = false
    },
    _onMouseWheel: function(a) {
        if (this.pauseKeyEventCapture) {
            return
        }
        var b = 0;
        if (!a) {
            a = window.event
        }
        if (a.wheelDelta) {
            b = a.wheelDelta / 120;
            if (window.opera) {
                b = -b
            }
        } else {
            if (a.detail) {
                b = -a.detail / 3
            }
        }
        if (b) {
            this.ScrollView.wheelScroll(b, this.UserSettings.scrollAnimation)
        }
        $(this).trigger("mousewheel", [b])
    }
};
var PageManager = function(c, b, a) {
    this.construct.apply(this, arguments)
};
PageManager.prototype = {
    construct: function(b, c, a) {
        this.data = b;
        this.isDoublePageMode = false;
        this.lastHtmlPageUrl = c;
        this.PageStuffMode = a || 0
    },
    initialize: function(a) {
        this.isDoublePageMode = a;
        this.TotalPageCount =  1000;
        this.SamplePageList =  "1-"+this.TotalPageCount;//this.data[contentsXmlParams.samplePageList]["list"];
        this.SkipPageList = "";
        this.ZeroPageFlg = 0;
        this.PageNoList = this.makePageNoList(h5vParams.readType);
        this.PageIndexList = this.makePageIndexList(this.PageNoList, this.isDoublePageMode);
        this.IndexPageList = this.makeIndexPageList(this.PageIndexList);
        this.PageViewType = 0;
        this.minPageNo = this.PageNoList[0];
        this.maxPageNo = this.PageNoList[this.PageNoList.length - 1];
        this.minIndexNo = 0;
        this.maxIndexNo = this.PageIndexList.length - 1;
        this.ChapterPageList = null;
        if (contentsXmlParams.chapterPageList in this.data && null != this.data[contentsXmlParams.chapterPageList]) {
            this.ChapterPageList = this.splitPageNoListString(this.data[contentsXmlParams.chapterPageList]["list"])
        }
        this.isInitialiisInitialized = true
    },
    splitPageNoListString: function(l, a) {
        var h = new Array();
        if (typeof l == "undefined" || null == l || "" === l) {
            return h
        }
        var g = l.split(",");
        var f = g.length;
        for (var e = 0; e < f; e++) {
            var b = g[e].trim().split("-");
            if (b.length >= 2) {
                var d = (parseInt(b[0]) < parseInt(b[1])) ? parseInt(b[0]) : parseInt(b[1]);
                var m = (parseInt(b[0]) > parseInt(b[1])) ? parseInt(b[0]) : parseInt(b[1]);
                if (null == a || a == "0") {
                    if (d <= 0) {
                        d = 1
                    }
                    if (m <= 0) {
                        m = 1
                    }
                }
                for (var c = d; c <= m; c++) {
                    h.push(c)
                }
            } else {
                if (parseInt(b[0]) <= 0 && (null == a || a == "0")) {
                    continue
                }
                h.push(parseInt(b[0]))
            }
        }
        return h
    },
    makePageNoList: function(f) {
        var m = this.TotalPageCount;
        var c = this.SamplePageList;
        var b = this.ZeroPageFlg;
        var d = this.splitPageNoListString(this.SkipPageList, b);
        var l = new Array();
        var e = (b == "0") ? 1 : 0;
        if (f == "1") {
            for (var g = e; g <= parseInt(m); g++) {
                if (d.indexOf(g) === false || d.indexOf(g) < 0) {
                    l.push(g)
                }
            }
        } else {
            var h = this.splitPageNoListString(c, b);
            for (var g = 0; g < h.length; g++) {
                var a = h[g];
                if (!(a in d)) {
                    l.push(a)
                }
            }
        }
        return l
    },
    makePageIndexList: function(g, c) {
        var e = new Array();
        var d = -1;
        var a = g.length;
        for (var f = 0; f < a; f++) {
            var b = g[f];
            if (!c) {
                e.push([b])
            } else {
                if (this.PageStuffMode == 0) {
                    if (d < 0) {
                        if (b == 1) {
                            e.push([b]);
                            continue
                        }
                        if (f < g.length - 1 && g[f + 1] == b + 1) {
                            d = b
                        } else {
                            e.push([b])
                        }
                        continue
                    }
                    e.push([d, b]);
                    d = -1
                } else {
                    if (d < 0) {
                        if (b % 2 <= 0 && f < g.length - 1 && g[f + 1] == b + 1) {
                            d = b
                        } else {
                            e.push([b])
                        }
                        continue
                    }
                    e.push([d, b]);
                    d = -1
                }
            }
        }
        return e
    },
    makeIndexPageList: function(f) {
        var d = {};
        var a = f.length;
        for (var e = 0; e < a; e++) {
            var h = f[e];
            var b = h.length;
            for (var c = 0; c < b; c++) {
                var g = h[c];
                d[g] = e
            }
        }
        return d
    },
    getPageIndexNo: function(a) {
        if (a < 0) {
            return -1
        }
        return this.IndexPageList[a]
    },
    getNextIndexNo: function(a) {
        if (a >= this.PageIndexList.length - 1) {
            return null
        }
        return a + 1
    },
    getPrevIndexNo: function(a) {
        if (a <= 0) {
            return null
        }
        return a - 1
    },
    getIndexPageNo: function(a) {
        if (a < 0) {
            return [-1]
        }
        return this.PageIndexList[a]
    },
    getCurrentIndexPageNo: function(b) {
        var a = this.getPageIndexNo(b);
        if (null == a || this.PageIndexList.length - 1 < a) {
            return null
        }
        return this.getIndexPageNo(a)
    },
    getNextIndexPageNo: function(b) {
        var a = this.getPageIndexNo(b);
        if (typeof a == "undefined" || null == a || 0 > a) {
            return null
        }
        if (null == a || 0 > a + 1 || this.PageIndexList.length - 1 < a + 1) {
            if (a == this.maxIndexNo && this.lastHtmlPageUrl) {
                return [-1]
            }
            return null
        }
        return this.PageIndexList[a + 1]
    },
    getPrevIndexPageNo: function(b) {
        var a = this.getPageIndexNo(b);
        if (typeof a == "undefined" || null == a || 0 > a) {
            if (b < 0) {
                return this.PageIndexList[this.maxIndexNo]
            }
            return null
        }
        a -= 1;
        if (null == a || 0 > a || this.PageIndexList.length - 1 < a) {
            return null
        }
        return this.PageIndexList[a]
    },
    getLastIndexPageNo: function() {
        var a = this.PageIndexList.length - 1;
        return this.PageIndexList[a]
    },
    getLastIndexNo: function() {
        return this.PageIndexList.length - 1
    },
    isDoublePage: function(a) {
        if (!this.isDoublePageMode) {
            return false
        }
        var b = this.getCurrentIndexPageNo(a);
        if (typeof b == "undefined" || null == b) {
            return false
        }
        return (b.length >= 2) ? true : false
    },
    getPageType: function(a) {
        if (a < 0) {
            return "html"
        }
        return "img"
    }
};
var ResizeAgent = {
    indexList: null,
    elementList: null,
    addTarget: function(b) {
        b = this._getElement(b);
        var g = this;
        if (null == this.elementList) {
            this.indexList = [];
            this.elementList = []
        }
        var h = -1;
        var e = this.elementList.length;
        for (var c = 0; c < e; c++) {
            if (this.elementList[c] == b) {
                h = c;
                break
            }
        }
        var f = null;
        if (h < 0) {
            var a = (b.offsetWidth) ? b.offsetWidth : b.innerWidth;
            var l = (b.offsetHeight) ? b.offsetHeight : b.innerHeight;
            f = {
                width: a,
                height: l,
                attach: function(i) {
                    $(this).on("agent_resize", function(n, m) {
                        i(m)
                    })
                }
            };
            var d = this.elementList.length;
            this.indexList[d] = f;
            this.elementList.push(b)
        } else {
            f = this.indexList[h]
        }
        if (null == this.interval) {
            this.interval = window.setInterval(function() {
                g.doWork()
            }, 1000)
        }
        return f
    },
    attach: function(a, b) {
        this.addTarget(a).attach(b)
    },
    doWork: function() {
        if (null == this.elementList || null == this.indexList) {
            return
        }
        var b = this.elementList.length;
        for (var d = 0; d < b; d++) {
            var g = this.elementList[d];
            var f = this.indexList[d];
            if (f.paused) {
                continue
            }
            var e = (g.offsetWidth) ? g.offsetWidth : g.innerWidth;
            var a = (g.offsetHeight) ? g.offsetHeight : g.innerHeight;
            if (e != f.width || a != f.height) {
                var c = {
                    oldWidth: f.width,
                    oldHeight: f.height,
                    newWidth: e,
                    newHeight: a
                };
                this.indexList[d].width = e;
                this.indexList[d].height = a;
                f.paused = true;
                $(f).trigger("agent_resize", [c]);
                f.paused = false
            }
        }
    },
    trigger: function(g) {
        if (null == this.elementList || null == this.indexList) {
            return
        }
        g = this._getElement(g);
        var b = this.elementList.length;
        for (var d = 0; d < b; d++) {
            var h = this.elementList[d];
            if (h != g) {
                continue
            }
            var f = this.indexList[d];
            var e = (h.offsetWidth) ? h.offsetWidth : h.innerWidth;
            var a = (h.offsetHeight) ? h.offsetHeight : h.innerHeight;
            var c = {
                oldWidth: f.width,
                oldHeight: f.height,
                newWidth: e,
                newHeight: a
            };
            this.indexList[d].width = e;
            this.indexList[d].height = a;
            $(f).trigger("agent_resize", [c])
        }
    },
    pause: function(c) {
        if (null == this.elementList || null == this.indexList) {
            return
        }
        c = this._getElement(c);
        var a = this.elementList.length;
        for (var b = 0; b < a; b++) {
            var d = this.elementList[b];
            if (d != c && d.get(0) != c) {
                continue
            }
            this.indexList[b].paused = true;
            return
        }
    },
    resume: function(c) {
        if (null == this.elementList || null == this.indexList) {
            return
        }
        c = this._getElement(c);
        var a = this.elementList.length;
        for (var b = 0; b < a; b++) {
            var d = this.elementList[b];
            if (d != c) {
                continue
            }
            this.indexList[b].paused = false;
            return
        }
    },
    setSize: function(e, d, b) {
        if (null == this.elementList || null == this.indexList) {
            return
        }
        e = this._getElement(e);
        var a = this.elementList.length;
        for (var c = 0; c < a; c++) {
            var f = this.elementList[c];
            if (f != e) {
                continue
            }
            this.indexList[c].width = d;
            this.indexList[c].height = b
        }
    },
    _getElement: function(a) {
        if (typeof a == "string") {
            a = document.getElementById("#" + a)
        } else {
            if (a instanceof jQuery) {
                a = a.get(0)
            }
        }
        return a
    }
};
var H5V_ScrollView = function(e, a, d, c, b) {
    this.initialize.apply(this, arguments)
};
H5V_ScrollView.prototype = {
    initialize: function(f, b, e, d, c) {
        var a = this;
        this.PageViewType = b;
        this.Direction = e;
        this.DispDirection = e;
        this.FitMode = d;
        this.isHorizontalFit = false;
        this._defaultImageSize = null;
        this.Pager = c;
        this.isDoublePageMode = this.Pager.isDoublePageMode;
        this.PuzzleImages = {};
        this.PuzzleJsons = {};
        if (typeof f == "string") {
            f = document.getElementById(f)
        } else {
            if (f instanceof jQuery) {
                f = f[0]
            }
        }
        if (!f) {
            return
        }
        this.Container = f;
        $(this.Container).css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            "background-color": "transparent"
        });
        this.ScaleContainer = document.createElement("div");
        $(this.ScaleContainer).css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            "background-color": "transparent"
        }).appendTo(this.Container);
        this.ScrollContainer = document.createElement("div");
        $(this.ScrollContainer).css({
            position: "absolute",
            overflow: "hidden",
            "background-color": "transparent"
        }).appendTo(this.ScaleContainer);
        this.LoadingPrev = document.createElement("div");
        $(this.LoadingPrev).css({
            position: "absolute",
            left: "5px",
            top: "5px",
            width: "20px",
            height: "20px",
            "z-index": 99999
        }).appendTo(this.Container);
        this.PrevLoading = new Loading(this.LoadingPrev,loadingSettingsMini);
        this.LoadingNext = document.createElement("div");
        $(this.LoadingNext).css({
            position: "absolute",
            right: "5px",
            top: "5px",
            width: "20px",
            height: "20px",
            "z-index": 99999
        }).appendTo(this.Container);
        this.NextLoading = new Loading(this.LoadingNext,loadingSettingsMini);
        this.makePageContainer();
        this.setDirection();
        $(H5V.Navigation).on("resize", function(h, g) {
            a._resizeTo(g)
        })
    },
    makePageContainer: function() {
        $(".h5v-pgcont").remove();
        var g = 0;
        var f = 0;
        var o = $(this.Container).width();
        var n = $(this.Container).height();
        var l = o;
        var h = n;
        if (this.DispDirection == 0) {
            h = 0;
            n = "100%";
            if (this.PageViewType == VIEW_TYPE.rtl) {
                l = 0 - l
            }
        } else {
            l = 0;
            o = "100%"
        }
        var s = this.Pager.PageIndexList.length;
        for (var q = 0; q < s; q++) {
            var u = $(document.createElement("div")).attr("id", "h5v-pgcontainer-" + q).data("h5v-pgcontainer-no", q).addClass("h5v-pgcont").css("visibility", "hidden");
            var a = this.Pager.PageIndexList[q];
            for (var p = 0; p < a.length; p++) {
                var e = "left";
                if (a.length >= 2) {
                    if ((this.PageViewType == VIEW_TYPE.rtl && p <= 0) || (this.PageViewType != VIEW_TYPE.rtl && p >= 1)) {
                        e = "right"
                    }
                } else {
                    e = "center"
                }
                var w = a[p];
                var m = $(document.createElement("div")).attr("id", "h5v-imgcontainer-" + w).data({
                    "h5v-imgcontainer-no": w,
                    "h5v-img-pos": e
                }).css({
                    position: "relative",
                    "background-color": "transparent",
                    "pointer-events": "none"
                }).appendTo(u)
            }
            u.appendTo(this.ScrollContainer)
        }
        if (this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
            var b = $(document.createElement("div")).attr("id", "h5v-pgcontainer-" + s).data("h5v-pgcontainer-no", "-1").addClass("h5v-pgcont").css({
                visibility: "hidden",
                overflow: "hidden"
            }).appendTo(this.ScrollContainer);
            if (this.isLastHtmlPageLoaded && null != this.lastHtmlPageData) {
                if (this.lastHtmlPageData.parent()) {
                    this.lastHtmlPageData.remove()
                }
                b.append(this.lastHtmlPageData).css("visibility", "visible")
            }
            var c = this;
            var d, t, v;
            if ($.os.is_Pc && "onmousedown"in document.documentElement) {
                d = "mousedown";
                t = "mousemove";
                v = "mouseup mouseleave"
            } else {
                d = "touchstart";
                t = "touchmove";
                v = "touceend touchleave"
            }
            b.on(d, function(A) {
                var z = this.getBoundingClientRect();
                if (z.height >= this.scrollHeight) {
                    return
                }
                if (A.originalEvent) {
                    A = A.originalEvent
                }
                var D;
                if (A.touches || A.changeTouches) {
                    D = (A.changeTouches) ? A.changeTouches[0] : A.touches[0]
                } else {
                    D = A
                }
                var i = (D.clientX) ? D.clientX : D.pageX;
                var C = (D.clientY) ? D.clientY : D.pageY;
                var B = $(A.currentTarget).offset();
                i = (i - B.left) + document.body.scrollLeft + document.documentElement.scrollLeft;
                C = (C - B.top) + document.body.scrollTop + document.documentElement.scrollTop;
                c.lastHtmlPageTouchPos = {
                    x: i,
                    y: C
                }
            }).on(t, function(C) {
                if (!c.lastHtmlPageTouchPos) {
                    return
                }
                c.lastHtmlPageMoved = true;
                var A = this.getBoundingClientRect();
                if (C.originalEvent) {
                    C = C.originalEvent
                }
                var F;
                if (C.touches || C.changeTouches) {
                    F = (C.changeTouches) ? C.changeTouches[0] : C.touches[0]
                } else {
                    F = C
                }
                var i = (F.clientX) ? F.clientX : F.pageX;
                var E = (F.clientY) ? F.clientY : F.pageY;
                var D = $(C.currentTarget).offset();
                i = (i - D.left) + document.body.scrollLeft + document.documentElement.scrollLeft;
                E = (E - D.top) + document.body.scrollTop + document.documentElement.scrollTop;
                if (c.lastHtmlPageTouchPos.y > E) {
                    if (document.body.clientHeight < A.bottom) {
                        if (C.stopPropagation) {
                            C.stopPropagation()
                        }
                        return
                    }
                    var z = c.lastHtmlPageTouchPos.y - E;
                    var B = this.scrollTop + z;
                    if (B + A.height > this.scrollHeight) {
                        B = this.scrollHeight - A.height
                    }
                    this.scrollTop = B;
                    if (C.stopPropagation) {
                        C.stopPropagation()
                    }
                } else {
                    if (c.lastHtmlPageTouchPos.y < E) {
                        if (this.scrollTop <= 0) {
                            if (!c.lastHtmlPageTouchPos) {
                                return
                            }
                            c.lastHtmlPageTouchPos = null;
                            if (C.stopPropagation) {
                                C.stopPropagation()
                            }
                            return
                        }
                        var z = c.lastHtmlPageTouchPos.y - E;
                        var B = this.scrollTop + z;
                        if (B <= 0) {
                            B = 0;
                            c.lastHtmlPageTouchPos = null
                        }
                        this.scrollTop = B;
                        if (C.stopPropagation) {
                            C.stopPropagation()
                        }
                    }
                }
                c.lastHtmlPageTouchPos = {
                    x: i,
                    y: E
                }
            }).on(v, function(i) {
                if (!c.lastHtmlPageTouchPos) {
                    return
                }
                c.lastHtmlPageTouchPos = null;
                i.preventDefault()
            })
        }
    },
    directionChange: function(b) {
        if (b == this.Direction) {
            return
        }
        var a = this.DispDirection;
        this.Direction = b;
        this.DispDirection = b;
        this.setDirection()
    },
    setDirection: function() {
        this._resizeTo();
        if (this.DispDirection == 0) {
            if (this.PageViewType == VIEW_TYPE.rtl) {
                $(this.LoadingPrev).css({
                    top: "5px",
                    bottom: "",
                    left: "",
                    right: "5px"
                });
                $(this.LoadingNext).css({
                    top: "5px",
                    bottom: "",
                    left: "5px",
                    right: ""
                })
            } else {
                $(this.LoadingPrev).css({
                    top: "5px",
                    bottom: "",
                    left: "5px",
                    right: ""
                });
                $(this.LoadingNext).css({
                    top: "5px",
                    bottom: "",
                    left: "",
                    right: "5px"
                })
            }
        } else {
            $(this.LoadingPrev).css({
                top: "5px",
                bottom: "",
                left: "5px",
                right: ""
            });
            $(this.LoadingNext).css({
                top: "",
                bottom: "5px",
                left: "5px",
                right: ""
            })
        }
    },
    movePage: function(b) {
        var d = this.Pager.getPageIndexNo(b);
        if (null == d || typeof d == "undefined") {
            d = this.Pager.getLastIndexNo();
            var c = this.Pager.getIndexPageNo(d);
            if (!c) {
                return
            }
            b = c[0]
        }
        if (this._currentPageIndexNo == d) {
            return
        }
        var a = this;
        this.scrollTo(b, 0, function(e) {
            a._onPageChanged(e)
        })
    },
    scrollTo: function(a, e, l) {
        this._onPageChanging(a);
        if (a < 0 && this.Pager.lastHtmlPageUrl) {
            if (applicationSettings.lastPageType != 1 && applicationSettings.lastPageType != 2) {
                var b = this.Pager.lastHtmlPageUrl;
                location.href = b;
                return
            }
        }
        if (!e) {
            e = 0
        }
        var c = $(this.Container).width();
        var n = $(this.Container).height();
        var d = this.Pager.PageIndexList.length;
        var m = this.Pager.getPageIndexNo(a);
        if (a < 0 && this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
            m = this.Pager.PageIndexList.length
        }
        if (m < 0 || null == m) {
            return
        }
        var i = AnimationLibrary.getMatrix(this.ScrollContainer);
        var h = i.translateX;
        var g = i.translateY;
        if (this.DispDirection == 0) {
            if (this.PageViewType == VIEW_TYPE.rtl) {
                h = c * m
            } else {
                h = 0 - c * m
            }
        } else {
            g = 0 - (n * m + VERTICAL_PAGE_INTERVAL * m);
            if (this.isFit()) {
                if (!this._defaultImageSize) {
                    this.reserveFitMovePage = a;
                    this.reserveFitCallback = l;
                    return
                }
                var f = c / this._defaultImageSize.width;
                g = 0 - ((this._defaultImageSize.height * f + VERTICAL_PAGE_INTERVAL * f) * m)
            }
        }
        $(this.ScrollContainer).css({
            position: "absolute",
            "-webkit-transform-origin": "0px 0px",
            "-moz-transform-origin": "0px 0px",
            "-o-transform-origin": "0px 0px",
            "-ms-transform-origin": "0px 0px",
            "transform-origin": "0px 0px",
            "-webkit-transition-duration": e + "s",
            "-moz-transition-duration": e + "s",
            "-o-transition-duration": e + "s",
            "-ms-transition-duration": e + "s",
            "-webkit-transition-duration": e + "s",
            "-webkit-transform": "translate(" + h + "px," + g + "px)",
            "-moz-transform": "translate(" + h + "px," + g + "px)",
            "-o-transform": "translate(" + h + "px," + g + "px)",
            "-ms-transform": "translate(" + h + "px," + g + "px)",
            transform: "translate(" + h + "px," + g + "px)"
        }).one("webkitTransitionEnd oTransitionEnd transitionend", function() {
            if (l) {
                l(a)
            }
        });
        if (e <= 0) {
            if (l) {
                l(a)
            }
        }
    },
    scrollLeft: function(f, e) {
        if (this.DispDirection != 0) {
            return
        }
        if (null == e || typeof lastPageType == "undefined") {
            e = applicationSettings.lastPageType == 1 ? false : true
        }
        duration = 0;
        if (f) {
            duration = 0.25
        }
        var a = this;
        var d = this._currentPageIndexNo;
        var c = this._currentPageNoes;
        if (this.PageViewType == VIEW_TYPE.rtl) {
            if (d < 0) {
                return
            } else {
                d = this.Pager.getNextIndexNo(d)
            }
        } else {
            if (d < 0) {
                d = this.Pager.getLastIndexNo()
            } else {
                d = this.Pager.getPrevIndexNo(d)
            }
        }
        var a = this;
        if (null == d) {
            if (this._currentPageIndexNo == this.Pager.getLastIndexNo()) {
                var b = this.Pager.lastHtmlPageUrl;
                if (b) {
                    if (applicationSettings.lastPageType == 1) {
                        this.scrollTo(-1, duration, function(g) {
                            a._onPageChanged(-1)
                        })
                    } else {
                        $(this).trigger("displastpage");
                        return
                    }
                }
            }
            return
        }
        c = this.Pager.getIndexPageNo(d);
        if (!c) {
            return
        }
        if (c[0] < 0) {
            this.scrollTo(c[0], 0, function(g) {
                a._onPageChanged(g)
            });
            return
        }
        if (c[0] < 0 && e) {
            return
        }
        this.scrollTo(c[0], duration, function(g) {
            a._onPageChanged(g)
        })
    },
    scrollRight: function(f, e) {
        if (this.DispDirection != 0) {
            return
        }
        if (null == e || typeof lastPageType == "undefined") {
            e = applicationSettings.lastPageType == 1 ? false : true
        }
        var g = 0;
        if (f) {
            g = 0.25
        }
        var a = this;
        var d = this._currentPageIndexNo;
        var c = this._currentPageNoes;
        if (this.PageViewType == VIEW_TYPE.rtl) {
            if (d < 0) {
                d = this.Pager.getLastIndexNo()
            } else {
                d = this.Pager.getPrevIndexNo(d)
            }
        } else {
            if (d < 0) {
                return
            } else {
                d = this.Pager.getNextIndexNo(d)
            }
        }
        if (null == d) {
            if (this._currentPageIndexNo == this.Pager.getLastIndexNo()) {
                var b = this.Pager.lastHtmlPageUrl;
                if (b) {
                    if (applicationSettings.lastPageType == 1) {
                        this.scrollTo(-1, g, function(h) {
                            a._onPageChanged(h)
                        })
                    } else {
                        $(this).trigger("displastpage");
                        return
                    }
                }
            }
            return
        }
        c = this.Pager.getIndexPageNo(d);
        if (!c) {
            return
        }
        if (c[0] < 0) {
            this.scrollTo(c[0], 0, function(h) {
                a._onPageChanged(h)
            });
            return
        }
        if (c[0] < 0 && e) {
            return
        }
        var a = this;
        this.scrollTo(c[0], g, function(h) {
            a._onPageChanged(h)
        })
    },
    scrollTop: function(e) {
        if (this.DispDirection != 1) {
            return
        }
        var d = this._currentPageIndexNo;
        var c = this._currentPageNoes;
        if (this.isFit()) {
            var b = $(this.Container).height();
            this.translate(0, b * 0.8, 0.25);
            return
        }
        if (d < 0) {
            d = this.Pager.getLastIndexNo()
        } else {
            d = this.Pager.getPrevIndexNo(d)
        }
        if (null == d) {
            return
        }
        c = this.Pager.getIndexPageNo(d);
        if (!c) {
            return
        }
        duration = 0;
        if (e) {
            duration = 0.25
        }
        var a = this;
        this.scrollTo(c[0], duration, function(f) {
            a._onPageChanged(f)
        })
    },
    scrollBottom: function(f) {
        if (this.DispDirection != 1) {
            return
        }
        var g = 0;
        if (f) {
            g = 0.25
        }
        var b = this;
        var e = this._currentPageIndexNo;
        var d = this._currentPageNoes;
        if (this.isFit()) {
            var a = $(this.Container).height();
            this.translate(0, 0 - (a * 0.8), 0.25);
            return
        }
        e = this.Pager.getNextIndexNo(e);
        if (null == e) {
            if (this._currentPageIndexNo == this.Pager.getLastIndexNo()) {
                var c = this.Pager.lastHtmlPageUrl;
                if (c) {
                    if (applicationSettings.lastPageType == 1) {
                        this.scrollTo(-1, g, function(h) {
                            b._onPageChanged(-1)
                        })
                    } else {
                        $(this).trigger("displastpage");
                        return
                    }
                }
            }
            return
        }
        d = this.Pager.getIndexPageNo(e);
        if (!d) {
            return
        }
        var b = this;
        this.scrollTo(d[0], g, function(h) {
            b._onPageChanged(h)
        })
    },
    wheelScroll: function(b, a) {
        if (this.DispDirection == 0) {
            if (b < 0) {
                if (this.PageViewType == VIEW_TYPE.rtl) {
                    this.scrollLeft(a, true)
                } else {
                    this.scrollRight(a, true)
                }
            } else {
                if (this.PageViewType == VIEW_TYPE.rtl) {
                    this.scrollRight(a, true)
                } else {
                    this.scrollLeft(a, true)
                }
            }
        } else {
            this.translate(0, b * 30)
        }
    },
    translate: function(d, c, e) {
        var h = true;
        var m = AnimationLibrary.getMatrix(this.ScrollContainer);
        var n = d + m.translateX;
        var i = c + m.translateY;
        if (!e) {
            e = 0
        }
        var a = $(this.Container).width();
        var o = $(this.Container).height();
        var f = this.getDisplayPageRect();
        var l = this.ScrollContainer.getBoundingClientRect();
        if (this.DispDirection == 0) {
            if (l.height <= o) {
                i = 0
            } else {
                if (l.top + c > 0) {
                    i = (0 - l.top) + m.translateY;
                    h = false
                }
                if (l.bottom + c < o) {
                    i = (o - l.bottom) + m.translateY;
                    h = false
                }
            }
            if (l.right + d < a) {
                n = m.translateX - (l.right - a)
            } else {
                if (l.left + d > 0) {
                    n = m.translateX + (0 - l.left)
                } else {
                    if (this.PageViewType == VIEW_TYPE.rtl) {
                        if (d > 0) {
                            if (f.left + d > 0) {
                                var b = this.Pager.getNextIndexNo(this._currentPageIndexNo);
                                if (this._currentPageIndexNo >= this.Pager.getLastIndexNo() && this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
                                    b = this.Pager.getLastIndexNo() + 1
                                }
                                if (!b) {
                                    n = m.translateX + (0 - l.left)
                                } else {}
                            }
                        } else {
                            if (f.right + d < a) {
                                var g = this.Pager.getPrevIndexNo(this._currentPageIndexNo);
                                if (this._currentPageIndexNo < 0 && this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
                                    g = this.Pager.getLastIndexNo()
                                }
                                if (null == g) {
                                    n = m.translateX - (l.right - a)
                                } else {}
                            }
                        }
                    } else {
                        if (d < 0) {
                            if (f.right + d < a) {
                                var b = this.Pager.getNextIndexNo(this._currentPageIndexNo);
                                if (this._currentPageIndexNo >= this.Pager.getLastIndexNo() && this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
                                    b = this.Pager.getLastIndexNo() + 1
                                }
                                if (!b) {
                                    n = m.translateX - (l.right - a)
                                } else {}
                            }
                        } else {
                            if (f.left + d > 0) {
                                var g = this.Pager.getPrevIndexNo(this._currentPageIndexNo);
                                if (this._currentPageIndexNo < 0 && this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
                                    g = this.Pager.getLastIndexNo()
                                }
                                if (null == g) {
                                    n = m.translateX + (0 - l.left)
                                } else {}
                            }
                        }
                    }
                }
            }
        } else {
            if (l.width <= a) {
                n = 0
            } else {
                if (l.left + d > 0) {
                    n = m.translateX + (0 - l.left);
                    h = false
                }
                if (l.right + d < a) {
                    n = m.translateX - (l.right - a);
                    h = false
                }
            }
            if (l.top + c >= 0) {
                i = m.translateY + (0 - l.top)
            } else {
                if (l.bottom + c <= o) {
                    i = m.translateY - (l.bottom - o)
                } else {
                    if (c < 0) {
                        if (f.bottom + c < o) {
                            var b = this.Pager.getNextIndexNo(this._currentPageIndexNo);
                            if (this._currentPageIndexNo >= this.Pager.getLastIndexNo() && this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
                                b = this.Pager.getLastIndexNo() + 1
                            }
                            if (null == b) {
                                i = m.translateY - (l.bottom - o)
                            } else {}
                        }
                    } else {
                        if (f.top + c > 0) {
                            var g = this.Pager.getPrevIndexNo(this._currentPageIndexNo);
                            if (this._currentPageIndexNo < 0 && this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
                                g = this.Pager.getLastIndexNo()
                            }
                            if (null == g) {
                                i = m.translateY + (0 - l.top)
                            } else {}
                        }
                    }
                }
            }
        }
        $(this.ScrollContainer).css({
            "-webkit-transition-duration": e + "s",
            "-moz-transition-duration": e + "s",
            "-o-transition-duration": e + "s",
            "-ms-transition-duration": e + "s",
            "-webkit-transition-duration": e + "s",
            "-webkit-transform": "translate(" + n + "px," + i + "px)",
            "-moz-transform": "translate(" + n + "px," + i + "px)",
            "-o-transform": "translate(" + n + "px," + i + "px)",
            "-ms-transform": "translate(" + n + "px," + i + "px)",
            transform: "translate(" + n + "px," + i + "px)"
        });
        var p = this.getCurrentScrollIndex();
        if (null == p) {
            return
        }
        var q = this.Pager.getIndexPageNo(p);
        if (p > this.Pager.getLastIndexNo()) {
            p = -1;
            q = [-1]
        }
        if (this._currentPageIndexNo != p) {
            this._onPageChanging(q[0]);
            this._onPageChanged(q[0])
        }
        return h
    },
    redraw: function(c, b) {
        $(this.Container).hide();
        this.FitMode = c;
        this.Pager = b;
        if (!this._currentPageNoes) {
            return
        }
        var a = this._currentPageNoes[0];
        this._currentPageIndexNo = null;
        this._currentPageNoes = null;
        if (this.isDoublePageMode != this.Pager.isDoublePageMode) {
            this.isDoublePageMode = this.Pager.isDoublePageMode;
            this.makePageContainer()
        }
        this._resizeTo();
        this.movePage(a);
        $(this.Container).show()
    },
    setWaterMark: function(b) {
        if ((!b || b == "") && this._waterMark) {
            this._waterMark = null;
            delete this._waterMark;
            if (this.WaterMarkImage) {
                $(this.WaterMarkImage).remove();
                this.WaterMarkImage = null;
                delete this.WaterMarkImage
            }
            return
        }
        if (!this._waterMark) {
            var a = this;
            this._waterMark = b;
            this._createWaterMarkImage(function(c) {
                a.WaterMarkImage = document.createElement("img");
                $(a.WaterMarkImage).attr("src", c)
            })
        }
    },
    setPage: function(b, d) {
        b = parseInt(b);
        var c = this.Pager.getPageIndexNo(b);
        if (c > this._cacheToIdxNo || c < this._cacheFromIdxNo) {
            delete this.PuzzleImages[b];
            delete this.PuzzleJsons[b];
            return
        }
        var a = this;
        if (d.type == "img") {
            this.PuzzleImages[b] = d.content
        } else {
            if (d.type == "json") {
                this.PuzzleJsons[b] = d.content
            }
        }
        if (b in this.PuzzleImages && b in this.PuzzleJsons) {
            if (c >= this._dispFromIdxNo && c <= this._dispToIdxNo) {
                this.setPageObjects(b)
            }
        }
        delete d
    },
    setPageObjects: function(b) {
        var a = this;
        this._drawPuzzleImage(b, this.PuzzleImages[b], this.PuzzleJsons[b], function(e) {
            if (e) {
                var d = e.pageNo;
                var f = a.Pager.getPageIndexNo(d);
                if (f < a._cacheFromIdxNo || f > a._cacheToIdxNo) {
                    return
                }
                var c = $("#h5v-img-" + d);
                if (c.length <= 0) {
                    c = $(document.createElement("img")).attr("id", "h5v-img-" + d).attr({
                        "data-h5v-img-no": d,
                        "data-h5v-idx-no": f
                    }).addClass("h5v-cntimg").appendTo("#h5v-imgcontainer-" + d)
                }
                c.data("h5v-img-status", "loading").on("load", function() {
                    $(this).data("h5v-img-status", "loaded");
                    a._revokeObjectURL(this.src);
                    var h = $(this).attr("data-h5v-img-no");
                    a._resizeImageTo(h);
                    var l = [h];
                    var p = true;
                    if (a.Pager.isDoublePage(h)) {
                        var g = a.Pager.getPageIndexNo(h);
                        l = a.Pager.PageIndexList[g];
                        for (var o = 0; o < l.length; o++) {
                            var n = $("#h5v-img-" + l[o]);
                            if (n.length <= 0 || n.data("h5v-img-status") != "loaded") {
                                p = false
                            }
                        }
                    }
                    if (p) {
                        var m = a.Pager.getPageIndexNo(h);
                        if (m >= a._dispFromIdxNo && m <= a._dispToIdxNo) {
                            $("#h5v-pgcontainer-" + m).css("visibility", "visible");
                            $(a).trigger("pagedraw", l);
                            a._checkLoading()
                        }
                    }
                }).attr("src", e.url)
            }
        })
    },
    setLastPageHtml: function(c) {
        if (this.isLastHtmlPageLoaded) {
            return
        }
        this.isLastHtmlPageLoaded = true;
        var l = this;
        var a = this.Pager.lastHtmlPageUrl;
        var i = $('<div class="h5v-htmlpage-container"></div>');
        i.append($(c));
        var f = "";
        i.find("base").each(function() {
            f = $(this).attr("href");
            $(this).remove()
        });
        var m = [];
        var b = [];
        var h = [];
        i.find("link").each(function() {
            if ($(this).attr("data-standalone")) {
                return
            }
            var e = $(this).attr("href");
            e = l.convertAbsoluteUrl(e, a, f);
            if ($("head").find('link[href="' + e + '"]').length > 0) {
                return
            }
            m.push(e);
            h.push({
                "default-url": $(this).attr("href")
            });
            $(this).remove()
        });
        if (m.length > 0) {
            CommonLibrary.loadStyleSheets(m, function(e) {
                $(e).each(function() {
                    var n = this;
                    try {
                        $(this.sheet.cssRules).each(function() {
                            if (this.style.backgroundImage == "") {
                                return
                            }
                            var p = this.style.backgroundImage.match(/^[url\("]+([0-9a-zA-Z\.\-_:\/]+?)"/i);
                            if (p && p.length >= 2) {
                                var q = l.convertAbsoluteUrl(p[1], n.href, true);
                                this.style.backgroundImage = 'url("' + q + '")'
                            }
                        })
                    } catch (o) {}
                })
            }, h)
        }
        i.find("script").each(function() {
            if ($(this).attr("data-standalone")) {
                return
            }
            var e = $(this).attr("src");
            if (!e) {
                return
            }
            e = l.convertAbsoluteUrl(e, a, f);
            if ($("head").find('script[src="' + e + '"]').length > 0) {
                return
            }
            b.push(e);
            $(this).remove()
        });
        if (b.length > 0) {
            var d = i.clone();
            if ($(d).find('[data-role="page"]').length > 0) {
                d = $(d).find('[data-role="page"]');
                d.remove()
            }
            d.find("img").each(function() {
                this.src = l.convertAbsoluteUrl($(this).attr("src"), a, f)
            });
            d.find("a").on("click mousedown touchstart pointerdown", function(n) {
                if (!n) {
                    n = window.event
                }
                if (n.stopPropagation) {
                    n.stopPropagation()
                }
                n.returnValue = false
            });
            try {
                $("#h5v-pgcontainer-" + this.Pager.PageIndexList.length).children().remove();
                $("#h5v-pgcontainer-" + this.Pager.PageIndexList.length).append(d).css("visibility", "visible")
            } catch (g) {}
            $("#h5v-pgcontainer-" + this.Pager.PageIndexList.length).css("visibility", "visible");
            $(d).trigger("load");
            i.remove();
            i = null;
            CommonLibrary.loadScripts(b);
            this.isLastHtmlPageLoaded = true;
            this.lastHtmlPageData = d;
            return
        }
        var d = i;
        if ($(d).find('[data-role="page"]').length > 0) {
            d = $(d).find('[data-role="page"]');
            d.parent()[0].removeChild(d[0])
        }
        d.find("img").each(function() {
            this.src = l.convertAbsoluteUrl($(this).attr("src"), a, f)
        });
        d.find("img,a").on("click mousedown touchstart pointerdown", function(n) {
            if (!n) {
                n = window.event
            }
            if (n.stopPropagation) {
                n.stopPropagation()
            }
            n.returnValue = false
        });
        $("#h5v-pgcontainer-" + this.Pager.PageIndexList.length).children().remove();
        $("#h5v-pgcontainer-" + this.Pager.PageIndexList.length).append(d).css("visibility", "visible");
        $(d).trigger("load");
        i.remove();
        i = null;
        this.isLastHtmlPageLoaded = true;
        this.lastHtmlPageData = d
    },
    convertAbsoluteUrl: function(f, b, a) {
        var d = document.createElement("span");
        d.insertAdjacentHTML("beforeend", '<a href="' + f.replace(/"/g, "&quot;") + '" />');
        var h = d.firstChild.href;
        if (h == f) {
            return h
        }
        d = document.createElement("span");
        d.insertAdjacentHTML("beforeend", '<a href="' + b.replace(/"/g, "&quot;") + '" />');
        if (d.firstChild.href != b) {
            b = location.protocol + "//" + location.hostname + "/" + b.replace(/^\/+/, "")
        }
        if (f != f.replace(/^\/\/+/, "")) {
            return location.protocol + f
        }
        if (f != f.replace(/^\/+/, "")) {
            var c = b.match(/^[httpsfile]+:\/{2,3}([0-9a-z\.\-:]+?):?[0-9]*?\//i)[1];
            return location.protocol + "//" + c + f
        } else {
            var g = b.replace(/\\/g, "/").replace(/\/[^\/]*$/, "");
            if (a) {
                g = a.replace(/\\/g, "/").replace(/\/[^\/]*$/, "")
            }
            return g.replace(/\/+$/, "") + "/" + f.replace(/^\/+/, "")
        }
    },
    isFit: function() {
        if (this.FitMode != 1) {
            return false
        }
        var b = $(this.Container).width();
        var a = $(this.Container).height();
        return (b > a)
    },
    getDisplayPosToContainer: function(d) {
        var b = this.Container.getBoundingClientRect();
        var a = 0 - (b.left - d.x);
        var c = 0 - (b.top - d.y);
        return {
            x: a,
            y: c
        }
    },
    getDisplayImageSize: function() {
        var f = this._currentPageIndexNo;
        var c = this.Pager.getIndexPageNo(f);
        if (!c || c[0] < 0) {
            return null
        }
        var d = {
            width: 0,
            height: 0
        };
        for (var e = 0; e < c.length; e++) {
            var a = c[e];
            var b = document.getElementById("h5v-img-" + a);
            if (!b) {
                return null
            }
            var g = b.getBoundingClientRect();
            d.width += g.width;
            d.height = g.height
        }
        return d
    },
    getDisplayImageRect: function() {
        var f = this._currentPageIndexNo;
        if (f < 0) {
            return this.getDisplayPageRect()
        }
        var c = this.Pager.getIndexPageNo(f);
        if (!c || c[0] < 0) {
            return null
        }
        var d = {
            width: 0,
            height: 0,
            left: null,
            right: null,
            top: null,
            bottom: null
        };
        for (var e = 0; e < c.length; e++) {
            var a = c[e];
            var b = document.getElementById("h5v-img-" + a);
            if (!b) {
                return null
            }
            var g = b.getBoundingClientRect();
            if (!d.left || d.left > g.left) {
                d.left = g.left
            }
            if (!d.right || d.right < g.right) {
                d.right = g.right
            }
            if (!d.top || d.top > g.top) {
                d.top = g.top
            }
            if (!d.bottom || d.bottom < g.bottom) {
                d.bottom = g.bottom
            }
            d.width += g.width;
            d.height = g.height
        }
        return d
    },
    getDisplayPageRect: function() {
        var a = this._currentPageIndexNo;
        if (a < 0) {
            a = this.Pager.getLastIndexNo() + 1
        }
        var b = document.getElementById("h5v-pgcontainer-" + a);
        if (!b) {
            return null
        }
        return b.getBoundingClientRect()
    },
    getCurrentScrollIndex: function() {
        var b = this._currentPageIndexNo;
        var a = AnimationLibrary.getMatrix(this.ScrollContainer);
        if (this.DispDirection == 0) {
            var c = $(this.Container).width();
            b = Math.floor((Math.abs(a.translateX) + (c / 2)) / c)
        } else {
            var e = $(this.Container).height();
            var d = e + VERTICAL_PAGE_INTERVAL;
            if (this.isFit()) {
                d = $("#h5v-pgcontainer-0").height() + VERTICAL_PAGE_INTERVAL
            }
            b = Math.floor((Math.abs(a.translateY) + (e / 2)) / d)
        }
        if (b < 0) {
            b = 0
        }
        if (b > this.Pager.getLastIndexNo()) {
            if (this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
                b = -1
            } else {
                b = this.Pager.getLastIndexNo()
            }
        }
        return b
    },
    stepScaling: function(b) {
        var a = 1;
        if (!this.ScaleRatio || 1 >= this.ScaleRatio) {
            a = 2
        }
        this._scaling(a, b)
    },
    resetScaling: function() {
        var a = 1;
        $(this.ScaleContainer).css({
            "-webkit-transform-origin": "0px 0px",
            "-moz-transform-origin": "0px 0px",
            "-o-transform-origin": "0px 0px",
            "-ms-transform-origin": "0px 0px",
            "transform-origin": "0px 0px",
            "-webkit-transition-duration": "0s",
            "-moz-transition-duration": "0s",
            "-o-transition-duration": "0s",
            "-ms-transition-duration": "0s",
            "-webkit-transition-duration": "0s",
            "-webkit-transform": "scale(" + a + ")",
            "-moz-transform": "scale(" + a + ")",
            "-o-transform": "scale(" + a + ")",
            "-ms-transform": "scale(" + a + ")",
            transform: "scale(" + a + ")"
        });
        this.ScaleRatio = a;
        this.translate(0, 0)
    },
    isScaled: function() {
        return ((this.ScaleRatio ? this.ScaleRatio : 1) != 1)
    },
    dragStart: function(a) {
        if (this._isAnimating) {
            return
        }
        this._isDragStart = true;
        this._dragStartPos = a.start;
        this._dragCancel = false;
        this._dragStartTime = new Date().getTime();
        this._dragStartPageNo = this._currentPageNoes[0]
    },
    dragging: function(d) {
        if (this._isAnimating) {
            return
        }
        if (!this._isDragStart) {
            return
        }
        if (this._dragCancel) {
            return
        }
        var a = new Date().getTime();
        if (a - this._dragStartTime < 20) {
            return
        }
        var c = (d.current.x - this._dragStartPos.x);
        var b = (d.current.y - this._dragStartPos.y);
        this._dragStartPos = d.current;
        this.translate(c, b)
    },
    dragEnd: function(c) {
        if (this._isAnimating) {
            return
        }
        this._isDragStart = false;
        this._dragStartPos = null;
        this._dragCancel = false;
        this._dragStartTime = null;
        if (true == applicationSettings.pageUnitScroll) {
            if (this.ScaleRatio <= 1 && !this.isHorizontalFit) {
                if (true == applicationSettings.flickableScroll) {
                    var d = this;
                    var l = this._isFlickMovePageNo(c, this._dragStartPageNo);
                    this.scrollTo(l, 0.25, function(e) {
                        d._onPageChanged(e)
                    });
                    this._dragStartPageNo = null;
                    return
                }
            }
        }
        if (this.DispDirection == 0) {
            var a = $(this.Container).width();
            var g = c.current.x - c.start.x;
            if (this.ScaleRatio <= 1) {
                var f = this.getDisplayPageRect();
                var i = this._currentPageIndexNo;
                if (f.left > 0 && f.right > a) {
                    if (g > 0) {
                        if (this.PageViewType == VIEW_TYPE.rtl) {
                            i = this.Pager.getNextIndexNo(i);
                            if (this._currentPageIndexNo >= this.Pager.getLastIndexNo()) {
                                i = -1
                            }
                        } else {
                            i = this.Pager.getPrevIndexNo(i);
                            if (this._currentPageIndexNo < 0) {
                                i = this.Pager.getLastIndexNo()
                            }
                        }
                    }
                } else {
                    if (f.right < a && f.left < 0) {
                        if (g < 0) {
                            if (this.PageViewType == VIEW_TYPE.rtl) {
                                i = this.Pager.getPrevIndexNo(i);
                                if (this._currentPageIndexNo < 0) {
                                    i = this.Pager.getLastIndexNo()
                                }
                            } else {
                                i = this.Pager.getNextIndexNo(i);
                                if (this._currentPageIndexNo >= this.Pager.getLastIndexNo()) {
                                    i = -1
                                }
                            }
                        }
                    }
                }
                if (null == i) {
                    i = this._currentPageIndexNo
                }
                var m = this.Pager.getIndexPageNo(i);
                if (i < 0) {
                    m = [-1]
                }
                if (m) {
                    var d = this;
                    this.scrollTo(m[0], 0.25, function(e) {
                        d._onPageChanged(e)
                    })
                }
                return
            }
        }
        this._dragReleaseMoveX = (c.current.x - c.latest.x);
        this._dragReleaseMoveY = (c.current.y - c.latest.y);
        var d = this;
        var h = c.latest.time;
        (function b() {
            if (d._isAnimating || d._isDragStart) {
                clearTimeout(d._loopTimer);
                return
            }
            d._dragReleaseMoveX -= d._dragReleaseMoveX / 10;
            d._dragReleaseMoveY -= d._dragReleaseMoveY / 10;
            var n = Date.now();
            var o = n - h;
            var e = d.translate(d._dragReleaseMoveX, d._dragReleaseMoveY);
            if (!e) {
                if (d.DispDirection == 0) {
                    d._dragReleaseMoveY = 0
                } else {
                    d._dragReleaseMoveX = 0
                }
            }
            if (Math.sqrt((d._dragReleaseMoveX * d._dragReleaseMoveX) + (d._dragReleaseMoveY * d._dragReleaseMoveY)) <= 1) {
                clearTimeout(d._loopTimer);
                return
            }
            h = n;
            d._loopTimer = setTimeout(b, 25)
        }())
    },
    pinch: function(a) {
        if (this._isAnimating) {
            return
        }
        var c = a.center;
        var b = this.ScaleRatio * a.differenceRatio;
        this._scaling(b, c)
    },
    keyDown: function(f, e, b, g) {
        if (this._isAnimating) {
            return
        }
        var c = false;
        switch (keycode) {
        case 38:
            if (e) {
                var d = $(this.Container).width();
                var a = $(this.Container).height();
                this.ScaleRatio = 1;
                this.stepScaling({
                    x: d / 2,
                    y: a / 2
                })
            } else {
                if ((b && this.ScaleRatio > 1)) {
                    this.translate(0, 10)
                } else {
                    if (1 == this.DispDirection) {
                        this.scrollTop(g)
                    }
                }
            }
            c = true;
            break;
        case 40:
            if (e) {
                this.resetScaling()
            } else {
                if ((b && this.ScaleRatio > 1)) {
                    this.translate(0, -10)
                } else {
                    if (1 == this.DispDirection) {
                        this.scrollBottom(g)
                    }
                }
            }
            c = true;
            break;
        case 37:
            if (b && this.ScaleRatio > 1) {
                this.translate(10, 0)
            } else {
                if (0 == this.DispDirection) {
                    this.scrollLeft(g)
                }
            }
            c = true;
            break;
        case 39:
            if (b && this.ScaleRatio > 1) {
                this.translate(-10, 0)
            } else {
                if (0 == this.DispDirection) {
                    this.scrollRight(g)
                }
            }
            c = true;
            break;
        case 32:
            if (0 == this.DispDirection) {
                if ((this.PageViewType == VIEW_TYPE.rtl && !b) || (this.PageViewType != VIEW_TYPE.rtl && b)) {
                    this.scrollLeft(g)
                } else {
                    this.scrollRight(g)
                }
            } else {
                if (!b) {
                    this.scrollBottom(g)
                } else {
                    this.scrollTop(g)
                }
            }
            c = true;
            break
        }
        return c
    },
    canMovePrev: function() {
        if (!this._currentPageNoes) {
            return false
        }
        var a = this.Pager.getPrevIndexPageNo(this._currentPageNoes[0]);
        if (null == a) {
            if (this.isFit()) {
                var b = this.ScrollContainer.getBoundingClientRect();
                if (b.top < 0) {
                    return true
                }
            }
            return false
        }
        return true
    },
    canMoveNext: function() {
        if (!this._currentPageNoes) {
            return false
        }
        var a = this.Pager.getNextIndexPageNo(this._currentPageNoes[0]);
        if (null == a) {
            if (this.isFit()) {
                var b = this.ScrollContainer.getBoundingClientRect();
                if (b.bottom > $(this.Container).height()) {
                    return true
                }
            }
            return false
        }
        return true
    },
    canMoveLeft: function() {
        if (!this._currentPageNoes) {
            return false
        }
        var a = (this.PageViewType == VIEW_TYPE.rtl) ? this.Pager.getNextIndexPageNo(this._currentPageNoes[0]) : this.Pager.getPrevIndexPageNo(this._currentPageNoes[0]);
        if (null == a) {
            return false
        }
        return true
    },
    canMoveRight: function() {
        if (!this._currentPageNoes) {
            return false
        }
        var a = (this.PageViewType == VIEW_TYPE.rtl) ? this.Pager.getPrevIndexPageNo(this._currentPageNoes[0]) : this.Pager.getNextIndexPageNo(this._currentPageNoes[0]);
        if (null == a) {
            return false
        }
        return true
    },
    _onPageDemand: function(a) {
        a = parseInt(a);
        if (a < 0 && applicationSettings.lastPageType != 1) {
            return
        }
        if (a < 0 && this.isLastHtmlPageLoaded) {
            return
        }
        if ($("#h5v-img-" + a).length > 0) {
            return
        }
        if (a in this.PuzzleImages && a in this.PuzzleJsons) {
            this.setPageObjects(a);
            return
        }
        $(this).trigger("pagedemand", [a])
    },
    _onPageChanging: function(b) {
        var a = this;
        setTimeout(function() {
            var l = {
                index_no: a._currentPageIndexNo,
                page_noes: a._currentPageNoes
            };
            var h = {};
            if (b < 0) {
                h = {
                    index_no: -1,
                    page_noes: [-1]
                }
            } else {
                var g = a.Pager.getPageIndexNo(b);
                var c = a.Pager.getIndexPageNo(g);
                if (!c) {
                    return
                }
                h = {
                    index_no: g,
                    page_noes: c
                };
                for (var f = 0; f < c.length; f++) {
                    var d = c[f];
                    var e = $("#h5v-img-" + d);
                    if (e.length <= 0) {
                        a._onPageDemand(d)
                    }
                }
                if (a._currentPageIndexNo == g) {
                    return
                }
            }
            $(a).trigger("pagechanging", [{
                oldValue: l,
                newValue: h
            }])
        }, 1)
    },
    _onPageChanged: function(b) {
        var a = this;
        setTimeout(function() {
            var f = {
                index_no: a._currentPageIndexNo,
                page_noes: a._currentPageNoes
            };
            var d = a.Pager.getPageIndexNo(b);
            var e = {};
            if (b < 0) {
                e = {
                    index_no: -1,
                    page_noes: [-1]
                }
            } else {
                if (a._currentPageIndexNo == d) {
                    return
                }
                var c = a.Pager.getIndexPageNo(d);
                if (!c) {
                    return
                }
                e = {
                    index_no: d,
                    page_noes: c
                }
            }
            a._currentPageIndexNo = e.index_no;
            a._currentPageNoes = e.page_noes;
            a._cacheFromIdxNo = a._currentPageIndexNo - CACHE_IMAGE_BACK_COUNT;
            a._cacheToIdxNo = a._currentPageIndexNo + CACHE_IMAGE_AHEAD_COUNT;
            a._dispFromIdxNo = a._currentPageIndexNo - BEFOREHAND_BACK_PAGE_COUNT;
            a._dispToIdxNo = a._currentPageIndexNo + BEFOREHAND_AHEAD_PAGE_COUNT;
            $(a).trigger("pagechanged", [{
                oldValue: f,
                newValue: e
            }]);
            a._checkLoading();
            setTimeout(function() {
                a._loadAhead(d);
                a._loadBack(d);
                a._disposeImage()
            }, 10)
        }, 1)
    },
    _onHorizontalFitChange: function(a) {
        if (this.isHorizontalFit != a) {
            this.isHorizontalFit = a;
            $(this).trigger("horizontalfitchange", [this.isHorizontalFit])
        }
    },
    _checkLoading: function() {
        if (this._currentPageIndexNo >= 0) {
            var a = this.Pager.getNextIndexNo(this._currentPageIndexNo);
            if (!a) {
                this.NextLoading.stop()
            } else {
                if ($("#h5v-pgcontainer-" + a).css("visibility") != "visible") {
                    this.NextLoading.start()
                } else {
                    this.NextLoading.stop()
                }
            }
        } else {
            this.NextLoading.stop()
        }
        var b = this.Pager.getPrevIndexNo(this._currentPageIndexNo);
        if (this._currentPageIndexNo < 0) {
            b = this.Pager.getLastIndexNo()
        }
        if (!b) {
            this.PrevLoading.stop()
        } else {
            if ($("#h5v-pgcontainer-" + b).css("visibility") != "visible") {
                this.PrevLoading.start()
            } else {
                this.PrevLoading.stop()
            }
        }
    },
    _loadAhead: function(d) {
        if (d < 0) {
            return
        }
        var e = d + 1;
        var f = d + BEFOREHAND_AHEAD_PAGE_COUNT;
        if (e > this.Pager.getLastIndexNo()) {
            f = e
        }
        for (var c = e; c <= f; c++) {
            var a = this.Pager.getIndexPageNo(c);
            if (a) {
                for (var b = 0; b < a.length; b++) {
                    this._onPageDemand(a[b])
                }
            } else {
                if (c > this.Pager.getLastIndexNo() && this.Pager.lastHtmlPageUrl) {
                    this._onPageDemand(-1)
                }
                break
            }
        }
    },
    _loadBack: function(d) {
        if (d < 0) {
            d = this.Pager.getLastIndexNo() + 1
        }
        var e = d - 1;
        var f = d - BEFOREHAND_BACK_PAGE_COUNT;
        if (f < 0) {
            f = 0
        }
        for (var c = e; c >= f; c--) {
            var a = this.Pager.getIndexPageNo(c);
            if (a) {
                for (var b = 0; b < a.length; b++) {
                    this._onPageDemand(a[b])
                }
            }
        }
    },
    _disposeImage: function() {
        if (this._currentPageIndexNo < 0) {
            return
        }
        var a = this;
        $(".h5v-cntimg").each(function() {
            var b = a._currentPageIndexNo - CACHE_IMAGE_BACK_COUNT;
            var d = a._currentPageIndexNo + CACHE_IMAGE_AHEAD_COUNT;
            var e = parseInt($(this).attr("data-h5v-idx-no"));
            var c = parseInt($(this).attr("data-h5v-img-no"));
            if (e > d || e < b) {
                $(a).trigger("disposing", [c]);
                $("#h5v-pgcontainer-" + e).css("visibility", "hidden");
                $(this).remove();
                delete a.PuzzleImages[c];
                delete a.PuzzleJsons[c];
                $(a).trigger("dispose", [c])
            }
        })
    },
    _drawPuzzleImage: function(A, z, v, c) {
        var b = this;
        var a = v.s;
        var w = v.p;
        try {
            var o = document.createElement("canvas");
            var p = o.getContext("2d");
            p.restore();
            p.save();
            o.setAttribute("width", a.width);
            o.setAttribute("height", a.height);
            p.clearRect(0, 0, a.width, a.height);
            p.fillStyle = displaySettings.pageBackground;
            p.fillRect(0, 0, a.width, a.height);
            var q = 0;
            var g = CommonLibrary.getActualDimension(z);
            for (var s in w) {
                if (this._cancel) {
                    return false
                }
                var y = w[s];
                var m = y.sx + 2;
                var l = y.sy + 2;
                var n = y.sw - 4;
                var x = y.sh - 4;
                if (m + n > g.width) {
                    n = g.width - m
                }
                if (l + x > g.height) {
                    x = g.height - l
                }
                if (isNaN(m) || isNaN(l) || isNaN(n) || isNaN(x)) {
                    continue
                }
                var f = y.dx;
                var d = y.dy;
                var h = n;
                var t = x;
                p.drawImage(z, m, l, n, x, f, d, h, t);
                q++
            }
            if (this.WaterMarkImage && this.WaterMarkImage.complete) {
                var h = 200;
                var t = 20;
                var f = (a.width - h) / 2;
                var d = a.height - t - 5;
                p.globalCompositeOperation = "darker";
                p.drawImage(this.WaterMarkImage, f, d, h, t)
            }
            o.toBlob(function(e) {
                var i = b._createObjectURL(e);
                c({
                    pageNo: A,
                    url: i
                })
            }, "image/jpeg", 1)
        } catch (u) {
            H5V.showError(TranslateMessages.message.msg_puzzledata_error, TranslateMessages.message.title_error);
            return false
        }
        z = null;
        v = null;
        delete w;
        delete o;
        delete p;
        return true
    },
    _createWaterMarkImage: function(h) {
        var g = this;
        var c = document.createElement("canvas");
        var l = c.getContext("2d");
        var b = 200;
        var i = 20;
        c.width = b;
        c.height = i;
        l.clearRect(0, 0, b, i);
        l.fillStyle = "transparent";
        l.fillRect(0, 0, b, i);
        l.font = "12px monospace";
        l.textAlign = "center";
        l.textBaseline = "bottom";
        l.lineWidth = 2;
        var f = l.measureText(this._waterMark);
        var e = f.width;
        var a = (c.width / 2) - (e / 2);
        var d = (c.height / 2);
        l.strokeStyle = applicationSettings.waterMarkStrokeColor;
        l.strokeText(this._waterMark, b / 2, i);
        l.fillStyle = applicationSettings.waterMarkFillColor;
        l.fillText(this._waterMark, b / 2, i);
        c.toBlob(function(m) {
            var n = g._createObjectURL(m);
            h(n)
        })
    },
    _showWaterMark: function() {
        if (!this._waterMark) {
            return
        }
        if (!this.WaterMarkImage) {
            return
        }
        var b = $(this.Container).width();
        var a = 5;
        if (this.isFit()) {
            a += VERTICAL_PAGE_INTERVAL
        }
        $(".h5v-water-mark").css({
            left: (b - 200) / 2,
            bottom: 5,
            visibility: "visible"
        })
    },
    _hideWaterMark: function() {
        if (!this._waterMark) {
            return
        }
        if (!this.WaterMarkImage) {
            return
        }
        $(".h5v-water-mark").css(visibility, "hidden")
    },
    _createObjectURL: function(a) {
        if (window.URL && window.URL.createObjectURL) {
            return window.URL.createObjectURL(a)
        } else {
            if (window.webkitURL && window.webkitURL.createObject) {
                return window.webkitURL.createObjectURL(a)
            } else {
                return "data:" + mimeType + ";base64," + window.Base64.encode(a)
            }
        }
    },
    _revokeObjectURL: function(a) {
        if (window.URL && window.URL.revokeObjectURL) {
            window.URL.revokeObjectURL(a)
        } else {
            if (window.webkitURL && window.webkitURL.revokeObjectURL) {
                window.webkitURL.revokeObjectURL(a)
            }
        }
    },
    _isFlickMovePageNo: function(l, a) {
        var p = l.latest.time;
        var c = l.current.time;
        var g = c - p;
        var h = l.current.x - l.latest.x;
        var d = l.current.y - l.latest.y;
        var b = Math.abs(h) > Math.abs(d) ? h : d;
        var f = b / g;
        var n = ($.os.is_Pc) ? FLICK_RECOGNIZE_SPEED : FLICK_RECOGNIZE_SPEED_SP;
        if (g <= FLICK_RECOGNIZE_TIME && Math.abs(f) >= n) {
            var m;
            var o = this.Pager.getPageIndexNo(a);
            if (Math.abs(h) > Math.abs(d)) {
                if (1 == this.DispDirection) {
                    return this._currentPageNoes[0]
                }
                if (h < 0) {
                    if (this.PageViewType == VIEW_TYPE.rtl) {
                        var i = this.Pager.getIndexPageNo(this.Pager.getPrevIndexNo(o));
                        if (null != i && i.length > 0) {
                            m = i[0]
                        }
                    } else {
                        var i = this.Pager.getIndexPageNo(this.Pager.getNextIndexNo(o));
                        if (null != i && i.length > 0) {
                            m = i[0]
                        } else {
                            if (o >= this.Pager.getLastIndexNo()) {
                                m = -1
                            }
                        }
                    }
                } else {
                    if (this.PageViewType == VIEW_TYPE.rtl) {
                        var i = this.Pager.getIndexPageNo(this.Pager.getNextIndexNo(o));
                        if (null != i && i.length > 0) {
                            m = i[0]
                        } else {
                            if (o >= this.Pager.getLastIndexNo()) {
                                m = -1
                            }
                        }
                    } else {
                        var i = this.Pager.getIndexPageNo(this.Pager.getPrevIndexNo(o));
                        if (null != i && i.length > 0) {
                            m = i[0]
                        }
                    }
                }
            } else {
                if (0 == this.DispDirection) {
                    return this._currentPageNoes[0]
                }
                if (d < 0) {
                    var i = this.Pager.getIndexPageNo(this.Pager.getNextIndexNo(o));
                    if (null != i && i.length > 0) {
                        m = i[0]
                    } else {
                        if (o >= this.Pager.getLastIndexNo()) {
                            m = -1
                        }
                    }
                } else {
                    var i = this.Pager.getIndexPageNo(this.Pager.getPrevIndexNo(o));
                    if (null != i && i.length > 0) {
                        m = i[0]
                    }
                }
            }
            if (null != m) {
                if (0 > m) {
                    if (applicationSettings.lastPageType != 1) {
                        $(this).trigger("displastpage");
                        return
                    }
                } else {
                    return m
                }
            }
        }
        return this._currentPageNoes[0]
    },
    _scaling: function(b, d) {
        var d = this.getDisplayPosToContainer(d);
        if (b < 1) {
            b = 1
        }
        if (b > 2) {
            b = 2
        }
        if (b <= 1) {
            this.resetScaling();
            return
        }
        var a = d.x;
        var c = d.y;
        $(this.ScaleContainer).css({
            "-webkit-transform-origin": a + "px " + c + "px",
            "-moz-transform-origin": a + "px " + c + "px",
            "-o-transform-origin": a + "px " + c + "px",
            "-ms-transform-origin": a + "px " + c + "px",
            "transform-origin": a + "px " + c + "px",
            "-webkit-transition-duration": "0s",
            "-moz-transition-duration": "0s",
            "-o-transition-duration": "0s",
            "-ms-transition-duration": "0s",
            "-webkit-transition-duration": "0s",
            "-webkit-transform": "scale(" + b + ")",
            "-moz-transform": "scale(" + b + ")",
            "-o-transform": "scale(" + b + ")",
            "-ms-transform": "scale(" + b + ")",
            transform: "scale(" + b + ")"
        });
        this.ScaleRatio = b;
        this.translate(0, 0)
    },
    _resizeTo: function(B) {
        var w = this.DispDirection;
        this.ScaleRatio = 1;
        $(this.ScaleContainer).css({
            "-webkit-transform-origin": "0px 0px",
            "-moz-transform-origin": "0px 0px",
            "-o-transform-origin": "0px 0px",
            "-ms-transform-origin": "0px 0px",
            "transform-origin": "0px 0px",
            "-webkit-transition-duration": "0s",
            "-moz-transition-duration": "0s",
            "-o-transition-duration": "0s",
            "-ms-transition-duration": "0s",
            "-webkit-transition-duration": "0s",
            "-webkit-transform": "scale(" + this.ScaleRatio + ")",
            "-moz-transform": "scale(" + this.ScaleRatio + ")",
            "-o-transform": "scale(" + this.ScaleRatio + ")",
            "-ms-transform": "scale(" + this.ScaleRatio + ")",
            transform: "scale(" + this.ScaleRatio + ")"
        });
        var q = this.Pager.PageIndexList.length;
        if (this.Pager.lastHtmlPageUrl && applicationSettings.lastPageType == 1) {
            q++
        }
        var n = $(this.Container).width();
        var p = $(this.Container).height();
        var m = 0;
        var h = 0;
        var u = p;
        if (this.isFit() && this._defaultImageSize) {
            this._onHorizontalFitChange(true);
            if (this.DispDirection != 1) {
                this.DispDirection = 1
            }
            var g = n / this._defaultImageSize.width;
            var u = this._defaultImageSize.height * g;
            $(this.ScrollContainer).css({
                width: n,
                height: u * q + (VERTICAL_PAGE_INTERVAL * g * (q - 1)),
                left: m,
                top: h
            })
        } else {
            this.DispDirection = this.Direction;
            this._onHorizontalFitChange(false);
            if (this.DispDirection == 0) {
                if (this.PageViewType == VIEW_TYPE.rtl) {
                    m = 0 - (n * (q - 1))
                }
                $(this.ScrollContainer).css({
                    width: n * q,
                    height: "100%",
                    left: m,
                    top: h
                });
                if (this.DispDirection != 0) {
                    this.DispDirection = 0
                }
            } else {
                $(this.ScrollContainer).css({
                    width: n,
                    height: p * q + (VERTICAL_PAGE_INTERVAL * (q - 1)),
                    left: m,
                    top: h
                });
                if (this.DispDirection != 1) {
                    this.DispDirection = 1
                }
            }
        }
        $(this.ScrollContainer).css({
            position: "absolute",
            "-webkit-transform-origin": "0px 0px",
            "-moz-transform-origin": "0px 0px",
            "-o-transform-origin": "0px 0px",
            "-ms-transform-origin": "0px 0px",
            "transform-origin": "0px 0px",
            "-webkit-transition-duration": "0s",
            "-moz-transition-duration": "0s",
            "-o-transition-duration": "0s",
            "-ms-transition-duration": "0s",
            "-webkit-transition-duration": "0s",
            "-webkit-transform": "translate(0px, 0px)",
            "-moz-transform": "translate(0px, 0px)",
            "-o-transform": "translate(0px, 0px)",
            "-ms-transform": "translate(0px, 0px)",
            transform: "translate(0px, 0px)"
        });
        m = 0;
        h = 0;
        var v = n;
        var u = p;
        var s = v;
        var o = u;
        if (this.isFit() && this._defaultImageSize) {
            var g = n / this._defaultImageSize.width;
            u = this._defaultImageSize.height * g;
            o = u + (VERTICAL_PAGE_INTERVAL * g);
            s = 0
        } else {
            if (this.DispDirection == 0) {
                o = 0;
                if (this.PageViewType == VIEW_TYPE.rtl) {
                    s = 0 - s;
                    m = n * (q - 1)
                }
            } else {
                s = 0;
                o += VERTICAL_PAGE_INTERVAL
            }
        }
        for (var z = 0; z < q; z++) {
            var C = $("#h5v-pgcontainer-" + z).css({
                position: "absolute",
                left: m,
                top: h,
                width: v,
                height: u
            });
            var l = v;
            var A = u;
            var a = this.Pager.PageIndexList[z];
            if (!a) {
                continue
            }
            if (a.length >= 2) {
                l = n / 2 + 1
            }
            for (j = 0; j < a.length; j++) {
                var D = a[j];
                var c = 0;
                var b = 0;
                var f = "center";
                if (a.length >= 2) {
                    if (this.PageViewType == VIEW_TYPE.rtl && j <= 0) {
                        c = l - 1;
                        f = "right"
                    } else {
                        f = "left"
                    }
                }
                var t = $("#h5v-imgcontainer-" + D).data("h5v-img-pos", f).css({
                    position: "absolute",
                    left: c,
                    top: b,
                    width: l,
                    height: A
                });
                this._resizeImageTo(D)
            }
            m += s;
            h += o
        }
        this._showWaterMark();
        if (this._currentPageNoes) {
            var d = this;
            this.scrollTo(this._currentPageNoes[0], function(e) {
                d._onPageChanged(e)
            })
        }
        if (this.DispDirection != w) {
            $(this).trigger("directionchange", [this.DispDirection])
        }
    },
    _resizeImageTo: function(b) {
        var a = $("#h5v-img-" + b);
        if (a.length > 0 && a.data("h5v-img-status") == "loaded") {
            var q = $("#h5v-imgcontainer-" + b);
            var m = q.width();
            var p = q.height();
            var l = q.data("h5v-img-pos");
            var o = a.width();
            var e = a.height();
            if (0 >= o) {
                o = a[0].naturalWidth
            }
            if (0 >= e) {
                e = a[0].naturalHeight
            }
            if (!this._defaultImageSize) {
                this._defaultImageSize = {
                    width: o,
                    height: e
                };
                if (this.isFit()) {
                    this._resizeTo();
                    if (null != this.reserveFitMovePage) {
                        this.movePage(this.reserveFitMovePage, 0, this.reserveFitCallback)
                    }
                    return
                }
            }
            var h = m / o;
            var g = p / e;
            var f = (h > g) ? g : h;
            if (this.isFit()) {
                f = h
            }
            var c = o * f;
            var n = e * f;
            var d = 0;
            var i = (p - n) / 2;
            if (this.isFit()) {
                i = 0
            }
            if (l == "left") {
                d = m - c
            } else {
                if (l == "center") {
                    d = (m - c) / 2
                }
            }
            a.css({
                position: "relative",
                left: d,
                top: i,
                "-webkit-transform-origin": "top left",
                "-moz-transform-origin": "top left",
                "-o-transform-origin": "top left",
                "-ms-transform-origin": "top left",
                "transform-origin": "top left",
                "-webkit-transform": "scale(" + f + ")",
                "-moz-transform": "scale(" + f + ")",
                "-o-transform": "scale(" + f + ")",
                "-ms-transform": "scale(" + f + ")",
                transform: "scale(" + f + ")"
            })
        }
    }
};
var TemplateLoader = {
    load: function(b, d, c) {
        if (typeof b != "string") {
            this.loads(b, d);
            return
        }
        var a = "./templates/" + b;
        $.ajax({
            async: false,
            cache: false,
            dataType: "text",
            url: a,
            success: function(e) {
                if (typeof d == "string") {
                    d = $("#" + d)
                } else {
                    if (!(d instanceof JQuery)) {
                        d = $(d)
                    }
                }
                d.append(e);
                if (null != c && typeof c == "function") {
                    c(d)
                }
            },
            error: function(e, g, f) {
                H5V.showError(TranslateMessages.message["msg_template_error"], TranslateMessages.message["title_error"])
            }
        })
    },
    loads: function(f, h) {
        var e = 0;
        for (var c = 0, a = f.length; c < a; c++) {
            var d = f[c];
            var g = d.path;
            var b = d.container;
            this.load(g, b, function(i) {
                e++;
                if (e >= f.length) {
                    h(f)
                }
            })
        }
    }
};
var nativeSetInterval = window.setInterval;
var nativeClearInterval = window.clearInterval;
_setInterval = {};
window.setInterval = function(c, a) {
    var b;
    if (typeof c == "string") {
        b = new _setInterval.Entry(new Function(c),a)
    } else {
        if (typeof c == "function") {
            b = new _setInterval.Entry(c,a)
        } else {
            throw Error("第一引数が不正")
        }
    }
    var d = _setInterval.queue.length;
    _setInterval.queue[d] = b;
    return d
}
;
window.clearInterval = function(a) {
    if (undefined == a || null == a) {
        return
    }
    if (a in _setInterval.queue) {
        _setInterval.queue[a].loop = function() {}
    }
}
;
window.clearIntervalAll = function() {
    var a = _setInterval.queue.length;
    for (var b = 0; b < a; b++) {
        window.clearInterval(b)
    }
    _setInterval = null;
    delete _setInterval;
    window.setInterval = nativeSetInterval;
    window.clearInterval = nativeClearInterval;
    if (window.removeEventListener) {
        window.removeEventListener("unload", window.clearIntervalAll, false)
    } else {
        if (window.detachEvent) {
            window.detachEvent("onunload", window.clearIntervalAll)
        } else {
            window.onunload = null
        }
    }
}
;
_setInterval.queue = [];
_setInterval.Entry = function(b, a) {
    this.process = b;
    this.delay = a;
    this.time = 0
}
;
_setInterval.Entry.prototype.loop = function(a) {
    this.time += a;
    while (this.time >= this.delay) {
        this.process();
        this.time -= this.delay
    }
}
;
_setInterval.lastTime = new Date().getTime();
nativeSetInterval(function() {
    var d = new Date().getTime();
    var b = d - _setInterval.lastTime;
    _setInterval.lastTime = d;
    var a = _setInterval.queue.length;
    for (var c = 0; c < a; c++) {
        _setInterval.queue[c].loop(b)
    }
}, 10);
if (window.addEventListener) {
    window.addEventListener("unload", window.clearIntervalAll, true)
} else {
    if (window.attachEvent) {
        var r = window.attachEvent("onunload", window.clearIntervalAll)
    } else {
        window.onunload = window.clearIntervalAll
    }
}
$(document).ready(function() {
    H5V = {
        startView: function() {
            this.Connector = new Connector(serverSettings);
            window.Viewer = {
                Navi: {
                    Connector: H5V.Connector
                }
            };
            var a = this;
            this.Connector.initConnection(function(b) {
                a.initView.apply(a, arguments)
            })
        },
        settingInitialized: function() {
            this.settingInitFlg = true;
            this.checkInitialize()
        },
        templateLoaded: function() {
            this.templateInitFlg = true;
            this.checkInitialize()
        },
        checkInitialize: function() {
            if (this.settingInitFlg && this.templateInitFlg) {
                $("#H5V_SPLASH_SCREEN").css("display", "none");
                this.Navigation.start()
            }
        },
        initView: function(b) {
            var a = this;
            this.Navigation = new H5V_Navigation(b);
            var d = new Date().getTime();
            var c = [];
            if (applicationSettings.useInformation) {
                c.push({
                    path: "information.html",
                    container: "H5V_INFORMATION_CONTAINER"
                })
            }
            if (applicationSettings.useMenu) {
                c.push({
                    path: "menu.html",
                    container: "H5V_CONTROLLER_CONTAINER"
                })
            }
            if (applicationSettings.useIndex) {
                c.push({
                    path: "dialog/index/index.html",
                    container: "H5V_DIALOG_CONTAINER"
                })
            }
            if (applicationSettings.useGuide) {
                c.push({
                    path: "dialog/guide/guide.html",
                    container: "H5V_DIALOG_CONTAINER"
                })
            }
            if (c.length > 0) {
                this.templateInitFlg = false;
                TemplateLoader.loads(c, function(f) {
                    a.templateLoaded()
                })
            } else {
                this.templateInitFlg = true
            }
        },
        showError: function(b, a) {
            if (this.errorShown) {
                return
            }
            this.errorShown = true;
            jAlert(b, a)
        },
        openWin: function(b, a) {
            if (window.isStandAlone) {
                location.href = b
            } else {
                var c = window.open(b, a);
                c.focus()
            }
        },
        closeWin: function() {
            if (window.isStandAlone) {
                url = StorageManager.getItem("prev_url");
                if (!url) {
                    url = location.protocol + "//" + location.hostname
                }
                window.location.href = url;
                return
            }
            window.open("about:blank", "_self").close()
        }
    };
    window.isStandAlone = navigator.standalone || (screen.height - document.documentElement.clientHeight < 40);
    if (!window.isStandAlone) {
        CommonLibrary.resizeFullScreen()
    }
    initSettings();
    initParams();
    H5V.startView()
});
function initSettings() {
    if (typeof TranslateMessages == "undefined") {
        var b = getLanguage();
        var a = "./js/async/translate_messages/" + b + ".js";
        CommonLibrary.loadScripts(a, function() {
            if (typeof TranslateMessages == "undefined") {
                CommonLibrary.loadScripts("./js/async/translate_messages/ja.js", function() {
                    H5V.settingInitialized()
                });
                return
            }
            H5V.settingInitialized()
        })
    }
}
function initParams() {
    var d = null;
    var n = [];
    var q = document.location.search;
    if (q) {
        var e = q.substring(1).split("&");
        var f = {};
        var p = e.length;
        for (var l = 0; l < p; l++) {
            var g = e[l].split("=");
            if (g[0]) {
                f[g[0]] = decodeURIComponent(g[1])
            }
        }
        d = f
    }
    if (!d) {
        H5V.showError("パラメーターエラー", "ERROR");
        return
    }
    var h = "";
    for (var l = 1; l <= 50; l++) {
        var t = PARAM_BOOK_ID + l.toString();
        if (t in d) {
            var key2 = localStorage.getItem("key2");
            if(t=="key2"&&typeof(key2)!="undefined"&&key2!="")d[t] = key2;
            else if(t=="key4")d[t] = (Array(4).join(0) + (parseInt(d[t])+1)).slice(-4) + "-0"
            n.push(d[t]);
            h += d[t]
        } else {
            break
        }
    }
    var m = d[PARAM_BUY_FLAG];
    var o = d[PARAM_START_PAGE];
    h += 1;
    h += o;
    h += serverSettings.hashSaltKey;
    z = HashLibrary.SHA1.calc(h);
    d[PARAM_HASH_HACK] = z;
    var a = d[PARAM_HASH];
    var s = null;
    if (PARAM_OTK in d) {
        s = d[PARAM_OTK]
    }
    var c = false;
    if (PARAM_LAST_CLOSE in d) {
        c = d[PARAM_LAST_CLOSE]
    }
    /*if (serverSettings.isStandAlone) {
        h += m;
        h += o;
        h += serverSettings.hashSaltKey;
        var b = HashLibrary.SHA1.calc(h);
        if (b.toLowerCase() != a.toLowerCase()) {
            H5V.showError("パラメーターエラー", "ERROR");
            return
        }
    }*/
    window.h5vParams = {
        queryParams: d,
        contentsKeys: n,
        readType: m,
        startPage: o,
        paramHash: a,
        paramHash_hack: z,
        paramOtk: s,
        paramLastClose: c
    }
}
function getLanguage() {
    var a;
    if (document.all) {
        if (window.navigator.browserLanguage.match(/ja/)) {
            a = "ja"
        } else {
            if (window.navigator.browserLanguage.match(/en/)) {
                a = "en"
            } else {
                a = window.navigator.browserLanguage
            }
        }
    } else {
        if (document.layers || document.getElementById) {
            if (window.navigator.language.match(/ja/)) {
                a = "ja"
            } else {
                if (window.navigator.language.match(/en/)) {
                    a = "en"
                } else {
                    a = window.navigator.language
                }
            }
        } else {
            a = "?"
        }
    }
    return a
}
function debug(e) {
    if ($("#DEBUG").length <= 0) {
        $('<div id="DEBUG" style="position:absolute;left:0;bottom:100px;z-index:999999;opacity:.5;"><textarea cols="30" rows="5"></textarea></div>').appendTo("body")
    }
    var a = $("#DEBUG textarea").text();
    if (typeof e == "array") {
        e = e.toString()
    }
    if (typeof e == "object") {
        var c = "";
        for (key in e) {
            var b = e[key];
            if (typeof b == "array") {
                b = e[key].toString()
            }
            if (typeof b == "object") {
                var d = "";
                for (k in b) {
                    d += k + "->" + b[k] + ","
                }
                b = d
            }
            c += key + ":" + b + "\n"
        }
        e = c
    }
    a += "\n" + e;
    $("#DEBUG textarea").text(a);
    $("#DEBUG textarea")[0].scrollTop = $("#DEBUG textarea")[0].scrollHeight
}
window.onerror = function(e, d, a, c, b) {
    console.log(e + " =>" + a)
}
;
window.onbeforeunload = function() {}
;
window.onunload = function() {}
;
window.addEventListener("pageshow", function(a) {
    if (a.persisted) {
        window.location.reload()
    }
});
