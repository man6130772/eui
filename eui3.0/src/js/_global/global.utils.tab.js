/**
 * TAB公用方法
 */

//新增TAB
function addTab(opts){
    addNewTab(opts,false);
}

function addBlankTab(opts){
    addNewTab(opts,true);
}

function addNewTab(opts,blank) {
    var title = opts.title;
    var href = opts.href;
    var icon = opts.icon;
    var isRefresh = opts.refreshed || false;
    var isIframe = opts.iframed;
    var isClosable = opts.closabled;
    if (typeof(isIframe) === "undefined") {
        isIframe = true;
    }
    if (typeof(isClosable) === "undefined") {
        isClosable = true;
    }

    var tt = $('#mainTabs');
    if(tt.tabs('exists',title)){
        tt.tabs('select',title);
        if(isRefresh){
            var tab = tt.tabs('getSelected');
            tab.panel('refresh', href);
        }
    } else {
        tt.tabs('add',{
            title: title,
            href: href,
            iconCls: icon,
            iniframe: isIframe,
            closable: isClosable,
            showMask: true
        });
    }
}

//创建多个tab
(function($){
    /**
     * 创建tabs
     * @param options
     * @returns {fn}
     */
    $.fn.createTabs=function(options){
        var isMainTab = options.isMainTab ? true : false;
        options = $.extend({
            selected:0,
            showHeader:true
        }, options || {});

        var that = this;
        var items = options.tabs;

        for(var i=0;i<items.length;i++){
            var title=items[i].title, href=items[i].href, lazyload=false;

            lazyload = items[i].lazyload ? true : false;

            var tabPanel = "";
            tabPanel += '<div data-options="';
            tabPanel += "title:'"+title+"',";
            tabPanel += "iconCls:'"+(items[i].iconCls||"")+"',";
            //tabPanel += "refreshable:"+(!isMainTab)+",";
            tabPanel += "closable:"+!!items[i].closable+",";
            tabPanel += "refreshButton:"+(!isMainTab)+",";
            tabPanel += "lazyload:"+lazyload;
            tabPanel += '" style="overflow:hidden;"></div>';

            var panel = $(tabPanel);
            if(lazyload){
                panel.html('<iframe scrolling="auto" frameborder="0"  class="tabs-iframe" lazysrc="'+href+'"></iframe>');
            }else{
                panel.html('<iframe scrolling="auto" frameborder="0"  class="tabs-iframe" src="'+href+'"></iframe>');
            }
            panel.appendTo(that);
        }

        var index=0;
        $(that).tabs($.extend({fit:true,plain:!isMainTab},{
            onSelect:function(title, idx){
                var pp = $(that).tabs('getSelected');
                var opts = pp.panel('options');
                if(opts.lazyload){
                    var iframe=pp.find('iframe');
                    if(!iframe[0]){
                        return;
                    }
                    if(iframe.attr('lazysrc')!="" && (index!=0||options.selected==0)){
                        iframe.attr('src',iframe.attr('lazysrc')).removeAttr('lazysrc');
                    }
                }
                index = idx;
                if($.isFunction(items[idx].onSelect)){
                    items[idx].onSelect.call(this, title, idx);
                }
            }
        }, options));

        $(that).tabs('select', options.selected);

        if(!options.showHeader){
            $(that).tabs('hideHeader');
            $(".tabs-header").css({
                padding: 0,
                borderWidth: '0'
            });
        }
        return that;
    }
})(jQuery);
