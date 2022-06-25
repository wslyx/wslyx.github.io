var BSR4B = BSR4B || {};
BSR4B.Common = BSR4B.Common || {};
(function(c, a) {
    var b = {
        isGAObject: function() {
            if (c.hasOwnProperty("ga")) {
                if (typeof c.ga == "function") {
                    return true;
                }
            }
            return false;
        },
        sendEvent: function(f, h, d, g) {
            if (b.isGAObject() == false) {
                return;
            }
            try {
                ga("send", "event", f, h, d, g);
            } catch (i) {}
        },
        sendEventPageChange: function(e, d) {
            var f = "" + e;
            b.sendEvent("PAGE", "change", f, d);
        },
        sendEventFinishReading: function() {
            b.sendEvent("PAGE", "finish", "", 0);
        },
        sendEventUI: function(d) {
            b.sendEvent("UI", d, "", 0);
        }
    };
    a.GAHelper = b;
}
)(window, BSR4B.Common);
(function(e, c) {
    var d = (function() {
        var f = function(h) {
            this._id = h;
            this._is_reading = false;
            this._init();
        };
        var g = f.prototype;
        g._init = function() {}
        ;
        g.getId = function() {
            return this._id;
        }
        ;
        g.setReading = function() {
            this._is_reading = true;
        }
        ;
        g.isReading = function() {
            return this._is_reading;
        }
        ;
        return f;
    }
    )();
    var a = (function() {
        var f = function() {
            this._reading_page_datas = [];
            this._is_send_finish_reading = true;
            this._page_index = -1;
            this._init();
        };
        f.FINISH_LINE_PER = 0.9;
        var g = f.prototype;
        g._init = function() {}
        ;
        g.toString = function() {
            var j = "";
            var h = this._reading_page_datas.length;
            var n = null;
            var l = 0;
            for (var k = 0; k < h; k++) {
                n = this._reading_page_datas[k];
                j += " " + n.getId() + ":";
                if (n.isReading()) {
                    j += "■";
                    l++;
                } else {
                    j += "□";
                }
            }
            j += "  " + Math.floor(100 * (l / h)) + "%";
            return j;
        }
        ;
        g.initialize = function(j) {
            this._is_send_finish_reading = true;
            this._page_index = -1;
            this._reading_page_datas.length = 0;
            for (var h = 0; h < j; h++) {
                this._reading_page_datas.push(new d(h));
            }
        }
        ;
        g.saveReadingPage = function(h) {
            if (h < 0) {
                return;
            }
            if (h >= this._reading_page_datas.length) {
                return;
            }
            this._page_index = h;
            var i = this._reading_page_datas[h];
            i.setReading();
        }
        ;
        g.getReadingPageDatas = function() {
            return this._reading_page_datas;
        }
        ;
        g.getReadingPercentage = function() {
            var h = this._reading_page_datas.length;
            var l = null;
            var k = 0;
            for (var j = 0; j < h; j++) {
                l = this._reading_page_datas[j];
                if (l.isReading()) {
                    k++;
                }
            }
            return Math.floor(100 * (k / h));
        }
        ;
        g.judgeFinishReading = function() {
            var i = f.FINISH_LINE_PER;
            var h = (this._page_index + 1) / this._reading_page_datas.length;
            return (h >= i);
        }
        ;
        g.isSendFinishReading = function() {
            if (this._is_send_finish_reading == false) {
                return false;
            }
            if (this.judgeFinishReading()) {
                this._is_send_finish_reading = false;
                return true;
            }
            return false;
        }
        ;
        return f;
    }
    )();
    c.ReadingThrough = new a();
    var b = (function() {
        var f = function() {
            this._is_send_finish_reading = true;
            this._finish_page_pos = -1;
            this._is_judge_permission = false;
            this._api = "";
            this._init();
        };
        f.FINISH_LINE_PER = 0.9;
        var g = f.prototype;
        g._init = function() {}
        ;
        g.initialize = function(i, h) {
            if (typeof h != "string") {
                return;
            }
            if (h === "") {
                return;
            }
            this._is_send_finish_reading = false;
            this._is_judge_permission = false;
            this._api = h;
            this._finish_page_pos = Math.ceil(i * f.FINISH_LINE_PER);
        }
        ;
        g.judgeFinishAPICall = function(i) {
            if (this._is_send_finish_reading) {
                return;
            }
            var h = i + 1;
            if (h < this._finish_page_pos) {
                this._is_judge_permission = true;
                return;
            }
            if (!this._is_judge_permission) {
                return;
            }
            this._is_send_finish_reading = true;
            e.ajax({
                type: "GET",
                url: this._api,
                timeout: 3000,
                success: function() {}
            });
        }
        ;
        return f;
    }
    )();
    c.FinishReading = new b();
}
)(jQuery, BSR4B.Common);
(function(c, b) {
    var d = (function() {
        var e = function() {
            this._version_data = null;
            this._os = null;
            this._init();
        };
        e.OS = {
            Other: 0,
            Android: 1,
            iOS: 2,
            FirefoxOS: 3
        };
        e.COMPARISON = {
            None: 0,
            Yes: 1,
            Even: 2,
            No: 3
        };
        e.isiOSToUserAgent = function(j) {
            var k = false;
            var h = ["iPhone", "iPad", "iPod"];
            var g = 0;
            var f = h.length;
            for (g = 0; g < f; g++) {
                if (j.indexOf(h[g]) !== -1) {
                    k = true;
                    break;
                }
            }
            return k;
        }
        ;
        e.isAndroidToUserAgent = function(f) {
            var g = false;
            if (f.indexOf("Android") !== -1) {
                g = true;
            }
            return g;
        }
        ;
        e.isFirefoxOSToUserAgent = function(j) {
            var k = "Firefox";
            var i = "Mobile";
            var h = "Tablet";
            var g = e.isAndroidToUserAgent(j);
            var l = e.isiOSToUserAgent(j);
            var f = false;
            if ((!g) && (!l)) {
                if (j.indexOf(k) !== -1) {
                    if ((j.indexOf(i) !== -1) || (j.indexOf(h) !== -1)) {
                        f = true;
                    }
                }
            }
            return f;
        }
        ;
        e.prototype = {
            getVersionData: function() {
                return this._version_data;
            },
            isiOS: function() {
                return (this._os == e.OS.iOS);
            },
            isAndroid: function() {
                return (this._os == e.OS.Android);
            },
            isFirefoxOS: function() {
                return (this._os == e.OS.FirefoxOS);
            },
            setUserAgent: function(f) {
                var g = [];
                this._os = e.OS.Other;
                if (e.isiOSToUserAgent(f)) {
                    this._os = e.OS.iOS;
                    g = this._parseiOSVersion(f);
                } else {
                    if (e.isAndroidToUserAgent(f)) {
                        this._os = e.OS.Android;
                        g = this._parseAndroidVersion(f);
                    } else {
                        if (e.isFirefoxOSToUserAgent(f)) {
                            this._os = e.OS.FirefoxOS;
                            g = this._parseFirefoxOSVersion(f);
                        }
                    }
                }
                this._version_data.updateData(g);
            },
            thanMore: function(h) {
                var g = this._createVersionData(h);
                var f = this._judgeVersion(this._version_data, g);
                g = null;
                return (f == e.COMPARISON.Yes);
            },
            thanLess: function(h) {
                var g = this._createVersionData(h);
                var f = this._judgeVersion(this._version_data, g);
                g = null;
                return (f == e.COMPARISON.No);
            },
            orMore: function(h) {
                var g = this._createVersionData(h);
                var f = this._judgeVersion(this._version_data, g);
                g = null;
                return ((f == e.COMPARISON.Yes) || (f == e.COMPARISON.Even));
            },
            orLess: function(h) {
                var g = this._createVersionData(h);
                var f = this._judgeVersion(this._version_data, g);
                g = null;
                return ((f == e.COMPARISON.No) || (f == e.COMPARISON.Even));
            },
            _init: function() {
                this._version_data = new a();
                this._os = e.OS.Other;
            },
            _parseAndroidVersion: function(h) {
                var g = null;
                var i = null;
                var f = [];
                while (true) {
                    i = /Android (\d+)\.(\d+)\.(\d+)/i;
                    if (i.test(h)) {
                        f = i.exec(h);
                        break;
                    }
                    i = /Android (\d+)\.(\d+)/i;
                    if (i.test(h)) {
                        f = i.exec(h);
                        break;
                    }
                    i = /Android (\d+)/i;
                    if (i.test(h)) {
                        f = i.exec(h);
                        break;
                    }
                    break;
                }
                if (f.length >= 2) {
                    f.splice(0, 1);
                } else {
                    f = [];
                }
                return f;
            },
            _parseiOSVersion: function(h) {
                var g = null;
                var i = null;
                var f = [];
                while (true) {
                    i = /OS (\d+)\_(\d+)\_(\d+)/i;
                    if (i.test(h)) {
                        f = i.exec(h);
                        break;
                    }
                    i = /OS (\d+)\_(\d+)/i;
                    if (i.test(h)) {
                        f = i.exec(h);
                        break;
                    }
                    i = /OS (\d+)/i;
                    if (i.test(h)) {
                        f = i.exec(h);
                        break;
                    }
                    break;
                }
                if (f.length >= 2) {
                    f.splice(0, 1);
                } else {
                    f = [];
                }
                return f;
            },
            _parseFirefoxOSVersion: function(i) {
                var g = null;
                var j = null;
                var f = [];
                var h = [];
                var l = 0;
                var k = 0;
                while (true) {
                    j = /Gecko\/(\d+)\.(\d+)\.(\d+)/i;
                    if (j.test(i)) {
                        f = j.exec(i);
                        break;
                    }
                    j = /Gecko\/(\d+)\.(\d+)/i;
                    if (j.test(i)) {
                        f = j.exec(i);
                        break;
                    }
                    j = /Gecko\/(\d+)/i;
                    if (j.test(i)) {
                        f = j.exec(i);
                        break;
                    }
                    break;
                }
                if (f.length >= 2) {
                    l = f[1];
                    if (f.length >= 3) {
                        k = f[2];
                    }
                }
                if (l >= 32) {
                    h = [2, 0, 0];
                } else {
                    if (l >= 30) {
                        h = [1, 4, 0];
                    } else {
                        if (l >= 28) {
                            h = [1, 3, 0];
                        } else {
                            if (l >= 26) {
                                h = [1, 2, 0];
                            } else {
                                if (l >= 18) {
                                    if ((l == 18) && (k == 0)) {
                                        h = [1, 0, 1];
                                    } else {
                                        h = [1, 1, 0];
                                    }
                                } else {
                                    h = [1, 0, 0];
                                }
                            }
                        }
                    }
                }
                return h;
            },
            _createVersionData: function(h) {
                var g = h.split(".");
                var f = new a();
                f.updateData(g);
                return f;
            },
            _judgeVersion: function(h, g) {
                var f = e.COMPARISON.None;
                while (true) {
                    if (h.major > g.major) {
                        f = e.COMPARISON.Yes;
                        break;
                    }
                    if (h.major < g.major) {
                        f = e.COMPARISON.No;
                        break;
                    }
                    if (h.minor > g.minor) {
                        f = e.COMPARISON.Yes;
                        break;
                    }
                    if (h.minor < g.minor) {
                        f = e.COMPARISON.No;
                        break;
                    }
                    if (h.revision > g.revision) {
                        f = e.COMPARISON.Yes;
                        break;
                    }
                    if (h.revision < g.revision) {
                        f = e.COMPARISON.No;
                        break;
                    }
                    if (h.build > g.build) {
                        f = e.COMPARISON.Yes;
                        break;
                    }
                    if (h.build < g.build) {
                        f = e.COMPARISON.No;
                        break;
                    }
                    f = e.COMPARISON.Even;
                    break;
                }
                return f;
            }
        };
        return e;
    }
    )();
    var a = (function() {
        var e = function() {
            this.major = 0;
            this.minor = 0;
            this.revision = 0;
            this.build = 0;
        };
        e.prototype = {
            reset: function() {
                this.major = 0;
                this.minor = 0;
                this.revision = 0;
                this.build = 0;
            },
            updateData: function(h) {
                var j = 0;
                var g = 0;
                var f = h.length;
                this.reset();
                for (g = 0; g < f; g++) {
                    j = h[g];
                    switch (g) {
                    case 0:
                        this.major = j >> 0;
                        break;
                    case 1:
                        this.minor = j >> 0;
                        break;
                    case 2:
                        this.revision = j >> 0;
                        break;
                    case 3:
                        this.build = j >> 0;
                        break;
                    default:
                    }
                }
            },
            toVersionString: function() {
                return this.major + "." + this.minor + "." + this.revision + "." + this.build;
            }
        };
        return e;
    }
    )();
    b.VersionCheck = d;
    b.VersionData = a;
}
)(jQuery, BSR4B.Common);
(function(b) {
    var a = b.pageonearlier = {
        _earlier_page_index: -1,
        _earlier_koma_index: -1,
        init: function() {
            this._earlier_page_index = -1;
            this._earlier_koma_index = -1;
        },
        isEarlier: function() {
            return (this._earlier_page_index >= 0);
        },
        setEarlierPageIndex: function(c) {
            this._earlier_page_index = c;
        },
        setEarlierKomaIndex: function(c) {
            this._earlier_koma_index = c;
        },
        getEarlierPageIndex: function() {
            return this._earlier_page_index;
        },
        getEarlierKomaIndex: function() {
            return this._earlier_koma_index;
        }
    };
}
)(jQuery);
var Interaction = Interaction || {};
(function(a) {
    (function(f, c) {
        var b = {
            EVENTS: {
                POINTER_DOWN: "pointerdown",
                POINTER_MOVE: "pointermove",
                POINTER_UP: "pointerup",
                POINTER_CANCEL: "pointercancel",
                MS_POINTER_DOWN: "MSPointerDown",
                MS_POINTER_MOVE: "MSPointerMove",
                MS_POINTER_UP: "MSPointerUp",
                MS_POINTER_CANCEL: "MSPointerCancel"
            }
        };
        var e = (function() {
            var g = function() {
                this._pointerObjects = [];
                this._init();
            };
            g.prototype = {
                addPointer: function(i) {
                    this._addPointer(i);
                },
                removePointer: function(i) {
                    this._removePointer(i);
                },
                updatePointer: function(i) {
                    this._updatePointer(i);
                },
                getPointers: function() {
                    return this._getPointers();
                },
                _init: function() {
                    this._pointerObjects = [];
                },
                _addPointer: function(i) {
                    this._pointerObjects.push(this._createPointerObject(i));
                },
                _removePointer: function(n) {
                    var k = n.pointerId;
                    var l = 0;
                    var j = this._pointerObjects.length;
                    for (l = 0; l < j; l++) {
                        if (this._pointerObjects[l].id == k) {
                            this._pointerObjects.splice(l, 1);
                            break;
                        }
                    }
                },
                _updatePointer: function(n) {
                    var k = n.pointerId;
                    var l = 0;
                    var j = this._pointerObjects.length;
                    for (l = 0; l < j; l++) {
                        if (this._pointerObjects[l].id == k) {
                            this._pointerObjects[l] = this._createPointerObject(n);
                            break;
                        }
                    }
                },
                _getPointers: function() {
                    return this._pointerObjects;
                },
                _createPointerObject: function(i) {
                    var j = {};
                    j.id = i.pointerId;
                    j.pageX = i.pageX;
                    j.pageY = i.pageY;
                    return j;
                }
            };
            c.MultiPointerManager = g;
            var h = function(i) {
                this.params = {
                    is_MS: false,
                    element_id: "",
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null,
                    prevent_default_down: true,
                    prevent_default_move: true,
                    prevent_default_up: true,
                    prevent_default_cancel: true
                };
                f.extend(true, this.params, i);
                this.$element = null;
                this.$document = null;
                this._multi_event_manager = null;
                this._pointer_id = null;
                this._event_names = {
                    down: (this.params.is_MS) ? b.EVENTS.MS_POINTER_DOWN : b.EVENTS.POINTER_DOWN,
                    up: (this.params.is_MS) ? b.EVENTS.MS_POINTER_UP : b.EVENTS.POINTER_UP,
                    move: (this.params.is_MS) ? b.EVENTS.MS_POINTER_MOVE : b.EVENTS.POINTER_MOVE,
                    cancel: (this.params.is_MS) ? b.EVENTS.MS_POINTER_CANCEL : b.EVENTS.POINTER_CANCEL
                };
                this._init();
            };
            h.prototype = {
                addEventDown: function(i) {
                    if (typeof i === "function") {
                        this.params.call_down = i;
                    }
                },
                addEventUp: function(i) {
                    if (typeof i === "function") {
                        this.params.call_up = i;
                    }
                },
                addEventMove: function(i) {
                    if (typeof i === "function") {
                        this.params.call_move = i;
                    }
                },
                addEventCancel: function(i) {
                    if (typeof i === "function") {
                        this.params.call_cancel = i;
                    }
                },
                getMultiEvents: function() {
                    return this._multi_event_manager.getPointers();
                },
                _init: function() {
                    this.$element = f("#" + this.params.element_id);
                    this.$document = f(document);
                    this._multi_event_manager = new c.MultiPointerManager();
                    this._addEvents();
                },
                _addEvents: function() {
                    this.$element.on(this._event_names.down, f.proxy(this._onPointerDown, this));
                    this.$document.on(this._event_names.up, f.proxy(this._onPointerUp, this));
                    this.$element.on(this._event_names.move, f.proxy(this._onPointerMove, this));
                    this.$document.on(this._event_names.cancel, f.proxy(this._onPointerCancel, this));
                },
                _onPointerDown: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    this._multi_event_manager.addPointer(i);
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(i);
                    }
                    return this.params.prevent_default_down;
                },
                _onPointerUp: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    this._multi_event_manager.removePointer(i);
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(i);
                    }
                    return this.params.prevent_default_up;
                },
                _onPointerMove: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    this._multi_event_manager.updatePointer(i);
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(i);
                    }
                    return this.params.prevent_default_move;
                },
                _onPointerCancel: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    this._multi_event_manager.removePointer(i);
                    if (typeof this.params.call_cancel === "function") {
                        this.params.call_cancel(i);
                    }
                    return this.params.prevent_default_cancel;
                },
                _pickupEventObject: function(i) {
                    i = ("originalEvent"in i) ? i.originalEvent : i;
                    return i;
                }
            };
            return h;
        }
        )();
        c.MultiPointerEvent = e;
        var d = (function() {
            var g = function(h) {
                this.params = {
                    is_MS: false,
                    element_id: "",
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null,
                    prevent_default_down: true,
                    prevent_default_move: true,
                    prevent_default_up: true,
                    prevent_default_cancel: true
                };
                f.extend(true, this.params, h);
                this.$element = null;
                this.$document = null;
                this._pointer_id = null;
                this._event_names = {
                    down: (this.params.is_MS) ? b.EVENTS.MS_POINTER_DOWN : b.EVENTS.POINTER_DOWN,
                    up: (this.params.is_MS) ? b.EVENTS.MS_POINTER_UP : b.EVENTS.POINTER_UP,
                    move: (this.params.is_MS) ? b.EVENTS.MS_POINTER_MOVE : b.EVENTS.POINTER_MOVE,
                    cancel: (this.params.is_MS) ? b.EVENTS.MS_POINTER_CANCEL : b.EVENTS.POINTER_CANCEL
                };
                this._init();
            };
            g.prototype = {
                addEventDown: function(h) {
                    if (typeof h === "function") {
                        this.params.call_down = h;
                    }
                },
                addEventUp: function(h) {
                    if (typeof h === "function") {
                        this.params.call_up = h;
                    }
                },
                addEventMove: function(h) {
                    if (typeof h === "function") {
                        this.params.call_move = h;
                    }
                },
                addEventCancel: function(h) {
                    if (typeof h === "function") {
                        this.params.call_cancel = h;
                    }
                },
                _init: function() {
                    this.$element = f("#" + this.params.element_id);
                    this.$document = f(document);
                    this._event_names.down = this._createEventName(this._event_names.down);
                    this._event_names.up = this._createEventName(this._event_names.up);
                    this._event_names.move = this._createEventName(this._event_names.move);
                    this._event_names.cancel = this._createEventName(this._event_names.cancel);
                    this._addEvents();
                },
                _addEvents: function() {
                    this.$element.on(this._event_names.down, f.proxy(this._onPointerDown, this));
                },
                _addEventActive: function() {
                    this.$document.on(this._event_names.up, f.proxy(this._onPointerUp, this));
                    this.$document.on(this._event_names.move, f.proxy(this._onPointerMove, this));
                    this.$document.on(this._event_names.cancel, f.proxy(this._onPointerCancel, this));
                },
                _removeEventActive: function() {
                    this.$document.off(this._event_names.up, f.proxy(this._onPointerUp, this));
                    this.$document.off(this._event_names.move, f.proxy(this._onPointerMove, this));
                    this.$document.off(this._event_names.cancel, f.proxy(this._onPointerCancel, this));
                },
                _onPointerDown: function(i) {
                    var h = a.util.pickupOriginalEventObject(i);
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(h);
                    }
                    this._pointer_id = this._pickupPointerId(h);
                    this._addEventActive();
                    return this.params.prevent_default_down;
                },
                _onPointerUp: function(i) {
                    var h = a.util.pickupOriginalEventObject(i);
                    if (this._judgeEventMe(h)) {
                        if (typeof this.params.call_up === "function") {
                            this.params.call_up(h);
                        }
                        this._removeEventActive();
                        this._pointer_id = null;
                    }
                    return this.params.prevent_default_up;
                },
                _onPointerMove: function(i) {
                    var h = a.util.pickupOriginalEventObject(i);
                    if (this._judgeEventMe(h)) {
                        if (typeof this.params.call_move === "function") {
                            this.params.call_move(h);
                        }
                    }
                    return this.params.prevent_default_move;
                },
                _onPointerCancel: function(i) {
                    var h = a.util.pickupOriginalEventObject(i);
                    if (this._judgeEventMe(h)) {
                        if (typeof this.params.call_cancel === "function") {
                            this.params.call_cancel(h);
                        }
                        this._removeEventActive();
                        this._pointer_id = null;
                    }
                    return this.params.prevent_default_cancel;
                },
                _createEventName: function(h) {
                    var i = this.params.element_id + "";
                    if (i !== "") {
                        return h + "." + i;
                    } else {
                        return h;
                    }
                },
                _pickupPointerId: function(h) {
                    return (("pointerId"in h) ? h.pointerId : null);
                },
                _judgeEventMe: function(h) {
                    var i = this._pickupPointerId(h);
                    return (i == this._pointer_id);
                }
            };
            return g;
        }
        )();
        c.PointerEvent = d;
    }
    )(jQuery, a.eventboxs || (a.eventboxs = {}));
}
)(Interaction || (Interaction = {}));
(function(a) {
    (function(f, c) {
        var b = {
            EVENTS: {
                MOUSE_DOWN: "mousedown",
                MOUSE_MOVE: "mousemove",
                MOUSE_UP: "mouseup"
            }
        };
        var g = (function() {
            var h = function() {
                this._eventObjects = [];
                this._init();
            };
            h.prototype = {
                add: function(i) {
                    this._add(i);
                },
                remove: function(i) {
                    this._remove(i);
                },
                update: function(i) {
                    this._update(i);
                },
                reset: function() {
                    this._eventObjects.length = 0;
                },
                getEvents: function() {
                    return this._getEvents();
                },
                _init: function() {
                    this._eventObjects = [];
                },
                _add: function(i) {
                    this._eventObjects.length = 0;
                    this._eventObjects.push(this._createEventObject(i));
                },
                _remove: function(i) {
                    this._eventObjects.length = 0;
                },
                _update: function(i) {
                    this._add(i);
                },
                _getEvents: function() {
                    return this._eventObjects;
                },
                _createEventObject: function(i) {
                    var j = {};
                    j.id = 1;
                    j.pageX = i.pageX;
                    j.pageY = i.pageY;
                    return j;
                }
            };
            return h;
        }
        )();
        c.MultiMouseManager = g;
        var e = (function() {
            var h = function(i) {
                this.params = {
                    element_id: null,
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null,
                    prevent_default_down: true,
                    prevent_default_move: true,
                    prevent_default_up: true
                };
                f.extend(true, this.params, i);
                this.$element = null;
                this.$document = null;
                this._multi_event_manager = null;
                this._init();
            };
            h.prototype = {
                addEventDown: function(i) {
                    if (typeof i === "function") {
                        this.params.call_down = i;
                    }
                },
                addEventUp: function(i) {
                    if (typeof i === "function") {
                        this.params.call_up = i;
                    }
                },
                addEventMove: function(i) {
                    if (typeof i === "function") {
                        this.params.call_move = i;
                    }
                },
                addEventCancel: function(i) {
                    if (typeof i === "function") {
                        this.params.call_cancel = i;
                    }
                },
                getMultiEvents: function() {
                    return this._multi_event_manager.getEvents();
                },
                resetEvents: function() {
                    this._multi_event_manager.reset();
                },
                _init: function() {
                    this.$element = f("#" + this.params.element_id);
                    this.$document = f(document);
                    this._multi_event_manager = new c.MultiMouseManager();
                    this._addEvents();
                },
                _addEvents: function() {
                    this.$element.on(b.EVENTS.MOUSE_DOWN, f.proxy(this._onMouseDown, this));
                    this.$document.on(b.EVENTS.MOUSE_UP, f.proxy(this._onMouseUp, this));
                    this.$element.on(b.EVENTS.MOUSE_MOVE, f.proxy(this._onMouseMove, this));
                },
                _onMouseDown: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    this._multi_event_manager.add(i);
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(i);
                    }
                    return this.params.prevent_default_down;
                },
                _onMouseUp: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    this._multi_event_manager.remove(i);
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(i);
                    }
                    return this.params.prevent_default_up;
                },
                _onMouseMove: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    this._multi_event_manager.update(i);
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(i);
                    }
                    return this.params.prevent_default_move;
                }
            };
            return h;
        }
        )();
        c.MultiMouseEvent = e;
        var d = (function() {
            var h = function(i) {
                this.params = {
                    element_id: null,
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null,
                    prevent_default_down: true,
                    prevent_default_move: true,
                    prevent_default_up: true
                };
                f.extend(true, this.params, i);
                this.$element = null;
                this.$document = null;
                this._init();
            };
            h.prototype = {
                addEventDown: function(i) {
                    if (typeof i === "function") {
                        this.params.call_down = i;
                    }
                },
                addEventUp: function(i) {
                    if (typeof i === "function") {
                        this.params.call_up = i;
                    }
                },
                addEventMove: function(i) {
                    if (typeof i === "function") {
                        this.params.call_move = i;
                    }
                },
                addEventCancel: function(i) {
                    if (typeof i === "function") {
                        this.params.call_cancel = i;
                    }
                },
                resetEvents: function() {
                    this._removeEventActive();
                },
                _init: function() {
                    this.$element = f("#" + this.params.element_id);
                    this.$document = f(document);
                    this._addEvents();
                },
                _addEvents: function() {
                    this.$element.on(b.EVENTS.MOUSE_DOWN, f.proxy(this._onMouseDown, this));
                },
                _addEventActive: function() {
                    this.$document.on(b.EVENTS.MOUSE_UP, f.proxy(this._onMouseUp, this));
                    this.$document.on(b.EVENTS.MOUSE_MOVE, f.proxy(this._onMouseMove, this));
                },
                _removeEventActive: function() {
                    this.$document.off(b.EVENTS.MOUSE_UP, f.proxy(this._onMouseUp, this));
                    this.$document.off(b.EVENTS.MOUSE_MOVE, f.proxy(this._onMouseMove, this));
                },
                _onMouseDown: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(i);
                    }
                    this._addEventActive();
                    return this.params.prevent_default_down;
                },
                _onMouseUp: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(i);
                    }
                    this._removeEventActive();
                    return this.params.prevent_default_up;
                },
                _onMouseMove: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(i);
                    }
                    return this.params.prevent_default_move;
                }
            };
            return h;
        }
        )();
        c.MousedEvent = d;
    }
    )(jQuery, a.eventboxs || (a.eventboxs = {}));
}
)(Interaction || (Interaction = {}));
(function(a) {
    (function(e, d) {
        var c = {
            EVENTS: {
                TOUCH_START: "touchstart",
                TOUCH_MOVE: "touchmove",
                TOUCH_END: "touchend",
                TOUCH_CANCEL: "touchcancel"
            }
        };
        var f = (function() {
            var g = function() {
                this._events = [];
                this._init();
            };
            g.prototype = {
                setEvents: function(i) {
                    this._setEvents(i);
                },
                getEvents: function() {
                    return this._events;
                },
                _init: function() {
                    this._events = [];
                },
                _setEvents: function(l) {
                    this._events.length = 0;
                    var n;
                    var k = 0;
                    var j = l.length;
                    for (k = 0; k < j; k++) {
                        n = l[k];
                        this._events.push(this._createEventObject(n));
                    }
                },
                _createEventObject: function(i) {
                    var j = {};
                    j.id = i.identifier + 2;
                    j.pageX = i.pageX;
                    j.pageY = i.pageY;
                    return j;
                }
            };
            d.MultiEventManager = g;
            var h = function(i) {
                this.params = {
                    element_id: "",
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null,
                    prevent_default_down: true,
                    prevent_default_move: true,
                    prevent_default_up: true,
                    prevent_default_cancel: true
                };
                e.extend(true, this.params, i);
                this.$element = null;
                this._multi_event_manager = null;
                this._init();
            };
            h.prototype = {
                addEventDown: function(i) {
                    if (typeof i === "function") {
                        this.params.call_down = i;
                    }
                },
                addEventUp: function(i) {
                    if (typeof i === "function") {
                        this.params.call_up = i;
                    }
                },
                addEventMove: function(i) {
                    if (typeof i === "function") {
                        this.params.call_move = i;
                    }
                },
                addEventCancel: function(i) {
                    if (typeof i === "function") {
                        this.params.call_cancel = i;
                    }
                },
                getMultiEvents: function() {
                    return this._multi_event_manager.getEvents();
                },
                _init: function() {
                    this.$element = e("#" + this.params.element_id);
                    this._multi_event_manager = new d.MultiEventManager();
                    this._addEvents();
                },
                _addEvents: function() {
                    this.$element.on(c.EVENTS.TOUCH_START, e.proxy(this._onTouchStart, this));
                    this.$element.on(c.EVENTS.TOUCH_END, e.proxy(this._onTouchEnd, this));
                    this.$element.on(c.EVENTS.TOUCH_MOVE, e.proxy(this._onTouchMove, this));
                    this.$element.on(c.EVENTS.TOUCH_CANCEL, e.proxy(this._onTouchCancel, this));
                },
                _onTouchStart: function(k) {
                    var j = a.util.pickupOriginalEventObject(k);
                    this._updateMultiEvents(j);
                    var i = this._picupTargetTouchesFirstEvent(j);
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(i);
                    }
                    return this.params.prevent_default_down;
                },
                _onTouchEnd: function(k) {
                    var j = a.util.pickupOriginalEventObject(k);
                    this._updateMultiEvents(j);
                    var i = this._picupChangedTouchesFirstEvent(j);
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(i);
                    }
                    return this.params.prevent_default_up;
                },
                _onTouchMove: function(k) {
                    var j = a.util.pickupOriginalEventObject(k);
                    this._updateMultiEvents(j);
                    var i = this._picupTargetTouchesFirstEvent(j);
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(i);
                    }
                    return this.params.prevent_default_move;
                },
                _onTouchCancel: function(k) {
                    var j = a.util.pickupOriginalEventObject(k);
                    this._updateMultiEvents(j);
                    var i = this._picupChangedTouchesFirstEvent(j);
                    if (typeof this.params.call_cancel === "function") {
                        this.params.call_cancel(i);
                    }
                    return this.params.prevent_default_cancel;
                },
                _updateMultiEvents: function(j) {
                    var i = (j.targetTouches) ? j.targetTouches : [];
                    this._multi_event_manager.setEvents(i);
                },
                _picupTargetTouchesFirstEvent: function(i) {
                    var k = {};
                    var j = ("targetTouches"in i) ? i.targetTouches : [];
                    if (j.length >= 1) {
                        k = j[0];
                    }
                    return k;
                },
                _picupChangedTouchesFirstEvent: function(i) {
                    var k = {};
                    var j = ("changedTouches"in i) ? i.changedTouches : [];
                    if (j.length >= 1) {
                        k = j[0];
                    }
                    return k;
                }
            };
            return h;
        }
        )();
        d.MultiTouchEvent = f;
        var b = (function() {
            var g = function(h) {
                this.params = {
                    element_id: "",
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null,
                    prevent_default_down: true,
                    prevent_default_move: true,
                    prevent_default_up: true,
                    prevent_default_cancel: true
                };
                e.extend(true, this.params, h);
                this.$element = null;
                this._init();
            };
            g.prototype = {
                addEventDown: function(h) {
                    if (typeof h === "function") {
                        this.params.call_down = h;
                    }
                },
                addEventUp: function(h) {
                    if (typeof h === "function") {
                        this.params.call_up = h;
                    }
                },
                addEventMove: function(h) {
                    if (typeof h === "function") {
                        this.params.call_move = h;
                    }
                },
                addEventCancel: function(h) {
                    if (typeof h === "function") {
                        this.params.call_cancel = h;
                    }
                },
                _init: function() {
                    this.$element = e("#" + this.params.element_id);
                    this._addEvents();
                },
                _addEvents: function() {
                    this.$element.on(c.EVENTS.TOUCH_START, e.proxy(this._onTouchStart, this));
                },
                _addEventActive: function() {
                    this.$element.on(c.EVENTS.TOUCH_END, e.proxy(this._onTouchEnd, this));
                    this.$element.on(c.EVENTS.TOUCH_MOVE, e.proxy(this._onTouchMove, this));
                    this.$element.on(c.EVENTS.TOUCH_CANCEL, e.proxy(this._onTouchCancel, this));
                },
                _removeEventActive: function() {
                    this.$element.off(c.EVENTS.TOUCH_END, e.proxy(this._onTouchEnd, this));
                    this.$element.off(c.EVENTS.TOUCH_MOVE, e.proxy(this._onTouchMove, this));
                    this.$element.off(c.EVENTS.TOUCH_CANCEL, e.proxy(this._onTouchCancel, this));
                },
                _onTouchStart: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    var h = this._picupTargetTouchesFirstEvent(i);
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(h);
                    }
                    this._addEventActive();
                    return this.params.prevent_default_down;
                },
                _onTouchEnd: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    var h = this._picupChangedTouchesFirstEvent(i);
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(h);
                    }
                    this._removeEventActive();
                    return this.params.prevent_default_up;
                },
                _onTouchMove: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    var h = this._picupTargetTouchesFirstEvent(i);
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(h);
                    }
                    return this.params.prevent_default_move;
                },
                _onTouchCancel: function(j) {
                    var i = a.util.pickupOriginalEventObject(j);
                    var h = this._picupChangedTouchesFirstEvent(i);
                    if (typeof this.params.call_cancel === "function") {
                        this.params.call_cancel(h);
                    }
                    this._removeEventActive();
                    return this.params.prevent_default_cancel;
                },
                _picupTargetTouchesFirstEvent: function(h) {
                    var j = {};
                    var i = ("targetTouches"in h) ? h.targetTouches : [];
                    if (i.length >= 1) {
                        j = i[0];
                    }
                    return j;
                },
                _picupChangedTouchesFirstEvent: function(h) {
                    var j = {};
                    var i = ("changedTouches"in h) ? h.changedTouches : [];
                    if (i.length >= 1) {
                        j = i[0];
                    }
                    return j;
                }
            };
            return g;
        }
        )();
        d.TouchedEvent = b;
    }
    )(jQuery, a.eventboxs || (a.eventboxs = {}));
}
)(Interaction || (Interaction = {}));
(function(a) {
    (function(e, d) {
        var b = (function() {
            var f = function(g) {
                this.params = {
                    element_id: "",
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null
                };
                e.extend(true, this.params, g);
                this.multi_touch_event = null;
                this.multi_mouse_event = null;
                this._active_event_type = null;
                this._init();
            };
            f.EVENT_TYPE_NONE = "event_type_none";
            f.EVENT_TYPE_TOUCH = "event_type_touch";
            f.EVENT_TYPE_MOUSE = "event_type_mouse";
            f.prototype = {
                addEventDown: function(g) {
                    if (typeof g === "function") {
                        this.params.call_down = g;
                    }
                },
                addEventUp: function(g) {
                    if (typeof g === "function") {
                        this.params.call_up = g;
                    }
                },
                addEventMove: function(g) {
                    if (typeof g === "function") {
                        this.params.call_move = g;
                    }
                },
                addEventCancel: function(g) {
                    if (typeof g === "function") {
                        this.params.call_cancel = g;
                    }
                },
                getMultiEvents: function() {
                    var g = [];
                    switch (this._active_event_type) {
                    case f.EVENT_TYPE_TOUCH:
                        g = this.multi_touch_event.getMultiEvents();
                        break;
                    case f.EVENT_TYPE_MOUSE:
                        g = this.multi_mouse_event.getMultiEvents();
                        break;
                    }
                    return g;
                },
                _init: function() {
                    var g = {
                        element_id: this.params.element_id
                    };
                    this.multi_touch_event = new d.MultiTouchEvent(g);
                    this.multi_mouse_event = new d.MultiMouseEvent(g);
                    this._addEvents();
                    this._active_event_type = f.EVENT_TYPE_NONE;
                },
                _addEvents: function() {
                    this.multi_touch_event.addEventDown(e.proxy(this._onTouchStart, this));
                    this.multi_touch_event.addEventMove(e.proxy(this._onTouchMove, this));
                    this.multi_touch_event.addEventUp(e.proxy(this._onTouchEnd, this));
                    this.multi_touch_event.addEventCancel(e.proxy(this._onTouchCancel, this));
                    this.multi_mouse_event.addEventDown(e.proxy(this._onMouseDown, this));
                    this.multi_mouse_event.addEventMove(e.proxy(this._onMouseMove, this));
                    this.multi_mouse_event.addEventUp(e.proxy(this._onMouseUp, this));
                },
                _onTouchStart: function(g) {
                    this.multi_mouse_event.resetEvents();
                    this._active_event_type = f.EVENT_TYPE_TOUCH;
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(g);
                    }
                },
                _onTouchMove: function(g) {
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(g);
                    }
                },
                _onTouchEnd: function(g) {
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(g);
                    }
                },
                _onTouchCancel: function(g) {
                    if (typeof this.params.call_cancel === "function") {
                        this.params.call_cancel(g);
                    }
                },
                _onMouseDown: function(g) {
                    this._active_event_type = f.EVENT_TYPE_MOUSE;
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(g);
                    }
                },
                _onMouseMove: function(g) {
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(g);
                    }
                },
                _onMouseUp: function(g) {
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(g);
                    }
                }
            };
            return f;
        }
        )();
        d.MultiTouchMouseEvent = b;
        var c = (function() {
            var f = function(g) {
                this.params = {
                    element_id: null,
                    call_down: null,
                    call_up: null,
                    call_move: null,
                    call_cancel: null
                };
                e.extend(true, this.params, g);
                this.touch_event = null;
                this.mouse_event = null;
                this._init();
            };
            f.prototype = {
                addEventDown: function(g) {
                    if (typeof g === "function") {
                        this.params.call_down = g;
                    }
                },
                addEventUp: function(g) {
                    if (typeof g === "function") {
                        this.params.call_up = g;
                    }
                },
                addEventMove: function(g) {
                    if (typeof g === "function") {
                        this.params.call_move = g;
                    }
                },
                addEventCancel: function(g) {
                    if (typeof g === "function") {
                        this.params.call_cancel = g;
                    }
                },
                _init: function() {
                    var g = {
                        element_id: this.params.element_id
                    };
                    this.touch_event = new d.TouchedEvent(g);
                    this.mouse_event = new d.MousedEvent(g);
                    this._addEvents();
                },
                _addEvents: function() {
                    this.touch_event.addEventDown(e.proxy(this._onTouchStart, this));
                    this.touch_event.addEventMove(e.proxy(this._onTouchMove, this));
                    this.touch_event.addEventUp(e.proxy(this._onTouchEnd, this));
                    this.touch_event.addEventCancel(e.proxy(this._onTouchCancel, this));
                    this.mouse_event.addEventDown(e.proxy(this._onMouseDown, this));
                    this.mouse_event.addEventMove(e.proxy(this._onMouseMove, this));
                    this.mouse_event.addEventUp(e.proxy(this._onMouseUp, this));
                },
                _onTouchStart: function(g) {
                    this.mouse_event.resetEvents();
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(g);
                    }
                },
                _onTouchMove: function(g) {
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(g);
                    }
                },
                _onTouchEnd: function(g) {
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(g);
                    }
                },
                _onTouchCancel: function(g) {
                    if (typeof this.params.call_cancel === "function") {
                        this.params.call_cancel(g);
                    }
                },
                _onMouseDown: function(g) {
                    if (typeof this.params.call_down === "function") {
                        this.params.call_down(g);
                    }
                },
                _onMouseMove: function(g) {
                    if (typeof this.params.call_move === "function") {
                        this.params.call_move(g);
                    }
                },
                _onMouseUp: function(g) {
                    if (typeof this.params.call_up === "function") {
                        this.params.call_up(g);
                    }
                }
            };
            return f;
        }
        )();
        d.TouchMouseEvent = c;
    }
    )(jQuery, a.eventboxs || (a.eventboxs = {}));
}
)(Interaction || (Interaction = {}));
(function(g, e) {
    var a = function(h) {
        h = (h == true);
        if (window.PointerEvent) {
            c.support_event = f.EVENT_TYPE.POINTER;
        } else {
            if (window.MSPointerEvent) {
                c.support_event = f.EVENT_TYPE.MS_POINTER;
            } else {
                var i = false;
                var k = false;
                var j = document.createElement("div");
                j.setAttribute("ontouchstart", "return");
                if (typeof j.ontouchstart === "function") {
                    i = true;
                }
                j.setAttribute("onmousedown", "return");
                if (typeof j.onmousedown === "function") {
                    k = true;
                }
                c.support_event = f.EVENT_TYPE.MOUSE;
                if (h) {
                    if (i) {
                        if (k) {
                            c.support_event = f.EVENT_TYPE.TOUCH_MOUSE;
                        } else {
                            c.support_event = f.EVENT_TYPE.TOUCH;
                        }
                    }
                } else {
                    if (i) {
                        c.support_event = f.EVENT_TYPE.TOUCH;
                    }
                }
            }
        }
    };
    var d = (function() {
        var h = {
            getSupportEventName: function(j) {
                var i = "";
                var l = {};
                var k = c.support_event;
                switch (c.support_event) {
                case f.EVENT_TYPE.POINTER:
                    l.down = f.EVENTS.POINTER_DOWN;
                    l.move = f.EVENTS.POINTER_MOVE;
                    l.up = f.EVENTS.POINTER_UP;
                    l.cancel = f.EVENTS.POINTER_CANCEL;
                    break;
                case f.EVENT_TYPE.MS_POINTER:
                    l.down = f.EVENTS.MS_POINTER_DOWN;
                    l.move = f.EVENTS.MS_POINTER_MOVE;
                    l.up = f.EVENTS.MS_POINTER_UP;
                    l.cancel = f.EVENTS.MS_POINTER_CANCEL;
                    break;
                case f.EVENT_TYPE.TOUCH:
                    l.down = f.EVENTS.TOUCH_START;
                    l.move = f.EVENTS.TOUCH_MOVE;
                    l.up = f.EVENTS.TOUCH_END;
                    l.cancel = f.EVENTS.TOUCH_CANCEL;
                    break;
                case f.EVENT_TYPE.MOUSE:
                    l.down = f.EVENTS.MOUSE_DOWN;
                    l.move = f.EVENTS.MOUSE_MOVE;
                    l.up = f.EVENTS.MOUSE_UP;
                    l.cancel = "";
                    break;
                case f.EVENT_TYPE.TOUCH_MOUSE:
                    l.down = f.EVENTS.TOUCH_MOUSE_DOWN;
                    l.move = f.EVENTS.TOUCH_MOUSE_MOVE;
                    l.up = f.EVENTS.TOUCH_MOUSE_UP;
                    l.cancel = f.EVENTS.TOUCH_MOUSE_CANCEL;
                    break;
                }
                switch (j) {
                case "down":
                    i = l.down;
                    break;
                case "move":
                    i = l.move;
                    break;
                case "up":
                    i = l.up;
                    break;
                case "cancel":
                    i = l.cancel;
                    break;
                default:
                    i = "";
                }
                return i;
            },
            pickupOriginalEventObject: function(i) {
                i = ("originalEvent"in i) ? i.originalEvent : i;
                return i;
            },
            isSupportPointerEvent: function() {
                var i = false;
                if ((c.support_event == f.EVENT_TYPE.POINTER) || (c.support_event == f.EVENT_TYPE.MS_POINTER)) {
                    i = true;
                }
                return i;
            },
            isPointerTypeToMouse: function(i) {
                return this.isPointerTypeTo(i, f.POINTER_TYPE.MOUSE);
            },
            isPointerTypeToPen: function(i) {
                return this.isPointerTypeTo(i, f.POINTER_TYPE.PEN);
            },
            isPointerTypeToTouch: function(i) {
                return this.isPointerTypeTo(i, f.POINTER_TYPE.TOUCH);
            },
            isPointerTypeTo: function(k, j) {
                var i = false;
                var l = null;
                l = ("pointerType"in k) ? k.pointerType : "";
                switch (j) {
                case f.POINTER_TYPE.MOUSE:
                    if ((l == f.POINTER_TYPE.MS_MOUSE) || (l == f.POINTER_TYPE.MOUSE)) {
                        i = true;
                    }
                    break;
                case f.POINTER_TYPE.TOUCH:
                    if ((l == f.POINTER_TYPE.MS_TOUCH) || (l == f.POINTER_TYPE.TOUCH)) {
                        i = true;
                    }
                    break;
                case f.POINTER_TYPE.PEN:
                    if ((l == f.POINTER_TYPE.MS_PEN) || (l == f.POINTER_TYPE.PEN)) {
                        i = true;
                    }
                    break;
                }
                return i;
            }
        };
        return h;
    }
    )();
    var f = {
        EVENT_TYPE: {
            NONE: 0,
            POINTER: 1,
            MS_POINTER: 2,
            TOUCH: 3,
            MOUSE: 4,
            TOUCH_MOUSE: 5
        },
        EVENTS: {
            POINTER_DOWN: "pointerdown",
            POINTER_MOVE: "pointermove",
            POINTER_UP: "pointerup",
            POINTER_CANCEL: "pointercancel",
            MS_POINTER_DOWN: "MSPointerDown",
            MS_POINTER_MOVE: "MSPointerMove",
            MS_POINTER_UP: "MSPointerUp",
            MS_POINTER_CANCEL: "MSPointerCancel",
            TOUCH_START: "touchstart",
            TOUCH_MOVE: "touchmove",
            TOUCH_END: "touchend",
            TOUCH_CANCEL: "touchcancel",
            MOUSE_DOWN: "mousedown",
            MOUSE_MOVE: "mousemove",
            MOUSE_UP: "mouseup",
            TOUCH_MOUSE_DOWN: "touchstart mousedown",
            TOUCH_MOUSE_MOVE: "touchmove mousemove",
            TOUCH_MOUSE_UP: "touchend mouseup",
            TOUCH_MOUSE_CANCEL: "touchcancel"
        },
        POINTER_TYPE: {
            TOUCH: "touch",
            PEN: "pen",
            MOUSE: "mouse",
            MS_TOUCH: 2,
            MS_PEN: 3,
            MS_MOUSE: 4
        }
    };
    var c = {
        support_event: 0
    };
    var b = {
        createEventListenerSingle: function(h) {
            var i = null;
            var j = {
                element_id: h
            };
            switch (c.support_event) {
            case f.EVENT_TYPE.POINTER:
                j.is_MS = false;
                i = new e.eventboxs.PointerEvent(j);
                break;
            case f.EVENT_TYPE.MS_POINTER:
                j.is_MS = true;
                i = new e.eventboxs.PointerEvent(j);
                break;
            case f.EVENT_TYPE.TOUCH:
                i = new e.eventboxs.TouchedEvent(j);
                break;
            case f.EVENT_TYPE.MOUSE:
                i = new e.eventboxs.MousedEvent(j);
                break;
            case f.EVENT_TYPE.TOUCH_MOUSE:
                i = new e.eventboxs.TouchMouseEvent(j);
                break;
            }
            return i;
        },
        createEventListenerMulti: function(h) {
            var i = null;
            var j = {
                element_id: h
            };
            switch (c.support_event) {
            case f.EVENT_TYPE.POINTER:
                j.is_MS = false;
                i = new e.eventboxs.MultiPointerEvent(j);
                break;
            case f.EVENT_TYPE.MS_POINTER:
                j.is_MS = true;
                i = new e.eventboxs.MultiPointerEvent(j);
                break;
            case f.EVENT_TYPE.TOUCH:
                i = new e.eventboxs.MultiTouchEvent(j);
                break;
            case f.EVENT_TYPE.MOUSE:
                i = new e.eventboxs.MultiMouseEvent(j);
                break;
            case f.EVENT_TYPE.TOUCH_MOUSE:
                i = new e.eventboxs.MultiTouchMouseEvent(j);
                break;
            }
            return i;
        }
    };
    e.initialize = a;
    e.util = d;
    e.EVENTs = f.EVENTS;
    e.EventFactory = b;
}
)(jQuery, Interaction);
var UIs = UIs || {};
(function(h, f, m, i) {
    var n = {
        MOUSE_DOWN: "mousedown",
        CLICK: "click"
    };
    m.Events = n;
    var g = (function() {
        var o = function(p) {
            this.params = {
                element_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this._inte_element = null;
            this._isDown = false;
            this._isDisable = false;
            this._isSelect = false;
            this._init();
        };
        o.EVENT_ACTION = "event_ui_button_action";
        o.EVENT_OUTSIDE = "event_ui_button_outside";
        o.prototype = {
            getDispatch: function() {
                return this.$element;
            },
            getJqObject: function() {
                return this.$element;
            },
            isDisable: function() {
                return this._isDisable;
            },
            enable: function() {
                this._isDisable = false;
                this.$element.removeClass("disable");
            },
            disable: function() {
                this._isDisable = true;
                this._isDown = false;
                this.$element.addClass("disable");
            },
            isSelect: function() {
                return this._isSelect;
            },
            selectOn: function() {
                this._isSelect = true;
                this.$element.addClass("select");
            },
            selectOff: function() {
                this._isSelect = false;
                this.$element.removeClass("select");
            },
            _init: function() {
                var p = this.params.element_id;
                this.$element = f("#" + p);
                this._inte_element = i.EventFactory.createEventListenerSingle(p);
                this._inte_element.addEventDown(f.proxy(this._onmousedown, this));
                this._inte_element.addEventUp(f.proxy(this._onmouseup, this));
            },
            _onmousedown: function(p) {
                if (this._isDisable) {
                    return false;
                }
                this._isDown = true;
                this.$element.addClass("ondown");
            },
            _onmouseup: function(q) {
                if (this._isDisable) {
                    return false;
                }
                var p = false;
                if (this._isDown) {
                    p = this._insidePointer(q.pageX, q.pageY);
                }
                this._isDown = false;
                this.$element.removeClass("ondown");
                this.$element.trigger({
                    type: ((p) ? o.EVENT_ACTION : o.EVENT_OUTSIDE)
                });
            },
            _insidePointer: function(t, s) {
                var r = this.$element.offset();
                if (t < r.left) {
                    return false;
                }
                if (s < r.top) {
                    return false;
                }
                var p = this.$element.outerWidth();
                var q = this.$element.outerHeight();
                if (t > (r.left + p)) {
                    return false;
                }
                if (s > (r.top + q)) {
                    return false;
                }
                return true;
            }
        };
        return o;
    }
    )();
    var c = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                style_toggle_a: "toggle_a",
                style_toggle_b: "toggle_b",
                auto_change: true
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this._inte_element = null;
            this._isDown = false;
            this._isDisable = false;
            this._toggle_state = o.TOGGLE_A;
            this._init();
        };
        o.EVENT_ACTION = "event_ui_button_action";
        o.EVENT_OUTSIDE = "event_ui_button_outside";
        o.TOGGLE_A = 1;
        o.TOGGLE_B = 2;
        o.prototype = {
            getDispatch: function() {
                return this.$element;
            },
            getJqObject: function() {
                return this.$element;
            },
            isDisable: function() {
                return this._isDisable;
            },
            enable: function() {
                this._isDisable = false;
                this.$element.removeClass("disable");
            },
            disable: function() {
                this._isDisable = true;
                this._isDown = false;
                this.$element.addClass("disable");
            },
            getToggleState: function() {
                return this._toggle_state;
            },
            setToggleState: function(p) {
                if ((p == o.TOGGLE_A) || (p == o.TOGGLE_B)) {
                    this._toggle_state = p;
                    this._updateToggleStyle();
                }
            },
            _init: function() {
                var p = this.params.element_id;
                this.$element = f("#" + p);
                this._inte_element = i.EventFactory.createEventListenerSingle(p);
                this._inte_element.addEventDown(f.proxy(this._onmousedown, this));
                this._inte_element.addEventUp(f.proxy(this._onmouseup, this));
                this._updateToggleStyle();
            },
            _onmousedown: function(p) {
                if (this._isDisable) {
                    return false;
                }
                this._isDown = true;
                this.$element.addClass("ondown");
            },
            _onmouseup: function(q) {
                if (this._isDisable) {
                    return false;
                }
                var p = false;
                if (this._isDown) {
                    p = this._insidePointer(q.pageX, q.pageY);
                }
                this._isDown = false;
                this.$element.removeClass("ondown");
                if (p) {
                    if (this.params.auto_change) {
                        this._changeToggleState();
                        this._updateToggleStyle();
                    }
                }
                this.$element.trigger({
                    type: ((p) ? o.EVENT_ACTION : o.EVENT_OUTSIDE)
                });
            },
            _insidePointer: function(t, s) {
                var r = this.$element.offset();
                if (t < r.left) {
                    return false;
                }
                if (s < r.top) {
                    return false;
                }
                var p = this.$element.outerWidth();
                var q = this.$element.outerHeight();
                if (t > (r.left + p)) {
                    return false;
                }
                if (s > (r.top + q)) {
                    return false;
                }
                return true;
            },
            _changeToggleState: function() {
                switch (this._toggle_state) {
                case o.TOGGLE_A:
                    this._toggle_state = o.TOGGLE_B;
                    break;
                case o.TOGGLE_B:
                    this._toggle_state = o.TOGGLE_A;
                    break;
                default:
                    this._toggle_state = o.TOGGLE_A;
                }
            },
            _updateToggleStyle: function() {
                switch (this._toggle_state) {
                case o.TOGGLE_A:
                    this.$element.addClass(this.params.style_toggle_a);
                    this.$element.removeClass(this.params.style_toggle_b);
                    break;
                case o.TOGGLE_B:
                    this.$element.addClass(this.params.style_toggle_b);
                    this.$element.removeClass(this.params.style_toggle_a);
                    break;
                default:
                    this.$element.addClass(this.params.style_toggle_a);
                    this.$element.removeClass(this.params.style_toggle_b);
                }
            }
        };
        return o;
    }
    )();
    var l = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                range_id: "",
                handle_id: "",
                light_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this.$range = null;
            this.$handle = null;
            this.$light = null;
            this._inte_element = null;
            this._isDown = false;
            this._isMove = false;
            this._switchOn = false;
            this._isChanged = false;
            this._value = 0;
            this._init();
        };
        o.EVENT_CHANGE = "event_ui_slide_switch_change";
        o.prototype = {
            getDispatch: function() {
                return this.$element;
            },
            isSwitchOn: function() {
                return this._switchOn;
            },
            setSwitchOn: function() {
                this._setSwitch(true);
            },
            setSwitchOff: function() {
                this._setSwitch(false);
            },
            _init: function() {
                this.$element = f("#" + this.params.element_id);
                this.$range = f("#" + this.params.range_id);
                this.$handle = f("#" + this.params.handle_id);
                this.$light = f("#" + this.params.light_id);
                this._inte_element = i.EventFactory.createEventListenerSingle(this.params.element_id);
                this._inte_element.addEventDown(f.proxy(this._onmousedown, this));
                this._inte_element.addEventMove(f.proxy(this._onmousemove, this));
                this._inte_element.addEventUp(f.proxy(this._onmouseup, this));
            },
            _onmousedown: function(p) {
                this._isDown = true;
                this._isMove = false;
            },
            _onmousemove: function(r) {
                this._isMove = true;
                var p = r.pageX;
                var q = this._createMoveValue(p);
                this._update(q);
            },
            _onmouseup: function(q) {
                var p = this._isDown;
                this._isDown = false;
                if (p) {
                    this._switching();
                    this._update_enter(this._switchOn);
                    if (this._isChanged) {
                        this.$element.trigger({
                            type: o.EVENT_CHANGE
                        });
                    }
                }
            },
            _createMoveValue: function(s) {
                var r = this.$range.offset().left;
                var q = this.$range.width();
                var p = (s - r) / q;
                p = Math.max(0, Math.min(1, p));
                return p;
            },
            _switching: function() {
                var p = this._switchOn;
                if (this._isMove) {
                    this._switchOn = (this._value < 0.5) ? false : true;
                } else {
                    this._switchOn = !(this._switchOn);
                }
                this._isChanged = (this._switchOn !== p);
            },
            _update_enter: function(p) {
                var q = (p) ? 1 : 0;
                this._update(q);
            },
            _update: function(q) {
                var p = (q * 50) + "%";
                this._value = q;
                this.$handle.css({
                    left: p
                });
                this.$light.css({
                    width: p
                });
            },
            _setSwitch: function(p) {
                this._switchOn = p;
                this._update_enter(this._switchOn);
            }
        };
        return o;
    }
    )();
    var e = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                handle_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this._inte_element = null;
            this.$handle = null;
            this.value = 0;
            this._isDisable = false;
            this._init();
        };
        o.EVENT_CHANGE = "event_ui_slider_change";
        o.EVENT_FINISH = "event_ui_slider_finish";
        o.prototype = {
            getDispatch: function() {
                return this.$element;
            },
            getValue: function() {
                return this.value;
            },
            setValue: function(p) {
                p = Math.max(0, Math.min(1, p));
                this.value = p;
                this._update(p);
            },
            isDisable: function() {
                return this._isDisable;
            },
            enable: function() {
                this._enable();
            },
            disable: function() {
                this._disable();
            },
            _init: function() {
                var q = this.params.element_id;
                var p = this.params.handle_id;
                this.$element = f("#" + q);
                this.$handle = f("#" + p);
                this._disable();
                this._inte_element = i.EventFactory.createEventListenerSingle(q);
                this._inte_element.addEventDown(f.proxy(this._onmousedown, this));
                this._inte_element.addEventMove(f.proxy(this._onmousemove, this));
                this._inte_element.addEventUp(f.proxy(this._onmouseup, this));
            },
            _enable: function() {
                this._isDisable = false;
                this.$element.removeClass("disable");
                this.$handle.removeClass("disable");
            },
            _disable: function() {
                this._isDisable = true;
                this.$element.addClass("disable");
                this.$handle.addClass("disable");
            },
            _onmousedown: function(r) {
                var p = r.pageX;
                var q = this._createValue(p);
                this._update(q);
                this.$element.trigger({
                    type: o.EVENT_CHANGE,
                    value: this.value
                });
            },
            _onmousemove: function(r) {
                var p = r.pageX;
                var q = this._createValue(p);
                this._update(q);
                this.$element.trigger({
                    type: o.EVENT_CHANGE,
                    value: this.value
                });
            },
            _onmouseup: function(p) {
                this.$element.trigger({
                    type: o.EVENT_FINISH,
                    value: this.value
                });
            },
            _createValue: function(s) {
                var r = this.$element.offset().left;
                var q = this.$element.width();
                var p = (s - r) / q;
                p = Math.max(0, Math.min(1, p));
                return p;
            },
            _update: function(p) {
                this.value = p;
                this.$handle.css({
                    left: (p * 100) + "%"
                });
            }
        };
        return o;
    }
    )();
    var d = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                handle_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this._inte_element = null;
            this.$handle = null;
            this._step_count = 0;
            this._step_unit_scale = 0;
            this._step_now = 0;
            this.value = 0;
            this._isDisable = false;
            this._init();
        };
        o.EVENT_CHANGE = "event_ui_step_slider_change";
        o.EVENT_FINISH = "event_ui_step_slider_finish";
        o.prototype = {
            getDispatch: function() {
                return this.$element;
            },
            getStepIndex: function() {
                return this._step_now;
            },
            setStepIndex: function(p) {
                this._setStepIndex(p);
            },
            updateSteps: function(p) {
                this._updateSteps(p);
            },
            isDisable: function() {
                return this._isDisable;
            },
            enable: function() {
                this._enable();
            },
            disable: function() {
                this._disable();
            },
            _init: function() {
                var q = this.params.element_id;
                var p = this.params.handle_id;
                this.$element = f("#" + q);
                this.$handle = f("#" + p);
                this._disable();
                this._updateSteps(this._step_count);
                this._setStepIndex(0);
                this._inte_element = i.EventFactory.createEventListenerSingle(q);
                this._inte_element.addEventDown(f.proxy(this._onmousedown, this));
                this._inte_element.addEventMove(f.proxy(this._onmousemove, this));
                this._inte_element.addEventUp(f.proxy(this._onmouseup, this));
            },
            _updateSteps: function(p) {
                this._step_count = p;
                this._step_unit_scale = 1;
                if (this._step_count >= 2) {
                    this._step_unit_scale = 1 / (this._step_count - 1);
                }
            },
            _setStepIndex: function(q) {
                var p = 0;
                q = Math.min((this._step_count - 1), Math.max(0, q));
                q = q >> 0;
                p = this._step_unit_scale * q;
                p = Math.min(1, Math.max(0, p));
                this._step_now = q;
                this._update(p);
            },
            _enable: function() {
                this._isDisable = false;
                this.$element.removeClass("disable");
                this.$handle.removeClass("disable");
            },
            _disable: function() {
                this._isDisable = true;
                this.$element.addClass("disable");
                this.$handle.addClass("disable");
            },
            _onmousedown: function(q) {
                var p = q.pageX;
                this._changeStep(p);
            },
            _onmousemove: function(q) {
                var p = q.pageX;
                this._changeStep(p);
            },
            _onmouseup: function(p) {
                this._dispatchEventStepData(o.EVENT_FINISH);
            },
            _changeStep: function(s) {
                var q = this._createValue(s);
                var r = Math.round(q / this._step_unit_scale);
                if (r !== this._step_now) {
                    this._step_now = r;
                    var p = r * this._step_unit_scale;
                    this._update(p);
                    this._dispatchEventStepData(o.EVENT_CHANGE);
                }
            },
            _createValue: function(s) {
                var r = this.$element.offset().left;
                var q = this.$element.width();
                var p = (s - r) / q;
                p = Math.max(0, Math.min(1, p));
                return p;
            },
            _update: function(p) {
                this.value = p;
                this.$handle.css({
                    left: (p * 100) + "%"
                });
            },
            _dispatchEventStepData: function(p) {
                this.$element.trigger({
                    type: p,
                    value: this.value,
                    step: this._step_now
                });
            }
        };
        return o;
    }
    )();
    var b = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                content_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this.$content = null;
            this.scrollPerX = 0;
            this.scrollPerY = 0;
            this._init();
        };
        o.prototype = {
            getContentRange: function() {
                return this.$content.height();
            },
            getBoxRange: function() {
                return this.$element.height();
            },
            getScrollPerH: function() {
                return this.scrollPerX;
            },
            getScrollPerV: function() {
                return this.scrollPerY;
            },
            scrollV: function(p) {
                p = Math.max(0, Math.min(1, p));
                this.scrollPerY = p;
                this._update();
            },
            scrollH: function(p) {
                p = Math.max(0, Math.min(1, p));
                this.scrollPerX = p;
                this._update();
            },
            update: function() {
                var q = this.$content.outerWidth() - this.$element.outerWidth();
                var p = this.$content.outerHeight() - this.$element.outerHeight();
                if (q <= 0) {
                    this.scrollPerX = 0;
                }
                if (p <= 0) {
                    this.scrollPerY = 0;
                }
                this._update();
            },
            _init: function() {
                this.$element = f("#" + this.params.element_id);
                this.$content = f("#" + this.params.content_id);
                this.scrollPerX = 0;
                this.scrollPerY = 0;
                this._update();
            },
            _createScrollPosObject: function() {
                var p = {
                    posx: 0,
                    posy: 0
                };
                var r = this.$content.outerWidth() - this.$element.outerWidth();
                var q = this.$content.outerHeight() - this.$element.outerHeight();
                p.posx = r * this.scrollPerX;
                p.posy = q * this.scrollPerY;
                p.posx *= -1;
                p.posy *= -1;
                return p;
            },
            _update: function() {
                var p = this._createScrollPosObject();
                this.$content.css({
                    left: p.posx,
                    top: p.posy
                });
            }
        };
        return o;
    }
    )();
    var j = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                handle_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this._inte_element = null;
            this._inte_handle = null;
            this.$handle = null;
            this._is_handle_grab = false;
            this.handle_range = 0.5;
            this.value = 0;
            this.startValue = 0;
            this.startPos = 0;
            this._isDisable = false;
            this._init();
        };
        o.EVENT_CHANGE = "event_ui_scroll_slider_change";
        o.prototype = {
            getDispatch: function() {
                return this.$element;
            },
            setContentRange: function(q, r) {
                var p = r / q;
                this.handle_range = Math.max(0, Math.min(1, p));
                this.$handle.css({
                    height: ((this.handle_range * 100) + "%")
                });
                this._update();
            },
            setValue: function(p) {
                p = Math.max(0, Math.min(1, p));
                this.value = p;
                this._update();
            },
            getValue: function() {
                return this.value;
            },
            getHandleRange: function() {
                return this.handle_range;
            },
            enable: function() {
                this._enable();
            },
            disable: function() {
                this._disable();
            },
            _init: function() {
                var q = this.params.element_id;
                var p = this.params.handle_id;
                this.$element = f("#" + q);
                this.$handle = f("#" + p);
                this._inte_element = i.EventFactory.createEventListenerSingle(q);
                this._inte_element.addEventDown(f.proxy(this._onbasedown, this));
                this._inte_handle = i.EventFactory.createEventListenerSingle(p);
                this._inte_handle.addEventDown(f.proxy(this._onhandledown, this));
                this._inte_handle.addEventMove(f.proxy(this._onhandlemove, this));
                this._inte_handle.addEventUp(f.proxy(this._onhandleup, this));
                this._inte_handle.addEventCancel(f.proxy(this._onhandlecancel, this));
                this._update();
            },
            _enable: function() {
                this._isDisable = false;
                this._is_handle_grab = false;
                this.$element.removeClass("disable");
                this.$handle.removeClass("disable");
            },
            _disable: function() {
                this._isDisable = true;
                this._is_handle_grab = false;
                this.$element.addClass("disable");
                this.$handle.addClass("disable");
            },
            _onbasedown: function(s) {
                if (s.target.id == this.$handle.get(0).id) {
                    return;
                }
                var r = s.pageY - this.$element.offset().top;
                var u = this.$handle.position().top;
                var p = u + this.$handle.height();
                var q = this.value;
                var t = (this.handle_range * 0.99) / (1 - this.handle_range);
                if (r < u) {
                    q -= t;
                } else {
                    if (r > p) {
                        q += t;
                    }
                }
                q = Math.max(0, Math.min(1, q));
                if (q !== this.value) {
                    this.value = q;
                    this._update();
                    this.$element.trigger({
                        type: o.EVENT_CHANGE,
                        value: this.value
                    });
                }
            },
            _onhandledown: function(q) {
                if (this.handle_range >= 1) {
                    return;
                }
                var p = q.pageY;
                this.startPos = p;
                this.startValue = this.value;
                this._is_handle_grab = true;
            },
            _onhandlemove: function(r) {
                if (this._is_handle_grab == false) {
                    return;
                }
                var p = r.pageY - this.startPos;
                var s = this.$element.height() * (1 - this.handle_range);
                var q = this.startValue + (p / s);
                q = Math.max(0, Math.min(1, q));
                if (q !== this.value) {
                    this.value = q;
                    this._update();
                    this.$element.trigger({
                        type: o.EVENT_CHANGE,
                        value: this.value
                    });
                }
            },
            _onhandleup: function(p) {
                this._is_handle_grab = false;
            },
            _onhandlecancel: function(p) {
                this._is_handle_grab = false;
            },
            _update: function() {
                var p = (1 - this.handle_range) * this.value;
                this.$handle.css({
                    top: ((p * 100) + "%")
                });
            }
        };
        return o;
    }
    )();
    var a = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                content_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this.$content = null;
            this.scrollV = 0;
            this.scrollH = 0;
            this.startScrollV = 0;
            this.startScrollH = 0;
            this.startPositionV = 0;
            this.startPositionH = 0;
            this._init();
        };
        o.prototype = {
            getContentRange: function() {
                return this.$content.height();
            },
            getBoxRange: function() {
                return this.$element.height();
            },
            getScrollV: function() {
                return this.scrollV;
            },
            getScrollH: function() {
                return this.scrollH;
            },
            setScrollTop: function() {
                this.scrollV = 0;
                this._update();
            },
            setStartPositionV: function(p) {
                this.startPositionV = p;
                this.startScrollV = this.scrollV;
            },
            setMovePositionV: function(s) {
                var q = this.startScrollV + (s - this.startPositionV);
                var p = 0;
                var r = this.$element.outerHeight() - this.$content.outerHeight();
                if (r >= p) {
                    q = p;
                } else {
                    q = Math.max(r, Math.min(p, q));
                }
                this.scrollV = q;
                this._update();
            },
            update: function() {
                var q = this.$element.outerWidth() - this.$content.outerWidth();
                var p = this.$element.outerHeight() - this.$content.outerHeight();
                if (q >= 0) {
                    this.scrollH = 0;
                } else {
                    this.scrollH = Math.max(this.scrollH, Math.min(0, q));
                }
                if (p >= 0) {
                    this.scrollV = 0;
                } else {
                    this.scrollV = Math.max(this.scrollV, Math.min(0, p));
                }
                this._update();
            },
            _init: function() {
                this.$element = f("#" + this.params.element_id);
                this.$content = f("#" + this.params.content_id);
                this.scrollV = 0;
                this.scrollH = 0;
                this.startScrollV = 0;
                this.startScrollH = 0;
                this.startPositionV = 0;
                this.startPositionH = 0;
                this._update();
            },
            _update: function() {
                this.$content.css({
                    left: this.scrollH,
                    top: this.scrollV
                });
            }
        };
        return o;
    }
    )();
    var k = (function() {
        var o = function(p) {
            this.params = {
                element_id: "",
                content_id: ""
            };
            f.extend(true, this.params, p);
            this.$element = null;
            this.$content = null;
            this.scrollV = 0;
            this.scrollH = 0;
            this.startPositionV = 0;
            this.startPositionH = 0;
            this._init();
        };
        o.prototype = {
            getContentRange: function() {
                return this.$content.height();
            },
            getBoxRange: function() {
                return this.$element.height();
            },
            getScrollV: function() {
                return this.scrollV;
            },
            getScrollH: function() {
                return this.scrollH;
            },
            setScrollTop: function() {
                this.scrollV = 0;
                this._update();
            },
            setStartPositionV: function(p) {
                this.startPositionV = p;
            },
            setMovePositionV: function(q) {
                var p = this.startPositionV - q;
                this.startPositionV = q;
                this.scrollV = this.$element.scrollTop() + p;
                this._update();
            },
            update: function() {
                var q = this.$content.outerWidth() - this.$element.outerWidth();
                var p = this.$content.outerHeight() - this.$element.outerHeight();
                if (q >= 0) {
                    this.scrollH = 0;
                } else {
                    this.scrollH = Math.max(this.scrollH, Math.min(0, q));
                }
                if (p >= 0) {
                    this.scrollV = 0;
                } else {
                    this.scrollV = Math.max(this.scrollV, Math.min(0, p));
                }
                this._update();
            },
            _init: function() {
                this.$element = f("#" + this.params.element_id);
                this.$content = f("#" + this.params.content_id);
                this.scrollV = 0;
                this.scrollH = 0;
                this.startPositionV = 0;
                this.startPositionH = 0;
                this._update();
            },
            _update: function() {
                this.$element.scrollTop(this.scrollV);
                this.$element.scrollLeft(this.scrollH);
            }
        };
        return o;
    }
    )();
    m.Button = g;
    m.ToggleButton = c;
    m.SlideSwitch = l;
    m.Slider = e;
    m.StepSlider = d;
    m.ScrollBox = b;
    m.ScrollSlider = j;
    m.DragScrollBox = a;
    m.DragScrollList = k;
}
)(window, jQuery, UIs, Interaction);
(function(b) {
    var a = b.scramble = {
        options: {
            isScramble: false,
            canvas: null,
            img: null,
            scramble_w: 0,
            scramble_h: 0,
            pad: 8,
            scrambleTable: []
        },
        transferCanvas: (function() {
            return document.createElement("canvas");
        }
        )(),
        standardScrambleTerminal: true,
        transcribeMode: false,
        setVariables: function(c) {
            b.extend(this.options, c);
            return this;
        },
        drawImage4Chrome: function(g, e, c, h, j, i, f, d) {
            if ((c <= 0) || (h <= 0)) {
                return;
            }
            e.save();
            e.beginPath();
            e.rect(f, d, c, h);
            e.closePath();
            e.clip();
            e.drawImage(g, f - j, d - i);
            e.restore();
        },
        drawImage4Other: function(g, e, c, h, j, i, f, d) {
            if ((c <= 0) || (h <= 0)) {
                return;
            }
            e.drawImage(g, j, i, c, h, f, d, c, h);
        },
        doScramble: function() {
            var f = this.options.canvas, l = this.standardScrambleTerminal, i = this.options.isScramble, A = this.options.scramble_w, g = this.options.scramble_h, C = this.options.img, z = this.options.pad, t, o, v, q, p, c = [], h, u;
            if (this.options.scrambleTable instanceof Array) {
                c = this.options.scrambleTable;
            } else {
                b.each(this.options.scrambleTable.split(","), function() {
                    c.push(parseInt(this, 10));
                });
            }
            if (f.width !== C.naturalWidth) {
                f.width = C.naturalWidth;
            }
            if (f.height !== C.naturalHeight) {
                f.height = C.naturalHeight;
            }
            t = f.getContext("2d");
            u = C;
            if (this.transcribeMode) {
                u = this.transferCanvas;
                var r = this.transferCanvas.getContext("2d");
                this.transferCanvas.width = C.naturalWidth;
                this.transferCanvas.height = C.naturalHeight;
                r.fillStyle = r.createPattern(C, "no-repeat");
                r.fillRect(0, 0, this.transferCanvas.width, this.transferCanvas.height);
            }
            if (i) {
                o = ((((C.naturalWidth / A) | 0) / z) | 0) * z;
                v = ((((C.naturalHeight / g) | 0) / z) | 0) * z;
                if (!l) {
                    h = this.drawImage4Chrome;
                } else {
                    h = this.drawImage4Other;
                }
                var s = (o * A);
                var B = (v * g);
                h(u, t, C.naturalWidth - s, B, s, 0, s, 0);
                h(u, t, C.naturalWidth, C.naturalHeight - B, 0, B, 0, B);
                for (p = 0; p < g; ++p) {
                    for (q = 0; q < A; ++q) {
                        var w = c[(p * A) + q];
                        var m = ((w / A) | 0);
                        var n = w - (m * A);
                        var k = n * o;
                        var j = m * v;
                        var e = q * o;
                        var d = p * v;
                        h(u, t, o, v, k, j, e, d);
                    }
                }
            } else {
                t.drawImage(u, 0, 0);
            }
            u = null;
            if (this.transcribeMode) {
                r.clearRect(0, 0, this.transferCanvas.width, this.transferCanvas.height);
                r.fillStyle = "#000000";
                r = null;
                this.transferCanvas.width = 0;
                this.transferCanvas.height = 0;
            }
            return this;
        }
    };
}
)(jQuery);
(function(b) {
    var a = b.infomessage = {
        options: {
            appendTo: b("body"),
            messageWrapper: b('<div class="info-message"></div>'),
            delay: 10000,
            css: {
                background: "#333",
                color: "#fff",
                display: "inline-block",
                lineHeight: "1.5",
                position: "absolute",
                textShadow: "none",
                padding: "20px",
                border: "2px solid #fff",
                visibility: "hidden",
                "border-radius": "10px",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "-ms-border-radius": "10px",
                "-o-border-radius": "10px",
                zIndex: "99999"
            }
        },
        TOUCHEND_OR_CLICK: (("ontouchend"in document.documentElement) ? "touchend" : "click"),
        _messages: [],
        _messageElement: undefined,
        init: function(d) {
            var c = this;
            b.extend(c.options, d);
            c.options.messageWrapper.css(c.options.css);
            return c;
        },
        addMessage: function(d) {
            var c = this;
            c._messages.push(d);
            return c;
        },
        getMessages: function() {
            var c = this;
            c._messageElement = c.options.messageWrapper.clone(true);
            if (c._messages.length !== 0) {
                c._messageElement.on(c.TOUCHEND_OR_CLICK, function() {
                    c.infoMessageWillHide();
                    b(this).remove();
                    c.infoMessageDidHide();
                }).append(c._messages.join("<br />").replace(/\n/g, "<br />\n")).appendTo(c.options.appendTo);
                c._messages = [];
                setTimeout(function() {
                    c._messageElement.fadeOut("slow", function() {
                        c.infoMessageWillHide();
                        b(this).remove();
                        c.infoMessageDidHide();
                    });
                }, c.options.delay);
            }
            c.setPosition();
            c._messageElement.css({
                visibility: "visible"
            });
            return c;
        },
        removeDialogMessage: function() {
            var c = this;
            if (c._messageElement) {
                c.infoMessageWillHide();
                c._messageElement.remove();
                c.infoMessageDidHide();
            }
        },
        existMessage: function() {
            var c = this;
            return c._messageElement && c._messageElement.parent().size() !== 0;
        },
        setPosition: function() {
            var c = this;
            var e = c._messageElement;
            var d = (window.innerWidth - e.outerWidth()) / 2;
            var f = (window.innerHeight - e.outerHeight()) / 2;
            e.css({
                left: d + "px",
                top: f + "px"
            });
        },
        infoMessageWillHide: function() {},
        infoMessageDidHide: function() {}
    };
}
)(jQuery);
(function(b) {
    var a = b.parser = {
        pageXml: function(j) {
            var f = this;
            var i = {}
              , e = []
              , d = false
              , c = [];
            var g = b(j);
            i.code = b.trim(f.getTextOf(g, "Code"));
            if (!i.code) {
                var h = g.find("Page");
                i.pageNum = f.getIntegerOf(h, "PageNo");
                i.totalPartSize = f.getIntegerOf(h, "TotalPartSize");
                h.find("Part").each(function() {
                    var k = b(this);
                    e.push(b.trim(f.getTextOf(k, "Kind")));
                    if (k.attr("scramble") == "0") {
                        d = false;
                    } else {
                        d = true;
                    }
                });
                i.Part = e;
                i.PageScramble = d;
                h.find("StepRect").each(function() {
                    var k = b(this);
                    i.StepRectX = f.getIntegerOf(k, "X");
                    i.StepRectY = f.getIntegerOf(k, "Y");
                    i.StepRectWidth = f.getIntegerOf(k, "Width");
                    i.StepRectHeight = f.getIntegerOf(k, "Height");
                });
                i.komaCnt = f.getIntegerOf(h, "StepCount");
                i.maskCnt = i.komaCnt;
                i.komas = [];
                h.find("Step").each(function(l) {
                    var n = b(this);
                    var m = {}
                      , k = [];
                    m = {
                        id: l + 1,
                        kScrollCode: f.getIntegerOf(n, "KScrollCode"),
                        x: f.getIntegerOf(n, "> X"),
                        y: f.getIntegerOf(n, "> Y"),
                        width: f.getIntegerOf(n, "> Width"),
                        height: f.getIntegerOf(n, "> Height"),
                        eventNo: f.getIntegerOf(n, "Event > No"),
                        eventMoveKoma: f.getIntegerOf(n, "Event > MoveKoma"),
                        eventUrl: b.trim(f.getTextOf(n, "Event > URL")),
                        hotSpotX: f.getIntegerOf(n, "HotSpot > X"),
                        hotSpotY: f.getIntegerOf(n, "HotSpot > Y"),
                        hotSpotWidth: f.getIntegerOf(n, "HotSpot > Width"),
                        hotSpotHeight: f.getIntegerOf(n, "HotSpot > Height")
                    };
                    i.komas[l] = m;
                    n.find("Mask").find("X").each(function() {
                        k.push({
                            x: f.getIntegerOf(b(this), "")
                        });
                    });
                    n.find("Mask").find("Y").each(function(o) {
                        k[o].y = f.getIntegerOf(b(this), "");
                    });
                    c[l] = k;
                });
                i.masks = c;
                i.Scramble = b.trim(f.getTextOf(h, "Scramble"));
                i.FirstCharNumber = f.getIntegerOf(h, "PosInfo > FirstCharNumber");
            }
            return i;
        },
        getTextOf: function(d, c) {
            d = (c ? d.find(c) : d);
            var e = d.text();
            return e;
        },
        getIntegerOf: function(d, c) {
            var e = this.getTextOf(d, c) | 0;
            return e;
        },
        getFloatOf: function(d, c) {
            var e = this.getTextOf(d, c) - 0;
            return e;
        }
    };
}
)(jQuery);
(function(b) {
    var a = b.bookmark = {
        options: {
            max: 16,
            guid: undefined,
            storageid: ""
        },
        BookmarkType: {
            AUTO: 0,
            BM_1: 1,
            BM_2: 2
        },
        pageNumber: 0,
        komaNumber: -1,
        firstCharNumber: 0,
        pageFileNumber: -1,
        s1PageNumber: -1,
        s1KomaNumber: -1,
        s1firstCharNumber: 0,
        s1PageFileNumber: -1,
        s2PageNumber: -1,
        s2KomaNumber: -1,
        s2firstCharNumber: 0,
        s2PageFileNumber: -1,
        textSize: 0,
        textSizeBefore: 0,
        hasBookmarkRecord: false,
        dataKey: "h5v_mode3_bookmarks",
        book_property: "",
        bookmarkData: {},
        WritingLock: {
            ON: 0,
            OFF: 1
        },
        _permitUpdateBookmark: 1,
        init: function(o) {
            var m = this, f, d, h, j, n, c, l, g;
            b.extend(m.options, o);
            this._permitUpdateBookmark = this.WritingLock.OFF;
            try {
                d = window.localStorage.getItem(m.dataKey);
            } catch (k) {
                if ((k.name).toUpperCase() == "QUOTA_EXCEEDED_ERR") {}
            }
            m.book_property = m.options.storageid + "_" + m.options.guid;
            if (d) {
                try {
                    m.bookmarkData = JSON.parse(d);
                    m.hasBookmarkRecord = m.bookmarkData.hasOwnProperty(m.book_property);
                } catch (k) {
                    m.bookmarkData = {};
                }
            } else {
                m.bookmarkData = {};
            }
            if (m.hasBookmarkRecord) {
                h = m.bookmarkData[m.book_property];
                m.textSize = (h.hasOwnProperty("textSize")) ? h.textSize : 0;
                m.textSizeBefore = (h.hasOwnProperty("textSizeBefore")) ? h.textSizeBefore : 0;
                m.pageNumber = h.pageNumber;
                m.komaNumber = h.komaNumber;
                m.firstCharNumber = (h.hasOwnProperty("firstCharNumber")) ? h.firstCharNumber : 0;
                m.pageFileNumber = (h.hasOwnProperty("pageFileNumber")) ? h.pageFileNumber : 0;
                m.s1PageNumber = h.s1PageNumber;
                m.s1KomaNumber = h.s1KomaNumber;
                m.s1firstCharNumber = (h.hasOwnProperty("s1firstCharNumber")) ? h.s1firstCharNumber : 0;
                m.s1PageFileNumber = (h.hasOwnProperty("s1PageFileNumber")) ? h.s1PageFileNumber : 0;
                m.s2PageNumber = h.s2PageNumber;
                m.s2KomaNumber = h.s2KomaNumber;
                m.s2firstCharNumber = (h.hasOwnProperty("s2firstCharNumber")) ? h.s2firstCharNumber : 0;
                m.s2PageFileNumber = (h.hasOwnProperty("s2PageFileNumber")) ? h.s2PageFileNumber : 0;
            } else {
                m.saveBookmarkData();
            }
            return m;
        },
        lockWritingBookmark: function() {
            this._permitUpdateBookmark = this.WritingLock.ON;
        },
        unlockWritingBookmark: function() {
            this._permitUpdateBookmark = this.WritingLock.OFF;
        },
        getTextSize: function() {
            return this.textSize;
        },
        getTextSizeBefore: function() {
            return this.textSizeBefore;
        },
        haveTextSizeBefore: function() {
            return (this.textSizeBefore !== 0);
        },
        getPageNumber: function() {
            return this.pageNumber;
        },
        getKomaNumber: function() {
            return this.komaNumber;
        },
        getFirstCharNumber: function() {
            return this.firstCharNumber;
        },
        getPageFileNumber: function() {
            return this.pageFileNumber;
        },
        getS1PageNumber: function() {
            return this.s1PageNumber;
        },
        getS1KomaNumber: function() {
            return this.s1KomaNumber;
        },
        getS1FirstCharNumber: function() {
            return this.s1firstCharNumber;
        },
        getS1PageFileNumber: function() {
            return this.s1PageFileNumber;
        },
        getS2PageNumber: function() {
            return this.s2PageNumber;
        },
        getS2KomaNumber: function() {
            return this.s2KomaNumber;
        },
        getS2FirstCharNumber: function() {
            return this.s2firstCharNumber;
        },
        getS2PageFileNumber: function() {
            return this.s2PageFileNumber;
        },
        _createBookmarkData: function() {
            var c = this, d;
            d = {
                time: +new Date(),
                textSize: c.textSize,
                textSizeBefore: c.textSizeBefore,
                pageNumber: c.pageNumber,
                komaNumber: c.komaNumber,
                firstCharNumber: c.firstCharNumber,
                pageFileNumber: c.pageFileNumber,
                s1PageNumber: c.s1PageNumber,
                s1KomaNumber: c.s1KomaNumber,
                s1firstCharNumber: c.s1firstCharNumber,
                s1PageFileNumber: c.s1PageFileNumber,
                s2PageNumber: c.s2PageNumber,
                s2KomaNumber: c.s2KomaNumber,
                s2firstCharNumber: c.s2firstCharNumber,
                s2PageFileNumber: c.s2PageFileNumber
            };
            return d;
        },
        setTextSize: function(c) {
            this.textSize = (c >> 0);
            this.saveBookmarkData();
        },
        setTextSizeBefore: function(c) {
            this.textSizeBefore = (c >> 0);
            this.saveBookmarkData();
        },
        setPageNumber: function(c, d) {
            if (c !== null) {
                this.pageNumber = (c >> 0);
            }
            this.komaNumber = -1;
            if (d !== null) {
                this.firstCharNumber = (d >> 0);
            }
            this.saveBookmarkData();
        },
        setPageFileNumber: function(c) {
            this.pageFileNumber = (c >> 0);
            this.saveBookmarkData();
        },
        setS1PageNumber: function(d, e, f) {
            var c = this.BookmarkType.BM_1;
            this._updateUserBookmark(c, d, e, f);
        },
        setS1PageFileNumber: function(c) {
            this.s1PageFileNumber = (c >> 0);
            this.saveBookmarkData();
        },
        setS2PageNumber: function(d, e, f) {
            var c = this.BookmarkType.BM_2;
            this._updateUserBookmark(c, d, e, f);
        },
        setS2PageFileNumber: function(c) {
            this.s2PageFileNumber = (c >> 0);
            this.saveBookmarkData();
        },
        setBookmarkForSizeChange: function(j, g, c, f, e) {
            var i = this.firstCharNumber;
            var d = this.s1firstCharNumber;
            var h = this.s2firstCharNumber;
            this._resetDatas();
            this.textSize = j;
            this.textSizeBefore = g;
            if ((c !== null) && (c !== -1)) {
                this.pageFileNumber = c;
                this.firstCharNumber = i;
            }
            if ((f !== null) && (f !== -1)) {
                this.s1PageFileNumber = f;
                this.s1firstCharNumber = d;
            }
            if ((e !== null) && (e !== -1)) {
                this.s2PageFileNumber = e;
                this.s2firstCharNumber = h;
            }
            this.saveBookmarkData();
        },
        updateBookmarkForSizeChange: function(c, e, d) {
            this.pageNumber = (c == -1) ? 0 : c;
            this.s1PageNumber = e;
            this.s2PageNumber = d;
            this.textSizeBefore = 0;
            this.pageFileNumber = -1;
            this.s1PageFileNumber = -1;
            this.s2PageFileNumber = -1;
            this.saveBookmarkData();
        },
        _resetDatas: function() {
            this.textSize = 0;
            this.textSizeBefore = 0;
            this.pageNumber = 0;
            this.komaNumber = -1;
            this.firstCharNumber = 0;
            this.pageFileNumber = -1;
            this.s1PageNumber = -1;
            this.s1KomaNumber = -1;
            this.s1firstCharNumber = 0;
            this.s1PageFileNumber = -1;
            this.s2PageNumber = -1;
            this.s2KomaNumber = -1;
            this.s2firstCharNumber = 0;
            this.s2PageFileNumber = -1;
        },
        _updateUserBookmark: function(e, g, h, j) {
            var c = this;
            var d = null;
            var f = null;
            var i = null;
            d = (g >> 0);
            i = (j >> 0);
            if (h !== undefined) {
                f = (h >> 0);
            }
            switch (e) {
            case c.BookmarkType.BM_1:
                c.s1PageNumber = d;
                c.s1firstCharNumber = i;
                if (f !== null) {
                    c.s1KomaNumber = f;
                }
                break;
            case c.BookmarkType.BM_2:
                c.s2PageNumber = d;
                c.s2firstCharNumber = i;
                if (f !== null) {
                    c.s2KomaNumber = f;
                }
                break;
            default:
            }
            c.saveBookmarkData();
        },
        _deleteOldest: function() {
            var c = this, f = 0, d = "", h = 0, e, g = "";
            for (g in c.bookmarkData) {
                f = c.bookmarkData[g].time;
                d = g;
                if (h === 0) {
                    h = f;
                    e = d;
                } else {
                    if (f < h) {
                        h = f;
                        e = d;
                    }
                }
            }
            if (e) {
                delete c.bookmarkData[e];
            }
        },
        _writeLocalStorage: function() {
            if (this._permitUpdateBookmark) {
                try {
                    window.localStorage.setItem(this.dataKey, JSON.stringify(this.bookmarkData));
                } catch (c) {
                    if ((c.name).toUpperCase() == "QUOTA_EXCEEDED_ERR") {
                        window.console.log(c);
                    }
                }
            }
        },
        saveBookmarkData: function() {
            var d = this, c = 0, e, f;
            if (!d.bookmarkData.hasOwnProperty(d.book_property)) {
                for (e in d.bookmarkData) {
                    c++;
                }
                f = c - d.options.max + 1;
                if (f > 0) {
                    for (e = 0; e < f; e++) {
                        d._deleteOldest();
                    }
                }
            }
            d.bookmarkData[d.book_property] = d._createBookmarkData();
            d._writeLocalStorage();
        },
        deleteBookmarkData: function() {
            var c = this;
            if (c.bookmarkData.hasOwnProperty(c.book_property)) {
                delete c.bookmarkData[c.book_property];
            }
            c.s1PageNumber = -1;
            c.s1KomaNumber = -1;
            c.s1firstCharNumber = 0;
            c.s1PageFileNumber = -1;
            c.s2PageNumber = -1;
            c.s2KomaNumber = -1;
            c.s2firstCharNumber = 0;
            c.s2PageFileNumber = -1;
            c._writeLocalStorage();
        }
    };
}
)(jQuery);
(function(b, a) {
    b.customdatas = {};
    b.customdatas.DATA_KEY = "h5v_mode3_custom_datas";
    b.customdatas.PROPERTY_START_UP_COUNT = "property_start_up_count";
    b.customdatas.PROPERTY_VIEW_TYPE_SCROLL = "property_view_type_scroll";
    b.customdatas._custom_datas = {};
    b.customdatas._start_up_count = 0;
    b.customdatas._view_type_scroll_onoff = false;
    b.customdatas.init = function() {
        this.initDatas();
    }
    ;
    b.customdatas.initDatas = function() {
        this._start_up_count = 0;
        this._view_type_scroll_onoff = false;
    }
    ;
    b.customdatas.getStartUpCount = function() {
        return this._start_up_count;
    }
    ;
    b.customdatas.setStartUpCount = function(c) {
        this._start_up_count = c;
        this.saveCustomData();
    }
    ;
    b.customdatas.getViewTypeOfScrollFlag = function() {
        return this._view_type_scroll_onoff;
    }
    ;
    b.customdatas.setViewTypeOfScrollFlag = function(c) {
        this._view_type_scroll_onoff = c;
        this.saveCustomData();
    }
    ;
    b.customdatas.salvageCustomData = function() {
        var f = null;
        try {
            f = window.localStorage.getItem(this.DATA_KEY);
        } catch (h) {
            if ((h.name).toUpperCase() == "QUOTA_EXCEEDED_ERR") {}
        }
        var g = null;
        var c = true;
        var d = null;
        if ((f == null) || (f == undefined)) {
            c = false;
        } else {
            try {
                g = JSON.parse(f);
                c = true;
            } catch (h) {
                c = false;
            }
        }
        this._custom_datas = this.createInitCustomDatas();
        if (c) {
            if (g.hasOwnProperty(this.PROPERTY_START_UP_COUNT)) {
                d = g[this.PROPERTY_START_UP_COUNT];
                if (typeof d == "number") {
                    this._start_up_count = d;
                }
            }
            if (g.hasOwnProperty(this.PROPERTY_VIEW_TYPE_SCROLL)) {
                d = g[this.PROPERTY_VIEW_TYPE_SCROLL];
                if (typeof d == "boolean") {
                    this._view_type_scroll_onoff = d;
                }
            }
        }
        this.saveCustomData();
    }
    ;
    b.customdatas.createInitCustomDatas = function() {
        var c = {};
        this.initDatas();
        c[this.PROPERTY_START_UP_COUNT] = this._start_up_count;
        c[this.PROPERTY_VIEW_TYPE_SCROLL] = this._view_type_scroll_onoff;
        return c;
    }
    ;
    b.customdatas.saveCustomData = function() {
        this._custom_datas[this.PROPERTY_START_UP_COUNT] = this._start_up_count;
        this._custom_datas[this.PROPERTY_VIEW_TYPE_SCROLL] = this._view_type_scroll_onoff;
        try {
            window.localStorage.setItem(this.DATA_KEY, JSON.stringify(this._custom_datas));
        } catch (c) {
            if ((c.name).toUpperCase() == "QUOTA_EXCEEDED_ERR") {
                window.console.log(c);
            }
        }
    }
    ;
}
)(jQuery, window);
(function(b) {
    var a = b.texthelper = {
        TEXT_FACE_ROOT_TAG: "scalableface",
        TEXT_FACE_AVAILABLE_FONT_SIZES_TAG: "AvailableSizes",
        TEXT_FACE_DEFAULT_SIZE_TAG: "DefaultSize",
        FACE_GUID_TAG: "Guid",
        EVENT_BOOKMARK_CONVERT_COMPLETE: "event_bookmark_convert_complete",
        VALUE_NOT_SET: -1,
        LORAZEPAM_SUCCESS_CODE: 1000,
        LORAZEPAM_RESULT_DATA_PAGE: "Data",
        LORAZEPAM_RESULT_BOOKMARK1_DATA: "Bookmark1Data",
        LORAZEPAM_RESULT_BOOKMARK2_DATA: "Bookmark2Data",
        LORAZEPAM_CODE_TAG: "Code",
        LORAZEPAM_CONTENT_TAG: "Content",
        _dispatcherObject: b("<div />"),
        _api_name_page_resolver: "lorazepam.php",
        _isTextContent: false,
        _isChangingTextSize: false,
        _availableSizeList: [],
        _nowTextSizeIndex: -1,
        _changeTextSizeIndex: -1,
        _defaultSize: -1,
        _defaultSizeIndex: -1,
        _GUID: "",
        _lorazepamUrl: "",
        _lorazepamResult: {
            resultCode: "",
            afterSize: 0,
            beforeSize: 0,
            afterPageNo: 0,
            afterCharNo: 0,
            afterS1PageNo: 0,
            afterS1CharNo: 0,
            afterS2PageNo: 0,
            afterS2CharNo: 0,
            isSuccess: false,
            isLoadError: false
        },
        _request_timestamp: 0,
        isTextContent: function() {
            return this._isTextContent;
        },
        isChangingTextSize: function() {
            return this._isChangingTextSize;
        },
        setRequestTimestamp: function(c) {
            this._request_timestamp = c;
        },
        setApiName: function(c) {
            if (c !== "") {
                this._api_name_page_resolver = c;
            }
        },
        updateTextSizeIndex: function(e) {
            var d = this.VALUE_NOT_SET;
            var f = 0;
            var c = this._availableSizeList.length;
            for (f = 0; f < c; f++) {
                if (this._availableSizeList[f] === e) {
                    d = f;
                    break;
                }
            }
            if (d == this.VALUE_NOT_SET) {
                d = this._defaultSizeIndex;
            }
            if (d !== this._nowTextSizeIndex) {
                this._nowTextSizeIndex = d;
                return true;
            }
            return false;
        },
        getDispatcherObject: function() {
            return this._dispatcherObject;
        },
        getGUID: function() {
            return this._GUID;
        },
        getDefaultTextSize: function() {
            return this._defaultSize;
        },
        getTextSizeAttachLabel: function() {
            var c = "";
            var d = this._getTextSizeInList(this._nowTextSizeIndex);
            if (d !== this.VALUE_NOT_SET) {
                c = "_" + d;
            }
            return c;
        },
        getTextSizeIndexNow: function() {
            return this._nowTextSizeIndex;
        },
        getTextSizesLength: function() {
            return this._availableSizeList.length;
        },
        getBookmarkConvertResultData: function() {
            return this._lorazepamResult;
        },
        judgeTextContentFaceXml: function(c) {
            var d = c[0].nodeName.toLowerCase();
            return (d === this.TEXT_FACE_ROOT_TAG);
        },
        parseTextContentFaceXml: function(d) {
            this._availableSizeList = this._parseAvailableFontSizes(d);
            this._defaultSize = this._parseDefaultSize(d);
            this._GUID = this._parseGUID(d);
            this._defaultSizeIndex = this.VALUE_NOT_SET;
            this._nowTextSizeIndex = this.VALUE_NOT_SET;
            var e = 0;
            var c = this._availableSizeList.length;
            for (e = 0; e < c; e++) {
                if (this._availableSizeList[e] === this._defaultSize) {
                    this._defaultSizeIndex = e;
                    this._nowTextSizeIndex = e;
                    break;
                }
            }
            this._isTextContent = true;
        },
        existTextSizeToList: function(e) {
            var d = false;
            var f = 0;
            var c = this._availableSizeList.length;
            for (f = 0; f < c; f++) {
                if (this._availableSizeList[f] === e) {
                    d = true;
                    break;
                }
            }
            return d;
        },
        setLorazepamURL: function(e) {
            var d = this.VALUE_NOT_SET;
            var c = "";
            var f = this._api_name_page_resolver;
            d = e.lastIndexOf("/");
            if (d < 0) {
                this._lorazepamUrl = "";
                return false;
            }
            c = e.substring(0, d + 1);
            this._lorazepamUrl = c.concat(f);
            return true;
        },
        setTextSizeChangingOn: function(c) {
            this._setTextSizeChangingFlagOn();
            this._setChangeTextSizeIndex(c);
        },
        setTextSizeChangingOff: function() {
            this._setTextSizeChangingFlagOff();
            this._setChangeTextSizeIndex(this.VALUE_NOT_SET);
        },
        _setTextSizeChangingFlagOn: function() {
            this._isChangingTextSize = true;
        },
        _setTextSizeChangingFlagOff: function() {
            this._isChangingTextSize = false;
        },
        _setChangeTextSizeIndex: function(c) {
            this._changeTextSizeIndex = c;
        },
        doConvertBookmarkData: function(i, h) {
            var c = this;
            var g = {};
            var f = this._getTextSizeInList(this._changeTextSizeIndex);
            var e = this._getTextSizeInList(this._nowTextSizeIndex);
            this._resetBookmarkConvertResultData();
            this._lorazepamResult.afterSize = f;
            this._lorazepamResult.beforeSize = e;
            g.param = i;
            g.asize = f;
            g.bsize = e;
            g.bpage = h.bm_page_auto;
            g.bcount = h.bm_char_auto;
            if (h.bm_page_s1 >= 0) {
                g.s1page = h.bm_page_s1;
                g.s1count = h.bm_char_s1;
            }
            if (h.bm_page_s2 >= 0) {
                g.s2page = h.bm_page_s2;
                g.s2count = h.bm_char_s2;
            }
            g.ts = this._request_timestamp;
            var d = this._createRequestURLConvertBookmarkData(g);
            b.ajax({
                url: d,
                type: "GET",
                dataType: "xml",
                success: function(j) {
                    c._onLoadSuccess(j);
                },
                error: function(k, l, j) {
                    c._onLoadError(k, l, j);
                },
                complete: function() {
                    c._onLoadComplete();
                }
            });
        },
        _onLoadSuccess: function(c) {
            var e = b(c);
            var f = e.find(this.LORAZEPAM_RESULT_DATA_PAGE);
            var h = this._parseLorazepamResult(f);
            f = null;
            f = e.find(this.LORAZEPAM_RESULT_BOOKMARK1_DATA);
            var d = this._parseLorazepamResult(f);
            f = null;
            f = e.find(this.LORAZEPAM_RESULT_BOOKMARK2_DATA);
            var g = this._parseLorazepamResult(f);
            this._lorazepamResult.afterPageNo = h.afterPageNo;
            this._lorazepamResult.afterS1PageNo = d.afterPageNo;
            this._lorazepamResult.afterS2PageNo = g.afterPageNo;
            this._lorazepamResult.isSuccess = true;
            this._lorazepamResult.isLoadError = false;
            if ((h.errorOccur) || (d.errorOccur) || (g.errorOccur)) {
                this._lorazepamResult.isSuccess = false;
            }
        },
        _onLoadError: function(d, e, c) {
            this._lorazepamResult.isSuccess = false;
            this._lorazepamResult.isLoadError = true;
        },
        _onLoadComplete: function() {
            this._dispatcherObject.trigger(this.EVENT_BOOKMARK_CONVERT_COMPLETE);
        },
        _resetBookmarkConvertResultData: function() {
            this._lorazepamResult.resultCode = "";
            this._lorazepamResult.afterSize = 0;
            this._lorazepamResult.beforeSize = 0;
            this._lorazepamResult.afterPageNo = 0;
            this._lorazepamResult.afterCharNo = 0;
            this._lorazepamResult.afterS1PageNo = 0;
            this._lorazepamResult.afterS1CharNo = 0;
            this._lorazepamResult.afterS2PageNo = 0;
            this._lorazepamResult.afterS2CharNo = 0;
            this._lorazepamResult.isSuccess = false;
            this._lorazepamResult.isLoadError = false;
        },
        _parseLorazepamResult: function(i) {
            var c = b.texthelper;
            var e = "";
            var g = 1000;
            var d = false;
            var f = "";
            var h = {};
            h.afterPageNo = c.VALUE_NOT_SET;
            h.resultCode = null;
            h.errorOccur = false;
            h.nonData = false;
            e = i.find(c.LORAZEPAM_CODE_TAG).text();
            if (e) {
                g = (e >> 0);
                d = (g != c.LORAZEPAM_SUCCESS_CODE);
                h.resultCode = g;
                h.errorOccur = d;
                if (!d) {
                    f = i.find(c.LORAZEPAM_CONTENT_TAG).text();
                    f = (f >> 0);
                    h.afterPageNo = f;
                }
            } else {
                h.nonData = true;
            }
            return h;
        },
        _getTextSizeInList: function(d) {
            var c = this.VALUE_NOT_SET;
            if ((d >= 0) && (d < this._availableSizeList.length)) {
                c = this._availableSizeList[d];
            }
            return c;
        },
        _parseAvailableFontSizes: function(e) {
            var d = [];
            var g = null;
            var j = null;
            var c = 0;
            var h = 0;
            g = e.find(this.TEXT_FACE_AVAILABLE_FONT_SIZES_TAG);
            if (g.size() !== 0) {
                j = g.text().split(",");
                c = j.length;
                for (var f = 0; f < c; f++) {
                    h = parseInt(j[f], 10);
                    if (!isNaN(h)) {
                        d.push(h);
                    }
                }
            }
            return d;
        },
        _parseDefaultSize: function(d) {
            var c = this.VALUE_NOT_SET;
            var e = null;
            e = d.find(this.TEXT_FACE_DEFAULT_SIZE_TAG);
            if (e.size() !== 0) {
                c = parseInt(e.text(), 10);
                c = (isNaN(c)) ? this.VALUE_NOT_SET : c;
            }
            return c;
        },
        _parseGUID: function(d) {
            var c = "";
            var e = null;
            e = d.find(this.FACE_GUID_TAG);
            if (e.size() !== 0) {
                c = e.text();
            }
            return c;
        },
        _createRequestURLConvertBookmarkData: function(d) {
            var c = this._lorazepamUrl;
            c = c.concat("?", b.param(d));
            return c;
        }
    };
}
)(jQuery);
(function(a) {
    var b = a.trialhelper = {
        TEXT_FACE_ROOT_TAG: "scalableface",
        _isTrialMode: false,
        _trialRangeIndexList: [],
        _totalDoublePageTrialRangeData: {
            first: 0,
            last: 0
        },
        _totalSpreadPageTrialRangeData: {
            first: 0,
            last: 0
        },
        getTotalDoublePageTrialRangeData: function() {
            return this._totalDoublePageTrialRangeData;
        },
        setTotalDoublePageTrialRangeData: function(d, c) {
            this._totalDoublePageTrialRangeData.first = d;
            this._totalDoublePageTrialRangeData.last = c;
        },
        getTotalSpreadPageTrialRangeData: function() {
            return this._totalSpreadPageTrialRangeData;
        },
        setTotalSpreadPageTrialRangeData: function(d, c) {
            this._totalSpreadPageTrialRangeData.first = d;
            this._totalSpreadPageTrialRangeData.last = c;
        },
        isTrialMode: function() {
            return this._isTrialMode;
        },
        getTrialFirstPageIndex: function() {
            var c = 0;
            if (this.isTrialMode()) {
                c = this._trialRangeIndexList[0];
            }
            return c;
        },
        getTrialLastPageIndex: function() {
            var c = 0;
            if (this.isTrialMode()) {
                c = this._trialRangeIndexList[1];
            }
            return c;
        },
        setTrialModeMetaData: function(g) {
            var d = g.split("_");
            this._trialRangeIndexList.length = 0;
            var f = 0;
            var e = 0;
            var c = d.length;
            for (e = 0; e < c; e++) {
                f = +d[e];
                if (isFinite(f)) {
                    this._trialRangeIndexList.push(f);
                }
            }
            if (this._trialRangeIndexList.length >= 2) {
                this._isTrialMode = true;
            } else {
                this._isTrialMode = false;
            }
        },
        adjustTrialPageIndex: function(e) {
            var d = 0;
            var c = e - 1;
            this._trialRangeIndexList[0] = Math.max(d, Math.min(c, this._trialRangeIndexList[0]));
            this._trialRangeIndexList[1] = Math.max(d, Math.min(c, this._trialRangeIndexList[1]));
            this._trialRangeIndexList.sort(function(g, f) {
                return g - f;
            });
        },
        mapingTrialPageToComputedPage: function(h, f) {
            var e = this.getTrialFirstPageIndex();
            var i = this.getTrialLastPageIndex();
            var c = h[e];
            var d = h[i];
            var g = f[i];
            if (g.spread) {
                d += 1;
            }
            if (window.isFinite(c) == false) {
                c = h[0];
            }
            if (window.isFinite(d) == false) {
                d = h[(h.length - 1)];
            }
            this._totalDoublePageTrialRangeData.first = c;
            this._totalDoublePageTrialRangeData.last = d;
        },
        mapingTrialPageToSpreadPage: function(f) {
            var e = this.getTrialFirstPageIndex();
            var g = this.getTrialLastPageIndex();
            var c = f[e];
            var d = f[g];
            if (window.isFinite(c) == false) {
                c = f[0];
            }
            if (window.isFinite(d) == false) {
                d = f[(f.length - 1)];
            }
            this._totalSpreadPageTrialRangeData.first = c;
            this._totalSpreadPageTrialRangeData.last = d;
        }
    };
}
)(jQuery);
(function(a) {
    var b = a.clickablemaphelper = {
        _use_switch_visibility: false,
        setUseSwitchVisibility: function(c) {
            this._use_switch_visibility = c;
        },
        CLICKABLEMAP_TAG_NAME: "#clickable",
        EVENT_NONE: "event_none",
        EVENT_PAGE_JUMP: "event_page_jump",
        EVENT_URL_OPEN: "event_url_open",
        TIME_ON_CLICKABLE: 400,
        _clickablemap_jqobj: {},
        _is_use: false,
        _now_event_info: {
            event: "",
            move: 0,
            url: ""
        },
        _timeout_id_on_clickable: null,
        _is_on_clickablemap_rect: false,
        isUse: function() {
            return this._is_use;
        },
        isOnClickableMap: function() {
            return this._is_on_clickablemap_rect;
        },
        standby: function() {
            this._is_use = true;
            this._now_event_info.event = "";
            this._now_event_info.move = 0;
            this._now_event_info.url = "";
            this._clickablemap_jqobj = a(this.CLICKABLEMAP_TAG_NAME);
        },
        isEventOnPage: function(d, c, e, k, v) {
            var s = {
                event: "",
                move: 0,
                url: "",
                rect: {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                }
            };
            s.event = this.EVENT_NONE;
            var j = null;
            var t = 0;
            var u = 0;
            var r = 0;
            var f = 0;
            var q = 0;
            var p = 0;
            if ((v == null) || (k == null)) {
                return s;
            }
            j = v[0];
            t = window.parseInt(v.css("left"));
            u = v.outerWidth();
            r = window.parseInt(v.css("top"));
            f = v.outerHeight();
            q = d;
            p = c;
            q -= t;
            p -= r;
            q *= u / (u * e);
            p *= f / (f * e);
            q *= j.width / u;
            p *= j.height / f;
            var h = [];
            if (k.pageXml && k.pageXml.komas) {
                h = k.pageXml.komas;
            }
            var g = false;
            var o = {};
            var n = 0;
            var l = h.length;
            for (n = 0; n < l; n++) {
                o = h[n];
                g = this._insideRect(q, p, o.hotSpotX, o.hotSpotY, o.hotSpotWidth, o.hotSpotHeight);
                if (g) {
                    switch (o.eventNo) {
                    case 7:
                        s.event = this.EVENT_URL_OPEN;
                        s.url = o.eventUrl;
                        break;
                    case 12:
                        s.event = this.EVENT_PAGE_JUMP;
                        s.move = o.eventMoveKoma;
                        break;
                    default:
                        s.event = this.EVENT_NONE;
                    }
                    if (s.event != this.EVENT_NONE) {
                        s.rect.x = o.hotSpotX;
                        s.rect.y = o.hotSpotY;
                        s.rect.w = o.hotSpotWidth;
                        s.rect.h = o.hotSpotHeight;
                    }
                    break;
                }
            }
            return s;
        },
        setClickablemapRect: function(n, q, f) {
            if ((n == null) || (n.event == this.EVENT_NONE)) {
                this._offClickablemap();
                return false;
            }
            var c = n.rect;
            var m = f[0];
            var o = window.parseInt(f.css("left"));
            var p = f.outerWidth();
            var l = window.parseInt(f.css("top"));
            var i = f.outerHeight();
            var k = p / m.width;
            var e = i / m.height;
            var r = (p * q) / p;
            var j = (i * q) / i;
            var g = (c.x * r * k) + o;
            var d = (c.y * j * e) + l;
            var h = c.w * r * k;
            var s = c.h * j * e;
            this._onClickablemap(g, d, h, s);
            return true;
        },
        clearClickablemapRect: function() {
            this._offClickablemap();
        },
        setNowEventInfo: function(c) {
            var d = false;
            if (c.hasOwnProperty("event")) {
                if (c.hasOwnProperty("move")) {
                    if (c.hasOwnProperty("url")) {
                        d = true;
                    }
                }
            }
            if (d) {
                this._now_event_info.event = c.event;
                this._now_event_info.move = c.move;
                this._now_event_info.url = c.url;
            }
        },
        getNowEventInfo: function() {
            return this._now_event_info;
        },
        getNowEventMoveIndex: function() {
            return this._now_event_info.move;
        },
        getNowEventURL: function() {
            return this._now_event_info.url;
        },
        _insideRect: function(f, e, c, h, d, g) {
            if (f < c) {
                return false;
            }
            if (f > (c + d)) {
                return false;
            }
            if (e < h) {
                return false;
            }
            if (e > (h + g)) {
                return false;
            }
            return true;
        },
        _onClickablemap: function(d, g, e, f) {
            var c = this;
            this._setClickablemapRect(d, g, e, f);
            if (this._use_switch_visibility) {
                this._setClickablemapVisible(true);
            }
            this._is_on_clickablemap_rect = true;
            clearTimeout(this._timeout_id_on_clickable);
            this._timeout_id_on_clickable = setTimeout(function(h) {
                c._offClickablemap();
            }, this.TIME_ON_CLICKABLE);
        },
        _offClickablemap: function() {
            if (this._use_switch_visibility) {
                this._setClickablemapRect(0, 0, 10, 10);
                this._setClickablemapVisible(false);
            } else {
                this._setClickablemapRect(0, 0, 0, 0);
            }
            this._is_on_clickablemap_rect = false;
            clearTimeout(this._timeout_id_on_clickable);
        },
        _setClickablemapRect: function(c, f, d, e) {
            c = Math.round(c);
            f = Math.round(f);
            d = Math.round(d);
            e = Math.round(e);
            if (typeof this._clickablemap_jqobj.css !== "function") {
                return;
            }
            this._clickablemap_jqobj.css({
                top: f,
                left: c,
                width: d,
                height: e
            });
        },
        _setClickablemapVisible: function(c) {
            var d = (c) ? "visible" : "hidden";
            this._clickablemap_jqobj.css({
                visibility: d
            });
        },
        _drawPoint: function(g, f, e) {
            var c = 10;
            var d = g.getContext("2d");
            d.strokeStyle = "rgb( 255, 0, 0 )";
            d.save();
            d.beginPath();
            d.moveTo(f, e - 8);
            d.lineTo(f, e + 8);
            d.moveTo(f - 8, e);
            d.lineTo(f + 8, e);
            d.stroke();
            d.restore();
        }
    };
}
)(jQuery);
(function(b) {
    var a = b.nodokagehelper = {
        TOP_ELEMENT_TAG_NAME: "#nodokage",
        KAGE_WIDTH_RATIO: 0.02,
        _top_element_jqobj: {},
        _is_use: false,
        standby: function() {
            this._top_element_jqobj = b(this.TOP_ELEMENT_TAG_NAME);
            this._is_use = true;
        },
        doShow: function() {
            if (!this._is_use) {
                return;
            }
            this._top_element_jqobj.css("display", "block");
        },
        doHide: function() {
            if (!this._is_use) {
                return;
            }
            this._top_element_jqobj.css("display", "none");
        },
        doLayout: function(e, c, f, g) {
            if (!this._is_use) {
                return;
            }
            var d = -(f >> 1);
            this._top_element_jqobj.css({
                top: c,
                left: e,
                height: g,
                width: f,
                "margin-left": d
            });
        },
        doLayoutToLeftCanvas: function(d, c) {
            var e = d.width();
            var f = d.height();
            var h = {};
            h.left = d[0].offsetLeft;
            h.top = d[0].offsetTop;
            e *= c;
            f *= c;
            var j = e + h.left;
            var i = h.top;
            var k = Math.floor(e * this.KAGE_WIDTH_RATIO) << 1;
            var g = f;
            this.doLayout(j, i, k, g);
        }
    };
}
)(jQuery);
(function(a) {
    var b = a.pointerevent = {
        TOUCH: "touch",
        PEN: "pen",
        MOUSE: "mouse",
        MS_TOUCH: 2,
        MS_PEN: 3,
        MS_MOUSE: 4,
        DOWN: "event_down",
        UP: "event_up",
        CANCEL: "event_cancel",
        MOVE: "event_move",
        OVER: "event_over",
        OUT: "event_out",
        ENTER: "event_enter",
        LEAVE: "event_leave",
        CLICK: "event_click",
        CONTEXTMENU: "event_contextmenu",
        DBLCLICK: "event_dblclick",
        POINTER_CLICK: "click",
        POINTER_CONTEXTMENU: "contextmenu",
        POINTER_DBLCLICK: "dblclick",
        POINTER_DOWN: "pointerdown",
        POINTER_UP: "pointerup",
        POINTER_CANCEL: "pointercancel",
        POINTER_MOVE: "pointermove",
        POINTER_OVER: "pointerover",
        POINTER_OUT: "pointerout",
        POINTER_ENTER: "pointerenter",
        POINTER_LEAVE: "pointerleave",
        MS_POINTER_DOWN: "MSPointerDown",
        MS_POINTER_UP: "MSPointerUp",
        MS_POINTER_CANCEL: "MSPointerCancel",
        MS_POINTER_MOVE: "MSPointerMove",
        MS_POINTER_OVER: "MSPointerOver",
        MS_POINTER_OUT: "MSPointerOut",
        MS_POINTER_ENTER: "MSPointerEnter",
        MS_POINTER_LEAVE: "MSPointerLeave",
        SUPPORT_EVENT: {
            POINTER: 0,
            MS_POINTER: 1,
            OTHER: 2
        },
        isPointerTypeToMouse: function(c) {
            return this._isPointerTypeTo(c, this.MOUSE);
        },
        isPointerTypeToTouch: function(c) {
            return this._isPointerTypeTo(c, this.TOUCH);
        },
        isPointerTypeToPen: function(c) {
            return this._isPointerTypeTo(c, this.PEN);
        },
        _isPointerTypeTo: function(e, d) {
            var c = false;
            var f = null;
            f = ("pointerType"in e) ? e.pointerType : "";
            switch (d) {
            case this.MOUSE:
                if ((f == this.MS_MOUSE) || (f == this.MOUSE)) {
                    c = true;
                }
                break;
            case this.TOUCH:
                if ((f == this.MS_TOUCH) || (f == this.TOUCH)) {
                    c = true;
                }
                break;
            case this.PEN:
                if ((f == this.MS_PEN) || (f == this.PEN)) {
                    c = true;
                }
                break;
            }
            return c;
        },
        _is_standby: false,
        _support_event_type: 2,
        _is_support: false,
        _active_pointers: [],
        isStandby: function() {
            return this._is_standby;
        },
        isSupportEventType: function() {
            return this._support_event_type;
        },
        isSupport: function() {
            return this._is_support;
        },
        standby: function() {
            this._init();
            if (window.PointerEvent) {
                this._is_support = true;
                this._support_event_type = this.SUPPORT_EVENT.POINTER;
            } else {
                if (window.MSPointerEvent) {
                    this._is_support = true;
                    this._support_event_type = this.SUPPORT_EVENT.MS_POINTER;
                } else {
                    this._is_support = false;
                    this._support_event_type = this.SUPPORT_EVENT.OTHER;
                }
            }
            this._is_standby = true;
        },
        getEventName: function(d) {
            var c = (this._support_event_type == this.SUPPORT_EVENT.MS_POINTER);
            return this._getEventName(d, c);
        },
        getPointerCount: function() {
            return this._active_pointers.length;
        },
        getFirstPointer: function() {
            return this._getPointerObject(0);
        },
        getSecondPointer: function() {
            return this._getPointerObject(1);
        },
        addPointer: function(j, e, d) {
            var h = false;
            var g = this._createPointerObject();
            var f = 0;
            var c = this._active_pointers.length;
            for (f = 0; f < c; f++) {
                if (this._active_pointers[f].id == j) {
                    h = true;
                    break;
                }
            }
            if (h == false) {
                g.id = j;
                g.pageX = e >> 0;
                g.pageY = d >> 0;
                this._active_pointers.push(g);
            }
        },
        removePointer: function(e) {
            var d = 0;
            var c = this._active_pointers.length;
            for (d = 0; d < c; d++) {
                if (this._active_pointers[d].id == e) {
                    this._active_pointers.splice(d, 1);
                    break;
                }
            }
        },
        updatePointer: function(g, e, d) {
            var f = 0;
            var c = this._active_pointers.length;
            for (f = 0; f < c; f++) {
                if (this._active_pointers[f].id == g) {
                    this._active_pointers[f].pageX = e >> 0;
                    this._active_pointers[f].pageY = d >> 0;
                    break;
                }
            }
        },
        _init: function() {
            this._active_pointers = [];
        },
        _createPointerObject: function() {
            return {
                id: 0,
                pageX: 0,
                pageY: 0
            };
        },
        _getPointerObject: function(d) {
            var c = null;
            if (this._active_pointers.length > d) {
                c = this._active_pointers[d];
            }
            return c;
        },
        _getEventName: function(e, d) {
            var c = "";
            switch (e) {
            case this.DOWN:
                c = (d) ? this.MS_POINTER_DOWN : this.POINTER_DOWN;
                break;
            case this.UP:
                c = (d) ? this.MS_POINTER_UP : this.POINTER_UP;
                break;
            case this.CANCEL:
                c = (d) ? this.MS_POINTER_CANCEL : this.POINTER_CANCEL;
                break;
            case this.MOVE:
                c = (d) ? this.MS_POINTER_MOVE : this.POINTER_MOVE;
                break;
            case this.OVER:
                c = (d) ? this.MS_POINTER_OVER : this.POINTER_OVER;
                break;
            case this.OUT:
                c = (d) ? this.MS_POINTER_OUT : this.POINTER_OUT;
                break;
            case this.ENTER:
                c = (d) ? this.MS_POINTER_ENTER : this.POINTER_ENTER;
                break;
            case this.LEAVE:
                c = (d) ? this.MS_POINTER_LEAVE : this.POINTER_LEAVE;
                break;
            case this.CLICK:
                c = this.POINTER_CLICK;
                break;
            case this.CONTEXTMENU:
                c = this.POINTER_CONTEXTMENU;
                break;
            case this.DBLCLICK:
                c = this.POINTER_DBLCLICK;
                break;
            }
            return c;
        },
        DEBUG: function() {
            var h = "";
            var f = null;
            h = "pinters : " + this.getPointerCount() + "\n";
            var d = this.getFirstPointer();
            var g = this.getSecondPointer();
            d = (d) ? d.id : "";
            g = (g) ? g.id : "";
            h = "pinch : [ " + d + ", " + g + " ]\n";
            var e = 0;
            var c = this._active_pointers.length;
            for (e = 0; e < c; e++) {
                f = this._active_pointers[e];
                h += "ID:" + f.id + " X:" + f.pageX + " Y:" + f.pageY + "\n";
            }
            document.getElementById("screen_surface").innerText = h;
        }
    };
}
)(jQuery);
/*! BSR4B HYBRID - CELSYS,Inc. */
var appmain = appmain || {};
(function(f, u, h) {
    function o(x) {
        var w = this;
        w.iframe_ = document.createElement("iframe");
        w.init(x);
    }
    (function(w) {
        w.create = function(y) {
            return new w(y);
        }
        ;
        var x = w.prototype;
        x.getElement = function() {
            return this.iframe_;
        }
        ;
        x.getWindow = function() {
            return this.getElement().contentWindow;
        }
        ;
        x.getDocument = function() {
            return this.getWindow().document;
        }
        ;
        x.init = function(C) {
            var z = this;
            var B = z.getElement();
            z.remove();
            for (var A = B.attributes.length - 1; 0 <= A; --A) {
                var y = B.attributes[A];
                B.removeAttribute(y.name);
            }
            B.width = 0;
            B.height = 0;
            B.setAttribute("frameborder", "0");
            C.appendChild(B);
            var D = z.getDocument();
            D.open();
            D.close();
        }
        ;
        x.appendNewElement = function(z, C, A) {
            var y = this;
            var B = y.getDocument().createElement(z) || null;
            if (B) {
                if (C) {
                    B.id = C;
                }
                if (!A) {
                    A = y.getBody();
                }
                A.appendChild(B);
            }
            return B;
        }
        ;
        x.removeElementById = function(A) {
            var y = this;
            var z = y.getDocument().getElementById(A);
            if (z) {
                z.parentNode.removeChild(z);
            }
        }
        ;
        x.getHead = function() {
            return this.getDocument().head;
        }
        ;
        x.getBody = function() {
            return this.getDocument().body;
        }
        ;
        x.remove = function() {
            var y = this.getElement();
            if (y.parentNode) {
                y.parentNode.removeChild(y);
            }
        }
        ;
    }
    )(o);
    function r() {
        var w = this;
        w.activeSandboxes_ = {};
        w.sandboxPool_ = [];
    }
    (function(x) {
        x.create = function() {
            return new x();
        }
        ;
        var w = x.prototype;
        w.findById = function(y) {
            return this.activeSandboxes_[y] || null;
        }
        ;
        w.create = function(B, A) {
            var z = this;
            var y = z.findById(B);
            if (!y) {
                if (0 < z.sandboxPool_.length) {
                    y = z.sandboxPool_.pop();
                    y.init(A);
                } else {
                    y = o.create(A);
                }
                y.getElement().id = B;
                z.activeSandboxes_[B] = y;
            }
            return y;
        }
        ;
        w.remove = function(A) {
            var y = this;
            var z = y.findById(A);
            if (z) {
                z.remove();
                delete y.activeSandboxes_[A];
                y.sandboxPool_.push(z);
            }
        }
        ;
    }
    )(r);
    var t = {};
    t.nop = function() {}
    ;
    t.returnTrue = function() {
        return true;
    }
    ;
    t.returnFalse = function() {
        return false;
    }
    ;
    t.delegate = function(y, x, z) {
        var A = null;
        if (typeof z === "function") {
            A = z;
        } else {
            if (x in z) {
                A = function() {
                    return z[x].apply(z, arguments);
                }
                ;
            }
        }
        var w = !!A;
        if (w) {
            y[x] = A;
        }
        return w;
    }
    ;
    t.respondsToSelector = function(x, w) {
        return x && x[w] && (typeof x[w] === "function");
    }
    ;
    t.Protocol = function(x, w) {
        if (arguments.length !== 2) {
            throw new Error("Protocol constructor called with " + arguments.length + "arguments, but expected exactly 2.");
        }
        this.name = x;
        this.methods = [];
        for (var y = 0, z = w.length; y < z; ++y) {
            var A = w[y];
            if (typeof A !== "string") {
                throw new Error("Protocol constructor expects method names to be passed in as a string.");
            }
            this.methods.push(A);
        }
    }
    ;
    t.Protocol.conformsToProtocol = function(y, B) {
        if (arguments.length < 2) {
            return false;
        }
        for (var A = 1, w = arguments.length; A < w; ++A) {
            var C = arguments[A];
            if (C.constructor !== t.Protocol) {
                return false;
            }
            for (var x = 0, z = C.methods.length; x < z; ++x) {
                var D = C.methods[x];
                if (!t.respondsToSelector(y, D)) {
                    return false;
                }
            }
        }
        return true;
    }
    ;
    t.Protocol.copyMethodList = function(y) {
        var z = [];
        for (var w = 0, x = arguments.length; w < x; ++w) {
            var A = arguments[w];
            if (A.constructor === t.Protocol) {
                z = z.concat(A.methods);
            }
        }
        return z;
    }
    ;
    t.Protocol.implementNopProtocolTo = function(z, D) {
        var y = [];
        for (var B = 1, x = arguments.length; B < x; ++B) {
            var E = arguments[B];
            y = y.concat(t.Protocol.copyMethodList(E));
        }
        for (var A = 0, C = y.length; A < C; ++A) {
            var w = y[A];
            if (!(w in z)) {
                t.delegate(z, w, t.nop);
            }
        }
    }
    ;
    var k = {};
    k.Env = function() {
        var w = this;
        var x = navigator.userAgent;
        w.device = {};
        w.device.isIPhone = (x.indexOf("iPhone") !== -1);
        w.device.isIPad = (x.indexOf("iPad") !== -1);
        w.device.isIPodTouch = (x.indexOf("iPod") !== -1);
        w.device.isAndroid = (x.indexOf("Android") !== -1);
        w.device.isFirefox = BSR4B.Common.VersionCheck.isFirefoxOSToUserAgent(navigator.userAgent);
        w.device.isDesktopPC = !w.device.isAndroid && !w.device.isIPhone && !w.device.isIPad && !w.device.isIPodTouch && !w.device.isFirefox;
        w.device.is102SH = (x.indexOf("102SH") !== -1);
        w.device.is103SH = (x.indexOf("103SH") !== -1);
        w.device.is104SH = (x.indexOf("104SH") !== -1);
        w.device.isDM012SH = (x.indexOf("DM012SH") !== -1);
        w.device.isF01D = (x.indexOf("F-01D") !== -1);
        w.device.isF02E = (x.indexOf("F-02E") !== -1);
        w.device.isF04E = (x.indexOf("F-04E") !== -1);
        w.device.isF05E = (x.indexOf("F-05E") !== -1);
        w.device.isF08D = (x.indexOf("F-08D") !== -1);
        w.device.isF10D = (x.indexOf("F-10D") !== -1);
        w.device.isGalaxyNexus = (x.indexOf("Galaxy Nexus") !== -1);
        w.device.isHTL21 = (x.indexOf("HTL21") !== -1);
        w.device.isIS11LG = (x.indexOf("IS11LG") !== -1);
        w.device.isIS12M = (x.indexOf("IS12M") !== -1);
        w.device.isIS12S = (x.indexOf("IS12S") !== -1);
        w.device.isISW11F = (x.indexOf("ISW11F") !== -1);
        w.device.isISW11SC = (x.indexOf("ISW11SC") !== -1);
        w.device.isISW13F = (x.indexOf("ISW13F") !== -1);
        w.device.isL06C = (x.indexOf("L-06C") !== -1);
        w.device.isN03E = (x.indexOf("N-03E") !== -1);
        w.device.isP04D = (x.indexOf("P-04D") !== -1);
        w.device.isSC01C = (x.indexOf("SC-01C") !== -1);
        w.device.isSC01D = (x.indexOf("SC-01D") !== -1);
        w.device.isSC02C = (x.indexOf("SC-02C") !== -1);
        w.device.isSC02D = (x.indexOf("SC-02D") !== -1);
        w.device.isSC02G = (x.indexOf("SC-02G") !== -1);
        w.device.isSC02E = (x.indexOf("SC-02E") !== -1);
        w.device.isSC03E = (x.indexOf("SC-03E") !== -1);
        w.device.isSC04D = (x.indexOf("SC-04D") !== -1);
        w.device.isSC04E = (x.indexOf("SC-04E") !== -1);
        w.device.isSC05D = (x.indexOf("SC-05D") !== -1);
        w.device.isSC06D = (x.indexOf("SC-06D") !== -1);
        w.device.isSH01D = (x.indexOf("SH-01D") !== -1);
        w.device.isSH06D = (x.indexOf("SH-06D") !== -1);
        w.device.isSO02D = (x.indexOf("SO-02D") !== -1);
        w.device.isSO02E = (x.indexOf("SO-02E") !== -1);
        w.device.isSO02F = (x.indexOf("SO-02F") !== -1);
        w.device.isSO03D = (x.indexOf("SO-03D") !== -1);
        w.device.isSO04E = (x.indexOf("SO-04E") !== -1);
        w.device.isSonyTabletP = (x.indexOf("Sony Tablet P") !== -1);
        w.device.isSonyTabletS = (x.indexOf("Sony Tablet S") !== -1);
        w.device.isT01D = (x.indexOf("T-01D") !== -1);
        w.device.isL05E = (x.indexOf("L-05E") !== -1);
        w.device.isSOL22 = (x.indexOf("SOL22") !== -1);
        w.device.isSOL23 = (x.indexOf("SOL23") !== -1);
        w.device.isKYL22 = (x.indexOf("KYL22") !== -1);
        w.device.isSO03G = (x.indexOf("SO-03G") !== -1);
        w.device.isSO04G = (x.indexOf("SO-04G") !== -1);
        w.device.isSOV31 = (x.indexOf("SOV31") !== -1);
        w.device.is402SO = (x.indexOf("402SO") !== -1);
        w.device.isSO05G = (x.indexOf("SO-05G") !== -1);
        w.device.isSOT31 = (x.indexOf("SOT31") !== -1);
        w.device.isF01H = (x.indexOf("F-01H") !== -1);
        w.device.isF02H = (x.indexOf("F-02H") !== -1);
        w.device.isSOL25 = (x.indexOf("SOL25") !== -1);
        w.device.isSOL26 = (x.indexOf("SOL26") !== -1);
        w.device.isSO01G = (x.indexOf("SO-01G") !== -1);
        w.device.isSO03F = (x.indexOf("SO-03F") !== -1);
        w.device.is401SO = (x.indexOf("401SO") !== -1);
        w.device.isSO02G = (x.indexOf("SO-02G") !== -1);
        w.device.isSO05F = (x.indexOf("SO-05F") !== -1);
        w.device.is505SH = (x.indexOf("505SH") !== -1);
        w.device.isNexus6P = (x.indexOf("Nexus 6P") !== -1);
        w.device.isCRRL09 = (x.indexOf("CRR-L09") !== -1);
        w.device.isSHN01 = (x.indexOf("SH-N01") !== -1);
        w.os = {};
        w.os.isOS_4 = (x.indexOf("OS 4") !== -1);
        w.os.isOS_5 = (x.indexOf("OS 5") !== -1);
        w.os.isOS_6 = (x.indexOf("OS 6") !== -1);
        w.os.isIOS = w.device.isIPodTouch || w.device.isIPhone || w.device.isIPad;
        w.os.isAndroid = w.device.isAndroid;
        w.os.isAndroid_2 = (x.indexOf("Android 2") !== -1);
        w.os.isAndroid_3 = (x.indexOf("Android 3") !== -1);
        w.os.isAndroid_3_2 = (x.indexOf("Android 3.2") !== -1);
        w.os.isAndroid_4 = (x.indexOf("Android 4") !== -1);
        w.os.isAndroid_4_0 = (x.indexOf("Android 4.0") !== -1);
        w.os.isAndroid_4_0_1 = (x.indexOf("Android 4.0.1") !== -1);
        w.os.isAndroid_4_0_2 = (x.indexOf("Android 4.0.2") !== -1);
        w.os.isAndroid_4_0_3 = (x.indexOf("Android 4.0.3") !== -1);
        w.os.isAndroid_4_0_4 = (x.indexOf("Android 4.0.4") !== -1);
        w.os.isAndroid_4_1 = (x.indexOf("Android 4.1") !== -1);
        w.os.isAndroid_4_2 = (x.indexOf("Android 4.2") !== -1);
        w.os.isAndroid_4_2_2 = (x.indexOf("Android 4.2.2") !== -1);
        w.os.isAndroid_4_3 = (x.indexOf("Android 4.3") !== -1);
        w.os.isAndroid_4_4 = (x.indexOf("Android 4.4") !== -1);
        w.os.isAndroid_4_4_2 = (x.indexOf("Android 4.4.2") !== -1);
        w.os.isAndroid_5 = (x.indexOf("Android 5") !== -1);
        w.os.isAndroid_5_1_1 = (x.indexOf("Android 5.1.1") !== -1);
        w.os.isAndroid_6 = (x.indexOf("Android 6") !== -1);
        w.os.isAndroid_7 = (x.indexOf("Android 7") !== -1);
        w.browser = {};
        w.browser.isChrome = (x.indexOf("Chrome") !== -1);
        w.browser.isFirefox = (x.indexOf("Firefox") !== -1);
        w.browser.isOpera = (x.indexOf("Opera") !== -1);
        w.browser.isMSIE = (function() {
            var y = x.toLowerCase();
            return (y.indexOf("msie") >= 0 || y.indexOf("trident") >= 0);
        }
        )();
        w.browser.isSafari = (x.indexOf("Safari") !== -1);
        w.browser.isWebKit = (x.indexOf("WebKit") !== -1);
        w.browser.isGecko = (navigator.product === "Gecko");
        w.browser.isAndroidChrome = (function() {
            var y = false;
            if ((x.indexOf("Android") !== -1) && (x.indexOf("Chrome") !== -1)) {
                var z = new RegExp(/\)\sChrome/);
                y = z.test(window.navigator.userAgent);
            }
            return y;
        }
        )();
        w.browser.chromeVersion = (function() {
            if (w.browser.isChrome) {
                var z = x.indexOf("Chrome") + 7;
                var y = x.indexOf(".", z);
                return Number(x.substring(z, y));
            }
            return 999;
        }
        )();
        w.repair = {};
        w.repair.isDialogCollapsesSOL23 = (function() {
            if (w.browser.isChrome) {
                return false;
            }
            var A = "4.2.2";
            var y = window.navigator.userAgent;
            var z = new BSR4B.Common.VersionCheck();
            z.setUserAgent(y);
            if (z.isAndroid()) {
                if (z.orMore(A)) {
                    return true;
                }
            }
            return false;
        }
        )();
        w.VENDOR_PREFIX = (function() {
            if (w.browser.isOpera) {
                return "O";
            } else {
                if (w.browser.isMSIE) {
                    return "ms";
                } else {
                    if (w.browser.isWebKit) {
                        return "webkit";
                    } else {
                        if (w.browser.isGecko) {
                            return "Moz";
                        } else {
                            return "";
                        }
                    }
                }
            }
        }
        )();
        w.TOUCH_ENABLED = (function() {
            var y = document.createElement("div");
            y.setAttribute("ontouchstart", "return");
            return typeof y.ontouchstart === "function";
        }
        )();
    }
    ;
    f.porting = {};
    f.porting.env = new k.Env;
    var v = -1;
    var l = {
        CENTER: 0,
        LEFT: 1,
        RIGHT: 2
    };
    var j = {
        XML: 0,
        JPEG: 1,
        GIF: 2,
        PNG: 3,
        WAV: 4,
        MIDI: 5,
        MP3: 6,
        FACEXML: 7,
        PAGEXML: 8,
        NEXTSEARCH: 998,
        TIMEKEY: 999
    };
    var q = {
        NONE: 0,
        STANDBY: 1,
        RUNNING: 2
    };
    var e = {
        NONE: 0,
        VERTICAL: 1,
        HORIZONTAL: 2
    };
    var p = {
        AUTO: 0,
        TOP_TO_BOTTOM: 1,
        BOTTOM_TO_TOP: 2,
        LEFT_TO_RIGHT: 3,
        RIGHT_TO_LEFT: 4
    };
    var m = {
        NEUTRAL: 0,
        NEXT: 1,
        PREV: 2
    };
    var i = {
        NEUTRAL: 0,
        TO_PAGE: 1,
        TO_KOMA: 2
    };
    var b = {};
    b.createViewerEngineDelegateProtocol = function() {
        return new t.Protocol("ViewerEngineDelegateProtocol",["viewerDidFinishLaunching", "viewerWillEnterKomaMode", "viewerDidEnterKomaMode", "viewerWillLeaveKomaMode", "viewerDidLeaveKomaMode"]);
    }
    ;
    b.createCursorChangerProtocol = function() {
        return new t.Protocol("CursorChangerProtocol",["changeCursor", "onMouseMoveScreenCursorChange"]);
    }
    ;
    b.createScreenDelegateProtocol = function() {
        return new t.Protocol("ScreenDelegateProtocol",["screenWillBeginZooming", "screenDidEndZooming"]);
    }
    ;
    b.createInfoMessageDelegateProtocol = function() {
        return new t.Protocol("InfoMessageDelegateProtocol",["infoMessageWillHide", "infoMessageDidHide"]);
    }
    ;
    b.createScrambleDelegateProtocol = function() {
        return new t.Protocol("ScrambleDelegateProtocol",["scrambleShouldUseClipping"]);
    }
    ;
    var d = function() {};
    d.Type = {
        NORMAL: 0,
        LEFT: 1,
        RIGHT: 2,
        STOP: 3,
        DRAG: 4,
        MENU: 5,
        POINTER: 6,
        DEFAULT: 7
    };
    var c = function(w) {
        var x = this;
        x.core_ = w;
        x.currentCursor_ = d.Type.NORMAL;
    };
    c.prototype.changeCursor = function(y) {
        var w = this;
        if (w.currentCursor_ === y) {
            return;
        }
        w.core_.options.screenWrapper.removeClass("cursor_default cursor_auto cursor_move cursor_pointer");
        w.core_.options.screenWrapper.removeClass("cursor_arrow_left cursor_arrow_right cursor_stop cursor_menu");
        var x = "";
        switch (y) {
        case d.Type.NORMAL:
            w.core_.options.screenWrapper.addClass("cursor_auto");
            break;
        case d.Type.LEFT:
            w.core_.options.screenWrapper.addClass("cursor_arrow_left");
            break;
        case d.Type.RIGHT:
            w.core_.options.screenWrapper.addClass("cursor_arrow_right");
            break;
        case d.Type.STOP:
            w.core_.options.screenWrapper.addClass("cursor_stop");
            break;
        case d.Type.DRAG:
            w.core_.options.screenWrapper.addClass("cursor_move");
            break;
        case d.Type.MENU:
            w.core_.options.screenWrapper.addClass("cursor_menu");
            break;
        case d.Type.POINTER:
            w.core_.options.screenWrapper.addClass("cursor_pointer");
            break;
        case d.Type.DEFAULT:
            w.core_.options.screenWrapper.addClass("cursor_auto");
            setTimeout(function() {
                w.core_.options.screenWrapper.addClass("cursor_default");
            }, 100);
            break;
        default:
            break;
        }
        w.currentCursor_ = y;
    }
    ;
    c.prototype.onMouseMoveScreenCursorChange = function(D) {
        var F = this;
        if (!D) {
            return;
        }
        var B = false;
        var C = d.Type.NORMAL;
        var A = window.innerWidth;
        var x = F.core_.CURSOR_LEFT;
        var E = F.core_.CURSOR_RIGHT;
        var y = D.pageX;
        var w = D.pageY;
        var z = null;
        if (f.clickablemaphelper.isUse()) {
            z = F.core_.getClickableMapEventInfo(y, w);
            if (z !== null) {
                C = d.Type.POINTER;
                B = true;
            }
        }
        if (B == false) {
            if (((A * x) < y) && ((A * E) > y)) {
                C = d.Type.MENU;
                B = true;
            }
        }
        if (B == false) {
            if ((A * E) < y) {
                C = d.Type.RIGHT;
                if (F.core_.isFirstPage() && (F.core_.binding === l.RIGHT)) {
                    if (F.core_.isUseIntroduction() === false) {
                        C = d.Type.STOP;
                    }
                }
                B = true;
            }
        }
        if (B == false) {
            if ((A * x) >= y) {
                C = d.Type.LEFT;
                if (F.core_.isFirstPage() && (F.core_.binding === l.LEFT)) {
                    if (F.core_.isUseIntroduction() === false) {
                        C = d.Type.STOP;
                    }
                }
                B = true;
            }
        }
        F.changeCursor(C);
    }
    ;
    var g = function(z) {
        var G = {};
        var w = f.porting.env.VENDOR_PREFIX + "TransformStyle";
        var E = f.porting.env.os.isIOS && !f.porting.env.os.isOS_4;
        var y = function() {
            z.options.screenWrapper[0].style[w] = "flat";
        };
        if (f.porting.env.os.isAndroid_4) {
            if (f.porting.env.browser.isChrome || f.porting.env.os.isAndroid_4_0_1) {
                t.delegate(G, "viewerDidFinishLaunching", function F() {
                    z.setViewTransformStyle("flat");
                    z.aos4Preserve3dMaster(false, false);
                });
            } else {
                t.delegate(G, "viewerDidFinishLaunching", function F() {
                    z.aos4Preserve3dMaster(false, false);
                });
            }
        } else {
            if (f.porting.env.os.isAndroid_2) {
                t.delegate(G, "viewerDidFinishLaunching", function F() {
                    f("body").css({
                        "-webkit-transform": "translate3d(0, 0, 0)"
                    });
                    z.setViewTransformStyle("preserve-3d");
                });
            } else {
                if (f.porting.env.device.isSonyTabletS || f.porting.env.device.isSC01C || f.porting.env.device.isL06C) {
                    t.delegate(G, "viewerDidFinishLaunching", function F() {
                        z.setViewTransformStyle("flat");
                    });
                } else {
                    if (f.porting.env.os.isAndroid_3) {
                        t.delegate(G, "viewerDidFinishLaunching", function F() {
                            z.setViewTransformStyle("preserve-3d");
                        });
                    } else {
                        if (f.porting.env.os.isIOS) {
                            var B = function() {
                                f("div#viewer").each(function() {
                                    this.style[w] = "preserve-3d";
                                });
                            };
                            if (!f.porting.env.os.isOS_4) {
                                B = t.nop;
                            }
                            t.delegate(G, "viewerDidFinishLaunching", function F() {
                                var I = "hidden";
                                z._setViewStyles("-webkit-backface-visibility", I, I, I, I, I);
                                B();
                            });
                        } else {
                            if (f.porting.env.device.isDesktopPC) {
                                t.delegate(G, "viewerDidFinishLaunching", function F() {
                                    z.options.screenWrapper[0].style[w] = "preserve-3d";
                                    f("#screen_surface").css({
                                        display: "block",
                                        backgroundImage: "url(./img/transparent.png)"
                                    });
                                });
                            }
                        }
                    }
                }
            }
        }
        if (true) {
            t.delegate(G, "viewerWillEnterKomaMode", function D() {
                z.aos4Preserve3dMaster(true, false);
            });
        }
        if (E) {
            t.delegate(G, "viewerDidEnterKomaMode", y);
        } else {
            if (f.porting.env.os.isAndroid_2 && !f.porting.env.browser.isChrome) {
                t.delegate(G, "viewerDidEnterKomaMode", function D() {
                    z.setViewTransformStyle("preserve-3d");
                });
            }
        }
        if (!f.porting.env.browser.isChrome) {
            var C = function() {
                if (z.isLandscape()) {
                    z.updateRender();
                }
            };
            var A = function() {
                setTimeout(function() {
                    z.reDrawCurrentScreen();
                }, 200);
            };
            var H = null;
            if (f.porting.env.os.isAndroid_4) {
                if (f.porting.env.os.isAndroid_4_0) {
                    H = function() {
                        C();
                        A();
                    }
                    ;
                } else {
                    H = A;
                }
            }
            if (H) {
                t.delegate(G, "viewerDidLeaveKomaMode", H);
            }
        }
        if (f.porting.env.device.isDesktopPC) {
            var x = new c(z);
            t.delegate(G, "changeCursor", x);
            t.delegate(G, "onMouseMoveScreenCursorChange", x);
        }
        if (E) {
            t.delegate(G, "screenWillBeginZooming", y);
        }
        if (f.porting.env.browser.isChrome) {
            if (f.porting.env.browser.chromeVersion < 25) {
                if (f.porting.env.device.is102SH || f.porting.env.device.is104SH || f.porting.env.device.isF08D || f.porting.env.device.isHTL21 || f.porting.env.device.isIS12M || f.porting.env.device.isISW11F || f.porting.env.device.isISW11SC || f.porting.env.device.isN03E || f.porting.env.device.isSC02C || f.porting.env.device.isSC02E || f.porting.env.device.isSC03E || f.porting.env.device.isSC04E || f.porting.env.device.isGalaxyNexus || f.porting.env.device.isSO02E || f.porting.env.device.isSH01D || f.porting.env.device.isSH06D || f.porting.env.device.isT01D) {
                    t.delegate(G, "scrambleShouldUseClipping", t.returnTrue);
                }
            }
        }
        if (!t.respondsToSelector(G, "scrambleShouldUseClipping")) {
            t.delegate(G, "scrambleShouldUseClipping", t.returnFalse);
        }
        t.Protocol.implementNopProtocolTo(G, b.createViewerEngineDelegateProtocol(), b.createCursorChangerProtocol(), b.createScreenDelegateProtocol(), b.createInfoMessageDelegateProtocol());
        return G;
    };
    u.App_h5v = {
        options: {
            version: "1.0.0",
            siteUrl: "",
            helpUrl: "",
            helpPcUrl: "",
            cgi: "",
            read: "",
            param: "",
            screenWrapper_id: "screen-wrapper",
            screenWrapper: f("#screen-wrapper"),
            screen: f('<div class="screen" />'),
            komaWrapper_id: "koma-wrapper",
            komaWrapper: f("#koma-wrapper"),
            komaImage: f("#koma_image"),
            fixViewTypeOfSpread: false,
            fixTextSizeOfDefault: false,
            fixSpreadPageMode: false,
            fixPageModeOnly: false
        },
        _fix_spread_page_mode: false,
        _scaling: 1,
        _scaling_mode: false,
        nextSearch: false,
        _komaScrollFlag: false,
        _storage_id: h,
        _is_first_time: false,
        _is_use_introduction: false,
        isUseIntroduction: function() {
            return this._is_use_introduction;
        },
        _is_use_postscript: false,
        isUsePostScript: function() {
            return this._is_use_postscript;
        },
        _currentPage: v,
        _computedCurrentPage: v,
        _spreadCurrentPage: v,
        _currentKoma: v,
        _totalPage: 0,
        _totalDoublePage: 0,
        _totalBlankPage: 0,
        _totalSpreadPage: 0,
        _hasLoadFunctionIndex: [],
        _guid: h,
        binding: l.RIGHT,
        startPage: l.LEFT,
        zoomPoints: [1, 1.25, 1.5, 1.75, 2],
        zoomMode: false,
        zoomScale: 1,
        pinchFlag: false,
        contentFrameWidth: 0,
        contentFrameHeight: 0,
        _viewWidth: window.innerWidth,
        _viewHeight: window.innerHeight,
        _updateRenderFlag: false,
        _komaTouchWaitFlag: false,
        _isResizeEvent: false,
        _contentsData: [],
        _blankPages: [],
        _doublePages: [],
        _maskPageMap: [],
        _screenObj: [],
        _isMask: false,
        _sequentialPageData: [],
        _computedSequentialPageData: [],
        _spreadIndexMap: [],
        _computedIndexMap: [],
        _computedCurrentPageNo: [],
        _currentPageComputedNo: [],
        _pageToComputedPageIndexMap: [],
        _alignment: l.CENTER,
        _loadingImageFlags: [],
        _loadedPageImageIndex: [],
        _loadingPageXmlIndex: [],
        _lastGetKeyTime: 0,
        duringAnimation: false,
        isChangingMode: false,
        isChanging: false,
        isRetryDialogShowing: false,
        isDrawScreen: false,
        flickOperation: false,
        touchEndIgnore: false,
        komaMode: false,
        executePrevKoma: false,
        komaScrollState: q.NONE,
        komaScrollDir: e.NONE,
        komaScrollCount: 0,
        komaScrollTimes: 0,
        _retryConnectFunction: null,
        _isExecLoadingTheFuture: false,
        _preloadTimer: 0,
        TRANSFORM: f.porting.env.VENDOR_PREFIX + "Transform",
        TRANSFORM_ORIGIN: f.porting.env.VENDOR_PREFIX + "TransformOrigin",
        TRANSFORM_STYLE: f.porting.env.VENDOR_PREFIX + "TransformStyle",
        TRANSITION_END: (function() {
            if (f.porting.env.browser.isWebKit) {
                return "webkitTransitionEnd";
            } else {
                if (f.porting.env.browser.isOpera) {
                    return "oTransitionEnd";
                } else {
                    return "transitionend";
                }
            }
        }
        )(),
        _delegates: null,
        maintenanceImageSize: 0,
        portraitMaxHeight: 0,
        landscapeMaxHeight: 0,
        adjustmentHeight: true,
        _pageBaseUrl: "",
        showingDialog: null,
        showingAlert: null,
        nextSearchResult: {
            loaded: false,
            code: "",
            type: "",
            nextMessage: "",
            nextdata: ""
        },
        _viewTypeOfScroll: true,
        _tableOfContentsData: [],
        _request_timestamp: 0,
        _nowPageFeed: m.NEUTRAL,
        _isReadyFirstPage: false,
        _fromChangeMode: i.NEUTRAL,
        _isInitializeAndLoadingFinished: false,
        isInitializeAndLoadingFinished: function() {
            return (this._isInitializeAndLoadingFinished === true);
        },
        setInitializeAndLoadingFinished: function() {
            this._isInitializeAndLoadingFinished = true;
        },
        _screenWrapper_interaction_obj: null,
        _komaWrapper_interaction_obj: null,
        CURSOR_LEFT: 0.4,
        CURSOR_RIGHT: 0.6,
        CURSOR_HIDE_ADDRESS_BAR_HEIGHT: 10,
        KEYBOARD_LEFT: 37,
        KEYBOARD_RIGHT: 39,
        INTERVAL_TIMEKEY: (1000 * 60 * 90),
        INTERVAL_TIMEKEY_SHORT: (1000 * 60 * 1),
        TIMEOUT: 60 * 1000,
        LOADING_FUTURE_PAGE: 6,
        SAVING_FUTURE_PAGE: 10,
        DL_BUFFER: (1024 * 1000 * 3),
        KOMA_FIT_COEFFICIENT: 1.3,
        HORZ_FLICK_THRESHOLD: 0.5,
        BODY_SCROLL_TOP: false,
        TOUCHEND_OR_CLICK: ("ontouchend"in document.documentElement) ? "touchend" : "click",
        TOUCHEND_OR_MOUSEUP: ("ontouchend"in document.documentElement) ? "touchend" : "mouseup",
        TOUCHSTART_OR_MOUSEDOWN: ("ontouchstart"in document.documentElement) ? "touchstart" : "mousedown",
        TOUCHCANCEL_OR_MOUSEOUT: ("ontouchcancel"in document.documentElement) ? "touchcancel" : "mouseout",
        TOUCHMOVE_OR_MOUSEMOVE: ("ontouchmove"in document.documentElement) ? "touchmove" : "mousemove",
        TOUCHSTART_OR_MOUSEUP: ("ontouchstart"in document.documentElement) ? "touchstart" : "mouseup",
        ERROR_CODE_USEUP: "2099",
        SPREAD_SWITCHING_SYSTEM: (function() {
            if (f.porting.env.device.isSC02E || f.porting.env.device.isGalaxyNexus || f.porting.env.device.isIPad) {
                return true;
            }
            if (f.porting.env.device.is402SO || f.porting.env.device.isSO03G || f.porting.env.device.isSO04G || f.porting.env.device.isSOV31) {
                return true;
            }
            if (f.porting.env.device.isSO05G || f.porting.env.device.isSOT31 || f.porting.env.device.isF01H || f.porting.env.device.isF02H) {
                return true;
            }
            var z = "5.0.0";
            var w = window.navigator.userAgent;
            var y = new BSR4B.Common.VersionCheck();
            y.setUserAgent(w);
            var x = false;
            if (y.isAndroid()) {
                if (y.orMore(z)) {
                    x = true;
                }
            }
            y = null;
            if ((x) && (f.porting.env.browser.isAndroidChrome == false)) {
                return true;
            }
            return false;
        }
        )(),
        getViewerVersion: function() {
            return this.options.version;
        },
        getNextSearchEnabled: function() {
            return this.nextSearch;
        },
        isBindingLeft: function() {
            return (this.binding === l.LEFT);
        },
        isBindingRight: function() {
            return (this.binding === l.RIGHT);
        },
        isViewTypeOfScroll: function() {
            return this._viewTypeOfScroll;
        },
        setViewTypeOfScroll: function(x) {
            var w = this;
            w._viewTypeOfScroll = x;
            f.customdatas.setViewTypeOfScrollFlag(x);
            if (w.isLandscape() && !w.komaMode) {
                w.setSpreadPageFront();
                w.setComputedCurrentPage(w._computedCurrentPage, false, true);
                w.updateAllScreens();
                if (!w._viewTypeOfScroll) {
                    setTimeout(function() {
                        w.reDrawCurrentScreenCanvas();
                    }, 200);
                }
            }
        },
        isTrialMode: function() {
            return f.trialhelper.isTrialMode();
        },
        isTextContent: function() {
            return f.texthelper.isTextContent();
        },
        getTextSizeIndexData: function() {
            var w = {};
            w.now_index = f.texthelper.getTextSizeIndexNow();
            w.sizes_length = f.texthelper.getTextSizesLength();
            return w;
        },
        isKomaMode: function() {
            return this.komaMode;
        },
        isPageMode: function() {
            return (!this.komaMode && this.isLandscape() && !this.isViewTypeOfScroll());
        },
        isPageStepScrollMode: function() {
            return (!this.komaMode && this.isLandscape() && this.isViewTypeOfScroll());
        },
        isPortraitAndScrollDisc: function() {
            return ((this.isPortrait()) || this.isPageStepScrollMode());
        },
        isLongHeightSpread: function(w) {
            return (this._computedSequentialPageData[w].alignment === l.CENTER && this._computedSequentialPageData[w].pageData.spread);
        },
        isLongWidthSpread: function(w) {
            return (this._computedSequentialPageData[w].alignment !== l.CENTER && this._computedSequentialPageData[w].pageData.spread);
        },
        getTableOfContentsData: function() {
            return this._tableOfContentsData;
        },
        getNextSearchResult: function() {
            return this.nextSearchResult;
        },
        _updateRequestTimeStamp: function() {
            this._request_timestamp = new Date().getTime();
        },
        _canvasRefreshTrigger: function(y) {
            var w = f.porting.env.device.isL05E;
            if (w === false) {
                return;
            }
            var x = document.createElement("canvas");
            y.appendChild(x);
            setTimeout(function() {
                x.width = 257;
                x.height = 1;
                setTimeout(function() {
                    y.removeChild(x);
                    x = null;
                    y = null;
                }, 1000);
            }, 1000);
        },
        _init: function(z) {
            f.extend(true, this.options, z);
            var x = this;
            var B = f(window);
            x._isInitializeAndLoadingFinished = false;
            f.pageonearlier.init();
            x._initCustomDatas();
            x._addStartUpCount();
            Interaction.initialize(f.porting.env.device.isDesktopPC);
            this.TOUCHEND_OR_CLICK = "";
            this.TOUCHEND_OR_MOUSEUP = "";
            this.TOUCHSTART_OR_MOUSEDOWN = "";
            this.TOUCHCANCEL_OR_MOUSEOUT = "";
            this.TOUCHMOVE_OR_MOUSEMOVE = "";
            this.TOUCHSTART_OR_MOUSEUP = "";
            x._delegates = g(this);
            if (!t.Protocol.conformsToProtocol(x._delegates, b.createViewerEngineDelegateProtocol(), b.createCursorChangerProtocol(), b.createScreenDelegateProtocol(), b.createInfoMessageDelegateProtocol(), b.createScrambleDelegateProtocol())) {
                throw new Error("bad delegates.");
            }
            var y = function() {
                var E = window;
                var D = document;
                return E.pageYOffset || (D.compatMode === "CSS1Compat" && D.documentElement.scrollTop) || D.body.scrollTop || 0;
            };
            var A = setInterval(function() {
                if (window.document.body) {
                    clearInterval(A);
                    x.BODY_SCROLL_TOP = y();
                    x.hideAddressBar();
                }
            }, 15);
            this._updateRequestTimeStamp();
            f.ajaxSetup({
                timeout: x.TIMEOUT
            });
            f("#message_reload").hide();
            appview.manager.init(this);
            this.hideAddressBar(function() {
                var D = appview.manager.getEventReceiver();
                D.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_STAGE_SIZE);
            });
            var C = appview.manager.getEventDispatcher();
            if (appview.manager.isUseView(appview.constants.ID_SPLASH_SCREEN)) {
                C.on(appview.events.EVENT_SPLASH_CLOSE, function(D) {
                    if (f.customdatas.getStartUpCount() <= 1) {
                        x._initInfoMessage();
                    }
                    return false;
                });
                appview.manager.openPanel(appview.constants.ID_SPLASH_SCREEN);
            }
            f.scramble.standardScrambleTerminal = !x._delegates.scrambleShouldUseClipping();
            if (f.porting.env.os.isIOS) {
                f.scramble.transcribeMode = true;
            }
            var w = f('#meta input[name="trial"]').val() + "";
            f.trialhelper.setTrialModeMetaData(w);
            if (f.porting.env.os.isIOS) {
                B.on("pagehide", function() {
                    B.one("pageshow", function() {
                        B.trigger("resize");
                    });
                });
            } else {
                B.on("blur", function() {
                    B.one("focus", function() {
                        if (x.komaMode) {
                            x.reDrawCurrentKoma();
                        } else {
                            x.reDrawCurrentScreen();
                        }
                    });
                });
            }
            if (f.porting.env.os.isOS_4 || f.porting.env.os.isOS_5) {
                x._scaling_mode = true;
            }
            setTimeout(function() {
                x.adjustmentWrapperSize(window.innerHeight);
            }, 100);
            C.on(appview.events.EVENT_ERROR_DIALOG_BACK_SITE_PAGE, function(D) {
                x.backSitePage();
                return false;
            });
            setTimeout(function() {
                x._startLoadDatas();
            }, 500);
            f("#screen_surface").addClass("onstage");
            x._delegates.viewerDidFinishLaunching();
        },
        _startLoadDatas: function() {
            var w = this;
            var y = function() {
                var z = document.getElementById("viewer");
                w._canvasRefreshTrigger(z);
                w._loadFaceXml();
            };
            var x = null;
            this._updateTimeKeyFirst(y, x);
        },
        _updateTimeKeyFirst: function(z, x) {
            var w = this;
            var y = w._makeDownloadUrl({
                mode: j.TIMEKEY,
                reqtype: 1,
                file: ""
            });
            f.ajax({
                url: y,
                dataType: "xml",
                success: function(B) {
                    var A = w._setTimeKeyData(B);
                    if (A.success) {
                        var C = f(B);
                        w._storage_id = f.parser.getTextOf(C, "StorageId");
                        w.nextSearch = (f.parser.getTextOf(C, "SearchEnabled") === "1");
                        f.texthelper.setApiName(f.parser.getTextOf(C, "PageResolver"));
                        w._lastGetKeyTime = new Date().getTime();
                        if (typeof z === "function") {
                            z();
                        }
                    } else {
                        w._openErrorDialogEx(A.code);
                        if (typeof x === "function") {
                            x();
                        }
                    }
                },
                error: function() {
                    w._openErrorDialog("3001");
                    if (typeof x === "function") {
                        x();
                    }
                }
            });
        },
        _loadFaceXml: function() {
            var w = this;
            var y = "face" + f.texthelper.getTextSizeAttachLabel() + ".xml";
            var x = w._makeDownloadUrl({
                mode: j.FACEXML,
                file: y,
                reqtype: 0
            });
            x = x.replace(/http:/, "https:");
            f.ajax({
                url: x,
                dataType: "jsonp",
                error: function() {
                    w._openErrorDialog("2004");
                },
                success: function(D) {
                    var H = f.trim(f.parser.getTextOf(f(D), "Code"));
                    if (H === "") {
                        var A = f(D);
                        var I = f.texthelper.judgeTextContentFaceXml(A);
                        if (I) {
                            f.texthelper.setLorazepamURL(w.options.cgi);
                            f.texthelper.parseTextContentFaceXml(A);
                            var F = f.texthelper.getGUID();
                            var E = f.bookmark.init({
                                guid: F,
                                storageid: w._storage_id
                            }).getTextSize();
                            var C = false;
                            if (f.texthelper.existTextSizeToList(E) == false) {
                                C = true;
                            }
                            if (w.options.fixTextSizeOfDefault) {
                                if (f.bookmark.getTextSize() != f.texthelper.getDefaultTextSize()) {
                                    C = true;
                                }
                            }
                            if (C) {
                                E = f.texthelper.getDefaultTextSize();
                                f.bookmark.setTextSize(E);
                                f.bookmark.setTextSizeBefore(0);
                                f.bookmark.deleteBookmarkData();
                            }
                            f.texthelper.updateTextSizeIndex(E);
                            w._loadFaceXml();
                            f.nodokagehelper.standby();
                            return;
                        }
                        if (f.trim(f.parser.getTextOf(A, "ContentType")) !== "3") {
                            w._openErrorDialog("2004");
                        }
                        w._totalPage = parseInt(A.find("TotalPage").text(), 10);
                        w._totalBlankPage = parseInt(A.find("InBlankPages").text(), 10);
                        if (isNaN(w._totalBlankPage)) {
                            w._totalBlankPage = w._totalPage;
                        }
                        w._totalDoublePage = parseInt(A.find("InDoublePages").text(), 10);
                        if (isNaN(w._totalDoublePage)) {
                            w._totalDoublePage = w._totalPage;
                        }
                        w._guid = f.trim(f.parser.getTextOf(A, "Guid"));
                        w.binding = (f.trim(f.parser.getTextOf(A, "Binding")) === "0") ? l.RIGHT : l.LEFT;
                        w.startPage = (f.trim(f.parser.getTextOf(A, "StartPage")) === "0") ? l.RIGHT : l.LEFT;
                        w.contentFrameWidth = parseInt(A.find("ContentFrame > Width").text(), 10);
                        w.contentFrameHeight = parseInt(A.find("ContentFrame > Height").text(), 10);
                        w._doublePages.length = 0;
                        w._blankPages.length = 0;
                        w._maskPageMap.length = 0;
                        w._isMask = false;
                        if (A.find("DoublePage > Page").size() !== 0) {
                            A.find("DoublePage > Page").each(function(J) {
                                w._doublePages.push(parseInt(f(this).text(), 10));
                            });
                        } else {
                            if (A.find("DoublePagesMap").size() !== 0) {
                                f.each(A.find("DoublePagesMap").text().split(","), function() {
                                    if (!isNaN(parseInt(this, 10))) {
                                        w._doublePages.push(parseInt(this, 10));
                                    }
                                });
                            }
                        }
                        if (A.find("BlankPage > Page").size() !== 0) {
                            A.find("BlankPage > Page").each(function(J) {
                                w._blankPages.push(parseInt(f(this).text(), 10));
                            });
                        } else {
                            if (A.find("BlankPageMap").size() !== 0) {
                                f.each(A.find("BlankPageMap").text().split(","), function() {
                                    if (!isNaN(parseInt(this, 10))) {
                                        w._blankPages.push(parseInt(this, 10));
                                    }
                                });
                            }
                        }
                        if (A.find("Scramble").size() !== 0) {
                            f.scramble.setVariables({
                                scramble_w: parseInt(A.find("Scramble > Width").text(), 10),
                                scramble_h: parseInt(A.find("Scramble > Height").text(), 10)
                            });
                        }
                        if (A.find("MaskPageMap").size() !== 0) {
                            if (f("MaskPageMap", D).text().indexOf("1", 0) !== -1) {
                                w._isMask = true;
                            }
                            f.each(f("MaskPageMap", D).text().split(","), function() {
                                if (!isNaN(parseInt(this, 10))) {
                                    w._maskPageMap.push(parseInt(this, 10));
                                }
                            });
                        }
                        w._initNavigation(D);
                        if (A.find("optionid").size() !== 0) {
                            var B = f.trim(f.parser.getTextOf(A, "OptionId"));
                            var z = B.split(",");
                            var G = "";
                            f.each(z, function() {
                                G = this.toLowerCase();
                                switch (G) {
                                case "epub":
                                    var L = "4.3";
                                    var J = window.navigator.userAgent;
                                    var K = new BSR4B.Common.VersionCheck();
                                    K.setUserAgent(J);
                                    if (K.isAndroid()) {
                                        if (K.orMore(L)) {
                                            f.clickablemaphelper.setUseSwitchVisibility(true);
                                        }
                                    }
                                    K = null;
                                    f.clickablemaphelper.standby();
                                    break;
                                case "omf":
                                    break;
                                }
                            });
                        }
                        D = null;
                        if (f.texthelper.isChangingTextSize()) {
                            w._initializeObjectsInTextSizeChanging();
                        } else {
                            w._initializeObjects();
                        }
                    } else {
                        w._openErrorDialogEx(H);
                    }
                }
            });
        },
        _initializeObjectsInTextSizeChanging: function() {
            this._currentPageComputedNo.length = 0;
            this._computedCurrentPageNo.length = 0;
            this._computedSequentialPageData.length = 0;
            this._computedIndexMap.length = 0;
            this._pageToComputedPageIndexMap.length = 0;
            this._spreadIndexMap.length = 0;
            this._sequentialPageData.length = 0;
            this._contentsData.length = 0;
            this._initContentData();
            if (f.bookmark.haveTextSizeBefore()) {
                var F = -1;
                var D = -1;
                var x = -1;
                var E = -1;
                var A = -1;
                var w = -1;
                var z = 0;
                E = f.bookmark.getPageFileNumber();
                A = f.bookmark.getS1PageFileNumber();
                w = f.bookmark.getS2PageFileNumber();
                z = this._pageToComputedPageIndexMap.length;
                if ((E >= 0) && (E < z)) {
                    F = this._pageToComputedPageIndexMap[E];
                }
                if ((A >= 0) && (A < z)) {
                    D = this._pageToComputedPageIndexMap[A];
                }
                if ((w >= 0) && (w < z)) {
                    x = this._pageToComputedPageIndexMap[w];
                }
                f.bookmark.updateBookmarkForSizeChange(F, D, x);
            }
            var B = f.bookmark.getPageNumber();
            this._currentKoma = 1;
            this._spreadCurrentPage = this._spreadIndexMap[this._computedIndexMap[B]] + 1;
            this._resetScreenCanvasObjectIndex();
            f.texthelper.setTextSizeChangingOff();
            var C = f.bookmark.getFirstCharNumber();
            this.checkPageDataAndJump(this._computedIndexMap[B], B, 0, 999, false, function() {
                f.bookmark.setPageNumber(null, C);
            });
            f(window).triggerHandler("resize");
            var y = appview.manager.getEventReceiver();
            y.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_TEXT_SIZE_CHANGE_COMPLETED);
        },
        _initializeObjects: function() {
            var C = this
              , z = null;
            var A = appview.manager.getEventReceiver();
            C._initContentData();
            C._initScreen();
            C._initKoma();
            C._initTrialMode();
            if (f.trialhelper.isTrialMode()) {
                var y = f.trialhelper.getTrialFirstPageIndex();
                var D = f.trialhelper.getTrialLastPageIndex();
                var w = null;
                var E = 0;
                var B = 0;
                var x = C._sequentialPageData.length;
                for (B = 0; B < x; B++) {
                    w = C._sequentialPageData[B];
                    E = w.index;
                    if ((E < y) || (E > D)) {
                        w.index = -1;
                    }
                }
            }
            C._initBookmark();
            C._initMenu();
            if (appview.manager.isUseView(appview.constants.ID_SPLASH_SCREEN)) {} else {
                C._initInfoMessage();
            }
            f(window).on("resize", function(J) {
                var I = C.isPortrait();
                var K = C._viewWidth;
                var G = C._viewHeight;
                var H = function() {
                    A.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_STAGE_SIZE);
                    if (f.texthelper.isChangingTextSize()) {
                        return;
                    }
                    if (C.isInitializeAndLoadingFinished() === false) {
                        return;
                    }
                    C._viewWidth = window.innerWidth;
                    C._viewHeight = window.innerHeight;
                    if (f.porting.env.device.isDesktopPC) {
                        C.setZoomPoints();
                    }
                    if ((C._viewWidth !== K) || (C._viewHeight !== G)) {
                        if (f.infomessage.existMessage() && (I !== C.isPortrait())) {
                            f.infomessage.removeDialogMessage();
                        }
                        C.adjustmentWrapperSize(window.innerHeight);
                        var L = false;
                        if (!f.porting.env.device.isDesktopPC) {
                            L = appview.manager.isOpenedRetryDialog();
                        }
                        if (!L) {
                            C.setSpreadPageFront();
                            C.executePrevKoma = false;
                            if (C.komaMode) {
                                C._komaScrollFlag = false;
                            } else {
                                C.aos4Preserve3dMaster(false, true);
                            }
                            C.setComputedCurrentPage(C._computedCurrentPage, false, true);
                            C.setTocReset();
                            C.updateRender(true);
                            if (!f.porting.env.device.isDesktopPC) {
                                C.adjustmentScreen();
                            }
                        }
                        setTimeout(function() {
                            C.adjustmentWrapperSize(window.innerHeight);
                        }, 500);
                        setTimeout(function() {
                            C.setDialogPositionTop(C.showingAlert);
                            C.setDialogPositionTop(C.showingDialog);
                        }, 0);
                        if (f.porting.env.os.isAndroid_4 && !f.porting.env.browser.isAndroidChrome && !f.porting.env.browser.isFirefox && !f.porting.env.browser.isOpera) {
                            setTimeout(function() {
                                var M = window.outerHeight;
                                f("#stage_frame").height(M);
                                if (C.komaMode) {
                                    f("#koma-wrapper").height(M);
                                } else {
                                    f("#screen-wrapper").height(M);
                                }
                                A.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_STAGE_SIZE);
                            }, 500);
                        }
                    }
                    C.changeLoadingState(false);
                    C._isResizeEvent = false;
                };
                C._isResizeEvent = false;
                C.changeLoadingState(false);
                clearTimeout(z);
                z = setTimeout(function F() {
                    z = null;
                    if (f.texthelper.isChangingTextSize()) {
                        return;
                    }
                    if (C.isInitializeAndLoadingFinished() === false) {
                        return;
                    }
                    if ((C._viewWidth !== window.innerWidth) || (C._viewHeight !== window.innerHeight)) {
                        C._isResizeEvent = true;
                        C.changeLoadingState(true);
                        C.hideAddressBar(H);
                    }
                }, 250);
            });
            if (!f.porting.env.browser.isChrome) {
                setTimeout(function() {
                    if (f.porting.env.device.isF01D || f.porting.env.device.isSonyTabletP || f.porting.env.device.isSC02D) {
                        C.setViewTransformStyle("preserve-3d");
                    }
                    C.aos4Preserve3dMaster(false, true);
                }, 0);
            }
            if (C.showingAlert || C.showingDialog) {
                f.infomessage.removeDialogMessage();
            }
            A.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_PROGRESS_INITIALIZE_FINISH);
        },
        _initContentData: function() {
            var E = this, w, A = 0, y = 0, D = 0, B = 0, z = 0;
            var C = function(I, H, G) {
                E._computedSequentialPageData[E._computedSequentialPageData.length] = {
                    alignment: I,
                    pageData: H
                };
                E._computedIndexMap.push(E._spreadIndexMap.length - 1);
                if (G) {
                    E._pageToComputedPageIndexMap.push(E._computedSequentialPageData.length - 1);
                }
            };
            var x = function() {
                return [];
            };
            var F = function(H) {
                var G = this;
                G.index = H;
                G.pageXml = null;
                G.loadFunction = null;
                G.loadedFlag = false;
                G.loadCount = 0;
                G.spread = false;
                G.imgData = null;
            };
            F.prototype = {
                isXmlValid: function() {
                    return this.pageXml && !this.pageXml.code;
                },
                isBlank: function() {
                    return (this.index === v);
                }
            };
            F.createWith = function(G) {
                return new F(G);
            }
            ;
            for (A = 0,
            y = E._totalBlankPage; A < y; A++) {
                (function(I) {
                    var H, G;
                    if (w === h) {
                        w = x();
                    }
                    if (f.inArray(I, E._blankPages) !== -1) {
                        w.push(F.createWith(v));
                        if (I === 0 && E.binding !== E.startPage && f.inArray(I, E._doublePages) === -1) {
                            w.unshift(F.createWith(v));
                        }
                    } else {
                        H = F.createWith(z);
                        E._spreadIndexMap.push(E._contentsData.length);
                        E._sequentialPageData.push(H);
                        if (I === 0 && E.binding !== E.startPage && f.inArray(H.index, E._doublePages) === -1) {
                            w.unshift(F.createWith(v));
                        }
                        w.push(H);
                        if (f.inArray(H.index, E._doublePages) !== -1) {
                            H.spread = true;
                            if (E.binding === l.RIGHT) {
                                C(l.RIGHT, H, true);
                                C(l.LEFT, H, false);
                            } else {
                                C(l.LEFT, H, true);
                                C(l.RIGHT, H, false);
                            }
                            if (w.length > 1) {
                                w = x();
                                w.push(H);
                            }
                            E._contentsData.push(w);
                            w = x();
                        } else {
                            H.spread = false;
                            C(l.CENTER, H, true);
                        }
                        z++;
                    }
                }
                )(A);
                if (f.inArray(B, E._doublePages) !== -1) {
                    E._computedCurrentPageNo.push(B);
                    B = B + 2;
                } else {
                    if (f.inArray(A, E._blankPages) === -1) {
                        E._computedCurrentPageNo.push(B);
                        B++;
                    }
                }
                if (E._totalDoublePage >= D) {
                    if (f.inArray(D, E._doublePages) === -1) {
                        E._currentPageComputedNo.push(D);
                        D++;
                    } else {
                        if (f.inArray(A, E._blankPages) === -1) {
                            E._currentPageComputedNo.push(D);
                            E._currentPageComputedNo.push(D);
                            D++;
                        }
                    }
                }
                if (A === (E._totalBlankPage - 1) && w.length === 1) {
                    w.push(F.createWith(v));
                }
                if (w.length === 2) {
                    if (E.binding === l.RIGHT) {
                        w.reverse();
                    }
                    E._contentsData.push(w);
                    w = x();
                }
            }
            E._totalSpreadPage = E._contentsData.length;
        },
        _initScreen: function() {
            var A = this;
            if (A._screenObj === h) {
                A._screenObj = [];
            }
            var D = function(F) {
                switch (this._selected) {
                case 0:
                    F += 0;
                    break;
                case 1:
                    F += 2;
                    break;
                }
                return this._canvasObjects[F];
            };
            var x = f("#spread_a");
            var w = f("#spread_b");
            if (A.SPREAD_SWITCHING_SYSTEM) {
                x.css("z-index", 0);
                w.css("z-index", 0);
                f("#backyard").css("z-index", 5);
            } else {
                A._removeDocumentElement("spread_b");
                A._removeDocumentElement("backyard");
            }
            A._screenObj.push({
                _screens: [],
                _canvasObjects: [],
                _canvasObj: D,
                _selected: 0
            });
            var z = A._screenObj[0];
            z._screens.push(x);
            z._screens.push(w);
            var C = 0;
            var B = 0;
            var y = 2;
            var E = 2;
            for (C = 0; C < y; C++) {
                for (B = 0; B < E; B++) {
                    z._canvasObjects.push({
                        _index: v,
                        _canvas: null
                    });
                    z._canvasObjects[((C * y) + B)]._canvas = z._screens[C].children("canvas:eq(" + B + ")");
                }
            }
            A.screenEvent();
            if (f.porting.env.device.isSonyTabletP || f.porting.env.device.isF10D || f.porting.env.device.isISW13F || f.porting.env.repair.isDialogCollapsesSOL23) {
                A.options.komaWrapper.hide();
                A.options.screenWrapper.hide();
                A._setVisibility(A.options.komaWrapper, true);
                A._setVisibility(A.options.screenWrapper, true);
            } else {
                A.options.screenWrapper.css("display", "");
                A.options.komaWrapper.css("display", "");
            }
        },
        _changeSpredPageCanvasGroup: function() {
            this._changeSpredPageCanvasGroupZIndex();
            var w = this;
            setTimeout(function() {
                w._clearRectSpredPageCanvasGroup();
            }, 0);
        },
        _clearRectSpredPageCanvasGroup: function() {
            var x = this._screenObj[0];
            var w = 0;
            switch (x._selected) {
            case 0:
                w = 2;
                break;
            case 1:
                w = 0;
                break;
            }
            var z = x._canvasObjects[w]._canvas[0];
            var y = x._canvasObjects[w + 1]._canvas[0];
            var B = z.getContext("2d");
            var A = y.getContext("2d");
            B.clearRect(0, 0, z.width, z.height);
            A.clearRect(0, 0, y.width, y.height);
        },
        _changeSpredPageCanvasGroupZIndex: function() {
            var x = this._screenObj[0];
            var y = x._screens[0];
            var w = x._screens[1];
            var A = 1;
            var z = 1;
            switch (x._selected) {
            case 0:
                A = 10;
                break;
            case 1:
                z = 10;
                break;
            }
            y.css({
                zIndex: A
            });
            w.css({
                zIndex: z
            });
        },
        _resetScreenCanvasObjectIndex: function() {
            var w = this._screenObj[0];
            w._canvasObj(0)._index = v;
            w._canvasObj(1)._index = v;
        },
        _initKoma: function() {
            var w = this
              , x = w.options.komaImage;
            w.options.komaWrapper.append(x);
        },
        _initBookmark: function() {
            var w = this, A, x, B;
            var z = (w.isTextContent()) ? f.texthelper.getGUID() : w._guid;
            w._is_first_time = false;
            if (f.trialhelper.isTrialMode()) {
                var y = f.trialhelper.getTotalDoublePageTrialRangeData();
                x = y.first;
                w._is_first_time = true;
            } else {
                x = f.bookmark.init({
                    guid: z,
                    storageid: w._storage_id
                }).getPageNumber();
                x = (x) ? x : 0;
                if (x >= w._totalDoublePage) {
                    x = w._totalDoublePage - 1;
                }
                if (x == 0) {
                    w._is_first_time = true;
                }
            }
            A = w._computedSequentialPageData[x].pageData;
            w._currentKoma = 1;
            w._spreadCurrentPage = w._spreadIndexMap[w._computedIndexMap[x]] + 1;
            w.displayScreenWrapper(true);
            w.checkPageDataAndJump(A.index, x, 0, 999, false, function() {
                w.setInitializeAndLoadingFinished();
                f(window).triggerHandler("resize");
            });
        },
        _initCustomDatas: function() {
            f.customdatas.init();
            f.customdatas.salvageCustomData();
            if (this.options.fixViewTypeOfSpread) {
                this._viewTypeOfScroll = false;
            } else {
                this._viewTypeOfScroll = f.customdatas.getViewTypeOfScrollFlag();
            }
        },
        _addStartUpCount: function() {
            var w = f.customdatas.getStartUpCount();
            w++;
            var x = 999999;
            w = Math.min(x, w);
            f.customdatas.setStartUpCount(w);
        },
        _initMenu: function() {
            var w = this, A;
            var z = appview.manager.getEventDispatcher();
            var x = appview.manager.getEventReceiver();
            if (w.nextSearch) {
                z.on(appview.events.EVENT_OPEN_NEXTSEARCH, function(B) {
                    w.openPanel(appview.constants.ID_NEXT_SEARCH_PANEL);
                    var C = w._makeDownloadUrl({
                        mode: j.NEXTSEARCH,
                        reqtype: 3
                    });
                    f.ajax({
                        url: C,
                        dataType: "xml",
                        success: function(D) {
                            var E = f(D);
                            w.nextSearchResult.code = f.trim(f.parser.getTextOf(E, "Code"));
                            w.nextSearchResult.type = f.trim(f.parser.getTextOf(E, "NextResultType"));
                            w.nextSearchResult.nextMessage = f.trim(f.parser.getTextOf(E, "NextMessage"));
                            w.nextSearchResult.nextdata = f.trim(f.parser.getTextOf(E, "NextData"));
                            w.nextSearchResult.loaded = true;
                            x.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_NEXT_SEARCH_RESULT);
                        },
                        error: function(E, G, F, D) {
                            w.nextSearchResult.code = "";
                            w.nextSearchResult.type = "";
                            w.nextSearchResult.nextMessage = "";
                            w.nextSearchResult.nextdata = "";
                            x.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_NEXT_SEARCH_RESULT);
                        }
                    });
                });
            }
            z.on(appview.events.EVENT_JUMP_PAGE, function(B, D) {
                var C = D.now_page_number;
                var E = C - 1;
                w.jumpPage(E, 0, false);
            });
            z.on(appview.events.EVENT_BOOKMARK_JUMP, function(D, G) {
                var C = G.bookmark_id;
                var B = -1;
                var F = -1;
                switch (C) {
                case 1:
                    B = f.bookmark.getS1PageNumber();
                    F = f.bookmark.getS1KomaNumber();
                    break;
                case 2:
                    B = f.bookmark.getS2PageNumber();
                    F = f.bookmark.getS2KomaNumber();
                    break;
                }
                var E = w._spreadCurrentPage - 1;
                if (B === -1) {
                    return false;
                }
                if (F === -1) {
                    F = 0;
                }
                w.jumpPage(B, F, false);
            });
            z.on(appview.events.EVENT_BOOKMARK_SAVE, function(C, D) {
                var B = D.bookmark_id;
                w.saveBookmarkData(B);
            });
            z.on(appview.events.EVENT_OPEN_BOOKMARK_OVERWRITE_CONFIRM_DIALOG, function(C, D) {
                var B = D.bookmark_id;
                A = D.bookmark_id;
                w.openDialog(appview.constants.ID_BOOKMARK_OVERWRITE_CONFIRM_DIALOG);
            });
            z.on(appview.events.EVENT_BOOKMARK_OVERWRITE_OK, function(B) {
                w.saveBookmarkData(A);
                w.closeDialog(appview.constants.ID_BOOKMARK_OVERWRITE_CONFIRM_DIALOG);
            });
            z.on(appview.events.EVENT_BOOKMARK_OVERWRITE_CANCEL, function(B) {
                w.closeDialog(appview.constants.ID_BOOKMARK_OVERWRITE_CONFIRM_DIALOG);
            });
            z.on(appview.events.EVENT_OPEN_BOOKMARK_DELETE_CONFIRM_DIALOG, function(B) {
                w.openDialog(appview.constants.ID_BOOKMARK_DELETE_CONFIRM_DIALOG);
            });
            z.on(appview.events.EVENT_BOOKMARK_DELETE_OK, function(B) {
                f.bookmark.deleteBookmarkData();
                w.closeDialog(appview.constants.ID_BOOKMARK_DELETE_CONFIRM_DIALOG);
            });
            z.on(appview.events.EVENT_BOOKMARK_DELETE_CANCEL, function(B) {
                w.closeDialog(appview.constants.ID_BOOKMARK_DELETE_CONFIRM_DIALOG);
            });
            z.on(appview.events.EVENT_RETRY_CONNECT, function(B) {
                w.closeRetryDialog(appview.constants.ID_RETRY_DIALOG);
                w.controlKomaView(false);
                setTimeout(function() {
                    if (typeof w._retryConnectFunction === "function") {
                        w._retryConnectFunction();
                    } else {
                        w.changeLoadingState(false);
                    }
                }, 500);
            });
            z.on(appview.events.EVENT_BACK_SITE_PAGE, function(B) {
                w.backSitePage();
                return false;
            });
            z.on(appview.events.EVENT_BACK_SITE_PAGE_READ_FINISH, function(B) {
                w.backSitePageReadFinish();
                return false;
            });
            z.on(appview.events.EVENT_JUMP_FIRST_PAGE, function(C) {
                var B = f.trialhelper.getTrialFirstPageIndex();
                if (w.komaMode) {
                    var D = 0;
                    if (f.trialhelper.isTrialMode()) {
                        D = f.trialhelper.getTrialFirstPageIndex();
                    }
                    var E = w.getNextPageIndex(D);
                    if (E !== -1) {
                        B = E;
                    }
                }
                w.jumpPage(w._pageToComputedPageIndexMap[B], 0, true);
                w.closeFinishDialog();
                w.controlWrapperView(true);
                if (!f.porting.env.browser.isChrome && f.porting.env.os.isAndroid_4) {
                    setTimeout(function() {
                        w.reDrawCurrentScreen();
                    }, 250);
                }
            });
            z.on(appview.events.EVENT_DO_REDRAW, function(B) {
                f.fn.gc(true);
                w.reDrawCurrentScreenCanvas();
                f.fn.gc(true);
                f.ImagePool.purge();
                return false;
            });
            z.on(appview.events.EVENT_DO_BACK_SITE_PAGE, function(B) {
                w.backSitePage();
                return false;
            });
            z.on(appview.events.EVENT_OPEN_HELP_PAGE, function() {
                var B = document.getElementById("open_url");
                B.onclick = function() {
                    if (!f.porting.env.device.isDesktopPC) {
                        window.open(w.options.helpUrl);
                    } else {
                        window.open(w.options.helpPcUrl);
                    }
                }
                ;
                if (f.porting.env.os.isAndroid_4) {
                    setTimeout(function() {
                        B.click();
                    }, 200);
                } else {
                    B.click();
                }
            });
            z.on(appview.events.EVENT_CHANGE_VIEWTYPE_SCROLL, function(B, C) {
                w.setViewTypeOfScroll(C.is_scroll);
            });
            z.on(appview.events.EVENT_TEXT_SIZE_CHANGE, function(C, F) {
                var E = F.change_index;
                f.texthelper.setRequestTimestamp(w._request_timestamp);
                f.texthelper.setTextSizeChangingOn(E);
                clearInterval(w.chkImgLoadTimerId);
                clearTimeout(w.preloadTimer);
                var D = w.options.param;
                var B = {};
                B.bm_page_auto = f.bookmark.getPageNumber();
                B.bm_char_auto = f.bookmark.getFirstCharNumber();
                B.bm_page_s1 = f.bookmark.getS1PageNumber();
                B.bm_char_s1 = f.bookmark.getS1FirstCharNumber();
                B.bm_page_s2 = f.bookmark.getS2PageNumber();
                B.bm_char_s2 = f.bookmark.getS2FirstCharNumber();
                f.texthelper.getDispatcherObject().one(f.texthelper.EVENT_BOOKMARK_CONVERT_COMPLETE, function(H) {
                    var J = f.texthelper.getBookmarkConvertResultData();
                    var G = J.isSuccess;
                    var I = J.isLoadError;
                    if (I) {
                        w.openDialog(appview.constants.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR_DIALOG);
                    } else {
                        if (G) {
                            w._sizeChangeBookmarkConvertComplete();
                        } else {
                            w.openDialog(appview.constants.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE_DIALOG);
                        }
                    }
                });
                f.texthelper.doConvertBookmarkData(D, B);
            });
            z.on(appview.events.EVENT_TEXT_SIZE_CHANGE_CONTINUE, function(B) {
                w.closeDialog(appview.constants.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE_DIALOG);
                w._sizeChangeBookmarkConvertComplete();
            });
            z.on(appview.events.EVENT_TEXT_SIZE_CHANGE_CANCEL, function(B) {
                f.texthelper.setTextSizeChangingOff();
                w.closeDialog(appview.constants.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE_DIALOG);
                x.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_TEXT_SIZE_CHANGE_CANCEL);
            });
            z.on(appview.events.EVENT_TEXT_SIZE_CHANGE_ERROR_CLOSE, function(B) {
                f.texthelper.setTextSizeChangingOff();
                w.closeDialog(appview.constants.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR_DIALOG);
                x.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_TEXT_SIZE_CHANGE_RESET);
            });
            var y = function() {
                w.controlWrapperView(true);
                if (w.zoomMode === false && w.zoomScale === 1 && w.komaMode === false && w._sequentialPageData[w._currentPage - 1].spread && w.isPortrait()) {
                    if (f.porting.env.device.isDesktopPC && !f.porting.env.browser.isWebKit) {
                        if (w.binding === l.RIGHT && w.getCurrentScreen().offset().left >= 0) {
                            w.updateRender();
                        } else {
                            if (w.binding === l.LEFT && w.getCurrentScreen().offset().left <= (window.innerWidth - w.getCurrentScreen().outerWidth())) {
                                w.updateRender();
                            }
                        }
                    }
                } else {
                    if ((w.zoomMode === true || w.zoomScale !== 1) && w.komaMode === false && w.isPortrait()) {
                        w.zoomMode = true;
                    }
                }
                if (w.zoomMode === false && w.zoomScale === 1 && w.komaMode === false) {
                    if (!w._sequentialPageData[w._currentPage - 1].spread || w.isLandscape()) {
                        w.aos4Preserve3dMaster(false, true);
                    }
                }
                if (!f.porting.env.browser.isMSIE) {
                    f("*").blur();
                }
                if (!f.porting.env.browser.isChrome && f.porting.env.os.isAndroid_4 && !f.porting.env.device.isF10D) {
                    setTimeout(function() {
                        if (w.komaMode) {
                            w.reDrawCurrentKoma();
                        } else {
                            w.reDrawCurrentScreen();
                        }
                    }, 500);
                }
            };
            z.on(appview.events.EVENT_ADPAGE_CLOSE, function() {
                y();
            });
            z.on(appview.events.EVENT_COVER_CLOSE, function() {
                y();
                w.closeFinishDialog();
            });
            z.on(appview.events.EVENT_TAP_MENU_BACKGROUND, function(B) {
                if (w.touchEndIgnore) {
                    w.touchEndIgnore = false;
                } else {
                    appview.manager.closeMenu();
                    w.aos4Preserve3dMasterForMenu(false);
                }
            });
            z.on(appview.events.EVENT_ZOOM_EXPANSION, function(B) {
                w.expansionZoomRangeStep();
            });
            z.on(appview.events.EVENT_ZOOM_REDUCTION, function(B) {
                w.reductionZoomRangeStep();
            });
            z.on(appview.events.EVENT_URL_TO_OK, function(B) {
                w.closeDialog(appview.constants.ID_URL_TO_CONFIRM_DIALOG);
                var D = f.clickablemaphelper.getNowEventURL();
                var C = document.getElementById("open_url");
                C.onclick = function() {
                    window.open(D);
                }
                ;
                if (f.porting.env.os.isAndroid_4) {
                    setTimeout(function() {
                        C.click();
                    }, 200);
                } else {
                    C.click();
                }
            });
            z.on(appview.events.EVENT_URL_TO_CANCEL, function(B) {
                w.closeDialog(appview.constants.ID_URL_TO_CONFIRM_DIALOG);
            });
        },
        _sizeChangeBookmarkConvertComplete: function() {
            var G = f.texthelper.getBookmarkConvertResultData();
            var y = G.isSuccess;
            var w = G.afterSize;
            var F = G.beforeSize;
            var C = G.afterPageNo;
            var z = G.afterS1PageNo;
            var x = G.afterS2PageNo;
            if (y) {
                f.bookmark.setBookmarkForSizeChange(w, F, C, z, x);
            } else {
                f.bookmark.setBookmarkForSizeChange(w, F, null, null, null);
            }
            f.texthelper.updateTextSizeIndex(w);
            var A = 0;
            var E = null;
            var D = 0;
            var B = this._loadedPageImageIndex.length;
            for (D = 0; D < B; D++) {
                A = this._loadedPageImageIndex[D];
                E = this._sequentialPageData[A];
                E.pageXml = null;
                E.imgData.release();
                E.imgData = null;
            }
            this._loadingImageFlags.length = 0;
            this._loadedPageImageIndex.length = 0;
            this.maintenanceImageSize = 0;
            this._updateRequestTimeStamp();
            this._updateRequestPageBaseUrl();
            f.pageonearlier.init();
            this._loadFaceXml();
        },
        _initInfoMessage: function() {
            var x = this, z;
            var w = appview.manager.openGuidance();
            if (w == true) {
                return;
            }
            if (f.porting.env.device.isDesktopPC) {
                z = "左ページへ移動：左側をクリック\n右ページへ移動：右側をクリック\nメニュー表示　：中央をクリック";
            } else {
                z = "メニュー表示：中央をタップ\n";
                if (x._isMask) {
                    z = z + "モード切替　：ダブルタップ\n";
                }
                if (x.binding === l.RIGHT) {
                    z = z + "進む　　　　：左側をタップ\n戻る　　　　：右側をタップ\n\n";
                } else {
                    z = z + "進む　　　　：右側をタップ\n戻る　　　　：左側をタップ\n\n";
                }
                z = z + "詳細はメニューから\n　　「情報」→「ヘルプ」\nを御覧下さい。";
            }
            f.infomessage.infoMessageWillHide = x._delegates.infoMessageWillHide;
            f.infomessage.infoMessageDidHide = x._delegates.infoMessageDidHide;
            var y = {
                appendTo: f("body"),
                delay: 7000,
                css: {
                    background: "#252525",
                    color: "#fff",
                    display: "inline-block",
                    lineHeight: "1.5",
                    position: "absolute",
                    textShadow: "none",
                    padding: "20px",
                    visibility: "hidden",
                    border: "0px",
                    zIndex: "99999"
                }
            };
            f.infomessage.init(y).addMessage(z).getMessages();
        },
        _initTrialMode: function() {
            var x = this;
            if (f.trialhelper.isTrialMode()) {
                f.trialhelper.adjustTrialPageIndex(x._totalPage);
                f.trialhelper.mapingTrialPageToComputedPage(x._pageToComputedPageIndexMap, x._sequentialPageData);
                f.trialhelper.mapingTrialPageToSpreadPage(x._spreadIndexMap);
                var z = f.trialhelper.getTrialFirstPageIndex();
                var w = f.trialhelper.getTrialLastPageIndex();
                var y = f.trialhelper.getTotalDoublePageTrialRangeData();
                var A = f.trialhelper.getTotalSpreadPageTrialRangeData();
                x._totalPage = w + 1;
                x._totalDoublePage = y.last + 1;
                x._totalSpreadPage = A.last + 1;
            }
        },
        _getPagesIndexArray: function(D, C) {
            var E = this, z, x = [], A, F = false;
            if (D === -1 || D === 0 || D === 1) {
                z = E._getContentsDataIndex() + D;
            } else {
                z = E._getContentsDataIndex(C + 1);
                F = true;
            }
            var B = true;
            if (E.isInitializeAndLoadingFinished()) {
                if (E.isLandscape() && !E.isPageStepScrollMode()) {
                    B = true;
                } else {
                    B = false;
                }
            }
            if (B) {
                A = E._contentsData[z];
            } else {
                A = [E._sequentialPageData[z]];
            }
            if (!A || !A[0]) {
                return [];
            }
            for (var y = 0, w = A.length; y < w; y++) {
                if (F && A[y].isBlank()) {
                    continue;
                }
                x.push(A[y].index);
            }
            return x;
        },
        _getCurrentPagesIndexArray: function() {
            var w = this;
            return w._getPagesIndexArray(0);
        },
        _getTargetPagesIndexArray: function(x) {
            var w = this;
            return w._getPagesIndexArray(99, x);
        },
        _getContentsDataIndex: function(x) {
            var w = this, z;
            x = (typeof x === "number") ? x : w._currentPage;
            var y = true;
            if (w.isInitializeAndLoadingFinished()) {
                if (w.isLandscape() && !w.isViewTypeOfScroll()) {
                    y = true;
                } else {
                    y = false;
                }
            }
            if (y) {
                z = w._spreadIndexMap[x - 1];
            } else {
                z = x - 1;
            }
            return z;
        },
        _makeDownloadUrl: function(y) {
            var w = this;
            f.extend(y, {
                param: w.options.param
            });
            if ("reqtype"in y && y.reqtype == 3) {
                var x = new Date().getTime();
                return w.options.cgi + "?" + f.param(y) + "&ts=" + x;
            } else {
                return w.options.cgi + "?" + f.param(y) + "&ts=" + w._request_timestamp;
            }
        },
        _updateRequestPageBaseUrl: function() {
            this._pageBaseUrl = this._makeDownloadUrl({
                reqtype: 0
            });
        },
        _setTimeKeyData: function(A) {
            var y = this
              , x = false
              , w = f(A)
              , z = f.trim(f.parser.getTextOf(w, "Code"));
            switch (z) {
            case "1000":
                y.options.param = f.trim(f.parser.getTextOf(w, "Content"));
                y._updateRequestPageBaseUrl();
                x = true;
                break;
            case "2000":
            case "2001":
            case "2002":
            case "2003":
            case "2004":
            case "9999":
            default:
                break;
            }
            return {
                success: x,
                code: z
            };
        },
        _openErrorDialog: function(y) {
            var w = this
              , x = w.getMessage(y);
            appview.manager.openErrorDialog(y, x);
            f.infomessage.removeDialogMessage();
            w.changeLoadingState(false);
            this.showingAlert = appview.constants.ID_ERROR_DIALOG;
        },
        _openErrorDialogEx: function(x) {
            var y = this.getTitle(x);
            var w = this.getMessage(x);
            if (y == "") {
                appview.manager.openErrorDialog(x, w);
            } else {
                appview.manager.openErrorTitleDialog(y, w);
            }
            f.infomessage.removeDialogMessage();
            this.changeLoadingState(false);
            this.showingAlert = appview.constants.ID_ERROR_DIALOG;
        },
        _updateKeyOverInterval: function() {
            var w = this;
            if (new Date().getTime() - w._lastGetKeyTime > w.INTERVAL_TIMEKEY) {
                var x = w._makeDownloadUrl({
                    mode: j.TIMEKEY,
                    reqtype: 2,
                    file: ""
                });
                f.ajax({
                    url: x,
                    dataType: "xml",
                    success: function(z) {
                        var y = w._setTimeKeyData(z);
                        if (!y.success) {
                            w._openErrorDialogEx(y.code);
                        } else {
                            w._lastGetKeyTime = new Date().getTime();
                        }
                    },
                    error: function() {}
                });
            }
        },
        setCurrentPage: function(C, O, M) {
            var z = this
              , y = z.getCurrentScreen()
              , K = 0
              , H = 0
              , I = 0;
            if (typeof O !== "boolean") {
                O = true;
            }
            if (typeof M !== "boolean") {
                M = false;
            }
            if (z.komaMode) {
                O = false;
            }
            if (z.zoomMode) {
                z.zoomMode = false;
            }
            if (C > z._totalPage) {
                C = z._totalPage;
            } else {
                if (C < 1) {
                    C = 1;
                }
            }
            z._updateKeyOverInterval();
            if (C === z._currentPage && z.isPortraitAndScrollDisc() && !z.komaMode && z._alignment !== l.CENTER) {
                if (z.isLandscape() && !z.isPageStepScrollMode()) {} else {
                    z._removeCssClass(z.options.screenWrapper, "transitions-none");
                    z._removeCssClass(z.options.screenWrapper, "transitions-base");
                    if (z._alignment === l.RIGHT) {
                        K = -(y.outerWidth() - window.innerWidth + y.offset().left);
                    } else {
                        if (z._alignment === l.LEFT) {
                            K = -y.offset().left;
                        }
                    }
                    I = K;
                    if (M || z.isPageStepScrollMode()) {
                        z._addCssClass(z.options.screenWrapper, "transitions-none");
                    } else {
                        z.duringAnimation = true;
                        z._addCssClass(z.options.screenWrapper, "transitions-base");
                    }
                    if (f.porting.env.device.isSC02G) {
                        setTimeout(function() {
                            z._setCssTranslate(z.options.screenWrapper[0], I, H);
                        }, 150);
                    } else {
                        z._setCssTranslate(z.options.screenWrapper[0], I, H);
                    }
                    if (M || z.isPageStepScrollMode()) {
                        var J = 0;
                        var B = z.getCurrentScreen().outerHeight();
                        if (z.isPageStepScrollMode()) {
                            B = (z.getCurrentScreen().outerHeight() * z._scaling) | 0;
                        }
                        var x = window.innerHeight - B;
                        var N = z._selectPageFeedTypeN(J, x);
                        z._setCssOffset(z.options.screenWrapper[0], z.options.screenWrapper.offset().left, N);
                        z._setCssTranslate(z.options.screenWrapper[0], 0, 0);
                    } else {
                        var E = function(Q) {
                            var P = z.options.screenWrapper;
                            if (Q) {
                                z._addCssClass(P, Q);
                            }
                            var R = P.offset();
                            z._setCssOffset(P[0], R.left, R.top);
                            z._setCssTranslate(P[0], 0, 0);
                            z.duringAnimation = false;
                        };
                        z.options.screenWrapper.one(z.TRANSITION_END, function() {
                            E("transitions-none");
                            if (!f.porting.env.browser.isChrome && (f.porting.env.os.isAndroid_4 && !f.porting.env.os.isAndroid_4_0_2) && !z.komaMode) {
                                z.updateRender();
                            }
                            if (f.porting.env.device.isDesktopPC && !z.komaMode) {
                                z.updateRender();
                            }
                        });
                    }
                    z._currentPage = C;
                }
            } else {
                z._currentPage = C;
                z.updateAllScreens();
            }
            z.flickOperation = false;
            var w = z._currentPage - 2
              , L = (z._currentPage - 1) + z.LOADING_FUTURE_PAGE;
            var F = (z.isLandscape() && !z.isViewTypeOfScroll());
            if (F) {
                var A = z._spreadCurrentPage - 2;
                if (A > -1) {
                    var G = [];
                    G = z._contentsData[A];
                    w = (G[0].index != v) ? G[0].index : C - 1;
                    if (G.length == 2) {
                        if (w > G[1].index && G[1].index != v) {
                            w = G[1].index;
                        }
                    }
                }
            }
            if (!z._isExecLoadingTheFuture) {
                L = z._currentPage;
                if (F) {
                    var D = z._spreadCurrentPage;
                    if (D < z._totalSpreadPage) {
                        var G = [];
                        G = z._contentsData[D];
                        L = (G[0].index != v) ? G[0].index : C - 1;
                        if (G.length == 2) {
                            if (L < G[1].index) {
                                L = G[1].index;
                            }
                        }
                    }
                }
            }
            z.changeLoadingState(false);
            z.preloadTimer = setTimeout(function() {
                for (var P = L; P >= w; P--) {
                    z.loadingTheFutureNotInScreen([z._sequentialPageData[P]]);
                }
                z.delPageXml();
            }, 0);
        },
        setComputedCurrentPage: function(A, x, z) {
            var D = this, B, G, F, H, I, C, E = null;
            if (A <= 1) {
                A = 1;
            }
            if (A === D._computedCurrentPage && !z && !D.komaMode) {
                if (!D.checkEmpty() && (D.getCurrentScreenObj()._canvasObj(0)._index !== v || D.getCurrentScreenObj()._canvasObj(1)._index !== v)) {
                    D.adjustmentScreen();
                    return false;
                }
            }
            if (A >= D._totalDoublePage) {
                A = D._totalDoublePage;
            }
            B = D._spreadCurrentPage - 1;
            if (typeof B !== "number") {
                B = D._spreadIndexMap[D._computedIndexMap[A - 1]];
            } else {
                if (B >= D._contentsData.length) {
                    B = D._contentsData.length - 1;
                }
            }
            E = D._computedSequentialPageData[A - 1];
            if (D.isLandscape() && !D.isViewTypeOfScroll() && !D.komaMode) {
                F = D._contentsData[B];
                E = {
                    alignment: l.CENTER,
                    pageData: F[0]
                };
                if (D.checkEmpty()) {
                    if (D._contentsData.hasOwnProperty(B + 1)) {
                        if (D.binding === l.RIGHT) {
                            if (D._contentsData[B + 1].hasOwnProperty(1) && !D._contentsData[B + 1][1].isBlank()) {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B + 1][1].index] + 1;
                            } else {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B + 1][0].index] + 1;
                            }
                        } else {
                            if (!D._contentsData[B + 1][0].isBlank()) {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B + 1][0].index] + 1;
                            } else {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B + 1][1].index] + 1;
                            }
                        }
                    } else {
                        if (D.binding === l.RIGHT) {
                            if (!D._contentsData[B - 1][0].isBlank()) {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B - 1][0].index] + 1;
                            } else {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B - 1][1].index] + 1;
                            }
                        } else {
                            if (D._contentsData[B - 1].hasOwnProperty(1) && !D._contentsData[B - 1][1].isBlank()) {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B - 1][1].index] + 1;
                            } else {
                                G = D._pageToComputedPageIndexMap[D._contentsData[B - 1][0].index] + 1;
                            }
                        }
                    }
                } else {
                    var w = F[0].index;
                    if (F.length > 1) {
                        if (w == v) {
                            w = F[1].index;
                        } else {
                            if (w > F[1].index && F[1].index != v) {
                                w = F[1].index;
                            }
                        }
                    }
                    G = D._pageToComputedPageIndexMap[w] + 1;
                }
            } else {
                G = A;
            }
            if (E) {
                D._computedCurrentPage = G;
                D._alignment = E.alignment;
                I = G - 1;
                H = D._computedIndexMap[G - 1];
                if (D.binding === l.LEFT && !D.komaMode) {
                    if (D._alignment === l.RIGHT) {
                        C = I;
                    } else {
                        C = D._pageToComputedPageIndexMap[D._currentPageComputedNo[I]];
                    }
                } else {
                    if (D.binding === l.RIGHT && !D.komaMode) {
                        if (D._alignment === l.LEFT) {
                            C = I;
                        } else {
                            C = D._pageToComputedPageIndexMap[D._currentPageComputedNo[I]];
                        }
                    } else {
                        C = D._pageToComputedPageIndexMap[D._currentPageComputedNo[I]];
                    }
                }
                var y = D.getPageFirstCharNumber(C);
                f.bookmark.setPageNumber(C, y);
                x = false;
                D.setCurrentPage(H + 1, x, z);
            }
        },
        rightPage: function(x) {
            var w = this;
            if (w.binding === l.RIGHT) {
                w.prevPage(x);
            } else {
                w.nextPage(x);
            }
        },
        leftPage: function(x) {
            var w = this;
            if (w.binding === l.RIGHT) {
                w.nextPage(x);
            } else {
                w.prevPage(x);
            }
        },
        nextPage: function(z) {
            var E = this, D = E._computedIndexMap[E._computedCurrentPage - 1], C, A, G, B, w;
            if (E.isChanging) {
                return;
            }
            E.isChanging = true;
            if (E.duringAnimation || (E.isLandscape() && E._updateRenderFlag)) {
                return;
            }
            E.changeLoadingState(true);
            if (E.zoomMode) {
                z = false;
            }
            if (E.isPortraitAndScrollDisc()) {
                if (E._computedCurrentPage >= E._totalDoublePage) {
                    A = E._computedCurrentPage - 1;
                } else {
                    A = E._computedCurrentPage;
                }
                B = E._computedSequentialPageData[A].alignment;
                if (E.zoomMode) {
                    if (E._sequentialPageData[E._currentPage - 1].spread && E.binding === E._alignment) {
                        w = 2;
                    } else {
                        w = 1;
                    }
                } else {
                    if (E.flickOperation === true) {
                        if (E._sequentialPageData[E._currentPage - 1].spread && E.binding === E._alignment) {
                            w = 2;
                            if (E._currentPage < E._totalPage && !E._sequentialPageData[E._currentPage].spread) {
                                z = false;
                            }
                        } else {
                            if (E._computedIndexMap[E._computedCurrentPage - 1] === E._computedIndexMap[A] && B === l.CENTER) {
                                w = 2;
                            } else {
                                w = 1;
                            }
                            z = false;
                        }
                        if (f.porting.env.os.isAndroid_2) {
                            z = true;
                        }
                    } else {
                        if (E._computedIndexMap[E._computedCurrentPage - 1] === E._computedIndexMap[A] && B === l.CENTER) {
                            w = 2;
                        } else {
                            w = 1;
                        }
                    }
                }
                G = E._spreadIndexMap[D] + 1;
            } else {
                C = E._computedIndexMap[E._computedCurrentPage];
                if (!E.checkEmpty()) {
                    if (E._spreadIndexMap[C] === E._spreadIndexMap[D] && !E.komaMode) {
                        w = 2;
                    } else {
                        if (E._computedIndexMap[E._computedCurrentPage] === E._computedIndexMap[E._computedCurrentPage - 1] && !E.komaMode) {
                            w = 2;
                        } else {
                            w = 1;
                        }
                    }
                } else {
                    if (E._spreadCurrentPage <= 1) {
                        w = 0;
                    } else {
                        w = 1;
                    }
                }
                G = E._spreadCurrentPage + 1;
            }
            var F = false;
            if (f.trialhelper.isTrialMode()) {
                var y = false;
                var x = false;
                if (E.isPortraitAndScrollDisc()) {
                    if (E._computedCurrentPage >= E._totalDoublePage) {
                        y = true;
                    } else {
                        if ((E.zoomMode || E.flickOperation || E.isLongHeightSpread(E.getComputedCurrentPage() - 1)) && E._currentPage >= E._totalPage) {
                            y = true;
                        }
                    }
                }
                x = E.isLandscape() && !E.isPageStepScrollMode() && E._spreadCurrentPage >= E._totalSpreadPage;
                F = y || x;
            } else {
                F = ((E.isPortraitAndScrollDisc() && (((E.zoomMode || E.flickOperation || E.isLongHeightSpread(E.getComputedCurrentPage() - 1)) && E._currentPage >= E._totalPage) || E._computedCurrentPage >= E._totalDoublePage)) || (E.isLandscape() && !E.isPageStepScrollMode() && E._spreadCurrentPage >= E._totalSpreadPage));
            }
            if (F) {
                if (E.isPortraitAndScrollDisc() && E.flickOperation && E._sequentialPageData[E._currentPage - 1].spread) {
                    E.flickOperation = false;
                }
                if (E.checkImageLoaded(E._computedIndexMap[E._computedCurrentPage - 1])) {
                    E.controlWrapperView(false);
                    E._finishReadContents();
                }
            } else {
                E._nowPageFeed = m.NEXT;
                A = E.getComputedCurrentPage() + w - 1;
                C = E._computedIndexMap[A];
                E.checkPageDataAndJump(C, A, 0, 1, false);
            }
            E.flickOperation = false;
            E.isChanging = false;
        },
        prevPage: function(C) {
            var H = this, J, F, L, G = H._computedIndexMap[H._computedCurrentPage - 1], x, y;
            if (H.isChanging) {
                return;
            }
            var w = 1;
            if (f.trialhelper.isTrialMode()) {
                var D = 1;
                var B = f.trialhelper.getTrialFirstPageIndex();
                var K = H._pageToComputedPageIndexMap[B];
                if (isFinite(K) == false) {
                    K = H._pageToComputedPageIndexMap[0];
                }
                D = K + 1;
                if (H._computedCurrentPage <= D) {
                    H._openIntroductionPage();
                    return;
                }
                w = B + 1;
            } else {
                if (H._spreadCurrentPage <= 1 && H.isLandscape() && !H.isPageStepScrollMode()) {
                    H._openIntroductionPage();
                    return;
                } else {
                    if (H._currentPage <= 1 && H.isPortraitAndScrollDisc() && !H._sequentialPageData[H._currentPage - 1].spread) {
                        H._openIntroductionPage();
                        return;
                    }
                }
            }
            if (H.isPortrait()) {
                if (H.zoomMode) {
                    if (H._sequentialPageData[H._currentPage - 1].spread) {
                        if (H._currentPage <= w) {
                            return;
                        }
                    }
                }
            }
            H._fix_spread_page_mode = false;
            H.isChanging = true;
            if (H.duringAnimation || (H.isLandscape() && H._updateRenderFlag)) {
                return;
            }
            if (H._currentPage > 1) {
                J = H._computedCurrentPage - 2;
            } else {
                J = H._computedCurrentPage - 1;
            }
            if (H.zoomMode) {
                C = false;
            }
            if (H.isPortraitAndScrollDisc()) {
                if (H.zoomMode) {
                    if (H._sequentialPageData[H._currentPage - 1].spread && H.binding !== H._alignment) {
                        y = 2;
                    } else {
                        y = 1;
                    }
                } else {
                    if (H.flickOperation === true) {
                        if (H._currentPage <= 1) {
                            y = 1;
                        } else {
                            if (H._sequentialPageData[H._currentPage - 1].spread && H.binding !== H._alignment) {
                                if (H._computedIndexMap[H._computedCurrentPage - 1] === H._computedIndexMap[J] && H._sequentialPageData[H._currentPage - 2].spread) {
                                    y = 3;
                                } else {
                                    y = 2;
                                    C = false;
                                }
                            } else {
                                if (H._sequentialPageData[H._currentPage - 2].spread) {
                                    y = 2;
                                    C = false;
                                } else {
                                    y = 1;
                                    C = false;
                                }
                            }
                        }
                        if (f.porting.env.os.isAndroid_2) {
                            C = true;
                        }
                        H.flickOperation = false;
                    } else {
                        if (H._computedIndexMap[H._computedCurrentPage - 1] === H._computedIndexMap[J] && H._alignment === l.CENTER) {
                            y = 2;
                        } else {
                            y = 1;
                        }
                    }
                }
                L = H._spreadIndexMap[G] + 1;
            } else {
                if (!H.checkEmpty()) {
                    if (H._spreadIndexMap[H._currentPage - 2] === H._spreadIndexMap[H._currentPage - 1] && !H.komaMode) {
                        y = 2;
                    } else {
                        if (H._computedIndexMap[H._computedCurrentPage - 2] === H._computedIndexMap[H._computedCurrentPage - 1] && !H.komaMode) {
                            y = 2;
                        } else {
                            y = 1;
                        }
                    }
                } else {
                    if (H._spreadCurrentPage >= H._totalSpreadPage) {
                        y = 0;
                    } else {
                        y = 1;
                    }
                }
                x = H._getContentsDataIndex();
                F = H._contentsData[x - 1];
                if (x < 1) {
                    H.isChanging = false;
                    return;
                } else {
                    if (x - 1 >= 0 && (!F[0].isBlank() && !F[0].spread) && (!F[1].isBlank() && !F[1].spread)) {
                        if (H.binding === l.RIGHT) {
                            if (F[0].index === (H.getComputedCurrentPage() - y)) {
                                y = 3;
                            } else {
                                y = 2;
                            }
                        } else {
                            if (F[0].index === (H.getComputedCurrentPage() - y)) {
                                y = 3;
                            } else {
                                y = 2;
                            }
                        }
                    }
                }
                L = H._spreadCurrentPage - 1;
            }
            var I = H.getComputedCurrentPage() - y - 1;
            if (f.trialhelper.isTrialMode()) {
                var A = f.trialhelper.getTrialFirstPageIndex();
                var E = H._pageToComputedPageIndexMap[A];
                if (I < E) {
                    I = E;
                }
            }
            H._nowPageFeed = m.PREV;
            var z = 0;
            if (0 < I) {
                z = H._computedIndexMap[I];
            }
            H.checkPageDataAndJump(z, I, H._currentKoma - 1, -1, false);
            H.isChanging = false;
            if (I <= -1) {
                if (H._currentPage <= 1 && H.isPortraitAndScrollDisc() && H._sequentialPageData[H._currentPage - 1].spread) {
                    H._openIntroductionPage();
                }
            }
        },
        setSpreadPageFront: function() {
            var w = this
              , z = v
              , y = v;
            var x = 1;
            if (f.trialhelper.isTrialMode()) {
                x = 0;
                var A = f.trialhelper.getTrialFirstPageIndex();
                x = 1 + w._pageToComputedPageIndexMap[A];
            }
            if (w._computedCurrentPage < x && w._computedCurrentPage >= w._totalDoublePage) {
                return;
            }
            if ((w.binding === l.RIGHT && w._alignment === l.LEFT) || (w.binding === l.LEFT && w._alignment === l.RIGHT)) {
                if (w.isPageMode()) {
                    w._computedCurrentPage -= 1;
                    w._currentPage = w._computedIndexMap[w._computedCurrentPage - 1] + 1;
                    w._alignment = (w.binding === l.RIGHT) ? l.RIGHT : l.LEFT;
                }
            } else {
                if (w.isLandscape() && !w.komaMode && !w.isPageStepScrollMode() && w._spreadIndexMap[w._currentPage - 1] === w._spreadIndexMap[w._currentPage - 2]) {
                    w._computedCurrentPage -= 1;
                    if (f.trialhelper.isTrialMode()) {
                        if (w._computedCurrentPage <= x) {
                            w._computedCurrentPage += 1;
                        }
                    }
                    w._currentPage = w._computedIndexMap[w._computedCurrentPage - 1] + 1;
                }
            }
            w._spreadCurrentPage = w._spreadIndexMap[w._computedIndexMap[w._computedCurrentPage - 1]] + 1;
            z = w._computedCurrentPage - 1;
            y = w.getPageFirstCharNumber(z);
            f.bookmark.setPageNumber(z, y);
        },
        nextPageStep: function() {
            var x = this
              , z = x.options.screenWrapper
              , D = x.getStepScrollCount()
              , C = x.getStepScrollDistance()
              , y = z.offset().top
              , B = y - C
              , A = B - window.innerHeight
              , w = x.getCurrentScreen().outerHeight();
            if (w < window.innerHeight || w < Math.abs(A)) {
                x.nextPage(false);
            } else {
                x._addCssClass(z, "transitions-base");
                x._setCssTranslate(z[0], 0, B);
                z.one(x.TRANSITION_END, function() {
                    x._removeCssClass(z, "transitions-base");
                });
            }
        },
        prevPageStep: function() {
            var x = this
              , z = x.options.screenWrapper
              , C = x.getStepScrollCount()
              , B = x.getStepScrollDistance()
              , y = z.offset().top
              , A = y + B
              , w = x.getCurrentScreen().outerHeight();
            if (w < window.innerHeight || 0 < A) {
                x.prevPage(false);
            } else {
                x._addCssClass(z, "transitions-base");
                x._setCssTranslate(z[0], 0, A);
                z.one(x.TRANSITION_END, function() {
                    x._removeCssClass(z, "transitions-base");
                });
            }
        },
        getStepScrollCount: function() {
            var x = this
              , w = x.getCurrentScreen().outerHeight()
              , z = window.innerHeight
              , y = 0;
            y = ((w / z) | 0);
            return y;
        },
        getStepScrollDistance: function() {
            var x = this
              , w = x.getCurrentScreen().outerHeight()
              , B = window.innerHeight
              , A = x.getStepScrollCount()
              , z = ((w - B) | 0)
              , y = 0;
            y = (A != 1) ? ((z / (A - 1)) | 0) : 0;
            return y;
        },
        getPageLastStepPos: function(y, B) {
            var x = this
              , D = {
                left: 0,
                top: 0
            }
              , w = y.outerHeight()
              , A = y.outerWidth()
              , C = window.innerHeight
              , z = x._sequentialPageData[B];
            D.top = -(w - C);
            D.left = (z.spread) ? 0 : (A / 2);
            return D;
        },
        searchTargetCanvas: function(B) {
            var x = this, w = null, C, A;
            var y = x._screenObj[0];
            for (A = 0; A <= 1; A++) {
                var z = y._canvasObj(A);
                if (B === z._index) {
                    w = z._canvas[0];
                    break;
                }
            }
            return w;
        },
        drawScreen: function(C, D, F) {
            var B = this
              , A = 0
              , z = 0;
            var w = function(G, H) {
                f.scramble.setVariables({
                    canvas: G,
                    isScramble: H.pageXml.PageScramble,
                    scrambleTable: H.pageXml.Scramble,
                    img: H.imgData
                }).doScramble();
                if (z >= C.length - 1) {
                    B.isDrawScreen = false;
                }
                B.duringAnimation = false;
                if (typeof H.loadFunction === "function") {
                    H.loadFunction();
                    H.loadFunction = null;
                }
                H.loadedFlag = true;
                f(window).triggerHandler("resize");
            };
            if (C === h || (C.length === 1 && C[0] === h)) {} else {
                B.isDrawScreen = true;
                A = C.length;
                for (z = 0; z < A; z++) {
                    if (B.komaMode) {
                        if (f.porting.env.browser.isWebKit && B.options.komaWrapper[0].style[B.TRANSFORM_STYLE] !== "flat") {
                            B.aos4Preserve3dMaster(false, false);
                        }
                    } else {
                        B.aos4Preserve3dMaster(true, false);
                    }
                    var y = D._canvasObj(z)
                      , x = y._canvas;
                    if (x.css("visibility") === "hidden") {
                        B.displaySecondCanvas(true);
                    }
                    var E = x[0].getContext("2d");
                    if (x[0].width !== B.contentFrameWidth) {
                        x[0].width = B.contentFrameWidth;
                    }
                    if (x[0].height !== B.contentFrameHeight) {
                        x[0].height = B.contentFrameHeight;
                    }
                    y._index = v;
                    E.fillStyle = "rgb(255, 255, 255)";
                    E.fillRect(0, 0, x[0].width, x[0].height);
                    if (C[z].isBlank() || !C.hasOwnProperty(z)) {
                        if (z >= C.length - 1) {
                            B.isDrawScreen = false;
                        }
                        continue;
                    }
                    (function(I) {
                        var H = C[I]
                          , G = 0;
                        y._index = H.index;
                        if (f.inArray(H.index, B._loadedPageImageIndex) !== -1) {
                            if (H.index === y._index) {
                                w(x[0], H);
                            }
                        }
                        if (H.spread || B.isPortraitAndScrollDisc()) {
                            B.displaySecondCanvas(false);
                        }
                    }
                    )(z);
                }
            }
        },
        loadingTheFutureNotInScreen: function(z) {
            var x = this, w, y;
            if (z === h || (z.length === 1 && z[0] === h)) {
                return false;
            } else {
                for (y = 0,
                w = z.length; y < w; y++) {
                    if (z[y].isBlank() || !z.hasOwnProperty(y)) {
                        continue;
                    }
                    (function(B) {
                        var A = z[B];
                        var C = {
                            success: function(E) {
                                var D = true;
                                if (E.pageXml) {
                                    if (E.pageXml.hasOwnProperty("code")) {
                                        if (E.pageXml.code != "") {
                                            D = false;
                                        }
                                    }
                                }
                                if (D) {
                                    if (f.inArray(E.index, x._loadedPageImageIndex) === -1) {
                                        x._loadPageImage(x.makePartUrlOf(E.index, 0, E.pageXml.Part[0]), E);
                                    }
                                }
                            }
                        };
                        if (!A.pageXml && x._isLoadingPageXml(A.index) === -1) {
                            x._loadPageXml(A, C, false, true);
                        }
                        return true;
                    }
                    )(y);
                }
            }
        },
        nodokageLayout: function() {
            var y = (this._scaling_mode) ? this._scaling : 1;
            var w = this.getCurrentScreenObj();
            if (w) {
                var x = w._canvasObj(0)._canvas;
                f.nodokagehelper.doLayoutToLeftCanvas(x, y);
            }
        },
        nodokageShowHide: function(w) {
            if (this.isLandscape() && !this.isViewTypeOfScroll()) {
                if (this.checkFirstCanvasSpread(w)) {
                    f.nodokagehelper.doHide();
                } else {
                    f.nodokagehelper.doShow();
                }
            } else {
                f.nodokagehelper.doHide();
            }
        },
        updateAllScreens: function() {
            var w = this, y, B;
            var z = appview.manager.getEventReceiver();
            w._fix_spread_page_mode = false;
            y = w._getContentsDataIndex();
            if (w.isLandscape() && !w.isViewTypeOfScroll()) {
                y = w._spreadCurrentPage - 1;
                B = w._contentsData[y];
            } else {
                B = [w._sequentialPageData[y]];
            }
            if (w.options.fixSpreadPageMode) {
                if (B) {
                    if (B.length == 1) {
                        if (B[0]["spread"]) {
                            if (B[0].spread == true && !w.isLongHeightSpread(w.getComputedCurrentPage() - 1)) {
                                w._fix_spread_page_mode = true;
                            }
                        }
                    }
                }
                if (w.checkEmpty() === false) {
                    w.setSpreadPageFront();
                }
            }
            var x = w.getCurrentScreenObj();
            if (w.SPREAD_SWITCHING_SYSTEM) {
                if (x._selected == 0) {
                    x._selected = 1;
                } else {
                    x._selected = 0;
                }
            }
            w.controlTransitionVisibility(false);
            w.drawScreen(B, x, 0);
            w.updateRender_canvas();
            if (w.SPREAD_SWITCHING_SYSTEM) {
                var A = (w._fromChangeMode == i.TO_PAGE);
                if (A) {
                    w.updateRender_screen();
                    z.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_SCREEN);
                }
                setTimeout(function() {
                    if (!A) {
                        w.updateRender_screen();
                        z.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_SCREEN);
                    }
                    w._changeSpredPageCanvasGroup();
                    w.nodokageShowHide(x);
                    w.nodokageLayout();
                    w.adjustmentScreen();
                    if (w._isReadyFirstPage == false) {
                        w._isReadyFirstPage = true;
                        w._removeContentCover();
                    }
                    setTimeout(function() {
                        w.controlTransitionVisibility(true);
                        if (!f.porting.env.browser.isChrome && f.porting.env.os.isAndroid_4) {
                            w.reDrawCurrentScreenCanvas();
                        }
                    }, 0);
                }, 200);
            } else {
                w.updateRender_screen();
                z.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_SCREEN);
                w.nodokageShowHide(x);
                w.nodokageLayout();
                w.adjustmentScreen();
                if (w._isReadyFirstPage == false) {
                    w._isReadyFirstPage = true;
                    w._removeContentCover();
                }
                setTimeout(function() {
                    w.controlTransitionVisibility(true);
                    if (!f.porting.env.browser.isChrome && f.porting.env.os.isAndroid_4) {
                        w.reDrawCurrentScreenCanvas();
                    }
                }, 0);
            }
        },
        updateRender_canvas: function() {
            var w = this, y = window.innerWidth, C = window.innerHeight, x = 0, B, A;
            var z = false;
            if (w._currentPage === v) {
                return;
            }
            w._updateRenderFlag = true;
            w.preserve3dMaster(true);
            w.aos4Preserve3dMaster(true, false);
            A = function(ad) {
                var X = {
                    w: 0,
                    h: 0
                }, P = [], K, S, W = 0, G = 0, R = w.contentFrameWidth, Y = w.contentFrameHeight, ab = 1, M = w.contentFrameWidth / w.contentFrameHeight, U, T = y, aa = 0, Z, E = {
                    width: 0,
                    height: 0
                };
                if (ad === 0) {
                    U = w.getCurrentScreenObj();
                    K = w._currentPage - 1;
                } else {
                    return false;
                }
                if (w.isLandscape() && !w.isViewTypeOfScroll()) {
                    P = w._contentsData[(w._spreadCurrentPage - 1) + ad];
                    if (w.checkEmpty((w._spreadCurrentPage - 1) + ad)) {
                        E = w.calcCanvasSize(w.contentFrameWidth, w.contentFrameHeight);
                        if (w._scaling_mode) {
                            R = w.contentFrameWidth;
                            Y = w.contentFrameHeight;
                            w._scaling = E.width / R;
                            var N, V;
                            V = (C - E.height) / 2;
                            Z = U._canvasObj(0)._canvas;
                            N = y * 0.5 - E.width;
                            w._setCssTransformOrigin(Z[0], 0, 0);
                            w._setCssRect(Z[0], N, V, R, Y);
                            w._setCssScale(Z[0], w._scaling);
                            Z = U._canvasObj(1)._canvas;
                            N = y * 0.5 - 1;
                            w._setCssTransformOrigin(Z[0], 0, 0);
                            w._setCssRect(Z[0], N, V, R, Y);
                            w._setCssScale(Z[0], w._scaling);
                        } else {
                            Z = U._canvasObj(0)._canvas;
                            w._setCssRect(Z[0], ((window.innerWidth / 2 - E.width) | 0), (window.innerHeight - E.height) / 2, E.width, E.height);
                            Z = U._canvasObj(1)._canvas;
                            w._setCssRect(Z[0], ((window.innerWidth / 2) | 0), (window.innerHeight - E.height) / 2, E.width, E.height);
                        }
                        U._screens[0].width(y);
                        U._screens[1].width(y);
                        U._screens[0].height(window.innerHeight);
                        U._screens[1].height(window.innerHeight);
                        return false;
                    }
                } else {
                    P.push(w._sequentialPageData[K]);
                }
                if (P === h) {
                    return false;
                }
                var I = function(ae) {
                    return ae.pageXml;
                };
                for (W = 0,
                G = P.length; W < G; W++) {
                    if (P[W] && !P[W].isBlank()) {
                        S = I(P[W]);
                    } else {
                        if (P.length > 1) {
                            if (P[(P.length - 1) - W] === h || P[(P.length - 1) - W].isBlank()) {
                                return false;
                            }
                            S = I(P[(P.length - 1) - W]);
                        }
                    }
                    if (!S) {
                        return false;
                    }
                    R = S.StepRectWidth;
                    Y = S.StepRectHeight;
                    var L = false;
                    if (R <= Y) {
                        L = true;
                    }
                    if (P[W].spread && !L) {
                        ab = (R / Y) / 2;
                        E = w.calcCanvasSize(R / 2, Y);
                    } else {
                        ab = R / Y;
                        E = w.calcCanvasSize(R, Y);
                    }
                    var Q = (w.isLandscape() && !w.isViewTypeOfScroll());
                    var J = (w.isLandscape() && w.isViewTypeOfScroll());
                    if (Q) {
                        M = (y * 0.5) / C;
                    } else {
                        M = (y) / C;
                    }
                    if (J) {
                        X.w = y,
                        X.h = ((Y * (y / R)) | 0);
                        if (P[W].spread && R > Y) {
                            X.w = X.w * 2;
                            X.h = X.h * 2;
                        }
                    } else {
                        if (ab > M) {
                            X.w = (E.width | 0);
                            X.h = ((X.w / ab) | 0);
                        } else {
                            X.h = (E.height | 0);
                            X.w = ((X.h * ab) | 0);
                        }
                        if (P[W].spread && !L) {
                            X.w *= 2;
                        }
                    }
                    if (W == 0) {
                        if (!Q && P[W].spread && !L) {
                            T = X.w;
                        }
                    }
                    var H, O;
                    Z = U._canvasObj(W)._canvas;
                    if (J) {
                        H = 0;
                        O = 0;
                        if (X.h < C) {
                            O = (((C - X.h) / 2) | 0);
                        }
                    } else {
                        if (P[W].spread && L) {
                            if (ad == 0) {
                                z = true;
                            }
                            var D;
                            D = (y - X.w);
                            H = D * 0.5;
                            O = (((C - X.h) / 2) | 0);
                        } else {
                            var ac = 0;
                            if (W == 0) {
                                if (Q) {
                                    if (P[W].spread) {
                                        ac = (y - X.w) / 2;
                                    } else {
                                        ac = (y * 0.5 - X.w);
                                    }
                                } else {
                                    if (P[W].spread) {
                                        ac = 0;
                                    } else {
                                        ac = (y - X.w) / 2;
                                    }
                                }
                            } else {
                                ac = y * 0.5 - 1;
                            }
                            H = ac;
                            O = (C - X.h) / 2;
                        }
                    }
                    if (w._scaling_mode) {
                        w._scaling = X.w / R;
                        w._setCssTransformOrigin(Z[0], 0, 0);
                        w._setCssRect(Z[0], H, O, R, Y);
                        w._setCssScale(Z[0], w._scaling);
                    } else {
                        w._setCssRect(Z[0], H, O, X.w, X.h);
                    }
                    aa = X.h;
                    if (J) {
                        aa = U._canvasObj(W)._canvas.outerHeight();
                    } else {
                        if (W == 0 && P.length == 1) {
                            aa = X.h;
                        } else {
                            if (W > 0) {
                                var F = ((U._canvasObj(W - 1)._canvas.outerHeight() * w._scaling) | 0);
                                if (X.h < F) {
                                    aa = F;
                                }
                            }
                        }
                    }
                }
                if (aa < C) {
                    aa = C;
                }
                U._screens[0].width(T);
                U._screens[0].height(aa);
                U._screens[1].width(T);
                U._screens[1].height(aa);
                return true;
            }
            ;
            if (!A(0) && !w.checkEmpty()) {
                w.openRetryDialog(appview.constants.ID_RETRY_DIALOG);
                w.duringAnimation = false;
            }
        },
        updateRender_screen: function(F) {
            var I = this, A = window.innerWidth, x = window.innerHeight, D = 0, K;
            var H = false;
            D += I.getCurrentScreen().width();
            K = 0;
            if (I._alignment === l.RIGHT && I.isPortraitAndScrollDisc()) {
                if (!H) {
                    K -= I.getCurrentScreen().width() - window.innerWidth;
                }
            }
            I._removeCssClass(I.options.screenWrapper, "transitions-base");
            I._addCssClass(I.options.screenWrapper, "transitions-none");
            I._setCssTransformOrigin(I.options.screenWrapper[0], 0, 0);
            var z = (D | 0);
            var y = K;
            var J = I.getCurrentScreen().outerHeight();
            if (I.isPageStepScrollMode()) {
                J = (I.getCurrentScreen().outerHeight() * I._scaling) | 0;
            }
            var E = 0;
            var C = x - J;
            var w = I._selectPageFeedTypeN(E, C);
            I._setCssRect(I.options.screenWrapper[0], y, w, z, J);
            I._setCssScale(I.options.screenWrapper[0], 1);
            var B;
            if (I.isPortrait()) {
                B = I.portraitMaxHeight;
            } else {
                B = I.landscapeMaxHeight;
            }
            if (B < window.innerHeight) {
                if (I.isPortrait()) {
                    I.portraitMaxHeight = window.innerHeight;
                    I.landscapeMaxHeight = window.innerWidth;
                } else {
                    I.portraitMaxHeight = window.innerWidth;
                    I.landscapeMaxHeight = window.innerHeight;
                }
            }
            if (f.porting.env.device.isDesktopPC) {
                f("div#viewer").css("min-height", "100%").css("height", "100%");
            } else {
                if (f.porting.env.os.isAndroid && !I.adjustmentHeight) {
                    f("div#viewer").css("min-height", window.innerHeight + "px").css("height", "100%");
                } else {
                    f("div#viewer").css({
                        "min-height": "140%",
                        height: "100%"
                    });
                }
            }
            I.zoomScale = 1;
            I.flickOperation = false;
            I.zoomMode = false;
            I.setZoomPoints();
            if (I.komaMode === true) {
                var G = 200;
                I.changeLoadingState(true);
                I._komaTouchWaitFlag = true;
                if (((f.porting.env.device.isSC01D && f.porting.env.os.isAndroid_3) || f.porting.env.device.isSC02D) && !f.porting.env.browser.isChrome) {
                    G = 1000;
                } else {
                    G = 200;
                }
                I.komaScrollState = q.RUNNING;
                I.komaAnimation();
                setTimeout(function() {
                    if (f.porting.env.os.isAndroid_4) {
                        I.aos4Preserve3dMaster(false, false);
                    }
                    I.changeLoadingState(false);
                    I.drawKoma(I._currentKoma);
                    I._updateRenderFlag = false;
                    I._komaTouchWaitFlag = false;
                    if (f.porting.env.os.isAndroid_4) {
                        I.aos4Preserve3dMaster(true, false);
                    }
                }, G);
            } else {
                I.controlZoomButton();
                I.aos4Preserve3dMaster(false, false);
                if (!I._isExecLoadingTheFuture) {
                    if (!f.porting.env.browser.isChrome && f.porting.env.os.isAndroid_4) {
                        I.reDrawCurrentScreen();
                    }
                }
                setTimeout(function() {
                    if (f.porting.env.os.isAndroid_2) {
                        if (I.options.screenWrapper.outerHeight() < window.innerHeight) {
                            I.updateRender();
                        }
                    }
                }, 200);
                I.isChanging = false;
                I.duringAnimation = false;
                I.isChangingMode = false;
                I._updateRenderFlag = false;
            }
            if (F) {
                I.hideSecondCanvas();
            }
        },
        updateRender: function(w) {
            this.updateRender_canvas();
            this.updateRender_screen(w);
        },
        isFirstTime: function() {
            return this._is_first_time;
        },
        setUseIntroduction: function(w) {
            this._is_use_introduction = w;
        },
        setUsePostScript: function(w) {
            this._is_use_postscript = w;
        },
        getCurrentPage: function() {
            var w = this;
            return w._currentPage;
        },
        getComputedCurrentPage: function() {
            var w = this;
            return w._computedCurrentPage;
        },
        getTotalDoublePage: function() {
            return this._totalDoublePage;
        },
        getTotalPage: function() {
            return this._totalPage;
        },
        getPageData: function() {
            return this._sequentialPageData[this._currentPage - 1];
        },
        getContentsData: function() {
            return this._contentsData[this._spreadCurrentPage - 1];
        },
        isLandscapeAndNotViewTypeScroll: function() {
            return (this.isLandscape() && !this.isViewTypeOfScroll());
        },
        _selectPageFeedTypeN: function(w, y) {
            var z = 0;
            var x = this._nowPageFeed;
            this._nowPageFeed = m.NEUTRAL;
            if (this.isTextContent()) {
                x = m.NEUTRAL;
            }
            switch (x) {
            case m.NEUTRAL:
                z = w;
                break;
            case m.NEXT:
                z = w;
                break;
            case m.PREV:
                z = y;
                break;
            default:
                z = w;
            }
            return z;
        },
        _removeContentCover: function() {
            var w = "content_cover";
            var x = document.getElementById(w);
            if (x) {
                x.parentNode.removeChild(x);
            }
        },
        _removeDocumentElement: function(x) {
            var w = document.getElementById(x);
            if (w) {
                w.parentNode.removeChild(w);
            }
        },
        isFirstPage: function() {
            var w = false;
            var x = this.getTotalDoublePageTrialFirstPageIndex();
            if (this.getComputedCurrentPage() <= (x + 1)) {
                w = true;
            }
            return w;
        },
        getTrialFirstPageIndex: function() {
            var w = 0;
            if (f.trialhelper.isTrialMode()) {
                w = f.trialhelper.getTrialFirstPageIndex();
            }
            return w;
        },
        getTrialLastPageIndex: function() {
            var w = this._totalPage - 1;
            if (f.trialhelper.isTrialMode()) {
                w = f.trialhelper.getTrialLastPageIndex();
            }
            return w;
        },
        getTotalDoublePageTrialFirstPageIndex: function() {
            var w = 0;
            if (f.trialhelper.isTrialMode()) {
                var x = f.trialhelper.getTotalDoublePageTrialRangeData();
                w = x.first;
            }
            return w;
        },
        getTotalDoublePageTrialLastPageIndex: function() {
            var w = this._totalDoublePage;
            if (f.trialhelper.isTrialMode()) {
                var x = f.trialhelper.getTotalDoublePageTrialRangeData();
                w = x.last;
            }
            return w;
        },
        getBookmarkPageData: function() {
            var w = {};
            w.bookmark1 = f.bookmark.getS1PageNumber();
            w.bookmark2 = f.bookmark.getS2PageNumber();
            return w;
        },
        deleteBookmarkPageData: function() {
            f.bookmark.deleteBookmarkData();
        },
        getCurrentScreen: function() {
            var w = this;
            var y = null;
            var x = w.getCurrentScreenObj();
            switch (x._selected) {
            case 0:
                y = x._screens[0];
                break;
            case 1:
                y = x._screens[1];
                break;
            }
            return y;
        },
        getCurrentScreenObj: function() {
            return this._screenObj[0];
        },
        getPageFirstCharNumber: function(y) {
            var x = this;
            var z = 0;
            var w = x._computedIndexMap[y];
            var A = x._sequentialPageData[w];
            if (A && A.pageXml) {
                z = A.pageXml.FirstCharNumber;
            } else {
                z = null;
            }
            return z;
        },
        saveBookmarkData: function(A) {
            var w = this;
            var z = 0;
            var x = -1;
            x = (w.komaMode) ? w._currentKoma - 1 : -1;
            if (w.isPortraitAndScrollDisc()) {
                z = w.getComputedCurrentPage() - 1;
            } else {
                z = w._pageToComputedPageIndexMap[w._currentPageComputedNo[w.getComputedCurrentPage() - 1]];
            }
            var y = w.getPageFirstCharNumber(z);
            switch (A) {
            case 1:
                f.bookmark.setS1PageNumber(z, x, y);
                break;
            case 2:
                f.bookmark.setS2PageNumber(z, x, y);
                break;
            default:
            }
        },
        screenEvent: function() {
            var I = this, af = I.options.screenWrapper, K = {}, ah = {}, Y, W, L, J, O, N, aq = 0, ar = 0, y = false, S = false, P = false, z = false, Z = false, H = 0.03, ap = 20, w, U = 40, ae = 200, G, an, R = {
                x: h,
                y: h
            }, ai, F = {
                x: 0,
                y: 0
            }, ag = {
                left: h,
                top: h
            }, ac, A, B = 1, ao, M = 0, Q = 550, am = {
                left: h,
                top: h
            }, V = {
                left: h,
                top: h
            }, T = {
                left: h,
                top: h
            }, aj = {
                x: h,
                y: h
            }, al = {
                x: h,
                y: h
            }, D = 250, C = {
                x: h,
                y: h
            };
            var ak = false;
            var ad = [];
            var ab = function(au) {
                var at = false;
                if (au == null) {
                    return at;
                }
                switch (au.event) {
                case f.clickablemaphelper.EVENT_PAGE_JUMP:
                    at = true;
                    f.clickablemaphelper.clearClickablemapRect();
                    I.selectNavigationList(au.move);
                    break;
                case f.clickablemaphelper.EVENT_URL_OPEN:
                    at = true;
                    I.openDialog(appview.constants.ID_URL_TO_CONFIRM_DIALOG);
                    break;
                }
                return at;
            };
            var aa = function() {
                aq = ar = 0;
                Z = false;
                y = false;
                P = false;
                z = false;
                S = false;
                Y = L = h;
                V = {
                    left: h,
                    top: h
                };
                ag = {
                    left: h,
                    top: h
                };
                ak = false;
            };
            var E = function() {
                var at = !I._komaScrollFlag && !I.isChangingMode && !I.isChanging && !I._isResizeEvent && !I._komaTouchWaitFlag && !I._updateRenderFlag && !I.isDrawScreen && !I.duringAnimation && !(I.zoomScale !== 1 && !I.zoomMode);
                return at;
            };
            if (f.porting.env.device.isIPad && f.porting.env.os.isOS_4) {
                ae = 250;
            }
            f(document).keydown(function(au) {
                au.stopPropagation();
                au.preventDefault();
                if (!E()) {
                    return;
                }
                if (I.isInitializeAndLoadingFinished() == false) {
                    return;
                }
                if (appview.manager.isOpenedPanels()) {
                    return;
                }
                if (appview.manager.isOpenedDialogs()) {
                    return;
                }
                if (appview.manager.isOpenedLoadingSpinner()) {
                    return;
                }
                if (appview.manager.isOpendAdvertisementPages()) {
                    return;
                }
                if (appview.manager.isOpenedSubPanel()) {
                    return;
                }
                if (I.komaMode) {
                    return;
                }
                var at = au.which;
                switch (at) {
                case I.KEYBOARD_LEFT:
                    I.leftPage(false);
                    break;
                case I.KEYBOARD_RIGHT:
                    I.rightPage(false);
                    break;
                default:
                    break;
                }
            });
            var x = function() {
                if (f.porting.env.os.isAndroid) {
                    if (f.porting.env.browser.isChrome) {
                        if (f.porting.env.browser.chromeVersion >= "55") {
                            if (I.komaMode) {
                                return true;
                            }
                        }
                    }
                }
                return false;
            };
            I._screenWrapper_interaction_obj = Interaction.EventFactory.createEventListenerMulti(I.options.screenWrapper_id);
            I._screenWrapper_interaction_obj.addEventDown(function(ay) {
                if (I.komaMode) {
                    return true;
                }
                I.hideAddressBarByTouch(ay);
                if (!E()) {
                    I.touchEndIgnore = true;
                    return;
                }
                if (f.infomessage.existMessage()) {
                    f.infomessage.removeDialogMessage();
                    return;
                }
                ad = I._screenWrapper_interaction_obj.getMultiEvents();
                B = ad.length;
                if (B <= 0) {
                    return;
                }
                if (f.clickablemaphelper.isUse()) {
                    if ((y == false) && (B == 1)) {
                        K = ad[0];
                        var av = K.pageX;
                        var at = K.pageY;
                        var au = I.drawClickableMapBox(av, at);
                        ak = (au !== null);
                    }
                }
                if (!I._isMask || f.porting.env.device.isDesktopPC) {
                    if (I.zoomScale !== 1) {
                        D = 250;
                    } else {
                        D = 0;
                    }
                }
                w = ((window.innerWidth * H) | 0);
                w = (w < ap) ? ap : w;
                if (y && B <= 1) {
                    V = {
                        left: h,
                        top: h
                    };
                    ag = {
                        left: h,
                        top: h
                    };
                    y = false;
                } else {
                    K = ad[0];
                    if (B > 1 && !I.isPageStepScrollMode()) {
                        I.preserve3dMaster(false);
                        I.aos4Preserve3dMaster(true, false);
                        I.pinchFlag = true;
                        if (!Y || !W) {
                            Y = ad[1].pageX;
                            W = ad[1].pageY;
                            L = Y;
                            J = W;
                        }
                        aq = Math.sqrt(Math.pow(K.pageX - Y, 2) + Math.pow(K.pageY - W, 2));
                        var ax = (K.pageX + Y) / 2;
                        var aw = (K.pageY + W) / 2;
                        O = (ax - af.offset().left) / I.zoomScale;
                        N = (aw - af.offset().top) / I.zoomScale;
                        T.left = af.offset().left;
                        T.top = af.offset().top;
                    }
                    if (I.zoomScale !== 1) {
                        I.aos4Preserve3dMaster(true, false);
                    }
                    A = I.zoomScale;
                    F.x = K.pageX;
                    F.y = K.pageY;
                    ag.left = af.offset().left;
                    ag.top = af.offset().top;
                    V.left = af.offset().left;
                    V.top = af.offset().top;
                    am.left = 0;
                    am.top = 0;
                    aj.x = K.pageX;
                    aj.y = K.pageY;
                    G = new Date().getTime();
                    y = true;
                }
            });
            I._screenWrapper_interaction_obj.addEventUp(function(ax) {
                if (I.komaMode) {
                    return true;
                }
                if (!E()) {
                    return;
                }
                if (I.touchEndIgnore) {
                    I.touchEndIgnore = false;
                    return;
                }
                if (!y && !L) {
                    return;
                }
                K = ax;
                an = new Date().getTime();
                V.left = af.offset().left;
                V.top = af.offset().top;
                if (B === 1) {
                    if (P) {
                        if (D !== 0) {
                            S = true;
                        }
                        P = false;
                    }
                }
                if (I.zoomScale !== 1) {
                    I.aos4Preserve3dMaster(false, false);
                }
                I.pinchFlag = false;
                if (L && !I.isPageStepScrollMode()) {
                    if (I.zoomScale === 1) {
                        I.aos4Preserve3dMaster(false, false);
                        I.zoomMode = false;
                    }
                    aa();
                    return;
                }
                if (B === 1) {
                    if (P) {} else {
                        P = true;
                        var au = Math.abs(K.pageX - F.x);
                        var at = Math.abs(K.pageY - F.y);
                        z = (au <= w) && (at <= w);
                        I.flickOperation = false;
                        if (!z && !I.zoomMode) {
                            if ((an - G) <= ae) {
                                if (at <= (au * I.HORZ_FLICK_THRESHOLD)) {
                                    I.flickOperation = true;
                                    if (Interaction.util.isSupportPointerEvent() == false) {
                                        if (f.porting.env.device.isDesktopPC) {
                                            I.flickOperation = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (I.zoomMode && I.zoomScale > 1) {
                            var av = Math.abs(V.left - ag.left);
                            var aw = Math.abs(V.top - ag.top);
                            if ((av >= w || aw >= w) || !z) {
                                aa();
                                return;
                            }
                        }
                        if (!z) {
                            if (Math.abs(V.left - ag.left) <= w && Math.abs(F.x - K.pageX) >= (w * 2) && (at <= (au * I.HORZ_FLICK_THRESHOLD))) {
                                I.flickOperation = true;
                            }
                            if (Interaction.util.isSupportPointerEvent() == false) {
                                if (f.porting.env.device.isDesktopPC) {
                                    I.flickOperation = false;
                                }
                            }
                            if (I.flickOperation) {
                                if (f.clickablemaphelper.isUse()) {
                                    f.clickablemaphelper.clearClickablemapRect();
                                }
                                I.decidePage(F.x, K.pageX);
                            } else {
                                if (I._sequentialPageData[I._currentPage - 1].spread && I.isPortrait() && I._alignment !== l.CENTER) {
                                    I.turnUpSpreadPages();
                                }
                            }
                            aa();
                            return;
                        }
                    }
                }
                y = false;
                setTimeout(function() {
                    if (y) {
                        return false;
                    } else {
                        if (S) {
                            if (I.zoomMode) {
                                I.zoomMode = false;
                                I.duringAnimation = false;
                                if (I.isPortrait() && I._sequentialPageData[I._currentPage - 1].spread && I._alignment !== l.CENTER) {
                                    var aC = window.innerWidth;
                                    var aB = I.getCurrentScreen().outerWidth();
                                    var aF = I.getCurrentScreen().offset().left;
                                    var aA = K.pageX - aF;
                                    var aD = (aA / I.zoomScale - aC / 2) * -1;
                                    I.updateRender();
                                    if (0 < aD) {
                                        aD = 0;
                                    } else {
                                        if (aC - aB > aD) {
                                            aD = aC - aB;
                                        }
                                    }
                                    ai = (aD | 0);
                                    I._setCssOffset(af[0], ai);
                                    I.turnUpSpreadPages();
                                } else {
                                    I.updateRender();
                                }
                            } else {
                                if (I.options.fixPageModeOnly) {
                                    I.duringAnimation = false;
                                } else {
                                    if (f.clickablemaphelper.isUse()) {
                                        I.duringAnimation = false;
                                    } else {
                                        if (I.isLandscape() && !I.isPageStepScrollMode() && I._contentsData[I._spreadCurrentPage - 1].length > 1) {
                                            if ((I.checkKomaData(I._contentsData[I._getContentsDataIndex()][0]) || I.checkKomaData(I._contentsData[I._getContentsDataIndex()][1])) && !I.checkEmpty(I._spreadCurrentPage - 1)) {
                                                I._currentKoma = I.chooseNearestKoma(K.pageX, K.pageY);
                                                if (!I._currentKoma) {
                                                    I.duringAnimation = false;
                                                } else {
                                                    I.zoomMode = false;
                                                    I.changeMode();
                                                    M++;
                                                }
                                            } else {
                                                I.duringAnimation = false;
                                            }
                                        } else {
                                            if (I.checkKomaData(I._sequentialPageData[I._currentPage - 1])) {
                                                I._currentKoma = I.chooseNearestKoma(K.pageX, K.pageY);
                                                I.zoomMode = false;
                                                I.changeMode();
                                                M++;
                                            } else {
                                                I.duringAnimation = false;
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (z) {
                                var aE = false;
                                if (f.clickablemaphelper.isUse()) {
                                    var az = null;
                                    var ay = K.pageX;
                                    var aG = K.pageY;
                                    az = I.getClickableMapEventInfo(ay, aG);
                                    aE = ab(az);
                                }
                                if (aE == false) {
                                    I.threeDivisionTapFunction(K.pageX);
                                }
                            }
                        }
                    }
                    P = false;
                    z = false;
                    S = false;
                    y = false;
                    V = {
                        left: h,
                        top: h
                    };
                    ag = {
                        left: h,
                        top: h
                    };
                }, D);
            });
            I._screenWrapper_interaction_obj.addEventMove(function(au) {
                if (!E()) {
                    return;
                }
                if (Interaction.util.isSupportPointerEvent()) {
                    if (Interaction.util.isPointerTypeToMouse(au)) {
                        if (y && !Y) {
                            I.changeCursor(d.Type.DRAG);
                        } else {
                            I.onMouseMoveScreenCursorChange(au);
                        }
                    } else {
                        I.changeCursor(d.Type.DEFAULT);
                    }
                } else {
                    if (y && !Y) {
                        I.changeCursor(d.Type.DRAG);
                    } else {
                        I.onMouseMoveScreenCursorChange(au);
                    }
                }
                if (I.touchEndIgnore) {
                    I.touchEndIgnore = false;
                    return;
                }
                if (!y || (I.zoomScale > 1 && !I.zoomMode)) {
                    return;
                }
                if (y && ak) {
                    return;
                }
                ad = I._screenWrapper_interaction_obj.getMultiEvents();
                if (ad.length <= 0) {
                    return;
                }
                K = ad[0];
                if (y && !Y) {
                    if (I.isPageStepScrollMode()) {
                        I.pageScrollDrag(K, F, aj);
                        aj.x = K.pageX;
                        aj.y = K.pageY;
                    } else {
                        am.left = K.pageX - F.x;
                        am.top = K.pageY - F.y;
                        V.left = am.left + af.offset().left;
                        V.top = am.top + af.offset().top;
                        C.x = K.pageX - aj.x;
                        C.y = 0;
                        if (I.zoomScale > 1) {
                            C.y = K.pageY - aj.y;
                        }
                        I._removeCssClass(af, "transitions-base");
                        I._addCssClass(af, "transitions-none");
                        var at = I.getDragRevisionCoordinate(C);
                        C = at.dist;
                        I._setCssOffset(af[0], I._getCssValueAsInteger(af[0], "left") + C.x, I._getCssValueAsInteger(af[0], "top") + C.y);
                        aj.x = K.pageX;
                        aj.y = K.pageY;
                    }
                } else {
                    if (B > 1 && !I.isPageStepScrollMode()) {
                        ai = 0;
                        I.pinchFlag = true;
                        if (ad.length > 1) {
                            ah = ad[1];
                            if (("pageX"in ah) && ("pageY"in ah)) {
                                L = ah.pageX;
                                J = ah.pageY;
                            }
                        }
                        ar = Math.sqrt(Math.pow(K.pageX - L, 2) + Math.pow(K.pageY - J, 2));
                        ac = I.getLatestZoomScale(A, ar, aq);
                        al.x = T.left - O * (ac - A);
                        al.y = T.top - N * (ac - A);
                        al = I.getPinchRevisionCoordinate(ac, al.x, al.y);
                        if (ac !== 1) {
                            I.zoomMode = true;
                        } else {
                            I.zoomMode = false;
                        }
                        I._removeCssClass(af, "transitions-base");
                        I._addCssClass(af, "transitions-none");
                        I._setCssOffset(af[0], al.x, al.y);
                        I._setCssScale(af[0], ac);
                        I.zoomScale = ac;
                    } else {
                        Y = "";
                    }
                }
            });
            I._screenWrapper_interaction_obj.addEventCancel(function(at) {
                if (!E()) {
                    return;
                }
                if (I.touchEndIgnore) {
                    I.touchEndIgnore = false;
                    return;
                }
                if (af.queue().length !== 0) {
                    return;
                }
                if (!y) {
                    return;
                }
                aa();
                return;
            });
            var X = false;
            I._komaWrapper_interaction_obj = Interaction.EventFactory.createEventListenerSingle(I.options.komaWrapper_id);
            I._komaWrapper_interaction_obj.addEventCancel(function(at) {
                if (!E()) {
                    return;
                }
                if (I.touchEndIgnore) {
                    I.touchEndIgnore = false;
                    return;
                }
                if (!y) {
                    return;
                }
            });
            I._komaWrapper_interaction_obj.addEventDown(function(au) {
                var at = au;
                I.hideAddressBarByTouch(au);
                if (!E()) {
                    I.touchEndIgnore = true;
                    return;
                }
                Z = false;
                f("#viewer").blur();
                if (y) {
                    y = false;
                } else {
                    R.x = at.pageX;
                    R.y = at.pageY;
                    G = new Date().getTime();
                    y = true;
                }
            });
            I._komaWrapper_interaction_obj.addEventUp(function(ay) {
                var au = ay;
                if (!E()) {
                    return;
                }
                if (!y) {
                    return;
                }
                if (I.touchEndIgnore) {
                    if (M > 1) {
                        I.touchEndIgnore = false;
                    }
                    return;
                }
                y = false;
                an = new Date().getTime();
                if (P) {
                    S = true;
                    P = false;
                    setTimeout(function() {
                        if (y) {
                            return;
                        } else {
                            M++;
                            if (S) {
                                if (I.checkImageLoaded(I._currentPage - 1)) {
                                    I.touchEndIgnore = false;
                                    I.changeMode();
                                }
                            }
                        }
                        P = false;
                        z = false;
                        Z = false;
                        S = false;
                        y = false;
                        X = false;
                    }, 250);
                } else {
                    P = true;
                    var ax = I._sequentialPageData[I._currentPage - 1];
                    var aw = an - G;
                    var av = au.pageX - R.x;
                    var at = au.pageY - R.y;
                    if ((av === 0) && (at === 0)) {
                        z = true;
                    } else {
                        if (aw <= Q && !X) {
                            z = true;
                        } else {
                            if (I._komaScrollFlag === false && ax.loadedFlag === true && I.duringAnimation === false && I._updateRenderFlag === false) {
                                Z = true;
                            } else {
                                Z = false;
                            }
                            P = false;
                        }
                    }
                    setTimeout(function() {
                        if (y) {
                            return;
                        } else {
                            M++;
                            if (Z) {
                                if (av > U) {
                                    if (I.binding === l.LEFT) {
                                        I.prevKomaByTouch();
                                    } else {
                                        I.nextKomaByTouch();
                                    }
                                } else {
                                    if (av < (-U)) {
                                        if (I.binding === l.LEFT) {
                                            I.nextKomaByTouch();
                                        } else {
                                            I.prevKomaByTouch();
                                        }
                                    }
                                }
                            } else {
                                if (S) {
                                    if (I.checkImageLoaded(I._currentPage - 1)) {
                                        I.touchEndIgnore = false;
                                        I.changeMode();
                                    }
                                } else {
                                    if (z) {
                                        if (I._updateRenderFlag === false && I._komaScrollFlag === false && ax.loadedFlag === true && I.duringAnimation === false) {
                                            I.threeDivisionTapKoma(au.pageX);
                                        }
                                    }
                                }
                            }
                        }
                        P = false;
                        z = false;
                        Z = false;
                        S = false;
                        y = false;
                        X = false;
                    }, 250);
                }
            });
            I._komaWrapper_interaction_obj.addEventMove(function(aw) {
                var at = aw;
                if (!E()) {
                    return;
                }
                if (!y) {
                    return;
                } else {
                    var av = Math.abs(at.pageX - R.x);
                    var au = Math.abs(at.pageY - R.y);
                    if (av >= U || au >= U) {
                        X = true;
                    }
                }
            });
        },
        getClickableMapEventInfo: function(x, w) {
            return this._getClickableMapEventInfo(x, w, false);
        },
        drawClickableMapBox: function(x, w) {
            return this._getClickableMapEventInfo(x, w, true);
        },
        _getClickableMapEventInfo: function(x, w, P) {
            var z = this;
            var A = z._getContentsDataIndex();
            var J = z.getCurrentScreenObj();
            var Q = null;
            var K = null;
            var N = null;
            var G = null;
            var y = 1;
            var F = null;
            var C = null;
            var H = null;
            var B = null;
            var O = null;
            if (z.isLandscape() && !z.isPageStepScrollMode()) {
                O = z._contentsData[A];
                if (O) {
                    if (O[1] && !O[1].isBlank()) {
                        N = O[1];
                        G = J._canvasObj(1)._canvas;
                    }
                    if (O[0] && !O[0].isBlank()) {
                        Q = O[0];
                        K = J._canvasObj(0)._canvas;
                    }
                }
            } else {
                Q = z._sequentialPageData[A];
                K = J._canvasObj(0)._canvas;
            }
            if (z._scaling_mode) {
                y = z._scaling;
            }
            var E = z.zoomScale;
            var I = z.options.screenWrapper.offset().left;
            var D = z.options.screenWrapper.offset().top;
            var M = x;
            var L = w;
            M -= I;
            L -= D;
            M *= 1 / E;
            L *= 1 / E;
            if (Q !== null) {
                F = f.clickablemaphelper.isEventOnPage(M, L, y, Q, K);
            }
            if (N !== null) {
                C = f.clickablemaphelper.isEventOnPage(M, L, y, N, G);
            }
            H = null;
            B = null;
            if ((F !== null) && (F.event !== f.clickablemaphelper.EVENT_NONE)) {
                B = F;
                H = K;
            }
            if (B == null) {
                if ((C !== null) && (C.event !== f.clickablemaphelper.EVENT_NONE)) {
                    B = C;
                    H = G;
                }
            }
            if ((B !== null) && (H !== null)) {
                f.clickablemaphelper.setNowEventInfo(B);
            }
            if (P) {
                if ((B !== null) && (H !== null)) {
                    f.clickablemaphelper.setClickablemapRect(B, y, H);
                } else {
                    f.clickablemaphelper.setClickablemapRect(null, y, null);
                }
            }
            return B;
        },
        pageScrollDrag: function(x, A, D) {
            var w = this
              , z = w.options.screenWrapper
              , y = {
                left: h,
                top: h
            }
              , C = {
                x: h,
                y: h
            };
            y.left = x.pageX - A.x;
            y.top = x.pageY - A.y;
            C.x = x.pageX - D.x;
            C.y = x.pageY - D.y;
            w._removeCssClass(z, "transitions-base");
            w._addCssClass(z, "transitions-none");
            var B = w.getDragRevisionCoordinate(C);
            C = B.dist;
            w._setCssOffset(z[0], w._getCssValueAsInteger(z[0], "left") + C.x, w._getCssValueAsInteger(z[0], "top") + C.y);
        },
        setZoomIn: function(y, x) {
            var w = this
              , B = 1;
            for (var z = 0, A = w.zoomPoints.length; z < A; z++) {
                if (w.zoomScale > w.zoomPoints[w.zoomPoints.length - 1]) {
                    B = w.zoomPoints[w.zoomPoints.length - 1];
                    break;
                } else {
                    if (w.zoomScale <= w.zoomPoints[z]) {
                        B = w.zoomPoints[z];
                        break;
                    }
                }
            }
            return w._setZoom(B, y, x);
        },
        setZoomOut: function(y, x) {
            var w = this
              , A = 1;
            for (var z = w.zoomPoints.length - 1; z >= 0; z--) {
                if (w.zoomScale <= w.zoomPoints[0]) {
                    A = w.zoomPoints[0];
                    break;
                } else {
                    if (w.zoomScale >= w.zoomPoints[z]) {
                        A = w.zoomPoints[z];
                        break;
                    }
                }
            }
            return w._setZoom(A, y, x);
        },
        _setZoom: function(A, z, x) {
            var w = this
              , y = w.options.screenWrapper;
            w._delegates.screenWillBeginZooming();
            w.setScreenWrapperZoomScale(A);
            w.zoomScale = A;
            if (A === 1) {
                w._setCssOffset(y[0], y.offset().left, y.offset().top);
                w.zoomMode = false;
                w.duringAnimation = false;
            } else {
                w.zoomMode = true;
            }
            w._delegates.screenDidEndZooming();
            return false;
        },
        setScreenWrapperZoomScale: function(y) {
            var w = this
              , x = w.options.screenWrapper;
            w._removeCssClass(x, "transitions-none");
            w._addCssClass(x, "transitions-none");
            w._setCssScale(x[0], y);
            w._removeCssClass(x, "transitions-base");
        },
        changeMode: function() {
            var w = this;
            w.isChangingMode = true;
            if (w.komaMode) {
                w._fromChangeMode = i.TO_PAGE;
                w.cancelKomaMode();
                w.isChangingMode = false;
                if (f.porting.env.device.isSC01D && f.porting.env.os.isAndroid_3) {
                    setTimeout(function() {
                        w.reDrawCurrentScreenCanvas();
                    }, 100);
                }
            } else {
                w._fromChangeMode = i.TO_KOMA;
                w.executePrevKoma = false;
                if (f.porting.env.os.isAndroid_4_0 && !f.porting.env.browser.isChrome) {
                    w._setCssTranslate(w.options.screenWrapper[0], 0, 0);
                }
                setTimeout(function() {
                    w.setKomaMode();
                    w.isChangingMode = false;
                }, 100);
            }
        },
        setKomaMode: function() {
            var w = this
              , x = (w._currentKoma > 0) ? w._currentKoma : 1;
            w._delegates.viewerWillEnterKomaMode();
            if (w.options.komaWrapper.height() !== window.innerHeight + 1) {
                w.adjustmentWrapperSize(window.innerHeight);
            }
            w.changeLoadingState(false);
            w.komaMode = true;
            w.drawKoma(x);
            w._delegates.viewerDidEnterKomaMode();
            w._fromChangeMode = i.NEUTRAL;
        },
        cancelKomaMode: function() {
            var E = this, D, I, z, C, H, G, x = (E.options.komaImage.offset().left < 0) ? E.options.komaImage.offset().left : 0, y;
            var F = 0;
            var A = -1;
            if (E.komaMode === false) {
                E._fromChangeMode = i.NEUTRAL;
                return;
            }
            E._delegates.viewerWillLeaveKomaMode();
            E.komaMode = false;
            E.aos4Preserve3dMaster(false, false);
            if (!f.porting.env.browser.isChrome) {
                if (!f.porting.env.os.isAndroid_4_0_3 && !f.porting.env.os.isAndroid_4_0_4 && !f.porting.env.os.isAndroid_4_1 && !f.porting.env.os.isAndroid_4_2) {
                    E.setViewTransformStyle("preserve-3d");
                }
            }
            if (f.porting.env.os.isOS_5 || f.porting.env.os.isOS_6) {
                f("*").each(function() {
                    this.style[E.TRANSFORM_STYLE] = "flat";
                });
            }
            var w = (E._maskPageMap[E._currentPage - 1] === 1);
            var B = (E.isPortraitAndScrollDisc()) && E._sequentialPageData[E._currentPage - 1].spread && w;
            if (B) {
                if (!f.porting.env.browser.isChrome && f.porting.env.os.isAndroid_4_0) {
                    E.updateRender();
                }
            }
            if (w && E.isPortrait()) {
                D = E._sequentialPageData[E._currentPage - 1].pageXml.komas;
                C = E._sequentialPageData[E._currentPage - 1].pageXml.StepRectWidth;
                z = E.getCurrentScreen().outerWidth() / C;
                I = 0;
                H = 0;
                G = -(E.getCurrentScreen().outerWidth() - window.innerWidth);
                if (E.binding === l.LEFT) {
                    if (x < 0) {
                        x += E.options.komaImage.outerWidth() - window.innerWidth - I;
                    }
                }
                y = (x - D[E._currentKoma - 1].x) * z + H;
                if (E.binding === l.RIGHT && E._alignment === l.RIGHT && y > H) {
                    E._computedCurrentPage += 1;
                    E._alignment = l.LEFT;
                } else {
                    if (E.binding === l.RIGHT && E._alignment === l.LEFT && y < H) {
                        E._computedCurrentPage -= 1;
                        E._alignment = l.RIGHT;
                    } else {
                        if (E.binding === l.LEFT && E._alignment === l.LEFT && y < G) {
                            E._computedCurrentPage += 1;
                            E._alignment = l.RIGHT;
                        } else {
                            if (E.binding === l.LEFT && E._alignment === l.RIGHT && y > G) {
                                E._computedCurrentPage -= 1;
                                E._alignment = l.RIGHT;
                            }
                        }
                    }
                }
                if (y < G) {
                    y = G;
                }
            } else {
                y = 0;
            }
            E.displayKomaWrapper(false);
            E.displayScreenWrapper(true);
            E.setSpreadPageFront();
            E.komaScrollState = q.NONE;
            E.komaAnimation();
            E._setCssOffset(E.options.screenWrapper[0], y);
            if (E.isPortrait() && !E._sequentialPageData[E._currentPage - 1].spread) {
                E.updateRender();
            } else {
                if (E.isLandscape()) {
                    E.updateAllScreens();
                }
            }
            E._delegates.viewerDidLeaveKomaMode();
            E._fromChangeMode = i.NEUTRAL;
        },
        chooseNearestKoma: function(F, B) {
            var G = this, D = 1, H = G._getContentsDataIndex(), Y, U, M, z, O, Z, X, aa, E, A, y, R, J = [], W, S, Q = {
                id: 0,
                dist: 0
            }, I = false, T, w, x, P, N, L, K, V, C;
            if (G._scaling_mode) {
                D = G._scaling;
            }
            V = G.getCurrentScreenObj();
            if (G.isLandscape() && !G.isPageStepScrollMode()) {
                if (F >= window.innerWidth / 2) {
                    if (G._contentsData[H][1] && !G._contentsData[H][1].isBlank()) {
                        Y = G._contentsData[H][1];
                        C = V._canvasObj(1)._canvas;
                    } else {
                        Y = G._contentsData[H][0];
                        C = V._canvasObj(0)._canvas;
                    }
                } else {
                    if (G._contentsData[H][0] && !G._contentsData[H][0].isBlank()) {
                        Y = G._contentsData[H][0];
                        C = V._canvasObj(0)._canvas;
                    } else {
                        Y = G._contentsData[H][1];
                        C = V._canvasObj(1)._canvas;
                    }
                }
            } else {
                Y = G._sequentialPageData[H];
                C = V._canvasObj(0)._canvas;
            }
            Z = C.offset().left;
            aa = C.outerWidth();
            X = C.offset().top;
            E = C.outerHeight();
            U = Y.pageXml;
            M = U.komas;
            z = U.StepRectWidth + U.StepRectX;
            O = U.StepRectHeight + U.StepRectY;
            R = M;
            A = (F - Z) * (z / (aa * D));
            y = (B - X) * (O / (E * D));
            S = R.length;
            for (W = 0; W < S; W++) {
                if ((A >= R[W].x) && (A <= (R[W].x + R[W].width))) {
                    if ((y >= R[W].y) && (y <= (R[W].y + R[W].height))) {
                        J.push(R[W]);
                    }
                }
            }
            S = J.length;
            I = true;
            if (S <= 0) {
                I = false;
                S = R.length;
            }
            for (W = 0; W < S; W++) {
                T = 0;
                w = "";
                x = 0;
                if (I) {
                    P = (J[W].x + ((J[W].width / 2) | 0)) - A;
                    N = (J[W].y + ((J[W].height / 2) | 0)) - y;
                    x = Math.sqrt(P * P + N * N);
                    T = J[W].id;
                } else {
                    L = "";
                    K = "";
                    if (A < R[W].x) {
                        K = "L";
                    } else {
                        if (A > (R[W].x + R[W].width)) {
                            K = "R";
                        }
                    }
                    if (y < R[W].y) {
                        L = "T";
                    } else {
                        if (y > (R[W].y + R[W].height)) {
                            L = "B";
                        }
                    }
                    w = L + K;
                    switch (w) {
                    case "L":
                        x = R[W].x - A;
                        break;
                    case "R":
                        x = A - (R[W].x + R[W].width);
                        break;
                    case "T":
                        x = R[W].y - y;
                        break;
                    case "B":
                        x = y - (R[W].y + R[W].height);
                        break;
                    case "TL":
                        P = R[W].x - A;
                        N = R[W].y - y;
                        x = Math.sqrt(P * P + N * N);
                        break;
                    case "TR":
                        P = A - (R[W].x + R[W].width);
                        N = R[W].y - y;
                        x = Math.sqrt(P * P + N * N);
                        break;
                    case "BL":
                        P = R[W].x - A;
                        N = y - (R[W].y + R[W].height);
                        x = Math.sqrt(P * P + N * N);
                        break;
                    case "BR":
                        P = A - (R[W].x + R[W].width);
                        N = y - (R[W].y + R[W].height);
                        x = Math.sqrt(P * P + N * N);
                        break;
                    }
                    T = R[W].id;
                }
                if ((Q.id === 0) || (x < Q.dist)) {
                    Q.id = T;
                    Q.dist = x;
                }
            }
            if (Q.id !== 0) {
                G._currentKoma = Q.id;
                G._computedCurrentPage += (Y.index + 1) - G._currentPage;
                G._currentPage = Y.index + 1;
                return Q.id;
            }
            return 0;
        },
        drawKoma: function(H) {
            var E = this, D = E.getCurrentPage(), z = E._getContentsDataIndex(D), w, C, G, I;
            var F = 0;
            var B = -1;
            if (E.komaMode === false) {
                return false;
            }
            F = E._computedCurrentPage - 1;
            B = E.getPageFirstCharNumber(F);
            f.bookmark.setPageNumber(F, B);
            if (E.isLandscape() && !E.isViewTypeOfScroll()) {
                if (E._contentsData[z][0].index === D - 1) {
                    w = E._contentsData[z][0];
                    C = 0;
                } else {
                    w = E._contentsData[z][1];
                    C = 1;
                }
            } else {
                w = E._sequentialPageData[z];
                C = 0;
            }
            if (!w.pageXml) {
                return false;
            }
            if (w.pageXml.komas.length === 0) {
                E.cancelKomaMode();
                return false;
            }
            I = function() {
                var M = E.options.komaImage, K = M[0].getContext("2d"), N, J, L;
                if (f.porting.env.os.isAndroid_3 || f.porting.env.device.isF02E || f.porting.env.device.isIPad) {
                    M.hide();
                }
                if (H > w.pageXml.komas.length) {
                    H = w.pageXml.komas.length;
                }
                N = w.pageXml.komas[H - 1];
                J = w.pageXml.masks[H - 1];
                L = E.getCurrentScreenObj()._canvasObj(C)._canvas[0];
                M[0].width = N.width;
                M[0].height = N.height;
                if (f.porting.env.os.isAndroid_6 && !f.porting.env.browser.isAndroidChrome) {
                    E.reDrawCurrentScreen();
                }
                E.clipKomaImage(M[0], L, N, J);
                E._setCssRect(M[0], null, null, N.width, N.height);
                E.komaFitToScreen(M);
                E._currentKoma = H;
                E.changeLoadingState(false);
                if (E.isVisibleAcceptable()) {
                    if (f.porting.env.repair.isDialogCollapsesSOL23) {
                        if (appview.manager.isOpenedPanels() == false) {
                            E.controlKomaView(true);
                        }
                    } else {
                        E.controlKomaView(true);
                    }
                }
                E.duringAnimation = false;
                E.displayScreenWrapper(false);
                if (f.porting.env.os.isAndroid_3 || f.porting.env.device.isF02E || f.porting.env.device.isIPad) {
                    setTimeout(function() {
                        M.show();
                    }, 0);
                }
                if (!f.porting.env.device.isF10D && !f.porting.env.os.isAndroid_5 && !f.porting.env.os.isAndroid_6 && !f.porting.env.os.isAndroid_7) {
                    setTimeout(function() {
                        E.reDrawCurrentKoma();
                    }, 250);
                }
                if (f.porting.env.device.isCRRL09 && !f.porting.env.browser.isAndroidChrome && !f.porting.env.browser.isFirefox && !f.porting.env.browser.isOpera) {
                    var O = document.createElement("iframe");
                    M[0].appendChild(O);
                    setTimeout(function() {
                        M[0].removeChild(O);
                    }, 0);
                }
            }
            ;
            for (var A = 0, x = E._hasLoadFunctionIndex.length; A < x; A++) {
                var y = E._hasLoadFunctionIndex[A];
                E._sequentialPageData[y].loadFunction = null;
            }
            E._hasLoadFunctionIndex.length = 0;
            if (!E.isRetryDialogShowing) {
                I();
                E.isChanging = false;
            }
        },
        clipKomaImage: function(A, G, D, M) {
            var J = this, B = {
                x: D.x,
                y: D.y,
                width: D.width,
                height: D.height
            }, N = A.getContext("2d"), F = 0, C = M.length, L, K, H = 0, E = 0, z, w;
            N.beginPath();
            for (F = 0; F < C; F++) {
                L = M[F].x - B.x;
                K = M[F].y - B.y;
                if (F === 0) {
                    N.moveTo(L, K);
                } else {
                    N.lineTo(L, K);
                }
            }
            N.closePath();
            if (f.porting.env.device.isP04D && f.porting.env.browser.isChrome) {
                N.clip();
            } else {
                N.fillStyle = "rgba(0,0,0,1)";
                N.fill();
                N.globalCompositeOperation = "source-atop";
            }
            if (B.x < 0) {
                H = B.x;
                B.x = 0;
                B.width += H;
            }
            if (B.y < 0) {
                E = B.y;
                B.y = 0;
                B.height += E;
            }
            if ((B.x + B.width) > G.width) {
                B.width = G.width - B.x;
            }
            if ((B.y + B.height) > G.height) {
                B.height = G.height - B.y;
            }
            z = Math.abs(H);
            w = Math.abs(E);
            try {
                N.drawImage(G, B.x, B.y, B.width, B.height, z, w, B.width, B.height);
            } catch (I) {}
        },
        calcViewSize: function() {
            var w = this;
            var y = (w._viewWidth < window.innerWidth) ? window.innerWidth : w._viewWidth;
            var x = (w._viewHeight < window.innerHeight) ? window.innerHeight : w._viewHeight;
            return {
                width: y,
                height: x
            };
        },
        calcKomaBaseSizeWith: function(B) {
            var w = this;
            var A = 2;
            var y = 0;
            var x = 0;
            var z = 1;
            if (w.isPortrait()) {
                y = w.contentFrameWidth / A;
                x = w.contentFrameHeight / A;
            } else {
                y = w.contentFrameHeight / A;
                x = w.contentFrameWidth / A;
            }
            if (B.width / y < B.height / x) {
                z = B.width / y;
            } else {
                z = B.height / x;
            }
            return {
                width: y,
                height: x,
                scale: z
            };
        },
        calcKomaDrawSizeWith: function(y) {
            var w = (y.width * y.scale) | 0;
            var x = (y.height * y.scale) | 0;
            return {
                width: w,
                height: x
            };
        },
        komaFitToScreen: function(x) {
            var H = this
              , K = H._sequentialPageData[H.getCurrentPage() - 1]
              , G = K.pageXml.komas[H._currentKoma - 1]
              , I = H.calcViewSize()
              , L = H.calcKomaBaseSizeWith(I)
              , F = H.calcKomaDrawSizeWith(L)
              , z = L.width * H.KOMA_FIT_COEFFICIENT
              , M = L.height * H.KOMA_FIT_COEFFICIENT
              , E = 1
              , w = 1
              , C = 1;
            var J = function(P, N) {
                var O = ((P - N) / 2) | 0;
                return (0 < O) ? O : 0;
            };
            var B = J(I.width, F.width);
            var A = J(I.height, F.height);
            var y = x.width();
            var D = x.height();
            if (y > z && D > M) {
                C = (y / D > F.width / F.height) ? y / F.width : D / F.height;
                y /= C;
                D /= C;
                B += (F.width - y) / 2;
                A += (F.height - D) / 2;
                H.komaScrollDir = e.NONE;
                H.komaScrollState = q.NONE;
                H.komaScrollTimes = 0;
                H.komaScrollCount = 0;
                H._setCssRect(x[0], B, A, y, D);
                return;
            }
            if (y > z && D > L.height && D <= M) {
                C = D / F.height;
                y /= C;
                D /= C;
                if (G && G.kScrollCode === p.AUTO) {
                    if (H.binding === l.RIGHT) {
                        if (H.executePrevKoma) {
                            B += 0;
                        } else {
                            B += (F.width - y);
                        }
                    } else {
                        if (H.executePrevKoma) {
                            B += (F.width - y);
                        } else {
                            B += 0;
                        }
                    }
                } else {
                    if (G && G.kScrollCode === p.LEFT_TO_RIGHT) {
                        if (H.executePrevKoma) {
                            B += (F.width - y);
                        } else {
                            B += 0;
                        }
                    } else {
                        if (G && G.kScrollCode === p.RIGHT_TO_LEFT) {
                            if (H.executePrevKoma) {
                                B = 0;
                            } else {
                                B += (F.width - y);
                            }
                        }
                    }
                }
                H.komaScrollDir = e.HORIZONTAL;
                H.komaScrollTimes = ((y / F.width) | 0);
                if (H.executePrevKoma) {
                    H.komaScrollCount = H.komaScrollTimes;
                } else {
                    H.komaScrollCount = 0;
                }
                A += (F.height - D) / 2;
                H._setCssRect(x[0], B, A, y, D);
                if (H.executePrevKoma) {
                    H.komaScrollState = q.NONE;
                } else {
                    H.komaScrollState = q.STANDBY;
                }
                return;
            }
            if (y > z) {
                y *= L.scale;
                D *= L.scale;
                if (G && G.kScrollCode === p.AUTO) {
                    if (H.binding === l.RIGHT) {
                        if (H.executePrevKoma) {
                            B += 0;
                        } else {
                            B += (F.width - y);
                        }
                    } else {
                        if (H.executePrevKoma) {
                            B += (F.width - y);
                        } else {
                            B += 0;
                        }
                    }
                } else {
                    if (G && G.kScrollCode === p.LEFT_TO_RIGHT) {
                        if (H.executePrevKoma) {
                            B += (F.width - y);
                        } else {
                            B += 0;
                        }
                    } else {
                        if (G && G.kScrollCode === p.RIGHT_TO_LEFT) {
                            if (H.executePrevKoma) {
                                B += 0;
                            } else {
                                B += (F.width - y);
                            }
                        }
                    }
                }
                H.komaScrollDir = e.HORIZONTAL;
                H.komaScrollTimes = ((y / F.width) | 0);
                if (H.executePrevKoma) {
                    H.komaScrollCount = H.komaScrollTimes;
                } else {
                    H.komaScrollCount = 0;
                }
                A += (F.height - D) / 2;
                H._setCssRect(x[0], B, A, y, D);
                if (H.executePrevKoma) {
                    H.komaScrollState = q.NONE;
                } else {
                    H.komaScrollState = q.STANDBY;
                }
                return;
            }
            if (D > M && y > L.width && y <= z) {
                C = y / F.width;
                y /= C;
                D /= C;
                if (G && G.kScrollCode === p.BOTTOM_TO_TOP) {
                    if (H.executePrevKoma) {
                        A += 0;
                    } else {
                        A += F.height - D;
                    }
                } else {
                    if (H.executePrevKoma) {
                        A += F.height - D;
                    } else {
                        A += 0;
                    }
                }
                B += 0;
                H._setCssRect(x[0], B, A, y, D);
                H.komaScrollDir = e.VERTICAL;
                H.komaScrollTimes = ((D / F.height) | 0);
                if (H.executePrevKoma) {
                    H.komaScrollCount = H.komaScrollTimes;
                } else {
                    H.komaScrollCount = 0;
                }
                if (H.executePrevKoma) {
                    H.komaScrollState = q.NONE;
                } else {
                    H.komaScrollState = q.STANDBY;
                }
                return;
            }
            if (D > M) {
                y *= L.scale;
                D *= L.scale;
                if (G && G.kScrollCode === p.BOTTOM_TO_TOP) {
                    if (H.executePrevKoma) {
                        A += 0;
                    } else {
                        A += (F.height - D);
                    }
                } else {
                    if (H.executePrevKoma) {
                        A += (F.height - D);
                    } else {
                        A += 0;
                    }
                }
                B += (F.width - y) / 2;
                H._setCssRect(x[0], B, A, y, D);
                H.komaScrollDir = e.VERTICAL;
                H.komaScrollTimes = ((D / F.height) | 0);
                if (H.executePrevKoma) {
                    H.komaScrollCount = H.komaScrollTimes;
                } else {
                    H.komaScrollCount = 0;
                }
                if (H.executePrevKoma) {
                    H.komaScrollState = q.NONE;
                } else {
                    H.komaScrollState = q.STANDBY;
                }
                return;
            }
            if ((D > L.height && D <= M) || (y > L.width && y <= z)) {
                E = y / F.width;
                w = D / F.height;
                C = (E > w) ? E : w;
                y /= C;
                D /= C;
                B += (F.width - y) / 2;
                A += (F.height - D) / 2;
                H._setCssRect(x[0], B, A, y, D);
                H.komaScrollDir = e.NONE;
                H.komaScrollState = q.NONE;
                H.komaScrollTimes = 0;
                H.komaScrollCount = 0;
                return;
            }
            if (y <= L.width && D <= L.height) {
                y *= L.scale;
                D *= L.scale;
                B += (F.width - y) / 2;
                A += (F.height - D) / 2;
                H._setCssRect(x[0], B, A, y, D);
                H.komaScrollDir = e.NONE;
                H.komaScrollState = q.NONE;
                H.komaScrollTimes = 0;
                H.komaScrollCount = 0;
                return;
            }
        },
        komaAnimation: function(E) {
            var C = this
              , x = C.options.komaImage
              , F = C._sequentialPageData[C.getCurrentPage() - 1]
              , B = null
              , z = C.calcKomaDrawSizeWith(C.calcKomaBaseSizeWith(C.calcViewSize()))
              , w = C.komaScrollTimes
              , D = x.width() - z.width
              , A = z.height - x.height();
            if (!F.pageXml || C.isChanging || C._updateRenderFlag || C._komaScrollFlag) {
                return;
            }
            B = F.pageXml.komas[C._currentKoma - 1];
            C.executePrevKoma = false;
            if (typeof E !== "boolean") {
                E = true;
            }
            if (E) {
                D = D;
                A = A;
                C.komaScrollCount++;
            } else {
                D = -D;
                A = -A;
                C.komaScrollCount--;
            }
            var y = function(H, G) {
                var I = function() {
                    C._removeCssClass(x, "transitions-base");
                    C._addCssClass(x, "transitions-none");
                    C._setCssTransformOrigin(x[0], 0, 0);
                    C._setCssOffset(x[0], x.offset().left, x.offset().top);
                    C._setCssTranslate(x[0], 0, 0);
                    C._komaScrollFlag = false;
                };
                C._removeCssClass(x, "transitions-none");
                C._addCssClass(x, "transitions-base");
                C._setCssTransformOrigin(x[0], 0, 0);
                if (f.porting.env.device.isSC02G) {
                    setTimeout(function() {
                        C._setCssTranslate(x[0], H / w, G / w);
                    }, 150);
                } else {
                    C._setCssTranslate(x[0], H / w, G / w);
                }
                x.one(C.TRANSITION_END, I);
            };
            C._komaScrollFlag = false;
            if (C.komaScrollState === q.STANDBY) {
                C._removeCssClass(x, "transitions-base");
                C.komaScrollState = q.RUNNING;
                C._komaScrollFlag = true;
                switch (C.komaScrollDir) {
                case e.HORIZONTAL:
                    if (B.kScrollCode === p.AUTO) {
                        if (C.binding === l.RIGHT) {
                            y(D, 0);
                        } else {
                            y(-D, 0);
                        }
                    } else {
                        if (B.kScrollCode === p.LEFT_TO_RIGHT) {
                            y(-D, 0);
                        } else {
                            y(D, 0);
                        }
                    }
                    break;
                case e.VERTICAL:
                    if (B.kScrollCode === p.BOTTOM_TO_TOP) {
                        y(0, -A);
                    } else {
                        y(0, A);
                    }
                    break;
                }
                if (C.komaScrollCount >= w) {
                    C.komaScrollState = q.NONE;
                } else {
                    if (C.komaScrollCount <= 0) {
                        C.komaScrollState = q.STANDBY;
                    } else {
                        C.komaScrollState = q.RUNNING;
                    }
                }
            } else {
                if (C.komaScrollState === q.RUNNING) {
                    C.komaScrollState = q.NONE;
                }
                x.stop();
                C._komaScrollFlag = false;
            }
        },
        updateKomaImage: function() {
            var w = this, y, z, x = w.getCurrentScreenObj();
            y = w._getContentsDataIndex();
            if (w.isLandscape() && !w.isViewTypeOfScroll()) {
                y = w._spreadCurrentPage - 1;
                z = w._contentsData[y];
            } else {
                z = [w._sequentialPageData[y]];
            }
            w.drawScreen(z, x, 0);
            w.updateRender();
        },
        nextKoma: function() {
            var x = this, z = x._sequentialPageData[x._currentPage - 1], C = false, B, y, A = x._computedCurrentPage;
            if (x.isChanging) {
                return;
            }
            if (x.komaMode === false) {
                return;
            }
            x.isChanging = true;
            x.executePrevKoma = false;
            if (!z.pageXml) {
                x.isChanging = false;
                return;
            }
            if (z.pageXml.komas.length === 0 || z.pageXml.komas.length === x._currentKoma) {
                if (x._computedIndexMap[x._computedCurrentPage - 1] === x._computedIndexMap[A]) {
                    A += 1;
                }
                B = x.getNextPageIndex(x._computedIndexMap[A]);
                if ((B !== -1) && (B <= (x._totalPage - 1))) {
                    var w = x._pageToComputedPageIndexMap[B];
                    x.aos4Preserve3dMaster(false, false);
                    x.changeLoadingState(true);
                    x._currentKoma = 1;
                    y = x._sequentialPageData[B];
                    x.checkPageDataAndJump(y.index, w, 0, 999, false);
                    return;
                }
            } else {
                x._currentKoma++;
                C = true;
            }
            if (C) {
                x.komaScrollState = q.NONE;
                if (((f.porting.env.device.isSC01D && f.porting.env.os.isAndroid_3) || f.porting.env.device.isSC02D) && !f.porting.env.browser.isChrome) {
                    setTimeout(function() {
                        x.drawKoma(x._currentKoma);
                        x.isChanging = false;
                    }, 0);
                } else {
                    x.drawKoma(x._currentKoma);
                }
            } else {
                if (f.porting.env.device.isGalaxyNexus && f.porting.env.os.isAndroid_4_0 && !f.porting.env.browser.isChrome) {
                    x.setViewTransformStyle("flat");
                }
                x.displayKomaWrapper(false);
                x.openFinishDialog();
            }
            x.isChanging = false;
            x._isExecLoadingTheFuture = true;
            if (f.porting.env.os.isAndroid_6 && !f.porting.env.browser.isAndroidChrome) {
                x.updateKomaImage();
            }
        },
        prevKoma: function() {
            var D = this, C = D._sequentialPageData[D._currentPage - 1], B = -1, w, x = D._computedCurrentPage - 2;
            if (!D.komaMode || D.isChanging || !C.pageXml) {
                return;
            }
            if ((C.pageXml.komas.length === 0) || (D._currentKoma === 1)) {
                if (D._computedIndexMap[D._computedCurrentPage - 1] === D._computedIndexMap[x]) {
                    x -= 1;
                }
                B = D.getPrevPageIndex(D._computedIndexMap[x]);
                if (B === -1) {
                    return;
                }
                if (f.trialhelper.isTrialMode()) {
                    var E = f.trialhelper.getTrialFirstPageIndex();
                    if (B < E) {
                        return;
                    }
                }
            }
            D.isChanging = true;
            if ((C.pageXml.komas.length === 0) || (D._currentKoma === 1)) {
                if (B !== -1) {
                    var y = D._pageToComputedPageIndexMap[B];
                    D.aos4Preserve3dMaster(false, false);
                    D.changeLoadingState(true);
                    w = D._sequentialPageData[B];
                    var z = function() {
                        D._currentKoma = w.pageXml.komas.length;
                        D._spreadCurrentPage = D._spreadIndexMap[B] + 1;
                        var G = D._pageToComputedPageIndexMap[B] + (w.spread ? 2 : 1);
                        D.setComputedCurrentPage(G, false);
                    };
                    var F = function() {
                        if (B < 0) {
                            D.executePrevKoma = false;
                        } else {
                            D.executePrevKoma = true;
                        }
                    };
                    if (!w.pageXml) {
                        var A = function() {
                            if (w.pageXml.komas.length > 0) {
                                z();
                                F();
                            }
                        };
                        D.checkPageDataAndJump(w.index, y, 0, 999, false, A);
                        return;
                    } else {
                        if (w.pageXml.komas.length > 0) {
                            z();
                            F();
                            return;
                        }
                    }
                }
            } else {
                D._currentKoma--;
                D.executePrevKoma = true;
            }
            D.komaScrollState = q.NONE;
            if (((f.porting.env.device.isSC01D && f.porting.env.os.isAndroid_3) || f.porting.env.device.isSC02D) && !f.porting.env.browser.isChrome) {
                setTimeout(function() {
                    D.drawKoma(D._currentKoma);
                    D.isChanging = false;
                }, 0);
            } else {
                D.drawKoma(D._currentKoma);
                D.isChanging = false;
            }
            D._isExecLoadingTheFuture = true;
            if (f.porting.env.os.isAndroid_6 && !f.porting.env.browser.isAndroidChrome) {
                D.updateKomaImage();
            }
        },
        checkKomaData: function(w) {
            if (typeof w !== "object") {
                return false;
            } else {
                if (!w.pageXml) {
                    return false;
                } else {
                    if (!w.pageXml.komas) {
                        return false;
                    } else {
                        if (w.pageXml.komas.length < 1) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }
        },
        getNextPageIndex: function(y) {
            var x = this;
            var w = -1;
            if (x.komaMode) {
                for (var z = y, A = x._maskPageMap.length; z < A; z++) {
                    if (x._maskPageMap[z] > 0) {
                        w = z;
                        break;
                    }
                }
            }
            return w;
        },
        getPrevPageIndex: function(y) {
            var x = this;
            var w = -1;
            if (x.komaMode && (x._maskPageMap.length > 0)) {
                for (var z = y; z >= 0; z--) {
                    if (x._maskPageMap[z] > 0) {
                        w = z;
                        break;
                    }
                }
            }
            return w;
        },
        isLandscape: function() {
            var w = this;
            var x = w._viewWidth > w._viewHeight;
            if (w.options.fixSpreadPageMode) {
                if (w._fix_spread_page_mode) {
                    x = true;
                }
            }
            return x;
        },
        isPortrait: function() {
            var w = this;
            return !w.isLandscape();
        },
        hideAddressBarByTouch: function(w) {
            if (w.pageY) {
                if (w.pageY < this.CURSOR_HIDE_ADDRESS_BAR_HEIGHT) {
                    this.hideAddressBar(function() {
                        var x = appview.manager.getEventReceiver();
                        x.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_STAGE_SIZE);
                    });
                }
            }
        },
        hideAddressBar: function(y) {
            var w = this;
            var x = f.Deferred();
            x.done(function() {
                var z = 0;
                if (w.isPortrait()) {
                    z = w.portraitMaxHeight;
                } else {
                    z = w.landscapeMaxHeight;
                }
                if (z !== window.innerHeight) {
                    w.adjustmentHeight = true;
                }
                if (!f.porting.env.device.isDesktopPC && w.adjustmentHeight) {
                    if (!f.porting.env.os.isOS_4) {
                        f("div#viewer").css({
                            "min-height": "140%",
                            height: "140%"
                        });
                    }
                }
                x.resolve();
            }).done(function() {
                setTimeout(function() {
                    if (w.BODY_SCROLL_TOP !== false) {
                        window.scrollTo(0, (w.BODY_SCROLL_TOP === 1) ? 0 : 1);
                    }
                    x.resolve();
                }, 200);
            }).done(function() {
                setTimeout(function() {
                    if (!f.porting.env.device.isDesktopPC && w.adjustmentHeight) {
                        if (!f.porting.env.os.isOS_4) {
                            f("div#viewer").css("min-height", "100%").css("height", "100%");
                        }
                    }
                    w.adjustmentHeight = false;
                    x.resolve();
                }, 500);
            }).done(function() {
                setTimeout(function() {
                    if (y) {
                        y();
                    }
                    x.resolve();
                }, 100);
            }).resolve();
        },
        controlZoomButton: function() {
            var w = appview.manager.getEventReceiver();
            w.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_UPDATE_ZOOM);
        },
        getZoomDatas: function() {
            var y = {};
            y.zoom_scale = this.zoomScale;
            y.is_use = true;
            y.range_min = this.zoomPoints[0];
            y.range_max = this.zoomPoints[this.zoomPoints.length - 1];
            y.range_step = (this.zoomPoints[this.zoomPoints.length - 1] - this.zoomPoints[0]) / (this.zoomPoints.length - 1);
            y.is_expansion = true;
            y.is_reduction = true;
            if (this.komaMode || this.isPageStepScrollMode()) {
                y.is_use = false;
            }
            if (this.zoomScale === this.zoomPoints[this.zoomPoints.length - 1]) {
                y.is_expansion = false;
            }
            if (this.isLandscape()) {
                if (this.zoomScale <= 1) {
                    y.is_reduction = false;
                }
            } else {
                var x = 1;
                var w = this._sequentialPageData[this._currentPage - 1];
                if (typeof w == "object" && w.hasOwnProperty("spread") && w.spread) {
                    x = this.zoomPoints[0];
                }
                if (this.zoomScale <= x) {
                    y.is_reduction = false;
                }
            }
            return y;
        },
        expansionZoomRangeStep: function() {
            this.changeZoomRangeStep(1);
        },
        reductionZoomRangeStep: function() {
            this.changeZoomRangeStep(-1);
        },
        changeZoomRangeStep: function(B) {
            var D = this;
            var E = 1;
            if (B !== -1) {
                B = 1;
            }
            D.preserve3dMaster(false);
            D.aos4Preserve3dMaster(true, false);
            var z = D.getZoomPointsIndexNear(D.zoomScale);
            var y = z + B;
            var A = this.zoomPoints.length - 1;
            y = Math.max(0, Math.min(A, y));
            E = this.zoomPoints[y];
            if (f.porting.env.device.isDesktopPC && D.zoomScale === E) {
                var C = D.zoomPoints.indexOf(E) + B;
                E = D.zoomPoints[C];
            }
            var x = D.getZoomCoordinate(E);
            var w = x.x;
            var F = x.y;
            D._setCssScale(D.options.screenWrapper[0], E);
            D._setCssOffset(D.options.screenWrapper[0], w, F);
            D.zoomScale = E;
            if (B === 1) {
                D.setZoomIn(x.x, x.y);
            } else {
                D.setZoomOut(x.x, x.y);
            }
            D.controlZoomButton();
            D.aos4Preserve3dMaster(false, false);
        },
        getZoomPointsIndexNear: function(B) {
            var A = 0;
            var y = 0;
            var x = 0;
            var z = 0;
            var w = this.zoomPoints.length;
            for (z = 0; z < w; z++) {
                y = this.zoomPoints[z];
                x = this.zoomPoints[z + 1];
                if (x == null) {
                    A = z;
                } else {
                    if (B < (y + x) / 2) {
                        A = z;
                        break;
                    }
                }
            }
            return A;
        },
        _finishReadContents: function() {
            this.changeLoadingState(false);
            f.infomessage.removeDialogMessage();
            this.onMouseMoveScreenCursorChange(null);
            this._openPostScriptPage();
        },
        _openIntroductionPage: function() {
            var w = appview.manager.getEventReceiver();
            w.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_OPEN_INTRODUCTION_PAGE);
        },
        _openPostScriptPage: function() {
            var w = appview.manager.getEventReceiver();
            w.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_OPEN_POSTSCRIPT_PAGE);
        },
        openRetryDialog: function(w) {
            this.isRetryDialogShowing = true;
            this.openDialog(w);
        },
        closeRetryDialog: function(w) {
            this.isRetryDialogShowing = false;
            this.changeLoadingState(true);
            this.closeDialog(w);
        },
        openFinishDialog: function() {
            if (appview.manager.isUseView(appview.constants.ID_COLOPHON_PANEL)) {
                this.openPanel(appview.constants.ID_COLOPHON_PANEL);
            } else {
                this.openPanel(appview.constants.ID_READ_FINISH_PANEL);
            }
        },
        closeFinishDialog: function() {
            if (appview.manager.isUseView(appview.constants.ID_COLOPHON_PANEL)) {
                this.closePanel(appview.constants.ID_COLOPHON_PANEL);
            } else {
                this.closePanel(appview.constants.ID_READ_FINISH_PANEL);
            }
        },
        openDialog: function(w) {
            this.showingAlert = w;
            this.openGUILayer(w);
        },
        closeDialog: function(w) {
            this.showingAlert = null;
            this.closeGUILayer(w);
        },
        openPanel: function(w) {
            this.showingDialog = w;
            this.openGUILayer(w);
        },
        closePanel: function(w) {
            this.showingDialog = null;
            this.closeGUILayer(w);
        },
        openGUILayer: function(x) {
            var w = this;
            w.changeLoadingState(false);
            appview.manager.openPanel(x);
            f.infomessage.removeDialogMessage();
            w.onMouseMoveScreenCursorChange(null);
        },
        closeGUILayer: function(w) {
            appview.manager.closePanel(w);
        },
        getTitle: function(x) {
            var w = '#meta input[name="t' + x + '"]';
            var y = f(w).val();
            if ((typeof y) != "string") {
                y = "";
            }
            return y;
        },
        getMessage: function(y) {
            var w = '#meta input[name="m' + y + '"]'
              , x = f(w).val();
            if (x) {
                x = x.replace(/\\n/g, "<br />\n");
            } else {
                x = "";
            }
            return x;
        },
        checkDrawingPage: function(B) {
            var C = this, z = 0, y = 0, w = 0, F, E, x, G, D = [];
            if (C.isLandscape()) {
                F = C._spreadIndexMap[C._currentPage - 1];
                var A = C._contentsData[F];
                for (y = 0,
                w = A.length; y < w; y++) {
                    if (!A[y].isBlank()) {
                        D.push(A[y].index);
                    }
                }
            } else {
                F = C._currentPage - 1;
                D.push(F);
            }
            if (f.inArray(B, D) !== -1) {
                return true;
            } else {
                return false;
            }
        },
        calcCanvasSize: function(B, C) {
            var x = this
              , A = window.innerWidth / window.innerHeight
              , z = B / C
              , y = 0
              , w = 0;
            if (x.isPortrait()) {
                if (z < A) {
                    w = window.innerHeight;
                    y = w * z;
                } else {
                    y = window.innerWidth;
                    w = y * (C / x.contentFrameWidth);
                }
            } else {
                if (z < A / 2) {
                    w = window.innerHeight;
                    y = w * z;
                } else {
                    y = window.innerWidth / 2;
                    w = y * (C / x.contentFrameWidth);
                }
            }
            return {
                width: (y | 0),
                height: (w | 0)
            };
        },
        setZoomPoints: function() {
            var w = this, A, z;
            if (w._currentPage >= 1 && w._currentPage <= w._totalPage && w._sequentialPageData[w._currentPage - 1].spread && w.isPortrait() && w._alignment !== l.CENTER) {
                A = (((window.innerWidth / w.getCurrentScreen().outerWidth()) * 1000) | 0) / 1000;
                z = ((((window.innerWidth / w.getCurrentScreen().outerWidth() + 1) / 2) * 1000) | 0) / 1000;
                if (w.zoomPoints[0] >= 1) {
                    if (w.zoomPoints[0] > z && f.inArray(z, w.zoomPoints) === -1) {
                        w.zoomPoints.unshift(z);
                    }
                    if (w.zoomPoints[0] > A && f.inArray(A, w.zoomPoints) === -1) {
                        w.zoomPoints.unshift(A);
                    }
                } else {
                    w.zoomPoints[0] = A;
                    if (w.zoomPoints[1] < 1) {
                        w.zoomPoints[1] = z;
                    }
                }
            } else {
                if (w.zoomPoints[0] < 1) {
                    w.zoomPoints.splice(0, 2);
                }
                for (var x = 0, y = w.zoomPoints.length; x < y; x++) {
                    if (w.zoomPoints[x] < 1) {
                        w.zoomPoints.splice(x, 1);
                        x--;
                    }
                }
            }
        },
        getLatestZoomScale: function(y, x, z) {
            var w = this
              , A = y * (x / z);
            if (A > w.zoomPoints[w.zoomPoints.length - 1]) {
                A = w.zoomPoints[w.zoomPoints.length - 1];
            } else {
                if (A < w.zoomPoints[0]) {
                    A = w.zoomPoints[0];
                }
            }
            A = w.getSmoothScale(A);
            return A;
        },
        getSmoothScale: function(x) {
            var w = x * 1000;
            w = (w | 0);
            w = w / 1000;
            return w;
        },
        hideSecondCanvas: function() {
            var w = this;
            var x = w.getCurrentScreenObj();
            if (w.isLandscape() && !w.isPageStepScrollMode()) {
                if (!w.checkFirstCanvasSpread(x)) {
                    w.displaySecondCanvas(true);
                }
            } else {
                w.displaySecondCanvas(false);
            }
            w.changeLoadingState(false);
        },
        displaySecondCanvas: function(x) {
            var w = this;
            var y = w.getCurrentScreenObj();
            x = x && (y._canvasObj(0)._canvas.css("visibility") === "visible");
            w._setVisibility(y._canvasObj(1)._canvas, x);
        },
        isVisibleAcceptable: function() {
            var w = true;
            return w;
        },
        displayKomaImage: function(x) {
            var w = this;
            w._setVisibility(w.options.komaImage, x);
        },
        controlKomaView: function(w) {
            if (this.komaMode) {
                if (w) {
                    this.displayKomaWrapper(true);
                } else {
                    this.displayKomaWrapper(false);
                }
            }
        },
        controlWrapperView: function(w) {
            if (this.komaMode) {
                this.controlKomaView(w);
            } else {
                if (w) {
                    this.displayScreenWrapper(true);
                    this.nodokageLayout();
                } else {
                    this.displayScreenWrapper(false);
                }
            }
        },
        controlContentsView: function(w) {
            var x = (w) ? "block" : "none";
            f("#contents").css({
                display: x
            });
            if (w) {
                this.aos4Preserve3dMaster(false, true);
                this.nodokageLayout();
            }
        },
        controlTransitionVisibility: function(w) {
            if (f.porting.env.os.isAndroid_3_2 && this.isPortraitAndScrollDisc()) {
                if (this.isLongWidthSpread(this._getContentsDataIndex())) {
                    this.controlWrapperView(w);
                }
            }
        },
        displayScreenWrapper: function(x) {
            var w = this;
            if (!w.SPREAD_SWITCHING_SYSTEM) {
                if (f.porting.env.device.isF04E || f.porting.env.device.isF05E) {
                    var y = w.getCurrentScreenObj();
                    if (y) {
                        w._setVisibility(y._canvasObj(0)._canvas, x);
                        if (!x) {
                            w.displaySecondCanvas(x);
                        } else {
                            if (w.isPageMode() && !w.checkFirstCanvasSpread(y)) {
                                w.displaySecondCanvas(x);
                            }
                        }
                    }
                }
            }
            if (f.porting.env.device.isSonyTabletP || f.porting.env.device.isF10D || f.porting.env.device.isISW13F || f.porting.env.repair.isDialogCollapsesSOL23) {
                if (x) {
                    w.options.screenWrapper.show();
                } else {
                    w.options.screenWrapper.hide();
                }
            } else {
                w._setVisibility(w.options.screenWrapper, x);
            }
        },
        displayKomaWrapper: function(x) {
            var w = this;
            w.displayKomaImage(x);
            if (f.porting.env.device.isSonyTabletP || f.porting.env.device.isF10D || f.porting.env.device.isISW13F || f.porting.env.repair.isDialogCollapsesSOL23) {
                if (x) {
                    w.options.komaWrapper.show();
                } else {
                    w.options.komaWrapper.hide();
                }
            } else {
                w._setVisibility(w.options.komaWrapper, x);
            }
        },
        _setVisibility: function(x, w) {
            var y = (w ? "visible" : "hidden");
            x.css({
                visibility: y
            });
        },
        checkFirstCanvasSpread: function(x) {
            var w = this;
            var z = x._canvasObj(0)._index;
            if (z === v) {
                return false;
            }
            var y = w._sequentialPageData[z];
            if (!y.spread) {
                return false;
            }
            return true;
        },
        adjustmentWrapperSize: function(x) {
            var w = this;
            var y = window.innerHeight;
            if (!x) {
                x = y;
            }
            w.options.komaWrapper.height(x + 1);
        },
        checkImageLoaded: function(x) {
            var w = this;
            if (x >= w._totalPage || x < 0) {
                return true;
            }
            var B = true;
            if (w.isInitializeAndLoadingFinished()) {
                if (w.isPortraitAndScrollDisc() || w.komaMode) {
                    B = false;
                }
            }
            if (B) {
                var A = 0;
                var y = w._getTargetPagesIndexArray(x);
                var z = 0;
                var C = y.length;
                for (z = 0; z < C; z++) {
                    if (f.inArray(y[z], w._loadedPageImageIndex) !== -1) {
                        A++;
                    }
                }
                if (A === y.length) {
                    return true;
                }
            } else {
                if (f.inArray(x, w._loadedPageImageIndex) !== -1) {
                    return true;
                }
            }
            return false;
        },
        checkImageLoading: function(x) {
            var w = this;
            if (x >= w._totalPage || x < 0) {
                return true;
            }
            var B = true;
            if (w.isInitializeAndLoadingFinished()) {
                if (w.isPortraitAndScrollDisc() || w.komaMode) {
                    B = false;
                }
            }
            if (B) {
                var A = 0;
                var y = w._getTargetPagesIndexArray(x);
                for (var z = 0, C = y.length; z < C; z++) {
                    if (f.inArray(y[z], w._loadingImageFlags) !== -1) {
                        A++;
                    }
                }
                if (A !== 0) {
                    return true;
                }
            } else {
                if (f.inArray(x, w._loadingImageFlags) !== -1) {
                    return true;
                }
            }
            return false;
        },
        makeTranslateValue: function(A, z) {
            var x = function(C, B) {
                return "matrix(1, 0, 0, 1, " + C + ", " + B + ")";
            };
            var y = function(C, B) {
                return "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, " + C + ", " + B + ", 0, 1)";
            };
            var w = this;
            A = A | 0;
            z = z | 0;
            if (f.porting.env.os.isAndroid && !f.porting.env.os.isAndroid_3 && !f.porting.env.os.isAndroid_4) {
                if (w.komaMode) {
                    return "translate3d(" + A + "px, " + z + "px, 0px)";
                } else {
                    return "translate(" + A + "px, " + z + "px) translateZ(0px)";
                }
            } else {
                if (f.porting.env.browser.isMSIE || f.porting.env.browser.isOpera) {
                    return x(A, z);
                } else {
                    if (f.porting.env.os.isAndroid_4_0) {
                        if (w.komaMode) {
                            return x(A, z);
                        } else {
                            return y(A, z);
                        }
                    } else {
                        return y(A, z);
                    }
                }
            }
        },
        preserve3dMaster: function(A) {
            var w = this;
            var z = (f.porting.env.device.isSC01D && f.porting.env.os.isAndroid_3 && !f.porting.env.browser.isChrome);
            var x = f.porting.env.device.isSonyTabletS;
            var y = "";
            if (A) {
                if (z || f.porting.env.os.isAndroid_2) {
                    y = "preserve-3d";
                } else {
                    if (x) {
                        y = "flat";
                    }
                }
            } else {
                if (z) {
                    y = "preserve-3d";
                } else {
                    if (x || f.porting.env.os.isAndroid_2) {
                        y = "flat";
                    }
                }
            }
            if (y) {
                w.setViewTransformStyle(y);
            }
        },
        setViewTransformStyle: function(y, z) {
            var x = this
              , w = (z ? y : h);
            x._setViewStyles(x.TRANSFORM_STYLE, y, y, y, w, w, w, w, w);
        },
        _setViewStyles: function(x, A, w, E, K, z, D, J, y, G) {
            var F = this
              , C = 0
              , B = 0;
            F.options.screenWrapper[0].style[x] = A;
            if (F._screenObj.length) {
                var I = F._screenObj[0];
                I._screens[0].get(0).style[x] = w;
                I._screens[1].get(0).style[x] = w;
                if (z) {
                    I._canvasObj(0)._canvas[0].style[x] = z;
                    I._canvasObj(1)._canvas[0].style[x] = z;
                }
            } else {
                var H = f(".screen");
                H.each(function() {
                    this.style[x] = w;
                });
                if (z) {
                    H.children("canvas").each(function() {
                        this.style[x] = z;
                    });
                }
            }
            F.options.komaWrapper[0].style[x] = E;
            F.options.komaImage[0].style[x] = K;
        },
        _isLoadingPageXml: function(y) {
            var x = this
              , w = -1;
            w = f.inArray(y, x._loadingPageXmlIndex);
            return w;
        },
        _releaseLoadingPageXml: function(y) {
            var x = this
              , w = x._isLoadingPageXml(y);
            if (w !== -1) {
                x._loadingPageXmlIndex.splice(w, 1);
            }
        },
        _entryLoadingPageXml: function(y) {
            var x = this
              , w = false;
            if (x._isLoadingPageXml(y) === -1) {
                x._loadingPageXmlIndex.push(y);
                w = true;
            }
            return w;
        },
        _loadPageXml: function(A, C, x, y) {
            var B = f.texthelper.getTextSizeIndexNow();
            var w = this
              , z = w.makePageXmlUrlOf(A.index);
            if (x) {
                z = z + "&trycnt=" + A.loadCount;
            }
            if (w._entryLoadingPageXml(A.index)) {
                f.ajax({
                    type: "GET",
                    url: z,
                    dataType: "xml",
                    success: function(D) {
                        if (B !== f.texthelper.getTextSizeIndexNow()) {
                            return;
                        }
                        A.pageXml = f.parser.pageXml(D);
                        A.loadCount++;
                        if (f.inArray(A.index, w._doublePages) !== -1) {
                            var E = w._pageToComputedPageIndexMap[A.index];
                            if (A.pageXml.StepRectWidth <= A.pageXml.StepRectHeight) {
                                w._computedSequentialPageData[E].alignment = l.CENTER;
                                w._computedSequentialPageData[E + 1].alignment = l.CENTER;
                            }
                        }
                        w._releaseLoadingPageXml(A.index);
                        if (!y) {
                            w._retryConnectFunction = null;
                        }
                        if (C && typeof C.success === "function") {
                            C.success(A);
                        }
                    },
                    error: function(E, F, D) {
                        w._releaseLoadingPageXml(A.index);
                        if (B !== f.texthelper.getTextSizeIndexNow()) {
                            return;
                        }
                        if (!x && E.status === 0 && f.porting.env.os.isAndroid_2) {
                            w._loadPageXml(A, C, true, y);
                        } else {
                            if (!y) {
                                w._throwRetryConnectFunction(A.index);
                            }
                            if (C && typeof C.error === "function") {
                                C.error(A);
                            }
                        }
                    }
                });
            }
        },
        _loadPageImage: function(w, y, E, z) {
            var x = f.texthelper.getTextSizeIndexNow();
            var A = this;
            var D = f(f.ImagePool.get());
            if (f.inArray(y.index, A._loadingImageFlags) !== -1 || f.inArray(y.index, A._loadedPageImageIndex) !== -1) {
                return D;
            }
            A._loadingImageFlags.push(y.index);
            D.on("load", function B() {
                A._loadingImageFlags.splice(f.inArray(y.index, A._loadingImageFlags), 1);
                if (x !== f.texthelper.getTextSizeIndexNow()) {
                    return;
                }
                if (y.pageXml && f.inArray(y.index, A._loadedPageImageIndex) === -1) {
                    A._loadedPageImageIndex.push(y.index);
                    y.imgData = this;
                    A.maintenanceImageSize += y.pageXml.totalPartSize;
                } else {
                    this.release();
                }
                if (typeof E === "function") {
                    E();
                }
            }).on("error", function C() {
                A._loadingImageFlags.splice(f.inArray(y.index, A._loadingImageFlags), 1);
                if (x !== f.texthelper.getTextSizeIndexNow()) {
                    return;
                }
                this.release();
                if (typeof z === "function") {
                    z();
                }
            });
            D[0].src = w;
            return D;
        },
        _chkUseUpLoadApi: function(y, x) {
            var w = this._makeDownloadUrl({
                mode: j.TIMEKEY,
                reqtype: 2,
                file: ""
            });
            f.ajax({
                type: "GET",
                url: w,
                dataType: "xml",
                success: function(z) {
                    if (typeof y === "function") {
                        y(z);
                    }
                },
                error: function(B, z, A) {
                    if (typeof x === "function") {
                        x(B);
                    }
                }
            });
        },
        getPinchRevisionCoordinate: function(B, A, z) {
            var D = this
              , F = D.options.screenWrapper
              , E = {
                x: A,
                y: z
            }
              , y = -(D.getCurrentScreen().outerWidth()) * B + window.innerWidth
              , w = 0
              , x = 0
              , C = window.innerHeight - F.outerHeight() * B;
            if (E.x < y) {
                E.x = y;
            } else {
                if (E.x > w) {
                    E.x = w;
                }
            }
            if (B <= 1) {
                E.y = (window.innerHeight - F.outerHeight() * B) / 2;
            } else {
                if (E.y > x) {
                    E.y = x;
                } else {
                    if (E.y < C) {
                        E.y = C;
                    }
                }
            }
            E.x = (E.x | 0);
            E.y = (E.y | 0);
            return E;
        },
        getDragRevisionCoordinate: function(C) {
            var w = this;
            if (w.isPageStepScrollMode()) {
                var A = w.getPageStepDragCoordinate(C);
                C = A.dist;
            } else {
                var y = w.getCurrentScreen();
                var B = y.offset().left;
                var z = y.offset().left + y.outerWidth() * w.zoomScale;
                if (window.innerWidth >= z + C.x && C.x < 0) {
                    C.x = window.innerWidth - z;
                } else {
                    if (B + C.x >= 0 && C.x > 0) {
                        C.x = 0 - B;
                    }
                }
                if (w.zoomScale > 1) {
                    var x = w.options.screenWrapper;
                    if (x.offset().top + C.y >= 0 && C.y > 0) {
                        C.y = 0 - x.offset().top;
                    } else {
                        if (x.offset().top + C.y <= window.innerHeight - x.outerHeight() * w.zoomScale && C.y < 0) {
                            C.y = (window.innerHeight - x.outerHeight() * w.zoomScale) - x.offset().top;
                        }
                    }
                }
            }
            C.x = (C.x | 0);
            C.y = (C.y | 0);
            return {
                dist: C
            };
        },
        getPageStepDragCoordinate: function(y) {
            var w = this
              , x = w.options.screenWrapper;
            y.x = 0;
            if (x.offset().top + y.y >= 0 && y.y > 0) {
                y.y = 0 - x.offset().top;
            } else {
                if (x.offset().top + y.y <= window.innerHeight - (w.getCurrentScreen().outerHeight() * w._scaling) && y.y < 0) {
                    y.y = (window.innerHeight - (w.getCurrentScreen().outerHeight() * w._scaling)) - x.offset().top;
                }
            }
            return {
                dist: y
            };
        },
        getTargetIndex: function(E, D, C, B) {
            var A = this, y = true, x, F;
            if (typeof C !== "number" || typeof B !== "number") {
                C = E;
                B = D;
            }
            var w = function() {
                y = true;
                if (A.isPortrait()) {
                    x = A._currentPage;
                } else {
                    if (A._spreadIndexMap[A._currentPage - 1] === A._spreadIndexMap[A._currentPage]) {
                        x = A._currentPage + 1;
                    } else {
                        x = A._currentPage;
                    }
                    F = A._spreadCurrentPage;
                }
            };
            var z = function() {
                y = false;
                if (A.isPortrait()) {
                    x = A._currentPage - 2;
                } else {
                    if (A._spreadIndexMap[A._currentPage - 1] === A._spreadIndexMap[A._currentPage - 2]) {
                        x = A._currentPage - 3;
                    } else {
                        x = A._currentPage - 2;
                    }
                    F = A._spreadCurrentPage - 2;
                }
            };
            if (A.binding === l.LEFT) {
                if (E > D) {
                    z();
                } else {
                    w();
                }
            } else {
                if (C > B) {
                    w();
                } else {
                    z();
                }
            }
            if (A._currentPage === A._totalPage && y) {
                x -= 1;
            }
            return {
                page: x,
                screen: F
            };
        },
        getZoomCoordinate: function(D) {
            var A = this, C = A.options.screenWrapper.offset().left, B = A.options.screenWrapper.offset().top, z = (window.innerWidth / 2 - C) / A.zoomScale, y = (window.innerHeight / 2 - B) / A.zoomScale, w, E, x;
            w = C - z * (D - A.zoomScale);
            E = B - y * (D - A.zoomScale);
            x = A.getPinchRevisionCoordinate(D, w, E);
            return x;
        },
        getZoomPoints: function(A) {
            var w = this
              , x = A;
            for (var y = 0, z = w.zoomPoints.length; y < z; y++) {
                if (y < w.zoomPoints.length - 1) {
                    if (A < (w.zoomPoints[y] + w.zoomPoints[y + 1]) / 2) {
                        x = w.zoomPoints[y];
                        break;
                    }
                } else {
                    x = w.zoomPoints[y];
                }
            }
            return x;
        },
        checkEmpty: function(z) {
            var x = this, B, w = true;
            if (typeof z !== "number") {
                if (x._spreadCurrentPage === h) {
                    w = false;
                    return w;
                } else {
                    z = x._spreadCurrentPage - 1;
                }
            }
            if (x._spreadCurrentPage > x._contentsData.length) {
                B = x._contentsData[x._contentsData.length - 1];
            } else {
                B = x._contentsData[z];
            }
            if (B !== h) {
                for (var y = 0, A = B.length; y < A; y++) {
                    if (!B[y].isBlank()) {
                        w = false;
                        break;
                    }
                }
            } else {
                w = false;
            }
            return w;
        },
        aos4Preserve3dMaster: function(y, x) {
            var w = this;
            if (!f.porting.env.browser.isChrome) {
                if (f.porting.env.os.isAndroid_4) {
                    if (x) {
                        setTimeout(function() {
                            w.updateRender();
                        }, 200);
                    } else {
                        if (y) {
                            w.setViewTransformStyle("preserve-3d", true);
                        } else {
                            w.setViewTransformStyle("flat", true);
                        }
                    }
                } else {
                    if (f.porting.env.os.isAndroid_2) {
                        if (!y) {
                            w.setViewTransformStyle("flat", true);
                        }
                    }
                }
            }
        },
        aos4Preserve3dMasterForMenu: function(x) {
            var w = this;
            if (!f.porting.env.browser.isChrome && w.IS_TERMINAL_FILTER) {
                if (f.porting.env.os.isAndroid_4) {
                    if (x) {
                        w.setViewTransformStyle("preserve-3d", true);
                    } else {
                        w.setViewTransformStyle("flat", true);
                    }
                } else {
                    if (f.porting.env.os.isAndroid_2) {
                        if (x) {
                            w.setViewTransformStyle("preserve-3d", true);
                        } else {
                            if (!f.porting.env.device.is103SH) {
                                w.setViewTransformStyle("flat", true);
                            }
                        }
                    }
                }
            }
        },
        IS_TERMINAL_FILTER: (f.porting.env.device.is103SH || f.porting.env.device.isDM012SH || f.porting.env.device.isIS11LG),
        reDrawCurrentScreen: function(C) {
            var B = this, y, D, A;
            if ((f.porting.env.browser.isChrome && f.porting.env.browser.chromeVersion >= 56 && (f.porting.env.os.isAndroid_6 || f.porting.env.os.isAndroid_7)) && !B.komaMode) {
                var F = f("#screen-wrapper");
                var x = document.createElement("div");
                F[0].appendChild(x);
                setTimeout(function() {
                    F[0].removeChild(x);
                }, 500);
            }
            if ((((!f.porting.env.os.isAndroid_4_1 && !f.porting.env.os.isAndroid_4_2) || f.porting.env.browser.isChrome) && !f.porting.env.os.isAndroid_5 && !f.porting.env.os.isAndroid_6) || (!f.porting.env.os.isAndroid_6 && B.komaMode)) {
                return false;
            }
            if (B.isLandscape() && B.checkEmpty()) {
                return false;
            }
            if (typeof C !== "object") {
                if (B.isLandscape() && !B.isPageStepScrollMode()) {
                    C = B._contentsData[B._spreadCurrentPage - 1];
                } else {
                    C = [B._sequentialPageData[B._getContentsDataIndex()]];
                }
            }
            A = C.length;
            D = B.getCurrentScreenObj();
            for (y = 0; y < A; y++) {
                if (C === h || C[0] === h) {
                    continue;
                }
                var z, w = D._canvasObj(y)._canvas[0], E;
                z = w;
                E = w.getContext("2d");
                if (!C[y].isBlank()) {
                    E.drawImage(z, 0, 0, w.width, w.height);
                } else {
                    E.fillStyle = "rgb(255, 255, 255)";
                    E.fillRect(0, 0, w.width, w.height);
                }
            }
        },
        reDrawCurrentKoma: function() {
            var D = this;
            if (f.porting.env.browser.isChrome && f.porting.env.browser.chromeVersion >= 56 && (f.porting.env.os.isAndroid_6 || f.porting.env.os.isAndroid_7)) {
                var A = f("#koma-wrapper");
                var z = document.createElement("div");
                A[0].appendChild(z);
                setTimeout(function() {
                    A[0].removeChild(z);
                }, 500);
            }
            if ((f.porting.env.browser.isChrome || !f.porting.env.os.isAndroid) && !f.porting.env.os.isAndroid_5 && !f.porting.env.os.isAndroid_6) {
                return false;
            }
            if (D.isLandscape() && D.checkEmpty()) {
                return false;
            }
            if (f.porting.env.os.isAndroid_4_0) {
                D.aos4Preserve3dMaster(false, false);
                return false;
            }
            var F = window.devicePixelRatio;
            if (F < 1) {
                F = 1;
            }
            var x = D.options.komaImage[0];
            var B;
            var E;
            if (D._getCssValueAsInteger(x, "width") >= x.width) {
                var w = f("<canvas />")[0];
                var C = w.getContext("2d");
                var y = x;
                w.width = D._getCssValueAsInteger(x, "width");
                w.height = D._getCssValueAsInteger(x, "height");
                C.drawImage(y, 0, 0, y.width, y.height, 0, 0, w.width, w.height);
                B = w;
                y.width = w.width;
                y.height = w.height;
            } else {
                B = x;
            }
            E = x.getContext("2d");
            E.drawImage(B, 0, 0, x.width, x.height);
        },
        adjustmentScreen: function() {
            var x = this, B, y = x.getCurrentScreenObj(), w = true, C = false;
            if (x.isLandscape() && !x.isViewTypeOfScroll()) {
                B = x._contentsData[x._spreadCurrentPage - 1];
            } else {
                B = [x._sequentialPageData[x._currentPage - 1]];
            }
            if (x.options.fixSpreadPageMode) {
                x._fix_spread_page_mode = false;
                if (B) {
                    if (B.length == 1) {
                        if (B[0]["spread"]) {
                            if (B[0].spread == true && !x.isLongHeightSpread(x.getComputedCurrentPage() - 1)) {
                                x._fix_spread_page_mode = true;
                            }
                        }
                    }
                }
                if (x.checkEmpty() === false) {
                    x.setSpreadPageFront();
                }
            }
            if (B === h || B[0] === h || !y) {
                return false;
            }
            for (var z = 0, A = B.length; z < A; z++) {
                if (!B[z].isBlank()) {
                    if (y._canvasObj(z)._index !== B[z].index) {
                        w = false;
                        break;
                    }
                } else {
                    if (y._canvasObj(z)._index !== v) {
                        w = false;
                        break;
                    } else {
                        w = true;
                    }
                }
            }
            if (w === false) {
                x.drawScreen(B, y, 0);
                C = true;
            }
            if (C) {
                x.updateRender();
            }
            return w;
        },
        onMouseMoveScreenCursorChange: function(w) {
            this._delegates.onMouseMoveScreenCursorChange(w);
        },
        changeCursor: function(w) {
            this._delegates.changeCursor(w);
        },
        displaylongTapMenu: function() {
            var x = this;
            var w = appview.manager.openMenu();
            if (!w) {
                return;
            }
            if (x.komaMode) {
                if (f.porting.env.browser.isWebKit && x.options.screenWrapper[0].style[x.TRANSFORM_STYLE] === "flat") {
                    x.aos4Preserve3dMasterForMenu(true);
                } else {
                    x.aos4Preserve3dMasterForMenu(false);
                }
            } else {
                if (x.zoomMode) {
                    if (f.porting.env.device.isSO02D || f.porting.env.device.isSO03D || f.porting.env.device.isDM012SH || f.porting.env.device.isIS12S || f.porting.env.device.is103SH) {} else {
                        x.aos4Preserve3dMasterForMenu(false);
                    }
                } else {
                    x.aos4Preserve3dMasterForMenu(true);
                }
            }
            x.changeCursor(d.Type.NORMAL);
            if (x.komaMode) {
                x.touchEndIgnore = true;
            }
        },
        delPageXml: function() {
            var D = this, z, y, E = D.DL_BUFFER, F = D.SAVING_FUTURE_PAGE, B = [], A = D._currentPage + 3, w = D._currentPage - 4;
            if (D.isChanging) {
                return false;
            }
            var G = function(I, H) {
                return (I - H);
            };
            if (D._loadedPageImageIndex.length > F && D.maintenanceImageSize > E) {
                D.isChanging = true;
                D._loadedPageImageIndex.sort(G);
                y = D._loadedPageImageIndex.length;
                for (z = 0; z < y; z++) {
                    if (D._loadedPageImageIndex[z] <= w) {
                        B.push(D._loadedPageImageIndex[z]);
                    } else {
                        break;
                    }
                }
                y = 0;
                for (z = D._loadedPageImageIndex.length - 1; z > y; z--) {
                    if (D._loadedPageImageIndex[z] >= A) {
                        B.push(D._loadedPageImageIndex[z]);
                    } else {
                        break;
                    }
                }
                y = B.length;
                for (z = 0; z < y; z++) {
                    var C = B[z];
                    var x = D._sequentialPageData[C];
                    D.maintenanceImageSize -= x.pageXml.totalPartSize;
                    x.pageXml = null;
                    x.imgData.release();
                    x.imgData = null;
                    D._loadedPageImageIndex.splice(f.inArray(C, D._loadedPageImageIndex), 1);
                    if (D._loadedPageImageIndex.length <= F || D.maintenanceImageSize <= E) {
                        break;
                    }
                }
                D.isChanging = false;
            }
        },
        _throwRetryConnectFunction: function(y) {
            var x = this;
            if (typeof x._retryConnectFunction !== "function") {
                var w = x._pageToComputedPageIndexMap[y];
                var z = x._currentKoma - 1;
                x._retryConnectFunction = function() {
                    x._retryConnectFunction = null;
                    x.checkPageDataAndJump(y, w, z, 999, false);
                }
                ;
                x.openRetryDialog(appview.constants.ID_RETRY_DIALOG);
            }
        },
        _cancelRetryConnectFunction: function() {
            var w = this;
            if (typeof w._retryConnectFunction === "function") {
                w._retryConnectFunction = null;
            }
        },
        reDrawCurrentScreenCanvas: function() {
            var x = this, C, z = x.getCurrentScreenObj(), w;
            if (x.isLandscape() && x.checkEmpty()) {
                return false;
            }
            if (x.adjustmentScreen() === false) {
                w = 2;
                for (C = 0; C < w; C++) {
                    var B = z._canvasObj(C)._canvas;
                    if (B.css("display") !== "none") {
                        var A = B[0];
                        var y = A.getContext("2d");
                        y.drawImage(A, 0, 0);
                    }
                }
            }
        },
        backSitePageReadFinish: function() {
            this.locationChangeBackSitePage(true);
        },
        backSitePage: function() {
            this.locationChangeBackSitePage(false);
        },
        locationChangeBackSitePage: function(y) {
            var w = this;
            if (!f.porting.env.browser.isMSIE) {
                f("*").blur();
            }
            var x = 300;
            setTimeout(function() {
                var D = w.options.siteUrl;
                var z = "?";
                var C = w.options.read;
                var A = 0;
                var B = -1;
                if (D == "") {} else {
                    if (D == "close") {
                        window.open("", "_self").close();
                    } else {
                        if (D == "back") {
                            window.history.back();
                        } else {
                            if (D.indexOf(z) > -1) {
                                z = "&";
                            }
                            if (y) {
                                A = 1;
                                B = w.getPageFirstCharNumber(0);
                                f.bookmark.setPageNumber(0, B);
                            } else {
                                A = 0;
                            }
                            if (C != null && C != "") {
                                D = D + z + C + "=" + A;
                            }
                            location.href = D;
                        }
                    }
                }
            }, x);
        },
        threeDivisionTapFunction: function(x) {
            var w = this;
            if (window.innerWidth * w.CURSOR_LEFT < x && window.innerWidth * w.CURSOR_RIGHT > x) {
                w.displaylongTapMenu();
                w.touchEndIgnore = false;
            } else {
                if (window.innerWidth * w.CURSOR_LEFT < x) {
                    w.rightPage(false);
                } else {
                    w.leftPage(false);
                }
            }
        },
        threeDivisionTapKoma: function(x) {
            var w = this;
            if (window.innerWidth * w.CURSOR_LEFT < x && window.innerWidth * w.CURSOR_RIGHT > x) {
                w.displaylongTapMenu();
                w.touchEndIgnore = false;
            } else {
                if (window.innerWidth * w.CURSOR_LEFT < x) {
                    if (w.binding === l.LEFT) {
                        w.nextKomaByTouch();
                    } else {
                        w.prevKomaByTouch();
                    }
                } else {
                    if (w.binding === l.LEFT) {
                        w.prevKomaByTouch();
                    } else {
                        w.nextKomaByTouch();
                    }
                }
            }
        },
        nextKomaByTouch: function() {
            var w = this;
            if (w.komaScrollDir === e.NONE || w.komaScrollState === q.NONE) {
                if (w.checkImageLoaded(w._currentPage - 1)) {
                    w.nextKoma();
                }
            } else {
                w.komaScrollState = q.STANDBY;
                w.komaAnimation();
            }
        },
        prevKomaByTouch: function() {
            var w = this;
            if (w.komaScrollDir === e.NONE || w.komaScrollState === q.STANDBY) {
                w.prevKoma();
            } else {
                w.komaScrollState = q.STANDBY;
                w.komaAnimation(false);
            }
        },
        setDialogPositionTop: function(z) {
            if (z == null) {
                return false;
            }
            var w = f(z);
            var y = w.outerHeight()
              , x = (((window.innerHeight - y) / 2) | 0);
            w.css("top", x + "px");
        },
        setTocReset: function() {
            var w = appview.manager.getEventReceiver();
            w.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_TABLE_OF_CONTENTS_REFRESH);
        },
        changeLoadingState: function(w) {
            if (w) {
                appview.manager.openLoadingSpinner();
            } else {
                appview.manager.closeLoadingSpinner();
            }
        },
        makeIntegerText: function(w, z) {
            var y = "" + (w | 0);
            for (var x = y.length; x < z; ++x) {
                y = "0" + y;
            }
            return y;
        },
        makePartUrlOf: function(y, A, x) {
            var w = this;
            var z = w.makeIntegerText(y, 4) + "_" + w.makeIntegerText(A, 4);
            var B = z + f.texthelper.getTextSizeAttachLabel() + ".bin";
            return w._pageBaseUrl + "&file=" + B + "&mode=" + x;
        },
        makePageXmlUrlOf: function(x) {
            var w = this;
            var y = w.makeIntegerText(x, 4) + f.texthelper.getTextSizeAttachLabel() + ".xml";
            return w._pageBaseUrl + "&file=" + y + "&mode=" + j.PAGEXML;
        },
        _initNavigation: function(x) {
            var w = this;
            var z = f(x);
            if (z.find("Toc").size() !== 0) {
                var y = [];
                z.find("Toc > TocItem").each(function() {
                    var A = {};
                    A.page = parseInt(f("TocPage", this).text(), 10);
                    A.str = f("TocTitle", this).html();
                    y.push(A);
                });
                w._tableOfContentsData = y;
            }
            if (appview.manager.setActivateTableOfContentIcon) {
                appview.manager.setActivateTableOfContentIcon();
            }
        },
        selectNavigationList: function(y) {
            var w = this;
            var x = w._pageToComputedPageIndexMap[y];
            w.jumpPage(x, 0, false);
        },
        isPageOnEarlier: function() {
            return f.pageonearlier.isEarlier();
        },
        goBackToPageOnEarlier: function() {
            if (!f.pageonearlier.isEarlier()) {
                return;
            }
            var w = f.pageonearlier.getEarlierPageIndex();
            var x = f.pageonearlier.getEarlierKomaIndex();
            this.jumpPage(w, x, false);
        },
        _hasCssClass: function(x, w) {
            return x.hasClass(w);
        },
        _addCssClass: function(x, w) {
            if (!this._hasCssClass(x, w)) {
                x.addClass(w);
            }
            return x;
        },
        _removeCssClass: function(x, w) {
            if (this._hasCssClass(x, w)) {
                x.removeClass(w);
            }
            return x;
        },
        _setCssOffset: function(z, w, A) {
            if (w || (w === 0)) {
                z.style.left = (w | 0) + "px";
            }
            if (A || (A === 0)) {
                z.style.top = (A | 0) + "px";
            }
        },
        _setCssRect: function(B, z, C, A, w) {
            this._setCssOffset(B, z, C);
            if (A || (A === 0)) {
                B.style.width = (A | 0) + "px";
            }
            if (w || (w === 0)) {
                B.style.height = (w | 0) + "px";
            }
        },
        _setCssTransformOrigin: function(y, z, x) {
            var w = this;
            y.style[w.TRANSFORM_ORIGIN] = (z | 0) + "px " + (x | 0) + "px";
        },
        _setCssScale: function(x, y) {
            var w = this;
            x.style[w.TRANSFORM] = "scale(" + y + ")";
        },
        _setCssTranslate: function(z, y, x) {
            var w = this;
            z.style[w.TRANSFORM] = w.makeTranslateValue(y, x);
        },
        _getCssValueAsString: function(x, w) {
            var y = window.getComputedStyle(x, "")[w];
            return y;
        },
        _getCssValueAsNumber: function(y, x) {
            var w = this._getCssValueAsString(y, x);
            return parseFloat(w);
        },
        _getCssValueAsInteger: function(y, x) {
            var w = this._getCssValueAsString(y, x);
            return parseInt(w, 10);
        },
        decidePage: function(x, y) {
            var w = this;
            if (y > x) {
                w.leftPage(false);
            } else {
                w.rightPage(false);
            }
        },
        turnUpSpreadPages: function() {
            var w = this
              , x = w.getCurrentScreen().offset().left
              , y = (window.innerWidth - w.getCurrentScreen().outerWidth()) / 2;
            if (x > y) {
                if (w.isBindingRight() && w._alignment === l.RIGHT) {
                    w._computedCurrentPage += 1;
                    w._alignment = l.LEFT;
                } else {
                    if (w.isBindingLeft() && w._alignment === l.RIGHT) {
                        w._computedCurrentPage -= 1;
                        w._alignment = l.LEFT;
                    }
                }
            } else {
                if (w.isBindingRight() && w._alignment === l.LEFT) {
                    w._computedCurrentPage -= 1;
                    w._alignment = l.RIGHT;
                } else {
                    if (w.isBindingLeft() && w._alignment === l.LEFT) {
                        w._computedCurrentPage += 1;
                        w._alignment = l.RIGHT;
                    }
                }
            }
        },
        jumpPage: function(z, H, y) {
            var D = this
              , E = D._spreadCurrentPage - 1;
            if (f.trialhelper.isTrialMode()) {
                var G = D.getTotalDoublePageTrialFirstPageIndex();
                var F = D.getTotalDoublePageTrialLastPageIndex();
                if ((z < G) || (z > F)) {
                    return;
                }
            }
            if (typeof z != "number") {
                return;
            } else {
                if (z < 0 || z >= D._totalDoublePage) {
                    return;
                }
            }
            var w = true;
            if (z === D._computedCurrentPage - 1 && !D.checkEmpty(E)) {
                w = false;
            }
            var B = D._computedIndexMap[z];
            var x = D._spreadIndexMap[B];
            if (!D.isPortraitAndScrollDisc() && x === D._spreadCurrentPage - 1 && !D.komaMode) {
                w = false;
            }
            if (!w) {
                return;
            }
            D._fix_spread_page_mode = false;
            if (D.komaMode) {
                D.executePrevKoma = false;
            }
            var C = D.getComputedCurrentPage() - 1;
            if (!D.isPortraitAndScrollDisc()) {
                C = D._pageToComputedPageIndexMap[D._currentPageComputedNo[D.getComputedCurrentPage() - 1]];
            }
            var A = (D.komaMode) ? D._currentKoma - 1 : 0;
            f.pageonearlier.setEarlierPageIndex(C);
            f.pageonearlier.setEarlierKomaIndex(A);
            D.checkPageDataAndJump(B, z, H, 999, y);
        },
        chkXmlLoadTimerId: 0,
        chkImgLoadTimerId: 0,
        checkPageDataAndJump: function(B, L, I, G, H, z) {
            var x = this;
            var N = 1;
            if (G === 999) {
                N = x._spreadIndexMap[B] + 1;
            } else {
                N = x._spreadCurrentPage + G;
            }
            var D = N - 1;
            var F = (G === 999) ? false : true;
            var y = B;
            var E = [];
            var K = false;
            x.changeLoadingState(true);
            clearInterval(x.chkXmlLoadTimerId);
            clearInterval(x.chkImgLoadTimerId);
            var O = true;
            if (x.isInitializeAndLoadingFinished()) {
                if (x.isLandscape() && !x.isViewTypeOfScroll()) {
                    O = true;
                } else {
                    O = false;
                }
            }
            if (O) {
                y = D;
                E = x._contentsData[y];
            } else {
                E.push(x._sequentialPageData[y]);
            }
            var M = function(Q) {
                x._openErrorDialogEx(Q);
                x.duringAnimation = false;
            };
            var P = function(Q) {
                if (Q.hasOwnProperty("code")) {
                    if (Q.code != "") {
                        return true;
                    }
                }
                return false;
            };
            for (var J = 0; J < E.length; J++) {
                var A = E[J];
                var C = {
                    success: function(Q) {
                        if (P(Q.pageXml)) {
                            M(Q.pageXml.code);
                            return false;
                        } else {
                            if (f.inArray(Q.index, x._loadedPageImageIndex) === -1) {
                                x._loadPageImage(x.makePartUrlOf(Q.index, 0, Q.pageXml.Part[0]), Q);
                            }
                        }
                    },
                    error: function(Q) {
                        if (!Q.isBlank() && Q.pageXml && Q.pageXml.code) {
                            M(A.pageXml.code);
                        }
                    }
                };
                if (A.index !== v && !A.isBlank()) {
                    if (!A.pageXml) {
                        x._loadPageXml(A, C);
                        K = true;
                    } else {
                        if (P(A.pageXml)) {
                            M(A.pageXml.code);
                            return false;
                        } else {
                            if (f.inArray(A.index, x._loadedPageImageIndex) === -1 && f.inArray(A.index, x._loadingImageFlags) === -1) {
                                x._loadPageImage(x.makePartUrlOf(A.index, 0, A.pageXml.Part[0]), A);
                            }
                        }
                    }
                }
            }
            var w = function() {
                if (x.komaMode && x.executePrevKoma) {
                    for (var S = 0; S < E.length; S++) {
                        var R = E[S];
                        if (R.pageXml && !R.isBlank()) {
                            I = R.pageXml.komas.length;
                            break;
                        }
                    }
                }
                var Q = x.checkImageLoaded(B);
                if (x.isLandscape() && !x.isViewTypeOfScroll()) {
                    Q = (Q || x.checkEmpty(D));
                }
                if (Q) {
                    x.JumpTargetPage(L, I, N, F, z);
                } else {
                    x.changeLoadingState(true);
                    x.setChkImgLoadTimerId(B, L, I, N, F, z);
                }
            };
            if (K) {
                x.setChkXmlLoadTimerId(B, E, w);
            } else {
                w();
            }
            return true;
        },
        setChkXmlLoadTimerId: function(y, B, C) {
            var w = this
              , x = 100
              , A = 0;
            var z = function() {
                A++;
                var D = x + A;
                var G = 0;
                var H = false;
                if (D <= w.TIMEOUT) {
                    for (var F = 0; F < B.length; F++) {
                        var E = B[F];
                        if (E.index === v || E.isBlank() || (E.pageXml && E.pageXml.code === "")) {
                            if (E.index !== v && !E.isBlank()) {
                                w._loadPageImage(w.makePartUrlOf(E.index, 0, E.pageXml.Part[0]), E);
                            }
                            G++;
                        } else {
                            if (w._isLoadingPageXml(E.index) === -1) {
                                H = true;
                                break;
                            }
                        }
                    }
                    if (G === B.length) {
                        clearInterval(w.chkXmlLoadTimerId);
                        if (C) {
                            C();
                        }
                    }
                } else {
                    H = true;
                }
                if (H) {
                    clearInterval(w.chkXmlLoadTimerId);
                    w._throwRetryConnectFunction(y);
                }
            };
            clearInterval(w.chkXmlLoadTimerId);
            w.chkXmlLoadTimerId = setInterval(z, x);
        },
        setChkImgLoadTimerId: function(z, x, A, F, C, E) {
            var D = this;
            var w = 200;
            var y = 0;
            var B = function() {
                y++;
                var H = w * y;
                var J = false;
                if (H <= D.TIMEOUT) {
                    if (D.checkImageLoaded(z)) {
                        D.JumpTargetPage(x, A, F, C, E);
                    } else {
                        if (D.checkImageLoading(z) === false) {
                            J = true;
                        }
                    }
                } else {
                    J = true;
                }
                if (J) {
                    clearInterval(D.chkImgLoadTimerId);
                    var G = function() {
                        D._throwRetryConnectFunction(z);
                    };
                    var I = function() {
                        D._openErrorDialogEx(D.ERROR_CODE_USEUP);
                    };
                    D._chkUseUpLoadApi(function(K) {
                        var M = f(K);
                        var L = f.trim(f.parser.getTextOf(M, "Code"));
                        if (L === D.ERROR_CODE_USEUP) {
                            I();
                        } else {
                            G();
                        }
                    }, function(K) {
                        G();
                    });
                }
            };
            clearInterval(D.chkImgLoadTimerId);
            D.chkImgLoadTimerId = setInterval(B, w);
        },
        JumpTargetPage: function(x, B, A, z, C) {
            var w = this;
            clearInterval(w.chkImgLoadTimerId);
            w._spreadCurrentPage = A;
            w._cancelRetryConnectFunction();
            w._isExecLoadingTheFuture = z;
            w.checkMaskPage(x);
            if (w.komaMode) {
                w._currentKoma = B + 1;
            }
            w.setComputedCurrentPage(x + 1, false);
            var y = appview.manager.getEventReceiver();
            y.trigger(appview.events.RECEIVE_EVENTS, appview.events.RECEIVE_PAGE_JUMP);
            if (C) {
                C();
            }
            w.changeLoadingState(false);
            w.setInitializeAndLoadingFinished();
        },
        checkMaskPage: function(z) {
            var w = this;
            if (w.komaMode) {
                var y = w._computedIndexMap[z];
                var x = (w._maskPageMap[y] === 1);
                if (!x) {
                    w.cancelKomaMode();
                }
            }
        }
    };
    var a = 20;
    f.fn.gc = (function(x) {
        var y = document.createElement("iframe");
        var w = x;
        return function(z) {
            --w;
            if (z || (w <= 0)) {
                document.body.appendChild(y);
                document.body.removeChild(y);
                w = x;
            }
        }
        ;
    }
    )(a);
    var n = {
        NORMAL: 0,
        SANDBOX: 1
    };
    var s = (function() {
        return n.SANDBOX;
    }
    )();
    f.ImagePool = (function(y) {
        var z = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAMAAAAoyzS7AAAABlBMVEX///8AAABVwtN+AAAAAXRSTlMAQObYZgAAAA1JREFUeNoBAgD9/wAAAAIAAVMrnDAAAAAASUVORK5CYII=";
        var x = function() {
            var A = [];
            var B = function(C) {
                f(C).off("load error");
                A.push(C);
            };
            return {
                get: function() {
                    var C;
                    if (A.length < 1) {
                        C = new Image();
                    } else {
                        C = A.pop();
                    }
                    C.release = function() {
                        f(this).off("load error");
                        f(this).on("load error", function() {
                            B(this);
                        });
                        this.src = z;
                        this.release = t.nop;
                    }
                    ;
                    return C;
                },
                purge: t.nop
            };
        };
        var w = function() {
            var A = r.create();
            return {
                get: function() {
                    var D = "" + new Date().getTime();
                    var C = A.create(D, document.body);
                    C.getElement().style.display = "none";
                    var B = C.appendNewElement("img", D);
                    B.release = function() {
                        f(this).off("load error");
                        this.release = t.nop;
                        A.remove(D);
                    }
                    ;
                    return B;
                },
                purge: t.nop
            };
        };
        switch (y) {
        case n.SANDBOX:
            return w();
        case n.NORMAL:
        default:
            return x();
        }
    }
    )(s);
}(jQuery, appmain, undefined));
var appview = appview || {};
(function(c, a, b) {
    a.appview.constants = {
        TOUCHEND_OR_CLICK: (("ontouchend"in document.documentElement) ? "touchend" : "click"),
        TOUCHEND_OR_MOUSEUP: (("ontouchend"in document.documentElement) ? "touchend" : "mouseup"),
        TOUCHSTART_OR_MOUSEDOWN: (("ontouchstart"in document.documentElement) ? "touchstart" : "mousedown"),
        TOUCHCANCEL_OR_MOUSEOUT: (("ontouchcancel"in document.documentElement) ? "touchcancel" : "mouseout"),
        TOUCHMOVE_OR_MOUSEMOVE: (("ontouchmove"in document.documentElement) ? "touchmove" : "mousemove"),
        TOUCHSTART_OR_MOUSEUP: (("ontouchstart"in document.documentElement) ? "touchstart" : "mouseup"),
        TOUCHCANCEL: "touchcancel",
        CHANGE: "change",
        CONTROLL_OPEN: "open",
        CONTROLL_CLOSE: "close",
        CONTROLL_UPDATE: "update",
        ID_SPLASH_SCREEN: "#splash_screen",
        ID_NEXT_SEARCH_PANEL: "#nextsearch",
        ID_TEXT_SIZE_CHANGE_PANEL: "#textsizechange_panel",
        ID_READ_FINISH_PANEL: "#end_panel",
        ID_COLOPHON_PANEL: "#colophon_panel",
        ID_URL_TO_CONFIRM_DIALOG: "#urlto_dialog",
        ID_BOOKMARK_OVERWRITE_CONFIRM_DIALOG: "#save-dialog",
        ID_BOOKMARK_DELETE_CONFIRM_DIALOG: "#delete-dialog",
        ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE_DIALOG: "#text_size_change_bookmark_convert_continue_dialog",
        ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR_DIALOG: "#text_size_change_bookmark_convert_error_dialog",
        ID_RETRY_DIALOG: "#retry-dialog",
        ID_ERROR_DIALOG: "#error_dialog",
        WAIT_TIME_TO_OPEN_MENU: 500
    };
    a.appview.events = {
        RECEIVE_EVENTS: "receive_events",
        RECEIVE_NEXT_SEARCH_RESULT: "receive_next_search_result",
        RECEIVE_UPDATE_ZOOM: "receive_update_zoom",
        RECEIVE_TEXT_SIZE_CHANGE_CANCEL: "receive_text_size_change_cancel",
        RECEIVE_TEXT_SIZE_CHANGE_RESET: "receive_text_size_change_reset",
        RECEIVE_TEXT_SIZE_CHANGE_COMPLETED: "receive_text_size_change_completed",
        RECEIVE_TABLE_OF_CONTENTS_REFRESH: "receive_table_of_contents_refresh",
        RECEIVE_PROGRESS_INITIALIZE_FINISH: "receive_progress_initialize_finish",
        RECEIVE_UPDATE_SCREEN: "receive_update_screen",
        RECEIVE_UPDATE_BOOKMARK: "receive_update_bookmark",
        RECEIVE_UPDATE_STAGE_SIZE: "receive_update_stage_size",
        RECEIVE_OPEN_INTRODUCTION_PAGE: "receive_open_introduction_page",
        RECEIVE_OPEN_POSTSCRIPT_PAGE: "receive_open_postscript_page",
        RECEIVE_PAGE_JUMP: "receive_page_jump",
        EVENT_TAP_MENU_BACKGROUND: "event_tap_menu_background",
        EVENT_ZOOM_EXPANSION: "event_zoom_expansion",
        EVENT_ZOOM_REDUCTION: "event_zoom_reduction",
        EVENT_OPEN_HELP_PAGE: "event_open_help_page",
        EVENT_JUMP_PAGE: "event_jump_page",
        EVENT_BOOKMARK_JUMP: "event_bookmark_jump",
        EVENT_BOOKMARK_SAVE: "event_bookmark_save",
        EVENT_URL_TO_OK: "event_url_to_ok",
        EVENT_URL_TO_CANCEL: "event_url_to_cancel",
        EVENT_OPEN_BOOKMARK_OVERWRITE_CONFIRM_DIALOG: "event_open_bookmark_overwrite_confirm_dialog",
        EVENT_BOOKMARK_OVERWRITE_OK: "event_bookmark_overwrite_ok",
        EVENT_BOOKMARK_OVERWRITE_CANCEL: "event_bookmark_overwrite_cancel",
        EVENT_OPEN_BOOKMARK_DELETE_CONFIRM_DIALOG: "event_open_bookmark_delete_confirm_dialog",
        EVENT_BOOKMARK_DELETE_OK: "event_bookmark_delete_ok",
        EVENT_BOOKMARK_DELETE_CANCEL: "event_bookmark_delete_cancel",
        EVENT_OPEN_NEXTSEARCH: "event_open_nextsearch",
        EVENT_OPEN_TEXTSIZECHANGE: "event_open_textsizechange",
        EVENT_CHANGE_VIEWTYPE_SCROLL: "event_change_viewtype_scroll",
        EVENT_JUMP_FIRST_PAGE: "event_jump_first_page",
        EVENT_BACK_SITE_PAGE: "event_back_site_page",
        EVENT_BACK_SITE_PAGE_READ_FINISH: "event_back_site_page_read_finish",
        EVENT_RETRY_CONNECT: "event_retry_connect",
        EVENT_ERROR_DIALOG_BACK_SITE_PAGE: "event_error_dialog_back_site_page",
        EVENT_TEXT_SIZE_CHANGE: "event_text_size_change",
        EVENT_TEXT_SIZE_CHANGE_CONTINUE: "event_textsizechange_continue",
        EVENT_TEXT_SIZE_CHANGE_CANCEL: "event_textsizechange_cancel",
        EVENT_TEXT_SIZE_CHANGE_ERROR_CLOSE: "event_textsizechange_error_close",
        EVENT_DO_REDRAW: "event_do_redraw",
        EVENT_DO_BACK_SITE_PAGE: "event_do_back_site_page",
        EVENT_PANEL_CLOSE: "event_panel_close",
        EVENT_COVER_CLOSE: "event_cover_close",
        EVENT_SPLASH_CLOSE: "event_splash_close",
        EVENT_ADPAGE_CLOSE: "event_adpage_close"
    };
    a.appview.window_event_manager = {
        _windowTouchEndCallbacks: [],
        init: function() {
            var d = this;
            this._windowTouchEndCallbacks.length = 0;
            var e = appview.constants.TOUCHSTART_OR_MOUSEDOWN;
            e += " " + appview.constants.TOUCHEND_OR_MOUSEUP;
            e += " " + appview.constants.TOUCHMOVE_OR_MOUSEMOVE;
            e += " " + appview.constants.TOUCHCANCEL_OR_MOUSEOUT;
            c(window).on(e, function(f) {
                f.stopPropagation();
                f.stopImmediatePropagation();
                f.preventDefault();
                switch (f.type) {
                case appview.constants.TOUCHSTART_OR_MOUSEDOWN:
                    break;
                case appview.constants.TOUCHEND_OR_MOUSEUP:
                    d._dispatchWindowEvent(d._windowTouchEndCallbacks);
                    break;
                case appview.constants.TOUCHMOVE_OR_MOUSEMOVE:
                    break;
                case appview.constants.TOUCHCANCEL_OR_MOUSEOUT:
                    break;
                }
            });
        },
        _dispatchWindowEvent: function(f) {
            var g = null;
            var e = 0;
            var d = f.length;
            for (e = 0; e < d; e++) {
                g = f[e];
                if (typeof g == "function") {
                    g();
                }
            }
        },
        addWindowEventCallbackTouchEnd: function(d) {
            this._windowTouchEndCallbacks.push(d);
        }
    };
    a.appview.messaging_manager = {
        EVENT_MESSAGE: "message",
        ACTION_CLOSE_COLOPHON: "close_colophon",
        ACTION_JUMP_FIRST_PAGE: "first_page",
        ACTION_NEXT_SEARCH: "next_search",
        ACTION_CLOSE_VIEWER: "close_viewer",
        _receive_callback: null,
        init: function(d) {
            this._receive_callback = d;
            this._addEvents();
        },
        _addEvents: function() {
            var d = this;
            c(window).on(this.EVENT_MESSAGE, function(g) {
                var f = g.originalEvent.data;
                switch (f) {
                case d.ACTION_CLOSE_COLOPHON:
                    d._callback(d.ACTION_CLOSE_COLOPHON);
                    break;
                case d.ACTION_JUMP_FIRST_PAGE:
                    d._callback(d.ACTION_JUMP_FIRST_PAGE);
                    break;
                case d.ACTION_NEXT_SEARCH:
                    d._callback(d.ACTION_NEXT_SEARCH);
                    break;
                case d.ACTION_CLOSE_VIEWER:
                    d._callback(d.ACTION_CLOSE_VIEWER);
                    break;
                }
            });
        },
        _removeEvents: function() {
            c(window).off(this.EVENT_MESSAGE);
        },
        _callback: function(d) {
            if (this._receive_callback !== null) {
                this._receive_callback(d);
            }
        }
    };
    a.appview.manager = {
        _timeMenuCloseNow: 0,
        _eventDispatcher: c("<div></div>"),
        _eventReceiver: c("<div></div>"),
        view_menu: null,
        view_panels: null,
        view_dialogs: null,
        view_loading_spinner: null,
        view_splash_screen: null,
        view_advertisement_pages: null,
        init: function(q) {
            var d = this;
            appview.coreAccess.setCoreAccess(q);
            appview.window_event_manager.init();
            appview.messaging_manager.init(d._actionMessaging);
            var n = c('#meta input[name="splashscreen"]').val();
            var g = c('#meta input[name="splashbase_color"]').val();
            var j = c('#meta input[name="splashbase_size"]').val();
            var l = c('#meta input[name="splashbase_delay"]').val();
            g = appview.util.fairingHEXcolorString(g);
            var r = appview.util.sizeCutUp(j);
            var o = {
                element: "splash_screen",
                base_id: "splash_base",
                image_id: "splash_image",
                base_color: g,
                base_width: r.width,
                base_height: r.height,
                img_src: n,
                delay: l
            };
            this.view_splash_screen = new appview.gui.SplashScreen(o);
            var t = {
                element: "menu_layer",
                header_params: {
                    element: "header_menu",
                    bt_exitviewer: "bt_menu_exitviewer",
                    bt_menu_tableofcontents: "bt_menu_tableofcontents",
                    bt_menu_bookmark: "bt_menu_bookmark",
                    bt_menu_setting: "bt_menu_setting",
                    params_setting_panel: {
                        element: "panel_setting",
                        tx_version: "text_version",
                        bt_help: "bt_help_panel_setting",
                        bt_nextsearch: "bt_nextsearch_panel_setting",
                        bt_textsize: "bt_textsize_panel_setting"
                    },
                    params_bookmark_panel: {
                        element: "panel_bookmark",
                        tx_bm1: "tx_bookmark_panel_bm1",
                        tx_bm2: "tx_bookmark_panel_bm2",
                        bt_jump_bm1: "bt_bookmark_panel_bm1",
                        bt_jump_bm2: "bt_bookmark_panel_bm2",
                        bt_update_bm1: "bt_bookmark_panel_update_bm1",
                        bt_update_bm2: "bt_bookmark_panel_update_bm2",
                        bt_delete: "bt_bookmark_panel_delete",
                        label_data: {
                            empty: c("#tx_bookmark_panel_bm1").attr("data-empty"),
                            page: c("#tx_bookmark_panel_bm1").attr("data-page")
                        }
                    },
                    params_tableofcontents_panel: {
                        element: "panel_table_of_contents",
                        elm_nothing: "toc_nothing",
                        sl_box: "scrollbox_toc_panel",
                        sl_content: "scrollcontent_toc_panel",
                        sl_slider: "scrollslider_toc_panel",
                        sl_slider_handle: "scrollslider_handle_toc_panel"
                    }
                },
                footer_params: {
                    element: "footer_menu",
                    bt_arrow_left: "",
                    bt_arrow_right: "",
                    slider_pagination: {
                        base: "paging_slider",
                        handle: "paging_slider_handle",
                        slider_nombre: {
                            element: "paging_slider_nombre",
                            nombre_current: "paging_slider_nombre_current",
                            nombre_total: "paging_slider_nombre_total"
                        }
                    },
                    zoom_buttons: {
                        bt_expansion: "bt_menu_expansion",
                        bt_reduction: "bt_menu_reduction"
                    },
                    fullscreen_button: {
                        bt_fullscreen: "bt_menu_fullscreen"
                    },
                    page_on_earlier_button: {
                        bt_page_on_earlier: "bt_menu_page_on_earlier"
                    }
                }
            };
            this.view_menu = new appview.gui.Menu(t);
            var v = c('#meta input[name="colophon_url"]').val();
            var s = c('#meta input[name="colophon_size"]').val();
            var f = appview.util.sizeCutUp(s);
            var m = {
                layer: "panels_layer",
                params_readend_panel: {
                    element: "panel_read_end",
                    background_id: "panel_read_end_background",
                    bt_jump_first: "bt_jump_first_panel_read_end",
                    bt_next_search: "bt_next_search_panel_read_end",
                    bt_exit_viewer: "bt_exit_viewer_panel_read_end",
                    bt_close: "bt_close_panel_read_end",
                    wrapper_next_search_id: "wrapper_next_search_panel_read_end",
                    css_none_next_search: "none_next_search"
                },
                params_nextsearch_panel: {
                    element: "panel_next_search",
                    bt_close: "bt_close_panel_next_search",
                    bt_jump_content: "bt_jump_content_panel_next_search",
                    bt_jump_site: "bt_jump_site_panel_next_search",
                    tx_message: "tx_message_panel_next_search"
                },
                params_textsize_panel: {
                    element: "panel_text_size",
                    bt_close: "bt_close_panel_text_size",
                    bt_change: "bt_change_panel_text_size",
                    params_size_slider: {
                        element_id: "text_size_step_slider_wrapper_panel_text_size",
                        slider_base_id: "step_slider_panel_text_size",
                        slider_handle_id: "step_slider_handle_panel_text_size",
                        params_step_points: {
                            element_id: "step_points_panel_text_size",
                            step_point_css: "step_slider_point",
                            step_point_select_css: "step_slider_point_select"
                        }
                    }
                },
                params_colophon_panel: {
                    element: "panel_colophon",
                    body_id: "panel_colophon_body",
                    background_id: "panel_colophon_background",
                    iframe_css: "panel_colophon_frame",
                    url: v,
                    maxWidth: f.width,
                    maxHeight: f.height
                }
            };
            this.view_panels = new appview.gui.Panels(m);
            var h = {
                layer: "dialogs_layer",
                params_urlto_dialog: {
                    element: "dialog_urlto",
                    bt_ok_id: "bt_dialog_urlto_ok",
                    bt_cancel_id: "bt_dialog_urlto_cancel",
                    dialog_id: appview.constants.ID_URL_TO_CONFIRM_DIALOG,
                    eventOk: appview.events.EVENT_URL_TO_OK,
                    eventCancel: appview.events.EVENT_URL_TO_CANCEL
                },
                params_overwrite_confirm_dialog: {
                    element: "dialog_overwrite_confirm",
                    bt_ok_id: "bt_dialog_overwrite_confirm_ok",
                    bt_cancel_id: "bt_dialog_overwrite_confirm_cancel",
                    dialog_id: appview.constants.ID_BOOKMARK_OVERWRITE_CONFIRM_DIALOG,
                    eventOk: appview.events.EVENT_BOOKMARK_OVERWRITE_OK,
                    eventCancel: appview.events.EVENT_BOOKMARK_OVERWRITE_CANCEL
                },
                params_delete_confirm_dialog: {
                    element: "dialog_delete_confirm",
                    bt_ok_id: "bt_dialog_delete_confirm_ok",
                    bt_cancel_id: "bt_dialog_delete_confirm_cancel",
                    dialog_id: appview.constants.ID_BOOKMARK_DELETE_CONFIRM_DIALOG,
                    eventOk: appview.events.EVENT_BOOKMARK_DELETE_OK,
                    eventCancel: appview.events.EVENT_BOOKMARK_DELETE_CANCEL
                },
                params_error_dialog: {
                    element: "dialog_error",
                    tx_error_code: "dialog_error_code",
                    tx_message: "tx_message_dialog_error",
                    bt_back_site_page: "bt_dialog_error_back_site_page"
                },
                params_title_error_dialog: {
                    element: "dialog_error_title",
                    tx_error_title: "dialog_error_title_text",
                    tx_message: "tx_message_dialog_error_title",
                    bt_back_site_page: "bt_dialog_error_title_back_site_page"
                },
                params_retry_dialog: {
                    element: "dialog_retry",
                    bt_ok_id: "bt_dialog_retry_connect",
                    bt_cancel_id: "bt_dialog_retry_back_site_page",
                    dialog_id: appview.constants.ID_RETRY_DIALOG,
                    eventOk: appview.events.EVENT_RETRY_CONNECT,
                    eventCancel: appview.events.EVENT_BACK_SITE_PAGE
                },
                params_textsizechangebookmarkconverterror_dialog: {
                    element: "dialog_text_size_change_bookmark_convert_error",
                    bt_close_id: "bt_dialog_text_size_change_bookmark_convert_error_close",
                    dialog_id: appview.constants.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR_DIALOG,
                    event_close: appview.events.EVENT_TEXT_SIZE_CHANGE_ERROR_CLOSE
                },
                params_textsizechangebookmarkconvertcontinue_dialog: {
                    element: "dialog_text_size_change_bookmark_convert_continue",
                    bt_ok_id: "bt_dialog_text_size_change_bookmark_convert_continue_continue",
                    bt_cancel_id: "bt_dialog_text_size_change_bookmark_convert_continue_cancel",
                    dialog_id: appview.constants.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE_DIALOG,
                    eventOk: appview.events.EVENT_TEXT_SIZE_CHANGE_CONTINUE,
                    eventCancel: appview.events.EVENT_TEXT_SIZE_CHANGE_CANCEL
                }
            };
            this.view_dialogs = new appview.gui.Dialogs(h);
            var i = {
                layer: "loading_spinner_layer"
            };
            this.view_loading_spinner = new appview.gui.LoadingSpinner(i);
            var e = "ad-page-event-target";
            var p = {
                element_id_beginning: "ad_page_of_beginning",
                element_id_end: "ad_page_of_end",
                cancel_target_class_name: e
            };
            this.view_advertisement_pages = new appview.gui.AdvertisementPages(p);
            var k = this.view_advertisement_pages.isUseAdPage(appview.gui.AdvertisementPages.TYPE_INTRODUCTION);
            appview.coreAccess.setUseIntroduction(k);
            var u = this.view_advertisement_pages.isUseAdPage(appview.gui.AdvertisementPages.TYPE_POSTSCRIPT);
            appview.coreAccess.setUsePostScript(u);
            c(window).on("resize.view", c.proxy(this._eventWindowResize_view, this));
            this._eventReceiver.on(appview.events.RECEIVE_EVENTS, function(C, D) {
                var G, H;
                switch (D) {
                case appview.events.RECEIVE_UPDATE_STAGE_SIZE:
                    break;
                case appview.events.RECEIVE_NEXT_SEARCH_RESULT:
                    d.view_panels.update_next_search();
                    break;
                case appview.events.RECEIVE_UPDATE_ZOOM:
                    d.view_menu.receive_events(D);
                    break;
                case appview.events.RECEIVE_TEXT_SIZE_CHANGE_COMPLETED:
                    d.view_menu.receive_events(D);
                    G = appview.gui.Panels.PANEL_TEXT_SIZE;
                    H = appview.manager.view_panels.getPanel(G);
                    H.completedTextSizeChange();
                    break;
                case appview.events.RECEIVE_TEXT_SIZE_CHANGE_CANCEL:
                    G = appview.gui.Panels.PANEL_TEXT_SIZE;
                    H = appview.manager.view_panels.getPanel(G);
                    H.cancelTextSizeChange();
                    break;
                case appview.events.RECEIVE_TEXT_SIZE_CHANGE_RESET:
                    G = appview.gui.Panels.PANEL_TEXT_SIZE;
                    H = appview.manager.view_panels.getPanel(G);
                    H.resetTextSizeChange();
                    break;
                case appview.events.RECEIVE_TABLE_OF_CONTENTS_REFRESH:
                    d.view_menu.receive_events(D);
                    break;
                case appview.events.RECEIVE_PROGRESS_INITIALIZE_FINISH:
                    d.view_splash_screen.doLoadErrorToSkip();
                    var E = appview.coreAccess.getTotalPage();
                    b.ReadingThrough.initialize(E);
                    if (!appview.coreAccess.isTrialMode()) {
                        var y = c('#meta input[name="finish_reading"]').val();
                        b.FinishReading.initialize(E, y);
                    }
                    if (appview.coreAccess.isFirstTime()) {
                        d.view_advertisement_pages.openAdPage(appview.gui.AdvertisementPages.TYPE_INTRODUCTION);
                    }
                    break;
                case appview.events.RECEIVE_UPDATE_SCREEN:
                    d.view_menu.receive_events(D);
                    var F = -1;
                    if (appview.coreAccess.isLandscapeAndNotViewTypeScroll()) {
                        var A = appview.coreAccess.getContentsData();
                        var x = A.length;
                        var z = -1;
                        for (var B = 0; B < x; B++) {
                            F = A[B]["index"];
                            b.ReadingThrough.saveReadingPage(F);
                            z = Math.max(z, F);
                        }
                        if (z >= 0) {
                            b.FinishReading.judgeFinishAPICall(z);
                        }
                    } else {
                        var w = appview.coreAccess.getPageData();
                        F = w.index;
                        b.ReadingThrough.saveReadingPage(F);
                        b.FinishReading.judgeFinishAPICall(F);
                    }
                    break;
                case appview.events.RECEIVE_PAGE_JUMP:
                    if (b.ReadingThrough.isSendFinishReading()) {
                        b.GAHelper.sendEventFinishReading();
                    }
                    break;
                case appview.events.RECEIVE_OPEN_INTRODUCTION_PAGE:
                    if (d.view_advertisement_pages.openAdPage(appview.gui.AdvertisementPages.TYPE_INTRODUCTION)) {
                        d.closeMenu();
                    } else {}
                    break;
                case appview.events.RECEIVE_OPEN_POSTSCRIPT_PAGE:
                    if (d.view_advertisement_pages.openAdPage(appview.gui.AdvertisementPages.TYPE_POSTSCRIPT)) {
                        d.closeMenu();
                    } else {
                        appview.coreAccess.openFinishPanel();
                    }
                    break;
                }
            });
        },
        getEventDispatcher: function() {
            return this._eventDispatcher;
        },
        getEventReceiver: function() {
            return this._eventReceiver;
        },
        openPanel: function(d) {
            this.panelControll(d, appview.constants.CONTROLL_OPEN);
        },
        closePanel: function(d) {
            this.panelControll(d, appview.constants.CONTROLL_CLOSE);
        },
        panelControll: function(e, d) {
            var g = appview.constants;
            switch (e) {
            case g.ID_SPLASH_SCREEN:
                if (d == "open") {
                    this.view_splash_screen.open();
                } else {
                    this.view_splash_screen.close();
                }
                break;
            case g.ID_URL_TO_CONFIRM_DIALOG:
                var f = appview.gui.Dialogs.DIALOG_URLTO;
                if (d == "open") {
                    this.view_dialogs.open(f);
                } else {
                    this.view_dialogs.close(f);
                }
                break;
            case g.ID_BOOKMARK_OVERWRITE_CONFIRM_DIALOG:
                var f = appview.gui.Dialogs.DIALOG_OVERWRITE;
                if (d == "open") {
                    this.view_dialogs.open(f);
                } else {
                    this.view_menu.receive_events(appview.events.RECEIVE_UPDATE_BOOKMARK);
                    this.view_dialogs.close(f);
                }
                break;
            case g.ID_BOOKMARK_DELETE_CONFIRM_DIALOG:
                var f = appview.gui.Dialogs.DIALOG_DELETE;
                if (d == "open") {
                    this.view_dialogs.open(f);
                } else {
                    this.view_menu.receive_events(appview.events.RECEIVE_UPDATE_BOOKMARK);
                    this.view_dialogs.close(f);
                }
                break;
            case g.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE_DIALOG:
                var f = appview.gui.Dialogs.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE;
                if (d == "open") {
                    this.view_dialogs.open(f);
                } else {
                    this.view_dialogs.close(f);
                }
                break;
            case g.ID_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR_DIALOG:
                var f = appview.gui.Dialogs.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR;
                if (d == "open") {
                    this.view_dialogs.open(f);
                } else {
                    this.view_dialogs.close(f);
                }
                break;
            case g.ID_NEXT_SEARCH_PANEL:
                var h = appview.gui.Panels.PANEL_NEXT_SEARCH;
                if (d == "open") {
                    this.view_panels.open(h);
                } else {
                    this.view_panels.close(h);
                }
                break;
            case g.ID_TEXT_SIZE_CHANGE_PANEL:
                var h = appview.gui.Panels.PANEL_TEXT_SIZE;
                if (d == "open") {
                    this.view_panels.open(h);
                } else {
                    this.view_panels.close(h);
                }
                break;
            case g.ID_READ_FINISH_PANEL:
                var h = appview.gui.Panels.PANEL_READ_END;
                if (d == "open") {
                    this.view_panels.open(h);
                } else {
                    this.view_panels.close(h);
                }
                break;
            case g.ID_RETRY_DIALOG:
                var f = appview.gui.Dialogs.DIALOG_RETRY;
                if (d == "open") {
                    this.view_dialogs.open(f);
                } else {
                    this.view_dialogs.close(f);
                }
                break;
            case g.ID_ERROR_DIALOG:
                break;
            case g.ID_COLOPHON_PANEL:
                var h = appview.gui.Panels.PANEL_COLOPHON;
                if (d == "open") {
                    this.view_panels.open(h);
                } else {
                    this.view_panels.close(h);
                }
                break;
            default:
            }
        },
        openGuidance: function() {
            return false;
        },
        openErrorDialog: function(f, e) {
            var g = {
                code: f,
                message: e
            };
            var d = appview.gui.Dialogs.DIALOG_ERROR;
            this.view_dialogs.open(d, g);
        },
        openErrorTitleDialog: function(g, e) {
            var f = {
                title: g,
                message: e
            };
            var d = appview.gui.Dialogs.DIALOG_ERROR_TITLE;
            this.view_dialogs.open(d, f);
        },
        openMenu: function() {
            var d = false;
            var e = (new Date()) - this._timeMenuCloseNow;
            if (e >= appview.constants.WAIT_TIME_TO_OPEN_MENU) {
                d = true;
                this.view_menu.open();
            }
            return d;
        },
        closeMenu: function() {
            this._timeMenuCloseNow = new Date();
            this.view_menu.close();
        },
        directOpenMenu: function() {
            if (this.view_advertisement_pages.isOpenedEither()) {
                return;
            }
            this.view_menu.open();
        },
        isOpenedPanels: function() {
            return this.view_panels.isOpen();
        },
        isOpenedDialogs: function() {
            return this.view_dialogs.isOpen();
        },
        isOpenedLoadingSpinner: function() {
            return this.view_loading_spinner.isOpen();
        },
        isOpenedSubPanel: function() {
            return this.view_menu.isOpenedEitherSubPanel();
        },
        isOpendAdvertisementPages: function() {
            return this.view_advertisement_pages.isOpenedEither();
        },
        isOpenedRetryDialog: function() {
            var e = appview.gui.Dialogs.DIALOG_RETRY;
            var d = this.view_dialogs.getDialog(e);
            return d.isOpen();
        },
        isUseView: function(d) {
            var e = false;
            switch (d) {
            case appview.constants.ID_SPLASH_SCREEN:
                e = this.view_splash_screen.isUse();
                break;
            case appview.constants.ID_COLOPHON_PANEL:
                var f = appview.gui.Panels.PANEL_COLOPHON;
                e = this.view_panels.isUse(f);
                break;
            }
            return (e === true);
        },
        _actionMessaging: function(f) {
            var g = appview.gui.Panels.PANEL_COLOPHON;
            var d = appview.manager.view_panels.getPanel(g);
            var e = appview.messaging_manager;
            switch (f) {
            case e.ACTION_CLOSE_COLOPHON:
                d.actionClose();
                break;
            case e.ACTION_JUMP_FIRST_PAGE:
                d.actionFirstPage();
                break;
            case e.ACTION_NEXT_SEARCH:
                d.actionNextSearch();
                break;
            case e.ACTION_CLOSE_VIEWER:
                d.actionCloseViewer();
                break;
            }
        },
        _eventWindowResize_view: function(d) {
            this.view_menu.updateLayout();
            this.view_panels.updateLayout();
            this.view_splash_screen.updateLayout();
            this.view_dialogs.updateLayout();
        },
        openLoadingSpinner: function() {
            this.view_loading_spinner.open();
        },
        closeLoadingSpinner: function() {
            this.view_loading_spinner.close();
        },
        closeAdPageBeginning: function(d) {
            this.view_advertisement_pages.closeAdPage(appview.gui.AdvertisementPages.TYPE_INTRODUCTION);
        },
        closeAdPageEnd: function(d) {
            this.view_advertisement_pages.closeAdPage(appview.gui.AdvertisementPages.TYPE_POSTSCRIPT);
        }
    };
    a.appview.coreAccess = {
        _coreEngine: null,
        setCoreAccess: function(d) {
            this._coreEngine = d;
        },
        getMessage: function(d) {
            return this._coreEngine.getMessage(d);
        },
        getViewerVersion: function() {
            return this._coreEngine.getViewerVersion();
        },
        getTotalDoublePage: function() {
            return this._coreEngine.getTotalDoublePage();
        },
        getTrialFirstPageIndex: function() {
            return this._coreEngine.getTrialFirstPageIndex();
        },
        getTrialLastPageIndex: function() {
            return this._coreEngine.getTrialLastPageIndex();
        },
        getTotalDoublePageTrialFirstPageIndex: function() {
            return this._coreEngine.getTotalDoublePageTrialFirstPageIndex();
        },
        getTotalDoublePageTrialLastPageIndex: function() {
            return this._coreEngine.getTotalDoublePageTrialLastPageIndex();
        },
        isTrialMode: function() {
            return this._coreEngine.isTrialMode();
        },
        isBindingLeft: function() {
            return this._coreEngine.isBindingLeft();
        },
        isBindingRight: function() {
            return this._coreEngine.isBindingRight();
        },
        getCurrentPageNumber: function() {
            return this._coreEngine.getComputedCurrentPage();
        },
        getTotalPage: function() {
            return this._coreEngine.getTotalPage();
        },
        getPageData: function() {
            return this._coreEngine.getPageData();
        },
        getContentsData: function() {
            return this._coreEngine.getContentsData();
        },
        isLandscapeAndNotViewTypeScroll: function() {
            return this._coreEngine.isLandscapeAndNotViewTypeScroll();
        },
        getBookmarkPageData: function() {
            return this._coreEngine.getBookmarkPageData();
        },
        deleteBookmarkPageData: function() {
            this._coreEngine.deleteBookmarkPageData();
        },
        getNextSearchEnabled: function() {
            return this._coreEngine.getNextSearchEnabled();
        },
        getViewTypeScroll: function() {
            return this._coreEngine.isViewTypeOfScroll();
        },
        getIsTextContent: function() {
            return this._coreEngine.isTextContent();
        },
        getTextSizeIndexData: function() {
            return this._coreEngine.getTextSizeIndexData();
        },
        getTableOfContentsData: function() {
            return this._coreEngine.getTableOfContentsData();
        },
        tableOfContentsJump: function(d) {
            this._coreEngine.selectNavigationList(d);
        },
        isPageOnEarlier: function() {
            return this._coreEngine.isPageOnEarlier();
        },
        goBackToPageOnEarlier: function() {
            this._coreEngine.goBackToPageOnEarlier();
        },
        isKomaMode: function() {
            return this._coreEngine.isKomaMode();
        },
        controlWrapperView: function(d) {
            this._coreEngine.controlWrapperView(d);
        },
        controlContentsView: function(d) {
            this._coreEngine.controlContentsView(d);
        },
        getNextSearchResult: function() {
            return this._coreEngine.getNextSearchResult();
        },
        getZoomDatas: function() {
            return this._coreEngine.getZoomDatas();
        },
        openPanel: function(d) {
            this._coreEngine.openPanel(d);
        },
        closePanel: function(d) {
            this._coreEngine.closePanel(d);
        },
        movePageRight: function() {
            this._coreEngine.rightPage(false);
        },
        movePageLeft: function() {
            this._coreEngine.leftPage(false);
        },
        openFinishPanel: function() {
            this._coreEngine.openFinishDialog();
        },
        isFirstTime: function() {
            return this._coreEngine.isFirstTime();
        },
        setUseIntroduction: function(d) {
            this._coreEngine.setUseIntroduction(d);
        },
        setUsePostScript: function(d) {
            this._coreEngine.setUsePostScript(d);
        }
    };
    a.appview.util = {
        isDesktopPC: function() {
            return c.porting.env.device.isDesktopPC;
        },
        locationChange: function(d) {
            document.location = d;
        },
        preOpenAndClosePanelProcess: function() {
            c(".cover-wrapper > div").hide();
            c(".panel-wrapper").hide();
            c(".panel-base").hide();
        },
        preOpenErrorDialogProcess: function() {
            c(".cover-wrapper").hide();
            c(".cover-base").hide();
            c(".dialog-panel").hide();
        },
        setDialogPositionTop: function(e) {
            var f = e.outerHeight();
            var d = ((window.innerHeight - f) / 2) >> 0;
            e.css("top", d + "px");
        },
        adjustLayoutDialogBase: function(e) {
            var d = (window.innerHeight + 1) + "px";
            e.css("height", d);
            e.css("top", "0px");
        },
        judgeNonLeftClickInPC: function(d) {
            if (("button"in d) == false) {
                return false;
            }
            if (c.porting.env.device.isDesktopPC) {
                if (d.button !== 0) {
                    return true;
                }
            }
            return false;
        },
        doRefreshDOM: function() {
            var d = c('<div id="div_bookmark_save" style="z-index:99999;"></div>');
            d.appendTo(c("#viewer"));
            d.fadeOut("slow", function() {
                c(this).remove();
            });
        },
        isDialogCollapsesSOL23: function() {
            return c.porting.env.repair.isDialogCollapsesSOL23;
        },
        repairDialogCollapsesSOL23_controlWrapperView: function(d) {
            if (this.isDialogCollapsesSOL23()) {
                appview.coreAccess.controlWrapperView(d);
            }
        },
        controlContentsView: function(d) {
            appview.coreAccess.controlContentsView(d);
        },
        sizeCutUp: function(e) {
            var d = null;
            var f = null;
            var i = "_";
            var g = e.split(i);
            if (g.length == 2) {
                if (appview.util.isNumber(g[0])) {
                    d = g[0] >> 0;
                }
                if (appview.util.isNumber(g[1])) {
                    f = g[1] >> 0;
                }
            }
            return {
                width: d,
                height: f
            };
        },
        fairingHEXcolorString: function(e) {
            var d = null;
            if (/^#/i.test(e) == false) {
                e = "#" + e;
            }
            if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)) {
                d = e;
            }
            return d;
        },
        isNumber: function(e) {
            var d = false;
            if ((typeof (e) != "number") && (typeof (e) != "string")) {
                d = false;
            } else {
                d = ((e == parseFloat(e)) && (isFinite(e)));
            }
            return d;
        }
    };
}
)(jQuery, window, BSR4B.Common);
appview.gui = appview.gui || {};
(function(e, c, a, o, m) {
    a.menu = {};
    var n = function(q) {
        this.params = {
            bt_fullscreen: ""
        };
        e.extend(true, this.params, q);
        this._bt_fullscreen = null;
        this._request_fullscreen = null;
        this._init();
    };
    n.prototype = {
        _init: function() {
            var q = {
                element_id: this.params.bt_fullscreen
            };
            this._bt_fullscreen = new o.Button(q);
            this._init_fullscreenAPI();
            if (this._request_fullscreen == null) {
                this._bt_fullscreen.disable();
            } else {
                this._addEvents();
            }
        },
        _init_fullscreenAPI: function() {
            this._request_fullscreen = (function() {
                return document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.msRequestFullscreen || null;
            }
            )();
        },
        _addEvents: function() {
            this._bt_fullscreen.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickFullscreenButton, this));
        },
        _eventClickFullscreenButton: function(r) {
            var q = document.documentElement;
            if (q.requestFullscreen) {
                if (document.fullScreenElement) {
                    document.cancelFullScreen();
                } else {
                    q.requestFullscreen();
                }
            } else {
                if (q.webkitRequestFullScreen) {
                    if (document.webkitIsFullScreen) {
                        document.webkitCancelFullScreen();
                    } else {
                        q.webkitRequestFullScreen();
                    }
                } else {
                    if (q.mozRequestFullScreen) {
                        if (document.mozFullScreenElement) {
                            document.mozCancelFullScreen();
                        } else {
                            q.mozRequestFullScreen();
                        }
                    } else {
                        if (q.msRequestFullscreen) {
                            if (document.msFullscreenElement) {
                                document.msExitFullscreen();
                            } else {
                                q.msRequestFullscreen();
                            }
                        }
                    }
                }
            }
        }
    };
    a.menu.FullscreenButton = n;
    var j = function(q) {
        this.params = {
            bt_expansion: "",
            bt_reduction: ""
        };
        e.extend(true, this.params, q);
        this._bt_expansion = null;
        this._bt_reduction = null;
        this._init();
    };
    j.prototype = {
        update: function() {
            this._update();
        },
        _init: function() {
            var q = {
                element_id: this.params.bt_expansion
            };
            this._bt_expansion = new o.Button(q);
            var r = {
                element_id: this.params.bt_reduction
            };
            this._bt_reduction = new o.Button(r);
            this._addEvents();
        },
        _addEvents: function() {
            this._bt_expansion.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickExpansion, this));
            this._bt_reduction.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickReduction, this));
        },
        _eventClickExpansion: function(r) {
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_ZOOM_EXPANSION);
        },
        _eventClickReduction: function(r) {
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_ZOOM_REDUCTION);
        },
        _update: function() {
            var r = true;
            var q = true;
            var s = c.coreAccess.getZoomDatas();
            if (s.is_use == false) {
                r = false;
                q = false;
            } else {
                r = s.is_expansion;
                q = s.is_reduction;
            }
            if (r) {
                this._bt_expansion.enable();
            } else {
                this._bt_expansion.disable();
            }
            if (q) {
                this._bt_reduction.enable();
            } else {
                this._bt_reduction.disable();
            }
        }
    };
    a.menu.ZoomButtons = j;
    var d = function(q) {
        this.params = {
            bt_page_on_earlier: ""
        };
        e.extend(true, this.params, q);
        this._bt_page_on_earlier = null;
        this._init();
    };
    d.prototype = {
        update: function() {
            this._update();
        },
        _init: function() {
            var q = {
                element_id: this.params.bt_page_on_earlier
            };
            this._bt_page_on_earlier = new o.Button(q);
            this._addEvents();
        },
        _addEvents: function() {
            this._bt_page_on_earlier.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickPageOnEarlier, this));
        },
        _eventClickPageOnEarlier: function(q) {
            c.coreAccess.goBackToPageOnEarlier();
        },
        _update: function() {
            if (c.coreAccess.isPageOnEarlier()) {
                this._bt_page_on_earlier.enable();
            } else {
                this._bt_page_on_earlier.disable();
            }
        }
    };
    a.menu.PageOnEarlierButton = d;
    var p = function(q) {
        this.params = {
            base: "",
            handle: "",
            slider_nombre: {}
        };
        e.extend(true, this.params, q);
        this._slider = null;
        this._nombre = null;
        this._pagination_datas = {
            first_page: 0,
            last_page: 0,
            total_page: 0,
            is_binding_left: true
        };
        this._current_page = 0;
        this._unit_scale = 0;
        this._now_value = 0;
        this._init();
    };
    p.prototype = {
        standby: function() {
            this._standby();
        },
        update: function() {
            this._update();
        },
        close: function() {
            this._close();
        },
        _init: function() {
            var q = {
                element_id: this.params.base,
                handle_id: this.params.handle
            };
            this._slider = new o.Slider(q);
            this._nombre = new a.menu.PaginationNombre(this.params.slider_nombre);
            this._addEvents();
        },
        _addEvents: function() {
            this._slider.getDispatch().on(o.Slider.EVENT_CHANGE, e.proxy(this._eventChangeSlider, this));
            this._slider.getDispatch().on(o.Slider.EVENT_FINISH, e.proxy(this._eventFinishSlider, this));
        },
        _eventChangeSlider: function(r) {
            var q = Math.round(r.value / this._unit_scale);
            if (q !== this._now_value) {
                this._now_value = q;
                var s = this._convertPageValueBinding(this._now_value) + this._pagination_datas.first_page;
                this._nombre.update(s);
            }
        },
        _eventFinishSlider: function(t) {
            var q = this._unit_scale * this._now_value;
            this._slider.setValue(q);
            var u = this._convertPageValueBinding(this._now_value) + this._pagination_datas.first_page;
            var s = {};
            s.now_page_number = u;
            var r = c.manager.getEventDispatcher();
            r.trigger(c.events.EVENT_JUMP_PAGE, s);
        },
        _standby: function() {
            var u = (c.coreAccess.getTotalDoublePageTrialFirstPageIndex() + 1) >> 0;
            var t = (c.coreAccess.getTotalDoublePage()) >> 0;
            var q = c.coreAccess.isBindingLeft();
            var s = t - u;
            var r = 0;
            if (s <= 1) {
                this._slider.disable();
            } else {
                this._slider.enable();
            }
            r = 1 / (t - u);
            this._pagination_datas.first_page = u;
            this._pagination_datas.last_page = t;
            this._pagination_datas.total_page = s;
            this._pagination_datas.is_binding_left = q;
            this._unit_scale = r;
            this._nombre.standby(u, t);
        },
        _update: function() {
            var s = this._pagination_datas.first_page;
            var r = (c.coreAccess.getCurrentPageNumber()) >> 0;
            var q = (r - s) * this._unit_scale;
            q = this._convertPercentValueBinding(q);
            this._current_page = r;
            this._slider.setValue(q);
            this._nombre.update(r);
        },
        _close: function() {
            this._nombre.close();
        },
        _convertPercentValueBinding: function(q) {
            return (this._pagination_datas.is_binding_left) ? q : (1 - q);
        },
        _convertPageValueBinding: function(q) {
            return (this._pagination_datas.is_binding_left) ? q : (this._pagination_datas.total_page - q);
        }
    };
    a.menu.PaginationSlider = p;
    var i = function(q) {
        this.params = {
            element: "",
            nombre_current: "",
            nombre_total: ""
        };
        e.extend(true, this.params, q);
        this.$element = null;
        this.$current = null;
        this.$total = null;
        this._first = 0;
        this._last = 0;
        this._current_page = 0;
        this._total_num = 0;
        this._init();
    };
    i.prototype = {
        standby: function(r, q) {
            this._standby(r, q);
            this._open();
        },
        update: function(q) {
            this._update(q);
        },
        close: function() {
            this._close();
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            this.$current = e("#" + this.params.nombre_current);
            this.$total = e("#" + this.params.nombre_total);
        },
        _standby: function(r, q) {
            this._first = r;
            this._last = q;
            this._total_num = q - r + 1;
            this.$total.text(this._total_num);
        },
        _update: function(q) {
            this._current_page = q;
            this.$current.text(q);
        },
        _open: function() {
            this.$element.addClass("onstage");
        },
        _close: function() {
            this.$element.removeClass("onstage");
        }
    };
    a.menu.PaginationNombre = i;
    var l = function(q) {
        this.params = {
            element: "",
            elm_nothing: "",
            sl_box: "",
            sl_content: "",
            sl_slider: "",
            sl_slider_handle: "",
            css_default: "toc_select_default",
            css_disable: "disable",
            css_nothing: "nothing"
        };
        e.extend(true, this.params, q);
        this.$element = null;
        this.$nothing = null;
        this.scroll_box = null;
        this.scroll_slider = null;
        this.$list = null;
        this._inte_list = null;
        this.$slider = null;
        this._is_create_toc_list = false;
        this._is_open = false;
        this._init();
    };
    l.EVENT_CLOSE = "event_tableofcontents_panel_close";
    l.HEAD_ID = "toc_item_";
    l.prototype = {
        getDispatch: function() {
            return this.$element;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        isOpen: function() {
            return this._is_open;
        },
        reconstructionTocList: function() {
            this._is_create_toc_list = this._createTocList();
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            this.$nothing = e("#" + this.params.elm_nothing);
            this.$list = e("#" + this.params.sl_content);
            this.$slider = e("#" + this.params.sl_slider);
            var q = {
                element_id: this.params.sl_box,
                content_id: this.params.sl_content
            };
            this.scroll_box = new o.ScrollBox(q);
            var r = {
                element_id: this.params.sl_slider,
                handle_id: this.params.sl_slider_handle
            };
            this.scroll_slider = new o.ScrollSlider(r);
            this._inte_list = m.EventFactory.createEventListenerSingle(this.params.sl_content);
            this._addEvents();
        },
        _addEvents: function() {
            var q = m.util.getSupportEventName("down");
            this.$element.on(q, function(r) {
                return false;
            });
            this.scroll_slider.getDispatch().on(o.ScrollSlider.EVENT_CHANGE, e.proxy(this._eventChangeScrollSlider, this));
            this._inte_list.addEventUp(e.proxy(this._eventClickTocList, this));
        },
        _open: function() {
            if (this._is_open) {
                return;
            }
            if (this._is_create_toc_list == false) {
                this._is_create_toc_list = this._createTocList();
            }
            this._is_open = true;
            this.$element.addClass("onstage");
            this._updateScrollSlider();
            var q = m.util.getSupportEventName("down");
            e(document).one(q, e.proxy(this._eventMouseDownDocument, this));
        },
        _close: function() {
            this.$element.removeClass("onstage");
            this._is_open = false;
            this.$element.trigger({
                type: l.EVENT_CLOSE
            });
        },
        _updateLayout: function() {
            this._updateScrollSlider();
            this.scroll_box.update();
            var q = this.scroll_box.getScrollPerV();
            this.scroll_slider.setValue(q);
        },
        _eventMouseDownDocument: function(q) {
            this._close();
        },
        _eventChangeScrollSlider: function(q) {
            this.scroll_box.scrollV(q.value);
        },
        _eventClickTocList: function(s) {
            var r = l.HEAD_ID;
            var q = s.target.id;
            var u = RegExp(r, "i").test(q);
            var t = 0;
            if (u) {
                t = s.target.value >> 0;
                c.coreAccess.tableOfContentsJump(t);
            }
        },
        _updateScrollSlider: function() {
            var r = this.scroll_box.getContentRange();
            var q = this.scroll_box.getBoxRange();
            this.scroll_slider.setContentRange(r, q);
        },
        _createTocList: function() {
            var w = c.coreAccess.getTableOfContentsData();
            var t = w.length;
            var y = c.coreAccess.getTrialFirstPageIndex();
            var x = c.coreAccess.getTrialLastPageIndex();
            var A = l.HEAD_ID;
            var u = this.params.css_default;
            var q = this.params.css_disable;
            var r = this.params.css_nothing;
            var D = null;
            var s = null;
            var B = false;
            var z, C;
            var v = 0;
            if (t > 0) {
                this.$nothing.hide();
                this.$slider.show();
                D = e("<div></div>");
                this.$list.children().remove();
                for (v = 0; v < t; v++) {
                    z = w[v].page;
                    C = w[v].str;
                    s = D.clone().attr("id", (A + v)).attr("value", z).html(C).addClass(u);
                    if ((z < y) || (z > x)) {
                        s.addClass(q);
                    }
                    this.$list.append(s);
                }
                D.remove();
                B = true;
            } else {
                this.$nothing.show();
                this.$slider.hide();
                this.$element.addClass(r);
                B = false;
            }
            return B;
        }
    };
    a.menu.TableOfContentsPanel = l;
    var g = function(q) {
        this.params = {
            element: "",
            tx_bm1: "",
            tx_bm2: "",
            bt_jump_bm1: "",
            bt_jump_bm2: "",
            bt_update_bm1: "",
            bt_update_bm2: "",
            bt_delete: "",
            label_data: {
                empty: "",
                page: ""
            }
        };
        e.extend(true, this.params, q);
        this.$element = null;
        this.$tx_bm1 = null;
        this.$tx_bm2 = null;
        this._bt_jump_bm1 = null;
        this._bt_jump_bm2 = null;
        this._bt_update_bm1 = null;
        this._bt_update_bm2 = null;
        this._bt_delete = null;
        this._page_num_bm1 = -1;
        this._page_num_bm2 = -1;
        this._is_open = false;
        this._init();
    };
    g.EVENT_CLOSE = "event_bookmark_panel_close";
    g.NUM_MARK_1 = 1;
    g.NUM_MARK_2 = 2;
    g.prototype = {
        getDispatch: function() {
            return this.$element;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        isOpen: function() {
            return this._is_open;
        },
        updateBookmark: function() {
            this._update();
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            this.$tx_bm1 = e("#" + this.params.tx_bm1);
            this.$tx_bm2 = e("#" + this.params.tx_bm2);
            var u = {
                element_id: this.params.bt_jump_bm1
            };
            this._bt_jump_bm1 = new o.Button(u);
            var t = {
                element_id: this.params.bt_jump_bm2
            };
            this._bt_jump_bm2 = new o.Button(t);
            var s = {
                element_id: this.params.bt_update_bm1
            };
            this._bt_update_bm1 = new o.Button(s);
            var r = {
                element_id: this.params.bt_update_bm2
            };
            this._bt_update_bm2 = new o.Button(r);
            var q = {
                element_id: this.params.bt_delete
            };
            this._bt_delete = new o.Button(q);
            this._addEvents();
        },
        _addEvents: function() {
            var q = m.util.getSupportEventName("down");
            this.$element.on(q, function(r) {
                return false;
            });
            this._bt_jump_bm1.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickJumpBookmark1, this));
            this._bt_jump_bm2.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickJumpBookmark2, this));
            this._bt_update_bm1.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickUpdateBookmark1, this));
            this._bt_update_bm2.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickUpdateBookmark2, this));
            this._bt_delete.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickDelete, this));
        },
        _open: function() {
            if (this._is_open) {
                return;
            }
            this._update();
            this._is_open = true;
            this.$element.addClass("onstage");
            var q = m.util.getSupportEventName("down");
            e(document).one(q, e.proxy(this._eventMouseDownDocument, this));
        },
        _close: function() {
            this.$element.removeClass("onstage");
            this._is_open = false;
            this.$element.trigger({
                type: g.EVENT_CLOSE
            });
        },
        _updateLayout: function() {},
        _eventMouseDownDocument: function(q) {
            this._close();
        },
        _eventClickJumpBookmark1: function(q) {
            this._dispatchBookmarkJump(g.NUM_MARK_1);
        },
        _eventClickJumpBookmark2: function(q) {
            this._dispatchBookmarkJump(g.NUM_MARK_2);
        },
        _eventClickUpdateBookmark1: function(r) {
            var q = g.NUM_MARK_1;
            if (this._page_num_bm1 >= 0) {
                this._dispatchBookmarkOverwriteConfirm(q);
            } else {
                this._dispatchBookmarkSave(q);
                this._update();
            }
        },
        _eventClickUpdateBookmark2: function(r) {
            var q = g.NUM_MARK_2;
            if (this._page_num_bm2 >= 0) {
                this._dispatchBookmarkOverwriteConfirm(q);
            } else {
                this._dispatchBookmarkSave(q);
                this._update();
            }
        },
        _eventClickDelete: function(r) {
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_OPEN_BOOKMARK_DELETE_CONFIRM_DIALOG);
        },
        _update: function() {
            var q = c.coreAccess.getBookmarkPageData();
            var s = q.bookmark1 >> 0;
            var r = q.bookmark2 >> 0;
            this._page_num_bm1 = s;
            this._page_num_bm2 = r;
            this.$tx_bm1.text(this._convertBookmarkNumberToLabel(s));
            this.$tx_bm2.text(this._convertBookmarkNumberToLabel(r));
            if (s >= 0) {
                this._bt_jump_bm1.enable();
            } else {
                this._bt_jump_bm1.disable();
            }
            if (r >= 0) {
                this._bt_jump_bm2.enable();
            } else {
                this._bt_jump_bm2.disable();
            }
            if ((s >= 0) || (r >= 0)) {
                this._bt_delete.enable();
            } else {
                this._bt_delete.disable();
            }
        },
        _dispatchBookmarkSave: function(s) {
            var r = {};
            r.bookmark_id = s;
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_BOOKMARK_SAVE, r);
        },
        _dispatchBookmarkOverwriteConfirm: function(s) {
            var r = {};
            r.bookmark_id = s;
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_OPEN_BOOKMARK_OVERWRITE_CONFIRM_DIALOG, r);
        },
        _dispatchBookmarkJump: function(s) {
            var r = {};
            r.bookmark_id = s;
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_BOOKMARK_JUMP, r);
        },
        _doBookmarkDelete: function() {
            c.coreAccess.deleteBookmarkPageData();
        },
        _convertBookmarkNumberToLabel: function(r) {
            var q = this.params.label_data.empty;
            if (r >= 0) {
                q = (r + 1) + this.params.label_data.page;
            }
            return q;
        }
    };
    a.menu.BookmarkPanel = g;
    var b = function(q) {
        this.params = {
            element: "",
            tx_version: "",
            bt_help: "",
            bt_nextsearch: "",
            bt_textsize: ""
        };
        e.extend(true, this.params, q);
        this.$element = null;
        this._bt_help = null;
        this._bt_next_search = null;
        this._bt_text_size = null;
        this._is_open = false;
        this._init();
    };
    b.EVENT_CLOSE = "event_setting_panel_close";
    b.prototype = {
        getDispatch: function() {
            return this.$element;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        isOpen: function() {
            return this._is_open;
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            var s = {
                element_id: this.params.bt_help
            };
            this._bt_help = new o.Button(s);
            var u = {
                element_id: this.params.bt_nextsearch
            };
            this._bt_next_search = new o.Button(u);
            var r = {
                element_id: this.params.bt_textsize
            };
            this._bt_text_size = new o.Button(r);
            var t = e("#" + this.params.tx_version);
            var q = c.coreAccess.getViewerVersion();
            t.text(q);
            this._addEvents();
        },
        _addEvents: function() {
            var q = m.util.getSupportEventName("down");
            this.$element.on(q, function(r) {
                return false;
            });
            this._bt_help.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickHelp, this));
            this._bt_next_search.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickNextSearch, this));
            this._bt_text_size.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickTextSize, this));
        },
        _open: function() {
            if (this._is_open) {
                return;
            }
            var s;
            var t, r;
            s = c.coreAccess.getNextSearchEnabled();
            if (s) {
                this._bt_next_search.enable();
            } else {
                this._bt_next_search.disable();
                this._doDisableParentNode(this.params.bt_nextsearch);
            }
            if (c.coreAccess.isTrialMode()) {
                this._bt_text_size.disable();
                this._doDisableParentNode(this.params.bt_textsize);
            } else {
                t = c.coreAccess.getTextSizeIndexData();
                r = t.sizes_length;
                if (r >= 2) {
                    this._bt_text_size.enable();
                } else {
                    this._bt_text_size.disable();
                    this._doDisableParentNode(this.params.bt_textsize);
                }
            }
            this._is_open = true;
            this.$element.addClass("onstage");
            var q = m.util.getSupportEventName("down");
            e(document).one(q, e.proxy(this._eventMouseDownDocument, this));
        },
        _close: function() {
            this.$element.removeClass("onstage");
            this._is_open = false;
            this.$element.trigger({
                type: b.EVENT_CLOSE
            });
        },
        _close_menu: function() {
            c.manager.closeMenu();
        },
        _updateLayout: function() {},
        _eventMouseDownDocument: function(q) {
            this._close();
        },
        _eventClickHelp: function(r) {
            this._close();
            this._close_menu();
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_OPEN_HELP_PAGE);
        },
        _eventClickNextSearch: function(r) {
            this._close();
            this._close_menu();
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_OPEN_NEXTSEARCH);
        },
        _eventClickTextSize: function(q) {
            this._close();
            this._close_menu();
            c.coreAccess.openPanel(c.constants.ID_TEXT_SIZE_CHANGE_PANEL);
        },
        _doDisableParentNode: function(r) {
            var q = document.getElementById(r);
            var s = null;
            if (q != null) {
                s = q.parentNode;
                if (s != null) {
                    e(s).css("display", "none");
                }
            }
        }
    };
    a.menu.SettingPanel = b;
    var h = function(q) {
        this.params = {
            element: "",
            bt_exitviewer: "",
            bt_menu_tableofcontents: "",
            bt_menu_bookmark: "",
            bt_menu_setting: "",
            params_setting_panel: {},
            params_bookmark_panel: {},
            params_tableofcontents_panel: {}
        };
        e.extend(true, this.params, q);
        this.$element = null;
        this._bt_exitviewer = null;
        this._bt_tableofcontents = null;
        this._bt_bookmark = null;
        this._bt_setting = null;
        this._setting_panel = null;
        this._bookmark_panel = null;
        this._tableofcontents_panel = null;
        this._init();
    };
    h.prototype = {
        isOpenedEitherSubPanel: function() {
            if (this._setting_panel.isOpen()) {
                return true;
            }
            if (this._bookmark_panel.isOpen()) {
                return true;
            }
            if (this._tableofcontents_panel.isOpen()) {
                return true;
            }
            return false;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        receive_text_size_change_completed: function() {
            this._tableofcontents_panel.reconstructionTocList();
        },
        bookmark_update: function() {
            this._bookmark_panel.updateBookmark();
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            var s = {
                element_id: this.params.bt_exitviewer
            };
            this._bt_exitviewer = new o.Button(s);
            var r = {
                element_id: this.params.bt_menu_tableofcontents
            };
            this._bt_tableofcontents = new o.Button(r);
            var q = {
                element_id: this.params.bt_menu_bookmark
            };
            this._bt_bookmark = new o.Button(q);
            var t = {
                element_id: this.params.bt_menu_setting
            };
            this._bt_setting = new o.Button(t);
            this._setting_panel = new a.menu.SettingPanel(this.params.params_setting_panel);
            this._bookmark_panel = new a.menu.BookmarkPanel(this.params.params_bookmark_panel);
            this._tableofcontents_panel = new a.menu.TableOfContentsPanel(this.params.params_tableofcontents_panel);
            this._addEvents();
        },
        _addEvents: function() {
            this._bt_exitviewer.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickExitViewer, this));
            this._bt_tableofcontents.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickTocButton, this));
            this._bt_bookmark.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickBookmarkButton, this));
            this._bt_setting.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickSettingButton, this));
            this._bookmark_panel.getDispatch().on(a.menu.BookmarkPanel.EVENT_CLOSE, e.proxy(this._eventBookmarkPanelClose, this));
            this._tableofcontents_panel.getDispatch().on(a.menu.TableOfContentsPanel.EVENT_CLOSE, e.proxy(this._eventTocPanelClose, this));
            this._setting_panel.getDispatch().on(a.menu.SettingPanel.EVENT_CLOSE, e.proxy(this._eventSettingPanelClose, this));
        },
        _open: function() {
            this.$element.addClass("onstage");
        },
        _close: function() {
            this.$element.removeClass("onstage");
        },
        _updateLayout: function() {
            this._bookmark_panel.updateLayout();
            this._tableofcontents_panel.updateLayout();
            this._setting_panel.updateLayout();
        },
        _eventClickExitViewer: function(r) {
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_DO_BACK_SITE_PAGE);
        },
        _eventClickTocButton: function(q) {
            this._bt_tableofcontents.disable();
            this._tableofcontents_panel.open();
        },
        _eventClickBookmarkButton: function(q) {
            this._bt_bookmark.disable();
            this._bookmark_panel.open();
        },
        _eventClickSettingButton: function(q) {
            this._bt_setting.disable();
            this._setting_panel.open();
        },
        _eventBookmarkPanelClose: function(q) {
            this._bt_bookmark.enable();
        },
        _eventTocPanelClose: function(q) {
            this._bt_tableofcontents.enable();
        },
        _eventSettingPanelClose: function(q) {
            this._bt_setting.enable();
        }
    };
    a.Header = h;
    var k = function(q) {
        this.params = {
            element: "",
            bt_arrow_left: "",
            bt_arrow_right: "",
            slider_pagination: {},
            zoom_buttons: {},
            fullscreen_button: {},
            page_on_earlier_button: {}
        };
        e.extend(true, this.params, q);
        this.$element = null;
        this._bt_arrow_left = null;
        this._bt_arrow_right = null;
        this._slider_pagination = null;
        this._zoom_buttons = null;
        this._fullscreen_button = null;
        this._page_on_earlier_button = null;
        this._init();
    };
    k.prototype = {
        isOpenedEitherSubPanel: function() {
            return false;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        update_screen: function() {
            this._slider_pagination.update();
            this._page_on_earlier_button.update();
        },
        update_zoom: function() {
            this._zoom_buttons.update();
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            if (this.params.bt_arrow_left != "") {
                var r = {
                    element_id: this.params.bt_arrow_left
                };
                this._bt_arrow_left = new o.Button(r);
            }
            if (this.params.bt_arrow_right != "") {
                var q = {
                    element_id: this.params.bt_arrow_right
                };
                this._bt_arrow_right = new o.Button(q);
            }
            this._slider_pagination = new a.menu.PaginationSlider(this.params.slider_pagination);
            this._zoom_buttons = new a.menu.ZoomButtons(this.params.zoom_buttons);
            this._fullscreen_button = new a.menu.FullscreenButton(this.params.fullscreen_button);
            this._page_on_earlier_button = new a.menu.PageOnEarlierButton(this.params.page_on_earlier_button);
            this._addEvents();
        },
        _addEvents: function() {
            if (this._bt_arrow_left != null) {
                this._bt_arrow_left.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickArrowLeft, this));
            }
            if (this._bt_arrow_right != null) {
                this._bt_arrow_right.getDispatch().on(o.Button.EVENT_ACTION, e.proxy(this._eventClickArrowRight, this));
            }
        },
        _open: function() {
            this._slider_pagination.standby();
            this._slider_pagination.update();
            this._zoom_buttons.update();
            this._page_on_earlier_button.update();
            this.$element.addClass("onstage");
        },
        _close: function() {
            this._slider_pagination.close();
            this.$element.removeClass("onstage");
        },
        _updateLayout: function() {},
        _eventClickArrowLeft: function(q) {
            c.coreAccess.movePageLeft();
        },
        _eventClickArrowRight: function(q) {
            c.coreAccess.movePageRight();
        }
    };
    a.Footer = k;
    var f = function(q) {
        this.params = {
            element: "",
            params_header: {},
            params_footer: {}
        };
        e.extend(true, this.params, q);
        this.$element = null;
        this._inte_element = null;
        this._obj_header = null;
        this._obj_footer = null;
        this._is_open = false;
        this._init();
    };
    f.prototype = {
        isOpenedEitherSubPanel: function() {
            if (this._obj_header.isOpenedEitherSubPanel()) {
                return true;
            }
            if (this._obj_footer.isOpenedEitherSubPanel()) {
                return true;
            }
            return false;
        },
        open: function() {
            this._setMenuOn();
        },
        close: function() {
            this._setMenuOff();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        receive_events: function(q) {
            switch (q) {
            case c.events.RECEIVE_TEXT_SIZE_CHANGE_COMPLETED:
                this._obj_header.receive_text_size_change_completed();
                break;
            case c.events.RECEIVE_TABLE_OF_CONTENTS_REFRESH:
                break;
            case c.events.RECEIVE_UPDATE_SCREEN:
                this._obj_footer.update_screen();
                break;
            case c.events.RECEIVE_UPDATE_ZOOM:
                this._obj_footer.update_zoom();
                break;
            case c.events.RECEIVE_UPDATE_BOOKMARK:
                this._obj_header.bookmark_update();
                break;
            }
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            this.$element.css("display", "none");
            this._inte_element = m.EventFactory.createEventListenerSingle(this.params.element);
            this._obj_header = new a.Header(this.params.header_params);
            this._obj_footer = new a.Footer(this.params.footer_params);
            this._addEvents();
        },
        _addEvents: function() {
            this._inte_element.addEventUp(e.proxy(this._eventClickBackground, this));
        },
        _setMenuOn: function() {
            if (this._is_open == true) {
                return;
            }
            this._is_open = true;
            this.$element.css("display", "block");
            this._obj_header.open();
            this._obj_footer.open();
        },
        _setMenuOff: function() {
            if (this._is_open == false) {
                return;
            }
            this.$element.css("display", "none");
            this._obj_header.close();
            this._obj_footer.close();
            this._is_open = false;
        },
        _updateLayout: function() {
            this._obj_header.updateLayout();
            this._obj_footer.updateLayout();
        },
        _eventClickBackground: function(r) {
            var q = c.manager.getEventDispatcher();
            q.trigger(c.events.EVENT_TAP_MENU_BACKGROUND);
        }
    };
    a.Menu = f;
}
)(jQuery, appview, appview.gui, UIs, Interaction);
(function(e, c, a, l, i) {
    a.panel = {};
    var h = function(m) {
        this.params = {
            element_id: "",
            step_point_css: "",
            step_point_select_css: ""
        };
        e.extend(true, this.params, m);
        this.$element = null;
        this.$select_point = null;
        this._is_standby = false;
        this._init();
    };
    h.prototype = {
        standby: function(m, n) {
            this._standby(m, n);
        },
        _init: function() {
            this.$element = e("#" + this.params.element_id);
            var m = document.createElement("div");
            this.$select_point = e(m).addClass(this.params.step_point_select_css);
            this.$element.append(m);
        },
        _standby: function(m, n) {
            var p = 1;
            if (m >= 2) {
                p = 1 / (m - 1);
            }
            this.$select_point.css({
                left: (n * p * 100) + "%"
            });
            if (this._is_standby) {
                return;
            }
            this._is_standby = true;
            var q = null;
            var r = null;
            var o = 0;
            for (o = 0; o < m; o++) {
                q = document.createElement("div");
                r = e(q).addClass(this.params.step_point_css);
                r.css({
                    left: (o * p * 100) + "%"
                });
                this.$element.append(q);
                q = null;
            }
            r = null;
        }
    };
    a.panel.StepSliderPoints = h;
    var k = function(m) {
        this.params = {
            element_id: "",
            slider_base_id: "",
            slider_handle_id: "",
            params_step_points: {
                element_id: "",
                step_point_css: "",
                step_point_select_css: ""
            }
        };
        e.extend(true, this.params, m);
        this.$element = null;
        this._slider = null;
        this._step_slider_points = null;
        this._now_size_index = -1;
        this._select_size_index = -1;
        this._init();
    };
    k.EVENT_CHANGE = "event_text_size_slider_change";
    k.prototype = {
        getDispatch: function() {
            return this.$element;
        },
        standby: function() {
            this._standby();
        },
        enable: function() {
            this._enable();
        },
        disable: function() {
            this._disable();
        },
        getNowSizeIndex: function() {
            return this._now_size_index;
        },
        getSelectSizeIndex: function() {
            return this._select_size_index;
        },
        _init: function() {
            this.$element = e("#" + this.params.element_id);
            var m = {
                element_id: this.params.slider_base_id,
                handle_id: this.params.slider_handle_id
            };
            this._slider = new l.StepSlider(m);
            this._step_slider_points = new a.panel.StepSliderPoints(this.params.params_step_points);
            this._addEvents();
        },
        _addEvents: function() {
            this._slider.getDispatch().on(l.StepSlider.EVENT_CHANGE, e.proxy(this._eventChangeSlider, this));
            this._slider.getDispatch().on(l.StepSlider.EVENT_FINISH, e.proxy(this._eventFinishSlider, this));
        },
        _eventChangeSlider: function(m) {
            this._select_size_index = m.step;
            this.$element.trigger({
                type: k.EVENT_CHANGE,
                step_index: this._select_size_index
            });
        },
        _eventFinishSlider: function(m) {},
        _standby: function() {
            var o = c.coreAccess.getTextSizeIndexData();
            var n = o.now_index;
            var m = o.sizes_length;
            this._step_slider_points.standby(m, n);
            this._now_size_index = n;
            this._slider.updateSteps(m);
            this._slider.setStepIndex(n);
        },
        _enable: function() {
            this._slider.enable();
        },
        _disable: function() {
            this._slider.disable();
        }
    };
    a.panel.TextSizeSlider = k;
    var f = function(m) {
        this.params = {
            element: "",
            bt_close: "",
            bt_change: "",
            params_size_slider: {
                element_id: "",
                slider_base_id: "",
                slider_handle_id: "",
                params_step_points: {
                    element_id: "",
                    step_point_css: "",
                    step_point_select_css: ""
                }
            }
        };
        e.extend(true, this.params, m);
        this.$element = null;
        this._bt_close = null;
        this._bt_change = null;
        this._indicator = null;
        this._size_slider = null;
        this._is_use = true;
        this._is_open = false;
        this._init();
    };
    f.prototype = {
        isUse: function() {
            return this._is_use;
        },
        isOpen: function() {
            return this._is_open;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        resetTextSizeChange: function() {
            this._coreAccessClosePanel();
        },
        cancelTextSizeChange: function() {
            this._coreAccessClosePanel();
        },
        completedTextSizeChange: function() {
            this._coreAccessClosePanel();
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            var m = {
                element_id: this.params.bt_close
            };
            this._bt_close = new l.Button(m);
            var n = {
                element_id: this.params.bt_change
            };
            this._bt_change = new l.Button(n);
            this._size_slider = new a.panel.TextSizeSlider(this.params.params_size_slider);
            this._addEvents();
        },
        _addEvents: function() {
            this._bt_close.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickCloseButton, this));
            this._bt_change.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickChangeButton, this));
            this._size_slider.getDispatch().on(a.panel.TextSizeSlider.EVENT_CHANGE, e.proxy(this._eventChangeSizeSlider, this));
        },
        _eventClickCloseButton: function(m) {
            this._coreAccessClosePanel();
        },
        _eventClickChangeButton: function(o) {
            this._size_slider.disable();
            this._bt_change.disable();
            var n = {};
            n.change_index = this._size_slider.getSelectSizeIndex();
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_TEXT_SIZE_CHANGE, n);
        },
        _eventChangeSizeSlider: function(o) {
            var n = o.step_index;
            var m = this._size_slider.getNowSizeIndex();
            if (n == m) {
                this._bt_change.disable();
            } else {
                this._bt_change.enable();
            }
        },
        _coreAccessClosePanel: function() {
            c.coreAccess.closePanel(c.constants.ID_TEXT_SIZE_CHANGE_PANEL);
        },
        _open: function() {
            if (this._is_open == false) {
                this._size_slider.standby();
                this._size_slider.enable();
                this._bt_change.disable();
                this._is_open = true;
                this.$element.addClass("onstage");
            }
        },
        _close: function() {
            this._is_open = false;
            this._size_slider.disable();
            this.$element.removeClass("onstage");
        },
        _updateLayout: function() {}
    };
    a.panel.PanelTextSize = f;
    var g = function(m) {
        this.params = {
            element: "",
            bt_close: "",
            bt_jump_content: "",
            bt_jump_site: "",
            tx_message: ""
        };
        e.extend(true, this.params, m);
        this.$element = null;
        this.$tx_message = null;
        this._bt_close = null;
        this._bt_jump_content = null;
        this._bt_jump_site = null;
        this._is_use = true;
        this._is_open = false;
        this._nextSiteUrl = "";
        this._nextContentParam = "";
        this._init();
    };
    g.prototype = {
        isUse: function() {
            return this._is_use;
        },
        isOpen: function() {
            return this._is_open;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        update: function() {
            var o = c.coreAccess.getNextSearchResult();
            var m = o.code;
            var t = o.type;
            var v = o.nextMessage;
            var p = o.nextdata;
            var q = "";
            var s = "";
            var n = "none";
            var r = "none";
            if (m == "1000") {
                switch (t) {
                case "0":
                    q = "1200";
                    break;
                case "1":
                    q = "1201";
                    break;
                case "2":
                    q = "1202";
                    n = "block";
                    this._nextContentParam = p;
                    break;
                case "3":
                    q = "1203";
                    r = "block";
                    this._nextSiteUrl = p;
                    break;
                default:
                    q = "1200";
                }
            } else {
                q = "1200";
                s = (m == "") ? "" : "\\n(" + m + ")";
            }
            var u = c.coreAccess.getMessage(q);
            u = (v == "") ? u : v;
            u += s;
            u = u.replace(/\\n/g, "<br />\n");
            this.$tx_message.html(u);
            this._bt_jump_content.getJqObject().css("display", n);
            this._bt_jump_site.getJqObject().css("display", r);
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            this.$tx_message = e("#" + this.params.tx_message);
            var o = {
                element_id: this.params.bt_close
            };
            this._bt_close = new l.Button(o);
            var m = {
                element_id: this.params.bt_jump_content
            };
            this._bt_jump_content = new l.Button(m);
            this._bt_jump_content.getJqObject().css("display", "none");
            var n = {
                element_id: this.params.bt_jump_site
            };
            this._bt_jump_site = new l.Button(n);
            this._bt_jump_site.getJqObject().css("display", "none");
            this._addEvents();
        },
        _addEvents: function() {
            this._bt_close.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickCloseButton, this));
            this._bt_jump_content.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickContentButton, this));
            this._bt_jump_site.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickSiteButton, this));
        },
        _open: function() {
            if (this._is_open == false) {
                this._is_open = true;
                this.$element.addClass("onstage");
            }
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
        },
        _eventClickCloseButton: function(n) {
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_COVER_CLOSE);
        },
        _eventClickContentButton: function(m) {
            var n = this._createNextContentURL(this._nextContentParam);
            this._eventClickCloseButton();
            c.util.locationChange(n);
        },
        _eventClickSiteButton: function(m) {
            this._eventClickCloseButton();
            c.util.locationChange(this._nextSiteUrl);
        },
        _createNextContentURL: function(n) {
            var o;
            var q = "";
            var p = "";
            var m = document.location.href;
            if (m.match(/param=.*[\w]&/) == null) {
                o = /param=.*[\w]$/;
                q = "param=" + n;
            } else {
                o = /param=.*[\w]&/;
                q = "param=" + n + "&";
            }
            p = m.replace(o, q);
            return p;
        },
        _updateLayout: function() {}
    };
    a.panel.PanelNextSearch = g;
    var b = function(m) {
        this.params = {
            element: "",
            background_id: "",
            bt_jump_first: "",
            bt_next_search: "",
            bt_exit_viewer: "",
            bt_close: "",
            wrapper_next_search_id: "",
            css_none_next_search: "none_next_search"
        };
        e.extend(true, this.params, m);
        this.$element = null;
        this.$background = null;
        this._inte_background = null;
        this._bt_jump_first = null;
        this._bt_next_search = null;
        this._bt_exit_viewer = null;
        this._bt_close = null;
        this._is_use = true;
        this._is_open = false;
        this._init();
    };
    b.prototype = {
        getDispatch: function() {
            return this.$element;
        },
        isUse: function() {
            return this._is_use;
        },
        isOpen: function() {
            return this._is_open;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        _init: function() {
            this.$element = e("#" + this.params.element);
            this.$background = e("#" + this.params.background_id);
            this._inte_background = i.EventFactory.createEventListenerSingle(this.params.background_id);
            var p = {
                element_id: this.params.bt_jump_first
            };
            this._bt_jump_first = new l.Button(p);
            var n = {
                element_id: this.params.bt_next_search
            };
            this._bt_next_search = new l.Button(n);
            var o = {
                element_id: this.params.bt_exit_viewer
            };
            this._bt_exit_viewer = new l.Button(o);
            var m = {
                element_id: this.params.bt_close
            };
            this._bt_close = new l.Button(m);
            this._addEvents();
        },
        _addEvents: function() {
            this._inte_background.addEventUp(e.proxy(this._eventClickBackground, this));
            this._bt_jump_first.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickJumpFirstButton, this));
            this._bt_next_search.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickNextSearchButton, this));
            this._bt_exit_viewer.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickExitViewerButton, this));
            this._bt_close.getDispatch().on(l.Button.EVENT_ACTION, e.proxy(this._eventClickCloseButton, this));
        },
        _eventClickBackground: function(n) {
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_COVER_CLOSE);
        },
        _eventClickJumpFirstButton: function(n) {
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_JUMP_FIRST_PAGE);
            this._doCloseMenu();
            this._doCloseAdPage();
        },
        _eventClickNextSearchButton: function(n) {
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_OPEN_NEXTSEARCH);
            this._doCloseMenu();
            this._close();
        },
        _eventClickExitViewerButton: function(n) {
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_DO_BACK_SITE_PAGE);
            m.trigger(c.events.EVENT_COVER_CLOSE);
            this._doCloseMenu();
            this._doCloseAdPage();
        },
        _eventClickCloseButton: function(n) {
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_COVER_CLOSE);
        },
        _open: function() {
            var m = c.coreAccess.getNextSearchEnabled();
            if (m) {
                this._bt_next_search.enable();
            } else {
                this._bt_next_search.disable();
                this._without_next_search();
            }
            this._is_open = true;
            this.$element.addClass("onstage");
            this.$background.addClass("onstage");
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
            this.$background.removeClass("onstage");
        },
        _updateLayout: function() {},
        _doCloseMenu: function() {
            c.manager.closeMenu();
        },
        _doCloseAdPage: function() {
            c.manager.closeAdPageEnd();
        },
        _without_next_search: function() {
            e("#" + this.params.wrapper_next_search_id).css("display", "none");
            this.$element.addClass(this.params.css_none_next_search);
        }
    };
    a.panel.PanelReadEnd = b;
    var d = function(m) {
        this.params = {
            element: "",
            body_id: "",
            background_id: "",
            iframe_css: "",
            url: "",
            maxWidth: null,
            maxHeight: null
        };
        e.extend(true, this.params, m);
        this.$element = null;
        this.$background = null;
        this._inte_background = null;
        this.$body = null;
        this.$frame = null;
        this._is_load_complete = false;
        this._is_use = false;
        this._is_open = false;
        this._init();
    };
    d.MAX_WIDTH = 720;
    d.MAX_HEIGHT = 720;
    d.prototype = {
        getDispatch: function() {
            return this.$element;
        },
        isUse: function() {
            return this._is_use;
        },
        isOpen: function() {
            return this._is_open;
        },
        open: function() {
            this._openSeting();
            this._layout();
            this._open();
        },
        close: function() {
            this._close();
            this._closeSeting();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        actionClose: function() {
            if (this._is_open) {
                this._dispatchPanelClose();
            }
        },
        actionFirstPage: function() {
            if (this._is_open) {
                var m = c.manager.getEventDispatcher();
                m.trigger(c.events.EVENT_JUMP_FIRST_PAGE);
                this._doCloseMenu();
                this._doCloseAdPage();
            }
        },
        actionCloseViewer: function() {
            if (this._is_open) {
                var m = c.manager.getEventDispatcher();
                m.trigger(c.events.EVENT_DO_BACK_SITE_PAGE);
                m.trigger(c.events.EVENT_COVER_CLOSE);
                this._doCloseMenu();
                this._doCloseAdPage();
            }
        },
        actionNextSearch: function() {
            var n = c.coreAccess.getNextSearchEnabled();
            if (this._is_open && n) {
                var m = c.manager.getEventDispatcher();
                m.trigger(c.events.EVENT_OPEN_NEXTSEARCH);
                this._doCloseMenu();
                this._close();
                this._closeSeting();
            }
        },
        _init: function() {
            if (this.params.url == "") {
                this._is_use = false;
                return;
            } else {
                this._is_use = true;
            }
            if ((this.params.maxWidth == null) || (this.params.maxHeight == null)) {
                this.params.maxWidth = d.MAX_WIDTH;
                this.params.maxHeight = d.MAX_HEIGHT;
            }
            this.$element = e("#" + this.params.element);
            this.$background = e("#" + this.params.background_id);
            this._inte_background = i.EventFactory.createEventListenerSingle(this.params.background_id);
            this.$body = e("#" + this.params.body_id);
            this._addEvents();
        },
        _addEvents: function() {
            this._inte_background.addEventUp(e.proxy(this._eventClickBackground, this));
        },
        _eventClickBackground: function(m) {
            this._dispatchPanelClose();
        },
        _dispatchPanelClose: function() {
            var m = c.manager.getEventDispatcher();
            m.trigger(c.events.EVENT_COVER_CLOSE);
        },
        _layout: function() {
            var z = window.innerWidth;
            var u = window.innerHeight;
            var n = (this.params.maxWidth >> 0);
            var x = (this.params.maxHeight >> 0);
            var m = window.parseInt(this.$element.css("font-size"), 10);
            var s = n + m + m;
            var p = x + m + m;
            var w = 0;
            var q = 0;
            var r = 1;
            var o = 1;
            var t = 1;
            var v, y;
            if (s > z) {
                r = z / s;
            }
            if (p > u) {
                o = u / p;
            }
            if (r <= o) {
                t = r;
            } else {
                t = o;
            }
            w = Math.floor(s * t) - m - m;
            q = Math.floor(p * t) - m - m;
            this.$body.css({
                width: w,
                height: q
            });
            v = q / 2 * -1;
            y = w / 2 * -1;
            this.$element.css({
                marginTop: v,
                marginLeft: y
            });
        },
        _openSeting: function() {
            if (this._is_load_complete == false) {
                this._is_load_complete = true;
                this.$frame = e("<iframe>");
                this.$frame.addClass(this.params.iframe_css);
                this.$frame.attr({
                    src: this.params.url,
                    frameborder: 0,
                    scrolling: "auto"
                });
                this.$body.append(this.$frame);
            }
        },
        _closeSeting: function() {
            if (this.$frame) {
                this.$frame.remove();
                this.$frame = null;
            }
            this.$body.empty();
            this._is_load_complete = false;
        },
        _open: function() {
            this._is_open = true;
            this.$element.addClass("onstage");
            this.$background.addClass("onstage");
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
            this.$background.removeClass("onstage");
        },
        _updateLayout: function() {
            if (this._is_open && this._is_use) {
                this._layout();
            }
        },
        _doCloseMenu: function() {
            c.manager.closeMenu();
        },
        _doCloseAdPage: function() {
            c.manager.closeAdPageEnd();
        }
    };
    a.panel.PanelColophon = d;
    var j = function(m) {
        this.params = {
            layer: "",
            params_readend_panel: {},
            params_nextsearch_panel: {},
            params_textsize_panel: {},
            params_colophon_panel: {}
        };
        e.extend(true, this.params, m);
        this.$layer = null;
        this._panel_readend = null;
        this._panel_nextsearch = null;
        this._panel_textsize = null;
        this._panel_colophon = null;
        this._is_open = false;
        this._init();
    };
    j.PANEL_READ_END = "panel_read_end";
    j.PANEL_NEXT_SEARCH = "panel_next_search";
    j.PANEL_TEXT_SIZE = "panel_text_size";
    j.PANEL_COLOPHON = "panel_colophon";
    j.prototype = {
        isUse: function(m) {
            return this._isUse(m);
        },
        isOpen: function() {
            return this._is_open;
        },
        isOpenedEitherPanel: function() {
            if (this._panel_readend.isOpen()) {
                return true;
            }
            if (this._panel_nextsearch.isOpen()) {
                return true;
            }
            if (this._panel_textsize.isOpen()) {
                return true;
            }
            if (this._panel_colophon.isOpen()) {
                return true;
            }
            return false;
        },
        open: function(m) {
            this._open(m);
        },
        close: function(m) {
            this._close(m);
        },
        updateLayout: function() {
            this._updateLayout();
        },
        update_next_search: function() {
            this._panel_nextsearch.update();
        },
        getPanel: function(m) {
            switch (m) {
            case j.PANEL_READ_END:
                return this._panel_readend;
                break;
            case j.PANEL_NEXT_SEARCH:
                return this._panel_nextsearch;
                break;
            case j.PANEL_TEXT_SIZE:
                return this._panel_textsize;
                break;
            case j.PANEL_COLOPHON:
                return this._panel_colophon;
                break;
            }
        },
        _init: function() {
            this.$layer = e("#" + this.params.layer);
            this._panel_readend = new a.panel.PanelReadEnd(this.params.params_readend_panel);
            this._panel_nextsearch = new a.panel.PanelNextSearch(this.params.params_nextsearch_panel);
            this._panel_textsize = new a.panel.PanelTextSize(this.params.params_textsize_panel);
            this._panel_colophon = new a.panel.PanelColophon(this.params.params_colophon_panel);
            this._addEvents();
        },
        _addEvents: function() {},
        _open: function(m) {
            if (this._is_open == false) {
                this._is_open = true;
                this.$layer.addClass("onstage");
            }
            switch (m) {
            case j.PANEL_READ_END:
                this._panel_readend.open();
                this._doOpenMenu();
                break;
            case j.PANEL_NEXT_SEARCH:
                this._panel_nextsearch.open();
                break;
            case j.PANEL_TEXT_SIZE:
                this._panel_textsize.open();
                break;
            case j.PANEL_COLOPHON:
                this._panel_colophon.open();
                this._doOpenMenu();
                break;
            }
        },
        _close: function(m) {
            this._is_open = false;
            this.$layer.removeClass("onstage");
            switch (m) {
            case j.PANEL_READ_END:
                this._panel_readend.close();
                this._panel_nextsearch.close();
                break;
            case j.PANEL_TEXT_SIZE:
                this._panel_textsize.close();
                break;
            case j.PANEL_COLOPHON:
                this._panel_colophon.close();
                this._panel_nextsearch.close();
                break;
            }
        },
        _updateLayout: function() {
            this._panel_readend.updateLayout();
            this._panel_nextsearch.updateLayout();
            this._panel_textsize.updateLayout();
            this._panel_colophon.updateLayout();
        },
        _isUse: function(n) {
            var m = false;
            switch (n) {
            case j.PANEL_READ_END:
                m = this._panel_readend.isUse();
                break;
            case j.PANEL_NEXT_SEARCH:
                m = this._panel_nextsearch.isUse();
                break;
            case j.PANEL_TEXT_SIZE:
                m = this._panel_textsize.isUse();
                break;
            case j.PANEL_COLOPHON:
                m = this._panel_colophon.isUse();
                break;
            }
            return m;
        },
        _doOpenMenu: function() {
            c.manager.directOpenMenu();
        }
    };
    a.Panels = j;
}
)(jQuery, appview, appview.gui, UIs, Interaction);
(function(g, f, c, j, i) {
    c.dialog = {};
    var a = function(k) {
        this.params = {
            element: "",
            dialog_id: "",
            bt_close_id: "",
            event_close: ""
        };
        g.extend(true, this.params, k);
        this.$element = null;
        this._bt_close = null;
        this._is_open = false;
        this._init();
    };
    a.prototype = {
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        isOpen: function() {
            return this._is_open;
        },
        _init: function() {
            this.$element = g("#" + this.params.element);
            var k = {
                element_id: this.params.bt_close_id
            };
            this._bt_close = new j.Button(k);
            this._addEvents();
        },
        _addEvents: function() {
            var k = i.util.getSupportEventName("down");
            this.$element.on(k, function(l) {
                return false;
            });
            this._bt_close.getDispatch().on(j.Button.EVENT_ACTION, g.proxy(this._eventClickCloseButton, this));
        },
        _eventClickCloseButton: function() {
            this._eventDispatchResultAlert(this.params.event_close);
        },
        _eventDispatchResultAlert: function(m) {
            var k = f.manager.getEventDispatcher();
            var l = {};
            l.id = this.params.dialog_id;
            k.trigger(m, l);
        },
        _open: function() {
            if (this._is_open == false) {
                this._is_open = true;
                this.$element.addClass("onstage");
            }
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
        },
        _updateLayout: function() {}
    };
    c.dialog.DialogAlert = a;
    var e = function(k) {
        this.params = {
            element: "",
            dialog_id: "",
            bt_ok_id: "",
            bt_cancel_id: "",
            eventOk: "",
            eventCancel: ""
        };
        g.extend(true, this.params, k);
        this.$element = null;
        this._bt_ok = null;
        this._bt_cancel = null;
        this._is_open = false;
        this._init();
    };
    e.prototype = {
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        isOpen: function() {
            return this._is_open;
        },
        _init: function() {
            this.$element = g("#" + this.params.element);
            var l = {
                element_id: this.params.bt_ok_id
            };
            this._bt_ok = new j.Button(l);
            var k = {
                element_id: this.params.bt_cancel_id
            };
            this._bt_cancel = new j.Button(k);
            this._addEvents();
        },
        _addEvents: function() {
            var k = i.util.getSupportEventName("down");
            this.$element.on(k, function(l) {
                return false;
            });
            this._bt_ok.getDispatch().on(j.Button.EVENT_ACTION, g.proxy(this._eventClickOkButton, this));
            this._bt_cancel.getDispatch().on(j.Button.EVENT_ACTION, g.proxy(this._eventClickCancelButton, this));
        },
        _eventClickOkButton: function(k) {
            this._eventDispatchResultConfirm(this.params.eventOk);
        },
        _eventClickCancelButton: function(k) {
            this._eventDispatchResultConfirm(this.params.eventCancel);
        },
        _eventDispatchResultConfirm: function(m) {
            var k = f.manager.getEventDispatcher();
            var l = {};
            l.id = this.params.dialog_id;
            k.trigger(m, l);
        },
        _open: function() {
            if (this._is_open == false) {
                this._is_open = true;
                this.$element.addClass("onstage");
            }
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
        },
        _updateLayout: function() {}
    };
    c.dialog.DialogConfirm = e;
    var b = function(k) {
        this.params = {
            element: "",
            tx_error_code: "",
            tx_message: "",
            bt_back_site_page: ""
        };
        g.extend(true, this.params, k);
        this.$element = null;
        this.$tx_error_code = null;
        this.$tx_message = null;
        this._bt_back_site_page = null;
        this._is_open = false;
        this._init();
    };
    b.prototype = {
        open: function(k) {
            this._open(k);
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        isOpen: function() {
            return this._is_open;
        },
        _init: function() {
            this.$element = g("#" + this.params.element);
            this.$tx_error_code = g("#" + this.params.tx_error_code);
            this.$tx_message = g("#" + this.params.tx_message);
            var k = {
                element_id: this.params.bt_back_site_page
            };
            this._bt_back_site_page = new j.Button(k);
            this._addEvents();
        },
        _addEvents: function() {
            var k = i.util.getSupportEventName("down");
            this.$element.on(k, function(l) {
                return false;
            });
            this._bt_back_site_page.getDispatch().on(j.Button.EVENT_ACTION, g.proxy(this._eventClickBackSizePageButton, this));
        },
        _eventClickBackSizePageButton: function(l) {
            var k = f.manager.getEventDispatcher();
            k.trigger(f.events.EVENT_ERROR_DIALOG_BACK_SITE_PAGE);
        },
        _open: function(k) {
            if (this._is_open == false) {
                this.$tx_error_code.html(k.code);
                this.$tx_message.html(k.message);
                this._is_open = true;
                this.$element.addClass("onstage");
            }
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
        },
        _updateLayout: function() {}
    };
    c.dialog.DialogError = b;
    var d = function(k) {
        this.params = {
            element: "",
            tx_error_title: "",
            tx_message: "",
            bt_back_site_page: ""
        };
        g.extend(true, this.params, k);
        this.$element = null;
        this.$tx_error_title = null;
        this.$tx_message = null;
        this._bt_back_site_page = null;
        this._is_open = false;
        this._init();
    };
    d.prototype = {
        open: function(k) {
            this._open(k);
        },
        close: function() {
            this._close();
        },
        updateLayout: function() {
            this._updateLayout();
        },
        isOpen: function() {
            return this._is_open;
        },
        _init: function() {
            this.$element = g("#" + this.params.element);
            this.$tx_error_title = g("#" + this.params.tx_error_title);
            this.$tx_message = g("#" + this.params.tx_message);
            var k = {
                element_id: this.params.bt_back_site_page
            };
            this._bt_back_site_page = new j.Button(k);
            this._addEvents();
        },
        _addEvents: function() {
            var k = i.util.getSupportEventName("down");
            this.$element.on(k, function(l) {
                return false;
            });
            this._bt_back_site_page.getDispatch().on(j.Button.EVENT_ACTION, g.proxy(this._eventClickBackSizePageButton, this));
        },
        _eventClickBackSizePageButton: function(l) {
            var k = f.manager.getEventDispatcher();
            k.trigger(f.events.EVENT_ERROR_DIALOG_BACK_SITE_PAGE);
        },
        _open: function(k) {
            if (this._is_open == false) {
                this.$tx_error_title.html(k.title);
                this.$tx_message.html(k.message);
                this._is_open = true;
                this.$element.addClass("onstage");
            }
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
        },
        _updateLayout: function() {}
    };
    c.dialog.DialogErrorTitle = d;
    var h = function(k) {
        this.params = {
            layer: "",
            params_urlto_dialog: {},
            params_overwrite_confirm_dialog: {},
            params_delete_confirm_dialog: {},
            params_error_dialog: {},
            params_title_error_dialog: {},
            params_retry_dialog: {},
            params_textsizechangebookmarkconverterror_dialog: {},
            params_textsizechangebookmarkconvertcontinue_dialog: {}
        };
        g.extend(true, this.params, k);
        this.$layer = null;
        this._dialog_urlto = null;
        this._dialog_overwrite = null;
        this._dialog_delete = null;
        this._dialog_error = null;
        this._dialog_error_title = null;
        this._dialog_retry = null;
        this._dialog_text_size_change_bookmark_convert_error = null;
        this._dialog_text_size_change_bookmark_convert_continue = null;
        this._is_open = false;
        this._init();
    };
    h.DIALOG_URLTO = "dialog_urlto";
    h.DIALOG_OVERWRITE = "dialog_overwrite";
    h.DIALOG_DELETE = "dialog_delete";
    h.DIALOG_ERROR = "dialog_error";
    h.DIALOG_ERROR_TITLE = "dialog_error_title";
    h.DIALOG_RETRY = "dialog_retry";
    h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR = "dialog_text_size_change_bookmark_convert_error";
    h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE = "dialog_text_size_change_bookmark_convert_continue";
    h.prototype = {
        isOpen: function() {
            return this._is_open;
        },
        open: function(l, k) {
            this._open(l, k);
        },
        close: function(k) {
            this._close(k);
        },
        updateLayout: function() {
            this._updateLayout();
        },
        getDialog: function(k) {
            switch (k) {
            case h.DIALOG_URLTO:
                return this._dialog_urlto;
                break;
            case h.DIALOG_OVERWRITE:
                return this._dialog_overwrite;
                break;
            case h.DIALOG_DELETE:
                return this._dialog_delete;
                break;
            case h.DIALOG_ERROR:
                return this._dialog_error;
                break;
            case h.DIALOG_ERROR_TITLE:
                return this._dialog_error_title;
                break;
            case h.DIALOG_RETRY:
                return this._dialog_retry;
                break;
            case h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR:
                return this._dialog_text_size_change_bookmark_convert_error;
                break;
            case h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE:
                return this._dialog_text_size_change_bookmark_convert_continue;
                break;
            }
        },
        isOpenedEitherDialog: function() {
            return this._is_open;
        },
        _init: function() {
            this.$layer = g("#" + this.params.layer);
            this._dialog_urlto = new c.dialog.DialogConfirm(this.params.params_urlto_dialog);
            this._dialog_overwrite = new c.dialog.DialogConfirm(this.params.params_overwrite_confirm_dialog);
            this._dialog_delete = new c.dialog.DialogConfirm(this.params.params_delete_confirm_dialog);
            this._dialog_error = new c.dialog.DialogError(this.params.params_error_dialog);
            this._dialog_error_title = new c.dialog.DialogErrorTitle(this.params.params_title_error_dialog);
            this._dialog_retry = new c.dialog.DialogConfirm(this.params.params_retry_dialog);
            this._dialog_text_size_change_bookmark_convert_error = new c.dialog.DialogAlert(this.params.params_textsizechangebookmarkconverterror_dialog);
            this._dialog_text_size_change_bookmark_convert_continue = new c.dialog.DialogConfirm(this.params.params_textsizechangebookmarkconvertcontinue_dialog);
            this._addEvents();
        },
        _addEvents: function() {
            var k = i.util.getSupportEventName("down");
            this.$layer.on(k, function(l) {
                return false;
            });
        },
        _open: function(l, k) {
            if (this._is_open == false) {
                this._is_open = true;
                this.$layer.addClass("onstage");
            }
            if (this._isOpenedError()) {
                return false;
            }
            switch (l) {
            case h.DIALOG_ERROR:
                this._dialog_error.open(k);
                break;
            case h.DIALOG_ERROR_TITLE:
                this._dialog_error_title.open(k);
                break;
            case h.DIALOG_URLTO:
                this._dialog_urlto.open();
                break;
            case h.DIALOG_OVERWRITE:
                this._dialog_overwrite.open();
                break;
            case h.DIALOG_DELETE:
                this._dialog_delete.open();
                break;
            case h.DIALOG_RETRY:
                this._dialog_retry.open();
                break;
            case h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR:
                this._dialog_text_size_change_bookmark_convert_error.open();
                break;
            case h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE:
                this._dialog_text_size_change_bookmark_convert_continue.open();
                break;
            }
            return true;
        },
        _isOpenedError: function() {
            if (this._dialog_error_title.isOpen()) {
                return true;
            }
            if (this._dialog_error.isOpen()) {
                return true;
            }
            return false;
        },
        _close: function(k) {
            this._is_open = false;
            this.$layer.removeClass("onstage");
            switch (k) {
            case h.DIALOG_ERROR:
                this._dialog_error.close();
                break;
            case h.DIALOG_ERROR_TITLE:
                this._dialog_error_title.close();
                break;
            case h.DIALOG_URLTO:
                this._dialog_urlto.close();
                break;
            case h.DIALOG_OVERWRITE:
                this._dialog_overwrite.close();
                break;
            case h.DIALOG_DELETE:
                this._dialog_delete.close();
                break;
            case h.DIALOG_RETRY:
                this._dialog_retry.close();
                break;
            case h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_ERROR:
                this._dialog_text_size_change_bookmark_convert_error.close();
                break;
            case h.DIALOG_TEXT_SIZE_CHANGE_BOOKMARK_CONVERT_CONTINUE:
                this._dialog_text_size_change_bookmark_convert_continue.close();
                break;
            }
        },
        _updateLayout: function() {
            this._dialog_error.updateLayout();
            this._dialog_error_title.updateLayout();
        }
    };
    c.Dialogs = h;
}
)(jQuery, appview, appview.gui, UIs, Interaction);
(function(d, f, c, a, b) {
    var e = function(g) {
        this.params = {
            element: "",
            base_id: "",
            image_id: "",
            base_color: null,
            base_width: null,
            base_height: null,
            img_src: "",
            delay: 0,
            close_delay_ms: 5000,
            skip_delay_ms: 2000
        };
        d.extend(true, this.params, g);
        this.$element = null;
        this._inte_element = null;
        this.$base = null;
        this.$image = null;
        this._is_use = false;
        this._is_open = false;
        this._is_image_loaded = false;
        this._close_delay = 0;
        this._close_timer_id = 0;
        this._img_width = 0;
        this._img_height = 0;
        this._init();
    };
    e.prototype = {
        open: function() {
            if (this._is_use == false) {
                return;
            }
            var g = this._close_delay;
            this._setCloseDelay(g);
            this._open();
        },
        close: function() {
            this._skipSplashScreen();
        },
        isUse: function() {
            return this._is_use;
        },
        updateLayout: function() {
            this._updateLayout();
        },
        doLoadErrorToSkip: function() {
            this._doLoadErrorToSkip();
        },
        _init: function() {
            this.$element = d("#" + this.params.element);
            this._inte_element = b.EventFactory.createEventListenerSingle(this.params.element);
            this.$base = d("#" + this.params.base_id);
            this.$image = d("#" + this.params.image_id);
            var g = this.params.delay >> 0;
            if (g > 0) {
                this._close_delay = g * 1000;
            } else {
                this._close_delay = this.params.close_delay_ms;
            }
            if (this.params.img_src != "") {
                this._is_use = true;
                this._loadImage();
            } else {
                this._is_use = false;
                this._deleteImage();
            }
        },
        _addEvent: function() {
            this._inte_element.addEventUp(d.proxy(this._eventClickBase, this));
        },
        _eventClickBase: function(g) {
            this._skipSplashScreen();
        },
        _loadImage: function() {
            this.$image.on("error", d.proxy(this._eventLoadImageError, this));
            this.$image.on("load", d.proxy(this._eventLoadImageComp, this));
            this.$image.attr("src", this.params.img_src);
        },
        _eventLoadImageError: function(g) {
            this._is_image_loaded = false;
        },
        _eventLoadImageComp: function(g) {
            this._is_image_loaded = true;
            this._img_width = (g.target.width >> 0);
            this._img_height = (g.target.height >> 0);
            this._addEvent();
            this._layout();
        },
        _deleteImage: function() {
            if (this.$image) {
                this.$image.off("error").off("load");
                this.$image.empty();
                this.$image = null;
            }
            this.$element.empty();
        },
        _layout: function() {
            var h = window.innerWidth;
            var l = window.innerHeight;
            var j = this._img_width;
            var m = this._img_height;
            var i = {};
            if (this.$image != null) {
                this.$image.css({
                    visibility: "visible",
                    left: ((h - j) >> 1),
                    top: (l - m) >> 1
                });
            }
            var n = this.params.base_color;
            var g = this.params.base_width;
            var k = this.params.base_height;
            if (n !== null) {
                i = {
                    visibility: "visible",
                    backgroundColor: n
                };
                if ((g == null) || (k == null)) {
                    i.top = 0;
                    i.left = 0;
                    i.width = "100%";
                    i.height = "100%";
                } else {
                    i.top = (l - k) >> 1;
                    i.left = (h - g) >> 1;
                    i.width = g;
                    i.height = k;
                }
                this.$base.css(i);
            }
        },
        _skipSplashScreen: function() {
            clearTimeout(this._close_timer_id);
            this._close();
        },
        _setCloseDelay: function(h) {
            var g = this;
            clearTimeout(this._close_timer_id);
            this._close_timer_id = setTimeout(function() {
                g._close();
            }, h);
        },
        _open: function() {
            if (this._is_use == false) {
                return;
            }
            if (this._is_image_loaded) {
                this._layout();
            }
            if (this._is_open == false) {
                this._is_open = true;
                this.$element.addClass("onstage");
            }
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
            this._deleteImage();
            var g = f.manager.getEventDispatcher();
            g.trigger(f.events.EVENT_SPLASH_CLOSE);
        },
        _updateLayout: function() {
            if (this._is_use && this._is_open) {
                if (this._is_image_loaded) {
                    this._layout();
                }
            }
        },
        _doLoadErrorToSkip: function() {
            if (this._is_use) {
                if (this._is_image_loaded == false) {
                    var g = this.params.skip_delay_ms;
                    this._setCloseDelay(g);
                }
            }
        }
    };
    c.SplashScreen = e;
}
)(jQuery, appview, appview.gui, UIs, Interaction);
(function(e, f, d, a, b) {
    var c = function(g) {
        this.params = {
            layer: ""
        };
        e.extend(true, this.params, g);
        this.$layer = null;
        this._is_open = false;
        this._init();
    };
    c.prototype = {
        isOpen: function() {
            return this._is_open;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        },
        _init: function() {
            this.$layer = e("#" + this.params.layer);
        },
        _open: function() {
            if (this._is_open) {
                return;
            }
            this._is_open = true;
            this.$layer.addClass("onstage");
        },
        _close: function() {
            this._is_open = false;
            this.$layer.removeClass("onstage");
        }
    };
    d.LoadingSpinner = c;
}
)(jQuery, appview, appview.gui, UIs, Interaction);
(function(f, g, d, b, c) {
    var a = function(h) {
        this.params = {
            parent: {},
            ad_name: "",
            element_id: "",
            cancel_target_class_name: "",
            cbControll: null,
            cbControllKey: null,
            clickRange: 24
        };
        f.extend(true, this.params, h);
        this.$element = null;
        this._inte_element = null;
        this._is_open = false;
        this._is_use = false;
        this._is_down = false;
        this._down_position = {
            x: 0,
            y: 0,
            set: function(i, j) {
                this.x = i;
                this.y = j;
            },
            reset: function() {
                this.set(0, 0);
            }
        };
        this._init();
    };
    a.NAME_BEGINNING = "name_to_beginning";
    a.NAME_END = "name_to_end";
    a.EVENT_TO_LEFT = "event_to_left";
    a.EVENT_TO_RIGHT = "event_to_right";
    a.KEY_DOWN_ADPAGE = "keydown.adpage";
    a.KEYBOARD_LEFT = 37;
    a.KEYBOARD_RIGHT = 39;
    a.prototype = {
        _init: function() {
            this.$element = f("#" + this.params.element_id);
            this._is_use = this._validAdPageTag();
            this._inte_element = c.EventFactory.createEventListenerSingle(this.params.element_id);
            this._addEvents();
        },
        _addEvents: function() {
            this._inte_element.addEventDown(f.proxy(this._eventBaseDown, this));
            this._inte_element.addEventUp(f.proxy(this._eventBaseUp, this));
            this._inte_element.addEventCancel(f.proxy(this._eventBaseCancel, this));
        },
        _addKeyEvents: function() {
            var h = this;
            f(document).on(a.KEY_DOWN_ADPAGE, function(i) {
                i.stopPropagation();
                i.preventDefault();
                h._actionKeyDown(i.which);
            });
        },
        _removeKeyEvents: function() {
            f(document).off(a.KEY_DOWN_ADPAGE);
        },
        _eventBaseDown: function(h) {
            this._down_position.set(h.pageX, h.pageY);
            this._is_down = true;
        },
        _eventBaseUp: function(l) {
            if (!this._is_down) {
                return;
            }
            if (this._isEventCancelTarget(l)) {
                this._is_down = false;
                this._down_position.reset();
                return;
            }
            this._is_down = false;
            var j = this._down_position.x;
            var h = this._down_position.y;
            var k = l.pageX;
            var i = l.pageY;
            this._down_position.reset();
            if (this._isClick(j, h, k, i)) {
                this._actionClick(j);
            } else {
                if (this._isFlick(j, h, k, i)) {
                    this._actionFlick(j, k);
                }
            }
        },
        _eventBaseCancel: function(h) {
            this._is_down = false;
            this._down_position.reset();
        },
        _isEventCancelTarget: function(h) {
            if (this.params.cancel_target_class_name == "") {
                return false;
            }
            var i = "";
            if (h.target["className"]) {
                i = h.target.className;
            }
            return (i.indexOf(this.params.cancel_target_class_name) != -1);
        },
        _isClick: function(m, i, o, l) {
            var n = Math.abs(o - m);
            var k = Math.abs(l - i);
            var j = this.params.clickRange;
            var h = ((n <= j) && (k <= j));
            return h;
        },
        _isFlick: function(q, p, i, h) {
            var l = false;
            var o = Math.abs(i - q);
            var n = Math.abs(h - p);
            var m = this.params.clickRange;
            var k = m * 2;
            var j = o * 0.5;
            return ((o >= k) && (n <= j));
        },
        _actionClick: function(h) {
            var i = this.$element.width();
            var j = this._pipeClickPosToEventTypeAxisX(h, i);
            this._callBackControll(j);
        },
        _actionFlick: function(h, i) {
            var j = this._pipeFlickToEventTypeAxisX(h, i);
            this._callBackControll(j);
        },
        _actionKeyDown: function(h) {
            switch (h) {
            case a.KEYBOARD_LEFT:
                this._callBackControllKeyEvent(a.EVENT_TO_LEFT);
                break;
            case a.KEYBOARD_RIGHT:
                this._callBackControllKeyEvent(a.EVENT_TO_RIGHT);
                break;
            default:
            }
        },
        _open: function() {
            if (!this._is_use) {
                return;
            }
            this._is_open = true;
            this.$element.addClass("onstage");
            this._removeKeyEvents();
            this._addKeyEvents();
        },
        _close: function() {
            this._is_open = false;
            this.$element.removeClass("onstage");
            this._removeKeyEvents();
        },
        _pipeClickPosToEventTypeAxisX: function(h, i) {
            var k = Math.floor(i / 2);
            var j = (h <= k) ? a.EVENT_TO_LEFT : a.EVENT_TO_RIGHT;
            return j;
        },
        _pipeFlickToEventTypeAxisX: function(h, i) {
            var j = ((i - h) > 0) ? a.EVENT_TO_LEFT : a.EVENT_TO_RIGHT;
            return j;
        },
        _callBackControll: function(j) {
            var i = this.params.ad_name;
            var h = [j, i];
            this._doCallBackDatas(this.params.cbControll, this.params.parent, h);
        },
        _callBackControllKeyEvent: function(j) {
            var i = this.params.ad_name;
            var h = [j, i];
            this._doCallBackDatas(this.params.cbControllKey, this.params.parent, h);
        },
        _doCallBackDatas: function(j, i, h) {
            if (typeof j === "function") {
                j.apply(i, h);
            }
        },
        _validAdPageTag: function() {
            var h = this.$element.children().length;
            return (h >= 1);
        },
        isUse: function() {
            return this._is_use;
        },
        isOpen: function() {
            return this._is_open;
        },
        open: function() {
            this._open();
        },
        close: function() {
            this._close();
        }
    };
    d.AdPage = a;
    var e = function(h) {
        this.params = {
            element_id_beginning: "",
            element_id_end: "",
            cancel_target_class_name: ""
        };
        f.extend(true, this.params, h);
        this._ad_page_beginning = null;
        this._ad_page_end = null;
        this._init();
    };
    e.TYPE_INTRODUCTION = "ad_page_type_introduction";
    e.TYPE_POSTSCRIPT = "ad_page_type_postscript";
    e.prototype = {
        _init: function() {
            this._ad_page_beginning = new d.AdPage({
                parent: this,
                ad_name: a.NAME_BEGINNING,
                element_id: this.params.element_id_beginning,
                cancel_target_class_name: this.params.cancel_target_class_name,
                cbControll: this._controllAdPage,
                cbControllKey: this._controllAdPageKeyEvent
            });
            this._ad_page_end = new d.AdPage({
                parent: this,
                ad_name: a.NAME_END,
                element_id: this.params.element_id_end,
                cancel_target_class_name: this.params.cancel_target_class_name,
                cbControll: this._controllAdPage,
                cbControllKey: this._controllAdPageKeyEvent
            });
        },
        _controllAdPageKeyEvent: function(i, h) {
            if (g.manager.isOpenedPanels()) {
                return;
            }
            if (g.manager.isOpenedDialogs()) {
                return;
            }
            if (g.manager.isOpenedLoadingSpinner()) {
                return;
            }
            this._controllAdPage(i, h);
        },
        _controllAdPage: function(k, h) {
            var j = "prev";
            if (g.coreAccess.isBindingLeft()) {
                if ((k === a.EVENT_TO_RIGHT)) {
                    j = "next";
                }
            } else {
                if ((k === a.EVENT_TO_LEFT)) {
                    j = "next";
                }
            }
            switch (j) {
            case "next":
                switch (h) {
                case a.NAME_BEGINNING:
                    this._ad_page_beginning.close();
                    break;
                case a.NAME_END:
                    g.coreAccess.openFinishPanel();
                    break;
                }
                break;
            case "prev":
                switch (h) {
                case a.NAME_BEGINNING:
                    break;
                case a.NAME_END:
                    this._ad_page_end.close();
                    var i = g.manager.getEventDispatcher();
                    i.trigger(g.events.EVENT_ADPAGE_CLOSE);
                    break;
                }
                break;
            default:
            }
        },
        isOpenedEither: function() {
            return (this._ad_page_beginning.isOpen() || this._ad_page_end.isOpen());
        },
        isUseAdPage: function(h) {
            var i = false;
            switch (h) {
            case e.TYPE_INTRODUCTION:
                i = this._ad_page_beginning.isUse();
                break;
            case e.TYPE_POSTSCRIPT:
                i = this._ad_page_end.isUse();
                break;
            default:
            }
            return i;
        },
        openAdPage: function(i) {
            var j = false;
            var h = null;
            switch (i) {
            case e.TYPE_INTRODUCTION:
                h = this._ad_page_beginning;
                break;
            case e.TYPE_POSTSCRIPT:
                h = this._ad_page_end;
                break;
            default:
            }
            if (h != null) {
                if (h.isUse()) {
                    h.open();
                    j = h.isOpen();
                }
            }
            return j;
        },
        closeAdPage: function(i) {
            var h = null;
            switch (i) {
            case e.TYPE_INTRODUCTION:
                h = this._ad_page_beginning;
                break;
            case e.TYPE_POSTSCRIPT:
                h = this._ad_page_end;
                break;
            default:
            }
            if (h != null) {
                h.close();
            }
        }
    };
    d.AdvertisementPages = e;
}
)(jQuery, appview, appview.gui, UIs, Interaction);
/*! HTML5 Viewer main.js - CELSYS,Inc.*/
(function(b, a) {
    b.extend({
        bshtml5v: {}
    });
    b(function() {
        var c = {
            version: "1.7.6",
            screenWrapper: b("#screen-wrapper"),
            komaWrapper: b("#koma-wrapper"),
            siteUrl: b('#meta input[name="site_url"]').val(),
            helpUrl: "./help/help.html?v=176001",
            helpPcUrl: "./help/help_pc.html?v=176001",
            cgi: b('#meta input[name="cgi"]').val(),
            param: b('#meta input[name="param"]').val(),
            read: b('#meta input[name="read"]').val(),
            fixViewTypeOfSpread: true,
            fixTextSizeOfDefault: false
        };
        a.App_h5v._init(c);
    });
}
)(jQuery, appmain);
