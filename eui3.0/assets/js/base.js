/*!
 * Project Common Resources
 * Author wu.h1 (RTX 3832)
 * Email wu.han@wonhigh.cn
 * Date 2016/10/27
 * Description Common Resources v3.0.1 (http://www.wonhigh.cn/)
 */
/*! Source: ./src/js/_global/global.conf.js */
/**
 * 全局配置对象
 */
//扩展Date对象
Date.prototype.format = function (format)
{
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

//ie console.time()
if (window.console && typeof(window.console.time) == "undefined") {
    console.time = function(name, reset) {
        if (!name) {
            return;
        }
        var time = new Date().getTime();
        if (!console.timeCounters) {
            console.timeCounters = {}
        }
        var key = "KEY" + name.toString();
        if (!reset && console.timeCounters[key]) {
            return;
        }
        console.timeCounters[key] = time;
    };

    console.timeEnd = function(name) {
        var time = new Date().getTime();
        if (!console.timeCounters) {
            return;
        }
        var key = "KEY" + name.toString();
        var timeCounter = console.timeCounters[key];
        if (timeCounter) {
            var diff = time - timeCounter;
            var label = name + ": " + diff + "ms";
            console.info(label);
            delete console.timeCounters[key];
        }
        return diff;
    };
}


/*! Source: ./src/js/_global/global.event.js */
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


/*! Source: ./src/js/_global/global.func.js */
//公用方法
var onlyOpenTitle = "系统桌面";
function resetDetailViewHeight(_h) {
    if (parent.$('#ddv-' + parent.editRowIndex)[0]) {
        parent.$('#ddv-' + parent.editRowIndex).height(_h);
        parent.tbgrid.datagrid('fixDetailRowHeight', parent.editRowIndex);
    }
}

// 添加
function addDataGridCommon(dataGridId){
	 var $dg = $("#"+dataGridId+"");
	 $dg.datagrid('appendRow', {});
     var rows = $dg.datagrid('getRows');
     $dg.datagrid('beginEdit', rows.length - 1);
     $dg.datagrid('selectRow', rows.length - 1);
}

// 删除
function removeDataGridCommon(dataGridId){
    var $dg = $("#"+dataGridId+"");
    var row = $dg.datagrid('getSelected');
    if (row){
        var rowIndex = $dg.datagrid('getRowIndex', row);
        $dg.datagrid('deleteRow', rowIndex);
        if((rowIndex-1)>=0){
            $dg.datagrid('selectRow', rowIndex-1);
        }
    }
}

// 删除所有行
function deleteAllGridCommon(dataGridId){
    /*var $dg = $("#"+dataGridId+"");
    var rows = $dg.datagrid('getRows');
    if(rows){
      for ( var i = 0; i < rows.length; i++) {
        var rowIndex = $dg.datagrid('getRowIndex', rows[i]);
       $dg.datagrid('deleteRow', rowIndex);
      }
    }*/
    $('#'+datagridId).datagrid('loadData', { total: 0, rows: [] });
}

//获得当前行号   一般用 var rowIndex=getRowIndex(this);
function getRowIndex(target) {
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
 }  

// 结束编辑
function endEditCommon(dataGridId){
    var $dg = $("#"+dataGridId+"");
    var rows = $dg.datagrid('getRows');
    for ( var i = 0; i < rows.length; i++) {
        $dg.datagrid('endEdit', i);
    }
}

// 获取该表格有变动的记录 inserted\deleted\updated
function getChangeTableDataCommon(dataGridId){
	 var $dg = $("#"+dataGridId+"");
	 endEditCommon(dataGridId);
	 var effectRow = new Object();
	 if($dg.datagrid('getChanges').length) {
         var inserted = $dg.datagrid('getChanges', "inserted");
         var deleted = $dg.datagrid('getChanges', "deleted");
         var updated = $dg.datagrid('getChanges', "updated");

         if (inserted.length) {
             effectRow["inserted"] = JSON.stringify(inserted);
         }
         
         if (deleted.length) {
             effectRow["deleted"] = JSON.stringify(deleted);
         }
         
         if (updated.length) {
             effectRow["updated"] = JSON.stringify(updated);
         }
	 }
	
	 return effectRow;
}

// 全选或者全不选   checkstatus 1--全选   0--全不选
function selectCheckAllRowCommon(dataGridId,checkstatus){
    var $dg = $('#'+dataGridId);
     var rows = $dg.datagrid('getRows');
     for ( var i = 0; i < rows.length; i++) {
         if(checkstatus==0){
             $dg.datagrid('uncheckRow', i);
         } else {
             $dg.datagrid('checkRow', i);
         } 
     }
}

// 返回前一个页面
function returnTab(tabID,title){
   $('#'+tabID).tabs('select',title);
}

//发达ajax请求
function ajaxRequest(url,reqParam,callback){
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: true,
		  success: callback
	});
}

