/**
 * Created by he.ff on 14-7-24.
 */
//交互表单操作
(function($) {
    dgSelector = function(opts){
        var _url = opts.href || '';
        var _title = opts.title;
        var _save = opts.onSave || null;
        var _w = opts.width || null;
        var _h = opts.height || null;
        var _enableSaveButton = opts.enableSaveButton;
        var _enableCloseButton = opts.enableCloseButton;
        var iframe = opts.isFrame;
        var closed = opts.isDblClose;

        if(typeof iframe=="undefined"){
            iframe=true;
        }
        if(typeof closed=="undefined"){
            closed=true;
        }

        top.dgSelectorOpts=opts;

        //是否启用快捷键
        var _isHotkey = false;

        //toolbar按钮事件
        var toolbar_events = {
            search: function(evt){
                var dg = evt.data.target||evt;
                var targetForm=$('#dialog_SarchForm');
                dg.datagrid('options').queryParams = targetForm.form('getData');
                dg.datagrid('options').url = opts.queryUrl;
                dg.datagrid('load');
            },
            clear: function(){
                $('#dialog_SarchForm').form('clear');
            },
            confirm: function(evt){
                var dg = evt.data.target;
                var win = evt.data.dlg;
                var SelectionData = dg.datagrid('getSelections');
                var CheckedData = dg.datagrid('getChecked');
                var rowsData = SelectionData.length > 0 ? SelectionData :
                    CheckedData.length > 0 ? CheckedData : [];
                if(rowsData.length<=0){
                    showWarn('请选择后再操作！');
                    return;
                }
                if(typeof top.dgSelectorOpts.fn=="function"){
                    top.dgSelectorOpts.fn(rowsData);
                }
                win.close();
            }
        };

        ygDialog({
            title:_title,
            href:_url,
            width:_w,
            height:_h,
            isFrame:iframe,
            modal:true,
            showMask: true,
            enableSaveButton: _enableSaveButton,
            enableCloseButton: _enableCloseButton,
            onSave: _save,
            onLoad:function(win, content){
                var tb=content.tbgrid;
                var _this=$(this);

                opts.win = closed ? undefined : win;

                if(tb==null){
                    tb = opts.tbGrid || $('#dialog_SearchDataGrid');
                }

                if(opts.queryUrl!=null){
                    var searchBtn=$('#dgSelectorSearchBtn');
                    var clearBtn=$('#dgSelectorClearBtn');
                    var confirmBtn=$('#dgSelectorConfirmBtn');

                    //查询按钮事件
                    searchBtn.click({target:tb},toolbar_events.search);

                    //清空按钮事件
                    clearBtn.click({target:tb},toolbar_events.clear);

                    //确认按钮事件
                    if(confirmBtn){
                        confirmBtn.click({target:tb,dlg:win},toolbar_events.confirm);
                    }
                }

                if(opts.autoQuery){
                    setTimeout(function(){
                        toolbar_events.search(tb);
                    },100);
                }

                tb.datagrid({
                    onDblClickRow:function(rowIndex, rowData){
                        if(typeof top.dgSelectorOpts.fn=="function"){
                            top.dgSelectorOpts.fn(rowData,rowIndex);
                            try{
                                if($(top.iptSearchInputObj)[0]&&$(top.iptSearchInputObj).hasClass('easyui-validatebox')){
                                    $(top.iptSearchInputObj).validatebox('validate');
                                }
                            }catch(e){}
                        }
                        closed ? win.close() : function(){};
                    },
                    onLoadSuccess:function(){
                        $('input[name=optsel]',_this.contents()).on('click',function(){
                            var _idx=$('input[name=optsel]',_this.contents()).index(this);
                            var row=tb.datagrid('getRows')[_idx];
                            if(typeof top.dgSelectorOpts.fn=="function"){
                                _fn = top.dgSelectorOpts.fn;
                                top.dgSelectorOpts.fn(row);
                                if($(top.iptSearchInputObj)[0] &&$(top.iptSearchInputObj).hasClass('easyui-validatebox')){
                                    $(top.iptSearchInputObj).validatebox('validate');
                                }
                            }
                            closed ? win.close() : function(){};
                        });

                        /**
                         * 配合hotkeys插件使用，支持键盘操作
                         */
                        if(typeof opts.hkid == "string"){
                            yg_hotKeys.setOptions({
                                targetId: 'dialog_SearchDataGrid',
                                editable: false,
                                eventKey: false,
                                enterKey: true,
                                winTarget:win,
                                fn:       top.dgSelectorOpts.fn,
                                editIndex:0
                            });
                            _isHotkey = true;
                        }
                    }
                });
            },
            onClose: function(){
                if(_isHotkey){
                    var dg = $("#"+opts.hkid);
                    yg_hotKeys.setOptions({
                        targetId: opts.hkid,
                        editable: true,
                        eventKey: true,
                        enterKey: false,
                        fn:       null,
                        editIndex:dg.datagrid('getRowIndex',dg.datagrid('getSelected'))
                    });
                    _isHotkey = false;
                }
            }
        });
        return false;
    }
})(jQuery);
