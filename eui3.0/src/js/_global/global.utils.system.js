/**
 * 系统提示框
 */

//成功操作提示
function showSuc(msg) {
    top.$.messager.notify({
        title: '提示',
        msg: msg,
        timeout: 1000,
        position:'bottomRight',
        showType: 'slide'
    });
}

//提示信息
function showInfo(msg) {
    top.$.messager.alert('提示', msg, 'info');
}

//警告操作提示
function showWarn(msg) {
    top.$.messager.alert('提示', msg, 'warning');
}

//错误操作提示
function showError(msg) {
    top.$.messager.alert('提示', msg, 'error');
}

//显示进度条
function showProcess(show,msg){
    if(!show){
        top.$.messager.progress('close');
        return;
    }
    top.$.messager.progress({
        msg:msg,
        text:''
    });
}

//确认选择框
function showConfirm(msg, okFn, cancelFn){
    top.$.messager.confirm(msg, function(r){
        if(r){
            if(typeof okFn=="function"){
                okFn();
            }
        } else {
            if(typeof cancelFn=="function"){
                cancelFn();
            }
        }
    });
}

//消息提示
function showTips(msg){
    var tpl_tips = "";
    tpl_tips += '<div class="my-tips">';
    tpl_tips += '<p>'+msg+'</p>';
    tpl_tips += '</div>';
    var $tips = $(tpl_tips);
    top.$("body").append($tips);

    var W = $tips.width();
    var len = top.$(".my-tips").length;

    $tips.css({
        width: W, marginLeft: -(W/2), opacity: 0
    });
    $tips.animate({
        bottom: len==1?20:(len-2)*40+60, opacity: 1
    }, 'normal');
    setTimeout(function(){
        $tips.animate({
            bottom: parseInt($tips.css('bottom'))-20, opacity: 0
        }, 'slow', function(){ $(this).remove(); });
    },'3000');
}

// 公用弹出框
function alert(msg, type){
    //info-0,warning-1,error-2,question-3 ,success-4
    var typeStr="info";
    if(type==1){
        typeStr='warning';
    }else if(type==2){
        typeStr='error';
    }else if(type==3){
        typeStr='question';
    }else if(type==4){
        typeStr='success';
    }else{
        typeStr='info';
    }
    $.messager.alert('提示',msg,typeStr);
}
