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
