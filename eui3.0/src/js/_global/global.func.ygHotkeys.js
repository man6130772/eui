//热键事件处理方法
(function($) {

    //用于容错处理的空函数
    var _fn = function(){};

    var dg = null,
        defaultRowData = {},
        cellIndex;
    var options = {};
    var defaults = {
        up:true,
        down:true,
        left:true,
        right:true,
        editable:false,
        eventKey:false, //将选中行的数据返回
        enterKey:false, //操作切换
        editIndex:0,
        onUp: function(){},
        onDown: function(){}
    };

    //选中datagrid的第一行
    var _ygSelect = function(){
        var max = _dgHandler.getMaxRow();
            max>0 ? dg.datagrid('selectRow',options.editIndex):_fn();
    };

    //自动调整焦点到当前window
    var _ygFocus = function(){
        var $input = $('<input type="text" value="value" />');
        $input.appendTo("body").focus().remove();
    };

    //定义键盘处理函数
    var _keyHandler = {
        up: function(){
            //事件监听
            if(typeof options.onUp === "function"){
                options.onUp.apply(this, [_dgHandler.getSelectedRowIndex()]);
            }
            var min = 0;
            var max = _dgHandler.getMaxRow();
            var cidx = _dgHandler.getSelectedRowIndex();
            var nidx = cidx>min?cidx-1:max-1;
            if(endEditing(cidx)){
                dg.datagrid('selectRow', nidx);
                beginEditing(nidx);
            }
            else {
                if(!options.editable){
                    dg.datagrid('selectRow', nidx);
                }
            }
        },
        down: function(){
            //事件监听
            if(typeof options.onDown === "function"){
                options.onDown.apply(this, [_dgHandler.getSelectedRowIndex()]);
            }
            var min = 0;
            var max = _dgHandler.getMaxRow();
            var cidx = _dgHandler.getSelectedRowIndex();
            var nidx = cidx<max-1?cidx+1:min;
            if(endEditing(cidx)){
                dg.datagrid('selectRow', nidx);
                beginEditing(nidx);
            }
            else {
                if(!options.editable){
                    dg.datagrid('selectRow', nidx);
                }
            }
        },
        left: function(e){
            e.stopPropagation();
            e.preventDefault();
            var editIndex = _dgHandler.getSelectedRowIndex();
            if(cellIndex <= 0){
                //_keyHandler.up();
                cellIndex = 0;
            } else {
                //_keyHandler.down();
                cellIndex--;
            }
            autoFocus(editIndex, cellIndex);
        },
        right: function(e){
            e.stopPropagation();
            e.preventDefault();
            //var max = _dgHandler.getMaxRow();
            var editIndex = _dgHandler.getSelectedRowIndex();
            var cellInputs = _dgHandler.getEditors().length;
            if(cellIndex>=0 && cellIndex<cellInputs-1){
                cellIndex++;
            } else {
                editIndex = cellInputs-1;
            }
            autoFocus(editIndex, cellIndex);
            /*if(cellIndex>=0 && cellIndex<cellInputs-1){
                cellIndex++;
                autoFocus(editIndex, cellIndex);
            } else {
                if(editIndex != -1){
                    editIndex == max-1 ? _dgHandler.add() : _keyHandler.down();
                }
            }*/
        },
        enterKey: function(e){
            var rowData = _dgHandler.getSelectedData();
            try{
                typeof options.fn == "function" ? options.fn(rowData):_fn();
                options.winTarget.close();
            }catch(e){}
        },
        eventKey: function(e){
            this.right(e);
        }
    };

    var _dgHandler = {
        getSelectedRowIndex: function(){
            var row = dg.datagrid('getSelected');
            var idx = dg.datagrid('getRowIndex', row)||0;
            return idx;
        },
        getSelectedData: function(){
            var row = dg.datagrid('getSelected');
            return row ? row : {};
        },
        getEditors: function(){
            var idx = this.getSelectedRowIndex();
            var editors = dg.datagrid('getEditors', idx);
            var editorArr = new Array();
            $.each(editors, function(i, v){
                var editor = v.target;
                if(editor.hasClass("combo-f")){
                    editorArr.push(editor.siblings(".combo").find("input"));
                    return true;
                }
                if(!editor.hasClass("disabled") &&
                    !editor.hasClass("readonly")
                ){
                    editorArr.push(editor);
                }
            });
            return editorArr;
        },
        getMaxRow: function(){
            var maxLen;
            try{
                maxLen = dg.datagrid('getRows').length;
            } catch(e){
                maxLen = 0;
            }
            return maxLen;
        },
        add: function(){
            var rowIndex = _dgHandler.getSelectedRowIndex();
            if(endEditing(rowIndex)){
                cellIndex = 0;
                dg.datagrid('appendRow', $.extend({},defaultRowData));
                _keyHandler.down();
            }
        }
    };

    var _ygUp = function($obj){
        $obj.hotKeys({
            type: 'keydown',
            key: 'up',
            fn: _keyHandler.up
        });
    },
    _ygDown = function($obj){
        $obj.hotKeys({
            type: 'keydown',
            key: 'down',
            fn: _keyHandler.down
        });
    },
    _ygLeft = function($obj){
        $obj.hotKeys({
            type: 'keydown',
            key: 'left',
            fn: _keyHandler.left
        });
    },
    _ygRight = function($obj){
        $obj.hotKeys({
            type: 'keydown',
            key: 'right',
            fn: _keyHandler.right
        });
    };

    //开始编辑
    function beginEditing(editIndex){
        dg.datagrid('beginEdit', editIndex);
        autoFocus(editIndex, cellIndex);
    }

    //结束编辑
    function endEditing(editIndex){
        if (!options.editable){return false}
        if (dg.datagrid('validateRow', editIndex)){
            dg.datagrid('endEdit', editIndex);
            return true;
        } else {
            return false;
        }
    }

    //输入框自动聚焦并选择
    function autoFocus(x, y){
        //setTimeout(function(){
        var $input = _dgHandler.getEditors()[y];
        $input.select().focus();
        //},50);
    }

    //对外提供的公共函数
    var _yg_hotKeys = function(){
        var up = options.up;
        var down = options.down;
        var left = options.left;
        var right = options.right;

        var $doc = $(document);

        $doc.find("body").unbind('keyup')
            .bind('keyup', function(e){
                var $target = $(e.target);
                var contextFlag = $target.parents().hasClass("datagrid");
                if($target.is("input") && !contextFlag) return;

                //判断是否是Enter键
                switch(e.keyCode){
                    case 13:
                        e.stopPropagation();
                        e.preventDefault();
                        options.eventKey ? _keyHandler.eventKey(e) : _fn();
                        options.enterKey ? _keyHandler.enterKey(e) : _fn();
                        break;
                    default:
                        break;
                }
                //绑定4个方向键事件
                up ? _ygUp($doc) : _fn();
                down ? _ygDown($doc) : _fn();
                left ? _ygLeft($doc) : _fn();
                right ? _ygRight($doc) : _fn();
            }
        );
    };

    //对外提供配置接口对象
    yg_hotKeys = {};

    yg_hotKeys.setOptions = function(opts){
        cellIndex = 0;
        dg = $("#"+opts.targetId);
        options = $.extend({},defaults,opts);

        //默认选中第一行并且自动调整焦点到当前window
        _ygSelect();
        _ygFocus();
    };

    yg_hotKeys.setRowData = function(data){
        defaultRowData = data;
    };

    yg_hotKeys.getRowIndex = function(){
        return _dgHandler.getSelectedRowIndex();
    };

    yg_hotKeys.init = function(){
        /*var opts = dg.datagrid('options');
        var _onBeforeEdit = $.isFunction(opts.onBeforeEdit) ?
                            opts.onBeforeEdit : _fn;*/
        dg.datagrid({onBeforeEdit:function(){
            setTimeout(function(){
                var editors = _dgHandler.getEditors();
                $.each(editors, function(i,v){
                    v.focusin(function(){
                        cellIndex = i;
                    });
                });
            },100);
            //_onBeforeEdit.apply(this, arguments);
        }});
        _yg_hotKeys();
    };

})(jQuery);
