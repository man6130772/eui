(function ($, undefined) {
    $.fn.form.extensions = {};
    var getData = function (target, param) {
        var form = $.util.parseJquery(target);
        return form.serializeObject(param);
    };

    /**
     * Modify: he.ff
     * Date: 2015/3/31
     * Des: 没有用到
    var _submit = $.fn.form.methods.submit;
    var submit = function (target, options) {
        var form = $.util.parseJquery(target);
        if (/^(?:form)$/i.test(this.nodeName)) { return _submit.call(form, form, options); }
        var opts = $.extend({}, $.fn.form.defaults, options || {});
        if (opts.onSubmit && opts.onSubmit.call(target, param) == false) { return; }
        if (!opts.url) { return; }
        var param = form.form("getData");
        $.post(opts.url, param, function (data) { if (opts.success) { opts.success(data); } });
    };
    */

    var isChanged = function(target) {
        var el = target;
        var els = el.elements, l = els.length, i = 0, j = 0, el, opts;
        for (; i < l ; ++i, j = 0) {
            el = els[i];
            switch (el.type) {
                case "text":
                case "hidden":
                case "password":
                case "textarea":
                    if($(el).val()!=$(el).attr('defaultValue')&&$(el).hasClass('combo-value')){
                        return true;
                    }
                    if (el.defaultValue != el.value ){
                         if(!$(el).hasClass('combo-text')){
                                return true;
                            }
                    }
                    break;
                case "radio":
                case "checkbox":
                    if (el.defaultChecked != el.checked) return true;
                    break;
                case "select-one":
                    j = 1;
                case "select-multiple":
                    opts = el.options;
                    for (; j < opts.length ; ++j) {
                        if (opts[j].defaultSelected != opts[j].selected) return true;
                    }
                    break;
                default:
                    break;
            }
        }
        return false;
    };

    var load = function (target, data) {
        var form = $.util.parseJquery(target);
        if (!$.data(target, 'form')) {
            $.data(target, 'form', { options: $.extend({}, $.fn.form.defaults) });
        }
        var opts = $.data(target, 'form').options;
        if (typeof data == 'string') {
            var param = {};
            if (opts.onBeforeLoad.call(target, param) == false) return;
            $.ajax({
                url: data,
                data: param,
                dataType: 'json',
                success: function (data) { _load(data); },
                error: function () { opts.onLoadError.apply(target, arguments); }
            });
        } else {
            _load(data);
        }
        function _load(data) {
            for (var name in data) {
                var val = data[name];
                var rr = _checkField(name, val);
                if (!rr.length) {
                    var f = form.find('input[numberboxName="' + name + '"]');
                    if (f.length) {
                        f.numberbox('setValue', val); // set numberbox value
                    } else {
                        $('input[name="' + name + '"]', form).val(val);
                        $('textarea[name="' + name + '"]', form).val(val);
                        $('select[name="' + name + '"]', form).val(val);
                        $('span[name="' + name + '"]', form).text(val);
                        $('label[name="' + name + '"]', form).text(val);
                        $('div[name="' + name + '"]', form).text(val);
                    }
                }
                _loadCombo(name, val);
            }
            opts.onLoadSuccess.call(target, data);
            /**
             * Description: 延时验证
             * Author: wu.hao
             * Date: 2016/03/10
             **************Start***************/
            setTimeout(function(){
                form.form("validate");    
            },100);
            /***************End****************/
        }
        //  check the checkbox and radio fields
        function _checkField(name, val) {
            var rr = form.find('input[name="' + name + '"][type=radio], input[name="' + name + '"][type=checkbox]');
            rr._propAttr('checked', false);
            rr.each(function () {
                var f = $(this);
                if (f.val() == String(val) || $.inArray(f.val(), val) >= 0) {
                    f._propAttr('checked', true);
                }
            });
            return rr;
        }
        function _loadCombo(name, val) {
            var cc = $.fn.form.comboList;
            var c = form.find('[comboName="' + name + '"]');
            if (c.length) {
                for (var i = 0; i < cc.length; i++) {
                    var type = cc[i];
                    if (c.hasClass(type + '-f')) {
                        if (c[type]('options').multiple) {
                            c[type]('setValues', val);
                        } else {
                            c[type]('setValue', val);
                        }
                        return;
                    }
                }
            }
        }
    };

    var methods = $.fn.form.extensions.methods = {
        //  获取 easyui-form 控件容器内所有表单控件的 JSON 序列化数据；该方法的参数 param 可以定义为如下格式：
        //      1、JSON-Object  ：该对象定义如下属性：
        //          onlyEnabled:    表示返回的结果数据中是否仅包含启用(disabled == false)的 HTML 表单控件；Boolean 类型值，默认为 false。
        //          transcript :    表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
        ///                 这是一个 String 类型值，可选的值限定在以下范围：
        //              cover  :    覆盖方式，只取后面元素 的值，丢弃前面元素的值；默认值；
        //              discard:    丢弃后面元素的值，只取前面元素的值；
        //              overlay:    将所有元素的值进行叠加；
        //          overtype   :    元素叠加方式，当 transcript 的值定义为 "overlay" 时，此属性方有效；
        //                  这是一个 String 类型值，可选的值限定在以下范围：
        //              array  :    将所有重复的元素叠加为一个数组；
        //              append :    将所有的重复元素叠加为一个字符串；默认值；
        //          separator  :    元素叠加的分隔符，定义将所有重名元素叠加为一个字符串时用于拼接字符串的分隔符；
        //                  这是一个 String 类型值，默认为 ","；当 transcript 的值定义为 "overlay" 且 overtype 的值定义为 "append" 时，此属性方有效。
        //      2、String 类型值:   表示当范围内存在重名(name 相同时)的 DOM 元素时，对重复元素的取值规则；
        //              其取值范围和当参数格式为 JSON-Object 时的属性 transcript 一样。
        //  返回值：该方法返回一个 JSON Object，返回对象中的每个数据都表示一个表单控件值。
        getData: function (jq, param) { return getData(jq[0], param); },
				
		isChanged: function(jq){ return isChanged(jq[0]); },

        //  重写 easyui-form 控件的 submit 方法，使之除了支持 form 标签提交外，还支持 div 等其他容器标签的提交。
        // submit: function (jq, param) { return jq.each(function () { submit(this, param); }); },

        //  重写 easyui-form 控件的 load 方法。
        load: function (jq, data) { return jq.each(function () { load(this, data); }); }
    };
    var defaults = $.fn.form.extensions.defaults = {};

    $.extend($.fn.form.defaults, defaults);
    $.extend($.fn.form.methods, methods);

    $.fn.form.comboList = ['combobox', 'combotree', 'combogrid', 'datetimebox', 'datebox', 'combo'];
})(jQuery);