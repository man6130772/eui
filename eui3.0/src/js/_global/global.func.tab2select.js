/**
 * Created by Richard.he on 14-9-11.
 */
(function($){
    tab2select = function(options){
        var target = options.target;
        var tabs = options.tabs;

        //初始化下拉列表
        //tab2select_init(target, tabs);
    };
    tab2select.tab = function(target, title){
        var $myTabs = $(target).length==0?window.parent.$(target):$(target);
        var $pp = $myTabs.tabs('getTab',title);
        var $tab = $pp.panel('options').tab;
        $tab.trigger('click');
    };

    function tab2select_init(target, tabs){
        var tabs0 = tabs[0];
        var tabs1 = tabs[1];
        var tabId = tabs0.target;
        selectedTitle = tabs0.selected ? tabs0.title : tabs1.title;
        otherTitle = tabs0.selected ? tabs1.title : tabs0.title;

        var tags_div = '';
        tags_div += '<div class="tab2select">';
        tags_div += '<div class="tab2select-title">';
        tags_div += '<div class="tab2select-name">'+selectedTitle+'</div>';
        tags_div += '</div></div>';
        var $div = $(tags_div);
        $div.bind('click', function(){
            /*$tab2select = $("#JS_tab2select");
            if($tab2select.length>0){
                $tab2select.toggle();
            } else {
                var self = $(this)[0];
                //tab2select_change(tabs, self.offsetLeft, self.offsetTop);
            }*/

            tab2select_change(tabId, otherTitle);
        });
        $(target).append($div);
    }

    function tab2select_change(tabId, oTitle){
        var $myTabs = window.parent.$(tabId);
        var $pp = $myTabs.tabs('getTab',oTitle);
        var $tab = $pp.panel('options').tab;
        $tab.trigger('click');
    }

    function __tab2select_change__(tabs,x,y){
        var tags_div = "";
        tags_div += '<div id="JS_tab2select" class="tab2select-select" style="';
        tags_div += 'position:absolute;z-index:99999;left:'+(x+5)+'px;top:'+(y+24)+'px';
        tags_div += '"></div>';
        var $div = $(tags_div);
        $div.appendTo("body");
        var doTab = function(title){
            var $myTabs = window.parent.$("#myTabs");
            var $pp = $myTabs.tabs('getTab',title);
            var $tab = $pp.panel('options').tab;
            $tab.trigger('click');
        };
        for(var i=0; i<tabs.length; i++){
            var obj = tabs[i];
            var __$div__ = $('<div class="tab2select-item">'+obj.title+'</div>');
            __$div__.bind('click', function(){
                var title = $.trim($(this).text());
                $div.hide();
                doTab(title);
            });
            $div.append(__$div__);
        }
    }

})(jQuery);
