var dgSelectorOpts = null;//弹窗选择器

function parsePage() {
    InitLeftMenu('#leftMenu');

    $('#tabToolsFullScreen').click(function () {
        fullscreenChange();
    });

    $('#lnkDesk').click(function () {
        addTab({
            title: '系统桌面'
        });
    });

    //setTimerSpan();

    $('#loading').remove();

}

//初始化左侧
function InitLeftMenu(obj) {
    $.getJSON(__bootPATH__+"resources/data/left-tree.json?r=" + Math.random(),
        function (data) {
            var _menu = "";
            var ss = "";
            //获取一级菜单
            $.each(data,
                function (n, value) {
                    var menuId = value.menuid;
                    var menuName = value.menuname;
                    var menuIcon = value.icon;
                    var menuStr = '<div  title=' + menuName + ' iconcls=' + menuIcon + '><ul  id=' + menuId + '></ul></div>';
                    var menus = value.menus;
                    $(obj).append(menuStr);
                    $("#" + menuId).tree({
                        lines: true,
                        data: eval(menus),
                        onClick: function (node) {
                            if (!$(this).tree("isLeaf", node.target)) {
                                //父节点
                                $(this).tree('toggle', node.target);
                                return;
                            }
                            var title = node.text,
                                url = node.attributes.url,
                                isiframe = true;
                            addTab({
                                title: title,
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
                fit: true
            });
            $(obj).accordion('select', 0);
        });
}

function setTimerSpan() {
    var timerSpan = $("#timerSpan"),
        interval = function () {
            timerSpan.text($.date.toLongDateTimeString(new Date()));
        };
    interval();
    window.setInterval(interval, 1000);
}

//获取当前URL，兼容本地调试
var __bootPATH__ = __CreateJSPath("__boot__.js");