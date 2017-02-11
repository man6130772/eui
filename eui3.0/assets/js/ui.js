/*!
 * Project Common Resources
 * Author wu.h1 (RTX 3832)
 * Email wu.han@wonhigh.cn
 * Date 2016/10/27
 * Description Common Resources v3.0.1 (http://www.wonhigh.cn/)
 */
!function(a) {
    a.parser = {
        auto: !0,
        onComplete: function(a) {},
        plugins: [ "draggable", "droppable", "resizable", "pagination", "tooltip", "linkbutton", "menu", "menubutton", "splitbutton", "switchbutton", "progressbar", "tree", "textbox", "filebox", "combo", "combobox", "combotree", "combogrid", "numberbox", "validatebox", "searchbox", "spinner", "numberspinner", "timespinner", "datetimespinner", "calendar", "datebox", "datetimebox", "slider", "layout", "panel", "datagrid", "propertygrid", "treegrid", "datalist", "tabs", "accordion", "window", "dialog", "form", "subsystem" ],
        parse: function(b) {
            for (var c = [], d = 0; d < a.parser.plugins.length; d++) {
                var e = a.parser.plugins[d], f = a(".easyui-" + e, b);
                f.length && (f[e] ? f[e]() : c.push({
                    name: e,
                    jq: f
                }));
            }
            if (c.length && window.easyloader) {
                for (var g = [], d = 0; d < c.length; d++) g.push(c[d].name);
                easyloader.load(g, function() {
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d].name, f = c[d].jq;
                        f[e]();
                    }
                    a.parser.onComplete.call(a.parser, b);
                });
            } else a.parser.onComplete.call(a.parser, b);
        },
        parseValue: function(b, c, d, e) {
            e = e || 0;
            var f = a.trim(String(c || "")), g = f.substr(f.length - 1, 1);
            return "%" == g ? (f = parseInt(f.substr(0, f.length - 1)), f = Math.floor(b.toLowerCase().indexOf("width") >= 0 ? (d.width() - e) * f / 100 : (d.height() - e) * f / 100)) : f = parseInt(f) || void 0, 
            f;
        },
        parseOptions: function(b, c) {
            var d = a(b), e = {}, f = a.trim(d.attr("data-options"));
            if (f && ("{" != f.substring(0, 1) && (f = "{" + f + "}"), e = new Function("return " + f)()), 
            a.map([ "width", "height", "left", "top", "minWidth", "maxWidth", "minHeight", "maxHeight" ], function(c) {
                var d = a.trim(b.style[c] || "");
                d && (-1 == d.indexOf("%") && (d = parseInt(d) || void 0), e[c] = d);
            }), c) {
                for (var g = {}, h = 0; h < c.length; h++) {
                    var i = c[h];
                    if ("string" == typeof i) g[i] = d.attr(i); else for (var j in i) {
                        var k = i[j];
                        "boolean" == k ? g[j] = d.attr(j) ? "true" == d.attr(j) : void 0 : "number" == k && (g[j] = "0" == d.attr(j) ? 0 : parseFloat(d.attr(j)) || void 0);
                    }
                }
                a.extend(e, g);
            }
            return e;
        }
    }, a(function() {
        var b = a('<div style="position:absolute;top:-1000px;width:100px;height:100px;padding:5px"></div>').appendTo("body");
        a._boxModel = 100 != b.outerWidth(), b.remove(), b = a('<div style="position:fixed"></div>').appendTo("body"), 
        a._positionFixed = "fixed" == b.css("position"), b.remove(), !window.easyloader && a.parser.auto && a.parser.parse();
    }), a.fn._outerWidth = function(a) {
        return void 0 == a ? this[0] == window ? this.width() || document.body.clientWidth : this.outerWidth() || 0 : this._size("width", a);
    }, a.fn._outerHeight = function(a) {
        return void 0 == a ? this[0] == window ? this.height() || document.body.clientHeight : this.outerHeight() || 0 : this._size("height", a);
    }, a.fn._scrollLeft = function(b) {
        return void 0 == b ? this.scrollLeft() : this.each(function() {
            a(this).scrollLeft(b);
        });
    }, a.fn._propAttr = a.fn.prop || a.fn.attr, a.fn._size = function(b, c) {
        function d(b, c, d) {
            if (!c.length) return !1;
            var e = a(b)[0], f = c[0], g = f.fcount || 0;
            return d ? (e.fitted || (e.fitted = !0, f.fcount = g + 1, a(f).addClass("panel-noscroll"), 
            "BODY" == f.tagName && a("html").addClass("panel-fit")), {
                width: a(f).width() || 1,
                height: a(f).height() || 1
            }) : (e.fitted && (e.fitted = !1, f.fcount = g - 1, 0 == f.fcount && (a(f).removeClass("panel-noscroll"), 
            "BODY" == f.tagName && a("html").removeClass("panel-fit"))), !1);
        }
        function e(b, c, d, e) {
            var f = a(b), g = c, h = g.substr(0, 1).toUpperCase() + g.substr(1), i = a.parser.parseValue("min" + h, e["min" + h], d), j = a.parser.parseValue("max" + h, e["max" + h], d), k = a.parser.parseValue(g, e[g], d), l = String(e[g] || "").indexOf("%") >= 0 ? !0 : !1;
            if (isNaN(k)) f._size(g, ""), f._size("min" + h, i), f._size("max" + h, j); else {
                var m = Math.min(Math.max(k, i || 0), j || 99999);
                l || (e[g] = m), f._size("min" + h, ""), f._size("max" + h, ""), f._size(g, m);
            }
            return l || e.fit;
        }
        function f(b, c, d) {
            function e() {
                return c.toLowerCase().indexOf("width") >= 0 ? f.outerWidth() - f.width() : f.outerHeight() - f.height();
            }
            var f = a(b);
            return void 0 == d ? (d = parseInt(b.style[c]), isNaN(d) ? void 0 : (a._boxModel && (d += e()), 
            d)) : void ("" === d ? f.css(c, "") : (a._boxModel && (d -= e(), 0 > d && (d = 0)), 
            f.css(c, d + "px")));
        }
        return "string" == typeof b ? "clear" == b ? this.each(function() {
            a(this).css({
                width: "",
                minWidth: "",
                maxWidth: "",
                height: "",
                minHeight: "",
                maxHeight: ""
            });
        }) : "fit" == b ? this.each(function() {
            d(this, "BODY" == this.tagName ? a("body") : a(this).parent(), !0);
        }) : "unfit" == b ? this.each(function() {
            d(this, a(this).parent(), !1);
        }) : void 0 == c ? f(this[0], b) : this.each(function() {
            f(this, b, c);
        }) : this.each(function() {
            c = c || a(this).parent(), a.extend(b, d(this, c, b.fit) || {});
            var f = e(this, "width", c, b), g = e(this, "height", c, b);
            f || g ? a(this).addClass("easyui-fluid") : a(this).removeClass("easyui-fluid");
        });
    };
}(jQuery), function(a) {
    a.fn.resizable = function(b, c) {
        function d(b) {
            var c = b.data, d = a.data(c.target, "resizable").options;
            if (-1 != c.dir.indexOf("e")) {
                var e = c.startWidth + b.pageX - c.startX;
                e = Math.min(Math.max(e, d.minWidth), d.maxWidth), c.width = e;
            }
            if (-1 != c.dir.indexOf("s")) {
                var f = c.startHeight + b.pageY - c.startY;
                f = Math.min(Math.max(f, d.minHeight), d.maxHeight), c.height = f;
            }
            if (-1 != c.dir.indexOf("w")) {
                var e = c.startWidth - b.pageX + c.startX;
                e = Math.min(Math.max(e, d.minWidth), d.maxWidth), c.width = e, c.left = c.startLeft + c.startWidth - c.width;
            }
            if (-1 != c.dir.indexOf("n")) {
                var f = c.startHeight - b.pageY + c.startY;
                f = Math.min(Math.max(f, d.minHeight), d.maxHeight), c.height = f, c.top = c.startTop + c.startHeight - c.height;
            }
        }
        function e(b) {
            var c = b.data, d = a(c.target);
            d.css({
                left: c.left,
                top: c.top
            }), d.outerWidth() != c.width && d._outerWidth(c.width), d.outerHeight() != c.height && d._outerHeight(c.height);
        }
        function f(b) {
            return a.fn.resizable.isResizing = !0, a.data(b.data.target, "resizable").options.onStartResize.call(b.data.target, b), 
            !1;
        }
        function g(b) {
            return d(b), 0 != a.data(b.data.target, "resizable").options.onResize.call(b.data.target, b) && e(b), 
            !1;
        }
        function h(b) {
            return a.fn.resizable.isResizing = !1, d(b, !0), e(b), a.data(b.data.target, "resizable").options.onStopResize.call(b.data.target, b), 
            a(document).unbind(".resizable"), a("body").css("cursor", ""), !1;
        }
        return "string" == typeof b ? a.fn.resizable.methods[b](this, c) : this.each(function() {
            function c(b) {
                var c = a(b.data.target), e = "", f = c.offset(), g = c.outerWidth(), h = c.outerHeight(), i = d.edge;
                b.pageY > f.top && b.pageY < f.top + i ? e += "n" : b.pageY < f.top + h && b.pageY > f.top + h - i && (e += "s"), 
                b.pageX > f.left && b.pageX < f.left + i ? e += "w" : b.pageX < f.left + g && b.pageX > f.left + g - i && (e += "e");
                for (var j = d.handles.split(","), k = 0; k < j.length; k++) {
                    var l = j[k].replace(/(^\s*)|(\s*$)/g, "");
                    if ("all" == l || l == e) return e;
                }
                return "";
            }
            var d = null, e = a.data(this, "resizable");
            e ? (a(this).unbind(".resizable"), d = a.extend(e.options, b || {})) : (d = a.extend({}, a.fn.resizable.defaults, a.fn.resizable.parseOptions(this), b || {}), 
            a.data(this, "resizable", {
                options: d
            })), 1 != d.disabled && a(this).bind("mousemove.resizable", {
                target: this
            }, function(b) {
                if (!a.fn.resizable.isResizing) {
                    var d = c(b);
                    "" == d ? a(b.data.target).css("cursor", "") : a(b.data.target).css("cursor", d + "-resize");
                }
            }).bind("mouseleave.resizable", {
                target: this
            }, function(b) {
                a(b.data.target).css("cursor", "");
            }).bind("mousedown.resizable", {
                target: this
            }, function(b) {
                function d(c) {
                    var d = parseInt(a(b.data.target).css(c));
                    return isNaN(d) ? 0 : d;
                }
                var e = c(b);
                if ("" != e) {
                    var i = {
                        target: b.data.target,
                        dir: e,
                        startLeft: d("left"),
                        startTop: d("top"),
                        left: d("left"),
                        top: d("top"),
                        startX: b.pageX,
                        startY: b.pageY,
                        startWidth: a(b.data.target).outerWidth(),
                        startHeight: a(b.data.target).outerHeight(),
                        width: a(b.data.target).outerWidth(),
                        height: a(b.data.target).outerHeight(),
                        deltaWidth: a(b.data.target).outerWidth() - a(b.data.target).width(),
                        deltaHeight: a(b.data.target).outerHeight() - a(b.data.target).height()
                    };
                    a(document).bind("mousedown.resizable", i, f), a(document).bind("mousemove.resizable", i, g), 
                    a(document).bind("mouseup.resizable", i, h), a("body").css("cursor", e + "-resize");
                }
            });
        });
    }, a.fn.resizable.methods = {
        options: function(b) {
            return a.data(b[0], "resizable").options;
        },
        enable: function(b) {
            return b.each(function() {
                a(this).resizable({
                    disabled: !1
                });
            });
        },
        disable: function(b) {
            return b.each(function() {
                a(this).resizable({
                    disabled: !0
                });
            });
        }
    }, a.fn.resizable.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "handles", {
            minWidth: "number",
            minHeight: "number",
            maxWidth: "number",
            maxHeight: "number",
            edge: "number"
        } ]), {
            disabled: c.attr("disabled") ? !0 : void 0
        });
    }, a.fn.resizable.defaults = {
        disabled: !1,
        handles: "n, e, s, w, ne, se, sw, nw, all",
        minWidth: 10,
        minHeight: 10,
        maxWidth: 1e4,
        maxHeight: 1e4,
        edge: 5,
        onStartResize: function(a) {},
        onResize: function(a) {},
        onStopResize: function(a) {}
    }, a.fn.resizable.isResizing = !1;
}(jQuery), function(a) {
    function b(b) {
        function c(b) {
            var c = {
                id: b.attr("id"),
                disabled: b.attr("disabled") ? !0 : void 0,
                plain: !0,
                text: a.trim(b.html()),
                iconCls: b.attr("icon") || b.attr("iconCls"),
                type: "button",
                href: b.attr("href"),
                align: "left",
                onclick: b.attr("onclick")
            };
            return (b.attr("type") && "button" != b.attr("type") || b.attr("menu")) && (c = a.extend(c, {
                menu: b.attr("menu"),
                duration: b.attr("duration"),
                type: "menubutton"
            })), c;
        }
        var d = a.data(b, "toolbar").options;
        a.each(a(b).children(), function() {
            var b = c(a(this));
            d.items.push(b);
        }), d.items && (a(b).empty(), d.randerTo && a(b).appendTo(d.randerTo), a(b).css({
            height: 28,
            background: "#f4f4f4",
            padding: "2px 5px 1px 5px",
            borderBottom: "1px solid #ddd"
        }), a.each(d.items, function() {
            var c = this;
            if (1 == c.length) a("<div/>").appendTo(b).css({
                height: 24,
                borderLeft: "1px solid #DDD",
                borderRight: "1px solid white",
                margin: "2px 1px"
            }); else {
                c.type = c.type || "button", c = a.extend(c, {
                    plain: !0
                });
                var d = a("<a/>");
                c.href || (c.href = "javascript:void(0)"), d.attr("href", "javascript:void(0)"), 
                c.onclick ? (c.href = "javascript:void(0)", d.attr("onclick", c.onclick)) : c.handler && "function" == typeof c.handler && (c.disabled || d.click(c.handler)), 
                d.appendTo(b), "button" == c.type ? d.linkbutton(c) : "menubutton" == c.type && d.menubutton(c);
            }
        }), "right" == d.align ? a(b).children().css("float", "right") : a(b).children().css("float", "left"));
    }
    a.fn.toolbar = function(c, d) {
        return "string" == typeof c ? a(this).toolbar.methods[c].call(this, d) : (c = c || {}, 
        this.each(function() {
            var d = a.data(this, "toolbar");
            d ? a.extend(d.options, c) : (a.data(this, "toolbar", {
                options: a.extend({}, a.fn.toolbar.defaults, c)
            }), b(this));
        }));
    }, a.fn.toolbar.methods = {
        options: function() {
            return this.data().toolbar.options;
        },
        select: function(b) {
            return this.each(function() {
                var c = a(this).data().toolbar.options.items, d = a(this);
                d.children().removeClass("l-btn-plain-selected").removeClass("l-btn-selected");
                var e = d.children().eq(b), f = c[b];
                "menubutton" == f.type ? e.menubutton("select", b) : e.linkbutton("select", b);
            });
        },
        disabledALl: function() {
            return this.each(function() {
                var b = a(this).data().toolbar.options.items, c = a(this);
                a.each(b, function(a, b) {
                    var d = c.children().eq(a);
                    "-" != b && ("menubutton" == b.type ? d.menubutton("disable") : d.linkbutton("disable"), 
                    b.handler && d.unbind("click"));
                });
            });
        },
        enableAll: function() {
            return this.each(function() {
                var b = a(this).data().toolbar.options.items, c = a(this);
                a.each(b, function(a, b) {
                    var d = c.children().eq(a);
                    "-" != b && ("menubutton" == b.type ? d.menubutton("enable") : d.linkbutton("enable"), 
                    b.handler && d.click(b.handler));
                });
            });
        },
        disabled: function(b) {
            return this.each(function() {
                var c = a(this).data().toolbar.options.items, d = a(this);
                a.each(c, function(a, c) {
                    if (c.text == b) {
                        var e = d.children().eq(a);
                        "menubutton" == c.type ? e.menubutton("disable") : e.linkbutton("disable"), c.handler && e.unbind("click");
                    }
                });
            });
        },
        enable: function(b) {
            return this.each(function() {
                var c = a(this).data().toolbar.options.items, d = a(this);
                a.each(c, function(a, c) {
                    if (c.text == b) {
                        var e = d.children().eq(a);
                        "menubutton" == c.type ? e.menubutton("enable") : e.linkbutton("enable"), c.handler && e.click(c.handler);
                    }
                });
            });
        }
    }, a.fn.toolbar.defaults = {
        randerTo: null,
        items: []
    }, a.parser && a.parser.plugins.push("toolbar");
}(jQuery), function($) {
    function removeNode(a) {
        a._remove();
    }
    function setSize(a, b) {
        var c = $.data(a, "panel"), d = c.options, e = c.panel, f = e.children(".panel-header"), g = e.children(".panel-body"), h = e.children(".panel-footer");
        if (b && $.extend(d, {
            width: b.width,
            height: b.height,
            minWidth: b.minWidth,
            maxWidth: b.maxWidth,
            minHeight: b.minHeight,
            maxHeight: b.maxHeight,
            left: b.left,
            top: b.top
        }), e._size(d), f.add(g)._outerWidth(e.width()), isNaN(parseInt(d.height))) {
            g.css("height", "");
            var i = $.parser.parseValue("minHeight", d.minHeight, e.parent()), j = $.parser.parseValue("maxHeight", d.maxHeight, e.parent()), k = f._outerHeight() + h._outerHeight() + e._outerHeight() - e.height();
            g._size("minHeight", i ? i - k : ""), g._size("maxHeight", j ? j - k : "");
        } else g._outerHeight(e.height() - f._outerHeight() - h._outerHeight());
        e.css({
            height: "",
            minHeight: "",
            maxHeight: "",
            left: d.left,
            top: d.top
        }), d.onResize.apply(a, [ d.width, d.height ]), $(a).panel("doLayout");
    }
    function movePanel(a, b) {
        var c = $.data(a, "panel").options, d = $.data(a, "panel").panel;
        b && (null != b.left && (c.left = b.left), null != b.top && (c.top = b.top)), d.css({
            left: c.left,
            top: c.top
        }), c.onMove.apply(a, [ c.left, c.top ]);
    }
    function wrapPanel(a) {
        $(a).addClass("panel-body")._size("clear");
        var b = $('<div class="panel"></div>').insertBefore(a);
        return b[0].appendChild(a), b.bind("_resize", function(b, c) {
            return ($(this).hasClass("easyui-fluid") || c) && setSize(a), !1;
        }), b;
    }
    function createPanel(target) {
        function _addHeader() {
            if (opts.noheader || !opts.title && !opts.header && !opts.minSplit) removeNode(panel.children(".panel-header")), 
            panel.children(".panel-body").addClass("panel-body-noheader"); else {
                if (opts.header) $(opts.header).addClass("panel-header").prependTo(panel); else {
                    var header = panel.children(".panel-header");
                    header.length || (header = $('<div class="panel-header"></div>').prependTo(panel)), 
                    $.isArray(opts.tools) || header.find("div.panel-tool .panel-tool-a").appendTo(opts.tools), 
                    header.empty();
                    var htitle = $('<div class="panel-title"></div>').html(opts.title).appendTo(header);
                    opts.iconCls && (htitle.addClass("panel-with-icon"), $('<div class="panel-icon"></div>').addClass(opts.iconCls).appendTo(header));
                    var tool = $('<div class="panel-tool"></div>').appendTo(header);
                    tool.bind("click", function(a) {
                        a.stopPropagation();
                    }), opts.tools && ($.isArray(opts.tools) ? $.map(opts.tools, function(t) {
                        _buildTool(tool, t.iconCls, eval(t.handler));
                    }) : $(opts.tools).children().each(function() {
                        $(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
                    })), opts.collapsible && _buildTool(tool, "panel-tool-collapse", function() {
                        1 == opts.collapsed ? expandPanel(target, !0) : collapsePanel(target, !0);
                    }), opts.minimizable && _buildTool(tool, "panel-tool-min", function() {
                        minimizePanel(target);
                    }), opts.maximizable && _buildTool(tool, "panel-tool-max", function() {
                        1 == opts.maximized ? restorePanel(target) : maximizePanel(target);
                    }), opts.closable && _buildTool(tool, "panel-tool-close", function() {
                        closePanel(target);
                    });
                }
                panel.children("div.panel-body").removeClass("panel-body-noheader");
            }
        }
        function _buildTool(a, b, c) {
            var d = $('<a href="javascript:void(0)"></a>').addClass(b).appendTo(a);
            d.bind("click", c);
        }
        function _addFooter() {
            opts.footer ? ($(opts.footer).addClass("panel-footer").appendTo(panel), $(target).addClass("panel-body-nobottom")) : (panel.children(".panel-footer").remove(), 
            $(target).removeClass("panel-body-nobottom"));
        }
        var state = $.data(target, "panel"), opts = state.options, panel = state.panel;
        panel.css(opts.style), panel.addClass(opts.cls), _addHeader(), _addFooter();
        var header = $(target).panel("header"), body = $(target).panel("body"), footer = $(target).siblings(".panel-footer");
        opts.border ? (header.removeClass("panel-header-noborder"), body.removeClass("panel-body-noborder"), 
        footer.removeClass("panel-footer-noborder")) : (header.addClass("panel-header-noborder"), 
        body.addClass("panel-body-noborder"), footer.addClass("panel-footer-noborder")), 
        header.addClass(opts.headerCls), body.addClass(opts.bodyCls), $(target).attr("id", opts.id || ""), 
        opts.content && ($(target).panel("clear"), $(target).html(opts.content), $.parser.parse($(target)));
    }
    function loadData(a, b) {
        function c(b) {
            $(a).html(b), $.parser && $.parser.parse($(a));
        }
        var d = $.data(a, "panel"), e = d.options;
        if (f && (e.queryParams = b), e.href) {
            if (!d.isLoaded || !e.cache) {
                var f = $.extend({}, e.queryParams);
                if (0 == e.onBeforeLoad.call(a, f)) return;
                d.isLoaded = !1, $(a).panel("clear"), e.loadingMessage && $(a).html($('<div class="panel-loading"></div>').html(e.loadingMessage)), 
                e.loader.call(a, f, function(b) {
                    var c = e.extractor.call(a, b);
                    $(a).html(c), $.parser.parse($(a)), e.onLoad.apply(a, arguments), d.isLoaded = !0;
                }, function() {
                    e.onLoadError.apply(a, arguments);
                });
            }
        } else e.content && (d.isLoaded || (clearPanel(a), c(e.content), d.isLoaded = !0));
    }
    function clearPanel(a) {
        var b = $(a);
        b.find(".combo-f").each(function() {
            $(this).combo("destroy");
        }), b.find(".m-btn").each(function() {
            $(this).menubutton("destroy");
        }), b.find(".s-btn").each(function() {
            $(this).splitbutton("destroy");
        }), b.find(".tooltip-f").each(function() {
            $(this).tooltip("destroy");
        }), b.children("div").each(function() {
            $(this)._size("unfit");
        }), b.empty();
    }
    function doLayout(a) {
        $(a).panel("doLayout", !0);
    }
    function openPanel(a, b) {
        function c() {
            d.closed = !1, d.minimized = !1;
            var b = e.children(".panel-header").find("a.panel-tool-restore");
            b.length && (d.maximized = !0), d.onOpen.call(a), 1 == d.maximized && (d.maximized = !1, 
            maximizePanel(a)), 1 == d.collapsed && (d.collapsed = !1, collapsePanel(a)), d.collapsed || (loadData(a), 
            doLayout(a));
        }
        var d = $.data(a, "panel").options, e = $.data(a, "panel").panel;
        if (1 == b || 0 != d.onBeforeOpen.call(a)) if (e.stop(!0, !0), $.isFunction(d.openAnimation)) d.openAnimation.call(a, c); else switch (d.openAnimation) {
          case "slide":
            e.slideDown(d.openDuration, c);
            break;

          case "fade":
            e.fadeIn(d.openDuration, c);
            break;

          case "show":
            e.show(d.openDuration, c);
            break;

          default:
            e.show(), c();
        }
    }
    function closePanel(a, b) {
        function c() {
            d.closed = !0, d.onClose.call(a);
        }
        var d = $.data(a, "panel").options, e = $.data(a, "panel").panel;
        if (1 == b || 0 != d.onBeforeClose.call(a)) if (e.stop(!0, !0), e._size("unfit"), 
        $.isFunction(d.closeAnimation)) d.closeAnimation.call(a, c); else switch (d.closeAnimation) {
          case "slide":
            e.slideUp(d.closeDuration, c);
            break;

          case "fade":
            e.fadeOut(d.closeDuration, c);
            break;

          case "hide":
            e.hide(d.closeDuration, c);
            break;

          default:
            e.hide(), c();
        }
    }
    function destroyPanel(a, b) {
        var c = $.data(a, "panel"), d = c.options, e = c.panel;
        (1 == b || 0 != d.onBeforeDestroy.call(a)) && ($(a).panel("clear").panel("clear", "footer"), 
        removeNode(e), d.onDestroy.call(a));
    }
    function collapsePanel(a, b) {
        var c = $.data(a, "panel").options, d = $.data(a, "panel").panel, e = d.children(".panel-body"), f = d.children(".panel-header").find("a.panel-tool-collapse");
        1 != c.collapsed && (e.stop(!0, !0), 0 != c.onBeforeCollapse.call(a) && (f.addClass("panel-tool-expand"), 
        1 == b ? e.slideUp("normal", function() {
            c.collapsed = !0, c.onCollapse.call(a);
        }) : (e.hide(), c.collapsed = !0, c.onCollapse.call(a))));
    }
    function expandPanel(a, b) {
        var c = $.data(a, "panel").options, d = $.data(a, "panel").panel, e = d.children(".panel-body"), f = d.children(".panel-header").find("a.panel-tool-collapse");
        0 != c.collapsed && (e.stop(!0, !0), 0 != c.onBeforeExpand.call(a) && (f.removeClass("panel-tool-expand"), 
        1 == b ? e.slideDown("normal", function() {
            c.collapsed = !1, c.onExpand.call(a), loadData(a), doLayout(a);
        }) : (e.show(), c.collapsed = !1, c.onExpand.call(a), loadData(a), doLayout(a))));
    }
    function maximizePanel(a) {
        var b = $.data(a, "panel").options, c = $.data(a, "panel").panel, d = c.children(".panel-header").find("a.panel-tool-max");
        1 != b.maximized && (d.addClass("panel-tool-restore"), $.data(a, "panel").original || ("auto" == b.width && (b.width = $(a).parent().outerWidth()), 
        "auto" == b.height && (b.height = $(a).parent().outerHeight()), $.data(a, "panel").original = {
            width: b.width,
            height: b.height,
            left: b.left,
            top: b.top,
            fit: b.fit
        }), b.left = 0, b.top = 0, b.fit = !0, setSize(a), b.minimized = !1, b.maximized = !0, 
        b.onMaximize.call(a));
    }
    function minimizePanel(a) {
        var b = $.data(a, "panel").options, c = $.data(a, "panel").panel;
        c._size("unfit"), c.hide(), b.minimized = !0, b.maximized = !1, b.onMinimize.call(a);
    }
    function restorePanel(a) {
        var b = $.data(a, "panel").options, c = $.data(a, "panel").panel, d = c.children(".panel-header").find("a.panel-tool-max");
        0 != b.maximized && (c.show(), d.removeClass("panel-tool-restore"), $.extend(b, $.data(a, "panel").original), 
        setSize(a), b.minimized = !1, b.maximized = !1, $.data(a, "panel").original = null, 
        b.onRestore.call(a));
    }
    function setTitle(a, b) {
        $.data(a, "panel").options.title = b, $(a).panel("header").find("div.panel-title").html(b);
    }
    function setFitWidth() {
        var a = $("body").find(".fit-width");
        if (a[0]) {
            var b = a.parent().parent();
            setTimeout(function() {
                var c = b.width() - 2;
                a.width(c), a.prev(0).width(c - 10);
            }, 0);
        }
    }
    $.fn._remove = function() {
        return this.each(function() {
            $(this).remove();
            try {
                this.outerHTML = "";
            } catch (a) {}
        });
    };
    var resizeTimer = null;
    $(window).unbind(".panel").bind("resize.panel", function() {
        resizeTimer && clearTimeout(resizeTimer), resizeTimer = setTimeout(function() {
            var a = $("body.layout");
            a.length ? (a.layout("resize"), $("body").children(".easyui-fluid:visible").each(function() {
                $(this).triggerHandler("_resize");
            })) : $("body").panel("doLayout"), resizeTimer = null, setFitWidth();
        }, 100);
    }), $.fn.panel = function(a, b) {
        return "string" == typeof a ? $.fn.panel.methods[a](this, b) : (a = a || {}, this.each(function() {
            var b, c = $.data(this, "panel");
            c ? (b = $.extend(c.options, a), c.isLoaded = !1) : (b = $.extend({}, $.fn.panel.defaults, $.fn.panel.parseOptions(this), a), 
            $(this).attr("title", ""), c = $.data(this, "panel", {
                options: b,
                panel: wrapPanel(this),
                isLoaded: !1
            })), createPanel(this), 1 == b.doSize && (c.panel.css("display", "block"), setSize(this)), 
            1 == b.closed || 1 == b.minimized ? c.panel.hide() : openPanel(this);
        }));
    }, $.fn.panel.methods = {
        options: function(a) {
            return $.data(a[0], "panel").options;
        },
        panel: function(a) {
            return $.data(a[0], "panel").panel;
        },
        header: function(a) {
            return $.data(a[0], "panel").panel.children(".panel-header");
        },
        footer: function(a) {
            return a.panel("panel").children(".panel-footer");
        },
        body: function(a) {
            return $.data(a[0], "panel").panel.children(".panel-body");
        },
        setTitle: function(a, b) {
            return a.each(function() {
                setTitle(this, b);
            });
        },
        open: function(a, b) {
            return a.each(function() {
                openPanel(this, b);
            });
        },
        close: function(a, b) {
            return a.each(function() {
                closePanel(this, b);
            });
        },
        destroy: function(a, b) {
            return a.each(function() {
                destroyPanel(this, b);
            });
        },
        clear: function(a, b) {
            return a.each(function() {
                clearPanel("footer" == b ? $(this).panel("footer") : this);
            });
        },
        refresh: function(a, b) {
            return a.each(function() {
                var a = $.data(this, "panel");
                a.isLoaded = !1, b && ("string" == typeof b ? a.options.href = b : a.options.queryParams = b), 
                loadData(this);
            });
        },
        resize: function(a, b) {
            return a.each(function() {
                setSize(this, b);
            });
        },
        doLayout: function(a, b) {
            return a.each(function() {
                function a(a, c) {
                    if (a) {
                        var d = a == $("body")[0], e = $(a).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function(b, e) {
                            var f = $(e).parents(".panel-" + c + ":first");
                            return d ? 0 == f.length : f[0] == a;
                        });
                        e.each(function() {
                            $(this).triggerHandler("_resize", [ b || !1 ]);
                        });
                    }
                }
                a(this, "body"), a($(this).siblings(".panel-footer")[0], "footer");
            });
        },
        move: function(a, b) {
            return a.each(function() {
                movePanel(this, b);
            });
        },
        maximize: function(a) {
            return a.each(function() {
                maximizePanel(this);
            });
        },
        minimize: function(a) {
            return a.each(function() {
                minimizePanel(this);
            });
        },
        restore: function(a) {
            return a.each(function() {
                restorePanel(this);
            });
        },
        collapse: function(a, b) {
            return a.each(function() {
                collapsePanel(this, b);
            });
        },
        expand: function(a, b) {
            return a.each(function() {
                expandPanel(this, b);
            });
        }
    }, $.fn.panel.parseOptions = function(a) {
        var b = $(a), c = b.children(".panel-header,header"), d = b.children(".panel-footer,footer");
        return $.extend({}, $.parser.parseOptions(a, [ "id", "width", "height", "left", "top", "title", "iconCls", "cls", "headerCls", "bodyCls", "tools", "href", "method", "header", "footer", {
            cache: "boolean",
            fit: "boolean",
            border: "boolean",
            noheader: "boolean"
        }, {
            collapsible: "boolean",
            minimizable: "boolean",
            maximizable: "boolean"
        }, {
            closable: "boolean",
            collapsed: "boolean",
            minimized: "boolean",
            maximized: "boolean",
            closed: "boolean"
        }, "openAnimation", "closeAnimation", {
            openDuration: "number",
            closeDuration: "number"
        } ]), {
            loadingMessage: void 0 != b.attr("loadingMessage") ? b.attr("loadingMessage") : void 0,
            header: c.length ? c.removeClass("panel-header") : void 0,
            footer: d.length ? d.removeClass("panel-footer") : void 0
        });
    }, $.fn.panel.defaults = {
        id: null,
        title: null,
        iconCls: null,
        width: "auto",
        height: "auto",
        left: null,
        top: null,
        cls: null,
        headerCls: null,
        bodyCls: null,
        style: {},
        href: null,
        cache: !0,
        fit: !1,
        border: !0,
        doSize: !0,
        noheader: !1,
        content: null,
        collapsible: !1,
        minimizable: !1,
        maximizable: !1,
        closable: !1,
        collapsed: !1,
        minimized: !1,
        maximized: !1,
        closed: !1,
        openAnimation: !1,
        openDuration: 400,
        closeAnimation: !1,
        closeDuration: 400,
        tools: null,
        footer: null,
        header: null,
        queryParams: {},
        method: "get",
        href: null,
        loadingMessage: "Loading...",
        loader: function(a, b, c) {
            var d = $(this).panel("options");
            return d.href ? void $.ajax({
                type: d.method,
                url: d.href,
                cache: !1,
                data: a,
                dataType: "html",
                success: function(a) {
                    b(a);
                },
                error: function() {
                    c.apply(this, arguments);
                }
            }) : !1;
        },
        extractor: function(a) {
            var b = /<body[^>]*>((.|[\n\r])*)<\/body>/im, c = b.exec(a);
            return c ? c[1] : a;
        },
        onBeforeLoad: function(a) {},
        onLoad: function() {},
        onLoadError: function() {},
        onBeforeOpen: function() {},
        onOpen: function() {},
        onBeforeClose: function() {},
        onClose: function() {},
        onBeforeDestroy: function() {},
        onDestroy: function() {},
        onResize: function(a, b) {},
        onMove: function(a, b) {},
        onMaximize: function() {},
        onRestore: function() {},
        onMinimize: function() {},
        onBeforeCollapse: function() {},
        onBeforeExpand: function() {},
        onCollapse: function() {},
        onExpand: function() {}
    };
}(jQuery), function(a) {
    function b(b, c) {
        function d(a, b) {
            if (a.length && h(a)) {
                var c = a.panel("options");
                a.panel("resize", {
                    width: j.width(),
                    height: c.height
                });
                var d = a.panel("panel").outerHeight();
                a.panel("move", {
                    left: 0,
                    top: "n" == b ? 0 : j.height() - d
                }), a.panel("panel").is(":visible") && (k.height -= d), "n" == b && a.panel("panel").is(":visible") && (k.top += d, 
                c.split || !c.border || c.minSplit || k.top--), c.split || !c.border || c.minSplit || k.height++;
            }
        }
        function e(a, b) {
            if (a.length && h(a)) {
                var c = a.panel("options");
                a.panel("resize", {
                    width: c.width,
                    height: k.height
                });
                var d = a.panel("panel").outerWidth();
                a.panel("move", {
                    left: "e" == b ? j.width() - d : 0,
                    top: k.top
                }), a.panel("panel").is(":visible") && (k.width -= d), "w" == b && a.panel("panel").is(":visible") && (k.left += d, 
                c.split || !c.border || c.minSplit || k.left--), c.split || !c.border || c.minSplit || k.width++;
            }
        }
        var f = a.data(b, "layout"), g = f.options, i = f.panels, j = a(b);
        c && a.extend(g, {
            width: c.width,
            height: c.height
        }), j._size("body" == b.tagName.toLowerCase() ? "fit" : g);
        var k = {
            top: 0,
            left: 0,
            width: j.width(),
            height: j.height()
        };
        d(h(i.expandNorth) ? i.expandNorth : i.north, "n"), d(h(i.expandSouth) ? i.expandSouth : i.south, "s"), 
        e(h(i.expandEast) ? i.expandEast : i.east, "e"), e(h(i.expandWest) ? i.expandWest : i.west, "w"), 
        i.center.panel("resize", k);
    }
    function c(c) {
        function e(b) {
            b.children("div").each(function() {
                var b = a.fn.layout.parsePanelOptions(this);
                "north,south,east,west,center".indexOf(b.region) >= 0 && d(c, b, this);
            });
        }
        var f = a(c);
        f.addClass("layout"), e(f.children("form").length ? f.children("form") : f), f.append('<div class="layout-split-proxy-h"></div><div class="layout-split-proxy-v"></div>'), 
        f.bind("_resize", function(d, e) {
            return (a(this).hasClass("easyui-fluid") || e) && b(c), !1;
        });
    }
    function d(c, d, e) {
        function g(b) {
            if (l.panel("options").searchBox) {
                var c = l.panel("header"), d = "";
                d += '<div class="panel-search">', d += '<input id="' + l[0].id + '_searchBox" />', 
                d += "</div>", c.append(d);
                var e = a("#" + l[0].id + "_searchBox");
                setTimeout(function() {
                    e.combobox({
                        valueField: "index",
                        textField: "text",
                        width: c.find(".panel-search").innerWidth(),
                        prompt: "请输入关键词...",
                        data: [ {} ]
                    }), e.searchbar("loadAccordionData", b);
                }, 0);
            }
        }
        d.region = d.region || "center";
        var h = a.data(c, "layout").panels, i = a(c), j = d.region;
        if (!h[j].length) {
            var l = a(e);
            l.length || (l = a("<div></div>").appendTo(i));
            var m = a.extend({}, a.fn.layout.paneldefaults, {
                width: l.length ? parseInt(l[0].style.width) || l.outerWidth() : "auto",
                height: l.length ? parseInt(l[0].style.height) || l.outerHeight() : "auto",
                doSize: !1,
                collapsible: !0,
                onOpen: function() {
                    var b = a(this).panel("header").children("div.panel-tool");
                    b.children("a.panel-tool-collapse").hide();
                    var d = {
                        north: "up",
                        south: "down",
                        east: "right",
                        west: "left"
                    };
                    if (d[j]) {
                        var e = "layout-button-" + d[j], g = b.children("a." + e);
                        g.length || (g = a('<a href="javascript:void(0)"></a>').addClass(e).appendTo(b), 
                        g.bind("click", {
                            dir: j
                        }, function(a) {
                            return f(c, a.data.dir), !1;
                        })), a(this).panel("options").collapsible ? g.show() : g.hide();
                    }
                }
            }, d, {
                cls: (d.cls || "") + " layout-panel layout-panel-" + j,
                bodyCls: (d.bodyCls || "") + " layout-body"
            });
            if (l.panel(m), h[j] = l, l.panel("options").split || l.panel("options").minSplit) {
                var n = l.panel("panel");
                n.addClass("layout-split-" + j), l.panel("options").minSplit && n.addClass("layout-min-split");
                var o = {
                    north: "s",
                    south: "n",
                    east: "w",
                    west: "e"
                };
                a(".layout-button-left,.layout-button-right,.layout-button-down,.layout-button-up").mousedown(function() {
                    return !1;
                }), n.resizable(a.extend({}, {
                    handles: o[j] || "",
                    disabled: !l.panel("options").split,
                    onStartResize: function(b) {
                        if (k = !0, "north" == j || "south" == j) var d = a(">div.layout-split-proxy-v", c); else var d = a(">div.layout-split-proxy-h", c);
                        var e = {
                            display: "block"
                        };
                        "north" == j ? (e.top = parseInt(n.css("top")) + n.outerHeight() - d.height(), e.left = parseInt(n.css("left")), 
                        e.width = n.outerWidth(), e.height = d.height()) : "south" == j ? (e.top = parseInt(n.css("top")), 
                        e.left = parseInt(n.css("left")), e.width = n.outerWidth(), e.height = d.height()) : "east" == j ? (e.top = parseInt(n.css("top")) || 0, 
                        e.left = parseInt(n.css("left")) || 0, e.width = d.width(), e.height = n.outerHeight()) : "west" == j && (e.top = parseInt(n.css("top")) || 0, 
                        e.left = n.outerWidth() - d.width(), e.width = d.width(), e.height = n.outerHeight()), 
                        d.css(e), a('<div class="layout-mask"></div>').css({
                            left: 0,
                            top: 0,
                            width: i.width(),
                            height: i.height()
                        }).appendTo(i);
                    },
                    onResize: function(b) {
                        if ("north" == j || "south" == j) {
                            var d = a(">div.layout-split-proxy-v", c);
                            d.css("top", b.pageY - a(c).offset().top - d.height() / 2);
                        } else {
                            var d = a(">div.layout-split-proxy-h", c);
                            d.css("left", b.pageX - a(c).offset().left - d.width() / 2);
                        }
                        return !1;
                    },
                    onStopResize: function(a) {
                        i.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide(), l.panel("resize", a.data), 
                        b(c), k = !1, i.find(">div.layout-mask").remove();
                    }
                }, d));
            }
            switch (j) {
              case "west":
                g("#left");
            }
        }
    }
    function e(b, c) {
        var d = a.data(b, "layout").panels;
        if (d[c].length) {
            d[c].panel("destroy"), d[c] = a();
            var e = "expand" + c.substring(0, 1).toUpperCase() + c.substring(1);
            d[e] && (d[e].panel("destroy"), d[e] = void 0);
        }
    }
    function f(b, c, d) {
        function e(d) {
            var e;
            "east" == d ? e = "layout-button-left" : "west" == d ? e = "layout-button-right" : "north" == d ? e = "layout-button-down" : "south" == d && (e = "layout-button-up");
            var f = a("<div></div>").appendTo(b);
            return f.panel(a.extend({}, a.fn.layout.paneldefaults, {
                cls: "layout-expand layout-expand-" + d,
                title: "&nbsp;",
                closed: !0,
                minWidth: 0,
                minHeight: 0,
                doSize: !1,
                tools: [ {
                    iconCls: e,
                    handler: function() {
                        return g(b, c), !1;
                    }
                } ]
            })), j[c].panel("options").minSplit && f.panel("panel").addClass("layout-min-split layout-expand-" + c), 
            f.panel("panel").hover(function() {
                a(this).addClass("layout-expand-over");
            }, function() {
                a(this).removeClass("layout-expand-over");
            }), f;
        }
        function i() {
            {
                var d = 28, e = a(b), f = j.center.panel("options");
                m.collapsedSize;
            }
            if ("east" == c) {
                var g = j.east.panel("options");
                g.minSplit && (d = 5);
                var i = l.panel("panel")._outerWidth(), k = f.width + i - d;
                return (m.split || !m.border || m.minSplit) && k++, {
                    resizeC: {
                        width: k
                    },
                    expand: {
                        left: e.width() - i
                    },
                    expandP: {
                        top: f.top,
                        left: e.width() - d,
                        width: d,
                        height: f.height
                    },
                    collapse: {
                        left: e.width(),
                        top: f.top,
                        height: f.height
                    }
                };
            }
            if ("west" == c) {
                var g = j.west.panel("options");
                g.minSplit && (d = 5);
                var i = l.panel("panel")._outerWidth(), k = f.width + i - d;
                return (m.split || !m.border || m.minSplit) && k++, {
                    resizeC: {
                        width: k,
                        left: d
                    },
                    expand: {
                        left: 0
                    },
                    expandP: {
                        left: 0,
                        top: f.top,
                        width: d,
                        height: f.height
                    },
                    collapse: {
                        left: -i,
                        top: f.top,
                        height: f.height
                    }
                };
            }
            if ("north" == c) {
                var g = j.north.panel("options");
                g.minSplit && (d = 5);
                var n = l.panel("panel")._outerHeight(), o = f.height;
                return h(j.expandNorth) || (o += n - d + (m.split || !m.border ? 1 : 0)), j.east.add(j.west).add(j.expandEast).add(j.expandWest).panel("resize", {
                    top: d,
                    height: o
                }), {
                    resizeC: {
                        top: d,
                        height: o
                    },
                    expand: {
                        top: 0
                    },
                    expandP: {
                        top: 0,
                        left: 0,
                        width: e.width(),
                        height: d
                    },
                    collapse: {
                        top: -n,
                        width: e.width()
                    }
                };
            }
            if ("south" == c) {
                var g = j.south.panel("options");
                g.minSplit && (d = 5);
                var n = l.panel("panel")._outerHeight(), o = f.height;
                return h(j.expandSouth) || (o += n - d + (m.split || !m.border ? 1 : 0)), j.east.add(j.west).add(j.expandEast).add(j.expandWest).panel("resize", {
                    height: o
                }), {
                    resizeC: {
                        height: o
                    },
                    expand: {
                        top: e.height() - n
                    },
                    expandP: {
                        top: e.height() - d,
                        left: 0,
                        width: e.width(),
                        height: d
                    },
                    collapse: {
                        top: e.height(),
                        width: e.width()
                    }
                };
            }
        }
        void 0 == d && (d = 150);
        var j = a.data(b, "layout").panels, l = j[c], m = l.panel("options");
        if (0 != m.onBeforeCollapse.call(l)) {
            var n = "expand" + c.substring(0, 1).toUpperCase() + c.substring(1);
            j[n] || (j[n] = e(c), j[n].panel("panel").bind("click", function() {
                l.panel("expand", !1).panel("open");
                var d = i();
                return l.panel("resize", d.collapse), l.panel("panel").animate(d.expand, function() {
                    a(this).unbind(".layout").bind("mouseleave.layout", {
                        region: c
                    }, function(c) {
                        1 != k && (a("body>div.combo-p>div.combo-panel:visible").length || f(b, c.data.region));
                    });
                }), !1;
            }));
            var o = i();
            h(j[n]) || j.center.panel("resize", o.resizeC), l.panel("panel").animate(o.collapse, d, function() {
                l.panel("collapse", !1).panel("close"), j[n].panel("open").panel("resize", o.expandP), 
                a(this).unbind(".layout");
            });
        }
    }
    function g(c, d) {
        function e() {
            var b = a(c), e = f.center.panel("options");
            return "east" == d && f.expandEast ? {
                collapse: {
                    left: b.width(),
                    top: e.top,
                    height: e.height
                },
                expand: {
                    left: b.width() - g.panel("panel")._outerWidth()
                }
            } : "west" == d && f.expandWest ? {
                collapse: {
                    left: -g.panel("panel")._outerWidth(),
                    top: e.top,
                    height: e.height
                },
                expand: {
                    left: 0
                }
            } : "north" == d && f.expandNorth ? {
                collapse: {
                    top: -g.panel("panel")._outerHeight(),
                    width: b.width()
                },
                expand: {
                    top: 0
                }
            } : "south" == d && f.expandSouth ? {
                collapse: {
                    top: b.height(),
                    width: b.width()
                },
                expand: {
                    top: b.height() - g.panel("panel")._outerHeight()
                }
            } : void 0;
        }
        var f = a.data(c, "layout").panels, g = f[d], h = g.panel("options");
        if (0 != h.onBeforeExpand.call(g)) {
            var i = "expand" + d.substring(0, 1).toUpperCase() + d.substring(1);
            if (f[i]) {
                f[i].panel("close"), g.panel("panel").stop(!0, !0), g.panel("expand", !1).panel("open");
                var j = e();
                g.panel("resize", j.collapse), g.panel("panel").animate(j.expand, function() {
                    b(c);
                });
            }
        }
    }
    function h(a) {
        return a && a.length ? a.panel("panel").is(":visible") : !1;
    }
    function i(b) {
        function c(a) {
            var c = d[a];
            c.length && c.panel("options").collapsed && f(b, a, 0);
        }
        var d = a.data(b, "layout").panels;
        c("east"), c("west"), c("north"), c("south");
    }
    function j(c, d, e) {
        var f = a(c).layout("panel", d);
        f.panel("options").split = e;
        var g = "layout-split-" + d, h = f.panel("panel").removeClass(g);
        e && h.addClass(g), h.resizable({
            disabled: !e
        }), b(c);
    }
    var k = !1;
    a.fn.layout = function(d, e) {
        return "string" == typeof d ? a.fn.layout.methods[d](this, e) : (d = d || {}, this.each(function() {
            var e = a.data(this, "layout");
            if (e) a.extend(e.options, d); else {
                var f = a.extend({}, a.fn.layout.defaults, a.fn.layout.parseOptions(this), d);
                a.data(this, "layout", {
                    options: f,
                    panels: {
                        center: a(),
                        north: a(),
                        south: a(),
                        east: a(),
                        west: a()
                    }
                }), c(this);
            }
            b(this), i(this);
        }));
    }, a.fn.layout.methods = {
        options: function(b) {
            return a.data(b[0], "layout").options;
        },
        resize: function(a, c) {
            return a.each(function() {
                b(this, c);
            });
        },
        panel: function(b, c) {
            return a.data(b[0], "layout").panels[c];
        },
        collapse: function(a, b) {
            return a.each(function() {
                f(this, b);
            });
        },
        expand: function(a, b) {
            return a.each(function() {
                g(this, b);
            });
        },
        add: function(c, e) {
            return c.each(function() {
                d(this, e), b(this), a(this).layout("panel", e.region).panel("options").collapsed && f(this, e.region, 0);
            });
        },
        remove: function(a, c) {
            return a.each(function() {
                e(this, c), b(this);
            });
        },
        split: function(a, b) {
            return a.each(function() {
                j(this, b, !0);
            });
        },
        unsplit: function(a, b) {
            return a.each(function() {
                j(this, b, !1);
            });
        }
    }, a.fn.layout.parseOptions = function(b) {
        return a.extend({}, a.parser.parseOptions(b, [ {
            fit: "boolean"
        } ]));
    }, a.fn.layout.defaults = {
        fit: !1
    }, a.fn.layout.parsePanelOptions = function(b) {
        a(b);
        return a.extend({}, a.fn.panel.parseOptions(b), a.parser.parseOptions(b, [ "region", {
            split: "boolean",
            collpasedSize: "number",
            minWidth: "number",
            minHeight: "number",
            maxWidth: "number",
            maxHeight: "number"
        } ]));
    }, a.fn.layout.paneldefaults = a.extend({}, a.fn.panel.defaults, {
        region: null,
        split: !1,
        collapsedSize: 28,
        minWidth: 0,
        minHeight: 0,
        maxWidth: 1e4,
        maxHeight: 1e4
    });
}(jQuery), function(a) {
    function b(b, c) {
        var d = a.data(b, "linkbutton").options;
        if (c && a.extend(d, c), d.width || d.height || d.fit) {
            var e = a(b), f = e.parent(), g = e.is(":visible");
            if (!g) {
                var h = a('<div style="display:none"></div>').insertBefore(b), i = {
                    position: e.css("position"),
                    display: e.css("display"),
                    left: e.css("left")
                };
                e.appendTo("body"), e.css({
                    position: "absolute",
                    display: "inline-block",
                    left: -2e4
                });
            }
            e._size(d, f);
            var j = e.find(".l-btn-left");
            j.css("margin-top", 0), j.css("margin-top", parseInt((e.height() - j.height()) / 2) + "px"), 
            g || (e.insertAfter(h), e.css(i), h.remove());
        }
    }
    function c(b) {
        var c = a.data(b, "linkbutton").options, f = a(b).empty();
        f.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline"), 
        f.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-" + c.size), 
        c.plain && f.addClass("l-btn-plain"), c.outline && f.addClass("l-btn-outline"), 
        c.selected && f.addClass(c.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected"), 
        f.attr("group", c.group || ""), f.attr("id", c.id || "");
        var g = a('<span class="l-btn-left"></span>').appendTo(f);
        c.text ? a('<span class="l-btn-text"></span>').html(c.text).appendTo(g) : a('<span class="l-btn-text l-btn-empty">&nbsp;</span>').appendTo(g), 
        c.iconCls && (a('<span class="l-btn-icon">&nbsp;</span>').addClass(c.iconCls).appendTo(g), 
        g.addClass("l-btn-icon-" + c.iconAlign)), f.unbind(".linkbutton").bind("focus.linkbutton", function() {
            c.disabled || a(this).addClass("l-btn-focus");
        }).bind("blur.linkbutton", function() {
            a(this).removeClass("l-btn-focus");
        }).bind("click.linkbutton", function() {
            c.disabled || (c.toggle && a(this).linkbutton(c.selected ? "unselect" : "select"), 
            c.onClick.call(this));
        }), d(b, c.selected), e(b, c.disabled);
    }
    function d(b, c) {
        var d = a.data(b, "linkbutton").options;
        c ? (d.group && a('a.l-btn[group="' + d.group + '"]').each(function() {
            var b = a(this).linkbutton("options");
            b.toggle && (a(this).removeClass("l-btn-selected l-btn-plain-selected"), b.selected = !1);
        }), a(b).addClass(d.plain ? "l-btn-selected l-btn-plain-selected" : "l-btn-selected"), 
        d.selected = !0) : d.group || (a(b).removeClass("l-btn-selected l-btn-plain-selected"), 
        d.selected = !1);
    }
    function e(b, c) {
        var d = a.data(b, "linkbutton"), e = d.options;
        if (a(b).removeClass("l-btn-disabled l-btn-plain-disabled"), c) {
            e.disabled = !0;
            var f = a(b).attr("href");
            f && (d.href = f, a(b).attr("href", "javascript:void(0)")), b.onclick && (d.onclick = b.onclick, 
            b.onclick = null), a(b).addClass(e.plain ? "l-btn-disabled l-btn-plain-disabled" : "l-btn-disabled");
        } else e.disabled = !1, d.href && a(b).attr("href", d.href), d.onclick && (b.onclick = d.onclick);
    }
    a.fn.linkbutton = function(d, e) {
        return "string" == typeof d ? a.fn.linkbutton.methods[d](this, e) : (d = d || {}, 
        this.each(function() {
            var e = a.data(this, "linkbutton");
            e ? a.extend(e.options, d) : (a.data(this, "linkbutton", {
                options: a.extend({}, a.fn.linkbutton.defaults, a.fn.linkbutton.parseOptions(this), d)
            }), a(this).removeAttr("disabled"), a(this).bind("_resize", function(c, d) {
                return (a(this).hasClass("easyui-fluid") || d) && b(this), !1;
            })), c(this), b(this);
        }));
    }, a.fn.linkbutton.methods = {
        options: function(b) {
            return a.data(b[0], "linkbutton").options;
        },
        resize: function(a, c) {
            return a.each(function() {
                b(this, c);
            });
        },
        enable: function(a) {
            return a.each(function() {
                e(this, !1);
            });
        },
        disable: function(a) {
            return a.each(function() {
                e(this, !0);
            });
        },
        select: function(a) {
            return a.each(function() {
                d(this, !0);
            });
        },
        unselect: function(a) {
            return a.each(function() {
                d(this, !1);
            });
        }
    }, a.fn.linkbutton.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "id", "iconCls", "iconAlign", "group", "size", "text", {
            plain: "boolean",
            toggle: "boolean",
            selected: "boolean",
            outline: "boolean"
        } ]), {
            disabled: c.attr("disabled") ? !0 : void 0,
            text: a.trim(c.html()) || void 0,
            iconCls: c.attr("icon") || c.attr("iconCls")
        });
    }, a.fn.linkbutton.defaults = {
        id: null,
        disabled: !1,
        toggle: !1,
        selected: !1,
        outline: !1,
        group: null,
        plain: !1,
        text: "",
        iconCls: null,
        iconAlign: "left",
        size: "small",
        onClick: function() {}
    };
}(jQuery), function(a) {
    var b = function(b) {
        var c = a.data(b, "linkmore").options, d = a(b), e = a(c.linkTarget);
        d.addClass("linkmore");
        var f = function() {
            e.layout("hidden", "north"), d.removeClass("linkmore-expand").addClass("linkmore-collapse"), 
            d.text(c.text1);
        }, g = function() {
            e.layout("show", "north"), d.removeClass("linkmore-collapse").addClass("linkmore-expand"), 
            d.text(c.text2);
        };
        c.linkTargetShow || f(), d.click(function() {
            e.layout("isVisible", "north") ? f() : g();
        });
    };
    a.fn.linkmore = function(c, d) {
        return "string" == typeof c && a.fn.linkmore.methods[c].call(this, d), c = c || {}, 
        this.each(function() {
            var d = a.data(this, "linkmore");
            d ? a.extend(d.options, c) : a.data(this, "linkmore", {
                options: a.extend({}, a.fn.linkbutton.defaults, a.fn.linkmore.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.linkmore.defaults = {
        linkTarget: "",
        linkTargetShow: !1,
        text1: "查看更多",
        text2: "隐藏显示"
    }, a.fn.linkmore.methods = {}, a.fn.linkmore.parseOptions = function(b) {
        return a.extend({}, a.parser.parseOptions(b));
    }, a.parser.plugins.push("linkmore");
}(jQuery), function($) {
    function buildToolbar(target) {
        function createButton(a) {
            var b = opts.nav[a], c = $('<a href="javascript:void(0)"></a>').appendTo(tr);
            return c.wrap("<td></td>"), c.linkbutton({
                iconCls: b.iconCls,
                plain: !0
            }).unbind(".pagination").bind("click.pagination", function() {
                b.handler.call(target);
            }), c;
        }
        function removeArrayItem(a, b) {
            var c = $.inArray(b, a);
            return c >= 0 && a.splice(c, 1), a;
        }
        var state = $.data(target, "pagination"), opts = state.options, bb = state.bb = {}, pager = $(target).addClass("pagination").html('<table cellspacing="0" cellpadding="0" border="0"><tr></tr></table>'), tr = pager.find("tr"), aa = $.extend([], opts.layout);
        opts.showPageList || removeArrayItem(aa, "list"), opts.showRefresh || removeArrayItem(aa, "refresh"), 
        "sep" == aa[0] && aa.shift(), "sep" == aa[aa.length - 1] && aa.pop();
        for (var index = 0; index < aa.length; index++) {
            var item = aa[index];
            if ("list" == item) {
                var ps = $('<select class="pagination-page-list"></select>');
                ps.bind("change", function() {
                    opts.pageSize = parseInt($(this).val()), opts.onChangePageSize.call(target, opts.pageSize), 
                    selectPage(target, opts.pageNumber);
                });
                for (var i = 0; i < opts.pageList.length; i++) $("<option></option>").text(opts.pageList[i]).appendTo(ps);
                $("<td></td>").append(ps).appendTo(tr);
            } else "sep" == item ? $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr) : "first" == item ? bb.first = createButton("first") : "prev" == item ? bb.prev = createButton("prev") : "next" == item ? bb.next = createButton("next") : "last" == item ? bb.last = createButton("last") : "manual" == item ? ($('<span style="padding-left:6px;"></span>').html(opts.beforePageText).appendTo(tr).wrap("<td></td>"), 
            bb.num = $('<input class="pagination-num" type="text" value="1" size="2">').appendTo(tr).wrap("<td></td>"), 
            bb.num.unbind(".pagination").bind("keydown.pagination", function(a) {
                if (13 == a.keyCode) {
                    var b = parseInt($(this).val()) || 1;
                    return selectPage(target, b), !1;
                }
            }), bb.after = $('<span style="padding-right:6px;"></span>').appendTo(tr).wrap("<td></td>")) : "refresh" == item ? bb.refresh = createButton("refresh") : "links" == item && $('<td class="pagination-links"></td>').appendTo(tr);
        }
        if (opts.buttons) if ($('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr), 
        $.isArray(opts.buttons)) for (var i = 0; i < opts.buttons.length; i++) {
            var btn = opts.buttons[i];
            if ("-" == btn) $('<td><div class="pagination-btn-separator"></div></td>').appendTo(tr); else {
                var td = $("<td></td>").appendTo(tr), a = $('<a href="javascript:void(0)"></a>').appendTo(td);
                a[0].onclick = eval(btn.handler || function() {}), a.linkbutton($.extend({}, btn, {
                    plain: !0
                }));
            }
        } else {
            var td = $("<td></td>").appendTo(tr);
            $(opts.buttons).appendTo(td).show();
        }
        $('<div class="pagination-info"></div>').appendTo(pager), $('<div style="clear:both;"></div>').appendTo(pager);
    }
    function selectPage(a, b) {
        var c = $.data(a, "pagination").options;
        refreshData(a, {
            pageNumber: b
        }), c.onSelectPage.call(a, c.pageNumber, c.pageSize);
    }
    function refreshData(a, b) {
        var c = $.data(a, "pagination"), d = c.options, e = c.bb;
        $.extend(d, b || {});
        var f = $(a).find("select.pagination-page-list");
        if (f.length) {
            d.pageSize = parseInt(d.pageSize);
            var g = !1;
            $.each(d.pageList, function(a, b) {
                return d.pageSize == b ? (g = !0, !1) : void 0;
            }), g || (d.pageSize = d.pageList[0]), f.val(d.pageSize + ""), d.pageSize = parseInt(f.val());
        }
        var h = Math.ceil(d.total / d.pageSize) || 1;
        d.pageNumber < 1 && (d.pageNumber = 1), d.pageNumber > h && (d.pageNumber = h), 
        0 == d.total && (d.pageNumber = 0, h = 0), e.num && e.num.val(d.pageNumber), e.after && e.after.html(d.afterPageText.replace(/{pages}/, h));
        var i = $(a).find("td.pagination-links");
        if (i.length) {
            i.empty();
            var j = d.pageNumber - Math.floor(d.links / 2);
            1 > j && (j = 1);
            var k = j + d.links - 1;
            k > h && (k = h), j = k - d.links + 1, 1 > j && (j = 1);
            for (var l = j; k >= l; l++) {
                var m = $('<a class="pagination-link" href="javascript:void(0)"></a>').appendTo(i);
                m.linkbutton({
                    plain: !0,
                    text: l
                }), l == d.pageNumber ? m.linkbutton("select") : m.unbind(".pagination").bind("click.pagination", {
                    pageNumber: l
                }, function(b) {
                    selectPage(a, b.data.pageNumber);
                });
            }
        }
        var n = d.displayMsg;
        n = n.replace(/{from}/, 0 == d.total ? 0 : d.pageSize * (d.pageNumber - 1) + 1), 
        n = n.replace(/{to}/, Math.min(d.pageSize * d.pageNumber, d.total)), n = n.replace(/{total}/, d.total), 
        $(a).find("div.pagination-info").html(n), e.first && e.first.linkbutton({
            disabled: !d.total || 1 == d.pageNumber
        }), e.prev && e.prev.linkbutton({
            disabled: !d.total || 1 == d.pageNumber
        }), e.next && e.next.linkbutton({
            disabled: d.pageNumber == h
        }), e.last && e.last.linkbutton({
            disabled: d.pageNumber == h
        }), setLoadStatus(a, d.loading);
    }
    function setLoadStatus(a, b) {
        var c = $.data(a, "pagination"), d = c.options;
        d.loading = b, d.showRefresh && c.bb.refresh && c.bb.refresh.linkbutton({
            iconCls: d.loading ? "pagination-loading" : "pagination-load"
        });
    }
    $.fn.pagination = function(a, b) {
        return "string" == typeof a ? $.fn.pagination.methods[a](this, b) : (a = a || {}, 
        this.each(function() {
            var b, c = $.data(this, "pagination");
            c ? b = $.extend(c.options, a) : (b = $.extend({}, $.fn.pagination.defaults, $.fn.pagination.parseOptions(this), a), 
            $.data(this, "pagination", {
                options: b
            })), buildToolbar(this), refreshData(this);
        }));
    }, $.fn.pagination.methods = {
        options: function(a) {
            return $.data(a[0], "pagination").options;
        },
        loading: function(a) {
            return a.each(function() {
                setLoadStatus(this, !0);
            });
        },
        loaded: function(a) {
            return a.each(function() {
                setLoadStatus(this, !1);
            });
        },
        refresh: function(a, b) {
            return a.each(function() {
                refreshData(this, b);
            });
        },
        select: function(a, b) {
            return a.each(function() {
                selectPage(this, b);
            });
        }
    }, $.fn.pagination.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target, [ {
            total: "number",
            pageSize: "number",
            pageNumber: "number",
            links: "number"
        }, {
            loading: "boolean",
            showPageList: "boolean",
            showRefresh: "boolean"
        } ]), {
            pageList: t.attr("pageList") ? eval(t.attr("pageList")) : void 0
        });
    }, $.fn.pagination.defaults = {
        total: 1,
        pageSize: 10,
        pageNumber: 1,
        pageList: [ 10, 20, 30, 50 ],
        loading: !1,
        buttons: null,
        showPageList: !0,
        showRefresh: !0,
        links: 10,
        layout: [ "list", "sep", "first", "prev", "sep", "manual", "sep", "next", "last", "sep", "refresh" ],
        onSelectPage: function(a, b) {},
        onBeforeRefresh: function(a, b) {},
        onRefresh: function(a, b) {},
        onChangePageSize: function(a) {},
        beforePageText: "Page",
        afterPageText: "of {pages}",
        displayMsg: "Displaying {from} to {to} of {total} items",
        nav: {
            first: {
                iconCls: "pagination-first",
                handler: function() {
                    var a = $(this).pagination("options");
                    a.pageNumber > 1 && $(this).pagination("select", 1);
                }
            },
            prev: {
                iconCls: "pagination-prev",
                handler: function() {
                    var a = $(this).pagination("options");
                    a.pageNumber > 1 && $(this).pagination("select", a.pageNumber - 1);
                }
            },
            next: {
                iconCls: "pagination-next",
                handler: function() {
                    var a = $(this).pagination("options"), b = Math.ceil(a.total / a.pageSize);
                    a.pageNumber < b && $(this).pagination("select", a.pageNumber + 1);
                }
            },
            last: {
                iconCls: "pagination-last",
                handler: function() {
                    var a = $(this).pagination("options"), b = Math.ceil(a.total / a.pageSize);
                    a.pageNumber < b && $(this).pagination("select", b);
                }
            },
            refresh: {
                iconCls: "pagination-refresh",
                handler: function() {
                    var a = $(this).pagination("options");
                    0 != a.onBeforeRefresh.call(this, a.pageNumber, a.pageSize) && ($(this).pagination("select", a.pageNumber), 
                    a.onRefresh.call(this, a.pageNumber, a.pageSize));
                }
            }
        }
    };
}(jQuery), function($) {
    function indexOfArray(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] == b) return c;
        return -1;
    }
    function removeArrayItem(a, b, c) {
        if ("string" == typeof b) {
            for (var d = 0, e = a.length; e > d; d++) if (a[d][b] == c) return void a.splice(d, 1);
        } else {
            var f = indexOfArray(a, b);
            -1 != f && a.splice(f, 1);
        }
    }
    function addArrayItem(a, b, c) {
        for (var d = 0, e = a.length; e > d; d++) if (a[d][b] == c[b]) return;
        a.push(c);
    }
    function getArguments(a, b) {
        return $.data(a, "treegrid") ? b.slice(1) : b;
    }
    function createStyleSheet(a) {
        var b = $.data(a, "datagrid"), c = b.options, d = b.panel, e = b.dc, f = null;
        c.sharedStyleSheet ? f = "boolean" == typeof c.sharedStyleSheet ? "head" : c.sharedStyleSheet : (f = d.closest("div.datagrid-view"), 
        f.length || (f = e.view));
        var g = $(f), h = $.data(g[0], "ss");
        return h || (h = $.data(g[0], "ss", {
            cache: {},
            dirty: []
        })), {
            add: function(a) {
                for (var b = [ '<style type="text/css" easyui="true">' ], c = 0; c < a.length; c++) h.cache[a[c][0]] = {
                    width: a[c][1]
                };
                var d = 0;
                for (var e in h.cache) {
                    var f = h.cache[e];
                    f.index = d++, b.push(e + "{width:" + f.width + "}");
                }
                b.push("</style>"), $(b.join("\n")).appendTo(g), g.children("style[easyui]:not(:last)").remove();
            },
            getRule: function(a) {
                var b = g.children("style[easyui]:last")[0], c = b.styleSheet ? b.styleSheet : b.sheet || document.styleSheets[document.styleSheets.length - 1], d = c.cssRules || c.rules;
                return d[a];
            },
            set: function(a, b) {
                var c = h.cache[a];
                if (c) {
                    c.width = b;
                    var d = this.getRule(c.index);
                    d && (d.style.width = b);
                }
            },
            remove: function(a) {
                var b = [];
                for (var c in h.cache) -1 == c.indexOf(a) && b.push([ c, h.cache[c].width ]);
                h.cache = {}, this.add(b);
            },
            dirty: function(a) {
                a && h.dirty.push(a);
            },
            clean: function() {
                for (var a = 0; a < h.dirty.length; a++) this.remove(h.dirty[a]);
                h.dirty = [];
            }
        };
    }
    function setSize(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = c.panel;
        if (b && $.extend(d, b), 1 == d.fit) {
            var f = e.panel("panel").parent();
            d.width = f.width(), d.height = f.height();
        }
        e.panel("resize", d);
    }
    function setBodySize(a) {
        var b = $.data(a, "datagrid"), c = b.options, d = b.dc, e = b.panel, f = e.width(), g = e.height(), h = d.view, i = d.view1, j = d.view2, k = i.children("div.datagrid-header"), l = j.children("div.datagrid-header"), m = k.find("table"), n = l.find("table");
        h.width(f);
        var o = k.children("div.datagrid-header-inner").show();
        i.width(o.find("table").width()), c.showHeader || o.hide(), j.width(f - i._outerWidth()), 
        i.children()._outerWidth(i.width()), j.children()._outerWidth(j.width());
        var p = k.add(l).add(m).add(n);
        p.css("height", "");
        var q = Math.max(m.height(), n.height());
        p._outerHeight(q), d.body1.add(d.body2).children("table.datagrid-btable-frozen").css({
            position: "absolute",
            top: d.header2._outerHeight()
        });
        var r = d.body2.children("table.datagrid-btable-frozen")._outerHeight(), s = r + l._outerHeight() + j.children(".datagrid-footer")._outerHeight();
        e.children(":not(.datagrid-view,.datagrid-mask,.datagrid-mask-msg)").each(function() {
            s += $(this)._outerHeight();
        });
        var t = e.outerHeight() - e.height(), u = e._size("minHeight") || "", v = e._size("maxHeight") || "";
        i.add(j).children("div.datagrid-body").css({
            marginTop: r,
            height: isNaN(parseInt(c.height)) ? "" : g - s,
            minHeight: u ? u - t - s : "",
            maxHeight: v ? v - t - s : ""
        }), h.height(j.height());
    }
    function fixRowHeight(a, b, c) {
        function d(a, b) {
            for (var c = 0; c < b.length; c++) {
                var d = $(a[c]), e = $(b[c]);
                d.css("height", ""), e.css("height", "");
                var f = Math.max(d.height(), e.height());
                d.css("height", f), e.css("height", f);
            }
        }
        function e(a) {
            var b = 0, c = 0;
            return $(a).children().each(function() {
                var a = $(this);
                a.is(":visible") && (c += a._outerHeight(), b < a._outerWidth() && (b = a._outerWidth()));
            }), {
                width: b,
                height: c
            };
        }
        var f = ($.data(a, "datagrid").data.rows, $.data(a, "datagrid").options), g = $.data(a, "datagrid").dc;
        if (f.setTRHeight && !g.body1.is(":empty") && (!f.nowrap || f.autoRowHeight || c)) if (void 0 != b) {
            var h = f.finder.getTr(a, b, "body", 1), i = f.finder.getTr(a, b, "body", 2);
            d(h, i);
        } else {
            var h = f.finder.getTr(a, 0, "allbody", 1), i = f.finder.getTr(a, 0, "allbody", 2);
            if (d(h, i), f.showFooter) {
                var h = f.finder.getTr(a, 0, "allfooter", 1), i = f.finder.getTr(a, 0, "allfooter", 2);
                d(h, i);
            }
        }
        if (setBodySize(a), "auto" == f.height) {
            var j = g.body1.parent(), k = g.body2, l = e(k), m = l.height;
            l.width > k.width() && (m += 18), m -= parseInt(k.css("marginTop")) || 0, j.height(m), 
            k.height(m), g.view.height(g.view2.height());
        }
        g.body2.triggerHandler("scroll");
    }
    function freezeRow(a, b) {
        function c(c) {
            var d = c ? 1 : 2, g = e.finder.getTr(a, b, "body", d);
            (c ? f.body1 : f.body2).children("table.datagrid-btable-frozen").append(g);
        }
        var d = $.data(a, "datagrid"), e = d.options, f = d.dc;
        f.body2.children("table.datagrid-btable-frozen").length || f.body1.add(f.body2).prepend('<table class="datagrid-btable datagrid-btable-frozen" cellspacing="0" cellpadding="0"></table>'), 
        c(!0), c(!1), setBodySize(a);
    }
    function wrapGrid(target, rownumbers) {
        function getColumns() {
            var frozenColumns = [], columns = [];
            return $(target).children("thead").each(function() {
                var opt = $.parser.parseOptions(this, [ {
                    frozen: "boolean"
                } ]);
                $(this).find("tr").each(function() {
                    var cols = [];
                    $(this).find("th").each(function() {
                        var th = $(this), col = $.extend({}, $.parser.parseOptions(this, [ "field", "align", "halign", "order", "width", {
                            sortable: "boolean",
                            checkbox: "boolean",
                            resizable: "boolean",
                            fixed: "boolean"
                        }, {
                            rowspan: "number",
                            colspan: "number"
                        } ]), {
                            title: th.html() || void 0,
                            hidden: th.attr("hidden") ? !0 : void 0,
                            formatter: th.attr("formatter") ? eval(th.attr("formatter")) : void 0,
                            styler: th.attr("styler") ? eval(th.attr("styler")) : void 0,
                            sorter: th.attr("sorter") ? eval(th.attr("sorter")) : void 0
                        });
                        if (col.width && -1 == String(col.width).indexOf("%") && (col.width = parseInt(col.width)), 
                        th.attr("editor")) {
                            var s = $.trim(th.attr("editor"));
                            "{" == s.substr(0, 1) ? col.editor = eval("(" + s + ")") : col.editor = s;
                        }
                        cols.push(col);
                    }), opt.frozen ? frozenColumns.push(cols) : columns.push(cols);
                });
            }), [ frozenColumns, columns ];
        }
        var panel = $('<div class="datagrid-wrap"><div class="datagrid-view"><div class="datagrid-view1"><div class="datagrid-header"><div class="datagrid-header-inner"></div></div><div class="datagrid-body"><div class="datagrid-body-inner"></div></div><div class="datagrid-footer"><div class="datagrid-footer-inner"></div></div></div><div class="datagrid-view2"><div class="datagrid-header"><div class="datagrid-header-inner"></div></div><div class="datagrid-body"></div><div class="datagrid-footer"><div class="datagrid-footer-inner"></div></div></div></div></div>').insertAfter(target);
        panel.panel({
            doSize: !1,
            cls: "datagrid"
        }), $(target).addClass("datagrid-f").hide().appendTo(panel.children("div.datagrid-view"));
        var cc = getColumns(), view = panel.children("div.datagrid-view"), view1 = view.children("div.datagrid-view1"), view2 = view.children("div.datagrid-view2");
        return {
            panel: panel,
            frozenColumns: cc[0],
            columns: cc[1],
            dc: {
                view: view,
                view1: view1,
                view2: view2,
                header1: view1.children("div.datagrid-header").children("div.datagrid-header-inner"),
                header2: view2.children("div.datagrid-header").children("div.datagrid-header-inner"),
                body1: view1.children("div.datagrid-body").children("div.datagrid-body-inner"),
                body2: view2.children("div.datagrid-body"),
                footer1: view1.children("div.datagrid-footer").children("div.datagrid-footer-inner"),
                footer2: view2.children("div.datagrid-footer").children("div.datagrid-footer-inner")
            }
        };
    }
    function buildGrid(target) {
        function createColumnHeader(a, b, c) {
            if (b) {
                $(a).show(), $(a).empty();
                var d = [], e = [];
                opts.sortName && (d = opts.sortName.split(","), e = opts.sortOrder.split(","));
                for (var f = $('<table class="datagrid-htable" border="0" cellspacing="0" cellpadding="0"><tbody></tbody></table>').appendTo(a), g = !1, h = 0; h < b.length; h++) {
                    var i = b[h];
                    if (!g) for (var j = 0; j < i.length; j++) {
                        var k = i[j];
                        if (k.colspan > 1 || k.rowspan > 1) {
                            f.addClass("datagrid-htable-sm"), g = !0;
                            break;
                        }
                    }
                }
                for (var h = 0; h < b.length; h++) for (var l = $('<tr class="datagrid-header-row"></tr>').appendTo($("tbody", f)), m = b[h], j = 0; j < m.length; j++) {
                    var n = m[j], o = "";
                    n.rowspan && (o += 'rowspan="' + n.rowspan + '" '), n.colspan && (o += 'colspan="' + n.colspan + '" ');
                    var p = $("<td " + o + "></td>").appendTo(l);
                    if (n.checkbox) p.attr("field", n.field), $('<div class="datagrid-header-check"></div>').html('<input type="checkbox"/>').appendTo(p); else if (n.field) {
                        p.attr("field", n.field), p.append('<div class="datagrid-cell"><span></span><span class="datagrid-sort-icon"></span></div>'), 
                        $("span", p).html(n.title), $("span.datagrid-sort-icon", p).html("&nbsp;");
                        var q = p.find("div.datagrid-cell"), r = indexOfArray(d, n.field);
                        if (r >= 0 && q.addClass("datagrid-sort-" + e[r]), 0 == n.resizable && q.attr("resizable", "false"), 
                        n.width) {
                            var s = $.parser.parseValue("width", n.width, dc.view, opts.scrollbarSize);
                            q._outerWidth(s - 1), n.boxWidth = parseInt(q[0].style.width), n.deltaWidth = s - n.boxWidth;
                        } else n.auto = !0;
                        q.css("text-align", n.halign || n.align || ""), n.cellClass = state.cellClassPrefix + "-" + n.field.replace(/[\.|\s]/g, "-"), 
                        q.addClass(n.cellClass).css("width", "");
                    } else $('<div class="datagrid-cell-group"></div>').html(n.title).appendTo(p);
                    n.hidden && p.hide();
                }
                if (c && opts.rownumbers) {
                    var p = $('<td rowspan="' + opts.frozenColumns.length + '"><div class="datagrid-header-rownumber"></div></td>');
                    0 == $("tr", f).length ? p.wrap('<tr class="datagrid-header-row"></tr>').parent().appendTo($("tbody", f)) : p.prependTo($("tr:first", f));
                }
            }
        }
        function createColumnStyle() {
            for (var a = [], b = getColumnFields(target, !0).concat(getColumnFields(target)), c = 0; c < b.length; c++) {
                var d = getColumnOption(target, b[c]);
                d && !d.checkbox && a.push([ "." + d.cellClass, d.boxWidth ? d.boxWidth + "px" : "auto" ]);
            }
            state.ss.add(a), state.ss.dirty(state.cellSelectorPrefix), state.cellSelectorPrefix = "." + state.cellClassPrefix;
        }
        var state = $.data(target, "datagrid"), opts = state.options, dc = state.dc, panel = state.panel;
        if (state.ss = $(target).datagrid("createStyleSheet"), panel.panel($.extend({}, opts, {
            id: null,
            doSize: !1,
            onResize: function(a, b) {
                $.data(target, "datagrid") && (setBodySize(target), $(target).datagrid("fitColumns"), 
                opts.onResize.call(panel, a, b));
            },
            onExpand: function() {
                $.data(target, "datagrid") && ($(target).datagrid("fixRowHeight").datagrid("fitColumns"), 
                opts.onExpand.call(panel));
            }
        })), state.rowIdPrefix = "datagrid-row-r" + ++DATAGRID_SERNO, state.cellClassPrefix = "datagrid-cell-c" + DATAGRID_SERNO, 
        createColumnHeader(dc.header1, opts.frozenColumns, !0), createColumnHeader(dc.header2, opts.columns, !1), 
        createColumnStyle(), dc.header1.add(dc.header2).css("display", opts.showHeader ? "block" : "none"), 
        dc.footer1.add(dc.footer2).css("display", opts.showFooter ? "block" : "none"), opts.toolbar) if ($.isArray(opts.toolbar)) {
            $("div.datagrid-toolbar", panel).remove();
            for (var tb = $('<div class="datagrid-toolbar"><table cellspacing="0" cellpadding="0"><tr></tr></table></div>').prependTo(panel), tr = tb.find("tr"), i = 0; i < opts.toolbar.length; i++) {
                var btn = opts.toolbar[i];
                if ("-" == btn) $('<td><div class="datagrid-btn-separator"></div></td>').appendTo(tr); else {
                    var td = $("<td></td>").appendTo(tr), tool = $('<a href="javascript:void(0)"></a>').appendTo(td);
                    tool[0].onclick = eval(btn.handler || function() {}), tool.linkbutton($.extend({}, btn, {
                        plain: !0
                    }));
                }
            }
        } else $(opts.toolbar).addClass("datagrid-toolbar").prependTo(panel), $(opts.toolbar).show(); else $("div.datagrid-toolbar", panel).remove();
        if ($("div.datagrid-pager", panel).remove(), opts.pagination) {
            var pager = $('<div class="datagrid-pager"></div>');
            if ("bottom" == opts.pagePosition) pager.appendTo(panel); else if ("top" == opts.pagePosition) pager.addClass("datagrid-pager-top").prependTo(panel); else {
                var ptop = $('<div class="datagrid-pager datagrid-pager-top"></div>').prependTo(panel);
                pager.appendTo(panel), pager = pager.add(ptop);
            }
            pager.pagination({
                total: opts.pageNumber * opts.pageSize,
                pageNumber: opts.pageNumber,
                pageSize: opts.pageSize,
                pageList: opts.pageList,
                onSelectPage: function(a, b) {
                    opts.pageNumber = a || 1, opts.pageSize = b, pager.pagination("refresh", {
                        pageNumber: a,
                        pageSize: b
                    }), request(target);
                }
            }), opts.pageSize = pager.pagination("options").pageSize;
        }
    }
    function bindEvents(a) {
        var b = $.data(a, "datagrid"), c = b.panel, d = b.options, e = b.dc, f = e.header1.add(e.header2);
        f.find("input[type=checkbox]").unbind(".datagrid").bind("click.datagrid", function(b) {
            return d.singleSelect && d.selectOnCheck ? !1 : ($(this).is(":checked") ? checkAll(a) : uncheckAll(a), 
            void b.stopPropagation());
        });
        var g = f.find("div.datagrid-cell");
        g.closest("td").unbind(".datagrid").bind("mouseenter.datagrid", function() {
            b.resizing || $(this).addClass("datagrid-header-over");
        }).bind("mouseleave.datagrid", function() {
            $(this).removeClass("datagrid-header-over");
        }).bind("contextmenu.datagrid", function(b) {
            var c = $(this).attr("field");
            d.onHeaderContextMenu.call(a, b, c);
        }), g.unbind(".datagrid").bind("click.datagrid", function(b) {
            var c = $(this).offset().left + 5, d = $(this).offset().left + $(this)._outerWidth() - 5;
            b.pageX < d && b.pageX > c && sortGrid(a, $(this).parent().attr("field"));
        }).bind("dblclick.datagrid", function(b) {
            var c = $(this).offset().left + 5, e = $(this).offset().left + $(this)._outerWidth() - 5, f = "right" == d.resizeHandle ? b.pageX > e : "left" == d.resizeHandle ? b.pageX < c : b.pageX < c || b.pageX > e;
            if (f) {
                var g = $(this).parent().attr("field"), h = getColumnOption(a, g);
                if (0 == h.resizable) return;
                $(a).datagrid("autoSizeColumn", g), h.auto = !1;
            }
        });
        var h = "right" == d.resizeHandle ? "e" : "left" == d.resizeHandle ? "w" : "e,w";
        g.each(function() {
            $(this).resizable({
                handles: h,
                disabled: $(this).attr("resizable") ? "false" == $(this).attr("resizable") : !1,
                minWidth: 25,
                onStartResize: function(a) {
                    b.resizing = !0, f.css("cursor", $("body").css("cursor")), b.proxy || (b.proxy = $('<div class="datagrid-resize-proxy"></div>').appendTo(e.view)), 
                    b.proxy.css({
                        left: a.pageX - $(c).offset().left - 1,
                        display: "none"
                    }), setTimeout(function() {
                        b.proxy && b.proxy.show();
                    }, 500);
                },
                onResize: function(a) {
                    return b.proxy.css({
                        left: a.pageX - $(c).offset().left - 1,
                        display: "block"
                    }), !1;
                },
                onStopResize: function(c) {
                    f.css("cursor", ""), $(this).css("height", "");
                    var e = $(this).parent().attr("field"), g = getColumnOption(a, e);
                    g.width = $(this)._outerWidth(), g.boxWidth = g.width - g.deltaWidth, g.auto = void 0, 
                    $(this).css("width", ""), $(a).datagrid("fixColumnSize", e), b.proxy.remove(), b.proxy = null, 
                    $(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1") && setBodySize(a), 
                    $(a).datagrid("fitColumns"), d.onResizeColumn.call(a, e, g.width), setTimeout(function() {
                        b.resizing = !1;
                    }, 0);
                }
            });
        });
        var i = e.body1.add(e.body2);
        i.unbind();
        for (var j in d.rowEvents) i.bind(j, d.rowEvents[j]);
        e.body1.bind("mousewheel DOMMouseScroll", function(a) {
            var b = a.originalEvent || window.event, c = b.wheelDelta || -1 * b.detail, d = $(a.target).closest("div.datagrid-view").children(".datagrid-f"), e = d.data("datagrid").dc;
            e.body2.scrollTop(e.body2.scrollTop() - c);
        }), e.body2.bind("scroll", function() {
            var a = e.view1.children("div.datagrid-body");
            a.scrollTop($(this).scrollTop());
            var b = e.body1.children(":first"), c = e.body2.children(":first");
            if (b.length && c.length) {
                var d = b.offset().top, f = c.offset().top;
                d != f && a.scrollTop(a.scrollTop() + d - f);
            }
            e.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft()), 
            e.body2.children("table.datagrid-btable-frozen").css("left", -$(this)._scrollLeft());
        });
    }
    function hoverEventHandler(a) {
        return function(b) {
            var c = getClosestTr(b.target);
            if (c) {
                var d = getTableTarget(c);
                if (!$.data(d, "datagrid").resizing) {
                    var e = getTrIndex(c);
                    if (a) highlightRow(d, e); else {
                        var f = $.data(d, "datagrid").options;
                        f.finder.getTr(d, e).removeClass("datagrid-row-over");
                    }
                }
            }
        };
    }
    function clickEventHandler(a) {
        var b = getClosestTr(a.target);
        if (b) {
            var c = getTableTarget(b), d = $.data(c, "datagrid").options, e = getTrIndex(b), f = $(a.target);
            if (f.parent().hasClass("datagrid-cell-check")) d.singleSelect && d.selectOnCheck ? (f._propAttr("checked", !f.is(":checked")), 
            checkRow(c, e)) : f.is(":checked") ? (f._propAttr("checked", !1), checkRow(c, e)) : (f._propAttr("checked", !0), 
            uncheckRow(c, e)); else {
                var g = d.finder.getRow(c, e), h = f.closest("td[field]", b);
                if (h.length) {
                    var i = h.attr("field");
                    d.onClickCell.call(c, e, i, g[i]);
                }
                if (1 == d.singleSelect) selectRow(c, e); else if (d.ctrlSelect) if (a.ctrlKey) b.hasClass("datagrid-row-selected") ? unselectRow(c, e) : selectRow(c, e); else if (a.shiftKey) {
                    $(c).datagrid("clearSelections");
                    for (var j = Math.min(d.lastSelectedIndex || 0, e), k = Math.max(d.lastSelectedIndex || 0, e), l = j; k >= l; l++) selectRow(c, l);
                } else $(c).datagrid("clearSelections"), selectRow(c, e), d.lastSelectedIndex = e; else b.hasClass("datagrid-row-selected") ? unselectRow(c, e) : selectRow(c, e);
                d.onClickRow.apply(c, getArguments(c, [ e, g ]));
            }
        }
    }
    function dblclickEventHandler(a) {
        var b = getClosestTr(a.target);
        if (b) {
            var c = getTableTarget(b), d = $.data(c, "datagrid").options, e = getTrIndex(b), f = d.finder.getRow(c, e), g = $(a.target).closest("td[field]", b);
            if (g.length) {
                var h = g.attr("field");
                d.onDblClickCell.call(c, e, h, f[h]);
            }
            d.onDblClickRow.apply(c, getArguments(c, [ e, f ]));
        }
    }
    function contextmenuEventHandler(a) {
        var b = getClosestTr(a.target);
        if (b) {
            var c = getTableTarget(b), d = $.data(c, "datagrid").options, e = getTrIndex(b), f = d.finder.getRow(c, e);
            d.onRowContextMenu.call(c, a, e, f);
        } else {
            var g = getClosestTr(a.target, ".datagrid-body");
            if (g) {
                var c = getTableTarget(g), d = $.data(c, "datagrid").options;
                d.onRowContextMenu.call(c, a, -1, null);
            }
        }
    }
    function getTableTarget(a) {
        return $(a).closest("div.datagrid-view").children(".datagrid-f")[0];
    }
    function getClosestTr(a, b) {
        var c = $(a).closest(b || "tr.datagrid-row");
        return c.length && c.parent().length ? c : void 0;
    }
    function getTrIndex(a) {
        return a.attr("datagrid-row-index") ? parseInt(a.attr("datagrid-row-index")) : a.attr("node-id");
    }
    function sortGrid(a, b) {
        var c = $.data(a, "datagrid"), d = c.options;
        b = b || {};
        var e = {
            sortName: d.sortName,
            sortOrder: d.sortOrder
        };
        "object" == typeof b && $.extend(e, b);
        var f = [], g = [];
        if (e.sortName && (f = e.sortName.split(","), g = e.sortOrder.split(",")), "string" == typeof b) {
            var h = b, i = getColumnOption(a, h);
            if (!i.sortable || c.resizing) return;
            var j = i.order || "asc", k = indexOfArray(f, h);
            if (k >= 0) {
                var l = "asc" == g[k] ? "desc" : "asc";
                d.multiSort && l == j ? (f.splice(k, 1), g.splice(k, 1)) : g[k] = l;
            } else d.multiSort ? (f.push(h), g.push(j)) : (f = [ h ], g = [ j ]);
            e.sortName = f.join(","), e.sortOrder = g.join(",");
        }
        if (0 != d.onBeforeSortColumn.call(a, e.sortName, e.sortOrder)) {
            $.extend(d, e);
            var m = c.dc, n = m.header1.add(m.header2);
            n.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
            for (var o = 0; o < f.length; o++) {
                var i = getColumnOption(a, f[o]);
                n.find("div." + i.cellClass).addClass("datagrid-sort-" + g[o]);
            }
            d.remoteSort ? request(a) : loadData(a, $(a).datagrid("getData")), d.onSortColumn.call(a, d.sortName, d.sortOrder);
        }
    }
    function fitColumns(a) {
        function b() {
            if (g.fitColumns) {
                f.leftWidth || (f.leftWidth = 0);
                for (var b = 0, c = [], d = getColumnFields(a, !1), h = 0; h < d.length; h++) {
                    var j = getColumnOption(a, d[h]);
                    e(j) && (b += j.width, c.push({
                        field: j.field,
                        col: j,
                        addingWidth: 0
                    }));
                }
                if (b) {
                    c[c.length - 1].addingWidth -= f.leftWidth;
                    var k = i.children("div.datagrid-header-inner").show(), l = i.width() - i.find("table").width() - g.scrollbarSize + f.leftWidth, m = l / b;
                    g.showHeader || k.hide();
                    for (var h = 0; h < c.length; h++) {
                        var n = c[h], o = parseInt(n.col.width * m);
                        n.addingWidth += o, l -= o;
                    }
                    c[c.length - 1].addingWidth += l;
                    for (var h = 0; h < c.length; h++) {
                        var n = c[h];
                        n.col.boxWidth + n.addingWidth > 0 && (n.col.boxWidth += n.addingWidth, n.col.width += n.addingWidth);
                    }
                    f.leftWidth = l, $(a).datagrid("fixColumnSize");
                }
            }
        }
        function c() {
            var b = !1, c = getColumnFields(a, !0).concat(getColumnFields(a, !1));
            $.map(c, function(c) {
                if (c) {
                    var d = getColumnOption(a, c);
                    if (String(d.width || "").indexOf("%") >= 0) {
                        var e = $.parser.parseValue("width", d.width, h.view, g.scrollbarSize) - d.deltaWidth;
                        e > 0 && (d.boxWidth = e, b = !0);
                    }
                }
            }), b && $(a).datagrid("fixColumnSize");
        }
        function d(b) {
            var c = h.header1.add(h.header2).find(".datagrid-cell-group");
            c.length && (c.each(function() {
                $(this)._outerWidth(b ? $(this).parent().width() : 10);
            }), b && setBodySize(a));
        }
        function e(a) {
            return String(a.width || "").indexOf("%") >= 0 ? !1 : a.hidden || a.checkbox || a.auto || a.fixed ? void 0 : !0;
        }
        var f = $.data(a, "datagrid"), g = f.options, h = f.dc, i = h.view2.children("div.datagrid-header");
        h.body2.css("overflow-x", ""), d(), c(), b(), d(!0), i.width() >= i.find("table").width() && h.body2.css("overflow-x", "hidden");
    }
    function autoSizeColumn(a, b) {
        function c(b) {
            function c(c) {
                function f(a) {
                    return a.is(":visible") ? a._outerWidth() : g.html(a.html())._outerWidth();
                }
                var h = 0;
                return "header" == c ? h = f(d) : e.finder.getTr(a, 0, c).find('td[field="' + b + '"] div.datagrid-cell').each(function() {
                    var a = f($(this));
                    a > h && (h = a);
                }), h;
            }
            var d = f.view.find('div.datagrid-header td[field="' + b + '"] div.datagrid-cell');
            d.css("width", "");
            var h = $(a).datagrid("getColumnOption", b);
            h.width = void 0, h.boxWidth = void 0, h.auto = !0, $(a).datagrid("fixColumnSize", b);
            var i = Math.max(c("header"), c("allbody"), c("allfooter")) + 1;
            d._outerWidth(i - 1), h.width = i, h.boxWidth = parseInt(d[0].style.width), h.deltaWidth = i - h.boxWidth, 
            d.css("width", ""), $(a).datagrid("fixColumnSize", b), e.onResizeColumn.call(a, b, h.width);
        }
        var d = $.data(a, "datagrid"), e = d.options, f = d.dc, g = $('<div class="datagrid-cell" style="position:absolute;left:-9999px"></div>').appendTo("body");
        if (b) c(b), $(a).datagrid("fitColumns"); else {
            for (var h = !1, i = getColumnFields(a, !0).concat(getColumnFields(a, !1)), j = 0; j < i.length; j++) {
                var b = i[j], k = getColumnOption(a, b) || {};
                k.auto && (c(b), h = !0);
            }
            h && $(a).datagrid("fitColumns");
        }
        g.remove();
    }
    function fixColumnSize(a, b) {
        function c(b) {
            var c = getColumnOption(a, b);
            c.cellClass && d.ss.set("." + c.cellClass, c.boxWidth ? c.boxWidth + "px" : "auto");
        }
        var d = $.data(a, "datagrid"), e = (d.options, d.dc), f = e.view.find("table.datagrid-btable,table.datagrid-ftable");
        if (f.css("table-layout", "fixed"), b) c(b); else for (var g = getColumnFields(a, !0).concat(getColumnFields(a, !1)), h = 0; h < g.length; h++) c(g[h]);
        f.css("table-layout", ""), fixRowHeight(a), fixEditableSize(a);
    }
    function fixMergedSize(a) {
        var b = $.data(a, "datagrid").dc;
        b.view.find("td.datagrid-td-merged").each(function() {
            for (var b = $(this), c = b.attr("colspan") || 1, d = getColumnOption(a, b.attr("field")), e = d.boxWidth + d.deltaWidth - 1, f = 1; c > f; f++) b = b.next(), 
            d = getColumnOption(a, b.attr("field")), e += d.boxWidth + d.deltaWidth;
            $(this).children("div.datagrid-cell")._outerWidth(e);
        });
    }
    function fixEditableSize(a) {
        var b = $.data(a, "datagrid").dc;
        b.view.find("div.datagrid-editable").each(function() {
            var b = $(this), c = b.parent().attr("field"), d = $(a).datagrid("getColumnOption", c);
            b._outerWidth(d.boxWidth + d.deltaWidth - 1);
            var e = $.data(this, "datagrid.editor");
            e.actions.resize && e.actions.resize(e.target, b.width());
        });
    }
    function getColumnOption(a, b) {
        function c(a) {
            if (a) for (var c = 0; c < a.length; c++) for (var d = a[c], e = 0; e < d.length; e++) {
                var f = d[e];
                if (f.field == b) return f;
            }
            return null;
        }
        var d = $.data(a, "datagrid").options, e = c(d.columns);
        return e || (e = c(d.frozenColumns)), e;
    }
    function getColumnFields(a, b) {
        function c(a) {
            for (var b = 0, c = 0; ;) {
                if (void 0 == g[c]) {
                    if (b == a) return c;
                    b++;
                }
                c++;
            }
        }
        function d(a) {
            for (var b = [], d = 0, e = 0; e < f[a].length; e++) {
                var h = f[a][e];
                h.field && b.push([ d, h.field ]), d += parseInt(h.colspan || "1");
            }
            for (var e = 0; e < b.length; e++) b[e][0] = c(b[e][0]);
            for (var e = 0; e < b.length; e++) {
                var i = b[e];
                g[i[0]] = i[1];
            }
        }
        var e = $.data(a, "datagrid").options, f = 1 == b ? e.frozenColumns || [ [] ] : e.columns;
        if (0 == f.length) return [];
        for (var g = [], h = 0; h < f.length; h++) d(h);
        return g;
    }
    function loadData(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = c.dc;
        if (b = d.loadFilter.call(a, b), b.total = parseInt(b.total), c.data = b, b.footer && (c.footer = b.footer), 
        !d.remoteSort && d.sortName) {
            var f = d.sortName.split(","), g = d.sortOrder.split(",");
            b.rows.sort(function(b, c) {
                for (var d = 0, e = 0; e < f.length; e++) {
                    var h = f[e], i = g[e], j = getColumnOption(a, h), k = j.sorter || function(a, b) {
                        return a == b ? 0 : a > b ? 1 : -1;
                    };
                    if (d = k(b[h], c[h]) * ("asc" == i ? 1 : -1), 0 != d) return d;
                }
                return d;
            });
        }
        d.view.onBeforeRender && d.view.onBeforeRender.call(d.view, a, b.rows), d.view.render.call(d.view, a, e.body2, !1), 
        d.view.render.call(d.view, a, e.body1, !0), d.showFooter && (d.view.renderFooter.call(d.view, a, e.footer2, !1), 
        d.view.renderFooter.call(d.view, a, e.footer1, !0)), d.view.onAfterRender && d.view.onAfterRender.call(d.view, a), 
        c.ss.clean();
        var h = $(a).datagrid("getPager");
        if (h.length) {
            var i = h.pagination("options");
            i.total != b.total && (h.pagination("refresh", {
                total: b.total
            }), d.pageNumber != i.pageNumber && i.pageNumber > 0 && (d.pageNumber = i.pageNumber, 
            request(a)));
        }
        fixRowHeight(a), e.body2.triggerHandler("scroll"), $(a).datagrid("setSelectionState"), 
        $(a).datagrid("autoSizeColumn"), d.onLoadSuccess.call(a, b), setSize(a);
    }
    function setSelectionState(a) {
        function b(a, b) {
            for (var c = 0; c < a.length; c++) if (a[c][d.idField] == b[d.idField]) return a[c] = b, 
            !0;
            return !1;
        }
        var c = $.data(a, "datagrid"), d = c.options, e = c.dc;
        if (e.header1.add(e.header2).find("input[type=checkbox]")._propAttr("checked", !1), 
        d.idField) {
            var f = $.data(a, "treegrid") ? !0 : !1, g = d.onSelect, h = d.onCheck;
            d.onSelect = d.onCheck = function() {};
            for (var i = d.finder.getRows(a), j = 0; j < i.length; j++) {
                var k = i[j], l = f ? k[d.idField] : j;
                b(c.selectedRows, k) && selectRow(a, l, !0), b(c.checkedRows, k) && checkRow(a, l, !0);
            }
            d.onSelect = g, d.onCheck = h;
        }
    }
    function getRowIndex(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = c.data.rows;
        if ("object" == typeof b) return indexOfArray(e, b);
        for (var f = 0; f < e.length; f++) if (e[f][d.idField] == b) return f;
        return -1;
    }
    function getSelectedRows(a) {
        {
            var b = $.data(a, "datagrid"), c = b.options;
            b.data;
        }
        if (c.idField) return b.selectedRows;
        var d = [];
        return c.finder.getTr(a, "", "selected", 2).each(function() {
            d.push(c.finder.getRow(a, $(this)));
        }), d;
    }
    function getCheckedRows(a) {
        var b = $.data(a, "datagrid"), c = b.options;
        if (c.idField) return b.checkedRows;
        var d = [];
        return c.finder.getTr(a, "", "checked", 2).each(function() {
            d.push(c.finder.getRow(a, $(this)));
        }), d;
    }
    function scrollTo(a, b) {
        var c = $.data(a, "datagrid"), d = c.dc, e = c.options, f = e.finder.getTr(a, b);
        if (f.length) {
            if (f.closest("table").hasClass("datagrid-btable-frozen")) return;
            var g = d.view2.children("div.datagrid-header")._outerHeight(), h = d.body2, i = h.outerHeight(!0) - h.outerHeight(), j = f.position().top - g - i;
            0 > j ? h.scrollTop(h.scrollTop() + j) : j + f._outerHeight() > h.height() - 18 && h.scrollTop(h.scrollTop() + j + f._outerHeight() - h.height() + 18);
        }
    }
    function highlightRow(a, b) {
        var c = $.data(a, "datagrid"), d = c.options;
        d.finder.getTr(a, c.highlightIndex).removeClass("datagrid-row-over"), d.finder.getTr(a, b).addClass("datagrid-row-over"), 
        c.highlightIndex = b;
    }
    function selectRow(a, b, c) {
        var d = $.data(a, "datagrid"), e = d.options, f = e.finder.getRow(a, b);
        0 != e.onBeforeSelect.apply(a, getArguments(a, [ b, f ])) && (e.singleSelect && (unselectAll(a, !0), 
        d.selectedRows = []), !c && e.checkOnSelect && checkRow(a, b, !0), e.idField && addArrayItem(d.selectedRows, e.idField, f), 
        e.finder.getTr(a, b).addClass("datagrid-row-selected"), e.onSelect.apply(a, getArguments(a, [ b, f ])));
    }
    function unselectRow(a, b, c) {
        var d = $.data(a, "datagrid"), e = (d.dc, d.options), f = e.finder.getRow(a, b);
        0 != e.onBeforeUnselect.apply(a, getArguments(a, [ b, f ])) && (!c && e.checkOnSelect && uncheckRow(a, b, !0), 
        e.finder.getTr(a, b).removeClass("datagrid-row-selected"), e.idField && removeArrayItem(d.selectedRows, e.idField, f[e.idField]), 
        e.onUnselect.apply(a, getArguments(a, [ b, f ])));
    }
    function selectAll(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = d.finder.getRows(a), f = $.data(a, "datagrid").selectedRows;
        if (!b && d.checkOnSelect && checkAll(a, !0), d.finder.getTr(a, "", "allbody").addClass("datagrid-row-selected"), 
        d.idField) for (var g = 0; g < e.length; g++) addArrayItem(f, d.idField, e[g]);
        d.onSelectAll.call(a, e);
    }
    function unselectAll(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = d.finder.getRows(a), f = $.data(a, "datagrid").selectedRows;
        if (!b && d.checkOnSelect && uncheckAll(a, !0), d.finder.getTr(a, "", "selected").removeClass("datagrid-row-selected"), 
        d.idField) for (var g = 0; g < e.length; g++) removeArrayItem(f, d.idField, e[g][d.idField]);
        d.onUnselectAll.call(a, e);
    }
    function showCheckedNumber(a) {
        var b = $(a).parent().siblings(".datagrid-pager"), c = $(a).datagrid("getChecked"), d = c.length, e = "已选中" + d + "条记录", f = $('<div class="checked-numbers" style="float:right;height:30px;line-height:30px;margin-right:10px;"></div>');
        0 == $(".checked-numbers", b).length && b.find(".pagination-info").after(f), $(".checked-numbers", b).text(e);
    }
    function checkRow(a, b, c) {
        var d = $.data(a, "datagrid"), e = d.options, f = e.finder.getRow(a, b);
        if (0 != e.onBeforeCheck.apply(a, getArguments(a, [ b, f ]))) {
            e.singleSelect && e.selectOnCheck && (uncheckAll(a, !0), d.checkedRows = []), !c && e.selectOnCheck && selectRow(a, b, !0);
            var g = e.finder.getTr(a, b).addClass("datagrid-row-checked");
            if (g.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", !0), 
            g = e.finder.getTr(a, "", "checked", 2), g.length == e.finder.getRows(a).length) {
                var h = d.dc;
                h.header1.add(h.header2).find("input[type=checkbox]")._propAttr("checked", !0);
            }
            e.idField && addArrayItem(d.checkedRows, e.idField, f), e.checkedNumber && e.pagination && showCheckedNumber(a), 
            e.onCheck.apply(a, getArguments(a, [ b, f ]));
        }
    }
    function uncheckRow(a, b, c) {
        var d = $.data(a, "datagrid"), e = d.options, f = e.finder.getRow(a, b);
        if (0 != e.onBeforeUncheck.apply(a, getArguments(a, [ b, f ]))) {
            !c && e.selectOnCheck && unselectRow(a, b, !0);
            var g = e.finder.getTr(a, b).removeClass("datagrid-row-checked");
            g.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", !1);
            var h = d.dc, i = h.header1.add(h.header2);
            i.find("input[type=checkbox]")._propAttr("checked", !1), e.idField && removeArrayItem(d.checkedRows, e.idField, f[e.idField]), 
            e.checkedNumber && e.pagination && showCheckedNumber(a), e.onUncheck.apply(a, getArguments(a, [ b, f ]));
        }
    }
    function checkAll(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = d.finder.getRows(a);
        !b && d.selectOnCheck && selectAll(a, !0);
        var f = c.dc, g = f.header1.add(f.header2).find("input[type=checkbox]"), h = d.finder.getTr(a, "", "allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
        if (g.add(h)._propAttr("checked", !0), d.idField) for (var i = 0; i < e.length; i++) addArrayItem(c.checkedRows, d.idField, e[i]);
        d.checkedNumber && d.pagination && showCheckedNumber(a), d.onCheckAll.call(a, e);
    }
    function uncheckAll(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = d.finder.getRows(a);
        !b && d.selectOnCheck && unselectAll(a, !0);
        var f = c.dc, g = f.header1.add(f.header2).find("input[type=checkbox]"), h = d.finder.getTr(a, "", "checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
        if (g.add(h)._propAttr("checked", !1), d.idField) for (var i = 0; i < e.length; i++) removeArrayItem(c.checkedRows, d.idField, e[i][d.idField]);
        d.checkedNumber && d.pagination && showCheckedNumber(a), d.onUncheckAll.call(a, e);
    }
    function beginEdit(a, b) {
        var c = $.data(a, "datagrid").options, d = c.finder.getTr(a, b), e = c.finder.getRow(a, b);
        d.hasClass("datagrid-row-editing") || 0 != c.onBeforeEdit.apply(a, getArguments(a, [ b, e ])) && (d.addClass("datagrid-row-editing"), 
        createEditor(a, b), fixEditableSize(a), d.find("div.datagrid-editable").each(function() {
            var a = $(this).parent().attr("field"), b = $.data(this, "datagrid.editor");
            b.actions.setValue(b.target, e[a]);
        }), validateRow(a, b), c.onBeginEdit.apply(a, getArguments(a, [ b, e ])));
    }
    function endEdit(a, b, c) {
        var d = $.data(a, "datagrid"), e = d.options, f = d.updatedRows, g = d.insertedRows, h = e.finder.getTr(a, b), i = e.finder.getRow(a, b);
        if (h.hasClass("datagrid-row-editing")) {
            if (!c) {
                if (!validateRow(a, b)) return;
                var j = !1, k = {};
                h.find("div.datagrid-editable").each(function() {
                    var a = $(this).parent().attr("field"), b = $.data(this, "datagrid.editor"), c = $(b.target), d = c.data("textbox") ? c.textbox("textbox") : c;
                    d.triggerHandler("blur");
                    var e = b.actions.getValue(b.target);
                    i[a] != e && (i[a] = e, j = !0, k[a] = e);
                }), j && -1 == indexOfArray(g, i) && -1 == indexOfArray(f, i) && f.push(i), e.onEndEdit.apply(a, getArguments(a, [ b, i, k ]));
            }
            h.removeClass("datagrid-row-editing"), destroyEditor(a, b), $(a).datagrid("refreshRow", b), 
            c ? e.onCancelEdit.apply(a, getArguments(a, [ b, i ])) : e.onAfterEdit.apply(a, getArguments(a, [ b, i, k ]));
        }
    }
    function getEditors(a, b) {
        var c = $.data(a, "datagrid").options, d = c.finder.getTr(a, b), e = [];
        return d.children("td").each(function() {
            var a = $(this).find("div.datagrid-editable");
            if (a.length) {
                var b = $.data(a[0], "datagrid.editor");
                e.push(b);
            }
        }), e;
    }
    function getEditor(a, b) {
        for (var c = getEditors(a, void 0 != b.index ? b.index : b.id), d = 0; d < c.length; d++) if (c[d].field == b.field) return c[d];
        return null;
    }
    function createEditor(a, b) {
        var c = $.data(a, "datagrid").options, d = c.finder.getTr(a, b);
        d.children("td").each(function() {
            var b = $(this).find("div.datagrid-cell"), d = $(this).attr("field"), e = getColumnOption(a, d);
            if (e && e.editor) {
                var f, g;
                "string" == typeof e.editor ? f = e.editor : (f = e.editor.type, g = e.editor.options);
                var h = c.editors[f];
                if (h) {
                    var i = b.html(), j = b._outerWidth();
                    b.addClass("datagrid-editable"), b._outerWidth(j), b.html('<table border="0" cellspacing="0" cellpadding="1"><tr><td></td></tr></table>'), 
                    b.children("table").bind("click dblclick contextmenu", function(a) {
                        a.stopPropagation();
                    }), $.data(b[0], "datagrid.editor", {
                        actions: h,
                        target: h.init(b.find("td"), g),
                        field: d,
                        type: f,
                        oldHtml: i
                    });
                }
            }
        }), fixRowHeight(a, b, !0);
    }
    function destroyEditor(a, b) {
        var c = $.data(a, "datagrid").options, d = c.finder.getTr(a, b);
        d.children("td").each(function() {
            var a = $(this).find("div.datagrid-editable");
            if (a.length) {
                var b = $.data(a[0], "datagrid.editor");
                b.actions.destroy && b.actions.destroy(b.target), a.html(b.oldHtml), $.removeData(a[0], "datagrid.editor"), 
                a.removeClass("datagrid-editable"), a.css("width", "");
            }
        });
    }
    function validateRow(a, b) {
        var c = $.data(a, "datagrid").options.finder.getTr(a, b);
        if (!c.hasClass("datagrid-row-editing")) return !0;
        var d = c.find(".validatebox-text");
        d.validatebox("validate"), d.trigger("mouseleave");
        var e = c.find(".validatebox-invalid");
        return 0 == e.length;
    }
    function getChanges(a, b) {
        var c = $.data(a, "datagrid").insertedRows, d = $.data(a, "datagrid").deletedRows, e = $.data(a, "datagrid").updatedRows;
        if (!b) {
            var f = [];
            return f = f.concat(c), f = f.concat(d), f = f.concat(e);
        }
        return "inserted" == b ? c : "deleted" == b ? d : "updated" == b ? e : [];
    }
    function deleteRow(a, b) {
        var c = $.data(a, "datagrid"), d = c.options, e = c.data, f = c.insertedRows, g = c.deletedRows;
        $(a).datagrid("cancelEdit", b);
        var h = d.finder.getRow(a, b);
        indexOfArray(f, h) >= 0 ? removeArrayItem(f, h) : g.push(h), removeArrayItem(c.selectedRows, d.idField, h[d.idField]), 
        removeArrayItem(c.checkedRows, d.idField, h[d.idField]), d.view.deleteRow.call(d.view, a, b), 
        "auto" == d.height && fixRowHeight(a), $(a).datagrid("getPager").pagination("refresh", {
            total: e.total
        });
    }
    function insertRow(a, b) {
        var c = $.data(a, "datagrid").data, d = $.data(a, "datagrid").options.view, e = $.data(a, "datagrid").insertedRows;
        d.insertRow.call(d, a, b.index, b.row), e.push(b.row), $(a).datagrid("getPager").pagination("refresh", {
            total: c.total
        });
    }
    function appendRow(a, b) {
        var c = $.data(a, "datagrid").data, d = $.data(a, "datagrid").options.view, e = $.data(a, "datagrid").insertedRows;
        d.insertRow.call(d, a, null, b), e.push(b), $(a).datagrid("getPager").pagination("refresh", {
            total: c.total
        });
    }
    function initChanges(a) {
        for (var b = $.data(a, "datagrid"), c = b.data, d = c.rows, e = [], f = 0; f < d.length; f++) e.push($.extend({}, d[f]));
        b.originalRows = e, b.updatedRows = [], b.insertedRows = [], b.deletedRows = [];
    }
    function acceptChanges(a) {
        for (var b = $.data(a, "datagrid").data, c = !0, d = 0, e = b.rows.length; e > d; d++) validateRow(a, d) ? $(a).datagrid("endEdit", d) : c = !1;
        c && initChanges(a);
    }
    function rejectChanges(a) {
        function b(a) {
            for (var b = [], c = 0; c < a.length; c++) b.push(a[c][e.idField]);
            return b;
        }
        function c(b, c) {
            for (var d = 0; d < b.length; d++) {
                var e = getRowIndex(a, b[d]);
                e >= 0 && ("s" == c ? selectRow : checkRow)(a, e, !0);
            }
        }
        for (var d = $.data(a, "datagrid"), e = d.options, f = d.originalRows, g = d.insertedRows, h = d.deletedRows, i = d.selectedRows, j = d.checkedRows, k = d.data, l = 0; l < k.rows.length; l++) $(a).datagrid("cancelEdit", l);
        var m = b(i), n = b(j);
        i.splice(0, i.length), j.splice(0, j.length), k.total += h.length - g.length, k.rows = f, 
        loadData(a, k), c(m, "s"), c(n, "c"), initChanges(a);
    }
    function request(a, b) {
        var c = $.data(a, "datagrid").options;
        b && (c.queryParams = b);
        var d = $.extend({}, c.queryParams);
        if (c.pagination && $.extend(d, {
            page: c.pageNumber || 1,
            rows: c.pageSize
        }), c.sortName && $.extend(d, {
            sort: c.sortName,
            order: c.sortOrder
        }), 0 != c.onBeforeLoad.call(a, d)) {
            c.data = null, $(a).datagrid("loading");
            var e = c.loader.call(a, d, function(b) {
                c.data = b, $.isEmptyObject(b) ? c.data = null : $(a).datagrid("loadData", b), $(a).datagrid("loaded");
            }, function() {
                $(a).datagrid("loaded"), c.onLoadError.apply(a, arguments);
            });
            0 == e && $(a).datagrid("loaded");
        }
    }
    function mergeCells(a, b) {
        function c(a, b) {
            for (var c = 0; b > c; c++) a.hide(), a = a.next();
        }
        var d = $.data(a, "datagrid").options;
        if (b.type = b.type || "body", b.rowspan = b.rowspan || 1, b.colspan = b.colspan || 1, 
        1 != b.rowspan || 1 != b.colspan) {
            var e = d.finder.getTr(a, void 0 != b.index ? b.index : b.id, b.type);
            if (e.length) {
                var f = e.find('td[field="' + b.field + '"]');
                f.attr("rowspan", b.rowspan).attr("colspan", b.colspan), f.addClass("datagrid-td-merged"), 
                c(f.next(), b.colspan - 1);
                for (var g = 1; g < b.rowspan && (e = e.next(), e.length); g++) f = e.find('td[field="' + b.field + '"]'), 
                c(f, b.colspan);
            }
        }
    }
    function getDefaultEditors(a) {
        function b(a) {
            function b(b) {
                return void 0 != $.data($(b)[0], a);
            }
            return {
                init: function(b, c) {
                    var d = $('<input type="text" class="datagrid-editable-input">').appendTo(b);
                    return c = c || {}, d.attr("disabled", c.disabled || !1), d[a] && "text" != a ? d[a](c) : d;
                },
                destroy: function(c) {
                    b(c, a) && $(c)[a]("destroy");
                },
                getValue: function(c) {
                    if (b(c, a)) {
                        var d = $(c)[a]("options");
                        return d.multiple ? $(c)[a]("getValues").join(d.separator) : $(c)[a]("getValue");
                    }
                    return $(c).val();
                },
                setValue: function(c, d) {
                    if (b(c, a)) {
                        var e = $(c)[a]("options");
                        e.multiple ? d ? $(c)[a]("setValues", d.split(e.separator)) : $(c)[a]("clear") : $(c)[a]("setValue", d);
                    } else $(c).val(d);
                },
                resize: function(c, d) {
                    b(c, a) ? $(c)[a]("resize", d) : $(c)._outerWidth(d)._outerHeight(22);
                }
            };
        }
        var c = {};
        return $.map(a, function(a) {
            c[a] = b(a);
        }), c;
    }
    var DATAGRID_SERNO = 0;
    $.fn.datagrid = function(a, b) {
        return "string" == typeof a ? $.fn.datagrid.methods[a](this, b) : (a = a || {}, 
        this.each(function() {
            var b, c = $.data(this, "datagrid");
            if (c) b = $.extend(c.options, a), c.options = b; else {
                b = $.extend({}, $.extend({}, $.fn.datagrid.defaults, {
                    queryParams: {}
                }), $.fn.datagrid.parseOptions(this), a), $(this).css("width", "").css("height", "");
                var d = wrapGrid(this, b.rownumbers);
                b.columns || (b.columns = d.columns), b.frozenColumns || (b.frozenColumns = d.frozenColumns), 
                b.columns = $.extend(!0, [], b.columns), b.frozenColumns = $.extend(!0, [], b.frozenColumns), 
                b.view = $.extend({}, b.view), $.data(this, "datagrid", {
                    options: b,
                    panel: d.panel,
                    dc: d.dc,
                    ss: null,
                    selectedRows: [],
                    checkedRows: [],
                    data: {
                        total: 0,
                        rows: []
                    },
                    originalRows: [],
                    updatedRows: [],
                    insertedRows: [],
                    deletedRows: []
                });
            }
            buildGrid(this), bindEvents(this);
            var e;
            if (b.data && b.data.rows) e = b.data; else if (b.data && b.data.length > 0) {
                var f = {};
                f.total = b.data.length, f.rows = b.data, e = b.data = f;
            } else e = $.fn.datagrid.parseData(this);
            e.total > 0 ? $(this).datagrid("loadData", e) : (b.view.renderEmptyRow(this), $(this).datagrid("autoSizeColumn")), 
            b.url && request(this), setSize(this);
        }));
    };
    var editors = $.extend({}, getDefaultEditors([ "text", "textbox", "numberbox", "numberspinner", "combobox", "combotree", "combogrid", "datebox", "datetimebox", "timespinner", "datetimespinner" ]), {
        textarea: {
            init: function(a, b) {
                var c = $('<textarea class="datagrid-editable-input"></textarea>').appendTo(a);
                return c;
            },
            getValue: function(a) {
                return $(a).val();
            },
            setValue: function(a, b) {
                $(a).val(b);
            },
            resize: function(a, b) {
                $(a)._outerWidth(b);
            }
        },
        checkbox: {
            init: function(a, b) {
                var c = $('<input type="checkbox">').appendTo(a);
                return c.val(b.on), c.attr("offval", b.off), c;
            },
            getValue: function(a) {
                return $(a).is(":checked") ? $(a).val() : $(a).attr("offval");
            },
            setValue: function(a, b) {
                var c = !1;
                $(a).val() == b && (c = !0), $(a)._propAttr("checked", c);
            }
        },
        validatebox: {
            init: function(a, b) {
                var c = $('<input type="text" class="datagrid-editable-input">').appendTo(a);
                return c.validatebox(b), c;
            },
            destroy: function(a) {
                $(a).validatebox("destroy");
            },
            getValue: function(a) {
                return $(a).val();
            },
            setValue: function(a, b) {
                $(a).val(b);
            },
            resize: function(a, b) {
                $(a)._outerWidth(b)._outerHeight(22);
            }
        }
    });
    $.fn.datagrid.methods = {
        options: function(a) {
            var b = $.data(a[0], "datagrid").options, c = $.data(a[0], "datagrid").panel.panel("options"), d = $.extend(b, {
                width: c.width,
                height: c.height,
                closed: c.closed,
                collapsed: c.collapsed,
                minimized: c.minimized,
                maximized: c.maximized
            });
            return d;
        },
        setSelectionState: function(a) {
            return a.each(function() {
                setSelectionState(this);
            });
        },
        createStyleSheet: function(a) {
            return createStyleSheet(a[0]);
        },
        getPanel: function(a) {
            return $.data(a[0], "datagrid").panel;
        },
        getPager: function(a) {
            return $.data(a[0], "datagrid").panel.children("div.datagrid-pager");
        },
        getColumnFields: function(a, b) {
            return getColumnFields(a[0], b);
        },
        getColumnOption: function(a, b) {
            return getColumnOption(a[0], b);
        },
        resize: function(a, b) {
            return a.each(function() {
                setSize(this, b);
            });
        },
        load: function(a, b) {
            return a.each(function() {
                var a = $(this).datagrid("options");
                "string" == typeof b && (a.url = b, b = null), a.pageNumber = 1;
                var c = $(this).datagrid("getPager");
                c.pagination("refresh", {
                    pageNumber: 1
                }), request(this, b);
            });
        },
        reload: function(a, b) {
            return a.each(function() {
                var a = $(this).datagrid("options");
                "string" == typeof b && (a.url = b, b = null), request(this, b);
            });
        },
        reloadFooter: function(a, b) {
            return a.each(function() {
                var a = $.data(this, "datagrid").options, c = $.data(this, "datagrid").dc;
                b && ($.data(this, "datagrid").footer = b), a.showFooter && (a.view.renderFooter.call(a.view, this, c.footer2, !1), 
                a.view.renderFooter.call(a.view, this, c.footer1, !0), a.view.onAfterRender && a.view.onAfterRender.call(a.view, this), 
                $(this).datagrid("fixRowHeight"));
            });
        },
        loading: function(a) {
            return a.each(function() {
                var a = $.data(this, "datagrid").options;
                if ($(this).datagrid("getPager").pagination("loading"), a.loadMsg) {
                    var b = $(this).datagrid("getPanel");
                    if (!b.children("div.datagrid-mask").length) {
                        $('<div class="datagrid-mask" style="display:block"></div>').appendTo(b);
                        var c = $('<div class="datagrid-mask-msg" style="display:block;left:50%"></div>').html(a.loadMsg).appendTo(b);
                        c._outerHeight(40), c.css({
                            marginLeft: -c.outerWidth() / 2,
                            lineHeight: c.height() + "px"
                        });
                    }
                }
            });
        },
        loaded: function(a) {
            return a.each(function() {
                $(this).datagrid("getPager").pagination("loaded");
                var a = $(this).datagrid("getPanel");
                a.children("div.datagrid-mask-msg").remove(), a.children("div.datagrid-mask").remove();
                var b = $(this).datagrid("options");
                if (!b.data && $(this).datagrid("getRows").length <= 0) {
                    var c = $(this).siblings(".datagrid-empty-msg");
                    "" != b.emptyMsg && 0 == c.length && $(this).before('<div class="datagrid-empty-msg">' + b.emptyMsg + "</div>");
                } else $(".datagrid-empty-msg", a).remove();
            });
        },
        fitColumns: function(a) {
            return a.each(function() {
                fitColumns(this);
            });
        },
        fixColumnSize: function(a, b) {
            return a.each(function() {
                fixColumnSize(this, b);
            });
        },
        fixRowHeight: function(a, b) {
            return a.each(function() {
                fixRowHeight(this, b);
            });
        },
        freezeRow: function(a, b) {
            return a.each(function() {
                freezeRow(this, b);
            });
        },
        autoSizeColumn: function(a, b) {
            return a.each(function() {
                autoSizeColumn(this, b);
            });
        },
        loadData: function(a, b) {
            return a.each(function() {
                loadData(this, b), initChanges(this);
            });
        },
        getData: function(a) {
            return $.data(a[0], "datagrid").data;
        },
        getRows: function(a) {
            return $.data(a[0], "datagrid").data.rows;
        },
        getFooterRows: function(a) {
            return $.data(a[0], "datagrid").footer;
        },
        getRowIndex: function(a, b) {
            return getRowIndex(a[0], b);
        },
        getChecked: function(a) {
            return getCheckedRows(a[0]);
        },
        getSelected: function(a) {
            var b = getSelectedRows(a[0]);
            return b.length > 0 ? b[0] : null;
        },
        getSelections: function(a) {
            return getSelectedRows(a[0]);
        },
        clearSelections: function(a) {
            return a.each(function() {
                var a = $.data(this, "datagrid"), b = a.selectedRows, c = a.checkedRows;
                b.splice(0, b.length), unselectAll(this), a.options.checkOnSelect && c.splice(0, c.length);
            });
        },
        clearChecked: function(a) {
            return a.each(function() {
                var a = $.data(this, "datagrid"), b = a.selectedRows, c = a.checkedRows;
                c.splice(0, c.length), uncheckAll(this), a.options.selectOnCheck && b.splice(0, b.length);
            });
        },
        scrollTo: function(a, b) {
            return a.each(function() {
                scrollTo(this, b);
            });
        },
        highlightRow: function(a, b) {
            return a.each(function() {
                highlightRow(this, b), scrollTo(this, b);
            });
        },
        selectAll: function(a) {
            return a.each(function() {
                selectAll(this);
            });
        },
        unselectAll: function(a) {
            return a.each(function() {
                unselectAll(this);
            });
        },
        selectRow: function(a, b) {
            return a.each(function() {
                selectRow(this, b);
            });
        },
        selectRecord: function(a, b) {
            return a.each(function() {
                var a = $.data(this, "datagrid").options;
                if (a.idField) {
                    var c = getRowIndex(this, b);
                    c >= 0 && $(this).datagrid("selectRow", c);
                }
            });
        },
        unselectRow: function(a, b) {
            return a.each(function() {
                unselectRow(this, b);
            });
        },
        checkRow: function(a, b) {
            return a.each(function() {
                checkRow(this, b);
            });
        },
        uncheckRow: function(a, b) {
            return a.each(function() {
                uncheckRow(this, b);
            });
        },
        checkAll: function(a) {
            return a.each(function() {
                checkAll(this);
            });
        },
        uncheckAll: function(a) {
            return a.each(function() {
                uncheckAll(this);
            });
        },
        beginEdit: function(a, b) {
            return a.each(function() {
                beginEdit(this, b);
            });
        },
        endEdit: function(a, b) {
            return a.each(function() {
                endEdit(this, b, !1);
            });
        },
        cancelEdit: function(a, b) {
            return a.each(function() {
                endEdit(this, b, !0);
            });
        },
        getEditors: function(a, b) {
            return getEditors(a[0], b);
        },
        getEditor: function(a, b) {
            return getEditor(a[0], b);
        },
        refreshRow: function(a, b) {
            return a.each(function() {
                var a = $.data(this, "datagrid").options;
                a.view.refreshRow.call(a.view, this, b);
            });
        },
        validateRow: function(a, b) {
            return validateRow(a[0], b);
        },
        updateRow: function(a, b) {
            return a.each(function() {
                var a = $.data(this, "datagrid").options;
                a.view.updateRow.call(a.view, this, b.index, b.row);
            });
        },
        appendRow: function(a, b) {
            return a.each(function() {
                appendRow(this, b);
            });
        },
        insertRow: function(a, b) {
            return a.each(function() {
                insertRow(this, b);
            });
        },
        deleteRow: function(a, b) {
            return a.each(function() {
                deleteRow(this, b);
            });
        },
        getChanges: function(a, b) {
            return getChanges(a[0], b);
        },
        acceptChanges: function(a) {
            return a.each(function() {
                acceptChanges(this);
            });
        },
        rejectChanges: function(a) {
            return a.each(function() {
                rejectChanges(this);
            });
        },
        mergeCells: function(a, b) {
            return a.each(function() {
                mergeCells(this, b);
            });
        },
        showColumn: function(a, b) {
            return a.each(function() {
                var a = $(this).datagrid("getPanel");
                a.find('td[field="' + b + '"]').show(), $(this).datagrid("getColumnOption", b).hidden = !1, 
                $(this).datagrid("fitColumns");
            });
        },
        hideColumn: function(a, b) {
            return a.each(function() {
                var a = $(this).datagrid("getPanel");
                a.find('td[field="' + b + '"]').hide(), $(this).datagrid("getColumnOption", b).hidden = !0, 
                $(this).datagrid("fitColumns");
            });
        },
        sort: function(a, b) {
            return a.each(function() {
                sortGrid(this, b);
            });
        }
    }, $.fn.datagrid.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.fn.panel.parseOptions(target), $.parser.parseOptions(target, [ "url", "toolbar", "idField", "sortName", "sortOrder", "pagePosition", "resizeHandle", {
            sharedStyleSheet: "boolean",
            fitColumns: "boolean",
            autoRowHeight: "boolean",
            striped: "boolean",
            nowrap: "boolean"
        }, {
            rownumbers: "boolean",
            singleSelect: "boolean",
            ctrlSelect: "boolean",
            checkOnSelect: "boolean",
            selectOnCheck: "boolean"
        }, {
            pagination: "boolean",
            pageSize: "number",
            pageNumber: "number"
        }, {
            multiSort: "boolean",
            remoteSort: "boolean",
            showHeader: "boolean",
            showFooter: "boolean"
        }, {
            scrollbarSize: "number"
        } ]), {
            pageList: t.attr("pageList") ? eval(t.attr("pageList")) : void 0,
            loadMsg: void 0 != t.attr("loadMsg") ? t.attr("loadMsg") : void 0,
            rowStyler: t.attr("rowStyler") ? eval(t.attr("rowStyler")) : void 0
        });
    }, $.fn.datagrid.parseData = function(a) {
        var b = $(a), c = {
            total: 0,
            rows: []
        }, d = b.datagrid("getColumnFields", !0).concat(b.datagrid("getColumnFields", !1));
        return b.find("tbody tr").each(function() {
            c.total++;
            var a = {};
            $.extend(a, $.parser.parseOptions(this, [ "iconCls", "state" ]));
            for (var b = 0; b < d.length; b++) a[d[b]] = $(this).find("td:eq(" + b + ")").html();
            c.rows.push(a);
        }), c;
    };
    var defaultView = {
        render: function(a, b, c) {
            var d = $(a).datagrid("getRows");
            $(b)[0].innerHTML = this.renderTable(a, 0, d, c);
        },
        renderFooter: function(a, b, c) {
            for (var d = ($.data(a, "datagrid").options, $.data(a, "datagrid").footer || []), e = $(a).datagrid("getColumnFields", c), f = [ '<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>' ], g = 0; g < d.length; g++) f.push('<tr class="datagrid-row" datagrid-row-index="' + g + '">'), 
            f.push(this.renderRow.call(this, a, e, c, g, d[g])), f.push("</tr>");
            f.push("</tbody></table>"), $(b).html(f.join(""));
        },
        renderTable: function(a, b, c, d) {
            var e = $.data(a, "datagrid"), f = e.options;
            if (d && !(f.rownumbers || f.frozenColumns && f.frozenColumns.length)) return "";
            for (var g = $(a).datagrid("getColumnFields", d), h = [ '<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' ], i = 0; i < c.length; i++) {
                var j = c[i], k = f.rowStyler ? f.rowStyler.call(a, b, j) : "", l = "", m = "";
                "string" == typeof k ? m = k : k && (l = k["class"] || "", m = k.style || "");
                var n = 'class="datagrid-row ' + (b % 2 && f.striped ? "datagrid-row-alt " : " ") + l + '"', o = m ? 'style="' + m + '"' : "", p = e.rowIdPrefix + "-" + (d ? 1 : 2) + "-" + b;
                h.push('<tr id="' + p + '" datagrid-row-index="' + b + '" ' + n + " " + o + ">"), 
                h.push(this.renderRow.call(this, a, g, d, b, j)), h.push("</tr>"), b++;
            }
            return h.push("</tbody></table>"), h.join("");
        },
        renderRow: function(a, b, c, d, e) {
            var f = $.data(a, "datagrid").options, g = [];
            if (c && f.rownumbers) {
                var h = d + 1;
                f.pagination && (h += (f.pageNumber - 1) * f.pageSize), g.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">' + h + "</div></td>");
            }
            for (var i = 0; i < b.length; i++) {
                var j = b[i], k = $(a).datagrid("getColumnOption", j);
                if (k) {
                    var l = (j || "").split(/\./g), m = e[l[0]];
                    l[1] && (m = m[l[1]]);
                    var n = k.styler ? k.styler(m, e, d) || "" : "", o = "", p = "";
                    "string" == typeof n ? p = n : n && (o = n["class"] || "", p = n.style || "");
                    var q = o ? 'class="' + o + '"' : "", r = k.hidden ? 'style="display:none;' + p + '"' : p ? 'style="' + p + '"' : "";
                    g.push('<td field="' + j + '" ' + q + " " + r + ">");
                    var r = "";
                    k.checkbox || (k.align && (r += "text-align:" + k.align + ";"), f.nowrap ? f.autoRowHeight && (r += "height:auto;") : r += "white-space:normal;height:auto;"), 
                    g.push('<div style="' + r + '" '), g.push(k.checkbox ? 'class="datagrid-cell-check"' : 'class="datagrid-cell ' + k.cellClass + '"'), 
                    g.push(">"), k.checkbox ? (g.push('<input type="checkbox" ' + (e.checked ? 'checked="checked"' : "")), 
                    g.push(' name="' + j + '" value="' + (void 0 != m ? m : "") + '">')) : g.push(k.formatter ? k.formatter(m, e, d) : m), 
                    g.push("</div>"), g.push("</td>");
                }
            }
            return g.join("");
        },
        refreshRow: function(a, b) {
            this.updateRow.call(this, a, b, {});
        },
        updateRow: function(a, b, c) {
            function d(b) {
                var c = f.rowStyler ? f.rowStyler.call(a, b, g[b]) : "", d = "", e = "";
                return "string" == typeof c ? e = c : c && (d = c["class"] || "", e = c.style || ""), 
                {
                    c: d,
                    s: e
                };
            }
            function e(c) {
                var d = $(a).datagrid("getColumnFields", c), e = f.finder.getTr(a, b, "body", c ? 1 : 2), h = e.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                e.html(this.renderRow.call(this, a, d, c, b, g[b])), e.attr("style", k).removeClass(j).addClass(l), 
                h && e.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", !0);
            }
            var f = $.data(a, "datagrid").options, g = $(a).datagrid("getRows"), h = d(b);
            $.extend(g[b], c);
            var i = d(b), j = h.c, k = i.s, l = "datagrid-row " + (b % 2 && f.striped ? "datagrid-row-alt " : " ") + i.c;
            e.call(this, !0), e.call(this, !1), $(a).datagrid("fixRowHeight", b);
        },
        insertRow: function(a, b, c) {
            function d(c) {
                for (var d = c ? 1 : 2, e = i.rows.length - 1; e >= b; e--) {
                    var h = g.finder.getTr(a, e, "body", d);
                    if (h.attr("datagrid-row-index", e + 1), h.attr("id", f.rowIdPrefix + "-" + d + "-" + (e + 1)), 
                    c && g.rownumbers) {
                        var j = e + 2;
                        g.pagination && (j += (g.pageNumber - 1) * g.pageSize), h.find("div.datagrid-cell-rownumber").html(j);
                    }
                    g.striped && h.removeClass("datagrid-row-alt").addClass((e + 1) % 2 ? "datagrid-row-alt" : "");
                }
            }
            function e(c) {
                var d = c ? 1 : 2, e = ($(a).datagrid("getColumnFields", c), f.rowIdPrefix + "-" + d + "-" + b), j = '<tr id="' + e + '" class="datagrid-row" datagrid-row-index="' + b + '"></tr>';
                if (b >= i.rows.length) if (i.rows.length) g.finder.getTr(a, "", "last", d).after(j); else {
                    var k = c ? h.body1 : h.body2;
                    k.html('<table cellspacing="0" cellpadding="0" border="0"><tbody>' + j + "</tbody></table>");
                } else g.finder.getTr(a, b + 1, "body", d).before(j);
            }
            var f = $.data(a, "datagrid"), g = f.options, h = f.dc, i = f.data;
            (void 0 == b || null == b) && (b = i.rows.length), b > i.rows.length && (b = i.rows.length), 
            d.call(this, !0), d.call(this, !1), e.call(this, !0), e.call(this, !1), i.total += 1, 
            i.rows.splice(b, 0, c), this.refreshRow.call(this, a, b);
        },
        deleteRow: function(a, b) {
            function c(c) {
                for (var g = c ? 1 : 2, h = b + 1; h < f.rows.length; h++) {
                    var i = e.finder.getTr(a, h, "body", g);
                    if (i.attr("datagrid-row-index", h - 1), i.attr("id", d.rowIdPrefix + "-" + g + "-" + (h - 1)), 
                    c && e.rownumbers) {
                        var j = h;
                        e.pagination && (j += (e.pageNumber - 1) * e.pageSize), i.find("div.datagrid-cell-rownumber").html(j);
                    }
                    e.striped && i.removeClass("datagrid-row-alt").addClass((h - 1) % 2 ? "datagrid-row-alt" : "");
                }
            }
            var d = $.data(a, "datagrid"), e = d.options, f = d.data;
            e.finder.getTr(a, b).remove(), c.call(this, !0), c.call(this, !1), f.total -= 1, 
            f.rows.splice(b, 1);
        },
        onBeforeRender: function(a, b) {},
        onAfterRender: function(a) {
            var b = $.data(a, "datagrid"), c = b.options;
            if (c.showFooter) {
                var d = $(a).datagrid("getPanel").find("div.datagrid-footer");
                d.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility", "hidden");
            }
            0 == c.finder.getRows(a).length && this.renderEmptyRow(a);
        },
        renderEmptyRow: function(a) {
            var b = $.map($(a).datagrid("getColumnFields"), function(b) {
                return $(a).datagrid("getColumnOption", b);
            });
            $.map(b, function(a) {
                a.formatter1 = a.formatter, a.styler1 = a.styler, a.formatter = a.styler = void 0;
            });
            var c = $.data(a, "datagrid").dc.body2;
            c.html(this.renderTable(a, 0, [ {} ], !1)), c.find("tbody *").css({
                height: 1,
                borderColor: "transparent",
                background: "transparent"
            });
            var d = c.find(".datagrid-row");
            d.removeClass("datagrid-row").removeAttr("datagrid-row-index"), d.find(".datagrid-cell,.datagrid-cell-check").empty(), 
            $.map(b, function(a) {
                a.formatter = a.formatter1, a.styler = a.styler1, a.formatter1 = a.styler1 = void 0;
            });
        }
    };
    $.fn.datagrid.defaults = $.extend({}, $.fn.panel.defaults, {
        sharedStyleSheet: !1,
        frozenColumns: void 0,
        columns: void 0,
        fitColumns: !1,
        resizeHandle: "right",
        autoRowHeight: !0,
        toolbar: null,
        striped: !1,
        method: "post",
        nowrap: !0,
        idField: null,
        url: null,
        data: null,
        rownumbers: !1,
        ctrlSelect: !1,
        selectOnCheck: !0,
        pagePosition: "bottom",
        pageNumber: 1,
        pageList: [ 10, 20, 30, 40, 50 ],
        queryParams: {},
        sortName: null,
        sortOrder: "asc",
        multiSort: !1,
        remoteSort: !0,
        showHeader: !0,
        showFooter: !1,
        scrollbarSize: 18,
        border: !1,
        fit: !0,
        async: !0,
        setTRHeight: !1,
        emptyMsg: "暂无数据",
        loadMsg: "数据加载中，请稍后...",
        singleSelect: !0,
        pageSize: 20,
        checkOnSelect: !1,
        pagination: !0,
        checkedNumber: !1,
        rowEvents: {
            mouseover: hoverEventHandler(!0),
            mouseout: hoverEventHandler(!1),
            click: clickEventHandler,
            dblclick: dblclickEventHandler,
            contextmenu: contextmenuEventHandler
        },
        rowStyler: function(a, b) {},
        loader: function(a, b, c) {
            var d = $(this).datagrid("options");
            return d.url ? void $.ajax({
                type: d.method,
                async: d.async,
                url: d.url,
                data: a,
                dataType: "json",
                success: function(a) {
                    b(a);
                },
                error: function() {
                    c.apply(this, arguments);
                }
            }) : !1;
        },
        loadFilter: function(a) {
            return "number" == typeof a.length && "function" == typeof a.splice ? {
                total: a.length,
                rows: a
            } : a;
        },
        editors: editors,
        finder: {
            getTr: function(a, b, c, d) {
                c = c || "body", d = d || 0;
                var e = $.data(a, "datagrid"), f = e.dc, g = e.options;
                if (0 == d) {
                    var h = g.finder.getTr(a, b, c, 1), i = g.finder.getTr(a, b, c, 2);
                    return h.add(i);
                }
                if ("body" == c) {
                    var j = $("#" + e.rowIdPrefix + "-" + d + "-" + b);
                    return j.length || (j = (1 == d ? f.body1 : f.body2).find(">table>tbody>tr[datagrid-row-index=" + b + "]")), 
                    j;
                }
                return "footer" == c ? (1 == d ? f.footer1 : f.footer2).find(">table>tbody>tr[datagrid-row-index=" + b + "]") : "selected" == c ? (1 == d ? f.body1 : f.body2).find(">table>tbody>tr.datagrid-row-selected") : "highlight" == c ? (1 == d ? f.body1 : f.body2).find(">table>tbody>tr.datagrid-row-over") : "checked" == c ? (1 == d ? f.body1 : f.body2).find(">table>tbody>tr.datagrid-row-checked") : "editing" == c ? (1 == d ? f.body1 : f.body2).find(">table>tbody>tr.datagrid-row-editing") : "last" == c ? (1 == d ? f.body1 : f.body2).find(">table>tbody>tr[datagrid-row-index]:last") : "allbody" == c ? (1 == d ? f.body1 : f.body2).find(">table>tbody>tr[datagrid-row-index]") : "allfooter" == c ? (1 == d ? f.footer1 : f.footer2).find(">table>tbody>tr[datagrid-row-index]") : void 0;
            },
            getRow: function(a, b) {
                var c = "object" == typeof b ? b.attr("datagrid-row-index") : b;
                return $.data(a, "datagrid").data.rows[parseInt(c)];
            },
            getRows: function(a) {
                return $(a).datagrid("getRows");
            }
        },
        view: defaultView,
        onBeforeLoad: function(a) {},
        onLoadSuccess: function() {},
        onLoadError: function() {},
        onClickRow: function(a, b) {},
        onDblClickRow: function(a, b) {},
        onClickCell: function(a, b, c) {},
        onDblClickCell: function(a, b, c) {},
        onBeforeSortColumn: function(a, b) {},
        onSortColumn: function(a, b) {},
        onResizeColumn: function(a, b) {},
        onBeforeSelect: function(a, b) {},
        onSelect: function(a, b) {},
        onBeforeUnselect: function(a, b) {},
        onUnselect: function(a, b) {},
        onSelectAll: function(a) {},
        onUnselectAll: function(a) {},
        onBeforeCheck: function(a, b) {},
        onCheck: function(a, b) {},
        onBeforeUncheck: function(a, b) {},
        onUncheck: function(a, b) {},
        onCheckAll: function(a) {},
        onUncheckAll: function(a) {},
        onBeforeEdit: function(a, b) {},
        onBeginEdit: function(a, b) {},
        onEndEdit: function(a, b, c) {},
        onAfterEdit: function(a, b, c) {},
        onCancelEdit: function(a, b) {},
        onHeaderContextMenu: function(a, b) {},
        onRowContextMenu: function(a, b, c) {}
    });
}(jQuery);

var detailview = $.extend({}, $.fn.datagrid.defaults.view, {
    render: function(a, b, c) {
        var d = $.data(a, "datagrid"), e = d.options;
        if (!c || e.rownumbers || e.frozenColumns && e.frozenColumns.length) {
            var f = d.data.rows, g = $(a).datagrid("getColumnFields", c), h = [];
            h.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
            for (var i = 0; i < f.length; i++) {
                var j = e.rowStyler ? e.rowStyler.call(a, i, f[i]) : "", k = "", l = "";
                "string" == typeof j ? l = j : j && (k = j["class"] || "", l = j.style || "");
                var m = 'class="datagrid-row ' + (i % 2 && e.striped ? "datagrid-row-alt " : " ") + k + '"', n = l ? 'style="' + l + '"' : "", o = d.rowIdPrefix + "-" + (c ? 1 : 2) + "-" + i;
                h.push('<tr id="' + o + '" datagrid-row-index="' + i + '" ' + m + " " + n + ">"), 
                h.push(this.renderRow.call(this, a, g, c, i, f[i])), h.push("</tr>"), h.push('<tr style="display:none;">'), 
                h.push(c ? "<td colspan=" + (g.length + 2) + ' style="border-right:0">' : '<td style="vertical-align:top;padding-right:10px;" colspan=' + g.length + ">"), 
                h.push('<div class="datagrid-row-detail">'), h.push(c ? "&nbsp;" : e.detailFormatter.call(a, i, f[i])), 
                h.push("</div>"), h.push("</td>"), h.push("</tr>");
            }
            h.push("</tbody></table>"), $(b).html(h.join(""));
        }
    },
    renderRow: function(a, b, c, d, e) {
        var f = $.data(a, "datagrid").options, g = [];
        if (c && f.rownumbers) {
            var h = d + 1;
            f.pagination && (h += (f.pageNumber - 1) * f.pageSize), g.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">' + h + "</div></td>");
        }
        for (var i = 0; i < b.length; i++) {
            var j = b[i], k = $(a).datagrid("getColumnOption", j);
            if (k) {
                var l = e[j], m = k.styler ? k.styler(l, e, d) || "" : "", n = "", o = "";
                "string" == typeof m ? o = m : g && (n = m["class"] || "", o = m.style || "");
                var p = n ? 'class="' + n + '"' : "", q = k.hidden ? 'style="display:none;' + o + '"' : o ? 'style="' + o + '"' : "";
                g.push('<td field="' + j + '" ' + p + " " + q + ">"), k.checkbox ? q = "" : k.expander ? q = "text-align:center;height:16px;" : (q = o, 
                k.align && (q += ";text-align:" + k.align + ";"), f.nowrap ? f.autoRowHeight && (q += ";height:auto;") : q += ";white-space:normal;height:auto;"), 
                g.push('<div style="' + q + '" '), g.push(k.checkbox ? 'class="datagrid-cell-check ' : 'class="datagrid-cell ' + k.cellClass), 
                g.push('">'), g.push(k.checkbox ? '<input type="checkbox" name="' + j + '" value="' + (void 0 != l ? l : "") + '">' : k.expander ? '<span class="datagrid-row-expander datagrid-row-expand" style="display:inline-block;width:16px;height:16px;cursor:pointer;" />' : k.formatter ? k.formatter(l, e, d) : l), 
                g.push("</div>"), g.push("</td>");
            }
        }
        return g.join("");
    },
    insertRow: function(a, b, c) {
        function d(d) {
            var f = d ? g : h, j = f.find("tr[datagrid-row-index=" + b + "]");
            if (i) var k = j.next().clone(); else var k = j.next().next().clone();
            k.insertAfter(j), k.hide(), d || k.find("div.datagrid-row-detail").html(e.detailFormatter.call(a, b, c));
        }
        var e = $.data(a, "datagrid").options, f = $.data(a, "datagrid").dc, g = ($(a).datagrid("getPanel"), 
        f.view1), h = f.view2, i = !1, j = $(a).datagrid("getRows").length;
        return 0 == j ? void $(a).datagrid("loadData", {
            total: 1,
            rows: [ c ]
        }) : ((void 0 == b || null == b || b >= j) && (b = j, i = !0, this.canUpdateDetail = !1), 
        $.fn.datagrid.defaults.view.insertRow.call(this, a, b, c), d(!0), d(!1), void (this.canUpdateDetail = !0));
    },
    deleteRow: function(a, b) {
        var c = $.data(a, "datagrid").options, d = $.data(a, "datagrid").dc, e = c.finder.getTr(a, b);
        e.next().remove(), $.fn.datagrid.defaults.view.deleteRow.call(this, a, b), d.body2.triggerHandler("scroll");
    },
    updateRow: function(a, b, c) {
        var d = ($.data(a, "datagrid").dc, $.data(a, "datagrid").options), e = $(a).datagrid("getExpander", b).attr("class");
        if ($.fn.datagrid.defaults.view.updateRow.call(this, a, b, c), $(a).datagrid("getExpander", b).attr("class", e), 
        this.canUpdateDetail) {
            var c = $(a).datagrid("getRows")[b], f = $(a).datagrid("getRowDetail", b);
            f.html(d.detailFormatter.call(a, b, c));
        }
    },
    bindEvents: function(a) {
        var b = $.data(a, "datagrid"), c = b.dc, d = (b.options, c.body1.add(c.body2)), e = ($.data(d[0], "events") || $._data(d[0], "events")).click[0].handler;
        d.unbind("click").bind("click", function(b) {
            var c = $(b.target), d = c.closest("tr.datagrid-row");
            if (d.length) {
                if (c.hasClass("datagrid-row-expander")) {
                    var f = parseInt(d.attr("datagrid-row-index"));
                    if ($(a).datagrid("selectRow", f), c.hasClass("datagrid-row-expand")) {
                        for (var g = 0; g < $(a).datagrid("getRows").length; g++) $("#ddv-" + g).empty(), 
                        $(a).datagrid("collapseRow", g);
                        $(window).resize(function() {
                            if ($("#ddv-" + f)[0]) {
                                var a = $(window).width() - 50;
                                $("#ddv-" + f).width(a);
                            }
                        }), $(a).datagrid("expandRow", f);
                    } else $(a).datagrid("collapseRow", f);
                    $(a).datagrid("fixRowHeight");
                } else e(b);
                b.stopPropagation();
            }
        });
    },
    onBeforeRender: function(a) {
        for (var b = $.data(a, "datagrid"), c = b.options, d = b.dc, e = $(a), f = !1, g = e.datagrid("getColumnFields", !0).concat(e.datagrid("getColumnFields")), h = 0; h < g.length; h++) {
            var i = e.datagrid("getColumnOption", g[h]);
            if (i.expander) {
                f = !0;
                break;
            }
        }
        if (!f) {
            c.frozenColumns && c.frozenColumns.length ? c.frozenColumns[0].splice(0, 0, {
                field: "_expander",
                expander: !0,
                width: 24,
                resizable: !1,
                fixed: !0
            }) : c.frozenColumns = [ [ {
                field: "_expander",
                expander: !0,
                width: 24,
                resizable: !1,
                fixed: !0
            } ] ];
            var e = d.view1.children("div.datagrid-header").find("table"), j = $('<td rowspan="' + c.frozenColumns.length + '"><div class="datagrid-header-expander" style="width:24px;"></div></td>');
            0 == $("tr", e).length ? j.wrap("<tr></tr>").parent().appendTo($("tbody", e)) : c.rownumbers ? j.insertAfter(e.find("td:has(div.datagrid-header-rownumber)")) : j.prependTo(e.find("tr:first"));
        }
        var k = this;
        setTimeout(function() {
            k.bindEvents(a);
        }, 0);
    },
    onAfterRender: function(a) {
        function b() {
            var a = d.view2.children("div.datagrid-header").find("table").width();
            d.body2.children("table").width(a);
        }
        var c = $.data(a, "datagrid"), d = c.dc, e = c.options, f = $(a).datagrid("getPanel");
        $.fn.datagrid.defaults.view.onAfterRender.call(this, a), c.onResizeColumn || (c.onResizeColumn = e.onResizeColumn), 
        c.onResize || (c.onResize = e.onResize), e.onResizeColumn = function(d, e) {
            b();
            for (var f = $(a).datagrid("getRows").length, g = 0; f > g; g++) $(a).datagrid("fixDetailRowHeight", g);
            c.onResizeColumn.call(a, d, e);
        }, e.onResize = function(a, d) {
            b(), c.onResize.call(f, a, d);
        }, this.canUpdateDetail = !0, d.footer1.find("span.datagrid-row-expander").css("visibility", "hidden"), 
        $(a).datagrid("resize");
    }
});

$.extend($.fn.datagrid.methods, {
    fixDetailRowHeight: function(a, b) {
        return a.each(function() {
            var a = $.data(this, "datagrid").options;
            !(a.rownumbers || a.frozenColumns && a.frozenColumns.length);
            var c = $.data(this, "datagrid").dc, d = a.finder.getTr(this, b, "body", 1).next(), e = a.finder.getTr(this, b, "body", 2).next();
            if (e.is(":visible")) {
                d.css("height", 150), e.css("height", "");
                var f = Math.max(d.height(), e.height());
                d.css("height", f), e.css("height", f);
            }
            c.body2.triggerHandler("scroll");
        });
    },
    getExpander: function(a, b) {
        var c = $.data(a[0], "datagrid").options;
        return c.finder.getTr(a[0], b).find("span.datagrid-row-expander");
    },
    getRowDetail: function(a, b) {
        var c = $.data(a[0], "datagrid").options, d = c.finder.getTr(a[0], b, "body", 2);
        return d.next().find("div.datagrid-row-detail");
    },
    expandRow: function(a, b) {
        return a.each(function() {
            var a = $(this).datagrid("options"), c = ($.data(this, "datagrid").dc, $(this).datagrid("getExpander", b));
            if (c.hasClass("datagrid-row-expand")) {
                c.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
                var d = a.finder.getTr(this, b, "body", 1).next(), e = a.finder.getTr(this, b, "body", 2).next();
                if (d.show().height(150), e.show(), $(this).datagrid("fixDetailRowHeight", b), a.onExpandRow) {
                    var f = $(this).datagrid("getRows")[b];
                    a.onExpandRow.call(this, b, f);
                }
            }
        });
    },
    collapseRow: function(a, b) {
        return a.each(function() {
            var a = $(this).datagrid("options"), c = $.data(this, "datagrid").dc, d = $(this).datagrid("getExpander", b);
            if (d.hasClass("datagrid-row-collapse")) {
                d.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
                var e = a.finder.getTr(this, b, "body", 1).next(), f = a.finder.getTr(this, b, "body", 2).next();
                if (e.hide(), f.hide(), c.body2.triggerHandler("scroll"), a.onCollapseRow) {
                    var g = $(this).datagrid("getRows")[b];
                    a.onCollapseRow.call(this, b, g);
                }
            }
        });
    }
}), function($) {
    function init(a) {
        function b(a) {
            var c = [];
            return a.addClass("menu"), c.push(a), a.hasClass("menu-content") || a.children("div").each(function() {
                var a = $(this).children("div");
                if (a.length) {
                    a.appendTo("body"), this.submenu = a;
                    var d = b(a);
                    c = c.concat(d);
                }
            }), c;
        }
        function c(b) {
            var c = $.parser.parseOptions(b[0], [ "width", "height" ]);
            b[0].originalHeight = c.height || 0, b.hasClass("menu-content") ? b[0].originalWidth = c.width || b._outerWidth() : (b[0].originalWidth = c.width || 0, 
            b.children("div").each(function() {
                var b = $(this), c = $.extend({}, $.parser.parseOptions(this, [ "name", "iconCls", "href", {
                    separator: "boolean"
                } ]), {
                    disabled: b.attr("disabled") ? !0 : void 0
                });
                if (c.separator && b.addClass("menu-sep"), !b.hasClass("menu-sep")) {
                    b[0].itemName = c.name || "", b[0].itemHref = c.href || "";
                    var d = b.addClass("menu-item").html();
                    b.empty().append($('<div class="menu-text"></div>').html(d)), c.iconCls && $('<div class="menu-icon"></div>').addClass(c.iconCls).appendTo(b), 
                    c.disabled && setDisabled(a, b[0], !0), b[0].submenu && $('<div class="menu-rightarrow"></div>').appendTo(b), 
                    bindMenuItemEvent(a, b);
                }
            }), $('<div class="menu-line"></div>').prependTo(b)), setMenuSize(a, b), b.hasClass("menu-inline") || b.hide(), 
            bindMenuEvent(a, b);
        }
        var d = $.data(a, "menu").options;
        $(a).addClass("menu-top"), d.inline ? $(a).addClass("menu-inline") : $(a).appendTo("body"), 
        $(a).bind("_resize", function(b, c) {
            return ($(this).hasClass("easyui-fluid") || c) && $(a).menu("resize", a), !1;
        });
        for (var e = b($(a)), f = 0; f < e.length; f++) c(e[f]);
    }
    function setMenuSize(a, b) {
        var c = $.data(a, "menu").options, d = b.attr("style") || "";
        b.css({
            display: "block",
            left: -1e4,
            height: "auto",
            overflow: "hidden"
        }), b.find(".menu-item").each(function() {
            $(this)._outerHeight(c.itemHeight), $(this).find(".menu-text").css({
                height: c.itemHeight - 2 + "px",
                lineHeight: c.itemHeight - 2 + "px"
            });
        }), b.removeClass("menu-noline").addClass(c.noline ? "menu-noline" : "");
        var e = b[0].originalWidth || "auto";
        isNaN(parseInt(e)) && (e = 0, b.find("div.menu-text").each(function() {
            e < $(this)._outerWidth() && (e = $(this)._outerWidth());
        }), e += 40);
        var f = b.outerHeight(), g = b[0].originalHeight || "auto";
        if (isNaN(parseInt(g))) if (g = f, b.hasClass("menu-top") && c.alignTo) {
            var h = $(c.alignTo), i = h.offset().top - $(document).scrollTop(), j = $(window)._outerHeight() + $(document).scrollTop() - h.offset().top - h._outerHeight();
            g = Math.min(g, Math.max(i, j));
        } else g > $(window)._outerHeight() && (g = $(window).height());
        b.attr("style", d), b._size({
            fit: b[0] == a ? c.fit : !1,
            width: e,
            minWidth: c.minWidth,
            height: g
        }), b.css("overflow", b.outerHeight() < f ? "auto" : "hidden"), b.children("div.menu-line")._outerHeight(f - 2);
    }
    function bindMenuEvent(a, b) {
        if (!b.hasClass("menu-inline")) {
            var c = $.data(a, "menu");
            b.unbind(".menu").bind("mouseenter.menu", function() {
                c.timer && (clearTimeout(c.timer), c.timer = null);
            }).bind("mouseleave.menu", function() {
                c.options.hideOnUnhover && (c.timer = setTimeout(function() {
                    hideAll(a, $(a).hasClass("menu-inline"));
                }, c.options.duration));
            });
        }
    }
    function bindMenuItemEvent(a, b) {
        b.hasClass("menu-item") && (b.unbind(".menu"), b.bind("click.menu", function() {
            if (!$(this).hasClass("menu-item-disabled")) {
                if (!this.submenu) {
                    hideAll(a, $(a).hasClass("menu-inline"));
                    var b = this.itemHref;
                    b && (location.href = b);
                }
                $(this).trigger("mouseenter");
                var c = $(a).menu("getItem", this);
                $.data(a, "menu").options.onClick.call(a, c);
            }
        }).bind("mouseenter.menu", function(c) {
            if (b.siblings().each(function() {
                this.submenu && hideMenu(this.submenu), $(this).removeClass("menu-active");
            }), b.addClass("menu-active"), $(this).hasClass("menu-item-disabled")) return void b.addClass("menu-active-disabled");
            var d = b[0].submenu;
            d && $(a).menu("show", {
                menu: d,
                parent: b
            });
        }).bind("mouseleave.menu", function(a) {
            b.removeClass("menu-active menu-active-disabled");
            var c = b[0].submenu;
            c ? a.pageX >= parseInt(c.css("left")) ? b.addClass("menu-active") : hideMenu(c) : b.removeClass("menu-active");
        }));
    }
    function hideAll(a, b) {
        var c = $.data(a, "menu");
        return c && $(a).is(":visible") && (hideMenu($(a)), b ? $(a).show() : c.options.onHide.call(a)), 
        !1;
    }
    function showMenu(a, b) {
        function c(a, b) {
            return a + f.outerHeight() > $(window)._outerHeight() + $(document).scrollTop() && (a = b ? $(b).offset().top - f._outerHeight() : $(window)._outerHeight() + $(document).scrollTop() - f.outerHeight()), 
            0 > a && (a = 0), a;
        }
        var d, e;
        b = b || {};
        var f = $(b.menu || a);
        if ($(a).menu("resize", f[0]), f.hasClass("menu-top")) {
            var g = $.data(a, "menu").options;
            if ($.extend(g, b), d = g.left, e = g.top, g.alignTo) {
                var h = $(g.alignTo);
                d = h.offset().left, e = h.offset().top + h._outerHeight(), "right" == g.align && (d += h.outerWidth() - f.outerWidth());
            }
            d + f.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft() && (d = $(window)._outerWidth() + $(document).scrollLeft() - f.outerWidth() - 5), 
            0 > d && (d = 0), e = c(e, g.alignTo);
        } else {
            var i = b.parent;
            d = i.offset().left + i.outerWidth() - 2, d + f.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft() && (d = i.offset().left - f.outerWidth() + 2), 
            e = c(i.offset().top - 3);
        }
        f.css({
            left: d,
            top: e
        }), f.show(0, function() {
            f[0].shadow || (f[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(f)), 
            f[0].shadow.css({
                display: f.hasClass("menu-inline") ? "none" : "block",
                zIndex: $.fn.menu.defaults.zIndex++,
                left: f.css("left"),
                top: f.css("top"),
                width: f.outerWidth(),
                height: f.outerHeight()
            }), f.css("z-index", $.fn.menu.defaults.zIndex++), f.hasClass("menu-top") && $.data(f[0], "menu").options.onShow.call(f[0]);
        });
    }
    function hideMenu(a) {
        function b(a) {
            a.stop(!0, !0), a[0].shadow && a[0].shadow.hide(), a.hide();
        }
        a && a.length && (b(a), a.find("div.menu-item").each(function() {
            this.submenu && hideMenu(this.submenu), $(this).removeClass("menu-active");
        }));
    }
    function findItem(a, b) {
        function c(f) {
            f.children("div.menu-item").each(function() {
                var f = $(a).menu("getItem", this), g = e.empty().html(f.text).text();
                b == $.trim(g) ? d = f : this.submenu && !d && c(this.submenu);
            });
        }
        var d = null, e = $("<div></div>");
        return c($(a)), e.remove(), d;
    }
    function setDisabled(a, b, c) {
        var d = $(b);
        d.hasClass("menu-item") && (c ? (d.addClass("menu-item-disabled"), b.onclick && (b.onclick1 = b.onclick, 
        b.onclick = null)) : (d.removeClass("menu-item-disabled"), b.onclick1 && (b.onclick = b.onclick1, 
        b.onclick1 = null)));
    }
    function appendItem(target, param) {
        var opts = $.data(target, "menu").options, menu = $(target);
        if (param.parent) {
            if (!param.parent.submenu) {
                var submenu = $('<div class="menu"><div class="menu-line"></div></div>').appendTo("body");
                submenu.hide(), param.parent.submenu = submenu, $('<div class="menu-rightarrow"></div>').appendTo(param.parent);
            }
            menu = param.parent.submenu;
        }
        if (param.separator) var item = $('<div class="menu-sep"></div>').appendTo(menu); else {
            var item = $('<div class="menu-item"></div>').appendTo(menu);
            $('<div class="menu-text"></div>').html(param.text).appendTo(item);
        }
        param.iconCls && $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(item), 
        param.id && item.attr("id", param.id), param.name && (item[0].itemName = param.name), 
        param.href && (item[0].itemHref = param.href), param.onclick && ("string" == typeof param.onclick ? item.attr("onclick", param.onclick) : item[0].onclick = eval(param.onclick)), 
        param.handler && (item[0].onclick = eval(param.handler)), param.disabled && setDisabled(target, item[0], !0), 
        bindMenuItemEvent(target, item), bindMenuEvent(target, menu), setMenuSize(target, menu);
    }
    function removeItem(a, b) {
        function c(a) {
            if (a.submenu) {
                a.submenu.children("div.menu-item").each(function() {
                    c(this);
                });
                var b = a.submenu[0].shadow;
                b && b.remove(), a.submenu.remove();
            }
            $(a).remove();
        }
        var d = $(b).parent();
        c(b), setMenuSize(a, d);
    }
    function setVisible(a, b, c) {
        var d = $(b).parent();
        c ? $(b).show() : $(b).hide(), setMenuSize(a, d);
    }
    function destroyMenu(a) {
        $(a).children("div.menu-item").each(function() {
            removeItem(a, this);
        }), a.shadow && a.shadow.remove(), $(a).remove();
    }
    $(function() {
        $(document).unbind(".menu").bind("mousedown.menu", function(a) {
            var b = $(a.target).closest("div.menu,div.combo-p");
            b.length || ($("body>div.menu-top:visible").not(".menu-inline").menu("hide"), hideMenu($("body>div.menu:visible").not(".menu-inline")));
        });
    }), $.fn.menu = function(a, b) {
        return "string" == typeof a ? $.fn.menu.methods[a](this, b) : (a = a || {}, this.each(function() {
            var b = $.data(this, "menu");
            b ? $.extend(b.options, a) : (b = $.data(this, "menu", {
                options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), a)
            }), init(this)), $(this).css({
                left: b.options.left,
                top: b.options.top
            });
        }));
    }, $.fn.menu.methods = {
        options: function(a) {
            return $.data(a[0], "menu").options;
        },
        show: function(a, b) {
            return a.each(function() {
                showMenu(this, b);
            });
        },
        hide: function(a) {
            return a.each(function() {
                hideAll(this);
            });
        },
        destroy: function(a) {
            return a.each(function() {
                destroyMenu(this);
            });
        },
        setText: function(a, b) {
            return a.each(function() {
                $(b.target).children("div.menu-text").html(b.text);
            });
        },
        setIcon: function(a, b) {
            return a.each(function() {
                $(b.target).children("div.menu-icon").remove(), b.iconCls && $('<div class="menu-icon"></div>').addClass(b.iconCls).appendTo(b.target);
            });
        },
        getItem: function(a, b) {
            var c = $(b), d = {
                target: b,
                id: c.attr("id"),
                text: $.trim(c.children("div.menu-text").html()),
                disabled: c.hasClass("menu-item-disabled"),
                name: b.itemName,
                href: b.itemHref,
                onclick: b.onclick
            }, e = c.children("div.menu-icon");
            if (e.length) {
                for (var f = [], g = e.attr("class").split(" "), h = 0; h < g.length; h++) "menu-icon" != g[h] && f.push(g[h]);
                d.iconCls = f.join(" ");
            }
            return d;
        },
        findItem: function(a, b) {
            return findItem(a[0], b);
        },
        appendItem: function(a, b) {
            return a.each(function() {
                appendItem(this, b);
            });
        },
        removeItem: function(a, b) {
            return a.each(function() {
                removeItem(this, b);
            });
        },
        enableItem: function(a, b) {
            return a.each(function() {
                setDisabled(this, b, !1);
            });
        },
        disableItem: function(a, b) {
            return a.each(function() {
                setDisabled(this, b, !0);
            });
        },
        showItem: function(a, b) {
            return a.each(function() {
                setVisible(this, b, !0);
            });
        },
        hideItem: function(a, b) {
            return a.each(function() {
                setVisible(this, b, !1);
            });
        },
        resize: function(a, b) {
            return a.each(function() {
                setMenuSize(this, $(b));
            });
        }
    }, $.fn.menu.parseOptions = function(a) {
        return $.extend({}, $.parser.parseOptions(a, [ {
            minWidth: "number",
            itemHeight: "number",
            duration: "number",
            hideOnUnhover: "boolean"
        }, {
            fit: "boolean",
            inline: "boolean",
            noline: "boolean"
        } ]));
    }, $.fn.menu.defaults = {
        zIndex: 11e4,
        left: 0,
        top: 0,
        alignTo: null,
        align: "left",
        minWidth: 120,
        itemHeight: 22,
        duration: 100,
        hideOnUnhover: !0,
        inline: !1,
        fit: !1,
        noline: !1,
        onShow: function() {},
        onHide: function() {},
        onClick: function(a) {}
    };
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "menubutton").options, d = a(b);
        if (d.linkbutton(c), c.hasDownArrow) {
            d.removeClass(c.cls.btn1 + " " + c.cls.btn2).addClass("m-btn"), d.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-" + c.size);
            var e = d.find(".l-btn-left");
            a("<span></span>").addClass(c.cls.arrow).appendTo(e), a("<span></span>").addClass("m-btn-line").appendTo(e);
        }
        if (a(b).menubutton("resize"), c.menu) {
            a(c.menu).menu({
                duration: c.duration
            });
            var f = a(c.menu).menu("options"), g = f.onShow, h = f.onHide;
            a.extend(f, {
                onShow: function() {
                    var b = a(this).menu("options"), c = a(b.alignTo), d = c.menubutton("options");
                    c.addClass(1 == d.plain ? d.cls.btn2 : d.cls.btn1), g.call(this);
                },
                onHide: function() {
                    var b = a(this).menu("options"), c = a(b.alignTo), d = c.menubutton("options");
                    c.removeClass(1 == d.plain ? d.cls.btn2 : d.cls.btn1), h.call(this);
                }
            });
        }
    }
    function c(b) {
        function c() {
            return a(b).linkbutton("options").disabled;
        }
        var e = a.data(b, "menubutton").options, f = a(b), g = f.find("." + e.cls.trigger);
        g.length || (g = f), g.unbind(".menubutton");
        var h = null;
        g.bind("click.menubutton", function() {
            return c() ? void 0 : (d(b), !1);
        }).bind("mouseenter.menubutton", function() {
            return c() ? void 0 : (h = setTimeout(function() {
                d(b);
            }, e.duration), !1);
        }).bind("mouseleave.menubutton", function() {
            h && clearTimeout(h), a(e.menu).triggerHandler("mouseleave");
        });
    }
    function d(b) {
        var c = a(b).menubutton("options");
        if (!c.disabled && c.menu) {
            a("body>div.menu-top").menu("hide");
            var d = a(b), e = a(c.menu);
            e.length && (e.menu("options").alignTo = d, e.menu("show", {
                alignTo: d,
                align: c.menuAlign
            })), d.blur();
        }
    }
    a.fn.menubutton = function(d, e) {
        if ("string" == typeof d) {
            var f = a.fn.menubutton.methods[d];
            return f ? f(this, e) : this.linkbutton(d, e);
        }
        return d = d || {}, this.each(function() {
            var e = a.data(this, "menubutton");
            e ? a.extend(e.options, d) : (a.data(this, "menubutton", {
                options: a.extend({}, a.fn.menubutton.defaults, a.fn.menubutton.parseOptions(this), d)
            }), a(this).removeAttr("disabled")), b(this), c(this);
        });
    }, a.fn.menubutton.methods = {
        options: function(b) {
            var c = b.linkbutton("options");
            return a.extend(a.data(b[0], "menubutton").options, {
                toggle: c.toggle,
                selected: c.selected,
                disabled: c.disabled
            });
        },
        destroy: function(b) {
            return b.each(function() {
                var b = a(this).menubutton("options");
                b.menu && a(b.menu).menu("destroy"), a(this).remove();
            });
        }
    }, a.fn.menubutton.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.fn.linkbutton.parseOptions(b), a.parser.parseOptions(b, [ "menu", {
            plain: "boolean",
            hasDownArrow: "boolean",
            duration: "number"
        } ]));
    }, a.fn.menubutton.defaults = a.extend({}, a.fn.linkbutton.defaults, {
        plain: !0,
        hasDownArrow: !0,
        menu: null,
        menuAlign: "left",
        duration: 100,
        cls: {
            btn1: "m-btn-active",
            btn2: "m-btn-plain-active",
            arrow: "m-btn-downarrow",
            trigger: "m-btn"
        }
    });
}(jQuery), function(a) {
    function b(b) {
        a(b).addClass("tooltip-f");
    }
    function c(b) {
        var c = a.data(b, "tooltip").options;
        a(b).unbind(".tooltip").bind(c.showEvent + ".tooltip", function(c) {
            a(b).tooltip("show", c);
        }).bind(c.hideEvent + ".tooltip", function(c) {
            a(b).tooltip("hide", c);
        }).bind("mousemove.tooltip", function(d) {
            c.trackMouse && (c.trackMouseX = d.pageX, c.trackMouseY = d.pageY, a(b).tooltip("reposition"));
        });
    }
    function d(b) {
        var c = a.data(b, "tooltip");
        c.showTimer && (clearTimeout(c.showTimer), c.showTimer = null), c.hideTimer && (clearTimeout(c.hideTimer), 
        c.hideTimer = null);
    }
    function e(b) {
        function c(c) {
            e.position = c || "bottom", f.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-" + e.position);
            var d, g;
            if (e.trackMouse) h = a(), d = e.trackMouseX + e.deltaX, g = e.trackMouseY + e.deltaY; else {
                var h = a(b);
                d = h.offset().left + e.deltaX, g = h.offset().top + e.deltaY;
            }
            switch (e.position) {
              case "right":
                d += h._outerWidth() + 12 + (e.trackMouse ? 12 : 0), g -= (f._outerHeight() - h._outerHeight()) / 2;
                break;

              case "left":
                d -= f._outerWidth() + 12 + (e.trackMouse ? 12 : 0), g -= (f._outerHeight() - h._outerHeight()) / 2;
                break;

              case "top":
                d -= (f._outerWidth() - h._outerWidth()) / 2, g -= f._outerHeight() + 12 + (e.trackMouse ? 12 : 0);
                break;

              case "bottom":
                d -= (f._outerWidth() - h._outerWidth()) / 2, g += h._outerHeight() + 12 + (e.trackMouse ? 12 : 0);
            }
            return {
                left: d,
                top: g
            };
        }
        var d = a.data(b, "tooltip");
        if (d && d.tip) {
            var e = d.options, f = d.tip, g = {
                left: -1e5,
                top: -1e5
            };
            if (a(b).is(":visible")) if (g = c(e.position), "top" == e.position && g.top < 0 ? g = c("bottom") : "bottom" == e.position && g.top + f._outerHeight() > a(window)._outerHeight() + a(document).scrollTop() && (g = c("top")), 
            g.left < 0) "left" == e.position ? g = c("right") : (a(b).tooltip("arrow").css("left", f._outerWidth() / 2 + g.left), 
            g.left = 0); else if (g.left + f._outerWidth() > a(window)._outerWidth() + a(document)._scrollLeft()) if ("right" == e.position) g = c("left"); else {
                var h = g.left;
                g.left = a(window)._outerWidth() + a(document)._scrollLeft() - f._outerWidth(), 
                a(b).tooltip("arrow").css("left", f._outerWidth() / 2 - (g.left - h));
            }
            f.css({
                left: g.left,
                top: g.top,
                zIndex: void 0 != e.zIndex ? e.zIndex : a.fn.window ? a.fn.window.defaults.zIndex++ : ""
            }), e.onPosition.call(b, g.left, g.top);
        }
    }
    function f(b, c) {
        var e = a.data(b, "tooltip"), f = e.options, g = e.tip;
        g || (g = a('<div tabindex="-1" class="tooltip"><div class="tooltip-content"></div><div class="tooltip-arrow-outer"></div><div class="tooltip-arrow"></div></div>').appendTo("body"), 
        e.tip = g, h(b)), d(b), e.showTimer = setTimeout(function() {
            a(b).tooltip("reposition"), g.show(), f.onShow.call(b, c);
            var d = g.children(".tooltip-arrow-outer"), e = g.children(".tooltip-arrow"), h = "border-" + f.position + "-color";
            d.add(e).css({
                borderTopColor: "",
                borderBottomColor: "",
                borderLeftColor: "",
                borderRightColor: ""
            }), d.css(h, g.css(h)), e.css(h, g.css("backgroundColor"));
        }, f.showDelay);
    }
    function g(b, c) {
        var e = a.data(b, "tooltip");
        e && e.tip && (d(b), e.hideTimer = setTimeout(function() {
            e.tip.hide(), e.options.onHide.call(b, c);
        }, e.options.hideDelay));
    }
    function h(b, c) {
        var d = a.data(b, "tooltip"), e = d.options;
        if (c && (e.content = c), d.tip) {
            var f = "function" == typeof e.content ? e.content.call(b) : e.content;
            d.tip.children(".tooltip-content").html(f), e.onUpdate.call(b, f);
        }
    }
    function i(b) {
        var c = a.data(b, "tooltip");
        if (c) {
            d(b);
            var e = c.options;
            c.tip && c.tip.remove(), e._title && a(b).attr("title", e._title), a.removeData(b, "tooltip"), 
            a(b).unbind(".tooltip").removeClass("tooltip-f"), e.onDestroy.call(b);
        }
    }
    a.fn.tooltip = function(d, e) {
        return "string" == typeof d ? a.fn.tooltip.methods[d](this, e) : (d = d || {}, this.each(function() {
            var e = a.data(this, "tooltip");
            e ? a.extend(e.options, d) : (a.data(this, "tooltip", {
                options: a.extend({}, a.fn.tooltip.defaults, a.fn.tooltip.parseOptions(this), d)
            }), b(this)), c(this), h(this);
        }));
    }, a.fn.tooltip.methods = {
        options: function(b) {
            return a.data(b[0], "tooltip").options;
        },
        tip: function(b) {
            return a.data(b[0], "tooltip").tip;
        },
        arrow: function(a) {
            return a.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
        },
        show: function(a, b) {
            return a.each(function() {
                f(this, b);
            });
        },
        hide: function(a, b) {
            return a.each(function() {
                g(this, b);
            });
        },
        update: function(a, b) {
            return a.each(function() {
                h(this, b);
            });
        },
        reposition: function(a) {
            return a.each(function() {
                e(this);
            });
        },
        destroy: function(a) {
            return a.each(function() {
                i(this);
            });
        }
    }, a.fn.tooltip.parseOptions = function(b) {
        var c = a(b), d = a.extend({}, a.parser.parseOptions(b, [ "position", "showEvent", "hideEvent", "content", {
            trackMouse: "boolean",
            deltaX: "number",
            deltaY: "number",
            showDelay: "number",
            hideDelay: "number"
        } ]), {
            _title: c.attr("title")
        });
        return c.attr("title", ""), d.content || (d.content = d._title), d;
    }, a.fn.tooltip.defaults = {
        position: "bottom",
        content: null,
        trackMouse: !1,
        deltaX: 0,
        deltaY: 0,
        showEvent: "mouseenter",
        hideEvent: "mouseleave",
        showDelay: 200,
        hideDelay: 100,
        onShow: function(a) {},
        onHide: function(a) {},
        onUpdate: function(a) {},
        onPosition: function(a, b) {},
        onDestroy: function() {}
    };
}(jQuery), function($) {
    function init(a) {
        $(a).addClass("validatebox-text");
    }
    function destroyBox(a) {
        var b = $.data(a, "validatebox");
        b.validating = !1, b.timer && clearTimeout(b.timer), $(a).tooltip("destroy"), $(a).unbind(), 
        $(a).remove();
    }
    function bindEvents(a) {
        var b = $.data(a, "validatebox").options, c = $(a);
        if (c.unbind(".validatebox"), !b.novalidate && !c.is(":disabled")) for (var d in b.events) $(a).bind(d + ".validatebox", {
            target: a
        }, b.events[d]), "focus" == d && $.event.special.focus.trigger && ($.event.special.focus._trigger = $.event.special.focus.trigger, 
        $.event.special.focus.trigger = null);
    }
    function focusEventHandler(a) {
        var b = a.data.target, c = $.data(b, "validatebox"), d = $(b);
        c.validating = !0, c.value = void 0, function() {
            c.validating && b.parentElement && (c.value != d.val() ? (c.value = d.val(), c.timer && clearTimeout(c.timer), 
            c.timer = setTimeout(function() {
                $(b).validatebox("validate");
            }, c.options.delay)) : fixTipPosition(b), setTimeout(arguments.callee, 200));
        }();
    }
    function blurEventHandler(a) {
        var b = a.data.target, c = $.data(b, "validatebox");
        c.timer && (clearTimeout(c.timer), c.timer = void 0), c.validating = !1, hideTip(b);
    }
    function mouseenterEventHandler(a) {
        var b = a.data.target;
        $(b).hasClass("validatebox-invalid") && showTip(b);
    }
    function mouseleaveEventHandler(a) {
        var b = a.data.target, c = $.data(b, "validatebox");
        c.validating || hideTip(b);
    }
    function showTip(a) {
        var b = $.data(a, "validatebox"), c = b.options;
        "none" != c.tipPosition && ($(a).tooltip($.extend({}, c.tipOptions, {
            content: b.message,
            position: c.tipPosition,
            deltaX: c.deltaX
        })).tooltip("show"), b.tip = !0);
    }
    function fixTipPosition(a) {
        var b = $.data(a, "validatebox");
        b && b.tip && $(a).tooltip("reposition");
    }
    function hideTip(a) {
        var b = $.data(a, "validatebox");
        b.tip = !1, $(a).tooltip("hide");
    }
    function validate(target) {
        function setTipMessage(a) {
            state.message = a;
        }
        function doValidate(vtype, vparam) {
            var value = box.val(), result = /([a-zA-Z_]+)(.*)/.exec(vtype), rule = opts.rules[result[1]];
            if (rule && value) {
                var param = vparam || opts.validParams || eval(result[2]);
                if (!rule.validator.call(target, value, param)) {
                    box.addClass("validatebox-invalid");
                    var message = rule.message;
                    if (param) for (var i = 0; i < param.length; i++) message = message.replace(new RegExp("\\{" + i + "\\}", "g"), param[i]);
                    return setTipMessage(opts.invalidMessage || message), state.validating && showTip(target), 
                    !1;
                }
            }
            return !0;
        }
        function _validate() {
            if (box.removeClass("validatebox-invalid"), hideTip(target), opts.novalidate || box.is(":disabled")) return !0;
            if (opts.required && "" == box.val()) return box.addClass("validatebox-invalid"), 
            setTipMessage(opts.missingMessage), state.validating && showTip(target), !1;
            if (opts.validType) if ($.isArray(opts.validType)) {
                for (var a = 0; a < opts.validType.length; a++) if (!doValidate(opts.validType[a])) return !1;
            } else if ("string" == typeof opts.validType) {
                if (!doValidate(opts.validType)) return !1;
            } else for (var b in opts.validType) {
                var c = opts.validType[b];
                if (!doValidate(b, c)) return !1;
            }
            return !0;
        }
        var state = $.data(target, "validatebox"), opts = state.options, box = $(target);
        opts.onBeforeValidate.call(target);
        var result = _validate();
        return opts.onValidate.call(target, result), result;
    }
    function setValidation(a, b) {
        var c = $.data(a, "validatebox").options;
        void 0 != b && (c.novalidate = b), c.novalidate && ($(a).removeClass("validatebox-invalid"), 
        hideTip(a)), bindEvents(a);
    }
    $.fn.validatebox = function(a, b) {
        if ("string" != typeof a) return a = a || {}, this.each(function() {
            var b = $.data(this, "validatebox");
            b ? $.extend(b.options, a) : (init(this), $.data(this, "validatebox", {
                options: $.extend({}, $.fn.validatebox.defaults, $.fn.validatebox.parseOptions(this), a)
            })), setValidation(this);
        });
        var c = $.fn.validatebox.methods[a];
        return c ? c(this, b) : void 0;
    }, $.fn.validatebox.methods = {
        options: function(a) {
            return $.data(a[0], "validatebox").options;
        },
        destroy: function(a) {
            return a.each(function() {
                destroyBox(this);
            });
        },
        validate: function(a) {
            return a.each(function() {
                validate(this);
            });
        },
        isValid: function(a) {
            return validate(a[0]);
        },
        enableValidation: function(a) {
            return a.each(function() {
                setValidation(this, !1);
            });
        },
        disableValidation: function(a) {
            return a.each(function() {
                setValidation(this, !0);
            });
        }
    }, $.fn.validatebox.parseOptions = function(a) {
        var b = $(a);
        return $.extend({}, $.parser.parseOptions(a, [ "validType", "missingMessage", "invalidMessage", "tipPosition", {
            delay: "number",
            deltaX: "number"
        } ]), {
            required: b.attr("required") ? !0 : void 0,
            novalidate: void 0 != b.attr("novalidate") ? !0 : void 0
        });
    }, $.fn.validatebox.defaults = {
        required: !1,
        validType: null,
        validParams: null,
        delay: 200,
        missingMessage: "This field is required.",
        invalidMessage: null,
        tipPosition: "right",
        deltaX: 0,
        novalidate: !1,
        events: {
            focus: focusEventHandler,
            blur: blurEventHandler,
            mouseenter: mouseenterEventHandler,
            mouseleave: mouseleaveEventHandler,
            click: function(a) {
                var b = $(a.data.target);
                b.is(":focus") || b.trigger("focus");
            }
        },
        tipOptions: {
            showEvent: "none",
            hideEvent: "none",
            showDelay: 0,
            hideDelay: 0,
            zIndex: "",
            onShow: function() {
                $(this).tooltip("tip").css({
                    color: "#000",
                    borderColor: "#CC9933",
                    backgroundColor: "#FFFFCC"
                });
            },
            onHide: function() {
                $(this).tooltip("destroy");
            }
        },
        rules: {
            email: {
                validator: function(a) {
                    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a);
                },
                message: "Please enter a valid email address."
            },
            url: {
                validator: function(a) {
                    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a);
                },
                message: "Please enter a valid URL."
            },
            length: {
                validator: function(a, b) {
                    var c = $.trim(a).length;
                    return c >= b[0] && c <= b[1];
                },
                message: "Please enter a value between {0} and {1}."
            },
            remote: {
                validator: function(a, b) {
                    var c = {};
                    c[b[1]] = a;
                    var d = $.ajax({
                        url: b[0],
                        dataType: "json",
                        data: c,
                        async: !1,
                        cache: !1,
                        type: "post"
                    }).responseText;
                    return "true" == d;
                },
                message: "Please fix this field."
            }
        },
        onBeforeValidate: function() {},
        onValidate: function(a) {}
    };
}(jQuery), function(a) {
    function b(b) {
        a(b).addClass("textbox-f").hide();
        var c = a('<span class="textbox"><input class="textbox-text" autocomplete="off"><input type="hidden" class="textbox-value"></span>').insertAfter(b), d = a(b).attr("name");
        return d && (c.find("input.textbox-value").attr("name", d), a(b).removeAttr("name").attr("textboxName", d)), 
        c;
    }
    function c(b) {
        var c = a.data(b, "textbox"), d = c.options, e = c.textbox;
        e.find(".textbox-text").remove(), d.multiline ? a('<textarea class="textbox-text" autocomplete="off"></textarea>').prependTo(e) : a('<input type="' + d.type + '" class="textbox-text combo-text" autocomplete="off">').prependTo(e), 
        e.find(".textbox-addon").remove();
        var f = d.icons ? a.extend(!0, [], d.icons) : [];
        if (d.iconCls && f.push({
            iconCls: d.iconCls,
            disabled: !0
        }), f.length) {
            var g = a('<span class="textbox-addon"></span>').prependTo(e);
            g.addClass("textbox-addon-" + d.iconAlign);
            for (var j = 0; j < f.length; j++) g.append('<a href="javascript:void(0)" class="textbox-icon ' + f[j].iconCls + '" icon-index="' + j + '" tabindex="-1"></a>');
        }
        if (e.find(".textbox-button").remove(), d.buttonText || d.buttonIcon) {
            var k = a('<a href="javascript:void(0)" class="textbox-button"></a>').prependTo(e);
            k.addClass("textbox-button-" + d.buttonAlign).linkbutton({
                text: d.buttonText,
                iconCls: d.buttonIcon
            });
        }
        h(b, d.disabled), i(b, d.readonly);
    }
    function d(b) {
        var c = a.data(b, "textbox").textbox;
        c.find(".textbox-text").validatebox("destroy"), c.remove(), a(b).remove();
    }
    function e(b, c) {
        function d(a) {
            return (f.iconAlign == a ? m._outerWidth() : 0) + (f.buttonAlign == a ? l._outerWidth() : 0);
        }
        var e = a.data(b, "textbox"), f = e.options, g = e.textbox, h = g.parent();
        if (c && (f.width = c), isNaN(parseInt(f.width))) {
            var i = a(b).clone();
            i.css("visibility", "hidden"), i.insertAfter(b), f.width = i.outerWidth(), i.remove();
        }
        var j = g.is(":visible");
        j || g.appendTo("body");
        var k = g.find(".textbox-text"), l = g.find(".textbox-button"), m = g.find(".textbox-addon"), n = m.find(".textbox-icon");
        if (g._size(f, h), l.linkbutton("resize", {
            height: g.height()
        }), l.css({
            left: "left" == f.buttonAlign ? 0 : "",
            right: "right" == f.buttonAlign ? 0 : ""
        }), m.css({
            boxSizing: "border-box",
            left: "left" == f.iconAlign ? "left" == f.buttonAlign ? l._outerWidth() : 0 : "",
            right: "right" == f.iconAlign ? "right" == f.buttonAlign ? l._outerWidth() : 0 : ""
        }), n.css({
            width: f.iconWidth + "px",
            height: g.height() + "px"
        }), k.css({
            paddingLeft: b.style.paddingLeft || "",
            paddingRight: b.style.paddingRight || "",
            marginLeft: d("left"),
            marginRight: d("right"),
            boxSizing: "border-box"
        }), f.multiline) k.css({
            paddingTop: b.style.paddingTop || "",
            paddingBottom: b.style.paddingBottom || ""
        }), k._outerHeight(g.height()); else {
            var o = Math.floor((g.height() - k.height()) / 2);
            k.css({
                paddingTop: o + "px",
                paddingBottom: o + "px"
            });
        }
        k.css({
            width: g.width() - n.length * m.outerWidth() - l._outerWidth() + "px",
            height: g.height() + "px"
        }), j || g.insertAfter(b), f.onResize.call(b, f.width, f.height);
    }
    function f(b) {
        var c = a(b).textbox("options"), d = a(b).textbox("textbox");
        d.validatebox(a.extend({}, c, {
            deltaX: a(b).textbox("getTipX"),
            onBeforeValidate: function() {
                var b = a(this);
                b.is(":focus") || (c.oldInputValue = b.val(), b.val(c.value));
            },
            onValidate: function(b) {
                var d = a(this);
                void 0 != c.oldInputValue && (d.val(c.oldInputValue), c.oldInputValue = void 0);
                var e = d.parent();
                b ? e.removeClass("textbox-invalid") : e.addClass("textbox-invalid");
            }
        }));
    }
    function g(b) {
        var c = a.data(b, "textbox"), d = c.options, f = c.textbox, g = f.find(".textbox-text");
        if (g.attr("placeholder", d.prompt), g.unbind(".textbox"), !d.disabled && !d.readonly) {
            g.bind("blur.textbox", function(b) {
                f.hasClass("textbox-focused") && (d.value = a(this).val(), "" == d.value ? a(this).val(d.prompt).addClass("textbox-prompt") : a(this).removeClass("textbox-prompt"), 
                f.removeClass("textbox-focused"));
            }).bind("focus.textbox", function(b) {
                f.hasClass("textbox-focused") || (a(this).val() != d.value && a(this).val(d.value), 
                a(this).removeClass("textbox-prompt"), f.addClass("textbox-focused"));
            });
            for (var h in d.inputEvents) h = "keydown" == h ? navigator.userAgent.indexOf("Firefox") > 0 ? "keyup" : "keydown" : h, 
            g.on(h + ".textbox", {
                target: b
            }, d.inputEvents[h = "keyup" == h ? "keydown" : h]);
        }
        var i = f.find(".textbox-addon");
        i.unbind().bind("click", {
            target: b
        }, function(c) {
            var e = a(c.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
            if (e.length) {
                var f = parseInt(e.attr("icon-index")), g = d.icons[f];
                g && g.handler && (g.handler.call(e[0], c), d.onClickIcon.call(b, f));
            }
        }), i.find(".textbox-icon").each(function(b) {
            var c = d.icons[b], e = a(this);
            !c || c.disabled || d.disabled || d.readonly ? e.addClass("textbox-icon-disabled") : e.removeClass("textbox-icon-disabled");
        });
        var j = f.find(".textbox-button");
        j.unbind(".textbox").bind("click.textbox", function() {
            j.linkbutton("options").disabled || d.onClickButton.call(b);
        }), j.linkbutton(d.disabled || d.readonly ? "disable" : "enable"), f.unbind(".textbox").bind("_resize.textbox", function(c, d) {
            return (a(this).hasClass("easyui-fluid") || d) && e(b), !1;
        });
    }
    function h(b, c) {
        var d = a.data(b, "textbox"), e = d.options, f = d.textbox;
        c ? (e.disabled = !0, a(b).attr("disabled", "disabled"), f.addClass("textbox-disabled"), 
        f.find(".textbox-text,.textbox-value").attr("disabled", "disabled")) : (e.disabled = !1, 
        f.removeClass("textbox-disabled"), a(b).removeAttr("disabled"), f.find(".textbox-text,.textbox-value").removeAttr("disabled"));
    }
    function i(b, c) {
        var d = a.data(b, "textbox"), e = d.options;
        e.readonly = void 0 == c ? !0 : c, d.textbox.removeClass("textbox-readonly").addClass(e.readonly ? "textbox-readonly" : "");
        var f = d.textbox.find(".textbox-text");
        f.removeAttr("readonly"), (e.readonly || !e.editable) && f.attr("readonly", "readonly");
    }
    function j(b, c) {
        var d = a(b), e = d.textbox("options"), f = d.textbox("textbox");
        c = void 0 == c ? "" : String(c), d.textbox("getText") != c && f.val(c), e.value = c, 
        f.is(":focus") || (c ? f.removeClass("textbox-prompt") : f.val(e.prompt).addClass("textbox-prompt"));
    }
    a.fn.textbox = function(d, h) {
        if ("string" == typeof d) {
            var i = a.fn.textbox.methods[d];
            return i ? i(this, h) : this.each(function() {
                var b = a(this).textbox("textbox");
                b.validatebox(d, h);
            });
        }
        return d = d || {}, this.each(function() {
            var h = a.data(this, "textbox");
            h ? (a.extend(h.options, d), void 0 != d.value && (h.options.originalValue = d.value)) : (h = a.data(this, "textbox", {
                options: a.extend({}, a.fn.textbox.defaults, a.fn.textbox.parseOptions(this), d),
                textbox: b(this)
            }), h.options.originalValue = h.options.value), c(this), g(this), e(this), f(this), 
            "" != h.options.value && a(this).textbox("initValue", h.options.value);
        });
    }, a.fn.textbox.methods = {
        options: function(b) {
            return a.data(b[0], "textbox").options;
        },
        cloneFrom: function(b, c) {
            return b.each(function() {
                var b = a(this);
                if (!b.data("textbox")) {
                    a(c).data("textbox") || a(c).textbox();
                    var d = b.attr("name") || "";
                    b.addClass("textbox-f").hide(), b.removeAttr("name").attr("textboxName", d);
                    var e = a(c).next().clone().insertAfter(b);
                    e.find("input.textbox-value").attr("name", d), a.data(this, "textbox", {
                        options: a.extend(!0, {}, a(c).textbox("options")),
                        textbox: e
                    });
                    var h = a(c).textbox("button");
                    h.length && b.textbox("button").linkbutton(a.extend(!0, {}, h.linkbutton("options"))), 
                    g(this), f(this);
                }
            });
        },
        textbox: function(b) {
            return a.data(b[0], "textbox").textbox.find(".textbox-text");
        },
        button: function(b) {
            return a.data(b[0], "textbox").textbox.find(".textbox-button");
        },
        destroy: function(a) {
            return a.each(function() {
                d(this);
            });
        },
        resize: function(a, b) {
            return a.each(function() {
                e(this, b);
            });
        },
        disable: function(a) {
            return a.each(function() {
                h(this, !0), g(this);
            });
        },
        enable: function(a) {
            return a.each(function() {
                h(this, !1), g(this);
            });
        },
        readonly: function(a, b) {
            return a.each(function() {
                i(this, b), g(this);
            });
        },
        isValid: function(a) {
            return a.textbox("textbox").validatebox("isValid");
        },
        clear: function(b) {
            return b.each(function() {
                a(this).textbox("setValue", "");
            });
        },
        setText: function(b, c) {
            return b.each(function() {
                j(this, c), a(this).textbox("validate");
            });
        },
        initText: function(a, b) {
            return a.each(function() {
                j(this, b);
            });
        },
        initValue: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "textbox");
                b.options.value = "", a(this).textbox("initText", c), b.textbox.find(".textbox-value").val(c), 
                a(this).val(c);
            });
        },
        setValue: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "textbox").options, d = a(this).textbox("getValue");
                a(this).textbox("initValue", c), d != c && (b.onChange.call(this, c, d), a(this).closest("form").trigger("_change", [ this ]));
            });
        },
        getText: function(a) {
            var b = a.textbox("textbox");
            return b.is(":focus") ? b.val() : a.textbox("options").value;
        },
        getValue: function(a) {
            return a.data("textbox").textbox.find(".textbox-value").val();
        },
        reset: function(b) {
            return b.each(function() {
                var b = a(this).textbox("options");
                a(this).textbox("setValue", b.originalValue);
            });
        },
        getIcon: function(a, b) {
            return a.data("textbox").textbox.find(".textbox-icon:eq(" + b + ")");
        },
        getTipX: function(a) {
            var b = a.data("textbox"), c = b.options, d = b.textbox, e = (d.find(".textbox-text"), 
            d.find(".textbox-addon")._outerWidth()), f = d.find(".textbox-button")._outerWidth();
            return "right" == c.tipPosition ? ("right" == c.iconAlign ? e : 0) + ("right" == c.buttonAlign ? f : 0) + 1 : "left" == c.tipPosition ? ("left" == c.iconAlign ? -e : 0) + ("left" == c.buttonAlign ? -f : 0) - 1 : e / 2 * ("right" == c.iconAlign ? 1 : -1);
        }
    }, a.fn.textbox.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.fn.validatebox.parseOptions(b), a.parser.parseOptions(b, [ "prompt", "iconCls", "iconAlign", "buttonText", "buttonIcon", "buttonAlign", {
            multiline: "boolean",
            editable: "boolean",
            iconWidth: "number"
        } ]), {
            value: c.val() || void 0,
            type: c.attr("type") ? c.attr("type") : void 0,
            disabled: c.attr("disabled") ? !0 : void 0,
            readonly: c.attr("readonly") ? !0 : void 0
        });
    }, a.fn.textbox.defaults = a.extend({}, a.fn.validatebox.defaults, {
        width: "auto",
        height: 22,
        value: "",
        type: "text",
        multiline: !1,
        editable: !0,
        disabled: !1,
        readonly: !1,
        icons: [],
        iconCls: null,
        iconAlign: "right",
        iconWidth: 20,
        buttonText: "",
        buttonIcon: null,
        buttonAlign: "right",
        inputEvents: {
            blur: function(b) {
                var c = a(b.data.target), d = c.textbox("options");
                c.textbox("setValue", d.value);
            },
            keydown: function(b) {
                if (13 == b.keyCode) {
                    var c = a(b.data.target);
                    c.textbox("setValue", c.textbox("getText"));
                }
            }
        },
        onChange: function(a, b) {},
        onResize: function(a, b) {},
        onClickButton: function() {},
        onClickIcon: function(a) {}
    });
}(jQuery), function($) {
    function buildSearchBox(a) {
        function b() {
            if (f.menu) {
                e.menu = $(f.menu).menu();
                var a = e.menu.menu("options"), b = a.onClick;
                a.onClick = function(a) {
                    d(a), b.call(this, a);
                };
            } else e.menu && e.menu.menu("destroy"), e.menu = null;
        }
        function c() {
            if (e.menu) {
                var a = e.menu.children("div.menu-item:first");
                return e.menu.children("div.menu-item").each(function() {
                    var b = $.extend({}, $.parser.parseOptions(this), {
                        selected: $(this).attr("selected") ? !0 : void 0
                    });
                    return b.selected ? (a = $(this), !1) : void 0;
                }), e.menu.menu("getItem", a[0]);
            }
            return null;
        }
        function d(b) {
            b && ($(a).textbox("button").menubutton({
                text: b.text,
                iconCls: b.iconCls || null,
                menu: e.menu,
                menuAlign: f.buttonAlign,
                plain: !1
            }), e.searchbox.find("input.textbox-value").attr("name", b.name || b.text), $(a).searchbox("resize"));
        }
        var e = $.data(a, "searchbox"), f = e.options, g = $.extend(!0, [], f.icons);
        g.push({
            iconCls: "searchbox-button",
            handler: function(a) {
                var b = $(a.data.target), c = b.searchbox("options");
                c.searcher.call(a.data.target, b.searchbox("getValue"), b.searchbox("getName"));
            }
        }), b();
        var h = c();
        $(a).addClass("searchbox-f").textbox($.extend({}, f, {
            icons: g,
            buttonText: h ? h.text : ""
        })), $(a).attr("searchboxName", $(a).attr("textboxName")), e.searchbox = $(a).next(), 
        e.searchbox.addClass("searchbox"), d(h);
    }
    $.fn.searchbox = function(a, b) {
        if ("string" == typeof a) {
            var c = $.fn.searchbox.methods[a];
            return c ? c(this, b) : this.textbox(a, b);
        }
        return a = a || {}, this.each(function() {
            var b = $.data(this, "searchbox");
            b ? $.extend(b.options, a) : $.data(this, "searchbox", {
                options: $.extend({}, $.fn.searchbox.defaults, $.fn.searchbox.parseOptions(this), a)
            }), buildSearchBox(this);
        });
    }, $.fn.searchbox.methods = {
        options: function(a) {
            var b = a.textbox("options");
            return $.extend($.data(a[0], "searchbox").options, {
                width: b.width,
                value: b.value,
                originalValue: b.originalValue,
                disabled: b.disabled,
                readonly: b.readonly
            });
        },
        menu: function(a) {
            return $.data(a[0], "searchbox").menu;
        },
        getName: function(a) {
            return $.data(a[0], "searchbox").searchbox.find("input.textbox-value").attr("name");
        },
        selectName: function(a, b) {
            return a.each(function() {
                var a = $.data(this, "searchbox").menu;
                a && a.children("div.menu-item").each(function() {
                    var c = a.menu("getItem", this);
                    return c.name == b ? ($(this).triggerHandler("click"), !1) : void 0;
                });
            });
        },
        destroy: function(a) {
            return a.each(function() {
                var a = $(this).searchbox("menu");
                a && a.menu("destroy"), $(this).textbox("destroy");
            });
        }
    }, $.fn.searchbox.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.fn.textbox.parseOptions(target), $.parser.parseOptions(target, [ "menu" ]), {
            searcher: t.attr("searcher") ? eval(t.attr("searcher")) : void 0
        });
    }, $.fn.searchbox.defaults = $.extend({}, $.fn.textbox.defaults, {
        inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
            keydown: function(a) {
                if (13 == a.keyCode) {
                    a.preventDefault();
                    var b = $(a.data.target), c = b.searchbox("options");
                    return b.searchbox("setValue", $(this).val()), c.searcher.call(a.data.target, b.searchbox("getValue"), b.searchbox("getName")), 
                    !1;
                }
            }
        }),
        buttonAlign: "left",
        menu: null,
        searcher: function(a, b) {}
    });
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "combo"), f = c.options;
        c.panel || (c.panel = a('<div class="combo-panel"></div>').appendTo("body"), c.panel.panel({
            minWidth: f.panelMinWidth,
            maxWidth: f.panelMaxWidth,
            minHeight: f.panelMinHeight,
            maxHeight: f.panelMaxHeight,
            searchBox: f.searchBox,
            doSize: !1,
            closed: !0,
            cls: "combo-p",
            style: {
                position: "absolute",
                zIndex: 10
            },
            onOpen: function() {
                var b = a(this).panel("options").comboTarget, c = a.data(b, "combo");
                c && c.options.onShowPanel.call(b);
            },
            onBeforeClose: function() {
                e(this);
            },
            onClose: function() {
                var b = a(this).panel("options").comboTarget, c = a(b).data("combo");
                c && c.options.onHidePanel.call(b);
            }
        }));
        var g = a.extend(!0, [], f.icons);
        f.hasDownArrow && g.push({
            iconCls: "combo-arrow",
            handler: function(a) {
                d(a.data.target);
            }
        }), a(b).addClass("combo-f").textbox(a.extend({}, f, {
            icons: g
        })), a(b).attr("comboName", a(b).attr("textboxName")), c.combo = a(b).next(), c.combo.addClass("combo");
    }
    function c(b) {
        var c = a.data(b, "combo"), d = c.options, e = c.panel;
        e.is(":visible") && e.panel("close"), d.cloned || e.panel("destroy"), a(b).textbox("destroy");
    }
    function d(b) {
        var c = a.data(b, "combo"), d = c.panel, e = c.options;
        if (!e.searchBox && d.is(":visible")) j(b); else {
            var f = a(b).closest("div.combo-panel");
            a("div.combo-panel:visible").not(d).not(f).panel("close"), a(b).combo("showPanel");
        }
        e.searchBox || a(b).combo("textbox").focus();
    }
    function e(b) {
        a(b).find(".combo-f").each(function() {
            var b = a(this).combo("panel");
            b.is(":visible") && b.panel("close");
        });
    }
    function f(b) {
        var c = b.data.target, e = a.data(c, "combo"), f = e.options, g = e.panel;
        if (f.editable) {
            var h = a(c).closest("div.combo-panel");
            a("div.combo-panel:visible").not(g).not(h).panel("close");
        } else d(c);
    }
    function g(b) {
        var c = b.data.target, d = a.data(c, "combo"), e = d.options, f = d.panel;
        e.autoShowPanel && f.is(":hidden") && a(c).combo("showPanel");
    }
    function h(b) {
        var c = b.data.target, d = a(c), e = d.data("combo"), f = d.combo("options");
        switch (b.keyCode) {
          case 38:
            f.keyHandler.up.call(c, b);
            break;

          case 40:
            f.keyHandler.down.call(c, b);
            break;

          case 37:
            f.keyHandler.left.call(c, b);
            break;

          case 39:
            f.keyHandler.right.call(c, b);
            break;

          case 13:
            return b.preventDefault(), f.keyHandler.enter.call(c, b), !1;

          case 9:
          case 27:
            j(c);
            break;

          default:
            f.editable && (e.timer && clearTimeout(e.timer), e.timer = setTimeout(function() {
                var g = d.combo("getText"), h = a.trim(g).replace(/['"]/g, "");
                d.combo("setText", h), e.previousText != g && (e.previousText = g, d.combo("showPanel"), 
                f.keyHandler.query.call(c, g, b), d.combo("validate"));
            }, f.delay));
        }
    }
    function i(b) {
        function c() {
            var b = f.offset().left;
            return "right" == h.panelAlign && (b += f._outerWidth() - g._outerWidth()), b + g._outerWidth() > a(window)._outerWidth() + a(document).scrollLeft() && (b = a(window)._outerWidth() + a(document).scrollLeft() - g._outerWidth()), 
            0 > b && (b = 0), b;
        }
        function d() {
            var b = f.offset().top + f._outerHeight();
            return b + g._outerHeight() > a(window)._outerHeight() + a(document).scrollTop() && (b = f.offset().top - g._outerHeight()), 
            b < a(document).scrollTop() && (b = f.offset().top + f._outerHeight()), b;
        }
        var e = a.data(b, "combo"), f = e.combo, g = e.panel, h = a(b).combo("options"), i = g.panel("options");
        i.comboTarget = b, i.closed && (g.panel("panel").show().css({
            zIndex: a.fn.menu ? a.fn.menu.defaults.zIndex++ : a.fn.window.defaults.zIndex++,
            left: -999999
        }), g.panel("resize", {
            width: h.panelWidth ? h.panelWidth : f._outerWidth(),
            height: h.panelHeight,
            maxHeight: h.panelMaxHeight
        }), g.panel("panel").hide(), g.panel("open"), h.searchBox && setTimeout(function() {
            a(b).combo("panel").find(".panel-search .ipt")[0].focus();
        }, 200)), function(b) {
            b.movePanel = function() {
                b.is(":visible") && b.panel("move", {
                    left: c(),
                    top: d()
                });
            }, b.movePanel(), a(window).on("resize.combo", b.movePanel);
        }(g);
    }
    function j(b) {
        var c = a.data(b, "combo").panel;
        c.panel("close"), a(window).off("resize.combo", c.movePanel);
    }
    function k(b, c) {
        var d = a.data(b, "combo"), e = a(b).textbox("getText");
        e != c && (a(b).textbox("setText", c), d.previousText = c);
    }
    function l(b) {
        var c = [], d = a.data(b, "combo").combo;
        return d.find(".textbox-value").each(function() {
            c.push(a(this).val());
        }), c;
    }
    function m(b, c) {
        var d = a.data(b, "combo"), e = d.options, f = d.combo;
        a.isArray(c) || (c = c.split(e.separator));
        var g = l(b);
        f.find(".textbox-value").remove();
        for (var h = a(b).attr("textboxName") || "", i = 0; i < c.length; i++) {
            var j = a('<input type="hidden" class="textbox-value">').appendTo(f);
            j.attr("name", h), e.disabled && j.attr("disabled", "disabled"), j.val(c[i]);
        }
        var k = function() {
            if (g.length != c.length) return !0;
            var b = a.extend(!0, [], g), d = a.extend(!0, [], c);
            b.sort(), d.sort();
            for (var e = 0; e < b.length; e++) if (b[e] != d[e]) return !0;
            return !1;
        }();
        k && (e.multiple ? e.onChange.call(b, c, g) : e.onChange.call(b, c[0], g[0]), a(b).closest("form").trigger("_change", [ b ]));
    }
    function n(a) {
        var b = l(a);
        return b[0];
    }
    function o(a, b) {
        m(a, [ b ]);
    }
    function p(b) {
        var c = a.data(b, "combo").options, d = c.onChange;
        c.onChange = function() {}, c.multiple ? m(b, c.value ? c.value : []) : o(b, c.value), 
        c.onChange = d;
    }
    a(function() {
        a(document).unbind(".combo").bind("mousedown.combo mousewheel.combo", function(b) {
            var c = a(b.target).closest("span.combo,div.combo-p,div.menu");
            return c.length ? void e(c) : void a("body>div.combo-p>div.combo-panel:visible").panel("close");
        });
    }), a.fn.combo = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.combo.methods[c];
            return e ? e(this, d) : this.textbox(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "combo");
            d ? (a.extend(d.options, c), void 0 != c.value && (d.options.originalValue = c.value)) : (d = a.data(this, "combo", {
                options: a.extend({}, a.fn.combo.defaults, a.fn.combo.parseOptions(this), c),
                previousText: ""
            }), d.options.originalValue = d.options.value), b(this), p(this);
        });
    }, a.fn.combo.methods = {
        options: function(b) {
            var c = b.textbox("options");
            return a.extend(a.data(b[0], "combo").options, {
                width: c.width,
                height: c.height,
                disabled: c.disabled,
                readonly: c.readonly
            });
        },
        cloneFrom: function(b, c) {
            return b.each(function() {
                a(this).textbox("cloneFrom", c), a.data(this, "combo", {
                    options: a.extend(!0, {
                        cloned: !0
                    }, a(c).combo("options")),
                    combo: a(this).next(),
                    panel: a(c).combo("panel")
                }), a(this).addClass("combo-f").attr("comboName", a(this).attr("textboxName"));
            });
        },
        panel: function(b) {
            return a.data(b[0], "combo").panel;
        },
        destroy: function(a) {
            return a.each(function() {
                c(this);
            });
        },
        showPanel: function(a) {
            return a.each(function() {
                i(this);
            });
        },
        hidePanel: function(a) {
            return a.each(function() {
                j(this);
            });
        },
        clear: function(b) {
            return b.each(function() {
                a(this).textbox("initValue", "");
                var b = a.data(this, "combo").options;
                b.multiple ? a(this).combo("setValues", []) : a(this).combo("setValue", "");
            });
        },
        reset: function(b) {
            return b.each(function() {
                var b = a.data(this, "combo").options;
                b.multiple ? a(this).combo("setValues", b.originalValue) : a(this).combo("setValue", b.originalValue);
            });
        },
        setText: function(a, b) {
            return a.each(function() {
                k(this, b);
            });
        },
        getValues: function(a) {
            return l(a[0]);
        },
        setValues: function(b, c) {
            return b.each(function() {
                m(this, c);
                var b = a.data(this, "combo").options;
                a(this).next(".combo").find(".combo-value").attr("defaultValue", b.originalValue);
            });
        },
        getValue: function(a) {
            return n(a[0]);
        },
        setValue: function(a, b) {
            return a.each(function() {
                o(this, b);
            });
        }
    }, a.fn.combo.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.fn.textbox.parseOptions(b), a.parser.parseOptions(b, [ "separator", "panelAlign", {
            panelWidth: "number",
            hasDownArrow: "boolean",
            delay: "number",
            selectOnNavigation: "boolean"
        }, {
            panelMinWidth: "number",
            panelMaxWidth: "number",
            panelMinHeight: "number",
            panelMaxHeight: "number"
        } ]), {
            panelHeight: "auto" == c.attr("panelHeight") ? "auto" : parseInt(c.attr("panelHeight")) || void 0,
            multiple: c.attr("multiple") ? !0 : void 0
        });
    }, a.fn.combo.defaults = a.extend({}, a.fn.textbox.defaults, {
        inputEvents: {
            focus: g,
            click: f,
            keydown: h,
            paste: h,
            drop: h
        },
        panelWidth: null,
        panelHeight: "auto",
        panelMinWidth: null,
        panelMaxWidth: null,
        panelMinHeight: null,
        panelMaxHeight: null,
        panelAlign: "left",
        multiple: !1,
        selectOnNavigation: !0,
        separator: ",",
        hasDownArrow: !0,
        delay: 200,
        autoShowPanel: !0,
        keyHandler: {
            up: function(a) {},
            down: function(a) {},
            left: function(a) {},
            right: function(a) {},
            enter: function(a) {},
            query: function(a, b) {}
        },
        onShowPanel: function() {},
        onHidePanel: function() {},
        onChange: function(a, b) {}
    });
}(jQuery), function(a) {
    function b(b, c) {
        for (var d = a.data(b, "combobox"), e = d.options, f = d.data, g = 0; g < f.length; g++) if (f[g][e.valueField] == c) return g;
        return -1;
    }
    function c(b, c) {
        var d = a.data(b, "combobox").options, e = a(b).combo("panel"), f = d.finder.getEl(b, c);
        if (f.length) if (f.position().top <= 0) {
            var g = e.scrollTop() + f.position().top;
            e.scrollTop(g);
        } else if (f.position().top + f.outerHeight() > e.height()) {
            var g = e.scrollTop() + f.position().top + f.outerHeight() - e.height();
            e.scrollTop(g);
        }
    }
    function d(b, d) {
        var f = a.data(b, "combobox").options, g = a(b).combobox("panel"), h = g.children("div.combobox-item-hover");
        h.length || (h = g.children("div.combobox-item-selected")), h.removeClass("combobox-item-hover");
        var i = "div.combobox-item:visible:not(.combobox-item-disabled):first", j = "div.combobox-item:visible:not(.combobox-item-disabled):last";
        if (h.length ? "next" == d ? (h = h.nextAll(i), h.length || (h = g.children(i))) : (h = h.prevAll(i), 
        h.length || (h = g.children(j))) : h = g.children("next" == d ? i : j), h.length) {
            h.addClass("combobox-item-hover");
            var k = f.finder.getRow(b, h);
            k && (c(b, k[f.valueField]), f.selectOnNavigation && e(b, k[f.valueField]));
        }
    }
    function e(b, c) {
        var d = a.data(b, "combobox").options, e = a(b).combo("getValues");
        -1 == a.inArray(c + "", e) && (d.multiple ? e.push(c) : e = [ c ], g(b, e), d.onSelect.call(b, d.finder.getRow(b, c)));
    }
    function f(b, c) {
        var d = a.data(b, "combobox").options, e = a(b).combo("getValues"), f = a.inArray(c + "", e);
        f >= 0 && (e.splice(f, 1), g(b, e), d.onUnselect.call(b, d.finder.getRow(b, c)));
    }
    function g(b, c, d) {
        var e = a.data(b, "combobox").options, f = a(b).combo("panel");
        a.isArray(c) || (c = c.split(e.separator)), f.find("div.combobox-item-selected").removeClass("combobox-item-selected");
        for (var g = [], h = [], i = 0; i < c.length; i++) {
            var j = c[i], k = j;
            e.finder.getEl(b, j).addClass("combobox-item-selected");
            var l = e.finder.getRow(b, j);
            l && (k = l[e.textField]), g.push(j), h.push(k);
        }
        d || a(b).combo("setText", h.join(e.separator)), a(b).combo("setValues", g);
    }
    function h(b, c, d) {
        var e = a.data(b, "combobox"), f = e.options;
        e.data = f.loadFilter.call(b, c), e.groups = [], c = e.data;
        for (var h = a(b).combobox("getValues"), i = [], j = void 0, k = 0; k < c.length; k++) {
            var l = c[k], m = l[f.valueField] + "", n = l[f.textField], o = l[f.groupField];
            o ? j != o && (j = o, e.groups.push(o), i.push('<div id="' + (e.groupIdPrefix + "_" + (e.groups.length - 1)) + '" class="combobox-group">'), 
            i.push(f.groupFormatter ? f.groupFormatter.call(b, o) : o), i.push("</div>")) : j = void 0;
            var p = "combobox-item" + (l.disabled ? " combobox-item-disabled" : "") + (o ? " combobox-gitem" : "");
            i.push('<div id="' + (e.itemIdPrefix + "_" + k) + '" class="' + p + '">'), i.push(f.formatter ? f.formatter.call(b, l) : n), 
            i.push("</div>"), l.selected && -1 == a.inArray(m, h) && h.push(m);
        }
        a(b).combo("panel").html(i.join("")), f.multiple ? g(b, h, d) : g(b, h.length ? [ h[h.length - 1] ] : [], d), 
        f.onLoadSuccess.call(b, c);
    }
    function i(b, c, d, e) {
        var f = a.data(b, "combobox").options;
        c && (f.url = c), d = a.extend({}, f.queryParams, d || {}), 0 != f.onBeforeLoad.call(b, d) && f.loader.call(b, d, function(a) {
            h(b, a, e);
        }, function() {
            f.onLoadError.apply(this, arguments);
        });
    }
    function j(b, c) {
        function d(a) {
            g(b, f.multiple ? c ? a : [] : a, !0);
        }
        var e = a.data(b, "combobox"), f = e.options, h = f.multiple ? c.split(f.separator) : [ c ];
        if ("remote" == f.mode) d(h), i(b, null, {
            q: c
        }, !0); else {
            var j = a(b).combo("panel");
            j.find("div.combobox-item-selected,div.combobox-item-hover").removeClass("combobox-item-selected combobox-item-hover"), 
            j.find("div.combobox-item,div.combobox-group").hide();
            var k = e.data, l = [];
            a.map(h, function(c) {
                c = a.trim(c);
                for (var d = c, g = void 0, h = 0; h < k.length; h++) {
                    var i = k[h];
                    if (f.filter.call(b, c, i)) {
                        var j = i[f.valueField], m = i[f.textField], n = i[f.groupField], o = f.finder.getEl(b, j).show();
                        m.toLowerCase() == c.toLowerCase() && (d = j, o.addClass("combobox-item-selected"), 
                        f.onSelect.call(b, i)), f.groupField && g != n && (a("#" + e.groupIdPrefix + "_" + a.inArray(n, e.groups)).show(), 
                        g = n);
                    }
                }
                l.push(d);
            }), d(l);
        }
    }
    function k(c) {
        var d = a(c), e = d.combobox("options"), f = d.combobox("panel"), g = f.children("div.combobox-item-hover");
        if (g.length) {
            var h = e.finder.getRow(c, g), i = h[e.valueField];
            e.multiple && g.hasClass("combobox-item-selected") ? d.combobox("unselect", i) : d.combobox("select", i);
        }
        var j = [];
        a.map(d.combobox("getValues"), function(a) {
            b(c, a) >= 0 && j.push(a);
        }), d.combobox("setValues", j), e.multiple || d.combobox("hidePanel");
    }
    function l(b) {
        var d = a.data(b, "combobox"), g = d.options;
        m++, d.itemIdPrefix = "_easyui_combobox_i" + m, d.groupIdPrefix = "_easyui_combobox_g" + m, 
        a(b).addClass("combobox-f"), a(b).combo(a.extend({}, g, {
            onShowPanel: function() {
                a(b).combo("panel").find("div.combobox-item:hidden,div.combobox-group:hidden").show(), 
                c(b, a(b).combobox("getValue")), g.onShowPanel.call(b);
            }
        })), a(b).combo("panel").unbind().bind("mouseover", function(b) {
            a(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
            var c = a(b.target).closest("div.combobox-item");
            c.hasClass("combobox-item-disabled") || c.addClass("combobox-item-hover"), b.stopPropagation();
        }).bind("mouseout", function(b) {
            a(b.target).closest("div.combobox-item").removeClass("combobox-item-hover"), b.stopPropagation();
        }).bind("click", function(c) {
            b.event = {
                type: c.type
            };
            var d = a(c.target).closest("div.combobox-item");
            if (d.length && !d.hasClass("combobox-item-disabled")) {
                var h = g.finder.getRow(b, d);
                if (h) {
                    var i = h[g.valueField];
                    g.multiple ? d.hasClass("combobox-item-selected") ? f(b, i) : e(b, i) : (e(b, i), 
                    a(b).combo("hidePanel")), c.stopPropagation();
                }
            }
        });
    }
    var m = 0;
    a.fn.combobox = function(b, c) {
        if ("string" == typeof b) {
            var d = a.fn.combobox.methods[b];
            return d ? d(this, c) : this.combo(b, c);
        }
        return b = b || {}, this.each(function() {
            var c = a.data(this, "combobox");
            if (c ? a.extend(c.options, b) : c = a.data(this, "combobox", {
                options: a.extend({}, a.fn.combobox.defaults, a.fn.combobox.parseOptions(this), b),
                data: []
            }), l(this), c.options.data) c.options.data = a.extend(!0, [], c.options.data), 
            h(this, c.options.data); else {
                var d = a.fn.combobox.parseData(this);
                d.length && h(this, d);
            }
            i(this);
        });
    }, a.fn.combobox.methods = {
        options: function(b) {
            var c = b.combo("options");
            return a.extend(a.data(b[0], "combobox").options, {
                width: c.width,
                height: c.height,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        },
        getData: function(b) {
            return a.data(b[0], "combobox").data;
        },
        setValues: function(a, b) {
            return a.each(function() {
                g(this, b);
            });
        },
        setValue: function(b, c) {
            return b.each(function() {
                g(this, [ c ]), a(this).combo("options").originalValue = [ c ], a(this).next(".combo").find(".combo-value").attr("defaultValue", [ c ]);
            });
        },
        clear: function(b) {
            return b.each(function() {
                a(this).combo("clear");
                var b = a(this).combo("panel");
                b.find("div.combobox-item-selected").removeClass("combobox-item-selected");
            });
        },
        reset: function(b) {
            return b.each(function() {
                var b = a(this).combobox("options");
                b.multiple ? a(this).combobox("setValues", b.originalValue) : a(this).combobox("setValue", b.originalValue);
            });
        },
        loadData: function(a, b) {
            return a.each(function() {
                h(this, b);
            });
        },
        reload: function(b, c) {
            return b.each(function() {
                if ("string" == typeof c) i(this, c); else {
                    if (c) {
                        var b = a(this).combobox("options");
                        b.queryParams = c;
                    }
                    i(this);
                }
            });
        },
        select: function(a, b) {
            return a.each(function() {
                e(this, b);
            });
        },
        unselect: function(a, b) {
            return a.each(function() {
                f(this, b);
            });
        }
    }, a.fn.combobox.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.fn.combo.parseOptions(b), a.parser.parseOptions(b, [ "valueField", "textField", "groupField", "mode", "method", "url" ]));
    }, a.fn.combobox.parseData = function(b) {
        function c(b, c) {
            var f = a(b), g = {};
            g[e.valueField] = void 0 != f.attr("value") ? f.attr("value") : f.text(), g[e.textField] = f.text(), 
            g.selected = f.is(":selected"), g.disabled = f.is(":disabled"), c && (e.groupField = e.groupField || "group", 
            g[e.groupField] = c), d.push(g);
        }
        var d = [], e = a(b).combobox("options");
        return a(b).children().each(function() {
            if ("optgroup" == this.tagName.toLowerCase()) {
                var b = a(this).attr("label");
                a(this).children().each(function() {
                    c(this, b);
                });
            } else c(this);
        }), d;
    }, a.fn.combobox.defaults = a.extend({}, a.fn.combo.defaults, {
        valueField: "value",
        textField: "text",
        groupField: null,
        groupFormatter: function(a) {
            return a;
        },
        mode: "local",
        method: "post",
        url: null,
        data: null,
        queryParams: {},
        prompt: "请选择...",
        keyHandler: {
            up: function(a) {
                this.event = {
                    type: a.type
                }, d(this, "prev"), a.preventDefault();
            },
            down: function(a) {
                this.event = {
                    type: a.type
                }, d(this, "next"), a.preventDefault();
            },
            left: function(a) {},
            right: function(a) {},
            enter: function(a) {
                k(this);
            },
            query: function(a, b) {
                j(this, a);
            }
        },
        filter: function(b, c) {
            var d = a(this).combobox("options");
            return c[d.textField].toLowerCase().indexOf(b.toLowerCase()) > -1;
        },
        formatter: function(b) {
            var c = a(this).combobox("options");
            return b[c.textField];
        },
        loader: function(b, c, d) {
            var e = a(this).combobox("options");
            return e.url ? void a.ajax({
                type: e.method,
                url: e.url,
                data: b,
                dataType: "json",
                success: function(a) {
                    c(a);
                },
                error: function() {
                    d.apply(this, arguments);
                }
            }) : !1;
        },
        loadFilter: function(a) {
            return a;
        },
        finder: {
            getEl: function(c, d) {
                var e = b(c, d), f = a.data(c, "combobox").itemIdPrefix + "_" + e;
                return a("#" + f);
            },
            getRow: function(c, d) {
                var e = a.data(c, "combobox"), f = d instanceof jQuery ? d.attr("id").substr(e.itemIdPrefix.length + 1) : b(c, d);
                return e.data[parseInt(f)];
            }
        },
        onBeforeLoad: function(a) {},
        onLoadSuccess: function() {},
        onLoadError: function() {},
        onSelect: function(a) {},
        onUnselect: function(a) {}
    });
}(jQuery), function(a) {
    function b(b) {
        var d = a.data(b, "spinner"), e = d.options, f = a.extend(!0, [], e.icons);
        f.push({
            iconCls: "spinner-arrow",
            handler: function(a) {
                c(a);
            }
        }), a(b).addClass("spinner-f").textbox(a.extend({}, e, {
            icons: f
        }));
        var g = a(b).textbox("getIcon", f.length - 1);
        g.append('<a href="javascript:void(0)" class="spinner-arrow-up" tabindex="-1"></a>'), 
        g.append('<a href="javascript:void(0)" class="spinner-arrow-down" tabindex="-1"></a>'), 
        a(b).attr("spinnerName", a(b).attr("textboxName")), d.spinner = a(b).next(), d.spinner.addClass("spinner");
    }
    function c(b) {
        var c = b.data.target, d = a(c).spinner("options"), e = a(b.target).closest("a.spinner-arrow-up");
        e.length && (d.spin.call(c, !1), d.onSpinUp.call(c), a(c).spinner("validate"));
        var f = a(b.target).closest("a.spinner-arrow-down");
        f.length && (d.spin.call(c, !0), d.onSpinDown.call(c), a(c).spinner("validate"));
    }
    a.fn.spinner = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.spinner.methods[c];
            return e ? e(this, d) : this.textbox(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "spinner");
            d ? a.extend(d.options, c) : d = a.data(this, "spinner", {
                options: a.extend({}, a.fn.spinner.defaults, a.fn.spinner.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.spinner.methods = {
        options: function(b) {
            var c = b.textbox("options");
            return a.extend(a.data(b[0], "spinner").options, {
                width: c.width,
                value: c.value,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        }
    }, a.fn.spinner.parseOptions = function(b) {
        return a.extend({}, a.fn.textbox.parseOptions(b), a.parser.parseOptions(b, [ "min", "max", {
            increment: "number"
        } ]));
    }, a.fn.spinner.defaults = a.extend({}, a.fn.textbox.defaults, {
        min: null,
        max: null,
        increment: 1,
        spin: function(a) {},
        onSpinUp: function() {},
        onSpinDown: function() {}
    });
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b.data.target, "draggable"), d = c.options, e = c.proxy, f = b.data, g = f.startLeft + b.pageX - f.startX, h = f.startTop + b.pageY - f.startY;
        e && (e.parent()[0] == document.body ? (g = null != d.deltaX && void 0 != d.deltaX ? b.pageX + d.deltaX : b.pageX - b.data.offsetWidth, 
        h = null != d.deltaY && void 0 != d.deltaY ? b.pageY + d.deltaY : b.pageY - b.data.offsetHeight) : (null != d.deltaX && void 0 != d.deltaX && (g += b.data.offsetWidth + d.deltaX), 
        null != d.deltaY && void 0 != d.deltaY && (h += b.data.offsetHeight + d.deltaY))), 
        b.data.parent != document.body && (g += a(b.data.parent).scrollLeft(), h += a(b.data.parent).scrollTop()), 
        "h" == d.axis ? f.left = g : "v" == d.axis ? f.top = h : (f.left = g, f.top = h);
    }
    function c(b) {
        var c = a.data(b.data.target, "draggable"), d = c.options, e = c.proxy;
        e || (e = a(b.data.target)), e.css({
            left: b.data.left,
            top: b.data.top
        }), a("body").css("cursor", d.cursor);
    }
    function d(d) {
        if (!a.fn.draggable.isDragging) return !1;
        var e = a.data(d.data.target, "draggable"), f = e.options, g = a(".droppable").filter(function() {
            return d.data.target != this;
        }).filter(function() {
            var b = a.data(this, "droppable").options.accept;
            return b ? a(b).filter(function() {
                return this == d.data.target;
            }).length > 0 : !0;
        });
        e.droppables = g;
        var h = e.proxy;
        return h || (f.proxy ? (h = "clone" == f.proxy ? a(d.data.target).clone().insertAfter(d.data.target) : f.proxy.call(d.data.target, d.data.target), 
        e.proxy = h) : h = a(d.data.target)), h.css("position", "absolute"), b(d), c(d), 
        f.onStartDrag.call(d.data.target, d), !1;
    }
    function e(d) {
        if (!a.fn.draggable.isDragging) return !1;
        var e = a.data(d.data.target, "draggable");
        b(d), 0 != e.options.onDrag.call(d.data.target, d) && c(d);
        var f = d.data.target;
        return e.droppables.each(function() {
            var b = a(this);
            if (!b.droppable("options").disabled) {
                var c = b.offset();
                d.pageX > c.left && d.pageX < c.left + b.outerWidth() && d.pageY > c.top && d.pageY < c.top + b.outerHeight() ? (this.entered || (a(this).trigger("_dragenter", [ f ]), 
                this.entered = !0), a(this).trigger("_dragover", [ f ])) : this.entered && (a(this).trigger("_dragleave", [ f ]), 
                this.entered = !1);
            }
        }), !1;
    }
    function f(b) {
        function c() {
            h && h.remove(), f.proxy = null;
        }
        function d() {
            var d = !1;
            return f.droppables.each(function() {
                var e = a(this);
                if (!e.droppable("options").disabled) {
                    var f = e.offset();
                    return b.pageX > f.left && b.pageX < f.left + e.outerWidth() && b.pageY > f.top && b.pageY < f.top + e.outerHeight() ? (i.revert && a(b.data.target).css({
                        position: b.data.startPosition,
                        left: b.data.startLeft,
                        top: b.data.startTop
                    }), a(this).trigger("_drop", [ b.data.target ]), c(), d = !0, this.entered = !1, 
                    !1) : void 0;
                }
            }), d || i.revert || c(), d;
        }
        if (!a.fn.draggable.isDragging) return g(), !1;
        e(b);
        var f = a.data(b.data.target, "draggable"), h = f.proxy, i = f.options;
        if (i.revert) if (1 == d()) a(b.data.target).css({
            position: b.data.startPosition,
            left: b.data.startLeft,
            top: b.data.startTop
        }); else if (h) {
            var j, k;
            h.parent()[0] == document.body ? (j = b.data.startX - b.data.offsetWidth, k = b.data.startY - b.data.offsetHeight) : (j = b.data.startLeft, 
            k = b.data.startTop), h.animate({
                left: j,
                top: k
            }, function() {
                c();
            });
        } else a(b.data.target).animate({
            left: b.data.startLeft,
            top: b.data.startTop
        }, function() {
            a(b.data.target).css("position", b.data.startPosition);
        }); else a(b.data.target).css({
            position: "absolute",
            left: b.data.left,
            top: b.data.top
        }), d();
        return i.onStopDrag.call(b.data.target, b), g(), !1;
    }
    function g() {
        a.fn.draggable.timer && (clearTimeout(a.fn.draggable.timer), a.fn.draggable.timer = void 0), 
        a(document).unbind(".draggable"), a.fn.draggable.isDragging = !1, setTimeout(function() {
            a("body").css("cursor", "");
        }, 100);
    }
    a.fn.draggable = function(b, c) {
        return "string" == typeof b ? a.fn.draggable.methods[b](this, c) : this.each(function() {
            function c(b) {
                var c = a.data(b.data.target, "draggable"), d = c.handle, e = a(d).offset(), f = a(d).outerWidth(), g = a(d).outerHeight(), h = b.pageY - e.top, i = e.left + f - b.pageX, j = e.top + g - b.pageY, k = b.pageX - e.left;
                return Math.min(h, i, j, k) > c.options.edge;
            }
            var g, h = a.data(this, "draggable");
            h ? (h.handle.unbind(".draggable"), g = a.extend(h.options, b)) : g = a.extend({}, a.fn.draggable.defaults, a.fn.draggable.parseOptions(this), b || {});
            var i = g.handle ? "string" == typeof g.handle ? a(g.handle, this) : g.handle : a(this);
            return a.data(this, "draggable", {
                options: g,
                handle: i
            }), g.disabled ? void a(this).css("cursor", "") : void i.unbind(".draggable").bind("mousemove.draggable", {
                target: this
            }, function(b) {
                if (!a.fn.draggable.isDragging) {
                    var d = a.data(b.data.target, "draggable").options;
                    c(b) ? a(this).css("cursor", d.cursor) : a(this).css("cursor", "");
                }
            }).bind("mouseleave.draggable", {
                target: this
            }, function(b) {
                a(this).css("cursor", "");
            }).bind("mousedown.draggable", {
                target: this
            }, function(b) {
                if (0 != c(b)) {
                    a(this).css("cursor", "");
                    var g = a(b.data.target).position(), h = a(b.data.target).offset(), i = {
                        startPosition: a(b.data.target).css("position"),
                        startLeft: g.left,
                        startTop: g.top,
                        left: g.left,
                        top: g.top,
                        startX: b.pageX,
                        startY: b.pageY,
                        offsetWidth: b.pageX - h.left,
                        offsetHeight: b.pageY - h.top,
                        target: b.data.target,
                        parent: a(b.data.target).parent()[0]
                    };
                    a.extend(b.data, i);
                    var j = a.data(b.data.target, "draggable").options;
                    if (0 != j.onBeforeDrag.call(b.data.target, b)) return a(document).bind("mousedown.draggable", b.data, d), 
                    a(document).bind("mousemove.draggable", b.data, e), a(document).bind("mouseup.draggable", b.data, f), 
                    a.fn.draggable.timer = setTimeout(function() {
                        a.fn.draggable.isDragging = !0, d(b);
                    }, j.delay), !1;
                }
            });
        });
    }, a.fn.draggable.methods = {
        options: function(b) {
            return a.data(b[0], "draggable").options;
        },
        proxy: function(b) {
            return a.data(b[0], "draggable").proxy;
        },
        enable: function(b) {
            return b.each(function() {
                a(this).draggable({
                    disabled: !1
                });
            });
        },
        disable: function(b) {
            return b.each(function() {
                a(this).draggable({
                    disabled: !0
                });
            });
        }
    }, a.fn.draggable.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "cursor", "handle", "axis", {
            revert: "boolean",
            deltaX: "number",
            deltaY: "number",
            edge: "number",
            delay: "number"
        } ]), {
            disabled: c.attr("disabled") ? !0 : void 0
        });
    }, a.fn.draggable.defaults = {
        proxy: null,
        revert: !1,
        cursor: "move",
        deltaX: null,
        deltaY: null,
        handle: null,
        disabled: !1,
        edge: 0,
        axis: null,
        delay: 100,
        onBeforeDrag: function(a) {},
        onStartDrag: function(a) {},
        onDrag: function(a) {},
        onStopDrag: function(a) {}
    }, a.fn.draggable.isDragging = !1;
}(jQuery), function(a) {
    function b(b) {
        a(b).addClass("droppable"), a(b).bind("_dragenter", function(c, d) {
            a.data(b, "droppable").options.onDragEnter.apply(b, [ c, d ]);
        }), a(b).bind("_dragleave", function(c, d) {
            a.data(b, "droppable").options.onDragLeave.apply(b, [ c, d ]);
        }), a(b).bind("_dragover", function(c, d) {
            a.data(b, "droppable").options.onDragOver.apply(b, [ c, d ]);
        }), a(b).bind("_drop", function(c, d) {
            a.data(b, "droppable").options.onDrop.apply(b, [ c, d ]);
        });
    }
    a.fn.droppable = function(c, d) {
        return "string" == typeof c ? a.fn.droppable.methods[c](this, d) : (c = c || {}, 
        this.each(function() {
            var d = a.data(this, "droppable");
            d ? a.extend(d.options, c) : (b(this), a.data(this, "droppable", {
                options: a.extend({}, a.fn.droppable.defaults, a.fn.droppable.parseOptions(this), c)
            }));
        }));
    }, a.fn.droppable.methods = {
        options: function(b) {
            return a.data(b[0], "droppable").options;
        },
        enable: function(b) {
            return b.each(function() {
                a(this).droppable({
                    disabled: !1
                });
            });
        },
        disable: function(b) {
            return b.each(function() {
                a(this).droppable({
                    disabled: !0
                });
            });
        }
    }, a.fn.droppable.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "accept" ]), {
            disabled: c.attr("disabled") ? !0 : void 0
        });
    }, a.fn.droppable.defaults = {
        accept: null,
        disabled: !1,
        onDragEnter: function(a, b) {},
        onDragOver: function(a, b) {},
        onDragLeave: function(a, b) {},
        onDrop: function(a, b) {}
    };
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "splitbutton").options;
        a(b).menubutton(c), a(b).addClass("s-btn");
    }
    a.fn.splitbutton = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.splitbutton.methods[c];
            return e ? e(this, d) : this.menubutton(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "splitbutton");
            d ? a.extend(d.options, c) : (a.data(this, "splitbutton", {
                options: a.extend({}, a.fn.splitbutton.defaults, a.fn.splitbutton.parseOptions(this), c)
            }), a(this).removeAttr("disabled")), b(this);
        });
    }, a.fn.splitbutton.methods = {
        options: function(b) {
            var c = b.menubutton("options"), d = a.data(b[0], "splitbutton").options;
            return a.extend(d, {
                disabled: c.disabled,
                toggle: c.toggle,
                selected: c.selected
            }), d;
        }
    }, a.fn.splitbutton.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.fn.linkbutton.parseOptions(b), a.parser.parseOptions(b, [ "menu", {
            plain: "boolean",
            duration: "number"
        } ]));
    }, a.fn.splitbutton.defaults = a.extend({}, a.fn.linkbutton.defaults, {
        plain: !0,
        menu: null,
        duration: 100,
        cls: {
            btn1: "m-btn-active s-btn-active",
            btn2: "m-btn-plain-active s-btn-plain-active",
            arrow: "m-btn-downarrow",
            trigger: "m-btn-line"
        }
    });
}(jQuery), function(a) {
    function b(b) {
        return a(b).addClass("progressbar"), a(b).html('<div class="progressbar-text"></div><div class="progressbar-value"><div class="progressbar-text"></div></div>'), 
        a(b).bind("_resize", function(d, e) {
            return (a(this).hasClass("easyui-fluid") || e) && c(b), !1;
        }), a(b);
    }
    function c(b, c) {
        var d = a.data(b, "progressbar").options, e = a.data(b, "progressbar").bar;
        c && (d.width = c), e._size(d), e.find("div.progressbar-text").css("width", e.width()), 
        e.find("div.progressbar-text,div.progressbar-value").css({
            height: e.height() + "px",
            lineHeight: e.height() + "px"
        });
    }
    a.fn.progressbar = function(d, e) {
        if ("string" == typeof d) {
            var f = a.fn.progressbar.methods[d];
            if (f) return f(this, e);
        }
        return d = d || {}, this.each(function() {
            var e = a.data(this, "progressbar");
            e ? a.extend(e.options, d) : e = a.data(this, "progressbar", {
                options: a.extend({}, a.fn.progressbar.defaults, a.fn.progressbar.parseOptions(this), d),
                bar: b(this)
            }), a(this).progressbar("setValue", e.options.value), c(this);
        });
    }, a.fn.progressbar.methods = {
        options: function(b) {
            return a.data(b[0], "progressbar").options;
        },
        resize: function(a, b) {
            return a.each(function() {
                c(this, b);
            });
        },
        getValue: function(b) {
            return a.data(b[0], "progressbar").options.value;
        },
        setValue: function(b, c) {
            return 0 > c && (c = 0), c > 100 && (c = 100), b.each(function() {
                var b = a.data(this, "progressbar").options, d = b.text.replace(/{value}/, c), e = b.value;
                b.value = c, a(this).find("div.progressbar-value").width(c + "%"), a(this).find("div.progressbar-text").html(d), 
                e != c && b.onChange.call(this, c, e);
            });
        }
    }, a.fn.progressbar.parseOptions = function(b) {
        return a.extend({}, a.parser.parseOptions(b, [ "width", "height", "text", {
            value: "number"
        } ]));
    }, a.fn.progressbar.defaults = {
        width: "auto",
        height: 22,
        value: 0,
        text: "{value}%",
        onChange: function(a, b) {}
    };
}(jQuery), function(a) {
    function b(b) {
        var c = a(b);
        return c.addClass("tree"), c;
    }
    function c(b) {
        var c = a.data(b, "tree").options;
        a(b).unbind().bind("mouseover", function(b) {
            var c = a(b.target), d = c.closest("div.tree-node");
            d.length && (d.addClass("tree-node-hover"), c.hasClass("tree-hit") && c.addClass(c.hasClass("tree-expanded") ? "tree-expanded-hover" : "tree-collapsed-hover"), 
            b.stopPropagation());
        }).bind("mouseout", function(b) {
            var c = a(b.target), d = c.closest("div.tree-node");
            d.length && (d.removeClass("tree-node-hover"), c.hasClass("tree-hit") && c.removeClass(c.hasClass("tree-expanded") ? "tree-expanded-hover" : "tree-collapsed-hover"), 
            b.stopPropagation());
        }).bind("click", function(d) {
            var e = a(d.target), g = e.closest("div.tree-node");
            if (g.length) {
                if (e.hasClass("tree-hit")) return m(b, g[0]), !1;
                if (e.hasClass("tree-checkbox")) return f(b, g[0]), !1;
                H(b, g[0]), c.onClick.call(b, C(b, g[0])), d.stopPropagation();
            }
        }).bind("dblclick", function(d) {
            var e = a(d.target).closest("div.tree-node");
            e.length && (H(b, e[0]), c.onDblClick.call(b, C(b, e[0])), d.stopPropagation());
        }).bind("contextmenu", function(d) {
            var e = a(d.target).closest("div.tree-node");
            e.length && (c.onContextMenu.call(b, d, C(b, e[0])), d.stopPropagation());
        });
    }
    function d(b) {
        var c = a.data(b, "tree").options;
        c.dnd = !1;
        var d = a(b).find("div.tree-node");
        d.draggable("disable"), d.css("cursor", "pointer");
    }
    function e(b) {
        function c(b, c) {
            return a(b).closest("ul.tree").tree(c ? "pop" : "getData", b);
        }
        function d(b, c) {
            var d = a(b).draggable("proxy").find("span.tree-dnd-icon");
            d.removeClass("tree-dnd-yes tree-dnd-no").addClass(c ? "tree-dnd-yes" : "tree-dnd-no");
        }
        function e(d, e) {
            function f() {
                var f = c(d, !0);
                a(b).tree("append", {
                    parent: e,
                    data: [ f ]
                }), h.onDrop.call(b, e, f, "append");
            }
            "closed" == C(b, e).state ? k(b, e, function() {
                f();
            }) : f();
        }
        function f(d, e, f) {
            var g = {};
            "top" == f ? g.before = e : g.after = e;
            var i = c(d, !0);
            g.data = i, a(b).tree("insert", g), h.onDrop.call(b, e, i, f);
        }
        var g = a.data(b, "tree"), h = g.options, i = g.tree;
        g.disabledNodes = [], h.dnd = !0, i.find("div.tree-node").draggable({
            disabled: !1,
            revert: !0,
            cursor: "pointer",
            proxy: function(b) {
                var c = a('<div class="tree-node-proxy"></div>').appendTo("body");
                return c.html('<span class="tree-dnd-icon tree-dnd-no">&nbsp;</span>' + a(b).find(".tree-title").html()), 
                c.hide(), c;
            },
            deltaX: 15,
            deltaY: 15,
            onBeforeDrag: function(c) {
                if (0 == h.onBeforeDrag.call(b, C(b, this))) return !1;
                if (a(c.target).hasClass("tree-hit") || a(c.target).hasClass("tree-checkbox")) return !1;
                if (1 != c.which) return !1;
                var d = a(this).find("span.tree-indent");
                d.length && (c.data.offsetWidth -= d.length * d.width());
            },
            onStartDrag: function(c) {
                a(this).next("ul").find("div.tree-node").each(function() {
                    a(this).droppable("disable"), g.disabledNodes.push(this);
                }), a(this).draggable("proxy").css({
                    left: -1e4,
                    top: -1e4
                }), h.onStartDrag.call(b, C(b, this));
                var d = C(b, this);
                void 0 == d.id && (d.id = "easyui_tree_node_id_temp", u(b, d)), g.draggingNodeId = d.id;
            },
            onDrag: function(b) {
                var c = b.pageX, d = b.pageY, e = b.data.startX, f = b.data.startY, g = Math.sqrt((c - e) * (c - e) + (d - f) * (d - f));
                g > 3 && a(this).draggable("proxy").show(), this.pageY = b.pageY;
            },
            onStopDrag: function() {
                for (var c = 0; c < g.disabledNodes.length; c++) a(g.disabledNodes[c]).droppable("enable");
                g.disabledNodes = [];
                var d = D(b, g.draggingNodeId);
                d && "easyui_tree_node_id_temp" == d.id && (d.id = "", u(b, d)), h.onStopDrag.call(b, d);
            }
        }).droppable({
            accept: "div.tree-node",
            onDragEnter: function(e, f) {
                0 == h.onDragEnter.call(b, this, c(f)) && (d(f, !1), a(this).removeClass("tree-node-append tree-node-top tree-node-bottom"), 
                a(this).droppable("disable"), g.disabledNodes.push(this));
            },
            onDragOver: function(e, f) {
                if (!a(this).droppable("options").disabled) {
                    var i = f.pageY, j = a(this).offset().top, k = j + a(this).outerHeight();
                    d(f, !0), a(this).removeClass("tree-node-append tree-node-top tree-node-bottom"), 
                    a(this).addClass(i > j + (k - j) / 2 ? 5 > k - i ? "tree-node-bottom" : "tree-node-append" : 5 > i - j ? "tree-node-top" : "tree-node-append"), 
                    0 == h.onDragOver.call(b, this, c(f)) && (d(f, !1), a(this).removeClass("tree-node-append tree-node-top tree-node-bottom"), 
                    a(this).droppable("disable"), g.disabledNodes.push(this));
                }
            },
            onDragLeave: function(e, f) {
                d(f, !1), a(this).removeClass("tree-node-append tree-node-top tree-node-bottom"), 
                h.onDragLeave.call(b, this, c(f));
            },
            onDrop: function(d, g) {
                var i, j, k = this;
                return a(this).hasClass("tree-node-append") ? (i = e, j = "append") : (i = f, j = a(this).hasClass("tree-node-top") ? "top" : "bottom"), 
                0 == h.onBeforeDrop.call(b, k, c(g), j) ? void a(this).removeClass("tree-node-append tree-node-top tree-node-bottom") : (i(g, k, j), 
                void a(this).removeClass("tree-node-append tree-node-top tree-node-bottom"));
            }
        });
    }
    function f(b, c, d) {
        function e(a, b) {
            var c = a.find(".tree-checkbox");
            c.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2"), c.addClass("tree-checkbox" + b);
        }
        function f(b, c) {
            if (k.deepCheck) {
                var d = a("#" + b.domId), f = c ? "1" : "0";
                e(d, f), e(d.next(), f);
            } else g(b, c), G(b.children || [], function(a) {
                g(a, c);
            });
        }
        function g(c, d) {
            if (!c.hidden) {
                var f = "tree-checkbox" + (d ? "1" : "0"), g = a("#" + c.domId);
                if (e(g, d ? "1" : "0"), c.children) for (var h = 0; h < c.children.length; h++) if (c.children[h].hidden && !a("#" + c.children[h].domId).find("." + f).length) {
                    e(g, "2");
                    for (var i = y(b, g[0]); i; ) e(a(i.target), "2"), i = y(b, i[0]);
                    return;
                }
            }
        }
        function h(c, d) {
            var f = a("#" + c.domId), g = y(b, f[0]);
            if (g) {
                var j = "";
                j = i(f, !0) ? "1" : i(f, !1) ? "0" : "2", e(a(g.target), j), h(g, d);
            }
        }
        function i(b, c) {
            var d = "tree-checkbox" + (c ? "1" : "0"), e = b.find(".tree-checkbox");
            if (!e.hasClass(d)) return !1;
            var f = !0;
            return b.parent().siblings().each(function() {
                var b = a(this).children("div.tree-node").children(".tree-checkbox");
                return b.length && !b.hasClass(d) ? (f = !1, !1) : void 0;
            }), f;
        }
        var j = a.data(b, "tree"), k = j.options;
        if (k.checkbox) {
            var l = C(b, c);
            if (void 0 == d) {
                var m = a(c).find(".tree-checkbox");
                m.hasClass("tree-checkbox1") ? d = !1 : m.hasClass("tree-checkbox0") ? d = !0 : (void 0 == l._checked && (l._checked = a(c).find(".tree-checkbox").hasClass("tree-checkbox1")), 
                d = !l._checked);
            }
            l._checked = d, 0 != k.onBeforeCheck.call(b, l, d) && (k.cascadeCheck ? (f(l, d), 
            h(l, d)) : e(a(l.target), d ? "1" : "0"), k.onCheck.call(b, l, d));
        }
    }
    function g(b, c) {
        var d = a.data(b, "tree").options;
        if (d.checkbox) {
            var e = a(c);
            if (I(b, c)) {
                var g = e.find(".tree-checkbox");
                g.length ? g.hasClass("tree-checkbox1") ? f(b, c, !0) : f(b, c, !1) : d.onlyLeafCheck && a('<span class="tree-checkbox tree-checkbox0"></span>').insertBefore(e.find(".tree-title"));
            } else {
                var g = e.find(".tree-checkbox");
                if (d.onlyLeafCheck) g.remove(); else if (g.hasClass("tree-checkbox1")) f(b, c, !0); else if (g.hasClass("tree-checkbox2")) {
                    for (var h = !0, i = !0, j = x(b, c), k = 0; k < j.length; k++) j[k].checked ? i = !1 : h = !1;
                    h && f(b, c, !0), i && f(b, c, !1);
                }
            }
        }
    }
    function h(b, c, d, g) {
        var h = a.data(b, "tree"), j = h.options, k = a(c).prevAll("div.tree-node:first");
        d = j.loadFilter.call(b, d, k[0]);
        var l = E(b, "domId", k.attr("id"));
        g ? l ? l.children ? l.children = l.children.concat(d) : l.children = d : h.data = h.data.concat(d) : (l ? l.children = d : h.data = d, 
        a(c).empty()), j.view.render.call(j.view, b, c, d), j.dnd && e(b), l && u(b, l);
        for (var m = [], n = [], o = 0; o < d.length; o++) {
            var p = d[o];
            p.checked || m.push(p);
        }
        G(d, function(a) {
            a.checked && n.push(a);
        });
        var q = j.onCheck;
        j.onCheck = function() {}, m.length && f(b, a("#" + m[0].domId)[0], !1);
        for (var o = 0; o < n.length; o++) f(b, a("#" + n[o].domId)[0], !0);
        j.onCheck = q, setTimeout(function() {
            i(b, b);
        }, 0), j.onLoadSuccess.call(b, l, d);
    }
    function i(b, c, d) {
        function e(a, b) {
            var c = a.find("span.tree-icon");
            c.prev("span.tree-indent").addClass("tree-join");
        }
        function f(b) {
            var c = b.find("span.tree-indent, span.tree-hit").length;
            b.next().find("div.tree-node").each(function() {
                a(this).children("span:eq(" + (c - 1) + ")").addClass("tree-line");
            });
        }
        var g = a.data(b, "tree").options;
        if (!g.lines) return void a(b).removeClass("tree-lines");
        if (a(b).addClass("tree-lines"), !d) {
            d = !0, a(b).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom"), 
            a(b).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
            var h = a(b).tree("getRoots");
            h.length > 1 ? a(h[0].target).addClass("tree-root-first") : 1 == h.length && a(h[0].target).addClass("tree-root-one");
        }
        a(c).children("li").each(function() {
            var c = a(this).children("div.tree-node"), g = c.next("ul");
            g.length ? (a(this).next().length && f(c), i(b, g, d)) : e(c);
        });
        var j = a(c).children("li:last").children("div.tree-node").addClass("tree-node-last");
        j.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
    }
    function j(b, c, d, e) {
        var f = a.data(b, "tree").options;
        d = a.extend({}, f.queryParams, d || {});
        var g = null;
        if (b != c) {
            var i = a(c).prev();
            g = C(b, i[0]);
        }
        if (0 != f.onBeforeLoad.call(b, g, d)) {
            var j = a(c).prev().children("span.tree-folder");
            j.addClass("tree-loading");
            var k = f.loader.call(b, d, function(a) {
                j.removeClass("tree-loading"), h(b, c, a), e && e();
            }, function() {
                j.removeClass("tree-loading"), f.onLoadError.apply(b, arguments), e && e();
            });
            0 == k && j.removeClass("tree-loading");
        }
    }
    function k(b, c, d) {
        var e = a.data(b, "tree").options, f = a(c).children("span.tree-hit");
        if (0 != f.length && !f.hasClass("tree-expanded")) {
            var g = C(b, c);
            if (0 != e.onBeforeExpand.call(b, g)) {
                f.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded"), 
                f.next().addClass("tree-folder-open");
                var h = a(c).next();
                if (h.length) e.animate ? h.slideDown("normal", function() {
                    g.state = "open", e.onExpand.call(b, g), d && d();
                }) : (h.css("display", "block"), g.state = "open", e.onExpand.call(b, g), d && d()); else {
                    var i = a('<ul style="display:none"></ul>').insertAfter(c);
                    j(b, i[0], {
                        id: g.id
                    }, function() {
                        i.is(":empty") && i.remove(), e.animate ? i.slideDown("normal", function() {
                            g.state = "open", e.onExpand.call(b, g), d && d();
                        }) : (i.css("display", "block"), g.state = "open", e.onExpand.call(b, g), d && d());
                    });
                }
            }
        }
    }
    function l(b, c) {
        var d = a.data(b, "tree").options, e = a(c).children("span.tree-hit");
        if (0 != e.length && !e.hasClass("tree-collapsed")) {
            var f = C(b, c);
            if (0 != d.onBeforeCollapse.call(b, f)) {
                e.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed"), e.next().removeClass("tree-folder-open");
                var g = a(c).next();
                d.animate ? g.slideUp("normal", function() {
                    f.state = "closed", d.onCollapse.call(b, f);
                }) : (g.css("display", "none"), f.state = "closed", d.onCollapse.call(b, f));
            }
        }
    }
    function m(b, c) {
        var d = a(c).children("span.tree-hit");
        0 != d.length && (d.hasClass("tree-expanded") ? l(b, c) : k(b, c));
    }
    function n(a, b) {
        var c = x(a, b);
        b && c.unshift(C(a, b));
        for (var d = 0; d < c.length; d++) k(a, c[d].target);
    }
    function o(a, b) {
        for (var c = [], d = y(a, b); d; ) c.unshift(d), d = y(a, d.target);
        for (var e = 0; e < c.length; e++) k(a, c[e].target);
    }
    function p(b, c) {
        for (var d = a(b).parent(); "BODY" != d[0].tagName && "auto" != d.css("overflow-y"); ) d = d.parent();
        var e = a(c), f = e.offset().top;
        if ("BODY" != d[0].tagName) {
            var g = d.offset().top;
            g > f ? d.scrollTop(d.scrollTop() + f - g) : f + e.outerHeight() > g + d.outerHeight() - 18 && d.scrollTop(d.scrollTop() + f + e.outerHeight() - g - d.outerHeight() + 18);
        } else d.scrollTop(f);
    }
    function q(a, b) {
        var c = x(a, b);
        b && c.unshift(C(a, b));
        for (var d = 0; d < c.length; d++) l(a, c[d].target);
    }
    function r(b, c) {
        var d = a(c.parent), e = c.data;
        if (e && (e = a.isArray(e) ? e : [ e ], e.length)) {
            var f;
            if (0 == d.length) f = a(b); else {
                if (I(b, d[0])) {
                    var i = d.find("span.tree-icon");
                    i.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                    var j = a('<span class="tree-hit tree-expanded"></span>').insertBefore(i);
                    j.prev().length && j.prev().remove();
                }
                f = d.next(), f.length || (f = a("<ul></ul>").insertAfter(d));
            }
            h(b, f[0], e, !0), g(b, f.prev());
        }
    }
    function s(b, c) {
        var d = c.before || c.after, e = y(b, d), f = c.data;
        if (f && (f = a.isArray(f) ? f : [ f ], f.length)) {
            r(b, {
                parent: e ? e.target : null,
                data: f
            });
            for (var g = e ? e.children : a(b).tree("getRoots"), h = 0; h < g.length; h++) if (g[h].domId == a(d).attr("id")) {
                for (var i = f.length - 1; i >= 0; i--) g.splice(c.before ? h : h + 1, 0, f[i]);
                g.splice(g.length - f.length, f.length);
                break;
            }
            for (var j = a(), h = 0; h < f.length; h++) j = j.add(a("#" + f[h].domId).parent());
            c.before ? j.insertBefore(a(d).parent()) : j.insertAfter(a(d).parent());
        }
    }
    function t(b, c) {
        function d(c) {
            for (var d = a(c).attr("id"), e = y(b, c), f = e ? e.children : a.data(b, "tree").data, g = 0; g < f.length; g++) if (f[g].domId == d) {
                f.splice(g, 1);
                break;
            }
            return e;
        }
        var e = d(c);
        if (a(c).parent().remove(), e) {
            if (!e.children || !e.children.length) {
                var f = a(e.target);
                f.find(".tree-icon").removeClass("tree-folder").addClass("tree-file"), f.find(".tree-hit").remove(), 
                a('<span class="tree-indent"></span>').prependTo(f), f.next().remove();
            }
            u(b, e), g(b, e.target);
        }
        i(b, b);
    }
    function u(b, c) {
        var d = a.data(b, "tree").options, e = a(c.target), g = C(b, c.target), h = g.checked;
        g.iconCls && e.find(".tree-icon").removeClass(g.iconCls), a.extend(g, c), e.find(".tree-title").html(d.formatter.call(b, g)), 
        g.iconCls && e.find(".tree-icon").addClass(g.iconCls), h != g.checked && f(b, c.target, g.checked);
    }
    function v(a, b) {
        if (b) {
            for (var c = y(a, b); c; ) b = c.target, c = y(a, b);
            return C(a, b);
        }
        var d = w(a);
        return d.length ? d[0] : null;
    }
    function w(b) {
        for (var c = a.data(b, "tree").data, d = 0; d < c.length; d++) F(c[d]);
        return c;
    }
    function x(b, c) {
        var d = [], e = C(b, c), f = e ? e.children || [] : a.data(b, "tree").data;
        return G(f, function(a) {
            d.push(F(a));
        }), d;
    }
    function y(b, c) {
        var d = a(c).closest("ul").prevAll("div.tree-node:first");
        return C(b, d[0]);
    }
    function z(b, c) {
        c = c || "checked", a.isArray(c) || (c = [ c ]);
        for (var d = [], e = 0; e < c.length; e++) {
            var f = c[e];
            "checked" == f ? d.push("span.tree-checkbox1") : "unchecked" == f ? d.push("span.tree-checkbox0") : "indeterminate" == f && d.push("span.tree-checkbox2");
        }
        var g = [];
        return a(b).find(d.join(",")).each(function() {
            var c = a(this).parent();
            g.push(C(b, c[0]));
        }), g;
    }
    function A(b) {
        var c = a(b).find("div.tree-node-selected");
        return c.length ? C(b, c[0]) : null;
    }
    function B(a, b) {
        var c = C(a, b);
        return c && c.children && G(c.children, function(a) {
            F(a);
        }), c;
    }
    function C(b, c) {
        return E(b, "domId", a(c).attr("id"));
    }
    function D(a, b) {
        return E(a, "id", b);
    }
    function E(b, c, d) {
        var e = a.data(b, "tree").data, f = null;
        return G(e, function(a) {
            return a[c] == d ? (f = F(a), !1) : void 0;
        }), f;
    }
    function F(b) {
        var c = a("#" + b.domId);
        return b.target = c[0], b.checked = c.find(".tree-checkbox").hasClass("tree-checkbox1"), 
        b;
    }
    function G(a, b) {
        for (var c = [], d = 0; d < a.length; d++) c.push(a[d]);
        for (;c.length; ) {
            var e = c.shift();
            if (0 == b(e)) return;
            if (e.children) for (var d = e.children.length - 1; d >= 0; d--) c.unshift(e.children[d]);
        }
    }
    function H(b, c) {
        var d = a.data(b, "tree").options, e = C(b, c);
        0 != d.onBeforeSelect.call(b, e) && (a(b).find("div.tree-node-selected").removeClass("tree-node-selected"), 
        a(c).addClass("tree-node-selected"), d.onSelect.call(b, e));
    }
    function I(b, c) {
        return 0 == a(c).children("span.tree-hit").length;
    }
    function J(b, c) {
        var d = a.data(b, "tree").options, e = C(b, c);
        if (0 != d.onBeforeEdit.call(b, e)) {
            a(c).css("position", "relative");
            var f = a(c).find(".tree-title"), g = f.outerWidth();
            f.empty();
            var h = a('<input class="tree-editor">').appendTo(f);
            h.val(e.text).focus(), h.width(g + 20), h.height("CSS1Compat" == document.compatMode ? 18 - (h.outerHeight() - h.height()) : 18), 
            h.bind("click", function(a) {
                return !1;
            }).bind("mousedown", function(a) {
                a.stopPropagation();
            }).bind("mousemove", function(a) {
                a.stopPropagation();
            }).bind("keydown", function(a) {
                return 13 == a.keyCode ? (K(b, c), !1) : 27 == a.keyCode ? (L(b, c), !1) : void 0;
            }).bind("blur", function(a) {
                a.stopPropagation(), K(b, c);
            });
        }
    }
    function K(b, c) {
        var d = a.data(b, "tree").options;
        a(c).css("position", "");
        var e = a(c).find("input.tree-editor"), f = e.val();
        e.remove();
        var g = C(b, c);
        g.text = f, u(b, g), d.onAfterEdit.call(b, g);
    }
    function L(b, c) {
        var d = a.data(b, "tree").options;
        a(c).css("position", ""), a(c).find("input.tree-editor").remove();
        var e = C(b, c);
        u(b, e), d.onCancelEdit.call(b, e);
    }
    function M(b, c) {
        function d(c) {
            for (var d = a(b).tree("getParent", a("#" + c)[0]); d; ) a(d.target).removeClass("tree-node-hidden"), 
            d.hidden = !1, d = a(b).tree("getParent", d.target);
        }
        var e = a.data(b, "tree"), f = e.options, g = {};
        G(e.data, function(d) {
            f.filter.call(b, c, d) ? (a("#" + d.domId).removeClass("tree-node-hidden"), g[d.domId] = 1, 
            d.hidden = !1) : (a("#" + d.domId).addClass("tree-node-hidden"), d.hidden = !0);
        });
        for (var h in g) d(h);
    }
    a.fn.tree = function(d, e) {
        if ("string" == typeof d) return a.fn.tree.methods[d](this, e);
        var d = d || {};
        return this.each(function() {
            var e, f = a.data(this, "tree");
            if (f) e = a.extend(f.options, d), f.options = e; else {
                e = a.extend({}, a.fn.tree.defaults, a.fn.tree.parseOptions(this), d), a.data(this, "tree", {
                    options: e,
                    tree: b(this),
                    data: []
                });
                var g = a.fn.tree.parseData(this);
                g.length && h(this, this, g);
            }
            c(this), e.data && h(this, this, a.extend(!0, [], e.data)), j(this, this);
        });
    }, a.fn.tree.methods = {
        options: function(b) {
            return a.data(b[0], "tree").options;
        },
        loadData: function(a, b) {
            return a.each(function() {
                h(this, this, b);
            });
        },
        getNode: function(a, b) {
            return C(a[0], b);
        },
        getData: function(a, b) {
            return B(a[0], b);
        },
        reload: function(b, c) {
            return b.each(function() {
                if (c) {
                    var b = a(c), d = b.children("span.tree-hit");
                    d.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed"), b.next().remove(), 
                    k(this, c);
                } else a(this).empty(), j(this, this);
            });
        },
        getRoot: function(a, b) {
            return v(a[0], b);
        },
        getRoots: function(a) {
            return w(a[0]);
        },
        getParent: function(a, b) {
            return y(a[0], b);
        },
        getChildren: function(a, b) {
            return x(a[0], b);
        },
        getChecked: function(a, b) {
            return z(a[0], b);
        },
        getSelected: function(a) {
            return A(a[0]);
        },
        isLeaf: function(a, b) {
            return I(a[0], b);
        },
        find: function(a, b) {
            return D(a[0], b);
        },
        select: function(a, b) {
            return a.each(function() {
                H(this, b);
            });
        },
        check: function(a, b) {
            return a.each(function() {
                f(this, b, !0);
            });
        },
        uncheck: function(a, b) {
            return a.each(function() {
                f(this, b, !1);
            });
        },
        collapse: function(a, b) {
            return a.each(function() {
                l(this, b);
            });
        },
        expand: function(a, b) {
            return a.each(function() {
                k(this, b);
            });
        },
        collapseAll: function(a, b) {
            return a.each(function() {
                q(this, b);
            });
        },
        expandAll: function(a, b) {
            return a.each(function() {
                n(this, b);
            });
        },
        expandTo: function(a, b) {
            return a.each(function() {
                o(this, b);
            });
        },
        scrollTo: function(a, b) {
            return a.each(function() {
                p(this, b);
            });
        },
        toggle: function(a, b) {
            return a.each(function() {
                m(this, b);
            });
        },
        append: function(a, b) {
            return a.each(function() {
                r(this, b);
            });
        },
        insert: function(a, b) {
            return a.each(function() {
                s(this, b);
            });
        },
        remove: function(a, b) {
            return a.each(function() {
                t(this, b);
            });
        },
        pop: function(a, b) {
            var c = a.tree("getData", b);
            return a.tree("remove", b), c;
        },
        update: function(a, b) {
            return a.each(function() {
                u(this, b);
            });
        },
        enableDnd: function(a) {
            return a.each(function() {
                e(this);
            });
        },
        disableDnd: function(a) {
            return a.each(function() {
                d(this);
            });
        },
        beginEdit: function(a, b) {
            return a.each(function() {
                J(this, b);
            });
        },
        endEdit: function(a, b) {
            return a.each(function() {
                K(this, b);
            });
        },
        cancelEdit: function(a, b) {
            return a.each(function() {
                L(this, b);
            });
        },
        doFilter: function(a, b) {
            return a.each(function() {
                M(this, b);
            });
        }
    }, a.fn.tree.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "url", "method", {
            checkbox: "boolean",
            cascadeCheck: "boolean",
            onlyLeafCheck: "boolean"
        }, {
            animate: "boolean",
            lines: "boolean",
            dnd: "boolean"
        } ]));
    }, a.fn.tree.parseData = function(b) {
        function c(b, d) {
            d.children("li").each(function() {
                var d = a(this), e = a.extend({}, a.parser.parseOptions(this, [ "id", "iconCls", "state" ]), {
                    checked: d.attr("checked") ? !0 : void 0
                });
                e.text = d.children("span").html(), e.text || (e.text = d.html());
                var f = d.children("ul");
                f.length && (e.children = [], c(e.children, f)), b.push(e);
            });
        }
        var d = [];
        return c(d, a(b)), d;
    };
    var N = 1, O = {
        render: function(b, c, d) {
            function e(a, c) {
                for (var d = [], g = 0; g < c.length; g++) {
                    var h = c[g];
                    "open" != h.state && "closed" != h.state && (h.state = "open"), h.domId = "_easyui_tree_" + N++, 
                    d.push("<li>"), d.push('<div id="' + h.domId + '" class="tree-node">');
                    for (var i = 0; a > i; i++) d.push('<span class="tree-indent"></span>');
                    var j = !1;
                    if ("closed" == h.state ? (d.push('<span class="tree-hit tree-collapsed"></span>'), 
                    d.push('<span class="tree-icon tree-folder ' + (h.iconCls ? h.iconCls : "") + '"></span>')) : h.children && h.children.length ? (d.push('<span class="tree-hit tree-expanded"></span>'), 
                    d.push('<span class="tree-icon tree-folder tree-folder-open ' + (h.iconCls ? h.iconCls : "") + '"></span>')) : (d.push('<span class="tree-indent"></span>'), 
                    d.push('<span class="tree-icon tree-file ' + (h.iconCls ? h.iconCls : "") + '"></span>'), 
                    j = !0), f.checkbox && (!f.onlyLeafCheck || j) && d.push('<span class="tree-checkbox tree-checkbox0"></span>'), 
                    d.push('<span class="tree-title">' + f.formatter.call(b, h) + "</span>"), d.push("</div>"), 
                    h.children && h.children.length) {
                        var k = e(a + 1, h.children);
                        d.push('<ul style="display:' + ("closed" == h.state ? "none" : "block") + '">'), 
                        d = d.concat(k), d.push("</ul>");
                    }
                    d.push("</li>");
                }
                return d;
            }
            var f = a.data(b, "tree").options, g = a(c).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length, h = e(g, d);
            a(c).append(h.join(""));
        }
    };
    a.fn.tree.defaults = {
        url: null,
        method: "post",
        animate: !1,
        checkbox: !1,
        cascadeCheck: !0,
        onlyLeafCheck: !1,
        lines: !1,
        dnd: !1,
        data: null,
        queryParams: {},
        formatter: function(a) {
            return a.text;
        },
        filter: function(a, b) {
            return b.text.toLowerCase().indexOf(a.toLowerCase()) >= 0;
        },
        loader: function(b, c, d) {
            var e = a(this).tree("options");
            return e.url ? void a.ajax({
                type: e.method,
                url: e.url,
                data: b,
                dataType: "json",
                success: function(a) {
                    c(a);
                },
                error: function() {
                    d.apply(this, arguments);
                }
            }) : !1;
        },
        loadFilter: function(a, b) {
            return a;
        },
        view: O,
        onBeforeLoad: function(a, b) {},
        onLoadSuccess: function(a, b) {},
        onLoadError: function() {},
        onClick: function(a) {},
        onDblClick: function(a) {},
        onBeforeExpand: function(a) {},
        onExpand: function(a) {},
        onBeforeCollapse: function(a) {},
        onCollapse: function(a) {},
        onBeforeCheck: function(a, b) {},
        onCheck: function(a, b) {},
        onBeforeSelect: function(a) {},
        onSelect: function(a) {},
        onContextMenu: function(a, b) {},
        onBeforeDrag: function(a) {},
        onStartDrag: function(a) {},
        onStopDrag: function(a) {},
        onDragEnter: function(a, b) {},
        onDragOver: function(a, b) {},
        onDragLeave: function(a, b) {},
        onBeforeDrop: function(a, b, c) {},
        onDrop: function(a, b, c) {},
        onBeforeEdit: function(a) {},
        onAfterEdit: function(a) {},
        onCancelEdit: function(a) {}
    };
}(jQuery), function(a) {
    function b(b) {
        var d = a.data(b, "combotree"), e = d.options, f = d.tree;
        a(b).addClass("combotree-f"), a(b).combo(e);
        var g = a(b).combo("panel");
        f || (f = a("<ul></ul>").appendTo(g), a.data(b, "combotree").tree = f), f.tree(a.extend({}, e, {
            checkbox: e.multiple,
            onLoadSuccess: function(c, d) {
                var g = a(b).combotree("getValues");
                if (e.multiple) for (var h = f.tree("getChecked"), i = 0; i < h.length; i++) {
                    var j = h[i].id;
                    !function() {
                        for (var a = 0; a < g.length; a++) if (j == g[a]) return;
                        g.push(j);
                    }();
                }
                a(b).combotree("setValues", g), e.onLoadSuccess.call(this, c, d), 1 == e.searchBox && a(b).combotree("initSearchBox");
            },
            onClick: function(d) {
                e.multiple ? a(this).tree(d.checked ? "uncheck" : "check", d.target) : a(b).combo("hidePanel"), 
                c(b), e.onClick.call(this, d);
            },
            onCheck: function(a, d) {
                c(b), e.onCheck.call(this, a, d);
            }
        }));
    }
    function c(b) {
        var c = a.data(b, "combotree"), d = c.options, e = c.tree, f = [], g = [];
        if (d.multiple) for (var h = e.tree("getChecked"), i = 0; i < h.length; i++) {
            var j = e.tree("isLeaf", h[i].target);
            d.showParentText ? (f.push(h[i].id), g.push(h[i].text)) : j && (f.push(h[i].id), 
            g.push(h[i].text));
        } else {
            var k = e.tree("getSelected");
            k && (f.push(k.id), g.push(k.text));
        }
        a(b).combo("setText", g.join(d.separator)).combo("setValues", d.multiple ? f : f.length ? f : [ "" ]);
    }
    function d(b, c) {
        var d = a.data(b, "combotree"), e = d.options, f = d.tree, g = f.tree("options"), h = g.onCheck, i = g.onSelect;
        g.onCheck = g.onSelect = function() {}, f.find("span.tree-checkbox").addClass("tree-checkbox0").removeClass("tree-checkbox1 tree-checkbox2"), 
        a.isArray(c) || (c = c.split(e.separator));
        var j = a.map(c, function(a) {
            return String(a);
        }), k = [];
        if (a.map(j, function(a) {
            var b = f.tree("find", a);
            b ? (f.tree("check", b.target).tree("select", b.target), k.push(b.text)) : k.push(a);
        }), e.multiple) {
            var l = f.tree("getChecked");
            a.map(l, function(b) {
                var c = String(b.id);
                -1 == a.inArray(c, j) && (j.push(c), k.push(b.text));
            });
        }
        g.onCheck = h, g.onSelect = i, a(b).combo("setText", k.join(e.separator)).combo("setValues", e.multiple ? j : j.length ? j : [ "" ]);
    }
    a.fn.combotree = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.combotree.methods[c];
            return e ? e(this, d) : this.combo(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "combotree");
            d ? a.extend(d.options, c) : a.data(this, "combotree", {
                options: a.extend({}, a.fn.combotree.defaults, a.fn.combotree.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.combotree.methods = {
        options: function(b) {
            var c = b.combo("options");
            return a.extend(a.data(b[0], "combotree").options, {
                width: c.width,
                height: c.height,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        },
        clone: function(b, c) {
            var d = b.combo("clone", c);
            return d.data("combotree", {
                options: a.extend(!0, {}, b.combotree("options")),
                tree: b.combotree("tree")
            }), d;
        },
        tree: function(b) {
            return a.data(b[0], "combotree").tree;
        },
        loadData: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "combotree").options;
                b.data = c;
                var d = a.data(this, "combotree").tree;
                d.tree("loadData", c);
            });
        },
        reload: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "combotree").options, d = a.data(this, "combotree").tree;
                c && (b.url = c), d.tree({
                    url: b.url
                });
            });
        },
        setValues: function(a, b) {
            return a.each(function() {
                d(this, b);
            });
        },
        setValue: function(a, b) {
            return a.each(function() {
                d(this, [ b ]);
            });
        },
        clear: function(b) {
            return b.each(function() {
                var b = a.data(this, "combotree").tree;
                b.find("div.tree-node-selected").removeClass("tree-node-selected");
                for (var c = b.tree("getChecked"), d = 0; d < c.length; d++) b.tree("uncheck", c[d].target);
                a(this).combo("clear");
            });
        },
        reset: function(b) {
            return b.each(function() {
                var b = a(this).combotree("options");
                b.multiple ? a(this).combotree("setValues", b.originalValue) : a(this).combotree("setValue", b.originalValue);
            });
        }
    }, a.fn.combotree.parseOptions = function(b) {
        return a.extend({}, a.fn.combo.parseOptions(b), a.fn.tree.parseOptions(b));
    }, a.fn.combotree.defaults = a.extend({}, a.fn.combo.defaults, a.fn.tree.defaults, {
        showParentText: !0,
        editable: !0
    });
}(jQuery), function(a) {
    function b(b) {
        function c(c, d) {
            f.remainText = !1, e(), g.multiple || a(b).combo("hidePanel"), g.onClickRow.call(this, c, d);
        }
        function e() {
            var c = a.map(h.datagrid("getSelections"), function(a) {
                return a[g.idField];
            });
            c = c.concat(g.unselectedValues), g.multiple || (c = c.length ? [ c[0] ] : [ "" ]), 
            d(b, c, f.remainText);
        }
        var f = a.data(b, "combogrid"), g = f.options, h = f.grid;
        a(b).addClass("combogrid-f").combo(a.extend({}, g, {
            onShowPanel: function() {
                var b = a(this).combogrid("panel"), c = b.outerHeight() - b.height(), d = b._size("minHeight"), e = b._size("maxHeight"), f = a(this).combogrid("grid");
                f.datagrid("resize", {
                    width: "100%",
                    height: isNaN(parseInt(g.panelHeight)) ? "auto" : "100%",
                    minHeight: d ? d - c : "",
                    maxHeight: e ? e - c : ""
                });
                var h = f.datagrid("getSelected");
                h && f.datagrid("scrollTo", f.datagrid("getRowIndex", h)), g.onShowPanel.call(this);
            }
        }));
        var i = a(b).combo("panel");
        h || (h = a("<table></table>").appendTo(i), f.grid = h), h.datagrid(a.extend({}, g, {
            border: !1,
            singleSelect: !g.multiple,
            onLoadSuccess: function(c) {
                var e = a(b).combo("getValues"), h = g.onSelect;
                g.onSelect = function() {}, d(b, e, f.remainText), g.onSelect = h, g.onLoadSuccess.apply(b, arguments);
            },
            onClickRow: c,
            onSelect: function(a, b) {
                e(), f.remainText = !1, g.onSelect.call(this, a, b);
            },
            onUnselect: function(a, b) {
                e(), g.onUnselect.call(this, a, b);
            },
            onSelectAll: function(a) {
                e(), f.remainText = !1, g.onSelectAll.call(this, a);
            },
            onUnselectAll: function(a) {
                g.multiple && e(), g.onUnselectAll.call(this, a);
            }
        }));
    }
    function c(b, c) {
        var d = a.data(b, "combogrid"), e = d.options, f = d.grid, g = f.datagrid("getRows").length;
        if (g) {
            var h = e.finder.getTr(f[0], null, "highlight");
            h.length || (h = e.finder.getTr(f[0], null, "selected"));
            var i;
            if (h.length) {
                var i = parseInt(h.attr("datagrid-row-index"));
                i += "next" == c ? 1 : -1, 0 > i && (i = g - 1), i >= g && (i = 0);
            } else i = "next" == c ? 0 : g - 1;
            f.datagrid("highlightRow", i), e.selectOnNavigation && (d.remainText = !1, f.datagrid("selectRow", i));
        }
    }
    function d(b, c, d) {
        function e(a, b) {
            for (var c = 0; c < b.length; c++) if (a == b[c][g.idField]) return b[c][g.textField];
            return void 0;
        }
        var f = a.data(b, "combogrid"), g = f.options, h = f.grid, i = a(b).combo("getValues"), j = a(b).combo("options"), k = j.onChange;
        j.onChange = function() {};
        var l = h.datagrid("options"), m = l.onSelect, n = l.onUnselectAll;
        l.onSelect = l.onUnselectAll = function() {}, a.isArray(c) || (c = c.split(g.separator));
        var o = [];
        a.map(h.datagrid("getSelections"), function(b) {
            a.inArray(b[g.idField], c) >= 0 && o.push(b);
        }), h.datagrid("clearSelections"), h.data("datagrid").selectedRows = o;
        for (var p = [], q = 0; q < c.length; q++) {
            var r = c[q], s = h.datagrid("getRowIndex", r);
            s >= 0 && h.datagrid("selectRow", s), p.push(e(r, h.datagrid("getRows")) || e(r, h.datagrid("getSelections")) || e(r, g.mappingRows) || r);
        }
        g.unselectedValues = [];
        var t = a.map(o, function(a) {
            return a[g.idField];
        });
        if (a.map(c, function(b) {
            -1 == a.inArray(b, t) && g.unselectedValues.push(b);
        }), a(b).combo("setValues", i), j.onChange = k, l.onSelect = m, l.onUnselectAll = n, 
        !d) {
            var u = p.join(g.separator);
            a(b).combo("getText") != u && a(b).combo("setText", u);
        }
        a(b).combo("setValues", c);
    }
    function e(b, c) {
        var e = a.data(b, "combogrid"), f = e.options, g = e.grid;
        if (e.remainText = !0, f.multiple && !c ? d(b, [], !0) : d(b, [ c ], !0), "remote" == f.mode) {
            g.datagrid("clearSelections");
            var h = 0 == f.loadQuery(c) ? !1 : !0;
            h && g.datagrid("load", a.extend({}, f.queryParams, {
                q: c
            }));
        } else {
            if (!c) return;
            g.datagrid("clearSelections").datagrid("highlightRow", -1);
            var i = g.datagrid("getRows"), j = f.multiple ? c.split(f.separator) : [ c ];
            a.map(j, function(c) {
                c = a.trim(c), c && a.map(i, function(a, d) {
                    c == a[f.textField] ? g.datagrid("selectRow", d) : f.filter.call(b, c, a) && g.datagrid("highlightRow", d);
                });
            });
        }
    }
    function f(b) {
        var c = a.data(b, "combogrid"), d = c.options, e = c.grid, f = d.finder.getTr(e[0], null, "highlight");
        if (c.remainText = !1, f.length) {
            var g = parseInt(f.attr("datagrid-row-index"));
            d.multiple && f.hasClass("datagrid-row-selected") ? e.datagrid("unselectRow", g) : e.datagrid("selectRow", g);
        }
        var h = [];
        a.map(e.datagrid("getSelections"), function(a) {
            h.push(a[d.idField]);
        }), a(b).combogrid("setValues", h), d.multiple || a(b).combogrid("hidePanel");
    }
    a.fn.combogrid = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.combogrid.methods[c];
            return e ? e(this, d) : this.combo(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "combogrid");
            d ? a.extend(d.options, c) : d = a.data(this, "combogrid", {
                options: a.extend({}, a.fn.combogrid.defaults, a.fn.combogrid.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.combogrid.methods = {
        options: function(b) {
            var c = b.combo("options");
            return a.extend(a.data(b[0], "combogrid").options, {
                width: c.width,
                height: c.height,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        },
        grid: function(b) {
            return a.data(b[0], "combogrid").grid;
        },
        setValues: function(b, c) {
            return b.each(function() {
                var b = a(this).combogrid("options");
                a.isArray(c) && (c = a.map(c, function(a) {
                    if ("object" == typeof a) {
                        var c = a[b.idField];
                        return function() {
                            for (var d = 0; d < b.mappingRows.length; d++) if (c == b.mappingRows[d][b.idField]) return;
                            b.mappingRows.push(a);
                        }(), c;
                    }
                    return a;
                })), d(this, c);
            });
        },
        setValue: function(b, c) {
            return b.each(function() {
                a(this).combogrid("setValues", [ c ]);
            });
        },
        clear: function(b) {
            return b.each(function() {
                a(this).combogrid("grid").datagrid("clearSelections"), a(this).combo("clear");
            });
        },
        reset: function(b) {
            return b.each(function() {
                var b = a(this).combogrid("options");
                b.multiple ? a(this).combogrid("setValues", b.originalValue) : a(this).combogrid("setValue", b.originalValue);
            });
        }
    }, a.fn.combogrid.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.fn.combo.parseOptions(b), a.fn.datagrid.parseOptions(b), a.parser.parseOptions(b, [ "idField", "textField", "mode" ]));
    }, a.fn.combogrid.defaults = a.extend({}, a.fn.combo.defaults, a.fn.datagrid.defaults, {
        height: 22,
        panelHeight: 350,
        loadMsg: null,
        idField: null,
        textField: null,
        unselectedValues: [],
        mappingRows: [],
        mode: "local",
        keyHandler: {
            up: function(a) {
                c(this, "prev"), a.preventDefault();
            },
            down: function(a) {
                c(this, "next"), a.preventDefault();
            },
            left: function(a) {},
            right: function(a) {},
            enter: function(a) {
                f(this);
            },
            query: function(a, b) {
                e(this, a);
            }
        },
        loadQuery: function(a) {},
        filter: function(b, c) {
            var d = a(this).combogrid("options");
            return 0 == (c[d.textField] || "").toLowerCase().indexOf(b.toLowerCase());
        },
        fit: !1
    });
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "numberbox"), d = c.options;
        a(b).addClass("numberbox-f").textbox(d), a(b).textbox("textbox").css({
            imeMode: "disabled"
        }), a(b).attr("numberboxName", a(b).attr("textboxName")), c.numberbox = a(b).next(), 
        c.numberbox.addClass("numberbox");
        var e = d.parser.call(b, d.value), f = d.formatter.call(b, e);
        a(b).numberbox("initValue", e).numberbox("initText", f);
    }
    function c(b, c) {
        var d = a.data(b, "numberbox"), e = d.options, c = e.parser.call(b, c), f = e.formatter.call(b, c);
        e.value = c, a(b).textbox("setText", f).textbox("setValue", c), f = e.formatter.call(b, a(b).textbox("getValue")), 
        a(b).textbox("setText", f);
    }
    a.fn.numberbox = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.numberbox.methods[c];
            return e ? e(this, d) : this.textbox(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "numberbox");
            d ? a.extend(d.options, c) : d = a.data(this, "numberbox", {
                options: a.extend({}, a.fn.numberbox.defaults, a.fn.numberbox.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.numberbox.methods = {
        options: function(b) {
            var c = b.data("textbox") ? b.textbox("options") : {};
            return a.extend(a.data(b[0], "numberbox").options, {
                width: c.width,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        },
        fix: function(b) {
            return b.each(function() {
                a(this).numberbox("setValue", a(this).numberbox("getText"));
            });
        },
        setValue: function(a, b) {
            return a.each(function() {
                c(this, b);
            });
        },
        clear: function(b) {
            return b.each(function() {
                a(this).textbox("clear"), a(this).numberbox("options").value = "";
            });
        },
        reset: function(b) {
            return b.each(function() {
                a(this).textbox("reset"), a(this).numberbox("setValue", a(this).numberbox("getValue"));
            });
        }
    }, a.fn.numberbox.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.fn.textbox.parseOptions(b), a.parser.parseOptions(b, [ "decimalSeparator", "groupSeparator", "suffix", {
            min: "number",
            max: "number",
            precision: "number"
        } ]), {
            prefix: c.attr("prefix") ? c.attr("prefix") : void 0
        });
    }, a.fn.numberbox.defaults = a.extend({}, a.fn.textbox.defaults, {
        inputEvents: {
            keypress: function(b) {
                var c = b.data.target, d = a(c).numberbox("options");
                return d.filter.call(c, b);
            },
            blur: function(b) {
                var c = b.data.target;
                a(c).numberbox("setValue", a(c).numberbox("getText"));
            },
            keydown: function(b) {
                if (13 == b.keyCode) {
                    var c = b.data.target;
                    a(c).numberbox("setValue", a(c).numberbox("getText"));
                }
            }
        },
        min: null,
        max: null,
        precision: 0,
        decimalSeparator: ".",
        groupSeparator: "",
        prefix: "",
        suffix: "",
        filter: function(b) {
            var c = a(this).numberbox("options"), d = a(this).numberbox("getText");
            if (13 == b.which) return !0;
            if (45 == b.which) return -1 == d.indexOf("-") ? !0 : !1;
            var e = String.fromCharCode(b.which);
            return e == c.decimalSeparator ? -1 == d.indexOf(e) ? !0 : !1 : e == c.groupSeparator ? !0 : b.which >= 48 && b.which <= 57 && 0 == b.ctrlKey && 0 == b.shiftKey || 0 == b.which || 8 == b.which ? !0 : 1 != b.ctrlKey || 99 != b.which && 118 != b.which ? !1 : !0;
        },
        formatter: function(b) {
            if (!b) return b;
            b += "";
            var c = a(this).numberbox("options"), d = b, e = "", f = b.indexOf(".");
            if (f >= 0 && (d = b.substring(0, f), e = b.substring(f + 1, b.length)), c.groupSeparator) for (var g = /(\d+)(\d{3})/; g.test(d); ) d = d.replace(g, "$1" + c.groupSeparator + "$2");
            return e ? c.prefix + d + c.decimalSeparator + e + c.suffix : c.prefix + d + c.suffix;
        },
        parser: function(b) {
            b += "";
            var c = a(this).numberbox("options");
            parseFloat(b) != b && (c.prefix && (b = a.trim(b.replace(new RegExp("\\" + a.trim(c.prefix), "g"), ""))), 
            c.suffix && (b = a.trim(b.replace(new RegExp("\\" + a.trim(c.suffix), "g"), ""))), 
            c.groupSeparator && (b = a.trim(b.replace(new RegExp("\\" + c.groupSeparator, "g"), ""))), 
            c.decimalSeparator && (b = a.trim(b.replace(new RegExp("\\" + c.decimalSeparator, "g"), "."))), 
            b = b.replace(/\s/g, ""));
            var d = parseFloat(b).toFixed(c.precision);
            return isNaN(d) ? d = "" : "number" == typeof c.min && d < c.min ? d = c.min.toFixed(c.precision) : "number" == typeof c.max && d > c.max && (d = c.max.toFixed(c.precision)), 
            d;
        }
    });
}(jQuery), function(a) {
    function b(a) {
        var b = 0;
        if ("number" == typeof a.selectionStart) b = a.selectionStart; else if (a.createTextRange) {
            var c = a.createTextRange(), d = document.selection.createRange();
            d.setEndPoint("StartToStart", c), b = d.text.length;
        }
        return b;
    }
    function c(a, b, c) {
        if (a.setSelectionRange) a.setSelectionRange(b, c); else if (a.createTextRange) {
            var d = a.createTextRange();
            d.collapse(), d.moveEnd("character", c), d.moveStart("character", b), d.select();
        }
    }
    function d(b) {
        var c = a.data(b, "timespinner").options;
        a(b).addClass("timespinner-f").spinner(c);
        var d = c.formatter.call(b, c.parser.call(b, c.value));
        a(b).timespinner("initValue", d);
    }
    function e(c) {
        for (var d = c.data.target, e = a.data(d, "timespinner").options, g = b(this), h = 0; h < e.selections.length; h++) {
            var i = e.selections[h];
            if (g >= i[0] && g <= i[1]) return void f(d, h);
        }
    }
    function f(b, d) {
        var e = a.data(b, "timespinner").options;
        void 0 != d && (e.highlight = d);
        var f = e.selections[e.highlight];
        if (f) {
            var g = a(b).timespinner("textbox");
            c(g[0], f[0], f[1]), g.focus();
        }
    }
    function g(b, c) {
        var d = a.data(b, "timespinner").options, c = d.parser.call(b, c), e = d.formatter.call(b, c);
        a(b).spinner("setValue", e);
    }
    function h(b, c) {
        var d = a.data(b, "timespinner").options, e = a(b).timespinner("getValue"), g = d.selections[d.highlight], h = e.substring(0, g[0]), i = e.substring(g[0], g[1]), j = e.substring(g[1]), k = h + ((parseInt(i) || 0) + d.increment * (c ? -1 : 1)) + j;
        a(b).timespinner("setValue", k), f(b);
    }
    a.fn.timespinner = function(b, c) {
        if ("string" == typeof b) {
            var e = a.fn.timespinner.methods[b];
            return e ? e(this, c) : this.spinner(b, c);
        }
        return b = b || {}, this.each(function() {
            var c = a.data(this, "timespinner");
            c ? a.extend(c.options, b) : a.data(this, "timespinner", {
                options: a.extend({}, a.fn.timespinner.defaults, a.fn.timespinner.parseOptions(this), b)
            }), d(this);
        });
    }, a.fn.timespinner.methods = {
        options: function(b) {
            var c = b.data("spinner") ? b.spinner("options") : {};
            return a.extend(a.data(b[0], "timespinner").options, {
                width: c.width,
                value: c.value,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        },
        setValue: function(a, b) {
            return a.each(function() {
                g(this, b);
            });
        },
        getHours: function(b) {
            var c = a.data(b[0], "timespinner").options, d = b.timespinner("getValue").split(c.separator);
            return parseInt(d[0], 10);
        },
        getMinutes: function(b) {
            var c = a.data(b[0], "timespinner").options, d = b.timespinner("getValue").split(c.separator);
            return parseInt(d[1], 10);
        },
        getSeconds: function(b) {
            var c = a.data(b[0], "timespinner").options, d = b.timespinner("getValue").split(c.separator);
            return parseInt(d[2], 10) || 0;
        }
    }, a.fn.timespinner.parseOptions = function(b) {
        return a.extend({}, a.fn.spinner.parseOptions(b), a.parser.parseOptions(b, [ "separator", {
            showSeconds: "boolean",
            highlight: "number"
        } ]));
    }, a.fn.timespinner.defaults = a.extend({}, a.fn.spinner.defaults, {
        inputEvents: a.extend({}, a.fn.spinner.defaults.inputEvents, {
            click: function(a) {
                e.call(this, a);
            },
            blur: function(b) {
                var c = a(b.data.target);
                c.timespinner("setValue", c.timespinner("getText"));
            },
            keydown: function(b) {
                if (13 == b.keyCode) {
                    var c = a(b.data.target);
                    c.timespinner("setValue", c.timespinner("getText"));
                }
            }
        }),
        formatter: function(b) {
            function c(a) {
                return (10 > a ? "0" : "") + a;
            }
            if (!b) return "";
            var d = a(this).timespinner("options"), e = [ c(b.getHours()), c(b.getMinutes()) ];
            return d.showSeconds && e.push(c(b.getSeconds())), e.join(d.separator);
        },
        parser: function(b) {
            function c(a) {
                if (!a) return null;
                var b = a.split(d.separator);
                return new Date(1900, 0, 0, parseInt(b[0], 10) || 0, parseInt(b[1], 10) || 0, parseInt(b[2], 10) || 0);
            }
            var d = a(this).timespinner("options"), e = c(b);
            if (e) {
                var f = c(d.min), g = c(d.max);
                f && f > e && (e = f), g && e > g && (e = g);
            }
            return e;
        },
        selections: [ [ 0, 2 ], [ 3, 5 ], [ 6, 8 ] ],
        separator: ":",
        showSeconds: !1,
        highlight: 0,
        spin: function(a) {
            h(this, a);
        }
    });
}(jQuery), function(a) {
    function b(b) {
        a(b).addClass("numberspinner-f");
        var c = a.data(b, "numberspinner").options;
        a(b).numberbox(c).spinner(c), a(b).numberbox("setValue", c.value);
    }
    function c(b, c) {
        var d = a.data(b, "numberspinner").options, e = parseFloat(a(b).numberbox("getValue") || d.value) || 0;
        c ? e -= d.increment : e += d.increment, a(b).numberbox("setValue", e);
    }
    a.fn.numberspinner = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.numberspinner.methods[c];
            return e ? e(this, d) : this.numberbox(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "numberspinner");
            d ? a.extend(d.options, c) : a.data(this, "numberspinner", {
                options: a.extend({}, a.fn.numberspinner.defaults, a.fn.numberspinner.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.numberspinner.methods = {
        options: function(b) {
            var c = b.numberbox("options");
            return a.extend(a.data(b[0], "numberspinner").options, {
                width: c.width,
                value: c.value,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        }
    }, a.fn.numberspinner.parseOptions = function(b) {
        return a.extend({}, a.fn.spinner.parseOptions(b), a.fn.numberbox.parseOptions(b), {});
    }, a.fn.numberspinner.defaults = a.extend({}, a.fn.spinner.defaults, a.fn.numberbox.defaults, {
        spin: function(a) {
            c(this, a);
        }
    });
}(jQuery), function(a) {
    function b(b) {
        var e = (a.data(b, "propertygrid"), a.data(b, "propertygrid").options);
        a(b).datagrid(a.extend({}, e, {
            cls: "propertygrid",
            view: e.showGroup ? e.groupView : e.view,
            onBeforeEdit: function(c, d) {
                if (0 == e.onBeforeEdit.call(b, c, d)) return !1;
                var f = a(this), d = f.datagrid("getRows")[c], g = f.datagrid("getColumnOption", "value");
                g.editor = d.editor;
            },
            onClickCell: function(f, g, h) {
                if (d != this && (c(d), d = this), e.editIndex != f) {
                    c(d), a(this).datagrid("beginEdit", f);
                    var i = a(this).datagrid("getEditor", {
                        index: f,
                        field: g
                    });
                    if (i || (i = a(this).datagrid("getEditor", {
                        index: f,
                        field: "value"
                    })), i) {
                        var j = a(i.target), k = j.data("textbox") ? j.textbox("textbox") : j;
                        k.focus(), e.editIndex = f;
                    }
                }
                e.onClickCell.call(b, f, g, h);
            },
            loadFilter: function(a) {
                return c(this), e.loadFilter.call(this, a);
            }
        }));
    }
    function c(b) {
        var c = a(b);
        if (c.length) {
            var d = a.data(b, "propertygrid").options;
            d.finder.getTr(b, null, "editing").each(function() {
                var b = parseInt(a(this).attr("datagrid-row-index"));
                c.datagrid("validateRow", b) ? c.datagrid("endEdit", b) : c.datagrid("cancelEdit", b);
            }), d.editIndex = void 0;
        }
    }
    var d;
    a(document).unbind(".propertygrid").bind("mousedown.propertygrid", function(b) {
        var e = a(b.target).closest("div.datagrid-view,div.combo-panel");
        e.length || (c(d), d = void 0);
    }), a.fn.propertygrid = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.propertygrid.methods[c];
            return e ? e(this, d) : this.datagrid(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "propertygrid");
            if (d) a.extend(d.options, c); else {
                var e = a.extend({}, a.fn.propertygrid.defaults, a.fn.propertygrid.parseOptions(this), c);
                e.frozenColumns = a.extend(!0, [], e.frozenColumns), e.columns = a.extend(!0, [], e.columns), 
                a.data(this, "propertygrid", {
                    options: e
                });
            }
            b(this);
        });
    }, a.fn.propertygrid.methods = {
        options: function(b) {
            return a.data(b[0], "propertygrid").options;
        }
    }, a.fn.propertygrid.parseOptions = function(b) {
        return a.extend({}, a.fn.datagrid.parseOptions(b), a.parser.parseOptions(b, [ {
            showGroup: "boolean"
        } ]));
    };
    var e = a.extend({}, a.fn.datagrid.defaults.view, {
        render: function(b, c, d) {
            for (var e = [], f = this.groups, g = 0; g < f.length; g++) e.push(this.renderGroup.call(this, b, g, f[g], d));
            a(c).html(e.join(""));
        },
        renderGroup: function(b, c, d, e) {
            var f = a.data(b, "datagrid"), g = f.options, h = a(b).datagrid("getColumnFields", e), i = [];
            i.push('<div class="datagrid-group" group-index=' + c + ">"), i.push('<table cellspacing="0" cellpadding="0" border="0" style="height:100%"><tbody>'), 
            i.push("<tr>"), (e && (g.rownumbers || g.frozenColumns.length) || !e && !g.rownumbers && !g.frozenColumns.length) && i.push('<td style="border:0;text-align:center;width:25px"><span class="datagrid-row-expander datagrid-row-collapse" style="display:inline-block;width:16px;height:16px;cursor:pointer">&nbsp;</span></td>'), 
            i.push('<td style="border:0;">'), e || (i.push('<span class="datagrid-group-title">'), 
            i.push(g.groupFormatter.call(b, d.value, d.rows)), i.push("</span>")), i.push("</td>"), 
            i.push("</tr>"), i.push("</tbody></table>"), i.push("</div>"), i.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
            for (var j = d.startIndex, k = 0; k < d.rows.length; k++) {
                var l = g.rowStyler ? g.rowStyler.call(b, j, d.rows[k]) : "", m = "", n = "";
                "string" == typeof l ? n = l : l && (m = l["class"] || "", n = l.style || "");
                var o = 'class="datagrid-row ' + (j % 2 && g.striped ? "datagrid-row-alt " : " ") + m + '"', p = n ? 'style="' + n + '"' : "", q = f.rowIdPrefix + "-" + (e ? 1 : 2) + "-" + j;
                i.push('<tr id="' + q + '" datagrid-row-index="' + j + '" ' + o + " " + p + ">"), 
                i.push(this.renderRow.call(this, b, h, e, j, d.rows[k])), i.push("</tr>"), j++;
            }
            return i.push("</tbody></table>"), i.join("");
        },
        bindEvents: function(b) {
            var c = a.data(b, "datagrid"), d = c.dc, e = d.body1.add(d.body2), f = (a.data(e[0], "events") || a._data(e[0], "events")).click[0].handler;
            e.unbind("click").bind("click", function(c) {
                var d = a(c.target), e = d.closest("span.datagrid-row-expander");
                if (e.length) {
                    var g = e.closest("div.datagrid-group").attr("group-index");
                    e.hasClass("datagrid-row-collapse") ? a(b).datagrid("collapseGroup", g) : a(b).datagrid("expandGroup", g);
                } else f(c);
                c.stopPropagation();
            });
        },
        onBeforeRender: function(b, c) {
            function d(a) {
                for (var b = 0; b < h.length; b++) {
                    var c = h[b];
                    if (c.value == a) return c;
                }
                return null;
            }
            function e() {
                a("#datagrid-group-style").length || a("head").append('<style id="datagrid-group-style">.datagrid-group{height:25px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}</style>');
            }
            var f = a.data(b, "datagrid"), g = f.options;
            e();
            for (var h = [], i = 0; i < c.length; i++) {
                var j = c[i], k = d(j[g.groupField]);
                k ? k.rows.push(j) : (k = {
                    value: j[g.groupField],
                    rows: [ j ]
                }, h.push(k));
            }
            for (var l = 0, m = [], i = 0; i < h.length; i++) {
                var k = h[i];
                k.startIndex = l, l += k.rows.length, m = m.concat(k.rows);
            }
            f.data.rows = m, this.groups = h;
            var n = this;
            setTimeout(function() {
                n.bindEvents(b);
            }, 0);
        }
    });
    a.extend(a.fn.datagrid.methods, {
        expandGroup: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "datagrid").dc.view, d = b.find(void 0 != c ? 'div.datagrid-group[group-index="' + c + '"]' : "div.datagrid-group"), e = d.find("span.datagrid-row-expander");
                e.hasClass("datagrid-row-expand") && (e.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse"), 
                d.next("table").show()), a(this).datagrid("fixRowHeight");
            });
        },
        collapseGroup: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "datagrid").dc.view, d = b.find(void 0 != c ? 'div.datagrid-group[group-index="' + c + '"]' : "div.datagrid-group"), e = d.find("span.datagrid-row-expander");
                e.hasClass("datagrid-row-collapse") && (e.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand"), 
                d.next("table").hide()), a(this).datagrid("fixRowHeight");
            });
        }
    }), a.extend(e, {
        refreshGroupTitle: function(b, c) {
            var d = a.data(b, "datagrid"), e = d.options, f = d.dc, g = this.groups[c], h = f.body2.children("div.datagrid-group[group-index=" + c + "]").find("span.datagrid-group-title");
            h.html(e.groupFormatter.call(b, g.value, g.rows));
        },
        insertRow: function(b, c, d) {
            function e(a, c) {
                var d = c ? 1 : 2, e = h.finder.getTr(b, a - 1, "body", d), f = h.finder.getTr(b, a, "body", d);
                f.insertAfter(e);
            }
            for (var f, g = a.data(b, "datagrid"), h = g.options, i = g.dc, j = null, k = 0; k < this.groups.length; k++) if (this.groups[k].value == d[h.groupField]) {
                j = this.groups[k], f = k;
                break;
            }
            j ? ((void 0 == c || null == c) && (c = g.data.rows.length), c < j.startIndex ? c = j.startIndex : c > j.startIndex + j.rows.length && (c = j.startIndex + j.rows.length), 
            a.fn.datagrid.defaults.view.insertRow.call(this, b, c, d), c >= j.startIndex + j.rows.length && (e(c, !0), 
            e(c, !1)), j.rows.splice(c - j.startIndex, 0, d)) : (j = {
                value: d[h.groupField],
                rows: [ d ],
                startIndex: g.data.rows.length
            }, f = this.groups.length, i.body1.append(this.renderGroup.call(this, b, f, j, !0)), 
            i.body2.append(this.renderGroup.call(this, b, f, j, !1)), this.groups.push(j), g.data.rows.push(d)), 
            this.refreshGroupTitle(b, f);
        },
        updateRow: function(b, c, d) {
            var e = a.data(b, "datagrid").options;
            a.fn.datagrid.defaults.view.updateRow.call(this, b, c, d);
            var f = e.finder.getTr(b, c, "body", 2).closest("table.datagrid-btable"), g = parseInt(f.prev().attr("group-index"));
            this.refreshGroupTitle(b, g);
        },
        deleteRow: function(b, c) {
            var d = a.data(b, "datagrid"), e = d.options, f = d.dc, g = f.body1.add(f.body2), h = e.finder.getTr(b, c, "body", 2).closest("table.datagrid-btable"), i = parseInt(h.prev().attr("group-index"));
            a.fn.datagrid.defaults.view.deleteRow.call(this, b, c);
            var j = this.groups[i];
            if (j.rows.length > 1) j.rows.splice(c - j.startIndex, 1), this.refreshGroupTitle(b, i); else {
                g.children("div.datagrid-group[group-index=" + i + "]").remove();
                for (var k = i + 1; k < this.groups.length; k++) g.children("div.datagrid-group[group-index=" + k + "]").attr("group-index", k - 1);
                this.groups.splice(i, 1);
            }
            for (var c = 0, k = 0; k < this.groups.length; k++) {
                var j = this.groups[k];
                j.startIndex = c, c += j.rows.length;
            }
        }
    }), a.fn.propertygrid.defaults = a.extend({}, a.fn.datagrid.defaults, {
        singleSelect: !0,
        remoteSort: !1,
        fitColumns: !0,
        loadMsg: "",
        frozenColumns: [ [ {
            field: "f",
            width: 16,
            resizable: !1
        } ] ],
        columns: [ [ {
            field: "name",
            title: "Name",
            width: 100,
            sortable: !0
        }, {
            field: "value",
            title: "Value",
            width: 100,
            resizable: !1
        } ] ],
        showGroup: !1,
        groupView: e,
        groupField: "group",
        groupFormatter: function(a, b) {
            return a;
        }
    });
}(jQuery), function(a) {
    function b(b) {
        var d = a.data(b, "treegrid"), e = d.options;
        a(b).datagrid(a.extend({}, e, {
            url: null,
            data: null,
            loader: function() {
                return !1;
            },
            onBeforeLoad: function() {
                return !1;
            },
            onLoadSuccess: function() {},
            onResizeColumn: function(a, d) {
                c(b), e.onResizeColumn.call(b, a, d);
            },
            onBeforeSortColumn: function(a, c) {
                return 0 == e.onBeforeSortColumn.call(b, a, c) ? !1 : void 0;
            },
            onSortColumn: function(c, d) {
                if (e.sortName = c, e.sortOrder = d, e.remoteSort) i(b); else {
                    var f = a(b).treegrid("getData");
                    h(b, 0, f);
                }
                e.onSortColumn.call(b, c, d);
            },
            onClickCell: function(a, c) {
                e.onClickCell.call(b, c, o(b, a));
            },
            onDblClickCell: function(a, c) {
                e.onDblClickCell.call(b, c, o(b, a));
            },
            onRowContextMenu: function(a, c) {
                e.onContextMenu.call(b, a, o(b, c));
            }
        }));
        var f = a.data(b, "datagrid").options;
        if (e.columns = f.columns, e.frozenColumns = f.frozenColumns, d.dc = a.data(b, "datagrid").dc, 
        e.pagination) {
            var g = a(b).datagrid("getPager");
            g.pagination({
                pageNumber: e.pageNumber,
                pageSize: e.pageSize,
                pageList: e.pageList,
                onSelectPage: function(a, c) {
                    e.pageNumber = a, e.pageSize = c, i(b);
                }
            }), e.pageSize = g.pagination("options").pageSize;
        }
    }
    function c(b, c) {
        function d(a) {
            var c = e.finder.getTr(b, a, "body", 1), d = e.finder.getTr(b, a, "body", 2);
            c.css("height", ""), d.css("height", "");
            var f = Math.max(c.height(), d.height());
            c.css("height", f), d.css("height", f);
        }
        var e = a.data(b, "datagrid").options, f = a.data(b, "datagrid").dc;
        if (!f.body1.is(":empty") && (!e.nowrap || e.autoRowHeight) && void 0 != c) for (var g = m(b, c), h = 0; h < g.length; h++) d(g[h][e.idField]);
        a(b).datagrid("fixRowHeight", c);
    }
    function d(b) {
        var c = a.data(b, "datagrid").dc, d = a.data(b, "treegrid").options;
        d.rownumbers && c.body1.find("div.datagrid-cell-rownumber").each(function(b) {
            a(this).html(b + 1);
        });
    }
    function e(b) {
        return function(c) {
            a.fn.datagrid.defaults.rowEvents[b ? "mouseover" : "mouseout"](c);
            var d = a(c.target), e = b ? "addClass" : "removeClass";
            d.hasClass("tree-hit") && d[e](d.hasClass("tree-expanded") ? "tree-expanded-hover" : "tree-collapsed-hover");
        };
    }
    function f(b) {
        var c = a(b.target);
        if (c.hasClass("tree-hit")) {
            var d = c.closest("tr.datagrid-row"), e = d.closest("div.datagrid-view").children(".datagrid-f")[0];
            r(e, d.attr("node-id"));
        } else a.fn.datagrid.defaults.rowEvents.click(b);
    }
    function g(b, c) {
        function d(b, c) {
            a('<tr class="treegrid-tr-tree"><td style="border:0px" colspan="' + c + '"><div></div></td></tr>').insertAfter(b);
        }
        var e = a.data(b, "treegrid").options, f = e.finder.getTr(b, c, "body", 1), g = e.finder.getTr(b, c, "body", 2), h = a(b).datagrid("getColumnFields", !0).length + (e.rownumbers ? 1 : 0), i = a(b).datagrid("getColumnFields", !1).length;
        d(f, h), d(g, i);
    }
    function h(b, e, f, g) {
        var h = a.data(b, "treegrid"), i = h.options, j = h.dc;
        f = i.loadFilter.call(b, f, e);
        var k = o(b, e);
        if (k) {
            var l = i.finder.getTr(b, e, "body", 1), m = i.finder.getTr(b, e, "body", 2), n = l.next("tr.treegrid-tr-tree").children("td").children("div"), p = m.next("tr.treegrid-tr-tree").children("td").children("div");
            g || (k.children = []);
        } else {
            var n = j.body1, p = j.body2;
            g || (h.data = []);
        }
        if (g || (n.empty(), p.empty()), i.view.onBeforeRender && i.view.onBeforeRender.call(i.view, b, e, f), 
        i.view.render.call(i.view, b, n, !0), i.view.render.call(i.view, b, p, !1), i.showFooter && (i.view.renderFooter.call(i.view, b, j.footer1, !0), 
        i.view.renderFooter.call(i.view, b, j.footer2, !1)), i.view.onAfterRender && i.view.onAfterRender.call(i.view, b), 
        !e && i.pagination) {
            var q = a.data(b, "treegrid").total, r = a(b).datagrid("getPager");
            r.pagination("options").total != q && r.pagination({
                total: q
            });
        }
        c(b), d(b), a(b).treegrid("showLines"), a(b).treegrid("setSelectionState"), a(b).treegrid("autoSizeColumn"), 
        i.onLoadSuccess.call(b, k, f);
    }
    function i(b, c, d, e, f) {
        var g = a.data(b, "treegrid").options, i = a(b).datagrid("getPanel").find("div.datagrid-body");
        d && (g.queryParams = d);
        var j = a.extend({}, g.queryParams);
        g.pagination && a.extend(j, {
            page: g.pageNumber,
            rows: g.pageSize
        }), g.sortName && a.extend(j, {
            sort: g.sortName,
            order: g.sortOrder
        });
        var k = o(b, c);
        if (0 != g.onBeforeLoad.call(b, k, j)) {
            var l = i.find('tr[node-id="' + c + '"] span.tree-folder');
            l.addClass("tree-loading"), a(b).treegrid("loading");
            var m = g.loader.call(b, j, function(d) {
                l.removeClass("tree-loading"), a(b).treegrid("loaded"), h(b, c, d, e), f && f();
            }, function() {
                l.removeClass("tree-loading"), a(b).treegrid("loaded"), g.onLoadError.apply(b, arguments), 
                f && f();
            });
            0 == m && (l.removeClass("tree-loading"), a(b).treegrid("loaded"));
        }
    }
    function j(a) {
        var b = k(a);
        return b.length ? b[0] : null;
    }
    function k(b) {
        return a.data(b, "treegrid").data;
    }
    function l(a, b) {
        var c = o(a, b);
        return c._parentId ? o(a, c._parentId) : null;
    }
    function m(b, c) {
        function d(a) {
            var c = o(b, a);
            if (c && c.children) for (var g = 0, h = c.children.length; h > g; g++) {
                var i = c.children[g];
                f.push(i), d(i[e.idField]);
            }
        }
        var e = a.data(b, "treegrid").options, f = (a(b).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body"), 
        []);
        if (c) d(c); else for (var g = k(b), h = 0; h < g.length; h++) f.push(g[h]), d(g[h][e.idField]);
        return f;
    }
    function n(b, c) {
        if (!c) return 0;
        var d = a.data(b, "treegrid").options, e = a(b).datagrid("getPanel").children("div.datagrid-view"), f = e.find('div.datagrid-body tr[node-id="' + c + '"]').children('td[field="' + d.treeField + '"]');
        return f.find("span.tree-indent,span.tree-hit").length;
    }
    function o(b, c) {
        for (var d = a.data(b, "treegrid").options, e = a.data(b, "treegrid").data, f = [ e ]; f.length; ) for (var g = f.shift(), h = 0; h < g.length; h++) {
            var i = g[h];
            if (i[d.idField] == c) return i;
            i.children && f.push(i.children);
        }
        return null;
    }
    function p(b, d) {
        var e = a.data(b, "treegrid").options, f = o(b, d), g = e.finder.getTr(b, d), h = g.find("span.tree-hit");
        if (0 != h.length && !h.hasClass("tree-collapsed") && 0 != e.onBeforeCollapse.call(b, f)) {
            h.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed"), h.next().removeClass("tree-folder-open"), 
            f.state = "closed", g = g.next("tr.treegrid-tr-tree");
            var i = g.children("td").children("div");
            e.animate ? i.slideUp("normal", function() {
                a(b).treegrid("autoSizeColumn"), c(b, d), e.onCollapse.call(b, f);
            }) : (i.hide(), a(b).treegrid("autoSizeColumn"), c(b, d), e.onCollapse.call(b, f));
        }
    }
    function q(b, d) {
        function e(e) {
            k.state = "open", f.animate ? e.slideDown("normal", function() {
                a(b).treegrid("autoSizeColumn"), c(b, d), f.onExpand.call(b, k);
            }) : (e.show(), a(b).treegrid("autoSizeColumn"), c(b, d), f.onExpand.call(b, k));
        }
        var f = a.data(b, "treegrid").options, h = f.finder.getTr(b, d), j = h.find("span.tree-hit"), k = o(b, d);
        if (0 != j.length && !j.hasClass("tree-expanded") && 0 != f.onBeforeExpand.call(b, k)) {
            j.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded"), 
            j.next().addClass("tree-folder-open");
            var l = h.next("tr.treegrid-tr-tree");
            if (l.length) {
                var m = l.children("td").children("div");
                e(m);
            } else {
                g(b, k[f.idField]);
                var l = h.next("tr.treegrid-tr-tree"), m = l.children("td").children("div");
                m.hide();
                var n = a.extend({}, f.queryParams || {});
                n.id = k[f.idField], i(b, k[f.idField], n, !0, function() {
                    m.is(":empty") ? l.remove() : e(m);
                });
            }
        }
    }
    function r(b, c) {
        var d = a.data(b, "treegrid").options, e = d.finder.getTr(b, c), f = e.find("span.tree-hit");
        f.hasClass("tree-expanded") ? p(b, c) : q(b, c);
    }
    function s(b, c) {
        var d = a.data(b, "treegrid").options, e = m(b, c);
        c && e.unshift(o(b, c));
        for (var f = 0; f < e.length; f++) p(b, e[f][d.idField]);
    }
    function t(b, c) {
        var d = a.data(b, "treegrid").options, e = m(b, c);
        c && e.unshift(o(b, c));
        for (var f = 0; f < e.length; f++) q(b, e[f][d.idField]);
    }
    function u(b, c) {
        for (var d = a.data(b, "treegrid").options, e = [], f = l(b, c); f; ) {
            var g = f[d.idField];
            e.unshift(g), f = l(b, g);
        }
        for (var h = 0; h < e.length; h++) q(b, e[h]);
    }
    function v(b, c) {
        var d = a.data(b, "treegrid").options;
        if (c.parent) {
            var e = d.finder.getTr(b, c.parent);
            0 == e.next("tr.treegrid-tr-tree").length && g(b, c.parent);
            var f = e.children('td[field="' + d.treeField + '"]').children("div.datagrid-cell"), i = f.children("span.tree-icon");
            if (i.hasClass("tree-file")) {
                i.removeClass("tree-file").addClass("tree-folder tree-folder-open");
                var j = a('<span class="tree-hit tree-expanded"></span>').insertBefore(i);
                j.prev().length && j.prev().remove();
            }
        }
        h(b, c.parent, c.data, !0);
    }
    function w(b, c) {
        function e(a) {
            var d = a ? 1 : 2, e = g.finder.getTr(b, c.data[g.idField], "body", d), h = e.closest("table.datagrid-btable");
            e = e.parent().children();
            var i = g.finder.getTr(b, f, "body", d);
            if (c.before) e.insertBefore(i); else {
                var j = i.next("tr.treegrid-tr-tree");
                e.insertAfter(j.length ? j : i);
            }
            h.remove();
        }
        var f = c.before || c.after, g = a.data(b, "treegrid").options, h = l(b, f);
        v(b, {
            parent: h ? h[g.idField] : null,
            data: [ c.data ]
        });
        for (var i = h ? h.children : a(b).treegrid("getRoots"), j = 0; j < i.length; j++) if (i[j][g.idField] == f) {
            var k = i[i.length - 1];
            i.splice(c.before ? j : j + 1, 0, k), i.splice(i.length - 1, 1);
            break;
        }
        e(!0), e(!1), d(b), a(b).treegrid("showLines");
    }
    function x(b, c) {
        var e = a.data(b, "treegrid");
        a(b).datagrid("deleteRow", c), d(b), e.total -= 1, a(b).datagrid("getPager").pagination("refresh", {
            total: e.total
        }), a(b).treegrid("showLines");
    }
    function y(b) {
        function c(b) {
            if (a.map(b, function(a) {
                if (a.children && a.children.length) c(a.children); else {
                    var b = e(a);
                    b.find(".tree-icon").prev().addClass("tree-join");
                }
            }), b.length) {
                var d = e(b[b.length - 1]);
                d.addClass("tree-node-last"), d.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
            }
        }
        function d(c) {
            a.map(c, function(a) {
                a.children && a.children.length && d(a.children);
            });
            for (var e = 0; e < c.length - 1; e++) {
                var h = c[e], i = f.treegrid("getLevel", h[g.idField]), j = g.finder.getTr(b, h[g.idField]), k = j.next().find('tr.datagrid-row td[field="' + g.treeField + '"] div.datagrid-cell');
                k.find("span:eq(" + (i - 1) + ")").addClass("tree-line");
            }
        }
        function e(a) {
            var c = g.finder.getTr(b, a[g.idField]), d = c.find('td[field="' + g.treeField + '"] div.datagrid-cell');
            return d;
        }
        var f = a(b), g = f.treegrid("options");
        if (!g.lines) return void f.treegrid("getPanel").removeClass("tree-lines");
        f.treegrid("getPanel").addClass("tree-lines"), f.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom"), 
        f.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
        var h = f.treegrid("getRoots");
        h.length > 1 ? e(h[0]).addClass("tree-root-first") : 1 == h.length && e(h[0]).addClass("tree-root-one"), 
        c(h), d(h);
    }
    a.fn.treegrid = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.treegrid.methods[c];
            return e ? e(this, d) : this.datagrid(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "treegrid");
            d ? a.extend(d.options, c) : d = a.data(this, "treegrid", {
                options: a.extend({}, a.fn.treegrid.defaults, a.fn.treegrid.parseOptions(this), c),
                data: []
            }), b(this), d.options.data && a(this).treegrid("loadData", d.options.data), i(this);
        });
    }, a.fn.treegrid.methods = {
        options: function(b) {
            return a.data(b[0], "treegrid").options;
        },
        resize: function(b, c) {
            return b.each(function() {
                a(this).datagrid("resize", c);
            });
        },
        fixRowHeight: function(a, b) {
            return a.each(function() {
                c(this, b);
            });
        },
        loadData: function(a, b) {
            return a.each(function() {
                h(this, b.parent, b);
            });
        },
        load: function(b, c) {
            return b.each(function() {
                a(this).treegrid("options").pageNumber = 1, a(this).treegrid("getPager").pagination({
                    pageNumber: 1
                }), a(this).treegrid("reload", c);
            });
        },
        reload: function(b, c) {
            return b.each(function() {
                var b = a(this).treegrid("options"), d = {};
                if ("object" == typeof c ? d = c : (d = a.extend({}, b.queryParams), d.id = c), 
                d.id) {
                    var e = a(this).treegrid("find", d.id);
                    e.children && e.children.splice(0, e.children.length), b.queryParams = d;
                    var f = b.finder.getTr(this, d.id);
                    f.next("tr.treegrid-tr-tree").remove(), f.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed"), 
                    q(this, d.id);
                } else i(this, null, d);
            });
        },
        reloadFooter: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "treegrid").options, d = a.data(this, "datagrid").dc;
                c && (a.data(this, "treegrid").footer = c), b.showFooter && (b.view.renderFooter.call(b.view, this, d.footer1, !0), 
                b.view.renderFooter.call(b.view, this, d.footer2, !1), b.view.onAfterRender && b.view.onAfterRender.call(b.view, this), 
                a(this).treegrid("fixRowHeight"));
            });
        },
        getData: function(b) {
            return a.data(b[0], "treegrid").data;
        },
        getFooterRows: function(b) {
            return a.data(b[0], "treegrid").footer;
        },
        getRoot: function(a) {
            return j(a[0]);
        },
        getRoots: function(a) {
            return k(a[0]);
        },
        getParent: function(a, b) {
            return l(a[0], b);
        },
        getChildren: function(a, b) {
            return m(a[0], b);
        },
        getLevel: function(a, b) {
            return n(a[0], b);
        },
        find: function(a, b) {
            return o(a[0], b);
        },
        isLeaf: function(b, c) {
            var d = a.data(b[0], "treegrid").options, e = d.finder.getTr(b[0], c), f = e.find("span.tree-hit");
            return 0 == f.length;
        },
        select: function(b, c) {
            return b.each(function() {
                a(this).datagrid("selectRow", c);
            });
        },
        unselect: function(b, c) {
            return b.each(function() {
                a(this).datagrid("unselectRow", c);
            });
        },
        collapse: function(a, b) {
            return a.each(function() {
                p(this, b);
            });
        },
        expand: function(a, b) {
            return a.each(function() {
                q(this, b);
            });
        },
        toggle: function(a, b) {
            return a.each(function() {
                r(this, b);
            });
        },
        collapseAll: function(a, b) {
            return a.each(function() {
                s(this, b);
            });
        },
        expandAll: function(a, b) {
            return a.each(function() {
                t(this, b);
            });
        },
        expandTo: function(a, b) {
            return a.each(function() {
                u(this, b);
            });
        },
        append: function(a, b) {
            return a.each(function() {
                v(this, b);
            });
        },
        insert: function(a, b) {
            return a.each(function() {
                w(this, b);
            });
        },
        remove: function(a, b) {
            return a.each(function() {
                x(this, b);
            });
        },
        pop: function(a, b) {
            var c = a.treegrid("find", b);
            return a.treegrid("remove", b), c;
        },
        refresh: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "treegrid").options;
                b.view.refreshRow.call(b.view, this, c);
            });
        },
        update: function(b, c) {
            return b.each(function() {
                var b = a.data(this, "treegrid").options;
                b.view.updateRow.call(b.view, this, c.id, c.row);
            });
        },
        beginEdit: function(b, c) {
            return b.each(function() {
                a(this).datagrid("beginEdit", c), a(this).treegrid("fixRowHeight", c);
            });
        },
        endEdit: function(b, c) {
            return b.each(function() {
                a(this).datagrid("endEdit", c);
            });
        },
        cancelEdit: function(b, c) {
            return b.each(function() {
                a(this).datagrid("cancelEdit", c);
            });
        },
        showLines: function(a) {
            return a.each(function() {
                y(this);
            });
        }
    }, a.fn.treegrid.parseOptions = function(b) {
        return a.extend({}, a.fn.datagrid.parseOptions(b), a.parser.parseOptions(b, [ "treeField", {
            animate: "boolean"
        } ]));
    };
    var z = a.extend({}, a.fn.datagrid.defaults.view, {
        render: function(b, c, d) {
            function e(c, d, j) {
                for (var k = a(b).treegrid("getParent", j[0][f.idField]), l = (k ? k.children.length : a(b).treegrid("getRoots").length) - j.length, m = [ '<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>' ], n = 0; n < j.length; n++) {
                    var o = j[n];
                    "open" != o.state && "closed" != o.state && (o.state = "open");
                    var p = f.rowStyler ? f.rowStyler.call(b, o) : "", q = "", r = "";
                    "string" == typeof p ? r = p : p && (q = p["class"] || "", r = p.style || "");
                    var s = 'class="datagrid-row ' + (l++ % 2 && f.striped ? "datagrid-row-alt " : " ") + q + '"', t = r ? 'style="' + r + '"' : "", u = h + "-" + (c ? 1 : 2) + "-" + o[f.idField];
                    if (m.push('<tr id="' + u + '" node-id="' + o[f.idField] + '" ' + s + " " + t + ">"), 
                    m = m.concat(i.renderRow.call(i, b, g, c, d, o)), m.push("</tr>"), o.children && o.children.length) {
                        var v = e(c, d + 1, o.children), w = "closed" == o.state ? "none" : "block";
                        m.push('<tr class="treegrid-tr-tree"><td style="border:0px" colspan=' + (g.length + (f.rownumbers ? 1 : 0)) + '><div style="display:' + w + '">'), 
                        m = m.concat(v), m.push("</div></td></tr>");
                    }
                }
                return m.push("</tbody></table>"), m;
            }
            var f = a.data(b, "treegrid").options, g = a(b).datagrid("getColumnFields", d), h = a.data(b, "datagrid").rowIdPrefix;
            if (!d || f.rownumbers || f.frozenColumns && f.frozenColumns.length) {
                var i = this;
                if (this.treeNodes && this.treeNodes.length) {
                    var j = e(d, this.treeLevel, this.treeNodes);
                    a(c).append(j.join(""));
                }
            }
        },
        renderFooter: function(b, c, d) {
            for (var e = a.data(b, "treegrid").options, f = a.data(b, "treegrid").footer || [], g = a(b).datagrid("getColumnFields", d), h = [ '<table class="datagrid-ftable" cellspacing="0" cellpadding="0" border="0"><tbody>' ], i = 0; i < f.length; i++) {
                var j = f[i];
                j[e.idField] = j[e.idField] || "foot-row-id" + i, h.push('<tr class="datagrid-row" node-id="' + j[e.idField] + '">'), 
                h.push(this.renderRow.call(this, b, g, d, 0, j)), h.push("</tr>");
            }
            h.push("</tbody></table>"), a(c).html(h.join(""));
        },
        renderRow: function(b, c, d, e, f) {
            var g = a.data(b, "treegrid").options, h = [];
            d && g.rownumbers && h.push('<td class="datagrid-td-rownumber"><div class="datagrid-cell-rownumber">0</div></td>');
            for (var i = 0; i < c.length; i++) {
                var j = c[i], k = a(b).datagrid("getColumnOption", j);
                if (k) {
                    var l = k.styler ? k.styler(f[j], f) || "" : "", m = "", n = "";
                    "string" == typeof l ? n = l : h && (m = l["class"] || "", n = l.style || "");
                    var o = m ? 'class="' + m + '"' : "", p = k.hidden ? 'style="display:none;' + n + '"' : n ? 'style="' + n + '"' : "";
                    h.push('<td field="' + j + '" ' + o + " " + p + ">");
                    var p = "";
                    if (k.checkbox || (k.align && (p += "text-align:" + k.align + ";"), g.nowrap ? g.autoRowHeight && (p += "height:auto;") : p += "white-space:normal;height:auto;"), 
                    h.push('<div style="' + p + '" '), h.push(k.checkbox ? 'class="datagrid-cell-check ' : 'class="datagrid-cell ' + k.cellClass), 
                    h.push('">'), k.checkbox) h.push(f.checked ? '<input type="checkbox" checked="checked"' : '<input type="checkbox"'), 
                    h.push(' name="' + j + '" value="' + (void 0 != f[j] ? f[j] : "") + '">'); else {
                        var q = null;
                        if (q = k.formatter ? k.formatter(f[j], f) : f[j], j == g.treeField) {
                            for (var r = 0; e > r; r++) h.push('<span class="tree-indent"></span>');
                            "closed" == f.state ? (h.push('<span class="tree-hit tree-collapsed"></span>'), 
                            h.push('<span class="tree-icon tree-folder ' + (f.iconCls ? f.iconCls : "") + '"></span>')) : f.children && f.children.length ? (h.push('<span class="tree-hit tree-expanded"></span>'), 
                            h.push('<span class="tree-icon tree-folder tree-folder-open ' + (f.iconCls ? f.iconCls : "") + '"></span>')) : (h.push('<span class="tree-indent"></span>'), 
                            h.push('<span class="tree-icon tree-file ' + (f.iconCls ? f.iconCls : "") + '"></span>')), 
                            h.push('<span class="tree-title">' + q + "</span>");
                        } else h.push(q);
                    }
                    h.push("</div>"), h.push("</td>");
                }
            }
            return h.join("");
        },
        refreshRow: function(a, b) {
            this.updateRow.call(this, a, b, {});
        },
        updateRow: function(b, c, d) {
            function e(d) {
                var e = a(b).treegrid("getColumnFields", d), l = f.finder.getTr(b, c, "body", d ? 1 : 2), m = l.find("div.datagrid-cell-rownumber").html(), n = l.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
                l.html(this.renderRow(b, e, d, h, g)), l.attr("style", i || ""), l.find("div.datagrid-cell-rownumber").html(m), 
                n && l.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked", !0), 
                k != c && (l.attr("id", j + "-" + (d ? 1 : 2) + "-" + k), l.attr("node-id", k));
            }
            var f = a.data(b, "treegrid").options, g = a(b).treegrid("find", c);
            a.extend(g, d);
            var h = a(b).treegrid("getLevel", c) - 1, i = f.rowStyler ? f.rowStyler.call(b, g) : "", j = a.data(b, "datagrid").rowIdPrefix, k = g[f.idField];
            e.call(this, !0), e.call(this, !1), a(b).treegrid("fixRowHeight", c);
        },
        deleteRow: function(b, c) {
            function d(c) {
                var d, f = a(b).treegrid("getParent", c);
                d = f ? f.children : a(b).treegrid("getData");
                for (var g = 0; g < d.length; g++) if (d[g][e.idField] == c) {
                    d.splice(g, 1);
                    break;
                }
                return f;
            }
            var e = a.data(b, "treegrid").options, f = e.finder.getTr(b, c);
            f.next("tr.treegrid-tr-tree").remove(), f.remove();
            var g = d(c);
            if (g && 0 == g.children.length) {
                f = e.finder.getTr(b, g[e.idField]), f.next("tr.treegrid-tr-tree").remove();
                var h = f.children('td[field="' + e.treeField + '"]').children("div.datagrid-cell");
                h.find(".tree-icon").removeClass("tree-folder").addClass("tree-file"), h.find(".tree-hit").remove(), 
                a('<span class="tree-indent"></span>').prependTo(h);
            }
        },
        onBeforeRender: function(b, c, d) {
            function e(a, b) {
                for (var c = 0; c < a.length; c++) {
                    var d = a[c];
                    d._parentId = b, d.children && d.children.length && e(d.children, d[g.idField]);
                }
            }
            if (a.isArray(c) && (d = {
                total: c.length,
                rows: c
            }, c = null), !d) return !1;
            var f = a.data(b, "treegrid"), g = f.options;
            void 0 == d.length ? (d.footer && (f.footer = d.footer), d.total && (f.total = d.total), 
            d = this.transfer(b, c, d.rows)) : e(d, c);
            var h = o(b, c);
            h ? h.children ? h.children = h.children.concat(d) : h.children = d : f.data = f.data.concat(d), 
            this.sort(b, d), this.treeNodes = d, this.treeLevel = a(b).treegrid("getLevel", c);
        },
        sort: function(b, c) {
            function d(c) {
                c.sort(function(c, d) {
                    for (var e = 0, h = 0; h < f.length; h++) {
                        var i = f[h], j = g[h], k = a(b).treegrid("getColumnOption", i), l = k.sorter || function(a, b) {
                            return a == b ? 0 : a > b ? 1 : -1;
                        };
                        if (e = l(c[i], d[i]) * ("asc" == j ? 1 : -1), 0 != e) return e;
                    }
                    return e;
                });
                for (var e = 0; e < c.length; e++) {
                    var h = c[e].children;
                    h && h.length && d(h);
                }
            }
            var e = a.data(b, "treegrid").options;
            if (!e.remoteSort && e.sortName) {
                var f = e.sortName.split(","), g = e.sortOrder.split(",");
                d(c);
            }
        },
        transfer: function(b, c, d) {
            for (var e = a.data(b, "treegrid").options, f = [], g = 0; g < d.length; g++) f.push(d[g]);
            for (var h = [], g = 0; g < f.length; g++) {
                var i = f[g];
                c ? i._parentId == c && (h.push(i), f.splice(g, 1), g--) : i._parentId || (h.push(i), 
                f.splice(g, 1), g--);
            }
            for (var j = [], g = 0; g < h.length; g++) j.push(h[g]);
            for (;j.length; ) for (var k = j.shift(), g = 0; g < f.length; g++) {
                var i = f[g];
                i._parentId == k[e.idField] && (k.children ? k.children.push(i) : k.children = [ i ], 
                j.push(i), f.splice(g, 1), g--);
            }
            return h;
        }
    });
    a.fn.treegrid.defaults = a.extend({}, a.fn.datagrid.defaults, {
        treeField: null,
        lines: !1,
        animate: !1,
        singleSelect: !0,
        view: z,
        rowEvents: a.extend({}, a.fn.datagrid.defaults.rowEvents, {
            mouseover: e(!0),
            mouseout: e(!1),
            click: f
        }),
        loader: function(b, c, d) {
            var e = a(this).treegrid("options");
            return e.url ? void a.ajax({
                type: e.method,
                url: e.url,
                data: b,
                dataType: "json",
                success: function(a) {
                    c(a);
                },
                error: function() {
                    d.apply(this, arguments);
                }
            }) : !1;
        },
        loadFilter: function(a, b) {
            return a;
        },
        finder: {
            getTr: function(b, c, d, e) {
                d = d || "body", e = e || 0;
                var f = a.data(b, "datagrid").dc;
                if (0 == e) {
                    var g = a.data(b, "treegrid").options, h = g.finder.getTr(b, c, d, 1), i = g.finder.getTr(b, c, d, 2);
                    return h.add(i);
                }
                if ("body" == d) {
                    var j = a("#" + a.data(b, "datagrid").rowIdPrefix + "-" + e + "-" + c);
                    return j.length || (j = (1 == e ? f.body1 : f.body2).find('tr[node-id="' + c + '"]')), 
                    j;
                }
                return "footer" == d ? (1 == e ? f.footer1 : f.footer2).find('tr[node-id="' + c + '"]') : "selected" == d ? (1 == e ? f.body1 : f.body2).find("tr.datagrid-row-selected") : "highlight" == d ? (1 == e ? f.body1 : f.body2).find("tr.datagrid-row-over") : "checked" == d ? (1 == e ? f.body1 : f.body2).find("tr.datagrid-row-checked") : "last" == d ? (1 == e ? f.body1 : f.body2).find("tr:last[node-id]") : "allbody" == d ? (1 == e ? f.body1 : f.body2).find("tr[node-id]") : "allfooter" == d ? (1 == e ? f.footer1 : f.footer2).find("tr[node-id]") : void 0;
            },
            getRow: function(b, c) {
                var d = "object" == typeof c ? c.attr("node-id") : c;
                return a(b).treegrid("find", d);
            },
            getRows: function(b) {
                return a(b).treegrid("getChildren");
            }
        },
        onBeforeLoad: function(a, b) {},
        onLoadSuccess: function(a, b) {},
        onLoadError: function() {},
        onBeforeCollapse: function(a) {},
        onCollapse: function(a) {},
        onBeforeExpand: function(a) {},
        onExpand: function(a) {},
        onClickRow: function(a) {},
        onDblClickRow: function(a) {},
        onClickCell: function(a, b) {},
        onDblClickCell: function(a, b) {},
        onContextMenu: function(a, b) {},
        onBeforeEdit: function(a) {},
        onAfterEdit: function(a, b) {},
        onCancelEdit: function(a) {}
    });
}(jQuery), function($) {
    function getContentWidth(a) {
        var b = 0;
        return $(a).children().each(function() {
            b += $(this).outerWidth(!0);
        }), b;
    }
    function setScrollers(a) {
        var b = $.data(a, "tabs").options;
        if ("left" != b.tabPosition && "right" != b.tabPosition && b.showHeader) {
            var c = $(a).children("div.tabs-header"), d = c.children("div.tabs-tool:not(.tabs-tool-hidden)"), e = c.children("div.tabs-scroller-left"), f = c.children("div.tabs-scroller-right"), g = c.children("div.tabs-wrap"), h = c.outerHeight();
            b.plain && (h -= h - c.height()), d._outerHeight(h);
            var i = getContentWidth(c.find("ul.tabs")), j = c.width() - d._outerWidth();
            i > j ? (e.add(f).show()._outerHeight(h), "left" == b.toolPosition ? (d.css({
                left: e.outerWidth(),
                right: ""
            }), g.css({
                marginLeft: e.outerWidth() + d._outerWidth(),
                marginRight: f._outerWidth(),
                width: j - e.outerWidth() - f.outerWidth()
            })) : (d.css({
                left: "",
                right: f.outerWidth()
            }), g.css({
                marginLeft: e.outerWidth(),
                marginRight: f.outerWidth() + d._outerWidth(),
                width: j - e.outerWidth() - f.outerWidth()
            }))) : (e.add(f).hide(), "left" == b.toolPosition ? (d.css({
                left: 0,
                right: ""
            }), g.css({
                marginLeft: d._outerWidth(),
                marginRight: 0,
                width: j
            })) : (d.css({
                left: "",
                right: 0
            }), g.css({
                marginLeft: 0,
                marginRight: d._outerWidth(),
                width: j
            })));
        }
    }
    function addTools(container) {
        var opts = $.data(container, "tabs").options, header = $(container).children("div.tabs-header");
        if (opts.tools) if ("string" == typeof opts.tools) $(opts.tools).addClass("tabs-tool").appendTo(header), 
        $(opts.tools).show(); else {
            header.children("div.tabs-tool").remove();
            for (var tools = $('<div class="tabs-tool"><table cellspacing="0" cellpadding="0" style="height:100%"><tr></tr></table></div>').appendTo(header), tr = tools.find("tr"), i = 0; i < opts.tools.length; i++) {
                var td = $("<td></td>").appendTo(tr), tool = $('<a href="javascript:void(0);"></a>').appendTo(td);
                tool[0].onclick = eval(opts.tools[i].handler || function() {}), tool.linkbutton($.extend({}, opts.tools[i], {
                    plain: !0
                }));
            }
        } else header.children("div.tabs-tool").remove();
    }
    function setSize(a, b) {
        function c(a, b) {
            var c = a.panel("options"), d = c.tab.find("a.tabs-inner"), b = b ? b : parseInt(c.tabWidth || e.tabWidth || void 0);
            b ? d._outerWidth(b) : d.css("width", ""), d._outerHeight(e.tabHeight), d.css("lineHeight", d.height() + "px"), 
            d.find(".easyui-fluid:visible").triggerHandler("_resize");
        }
        var d = $.data(a, "tabs"), e = d.options, f = $(a);
        if (e.doSize) {
            b && $.extend(e, {
                width: b.width,
                height: b.height
            }), f._size(e);
            var g = f.children("div.tabs-header"), h = f.children("div.tabs-panels"), i = g.find("div.tabs-wrap"), j = i.find(".tabs");
            if (j.children("li").removeClass("tabs-first tabs-last"), j.children("li:first").addClass("tabs-first"), 
            j.children("li:last").addClass("tabs-last"), "left" == e.tabPosition || "right" == e.tabPosition ? (g._outerWidth(e.showHeader ? e.headerWidth : 0), 
            h._outerWidth(f.width() - g.outerWidth()), g.add(h)._outerHeight(e.height), i._outerWidth(g.width()), 
            j._outerWidth(i.width()).css("height", "")) : (g.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool:not(.tabs-tool-hidden)").css("display", e.showHeader ? "block" : "none"), 
            g._outerWidth(f.width()).css("height", ""), e.showHeader ? (g.css("background-color", ""), 
            i.css("height", "")) : (g.css({
                padding: 0,
                borderWidth: "0",
                backgroundColor: "transparent"
            }), g._outerHeight(0), i._outerHeight(0)), j._outerHeight(e.tabHeight).css("width", ""), 
            j._outerHeight(j.outerHeight() - j.height() - 1 + e.tabHeight).css("width", ""), 
            h._size("height", isNaN(e.height) ? "" : e.height - g.outerHeight()), h._size("width", isNaN(e.width) ? "" : e.width)), 
            d.tabs.length) {
                var k = j.outerWidth(!0) - j.width(), l = j.children("li:first"), m = l.outerWidth(!0) - l.width(), n = g.width() - g.children(".tabs-tool:not(.tabs-tool-hidden)")._outerWidth(), o = Math.floor((n - k - m * d.tabs.length) / d.tabs.length);
                if ($.map(d.tabs, function(a) {
                    c(a, e.justified && $.inArray(e.tabPosition, [ "top", "bottom" ]) >= 0 ? o : void 0);
                }), e.justified && $.inArray(e.tabPosition, [ "top", "bottom" ]) >= 0) {
                    var p = n - k - getContentWidth(j);
                    c(d.tabs[d.tabs.length - 1], o + p);
                }
            }
            setScrollers(a);
        }
    }
    function setSelectedSize(a) {
        var b = $.data(a, "tabs").options, c = getSelectedTab(a);
        if (c) {
            var d = $(a).children("div.tabs-panels"), e = "auto" == b.width ? "auto" : d.width(), f = "auto" == b.height ? "auto" : d.height();
            c.panel("resize", {
                width: e,
                height: f
            });
        }
    }
    function wrapTabs(a) {
        var b = ($.data(a, "tabs").tabs, $(a).addClass("tabs-container")), c = $('<div class="tabs-panels"></div>').insertBefore(b);
        b.children("div").each(function() {
            c[0].appendChild(this);
        }), b[0].appendChild(c[0]), $('<div class="tabs-header"><div class="tabs-scroller-left"></div><div class="tabs-scroller-right"></div><div class="tabs-wrap"><ul class="tabs"></ul></div></div>').prependTo(a), 
        b.children("div.tabs-panels").children("div").each(function(b) {
            var c = $.extend({}, $.parser.parseOptions(this), {
                selected: $(this).attr("selected") ? !0 : void 0
            });
            createTab(a, c, $(this));
        }), b.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function() {
            $(this).addClass("tabs-scroller-over");
        }, function() {
            $(this).removeClass("tabs-scroller-over");
        }), b.bind("_resize", function(b, c) {
            return ($(this).hasClass("easyui-fluid") || c) && (setSize(a), setSelectedSize(a)), 
            !1;
        });
    }
    function bindEvents(a) {
        function b(a) {
            var b = 0;
            return a.parent().children("li").each(function(c) {
                return a[0] == this ? (b = c, !1) : void 0;
            }), b;
        }
        var c = $.data(a, "tabs"), d = c.options;
        $(a).children("div.tabs-header").unbind().bind("click", function(e) {
            if ($(e.target).hasClass("tabs-scroller-left")) $(a).tabs("scrollBy", -d.scrollIncrement); else {
                if (!$(e.target).hasClass("tabs-scroller-right")) {
                    var f = $(e.target).closest("li");
                    if (f.hasClass("tabs-disabled")) return !1;
                    var g = $(e.target).closest("a.tabs-close");
                    if (g.length) closeTab(a, b(f)); else if (f.length) {
                        var h = b(f), i = c.tabs[h].panel("options");
                        i.collapsible ? i.closed ? selectTab(a, h) : unselectTab(a, h) : selectTab(a, h);
                    }
                    return !1;
                }
                $(a).tabs("scrollBy", d.scrollIncrement);
            }
        }).bind("contextmenu", function(c) {
            var e = $(c.target).closest("li");
            e.hasClass("tabs-disabled") || e.length && d.onContextMenu.call(a, c, e.find("span.tabs-title").html(), b(e));
        });
    }
    function setProperties(a) {
        var b = $.data(a, "tabs").options, c = $(a).children("div.tabs-header"), d = $(a).children("div.tabs-panels");
        c.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right"), 
        d.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right"), 
        "top" == b.tabPosition ? c.insertBefore(d) : "bottom" == b.tabPosition ? (c.insertAfter(d), 
        c.addClass("tabs-header-bottom"), d.addClass("tabs-panels-top")) : "left" == b.tabPosition ? (c.addClass("tabs-header-left"), 
        d.addClass("tabs-panels-right")) : "right" == b.tabPosition && (c.addClass("tabs-header-right"), 
        d.addClass("tabs-panels-left")), 1 == b.plain ? c.addClass("tabs-header-plain") : c.removeClass("tabs-header-plain"), 
        c.removeClass("tabs-header-narrow").addClass(b.narrow ? "tabs-header-narrow" : "");
        var e = c.find(".tabs");
        e.removeClass("tabs-pill").addClass(b.pill ? "tabs-pill" : ""), e.removeClass("tabs-narrow").addClass(b.narrow ? "tabs-narrow" : ""), 
        e.removeClass("tabs-justified").addClass(b.justified ? "tabs-justified" : ""), 1 == b.border ? (c.removeClass("tabs-header-noborder"), 
        d.removeClass("tabs-panels-noborder")) : (c.addClass("tabs-header-noborder"), d.addClass("tabs-panels-noborder")), 
        b.doSize = !0;
    }
    function createTab(a, b, c) {
        b = b || {};
        var d = $.data(a, "tabs"), e = d.tabs;
        (void 0 == b.index || b.index > e.length) && (b.index = e.length), b.index < 0 && (b.index = 0);
        var f = $(a).children("div.tabs-header").find("ul.tabs"), g = $(a).children("div.tabs-panels"), h = $('<li><a href="javascript:void(0)" class="tabs-inner"><span class="tabs-title"></span><span class="tabs-icon"></span></a></li>');
        c || (c = $("<div></div>")), b.index >= e.length ? (h.appendTo(f), c.appendTo(g), 
        e.push(c)) : (h.insertBefore(f.children("li:eq(" + b.index + ")")), c.insertBefore(g.children("div.panel:eq(" + b.index + ")")), 
        e.splice(b.index, 0, c)), c.panel($.extend({}, b, {
            tab: h,
            border: !1,
            noheader: !0,
            closed: !0,
            doSize: !1,
            iconCls: b.icon ? b.icon : void 0,
            onLoad: function() {
                b.onLoad && b.onLoad.call(this, arguments), d.options.onLoad.call(a, $(this));
            },
            onBeforeOpen: function() {
                if (b.onBeforeOpen && 0 == b.onBeforeOpen.call(this)) return !1;
                var c = $(a).tabs("getSelected");
                if (c) {
                    if (c[0] == this) return setSelectedSize(a), !1;
                    if ($(a).tabs("unselect", getTabIndex(a, c)), c = $(a).tabs("getSelected")) return !1;
                }
                var d = $(this).panel("options");
                d.tab.addClass("tabs-selected");
                var e = $(a).find(">div.tabs-header>div.tabs-wrap"), f = d.tab.position().left, g = f + d.tab.outerWidth();
                if (0 > f || g > e.width()) {
                    var h = f - (e.width() - d.tab.width()) / 2;
                    $(a).tabs("scrollBy", h);
                } else $(a).tabs("scrollBy", 0);
                var i = $(this).panel("panel");
                i.css("display", "block"), setSelectedSize(a), i.css("display", "none");
            },
            onOpen: function() {
                b.onOpen && b.onOpen.call(this);
                var c = $(this).panel("options");
                d.selectHis.push(c.title), d.options.onSelect.call(a, c.title, getTabIndex(a, this));
            },
            onBeforeClose: function() {
                return b.onBeforeClose && 0 == b.onBeforeClose.call(this) ? !1 : void $(this).panel("options").tab.removeClass("tabs-selected");
            },
            onClose: function() {
                b.onClose && b.onClose.call(this);
                var c = $(this).panel("options");
                d.options.onUnselect.call(a, c.title, getTabIndex(a, this));
            }
        })), $(a).tabs("update", {
            tab: c,
            options: c.panel("options"),
            type: "header"
        });
    }
    function addTab(a, b) {
        var c = $.data(a, "tabs"), d = c.options;
        void 0 == b.selected && (b.selected = !0), createTab(a, b), d.onAdd.call(a, b.title, b.index), 
        b.selected && selectTab(a, b.index);
    }
    function updateTab(a, b) {
        b.type = b.type || "all";
        var c = $.data(a, "tabs").selectHis, d = b.tab, e = d.panel("options"), f = e.title;
        if ($.extend(e, b.options, {
            iconCls: b.options.icon ? b.options.icon : void 0
        }), ("all" == b.type || "body" == b.type) && d.panel($.extend(e, b.options, {
            iconCls: b.options.icon ? b.options.icon : void 0
        })), "all" == b.type || "header" == b.type) {
            var g = e.tab;
            if (e.header) g.find(".tabs-inner").html($(e.header)); else {
                var h = g.find("span.tabs-title"), i = g.find("span.tabs-icon");
                if (h.html(e.title), i.attr("class", "tabs-icon"), g.find("a.tabs-close").remove(), 
                e.closable ? (h.addClass("tabs-closable"), $('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(g)) : h.removeClass("tabs-closable"), 
                e.iconCls ? (h.addClass("tabs-with-icon"), i.addClass(e.iconCls)) : h.removeClass("tabs-with-icon"), 
                e.tools) {
                    var j = g.find("span.tabs-p-tool");
                    if (!j.length) var j = $('<span class="tabs-p-tool"></span>').insertAfter(g.find("a.tabs-inner"));
                    if ($.isArray(e.tools)) {
                        j.empty();
                        for (var k = 0; k < e.tools.length; k++) {
                            var l = $('<a href="javascript:void(0)"></a>').appendTo(j);
                            l.addClass(e.tools[k].iconCls), e.tools[k].handler && l.bind("click", {
                                handler: e.tools[k].handler
                            }, function(a) {
                                $(this).parents("li").hasClass("tabs-disabled") || a.data.handler.call(this);
                            });
                        }
                    } else $(e.tools).children().appendTo(j);
                    var m = 12 * j.children().length;
                    e.closable ? m += 8 : (m -= 3, j.css("right", "5px")), h.css("padding-right", m + "px");
                } else g.find("span.tabs-p-tool").remove(), h.css("padding-right", "");
            }
            if (f != e.title) for (var k = 0; k < c.length; k++) c[k] == f && (c[k] = e.title);
        }
        setSize(a), $.data(a, "tabs").options.onUpdate.call(a, e.title, getTabIndex(a, d));
    }
    function closeTab(a, b) {
        var c = $.data(a, "tabs").options, d = $.data(a, "tabs").tabs, e = $.data(a, "tabs").selectHis;
        if (exists(a, b)) {
            var f = getTab(a, b), g = f.panel("options").title, h = getTabIndex(a, f);
            if (0 != c.onBeforeClose.call(a, g, h)) {
                var f = getTab(a, b, !0);
                f.panel("options").tab.remove(), f.panel("destroy"), c.onClose.call(a, g, h), setSize(a);
                for (var i = 0; i < e.length; i++) e[i] == g && (e.splice(i, 1), i--);
                var j = e.pop();
                j ? selectTab(a, j) : d.length && selectTab(a, 0);
            }
        }
    }
    function getTab(a, b, c) {
        var d = $.data(a, "tabs").tabs;
        if ("number" == typeof b) {
            if (0 > b || b >= d.length) return null;
            var e = d[b];
            return c && d.splice(b, 1), e;
        }
        for (var f = 0; f < d.length; f++) {
            var e = d[f];
            if (e.panel("options").title == b) return c && d.splice(f, 1), e;
        }
        return null;
    }
    function getTabIndex(a, b) {
        for (var c = $.data(a, "tabs").tabs, d = 0; d < c.length; d++) if (c[d][0] == $(b)[0]) return d;
        return -1;
    }
    function getSelectedTab(a) {
        for (var b = $.data(a, "tabs").tabs, c = 0; c < b.length; c++) {
            var d = b[c];
            if (d.panel("options").tab.hasClass("tabs-selected")) return d;
        }
        return null;
    }
    function doFirstSelect(a) {
        for (var b = $.data(a, "tabs"), c = b.tabs, d = 0; d < c.length; d++) if (c[d].panel("options").selected) return void selectTab(a, d);
        selectTab(a, b.options.selected);
    }
    function selectTab(a, b) {
        var c = getTab(a, b);
        c && !c.is(":visible") && (stopAnimate(a), c.panel("open"));
    }
    function unselectTab(a, b) {
        var c = getTab(a, b);
        c && c.is(":visible") && (stopAnimate(a), c.panel("close"));
    }
    function stopAnimate(a) {
        $(a).children("div.tabs-panels").each(function() {
            $(this).stop(!0, !0);
        });
    }
    function exists(a, b) {
        return null != getTab(a, b);
    }
    function showHeader(a, b) {
        var c = $.data(a, "tabs").options;
        c.showHeader = b, $(a).tabs("resize");
    }
    function showTool(a, b) {
        var c = $(a).find(">.tabs-header>.tabs-tool");
        b ? c.removeClass("tabs-tool-hidden").show() : c.addClass("tabs-tool-hidden").hide(), 
        $(a).tabs("resize").tabs("scrollBy", 0);
    }
    $.fn.tabs = function(a, b) {
        return "string" == typeof a ? $.fn.tabs.methods[a](this, b) : (a = a || {}, this.each(function() {
            var b = $.data(this, "tabs");
            b ? $.extend(b.options, a) : ($.data(this, "tabs", {
                options: $.extend({}, $.fn.tabs.defaults, $.fn.tabs.parseOptions(this), a),
                tabs: [],
                selectHis: []
            }), wrapTabs(this)), addTools(this), setProperties(this), setSize(this), bindEvents(this), 
            doFirstSelect(this);
        }));
    }, $.fn.tabs.methods = {
        options: function(a) {
            var b = a[0], c = $.data(b, "tabs").options, d = getSelectedTab(b);
            return c.selected = d ? getTabIndex(b, d) : 0, c;
        },
        tabs: function(a) {
            return $.data(a[0], "tabs").tabs;
        },
        resize: function(a, b) {
            return a.each(function() {
                setSize(this, b), setSelectedSize(this);
            });
        },
        add: function(a, b) {
            return a.each(function() {
                addTab(this, b);
            });
        },
        close: function(a, b) {
            return a.each(function() {
                closeTab(this, b);
            });
        },
        getTab: function(a, b) {
            return getTab(a[0], b);
        },
        getTabIndex: function(a, b) {
            return getTabIndex(a[0], b);
        },
        getSelected: function(a) {
            return getSelectedTab(a[0]);
        },
        select: function(a, b) {
            return a.each(function() {
                selectTab(this, b);
            });
        },
        unselect: function(a, b) {
            return a.each(function() {
                unselectTab(this, b);
            });
        },
        exists: function(a, b) {
            return exists(a[0], b);
        },
        update: function(a, b) {
            return a.each(function() {
                updateTab(this, b);
            });
        },
        enableTab: function(a, b) {
            return a.each(function() {
                $(this).tabs("getTab", b).panel("options").tab.removeClass("tabs-disabled");
            });
        },
        disableTab: function(a, b) {
            return a.each(function() {
                $(this).tabs("getTab", b).panel("options").tab.addClass("tabs-disabled");
            });
        },
        showHeader: function(a) {
            return a.each(function() {
                showHeader(this, !0);
            });
        },
        hideHeader: function(a) {
            return a.each(function() {
                showHeader(this, !1);
            });
        },
        showTool: function(a) {
            return a.each(function() {
                showTool(this, !0);
            });
        },
        hideTool: function(a) {
            return a.each(function() {
                showTool(this, !1);
            });
        },
        scrollBy: function(a, b) {
            return a.each(function() {
                function a() {
                    var a = 0, b = d.children("ul");
                    return b.children("li").each(function() {
                        a += $(this).outerWidth(!0);
                    }), a - d.width() + (b.outerWidth() - b.width());
                }
                var c = $(this).tabs("options"), d = $(this).find(">div.tabs-header>div.tabs-wrap"), e = Math.min(d._scrollLeft() + b, a());
                d.animate({
                    scrollLeft: e
                }, c.scrollDuration);
            });
        }
    }, $.fn.tabs.parseOptions = function(a) {
        return $.extend({}, $.parser.parseOptions(a, [ "tools", "toolPosition", "tabPosition", {
            fit: "boolean",
            border: "boolean",
            plain: "boolean"
        }, {
            headerWidth: "number",
            tabWidth: "number",
            tabHeight: "number",
            selected: "number"
        }, {
            showHeader: "boolean",
            justified: "boolean",
            narrow: "boolean",
            pill: "boolean"
        } ]));
    }, $.fn.tabs.defaults = {
        width: "auto",
        height: "auto",
        headerWidth: 150,
        tabWidth: "auto",
        tabHeight: 34,
        selected: 0,
        showHeader: !0,
        plain: !1,
        fit: !1,
        border: !0,
        justified: !1,
        narrow: !1,
        pill: !1,
        tools: null,
        toolPosition: "right",
        tabPosition: "top",
        scrollIncrement: 100,
        scrollDuration: 400,
        onLoad: function(a) {},
        onSelect: function(a, b) {},
        onUnselect: function(a, b) {},
        onBeforeClose: function(a, b) {},
        onClose: function(a, b) {},
        onAdd: function(a, b) {},
        onUpdate: function(a, b) {},
        onContextMenu: function(a, b, c) {}
    };
}(jQuery), function(a) {
    function b(b, c) {
        function d(a, b) {
            for (var c = 0, d = 0; d < g.length; d++) {
                var e = g[d], f = e.panel("header")._outerHeight(i);
                if (e.panel("options").collapsible == a) {
                    var j = isNaN(b) ? void 0 : b + i * f.length;
                    e.panel("resize", {
                        width: h.width(),
                        height: a ? j : void 0
                    }), c += e.panel("panel").outerHeight() - i * f.length;
                }
            }
            return c;
        }
        var e = a.data(b, "accordion"), f = e.options, g = e.panels, h = a(b);
        c && a.extend(f, {
            width: c.width,
            height: c.height
        }), h._size(f);
        var i = 0, j = "auto", k = h.find(">.panel>.accordion-header");
        k.length && (i = a(k[0]).css("height", "")._outerHeight()), isNaN(parseInt(f.height)) || (j = h.height() - i * k.length), 
        d(!0, j - d(!1) + 1);
    }
    function c(b, c, d, e) {
        for (var f = a.data(b, "accordion").panels, g = [], h = 0; h < f.length; h++) {
            var i = f[h];
            if (c) i.panel("options")[c] == d && g.push(i); else if (i[0] == a(d)[0]) return h;
        }
        return c ? e ? g : g.length ? g[0] : null : -1;
    }
    function d(a) {
        return c(a, "collapsed", !1, !0);
    }
    function e(a) {
        var b = d(a);
        return b.length ? b[0] : null;
    }
    function f(a, b) {
        return c(a, null, b);
    }
    function g(b, d) {
        var e = a.data(b, "accordion").panels;
        return "number" == typeof d ? 0 > d || d >= e.length ? null : e[d] : c(b, "title", d);
    }
    function h(b) {
        var c = a.data(b, "accordion").options, d = a(b);
        c.border ? d.removeClass("accordion-noborder") : d.addClass("accordion-noborder");
    }
    function i(c) {
        var d = a.data(c, "accordion"), e = a(c);
        e.addClass("accordion"), d.panels = [], e.children("div").each(function() {
            var b = a.extend({}, a.parser.parseOptions(this), {
                selected: a(this).attr("selected") ? !0 : void 0
            }), e = a(this);
            d.panels.push(e), j(c, e, b);
        }), e.bind("_resize", function(d, e) {
            return (a(this).hasClass("easyui-fluid") || e) && b(c), !1;
        });
    }
    function j(b, c, e) {
        function g(a) {
            var c = a.panel("options");
            if (c.collapsible) {
                var d = f(b, a);
                c.collapsed ? k(b, d) : l(b, d);
            }
        }
        var h = a.data(b, "accordion").options;
        c.panel(a.extend({}, {
            collapsible: !0,
            minimizable: !1,
            maximizable: !1,
            closable: !1,
            doSize: !1,
            collapsed: !0,
            headerCls: "accordion-header",
            bodyCls: "accordion-body"
        }, e, {
            onBeforeExpand: function() {
                if (e.onBeforeExpand && 0 == e.onBeforeExpand.call(this)) return !1;
                if (!h.multiple) for (var c = a.grep(d(b), function(a) {
                    return a.panel("options").collapsible;
                }), g = 0; g < c.length; g++) l(b, f(b, c[g]));
                var i = a(this).panel("header");
                i.addClass("accordion-header-selected"), i.find(".accordion-collapse").removeClass("accordion-expand");
            },
            onExpand: function() {
                e.onExpand && e.onExpand.call(this), h.onSelect.call(b, a(this).panel("options").title, f(b, this));
            },
            onBeforeCollapse: function() {
                if (e.onBeforeCollapse && 0 == e.onBeforeCollapse.call(this)) return !1;
                var b = a(this).panel("header");
                b.removeClass("accordion-header-selected"), b.find(".accordion-collapse").addClass("accordion-expand");
            },
            onCollapse: function() {
                e.onCollapse && e.onCollapse.call(this), h.onUnselect.call(b, a(this).panel("options").title, f(b, this));
            }
        }));
        var i = c.panel("header"), j = i.children("div.panel-tool");
        j.children("a.panel-tool-collapse").hide();
        var m = a('<a href="javascript:void(0)"></a>').addClass("accordion-collapse accordion-expand").appendTo(j);
        m.bind("click", function() {
            return g(c), !1;
        }), c.panel("options").collapsible ? m.show() : m.hide(), i.click(function() {
            return g(c), !1;
        });
    }
    function k(b, c) {
        var d = g(b, c);
        if (d) {
            n(b);
            var e = a.data(b, "accordion").options;
            d.panel("expand", e.animate);
        }
    }
    function l(b, c) {
        var d = g(b, c);
        if (d) {
            n(b);
            var e = a.data(b, "accordion").options;
            d.panel("collapse", e.animate);
        }
    }
    function m(b) {
        function d(a) {
            var c = e.animate;
            e.animate = !1, k(b, a), e.animate = c;
        }
        var e = a.data(b, "accordion").options, g = c(b, "selected", !0);
        d(g ? f(b, g) : e.selected);
    }
    function n(b) {
        for (var c = a.data(b, "accordion").panels, d = 0; d < c.length; d++) c[d].stop(!0, !0);
    }
    function o(c, d) {
        var e = a.data(c, "accordion"), f = e.options, g = e.panels;
        void 0 == d.selected && (d.selected = !0), n(c);
        var h = a("<div></div>").appendTo(c);
        g.push(h), j(c, h, d), b(c), f.onAdd.call(c, d.title, g.length - 1), d.selected && k(c, g.length - 1);
    }
    function p(c, d) {
        var h = a.data(c, "accordion"), i = h.options, j = h.panels;
        n(c);
        var l = g(c, d), m = l.panel("options").title, o = f(c, l);
        if (l && 0 != i.onBeforeRemove.call(c, m, o)) {
            if (j.splice(o, 1), l.panel("destroy"), j.length) {
                b(c);
                var p = e(c);
                p || k(c, 0);
            }
            i.onRemove.call(c, m, o);
        }
    }
    a.fn.accordion = function(c, d) {
        return "string" == typeof c ? a.fn.accordion.methods[c](this, d) : (c = c || {}, 
        this.each(function() {
            var d = a.data(this, "accordion");
            d ? a.extend(d.options, c) : (a.data(this, "accordion", {
                options: a.extend({}, a.fn.accordion.defaults, a.fn.accordion.parseOptions(this), c),
                accordion: a(this).addClass("accordion"),
                panels: []
            }), i(this)), h(this), b(this), m(this);
        }));
    }, a.fn.accordion.methods = {
        options: function(b) {
            return a.data(b[0], "accordion").options;
        },
        panels: function(b) {
            return a.data(b[0], "accordion").panels;
        },
        resize: function(a, c) {
            return a.each(function() {
                b(this, c);
            });
        },
        getSelections: function(a) {
            return d(a[0]);
        },
        getSelected: function(a) {
            return e(a[0]);
        },
        getPanel: function(a, b) {
            return g(a[0], b);
        },
        getPanelIndex: function(a, b) {
            return f(a[0], b);
        },
        select: function(a, b) {
            return a.each(function() {
                k(this, b);
            });
        },
        unselect: function(a, b) {
            return a.each(function() {
                l(this, b);
            });
        },
        add: function(a, b) {
            return a.each(function() {
                o(this, b);
            });
        },
        remove: function(a, b) {
            return a.each(function() {
                p(this, b);
            });
        }
    }, a.fn.accordion.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "width", "height", {
            fit: "boolean",
            border: "boolean",
            animate: "boolean",
            multiple: "boolean",
            selected: "number"
        } ]));
    }, a.fn.accordion.defaults = {
        width: "auto",
        height: "auto",
        fit: !1,
        border: !0,
        animate: !0,
        multiple: !1,
        selected: 0,
        onSelect: function(a, b) {},
        onUnselect: function(a, b) {},
        onAdd: function(a, b) {},
        onBeforeRemove: function(a, b) {},
        onRemove: function(a, b) {}
    };
}(jQuery), function(a) {
    function b(b, c) {
        var d = a.data(b, "window");
        c && (null != c.left && (d.options.left = c.left), null != c.top && (d.options.top = c.top)), 
        d.options.left = d.options.left < 0 ? 0 : d.options.left, d.options.top = d.options.top < 0 ? 0 : d.options.top, 
        a(b).panel("move", d.options), d.shadow && d.shadow.css({
            left: d.options.left,
            top: d.options.top
        });
    }
    function c(c, d) {
        var e = a.data(c, "window").options, f = a(c).window("panel"), g = f._outerWidth();
        if (e.inline) {
            var h = f.parent();
            e.left = Math.ceil((h.width() - g) / 2 + h.scrollLeft());
        } else e.left = Math.ceil((a(window)._outerWidth() - g) / 2 + a(document).scrollLeft());
        d && b(c);
    }
    function d(c, d) {
        var e = a.data(c, "window").options, f = a(c).window("panel"), g = f._outerHeight();
        if (e.inline) {
            var h = f.parent();
            e.top = Math.ceil((h.height() - g) / 2 + h.scrollTop());
        } else e.top = Math.ceil((a(window)._outerHeight() - g) / 2 + a(document).scrollTop());
        d && b(c);
    }
    function e(e) {
        var f = a.data(e, "window"), g = f.options, h = a(e).panel(a.extend({}, f.options, {
            border: !1,
            doSize: !0,
            closed: !0,
            cls: "window",
            headerCls: "window-header",
            bodyCls: "window-body " + (g.noheader ? "window-body-noheader" : ""),
            onBeforeDestroy: function() {
                return 0 == g.onBeforeDestroy.call(e) ? !1 : (f.shadow && f.shadow.remove(), void (f.mask && f.mask.remove()));
            },
            onClose: function() {
                f.shadow && f.shadow.hide(), f.mask && f.mask.hide(), g.onClose.call(e);
            },
            onOpen: function() {
                f.mask && f.mask.css(a.extend({
                    display: "block",
                    zIndex: a.fn.window.defaults.zIndex++
                }, a.fn.window.getMaskSize(e))), f.shadow && f.shadow.css({
                    display: "block",
                    zIndex: a.fn.window.defaults.zIndex++,
                    left: g.left,
                    top: g.top,
                    width: f.window._outerWidth(),
                    height: f.window._outerHeight()
                }), f.window.css("z-index", a.fn.window.defaults.zIndex++), g.onOpen.call(e);
            },
            onResize: function(b, c) {
                var d = a(this).panel("options");
                a.extend(g, {
                    width: d.width,
                    height: d.height,
                    left: d.left,
                    top: d.top
                }), f.shadow && f.shadow.css({
                    left: g.left,
                    top: g.top,
                    width: f.window._outerWidth(),
                    height: f.window._outerHeight()
                }), g.onResize.call(e, b, c);
            },
            onMinimize: function() {
                f.shadow && f.shadow.hide(), f.mask && f.mask.hide(), f.options.onMinimize.call(e);
            },
            onBeforeCollapse: function() {
                return 0 == g.onBeforeCollapse.call(e) ? !1 : void (f.shadow && f.shadow.hide());
            },
            onExpand: function() {
                f.shadow && f.shadow.show(), g.onExpand.call(e);
            }
        }));
        f.window = h.panel("panel"), f.mask && f.mask.remove(), 1 == g.modal && (f.mask = a('<div class="window-mask" style="display:none"></div>').insertAfter(f.window)), 
        f.shadow && f.shadow.remove(), 1 == g.shadow && (f.shadow = a('<div class="window-shadow" style="display:none"></div>').insertAfter(f.window)), 
        null == g.left && c(e), null == g.top && d(e), b(e), g.closed || h.window("open");
    }
    function f(b) {
        var c = a.data(b, "window");
        c.window.draggable({
            handle: ">div.panel-header>div.panel-title",
            disabled: 0 == c.options.draggable,
            onStartDrag: function(b) {
                c.mask && c.mask.css("z-index", a.fn.window.defaults.zIndex++), c.shadow && c.shadow.css("z-index", a.fn.window.defaults.zIndex++), 
                c.window.css("z-index", a.fn.window.defaults.zIndex++);
            },
            onDrag: function(d) {
                return c.options.left = d.data.left, c.options.top = d.data.top, a(b).window("move"), 
                !1;
            },
            onStopDrag: function(d) {
                c.window.removeClass("window-panel-proxy"), a(b).window("move");
            }
        }), c.window.resizable({
            disabled: 0 == c.options.resizable,
            onStartResize: function(b) {
                c.pmask && c.pmask.remove(), c.pmask = a('<div class="window-proxy-mask"></div>').insertAfter(c.window), 
                c.pmask.css({
                    zIndex: a.fn.window.defaults.zIndex++,
                    left: b.data.left,
                    top: b.data.top,
                    width: c.window._outerWidth(),
                    height: c.window._outerHeight()
                }), c.proxy && c.proxy.remove(), c.proxy = a('<div class="window-proxy"></div>').insertAfter(c.window), 
                c.proxy.css({
                    zIndex: a.fn.window.defaults.zIndex++,
                    left: b.data.left,
                    top: b.data.top
                }), c.proxy._outerWidth(b.data.width)._outerHeight(b.data.height);
            },
            onResize: function(a) {
                return c.proxy.css({
                    left: a.data.left,
                    top: a.data.top
                }), c.proxy._outerWidth(a.data.width), c.proxy._outerHeight(a.data.height), !1;
            },
            onStopResize: function(d) {
                a(b).window("resize", d.data), c.pmask.remove(), c.pmask = null, c.proxy.remove(), 
                c.proxy = null;
            }
        });
    }
    a(window).resize(function() {
        a("body>div.window-mask").css({
            width: a(window)._outerWidth(),
            height: a(window)._outerHeight()
        }), setTimeout(function() {
            a("body>div.window-mask").css(a.fn.window.getMaskSize());
        }, 50);
    }), a.fn.window = function(b, c) {
        if ("string" == typeof b) {
            var d = a.fn.window.methods[b];
            return d ? d(this, c) : this.panel(b, c);
        }
        return b = b || {}, this.each(function() {
            var c = a.data(this, "window");
            c ? a.extend(c.options, b) : (c = a.data(this, "window", {
                options: a.extend({}, a.fn.window.defaults, a.fn.window.parseOptions(this), b)
            }), c.options.inline || document.body.appendChild(this)), e(this), f(this);
        });
    }, a.fn.window.methods = {
        options: function(b) {
            var c = b.panel("options"), d = a.data(b[0], "window").options;
            return a.extend(d, {
                closed: c.closed,
                collapsed: c.collapsed,
                minimized: c.minimized,
                maximized: c.maximized
            });
        },
        open: function(b, e) {
            a.fn.panel.methods.open(b, e);
            var f = b.data("window"), g = f.options;
            g.autoHCenter && b.each(function() {
                c(this);
            }), g.autoVCenter && b.each(function() {
                d(this);
            }), (g.autoHCenter || g.autoHCenter) && a.fn.window.methods.move(b);
        },
        window: function(b) {
            return a.data(b[0], "window").window;
        },
        move: function(a, c) {
            return a.each(function() {
                b(this, c);
            });
        },
        hcenter: function(a) {
            return a.each(function() {
                c(this, !0);
            });
        },
        vcenter: function(a) {
            return a.each(function() {
                d(this, !0);
            });
        },
        center: function(a) {
            return a.each(function() {
                c(this), d(this), b(this);
            });
        }
    }, a.fn.window.getMaskSize = function(b) {
        var c = a(b).data("window"), d = c && c.options.inline;
        return {
            width: d ? "100%" : a(document).width(),
            height: d ? "100%" : a(document).height()
        };
    }, a.fn.window.parseOptions = function(b) {
        return a.extend({}, a.fn.panel.parseOptions(b), a.parser.parseOptions(b, [ {
            draggable: "boolean",
            resizable: "boolean",
            shadow: "boolean",
            modal: "boolean",
            inline: "boolean"
        } ]));
    }, a.fn.window.defaults = a.extend({}, a.fn.panel.defaults, {
        zIndex: 9e3,
        draggable: !0,
        resizable: !0,
        shadow: !0,
        modal: !1,
        inline: !1,
        title: "New Window",
        collapsible: !0,
        minimizable: !0,
        maximizable: !0,
        closable: !0,
        closed: !1
    });
}(jQuery), function(a) {
    function b() {
        a(document).unbind(".messager").bind("keydown.messager", function(b) {
            if (27 == b.keyCode) a("body").children("div.messager-window").children("div.messager-body").each(function() {
                a(this).window("close");
            }); else if (9 == b.keyCode) {
                var c = a("body").children("div.messager-window").children("div.messager-body");
                if (!c.length) return;
                for (var d = c.find(".messager-input,.messager-button .l-btn"), e = 0; e < d.length; e++) if (a(d[e]).is(":focus")) return a(d[e >= d.length - 1 ? 0 : e + 1]).focus(), 
                !1;
            }
        });
    }
    function c() {
        a(document).unbind(".messager");
    }
    function d(b) {
        var c = a.extend({}, a.messager.defaults, {
            modal: !1,
            shadow: !1,
            draggable: !1,
            resizable: !1,
            closed: !0,
            style: {
                left: "",
                top: "",
                right: 0,
                zIndex: a.fn.window.defaults.zIndex++,
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            },
            title: "",
            width: 250,
            height: 100,
            showType: "slide",
            showSpeed: 600,
            msg: "",
            timeout: 4e3
        }, b), d = a('<div class="messager-body"></div>').html(c.msg).appendTo("body");
        return d.window(a.extend({}, c, {
            openAnimation: c.showType,
            closeAnimation: "show" == c.showType ? "hide" : c.showType,
            openDuration: c.showSpeed,
            closeDuration: c.showSpeed,
            closed: !0,
            onOpen: function() {
                function a() {
                    c.timeout > 0 && (c.timer = setTimeout(function() {
                        d.length && d.data("window") && d.window("close");
                    }, c.timeout));
                }
                d.window("window").hover(function() {
                    c.timer && clearTimeout(c.timer);
                }, function() {
                    a();
                }), a(), b.onOpen ? b.onOpen.call(this) : c.onOpen.call(this);
            },
            onClose: function() {
                c.timer && clearTimeout(c.timer), b.onClose ? b.onClose.call(this) : c.onClose.call(this), 
                d.window("destroy");
            }
        })), d.window("window").css(c.style), d.window("open"), d;
    }
    function e(d) {
        b();
        var e = a('<div class="messager-body"></div>').appendTo("body");
        if (e.window(a.extend({}, d, {
            doSize: !1,
            noheader: d.title ? !1 : !0,
            onClose: function() {
                c(), d.onClose && d.onClose.call(this), setTimeout(function() {
                    e.window("destroy");
                }, 100);
            }
        })), d.buttons && d.buttons.length) {
            var f = a('<div class="messager-button"></div>').appendTo(e);
            a.map(d.buttons, function(b) {
                a('<a href="javascript:void(0)" style="margin-left:10px"></a>').appendTo(f).linkbutton(b);
            });
        }
        return e.window("window").addClass("messager-window"), e.window("resize"), e.children("div.messager-button").children("a:first").focus(), 
        e;
    }
    a.messager = {
        notify: function(b) {
            return a.extend(b, {
                modal: !1,
                timeout: b.timeout || 0,
                showType: b.showType || "show",
                isCloseIcon: !0,
                autoHCenter: !1,
                autoVCenter: !1,
                draggable: !1,
                position: b.position || "bottomRight"
            }), a.messager.show(b);
        },
        show: function(a) {
            return d(a);
        },
        alert: function(b, c, d, f) {
            var g = "object" == typeof b ? b : {
                title: b,
                msg: c,
                icon: d,
                fn: f
            }, h = g.icon ? "messager-icon messager-" + g.icon : "";
            g = a.extend({}, a.messager.defaults, {
                content: '<div class="' + h + '"></div><div>' + g.msg + '</div><div style="clear:both;"/>',
                buttons: [ {
                    text: a.messager.defaults.ok,
                    onClick: function() {
                        i.window("close"), g.fn();
                    }
                } ]
            }, g);
            var i = e(g);
            return i;
        },
        confirm: function(b, c, d) {
            var f = "object" == typeof b ? b : {
                title: b,
                msg: c,
                fn: d
            };
            f = a.extend({}, a.messager.defaults, {
                content: '<div class="messager-icon messager-question"></div><div>' + f.msg + '</div><div style="clear:both;"/>',
                buttons: [ {
                    text: a.messager.defaults.ok,
                    onClick: function() {
                        g.window("close"), f.fn(!0);
                    }
                }, {
                    text: a.messager.defaults.cancel,
                    onClick: function() {
                        g.window("close"), f.fn(!1);
                    }
                } ]
            }, f);
            var g = e(f);
            return g;
        },
        prompt: function(b, c, d) {
            var f = "object" == typeof b ? b : {
                title: b,
                msg: c,
                fn: d
            };
            f = a.extend({}, a.messager.defaults, {
                content: '<div class="messager-icon messager-question"></div><div>' + f.msg + '</div><br/><div style="clear:both;"/><div><input class="messager-input" type="text"/></div>',
                buttons: [ {
                    text: a.messager.defaults.ok,
                    onClick: function() {
                        g.window("close"), f.fn(g.find(".messager-input").val());
                    }
                }, {
                    text: a.messager.defaults.cancel,
                    onClick: function() {
                        g.window("close"), f.fn();
                    }
                } ]
            }, f);
            var g = e(f);
            return g.find("input.messager-input").focus(), g;
        },
        progress: function(b) {
            var c = {
                bar: function() {
                    return a("body>div.messager-window").find("div.messager-p-bar");
                },
                close: function() {
                    var b = a("body>div.messager-window>div.messager-body:has(div.messager-progress)");
                    b.length && b.window("close");
                }
            };
            if ("string" == typeof b) {
                var d = c[b];
                return d();
            }
            var f = a.extend({}, {
                title: "",
                content: void 0,
                msg: "",
                text: void 0,
                interval: 300
            }, b || {}), g = e(a.extend({}, a.messager.defaults, {
                content: '<div class="messager-progress"><div class="messager-p-msg">' + f.msg + '</div><div class="messager-p-bar"></div></div>',
                closable: !1,
                doSize: !1
            }, f, {
                onClose: function() {
                    this.timer && clearInterval(this.timer), b.onClose ? b.onClose.call(this) : a.messager.defaults.onClose.call(this);
                }
            })), h = g.find("div.messager-p-bar");
            return h.progressbar({
                text: f.text
            }), g.window("resize"), f.interval && (g[0].timer = setInterval(function() {
                var a = h.progressbar("getValue");
                a += 10, a > 100 && (a = 0), h.progressbar("setValue", a);
            }, f.interval)), g;
        }
    }, a.messager.defaults = a.extend({}, a.fn.window.defaults, {
        ok: "Ok",
        cancel: "Cancel",
        width: 300,
        height: "auto",
        modal: !0,
        collapsible: !1,
        minimizable: !1,
        maximizable: !1,
        resizable: !1,
        shadow: !1,
        closed: !1,
        fn: function() {}
    });
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "datalist").options;
        a(b).datagrid(a.extend({}, c, {
            cls: "datalist" + (c.lines ? " datalist-lines" : ""),
            frozenColumns: c.frozenColumns && c.frozenColumns.length ? c.frozenColumns : c.checkbox ? [ [ {
                field: "_ck",
                checkbox: !0
            } ] ] : void 0,
            columns: c.columns && c.columns.length ? c.columns : [ [ {
                field: c.textField,
                width: "100%",
                formatter: function(a, b, d) {
                    return c.textFormatter ? c.textFormatter(a, b, d) : a;
                }
            } ] ]
        }));
    }
    var c = a.extend({}, a.fn.datagrid.defaults.view, {
        render: function(b, c, d) {
            var e = a.data(b, "datagrid"), f = e.options;
            if (f.groupField) {
                var g = this.groupRows(b, e.data.rows);
                this.groups = g.groups, e.data.rows = g.rows;
                for (var h = [], i = 0; i < g.groups.length; i++) h.push(this.renderGroup.call(this, b, i, g.groups[i], d));
                a(c).html(h.join(""));
            } else a(c).html(this.renderTable(b, 0, e.data.rows, d));
        },
        renderGroup: function(b, c, d, e) {
            var f = a.data(b, "datagrid"), g = f.options, h = (a(b).datagrid("getColumnFields", e), 
            []);
            return h.push('<div class="datagrid-group" group-index=' + c + ">"), e || (h.push('<span class="datagrid-group-title">'), 
            h.push(g.groupFormatter.call(b, d.value, d.rows)), h.push("</span>")), h.push("</div>"), 
            h.push(this.renderTable(b, d.startIndex, d.rows, e)), h.join("");
        },
        groupRows: function(b, c) {
            function d(a) {
                for (var b = 0; b < g.length; b++) {
                    var c = g[b];
                    if (c.value == a) return c;
                }
                return null;
            }
            for (var e = a.data(b, "datagrid"), f = e.options, g = [], h = 0; h < c.length; h++) {
                var i = c[h], j = d(i[f.groupField]);
                j ? j.rows.push(i) : (j = {
                    value: i[f.groupField],
                    rows: [ i ]
                }, g.push(j));
            }
            for (var k = 0, c = [], h = 0; h < g.length; h++) {
                var j = g[h];
                j.startIndex = k, k += j.rows.length, c = c.concat(j.rows);
            }
            return {
                groups: g,
                rows: c
            };
        }
    });
    a.fn.datalist = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.datalist.methods[c];
            return e ? e(this, d) : this.datagrid(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "datalist");
            if (d) a.extend(d.options, c); else {
                var e = a.extend({}, a.fn.datalist.defaults, a.fn.datalist.parseOptions(this), c);
                e.columns = a.extend(!0, [], e.columns), d = a.data(this, "datalist", {
                    options: e
                });
            }
            if (b(this), !d.options.data) {
                var f = a.fn.datalist.parseData(this);
                f.total && a(this).datalist("loadData", f);
            }
        });
    }, a.fn.datalist.methods = {
        options: function(b) {
            return a.data(b[0], "datalist").options;
        }
    }, a.fn.datalist.parseOptions = function(b) {
        return a.extend({}, a.fn.datagrid.parseOptions(b), a.parser.parseOptions(b, [ "valueField", "textField", "groupField", {
            checkbox: "boolean",
            lines: "boolean"
        } ]));
    }, a.fn.datalist.parseData = function(b) {
        var c = a.data(b, "datalist").options, d = {
            total: 0,
            rows: []
        };
        return a(b).children().each(function() {
            var b = a.parser.parseOptions(this, [ "value", "group" ]), e = {}, f = a(this).html();
            e[c.valueField] = void 0 != b.value ? b.value : f, e[c.textField] = f, c.groupField && (e[c.groupField] = b.group), 
            d.total++, d.rows.push(e);
        }), d;
    }, a.fn.datalist.defaults = a.extend({}, a.fn.datagrid.defaults, {
        fitColumns: !0,
        singleSelect: !0,
        showHeader: !1,
        checkbox: !1,
        lines: !1,
        valueField: "value",
        textField: "text",
        groupField: "",
        view: c,
        textFormatter: function(a, b) {
            return a;
        },
        groupFormatter: function(a, b) {
            return a;
        }
    });
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "datetimespinner").options;
        a(b).addClass("datetimespinner-f").timespinner(c);
    }
    a.fn.datetimespinner = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.datetimespinner.methods[c];
            return e ? e(this, d) : this.timespinner(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "datetimespinner");
            d ? a.extend(d.options, c) : a.data(this, "datetimespinner", {
                options: a.extend({}, a.fn.datetimespinner.defaults, a.fn.datetimespinner.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.datetimespinner.methods = {
        options: function(b) {
            var c = b.timespinner("options");
            return a.extend(a.data(b[0], "datetimespinner").options, {
                width: c.width,
                value: c.value,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        }
    }, a.fn.datetimespinner.parseOptions = function(b) {
        return a.extend({}, a.fn.timespinner.parseOptions(b), a.parser.parseOptions(b, []));
    }, a.fn.datetimespinner.defaults = a.extend({}, a.fn.timespinner.defaults, {
        formatter: function(b) {
            return b ? a.fn.datebox.defaults.formatter.call(this, b) + " " + a.fn.timespinner.defaults.formatter.call(this, b) : "";
        },
        parser: function(b) {
            if (b = a.trim(b), !b) return null;
            var c = b.split(" "), d = a.fn.datebox.defaults.parser.call(this, c[0]);
            if (c.length < 2) return d;
            var e = a.fn.timespinner.defaults.parser.call(this, c[1]);
            return new Date(d.getFullYear(), d.getMonth(), d.getDate(), e.getHours(), e.getMinutes(), e.getSeconds());
        },
        selections: [ [ 0, 2 ], [ 3, 5 ], [ 6, 10 ], [ 11, 13 ], [ 14, 16 ], [ 17, 19 ] ]
    });
}(jQuery), function(a) {
    function b(b) {
        var d = a.data(b, "filebox"), e = d.options, f = "filebox_file_id_" + ++c;
        a(b).addClass("filebox-f").textbox(e), a(b).textbox("textbox").attr("readonly", "readonly"), 
        d.filebox = a(b).next().addClass("filebox"), d.filebox.find(".textbox-value").remove(), 
        e.oldValue = "";
        var g = a('<input type="file" class="textbox-value">').appendTo(d.filebox);
        g.attr("id", f).attr("name", a(b).attr("textboxName") || ""), g.change(function() {
            a(b).filebox("setText", this.value), e.onChange.call(b, this.value, e.oldValue), 
            e.oldValue = this.value;
        });
        var h = a(b).filebox("button");
        h.length && (a('<label class="filebox-label" for="' + f + '"></label>').appendTo(h), 
        h.linkbutton("options").disabled ? g.attr("disabled", "disabled") : g.removeAttr("disabled"));
    }
    var c = 0;
    a.fn.filebox = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.filebox.methods[c];
            return e ? e(this, d) : this.textbox(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "filebox");
            d ? a.extend(d.options, c) : a.data(this, "filebox", {
                options: a.extend({}, a.fn.filebox.defaults, a.fn.filebox.parseOptions(this), c)
            }), b(this);
        });
    }, a.fn.filebox.methods = {
        options: function(b) {
            var c = b.textbox("options");
            return a.extend(a.data(b[0], "filebox").options, {
                width: c.width,
                value: c.value,
                originalValue: c.originalValue,
                disabled: c.disabled,
                readonly: c.readonly
            });
        }
    }, a.fn.filebox.parseOptions = function(b) {
        return a.extend({}, a.fn.textbox.parseOptions(b), {});
    }, a.fn.filebox.defaults = a.extend({}, a.fn.textbox.defaults, {
        buttonIcon: null,
        buttonText: "Choose File",
        buttonAlign: "right",
        inputEvents: {}
    });
}(jQuery), function(a) {
    function b(b) {
        var d = a('<span class="switchbutton"><span class="switchbutton-inner"><span class="switchbutton-on"></span><span class="switchbutton-handle"></span><span class="switchbutton-off"></span><input class="switchbutton-value" type="checkbox"></span></span>').insertAfter(b), e = a(b);
        e.addClass("switchbutton-f").hide();
        var f = e.attr("name");
        return f && (e.removeAttr("name").attr("switchbuttonName", f), d.find(".switchbutton-value").attr("name", f)), 
        d.bind("_resize", function(d, e) {
            return (a(this).hasClass("easyui-fluid") || e) && c(b), !1;
        }), d;
    }
    function c(b, c) {
        var d = a.data(b, "switchbutton"), f = d.options, g = d.switchbutton;
        c && a.extend(f, c);
        var h = g.is(":visible");
        h || g.appendTo("body"), g._size(f);
        var i = g.width(), j = g.height(), i = g.outerWidth(), j = g.outerHeight(), k = parseInt(f.handleWidth) || g.height(), l = 2 * i - k;
        g.find(".switchbutton-inner").css({
            width: l + "px",
            height: j + "px",
            lineHeight: j + "px"
        }), g.find(".switchbutton-handle")._outerWidth(k)._outerHeight(j).css({
            marginLeft: -k / 2 + "px"
        }), g.find(".switchbutton-on").css({
            width: i - k / 2 + "px",
            textIndent: (f.reversed ? "" : "-") + k / 2 + "px"
        }), g.find(".switchbutton-off").css({
            width: i - k / 2 + "px",
            textIndent: (f.reversed ? "-" : "") + k / 2 + "px"
        }), f.marginWidth = i - k, e(b, f.checked, !1), h || g.insertAfter(b);
    }
    function d(b) {
        var c = a.data(b, "switchbutton"), d = c.options, f = c.switchbutton, h = f.find(".switchbutton-inner"), i = h.find(".switchbutton-on").html(d.onText), j = h.find(".switchbutton-off").html(d.offText), k = h.find(".switchbutton-handle").html(d.handleText);
        d.reversed ? (j.prependTo(h), i.insertAfter(k)) : (i.prependTo(h), j.insertAfter(k)), 
        f.find(".switchbutton-value")._propAttr("checked", d.checked), f.removeClass("switchbutton-disabled").addClass(d.disabled ? "switchbutton-disabled" : ""), 
        f.removeClass("switchbutton-reversed").addClass(d.reversed ? "switchbutton-reversed" : ""), 
        e(b, d.checked), g(b, d.readonly), a(b).switchbutton("setValue", d.value);
    }
    function e(b, c, d) {
        var e = a.data(b, "switchbutton"), f = e.options;
        f.checked = c;
        var g = e.switchbutton.find(".switchbutton-inner"), h = g.find(".switchbutton-on"), i = f.reversed ? f.checked ? f.marginWidth : 0 : f.checked ? 0 : f.marginWidth, j = h.css("float").toLowerCase(), k = {};
        k["margin-" + j] = -i + "px", d ? g.animate(k, 200) : g.css(k);
        var l = g.find(".switchbutton-value"), m = l.is(":checked");
        a(b).add(l)._propAttr("checked", f.checked), m != f.checked && f.onChange.call(b, f.checked);
    }
    function f(b, c) {
        var d = a.data(b, "switchbutton"), e = d.options, f = d.switchbutton, g = f.find(".switchbutton-value");
        c ? (e.disabled = !0, a(b).add(g).attr("disabled", "disabled"), f.addClass("switchbutton-disabled")) : (e.disabled = !1, 
        a(b).add(g).removeAttr("disabled"), f.removeClass("switchbutton-disabled"));
    }
    function g(b, c) {
        var d = a.data(b, "switchbutton"), e = d.options;
        e.readonly = void 0 == c ? !0 : c, d.switchbutton.removeClass("switchbutton-readonly").addClass(e.readonly ? "switchbutton-readonly" : "");
    }
    function h(b) {
        var c = a.data(b, "switchbutton"), d = c.options;
        c.switchbutton.unbind(".switchbutton").bind("click.switchbutton", function() {
            d.disabled || d.readonly || e(b, d.checked ? !1 : !0, !0);
        });
    }
    a.fn.switchbutton = function(e, f) {
        return "string" == typeof e ? a.fn.switchbutton.methods[e](this, f) : (e = e || {}, 
        this.each(function() {
            var f = a.data(this, "switchbutton");
            f ? a.extend(f.options, e) : f = a.data(this, "switchbutton", {
                options: a.extend({}, a.fn.switchbutton.defaults, a.fn.switchbutton.parseOptions(this), e),
                switchbutton: b(this)
            }), f.options.originalChecked = f.options.checked, d(this), c(this), h(this);
        }));
    }, a.fn.switchbutton.methods = {
        options: function(b) {
            var c = b.data("switchbutton");
            return a.extend(c.options, {
                value: c.switchbutton.find(".switchbutton-value").val()
            });
        },
        resize: function(a, b) {
            return a.each(function() {
                c(this, b);
            });
        },
        enable: function(a) {
            return a.each(function() {
                f(this, !1);
            });
        },
        disable: function(a) {
            return a.each(function() {
                f(this, !0);
            });
        },
        readonly: function(a, b) {
            return a.each(function() {
                g(this, b);
            });
        },
        check: function(a) {
            return a.each(function() {
                e(this, !0);
            });
        },
        uncheck: function(a) {
            return a.each(function() {
                e(this, !1);
            });
        },
        clear: function(a) {
            return a.each(function() {
                e(this, !1);
            });
        },
        reset: function(b) {
            return b.each(function() {
                var b = a(this).switchbutton("options");
                e(this, b.originalChecked);
            });
        },
        setValue: function(b, c) {
            return b.each(function() {
                a(this).val(c), a.data(this, "switchbutton").switchbutton.find(".switchbutton-value").val(c);
            });
        }
    }, a.fn.switchbutton.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "onText", "offText", "handleText", {
            handleWidth: "number",
            reversed: "boolean"
        } ]), {
            value: c.val() || void 0,
            checked: c.attr("checked") ? !0 : void 0,
            disabled: c.attr("disabled") ? !0 : void 0,
            readonly: c.attr("readonly") ? !0 : void 0
        });
    }, a.fn.switchbutton.defaults = {
        handleWidth: "auto",
        width: 60,
        height: 26,
        checked: !1,
        disabled: !1,
        readonly: !1,
        reversed: !1,
        onText: "ON",
        offText: "OFF",
        handleText: "",
        value: "on",
        onChange: function(a) {}
    };
}(jQuery), function($) {
    function buildDialog(target) {
        var opts = $.data(target, "dialog").options;
        opts.inited = !1, opts.border && (opts.height = opts.height + 1), $(target).window($.extend({}, opts, {
            onResize: function(a, b) {
                opts.inited && (setContentSize(this), opts.onResize.call(this, a, b));
            }
        }));
        var win = $(target).window("window");
        if (opts.toolbar) if ($.isArray(opts.toolbar)) {
            $(target).siblings("div.dialog-toolbar").remove();
            for (var toolbar = $('<div class="dialog-toolbar"><table cellspacing="0" cellpadding="0"><tr></tr></table></div>').appendTo(win), tr = toolbar.find("tr"), i = 0; i < opts.toolbar.length; i++) {
                var btn = opts.toolbar[i];
                if ("-" == btn) $('<td><div class="dialog-tool-separator"></div></td>').appendTo(tr); else {
                    var td = $("<td></td>").appendTo(tr), tool = $('<a href="javascript:void(0)"></a>').appendTo(td);
                    tool[0].onclick = eval(btn.handler || function() {}), tool.linkbutton($.extend({}, btn, {
                        plain: !0
                    }));
                }
            }
        } else $(opts.toolbar).addClass("dialog-toolbar").appendTo(win), $(opts.toolbar).show(); else $(target).siblings("div.dialog-toolbar").remove();
        if (opts.buttons) if ($.isArray(opts.buttons)) {
            $(target).siblings("div.dialog-button").remove();
            for (var buttons = $('<div class="dialog-button"></div>').appendTo(win), i = 0; i < opts.buttons.length; i++) {
                var p = opts.buttons[i], button = $('<a href="javascript:void(0)"></a>').appendTo(buttons);
                p.handler && (button[0].onclick = p.handler), button.linkbutton(p);
            }
        } else $(opts.buttons).addClass("dialog-button").appendTo(win), $(opts.buttons).show(); else $(target).siblings("div.dialog-button").remove();
        opts.inited = !0;
        var closed = opts.closed;
        win.show(), $(target).window("resize"), closed && win.hide();
    }
    function setContentSize(a, b) {
        var c = $(a), d = c.dialog("options"), e = d.noheader, f = c.siblings(".dialog-toolbar"), g = c.siblings(".dialog-button");
        f.insertBefore(a).css({
            position: "relative",
            borderTopWidth: e ? 1 : 0,
            top: e ? f.length : 0
        }), g.insertAfter(a).css({
            position: "relative",
            top: -1
        }), f.add(g)._outerWidth(c._outerWidth()).find(".easyui-fluid:visible").each(function() {
            $(this).triggerHandler("_resize");
        }), isNaN(parseInt(d.height)) || c._outerHeight(c._outerHeight() - f._outerHeight() - g._outerHeight());
        var h = $.data(a, "window").shadow;
        if (h) {
            var i = c.panel("panel");
            h.css({
                width: i._outerWidth(),
                height: i._outerHeight()
            });
        }
    }
    $.fn.dialog = function(a, b) {
        if ("string" == typeof a) {
            var c = $.fn.dialog.methods[a];
            return c ? c(this, b) : this.window(a, b);
        }
        return a = a || {}, this.each(function() {
            var b = $.data(this, "dialog");
            b ? $.extend(b.options, a) : $.data(this, "dialog", {
                options: $.extend({}, $.fn.dialog.defaults, $.fn.dialog.parseOptions(this), a)
            }), buildDialog(this);
        });
    }, $.fn.dialog.methods = {
        options: function(a) {
            var b = $.data(a[0], "dialog").options, c = a.panel("options");
            return $.extend(b, {
                width: c.width,
                height: c.height,
                closed: c.closed,
                collapsed: c.collapsed,
                minimized: c.minimized,
                maximized: c.maximized
            }), b;
        },
        dialog: function(a) {
            return a.window("window");
        }
    }, $.fn.dialog.parseOptions = function(a) {
        var b = $(a);
        return $.extend({}, $.fn.window.parseOptions(a), $.parser.parseOptions(a, [ "toolbar", "buttons" ]), {
            toolbar: b.children(".dialog-toolbar").length ? b.children(".dialog-toolbar").removeClass("dialog-toolbar") : void 0,
            buttons: b.children(".dialog-button").length ? b.children(".dialog-button").removeClass("dialog-button") : void 0
        });
    }, $.fn.dialog.defaults = $.extend({}, $.fn.window.defaults, {
        title: "New Dialog",
        collapsible: !1,
        minimizable: !1,
        maximizable: !1,
        resizable: !1,
        toolbar: null,
        buttons: null
    });
}(jQuery), function(a) {
    function b(b) {
        if (!a(b).hasClass("jqfile")) {
            var c = a(b).width(), d = a("<div>").addClass("file-button"), e = a('<input class="ipt">').addClass(a(b).attr("class")).css({
                display: "inline",
                "float": "left",
                width: c + "px"
            });
            a(b).before(e), a(b).wrap(d), a(b).css({
                "float": "left",
                position: "relative",
                cursor: "pointer",
                opacity: "0.0"
            }).addClass("jqfile"), a(b).css({
                "margin-left": -c + 50 + "px"
            }), a(b).bind("change", function() {
                e.val(a(b).val());
            });
        }
    }
    a.fn.inputfile = function(c, d) {
        return "string" == typeof c ? a(this).inputfile.methods[c].call(this, params) : (c = c || {}, 
        this.each(function() {
            var d = this, e = a.data(d, "inputfile");
            e ? a.extend(e.options, c) : (a.data(d, "inputfile", {
                options: a.extend({}, a.fn.inputfile.defaults, a.fn.inputfile.parseOptions(d), c)
            }), b(d));
        }));
    }, a.fn.inputfile.methods = {
        options: function(b) {
            return a.data(b[0], "inputfile").options;
        }
    }, a.fn.inputfile.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.parser.parseOptions(b, [ "id" ]));
    }, a.fn.inputfile.defaults = {
        id: null
    }, a.parser && a.parser.plugins.push("inputfile");
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "district").options, d = a(b), e = a("<select />").attr("id", "ProvinceSelect"), f = a("<select />").attr("id", "CitySelect"), g = a("<select />").attr("id", "AreaSelect");
        d.append(e), e.combobox({
            data: [ {
                value: "",
                text: "请选择"
            }, {
                value: "1",
                text: "广东省"
            }, {
                value: "2",
                text: "广西省"
            } ],
            textField: "text",
            valueField: "value",
            width: 100,
            onChange: function(c) {
                a("#CitySelect", b)[0] && f.combobox({
                    disabled: !1,
                    value: "1"
                });
            }
        }), c.level > 1 && (d.append(f), f.combobox({
            data: [ {
                value: "",
                text: "请选择"
            }, {
                value: "1",
                text: "广州市"
            }, {
                value: "2",
                text: "深圳市"
            } ],
            textField: "text",
            valueField: "value",
            style: "margin-left:5px;",
            disabled: !0,
            width: 120,
            onChange: function(c) {
                a("#AreaSelect", b)[0] && g.combobox({
                    disabled: !1,
                    value: "1"
                });
            }
        })), c.level > 2 && (d.append(g), g.combobox({
            data: [ {
                value: "",
                text: "请选择"
            }, {
                value: "1",
                text: "天河区"
            }, {
                value: "2",
                text: "越秀区"
            }, {
                value: "3",
                text: "白云区"
            } ],
            textField: "text",
            valueField: "value",
            style: "margin-left:5px;",
            disabled: !0,
            width: 120
        }));
    }
    a.fn.district = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.district.methods[c];
            return e ? e(this, d) : this.combo(c, d);
        }
        return c = c || {}, this.each(function() {
            var d = this, e = a.data(d, "district");
            e ? a.extend(e.options, c) : (a.data(d, "district", {
                options: a.extend({}, a.fn.district.defaults, a.fn.district.parseOptions(d), c)
            }), b(d));
        });
    }, a.fn.district.methods = {
        options: function(b) {
            return a.data(b[0], "district").options;
        },
        getValue: function(b) {
            var c = a("#ProvinceSelect", b).combobox("getValue"), d = a("#CitySelect", b).combobox("getValue"), e = a("#AreaSelect", b).combobox("getValue");
            return {
                p: c,
                c: d,
                a: e
            };
        },
        setValue: function(b, c) {
            var d = c.p, e = c.c, f = c.a;
            d && a("#ProvinceSelect", b).combobox("setValue", d), e && a("#CitySelect", b).combobox("setValue", e), 
            f && a("#AreaSelect", b).combobox({
                disabled: !1
            }).combobox("setValue", f);
        }
    }, a.fn.district.parseOptions = function(b) {
        return a.extend({}, a.parser.parseOptions(b, [ "level" ]));
    }, a.fn.district.defaults = {
        id: null,
        level: 3
    }, a.parser && a.parser.plugins.push("district");
}(jQuery), function(a) {
    function b(b, c) {
        function d(c) {
            var d = a(b);
            g.url && d.attr("action", g.url);
            var f = d.attr("target"), h = d.attr("action");
            d.attr("target", i);
            var j = a();
            try {
                for (var k in c) {
                    var l = a('<input type="hidden" name="' + k + '">').val(c[k]).appendTo(d);
                    j = j.add(l);
                }
                e(), d[0].submit();
            } finally {
                d.attr("action", h), f ? d.attr("target", f) : d.removeAttr("target"), j.remove();
            }
        }
        function e() {
            var b = a("#" + i);
            if (b.length) try {
                var c = b.contents()[0].readyState;
                c && "uninitialized" == c.toLowerCase() && setTimeout(e, 100);
            } catch (d) {
                f();
            }
        }
        function f() {
            var b = a("#" + i);
            if (b.length) {
                b.unbind();
                var c = "";
                try {
                    var d = b.contents().find("body");
                    if (c = d.html(), "" == c && --k) return void setTimeout(f, 100);
                    var e = d.find(">textarea");
                    if (e.length) c = e.val(); else {
                        var h = d.find(">pre");
                        h.length && (c = h.html());
                    }
                } catch (j) {}
                g.success(c), setTimeout(function() {
                    b.unbind(), b.remove();
                }, 100);
            }
        }
        var g = a.data(b, "form").options;
        a.extend(g, c || {});
        var h = a.extend({}, g.queryParams);
        if (0 != g.onSubmit.call(b, h)) {
            a(b).find(".textbox-text:focus").blur();
            var i = "easyui_frame_" + new Date().getTime(), j = a("<iframe id=" + i + " name=" + i + "></iframe>").appendTo("body");
            j.attr("src", window.ActiveXObject ? "javascript:false" : "about:blank"), j.css({
                position: "absolute",
                top: -1e3,
                left: -1e3
            }), j.bind("load", f), d(h);
            var k = 10;
        }
    }
    function c(b, c) {
        function d(c) {
            var d = a(b);
            for (var f in c) {
                var i = c[f];
                e(f, i) || g(f, i) || (d.find('input[name="' + f + '"]').val(i), d.find('textarea[name="' + f + '"]').val(i), 
                d.find('select[name="' + f + '"]').val(i));
            }
            h.onLoadSuccess.call(b, c), d.form("validate");
        }
        function e(c, d) {
            var e = a(b).find('[switchbuttonName="' + c + '"]');
            return e.length ? (e.switchbutton("uncheck"), e.each(function() {
                f(a(this).switchbutton("options").value, d) && a(this).switchbutton("check");
            }), !0) : (e = a(b).find('input[name="' + c + '"][type=radio], input[name="' + c + '"][type=checkbox]'), 
            e.length ? (e._propAttr("checked", !1), e.each(function() {
                f(a(this).val(), d) && a(this)._propAttr("checked", !0);
            }), !0) : !1);
        }
        function f(b, c) {
            return b == String(c) || a.inArray(b, a.isArray(c) ? c : [ c ]) >= 0 ? !0 : !1;
        }
        function g(c, d) {
            var e = a(b).find('[textboxName="' + c + '"],[sliderName="' + c + '"]');
            if (e.length) for (var f = 0; f < h.fieldTypes.length; f++) {
                var g = h.fieldTypes[f], i = e.data(g);
                if (i) return i.options.multiple || i.options.range ? e[g]("setValues", d) : e[g]("setValue", d), 
                !0;
            }
            return !1;
        }
        var h = a.data(b, "form").options;
        if ("string" == typeof c) {
            var i = {};
            if (0 == h.onBeforeLoad.call(b, i)) return;
            a.ajax({
                url: c,
                data: i,
                dataType: "json",
                success: function(a) {
                    d(a);
                },
                error: function() {
                    h.onLoadError.apply(b, arguments);
                }
            });
        } else d(c);
    }
    function d(b) {
        a(".easyui-editor", b)[0] && (a(".easyui-editor", b).editor("clearValue"), a(".easyui-editor", b).editor("setValue", "请填写内容")), 
        a("input,select,textarea", b).each(function() {
            var b = this.type, c = this.tagName.toLowerCase();
            if ("text" == b || "hidden" == b || "password" == b || "textarea" == c) this.value = ""; else if ("file" == b) {
                var d = a(this);
                if (!d.hasClass("textbox-value")) {
                    var e = d.clone().val("");
                    e.insertAfter(d), d.data("validatebox") ? (d.validatebox("destroy"), e.validatebox()) : d.remove();
                }
            } else "checkbox" == b || "radio" == b ? this.checked = !1 : "select" == c && (this.selectedIndex = -1);
        });
        for (var c = a(b), d = a.data(b, "form").options, e = d.fieldTypes.length - 1; e >= 0; e--) {
            var f = d.fieldTypes[e], g = c.find("." + f + "-f");
            g.length && g[f] && g[f]("clear");
        }
    }
    function e(b) {
        b.reset();
        for (var c = a(b), d = a.data(b, "form").options, e = d.fieldTypes.length - 1; e >= 0; e--) {
            var f = d.fieldTypes[e], g = c.find("." + f + "-f");
            g.length && g[f] && g[f]("reset");
        }
        c.form("validate");
    }
    function f(c) {
        var d = a.data(c, "form").options;
        a(c).unbind(".form"), d.ajax && a(c).bind("submit.form", function() {
            return setTimeout(function() {
                b(c, d);
            }, 0), !1;
        }), a(c).bind("_change.form", function(a, b) {
            d.onChange.call(this, b);
        }).bind("change.form", function(b) {
            var c = b.target;
            a(c).hasClass("textbox-text") || d.onChange.call(this, c);
        }), i(c, d.novalidate);
    }
    function g(b, c) {
        c = c || {};
        var d = a.data(b, "form");
        d ? a.extend(d.options, c) : a.data(b, "form", {
            options: a.extend({}, a.fn.form.defaults, a.fn.form.parseOptions(b), c)
        });
    }
    function h(b) {
        if (a.fn.validatebox) {
            var c = a(b);
            c.find(".validatebox-text:not(:disabled)").validatebox("validate");
            var d = c.find(".validatebox-invalid");
            return d.filter(":not(:disabled):first").focus(), 0 == d.length;
        }
        return !0;
    }
    function i(b, c) {
        var d = a.data(b, "form").options;
        d.novalidate = c, a(b).find(".validatebox-text:not(:disabled)").validatebox(c ? "disableValidation" : "enableValidation");
    }
    a.fn.form = function(b, c) {
        return "string" == typeof b ? (this.each(function() {
            g(this);
        }), a.fn.form.methods[b](this, c)) : this.each(function() {
            g(this, b), f(this);
        });
    }, a.fn.form.methods = {
        options: function(b) {
            return a.data(b[0], "form").options;
        },
        submit: function(a, c) {
            return a.each(function() {
                b(this, c);
            });
        },
        load: function(a, b) {
            return a.each(function() {
                c(this, b);
            });
        },
        clear: function(a) {
            return a.each(function() {
                d(this);
            });
        },
        reset: function(a) {
            return a.each(function() {
                e(this);
            });
        },
        validate: function(a) {
            return h(a[0]);
        },
        disableValidation: function(a) {
            return a.each(function() {
                i(this, !0);
            });
        },
        enableValidation: function(a) {
            return a.each(function() {
                i(this, !1);
            });
        }
    }, a.fn.form.parseOptions = function(b) {
        var c = a(b);
        return a.extend({}, a.parser.parseOptions(b, [ {
            ajax: "boolean"
        } ]), {
            url: c.attr("action") ? c.attr("action") : void 0
        });
    }, a.fn.form.defaults = {
        fieldTypes: [ "combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo", "datetimespinner", "timespinner", "numberspinner", "spinner", "slider", "searchbox", "numberbox", "textbox", "switchbutton" ],
        novalidate: !1,
        ajax: !0,
        url: null,
        queryParams: {},
        onSubmit: function(b) {
            return a(this).form("validate");
        },
        success: function(a) {},
        onBeforeLoad: function(a) {},
        onLoadSuccess: function(a) {},
        onLoadError: function() {},
        onChange: function(a) {}
    };
}(jQuery), function(a) {
    function b(b) {
        var c = a.data(b, "iptsearch").options, d = c.clickFn, e = c.width, f = c.offsetWidth, g = a("<div>").addClass("ipt-search-box").width(e + f), h = a("<i>");
        a(b).wrap(g).after(h), a(b).width(e), (c.readonly || c.disabled) && a(b).attr("readonly", !0), 
        c.disabled && a(b).addClass("disabled"), c.resizeable && a(b).iptSearch("resize"), 
        c.validatebox && a(b).validatebox(c.validatebox.options || {}), c.enterKey && a(b).bind("keydown", function(a) {
            switch (a.keyCode) {
              case 13:
                a.stopPropagation(), a.preventDefault(), h.siblings("input").blur(), h.trigger("click");
            }
        }), h.bind("click", function() {
            return "function" != typeof d || c.disabled || (d(), top.iptSearchInputObj = b), 
            "string" == typeof d && new Function(d + "()")(), !1;
        });
    }
    a.fn.iptSearch = a.fn.iptsearch = function(c, d) {
        return "string" == typeof c ? a.fn.iptsearch.methods[c](this, d) : (c = c || {}, 
        this.each(function() {
            var d = this, e = a.data(d, "iptsearch");
            e ? a.extend(e.options, c) : (a.data(d, "iptsearch", {
                options: a.extend({}, a.fn.iptsearch.defaults, a.fn.iptsearch.parseOptions(d), c)
            }), b(d));
        }));
    }, a.fn.iptsearch.methods = {
        options: function(b) {
            return a.data(b[0], "iptsearch").options;
        },
        disable: function(a) {
            var b = a.iptsearch("options");
            b.disabled = !0, a.addClass("disabled");
        },
        enable: function(b) {
            var c = a(b).iptsearch("options");
            c.disabled = !1, b.removeClass("disabled");
        },
        resize: function(b) {
            var c = a(b).parents("div.datagrid-editable").width();
            a(b)._outerWidth(c)._outerHeight(22), a(b).parent()._outerWidth(c);
        }
    }, a.fn.iptsearch.parseOptions = function(b) {
        return a.extend({}, a.parser.parseOptions(b, [ "width", "disabled", "readonly" ]));
    }, a.fn.iptsearch.defaults = {
        width: 134,
        offsetWidth: 26,
        disabled: !1,
        readonly: !0,
        enterKey: !1,
        validatebox: !1,
        resizable: !1,
        clickFn: null
    }, a.parser && a.parser.plugins.push("iptsearch");
}(jQuery), function(a) {
    function b(b) {
        var c = a("input:not(:disabled,:hidden,[readonly])", b);
        return a(c);
    }
    function c(b) {
        var c = a("input:focus", b);
        return c;
    }
    function d(a, b) {
        setTimeout(function() {
            a.select().focus(), 0 == a.length && b && b.lastFn && b.lastFn.call(this);
        }, 100);
    }
    function e(a) {
        for (var b = a.offsetTop; a; ) {
            if (a.clientHeight < a.scrollHeight) {
                a.scrollTop = b;
                break;
            }
            a = a.parentElement;
        }
    }
    function f(b) {
        var c = a("tr.datagrid-row-selected", b), d = c.attr("datagrid-row-index") || 0;
        return parseInt(d);
    }
    function g(b) {
        {
            var c = a(b);
            c.data("keyboard").options;
        }
        c.attr("id") ? i() : c.attr("id", "_easyui_keyboard_" + h++), c.attr("tabindex") ? i() : c.attr("tabindex", h), 
        j(c);
    }
    var h = 0, i = function() {}, j = function(a) {
        j.init(a);
    };
    j.init = function(a, c, d) {
        function e(a, b, c) {
            a.hotKeys({
                type: "keydown",
                key: b,
                fn: c
            });
        }
        var f = a.data("keyboard").options;
        if ("form" == f.type) {
            var g = b(a).eq(0);
            setFocus(g), e(a, "return", this.keyHandler.right);
        } else "grid" == f.type && (e(a, "up", this.keyHandler.up), e(a, "down", this.keyHandler.down), 
        e(a, "return", this.keyHandler.right));
    }, j.keyHandler = {
        up: function(b) {
            function c() {
                var a = f(d), b = g.datagrid("getRows").length || 1, c = b - 1, h = 0 == a ? c : a - 1;
                if (g.datagrid("selectRow", h), k) for (var i = g.datagrid("getRowDom", h), j = 0, l = i.length; l > j; j++) e(i[j]);
            }
            b.preventDefault();
            var d = a(this), g = a(".datagrid-view>table:hidden", d), h = a(b.target), i = /combo/gi, j = /Wdate/gi, k = h.is("input");
            k && (i.test(h.parent().attr("class")) || j.test(h.attr("class"))) ? b.stopPropagation() : c();
        },
        down: function(b) {
            function c() {
                var a = f(d), b = g.datagrid("getRows").length || 1, c = b - 1, h = a == c ? 0 : a + 1;
                if (g.datagrid("selectRow", h), k) for (var i = g.datagrid("getRowDom", h), j = 0, l = i.length; l > j; j++) e(i[j]);
            }
            b.preventDefault();
            var d = a(this), g = a(".datagrid-view>table:hidden", d), h = a(b.target), i = /combo/gi, j = /Wdate/gi, k = h.is("input");
            k && (i.test(h.parent().attr("class")) || j.test(h.attr("class"))) ? b.stopPropagation() : c();
        },
        left: function() {},
        right: function() {
            var e = a(this), f = e.keyboard("options");
            "grid" == f.type && (e = e.find(".datagrid-view2>.datagrid-body"));
            var g = b(e), h = c(e), i = g.index(h[0]) || 0;
            d(g.eq(++i), f);
        },
        enter: function(a) {}
    }, j.formHandler = function(a) {}, j.gridHandler = function(a, b) {}, j.tabHandler = {}, 
    a.fn.keyboard = function(b, c) {
        return "string" == typeof b ? a.fn.keyboard.methods[b](this, c) : (b = b || {}, 
        this.each(function() {
            a.data(this, "keyboard") || a.data(this, "keyboard", {
                options: a.extend({}, a.fn.keyboard.defaults, a.fn.keyboard.parseOptions(this), b)
            }), g(this);
        }));
    }, a.fn.keyboard.parseOptions = function(b) {
        var c = a.parser.parseOptions(b);
        return a.extend({}, c);
    }, a.fn.keyboard.methods = {
        options: function(a, b) {
            return a.data("keyboard").options;
        }
    }, a.fn.keyboard.defaults = {
        type: "",
        lastFn: function() {}
    }, a.parser.plugins.push("keyboard");
}(jQuery);

var $dp, WdatePicker;

!function() {
    function a() {
        try {
            r[y], r.$dp = r.$dp || {};
        } catch (a) {
            r = w, $dp = $dp || {};
        }
        var d = {
            win: w,
            $: function(a) {
                return "string" == typeof a ? w[y].getElementById(a) : a;
            },
            $D: function(a, b) {
                return this.$DV(this.$(a).value, b);
            },
            $DV: function(a, b) {
                if ("" != a) {
                    if (this.dt = $dp.cal.splitDate(a, $dp.cal.dateFmt), b) for (var c in b) if (void 0 === this.dt[c]) this.errMsg = "invalid property:" + c; else if (this.dt[c] += b[c], 
                    "M" == c) {
                        var d = b.M > 0 ? 1 : 0, e = new Date(this.dt.y, this.dt.M, 0).getDate();
                        this.dt.d = Math.min(e + d, this.dt.d);
                    }
                    if (this.dt.refresh()) return this.dt;
                }
                return "";
            },
            show: function() {
                for (var a = r[y].getElementsByTagName("div"), b = 1e5, c = 0; c < a.length; c++) {
                    var d = parseInt(a[c].style.zIndex);
                    d > b && (b = d);
                }
                this.dd.style.zIndex = b + 2, o(this.dd, "block"), o(this.dd.firstChild, "");
            },
            unbind: function(a) {
                a = this.$(a), a.initcfg && (c(a, "onclick", function() {
                    m(a.initcfg);
                }), c(a, "onfocus", function() {
                    m(a.initcfg);
                }));
            },
            hide: function() {
                o(this.dd, "none");
            },
            attachEvent: b
        };
        for (var e in d) r.$dp[e] = d[e];
        $dp = r.$dp;
    }
    function b(a, b, c, d) {
        if (a.addEventListener) {
            var e = b.replace(/on/, "");
            c._ieEmuEventHandler = function(a) {
                return c(a);
            }, a.addEventListener(e, c._ieEmuEventHandler, d);
        } else a.attachEvent(b, c);
    }
    function c(a, b, c) {
        if (a.removeEventListener) {
            var d = b.replace(/on/, "");
            c._ieEmuEventHandler = function(a) {
                return c(a);
            }, a.removeEventListener(d, c._ieEmuEventHandler, !1);
        } else a.detachEvent(b, c);
    }
    function d(a, b, c) {
        if (typeof a != typeof b) return !1;
        if ("object" == typeof a) {
            if (!c) for (var e in a) {
                if ("undefined" == typeof b[e]) return !1;
                if (!d(a[e], b[e], !0)) return !1;
            }
            return !0;
        }
        return "function" == typeof a && "function" == typeof b ? a.toString() == b.toString() : a == b;
    }
    function e() {
        for (var a, b, c = w[y][A]("script"), d = 0; d < c.length && (a = c[d].getAttribute("src") || "", 
        a = a.substr(0, a.toLowerCase().indexOf("wdatepicker.js")), b = a.lastIndexOf("/"), 
        b > 0 && (a = a.substring(0, b + 1)), !a); d++) ;
        return a;
    }
    function f(a, b, c) {
        var d = w[y][A]("HEAD").item(0), e = w[y].createElement("link");
        d && (e.href = a, e.rel = "stylesheet", e.type = "text/css", b && (e.title = b), 
        c && (e.charset = c), d.appendChild(e));
    }
    function g(a) {
        a = a || r;
        for (var b = 0, c = 0; a != r; ) {
            for (var d = a.parent[y][A]("iframe"), e = 0; e < d.length; e++) try {
                if (d[e].contentWindow == a) {
                    var f = h(d[e]);
                    b += f.left, c += f.top;
                    break;
                }
            } catch (g) {}
            a = a.parent;
        }
        return {
            leftM: b,
            topM: c
        };
    }
    function h(a, b) {
        if (a.getBoundingClientRect) return a.getBoundingClientRect();
        var c = {
            ROOT_TAG: /^body|html$/i,
            OP_SCROLL: /^(?:inline|table-row)$/i
        }, d = !1, e = null, f = a.offsetTop, g = a.offsetLeft, h = a.offsetWidth, i = a.offsetHeight, k = a.offsetParent;
        if (k != a) for (;k; ) g += k.offsetLeft, f += k.offsetTop, "fixed" == n(k, "position").toLowerCase() ? d = !0 : "body" == k.tagName.toLowerCase() && (e = k.ownerDocument.defaultView), 
        k = k.offsetParent;
        for (k = a.parentNode; k.tagName && !c.ROOT_TAG.test(k.tagName); ) (k.scrollTop || k.scrollLeft) && (c.OP_SCROLL.test(o(k)) || v && "visible" === k.style.overflow || (g -= k.scrollLeft, 
        f -= k.scrollTop)), k = k.parentNode;
        if (!d) {
            var l = j(e);
            g -= l.left, f -= l.top;
        }
        return h += g, i += f, {
            left: g,
            top: f,
            right: h,
            bottom: i
        };
    }
    function i(a) {
        a = a || r;
        var b = a[y], c = a.innerWidth ? a.innerWidth : b[z] && b[z].clientWidth ? b[z].clientWidth : b.body.offsetWidth, d = a.innerHeight ? a.innerHeight : b[z] && b[z].clientHeight ? b[z].clientHeight : b.body.offsetHeight;
        return {
            width: c,
            height: d
        };
    }
    function j(a) {
        a = a || r;
        var b = a[y], c = b[z], d = b.body;
        return b = c && null != c.scrollTop && (c.scrollTop > d.scrollTop || c.scrollLeft > d.scrollLeft) ? c : d, 
        {
            top: b.scrollTop,
            left: b.scrollLeft
        };
    }
    function k(a) {
        try {
            var b = a ? a.srcElement || a.target : null;
            $dp.cal && !$dp.eCont && $dp.dd && b != $dp.el && "block" == $dp.dd.style.display && $dp.cal.close();
        } catch (a) {}
    }
    function l() {
        $dp.status = 2;
    }
    function m(c, e) {
        function f() {
            return t && r != w && "complete" != r[y].readyState ? !1 : !0;
        }
        function g() {
            if (u) {
                for (func = g.caller; null != func; ) {
                    var a = func.arguments[0];
                    if (a && (a + "").indexOf("Event") >= 0) return a;
                    func = func.caller;
                }
                return null;
            }
            return event;
        }
        if ($dp) {
            a();
            var h = {};
            for (var i in c) h[i] = c[i];
            for (i in q) "$" != i.substring(0, 1) && void 0 === h[i] && (h[i] = q[i]);
            if (e) {
                if (!f()) return void (D = D || setInterval(function() {
                    "complete" == r[y].readyState && clearInterval(D), m(null, !0);
                }, 50));
                if (0 != $dp.status) return;
                $dp.status = 1, h.el = x, p(h, !0);
            } else if (h.eCont) h.eCont = $dp.$(h.eCont), h.el = x, h.autoPickDate = !0, h.qsEnabled = !1, 
            p(h); else {
                if (q.$preLoad && 2 != $dp.status) return;
                var j = g();
                if ((w.event === j || j) && (h.srcEl = j.srcElement || j.target, j.cancelBubble = !0), 
                h.el = h.el = $dp.$(h.el || h.srcEl), !h.el || h.el.My97Mark === !0 || h.el.disabled || $dp.dd && "none" != o($dp.dd) && "-970px" != $dp.dd.style.left) {
                    try {
                        h.el.My97Mark && (h.el.My97Mark = !1);
                    } catch (k) {}
                    return;
                }
                j && 1 == h.el.nodeType && !d(h.el.initcfg, c) && ($dp.unbind(h.el), b(h.el, "focus" == j.type ? "onclick" : "onfocus", function() {
                    m(c);
                }), h.el.initcfg = c), p(h);
            }
        }
    }
    function n(a, b) {
        return a.currentStyle ? a.currentStyle[b] : document.defaultView.getComputedStyle(a, !1)[b];
    }
    function o(a, b) {
        if (a) {
            if (null == b) return n(a, "display");
            a.style.display = b;
        }
    }
    function p(a, b) {
        function c(a, b) {
            function c() {
                var c = b.getRealLang();
                a.lang = c.name, a.skin = b.skin;
                var g = [ "<head><script>", "", "var doc=document, $d, $dp, $cfg=doc.cfg, $pdp = parent.$dp, $dt, $tdt, $sdt, $lastInput, $IE=$pdp.ie, $FF = $pdp.ff,$OPERA=$pdp.opera, $ny, $cMark = false;", "if($cfg.eCont){$dp = {};for(var p in $pdp)$dp[p]=$pdp[p];}else{$dp=$pdp;};for(var p in $cfg){$dp[p]=$cfg[p];}", "doc.oncontextmenu=function(){try{$c._fillQS(!$dp.has.d,1);showB($d.qsDivSel);}catch(e){};return false;};", "</script><script src=", s, "lang/", c.name, ".js charset=", c.charset, "></script>" ];
                f && (g[1] = 'document.domain="' + e + '";');
                for (var j = 0; j < i.length; j++) i[j].name == b.skin && g.push('<link rel="stylesheet" type="text/css" href="' + s + "skin/" + i[j].name + '/datepicker.css" charset="' + i[j].charset + '"/>');
                g.push('<script src="' + s + 'calendar.js"></script>'), g.push('</head><body leftmargin="0" topmargin="0" tabindex=0></body></html>'), 
                g.push("<script>var t;t=t||setInterval(function(){if(doc.ready){new My97DP();$cfg.onload();$c.autoSize();$cfg.setPos($dp);clearInterval(t);}},20);</script>"), 
                b.setPos = d, b.onload = l, h.write("<html>"), h.cfg = b, h.write(g.join("")), h.close();
            }
            var e = r[y].domain, f = !1, g = '<iframe hideFocus=true width=9 height=7 frameborder=0 border=0 scrolling=no src="about:blank"></iframe>';
            a.innerHTML = g;
            var h, i = (q.$langList, q.$skinList);
            try {
                h = a.lastChild.contentWindow[y];
            } catch (j) {
                f = !0, a.removeChild(a.lastChild);
                var k = r[y].createElement("iframe");
                return k.hideFocus = !0, k.frameBorder = 0, k.scrolling = "no", k.src = "javascript:(function(){var d=document;d.open();d.domain='" + e + "';})()", 
                a.appendChild(k), void setTimeout(function() {
                    h = a.lastChild.contentWindow[y], c();
                }, 97);
            }
            c();
        }
        function d(a) {
            var b = a.position.left, c = a.position.top, d = a.el;
            if (d != x) {
                d == a.srcEl || "none" != o(d) && "hidden" != d.type || (d = a.srcEl);
                var e = h(d), f = g(w), k = i(r), l = j(r), m = $dp.dd.offsetHeight, n = $dp.dd.offsetWidth;
                if (isNaN(c) && (c = 0), f.topM + e.bottom + m > k.height && f.topM + e.top - m > 0) c += l.top + f.topM + e.top - m - 2; else {
                    c += l.top + f.topM + e.bottom;
                    var p = c - l.top + m - k.height;
                    p > 0 && (c -= p);
                }
                isNaN(b) && (b = 0), b += l.left + Math.min(f.leftM + e.left, k.width - n - 5) - (t ? 2 : 0), 
                a.dd.style.top = c + "px", a.dd.style.left = b + "px";
            }
        }
        var e = a.el ? a.el.nodeName : "INPUT";
        if (b || a.eCont || new RegExp(/input|textarea|div|span|p|a/gi).test(e)) {
            if (a.elProp = "INPUT" == e ? "value" : "innerHTML", "auto" == a.lang && (a.lang = t ? navigator.browserLanguage.toLowerCase() : navigator.language.toLowerCase()), 
            !a.eCont) for (var f in a) $dp[f] = a[f];
            !$dp.dd || a.eCont || $dp.dd && (a.getRealLang().name != $dp.dd.lang || a.skin != $dp.dd.skin) ? a.eCont ? c(a.eCont, a) : ($dp.dd = r[y].createElement("DIV"), 
            $dp.dd.style.cssText = "position:absolute", r[y].body.appendChild($dp.dd), c($dp.dd, a), 
            b ? $dp.dd.style.left = $dp.dd.style.top = "-970px" : ($dp.show(), d($dp))) : $dp.cal && ($dp.show(), 
            $dp.cal.init(), $dp.eCont || d($dp));
        }
    }
    var q = {
        $langList: [ {
            name: "en",
            charset: "UTF-8"
        }, {
            name: "zh-cn",
            charset: "UTF-8"
        }, {
            name: "zh-tw",
            charset: "UTF-8"
        } ],
        $skinList: [ {
            name: "default",
            charset: "gb2312"
        }, {
            name: "retail",
            charset: "gb2312"
        } ],
        $wdate: !0,
        $crossFrame: !0,
        $preLoad: !1,
        $dpPath: bootPATH + "assets/js/libs/my97/" || "",
        doubleCalendar: !1,
        enableKeyboard: !0,
        enableInputMask: !0,
        autoUpdateOnChanged: null,
        weekMethod: "ISO8601",
        position: {},
        lang: "auto",
        skin: "retail",
        dateFmt: "yyyy-MM-dd",
        realDateFmt: "yyyy-MM-dd",
        realTimeFmt: "HH:mm:ss",
        realFullFmt: "%Date %Time",
        minDate: "1900-01-01 00:00:00",
        maxDate: "2099-12-31 23:59:59",
        startDate: "",
        alwaysUseStartDate: !1,
        yearOffset: 1911,
        firstDayOfWeek: 0,
        isShowWeek: !1,
        highLineWeekDay: !0,
        isShowClear: !0,
        isShowToday: !0,
        isShowOK: !0,
        isShowOthers: !0,
        readOnly: !1,
        errDealMode: 0,
        autoPickDate: null,
        qsEnabled: !0,
        autoShowQS: !1,
        opposite: !1,
        hmsMenuCfg: {
            H: [ 1, 6 ],
            m: [ 5, 6 ],
            s: [ 15, 4 ]
        },
        specialDates: null,
        specialDays: null,
        disabledDates: null,
        disabledDays: null,
        onpicking: null,
        onpicked: null,
        onclearing: null,
        oncleared: null,
        ychanging: null,
        ychanged: null,
        Mchanging: null,
        Mchanged: null,
        dchanging: null,
        dchanged: null,
        Hchanging: null,
        Hchanged: null,
        mchanging: null,
        mchanged: null,
        schanging: null,
        schanged: null,
        eCont: null,
        vel: null,
        elProp: "",
        errMsg: "",
        quickSel: [],
        has: {},
        getRealLang: function() {
            for (var a = q.$langList, b = 0; b < a.length; b++) if (a[b].name == this.lang) return a[b];
            return a[0];
        }
    };
    WdatePicker = m;
    var r, s, t, u, v, w = window, x = {
        innerHTML: ""
    }, y = "document", z = "documentElement", A = "getElementsByTagName", B = navigator.appName;
    if ("Microsoft Internet Explorer" == B ? t = !0 : "Opera" == B ? v = !0 : u = !0, 
    s = q.$dpPath || e(), q.$wdate && f(s + "skin/WdatePicker.css"), r = w, q.$crossFrame) try {
        for (;r.parent != r && 0 == r.parent[y][A]("frameset").length; ) r = r.parent;
    } catch (C) {}
    r.$dp || (r.$dp = {
        ff: u,
        ie: t,
        opera: v,
        status: 0,
        defMinDate: q.minDate,
        defMaxDate: q.maxDate
    }), a(), q.$preLoad && 0 == $dp.status && b(w, "onload", function() {
        m(null, !0);
    }), w[y].docMD || (b(w[y], "onmousedown", k, !0), w[y].docMD = !0), r[y].docMD || (b(r[y], "onmousedown", k, !0), 
    r[y].docMD = !0), b(w, "onunload", function() {
        $dp.dd && o($dp.dd, "none");
    });
    var D;
}(), function(a) {
    function b(b) {
        var c = new XMLHttpRequest(), d = a(b).data("datebox").options, e = /\?/.test(window.location.href) ? window.location.href + "&dateSync=true" : window.location.href + "?dateSync=true";
        c.onreadystatechange = function() {
            if (2 == c.readyState) {
                var b = new Date(c.getResponseHeader("Date")), e = new Date();
                if (b > 0) {
                    {
                        var f = {
                            year: b.getFullYear(),
                            month: b.getMonth() + 1,
                            day: b.getDate(),
                            hour: b.getHours(),
                            minute: b.getMinutes(),
                            second: b.getSeconds()
                        };
                        ({
                            year: e.getFullYear(),
                            month: e.getMonth() + 1,
                            day: e.getDate(),
                            hour: e.getHours(),
                            minute: e.getMinutes(),
                            second: e.getSeconds()
                        });
                    }
                    d.startDate = f.year + "-" + f.month + "-" + f.day + " " + f.hour + ":" + f.minute + ":" + f.second, 
                    a.fn.datebox.defaults.time.originalDate = b.getTime(), a.fn.datebox.defaults.time.localDate = e.getTime();
                }
                return void c.abort();
            }
            4 == c.readyState;
        }, c.open("GET", e, !0), c.send(), a.fn.datebox.defaults.time.hasRequset = !0;
    }
    function c(b) {
        var c, d = a(b), e = d.data("datebox").options, f = a.fn.datebox.defaults.time.originalDate || 0, g = a.fn.datebox.defaults.time.localDate || 0;
        c = new Date().getTime() - g + f, c = new Date(+c);
        var h = {
            year: c.getFullYear(),
            month: c.getMonth() + 1,
            day: c.getDate(),
            hour: c.getHours(),
            minute: c.getMinutes(),
            second: c.getSeconds()
        };
        e.startDate = h.year + "-" + h.month + "-" + h.day + " " + h.hour + ":" + h.minute + ":" + h.second;
    }
    a.fn.datebox = function(b, d) {
        return "string" == typeof b ? a.fn.datebox.methods[b](this, d) : (b = b || {}, WdatePicker ? this.each(function() {
            var d, e = a.data(this, "datebox");
            e ? (d = a.extend(e.options, b), e.opts = d) : (d = a.extend({}, a.fn.datebox.defaults, a.fn.datebox.parseOptions(this), b), 
            a.data(this, "datebox", {
                options: d
            })), d.required && a(this).validatebox({
                required: !0
            }), d.disabled && a(this).addClass("disabled").attr("disabled", !0), d.width && a(this).css({
                width: d.width
            }), d.maxDate && !/^[\d|#]/.test(d.maxDate || "2099-12-31") && (d.maxDate = "#F{$dp.$D('" + d.maxDate + "')}"), 
            d.minDate && !/^[\d|#]/.test(d.minDate || "1970-07-01") && (d.minDate = "#F{$dp.$D('" + d.minDate + "')}"), 
            d.dateSync && !a.fn.datebox.defaults.time.hasRequset && (d.startDate ? d.dateSync = !1 : a(this).datebox("dateSync")), 
            d.isTabTrigger ? a(this).addClass("Wdate").on("focus", function(a) {
                d.dateSync && c(this), WdatePicker(d);
            }) : a(this).addClass("Wdate").on("click", function(a) {
                d.dateSync && c(this), WdatePicker(d);
            });
        }) : void alert("未引入My97js包！"));
    }, a.fn.datebox.methods = {
        getValue: function(b) {
            return a(b).val();
        },
        setValue: function(b, c) {
            return a(b).val(c);
        },
        clearValue: function(b) {
            a(b).val("");
        },
        disable: function(b) {
            a(b).attr("disabled", !0);
        },
        enable: function(b) {
            a(b).attr("disabled", !1);
        },
        destroy: function(b) {
            a(b).remove();
        },
        resize: function(b, c) {
            a(b)._outerWidth(c);
        },
        dateSync: function(c) {
            a(c).each(function() {
                return b(c);
            });
        }
    }, a.fn.datebox.parseOptions = function(b) {
        return a.extend({}, a.parser.parseOptions(b, [ "el", "vel", "weekMethod", "lang", "skin", "dateFmt", "realDateFmt", "realTimeFmt", "realFullFmt", "minDate", "maxDate", "startDate", {
            doubleCalendar: "boolean",
            enableKeyboard: "boolean",
            enableInputMask: "boolean",
            autoUpdateOnChanged: "boolean",
            firstDayOfWeek: "number",
            isShowWeek: "boolean",
            highLineWeekDay: "boolean",
            isShowClear: "boolean",
            isShowToday: "boolean",
            isShowOthers: "boolean",
            readOnly: "boolean",
            errDealMode: "boolean",
            autoPickDate: "boolean",
            qsEnabled: "boolean",
            autoShowQS: "boolean",
            opposite: "boolean"
        } ]));
    }, a.fn.datebox.defaults = {
        dateFmt: "yyyy-MM-dd",
        isTabTrigger: !1,
        readOnly: !1,
        dateSync: !0,
        time: {
            hasRequset: !1
        }
    };
}(jQuery), function(a, b) {
    function c(c) {
        function d() {
            var b = m.panel("panel");
            if (0 == b.find(".panel-search").length) {
                var c = "";
                c += '<div class="panel-search combotree-search"><input placeholder="搜索..." autofocus="autofocus" type="text" class="ipt" />', 
                c += "</div>";
                var d = a(c).prependTo(m), e = d.find(".ipt");
                d.css({
                    width: (p.panelWidth || n.parent(".combo").outerWidth()) - 10,
                    position: "absolute",
                    top: 0,
                    left: 0
                }), e.css({
                    width: p.panelWidth ? p.panelWidth - 40 : n.width() - 8
                }), o.css({
                    marginTop: d.outerHeight() + e.outerHeight()
                });
            }
        }
        function e(c, d) {
            function e(c) {
                for (var d = 0; d < c.length; d++) c[d].children && c[d].children.length > 0 ? (e(c[d].children), 
                c[d].children.show !== b && c[d].children.show === !0 && a("#" + c[d].domId).show()) : (a("#" + c[d].domId).show(), 
                c.show = !0);
            }
            function f(c) {
                for (var g = 0, h = 0; h < c.length; h++) if (c[h].children && c[h].children.length > 0) {
                    if (c[h].children.preObject = c[h], f(c[h].children), -1 != c[h].text.toLowerCase().indexOf(d.toLowerCase())) {
                        a("#" + c[h].domId).show(), e(c[h].children);
                        continue;
                    }
                    if (c[h].children.show !== b && c[h].children.show === !1) {
                        a("#" + c[h].domId).hide(), g++;
                        continue;
                    }
                    a("#" + c[h].domId).show();
                } else -1 == c.preObject.text.toLowerCase().indexOf(d.toLowerCase()) && d && -1 == c[h].text.toLowerCase().indexOf(d.toLowerCase()) ? (a("#" + c[h].domId).hide(), 
                g++) : a("#" + c[h].domId).show();
                return g == c.length ? c.show = !1 : c.show = !0, c;
            }
            var g = c;
            if (g.length > 0) for (var h = 0; h < g.length; h++) g[h].children && g[h].children.length > 0 ? (g[h].children.preObject = g[h], 
            f(g[h].children), -1 != g[h].text.toLowerCase().indexOf(d.toLowerCase()) ? (a("#" + g[h].domId).show(), 
            e(g[h].children)) : g[h].children.show ? a("#" + g[h].domId).show() : a("#" + g[h].domId).hide()) : -1 == g[h].text.toLowerCase().indexOf(d.toLowerCase()) ? a("#" + g[h].domId).hide() : a("#" + g[h].domId).show();
            return g;
        }
        function f(a) {
            var b = a.keyCode;
            switch (b) {
              case 38:
                break;

              case 40:
                break;

              case 37:
                break;

              case 39:
                break;

              default:
                c && clearTimeout(c);
                var c = setTimeout(function() {
                    var a = j.val();
                    e(k, a);
                }, p.delay);
            }
        }
        function g(b) {
            var c = a(this).scrollTop();
            i.css({
                top: c
            });
        }
        function h() {
            j.unbind(navigator.userAgent.indexOf("Firefox") > 0 ? "keyup.search" : "keydown.search").bind(navigator.userAgent.indexOf("Firefox") > 0 ? "keyup.search" : "keydown.search", f), 
            m.unbind("scroll.search").bind("scroll.search", g);
        }
        var i, j, k, l = a(c), m = l.combo("panel"), n = l.combo("textbox"), o = m.find("ul.tree"), p = l.combo("options");
        d(), i = m.find(".panel-search"), j = m.find(".ipt"), k = o.tree("getRoots"), p.expandAll === !0 ? o.tree("expandAll") : p.expandAll === !1 ? o.tree("collapseAll") : null, 
        k && k.length > 0 && h(), p.oneRootChecked && 1 == k.length && o.tree("check", k[0].target);
    }
    function d(b) {
        {
            var c = a.util.parseJquery(b), d = c.combo("panel"), e = (d.panel("panel"), a.data(b, "combotree"));
            c.combotree("options"), e.tree;
        }
    }
    a.fn.combotree.extensions = {};
    var e = a.fn.combotree;
    a.fn.combotree = function(a, b) {
        return "string" == typeof a ? e.apply(this, arguments) : e.apply(this, arguments).each(function() {
            d(this);
        });
    }, a.union(a.fn.combotree, e);
    var f = a.fn.combotree.extensions.defaults = {
        oneRootChecked: !1,
        expandAll: null
    }, g = a.fn.combotree.extensions.methods = {
        initSearchBox: function(a) {
            return a.each(function() {
                c(this);
            });
        }
    };
    a.extend(a.fn.combotree.defaults, f), a.extend(a.fn.combotree.methods, g);
}(jQuery), function(a, b) {
    a.extend(a.fn.layout.methods, {
        isVisible: function(b, c) {
            var d = a.data(b[0], "layout").panels, e = d[c];
            return e && e.length ? e.panel("panel").is(":visible") : !1;
        },
        hidden: function(b, c) {
            return b.each(function() {
                function b(b, c, f) {
                    var g = c.substring(0, 1), h = c.substring(1), i = "expand" + g.toUpperCase() + h;
                    e[i] ? a(b).layout("isVisible", i) ? (d.regionState[c] = 1, e[i].panel("close")) : a(b).layout("isVisible", c) && (d.regionState[c] = 0, 
                    e[c].panel("close")) : e[c].panel("close"), f && a(b).layout("resize");
                }
                var d = a.data(this, "layout").options, e = a.data(this, "layout").panels;
                d.regionState || (d.regionState = {});
                var f = c;
                "all" == f.toLowerCase() ? (b(this, "east", !1), b(this, "north", !1), b(this, "west", !1), 
                b(this, "south", !0)) : b(this, f, !0);
            });
        },
        show: function(b, c) {
            return b.each(function() {
                function b(b, c, f) {
                    var g = c.substring(0, 1), h = c.substring(1), i = "expand" + g.toUpperCase() + h;
                    e[i] ? a(b).layout("isVisible", i) || a(b).layout("isVisible", c) || (1 == d.regionState[c] ? e[i].panel("open") : e[c].panel("open")) : e[c].panel("open"), 
                    f && a(b).layout("resize");
                }
                var d = a.data(this, "layout").options, e = a.data(this, "layout").panels, f = c;
                "all" == f.toLowerCase() ? (b(this, "east", !1), b(this, "north", !1), b(this, "west", !1), 
                b(this, "south", !0)) : b(this, f, !0);
            });
        }
    });
}(jQuery), function(a) {
    function b(b, c) {
        return a("#" + b).length > 0 ? void 0 : a("<style>" + c + "</style>").attr("id", b).attr("type", "text/css").appendTo("head");
    }
    a.extend({
        mask: function(c) {
            c = c || {};
            var d = a.extend({}, {
                target: "body",
                loadMsg: a.fn.datagrid.defaults.loadMsg
            }, c);
            this.unmask(d), "body" != d.target && "static" == a(d.target).css("position") && a(d.target).addClass("mask-relative");
            var e = (a('<div class="datagrid-mask" style="display:block;"></div>').appendTo(d.target), 
            a('<div class="datagrid-mask-msg" style="display:none; left: 50%;"></div>').html(d.loadMsg).appendTo(d.target));
            setTimeout(function() {
                e.css("marginLeft", -e.outerWidth() / 2).show();
            }, 5);
            var f = ".mask-relative {position: relative !important;}";
            b("mask_css", f);
        },
        unmask: function(b) {
            var c = b.target || "body";
            a(">div.datagrid-mask-msg", c).remove(), a(">div.datagrid-mask", c).remove(), a(b.target).removeClass("mask-relative");
        }
    });
}(jQuery), function(a, b) {
    function c(b) {
        var c = a.util.parseJquery(b), d = c.tabs("options"), e = d.tabPosition;
        a.isNumeric(d.lineHeight) && d.lineHeight > 0 && (a.array.contains([ "top", "bottom", "left", "right" ], e) || (e = "top"), 
        c.children("div.tabs-panels").css("padding-" + e, d.lineHeight.toString() + "px").children().children().css("border-" + e + "-width", "1px"));
    }
    function d(b, c, e, f, g) {
        return a.array.map(f, function(f) {
            if (!f || a.util.isString(f)) return f;
            var h = a.extend({}, f);
            return h.id = a.isFunction(f.id) ? f.id.call(h, b, c, e, g) : f.id, h.text = a.isFunction(f.text) ? f.text.call(h, b, c, e, g) : f.text, 
            h.iconCls = a.isFunction(f.iconCls) ? f.iconCls.call(h, b, c, e, g) : f.iconCls, 
            h.disabled = a.isFunction(f.disabled) ? f.disabled.call(h, b, c, e, g) : f.disabled, 
            h.hideOnClick = a.isFunction(f.hideOnClick) ? f.hideOnClick.call(h, b, c, e, g) : f.hideOnClick, 
            h.onclick = a.isFunction(f.onclick) ? function(a, b, d) {
                f.onclick.call(this, a, c, e, g, b, d);
            } : f.onclick, h.handler = a.isFunction(f.handler) ? function(a, b, d) {
                f.handler.call(this, a, c, e, g, b, d);
            } : f.handler, h.children && h.children.length && (h.children = d(b, c, e, h.children, g)), 
            h;
        });
    }
    function e(b, d) {
        d = a.extend({
            tab: null,
            options: null
        }, d);
        var e = a.util.parseJquery(b), f = (e.tabs("options"), e.tabs("getTabIndex", d.tab)), g = a.union({}, d.options, a.fn.tabs.extensions.panelOptions), h = g.tools, i = g.onLoad, j = {
            iconCls: "icon-mini-refresh",
            handler: function() {
                var b = a(this).parent().prev().find("span.tabs-title").text();
                b && a.util.exec(function() {
                    e.tabs("refresh", b);
                });
            }
        };
        g.refreshable && g.refreshButton && (a.array.likeArray(g.tools) ? g.tools = a.array.merge([], g.tools, j) : g.tools = [ j ]), 
        0 == g.showMessager || a.string.isNullOrWhiteSpace(g.href) && a.string.isNullOrWhiteSpace(g.content) || !g.selected && e.tabs("getSelected") != d.tab || g.iniframe || (a.easyui.messager.progress({
            title: "操作提醒",
            msg: "正在加载...",
            interval: 100
        }), g.onLoad = function() {
            a.isFunction(i) && i.apply(this, arguments), a.util.exec(function() {
                a.easyui.messager.progress("close");
            }), a.util.parseJquery(this).panel("options").onLoad = i;
        });
        var k = d.type ? d.type : "header", l = L.call(e, e, {
            tab: d.tab,
            options: g,
            type: k
        });
        g = e.tabs("getTab", f).panel("options"), g.tools = h, c(b);
        var m = e.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li").eq(f).off("dblclick.closeOnDblClick").on("dblclick.closeOnDblClick", function() {
            g.closeOnDblClick && g.closable && e.tabs("close", g.title);
        });
        return g.closeOnDblClick && g.closable && m.attr("title", "双击此选项卡标题可以将其关闭"), l;
    }
    function f(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("options"), f = d.tabs("getTab", c), g = f.panel("options"), h = d.tabs("getTabIndex", f);
        if (a.string.isNullOrWhiteSpace(g.href) && a.string.isNullOrWhiteSpace(g.content)) {
            var i = f.find("iframe"), j = i.attr("src");
            return void i.attr("src", j);
        }
        d.tabs("update", {
            tab: f,
            options: g,
            type: "all"
        }), a.isFunction(e.onRefresh) && e.onRefresh.call(b, e.title, h);
    }
    function g(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("getSelected"), f = d.tabs("getTabIndex", e), g = d.tabs("getTab", c), h = d.tabs("getTabIndex", g);
        return h == f;
    }
    function h(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("getTab", c), f = e.panel("options");
        return f.closable;
    }
    function i(b, c) {
        var d = a("<table></table>").css({
            width: "95%",
            height: "100%"
        }), e = a("<input type='text' style='width: 98%;'/>"), f = a("<input type='text' style='width: 98%;'/>"), g = a("<input id='refreshable' type='checkbox' checked='true' />"), h = a("<input id='iniframe' type='checkbox' />"), i = a("<label>是否可刷新</label>"), j = a("<label>是否嵌至 IFRAME(浏览器内部窗体) 中</label>"), k = a("<tr></tr>").append("<td width='24%' align='right'>选项卡标题：</td>").appendTo(d), l = a("<tr></tr>").append("<td width='24%' align='right'>路径(href)：</td>").appendTo(d), m = a("<tr></tr>").appendTo(d);
        a("<td></td>").append(e).appendTo(k), a("<td></td>").append(f).appendTo(l), a("<td width='24%' align='right'></td>").append(g).append(i).appendTo(m), 
        a("<td align='right'></td>").append(h).append(j).appendTo(m), c = c || 0;
        var n = a.util.parseJquery(b), o = a.isNumeric(c) ? c : n.tabs("getTabIndex", n.tabs("getTab", c)), p = n.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li:eq(" + o + ")"), q = p.offset(), r = a.extend({}, {
            left: q.left + 10,
            top: q.top + 10
        }), s = a.extend({
            iconCls: "icon-standard-application-form",
            title: "新建选项卡 - 设置参数",
            width: 400,
            height: 165,
            maximizable: !1,
            resizable: !1,
            autoVCenter: !1,
            autoHCenter: !1,
            enableSaveButton: !1,
            topMost: !1,
            applyButtonText: "打开",
            onApply: function(b) {
                var c = e.val(), d = f.val();
                d = d || a.fn.tabs.extensions.panelOptions.href, a.string.isNullOrWhiteSpace(c) && (c = "新建选项卡");
                for (var i = 0; n.tabs("getTab", c += i ? i : ""); ) i++;
                if (a.string.isNullOrWhiteSpace(d)) return a.easyui.messager.show("操作提醒", "请输入要创建的选项卡的路径！", "info"), 
                void f.focus();
                var j = h.prop("checked"), k = g.prop("checked");
                n.tabs("add", {
                    title: c,
                    href: d,
                    refreshable: k,
                    closable: !0,
                    iniframe: j
                }), b.dialog("close");
            },
            content: d
        }, r), t = a.easyui.showDialog(s);
        a.util.exec(function() {
            var a = t.find(">div.dialog-button>a:first");
            e.keydown(function(a) {
                13 == a.which && f.focus();
            }), f.keydown(function(a) {
                13 == a.which && g.focus();
            }), g.keydown(function(a) {
                13 == a.which && h.focus();
            }), h.keydown(function(b) {
                13 == b.which && a.focus();
            }), i.click(function() {
                g.click();
            }), j.click(function() {
                h.click();
            }), a.focus(), e.focus();
        });
    }
    function j(b, c) {
        for (var d = a.util.parseJquery(b), e = d.tabs("getTab", c), f = e.panel("options"), g = a.extend({}, f, {
            selected: !0,
            closable: !0
        }), h = 2, i = g.title; d.tabs("getTab", g.title = i + "-" + h.toString()); ) h++;
        d.tabs("add", g);
    }
    function k(b, c) {
        var d = (a.util.parseJquery(b), tabs.tabs("getTab", c)), e = d.panel("options");
        return e;
    }
    function l(b) {
        var c = a.util.parseJquery(b), d = c.tabs("getSelected"), e = d.panel("options");
        return e;
    }
    function m(b) {
        var c = a.util.parseJquery(b), d = c.tabs("getSelected"), e = c.tabs("getTabIndex", d);
        return e;
    }
    function n(b) {
        var c = a.util.parseJquery(b), d = c.tabs("getSelectedOption"), e = d.title;
        return e;
    }
    function o(b, c) {
        var d = a.util.parseJquery(b), e = a.isNumeric(c) ? c : d.tabs("getTabIndex", d.tabs("getTab", c)), f = d.tabs("tabs");
        return a.array.range(f, 0, e);
    }
    function p(b, c) {
        var d = a.util.parseJquery(b), e = a.isNumeric(c) ? c : d.tabs("getTabIndex", d.tabs("getTab", c)), f = d.tabs("tabs");
        return a.array.range(f, e + 1);
    }
    function q(b, c) {
        var d = a.util.parseJquery(b), e = a.isNumeric(c) ? c : d.tabs("getTabIndex", d.tabs("getTab", c)), f = d.tabs("tabs");
        return a.array.merge(a.array.range(f, 0, e), a.array.range(f, e + 1));
    }
    function r(b) {
        var c = a.util.parseJquery(b), d = c.tabs("tabs");
        return a.array.filter(d, M);
    }
    function s(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("leftTabs", c);
        return a.array.filter(e, M);
    }
    function t(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("rightTabs", c);
        return a.array.filter(e, M);
    }
    function u(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("otherTabs", c);
        return a.array.filter(e, M);
    }
    function v(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("leftTabs", c);
        a.each(e, function() {
            d.tabs("close", d.tabs("getTabIndex", this));
        });
    }
    function w(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("rightTabs", c);
        a.each(e, function() {
            d.tabs("close", d.tabs("getTabIndex", this));
        });
    }
    function x(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("otherTabs", c);
        a.each(e, function() {
            d.tabs("close", d.tabs("getTabIndex", this));
        });
    }
    function y(b) {
        var c = a.util.parseJquery(b), d = c.tabs("tabs");
        a.each(a.array.clone(d), function() {
            c.tabs("close", c.tabs("getTabIndex", this));
        });
    }
    function z(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("getTab", c);
        if (e && e.panel("options").closable) {
            var f = a.isNumeric(c) ? c : d.tabs("getTabIndex", e);
            d.tabs("close", f);
        }
    }
    function A(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("leftClosableTabs", c);
        a.each(a.array.clone(e), function() {
            d.tabs("close", d.tabs("getTabIndex", this));
        });
    }
    function B(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("rightClosableTabs", c);
        a.each(a.array.clone(e), function() {
            d.tabs("close", d.tabs("getTabIndex", this));
        });
    }
    function C(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("otherClosableTabs", c);
        a.each(a.array.clone(e), function() {
            d.tabs("close", d.tabs("getTabIndex", this));
        });
    }
    function D(b, c) {
        var d = a.util.parseJquery(b), e = d.tabs("closableTabs", c);
        a.each(a.array.clone(e), function() {
            d.tabs("close", d.tabs("getTabIndex", this));
        });
    }
    function E(b, c) {
        c = c || 0;
        var d = a.util.parseJquery(b), e = d.tabs("getTab", c), f = e.panel("options"), g = a.isNumeric(c) ? c : d.tabs("getTabIndex", e), h = d.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li:eq(" + g + ")"), i = h.offset(), j = a.extend({}, {
            left: i.left + 10,
            top: i.top + 10
        });
        a.easyui.showOption(f, {
            iconCls: "icon-standard-application-form",
            title: "显示选项卡 " + f.title + " 的 option 值",
            left: j.left,
            top: j.top,
            topMost: !1
        });
    }
    function F(c, d) {
        if (d && d.source != b && d.target != b && d.point) {
            var e = d.source, f = d.target, g = a.array.contains([ "before", "after" ], d.point) ? d.point : "before", h = a.util.parseJquery(c), i = h.tabs("tabs"), j = h.tabs("getTab", e), k = h.tabs("getTab", f), l = h.tabs("getTabIndex", j), m = j.panel("header"), n = k.panel("header");
            if (j && k) {
                a.array.removeAt(i, l);
                var o = a.array.indexOf(i, k);
                a.array.insert(i, "before" == g ? o : o + 1, j), j = j.panel("panel"), k = k.panel("panel"), 
                k[g](j), n[g](m);
            }
        }
    }
    function G(c, d) {
        var e = d.target, f = a.util.parseJquery(c);
        d.target = b, f.tabs("add", d);
        var g = f.tabs("tabs");
        f.tabs("move", {
            source: g.length - 1,
            target: e,
            point: "before"
        });
    }
    function H(b, c) {
        if (c && (c.which || a.isNumeric(c.which)) && c.title) {
            var d = a.util.parseJquery(b), e = d.tabs("getTab", c.which);
            e.panel("setTitle", c.title);
        }
    }
    function I(b, c) {
        c = c && !a.util.isTopMost ? !0 : !1;
        var d, e = a.util.parseJquery(b), f = e.currentTabs();
        if (!c && f.length) d = e.currentTabIndex(), d > -1 && f.tabs("close", d); else {
            var g = a.util.parent.$;
            e = g.util.parseJquery(a.util.currentFrame), f = e.currentTabs(), f.length && (d = e.currentTabIndex(), 
            d > -1 && f.tabs("close", d));
        }
    }
    a.fn.tabs.extensions = {};
    var J = a.fn.tabs.defaults.onContextMenu, K = function(b, c, e) {
        a.isFunction(J) && J.apply(this, arguments);
        var f = a.util.parseJquery(this), g = f.tabs("options");
        if (g.enableConextMenu) {
            b.preventDefault();
            var h = f.tabs("getTab", e), i = h.panel("options"), j = f.tabs("leftClosableTabs", e), k = f.tabs("rightClosableTabs", e), l = f.tabs("otherClosableTabs", e), m = f.tabs("closableTabs"), n = (f.tabs("isSelected", e), 
            {
                text: "显示选项卡的 option",
                iconCls: "icon-standard-application-form",
                disabled: !g.showOption,
                handler: function() {
                    f.tabs("showOption", e);
                }
            }), o = {
                text: "关闭选项卡",
                iconCls: "icon-standard-application-form-delete",
                disabled: !i.closable,
                handler: function() {
                    f.tabs("closeClosable", e);
                }
            }, p = {
                text: "关闭其他选项卡",
                iconCls: "icon-standard-cancel",
                disabled: !l.length,
                handler: function() {
                    f.tabs("closeOtherClosable", e);
                }
            }, q = {
                text: "刷新选项卡",
                iconCls: "icon-standard-table-refresh",
                disabled: !i.refreshable,
                handler: function() {
                    f.tabs("refresh", e);
                }
            }, r = {
                text: "关闭左侧选项卡",
                iconCls: "icon-standard-tab-close-left",
                disabled: !j.length,
                handler: function() {
                    f.tabs("closeLeftClosable", e);
                }
            }, s = {
                text: "关闭右侧选项卡",
                iconCls: "icon-standard-tab-close-right",
                disabled: !k.length,
                handler: function() {
                    f.tabs("closeRightClosable", e);
                }
            }, t = {
                text: "关闭所有选项卡",
                iconCls: "icon-standard-cross",
                disabled: !m.length,
                handler: function() {
                    f.tabs("closeAllClosable");
                }
            }, u = {
                text: "新建选项卡",
                iconCls: "icon-standard-tab-add",
                disabled: !g.enableNewTabMenu,
                handler: function() {
                    f.tabs("newTab", e);
                }
            }, v = {
                text: "重复选项卡",
                iconCls: "icon-standard-control-repeat",
                disabled: !i.repeatable,
                handler: function() {
                    f.tabs("repeat", e);
                }
            }, w = [];
            if (a.array.likeArray(g.contextMenu) && !a.util.isString(g.contextMenu) && a.array.merge(w, g.contextMenu), 
            g.showOption && a.array.merge(w, "-", n), a.array.merge(w, i.closable ? [ "-", o, p ] : [ "-", p ]), 
            i.refreshable && a.array.merge(w, "-", q), a.array.merge(w, "-", r, s, t), i.repeatable || g.enableNewTabMenu) {
                var x = [];
                g.enableNewTabMenu && x.push(u), i.repeatable && x.push(v), a.array.merge(w, "-", x);
            }
            w = d(b, c, e, w, f), "-" == w[0] && a.array.removeAt(w, 0), a.easyui.showMenu({
                left: b.pageX,
                top: b.pageY,
                items: w
            });
        }
    }, L = a.fn.tabs.methods.update, M = function(b) {
        if (a.util.isJqueryObject(b) && b.length) {
            var c = a.data(b[0], "panel");
            return c && c.options && c.options.closable;
        }
        return !1;
    }, N = (a.fn.tabs.extensions.panelOptions = {
        iniframe: !1,
        repeatable: !1,
        refreshButton: !1,
        lazyload: !1,
        refreshable: !0,
        closeOnDblClick: !0,
        href: null
    }, a.fn.tabs.extensions.methods = {
        update: function(a, b) {
            return a.each(function() {
                e(this, b);
            });
        },
        refresh: function(a, b) {
            return a.each(function() {
                f(this, b);
            });
        },
        isSelected: function(a, b) {
            return g(a[0], b);
        },
        isClosable: function(a, b) {
            return h(a[0], b);
        },
        newTab: function(a, b) {
            return a.each(function() {
                i(this, b);
            });
        },
        repeat: function(a, b) {
            return a.each(function() {
                j(this, b);
            });
        },
        getTabOption: function(a, b) {
            return k(a[0], b);
        },
        getSelectedOption: function(a) {
            return l(a[0]);
        },
        getSelectedIndex: function(a) {
            return m(a[0]);
        },
        getSelectedTitle: function(a) {
            return n(a[0]);
        },
        leftTabs: function(a, b) {
            return o(a[0], b);
        },
        rightTabs: function(a, b) {
            return p(a[0], b);
        },
        otherTabs: function(a, b) {
            return q(a[0], b);
        },
        closableTabs: function(a) {
            return r(a[0]);
        },
        leftClosableTabs: function(a, b) {
            return s(a[0], b);
        },
        rightClosableTabs: function(a, b) {
            return t(a[0], b);
        },
        otherClosableTabs: function(a, b) {
            return u(a[0], b);
        },
        closeLeft: function(a, b) {
            return a.each(function() {
                v(this, b);
            });
        },
        closeRight: function(a, b) {
            return a.each(function() {
                w(this, b);
            });
        },
        closeOther: function(a, b) {
            return a.each(function() {
                x(this, b);
            });
        },
        closeAll: function(a) {
            return a.each(function() {
                y(this);
            });
        },
        closeClosable: function(a, b) {
            return a.each(function() {
                z(this, b);
            });
        },
        closeLeftClosable: function(a, b) {
            return a.each(function() {
                A(this, b);
            });
        },
        closeRightClosable: function(a, b) {
            return a.each(function() {
                B(this, b);
            });
        },
        closeOtherClosable: function(a, b) {
            return a.each(function() {
                C(this, b);
            });
        },
        closeAllClosable: function(a) {
            return a.each(function() {
                D(this);
            });
        },
        showOption: function(a, b) {
            return a.each(function() {
                E(this, b);
            });
        },
        move: function(a, b) {
            return a.each(function() {
                F(this, b);
            });
        },
        insert: function(a, b) {
            return a.each(function() {
                G(this, b);
            });
        },
        setTitle: function(a, b) {
            return a.each(function() {
                H(this, b);
            });
        }
    }), O = a.fn.tabs.extensions.defaults = {
        lineHeight: 0,
        enableConextMenu: !0,
        enableNewTabMenu: !1,
        onRefresh: function(a, b) {},
        contextMenu: null,
        onContextMenu: K,
        showOption: !1,
        showMessager: !0
    };
    a.extend(a.fn.tabs.defaults, O), a.extend(a.fn.tabs.methods, N), a.fn.extend({
        closeCurrentTab: function(a) {
            return this.each(function() {
                I(this, a);
            });
        }
    });
}(jQuery), function(a, b) {
    a.fn.form.extensions = {};
    var c = function(b, c) {
        var d = a.util.parseJquery(b);
        return d.serializeObject(c);
    }, d = function(b) {
        for (var c, d, c = b, e = c.elements, f = e.length, g = 0, h = 0; f > g; ++g, h = 0) switch (c = e[g], 
        c.type) {
          case "text":
          case "hidden":
          case "password":
          case "textarea":
            if (a(c).val() != a(c).attr("defaultValue") && a(c).hasClass("combo-value")) return !0;
            if (c.defaultValue != c.value && !a(c).hasClass("combo-text")) return !0;
            break;

          case "radio":
          case "checkbox":
            if (c.defaultChecked != c.checked) return !0;
            break;

          case "select-one":
            h = 1;

          case "select-multiple":
            for (d = c.options; h < d.length; ++h) if (d[h].defaultSelected != d[h].selected) return !0;
        }
        return !1;
    }, e = function(b, c) {
        function d(c) {
            for (var d in c) {
                var i = c[d], j = e(d, i);
                if (!j.length) {
                    var k = g.find('input[numberboxName="' + d + '"]');
                    k.length ? k.numberbox("setValue", i) : (a('input[name="' + d + '"]', g).val(i), 
                    a('textarea[name="' + d + '"]', g).val(i), a('select[name="' + d + '"]', g).val(i), 
                    a('span[name="' + d + '"]', g).text(i), a('label[name="' + d + '"]', g).text(i), 
                    a('div[name="' + d + '"]', g).text(i));
                }
                f(d, i);
            }
            h.onLoadSuccess.call(b, c), setTimeout(function() {
                g.form("validate");
            }, 100);
        }
        function e(b, c) {
            var d = g.find('input[name="' + b + '"][type=radio], input[name="' + b + '"][type=checkbox]');
            return d._propAttr("checked", !1), d.each(function() {
                var b = a(this);
                (b.val() == String(c) || a.inArray(b.val(), c) >= 0) && b._propAttr("checked", !0);
            }), d;
        }
        function f(b, c) {
            var d = a.fn.form.comboList, e = g.find('[comboName="' + b + '"]');
            if (e.length) for (var f = 0; f < d.length; f++) {
                var h = d[f];
                if (e.hasClass(h + "-f")) return void (e[h]("options").multiple ? e[h]("setValues", c) : e[h]("setValue", c));
            }
        }
        var g = a.util.parseJquery(b);
        a.data(b, "form") || a.data(b, "form", {
            options: a.extend({}, a.fn.form.defaults)
        });
        var h = a.data(b, "form").options;
        if ("string" == typeof c) {
            var i = {};
            if (0 == h.onBeforeLoad.call(b, i)) return;
            a.ajax({
                url: c,
                data: i,
                dataType: "json",
                success: function(a) {
                    d(a);
                },
                error: function() {
                    h.onLoadError.apply(b, arguments);
                }
            });
        } else d(c);
    }, f = a.fn.form.extensions.methods = {
        getData: function(a, b) {
            return c(a[0], b);
        },
        isChanged: function(a) {
            return d(a[0]);
        },
        load: function(a, b) {
            return a.each(function() {
                e(this, b);
            });
        }
    }, g = a.fn.form.extensions.defaults = {};
    a.extend(a.fn.form.defaults, g), a.extend(a.fn.form.methods, f), a.fn.form.comboList = [ "combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo" ];
}(jQuery), function(a, b) {
    function c(b) {
        var c = a.util.parseJquery(b), e = c.validatebox("options");
        e._initialized || (d(b, e.prompt, e), e.autoFocus && a.util.exec(function() {
            c.focus();
        }), e._initialized = !0);
    }
    function d(b, c, d) {
        var e = a.util.parseJquery(b);
        d = d || e.validatebox("options"), d.prompt = c, a.html5.testProp("placeholder", e[0].nodeName) ? e.attr("placeholder", c) : (a.isFunction(!d.promptFocus) || (d.promptFocus = function() {
            e.hasClass("validatebox-prompt") && (e.removeClass("validatebox-prompt"), e.val() == d.prompt && e.val(""));
        }, e.focus(d.promptFocus)), a.isFunction(!d.promptBlur) || (d.promptBlur = function() {
            a.string.isNullOrEmpty(e.val()) && e.addClass("validatebox-prompt").val(d.prompt);
        }, e.blur(d.promptBlur)), a.string.isNullOrEmpty(e.val()) && e.addClass("validatebox-prompt").val(d.prompt));
    }
    function e(b) {
        var c = a.util.parseJquery(b);
        return c.hasClass("validatebox-prompt") && c.removeClass("validatebox-prompt").val(""), 
        g.call(c, c);
    }
    a.fn.validatebox.extensions = {};
    var f = {
        engNum: {
            validator: function(a) {
                return /^[0-9a-zA-Z]*$/.test(a);
            },
            message: "请输入英文字母或数字"
        },
        chsEngNum: {
            validator: function(a, b) {
                return /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/.test(a);
            },
            message: "只允许汉字、英文字母或数字。"
        },
        code: {
            validator: function(a, b) {
                return /^[\u0391-\uFFE5\w]+$/.test(a);
            },
            message: "只允许汉字、英文字母、数字及下划线."
        },
        name: {
            validator: function(a) {
                return a.isUserName();
            },
            message: "用户名不合法(字母开头，允许6-16字节，允许字母数字下划线)"
        },
        minLength: {
            validator: function(a, b) {
                return f.length.validator(a, [ b[0] ]);
            },
            message: "最少输入 {0} 个字符."
        },
        maxLength: {
            validator: function(a, b) {
                return f.length.validator(a, [ 0, b[0] ]);
            },
            message: "最多输入 {0} 个字符."
        },
        length: {
            validator: function(b, c) {
                var d = a.trim(b).length, e = c[0], f = c[1];
                return (!e || d >= e) && (!f || f >= d);
            },
            message: "输入内容长度必须介于 {0} 和 {1} 个字符数之间."
        },
        contains: {
            validator: function(b, c) {
                return a.string.contains(b, c[0]);
            },
            message: "输入的内容必须包含 {0}."
        },
        startsWith: {
            validator: function(b, c) {
                return a.string.startsWith(b, c[0]);
            },
            message: "输入的内容必须以 {0} 作为起始字符."
        },
        endsWith: {
            validator: function(b, c) {
                return a.string.endsWith(b, c[0]);
            },
            message: "输入的内容必须以 {0} 作为起始字符."
        },
        longDate: {
            validator: function(b) {
                return a.string.isLongDate(b);
            },
            message: "输入的内容必须是长日期时间(yyyy-MM-dd hh:mm:ss)格式."
        },
        shortDate: {
            validator: function(b) {
                return a.string.isShortDate(b);
            },
            message: "输入的内容必须是短日期(yyyy-MM-dd)格式."
        },
        date: {
            validator: function(b) {
                return a.string.isDate(b);
            },
            message: "输入的内容必须是长日期时间(yyyy-MM-dd hh:mm:ss)或短日期(yyyy-MM-dd)格式."
        },
        tel: {
            validator: function(b) {
                return a.string.isTel(b);
            },
            message: "输入的内容必须是电话号码(中国)格式."
        },
        mobile: {
            validator: function(b) {
                return a.string.isMobile(b);
            },
            message: "输入的内容必须是移动电话号码(中国)格式."
        },
        telOrMobile: {
            validator: function(b) {
                return a.string.isTelOrMobile(b);
            },
            message: "输入的内容必须是电话号码(中国)或移动电话号码(中国)格式."
        },
        fax: {
            validator: function(b) {
                return a.string.isFax(b);
            },
            message: "输入的内容必须是传真号码(中国)格式."
        },
        email: {
            validator: function(b) {
                return a.string.isEmail(b);
            },
            message: "输入的内容必须是电子邮箱(Email)地址格式."
        },
        zipCode: {
            validator: function(b) {
                return a.string.isZipCode(b);
            },
            message: "输入的内容必须是邮政编码(中国)格式."
        },
        existChinese: {
            validator: function(b) {
                return a.string.existChinese(b);
            },
            message: "输入的内容必须是包含中文汉字."
        },
        chinese: {
            validator: function(b) {
                return a.string.isChinese(b);
            },
            message: "输入的内容必须是纯中文汉字."
        },
        english: {
            validator: function(b) {
                return a.string.isEnglish(b);
            },
            message: "输入的内容必须是纯英文字母."
        },
        fileName: {
            validator: function(b) {
                return a.string.isFileName(b);
            },
            message: '输入的内容必须是合法的文件名(不能包含字符 \\/:*?"<>|).'
        },
        ipv4: {
            validator: function(b) {
                return a.string.isIPv4(b);
            },
            message: "输入的内容必须是正确的 IP地址v4 格式."
        },
        url: {
            validator: function(b) {
                return a.string.isUrl(b);
            },
            message: "输入的内容必须是正确的 url 格式."
        },
        ipv4url: {
            validator: function(b) {
                return a.string.isUrlOrIPv4(b);
            },
            message: "输入的内容必须是正确的 IP地址v4 或 url 格式."
        },
        currency: {
            validator: function(b) {
                return a.string.isCurrency(b);
            },
            message: "输入的内容必须是正确的货币金额(阿拉伯数字表示法)格式."
        },
        qq: {
            validator: function(b) {
                return a.string.isQQ(b);
            },
            message: "输入的内容必须是正确 QQ 号码格式."
        },
        msn: {
            validator: function(b) {
                return a.string.isMSN(b);
            },
            message: "输入的内容必须是正确 MSN 账户名格式."
        },
        unNormal: {
            validator: function(b) {
                return a.string.isUnNormal(b);
            },
            message: "输入的内容必须是不包含空格和非法字符Z."
        },
        carNo: {
            validator: function(b) {
                return a.string.isCarNo(b);
            },
            message: "输入的内容必须是合法的汽车车牌号码格式."
        },
        carEngineNo: {
            validator: function(b) {
                return a.string.isCarEngineNo(b);
            },
            message: "输入的内容必须是合法的汽车发动机序列号格式."
        },
        idCard: {
            validator: function(b) {
                return a.string.isIDCard(b);
            },
            message: "输入的内容必须是合法的身份证号码(中国)格式."
        },
        integer: {
            validator: function(b) {
                return a.string.isInteger(b);
            },
            message: "输入的内容必须是合法的整数格式."
        },
        integerRange: {
            validator: function(b, c) {
                return a.string.isInteger(b) && c[0] && b >= c[0] && c[1] && b <= c[1];
            },
            message: "输入的内容必须是合法的整数格式且值介于 {0} 与 {1} 之间."
        },
        numeric: {
            validator: function(c, d) {
                return a.string.isNumeric(c, d ? d[0] : b);
            },
            message: "输入的内容必须是指定类型的数字格式."
        },
        numericRange: {
            validator: function(c, d) {
                return a.string.isNumeric(c, d ? d[2] : b) && d[0] && c >= d[0] && d[1] && c <= d[1];
            },
            message: "输入的内容必须是指定类型的数字格式且介于 {0} 与 {1} 之间."
        },
        color: {
            validator: function(b) {
                return a.string.isColor(b);
            },
            message: "输入的内容必须是正确的 颜色(#FFFFFF形式) 格式."
        },
        password: {
            validator: function(b) {
                return a.string.isSafePassword(b);
            },
            message: "输入的内容必须是安全的密码字符(由字符和数字组成，至少 6 位)格式."
        },
        equals: {
            validator: function(b, c) {
                var d = c[0], e = c[1];
                if (e) switch (String(e).toLowerCase()) {
                  case "jquery":
                  case "dom":
                    d = a.util.parseJquery(d).val();
                    break;

                  case "id":
                    d = a.util.parseJquery("#" + d).val();
                    break;

                  case "string":                }
                return b === d;
            },
            message: "输入的内容不匹配."
        }
    };
    a.extend(a.fn.validatebox.defaults.rules, f);
    var g = a.fn.validatebox.methods.isValid, h = a.fn.validatebox;
    a.fn.validatebox = function(b, d) {
        return "string" == typeof b ? h.apply(this, arguments) : (b = b || {}, this.each(function() {
            var d = a.util.parseJquery(this), e = a.extend({}, a.fn.validatebox.parseOptions(this), b);
            h.call(d, e), c(this);
        }));
    }, a.union(a.fn.validatebox, h);
    var i = a.fn.validatebox.extensions.methods = {
        setPrompt: function(a, b) {
            return a.each(function() {
                d(this, b);
            });
        },
        validate: function(a) {
            return a.each(function() {
                e(this);
            });
        },
        isValid: function(a) {
            return e(a[0]);
        }
    }, j = a.fn.validatebox.extensions.defaults = {
        prompt: null,
        autoFocus: !1
    };
    a.extend(a.fn.validatebox.defaults, j), a.extend(a.fn.validatebox.methods, i);
    var k = ".validatebox-prompt{ color: #ccc; }";
    a.util.addCss(k);
    var l = a.fn.val;
    a.fn.val = function(b) {
        var c, d;
        if (this.length > 0 && this.is(".validatebox-text.validatebox-prompt") && !a.html5.testProp("placeholder", this[0].nodeName)) {
            if (d = this.validatebox("options"), 0 == arguments.length) return c = l.apply(this, arguments), 
            c == d.prompt ? "" : c;
            b && b != d.prompt && this.removeClass("validatebox-prompt");
        }
        return l.apply(this, arguments);
    };
}(jQuery), function(a, b) {
    function c(b, c) {
        var d = a.util.parseJquery(b), e = a.data(b, "combo"), f = e.combo, g = f.find("span.combo-arrow").removeAttr("class").addClass("combo-arrow");
        c && g.addClass(c), d.combo("options").iconCls = c;
    }
    function d(b, c) {
        var d = a.util.parseJquery(b), e = d.combo("options"), f = d.combo("textbox");
        e.required = f.validatebox("options").required = c;
    }
    function e(b) {
        var c = a(b), d = c.combo("options");
        a.isFunction(d.onBeforeDestroy) && 0 == d.onBeforeDestroy.call(b) || (i.call(b, c), 
        a.isFunction(d.onDestroy) && d.onDestroy.call(b));
    }
    function f(b) {
        return a.data(b, "combo").combo;
    }
    function g(b) {
        var c = a.util.parseJquery(b);
        c.combo("readonly", !0);
        var d = c.combo("textbox");
        d.unbind().addClass("readonly");
    }
    function h(b) {
        var c = a.util.parseJquery(b), d = a.data(b, "combo"), e = c.combo("options"), f = d.panel, g = d.combo, h = g.find(".combo-arrow"), i = e.extensions ? e.extensions : e.extensions = {};
        if (!i._initialized) {
            {
                c.combo("textbox");
            }
            h.unbind("click.combo").bind("click.combo", function() {
                f.is(":visible") ? c.combo("hidePanel") : (a("div.combo-panel:visible").panel("close"), 
                1 != c.is(":disabled") && (c.combo("showPanel"), c.combo("textbox").focus()));
            }), e.iconCls && c.combo("setIcon", e.iconCls), e.readonlyText && c.combo("readonlyText"), 
            a.util.browser.msie && g._outerWidth() != e.width && a.util.exec(function() {
                c.combo("resize", e.width);
            }), i._initialized = !0;
        }
    }
    a.fn.combo.extensions = {};
    var i = a.fn.combo.methods.destroy, j = a.fn.combo;
    a.fn.combo = function(a, b) {
        return "string" == typeof a ? j.apply(this, arguments) : j.apply(this, arguments).each(function() {
            h(this);
        });
    }, a.union(a.fn.combo, j);
    var k = a.fn.combo.extensions.defaults = {
        iconCls: null,
        readonlyText: !1,
        onBeforeDestroy: function() {},
        onDestroy: function() {}
    }, l = a.fn.combo.extensions.methods = {
        setIcon: function(a, b) {
            return a.each(function() {
                c(this, b);
            });
        },
        setRequired: function(a, b) {
            return a.each(function() {
                d(this, b);
            });
        },
        destroy: function(a) {
            return a.each(function() {
                e(this);
            });
        },
        combo: function(a) {
            return f(a[0]);
        },
        readonlyText: function(a) {
            return a.each(function() {
                g(this);
            });
        }
    };
    a.extend(a.fn.combo.defaults, k), a.extend(a.fn.combo.methods, l);
}(jQuery), function(a, b) {
    a.fn.searchbar = function(b, c) {
        var d = this;
        return "string" == typeof b ? (c = c instanceof Array ? c : [].slice.call(arguments, 1), 
        a.fn.searchbar.methods[b].apply(d[0], c)) : (b = b || {}, d.each(function() {
            var c = a.data(this, "searchbar");
            if (c) a.extend(c.options, b); else {
                c = a.data(this, "searchbar", {
                    options: a.extend(!0, {}, a.fn.searchbar.defaults, b, {
                        data: []
                    })
                });
                {
                    c.options;
                }
                a(this).searchbar("bindEvents");
            }
        }));
    }, a.fn.searchbar.methods = {
        options: function() {
            var b = a.data(this, "searchbar").options;
            return a.extend({}, b);
        },
        loadAccordionData: function(b) {
            var c = a(this);
            a.data(this).searchbar || c.searchbar();
            var d = c.searchbar("options"), e = d.data;
            c.searchbar("bindEvents", "oneFocusLoad", function() {
                var d = a(b).find(".accordion"), f = d.accordion("panels");
                a.each(f, function(a, b) {
                    var d = this, e = (d.panel("options"), d.find(".tree"));
                    e.length > 0 && c.searchbar("loadTreeData", e[0], a);
                }), c.combobox("loadData", e);
            }), d.selectTabs && c.searchbar("bindEvents", "onSelect", function(c) {
                var d = c.index + "", e = d.split("&"), d = e[0].split("_"), f = e[1], g = a(b).find(".accordion"), h = g.accordion("options"), i = g.accordion("panels"), j = i[+d[0]];
                if (j.panel("expand", h.animate), f) {
                    var k = j.find(".tree"), l = k.tree("find", +f), h = k.tree("options");
                    k.tree("expandAll"), k.tree("select", l.target), a(this).textbox("options").keyHandler.enter = function(b) {
                        l.attributes.url && (h.onClick(l), a(this).combo("hidePanel"), a(this).combo("textbox").blur());
                    }, "click" == this.event.type && l.attributes.url && h.onClick(l);
                } else a(this).textbox("options").keyHandler.enter = function(a) {};
            });
        },
        loadTreeData: function(b, c) {
            function d(b, e) {
                a.each(b, function(a, b) {
                    c = e + "_" + a, b.children && 0 != b.children.length || h.push({
                        index: c + "&" + b.id,
                        text: b.text
                    }), b.children && b.children.length > 0 && d(b.children, c);
                });
            }
            var e = a(b), f = e.tree("getRoots"), g = a(this).searchbar("options"), h = g.data;
            f.length > 0 && d(f, c);
        },
        writeData: function() {
            var b = arguments[0], c = arguments[1], d = a(this).searchbar("options");
            d[b] && (d[b] = c);
        },
        readData: function() {
            var b = arguments[0], c = a(this).searchbar("options"), d = c[b] ? c[b] : c.data;
            return d;
        },
        bindEvents: function() {
            var b = a(this).searchbar("options"), c = arguments[0], d = arguments[1];
            if (c && d && (b.inputEvents[c] = d), c && a(this).searchbar(c), !c && !d) for (var e in b.inputEvents) a(this).searchbar(e);
        },
        oneFocusLoad: function() {
            var b = a(this).searchbar("options");
            a(this).combo("textbox").one("focus", b.inputEvents.oneFocusLoad);
        },
        onSelect: function() {
            var b = a(this).searchbar("options"), c = a(this).combobox("options");
            b.selectTabs && (c.onSelect = b.inputEvents.onSelect);
        }
    }, a.fn.searchbar.defaults = {
        inputEvents: {
            oneFocusLoad: function() {},
            onSelect: function(a) {
                var b = a.index, b = b.split("_");
            }
        },
        selectTabs: !0
    };
}(jQuery), function(a, b) {
    function c(b, d, e) {
        return a.array.map(d, function(d, f) {
            if (!d || a.util.isString(d)) return d;
            var g = a.extend({}, d);
            return g.id = a.isFunction(d.id) ? d.id.call(g, b, e) : d.id, g.text = a.isFunction(d.text) ? d.text.call(g, b, e) : d.text, 
            g.iconCls = a.isFunction(d.iconCls) ? d.iconCls.call(g, b, e) : d.iconCls, g.disabled = a.isFunction(d.disabled) ? d.disabled.call(g, b, e) : d.disabled, 
            g.hideOnClick = a.isFunction(d.hideOnClick) ? d.hideOnClick.call(g, b, e) : d.hideOnClick, 
            g.onclick = a.isFunction(d.onclick) ? function(a, b, c) {
                d.onclick.call(this, a, e, b, c);
            } : d.onclick, g.handler = a.isFunction(d.handler) ? function(a, b, c) {
                d.handler.call(this, a, e, b, c);
            } : d.handler, g.children && g.children.length && (g.children = c(b, g.children, e)), 
            g;
        });
    }
    a.fn.window.extensions = {};
    var d = function(b) {
        var d = a.util.parseJquery(b), e = a.data(b, "window"), f = d.window("options");
        if (f._initialized || (d.window("header").on({
            dblclick: function() {
                var a = d.window("options");
                a.autoRestore && (a.maximized ? d.window("restore") : a.maximizable && d.window("maximize"));
            },
            contextmenu: function(b) {
                var e = d.window("options");
                if (e.enableHeaderContextMenu) {
                    b.preventDefault();
                    var f = [ {
                        text: "最大化",
                        iconCls: "panel-tool-max",
                        disabled: !e.maximized && e.maximizable ? !1 : !0,
                        onclick: function() {
                            d.window("maximize");
                        }
                    }, {
                        text: "恢复",
                        iconCls: "panel-tool-restore",
                        disabled: e.maximized ? !1 : !0,
                        onclick: function() {
                            d.window("restore");
                        }
                    }, "-", {
                        text: "关闭",
                        iconCls: "panel-tool-close",
                        disabled: !e.closable,
                        onclick: function() {
                            d.window("close");
                        }
                    } ], g = a.array.likeArray(e.headerContextMenu) ? e.headerContextMenu : [];
                    g.length && a.array.insertRange(f, 0, a.util.merge([], g, "-")), f = c(b, f, d), 
                    a.easyui.showMenu({
                        items: f,
                        left: b.pageX,
                        top: b.pageY
                    });
                }
            }
        }), f._initialized = !0), f.draggable) {
            var g = e.window.draggable("options"), h = g.onStartDrag, i = g.onStopDrag;
            g.onStartDrag = function() {
                h.apply(this, arguments), d.window("body").addClass("window-body-hidden").children().addClass("window-body-hidden-proxy");
            }, g.onStopDrag = function() {
                i.apply(this, arguments), d.window("body").removeClass("window-body-hidden").children().removeClass("window-body-hidden-proxy");
            };
        }
    }, e = a.fn.window;
    a.fn.window = function(b, c) {
        return "string" == typeof b ? e.apply(this, arguments) : (b = b || {}, this.each(function() {
            var c = a.util.parseJquery(this);
            e.call(c, b), d(this);
        }));
    }, a.union(a.fn.window, e);
    var f = a.fn.window.extensions.methods = {}, g = a.fn.window.extensions.defaults = a.extend({}, {
        autoHCenter: !0,
        autoVCenter: !0,
        autoCloseOnEsc: !0,
        autoRestore: !0,
        enableHeaderContextMenu: !1,
        headerContextMenu: null
    });
    a.extend(a.fn.window.defaults, g), a.extend(a.fn.window.methods, f), a(function() {
        a(window).resize(function() {
            a(".panel-body.window-body").each(function() {
                var b = a(this), c = b.window("options");
                if (c && c.draggable) if (c.autoHCenter || c.autoVCenter) {
                    var d = c.autoHCenter && c.autoVCenter ? "center" : c.autoHCenter ? "hcenter" : "vcenter";
                    b.window(d);
                } else c.inContainer && b.window("move");
            });
        }), a(document).keydown(function(b) {
            27 == b.which && a("div.window-mask:last").prevAll("div.panel.window:first").children(".panel-body.window-body").each(function() {
                var b = a(this), c = b.window("options");
                c && c.closable && c.autoCloseOnEsc && !b.window("header").find(".panel-tool a").attr("disabled") && a.util.exec(function() {
                    b.window("close");
                });
            });
        });
    });
    var h = ".window-panel-proxy { filter: alpha(opacity=80); opacity: 0.8; }";
    a.util.addCss(h);
}(jQuery), function(a, b) {
    function c(b, c, f) {
        f = f || (c._extensionsDatagrid ? c._extensionsDatagrid : c._extensionsDatagrid = {}), 
        Na(b, f);
        var g = b.datagrid("getData"), h = f.oldData;
        if (g != h && (f.filterData = []), d(b, c), c.columnFilter) {
            f.oldData = g;
            var i = b.datagrid("getPanel").find("div.datagrid-view div.datagrid-header"), k = i.find("table.datagrid-htable tr.datagrid-header-row"), l = k.find("td[field]").filter(function() {
                var b = a(this), c = b.attr("colspan");
                return c && "1" != c || b.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? !1 : !0;
            }), m = c.columnFilter = a.extend({
                panelHeight: 100,
                position: "top"
            }, c.columnFilter), n = a.array.contains([ "top", "bottom" ], m.position) ? m.position : "top", o = (m.panelHeight = a.isNumeric(m.panelHeight) && m.panelHeight >= 60 ? m.panelHeight : 60, 
            i.height(), b.datagrid("getRows"));
            l.each(function() {
                var d = a(this).addClass("datagrid-header-filter").removeClass("datagrid-header-filter-top datagrid-header-filter-bottom"), g = (d.find("div.datagrid-cell").addClass("datagrid-header-filter-cell"), 
                d.attr("field")), h = b.datagrid("getColumnOption", g), i = h.width, j = (a("<hr />").addClass("datagrid-header-filter-line")["top" == n ? "prependTo" : "appendTo"](this), 
                a("<div></div>").attr("field", g).addClass("datagrid-header-filter-container").css({
                    height: m.panelHeight,
                    width: i
                })["top" == n ? "prependTo" : "appendTo"](this));
                d.addClass("top" == n ? "datagrid-header-filter-top" : "datagrid-header-filter-bottom"), 
                g && e(b, c, f, j, h, o, l);
            }), f.filterData && f.filterData.length ? b.datagrid("hideRows", f.filterData) : j(b, c, f, o, l);
        }
    }
    function d(b, c) {
        if (c.columnFilter) {
            var d = b.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function() {
                var b = a(this), c = b.attr("colspan");
                return c && "1" != c || b.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? !1 : !0;
            });
            d.removeClass("datagrid-header-filter datagrid-header-filter-top datagrid-header-filter-bottom").find("div.datagrid-cell").removeClass("datagrid-header-filter-cell"), 
            d.find("hr.datagrid-header-filter-line,div.datagrid-header-filter-container").remove();
            var e = b.datagrid("getColumnFields", "all");
            b.datagrid("fixColumnSize", e[e.length - 1]);
        }
    }
    function e(b, c, d, e, i, j, k) {
        if (i.filterable) {
            var l = i.field, m = b.datagrid("getDistinctColumnData", l), n = a.array.contains([ "checkbox", "livebox", "caps", "lower", "none" ], i.filter) ? i.filter : "checkbox", o = i.precision, p = i.step;
            switch (n) {
              case "checkbox":
                f(b, d, e, l, j, m);
                break;

              case "livebox":
                g(b, e, l, j);
                break;

              case "caps":
                h(b, e, l, p, o, j, m, "<=", c.columnFilter.panelHeight, k);
                break;

              case "lower":
                h(b, e, l, p, o, j, m, ">=", c.columnFilter.panelHeight, k);
                break;

              case "none":            }
        }
    }
    function f(b, c, d, e, f, g) {
        a.each(g, function(g, h) {
            var i = a("<div></div>").addClass("datagrid-header-filter-item").attr("text", h).appendTo(d), j = (a("<div></div>").addClass("datagrid-header-filter-item-text").text(h).appendTo(i), 
            a("<div></div>").addClass("datagrid-header-filter-item-icon").appendTo(i), function() {
                var d = a.array.filter(f, function(a) {
                    return a[e] == h;
                }), g = a.array.filter(c.filterData, function(a) {
                    return a[e] == h;
                });
                b.datagrid(g.length ? "showRows" : "hideRows", d);
            });
            i.click(j);
        });
    }
    function g(b, c, d, e) {
        a("<div></div>").addClass("datagrid-header-filter-livebox-text").text("模糊过滤：").appendTo(c);
        var f = a("<input />").addClass("datagrid-header-filter-livebox").appendTo(c), g = a("<a />").linkbutton({
            plain: !0,
            iconCls: "icon-search"
        }).appendTo(c).click(function() {
            b.datagrid("showRows", !0);
            var c = f.val();
            if (a.string.isNullOrEmpty(c)) return void f.focus();
            var g = a.array.filter(e, function(a) {
                return -1 == String(a[d]).indexOf(c);
            });
            b.datagrid("hideRows", g), f.focus();
        });
        a("<a />").linkbutton({
            plain: !0,
            iconCls: "icon-undo"
        }).appendTo(c).click(function() {
            var a = f.val();
            a ? (f.val("").focus(), g.click()) : f.focus();
        }), f.keypress(function(a) {
            13 == a.which && g.click();
        });
    }
    function h(b, c, d, e, f, g, h, j, k, l) {
        var m = a.array.map(h, function(b) {
            return b = parseFloat(b), a.isNumeric(b) ? b : 0;
        }), n = m.length ? a.array.min(m) : 0, o = m.length ? a.array.max(m) : 0, p = m.length ? a.array.max(m, function(b, c) {
            return a.util.compare(a.number.precision(b), a.number.precision(c));
        }) : 0, q = m.length ? a.number.precision(p) : 0, r = k - 45, s = a("<div></div>").addClass("datagrid-header-filter-itemwrap").text(j).appendTo(c), t = a("<div></div>").addClass("datagrid-header-filter-sliderwrap").css({
            height: r + 10
        })["<=" == j ? "appendTo" : "prependTo"](c), u = a("<input />").addClass("datagrid-header-filter-numeric").appendTo(s), v = a("<input />").addClass("datagrid-header-filter-slider").appendTo(t), w = function(a, c) {
            i(b, d, g, a, j, u, v, l);
        };
        u.numberbox({
            value: "<=" == j ? o : n,
            min: n,
            max: o,
            precision: f,
            onChange: w
        }), u.keypress(function(b) {
            if (13 == b.which) {
                var c = u.val();
                u.numberbox("setValue", a.isNumeric(c) ? c : 0);
            }
        }), v.slider({
            height: r,
            mode: "v",
            showTip: !0,
            value: "<=" == j ? o : n,
            min: n,
            max: o,
            rule: [ n, "|", o ],
            step: e,
            onSlideEnd: w,
            tipFormatter: function(b) {
                return a.number.round(b || 0, q);
            }
        });
    }
    function i(b, c, d, e, f, g, h, i) {
        var j = i || b.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function() {
            var b = a(this), c = b.attr("colspan");
            return c && "1" != c || b.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? !1 : !0;
        }), k = j.filter(function() {
            return a(this).attr("field") == c;
        });
        g = g ? g : k.find(".datagrid-header-filter-numeric"), h = h ? h : k.find(".datagrid-header-filter-slider");
        var l = a.array.filter(d, function(b) {
            return b = parseFloat(b[c]), b = a.isNumeric(b) ? b : 0, ">=" == f ? e > b : b > e;
        });
        b.datagrid("showRows", !0).datagrid("hideRows", l), g.numberbox("setValue", e), 
        h.slider("setValue", e);
    }
    function j(b, c, d, e, f) {
        c.columnFilter && (f = f || b.datagrid("getPanel").find("div.datagrid-view div.datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function() {
            var b = a(this), c = b.attr("colspan");
            return c && "1" != c || b.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? !1 : !0;
        }), f.each(function() {
            var c = a(this), f = c.attr("field");
            k(b, d, e, c, f);
        }));
    }
    function k(b, c, d, e, f) {
        var g = g = b.datagrid("getColumnOption", f), h = (g.precision, a.array.contains([ "checkbox", "livebox", "caps", "lower", "none" ], g.filter) ? g.filter : "checkbox");
        switch (h) {
          case "checkbox":
            l(b, c, d, e, f);
            break;

          case "livebox":
            n(b, c, d, e, f);
            break;

          case "caps":
            o(b, c, d, e, f);
            break;

          case "lower":
            p(b, c, d, e, f);
            break;

          case "none":        }
    }
    function l(b, c, d, e, f) {
        e.find("div.datagrid-header-filter-item").each(function() {
            var b = a(this), e = b.attr("text"), g = b.find("div.datagrid-header-filter-item-icon"), h = a.array.sum(d, function(a) {
                return a[f] == e ? 1 : 0;
            }), i = a.array.sum(c.filterData, function(a) {
                return a[f] == e ? 1 : 0;
            }), j = 0 == i ? "tree-checkbox1" : i >= h ? "tree-checkbox0" : "tree-checkbox2";
            a.easyui.tooltip.init(b, {
                content: (a.string.isNullOrEmpty(e) ? "空白" : e) + ": 共" + h + "个元素"
            }), m(g, j);
        });
    }
    function m(a, b) {
        a.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2").addClass(b);
    }
    function n(a, b, c, d, e) {}
    function o(a, b, c, d, e) {}
    function p(a, b, c, d, e) {}
    function q(b, c, d) {
        d.onHeaderContextMenuBak = c.onHeaderContextMenu, c.onHeaderContextMenu = function(e, f) {
            if (a.isFunction(d.onHeaderContextMenuBak) && d.onHeaderContextMenuBak.apply(this, arguments), 
            c.enableHeaderContextMenu) {
                var g = a.fn.datagrid.extensions.parseContextMenuEventData(b, c, e), h = w(b, c, d, e, f, g);
                a.easyui.showMenu({
                    items: h,
                    left: e.pageX,
                    top: e.pageY,
                    hideDisabledMenu: c.hideDisabledMenu
                }), e.preventDefault();
            }
        };
    }
    function r(b, c, d) {
        d.onRowContextMenuBak = c.onRowContextMenu, c.onRowContextMenu = function(e, f, g) {
            if (a.isFunction(d.onRowContextMenuBak) && d.onRowContextMenuBak.apply(this, arguments), 
            c.selectOnRowContextMenu && b.datagrid("selectRow", f), c.enableRowContextMenu) {
                var h = a.fn.datagrid.extensions.parseContextMenuEventData(b, c, e), i = x(b, c, d, e, f, g, h);
                c.autoBindDblClickRow && c.dblClickRowMenuIndex >= 0 && a.util.likeArray(c.rowContextMenu) && !a.util.isString(c.rowContextMenu) && c.rowContextMenu.length > c.dblClickRowMenuIndex && (i[c.dblClickRowMenuIndex].bold = !0), 
                a.easyui.showMenu({
                    items: i,
                    left: e.pageX,
                    top: e.pageY,
                    hideDisabledMenu: c.hideDisabledMenu
                }), e.preventDefault();
            }
        };
    }
    function s(b, c, d) {
        c.enableHeaderClickMenu && b.datagrid("getPanel").find(".datagrid-view .datagrid-header table.datagrid-htable tr.datagrid-header-row td[field]").filter(function() {
            var b = a(this), c = b.attr("colspan");
            return c && "1" != c || b.find("div.datagrid-header-check,div.datagrid-header-rownumber").length ? !1 : !0;
        }).find("div.datagrid-cell").each(function() {
            t(b, c, d, this);
        });
    }
    function t(b, c, d, e) {
        e = a.util.parseJquery(e), e.off(".hoverArrow");
        var f = a("<span class='s-btn-downarrow datagrid-header-cell-arrow datagrid-header-cell-arrow-fix'>&nbsp;</span>").click(function(e) {
            var g = a(this), h = g.offset(), i = g.outerHeight(), j = g.parent().parent().attr("field"), k = a.fn.datagrid.extensions.parseContextMenuEventData(b, c, e), l = w(b, c, d, e, j, k), m = a.easyui.showMenu({
                items: l,
                left: h.left,
                top: h.top + i
            }), n = m.menu("options"), o = n.onHide;
            return f.hidable = !1, n.onHide = function() {
                f.hidable = !0, f.removeClass("datagrid-header-cell-arrow-show"), o.apply(this, arguments);
            }, !1;
        }).prependTo(e);
        e.on({
            "mouseenter.hoverArrow": function() {
                f.addClass("datagrid-header-cell-arrow-show");
            },
            "mouseleave.hoverArrow": function() {
                (!a.util.isBoolean(f.hidable) || f.hidable) && f.removeClass("datagrid-header-cell-arrow-show");
            }
        });
    }
    function u(b, c, d) {
        d.onDblClickRowBak = c.onDblClickRow, c.onDblClickRow = function(e, f) {
            a.isFunction(d.onDblClickRowBak) && d.onDblClickRowBak.apply(this, arguments);
            var g = a.fn.datagrid.extensions.parseContextMenuEventData(b, c, null);
            if (items = x(b, c, d, null, e, f, g), c.autoBindDblClickRow && c.dblClickRowMenuIndex >= 0 && a.util.likeArray(c.rowContextMenu) && !a.util.isString(c.rowContextMenu) && c.rowContextMenu.length > c.dblClickRowMenuIndex) {
                var h = items[c.dblClickRowMenuIndex], i = h.handler || h.onclick;
                return i(null, e, f, g, b, h, null);
            }
            c.autoEditing && b.datagrid("beginEdit", e);
        };
    }
    function v(a, b, c) {
        var d = a.datagrid("getPanel");
        d.keyboard(b.keyboard);
    }
    function w(b, c, d, e, f, g) {
        var h = [], i = a.util.likeArray(c.headerContextMenu) && !a.util.isString(c.headerContextMenu) ? c.headerContextMenu : [];
        i.length && a.array.merge(h, i);
        var j = y(b, c, d, e, f, g);
        return j.length && a.array.merge(h, "-", j), h = a.fn.datagrid.extensions.parseHeaderContextMenuMap(e, f, g, h, b), 
        "-" == h[0] && a.array.removeAt(h, 0), h;
    }
    function x(b, c, d, e, f, g, h) {
        var i = [], j = a.util.likeArray(c.rowContextMenu) && !a.util.isString(c.rowContextMenu) ? c.rowContextMenu : [];
        j.length && a.array.merge(i, j);
        var k = B(b, c, d, e, f, g, h);
        return k.length && a.array.merge(i, "-", k), i = a.fn.datagrid.extensions.parseRowContextMenuMap(e, f, g, h, i, b), 
        "-" == i[0] && a.array.removeAt(i, 0), i;
    }
    function y(b, c, d, e, f, g) {
        var h = [], i = c.exportMenu, j = b.datagrid("getColumnOption", f), k = b.datagrid("getColumnOption", f).sortable;
        "object" == typeof i && (i = a.extend({
            current: !1,
            all: !1,
            submenu: !0
        }, i));
        var l = {
            text: "升序",
            iconCls: "icon-standard-hmenu-asc",
            disabled: 1 != k,
            handler: function() {
                return b.datagrid("sort", {
                    sortName: f,
                    sortOrder: "asc"
                });
            }
        }, m = {
            text: "降序",
            iconCls: "icon-standard-hmenu-desc",
            disabled: 1 != k,
            handler: function() {
                return b.datagrid("sort", {
                    sortName: f,
                    sortOrder: "desc"
                });
            }
        }, n = {
            text: "显示/隐藏列",
            iconCls: "icon-standard-application-view-columns",
            disabled: !1,
            children: [ {
                text: "显示全部列",
                iconCls: function() {
                    var b = d.fields ? d.fields.length : 0, c = a.array.sum(d.fieldOptions, function(a) {
                        return a.hidden ? 0 : 1;
                    });
                    return c >= b ? "tree-checkbox1" : 0 == c ? "tree-checkbox0" : "tree-checkbox2";
                },
                hideOnClick: !1,
                handler: function(b, c, e, f, g, h) {
                    a.each(d.fields, function() {
                        f.datagrid("showColumn", this);
                    }), a(this).parent().children("div.menu-item:not(:eq(1))").each(function() {
                        h.menu("setIcon", {
                            target: this,
                            iconCls: "tree-checkbox1"
                        }), h.menu("enableItem", this);
                    });
                }
            }, {
                text: "还原默认",
                iconCls: "icon-standard-application-view-tile",
                hideOnClick: !1,
                handler: function(b, c, e, f, g, h) {
                    a.each(d.fieldOptionsBackup, function() {
                        f.datagrid(1 == this.hidden ? "hideColumn" : "showColumn", this.field);
                    });
                    var i = a(this).parent();
                    i.children("div.menu-item:gt(1)").each(function() {
                        var b = a(this).text(), c = a.array.first(d.fieldOptions, function(a) {
                            return a.title == b;
                        });
                        c && h.menu("setIcon", {
                            target: this,
                            iconCls: c.hidden ? "tree-checkbox0" : "tree-checkbox1"
                        }), h.menu("enableItem", this);
                    }), i.children("div.menu-item:first").each(function() {
                        var b = d.fields ? d.fields.length : 0, c = a.array.sum(d.fieldOptions, function(a) {
                            return a.hidden ? 0 : 1;
                        });
                        h.menu("setIcon", {
                            target: this,
                            iconCls: c >= b ? "tree-checkbox1" : 0 == c ? "tree-checkbox0" : "tree-checkbox2"
                        });
                    });
                }
            }, "-" ]
        }, o = {
            text: "过滤/显示",
            iconCls: "icon-standard-application-view-list",
            disabled: !j.filterable,
            children: []
        }, p = {
            text: "导出当前页",
            iconCls: "icon-standard-page-white-put",
            disabled: !(1 == i || 1 == i.current),
            handler: function() {
                return b.datagrid("exportExcel", !1);
            }
        }, q = {
            text: "导出全部",
            iconCls: "icon-standard-page-white-stack",
            disabled: !(1 == i || 1 == i.all),
            handler: function() {
                return b.datagrid("exportExcel", !0);
            }
        };
        a.util.merge(n.children, z(b, c, d, e, f, g)), j.filterable && a.util.merge(o.children, A(b, c, d, e, f, g)), 
        a.util.merge(h, [ l, m, "-", n, o ]);
        var r = [ p, q ];
        return i && a.array.merge(h, "-", "object" != typeof i || i.submenu ? {
            text: "导出数据",
            iconCls: "icon-standard-page-save",
            children: r
        } : r), h;
    }
    function z(b, c, d, e, f, g) {
        return a.array.map(d.fieldOptions, function(b) {
            var c = function(c, e, f, g, h, i) {
                var j = a.util.parseJquery(this), k = j.parent().find(".menu-item:gt(1) .tree-checkbox1").length;
                if ((1 != k || b.hidden) && b.hidable) {
                    g.datagrid(b.hidden ? "showColumn" : "hideColumn", b.field), i.menu("setIcon", {
                        target: this,
                        iconCls: b.hidden ? "tree-checkbox0" : "tree-checkbox1"
                    }), k = a.array.sum(d.fieldOptions, function(a) {
                        return a.hidden ? 0 : 1;
                    });
                    var l = d.fields ? d.fields.length : 0;
                    i.menu("setIcon", {
                        target: j.parent().children("div.menu-item:first"),
                        iconCls: k >= l ? "tree-checkbox1" : 0 == k ? "tree-checkbox0" : "tree-checkbox2"
                    });
                    var m = j.parent().find(".menu-item:gt(1)").filter(function() {
                        return a(".tree-checkbox1", this).length ? !0 : !1;
                    });
                    m.each(function() {
                        i.menu(m.length > 1 ? "enableItem" : "disableItem", this);
                    });
                }
            };
            return {
                text: b.title || b.field,
                iconCls: b.hidden ? "tree-checkbox0" : "tree-checkbox1",
                hideOnClick: !1,
                disabled: b.hidable ? !1 : !0,
                handler: c
            };
        });
    }
    function A(b, c, d, e, f, g) {
        var h = b.datagrid("getRows"), i = b.datagrid("getDistinctColumnData", f), j = [ {
            text: "全部",
            hideOnClick: !1,
            iconCls: d.filterData && d.filterData.length ? d.filterData.length >= h.length ? "tree-checkbox0" : "tree-checkbox2" : "tree-checkbox1",
            handler: function(b, c, e, f, g, h) {
                d.filterData && d.filterData.length ? f.datagrid("showRows", !0) : f.datagrid("hideRows", !0), 
                a(this).parent().children("div.menu-item[hideOnClick=false]").each(function() {
                    h.menu("setIcon", {
                        target: this,
                        iconCls: d.filterData && d.filterData.length ? "tree-checkbox0" : "tree-checkbox1"
                    });
                });
            }
        }, "-" ], k = b.datagrid("getColumnOption", f), l = function(c) {
            var d = c, e = k.formatter;
            if (a.isFunction(e)) try {
                c = e.call(b, c, {}, 0);
            } catch (f) {}
            return a.util.isString(c) || a.util.isNumeric(c) ? c : d;
        }, m = i.length >= 15, n = m ? a.array.left(i, 10) : i, o = a.array.map(n, function(b) {
            var c = a.array.filter(h, function(a) {
                return a[f] == b;
            }), e = c.length, g = a.array.sum(d.filterData, function(a) {
                return a[f] == b ? 1 : 0;
            }), i = g ? g >= e ? "tree-checkbox0" : "tree-checkbox2" : "tree-checkbox1", j = function(e, f, g, i, j, k) {
                var l = a.array.sum(d.filterData, function(a) {
                    return a[f] == b ? 1 : 0;
                });
                i.datagrid(l ? "showRows" : "hideRows", c), k.menu("setIcon", {
                    target: this,
                    iconCls: l ? "tree-checkbox1" : "tree-checkbox0"
                }), a(this).parent().children("div.menu-item:first").each(function() {
                    k.menu("setIcon", {
                        target: this,
                        iconCls: d.filterData && d.filterData.length ? d.filterData.length >= h.length ? "tree-checkbox0" : "tree-checkbox2" : "tree-checkbox1"
                    });
                });
            };
            return {
                text: l(b),
                iconCls: i,
                hideOnClick: !1,
                handler: j
            };
        });
        if (a.array.merge(j, o), m) {
            var p = k.title ? k.title : k.field, q = function() {
                var c = a("<input />").attr({
                    type: "button",
                    value: "全部选择"
                }).click(function() {
                    b.datagrid("showRows", !0), a(this).parent().find(":checkbox").each(function() {
                        this.checked = !0;
                    });
                }), g = a("<input />").attr({
                    type: "button",
                    value: "全部不选"
                }).click(function() {
                    b.datagrid("hideRows", !0), a(this).parent().find(":checkbox").each(function() {
                        this.checked = !1;
                    });
                });
                a("<div></div>").append("<div>列：" + p + "，共" + i.length + "项</div><hr />").css({
                    padding: "10px"
                }).append(c).append(g).append("<hr />").each(function() {
                    var c = a(this), e = a("<ul></ul>").css({
                        "list-style-type": "decimal",
                        "padding-left": "0",
                        "line-height": "18px"
                    }).appendTo(c);
                    a.each(i, function(c, g) {
                        var i = "itemCheckbox_" + a.util.guid("N"), j = !a.array.some(d.filterData, function(a) {
                            return a[f] == g;
                        }), k = a("<li></li>").appendTo(e), m = a("<input />").attr({
                            type: "checkbox",
                            id: i,
                            checked: j
                        }).appendTo(k), n = (a("<label style='margin-left: 5px;'></label>").attr("for", i).html(l(g)).appendTo(k), 
                        function() {
                            var c = a.array.filter(h, function(a) {
                                return a[f] == g;
                            }), e = a.array.sum(d.filterData, function(a) {
                                return a[f] == g ? 1 : 0;
                            });
                            b.datagrid(e ? "showRows" : "hideRows", c);
                        });
                        m.click(n);
                    });
                }).dialog({
                    title: "过滤/显示",
                    iconCls: "icon-standard-application-view-detail",
                    height: 260,
                    width: 220,
                    left: e.pageX,
                    top: e.pageY,
                    collapsible: !1,
                    minimizable: !1,
                    maximizable: !1,
                    closable: !0,
                    modal: !0,
                    resizable: !0,
                    onClose: function() {
                        a.util.parseJquery(this).dialog("destroy");
                    }
                }).dialog("open");
            };
            a.array.merge(j, [ "-", {
                text: "处理更多(共" + i.length + "项)...",
                iconCls: "icon-standard-application-view-detail",
                handler: q
            } ]);
        }
        return j;
    }
    function B(b, c, d, e, f, g, h) {
        var i = [], j = c.pagingMenu, k = c.moveMenu, l = c.exportMenu;
        "object" == typeof j && (j = a.extend({
            disabled: !1,
            submenu: !0
        }, j)), "object" == typeof k && (k = a.extend({
            up: !1,
            down: !1,
            submenu: !0
        }, k)), "object" == typeof l && (l = a.extend({
            current: !1,
            all: !1,
            submenu: !0
        }, l));
        var m = {
            text: "刷新当前页",
            iconCls: "pagination-load",
            disabled: !c.refreshMenu,
            handler: function() {
                b.datagrid("reload");
            }
        }, n = {
            text: "首页",
            iconCls: "pagination-first",
            disabled: function() {
                return !c.pagination || h.page <= 1;
            },
            handler: function() {
                h.page > 1 && h.pager.pagination("select", 1);
            }
        }, o = {
            text: "上一页",
            iconCls: "pagination-prev",
            disabled: function() {
                return !c.pagination || h.page <= 1;
            },
            handler: function() {
                h.page > 1 && h.pager.pagination("select", h.page - 1);
            }
        }, p = {
            text: "下一页",
            iconCls: "pagination-next",
            disabled: function() {
                return !c.pagination || h.page >= h.pageCount;
            },
            handler: function() {
                h.page < h.pageCount && h.pager.pagination("select", h.page + 1);
            }
        }, q = {
            text: "末页",
            iconCls: "pagination-last",
            disabled: function() {
                return !c.pagination || h.page >= h.pageCount;
            },
            handler: function() {
                h.page < h.pageCount && h.pager.pagination("select", h.pageCount);
            }
        }, r = {
            text: "移至最上",
            iconCls: "icon-place-top",
            disabled: !(1 == k || 1 == k.top),
            handler: function() {
                b.datagrid("moveRow", {
                    source: f,
                    target: 0,
                    point: "top"
                });
            }
        }, s = {
            text: "上移",
            iconCls: "icon-up",
            disabled: !(1 == k || 1 == k.up),
            handler: function() {
                b.datagrid("shiftRow", {
                    point: "up",
                    index: f
                });
            }
        }, t = {
            text: "下移",
            iconCls: "icon-down",
            disabled: !(1 == k || 1 == k.down),
            handler: function() {
                b.datagrid("shiftRow", {
                    point: "down",
                    index: f
                });
            }
        }, u = {
            text: "移至最下",
            iconCls: "icon-place-bottom",
            disabled: !(1 == k || 1 == k.bottom),
            handler: function() {
                var a = b.datagrid("getRows");
                b.datagrid("moveRow", {
                    source: f,
                    target: a.length - 1,
                    point: "bottom"
                });
            }
        }, v = {
            text: "导出当前页",
            iconCls: "icon-standard-page-white-put",
            disabled: !(1 == l || 1 == l.current),
            handler: function() {
                return b.datagrid("exportExcel", !1);
            }
        }, w = {
            text: "导出全部",
            iconCls: "icon-standard-page-white-stack",
            disabled: !(1 == l || 1 == l.all),
            handler: function() {
                return b.datagrid("exportExcel", !0);
            }
        };
        i.push(m);
        var x = [ n, o, p, q ], y = [ r, s, "-", t, u ], z = [ v, w ];
        return j && a.array.merge(i, "-", "object" != typeof j || j.submenu ? {
            text: "翻页",
            iconCls: "",
            disabled: !(1 == j || !j.disabled),
            children: x
        } : x), k && a.array.merge(i, "-", "object" != typeof k || k.submenu ? {
            text: "上/下移动",
            iconCls: "",
            disabled: !k,
            children: y
        } : y), l && a.array.merge(i, "-", "object" != typeof l || l.submenu ? {
            text: "导出数据",
            iconCls: "icon-standard-page-save",
            disabled: !l,
            children: z
        } : z), i;
    }
    a.fn.datagrid.extensions = {};
    var C = a.fn.datagrid.methods.updateRow, D = a.fn.datagrid.methods.appendRow, E = a.fn.datagrid.methods.insertRow, F = function(b, d) {
        if (d && d.row && a.isNumeric(d.index)) {
            var e = a.util.parseJquery(b), f = e.datagrid("options");
            a.isFunction(f.onBeforeUpdateRow) && 0 == f.onBeforeUpdateRow.call(b, d.index, d.row) || (C.call(e, e, d), 
            c(e, f), Oa(e, f), Qa(e, f, d.index, d.row), a.isFunction(f.onUpdateRow) && f.onUpdateRow.call(b, d.index, d.row));
        }
    }, G = function(b, d) {
        if (d) {
            var e = a.util.parseJquery(b), f = e.datagrid("options");
            if (!a.isFunction(f.onBeforeAppendRow) || 0 != f.onBeforeAppendRow.call(b, d)) {
                D.call(e, e, d);
                var g = e.datagrid("getRows"), h = g.length - 1;
                c(e, f), Oa(e, f), Qa(e, f, h, d), a.isFunction(f.onAppendRow) && f.onAppendRow.call(b, d);
            }
        }
    }, H = function(b, d) {
        if (d && d.row && a.isNumeric(d.index)) {
            var e = a.util.parseJquery(b), f = e.datagrid("options");
            a.isFunction(f.onBeforeInsertRow) && 0 == f.onBeforeInsertRow.call(b, d.index, d.row) || (E.call(e, e, d), 
            c(e, f), Oa(e, f), Qa(e, f, d.index, d.row), a.isFunction(f.onInsertRow) && f.onInsertRow.call(b, d.index, d.row));
        }
    }, I = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getChecked"), f = a.array.map(e, function(a) {
            return d.datagrid("getRowIndex", a);
        });
        return a.array.contains(f, c);
    }, J = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getSelections"), f = a.array.map(e, function(a) {
            return d.datagrid("getRowIndex", a);
        });
        return a.array.contains(f, c);
    }, K = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getColumnFields"), f = d.datagrid("getColumnFields", !0);
        f && f.length && a.array.contains(e, c) && !a.array.contains(f, c) && d.datagrid("moveColumn", {
            source: c,
            target: f[f.length - 1],
            point: "after"
        });
    }, L = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getColumnFields"), f = d.datagrid("getColumnFields", !0);
        e && e.length && !a.array.contains(e, c) && a.array.contains(f, c) && d.datagrid("moveColumn", {
            source: c,
            target: e[0],
            point: "before"
        });
    }, M = function(b, c) {
        if (a.string.isNullOrEmpty(c)) return a();
        var d = a(b), e = "object" == typeof c, f = e && c.rowFieldNames && a.isArray(c.rowFieldNames) ? c.rowFieldNames : [], g = e && c.keyFieldName && a.string.isString(c.keyFieldName) ? c.keyFieldName : f[0], h = d.datagrid("getRows");
        h.length < 1 || a.each(f, function(b, c) {
            var e = "", f = 1;
            a.each(h, function(a, b) {
                var i = h[a][c], j = 0 > a - 1 ? h[a][g] : h[a - 1][g];
                h[a][g] == j && e == i ? (f += 1, a == h.length - 1 && d.datagrid("mergeCells", {
                    index: a - f + 1,
                    field: c,
                    rowspan: f,
                    colspan: null
                })) : (d.datagrid("mergeCells", {
                    index: a - f,
                    field: c,
                    rowspan: f,
                    colspan: null
                }), f = 1), e = i;
            });
        });
    }, N = function(b, c) {
        if (c && a.isNumeric(c.source) && a.isNumeric(c.target) && c.source != c.target && c.point) {
            a.array.contains([ "top", "bottom" ], c.point) || (c.point = "top");
            var d = a.util.parseJquery(b), e = d.datagrid("options"), f = d.datagrid("getRows"), g = f[c.source], h = f[c.target];
            if (g && h && (!a.isFunction(e.onBeforeDrop) || 0 != e.onBeforeDrop.call(b, h, g, c.point))) {
                var i = d.datagrid("popRow", c.source), j = d.datagrid("getRowIndex", h);
                switch (f = d.datagrid("getRows"), c.point) {
                  case "top":
                    d.datagrid("insertRow", {
                        index: j,
                        row: i
                    }), d.datagrid("selectRow", j);
                    break;

                  case "bottom":
                    j++ >= f.length ? d.datagrid("appendRow", i) : d.datagrid("insertRow", {
                        index: j,
                        row: i
                    }), d.datagrid("selectRow", j);
                }
                i && a.isFunction(e.onDrop) && e.onDrop.call(b, h, g, c.point);
            }
        }
    }, O = function(b, c) {
        if (a.isArray(c.source)) {
            var d = a.util.parseJquery(b), e = c.point, f = c.source, g = c.target;
            f = "top" == e ? f : f.reverse(), g = "top" == e ? g : g.reverse();
            for (var h = 0; h < f.length; h++) d.datagrid("moveRow", {
                source: f[h],
                target: g[h],
                point: e
            });
        }
    }, P = function(b, c) {
        if (c && a.isNumeric(c.index) && c.point && a.array.contains([ "up", "down" ], c.point)) {
            var d = a.util.parseJquery(b), e = (d.datagrid("options"), "up" == c.point ? c.index - 1 : c.index + 1), f = "up" == c.point ? "top" : "bottom";
            d.datagrid("moveRow", {
                source: c.index,
                target: e,
                point: f
            });
        }
    }, Q = function(b, c) {
        if (a.isArray(c.index)) {
            var d, e = a.util.parseJquery(b), f = c.point, g = e.datagrid("getRows"), h = g.length, i = "up" == f ? c.index : c.index.reverse();
            switch (f) {
              case "up":
                for (var j = 0, k = j; k < i.length; k++) d = i[k], d !== k && e.datagrid("shiftRow", {
                    point: f,
                    index: d
                });
                break;

              case "down":
                for (var l = h - 1, m = i.length, n = 0; m > n; n++) d = i[n], d !== l - n && e.datagrid("shiftRow", {
                    point: f,
                    index: d
                });
            }
        }
    }, R = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getRows"), f = c + 1;
        return e[f] ? e[f] : null;
    }, S = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getRows"), f = c - 1;
        return e[f] ? e[f] : null;
    }, T = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getRows"), f = e[c];
        return f ? (d.datagrid("deleteRow", c), f) : null;
    }, U = function(b) {
        function c(a, b) {
            var c = a.draggable("proxy").find("span.tree-dnd-icon");
            c.removeClass("tree-dnd-yes tree-dnd-no").addClass(b ? "tree-dnd-yes" : "tree-dnd-no");
        }
        var d = a.util.parseJquery(b), e = d.datagrid("options");
        d.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable({
            disabled: !1,
            revert: !0,
            cursor: "default",
            deltaX: 10,
            deltaY: 5,
            proxy: function(b) {
                var c = a.util.parseJquery(b), e = parseInt(c.attr("datagrid-row-index")), f = d.datagrid("getRowDom", e).clone(), g = a("<tr></tr>").addClass("datagrid-row datagrid-row-selected");
                a("<td width='20px'><span class='tree-dnd-icon tree-dnd-no' ></span></td>").appendTo(g);
                var h = f.find("td").each(function(a) {
                    6 > a && g.append(this);
                });
                return h.length > 6 && a("<td>...</td>").css("width", "40px").appendTo(g), a("<table></table>").addClass("tree-node-proxy").appendTo("body").append(g).hide();
            },
            onBeforeDrag: function(c) {
                var f = a.util.parseJquery(this), g = parseInt(f.attr("datagrid-row-index")), h = d.datagrid("getRowData", g);
                return a.isFunction(e.onBeforeDrag) && 0 == e.onBeforeDrag.call(b, g, h) ? !1 : 1 != c.which ? !1 : "checkbox" == c.target.type ? !1 : void 0;
            },
            onStartDrag: function() {
                var c = a.util.parseJquery(this), f = parseInt(c.attr("datagrid-row-index")), g = d.datagrid("getRowData", f);
                c.draggable("proxy").css({
                    left: -1e4,
                    top: -1e4
                }), a.isFunction(e.onBeforeDrag) && e.onStartDrag.call(b, f, g);
            },
            onStopDrag: function() {
                var c = a.util.parseJquery(this), f = parseInt(c.attr("datagrid-row-index")), g = d.datagrid("getRowData", f);
                a.isFunction(e.onStopDrag) && e.onStopDrag.call(b, f, g);
            },
            onDrag: function(b) {
                var c = b.pageX, d = b.pageY, e = b.data.startX, f = b.data.startY, g = Math.sqrt((c - e) * (c - e) + (d - f) * (d - f));
                g > 15 && a(this).draggable("proxy").show(), this.pageY = b.pageY;
            }
        }).droppable({
            accept: "tr.datagrid-row",
            onDragEnter: function(f, g) {
                var h = a.util.parseJquery(this), i = a.util.parseJquery(g), j = parseInt(h.attr("datagrid-row-index")), k = parseInt(i.attr("datagrid-row-index")), l = d.datagrid("getRowData", j), m = d.datagrid("getRowData", k), n = d.datagrid("getRowDom", j), o = n.find("td"), p = h.data("dnd"), q = {
                    droper: h,
                    drager: i,
                    droperIndex: j,
                    dragerIndex: k,
                    droperRow: l,
                    dragerRow: m,
                    droperRowDom: n,
                    mark: o
                };
                p ? a.extend(p, q) : h.data("dnd", q), a.isFunction(e.onDragEnter) && 0 == e.onDragEnter.call(b, l, m) && (c(i, !1), 
                o.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom"), h.droppable("disable"));
            },
            onDragOver: function(d, f) {
                var g = a.util.parseJquery(this), h = g.data("dnd"), i = h.drager, j = h.droperRow, k = h.dragerRow, l = h.mark;
                if (!g.droppable("options").disabled) {
                    var m = f.pageY, n = g.offset().top, o = n + g.outerHeight();
                    c(i, !0), l.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom"), 
                    l.addClass(m > n + (o - n) / 2 ? "datagrid-header-cell-bottom" : "datagrid-header-cell-top"), 
                    0 == e.onDragOver.call(b, j, k) && (c(i, !1), l.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom"), 
                    g.droppable("disable"));
                }
            },
            onDragLeave: function(d, f) {
                var g = a.util.parseJquery(this), h = g.data("dnd"), i = h.drager, j = h.droperRow, k = h.dragerRow, l = h.mark;
                c(i, !1), l.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom"), 
                a.isFunction(e.onDragLeave) && e.onDragLeave.call(b, j, k);
            },
            onDrop: function(b, c) {
                var e = a.util.parseJquery(this), f = e.data("dnd"), g = f.droperIndex, h = f.dragerIndex, i = f.mark, j = i.hasClass("datagrid-header-cell-top") ? "top" : "bottom";
                d.datagrid("moveRow", {
                    target: g,
                    source: h,
                    point: j
                }), i.removeClass("datagrid-header-cell-top datagrid-header-cell-bottom");
            }
        }), e.dndRow = !0;
    }, V = function(b) {
        var c = a.util.parseJquery(b), d = c.datagrid("options");
        c.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable"), 
        d.dndRow = !1;
    }, W = function(b, c) {
        var d = a.util.parseJquery(b), e = a.array.merge([], d.datagrid("getColumnFields", !0), d.datagrid("getColumnFields", !1)), f = a.array.indexOf(e, c);
        return -1 == f || f + 1 >= e.length ? null : d.datagrid("getColumnOption", e[f + 1]);
    }, X = function(b, c) {
        var d = a.util.parseJquery(b), e = a.array.merge([], d.datagrid("getColumnFields", !0), d.datagrid("getColumnFields", !1)), f = a.array.indexOf(e, c);
        return 1 > f ? null : d.datagrid("getColumnOption", e[f - 1]);
    }, Y = function(c, d) {
        if (d && d.source && d.target && d.source != d.target && d.point) {
            a.array.contains([ "before", "after" ], d.point) || (d.point = "before");
            var e = a.util.parseJquery(c);
            if (!e.datagrid("hasMuliRowHeader")) {
                var f, g, h = e.datagrid("options"), i = e.datagrid("getColumnFields"), j = e.datagrid("getColumnFields", !0);
                if (a.array.contains(i, d.source) && (f = !1), f == b && a.array.contains(j, d.source) && (f = !0), 
                a.array.contains(i, d.target) && (g = !1), g == b && a.array.contains(j, d.target) && (g = !0), 
                f != b && g != b && (!a.isFunction(h.onBeforeMoveColumn) || 0 != h.onBeforeMoveColumn.call(c, d.source, d.target, d.point))) {
                    var k = e.datagrid("getPanel"), l = k.find("div.datagrid-view"), m = l.find("div.datagrid-view1"), n = l.find("div.datagrid-view2"), o = m.find("table.datagrid-htable tr.datagrid-header-row"), p = n.find("table.datagrid-htable tr.datagrid-header-row"), q = m.find("table.datagrid-btable tr.datagrid-row"), r = n.find("table.datagrid-btable tr.datagrid-row"), s = f ? o.find("td[field=" + d.source + "]") : p.find("td[field=" + d.source + "]"), t = g ? o.find("td[field=" + d.target + "]") : p.find("td[field=" + d.target + "]"), u = f ? q : r, v = g ? q : r;
                    if (u.length == v.length) {
                        t[d.point](s), v.each(function(b, c) {
                            var e = a(this).find("td[field=" + d.target + "]"), f = a(u[b]).find("td[field=" + d.source + "]");
                            e[d.point](f);
                        });
                        var w = e.datagrid("getColumnOption", d.source), x = e.datagrid("getColumnOption", d.target), y = f ? h.frozenColumns[0] : h.columns[0], z = g ? h.frozenColumns[0] : h.columns[0], A = h._extensionsDatagrid ? h._extensionsDatagrid : h._extensionsDatagrid = {};
                        a.array.remove(y, w);
                        var B = a.array.indexOf(z, x);
                        if (B > -1 && a.array.insert(z, "before" == d.point ? B : B + 1, w), e.datagrid("fixColumnSize"), 
                        f && (g || (B = a.array.indexOf(A.fields, d.target), a.array.insert(A.fields, "before" == d.point ? B : B + 1, d.source), 
                        a.array.insert(A.fieldOptions, "before" == d.point ? B : B + 1, w), a.array.insert(A.fieldOptionsBackup, "before" == d.point ? B : B + 1, a.extend({}, w)))), 
                        !f) if (B = a.array.indexOf(A.fields, d.source), g) a.array.removeAt(A.fields, B), 
                        a.array.removeAt(A.fieldOptions, B), a.array.removeAt(A.fieldOptionsBackup, B); else {
                            var C = A.fieldOptions[B], D = A.fieldOptionsBackup[B];
                            a.array.removeAt(A.fields, B), a.array.removeAt(A.fieldOptions, B), a.array.removeAt(A.fieldOptionsBackup, B), 
                            B = a.array.indexOf(A.fields, d.target), a.array.insert(A.fields, "before" == d.point ? B : B + 1, d.source), 
                            a.array.insert(A.fieldOptions, "before" == d.point ? B : B + 1, C), a.array.insert(A.fieldOptionsBackup, "before" == d.point ? B : B + 1, D);
                        }
                        a.isFunction(h.onMoveColumn) && h.onMoveColumn.call(c, d.source, d.target, d.point);
                    }
                }
            }
        }
    }, Z = function(b, c) {
        if (c && c.field && c.point) {
            a.array.contains([ "before", "after" ], c.point) || (c.point = "before");
            var d = a.util.parseJquery(b), e = d.datagrid("getColumnFields", "all"), f = a.array.indexOf(e, c.field);
            if (!(-1 == f || "before" == c.point && 0 == f || "after" == c.point && f == e.length - 1)) {
                var b = e["before" == c.point ? f - 1 : f + 1];
                d.datagrid("moveColumn", {
                    source: c.field,
                    target: b,
                    point: c.point
                });
            }
        }
    }, $ = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("options"), f = e._extensionsDatagrid ? e._extensionsDatagrid : e._extensionsDatagrid = {};
        a.isFunction(e.onBeforeDeleteColumn) && 0 == e.onBeforeDeleteColumn.call(b, c) || (aa(e, c, f), 
        d.datagrid("getColumnDom", {
            field: c,
            header: !0
        }).remove(), a.isFunction(e.onDeleteColumn) && e.onDeleteColumn.call(b, c));
    }, _ = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getColumnOption", c);
        return e && d.datagrid("deleteColumn", c), e;
    }, aa = a.fn.datagrid.extensions.removeField = function(c, d, e) {
        var f, g, h = -1, i = -1;
        a.array.likeArray(c.frozenColumns) && (a.each(c.frozenColumns, function(b, c) {
            if (a.array.likeArray(this)) a.each(this, function(a, b) {
                return b.field == d ? (i = a, !1) : void 0;
            }); else if (c.field == d) return i = b, !1;
            return i > -1 ? (h = b, !1) : void 0;
        }), i > -1 && (g = !0)), g == b && a.array.likeArray(c.columns) && (a.each(c.columns, function(b, c) {
            if (a.array.likeArray(this)) a.each(this, function(a, b) {
                return b.field == d ? (i = a, !1) : void 0;
            }); else if (c.field == d) return i = b, !1;
            return i > -1 ? (h = b, !1) : void 0;
        }), i > -1 && (g = !1)), i > -1 && (f = g ? c.frozenColumns : c.columns, f = h > -1 ? f[h] : f, 
        a.array.removeAt(f, i), index = a.array.indexOf(e.fields, d), a.array.remove(e.fields, d), 
        a.array.removeAt(e.fieldOptions, index), a.array.removeAt(e.fieldOptionsBackup, index));
    }, ba = function(b) {
        var c = a.util.parseJquery(b), d = c.datagrid("options");
        return d.columns && d.columns.length > 1 && d.columns[1].length > 0 || d.frozenColumns && d.frozenColumns.length > 1 && d.frozenColumns[1].length > 0;
    }, ca = function(c, d) {
        var e, f = a.util.parseJquery(c), g = f.datagrid("getRows");
        return a.isFunction(d) ? e = a.array.filter(g, d) : a.array.likeArray(d) && !a.util.isString(d) ? (e = a.array.map(d, function(a) {
            return da(c, a, f, g);
        }), e = a.array.filter(e, function(a) {
            return a != b && null != a;
        })) : e = [ da(c, d, f, g) ], e;
    }, da = function(b, c, d, e) {
        var f = d || a.util.parseJquery(b), g = (e || f.datagrid("getRows"), f.datagrid("options"));
        return a.array.first(e, a.isFunction(c) ? c : function(a) {
            return a[g.idField] == c;
        });
    }, ea = a.fn.datagrid.methods.deleteRow, fa = function(b, c) {
        var d, e = a.util.parseJquery(b), f = a.isFunction(c);
        if (f) {
            var g = e.datagrid("getRows"), h = a.array.first(g, c);
            h && ea.call(e, e, h);
        } else d = a.isNumeric(c) ? c : e.datagrid("getRowIndex", c), a.isNumeric(d) && d > -1 && ea.call(e, e, d);
    }, ga = function(b, c) {
        var d = a.array.likeArray(c) && !a.util.isString(c);
        if (d) return void a.each(c, function(a, c) {
            fa(b, c);
        });
        if (a.isFunction(c)) {
            var e = a.util.parseJquery(b), f = e.datagrid("getRows");
            a.each(f, function(a, b) {
                if (1 == c.call(this, this, a, f)) {
                    var d = e.datagrid("getRowIndex", this);
                    ea.call(e, e, d);
                }
            });
        }
    }, ha = function(b, c) {
        if (c && c.field && c.title) {
            var d = a.util.parseJquery(b), e = d.datagrid("getColumnOption", c.field), f = c.field, g = c.title, h = d.datagrid("getPanel"), i = h.find("div.datagrid-view div.datagrid-header tr.datagrid-header-row td[field=" + f + "]");
            i.length && (i.find("div.datagrid-cell span:nth-last-child(2)").html(g), e.title = g);
        }
    }, ia = function(c, d) {
        if (d && d.field && d.width && a.isNumeric(d.width)) {
            var e = (a.data(c, "datagrid"), a.util.parseJquery(c)), f = e.datagrid("options"), g = e.datagrid("getColumnOption", d.field), h = d.field, i = d.width, j = e.datagrid("getPanel").find("div.datagrid-view div.datagrid-header tr.datagrid-header-row td[field=" + h + "] div.datagrid-cell");
            if (j.length) {
                var k = j._outerWidth() - parseInt(j[0].style.width);
                j.css("height", ""), g.width = i, g.boxWidth = i - k, g.auto = b, j.width(g.boxWidth), 
                e.datagrid("fixColumnSize", h), e.datagrid("fitColumns"), f.onResizeColumn.call(c, h, i);
            }
        }
    }, ja = function(b, c) {
        c = c || {}, c = a.extend({
            sortName: null,
            sortOrder: "asc"
        }, c);
        var d = a.util.parseJquery(b), e = a.data(b, "datagrid"), f = d.datagrid("options"), g = d.datagrid("getColumnOption", c.sortName);
        if (g && !a.isEmptyObject(g) && g.sortable && !e.resizing) {
            f.sortName = c.sortName, f.sortOrder = c.sortOrder;
            var h = "datagrid-sort-" + f.sortOrder, i = d.datagrid("getPanel").find(".datagrid-view .datagrid-header td div.datagrid-cell"), j = d.datagrid("getPanel").find(".datagrid-view .datagrid-header td[field='" + c.sortName + "'] div.datagrid-cell");
            if (i.length && j.length) {
                if (i.removeClass("datagrid-sort-asc datagrid-sort-desc"), j.addClass(h), f.remoteSort) d.datagrid("reload"); else {
                    var k = a.data(b, "datagrid").data;
                    d.datagrid("loadData", k);
                }
                f.onSortColumn.call(b, f.sortName, f.sortOrder);
            }
        }
    };
    a.fn.datagrid.extensions.parseOffset = function(b) {
        var c = {
            enable: b ? !0 : !1
        };
        return c.enable && a.extend(c, b), c.width = a.isNumeric(c.width) ? c.width : 0, 
        c.height = a.isNumeric(c.height) ? c.height : 0, c;
    };
    var ka = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("options"), f = e._extensionsDatagrid ? e._extensionsDatagrid : e._extensionsDatagrid = {};
        e.offset = f.offset = a.fn.datagrid.extensions.parseOffset(c), f.offset && f.offset.enable && (a.isFunction(f.offsetFunction) || (f.offsetFunction = function() {
            if (f.offset.enable) {
                var b = a.util.windowSize();
                d.datagrid("resize", {
                    width: b.width + f.offset.width,
                    height: b.height + f.offset.height
                });
            }
        }, a(window).resize(f.offsetFunction)), f.offsetFunction());
    }, la = function(b, c) {
        if (a.string.isNullOrEmpty(c)) return a();
        var d = a.util.parseJquery(b), e = d.datagrid("getPanel"), f = !a.string.isString(c), g = f ? c.field : c, h = f ? c.header : !1, i = e.find("div.datagrid-view tr.datagrid-row td[field=" + g + "]");
        return h && (i = i.add(e.find("div.datagrid-view tr.datagrid-header-row td[field=" + g + "]"))), 
        i;
    }, ma = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getRows");
        return a.array.map(e, function(a) {
            return a[c];
        });
    }, na = function(b, c) {
        if (!a.isNumeric(c) || 0 > c) return a();
        var d = a.util.parseJquery(b), e = d.datagrid("getPanel");
        return e.find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row[datagrid-row-index=" + c + "]");
    }, oa = function(c, d) {
        if (!a.isNumeric(d) || 0 > d) return b;
        var e = a.util.parseJquery(c), f = e.datagrid("getRows");
        return f[d];
    }, pa = function(b, c) {
        if (!c || !c.field || !a.isNumeric(c.index) || c.index < 0) return a();
        var d = a.util.parseJquery(b), e = d.datagrid("getRowDom", c.index);
        return e.find("td[field=" + c.field + "] .datagrid-cell");
    }, qa = function(b, c) {
        if (c && c.field && a.isNumeric(c.index) && !(c.index < 0)) {
            var d = a.util.parseJquery(b), e = d.datagrid("getRowData", c.index);
            return e[c.field];
        }
    }, ra = function(c, d) {
        var e = a.util.parseJquery(c), f = e.datagrid("getCellDom", d);
        return f && f.length ? f.text() : b;
    }, sa = a.fn.datagrid.methods.getColumnFields, ta = function(c, d) {
        var e = a.util.parseJquery(c);
        return null == d || d == b || a.util.isBoolean(d) ? sa.call(e, e, d) : a.util.isString(d) ? a.array.merge([], sa.call(e, e, !0), sa.call(e, e, !1)) : void 0;
    }, ua = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getColumnFields", "all");
        if (!a.array.contains(e, c)) return [];
        var f = d.datagrid("getRows"), g = a.array.clone(f);
        return a.array.distinct(g, function(a, b) {
            return a[c] == b[c];
        }), g;
    }, va = function(b, c) {
        var d = a.util.parseJquery(b), e = d.datagrid("getColumnFields", "all");
        if (!a.array.contains(e, c)) return [];
        var f = d.datagrid("getColumnData", c);
        return a.array.distinct(f, function(a, b) {
            return a == b;
        }), f;
    }, wa = function(b, c) {
        var d = a.util.parseJquery(b), e = ta(b, c);
        return a.array.map(e, function(a) {
            return d.datagrid("getColumnOption", a);
        });
    }, xa = function(b, c) {
        var d = wa(b, c);
        return a.array.filter(d, function(a) {
            return a.hidden ? !0 : !1;
        });
    }, ya = function(b, c) {
        var d = wa(b, c);
        return a.array.filter(d, function(a) {
            return a.hidden ? !1 : !0;
        });
    }, za = function(b, c) {
        var d = xa(b, c);
        return a.array.map(d, function(a) {
            return a.field;
        });
    }, Aa = function(b, c) {
        var d = ya(b, c);
        return a.array.map(d, function(a) {
            return a.field;
        });
    }, Ba = function(c, d, e, f, g, h, i) {
        var k = e || a.util.parseJquery(c), l = g || k.datagrid("getRows"), m = a.isFunction(d) ? da(c, d, k, l) : d, n = k.datagrid("getRowIndex", m), i = null == i || i == b || 1 == i ? !0 : !1;
        if (n > -1) {
            var o = f || k.datagrid("options"), p = k.datagrid("getRowData", n), q = h || (o._extensionsDatagrid ? o._extensionsDatagrid : o._extensionsDatagrid = {});
            q.filterData = a.isArray(q.filterData) ? q.filterData : q.filterData = [], k.datagrid("getRowDom", n).show(), 
            a.array.remove(q.filterData, p), i && j(k, o, q, l);
        }
    }, Ca = function(c, d, e, f, g, h, i) {
        var k = e || a.util.parseJquery(c), l = g || k.datagrid("getRows"), m = a.isFunction(d) ? da(c, d, k, l) : d, n = k.datagrid("getRowIndex", m), i = null == i || i == b || 1 == i ? !0 : !1;
        if (n > -1) {
            var o = f || k.datagrid("options"), p = k.datagrid("getRowData", n), q = h || (o._extensionsDatagrid ? o._extensionsDatagrid : o._extensionsDatagrid = {});
            q.filterData = a.isArray(q.filterData) ? q.filterData : [], k.datagrid("unselectRow", n).datagrid("uncheckRow", n).datagrid("getRowDom", n).hide(), 
            a.array.attach(q.filterData, p), i && j(k, o, q, l);
        }
    }, Da = function(b, c) {
        var d, e = a.util.parseJquery(b), f = e.datagrid("options"), g = e.datagrid("getRows"), h = f._extensionsDatagrid ? f._extensionsDatagrid : f._extensionsDatagrid = {};
        if (c === !0) {
            h.filterData = [];
            var i = e.datagrid("getPanel"), k = i.find("div.datagrid-header-filter-item-icon");
            i.find(".datagrid-view .datagrid-body tr.datagrid-row").show(), m(k, "tree-checkbox1");
        } else d = a.isFunction(c) ? a.array.filter(g, c) : a.array.likeArray(c) && !a.util.isString(c) ? c : [ c ];
        d && (a.each(d, function(a, c) {
            Ba(b, c, e, f, g, h, !1);
        }), j(e, f, h, g));
    }, Ea = function(b, c) {
        var d, e = a.util.parseJquery(b), f = e.datagrid("options"), g = e.datagrid("getRows"), h = f._extensionsDatagrid ? f._extensionsDatagrid : f._extensionsDatagrid = {};
        if (c === !0) {
            e.datagrid("unselectAll").datagrid("uncheckAll"), h.filterData = a.array.clone(g);
            var i = e.datagrid("getPanel"), k = i.find("div.datagrid-header-filter-item-icon");
            i.find(".datagrid-view .datagrid-body tr.datagrid-row").hide(), m(k, "tree-checkbox0");
        } else d = a.isFunction(c) ? a.array.filter(g, c) : a.array.likeArray(c) && !a.util.isString(c) ? c : [ c ];
        d && (a.each(d, function(a, c) {
            Ca(b, c, e, f, g, h, !1);
        }), j(e, f, h, g));
    }, Fa = function(b) {
        var c = a.util.parseJquery(b), d = c.datagrid("options"), e = d._extensionsDatagrid ? d._extensionsDatagrid : d._extensionsDatagrid = {};
        return e.filterData;
    }, Ga = function(b) {
        var c = a.util.parseJquery(b), d = c.datagrid("options"), e = c.datagrid("getRows"), f = d._extensionsDatagrid ? d._extensionsDatagrid : d._extensionsDatagrid = {}, g = a.isArray(f.filterData) ? f.filterData : [];
        return a.array.filter(e, function(b) {
            return a.array.contains(g, b) ? !1 : !0;
        });
    }, Ha = function(b, e) {
        var f = a.util.parseJquery(b), g = f.datagrid("options"), h = g._extensionsDatagrid ? g._extensionsDatagrid : g._extensionsDatagrid = {}, i = f.datagrid("getPanel"), j = "div.datagrid-view div.datagrid-header tr.datagrid-header-row div.datagrid-header-filter-container";
        if (e) g.columnFilter = e, c(f, g, h), a.util.exec(function() {
            i.find(j).hide().slideDown("slow");
        }); else {
            var k = i.find(j), l = k.length, m = 0;
            k.slideUp("slow", function() {
                ++m == l && (d(f, g), g.columnFilter = e);
            });
        }
    }, Ia = function(b, c) {
        var d = a.util.parseJquery(b);
        if (a.util.isBoolean(c)) return void d.datagrid(c ? "showRows" : "hideRows", !0);
        if (c && c.field) {
            var e = c.field, f = c.value, g = a.array.likeArray(f) && !a.util.isString(f), h = g ? function(b) {
                return a.array.contains(f, b[e]);
            } : function(a) {
                return f == a[e];
            }, i = d.datagrid("findRows", h);
            d.datagrid(c.selected ? "showRows" : "hideRows", i);
        }
    }, Ja = function(b, c) {
        {
            var d = a.util.parseJquery(b), e = a.data(d[0], "datagrid");
            e.options;
        }
        e.highlightField && d.datagrid("getColumnDom", {
            field: e.highlightField,
            header: !0
        }).removeClass("datagrid-row-over"), d.datagrid("getColumnDom", {
            field: c,
            header: !0
        }).filter(function() {
            return !a(this).parent().hasClass("datagrid-row-selected");
        }).addClass("datagrid-row-over"), e.highlightField = c;
    }, Ka = function(b, c) {
        var d, e, f, g = a.util.parseJquery(b), h = g.datagrid("getPanel"), i = c, j = !1, k = !0;
        a.isPlainObject(c) ? (i = c.value, e = c.field, j = c.regular, k = c.ignoreCase, 
        d = h.find("div.datagrid-body tr.datagrid-row td[" + (e ? "field=" + e : "field") + "] div.datagrid-cell")) : d = h.find("div.datagrid-body tr.datagrid-row td[field] div.datagrid-cell"), 
        f = j ? new RegExp(i, k ? "gm" : "igm") : i, d.each(function() {
            var b = a(this);
            if (b.find("span.datagrid-cell-hightlight").replaceWith(function() {
                return a(this).text();
            }), i) {
                var c = b.html();
                c && b.html(a.string.replaceAll(c, i, "<span class='datagrid-cell-hightlight'>" + i + "</span>"));
            }
        });
    }, La = function(b, c) {
        c = a.string.toBoolean(c), alert("导出" + (c ? "全部" : "当前页") + "数据");
    }, Ma = a.fn.datagrid.extensions.initColumnExtendProperty = function(c) {
        (null == c.tooltip || c.tooltip == b) && (c.tooltip = !1), null != c.filterable && c.filterable != b && a.util.isBoolean(c.filterable) || (c.filterable = !0), 
        null != c.hidable && c.hidable != b && a.util.isBoolean(c.hidable) || (c.hidable = !0), 
        null != c.filter && c.filter != b && a.util.isString(c.filter) || (c.filter = "checkbox"), 
        null != c.precision && c.precision != b && a.isNumeric(c.precision) || (c.precision = 1), 
        null != c.step && c.step != b && a.isNumeric(c.step) || (c.step = 1);
    }, Na = a.fn.datagrid.extensions.initColumnExtendProperties = function(b, c) {
        if (!c._initializedExtendProperties) {
            var d = b.datagrid("getColumns", "all");
            a.each(d, function() {
                Ma(this);
            }), c._initializedExtendProperties = !0;
        }
    }, Oa = a.fn.datagrid.extensions.initRowDndExtensions = function(a, b) {
        b = b || a.datagrid("options"), b.dndRow && a.datagrid("enableRowDnd");
    };
    a.fn.datagrid.extensions.parseHeaderContextMenuMap = function(b, c, d, e, f) {
        return a.array.map(e, function(e, g) {
            if (!e || a.util.isString(e)) return e;
            var h = a.extend({}, e);
            return h.id = a.isFunction(e.id) ? e.id.call(h, b, c, d, f) : e.id, h.text = a.isFunction(e.text) ? e.text.call(h, b, c, d, f) : e.text, 
            h.iconCls = a.isFunction(e.iconCls) ? e.iconCls.call(h, b, c, d, f) : e.iconCls, 
            h.disabled = a.isFunction(e.disabled) ? e.disabled.call(h, b, c, d, f) : e.disabled, 
            h.hideOnClick = a.isFunction(e.hideOnClick) ? e.hideOnClick.call(h, b, c, d, f) : e.hideOnClick, 
            h.onclick = a.isFunction(e.onclick) ? function(a, b, g) {
                e.onclick.call(this, a, c, d, f, b, g);
            } : e.onclick, h.handler = a.isFunction(e.handler) ? function(a, b, g) {
                e.handler.call(this, a, c, d, f, b, g);
            } : e.handler, h.children && h.children.length && (h.children = a.fn.datagrid.extensions.parseHeaderContextMenuMap(b, c, d, h.children, f)), 
            h;
        });
    }, a.fn.datagrid.extensions.parseRowContextMenuMap = function(b, c, d, e, f, g) {
        return a.array.map(f, function(f, h) {
            if (!f || a.util.isString(f)) return f;
            var i = a.extend({}, f);
            return i.id = a.isFunction(f.id) ? f.id.call(i, b, c, d, e, g) : f.id, i.text = a.isFunction(f.text) ? f.text.call(i, b, c, d, e, g) : f.text, 
            i.iconCls = a.isFunction(f.iconCls) ? f.iconCls.call(i, b, c, d, e, g) : f.iconCls, 
            i.disabled = a.isFunction(f.disabled) ? f.disabled.call(i, b, c, d, e, g) : f.disabled, 
            i.hideOnClick = a.isFunction(f.hideOnClick) ? f.hideOnClick.call(i, b, c, d, e, g) : f.hideOnClick, 
            i.onclick = a.isFunction(f.onclick) ? function(a, b, h) {
                f.onclick.call(this, a, c, d, e, g, b, h);
            } : f.onclick, i.handler = a.isFunction(f.handler) ? function(a, b, h) {
                f.handler.call(this, a, c, d, e, g, b, h);
            } : f.handler, i.children && i.children.length && (i.children = a.fn.datagrid.extensions.parseRowContextMenuMap(b, c, d, e, i.children, g)), 
            i;
        });
    }, a.fn.datagrid.extensions.parseContextMenuEventData = function(b, c, d) {
        var e = a.fn.datagrid.extensions.parseRemoteQueryParams(c), f = a.fn.datagrid.extensions.parsePaginationParams(b, c);
        return a.extend({}, e, f, {
            e: d,
            grid: b
        });
    }, a.fn.datagrid.extensions.parsePaginationParams = function(b, c) {
        var d = {};
        if (c.pagination) try {
            var e = b.datagrid("getPager"), f = e.pagination("options"), g = f.total, h = Math.ceil(parseFloat(g) / parseFloat(f.pageSize));
            a.extend(d, {
                pager: e,
                total: g,
                pageCount: h
            });
        } catch (i) {}
        return d;
    }, a.fn.datagrid.extensions.parseRemoteQueryParams = function(b) {
        var c = a.extend({}, b.queryParams);
        return b.pagination && a.extend(c, {
            page: b.pageNumber,
            rows: b.pageSize
        }), b.sortName && a.extend(c, {
            sort: b.sortName,
            order: b.sortOrder
        }), c = a.fn.datagrid.extensions.parsePagingQueryParams(b, c);
    };
    var Pa = function(b, c) {
        var d = b.datagrid("getRows");
        b.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").each(function() {
            var e = a(this), f = parseInt(e.attr("datagrid-row-index")), g = d[f];
            Qa(b, c, f, g, e);
        });
    }, Qa = function(b, c, d, e, f) {
        function g(c) {
            var e = b.datagrid("getColumns", "all"), f = a("<table></table>").css({
                padding: "5px"
            });
            return a.each(e, function(a, c) {
                if (c && c.field && c.title) {
                    var e = b.datagrid("getCellDisplay", {
                        field: c.field,
                        index: d
                    });
                    f.append("<tr><td style='text-align: right; width: 150px;'>" + c.title + ":</td><td style='width: 250px;'>" + e + "</td></tr>");
                }
            }), f;
        }
        if (f = f || b.datagrid("getRowDom", d), c.rowTooltip) {
            var h = function(b) {
                var h = a(this), i = a.isFunction(c.rowTooltip) ? c.rowTooltip.call(f, d, e) : g(e);
                h.tooltip("update", i);
            };
            f.each(function() {
                a.easyui.tooltip.init(this, {
                    onShow: h
                });
            });
        } else f.children("td[field]").each(function() {
            var c = a(this), f = c.attr("field"), g = b.datagrid("getColumnOption", f);
            if (g && g.tooltip) {
                var h = c.find("div.datagrid-cell"), i = function(b) {
                    var c = a(this), i = a.isFunction(g.tooltip) ? g.tooltip.call(h, e[f], d, e) : e[f];
                    c.tooltip("update", i);
                };
                a.easyui.tooltip.init(h, {
                    onShow: i
                });
            }
        });
    }, Ra = function(b, c, d) {
        if (c.extEditing) {
            var e = b.datagrid("getRowDom", d);
            if (e.length) {
                var f = b.datagrid("getPanel").find("div.datagrid-view"), g = f.find("div.datagrid-view1"), h = f.find("div.datagrid-view2"), i = h.find("div.datagrid-body"), j = g.outerWidth(), k = (f.position(), 
                o > 0 ? o : 0);
                i.css("position", "relative");
                var l = e.outerHeight(), m = e.position().top + l + i.scrollTop() - h.find("div.datagrid-header").outerHeight(), n = a("<div></div>").addClass("dialog-button datagrid-rowediting-panel").appendTo(i).css("top", m).attr("datagrid-row-index", d);
                a("<a></a>").linkbutton({
                    plain: !1,
                    iconCls: "icon-ok",
                    text: "保存"
                }).appendTo(n).click(function() {
                    b.datagrid("endEdit", d);
                }), a("<a></a>").linkbutton({
                    plain: !1,
                    iconCls: "icon-cancel",
                    text: "取消"
                }).appendTo(n).click(function() {
                    b.datagrid("cancelEdit", d);
                });
                var o = (c.width - n.outerWidth()) / 2 - j, k = o > 0 ? o : 0;
                n.css("left", k);
            }
        }
    }, Sa = function(a, b, c) {
        b = b || a.datagrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body"), 
        b.find("div.datagrid-rowediting-panel[datagrid-row-index=" + c + "]").remove();
    }, Ta = function(a, b, c) {
        b.extEditing && (body = a.datagrid("getPanel").find("div.datagrid-view div.datagrid-view2 div.datagrid-body"), 
        Sa(a, body, c));
    }, Ua = function(a, b, c) {
        var d = b._extensionsDatagrid ? b._extensionsDatagrid : b._extensionsDatagrid = {};
        b.singleEditing && a.datagrid("endEdit", d.lastEditingIndex), d.lastEditingIndex = c;
    }, Va = a.fn.datagrid.extensions.initExtensions = function(b, d) {
        function e() {
            Na(b, j);
        }
        function f() {
            b.datagrid("setOffset", d.offset);
        }
        function g() {
            q(b, d, j), r(b, d, j), s(b, d, j);
        }
        function h() {
            u(b, d, j);
        }
        function i() {
            d.keyboard && v(b, d, j);
        }
        var j = d._extensionsDatagrid ? d._extensionsDatagrid : d._extensionsDatagrid = {};
        if (!j._initialized) {
            var k = b.datagrid("getColumnFields", !1);
            j.fields = a.array.filter(k, function(a) {
                return (b.datagrid("getColumnOption", a) || {}).title ? !0 : !1;
            }), j.fieldOptions = a.array.map(j.fields, function(a) {
                return b.datagrid("getColumnOption", a);
            }), j.fieldOptionsBackup = a.array.map(j.fieldOptions, function(b) {
                return a.extend({}, b);
            }), j.filterData = [], e(), f(), g(), h(), i();
            var l = b.datagrid("getRows");
            l && l.length || c(b, d, j), j._initialized = !0;
        }
    };
    a.fn.datagrid.extensions.parseOrderbyParams = function(b, c) {
        return b = a.string.isNullOrWhiteSpace(b) ? "" : a.trim(b), c = a.string.isNullOrWhiteSpace(c) ? "" : a.trim(c), 
        c = c.toLowerCase(), "asc" != c && "desc" != c && (c = "asc"), a.trim(b + " " + c);
    }, a.fn.datagrid.extensions.parsePagingQueryParams = function(b, c) {
        var d = a.util.parseMapFunction(c);
        return b.pagination && (d.pageNumber = d.page, d.pageSize = d.rows, d.pageIndex = d.pageNumber - 1), 
        d.orderby = a.fn.datagrid.extensions.parseOrderbyParams(d.sort, d.order), d;
    };
    var Wa = a.fn.datagrid.extensions.clearFilterData = function(a) {
        var b = a._extensionsDatagrid ? a._extensionsDatagrid : a._extensionsDatagrid = {};
        b.filterData = [];
    }, Xa = a.fn.datagrid.extensions.loader = function(b, c, d) {
        var e = a.util.parseJquery(this), f = e.datagrid("options");
        if (Va(e, f), !f.url) return !1;
        b = a.fn.datagrid.extensions.parsePagingQueryParams(f, b);
        try {
            var g = e.datagrid("getColumnOption", b.sort);
            b.sort = g.sortField || g.field, b.orderby = b.sort + " " + b.order;
        } catch (h) {}
        a.ajax({
            type: f.method,
            url: f.url,
            data: b,
            dataType: "json",
            success: function(a) {
                Wa(f), c(a);
            },
            error: function() {
                d.apply(this, arguments);
            }
        });
    }, Ya = function(b) {
        return b ? a.isArray(b) ? {
            total: b.length,
            rows: b
        } : b : {
            total: 0,
            rows: []
        };
    }, Za = a.fn.datagrid.defaults.onLoadSuccess, $a = a.fn.datagrid.extensions.onLoadSuccess = function(b) {
        a.isFunction(Za) && Za.apply(this, arguments);
        var d = a.util.parseJquery(this), e = d.datagrid("options"), f = e._extensionsDatagrid ? e._extensionsDatagrid : e._extensionsDatagrid = {};
        c(d, e, f), Oa(d, e), Pa(d, e);
    }, _a = a.fn.datagrid.defaults.onResizeColumn, ab = a.fn.datagrid.extensions.onResizeColumn = function(b, c) {
        a.isFunction(_a) && _a.apply(this, arguments);
        var d = a.util.parseJquery(this), e = d.datagrid("options");
        if (e.columnFilter) {
            var f = d.datagrid("getPanel"), g = d.datagrid("getColumnOption", b), h = f.find("div.datagrid-header-filter-container[field=" + b + "]");
            h.width(g.width);
        }
    }, bb = a.fn.datagrid.defaults.onBeforeEdit, cb = a.fn.datagrid.extensions.onBeforeEdit = function(b, c) {
        a.isFunction(bb) && bb.apply(this, arguments);
        var d = a.util.parseJquery(this), e = d.datagrid("options");
        Ra(d, e, b), Ua(d, e, b), d.datagrid("getPanel").find("div.datagrid-view div.datagrid-body table.datagrid-btable tr.datagrid-row").draggable("disable");
    }, db = a.fn.datagrid.defaults.onAfterEdit, eb = a.fn.datagrid.extensions.onAfterEdit = function(b, d, e) {
        a.isFunction(db) && db.apply(this, arguments);
        var f = a.util.parseJquery(this), g = f.datagrid("options"), h = g._extensionsDatagrid ? g._extensionsDatagrid : g._extensionsDatagrid = {};
        Ta(f, g, b), c(f, g, h), Oa(f, g), Qa(f, g, b, d);
    }, fb = a.fn.datagrid.defaults.onCancelEdit, gb = a.fn.datagrid.extensions.onCancelEdit = function(b, c) {
        a.isFunction(fb) && fb.apply(this, arguments);
        var d = a.util.parseJquery(this), e = d.datagrid("options");
        Ta(d, e, b), Oa(d, e), Qa(d, e, b, c);
    }, hb = a.fn.datagrid.extensions.methods = {
        updateRow: function(a, b) {
            return a.each(function() {
                F(this, b);
            });
        },
        appendRow: function(a, b) {
            return a.each(function() {
                G(this, b);
            });
        },
        insertRow: function(a, b) {
            return a.each(function() {
                H(this, b);
            });
        },
        isChecked: function(a, b) {
            return I(a[0], b);
        },
        isSelected: function(a, b) {
            return J(a[0], b);
        },
        freezeColumn: function(a, b) {
            return a.each(function() {
                K(this, b);
            });
        },
        unfreezeColumn: function(a, b) {
            return a.each(function() {
                L(this, b);
            });
        },
        mergeCellsByField: function(a, b) {
            return a.each(function() {
                M(this, b);
            });
        },
        moveRow: function(a, b) {
            return a.each(function() {
                N(this, b);
            });
        },
        moveRows: function(a, b) {
            return a.each(function() {
                O(this, b);
            });
        },
        shiftRow: function(a, b) {
            return a.each(function() {
                P(this, b);
            });
        },
        shiftRows: function(a, b) {
            return a.each(function() {
                Q(this, b);
            });
        },
        nextRow: function(a, b) {
            return R(a[0], b);
        },
        prevRow: function(a, b) {
            return S(a[0], b);
        },
        popRow: function(a, b) {
            return T(a[0], b);
        },
        enableRowDnd: function(a) {
            return a.each(function() {
                U(this);
            });
        },
        disableRowDnd: function(a) {
            return a.each(function() {
                V(this);
            });
        },
        moveColumn: function(a, b) {
            return a.each(function() {
                Y(this, b);
            });
        },
        shiftColumn: function(a, b) {
            return a.each(function() {
                Z(this, b);
            });
        },
        nextColumn: function(a, b) {
            return W(a[0], b);
        },
        prevColumn: function(a, b) {
            return X(a[0], b);
        },
        deleteColumn: function(a, b) {
            return a.each(function() {
                $(this, b);
            });
        },
        popColumn: function(a, b) {
            return _(a[0], param);
        },
        getColumnDom: function(a, b) {
            return la(a[0], b);
        },
        getColumnData: function(a, b) {
            return ma(a[0], b);
        },
        getRowDom: function(a, b) {
            return na(a[0], b);
        },
        getRowData: function(a, b) {
            return oa(a[0], b);
        },
        getCellDom: function(a, b) {
            return pa(a[0], b);
        },
        getCellData: function(a, b) {
            return qa(a[0], b);
        },
        getCellDisplay: function(a, b) {
            return ra(a[0], b);
        },
        getColumnFields: function(a, b) {
            return ta(a[0], b);
        },
        getDistinctRows: function(a, b) {
            return ua(a[0], b);
        },
        getDistinctColumnData: function(a, b) {
            return va(a[0], b);
        },
        getColumns: function(a, b) {
            return wa(a[0], b);
        },
        getHiddenColumns: function(a, b) {
            return xa(a[0], b);
        },
        getVisibleColumns: function(a, b) {
            return ya(a[0], b);
        },
        getHiddenColumnFields: function(a, b) {
            return za(a[0], b);
        },
        getVisibleColumnFields: function(a, b) {
            return Aa(a[0], b);
        },
        showRow: function(a, b) {
            return a.each(function() {
                Ba(this, b);
            });
        },
        hideRow: function(a, b) {
            return a.each(function() {
                Ca(this, b);
            });
        },
        showRows: function(a, b) {
            return a.each(function() {
                Da(this, b);
            });
        },
        hideRows: function(a, b) {
            return a.each(function() {
                Ea(this, b);
            });
        },
        getHiddenRows: function(a) {
            return Fa(a[0]);
        },
        getVisibleRows: function(a) {
            return Ga(a[0]);
        },
        highlightColumn: function(a, b) {
            return a.each(function() {
                Ja(this, b);
            });
        },
        livesearch: function(a, b) {
            return a.each(function() {
                Ka(this, b);
            });
        },
        hasMuliRowHeader: function(a) {
            return ba(a[0]);
        },
        findRow: function(a, b) {
            return da(a[0], b);
        },
        findRows: function(a, b) {
            return ca(a[0], b);
        },
        deleteRow: function(a, b) {
            return a.each(function() {
                fa(this, b);
            });
        },
        deleteRows: function(a, b) {
            return a.each(function() {
                ga(this, b);
            });
        },
        sort: function(a, b) {
            return a.each(function() {
                ja(this, b);
            });
        },
        setColumnTitle: function(a, b) {
            return a.each(function() {
                ha(this, b);
            });
        },
        setColumnWidth: function(a, b) {
            return a.each(function() {
                ia(this, b);
            });
        },
        setOffset: function(a, b) {
            return a.each(function() {
                ka(this, b);
            });
        },
        setColumnFilter: function(a, b) {
            return a.each(function() {
                Ha(this, b);
            });
        },
        columnFilterSelect: function(a, b) {
            return a.each(function() {
                Ia(this, b);
            });
        },
        exportExcel: function(a, b) {
            return a.each(function() {
                La(this, b);
            });
        }
    }, ib = a.fn.datagrid.extensions.defaults = {
        offset: null,
        loadFilter: Ya,
        autoBindDblClickRow: !0,
        dblClickRowMenuIndex: 0,
        exportMenu: !1,
        selectOnRowContextMenu: !1,
        hideDisabledMenu: !1,
        headerContextMenu: null,
        rowContextMenu: null,
        enableHeaderClickMenu: !0,
        enableHeaderContextMenu: !0,
        enableRowContextMenu: !1,
        moveMenu: !1,
        pagingMenu: !1,
        refreshMenu: !0,
        dndRow: !1,
        rowTooltip: !1,
        extEditing: !1,
        autoEditing: !1,
        singleEditing: !0,
        columnFilter: null,
        loader: Xa,
        keyboard: !1,
        onLoadSuccess: $a,
        onResizeColumn: ab,
        onBeforeEdit: cb,
        onAfterEdit: eb,
        onCancelEdit: gb,
        onBeforeDeleteColumn: function(a) {},
        onDeleteColumn: function(a) {},
        onBeforeMoveColumn: function(a, b, c) {},
        onMoveColumn: function(a, b, c) {},
        onBeforeDrop: function(a, b, c) {},
        onDrop: function(a, b, c) {},
        onBeforeDrag: function(a, b) {},
        onStartDrag: function(a, b) {},
        onStopDrag: function(a, b) {},
        onDragEnter: function(a, b) {},
        onDragOver: function(a, b) {},
        onDragLeave: function(a, b) {},
        onBeforeUpdateRow: function(a, b) {},
        onUpdateRow: function(a, b) {},
        onBeforeAppendRow: function(a) {},
        onAppendRow: function(a) {},
        onBeforeInsertRow: function(a, b) {},
        onBeforeRow: function(a, b) {}
    };
    a.extend(a.fn.datagrid.defaults, ib), a.extend(a.fn.datagrid.methods, hb);
    var jb = ".datagrid-rowediting-panel { position: absolute; display: block; border: 1px solid #ddd; padding: 5px 5px; }.datagrid-body td.datagrid-header-cell-top { border-top-color: red; border-top-width: 2px; border-top-style: dotted; }.datagrid-body td.datagrid-header-cell-bottom { border-bottom-color: red; border-bottom-width: 2px; border-bottom-style: dotted; }.datagrid-cell-hightlight { font-weight: bold; background-color: Yellow; }.datagrid-header-cell-arrow { float: right; cursor: pointer; border-left-style: dotted; display: none; border-left-width: 0px; }.datagrid-header-cell-arrow-fix { position: static; margin: 0; }.datagrid-header-cell-arrow-show { display: inline; border-left-width: 1px; }.datagrid-header-filter { text-align: center; overflow: auto; }.datagrid-header-filter-top { vertical-align: top; }.datagrid-header-filter-bottom { vertical-align: bottom; }.datagrid-header-filter-cell { white-space: nowrap; }.datagrid-header-filter-line { border-width: 0px; border-top-width: 1px; border-style: dotted; border-color: #ccc; margin-top: 3px; margin-bottom: 3px; }.datagrid-header-filter-container { padding-top: 5px; overflow: auto; font-size: 11px; text-align: left; }.datagrid-header-filter-livebox-text { margin-left: 10px; margin-top: 10px; overflow: auto; font-size: 11px; text-align: left; }.datagrid-header-filter-livebox { margin-left: 10px; width: 60px; height: 12px; font-size: 11px; }.datagrid-header-filter-item { overflow: hidden; padding: 0px; margin: 0px; cursor: pointer; white-space: nowrap; margin: 2px; }.datagrid-header-filter-item:hover { filter: alpha(opacity=60); opacity: 0.6; }.datagrid-header-filter-item-text { padding-left: 20px; float: left; }.datagrid-header-filter-item-icon { left: 2px; top: 50%; width: 16px; height: 16px; margin-top: -3px; }.datagrid-header-filter-itemwrap { overflow: hidden; padding-left: 5px; white-space: nowrap; height: 20px; }.datagrid-header-filter-slider { }.datagrid-header-filter-sliderwrap { overflow: hidden; padding-left: 30px; padding-top: 15px; }.datagrid-header-filter-sliderwrap .slider-rulelabel span { font-size: 11px; }.datagrid-header-filter-numeric { width: 60px; height: 12px; font-size: 11px; }";
    a.util.addCss(jb);
}(jQuery), $.extend($.fn.datagrid.defaults.editors, {
    datebox: {
        init: function(a, b) {
            var c = $('<input type="text">').appendTo(a);
            return c.datebox(b), c;
        },
        getValue: function(a) {
            return $(a).datebox("getValue");
        },
        setValue: function(a, b) {
            var c = function(a) {
                if (null == a || "" == a) return "";
                var b, c = /^(\d{4})(-|\/)(\d{1,2})(-|\/)\d{1,2}\s+\d{1,2}:\d{1,2}:\d{1,2}$/;
                if (a instanceof Date) b = a; else {
                    if (c.test(a)) {
                        var d = /^\d{4}(-|\/)\d{1,2}(-|\/)/;
                        return b = new Date(a.replace(d, RegExp.$1 + "/" + RegExp.$3 + "/")), b.format("yyyy-MM-dd hh:mm:ss");
                    }
                    b = new Date(a), isNaN(b) && (a = a.replace(/\/Date\((-?\d+)\)\//, "$1"), b = new Date(), 
                    b.setTime(a));
                }
                return b.format("yyyy-MM-dd");
            };
            $(a).datebox("setValue", c(b));
        },
        destroy: function(a) {
            $(a).datebox("destroy");
        },
        resize: function(a, b) {
            $(a).datebox("resize", b);
        }
    },
    textbutton: {
        init: function(a, b) {
            var c = $('<input type="text" class="datagrid-editable-input" />');
            return c.appendTo(a), c.iptSearch(b), c;
        },
        getValue: function(a) {
            return $(a).val();
        },
        setValue: function(a, b) {
            $(a).val(b);
        },
        resize: function(a, b) {
            $(a)._outerWidth(b)._outerHeight(22), $(a).parent()._outerWidth(b);
        }
    },
    readonlytext: {
        init: function(a, b) {
            var c = $('<input type="text" class="datagrid-editable-input readonly" readOnly="readOnly">');
            return c.appendTo(a), c;
        },
        getValue: function(a) {
            return $(a).val();
        },
        setValue: function(a, b) {
            $(a).val(b);
        },
        resize: function(a, b) {
            $(a)._outerWidth(b)._outerHeight(22), $(a).parent()._outerWidth(b);
        }
    },
    combogrid: {
        init: function(a, b) {
            var c = $('<input type="text" class="datagrid-editable-input">');
            return c.appendTo(a), c.combogrid(b), c;
        },
        destroy: function(a) {
            $(a).combogrid("destroy");
        },
        getValue: function(a) {
            return $(a).combogrid("getValue");
        },
        setValue: function(a, b) {
            $(a).combogrid("setValue", b);
        },
        resize: function(a, b) {
            $(a).combogrid("resize", b);
        }
    },
    combofilter: {
        init: function(a, b) {
            var c = $('<input type="text" />');
            c.appendTo(a), $.extend(b, {
                onHidePanel: function() {
                    var a = c.combogrid("options"), b = c.combogrid("grid"), d = b.datagrid("getSelected");
                    $.isFunction(a.onAfterPanel) && a.onAfterPanel.call(this, d);
                },
                onLoadSuccess: function(a) {
                    var b = c.combogrid("options"), d = c.combogrid("grid"), e = c.combogrid("getValue"), f = a.rows[0];
                    1 == a.total && f[b.textField] == e && d.datagrid("selectRow", 0);
                }
            });
            var d = $($("#dataGridDiv").length > 0 ? "#dataGridDiv" : DG_ID), e = d.datagrid("getSelected"), f = $("#combofilterParams").val(), g = "" == f ? {} : JSON.parse(f);
            return b.pagination = !1, b.queryParams = $.extend({
                q: e ? e[b.textField] : ""
            }, g), c.combogrid(b), c;
        },
        destroy: function(a) {
            $(a).combogrid("destroy");
        },
        getValue: function(a) {
            return $(a).combogrid("getValue");
        },
        setValue: function(a, b) {
            $(a).combogrid("setValue", b);
        },
        resize: function(a, b) {
            $(a).combogrid("resize", b);
        }
    }
}), function(a, b) {
    function c(a) {
        a._extensionsPanel = {
            href: a.href,
            content: a.content
        }, a.iniframe && (a.href = null, a.content = null);
    }
    function d(b) {
        var c = a(b), d = c.panel("options"), f = d._extensionsPanel ? d._extensionsPanel : d._extensionsPanel = {
            href: d.href,
            content: d.content
        };
        if (d.href = f.href, d.content = f.content, d.plain || d.fieldset) {
            c.addClass("plain clearfix");
            var g = a(c.parent(0));
            g.addClass("plain"), a("div.panel-tool:first", g).addClass("plain"), a("div.panel-header:first", g).addClass("plain"), 
            a("div.panel-title:first", g).addClass("plain"), a("div.panel-header:first", g).append('<div class="panel-header-line"></div>');
        }
        d.fieldset && (g.addClass("fieldset clearfix"), c.addClass("fieldset clearfix")), 
        d.fieldset && 0 == d.collapsible && (a("div.panel-title:first", g).css({
            "padding-left": "5px"
        }), a("div.panel-tool:first", g).remove()), d.fitWidth && !d.fit && c.addClass("fit-width"), 
        d.iniframe && e(b, d.href);
    }
    function e(b, c) {
        var d = a.util.parseJquery(b), e = d.panel("options");
        if (c = c ? e.href = c : e.href, e.iniframe) {
            var g = e._extensionsPanel ? e._extensionsPanel : e._extensionsPanel = {
                href: e.href,
                content: e.content
            };
            g.href = e.href, g.content = e.content, e.href = null, e.content = "<iframe class='panel-iframe' frameborder='0' width='100%' height='100%' marginwidth='0px' marginheight='0px' scrolling='auto'></iframe>", 
            t.call(d, d), e.href = g.href, e.content = g.content, f(b).attr("src", c);
        } else t.call(d, d, c);
    }
    function f(b) {
        var c = a.util.parseJquery(b), d = c.panel("body"), e = e || a.fn.datagrid.defaults.loadMsg;
        d.css("position", "relative");
        var f = (a('<div class="datagrid-mask" style="display:block;"></div>').appendTo(d), 
        a('<div class="datagrid-mask-msg" style="display:none; left: 50%;"></div>').html(e).appendTo(d));
        f.css("marginLeft", -f.outerWidth() / 2).show();
        var g = d.children("iframe.panel-iframe");
        return g.bind("load", function() {
            c.panel("body").children("div.datagrid-mask-msg").remove(), c.panel("body").children("div.datagrid-mask").remove(), 
            g.css({
                visibility: "visible"
            });
        }), g;
    }
    function g(b) {
        var c = a.util.parseJquery(b);
        if (!o(b)) return u.call(c, c);
        var d = c.panel("panel"), e = d.index(), f = d.closest(".tabs-container");
        return f.find(">div.tabs-header>div.tabs-wrap>ul.tabs>li").eq(e);
    }
    function h(b, c) {
        var d = a.util.parseJquery(b);
        if (!o(b)) return v.call(d, d, c);
        if (c) {
            var e = d.panel("options"), f = d.panel("header");
            e.title = c, f.find(">a.tabs-inner>span.tabs-title").text(c);
        }
    }
    a.fn.panel.extensions = {};
    var i = function() {
        a("iframe,frame", this).each(function() {
            try {
                this.contentWindow && this.contentWindow.document && this.contentWindow.close && (this.contentWindow.document.write(""), 
                this.contentWindow.close()), a.isFunction(window.CollectGarbage) && window.CollectGarbage();
            } catch (b) {}
        }).remove();
    };
    a.fn.panel.defaults.onBeforeDestroy = i, a.fn.window.defaults.onBeforeDestroy = i, 
    a.fn.dialog.defaults.onBeforeDestroy = i, a.fn.datagrid.defaults.onBeforeDestroy = i, 
    a.fn.propertygrid.defaults.onBeforeDestroy = i, a.fn.treegrid.defaults.onBeforeDestroy = i;
    var j = {
        panel: a.fn.panel.defaults.onResize,
        window: a.fn.window.defaults.onResize,
        dialog: a.fn.dialog.defaults.onResize
    }, k = function(b, c) {
        var d = a.util.parseJquery(this), e = d.panel("isWindow"), f = d.panel("isDialog"), g = f ? "dialog" : e ? "window" : "panel", h = j[g];
        if (a.isFunction(h) && h.apply(this, arguments), !d.panel("inLayout")) {
            var i = d.panel("options"), k = d.css("maxHeight");
            i.minWidth = a.isNumeric(i.minWidth) ? i.minWidth : x.minHeight, i.maxWidth = a.isNumeric(i.maxWidth) ? i.maxWidth : x.maxWidth, 
            i.minHeight = a.isNumeric(i.minHeight) ? i.minHeight : x.minHeight, i.maxHeight = k ? parseInt(k) : a.isNumeric(i.maxHeight) ? i.maxHeight : x.maxHeight;
            var l = !1;
            b > i.maxWidth && (b = i.maxWidth, l = !0), b < i.minWidth && (b = i.minWidth, l = !0), 
            c > i.maxHeight && (c = i.maxHeight, l = !0), c < i.minHeight && (c = i.minHeight, 
            l = !0), l && !i.fit && d[g]("resize", {
                width: b,
                height: c
            });
        }
    }, l = {
        panel: a.fn.panel.defaults.onMove,
        window: a.fn.window.defaults.onMove,
        dialog: a.fn.dialog.defaults.onMove
    }, m = function(b, c) {
        var d = a.util.parseJquery(this), e = d.panel("isWindow"), f = d.panel("isDialog"), g = f ? "dialog" : e ? "window" : "panel", h = l[g], i = d.panel("options");
        if (a.isFunction(h) && h.apply(this, arguments), i.maximized) return d[g]("restore");
        if (i.inContainer) {
            var j = d.panel("panel"), k = j.parent(), m = k.is("body"), n = a.extend({}, m ? a.util.windowSize() : {
                width: k.innerWidth(),
                height: k.innerHeight()
            }), o = a.isNumeric(i.width) ? i.width : j.outerWidth(), p = a.isNumeric(i.height) ? i.height : j.outerHeight(), q = !1;
            return 0 > b && (b = 0, q = !0), 0 > c && (c = 0, q = !0), q ? d[g]("move", {
                left: b,
                top: c
            }) : (b + o > n.width && b > 0 && (b = n.width - o, q = !0), c + p > n.height && c > 0 && (c = n.height - p, 
            q = !0), q ? d[g]("move", {
                left: b,
                top: c
            }) : void 0);
        }
    }, n = function(b) {
        var c = a.util.parseJquery(b), d = c.panel("body"), e = c.panel("panel");
        return d.hasClass("layout-body") && e.hasClass("layout-panel");
    }, o = function(b) {
        var c = a.util.parseJquery(b), d = c.panel("panel"), e = d.parent(), f = e.parent();
        return e.hasClass("tabs-panels") && f.hasClass("tabs-container");
    }, p = function(b) {
        var c = a.util.parseJquery(b), d = c.panel("panel"), e = d.parent();
        return e.hasClass("accordion") && a.data(e[0], "accordion") ? !0 : !1;
    }, q = function(b) {
        var c = a.util.parseJquery(b), d = c.panel("body");
        return d.hasClass("window-body") && d.parent().hasClass("window");
    }, r = function(b) {
        var c = a.util.parseJquery(b), d = c.panel("body");
        return q(b) && (d.children("div.panel").children("div.panel-body.dialog-content").length ? !0 : !1);
    }, s = a.fn.panel;
    a.fn.panel = function(b, e) {
        return "string" == typeof b ? s.apply(this, arguments) : (b = b || {}, this.each(function() {
            var e = a.util.parseJquery(this), f = a.extend({}, a.fn.panel.parseOptions(this), b);
            (f.plain || f.fieldset) && (f.collapsible = !0), c(f), s.call(e, f), d(this);
        }));
    }, a.union(a.fn.panel, s);
    var t = a.fn.panel.methods.refresh, u = a.fn.panel.methods.header, v = a.fn.panel.methods.setTitle, w = a.fn.panel.extensions.methods = {
        inLayout: function(a) {
            return n(a[0]);
        },
        inTabs: function(a) {
            return o(a[0]);
        },
        inAccordion: function(a) {
            return p(a[0]);
        },
        isWindow: function(a) {
            return q(a[0]);
        },
        isDialog: function(a) {
            return r(a[0]);
        },
        iframe: function(a) {
            return f(a[0]);
        },
        refresh: function(a, b) {
            return a.each(function() {
                e(this, b);
            });
        },
        header: function(a) {
            return g(a[0]);
        },
        setTitle: function(a, b) {
            return a.each(function() {
                h(this, b);
            });
        }
    }, x = a.fn.panel.extensions.defaults = {
        plain: !1,
        fieldset: !1,
        iniframe: !1,
        fitWidth: !1,
        minWidth: 0,
        maxWidth: 1e4,
        minHeight: 0,
        maxHeight: 1e4,
        onResize: k,
        inContainer: !0,
        onMove: m
    };
    a.extend(a.fn.panel.defaults, x), a.extend(a.fn.panel.methods, w);
    var y = "iframe.panel-iframe { margin: 0px; padding: 0px; width: 100%; height: 100%; border: 0px; overflow: auto; }";
    a.util.addCss(y);
}(jQuery), function(a, b) {
    var c = {}, d = function() {
        return a.apply(this, arguments);
    };
    d.fn = d.prototype = {}, d.easyui = c, c.getTopEasyuiMessager = function() {
        return a.util.isTopMost ? a.messager : a.util.$ && a.util.$.messager ? a.util.$.messager : a.messager;
    }, c.messager = c.getTopEasyuiMessager(), c.getTopEasyuiTooltip = function() {
        return a.util.isTopMost ? a.fn.tooltip : a.util.$ && a.util.$.fn && a.util.$.fn.tooltip ? a.util.$.fn.tooltip : a.fn.tooltip;
    }, c.tooltip = a.fn.tooltip, c.tooltip.init = function(b, c) {
        var d = a.util.parseJquery(b);
        d.mouseover(function() {
            d.tooltip(a.extend({
                trackMouse: !0
            }, c, {
                onHide: function() {
                    a.isFunction(c.onHide) && c.onHide.apply(this, arguments), d.tooltip("destroy");
                }
            })).tooltip("show");
        });
    };
    var e = {
        error: "messager-error",
        info: "messager-info",
        question: "messager-question",
        warning: "messager-warning"
    }, f = a.messager.show, g = a.messager.alert, h = a.messager.confirm, i = a.messager.prompt, j = {
        title: "操作提醒",
        confirm: "您确认要进行该操作？",
        prompt: "请输入相应内容：",
        icon: "info",
        loading: "正在加载，请稍等..."
    };
    a.messager.show = function(b) {
        var c = a.util.isString(b) || a.util.isBoolean(b) || a.isNumeric(b);
        if (c) return a.messager.show(1 == arguments.length ? {
            msg: String(b)
        } : {
            title: b,
            msg: arguments[1],
            icon: arguments[2],
            position: arguments[3]
        });
        var d = a.extend({}, a.messager.defaults, {
            title: "操作提醒",
            timeout: 4e3,
            showType: "slide"
        }), g = {
            topLeft: {
                right: "",
                left: 0,
                top: document.body.scrollTop + document.documentElement.scrollTop,
                bottom: ""
            },
            topCenter: {
                right: "",
                top: document.body.scrollTop + document.documentElement.scrollTop,
                bottom: ""
            },
            topRight: {
                left: "",
                right: 0,
                top: document.body.scrollTop + document.documentElement.scrollTop,
                bottom: ""
            },
            centerLeft: {
                left: 0,
                right: "",
                bottom: ""
            },
            center: {
                right: "",
                bottom: ""
            },
            centerRight: {
                left: "",
                right: 0,
                bottom: ""
            },
            bottomLeft: {
                left: 0,
                right: "",
                top: "",
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            },
            bottomCenter: {
                right: "",
                top: "",
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            },
            bottomRight: {
                left: "",
                right: 0,
                top: "",
                bottom: -document.body.scrollTop - document.documentElement.scrollTop
            }
        }, h = a.extend({}, d, b);
        h.style = g[b.position] ? g[b.position] : g.topCenter;
        var i = e[h.icon] ? e[h.icon] : e.info;
        return h.msg = "<div class='messager-icon " + i + "'></div><div>" + h.msg + "</div>", 
        f(h);
    }, a.union(a.messager.show, f), a.messager.alert = function(b, c, d, f) {
        return 1 == arguments.length ? g(j.title, arguments[0], j.icon) : 2 == arguments.length ? a.isFunction(arguments[1]) ? g(j.title, arguments[0], j.icon, arguments[1]) : arguments[1] in e ? g(j.title, arguments[0], arguments[1]) : g.apply(this, arguments) : 3 == arguments.length && a.isFunction(arguments[2]) ? arguments[1] in e ? g(j.title, arguments[0], arguments[1], arguments[2]) : g(arguments[0], arguments[1], j.icon, arguments[2]) : g.apply(this, arguments);
    }, a.messager.confirm = function(b, c, d) {
        return 1 == arguments.length ? a.isFunction(arguments[0]) ? h(j.title, j.confirm, arguments[0]) : h(j.title, arguments[0]) : 2 == arguments.length ? a.isFunction(arguments[1]) ? h(j.title, arguments[0], arguments[1]) : h(arguments[0], arguments[1]) : h.apply(this, arguments);
    }, a.messager.solicit = function(c, d, e) {
        var f = a.extend({}, 2 == arguments.length ? {
            title: j.title,
            msg: arguments[0],
            fn: arguments[1]
        } : {
            title: arguments[0],
            msg: arguments[1],
            fn: arguments[2]
        }), g = a.messager.confirm(f.title, f.msg, f.fn), h = g.window("options"), i = h.onClose;
        h.onClose = function() {
            a.isFunction(i) && i.apply(this, arguments), a.isFunction(f.fn) && f.fn.call(this, b);
        };
        var k = g.find(">div.messager-button").empty();
        return a("<a></a>").linkbutton({
            text: "是"
        }).css("margin-left", "10px").click(function() {
            h.onClose = i, g.window("close"), a.isFunction(f.fn) && f.fn.call(this, !0);
        }).appendTo(k), a("<a></a>").linkbutton({
            text: "否"
        }).css("margin-left", "10px").click(function() {
            h.onClose = i, g.window("close"), a.isFunction(f.fn) && f.fn.call(this, !1);
        }).appendTo(k), a("<a></a>").linkbutton({
            text: "取消"
        }).css("margin-left", "10px").click(function() {
            h.onClose = i, g.window("close"), a.isFunction(f.fn) && f.fn.call(this, b);
        }).appendTo(k), g;
    }, a.messager.prompt = function(b, c, d) {
        return 1 == arguments.length ? a.isFunction(arguments[0]) ? i(j.title, j.prompt, arguments[0]) : i(j.title, j.prompt) : 2 == arguments.length ? a.isFunction(arguments[1]) ? i(j.title, arguments[0], arguments[1]) : i(arguments[0], arguments[1]) : i.apply(this, arguments);
    }, c.loading = function(b) {
        var c = {
            msg: j.loading,
            locale: "body",
            topMost: !1
        };
        b = b || {}, a.extend(c, b);
        var d = c.topMost ? a.util.$ : a, e = d.util.parseJquery(c.locale), f = e.children().map(function() {
            var b = a(this).css("z-index");
            return a.isNumeric(b) ? parseInt(b) : 0;
        }), g = a.array.max(f);
        e.addClass("mask-container");
        var h = d("<div></div>").addClass("datagrid-mask").css({
            display: "block",
            "z-index": ++g
        }).appendTo(e), i = d("<div></div>").addClass("datagrid-mask-msg").css({
            display: "block",
            left: "50%",
            "z-index": ++g
        }).html(c.msg).appendTo(e);
        return i.css("marginLeft", -i.outerWidth() / 2), h.add(i);
    }, c.loaded = function(b, c) {
        var d = {
            locale: "body",
            topMost: !1
        };
        1 == arguments.length && (a.isPlainObject(arguments[0]) ? a.extend(d, arguments[0]) : a.util.isBoolean(arguments[0]) ? d.topMost = arguments[0] : d.locale = arguments[0]), 
        2 == arguments.length && (a.util.isBoolean(arguments[0]) ? a.extend(d, {
            locale: arguments[1],
            topMost: arguments[0]
        }) : a.extend(d, {
            locale: arguments[0],
            topMost: arguments[1]
        }));
        var e = d.topMost ? a.util.$ : a, b = e.util.parseJquery(d.locale);
        b.removeClass("mask-container"), b.children("div.datagrid-mask-msg,div.datagrid-mask").remove();
    }, a.extend(a.fn.panel.defaults, {
        loadingMessage: j.loading
    }), a.extend(a.fn.window.defaults, {
        loadingMessage: j.loading
    }), a.extend(a.fn.dialog.defaults, {
        loadingMessage: j.loading
    }), a.extend(a.fn.combo.defaults, {
        missingMessage: a.fn.validatebox.defaults.missingMessage
    }), c.ajaxError = function(b) {
        return arguments.length ? (a.fn.form.defaults.onLoadError = b, a.fn.combobox.defaults.onLoadError = b, 
        a.fn.combotree.defaults.onLoadError = b, a.fn.combogrid.defaults.onLoadError = b, 
        a.fn.datagrid.defaults.onLoadError = b, a.fn.datagrid.defaults.onLoadError.pluginName = "datagrid", 
        a.fn.propertygrid.defaults.onLoadError = b, a.fn.tree.defaults.onLoadError = b, 
        a.fn.treegrid.defaults.onLoadError = b, void a.ajaxSetup({
            error: b
        })) : a.fn.form.defaults.onLoadError;
    };
    var k = function(b, d, e) {
        window.console && window.console.error && window.console.error(e), a.messager.progress("close");
        var f = /(?=\<.*?DOCTYPE)/, g = f.test(b.responseText) && "datagrid" == arguments.callee.pluginName;
        if (g) {
            a(this).datagrid("options");
        }
        c.messager != a.messager && c.messager.progress("close");
        var h = b && !a.string.isNullOrWhiteSpace(b.responseText) ? g ? "<iframe name='error-message' frameborder='0' width='100%' height='400' marginwidth='0px' marginheight='0px' scrolling='auto'></iframe>" : '<div class="error-message-title">如果该问题重复出现，请联系您的系统管理员并反馈该故障。<br />错误号：' + b.status + "(" + b.statusText + ')；</div><div class="error-message-content"><hr />' + b.responseText + "</div>" : "系统出现了一个未指明的错误，如果该问题重复出现，请联系您的系统管理员并反馈该故障。";
        if (h.indexOf("lgn-form") >= 0) return c.messager.alert("错误提醒", "登录超时，请重新登录！", "error"), 
        void (top.location.href = location.href);
        var i = g ? c.messager.alert("错误提醒", h, "") : c.messager.alert("错误提醒", h, "error"), j = (i.window("options"), 
        i.window("panel")), k = j.outerWidth(), l = j.outerHeight();
        if (g) {
            var g = top.frames["error-message"];
            g.document.open(), g.document.write(b.responseText), g.document.close(), i.window("resize", {
                width: 800
            });
        } else {
            var m = (a(window).width() - 20, a(window).height() - 200);
            (500 > k || l > m) && i.window("resize", {
                width: 500 > k ? 500 : k,
                height: l > m ? m : l
            });
        }
        i.window("center"), a(".error-message-title").click(function() {
            var b = j.outerWidth(), c = j.outerHeight(), d = a(this).siblings(".error-message-content"), e = 200, f = 300;
            d.is(":hidden") ? (b += e, c += f, a(this).addClass("active"), d.show()) : (b -= e, 
            c -= f, a(this).removeClass("active"), d.hide()), i.window("resize", {
                width: b,
                height: c
            }), i.window("center");
        });
    };
    c.ajaxError(k), a.ajaxSetup({
        dataFilter: function(b, c) {
            return a.util.isString(c) && "json" == c.toLowerCase(c) ? a.string.toJSONString(b) : b;
        }
    }), d.fn.isEasyUI = function(b) {
        if (a.array.contains(a.parser.plugins, b) || a.error(a.string.format("传入的参数 pluginName: {0} 不是 easyui 插件名。")), 
        !this.length) return !1;
        var c = a.data(this[0], b);
        return c && c.options ? !0 : !1;
    }, c.isEasyUI = function(b, c) {
        return a.util.parseJquery(b).isEasyUI(c);
    }, d.fn.currentPagination = function() {
        for (var b = this.closest(".pagination"); b.length && !a.data(b[0], "pagination"); ) b = b.parent().closest(".pagination");
        return b;
    }, d.fn.currentProgressbar = function() {
        for (var b = this.closest(".progressbar"); b.length && !a.data(b[0], "progressbar"); ) b = b.parent().closest(".progressbar");
        return b;
    }, d.fn.currentPanel = function() {
        for (var b = this.closest(".panel-body"); b.length && !a.data(b[0], "panel"); ) b = b.parent().closest(".panel-body");
        return b;
    }, d.fn.currentTabPanel = function() {
        for (var b = this.closest(".panel-body"), c = b.parent(), d = c.parent(), e = d.parent(); b.length && !(a.data(b[0], "panel") && c.hasClass("panel") && d.hasClass("tabs-panels") && e.hasClass("tabs-container")); ) b = b.parent().closest(".panel-body"), 
        c = b.parent(), d = c.parent(), e = d.parent();
        return b;
    }, d.fn.currentTabIndex = function() {
        var a = this.currentTabPanel();
        return a.length ? a.panel("panel").index() : -1;
    }, d.fn.currentTabs = function() {
        for (var b = this.closest(".tabs-container"); b.length && !a.data(b[0], "tabs"); ) b = b.parent().closest(".tabs-container");
        return b;
    }, d.fn.currentAccordion = function() {
        for (var b = this.closest(".accordion"); b.length && !a.data(b[0], "accordion"); ) b = b.parent().closest(".accordion");
        return b;
    }, d.fn.currentAccPanel = function() {
        for (var b = this.closest(".panel-body"), c = b.parent(), d = panels.parent(); b.length && !(a.data(b[0], "panel") && c.hasClass("panel") && d.hasClass("accordion") && a.data(d[0], "accordion")); ) b = b.parent().closest(".panel-body"), 
        c = b.parent(), d = panels.parent();
        return b;
    }, d.fn.currentLayout = function() {
        for (var b = this.closest(".layout"); b.length && !a.data(b[0], "layout"); ) b = b.closest(".layout");
        return b;
    }, d.fn.currentRegion = function() {
        for (var b = this.closest(".panel.layout-panel"), c = b.parent(), d = b.children(".panel-body"); b.length && (!c.hasClass("layout") || !a.data(d[0], "panel")); ) b = b.parent().closest(".panel.layout-panel"), 
        c = b.parent(), d = b.children(".panel-body");
        return d;
    }, d.fn.currentLinkbutton = function() {
        for (var b = this.closest(".l-btn"); b.length && !a.data(b[0], "linkbutton"); ) b = b.parent().closest(".layout");
        return b;
    }, d.fn.currentCalendar = function() {
        for (var b = this.closest(".calendar"); b.length && !a.data(b[0], "calendar"); ) b = b.parent().closest(".calendar");
        return b;
    }, d.fn.currentWindow = function() {
        for (var b = this.closest(".panel-body.window-body"); b.length && !a.data(b[0], "window"); ) b = b.parent().closest(".panel-body.window-body");
        return b;
    }, d.fn.currentDialog = function() {
        for (var b = this.closest(".panel-body.window-body"); b.length && !a.data(b[0], "dialog"); ) b = b.parent().closest(".panel-body.window-body");
        return b;
    }, d.fn.currentDatagrid = function() {
        for (var b = this.closest(".datagrid-wrap.panel-body"), c = b.find(">.datagrid-view>eq(2)"); b.length && !a.data(c[0], "datagrid"); ) b = b.parent().closest(".datagrid-wrap.panel-body"), 
        c = b.find(">.datagrid-view>eq(2)");
        return c;
    }, d.fn.currentPropertygrid = function() {
        for (var b = this.closest(".datagrid-wrap.panel-body"), c = b.find(">.datagrid-view>eq(2)"); b.length && !a.data(c[0], "propertygrid"); ) b = b.parent().closest(".datagrid-wrap.panel-body"), 
        c = b.find(">.datagrid-view>eq(2)");
        return c;
    }, d.fn.currentTree = function() {
        for (var b = this.closest(".tree"); b.length && !a.data(b[0], "tree"); ) b = b.parent().closest(".tree");
        return b;
    }, d.fn.currentTreegrid = function() {
        for (var b = this.closest(".datagrid-wrap.panel-body"), c = b.find(">.datagrid-view>eq(2)"); b.length && !a.data(c[0], "treegrid"); ) b = b.parent().closest(".datagrid-wrap.panel-body"), 
        c = b.find(">.datagrid-view>eq(2)");
        return c;
    }, a.union(d), a.fn.union(d.fn);
    var l = ".mask-container { position: relative; }";
    a.util.addCss(l);
}(jQuery), function($, undefined) {
    function init(a) {
        function b(c) {
            var d = [];
            return c.addClass("menu"), d.push(c), c.hasClass("menu-content") || c.children("div").each(function() {
                var c = $(this).children("div");
                if (c.length) {
                    c.insertAfter(a), this.submenu = c;
                    var e = b(c);
                    d = d.concat(e);
                }
            }), d;
        }
        function c(b) {
            var c = $.parser.parseOptions(b[0], [ "width" ]).width;
            b.hasClass("menu-content") ? b[0].originalWidth = c || b._outerWidth() : (b[0].originalWidth = c || 0, 
            b.children("div").each(function() {
                var b = $(this);
                if (b.hasClass("menu-sep")) ; else {
                    var c = $.extend({
                        hideOnClick: !0
                    }, $.parser.parseOptions(this, [ "name", "iconCls", "href", {
                        hideOnClick: "boolean"
                    } ]), {
                        disabled: b.attr("disabled") ? !0 : undefined
                    });
                    b[0].itemName = c.name || "", b[0].itemHref = c.href || "", b[0].hideOnClick = c.hideOnClick == undefined || null == c.hideOnClick ? !0 : c.hideOnClick;
                    var d = b.addClass("menu-item").html();
                    b.empty().append($('<div class="menu-text"></div>').html(d)), c.iconCls && $('<div class="menu-icon"></div>').addClass(c.iconCls).appendTo(b), 
                    c.disabled && setDisabled(a, b[0], !0), b[0].submenu && $('<div class="menu-rightarrow"></div>').appendTo(b), 
                    bindMenuItemEvent(a, b);
                }
            }), $('<div class="menu-line"></div>').prependTo(b)), setMenuWidth(a, b), b.hide(), 
            bindMenuEvent(a, b);
        }
        var d = $(a).appendTo("body").addClass("menu-top");
        $(document).unbind(".menu").bind("mousedown.menu", function(a) {
            var b = $("body>div.menu:visible"), c = $(a.target).closest("div.menu", b);
            c.length || $("body>div.menu-top:visible").menu("hide");
        });
        for (var e = b(d), f = 0; f < e.length; f++) c(e[f]);
    }
    function setMenuWidth(a, b) {
        var c = $.data(a, "menu").options, d = b.css("display");
        b.css({
            display: "block",
            left: -1e4
        });
        var e = 0;
        b.find("div.menu-text").each(function() {
            var a = $(this);
            e < a._outerWidth() && (e = a._outerWidth()), a.closest("div.menu-item")._outerHeight(a._outerHeight() + 2);
        }), e += 65, b._outerWidth(Math.max(b[0].originalWidth || 0, e, c.minWidth)), b.css("display", d);
    }
    function bindMenuEvent(a, b) {
        var c = $.data(a, "menu"), d = c.options;
        d.hideOnMouseLeave && b.unbind(".menu").bind("mouseenter.menu", function() {
            c.timer && (clearTimeout(c.timer), c.timer = null);
        }).bind("mouseleave.menu", function() {
            c.timer = setTimeout(function() {
                hideAll(a);
            }, 100);
        });
    }
    function bindMenuItemEvent(a, b) {
        b.unbind(".menu"), b.bind("click.menu", function() {
            var b = $(this);
            if (!b.hasClass("menu-item-disabled")) {
                if (!this.submenu) {
                    this.hideOnClick && hideAll(a);
                    var c = b.attr("href");
                    c && (location.href = c);
                }
                var d = $(a).menu("getItem", this);
                $.data(a, "menu").options.onClick.call(a, d);
            }
        }).bind("mouseenter.menu", function(c) {
            if (b.siblings().each(function() {
                this.submenu && hideMenu(this.submenu), $(this).removeClass("menu-active");
            }), b.addClass("menu-active"), $(this).hasClass("menu-item-disabled")) return void b.addClass("menu-active-disabled");
            var d = b[0].submenu;
            d && $(a).menu("show", {
                menu: d,
                parent: b
            });
        }).bind("mouseleave.menu", function(a) {
            b.removeClass("menu-active menu-active-disabled");
            var c = b[0].submenu;
            c ? a.pageX >= parseInt(c.css("left")) ? b.addClass("menu-active") : hideMenu(c) : b.removeClass("menu-active");
        });
    }
    function hideAll(a) {
        var b = $.data(a, "menu");
        return b && $(a).is(":visible") && (hideMenu($(a)), b.options.onHide.call(a)), !1;
    }
    function showMenu(a, b) {
        var c, d;
        b = b || {};
        var e = $(b.menu || a);
        if (e.hasClass("menu-top")) {
            var f = $.data(a, "menu").options;
            if ($.extend(f, b), c = f.left, d = f.top, f.alignTo) {
                var g = $(f.alignTo);
                c = g.offset().left, d = g.offset().top + g._outerHeight();
            }
            c + e.outerWidth() > $(window)._outerWidth() + $(document)._scrollLeft() && (c = $(window)._outerWidth() + $(document).scrollLeft() - e.outerWidth() - 5), 
            d + e.outerHeight() > $(window)._outerHeight() + $(document).scrollTop() && (d -= e.outerHeight());
        } else {
            var h = b.parent;
            c = h.offset().left + h.outerWidth() - 2, c + e.outerWidth() + 5 > $(window)._outerWidth() + $(document).scrollLeft() && (c = h.offset().left - e.outerWidth() + 2);
            var d = h.offset().top - 3;
            d + e.outerHeight() > $(window)._outerHeight() + $(document).scrollTop() && (d = $(window)._outerHeight() + $(document).scrollTop() - e.outerHeight() - 5);
        }
        var i = $("body").height() - 10, j = e.outerHeight();
        e.css({
            left: c,
            top: d > 0 ? d : 0,
            height: j > i ? i : "auto",
            "overflow-y": j > i ? "auto" : "hidden"
        }), e.show(0, function() {
            e[0].shadow || (e[0].shadow = $('<div class="menu-shadow"></div>').insertAfter(e)), 
            e[0].shadow.css({
                display: "block",
                zIndex: $.fn.menu.defaults.zIndex++,
                left: e.css("left"),
                top: e.css("top"),
                width: e.outerWidth(),
                height: e.outerHeight()
            }), e.css("z-index", $.fn.menu.defaults.zIndex++), e.hasClass("menu-top") && $.data(e[0], "menu").options.onShow.call(e[0]);
        });
    }
    function hideMenu(a) {
        function b(a) {
            a.stop(!0, !0), a[0].shadow && a[0].shadow.hide(), a.hide();
        }
        a && (b(a), a.find("div.menu-item").each(function() {
            this.submenu && hideMenu(this.submenu), $(this).removeClass("menu-active");
        }));
    }
    function findItem(a, b) {
        function c(f) {
            f.children("div.menu-item").each(function() {
                var f = $(a).menu("getItem", this), g = e.empty().html(f.text).text();
                b == $.trim(g) ? d = f : this.submenu && !d && c(this.submenu);
            });
        }
        var d = null, e = $("<div></div>");
        return c($(a)), e.remove(), d;
    }
    function setDisabled(a, b, c) {
        var d = $(b);
        c ? (d.addClass("menu-item-disabled"), b.onclick && (b.onclick1 = b.onclick, b.onclick = null)) : (d.removeClass("menu-item-disabled"), 
        b.onclick1 && (b.onclick = b.onclick1, b.onclick1 = null));
    }
    function appendItem(target, param) {
        var menu = $(target);
        if (param.parent) {
            if (!param.parent.submenu) {
                var submenu = $('<div class="menu"><div class="menu-line"></div></div>').appendTo("body");
                submenu.hide(), param.parent.submenu = submenu, $('<div class="menu-rightarrow"></div>').appendTo(param.parent);
            }
            menu = param.parent.submenu;
        }
        var item = $('<div class="menu-item"></div>').appendTo(menu);
        $('<div class="menu-text"></div>').html(param.text).appendTo(item), param.iconCls && $('<div class="menu-icon"></div>').addClass(param.iconCls).appendTo(item), 
        param.id && item.attr("id", param.id), param.name && (item[0].itemName = param.name), 
        param.href && (item[0].itemHref = param.href), param.onclick && ("string" == typeof param.onclick ? item.attr("onclick", param.onclick) : item[0].onclick = eval(param.onclick)), 
        param.handler && (item[0].onclick = eval(param.handler)), bindMenuItemEvent(target, item), 
        param.disabled && setDisabled(target, item[0], !0), bindMenuEvent(target, menu), 
        setMenuWidth(target, menu);
    }
    function removeItem(a, b) {
        function c(a) {
            if (a.submenu) {
                a.submenu.children("div.menu-item").each(function() {
                    c(this);
                });
                var b = a.submenu[0].shadow;
                b && b.remove(), a.submenu.remove();
            }
            $(a).remove();
        }
        c(b);
    }
    function destroyMenu(a) {
        $(a).children("div.menu-item").each(function() {
            removeItem(a, this);
        }), a.shadow && a.shadow.remove(), $(a).remove();
    }
    $.fn.menu = function(a, b) {
        return "string" == typeof a ? $.fn.menu.methods[a](this, b) : (a = a || {}, this.each(function() {
            var b = $.data(this, "menu");
            b ? $.extend(b.options, a) : (b = $.data(this, "menu", {
                options: $.extend({}, $.fn.menu.defaults, $.fn.menu.parseOptions(this), a)
            }), init(this)), $(this).css({
                left: b.options.left,
                top: b.options.top
            });
        }));
    }, $.fn.menu.methods = {
        options: function(a) {
            return $.data(a[0], "menu").options;
        },
        show: function(a, b) {
            return a.each(function() {
                showMenu(this, b);
            });
        },
        hide: function(a) {
            return a.each(function() {
                hideAll(this);
            });
        },
        destroy: function(a) {
            return a.each(function() {
                destroyMenu(this);
            });
        },
        setText: function(a, b) {
            return a.each(function() {
                $(b.target).children("div.menu-text").html(b.text);
            });
        },
        setIcon: function(a, b) {
            return a.each(function() {
                var a = $(this).menu("getItem", b.target);
                a.iconCls ? $(a.target).children("div.menu-icon").removeClass(a.iconCls).addClass(b.iconCls) : $('<div class="menu-icon"></div>').addClass(b.iconCls).appendTo(b.target);
            });
        },
        getItem: function(a, b) {
            var c = $(b), d = {
                target: b,
                id: c.attr("id"),
                text: $.trim(c.children("div.menu-text").html()),
                disabled: c.hasClass("menu-item-disabled"),
                name: b.itemName,
                href: b.itemHref,
                hideOnClick: b.hideOnClick,
                onclick: b.onclick
            }, e = c.children("div.menu-icon");
            if (e.length) {
                for (var f = [], g = e.attr("class").split(" "), h = 0; h < g.length; h++) "menu-icon" != g[h] && f.push(g[h]);
                d.iconCls = f.join(" ");
            }
            return d;
        },
        findItem: function(a, b) {
            return findItem(a[0], b);
        },
        appendItem: function(a, b) {
            return a.each(function() {
                appendItem(this, b);
            });
        },
        removeItem: function(a, b) {
            return a.each(function() {
                removeItem(this, b);
            });
        },
        enableItem: function(a, b) {
            return a.each(function() {
                setDisabled(this, b, !1);
            });
        },
        disableItem: function(a, b) {
            return a.each(function() {
                setDisabled(this, b, !0);
            });
        }
    }, $.fn.menu.parseOptions = function(a) {
        return $.extend({}, $.parser.parseOptions(a, [ "left", "top", {
            minWidth: "number",
            hideOnMouseLeave: "boolean"
        } ]));
    }, $.fn.menu.defaults = {
        zIndex: 11e4,
        left: 0,
        top: 0,
        minWidth: 120,
        onShow: function() {},
        onHide: function() {},
        onClick: function(a) {},
        hideOnMouseLeave: !0
    };
    var buildMenu = function(a) {
        var b = $.util.guid("N", 12), c = "easyui_menu_id_" + b, d = "easyui_menu_name_" + b, e = $.extend({}, $.fn.menu.defaults, {
            id: c,
            name: d,
            left: window.event ? window.event.clientX : 0,
            top: window.event ? window.event.clientY : 0,
            items: null,
            hideDisabledMenu: !1,
            hideOnMouseLeave: !1,
            minWidth: 140
        }, a || {});
        e.items = $.array.isArray(e.items) ? e.items : [];
        var f = $("<div></div>").attr({
            id: c,
            name: d
        }).appendTo("body");
        return e.items.length || e.items.push({
            text: "当前无菜单项",
            disabled: !0
        }), $.each(e.items, function(a, b) {
            e.hideDisabledMenu && b.disabled || appendItemToMenu(f, b, c, f);
        }), {
            menu: f,
            options: e
        };
    }, appendItemToMenu = function(a, b, c, d) {
        if ($.util.isString(b) && "-" == $.trim(b)) return void $("<div></div>").addClass("menu-sep").appendTo(a);
        var e = $.util.guid("N", 12), f = c + "_" + e;
        b = b || {}, b = $.extend({
            id: f,
            text: "",
            iconCls: null,
            href: null,
            disabled: !1,
            onclick: null,
            handler: null,
            bold: !1,
            style: null,
            children: null,
            hideDisabledMenu: !1,
            hideOnClick: !0
        }, b);
        var g = b.onclick, h = b.handler;
        if (b.onclick = undefined, b.handler = undefined, b = $.util.parseMapFunction(b), 
        b.onclick = g, b.handler = h, !b.hideDisabledMenu || !b.disabled) {
            var i = $("<div></div>").attr({
                id: b.id,
                iconCls: b.iconCls,
                href: b.href,
                disabled: b.disabled,
                hideOnClick: b.hideOnClick
            }).appendTo(a);
            if (b.style && i.css(b.style), $.isFunction(b.handler)) {
                var h = b.handler;
                b.onclick = function(a, b, c) {
                    h.call(this, a, b, c);
                };
            }
            $.isFunction(b.onclick) && i.click(function(a) {
                i.hasClass("menu-item-disabled") || b.onclick.call(this, a, b, d);
            });
            var j = b.children && b.children.length ? !0 : !1, k = $("<span></span>").html(b.text).appendTo(i);
            if (b.bold && k.css("font-weight", "bold"), j) {
                var l = $("<div></div>").appendTo(i);
                $.each(b.children, function(a, c) {
                    var e = $.util.isString(c) && "-" == $.trim(c) ? c : $.extend({
                        hideDisabledMenu: b.hideDisabledMenu
                    }, c);
                    appendItemToMenu(l, e, f, d);
                });
            }
        }
    };
    $.extend($.easyui, {
        createMenu: buildMenu,
        showMenu: function(a) {
            var b = a || {}, c = $.fn.menu.defaults.onHide, d = b.onHide;
            b.onHide = function() {
                var a = $.util.parseJquery(this);
                $.isFunction(c) && c.apply(this, arguments), $.isFunction(d) && d.apply(this, arguments), 
                $.util.exec(function() {
                    a.menu("destroy");
                });
            };
            var e = buildMenu(b);
            return e.menu.menu(e.options).menu("show", {
                left: e.options.left,
                top: e.options.top
            }), e.menu;
        }
    });
}(jQuery), function(a) {
    scrollMenu = {
        init: function(a, b) {
            this.opts = b, this.menu = a, this.initNav(), this.setWidth(), this.bindEvents();
        },
        initNav: function() {
            var b = this;
            a(b.menu).addClass("scrollmenu").css({
                position: "relative",
                height: b.opts.height + "px",
                overflow: "hidden"
            }), a(b.menu).wrapInner('<div class="' + b.opts.content + '"></div>'), a("." + b.opts.content).wrap('<div class="' + b.opts.container + '"></div>');
            var c = a('<div class="scrollmenu-arrow scrollmenu-arrow-l"></div>'), d = a('<div class="scrollmenu-arrow scrollmenu-arrow-r"></div>');
            a("." + b.opts.container).after(d).after(c);
        },
        setWidth: function() {
            var b = this, c = a(window).width(), d = a(b.menu).parent().siblings(".logo").outerWidth(), e = 100, f = c - d - e, g = a("." + b.opts.content).width();
            return b.opts.menuBar && (a(b.menu).addClass("menuBar"), f = c), g > f ? (a("." + b.opts.content).css({
                position: "absolute",
                left: "0",
                top: "0",
                "z-index": "5",
                "white-space": "nowrap"
            }), a("." + b.opts.container).css({
                position: "relative",
                height: b.opts.height + "px",
                margin: "0 20px",
                overflow: "hidden"
            }), b.opts.menuBar || a(b.menu).css({
                width: f + "px"
            }), a(".scrollmenu-arrow-r").show(), void 0) : (a("." + b.opts.container).css({
                margin: "0"
            }), b.opts.menuBar || a(b.menu).css({
                width: g + "px"
            }), a(".scrollmenu-arrow").hide(), !1);
        },
        bindEvents: function() {
            var b = this;
            a(".scrollmenu").on("click", ".scrollmenu-arrow-l", function() {
                b.move("right");
            }), a(".scrollmenu").on("click", ".scrollmenu-arrow-r", function() {
                b.move("left");
            }), a(window).resize(function() {
                setTimeout(function() {
                    b.setWidth();
                }, 200);
                var c = a("." + b.opts.content).width(), d = a(b.menu).width();
                c > d && b.move("right");
            });
        },
        move: function(b) {
            var c = this, d = a("." + c.opts.content), e = a(".scrollmenu-arrow-l", c.menu), f = a(".scrollmenu-arrow-r", c.menu), g = d.outerWidth(), h = a("." + c.opts.container).width(), i = d.position().left, j = Math.abs(i), k = c.opts.distance, l = g - Math.abs(i) - h;
            return "left" == b && (k > l && (k = l, f.hide()), k = i - k), "right" == b && (k > j && (k = j), 
            k = i + k), 0 == k && (e.hide(), f.show()), 0 >= l && f.show(), 0 > k && e.show(), 
            d.is(":animated") ? !1 : void d.animate({
                left: k + "px"
            }, c.opts.speed);
        }
    }, a.fn.scrollmenu = function(b) {
        var b = a.extend({}, a.fn.scrollmenu.defaults, b);
        this.each(function() {
            scrollMenu.init(this, b);
        });
    }, a.fn.scrollmenu.defaults = {
        container: "scrollmenu-inner",
        content: "scrollmenu-content",
        menuBar: !1,
        height: 30,
        speed: 600,
        distance: 200,
        delay: 20
    };
}(jQuery), function(a) {
    function b(b) {
        var d = a(b).subsystem("options");
        a(b).addClass(d.headCls), d.loader.call(b, d.queryParams, function(a) {
            c(b, a);
        });
    }
    function c(b, c) {
        var d = a.data(b, "subsystem"), e = d.options;
        0 == a("#subSystem").length && a(b).append('<div id="subSystem">'), buildSubSysCommon(c), 
        a("#subSystem").find('a[data-toggle="subSystem"]').each(function(b, c) {
            a(c).addClass(e.linkCls);
        });
    }
    function d(b, d, e, f) {
        var g = a.data(b, "subsystem").options;
        d && (g.url = d), e = a.extend({}, g.queryParams, e || {}), g.loader.call(b, e, function(a) {
            c(b, a);
        });
    }
    a.fn.subsystem = function(c, d) {
        if ("string" == typeof c) {
            var e = a.fn.subsystem.methods[c];
            if (e) return e(this, d);
        }
        return c = c || {}, this.each(function() {
            var d = a.data(this, "subsystem");
            d ? a.extend(opt.options, c) : (a.data(this, "subsystem", {
                options: a.extend({}, a.fn.subsystem.defaults, a.fn.subsystem.parseOptions(this), c)
            }), b(this));
        });
    }, a.fn.subsystem.parseOptions = function(b) {
        a(b);
        return a.extend({}, a.parser.parseOptions(b));
    }, a.fn.subsystem.methods = {
        options: function(b) {
            return a.data(b[0], "subsystem").options;
        },
        loadData: function(a, b) {
            return a.each(function() {
                c(this, b);
            });
        },
        reload: function(b, c) {
            return b.each(function() {
                if ("string" == typeof c) d(this, c); else {
                    if (c) {
                        var b = a(this).subsystem("options");
                        b.queryParams = c;
                    }
                    d(this);
                }
            });
        }
    }, a.fn.subsystem.defaults = {
        scroll: !1,
        headCls: "",
        linkCls: "",
        queryParams: {},
        method: "GET",
        loader: function(b, c) {
            var d = a(this).subsystem("options");
            return d.url ? void a.ajax({
                type: d.method,
                url: d.url,
                data: b,
                dataType: "json",
                success: function(a) {
                    c(a);
                }
            }) : !1;
        }
    };
}(jQuery), $.fn.pagination && ($.fn.pagination.defaults.beforePageText = "第", $.fn.pagination.defaults.afterPageText = "共{pages}页", 
$.fn.pagination.defaults.displayMsg = "显示{from}到{to},共{total}记录"), $.fn.datagrid && ($.fn.datagrid.defaults.loadMsg = "正在处理，请稍待。。。"), 
$.fn.treegrid && $.fn.datagrid && ($.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg), 
$.messager && ($.messager.defaults.ok = "确定", $.messager.defaults.cancel = "取消"), 
$.map([ "validatebox", "textbox", "filebox", "searchbox", "combo", "combobox", "combogrid", "combotree", "datebox", "datetimebox", "numberbox", "spinner", "numberspinner", "timespinner", "datetimespinner" ], function(a) {
    $.fn[a] && ($.fn[a].defaults.missingMessage = "该输入项为必输项");
}), $.fn.validatebox && ($.fn.validatebox.defaults.rules.email.message = "请输入有效的电子邮件地址", 
$.fn.validatebox.defaults.rules.url.message = "请输入有效的URL地址", $.fn.validatebox.defaults.rules.length.message = "输入内容长度必须介于{0}和{1}之间", 
$.fn.validatebox.defaults.rules.remote.message = "请修正该字段"), $.fn.calendar && ($.fn.calendar.defaults.weeks = [ "日", "一", "二", "三", "四", "五", "六" ], 
$.fn.calendar.defaults.months = [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ]), 
$.fn.datebox && ($.fn.datebox.defaults.currentText = "今天", $.fn.datebox.defaults.closeText = "关闭", 
$.fn.datebox.defaults.okText = "确定", $.fn.datebox.defaults.formatter = function(a) {
    var b = a.getFullYear(), c = a.getMonth() + 1, d = a.getDate();
    return b + "-" + (10 > c ? "0" + c : c) + "-" + (10 > d ? "0" + d : d);
}, $.fn.datebox.defaults.parser = function(a) {
    if (!a) return new Date();
    var b = a.split("-"), c = parseInt(b[0], 10), d = parseInt(b[1], 10), e = parseInt(b[2], 10);
    return isNaN(c) || isNaN(d) || isNaN(e) ? new Date() : new Date(c, d - 1, e);
}), $.fn.datetimebox && $.fn.datebox && $.extend($.fn.datetimebox.defaults, {
    currentText: $.fn.datebox.defaults.currentText,
    closeText: $.fn.datebox.defaults.closeText,
    okText: $.fn.datebox.defaults.okText
}), $.fn.datetimespinner && ($.fn.datetimespinner.defaults.selections = [ [ 0, 4 ], [ 5, 7 ], [ 8, 10 ], [ 11, 13 ], [ 14, 16 ], [ 17, 19 ] ]);