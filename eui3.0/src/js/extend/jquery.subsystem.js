(function($) {
    function init(target) {
        var opts = $(target).subsystem("options");
        $(target).addClass(opts.headCls);
        opts.loader.call(target, opts.queryParams, function(data) {
            loadData(target, data);
        });
    }

    function loadData(target, data){
		var state = $.data(target, 'subsystem');
		var opts = state.options;
		if($("#subSystem").length==0)
			$(target).append('<div id="subSystem">');
		buildSubSysCommon(data);
		$("#subSystem").find('a[data-toggle="subSystem"]').each(function(i,target){
			$(target).addClass(opts.linkCls);
		});
	}

    function request(target, url, param, remainText) {
        var opts = $.data(target, 'subsystem').options;
        if (url) {
            opts.url = url;
        }
        param = $.extend({}, opts.queryParams, param || {});
        //		param = param || {};
        opts.loader.call(target, param, function(data) {
            loadData(target, data);
        });
    }

    $.fn.subsystem = function(options, param) {
        if (typeof options === 'string') {
            var method = $.fn.subsystem.methods[options];
            if (method) {
                return method(this, param);
            }
        }

        options = options || {};
        return this.each(function() {
            var opts = $.data(this, "subsystem");
            if (opts) {
                $.extend(opt.options, options);
            } else {
                $.data(this, "subsystem", {
                    options: $.extend({}, $.fn.subsystem.defaults, $.fn.subsystem.parseOptions(this), options)
                });
                init(this);
            }
        });
    };

    $.fn.subsystem.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.parser.parseOptions(target));
    };

    $.fn.subsystem.methods = {
        options: function(jq) {
            return $.data(jq[0], 'subsystem').options;
        },
        loadData: function(jq, data){
			return jq.each(function(){
				loadData(this, data);
			});
		},
        reload: function(jq, url) {
            return jq.each(function() {
                if (typeof url == 'string') {
                    request(this, url);
                } else {
                    if (url) {
                        var opts = $(this).subsystem('options');
                        opts.queryParams = url;
                    }
                    request(this);
                }
            });
        }
    }

    $.fn.subsystem.defaults = {
        scroll: false,
        headCls: '',
        linkCls: '',
        //ajax传参
        queryParams: {},
        method: 'GET',
        loader: function(param, success){
			var opts = $(this).subsystem('options');
			if (!opts.url) return false;
			$.ajax({
				type: opts.method,
				url: opts.url,
				data: param,
				dataType: 'json',
				success: function(data){
					success(data);
				}
			});
		}
    };
})(jQuery);
