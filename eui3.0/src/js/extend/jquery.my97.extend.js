/**
 * Created by Richard.he on 14-6-20.
 */
(function ($) {
    function dateSync(target){
        var http = new XMLHttpRequest();
        var opts = $(target).data("datebox").options;
        var url = /\?/.test(window.location.href)? window.location.href + "&dateSync=true" :  window.location.href + "?dateSync=true";

        http.onreadystatechange = function(){
            if(http.readyState == 2){
                var originalDate = new Date(http.getResponseHeader("Date"));
                var localDate = new Date();
                if(originalDate > 0){
                    var serverDate = {
                        year: originalDate.getFullYear(),
                        month: originalDate.getMonth() + 1,
                        day: originalDate.getDate(),
                        hour: originalDate.getHours(),
                        minute: originalDate.getMinutes(),
                        second: originalDate.getSeconds()
                    }
                    var clientDate = {
                        year: localDate.getFullYear(),
                        month: localDate.getMonth() + 1,
                        day: localDate.getDate(),
                        hour: localDate.getHours(),
                        minute: localDate.getMinutes(),
                        second: localDate.getSeconds()
                    }
                    
                    opts.startDate = serverDate.year + "-" +serverDate.month + "-" + serverDate.day + " " + serverDate.hour + ":" + serverDate.minute + ":" + serverDate.second;
                    $.fn.datebox.defaults.time.originalDate = originalDate.getTime();
                    $.fn.datebox.defaults.time.localDate = localDate.getTime();
                }
                
                http.abort();
                return;
            }
            if(http.readyState == 4) return;
        }

        http.open("GET", url, true);
        http.send();
        $.fn.datebox.defaults.time.hasRequset = true;
    }

    function updateDate(target){
        var jq = $(target);
        var opts = jq.data("datebox").options;

        var originalDate = $.fn.datebox.defaults.time.originalDate || 0,
            localDate = $.fn.datebox.defaults.time.localDate || 0,
            newDate;

        newDate = new Date().getTime() - localDate + originalDate;
        newDate = new Date(+newDate);
        var serverDate = {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
            day: newDate.getDate(),
            hour: newDate.getHours(),
            minute: newDate.getMinutes(),
            second: newDate.getSeconds()
        }
        opts.startDate = serverDate.year + "-" +serverDate.month + "-" + serverDate.day + " " + serverDate.hour + ":" + serverDate.minute + ":" + serverDate.second;
    }

    $.fn.datebox = function (options, params) {
        if (typeof options == "string") {
            return $.fn.datebox.methods[options](this, params);
        }
        options = options || {};
        if (!WdatePicker) {
            alert("未引入My97js包！");
            return;
        }
        return this.each(function () {
            var data = $.data(this, "datebox");
            var newOptions;

            if (data) {
                newOptions = $.extend(data.options, options);
                data.opts = newOptions;
            } else {
                newOptions = $.extend({}, $.fn.datebox.defaults, $.fn.datebox.parseOptions(this), options);
                $.data(this, "datebox", {
                    options : newOptions
                });
            }

            //日期必填
            if(newOptions.required){
                $(this).validatebox({required:true});
            }

            //日期禁止
            if(newOptions.disabled){
                $(this).addClass('disabled').attr('disabled',true);
            }

            //重置宽度
            if(newOptions.width){
                /**
                 * Date: 2016/02/18 17:39:36
                 * Author: chen.c1
                 * Description: new version exist difference in input's width setting, becauseof the style box-sizing including two attributions "content-box" and "border-box".
                 */
                // $(this).width(newOptions.width);
                $(this).css({
                    width: newOptions.width
                });
            }

            //日期格式
            if(newOptions.maxDate && !(/^[\d|#]/.test(newOptions.maxDate||"2099-12-31"))){
                newOptions.maxDate="#F{$dp.$D('"+newOptions.maxDate+"')}";
            }
            if(newOptions.minDate && !(/^[\d|#]/.test(newOptions.minDate||"1970-07-01"))){
                newOptions.minDate="#F{$dp.$D('"+newOptions.minDate+"')}";
            }

            //同步服务器时间
            if(newOptions.dateSync&&!$.fn.datebox.defaults.time.hasRequset){
                !newOptions.startDate?$(this).datebox('dateSync'):newOptions.dateSync=false;
            }

            //绑定事件
            if(newOptions.isTabTrigger){ //回车或者退格触发
                $(this).addClass('Wdate').on('focus', function(e){
                    //同步服务器时间
                    if(newOptions.dateSync){
                        updateDate(this);
                    }
                    WdatePicker(newOptions);
                });
            } else { //默认点击触发
                $(this).addClass('Wdate').on('click', function(e){
                    //同步服务器时间
                    if(newOptions.dateSync){
                        updateDate(this);
                    }
                    WdatePicker(newOptions);
                });
            }
        });
    };

    $.fn.datebox.methods = {
        getValue : function (target) {
            return $(target).val();
        },
        setValue : function (target, params) {
            return $(target).val(params);
        },
        clearValue : function (target) {
            $(target).val('');
        },
        disable:function(target){
            $(target).attr('disabled',true);
        },
        enable:function(target){
            $(target).attr('disabled',false);
        },
        destroy: function(target){
            $(target).remove();
        },
        resize: function(target, width){
            $(target)._outerWidth(width);
        },
        dateSync: function(target){
            $(target).each(function(){
                return dateSync(target);
            });
        }
    };
    $.fn.datebox.parseOptions = function (target) {
        return $.extend({}, $.parser.parseOptions(target,
            ["el", "vel", "weekMethod", "lang", "skin", "dateFmt", "realDateFmt",
                "realTimeFmt", "realFullFmt", "minDate", "maxDate", "startDate",
                {
                    doubleCalendar : "boolean",
                    enableKeyboard : "boolean",
                    enableInputMask : "boolean",
                    autoUpdateOnChanged : "boolean",
                    firstDayOfWeek : "number",
                    isShowWeek : "boolean",
                    highLineWeekDay : "boolean",
                    isShowClear : "boolean",
                    isShowToday : "boolean",
                    isShowOthers : "boolean",
                    readOnly : "boolean",
                    errDealMode : "boolean",
                    autoPickDate : "boolean",
                    qsEnabled : "boolean",
                    autoShowQS : "boolean",
                    opposite : "boolean"
                }
            ])
        );
    };

    $.fn.datebox.defaults = {
        dateFmt: 'yyyy-MM-dd',
        isTabTrigger: false,
        readOnly: false,
        dateSync: true,
        time: {
            hasRequset:false
        }
    };
})(jQuery);
