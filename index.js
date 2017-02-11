var maxTab = false;//最大化
var dgSelectorOpts=null;//弹窗选择器

function parsePage(){
	InitLeftMenu('#leftMenu');

	$('#tabToolsFullScreen').click(function(){
		changeScreen();
	});
	
	$('#lnkDesk').click(function(){
		addTab({
		title: '系统桌面'
		});
	});
	
	setTimerSpan();
	
	$('#loading').remove();
	
}

//全屏切换
function changeScreen() {
    if (maxTab) {
	    
			$('body').layout('show','west');
			$('body').layout('show', 'north');
			$('body').layout('show', 'south');
		/*
		if ($.util.supportsFullScreen) {
         		$.util.cancelFullScreen();
       	 }
		*/
        maxTab = false;
        $('#tabToolsFullScreen').linkbutton({
            iconCls: "icon-window-max",
            text: "全屏"
        });
    } else {
        	$('body').layout('hidden','west');
			$('body').layout('hidden', 'north');
			$('body').layout('hidden', 'south');
		
		/*	
		if ($.util.supportsFullScreen) {
		  $.util.requestFullScreen();
		} 
		*/
        maxTab = true;
        $('#tabToolsFullScreen').linkbutton({
            iconCls: "icon-window-min",
            text: "正常"
        });
    }
}


//初始化左侧
function InitLeftMenu(obj) {
    $(obj).html('<p class="loading16">&nbsp;</p>');
    $.getJSON("json/left-tree.json?r=" + Math.random(),
    function(data) {
        $('.loading16').remove();
				
        var _menu = "";
        var ss = "";
        //获取一级菜单
        $.each(data,
        function(n, value) {
            var _subMenu = "";
            var _id = value.menuid;
            var _name = value.menuname;
            _menu = '<div  title=' + value.menuname + ' iconcls=' + value.icon + ' style="overflow:auto;padding-top:5px;"><ul  id=' + value.menuid + '></ul></div>';
            _subMenu = value.menus;
            $(obj).append(_menu);
            $("#" + value.menuid).tree({
                lines: true,
                data: eval(value.menus),
                onClick: function(node) {
                    if (!$(this).tree("isLeaf", node.target)) {
                        //父节点
                        $(this).tree('toggle', node.target);
                        return;
                    }
                    var title = node.text,
                    iconCls = node.iconCls,
                    url = node.attributes.url,
                    isiframe = true;
                    addTab({
                        title: title,
                        icon: iconCls,
                        href: url,
                        iframed: isiframe,
                        closabled: true
                    });
                }
            });
						
        });
				
        //渲染accordion
        $(obj).accordion({
            animate: false,
            fit: true,
            onSelect: function(dd, index) {
                if ($("#left").find(".accordion-body:last").css("display") == "block") {
                    $("#left").find(".panel-header:last").css({
                        "border-bottom": "1px solid #99BBE8"
                    });
                    $("#left").find(".accordion-body:last").css({
                        "border-bottom": "none"
                    });
                } else {
                    $("#left").find(".panel-header:last").css({
                        "border-bottom": "none",
                        height: 16
                    });
                }
            }
        });
				$(obj).accordion('select',0);
    });
		
		
}


function setTimerSpan(){
	var timerSpan = $("#timerSpan"), 
	interval = function () { 
		timerSpan.text($.date.toLongDateTimeString(new Date()));
	};
	interval();
	window.setInterval(interval, 1000);
};