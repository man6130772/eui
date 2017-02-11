'use strict';

if(typeof seajs !== 'undefined') {
    seajs.loaded = true;
    var cross = window.location.origin.indexOf("dev") > 0;
    var url = staticurl + "/../../mdm/resources/common/js/";
    if( cross )
        url = "http://dev.mdm.belle.net.cn/mdm/resources/common/js/" ;
    if(typeof window.version == 'undefined')
        window.version = 0.0;
    seajs.config({
        base: "/",
        paths:{ mdm:url },
        map: [
            //[".js",".js?v=" + window.version]
            [ /^(.*\.(?:css|js))(.*)$/i, '$1?'+ window.version]
        ],
        alias:{
			"itemFilter":url + "/itemFilter.v1.js",
            "organFilter":url + "/organFilter.js",
            "spin":staticurl + "/modules/filterbuilder/js/spin.js",
            "searchOrgan":staticurl + "/modules/filterbuilder/js/searchOrgan.js",
            "searchCommon":staticurl + "/modules/filterbuilder/js/searchCommon.js"
        }
    });
    seajs.use(['mdm/mdm'],function(mdm){
        window.organMdm = mdm;
    });
}

if( typeof  $.fn.filterbuilder == 'undefined' ) {
    (function ($) {
        var search = function (opts) {
            var targets = {'item': '#searchCommonContainer', 'organ': '#searchOrganContainer'};
            var type = opts.type;
            var url = opts.href || '';
            var title = opts.title;
            //var saveFn = opts.onSave || null;
            var width = $(window).width() || 740;
            var height = $(window).height() || 530;
            var enableSaveButton = opts.enableSaveButton;
            var enableCloseButton = opts.enableCloseButton;
            var dlg;
            var loadFn = function () {
                //TODO
            };
            var saveFn = function (panel) {
                if (opts.onSave) {
                    opts.onSave(panel);
                }
            };

            if (url.indexOf('searchCommon') >= 0)
                type = 'item';
            else if (url.indexOf('searchOrgan') >= 0)
                type = 'organ';

            var openFn = opts.openFn;
            
            url = targets[type];
            $(url).show();
            $.parser.parse($(url));
            dlg = ygDialog({
                title: title,
                target: $(url),
                width: width,
                height: height,
                isFrame: false,
                modal: true,
                showMask: true,
                enableSaveButton: enableSaveButton,
                enableCloseButton: enableCloseButton,
                onSave: saveFn,
                onLoad: loadFn,
                onOpen: openFn
            });
        
			onResize(dlg);

			$(window).resize({
				win:dlg
			},function(event){
				if(event.data && event.data.win){
					var win= event.data.win;
					win.window('move',{
						left: 0,
						top: 0
					});
					setTimeout(function(){
						onResize(win);
					},0);
				}
			});

        };
		
        // resize dialog
		function onResize(win){
			var $win=$(window);
            var winSize = {
    			width : $win.width(),
    			height : $win.height()
            };
			win.window('resize', {
				width:  winSize.width || 740,
				height: winSize.height || 530
			});

            if(win.is('#searchCommonContainer')){
                resizeSearchCommon(winSize);
            }
            if(win.is('#searchOrganContainer')){
                resizeSearchOrgan(winSize);
            }
        };
        
        function resizeSearchCommon(winSize){
            var $cate = $('#searchCommonCategory');
            var $searchCommonPanel = $('.searchCommon-panel');
            var titleHeight = 31;
            var otherContentHeight = winSize.width>1280? 280 : 310; // 写成数字防止预览界面resize时候无法获取实际高度
            var columnHeight = winSize.height - otherContentHeight;
            var comboboxWidth = winSize.width - 550;
            $('.sm-categories', $cate).height(columnHeight);
            if($cate.find('.sm-cell-list').length>0){
                $('#searchCommonCondition').combobox({
                    width: comboboxWidth
                });
                $('.sm-cell-list', $cate).height(columnHeight-titleHeight);
            }
            if($searchCommonPanel.is(':visible')){
                var panelWidth = $cate.width() + 2;
                var categoryOffset = $cate.offset();
                var panelHeight = columnHeight - titleHeight;
                var categoryHeight = panelHeight - 38;
                $('.searchCommon-category-list', '.searchCommon-panel').height(categoryHeight);
                $searchCommonPanel.panel({
                    width: panelWidth,
                    height: panelHeight,
                    left: categoryOffset.left,
                    top: categoryOffset.top + titleHeight
                });
            }
        };
        
        function resizeSearchOrgan(winSize){
            var cateHeight=(winSize.height-210);
            var listHeight=cateHeight * 0.6;
            var $cate1=$('#searchOrganCategory1');
            $cate1.height('auto');
            $cate1.find('.sm-cell-list').height(listHeight-30);
            
            listHeight=cateHeight * 0.4;
            var $cate2=$('#searchOrganCategory2');
            $cate2.height('auto');
            $cate2.find('.sm-checkbox').height(listHeight-30);

            var $searchOrganPanel = $('.searchOrgan-panel');
            var $category = $searchOrganPanel.attr('data-name')=='brandNo' ? $cate1 : $cate2;
            var categoryPanelHeight = $category.height();
            var titleHeight = 31;
            if($searchOrganPanel.is(':visible')){
                var panelWidth = $category.width() + 2;
                var categoryOffset = $category.offset();
                var panelHeight = categoryPanelHeight - titleHeight;
                $searchOrganPanel.panel({
                    width: panelWidth,
                    height: panelHeight,
                    left: categoryOffset.left,
                    top: categoryOffset.top + titleHeight
                });
            }
		};
		
        // bind events
        function bind(jq, param) {
            var datasource = $.data(jq, 'filterbuilder');
            var options = datasource.options;
            var op = $.extend({}, options);
            op.href = options.url;

            if (op.href && op.type == undefined) {
                if (op.href.indexOf('searchCommon') >= 0) {
                    op.type = 'item';
                    options.type = 'item';
                }
                else if (op.href.indexOf('searchOrgan') >= 0) {
                    op.type = 'organ';
                    options.type = 'organ';
                }
            }

            op.onSave = function (panel) {
                if ($.isFunction(options.onSave)) {
                    var flag = window.searchCommon ? (window.searchCommon.id ? false : true) : false;
                    if (flag && window.searchOrgan && !window.searchOrgan.id) {
                        // 判断同一页面同时调用通用商品查询和通用机构查询的情况
                        if ($('#searchOrganContainer').is(':visible')) {
                            flag = false;
                        }
                    }
                    var that = flag ? window.searchCommon : window.searchOrgan;
                    var mdm = flag ? window.commonMdm : window.organMdm;
                    var show = flag ? "商品" : "机构";
                    var value = that.category.get.data();
                    //存储选择的条件为全局变量，以便实现记忆还原功能
                    var topWin= (function (p,c){
                        while(p!=c){
                            c = p;     
                            p = p.parent;
                        }
                        return c;
                    })(window.parent,window);
                    if(flag){
                    	 if (value && ((value.condition && value.condition.value )||(value.conditions && value.conditions.length>0)))
                    		 topWin.__temporary__.item.push(value);
                    }
                    var condition = {};
                    if (value && value.codeList) {
                        condition = {"codeList": value.codeList};
                        if (flag && options.sqlFlag && options.sqlFlag == 1) {//若是通用商品查询，判断用户设置的参数sqlFlag，若为1表示可以返回查询sql
                            condition.resultType = 2;//因为codeList已经有值，所以设置返回结果类型resultType为2，表示返回的是查询结果
                        }
                    } else {
                        var rsp = flag ? mdm.filterbuilder.validate(value) : mdm.organSelector.validate(value);
                        datasource.mdm = mdm;
                        if (!rsp.state) {
                            showInfo(rsp.msg);
                            return;
                        }
                        if (flag) {//通用商品查询
                            //判断用户设置的参数sqlFlag，若为1表示可以返回查询sql
                            //判断是否选了扩展条件（折扣，价格，上柜日）若选了扩展条件则返回查询结果，否则返回查询条件
                            if (options.sqlFlag && options.sqlFlag == 1 && !value.extendFlag) {
								condition.codeList = mdm.filterbuilder.getSql(value, options.mix);
                                condition.resultType = 1;//设置返回结果类型resultType为1，表示返回的是查询sql                               
                            } else if (options.sqlFlag && options.sqlFlag == 1 && value.extendFlag) {                               
                                condition = mdm.filterbuilder.getResult(value, options.mix);
								condition.resultType = 2;//设置返回结果类型resultType为2，表示返回的是查询结果
                            } else {
                                condition = mdm.filterbuilder.getResult(value, options.mix);
                            }
                        } else {//通用机构查询
                            condition = mdm.organSelector.getResult(value, options.mix);
                        }
                    }
                    $.data(jq, 'filterbuilder').data = {value: value, condition: condition};
                    if (condition.codeList && condition.codeList.length > 0) {
                        if (condition.codeList.length == 1 && (condition.codeList[0] == "00000" || condition.codeList[0] == "00000000000000")) {
                            $(jq).val('<无结果返回>');
                        } else if (condition.resultType && condition.resultType == 1) {
                            $(jq).val('<已设置查询语句>');
                        } else {
                            var sum = condition.codeList.length;
                            $(jq).val('<已设置' + show + sum + '个>');
                        }
                    } else {
                        $(jq).val('<无结果返回>');
                    }

                    options.onSave.call(jq, value);					
                    panel.close();
                }
            };

            //阻止反复生成组件
            if (!$(jq).parent().hasClass("ipt-search-box")) {
                //生成通用查询组件
                var eDiv = $('<div class="ipt-search-box" />')
                    .width($(jq)._outerWidth() + 22);
                $(jq).wrap(eDiv).after($('<i />'));
            }

            // 打开面板前的loading效果
            var opts = {
                lines: 10, // The number of lines to draw
                length: 15, // The length of each line
                width: 5, // The line thickness
                radius: 12, // The radius of the inner circle
                scale: 1, // Scales overall size of the spinner
                corners: 1, // Corner roundness (0..1)
                color: '#fff', // #rgb or #rrggbb or array of colors
                opacity: 0.25, // Opacity of the lines
                rotate: 0, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                fps: 20, // Frames per second when using setTimeout() as a fallback for CSS
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                className: 'spin', // The CSS class to assign to the spinner
                top: '50%', // Top position relative to parent
                left: '50%', // Left position relative to parent
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                position: 'absolute' // Element positioning
            };
            var spin = $('#spin');
            if(spin.length==0){
                $('body').append('<div id="spin"></div>');
                spin = $('#spin');
            }
            var target = document.getElementById('spin');
            seajs.use(['spin'],function(){
                var spinner = new Spinner(opts);
                window.spinner = spinner;
            });

            function hideSpin(){
                spinner.spin();
                spin.hide();
            }

            //触发通用查询
            $(jq).siblings("i")
                .unbind('click.iptSearch')
                .bind('click.iptSearch', function () {
                    spin.show();
                    spinner.spin(target);
                    //获取顶层window
                    var topWin= (function (p,c){
                        while(p!=c){
                            c = p;        
                            p = p.parent;
                        }
                        return c;
                    })(window.parent,window);
                    if (op.type == 'item') {
                		op.openFn = function () {
                            hideSpin();
                        	//判断这次打开的控件跟上次打开的控件是否是同一个
                        	if(searchCommon && window.__currentItemFilterID != jq.id){//若不是同一个则重新设置初始化参数
                        		searchCommon.getOptions();
								searchCommon.view.back();
								window.commonMdm = mdm;
								//清空数据
    							searchCommon.clear();
    							//还原条件，处理上次选择的数据，绑定各自的数据源
    							searchCommon.condition();
								//还原最近一次设置的查询条件
	                            if(topWin.__temporary__ 
	    							&& topWin.__temporary__.item
	    							&& topWin.__temporary__.item.get()
	    							&& window.commonMdm.filterbuilder.datasource
	    							&& window.commonMdm.filterbuilder.datasource._loaded){
	    							//选择最近的一个暂存模板显示
	    						    searchCommon.condition.select("临时-0");
	    						}
                       	 	}else if(searchCommon && window.__currentItemFilterID == jq.id){
                       	 		//还原条件，处理上次选择的数据，绑定各自的数据源
    							searchCommon.condition();
                       	 	}
                        };
                		window.__currentItemFilterID = jq.id;							
                    		
                        seajs.use(['itemFilter', 'searchCommon'], function () {
                            search(op);
                        });
                    }else if (op.type == 'organ') {
                    	if(typeof window.__currentOrganFilterID == 'undefined'){
                    		op.openFn = function () {
                                hideSpin();
                            };
                    		window.__currentOrganFilterID = jq.id;
                    	}else if(window.__currentOrganFilterID != jq.id){
                    		op.openFn = function () {
                                hideSpin();
                                if(searchOrgan){
                                    searchOrgan.getOptions();
									searchOrgan.back();									
                                    window.organMdm = mdm;
                                    searchOrgan.init(window.organMdm);
                                }
                            };
                    		window.__currentOrganFilterID = jq.id;
                    	}else if(window.__currentOrganFilterID == jq.id){
							op.openFn = function () {
                                hideSpin();
                            };
						}
                    		
                        seajs.use(['organFilter', 'searchOrgan'], function () {
                            search(op);
                        });
                    }
                });

            //缓存filterbuilder的options属性，这样会造成跨域问题请慎重对待
            window.__filterbuilderID = jq.id;
            if (window.__cache__ && window.__cache__[__filterbuilderID]) {
                window.__cache__[__filterbuilderID].filterbuilderOpts = 
                $.extend(window.__cache__[__filterbuilderID].filterbuilderOpts, options);
            } else {
                if(!window.__cache__)
                    window.__cache__ = {};
                window.__cache__[__filterbuilderID] = {};
                window.__cache__[__filterbuilderID].filterbuilderOpts = $.extend({},options);
            }

        }

        $.fn.filterbuilder = function (options, params) {
            if (typeof options == 'string') {
                return $.fn.filterbuilder.methods[options](this, params);
            }
            options = options || {};
            return this.each(function () {
                var state = $.data(this, 'filterbuilder');
                if (state) {
                    $.extend(state.options, options);
                } else {
                    $.data(this, 'filterbuilder', {
                        options: $.extend({}, $.fn.filterbuilder.defaults, $.fn.filterbuilder.parseOptions(this), options)
                    });
                }
                bind(this);
            });
        };

        function getData(jq) {
            var datasoruce = $.data(jq[0], 'filterbuilder');
            var data = datasoruce.data;
            if (data && data.condition)
                return data.condition;
            return null;
        }

        //解析页面data-options属性
        $.fn.filterbuilder.parseOptions = function (target) {
            return $.parser.parseOptions(target);
        };

        $.fn.filterbuilder.methods = {
            options: function (jq) {
                return jq.data('filterbuilder');
            },
            getData: function (jq) {
                var el = jq[0];
                var options = $.data(el, 'filterbuilder').options;
                var data = $.data(el, 'filterbuilder').data;
                if (!data)
                    return null;
                else
                    return data.value;
            },
            getValue: function (jq) {
                var el = jq[0];
                //判断el是否为filterbuilder组件
                if (!el)
                    return false;
                var options = $.data(el, 'filterbuilder').options;
                var data = getData(jq);
                var result = "";
                var value = jq.val();
                //若使用了通用查询，则返回查询的结果
                if ((value.match("无结果") || value.match("已设置")) && data) {
                    if (data.resultType) {
                    	result = {};
                    	result.resultType = data.resultType;
                    	result.codeList = data.codeList;
                        if (data.resultType == 2)
                        	result.codeList = data.codeList.join(",") || "";
                    } else {
                    	result = data.codeList.join(",") || "";
                    }
                } else {//若未使用通用查询，则获取上级文本框中的输入值
                    //判断当前查询是通用商品查询还是通用机构查询
                    //var options = $.data(jq[0], 'filterbuilder').options;
                    var flag = options.type == 0 || options.type == 'item';
                    if (flag) {//若是通用商品查询，因为商品的code跟no不一样，所以需要取上级文本框中输入的货号到通用查询中查询出商品的no返回
                        if (value) {
                            //组织商品查询条件
                            var sql = "code LIKE '%" + value + "%'";
                            if (options.sqlFlag && options.sqlFlag == 1) {
                            	result = {};
                            	result.resultType = 1;
                            	result.codeList = sql;
                            } else {
                                var reParams = {
                                    "condition": sql
                                };
                                //根据组织的查询条件查询出商品
                                var local = window.location.origin;
                                var topWin = window;
                                while (topWin != topWin.parent) {
                                    local = topWin.parent.location.origin;
                                    topWin = topWin.parent;
                                }
                                var url = "/item_filter/confirm";
                                window.mdm.ajax({
                                    type: 'GET',
                                    url: url,
                                    data: reParams,
                                    dataType: 'text',
                                    jsonp: "callback",
                                    cache: false,
                                    async: false,
                                    success: function (json) {
                                        if(typeof json == 'string'){
                                        	result = $.parseJSON(json).codeList.join(",") || "";
                                        }else{
                                        	result = json.codeList.join(",") || "";
                                        }
                                    },
                                    error: function (msg) {
                                    	result = "";
                                        showInfo("获取数据出现错误!");
                                    }
                                });
                            }

                        } else {
                        	result = "";
                        }

                    } else {//若是通用机构查询，因为机构的code跟no是一样的，可以直接返回用户在上级文本框中输入的机构编码
                    	result = value.split(/[\s,，\-]/g).join(",") || "";
                    }
                    jq.data('filterbuilder').data = null;
                }
                return result;
            },
            clear: function (jq) {
                jq.each(function (i, d) {
                    $.data(d, 'filterbuilder').data = null;
                });
                jq.val('');
            }
        };

        $.fn.filterbuilder.defaults = {
            title: '通用条件查询',
            //url: bootPATH+'modules/resources/filterbuilder.html',
            mix: false,
            enableSaveButton: true
        };

        //添加EasyUI插件
        if ($.parser) {
            $.parser.plugins.push('filterbuilder');
        }

    })(jQuery);
}