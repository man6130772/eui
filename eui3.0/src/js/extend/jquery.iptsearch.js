(function($) {

    function init(target) {
        var opts = $.data(target, 'iptsearch').options;
        var _clickFn = opts.clickFn;
        var _width = opts.width;
        var _offsetWidth = opts.offsetWidth;
        var _div = $('<div>').addClass("ipt-search-box").width(_width + _offsetWidth);
        var _i = $('<i>');

        $(target).wrap(_div).after(_i);
        $(target).width(_width);

        if(opts.readonly||opts.disabled){
            $(target).attr('readonly', true);
        }
        if(opts.disabled){
            $(target).addClass("disabled");
        }
        if(opts.resizeable){
            $(target).iptSearch('resize');
        }
        if(opts.validatebox){
            $(target).validatebox(opts.validatebox.options||{});
        }
        if(opts.enterKey){
            $(target).bind('keydown', function(e){
                switch(e.keyCode){
                    case 13:
                        e.stopPropagation();
                        e.preventDefault();
                        _i.siblings("input").blur();
                        _i.trigger('click');
                        break;
                    default:
                        break;
                }
            });
        }

        _i.bind('click', function() {
            if(typeof _clickFn=="function" && !opts.disabled){
                _clickFn();
                top.iptSearchInputObj=target;
            }
            if(typeof _clickFn == "string")
                (new Function(_clickFn+'()'))();

            return false;
        });
    }

    $.fn.iptSearch =
    $.fn.iptsearch = function(options, param) {
        if (typeof options === 'string') {
            return $.fn.iptsearch.methods[options](this, param);
        }
        options = options || {};
        return this.each(function() {
            var _this = this;
            var opt = $.data(_this, "iptsearch");
            if (opt) {
                $.extend(opt.options, options);
            } else {
                $.data(_this, "iptsearch", {
                    options: $.extend({},$.fn.iptsearch.defaults, $.fn.iptsearch.parseOptions(_this), options)
                });
                init(_this);
            }
        });
    };

    $.fn.iptsearch.methods = {
        options: function(jq){
            return $.data(jq[0], 'iptsearch').options;
        },
        disable:function(jq){
            var opts=jq.iptsearch('options');
                opts.disabled=true;
            jq.addClass("disabled");
        },
        enable:function(jq){
            var opts=$(jq).iptsearch('options');
                opts.disabled=false;
            jq.removeClass("disabled");
        },
        resize:function(jq){
            var __width__ = $(jq).parents("div.datagrid-editable").width();
            $(jq)._outerWidth(__width__)._outerHeight(22);
            $(jq).parent()._outerWidth(__width__);
        }
    };

    $.fn.iptsearch.parseOptions = function(target) {
        return $.extend({},
            $.parser.parseOptions(target, ['width','disabled','readonly']));
    };

    $.fn.iptsearch.defaults = {
        width:134,
        offsetWidth:26,
        disabled:false,
        readonly:true,
        enterKey:false,
        validatebox:false,
        resizable:false,
        clickFn:null
    };
    if ($.parser) {
        $.parser.plugins.push('iptsearch');
    }

})(jQuery);