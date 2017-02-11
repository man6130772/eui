/**
 * 全局监听事件
 */
$(function(){
    //动态绑定<清空查询表单>功能
    $("#clearBtn").on('click',function(){
        var myForm=$(this).closest('form');
        myForm.form('clear');
    });

    //动态监听输入框的值，发现不合法的值则去掉
    $("input:not(.combo-text,:file)").on('change',function(){
        var self = $(this);
        var oldValue = $.trim(self.val());
        var newValue = oldValue.replace(/['"]/g, "");
        self.val(newValue);
    });

    //全屏
    $(document).on($.util.fullScreenEventName, function(){
        if($.util.isFullScreen()){
            fullscreenChange.fullscreen();
        } else {
            fullscreenChange.exitscreen();
        }
    });

    //屏蔽backspace键退出页面
    $(document).hotKeys({type:'keydown',key:'backspace',fn:function(e){
        if($(e.target).is("input")||$(e.target).is("textarea")) return;
        e.preventDefault();e.stopPropagation();
    }});

    //自动执行页面中定义的parsePage方法
    if(typeof parsePage=="function"){
        parsePage();
    }

});
