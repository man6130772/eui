(function ($, undefined) {

    $.fn.accordion.extensions = {};

    /*!
     * Description: Panel SearchBox
     * Author: chen.c1
     * Email chen.cheng@wonhigh.cn
     * Date: 2015/09/02
     */
    //searchBox方法扩展 start
    var searchBox = function (target, data) {
        var jq = $(target);
        var ipt = jq.closest(".layout-panel").find("div.panel-search .ipt");
        var sug = ipt.nextAll(".panel-search-sug");
        var list = jq.data("accordion").panels;
        var opt = jq.data("accordion").options;
        var position = [];

        if (arguments[1] instanceof Array) {
            var menuData = arguments[1];
        }

        if (menuData) {
            search();
        }

        function getCode(e) {
            var code = e.keyCode;
            search(code);
        }

        function getChar(e) {
            var str = ipt.val();
            search(str);
            if (e) {
                e.stopPropagation();
            }
        }

        function replaceValue(e) {
            var jq = e.data.target;
            ipt.val(jq.text());
            getChar(e);
            clearSugWords();
            openTabs(position);
        }

        function toMenuArr(arr) {
            var menuDataArr = [];
            if (arr.length > 0) {
                //递归
                function foreach(array) {
                    $.each(array, function(i, row) {
                        if (row["children"]) {
                            if (row["children"].length > 0) {
                                foreach(row["children"]);
                            }
                        }

                        if (row["text"]) {
                            menuDataArr.push(row["text"]);
                        }
                    });
                }

                $.each(arr, function(i, group) {
                    if (group["children"]) {
                        if (group["children"].length > 0) {
                            foreach(group["children"]);
                        }
                    }
                });

                function sortby(a, b) {
                    return a.length - b.length;
                }

                if (menuDataArr.length > 0) {
                    menuDataArr.sort(sortby);
                    return menuDataArr;
                }


            }

            return false;
        }

        function valueESC(val) {
            val = val.replace(/([\[\]\\\^\$\.\|\?\*\+\(\)])/g, "\\\$1");
            return val;
        }

        function clearSugWords() {
            sug.find(">ul").empty();
            sug.hide();
        }

        function sugWords(value) {
            var menuDataArr = toMenuArr(menuData);
            // var str = "^" + valueESC(value) + "\.+";
            // var reg = new RegExp(str);
            var sugArr = [];
            var html = "";
            if (menuDataArr) {
                $.each(menuDataArr, function(i, str) {
                    //add the function 'toLowerCase' to fix the problem of matching case.
                    if (str.toLowerCase().indexOf(value.toLowerCase())!=-1 && str != value) {
                        sugArr.push(str);
                    }
                });
                if (sugArr.length > 0) {
                    $.each(sugArr, function(i, sugStr) {
                        html += "<li>" + sugStr + "</li>";
                    });
                    sug.find(">ul").empty();
                    sug.find(">ul").append(html);
                    hoverLi();
                    clickLi();
                    sug.show();
                } else {
                    clearSugWords();
                }
            }
        }

        function targetAddress(value) {
            var position = [];
            var status = 0;
            var _a = value;
            if (menuData.length > 0) {
                //递归
                function foreach(array) {
                    $.each(array, function(i, row) {
                        if (row["children"] && row["text"] != _a) {
                            if (row["children"].length > 0) {
                                foreach(row["children"]);
                            }
                        }

                        if (row["text"] == _a && status == 0) {
                            status = 1;
                            position.push(i);
                            position.targetObject = row;
                            return false;
                        }

                        if (status == 1) {
                            position.push(i)
                            return false;
                        }

                    });
                }

                $.each(menuData, function(i, group) {
                    if (group["children"]) {
                        if (group["children"].length > 0) {
                            foreach(group["children"]);
                        }
                        if (status == 1) {
                            status = 0;
                            position.push(i);
                            return false;
                        }
                    }
                });
            }
            position.reverse();
            return position;
        }

        function targetFocus(array) {
            var position = array;
            jq.find(".tree-node-hover").removeClass("tree-node-hover");
            if (position.length !== 0) {
                list[position[0]].panel("expand", opt.animate);
                var group = list[position[0]];
                var treeNode = group.find(">ul.tree");
                var childrenNode = treeNode;
                treeNode.tree("collapseAll");
                for (var i = 1; i < position.length; i++) {
                    if (i === position.length - 1) {
                        childrenNode.find(">li:eq(" + position[i] + ")").addClass("tree-node-hover");
                    } else {
                        treeNode.tree("expand", childrenNode.find(">li:eq(" + position[i] + ") >div.tree-node")[0]);
                        childrenNode = childrenNode.find(">li:eq(" + position[i] + ") >ul");
                    }
                }
            }
        }

        function openTabs(array) {
            var position = array;
            if (position instanceof Array && position.length != 0) {
                var treeNode = list[position[0]].find(">ul.tree");
                if (position.targetObject && position.targetObject.attributes.url) {
                    treeNode.tree("options").onClick(position.targetObject);
                }else{
                    $.messager.alert('提示','这是分组标题，展开选择具体的选项信息！'); 
                }
            }else{
                $.messager.alert('提示','没有此选项，请重新输入！');  
            }
        }

        function clickLi() {
            sug.find(">ul li").each(function() {
                $(this).unbind("click.li").bind("click.li", {
                    target: $(this)
                }, replaceValue);
            });
        }

        function hoverLi() {
            sug.find(">ul li").each(function() {
                var jq = $(this);
                jq.unbind("mouseenter.li").bind("mouseenter.li", function() {
                    jq.addClass("panel-search-hover");
                });
                jq.unbind("mouseleave.li").bind("mouseleave.li", function() {
                    jq.removeClass("panel-search-hover");
                });
            });
        }

        function blurClear(e) {
            clearSugWords();
            position = targetAddress(ipt.val());
            targetFocus(position);
        }

        function searchBotton() {
            openTabs(position);
        }

        function bindClear() {
            var jq = ipt.next("span.panel-search-clear");
            jq.unbind(".clear");
            jq.bind("mouseenter.clear", function() {
                $(this).addClass("search-clear-hover");
            });
            jq.bind("mouseleave.clear", function() {
                $(this).removeClass("search-clear-hover");
            });
            jq.bind("click.clear", function() {
                ipt.val("");
                $(this).remove();
            });
        }

        function bindEvent() {
            ipt.unbind("keydown.search").bind("keydown.search", getCode);
            ipt.unbind("input.search").bind("input.search", getChar);
            $(document).unbind("click.clearsug").bind("click.clearsug", blurClear);
            ipt.unbind("click.search").bind("click.search", getChar);
            ipt.nextAll("i").unbind("click.search").bind("click.search", searchBotton);
        }

        function search() {
            var _a = arguments[0];

            if (!_a) {
                clearSugWords();
                if (ipt.next("span.panel-search-clear").length > 0) {
                    ipt.next("span.panel-search-clear").remove();
                }
                return bindEvent();
            } else if (typeof _a === "string") {
                if (sug.length != 0) {
                    sugWords(_a);
                }
                if (_a.length != 0 && ipt.next("span.panel-search-clear").length == 0) {
                    ipt.after('<span class="panel-search-clear"></span>');
                    bindClear();
                }
                position = targetAddress(_a);
                targetFocus(position);

                // console.log(_a);
            } else if (typeof _a === "number") {
                var liLength = sug.find(">ul li").length;
                var _li = sug.find(">ul li.panel-search-hover");
                if (liLength != 0) {
                    if (_a === 40) {
                        //按下
                        if (_li.length === 0) {
                            sug.find(">ul li:first").addClass("panel-search-hover");
                        } else {
                            _li.removeClass("panel-search-hover");
                            _li.next().addClass("panel-search-hover");
                        }
                    } else if (_a === 38) {
                        //按上
                        if (_li.length === 0) {
                            sug.find(">ul li:last").addClass("panel-search-hover");
                        } else {
                            _li.removeClass("panel-search-hover");
                            _li.prev().addClass("panel-search-hover");
                        }
                    } else if (_a === 13) {
                        //确认键
                        clearSugWords();
                        getChar();
                    }
                    if (sug.find(">ul li.panel-search-hover").length !== 0 && _a !== 8) {
                        ipt.val(sug.find(">ul li.panel-search-hover").text());
                        ipt.blur();
                        setTimeout(function() {
                            ipt.focus();
                        }, 100);
                    } else if (_a === 38) {
                        ipt.blur();
                        setTimeout(function() {
                            ipt.focus();
                        }, 100);
                    }
                }

                if (_a === 13) {
                    //打开选项卡
                    openTabs(position);
                }
                // console.log(_a);
            }
        }
    }
    //searchBox方法扩展 end

    var defaults = $.fn.accordion.extensions.defaults = {

    };

    var methods = $.fn.accordion.extensions.methods = {
        /**
         * 扩展的搜索组件，data加载需要的tree数据，param定义tree递归数据的字段名，例如默认{children:"children",text:"text"}
         */
        searchBox: function(jq, data) {
            return jq.each(function() {
                searchBox(this, data);
            });
        }
    };
    $.extend($.fn.accordion.defaults, defaults);
    $.extend($.fn.accordion.methods, methods);

})(jQuery);