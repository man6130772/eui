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