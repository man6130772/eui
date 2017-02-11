/**
 * Created by he.ff 14-7-24.
 */

//显示高级搜索
function popSearch(obj,target) {
    if ($(obj).hasClass("search-down-arr")) {
        $(target).layout('show', 'north');
        $(obj).attr("class", "search-up-arr");
    } else {
        $(target).layout('hidden', 'north');
        $(obj).attr("class", "search-down-arr");
    }
}

//显示在工具条上的搜索框
function toolSearch(opts){
    var _box=$('<div>').attr('id',"searchDiv").addClass('simple-search-box');
    var _a=$('<a>').attr({'id':"searchArr",'href':'javascript:;'}).addClass('search-up-arr');
    var _tbM=$('<div>').addClass('toolbar_menu');
    var opts=opts || {collapsible:true,items:[]};
    var target=opts.target || $('#subLayout');
    var appendTo=opts.appendTo || $('#toolbar');
    var items=opts.items;
    var _width=opts.width || 250;
    var _pos=opts.pos || 'right';
    appendTo.css({'position':'relative'});
    if(items&&items.length>0){
        for(var i=0;i<items.length;i++){
            var _d=$('<div>');
            _d.attr('name',items[i].name).html(items[i].text);
            _tbM.append(_d);
        }
        _box.append('<input class="tbSearch"/>');
    }

    if(opts.collapsible!=false){
        _a.click(function(){
            popSearch(this,target);
        });
        _box.append(_a);
    }else{
        _box.css({right:5});
        if(_pos=="left"){
            _box.css({left:5});
        }
    }

    _box.append(_tbM);
    if(appendTo){
        $(appendTo).append(_box);
    }

    if(items&&items.length>0){
        $('.tbSearch',appendTo).searchbox({
            width:_width,
            searcher:function(value,name){
                if(typeof opts.callback=="function"){
                    opts.callback(value,name);
                }
            },
            menu:$('.toolbar_menu',appendTo),
            prompt:'请输入关键字'
        });
    }
    if($('.search-div').closest('.layout-panel-north').css('display')=="none"){
        setTimeout(function() {
            $('#searchArr',appendTo).addClass('search-down-arr').removeClass('search-up-arr');
        },200);
    }
}