//发达ajax同步请求
function ajaxRequestAsync(url,reqParam,callback){
	$.ajax({
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  cache: true,
		  async: false,
		  success: callback
	});
}

//截取时间格式yyyy-MM-dd
function formatDateStr(value) {
    if (value == null || value == '') {
        return '';
    }
    if(value.length > 10){
        return value.substring(0,10);
    }
    return value;
}  

function checkPowerJS(powerValue,index){
    var flag=false;
    var temp =parseInt(Math.pow(2,index));
    var result = powerValue&temp;
    if(result== temp){
         flag=true;
    }
    return flag;
}

//切换选项卡
function tab2select(target, title){
    var $myTabs = $(target).length==0?window.parent.$(target):$(target);
    var $pp = $myTabs.tabs('getTab',title);
    var $tab = $pp.panel('options').tab;
    $tab.trigger('click');
}

//全屏事件
function fullscreenChange(){
    var unsupport = "抱歉：您的浏览器不支持全屏操作，请切换至火狐浏览器";
    if($.util.supportsFullScreen) {
        if($.util.isFullScreen()) {
            $.util.cancelFullScreen();
        } else {
            $.util.requestFullScreen();
        }
    } else {
        alert(unsupport);
    }
}
fullscreenChange.fullscreen = function(){
    var l = $("body"), t = $("#tabToolsFullScreen");
    l.layout('hidden', 'north');
    l.layout('hidden', 'west');
    t.linkbutton({
        iconCls: "icon-window-min",
        text: "正常"
    });
};
fullscreenChange.exitscreen = function(){
    var l = $("body"), t = $("#tabToolsFullScreen");
    l.layout('show', 'north');
    l.layout('show', 'west');
    t.linkbutton({
        iconCls: "icon-window-max",
        text: "全屏"
    });
};

//设置对象焦点
function setFocus(jq){
    var editor;
    if(jq.hasClass('combo-f')){
        editor = jq.closest('td').find('input:visible');
    } else {
        editor = jq;
    }
    setTimeout(function(){
        editor.select().focus();
    },100);
}


/*! Source: ./src/js/_global/global.func.dgSelector.js */
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


