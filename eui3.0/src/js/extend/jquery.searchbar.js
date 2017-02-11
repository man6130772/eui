(function ($, undefined) {

    $.fn.searchbar = function(options, param) {
        var jq = this;
        if (typeof options == 'string') {
            param = param instanceof Array? param : [].slice.call(arguments,1);
            return $.fn.searchbar.methods[options].apply(jq[0], param);
        }

        options = options || {};
        return jq.each(function(){
            var state = $.data(this, 'searchbar');
            if (state){
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'searchbar', {
                    options: $.extend(true, {}, $.fn.searchbar.defaults, options, {
                         data: []
                    })
                });
                var opts = state.options;
                $(this).searchbar("bindEvents");
            }
        });
    }

    $.fn.searchbar.methods = {
        options: function(){
            var opts = $.data(this,'searchbar').options;
            return $.extend({}, opts);
        },
        loadAccordionData: function(target) {
            var jq = $(this);
                
            if(!$.data(this)['searchbar']) jq.searchbar();
            var opts = jq.searchbar("options"),
                data = opts.data;
                
            jq.searchbar("bindEvents", "oneFocusLoad", function(){
                var ds = $(target).find(".accordion"),
                    panels = ds.accordion("panels");
                $.each(panels, function(i, n){
                    var panel = this,
                        opts = panel.panel('options'),
                        tree = panel.find('.tree');
                    /*data.push({
                        index: i,
                        text: opts.title
                    });*/

                    if(tree.length>0){
                        jq.searchbar("loadTreeData", tree[0], i);
                    }
                });
                jq.combobox("loadData",data);
            });
            if(opts.selectTabs){
                jq.searchbar("bindEvents", "onSelect", function(record){
                    var index = record.index + "",
                        info = index.split("&"),
                        index = info[0].split("_"),
                        nodeid = info[1],
                        ds = $(target).find(".accordion"),
                        opts = ds.accordion("options"),
                        panels = ds.accordion("panels"),
                        panel = panels[+index[0]];
                        
                    panel.panel("expand",opts.animate);
                    if(nodeid){
                        var tree = panel.find(".tree"),
                            node = tree.tree("find",+nodeid),
                            opts = tree.tree("options");
                        tree.tree("expandAll");
                        tree.tree("select",node.target);
                        
                        $(this).textbox("options").keyHandler.enter = function(e){
                            if(!!node.attributes.url){
                                opts.onClick(node);
                                $(this).combo("hidePanel");
                                $(this).combo("textbox").blur();
                            }
                        }
                        if(this.event.type=="click"){
                            if(!!node.attributes.url){
                                opts.onClick(node);
                            }
                        }
                    }else{
                        $(this).textbox("options").keyHandler.enter = function(e){}
                    }
                });
            }
        },
        loadTreeData: function(target, index){
            var treeNode = $(target),
                treeData = treeNode.tree("getRoots"),
                opts = $(this).searchbar("options"),
                data = opts.data;
            function forEachText(db, idx) {
                $.each(db, function(i, n){
                    index = idx + "_" + i;
                    if(!n.children||n.children.length==0)
                    data.push({
                        index: index + "&" + n.id,
                        text: n.text
                    });
                    if(!!n.children&&n.children.length>0) forEachText(n.children, index);
                });
            }
            if(treeData.length>0){
                forEachText(treeData, index);
            }
            
        },
        writeData: function() {
            var key = arguments[0],
                value = arguments[1],
                opts = $(this).searchbar("options");
            if(opts[key]) opts[key] = value;
        },
        readData: function() {
            var key = arguments[0],
                opts = $(this).searchbar("options"),
                data = opts[key]?opts[key]:opts.data;
            return data;
        },
        bindEvents: function() {
            var opts = $(this).searchbar("options"),
                ev = arguments[0],
                fn = arguments[1];
            if(!!ev && !!fn) opts["inputEvents"][ev] = fn;
            if(!!ev) $(this).searchbar(ev);
            if(!ev && !fn){
                for(var key in opts["inputEvents"]){
                    $(this).searchbar(key);
                }
            }
        },
        oneFocusLoad: function() {
            var opts = $(this).searchbar("options");
            $(this).combo("textbox").one("focus", opts["inputEvents"]["oneFocusLoad"]);
        },
        onSelect: function() {
            var opts = $(this).searchbar("options"),
                comboOpts =  $(this).combobox("options");
            if(opts.selectTabs) comboOpts.onSelect = opts["inputEvents"]["onSelect"];
        }
    };

    $.fn.searchbar.defaults = {
        inputEvents: {
            oneFocusLoad: function(){},
            onSelect: function(record){
                var index = record.index,
                    index = index.split("_");
            }
        },
        selectTabs: true
    };

})(jQuery);