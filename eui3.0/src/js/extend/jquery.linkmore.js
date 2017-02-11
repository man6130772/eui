/**
 * linkmore
 */
(function($){
    var init = function(target){
        var opts = $.data(target, 'linkmore').options;
        var t = $(target);
        var tt = $(opts.linkTarget);

        t.addClass('linkmore');

        var hiddenArea = function(){
            tt.layout('hidden', 'north');
            t.removeClass('linkmore-expand')
                .addClass('linkmore-collapse');
            t.text(opts.text1);
        };
        var showArea = function(){
            tt.layout('show', 'north');
            t.removeClass('linkmore-collapse')
                .addClass('linkmore-expand');
            t.text(opts.text2);
        };

        if(!opts.linkTargetShow){
            hiddenArea();
        }

        t.click(function(){
            tt.layout('isVisible', 'north') ? hiddenArea() : showArea();
            /*if(tt.layout('isVisible', 'north')){
                hiddenArea();
            } else {
                showArea();
            }*/
        })
    };

    $.fn.linkmore = function(options, param){
        if(typeof options == 'string'){
            $.fn.linkmore.methods[options].call(this, param);
        }
        options = options || {};
        return this.each(function(){
            var state = $.data(this, 'linkmore');
            if (state){
                $.extend(state.options, options);
            } else {
                $.data(this, 'linkmore', {
                    options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkmore.parseOptions(this), options)
                });
            }
            init(this);
        });
    };

    $.fn.linkmore.defaults = {
        linkTarget: "",
        linkTargetShow: false,
        text1: "查看更多",
        text2: "隐藏显示"
    };
    $.fn.linkmore.methods = {};
    $.fn.linkmore.parseOptions = function(target){
        return $.extend({}, $.parser.parseOptions(target));
    };

    $.parser.plugins.push('linkmore');
})(jQuery);