/*! Source: ./src/js/_global/global.func.ygDialog.js */
//弹出窗口
(function($) {
    ygDialog = function(opts) {
        var win;
        opts = opts || {};
        var target;
        var winOpts = $.extend({},
        {
            isFrame: false,
            locate: 'document',
            data: undefined,
            width: 'auto',
            height: 'auto',
            cache: false,
            autoDestroy: true,
            minimizable: false,
            maximizable: false,
            collapsible: false,
            resizable: false,
            modal: true,
            enableSaveButton: true,
            enableCloseButton: true,
            saveButtonText: '确定',
            saveButtonIconCls: 'icon-save',
            closeButtonText: '取消',
            closeButtonIconCls: 'icon-cancel',
            closed: false,
            loadMsg: $.fn.datagrid.defaults.loadMsg,
            showMask: true,
            onSave: null
        },
        opts);

        function getTop(w, options) {
            var _doc;
            try {
                _doc = w['top'].document;
                _doc.getElementsByTagName;
            } catch(e) {
                return w;
            }

            if (options.locate == 'document' || _doc.getElementsByTagName('frameset').length > 0) {
                return w;
            }

            return w['top'];
        }

        function setWindowSize(w, options) {
            var _top = getTop(w, options);
            var wHeight = $(_top).height(),
            wWidth = $(_top).width();
            if (options.locate == 'top' || options.locate == 'document') {
                if (options.height == 'auto') {
                    options.height = wHeight * 0.8
                }

                if (options.width == 'auto') {
                    options.width = wWidth * 0.8
                }
            } else {
                var locate = /^#/.test(options.locate) ? options.locate: '#' + options.locate;
                if (options.height == 'auto') {
                    options.height = $(locate).height() * 0.8
                }

                if (options.width == 'auto') {
                    options.width = $(locate).width() * 0.8
                }
            }
        }

        var iframe = null;
        var buttons = [];
        if (winOpts.isFrame && !winOpts.target) {
            iframe = $('<iframe>').attr('height', '100%').attr('width', '100%').attr('marginheight', 0).attr('marginwidth', 0).attr('frameborder', 0);
            iframe.css({
                'visibility': 'hidden'
            });
            iframe.attr('src', winOpts.href);
            delete winOpts.content;
        }

        var selfRefrence = {
			openWin:function(){
				return iframe[0].contentWindow;
			},
            getData: function(name) {
                return winOpts.data ? winOpts.data[name] : null;
            },
            close: function() {
                target.panel('close');
            }
        };

        var _top = getTop(window, winOpts);

        var warpHandler = function(handler) {
            if (typeof handler == 'function') {
                return function() {
                    handler(selfRefrence);
                };
            }
            if (typeof handler == 'string' && winOpts.isFrame) {
                return function() {
                    iframe[0].contentWindow[handler](selfRefrence);
                }
            }

            if (typeof handler == 'string') {
                return function() {
                    eval(_top[handler])(selfRefrence);
                }
            }
        };

        setWindowSize(window, winOpts);

        //包装toolbar中各对象的handler
        if (winOpts.toolbar && $.isArray(winOpts.toolbar)) {
            $.each(winOpts.toolbar,
            function(i, button) {
                button.handler = warpHandler(button.handler);
            });
        }

        //包装buttons中各对象的handler
        if (winOpts.buttons && $.isArray(winOpts.buttons)) {
            $.each(winOpts.buttons,
            function(i, button) {
                button.handler = warpHandler(button.handler);
            });
        }

        var _onClose = winOpts.onClose;
        winOpts.onClose = function() {
			if (winOpts.target) {
                 $('.validatebox-invalid', winOpts.target).removeClass('validatebox-invalid');
             }
			
            if ($.isFunction(_onClose)) {
                _onClose.apply(this, arguments);
            }
            if (winOpts.autoDestroy&&!winOpts.target) {
                $(this).dialog("destroy");
            }
        };
		
		//兼容 检查是否有取消按钮
		var checkButtons=function(t){
			var r=false;
			if(winOpts.buttons){
				for(var i=0;i<winOpts.buttons.length;i++){
					if(winOpts.buttons[i].text==t){
						r=true;
						break;
					}
				}
			}
			return r;
		};

        if (winOpts.enableSaveButton == true && winOpts.onSave) {
            var btnSave = {
                text: winOpts.saveButtonText,
                iconCls: winOpts.saveButtonIconCls,
                handler: function(dia) {
                    return winOpts.onSave(selfRefrence);
                }
            };
            buttons.push(btnSave);
        }

        if (winOpts.enableCloseButton == true && !checkButtons(winOpts.closeButtonText)) {
            var btnClose = {
                text: winOpts.closeButtonText,
                iconCls: winOpts.closeButtonIconCls,
                handler: function(dia) {
                    dia.dialog("close");
                }
            };
            buttons.push(btnClose);
        }

        if (!$.util.likeArray(winOpts.buttons) || $.util.isString(winOpts.buttons)) {
            winOpts.buttons = [];
        }
        $.array.merge(winOpts.buttons, buttons);

        $.each(winOpts.buttons,
        function() {
            var handler = this.handler;
            if ($.isFunction(handler)) {
                this.handler = function() {
                    handler.call(target, target);
                };
            }
        });
        if (!winOpts.buttons.length) {
            winOpts.buttons = null;
        }

        /*
		if ($.isArray(winOpts.buttons)&&winOpts.buttons.length>0) {
            $.each(winOpts.buttons,
            function(i, button) {
                button.handler = warpHandler(button.handler);
            });
        }
		*/

        var onLoadCallback = winOpts.onLoad;
        winOpts.onLoad = function() {
            onLoadCallback && onLoadCallback.call(this, selfRefrence, _top);
        };

        if (winOpts.locate == 'top' || winOpts.locate == 'document') {
            if (winOpts.isFrame && iframe && !winOpts.target) {
                winOpts.href = '';
                if (winOpts.showMask) {
                    winOpts.onBeforeOpen = function() {
                        var body = $(this);
                        $.mask({
                            target: body
                        });
                    }
                }
                target = _top.$('<div>').css({
                    'overflow': 'hidden'
                }).append(iframe).dialog(winOpts);
                function iframeLoaded() {
                    onLoadCallback && onLoadCallback.call(iframe, selfRefrence, iframe[0].contentWindow);
                    _top.$('.dialog-button').show();
                    target.panel('body').children("div.datagrid-mask-msg").remove();
                    target.panel('body').children("div.datagrid-mask").remove();
                    iframe.css({
                        'visibility': 'visible'
                    });
                }
                iframe.bind('load',
                function() {
                    iframeLoaded();
                });
            } else if (winOpts.target) {
                target = winOpts.target;
                target.dialog(winOpts);
                _top.$('.dialog-button').show();
                target.panel('body').children("div.datagrid-mask-msg").remove();
                target.panel('body').children("div.datagrid-mask").remove();
            } else {
                target = _top.$('<div>').dialog(winOpts);
                setTimeout(function() {
                    _top.$('.dialog-button').show();
                },
                2);
            }
        } else {
            var locate = /^#/.test(winOpts.locate) ? winOpts.locate: '#' + winOpts.locate;
            target = $('<div>').appendTo(locate).dialog($.extend({},
            winOpts, {
                inline: true
            }));
        }
        return target;
    }
})(jQuery);


