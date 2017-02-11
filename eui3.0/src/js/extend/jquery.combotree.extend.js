(function ($, undefined) {

    $.fn.combotree.extensions = {};

    function initSearchBox(target) {
        var t = $(target),
            cc = t.combo('panel'),
            textbox = t.combo('textbox'),
            tree = cc.find('ul.tree'),
            opts = t.combo('options'),
            search,
            searchBox,
            sug,
            menuDataArr,
            data,
            navH;
        
        function create() {
            var panel = cc.panel('panel');
            if(panel.find('.panel-search').length==0){
                var html = '';
                html += '<div class="panel-search combotree-search"><input placeholder="搜索..." autofocus="autofocus" type="text" class="ipt" />';
                html += '</div>';
        
                var search = $(html).prependTo(cc),
                    searchBox = search.find(".ipt");

                search.css({
                    width: (opts.panelWidth || textbox.parent(".combo").outerWidth()) - 10,
                    position: "absolute",
                    top: 0,
                    left:0
                });

                searchBox.css({
                    width: opts.panelWidth? opts.panelWidth - 40 : textbox.width() - 8
                });

                tree.css({
                    marginTop: search.outerHeight() + searchBox.outerHeight()
                });

            }
            
        }

        function toChange(data, value) {
            var arr = data;
            if (arr.length > 0) {
                function forchange(array){

                    for(var i=0;i<array.length;i++){
                        if(array[i]["children"] && array[i]["children"].length > 0) {
                            forchange(array[i]["children"]);
                            if( array[i]["children"].show!==undefined && array[i]["children"].show===true ){
                                $('#'+array[i]["domId"]+'').show();
                            }
                        }else{
                            $('#'+array[i]["domId"]+'').show();
                            array.show = true;
                        }
                    }
                }
                //递归
                function foreach(array) {
                    var count = 0;
                    for(var i=0;i<array.length;i++){
                        if (array[i]["children"]) {
                            if (array[i]["children"].length > 0) {
                                array[i]["children"].preObject = array[i];
                                foreach(array[i]["children"]);
                                if( array[i]["text"].toLowerCase().indexOf(value.toLowerCase()) != -1 ) {
                                    $('#'+array[i]["domId"]+'').show();
                                    forchange(array[i]["children"]);
                                    continue;
                                } else if ( array[i]["children"].show!==undefined && array[i]["children"].show===false){
                                    $('#'+array[i]["domId"]+'').hide();
                                    count++;
                                    continue;
                                } else {
                                    $('#'+array[i]["domId"]+'').show();
                                    continue;
                                }
                            }
                        }

                        if ( array.preObject["text"].toLowerCase().indexOf(value.toLowerCase()) == -1 && value && array[i]["text"].toLowerCase().indexOf(value.toLowerCase()) == -1) {
                            $('#'+array[i]["domId"]+'').hide();
                            count++;
                        } else {
                            $('#'+array[i]["domId"]+'').show();
                        }
                    }
                    if(count==array.length){
                        array.show = false;
                    }else{
                        array.show = true;
                    }
                    return array;
                }

                for(var i=0;i<arr.length;i++){
                    if (arr[i]["children"] && arr[i]["children"].length > 0) {
                        arr[i]["children"].preObject = arr[i];
                        foreach(arr[i]["children"]);
                        if( arr[i]["text"].toLowerCase().indexOf(value.toLowerCase()) != -1 ) { 
                            $('#'+arr[i]["domId"]+'').show();
                            forchange(arr[i]["children"]);
                        } else if( !arr[i]["children"].show ){
                            $('#'+arr[i]["domId"]+'').hide();
                        } else {
                            $('#'+arr[i]["domId"]+'').show();
                        }
                    }else{
                        if( arr[i]["text"].toLowerCase().indexOf(value.toLowerCase()) == -1 ){
                            $('#'+arr[i]["domId"]+'').hide();
                        }else{
                            $('#'+arr[i]["domId"]+'').show();
                        }
                    }
                }

            }

            return arr;
        }

        function inputEventHandler(e) {
            var code = e.keyCode;

            switch(code) {
                case 38:    // up
                    break;
                case 40:    // down
                    break;
                case 37:    // left
                    break;
                case 39:    // right
                    break;
                default:
                    if (timer){
                        clearTimeout(timer);
                    }
                    var timer = setTimeout(function(){
                        var value = searchBox.val();
                        toChange(data, value);
                    }, opts.delay);
            }
        }

        function fixBar(e){
            var scroH = $(this).scrollTop();  
            search.css({
                top: scroH
            });
        }

        function bindEvent() {   
            searchBox.unbind( navigator.userAgent.indexOf("Firefox")>0? "keyup.search" : "keydown.search").bind( navigator.userAgent.indexOf("Firefox")>0? "keyup.search" : "keydown.search", inputEventHandler);
            cc.unbind("scroll.search").bind("scroll.search",fixBar);
        }
        create();
        search = cc.find('.panel-search');
        searchBox = cc.find(".ipt");
        data = tree.tree('getRoots');
        /**
         * [Add attr.]
         * @param  {[boolean]} expandAll
         * Date: 2016/3/8 10:13:58
         * Author: chen.c1
         * Description: init tree is expand or not
         */
        opts.expandAll===true?tree.tree('expandAll'):opts.expandAll===false?tree.tree('collapseAll'):null;
        
        
        
        if(data && data.length > 0){
            bindEvent();
        }
        
        if(opts.oneRootChecked&&data.length==1){
            tree.tree('check', data[0].target);
        }

    }

    
    
    function initialize(target) {
        var t = $.util.parseJquery(target),
            cc = t.combo('panel'),
            panel = cc.panel('panel'),
            state = $.data(target, "combotree"),
            opts = t.combotree("options"),
            tree = state.tree;
            
    }

    var _combotree = $.fn.combotree;
    $.fn.combotree = function (options, param) {
        if (typeof options == "string") { return _combotree.apply(this, arguments); }
        return _combotree.apply(this, arguments).each(function () {
            initialize(this);
        });
    };
    $.union($.fn.combotree, _combotree);

    var defaults = $.fn.combotree.extensions.defaults = {
        oneRootChecked: false,
        /**
         * Date: 2016/03/29 17:14:47
         * Author: chen.c1
         * Description: set the default expandAll to null.
         * Modify Start
         */
        expandAll: null
        /* Modify End */
    };

    var methods = $.fn.combotree.extensions.methods = {
        //增加 combotree的搜索功能
        initSearchBox:  function (jq) { return jq.each(function () { initSearchBox(this); }); }
    };
    $.extend($.fn.combotree.defaults, defaults);
    $.extend($.fn.combotree.methods, methods);

})(jQuery);