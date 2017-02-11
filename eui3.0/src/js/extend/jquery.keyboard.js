/**
 * Created by Richard.he on 15-1-7.
 */
(function($){
    var tabIndex = 0;

    //用于容错处理的空函数
    var _fn = function(){};

    /**
     * 快捷键事件处理
     * @t EasyUI对象
     * @tt 绑定快捷键的对象
     */

    var _keyboard = function(t){
        _keyboard.init(t);
    };

    //初始化快捷键
    _keyboard.init = function(t, _key, _fn){
        var options = t.data('keyboard').options;
        if(options.type == 'form'){
            var editor = getEditors(t).eq(0);
            setFocus(editor);
            bindEvent(t, 'return', this.keyHandler.right);
        } else if(options.type == 'grid') { //grid
            bindEvent(t, 'up', this.keyHandler.up);
            bindEvent(t, 'down', this.keyHandler.down);
            bindEvent(t, 'return', this.keyHandler.right);
        } else {
            //TODO
        }

        function bindEvent(t, _key, _fn){
            t.hotKeys({type:'keydown', key:_key, fn:_fn});
        }
    };

    //方向键事件
    _keyboard.keyHandler = {
        up: function(e){
            e.preventDefault();
            var t = $(this), grid = $(".datagrid-view>table:hidden", t), target = $(e.target),
                regExp_combo = /combo/ig, regExp_date = /Wdate/ig;
            /**
            * Description: 滚动条光标跟随
            * Author: wu.hao
            * Date: 2016/03/31
            * Modify Start
            */
            var isInput=target.is("input");
            if(isInput && 
            /* Modify End */(
                regExp_combo.test(target.parent().attr("class")) ||
                regExp_date.test(target.attr("class"))
                )){
                e.stopPropagation();
            } else { doUp(); }

            function doUp(){
                var rowIndex = _getSelected(t);
                var rows = grid.datagrid('getRows').length||1;
                var lastIndex = rows-1;
                var idx = rowIndex==0 ? lastIndex : rowIndex-1;
                grid.datagrid('selectRow', idx);
                if(isInput){
                    var rowDom=grid.datagrid('getRowDom',idx);
                    for(var i=0,len=rowDom.length;i<len;i++){
                        scrollToElement(rowDom[i]);
                    }
                }
            }
        },
        down: function(e){
            e.preventDefault();
            var t = $(this), grid = $(".datagrid-view>table:hidden", t), target = $(e.target),
                regExp_combo = /combo/ig, regExp_date = /Wdate/ig;
            var isInput=target.is("input");
            if(isInput && (
                regExp_combo.test(target.parent().attr("class")) ||
                    regExp_date.test(target.attr("class"))
                )){
                e.stopPropagation();
            } else { doDown(); }

            function doDown(){
                var rowIndex = _getSelected(t);
                var rows = grid.datagrid('getRows').length||1;
                var lastIndex = rows-1;
                var idx = rowIndex==lastIndex ? 0 : rowIndex+1;
                grid.datagrid('selectRow', idx);
                if(isInput){
                    var rowDom=grid.datagrid('getRowDom',idx);
                    for(var i=0,len=rowDom.length;i<len;i++){
                        scrollToElement(rowDom[i]);
                    }
                }
            }
        },
        //光标左移
        left: function(){},
        //光标右移
        right: function(){
            var t = $(this), options = t.keyboard('options');
            if(options.type=='grid'){
                t = t.find(".datagrid-view2>.datagrid-body");
            }
            var editors = getEditors(t);
            var fEditor = getFocusEditor(t);
            var idx = editors.index(fEditor[0])||0;
            autoFocus(editors.eq(++idx), options);
        },
        enter: function(t){
            //TODO
        }
    };

    //表单处理
    _keyboard.formHandler = function(t){
        //TODO
    };

    //表格处理
    _keyboard.gridHandler = function(t, tt){
        //TODO
    };

    //Tab键事件
    _keyboard.tabHandler = {};

    /**
     * 获取可编辑的输入框
     */
    function getEditors(t){
        var editors = $("input:not(:disabled,:hidden,[readonly])", t);
        /*var editorArr = new Array();
        $.each(editors, function(i, v){
            var editor = $(v);
            if(editor.hasClass("combo-f")){
                editorArr.push(editor.siblings(".combo").find("input"));
                return true;
            }
            editorArr.push(v);
        });*/
        return $(editors);
    }

    /**
     * 获取当前有焦点的输入框
     */
    function getFocusEditor(t){
        var editor = $("input:focus", t);
        return editor;
    }

    /**
     * 输入框选中并聚焦
     */
    function autoFocus(jq, param){
        setTimeout(function(){
            jq.select().focus();
            //触发最后一个输入框的处理事件
            if(jq.length==0 && param && param.lastFn){
                param.lastFn.call(this);
            }
        },100);
    }



    /**
     * Description: 将滚动条移到element
     * Author: wu.hao
     * Date: 2016/03/31
     * Modify Start
     */
    function scrollToElement(element){
        var offsetTop=element.offsetTop;
        var currentElement=element;

        while(element){
            if(element.clientHeight < element.scrollHeight){
                element.scrollTop=offsetTop;
                break;
            }           
            element=element.parentElement;
        }
    };
    /* Modify End */

    /**
     * 获取一行
     */
    function _getSelected(t){
        var tr = $("tr.datagrid-row-selected", t);
        var idx = tr.attr("datagrid-row-index")||0;
        return parseInt(idx);
    }

    function bind(target){
        var t = $(target), options = t.data('keyboard').options;
        t.attr("id")? _fn():t.attr("id","_easyui_keyboard_"+tabIndex++);
        t.attr("tabindex")? _fn():t.attr('tabindex', tabIndex);
        _keyboard(t);
    }

    $.fn.keyboard = function(options, param){
        if (typeof options == 'string'){
            return $.fn.keyboard.methods[options](this, param);
        }

        options = options || {};
        return this.each(function(){
            if (!$.data(this, 'keyboard')){
                $.data(this, 'keyboard', {
                    options: $.extend({}, $.fn.keyboard.defaults, $.fn.keyboard.parseOptions(this), options)
                });
            }
            bind(this);
        });
    };

    $.fn.keyboard.parseOptions = function(target){
        var options = $.parser.parseOptions(target);
        return $.extend({}, options);
    };

    //keyboard默认方法
    $.fn.keyboard.methods = {
        options: function(jq, param){
            return jq.data('keyboard').options;
        }
    };

    //keyboard默认属性和事件
    $.fn.keyboard.defaults = {
        type: "",
        lastFn: function(){}
    };

    $.parser.plugins.push("keyboard");
})(jQuery);