/*! Source: ./src/js/_global/global.func.ygHotkeys.js */
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


/*! Source: ./src/js/_global/global.utils.system.js */
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


/*! Source: ./src/js/_global/global.utils.search.js */
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


/*! Source: ./src/js/_global/global.utils.tab.js */
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


/*! Source: ./src/js/_global/global.utils.build.js */
/*
*buildSubSys
*根据JSON数据生成子系统菜单
--------------------------------------------*/
function buildSubSysCommon(data) {
    var wrapper = $("#subSystem");
    wrapper.empty();
    var curSystem = data.areasystemid;
    var subSystems = data.subSystems;
    var links = "";
    for (var i = 0; i < subSystems.length; i++) {
        var json = subSystems[i];
        links += '<a href="' + json.systemUrl + '"';
        links += 'class="' + (curSystem == json.id ? "active" : "") + '"';
        links += 'data-toggle="subSystem"';
        links += 'target="_top"';
        links += '>';
        links += json.text;
        links += '</a>';
    }
    wrapper.append(links);
}

/**
*buildMenu
*根据JSON数据生成左侧菜单
--------------------------------------------*/
function buildMenuCommon(data, options, accordionOptions) {
    var $obj = $("#leftMenu");
    /**
     * Date: 2016/04/01 11:51:30
     * Author: chen.c1
     * Descrition: 
     * 1.Solve the different system compatibility problem if 'accordion' had been initialized.
     * 2.the left menu must exist the dom with id="left".
     * Modify Start
     */
    if ($obj.length != 0) {
        var state = $.data($obj[0], 'accordion');
        if (state) {
            var opts = state.options;
            $('#left>div').remove();
            $obj = $('<div id="leftMenu"></div>').appendTo($('#left'));
        }
    } else {
        $('#left>div').remove();
        $obj = $('<div id="leftMenu"></div>').appendTo($('#left'));
    }

    /* Modify End */

    var acd = "";
    try {
        $.each(data,
            function(idx, item) {
                var id = "tree_panel_" + idx;
                var title = item.text;

                //新增Accordion
                acd = '<div title="' + title + '"><ul id="' + id + '"></ul></div>';
                $obj.append(acd);

                $("#" + id).tree({
                    lines: true,
                    data: item.children,
                    onClick: function(node) {
                        var target = node.target;
                        var $target = $(target);

                        //父节点
                        if (!$(this).tree("isLeaf", target)) {
                            $(this).tree('toggle', target);
                            return;
                        }

                        //不显示菜单
                        if (options && !options.click.call(this))
                            return;

                        var title = node.text,
                            iconCls = node.iconCls,
                            url = node.attributes.url;

                        //如果是完整的URL地址则表示需要跳转到其它系统
                        var isGoto = true;
                        var initialize = !!$target.attr("initialize");
                        var regExp_url = /^([http|https]+):\/\/(.*)\.belle\.net\.cn\/(.*?)\/.*/;
                        if (regExp_url.test(url) && !initialize) {
                            $.easyui.loading({ msg: "正在为你跳转，请稍候。。。" });
                            var matches = regExp_url.exec(url);
                            var jumpTo = matches[1] + "://" + matches[2] + ".belle.net.cn/" + matches[3] + "/sso_to_index?outFlag=true";
                            $.ajax({
                                type: 'get',
                                url: jumpTo,
                                async: false,
                                dataType: 'html',
                                success: function() {
                                    $target.attr("initialize", "true");
                                },
                                error: function(xhr) {
                                    alert(
                                        "错误码：" + xhr.status + "</br>" +
                                        "错误信息：" + xhr.statusText, 2);
                                    isGoto = false;
                                }
                            });
                            $.easyui.loaded();
                        }
                        if (!isGoto) return;

                        //调试用，ctrl+点击弹出新窗口
                        if (window.event && window.event.ctrlKey) {
                            var a = document.createElement('a');
                            a.target = '_blank';
                            a.href = url;
                            a.click();
                        } else {
                            //新增TAB
                            addTab({
                                title: title,
                                href: url,
                                icon: iconCls
                            });
                        }

                        //注册全屏菜单
                        var fullScreenArr = ["销售订单", "退换货", "团购订单", "跨店订单"];
                        if ($.array.contains(fullScreenArr, title))
                            top.$("#tabToolsFullScreen").trigger('click');
                    }
                });
            });

        //渲染accordion
        var accOpts = accordionOptions? accordionOptions : {
            fit: true,
            animate: false
        }
        $obj.accordion(accOpts);
        $obj.accordion('select', 0);

        //渲染searchBox扩展
        /*if($("#left").panel("options").searchBox){
            $obj.accordion('searchBox',data);
        }*/
    } catch (e) {}
}

/**
*buildMain
*生成各个子系统默认首页
--------------------------------------------
function buildMain(url){
    var mainUrl = url+"son_index";
    var mainTab = $('#mainTabs').tabs('getTab', '系统桌面');
    mainTab.panel('refresh', mainUrl);
}
*/
