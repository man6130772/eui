//通用查询方法
(function(fn){
    if(typeof seajs !== 'undefined'){
        define(function(require, exports, module){
            require('itemFilter');
            module = fn(jQuery);
        });
    }else{
        fn(jQuery);
    }
})
(function ($) {
    if (typeof searchCommon === "undefined") {
        var searchCommon;
        window.searchCommon = searchCommon = {};
    }
    let BRAND_FEILD = "brand_no";
    let REFRESH_FEILDS = [4,6,7,8];
    searchCommon.data = { };
    
    /**
     * 全局配置参数
     */
    var sqlFlag = window.__cache__ ?(window.__cache__[__currentItemFilterID].filterbuilderOpts.sqlFlag||0):0;//返回查询sql标识
    var maxRowNum = window.__cache__ ?(window.__cache__[__currentItemFilterID].filterbuilderOpts.maxRowNum||0):0;//查询预览结果界面显示的最大数据记录条数

    //大数据存储
    var BIG_DATA_ARR = [];

    /**
     * 获取cache里当前的全局配置参数
     */
    searchCommon.getOptions = function () {
        sqlFlag = window.__cache__ ?(window.__cache__[__currentItemFilterID].filterbuilderOpts.sqlFlag||0):0;//返回查询sql标识
        maxRowNum = window.__cache__ ?(window.__cache__[__currentItemFilterID].filterbuilderOpts.maxRowNum||0):0;//查询预览结果界面显示的最大数据记录条数
    }
    
    /**
     * 暂存模板处理,将暂存模板存于顶层window中
     */
    var topWin= (function (p,c){
        while(p!=c){
            c = p;        
            p = p.parent;
        }
        return c;
    })(window.parent,window);
    
    if(!topWin.__temporary__)
    	topWin.__temporary__ = {};
	if(!topWin.__temporary__.item){
		topWin.__temporary__.item = {};
	    $.extend(topWin.__temporary__.item,{
	        //数组，用于存储最新的3个临时查询模板
	        queryTemp:[],
	        //保存查询模板至数组，若数组大小超过3个则根据保存时间大小移除超过的查询模板
	        push:function(value){
	            var id = value.id;
	            //判断新加入的模板是否已经是暂存模板即已存在暂存数组中，
	            //若是暂存模板则删除原来的旧模板，再把新的模板加入到数组开头
	            if(id && isNaN(id) && id.indexOf("临时")>-1){
	                //删除旧模板
	                //var index = id.substr(id.indexOf("-")+1);
	                //window.__temporary__.item.queryTemp.splice(index,1);
	                delete value.id;
	                delete value.name;
	            }
	            topWin.__temporary__.item.queryTemp.unshift(value);
	            while(topWin.__temporary__.item.queryTemp.length>3){
	            	topWin.__temporary__.item.queryTemp.pop();
	            }
	        },
	        //获取最新的一个查询模板
	        get:function(){
	            if(topWin.__temporary__.item.queryTemp 
	                    && topWin.__temporary__.item.queryTemp.length>0){
	                return topWin.__temporary__.item.queryTemp[0]
	            }
	        },
	        //清空查询模板
	        clear:function(){
	        	topWin.__temporary__.item.queryTemp = [];
	        }
	    });
    }

    /**
     * 加载搜索条件
     */
    searchCommon.condition = function () {
        //获取条件列表
        var cdtData = commonMdm.filterbuilder.getList() || [];
        if(topWin.__temporary__.item
                && topWin.__temporary__.item.queryTemp){
            var chinaDigit = ['一','二','三'];
            var n = topWin.__temporary__.item.queryTemp.length;
            //遍历暂存模板
            for(var i = (n>3?3:n)-1; i >= 0; i--){
                //组织暂存模板的id与name以供显示在下拉框中，暂存模板id包含临时二字
                var node = {
                        "id": ("临时"+"-"+i),
                        "name": ("临时查询模板"+chinaDigit[i])
                    };
                //将node加至数组cdtData最前面
                cdtData.unshift(node);
            }
        }
        var t = $("#searchCommonCondition");
        var comboboxWidth = t.parent().width()-20;
        t.combobox({
            width: comboboxWidth,
            valueField: "id",
            textField: "name",
            data: cdtData,
            editable: false,
            onSelect: function (record) {
                searchCommon.condition.select(record.id);
            }
        });
    };
    //选中搜索条件并初始化数据
    searchCommon.condition.select = function (id) {
        var t = $("#searchCommonCondition");
        t.combobox('setValue', id);
        var data = {};
        //根据id判断选中的模板是否是暂存模板（暂存模板id包含临时二字）
        if(isNaN(id) && id.indexOf("临时")>-1){
            var index = id.substr(id.indexOf("-")+1);//取得索引
            var memoryData = topWin.__temporary__.item.queryTemp[index];
            //若有品牌选中，则根据品牌重新加载显示的查询属性
            var brandNos = null;
            if(memoryData && memoryData.conditions){
            	$.each(memoryData.conditions,function(i,node){
            		if(node.name == BRAND_FEILD){
            			brandNos = node.values;
            			return false;
            		}
            	});
            }
            if(brandNos){
            	mdm.filterbuilder.datasource.filterFieldByBrand(brandNos);
            }
            data = window.commonMdm.filterbuilder.treatCondition(memoryData);
        }else{
            data = commonMdm.filterbuilder.getCondition(id);
        }
        //还原条件
        searchCommon.category.initConditions(data);
    };
    
    //获取条件属性
    searchCommon.condition.get = {
        id: function () {
            var cdtSelect = $("#searchCommonCondition");
            return cdtSelect.combobox('getValue');
        },
        name: function () {
            var cdtSelect = $("#searchCommonCondition");
            return cdtSelect.combobox('getText');
        }
    };

    /**
     * 加载属性类别
     */
    searchCommon.category = function () {
        var t = $("#searchCommonCategory");
        $(".sm-cell", t).remove();

        var categoryCount = 8;
        var categoryNode = "";
        var cellHeight = $('.sm-categories').height()-31;
        categoryNode += '<div class="sm-cell">';
        categoryNode += '<h4><em>属性</em><i></i></h4>';
        categoryNode += '<div class="sm-cell-list" style="height:'+cellHeight+'px">';
        categoryNode += '</div>';
        categoryNode += '</div>';
        var $category = $(categoryNode);

        var closePanel = function(){
            if($('.common-prop-box').is(':visible')){
                searchCommon.category.getChecked();
            }
            $(".sm-cell", "#searchCommonCategory").removeClass("active");
            $(".searchCommon-panel").panel('destroy');
        }

        var createMenus = function(fields, cdtIndex){
            var p = $(".searchCommon-panel");
            var tt = $(".sm-cell", t).eq(cdtIndex).find(".sm-cell-list");

            var categorySelect = function(){
                var self = $(this);
                var dataField = self.attr("data-field");
                var dataName = self.attr("data-name");
				var dataText = self.text();
                var sData = []; 
                var tData = {
                    field: dataField,
                    name: dataName,
                    text: dataText
                };
                var cell = $('.searchCommon-category-second');

                if($('.searchCommon-panel').hasClass('searchCommon-brand-panel')){
                    self.toggleClass('selected');
                    $('.prop-search-checkbox').removeClass('checked');
                    var brandUnitNos = [];
                    $('.selected','.searchCommon-category-first').each(function(){
                        var code = $(this).attr('data-code');
                        brandUnitNos.push(code);
                    });
                    var cData = [];
                    $('.searchCommon-category-second').children('.selected').each(function(){
                        var dataCode = $(this).attr('data-code');
                        cData.push(dataCode);
                    });
                    var mergeData = $.merge(window.searchCommonCData,cData);
                    var newCData = $.unique(mergeData);
                    window.searchCommonCData = newCData;
                    var callback = function(data){
                        sData = data;
                        searchCommon.category.list(cell, sData, tData, newCData);
                    }
                    mdm.filterbuilder.getBrand(brandUnitNos,callback);
                }else{
					sData = commonMdm.filterbuilder.datasource.get(dataField)||[];
                    var field =  commonMdm.filterbuilder.datasource.getField(dataField);
                    tt.empty().siblings("h4").find("em").attr({
                        'data-type': field.dataType,
                        'data-name': dataName,
                        'data-field': dataField
                    }).text(dataText);

                    self.addClass('selected').siblings('div').removeClass('selected');
                    $('.prop-search-checkbox').removeClass('checked');
                    searchCommon.category.list(cell, sData, tData);
                }
                // p.panel('destroy');
            };
            var categoryQuery = function(){
                var self = $(this);
                var field = self.attr("data-field");
                var name = self.attr("data-name");
                var tempDiv = $("<div />");
                var backDiv = "";
                    backDiv += '<div';
                    backDiv += ' data-field="'+field+'"';
                    backDiv += ' data-name="'+name+'"';
                    backDiv += '>返回上一级</div>';
                backDiv = $(backDiv);
                var fields = commonMdm.filterbuilder.datasource.getProductCategory(field,true)||[];
                var menus = createMenus(fields, cdtIndex);
                tempDiv.append(backDiv, menus);
                p.panel({
                    content: tempDiv.children()
                });
            };

            var divWrapper = $("<div />");
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
				if(!field || field.hidden){
					continue;
				}
                var div = $('<div class="category-item" />');
                var dataField = field.property;
                var dataName = field.columnName;
				var dataCode;
                var dataText = field.property;
                var em = $(".sm-cell", t).eq(cdtIndex).find('em');
                if(em.attr('data-name')==BRAND_FEILD){
                    dataField = '品牌';
                    dataText = field.name;
					dataName = BRAND_FEILD;
					dataCode = field.code;
                }
                var fText = (field.type=='category') ?
                     ("<em style='color:"+(dataName.contains('style')?'green':dataName.contains('series')?'blue':'red')
                    		 +";font-size:10px;margin-right:2px;'>"+field.level+".</em>"+dataText)
                     : dataText;
                div.attr('data-field', dataField);
                div.attr('data-name', dataName);
				if(dataCode){
					div.attr('data-code', dataCode);
				}
                div.html(fText);
                divWrapper.append(div);
            }
            $('body').off('click.firstCate').on('click.firstCate', '.category-item', categorySelect);
            return divWrapper.children();
        };

        for (var i = 0; i < categoryCount; i++) {
            var category = $category.clone();
            $("h4>i", category).on('click', function () {
                var self = $(this);
                var offset = $('#searchCommonCategory').offset();
                var p = $('.searchCommon-panel');            
                var cdtIndex = $(".sm-cell", t).index(self.closest(".sm-cell"));

                var commonPanel = $('body > .panel.window:visible');
                var commonPanelZIndex = commonPanel.css('z-index');
                var boxZIndex = parseInt(commonPanelZIndex)+6;
                var smCell = self.parent().parent();

                var em = $(this).siblings('em');
                var dataName = em.attr('data-name');
                var dataField = em.attr("data-field");
                var dataText = em.text();
                var smCellList = self.parent().siblings('.sm-cell-list');

                if(!smCell.hasClass("active") && $('.common-prop-box').is(':visible')){
                    searchCommon.category.getChecked();
                }
 
                var menus;
                if(dataName == BRAND_FEILD){
                    var callback = function(data){
                        menus = createMenus(data, cdtIndex);
                    }
                    brandFields = mdm.filterbuilder.getBrandUnit(callback);
                }else{
					var fields = commonMdm.filterbuilder.datasource.getField();
                    fields = $.extend([], fields);
					searchCommon.category.filter(fields);
					menus = createMenus(fields, cdtIndex);
				}
                var div = $('<div/>');
                var categoryPanelClass = (dataName==BRAND_FEILD) ? ' searchCommon-brand-panel' : '';
                var firstSearchBox = $('<p class="prop-search-box"><input type="text" class="prop-search-text" /></p>');
                var secondSearchBox = $('<p class="prop-search-box"><span class="prop-search-span"><i class="prop-search-checkbox"></i></span><input type="text" class="prop-search-text" /></p>');
                var panelLeft = $('<div class="searchCommon-panel-left" />').append(firstSearchBox);
                var panelRight = $('<div class="searchCommon-panel-right" />').append(secondSearchBox);
                var categoryFirst = $('<div class="searchCommon-category-list searchCommon-category-first" />').append(menus);
                panelLeft.append(categoryFirst);
                panelRight.append('<div class="searchCommon-category-list searchCommon-category-second" />');
                div.append(panelLeft).append(panelRight);
                var content = div.children();
                var cellTitleHeight = 30;
                var panelHeight = $('.sm-categories', '#searchCommonCategory').height() - cellTitleHeight;

                if(!smCell.hasClass("active")){
                    $(".sm-cell", "#searchCommonCategory").removeClass("active");
                    smCell.addClass("active");
                    if(p.length>0){
                        p.panel('destroy');
                    }
                    p = $('<div class="searchCommon-panel '+categoryPanelClass+'"></div>').appendTo("body");
                    p.panel({
                        width: $('#searchCommonCategory').width() + 2,
                        height: panelHeight,
                        left: offset.left,
                        top: offset.top + 31,
                        content: content
                    });
                    p.parent().addClass('common-prop-box').css({
                        'z-index':boxZIndex
                    });

                    var searchHeight = $('.prop-search-box').outerHeight();
                    var categoryHeight = panelHeight - searchHeight - 2;
                    $('.searchCommon-category-list', '.searchCommon-panel').height(categoryHeight);
                    
                    $('.panel-tool-close').off('click.close').on('click.close', function(){
                        if($(this).closest('.panel').has('#searchCommonContainer')){
                            closePanel();
                        }
                    });

                    if(dataName){
                        var sData = commonMdm.filterbuilder.datasource.get(dataField)||[];
                        var tData = {
                            field: dataField,
                            name: dataName,
                            text: dataText
                        };
                        var cData = [];
                        var tt = $('.searchCommon-category-second');
                        smCellList.children('.selected').each(function(){
                            var dataCode = $(this).attr('data-code');
                            cData.push(dataCode);
                        });
                        if(dataName == BRAND_FEILD){
                            var brandUnitNos = [];
                            var callback = function(data){
                                searchCommon.category.list(tt, data, tData, cData);
                            }
                            mdm.filterbuilder.getBrand(brandUnitNos,callback);
                            window.searchCommonCData = [];
                        }else{
                            searchCommon.category.list(tt, sData, tData, cData);
                        }
                    }
                }else{
                    if($('.common-prop-box').is(':visible')){
                        searchCommon.category.getChecked();
                    }
                    smCell.removeClass("active");
                    p.panel('destroy');
                }
            });

            $('.sm-categories', t).append(category).removeClass('loading16');
        }

        //关闭panel
        $('body').on('click.panel', function(event){
            if(!$(event.target).is("h4>i", "#searchCommonCategory") && 
                !$(event.target).is(".searchCommon-category-first") && 
                !$(event.target).is(".searchCommon-category-second") && 
                !$(event.target).is(".searchCommon-category-first>div") && 
                !$(event.target).is(".searchCommon-category-second>span") && 
                !$(event.target).is(".prop-search-box") && 
                !$(event.target).is(".prop-search-span") && 
                !$(event.target).is(".prop-search-checkbox") && 
                !$(event.target).is(".prop-search-text") && 
                $('.common-prop-box').is(':visible'))
            {
                closePanel();
            }
        });

        //查找过滤属性
        $('body').off('input.search').on('input.search', '.prop-search-text', function(){
            var keyword = $(this).val().toLowerCase();
            var list = $(this).parent().siblings('.searchCommon-category-list').children();
            $(list).each(function(){
                var _self = $(this);
                var text = _self.text().toLowerCase();
                if(text.indexOf(keyword)>=0){
                    _self.show();
                }else{
                    _self.hide();
                }
            });
        });
        
        // 全选按钮
        $('body').off('click.checkAll').on('click.checkAll', '.prop-search-checkbox', function(){
            var secondCates = $('.searchCommon-category-second').children();
            if(secondCates.length==0)
                return;
            if($(this).hasClass('checked')){
                $(this).removeClass('checked');
                secondCates.filter(':visible').removeClass('selected');
            }else{
                $(this).addClass('checked');
                secondCates.filter(':visible').addClass('selected');
            }
        });

        //扩展属性
        var others = $(".sm-others", t);
        $("label", others).off('click').on('click', function () {
            $(this).toggleClass("selected");
        });
        $("input.ipt", t).val("");

        //设置参考机构默认值
        //var organ = window.commonMdm.filterbuilder.getCurOrgan();
        //$("#searchCommonOrgan").combobox('setValue', organ.organNo);
        $("#searchCommonOrgan").combobox({
            valueField: "organNo",
            textField: "name",
            panelHeight: 110,
            prompt: '请输入参考机构...',
            onChange: searchCommon.category.extend.organChange
        });

        $("#searchCommonPriceType").combobox({
            valueField: "id",
            textField: "name",
            panelHeight: 'auto',
            data: searchCommon.category.extend.priceCombo
        });

        // $("#searchCommonOrgan").next().children('.combo-text').on('input',function(){
        //     var newValue = $(this).val();
        //     searchCommon.category.extend.organChange(newValue);
        // });

        $("#searchCommonOrgan,#searchCommonPriceType", t).combobox('clear');
        //$("#searchCommonPriceType", t).combobox('clear');


    };
    
    //默认第一列加载品牌属性
    searchCommon.loadBrand = function () {
        var cat = $("#searchCommonCategory");
        var catCells = $(".sm-cell", cat);
        var souData = commonMdm.filterbuilder.datasource.get("品牌") || {};
        var fieData = {
            name: BRAND_FEILD,
            field: '品牌',
            text: "品牌"
        };
        var cellList = $(catCells[0]).find(".sm-cell-list");
        // searchCommon.category.list(cellList, souData, fieData);

        var brandUnitNos = [];
        var callback = function(data){
            searchCommon.category.list(cellList, data, fieData);
        }
        mdm.filterbuilder.getBrand(brandUnitNos,callback);
    };
    
    //过滤重复的属性
    searchCommon.category.filter = function (fields) {
		var t = $("#searchCommonCategory");
		var cells = $(".sm-cell", t);
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			var curCell = $("em[data-name='"+field.columnName+"'][data-field='"+field.property+"']",cells);
			//查找当前属性所在索引
			var cdtIndex = $(".sm-cell", t).index(curCell.closest(".sm-cell"));
			if(cdtIndex > -1 || fields.hidden){//索引位置大于-1表示属性是打开的
				delete fields[i];
			}
		}
    };

    /**
     * 检查是否选中checkbox
     */
    searchCommon.category.propCheckbox = function () {
        var secondCates = $('span', '.searchCommon-category-second');
        var secondCatesSelected = $('.selected', '.searchCommon-category-second');
        if( secondCates.length == 0 )
            return;
        if( secondCatesSelected.length == secondCates.length )
            $('.prop-search-checkbox').addClass('checked');
        
        if( secondCatesSelected.length < secondCates.length || secondCatesSelected.length == 0 )
            $('.prop-search-checkbox').removeClass('checked');
    };

    /**
     * 收集被选择的数据
     */
    searchCommon.category.getChecked = function () {
        var t = $(".sm-cell.active", "#searchCommonCategory").find(".sm-cell-list");
        var em = t.siblings("h4").find("em");
        var firstCate = $('div.selected', '.searchCommon-category-first');
        var secondCate = $('.searchCommon-category-second');
        var secondCates = $('span.selected', '.searchCommon-category-second');
        var dataArr = [];
        var sData = {};
        var tData = {
            field: secondCate.attr("data-field"),
            name: secondCate.attr("data-name"),
            text: secondCate.attr("data-text")
        };

        if(!em.attr('data-name'))
            return;

        var cData = [];
		var dataName = tData.name;
        var dataField = tData.field;
        sData = commonMdm.filterbuilder.datasource.get(dataField);
        secondCates.each(function(){
            var dataCode = $(this).attr('data-code');
            cData.push(dataCode);
        });
        if(dataName==BRAND_FEILD){
            window.searchCommonCData = window.searchCommonCData==undefined ? [] : window.searchCommonCData;
            var mergeData = $.merge(window.searchCommonCData,cData);
            var newCData = $.unique(mergeData);
            window.searchCommonCData = newCData;
            cData = newCData;
        }
        searchCommon.category.list(t, sData, tData, cData);
    };

    /**
     * 列出属性的子类
     * @param t 显示列表的DIV对象
     * @param sData{Array} 根据field查询到的子类
     * @param tData{Object} 根目录的field(datasource)和text
     * @param cData{Array} 被选中子类的code
     */
    searchCommon.category.list = function (t, sData, tData, cData) {
        var field =  commonMdm.filterbuilder.datasource.getField(tData.field);
        t.empty().siblings("h4").find("em").attr({
            'data-type': field.dataType,
            'data-name': tData.name,
            'data-field': tData.field
        }).text(tData.text);
        var codeArr = cData || [];
        var spanWrapper = $('<div />');
        var items = sData || [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemCode = item.code ? item.code : item.no;
            var span = $('<span data-code="' + itemCode
                    + '" name="' + item.name
                    + '" data-field="' + tData.field + '">'
                    + item.name + '</span>');
            if (codeArr.length > 0) {
                for (var j = 0; j < codeArr.length; j++) {
                    if (codeArr[j] == itemCode) {
                        span.addClass("selected");
                        break;
                    }
                }
            }
            span.appendTo(spanWrapper);
        }
        var dataAttr = {
                'data-field':tData.field,
                'data-name':tData.name,
                'data-text':tData.text
        };
        if($('.searchCommon-panel').hasClass('searchCommon-brand-panel')){
            var brandNode = $(".sm-cell.active>h4", "#searchCommonCategory").find('em');
            dataAttr = {
                'data-field': brandNode.attr("data-field"),
                'data-name': brandNode.attr("data-name"),
                'data-text': brandNode.text()
            }
        }
        if(t.is('.searchCommon-category-second')){
            t.attr(dataAttr);
        }
        var spans = spanWrapper.children();
        spans.appendTo(t);
        searchCommon.category.propCheckbox();
        spans.on('click.list', function () {
            var text = $(this).text();
            if($('.searchCommon-panel').hasClass('searchCommon-brand-panel')||$(this).attr("data-field")=='品牌'){
                text = '品牌';
            }
            var field =  commonMdm.filterbuilder.datasource.getField(text);
            //if(!field.multiple) {
            //    spans.removeClass('selected');
            //}
            $(this).toggleClass("selected");
            if($(this).parent().is('.searchCommon-category-second')){
                searchCommon.category.propCheckbox();
                searchCommon.category.getChecked();
            }

            //若当前点击的是品牌，则需要根据品牌重新设置4品牌属性，6款式，7系列，8扩充属性的数据源
            if(field && field.name == BRAND_FEILD){
                var brandNos = [];
                $.each(spans, function () {
                    var span = $(this);
                    if (span.hasClass("selected")) {
                        brandNos.push(span.attr("data-code"));
                    }
                });
                //根据品牌更新属性分类的hidden值
                mdm.filterbuilder.datasource.filterFieldByBrand(brandNos);
                $(".sm-cell", "#searchCommonCategory").each(function(index, el) {
                    var em = $("h4>em", $(this));
                    var dataType = em.attr('data-type');
                    var dataField = em.attr('data-field');
                    if($.inArray(parseInt(dataType), REFRESH_FEILDS)>-1){
                        var cellList = $(this).find('.sm-cell-list');
                        var listData = commonMdm.filterbuilder.datasource.get(dataField);
                        var field =  commonMdm.filterbuilder.datasource.getField(dataField);
                        if(!listData || !field || field.hidden){
                        	em.removeAttr("data-field");
                        	em.removeAttr("data-name");
                        	em.removeAttr("data-text");
                        	em.text("属性");
                        	cellList.empty();
                        }else{
                        	var fieldData = {
                                    field: em.attr("data-field"),
                                    name: em.attr("data-name"),
                                    text: em.text()
                             };
                             searchCommon.category.list(cellList, listData, fieldData);
                        }
                    }
                });
            }
        });
    };
    //初始化其它条件
    searchCommon.category.condition = function(data) {
        var t = $("#itemSearchText");
        t.val(data.value);
    };
    //初始化被选中的分类
    searchCommon.category.conditions = function (data) {
        //searchCommon.clear(); //清除分类
        searchCommon.category();//清空属性
        var t = $("#searchCommonCategory");
        var cells = $(".sm-cell", t);
        for (var i = 0; i < data.length; i++) {
            var condition = data[i];
            var field = condition.field;
            var values = condition.values;
            var sData = commonMdm.filterbuilder.datasource.get(field.property) || {};
            var tData = {
                name: field.columnName,
                field: field.property,
                text: field.property
            };
            var tt = $(cells[i]).find(".sm-cell-list");
            searchCommon.category.list(tt, sData, tData, values);
        }
    };
    //其它分类条件
    searchCommon.category.extend = function (data) {
        var t = $("#searchCommonCategory");
        var tt = $(".sm-others", t);
        var c1 = $(".sm-discount", tt);
        var c2 = $(".sm-price", tt);
        var c3 = $(".sm-organ", tt);
        var c4 = $(".sm-cabinetDate", tt);
        var v1 = data.saleoff;
        var v2 = data.price;
        var v3 = data.priceType;
        var v4 = data.cabinetDate;
        var v5 = data.organ;
        
        $("label",c1).removeClass("selected");
        $("label",c2).removeClass("selected");
        $("label",c4).removeClass("selected");

        $("input.ipt", c1).each(function (i) {
            $(this).val(v1[i]);
            if(v1[i] && !$("label",c1).hasClass("selected"))
                $("label",c1).addClass("selected");
        });
        $("input.ipt", c2).each(function (i) {
            $(this).val(v2[i]);
            if(v2[i] && !$("label",c2).hasClass("selected"))
                $("label",c2).addClass("selected");
        });
        $("input.ipt", c4).each(function (i) {
            $(this).datebox('setValue', v4[i]);
            if(v4[i] && !$("label",c4).hasClass("selected"))
                $("label",c4).addClass("selected");
        });

        $("#searchCommonPriceType").combobox('setValue', v3);
        $("#searchCommonOrgan").combobox('setValue', v5.organNo);
    };
    //价格类型
    searchCommon.category.extend.priceCombo = [
        {id: 1, name: "牌价"}, {id: 2, name: "现价"}
    ];
    //动态获取机构列表
    searchCommon.category.extend.organChange = function(newValue, oldValue){
        var t = $("#searchCommonOrgan");
        var callback = function(rsp){
            t.combobox('loadData', rsp);
        };
        if(newValue != null && newValue != undefined && newValue !="")
            commonMdm.filterbuilder.getOrgan(newValue, callback);
    };
    //获取条件
    searchCommon.category.get = {
        condition: function(){
            var t = $("#itemSearchText");
            var value = t.val();
            var subtype =$.data(t[0],"subtype");
            return {
                value:  value,
                subtype:subtype
            };
        },
        conditions: function () {
            var cdtData = new Array();
            var t = $("#searchCommonCategory");
            //获取分类属性列表
            var cells = $(".sm-cell", t);
            cells.each(function() {
                var obj = {
                    name: "",
                    op: "in",
                    values: []
                };
                var cell = $(this);
                var spans = $("span", cell);
                var classify = $("h4>em", cell);
                var flag = false;
                $.each(spans, function () {
                    var span = $(this);
                    if (span.hasClass("selected")) {
                        obj.values.push(span.attr("data-code"));
                        flag = true;
                    }
                });
                if (flag) {
                    obj.name = classify.attr("data-name");
                    cdtData.push(obj);
                }
            });
            return cdtData;
        },
        extend: function () {
            var data = {};

            var t = $("#searchCommonCategory");
            var tt = $(".sm-others", t);
            var c1 = $(".sm-discount", tt);
            var c2 = $(".sm-price", tt);
            var c3 = $(".sm-organ", tt);
            var c4 = $(".sm-cabinetDate", tt);
            var v1 = [];
            var v2 = [];
            var v3 = "";
            var v4 = [];
            var v5 = {};

            if($("label",c1).hasClass("selected")){//判断是否勾选此条件，只有勾选了才传到后台去
                $("input.ipt", c1).each(function (i) {
                    v1[i] = $(this).val();
                });
            }
            if($("label",c2).hasClass("selected")){//判断是否勾选此条件，只有勾选了才传到后台去
                $("input.ipt", c2).each(function (i) {
                    v2[i] = $(this).val();
                });
                v3 = $("#searchCommonPriceType").combobox('getValue');
            }
            
            if($("label",c4).hasClass("selected")){//判断是否勾选此条件，只有勾选了才传到后台去
                $("input.ipt", c4).each(function (i) {
                    v4[i] = $(this).datebox('getValue');
                });
            }

            var v5_data = $("#searchCommonOrgan").combobox('getData');
            var v5_value = $("#searchCommonOrgan").combobox('getValue');
            for(var i=0; i<v5_data.length; i++){
                var item = v5_data[i];
                if(item.organNo == v5_value){
                    v5 = item;
                    delete v5.domId;
                    break;
                }
            }

            data.saleoff = v1;
            data.price = v2;
            data.priceType = v3;
            data.cabinetDate = v4;
            data.organ = v5;

            return data;
        },
        data: function () {
            var json = {};
            var tab = $("#searchCommonTabs").tabs('getSelected');
            var index = $('#searchCommonTabs').tabs('getTabIndex',tab);
            //判断当前处于哪个tab页，若处于筛选条件的tab页，则组织条件，若属于预览tab页，则组织选中的数据
            if(index==1){
                var noList = [];
                var t = $("#searchCommonViewResult");
                $.each($("ul.search-list>li:visible>span.i", t),function(i,item){
                    noList.push($(item).attr("data-no"));
                });
                //若查询无结果返回则加入一个14个0的项返回，以使接收结果者增加这个无法查处结果的过滤条件
                if(noList.length==0){
                    noList.push("00000000000000");
                }
                json.codeList = noList;
            }
            var cdtId = searchCommon.condition.get.id();
            var cdtName = searchCommon.condition.get.name();
            var condition = this.condition();
            var conditions = this.conditions();
            var extend = this.extend();
            var exclude = searchCommon.view.result.getCodes();

            json.id = cdtId;
            json.name = cdtName;
            json.type = 1;
            json.condition = condition;
            json.conditions = conditions;
            json.extend = extend;
            //判断是否选了扩展条件（机构，价格，上柜日，折扣）
            //只需要判断机构即可，因为机构是必选项
            json.extendFlag = false;
            for(var a in extend.organ){
                json.extendFlag = true;
                break;
            }
            json.exclude = exclude;
            json.remark = searchCommon.category.isChanged(condition,conditions,extend);
            //预览界面显示的最大数据记录条数
            if(maxRowNum != 0)
                json.maxRowNum = maxRowNum;
            
            return json;
        }
    };
    
    //判断表单值是否有变化
    searchCommon.category.isChanged = function(condition,conditions,extend){
        var isChanged = 0; 
        
        var oldcondition = searchCommon.data.condition || {};
        var oldconditions = searchCommon.data.conditions || [];
        var oldextend = searchCommon.data.extend || [];
        
        if(JSON.stringify(oldcondition) != JSON.stringify(condition) && JSON.stringify(oldconditions) != JSON.stringify(conditions) || JSON.stringify(oldextend) != JSON.stringify(extend))
            isChanged = 1;
        return isChanged;
    };

    /**
     * 保存查询条件
     */
    searchCommon.save = function (e) {
        var opts = e.data;
        var flag = opts.type == 1 ? true : false; //1保存；2另存

        var saveDlg = $('<div id="searchCommonSaveDlg" />');
        saveDlg.append("body");

        var cdtId = searchCommon.condition.get.id();
        var cdtName = searchCommon.condition.get.name();
        //若是暂存模板则清空名称
        if(isNaN(cdtId) && cdtId.indexOf("临时")>-1){
            cdtName = "";
        }
        if (typeof cdtName == "undefined" || cdtName == "") 
            flag = false; //另存

        var content = "";
        content += '<div style="padding: 20px 25px;">';
        content += '<label>名称：</label>';
        content += '<input id="searchCommonCdtName" type="text" class="easyui-validatebox ipt" value="' + cdtName + '" ';
        content += flag ? 'disabled="disabled" ' : ' '; //如果是保存则禁止改变条件名称
        content += 'data-options="required:true" ';
        content += 'style="width:200px;height:26px;line-height:26px;" />';
        content += '</div>';

        var saveHandler = function () {
            var json = searchCommon.category.get.data();
            var id = json.id;
            //判断是否是暂存模板，若是暂存模板则不用传id与name到后台
            if(id && isNaN(id) && id.indexOf("临时")>-1){
                delete json.id;
                delete json.name;
            }
            if (flag) { //保存
                json.id = cdtId;
            } else { //另存
                delete json.id;
                cdtName = $("input#searchCommonCdtName").val();
            }
            if(cdtName == ""){
                $('#searchCommonCdtName').focus();
                return false;
            }
            json.name = cdtName;
            saveDlg.dialog('close');
            var rsp = commonMdm.filterbuilder.validate(json);
            if(rsp.state){
                commonMdm.filterbuilder.save(json, searchCommon.save.callback);
            } else {
                alert(rsp.msg);
            }
        };
        saveDlg.dialog({
            title: flag ? "保存" : "另存为",
            width: 320,
            height: 160,
            content: content,
            modal: true,
            buttons: [
                {
                    text: "确定",
                    iconCls: "icon-save",
                    handler: saveHandler
                },
                {
                    text: "取消",
                    iconCls: "icon-cancel",
                    handler: function () {
                        saveDlg.dialog('close');
                    }
                }
            ],
            onClose: function () {
                saveDlg.dialog('destroy');
            }
        });
    };
    //保存成功后回调
    searchCommon.save.callback = function (rsp) {
        if (typeof rsp.id === "undefined") {
            var cdtSelect = $("#searchCommonCondition");
            cdtSelect.combobox('select', 1);
            return;
        }else if(rsp.id == -1 && !rsp.success){
            alert(rsp.errorMsg);
            return;
        }
        var rid = rsp.id;
        //var cdtData = commonMdm.filterbuilder.getList() || [];
        //searchCommon.condition(cdtData);
        searchCommon.condition();
        searchCommon.condition.select(rid);
    };

    /**
     * 删除查询条件
     */
    searchCommon.remove = function () {
        var msg = "你确定要删除此筛选条件吗？";
        var cdtId = searchCommon.condition.get.id();
        var okFn = {};
        //根据id判断要删除的模板是否是暂存模板（暂存模板id包含临时二字）
        if(isNaN(cdtId) && cdtId.indexOf("临时")>-1){
            okFn = function () {
                var index = cdtId.substr(cdtId.indexOf("-")+1);
                topWin.__temporary__.item.queryTemp.splice(index,1);
            };
        }else{
            okFn = function () {
                commonMdm.filterbuilder.remove(cdtId, searchCommon.remove.callback);
            };
        }
        if(cdtId !== ""){
            showConfirm(msg, okFn);
        } else {
            alert("请先选择筛选条件。");
        }
    };
    //删除成功后回调
    searchCommon.remove.callback = function (rsp) {
        if (rsp.success) {
            var cdtData = commonMdm.filterbuilder.getList() || [];
            searchCommon.condition(cdtData);
            //searchCommon.clear();     
            searchCommon.category();//清空属性
            //默认第一列加载品牌属性
            searchCommon.loadBrand();
        } else {
            alert(rsp.errorMsg);
        }
    };

    /**
     * 清空查询条件
     */
    searchCommon.clear = function () {
        //清空选择框
        $("#searchCommonCondition").combobox('clear');
        //清空属性
        searchCommon.category();
        //默认第一列加载品牌属性
        searchCommon.loadBrand();
        
        //清空扩展属性
        var t = $("#searchCommonCategory");
        var tt = $(".sm-others", t);
        var c1 = $(".sm-discount", tt);
        var c2 = $(".sm-price", tt);
        var c4 = $(".sm-cabinetDate", tt);

        $("input.ipt", c1).each(function (i) {
            $(this).val();
            if($("label",c1).hasClass("selected"))
                $("label",c1).removeClass("selected")
        });
        $("input.ipt", c2).each(function (i) {
            $(this).val();
            if($("label",c2).hasClass("selected"))
                $("label",c2).removeClass("selected")
        });
        $("input.ipt", c4).each(function (i) {
            $(this).datebox('clearValue');
            if($("label",c4).hasClass("selected"))
                $("label",c4).removeClass("selected")
        });

        $("#searchCommonPriceType").combobox('clear');
        $("#searchCommonOrgan").combobox('clear');
    };

    /**
     * 预览
     */
    searchCommon.view = function () {
        var data = searchCommon.category.get.data();
        var id = data.id;
        //判断是否是暂存模板，若是暂存模板则不用传id与name到后台
        if(id && isNaN(id) && id.indexOf("临时")>-1){
            delete data.id;
            delete data.name;
        }
        var rsp = commonMdm.filterbuilder.validate(data);
        if(rsp.state){
            //清空预览结果，提高界面切换速度
            try{
                if(maxRowNum != 0){//显示记录限制数
                    $("#maxRowNumHint").html("(已限制查询记录数最大值为"+maxRowNum+")");
                }else{
                    $("#maxRowNumHint").empty();
                }
                $("#searchCommonViewResult").empty();
                $("#searchCommonViewRecycle").datagrid('loadData',{total:0,rows:[]});
            } catch(e){}

            var t = $("#searchCommonTabs");
                t.tabs('select', 1);

            searchCommon.view.tabs.select(0);

            var callback = function(viewData){
                searchCommon.view.result.preview(viewData);
            };

            commonMdm.filterbuilder.getPreviewItem(data, callback);
        } else {
            alert(rsp.msg);
        }
    };
    searchCommon.view.tabs = {
        select: function (idx) {
            var t = $("#searchCommonViewTabs");
            var tt = $("#searchCommonResultTabs");
            $("a", t).removeClass("selected")
                .eq(idx)
                .addClass("selected");
            tt.tabs('select', idx);
        }
    };
    //格式化数据
    searchCommon.view.formatter = {
        remove: function (value, row, index) {
            var no = row.no ? row.no : value;
            var a = "";
            a += '<a href="javascript:void(0);" class="scc-icon-remove" title="删除" ';
            a += 'onclick="searchCommon.view.result.remove(this);" ';
            a += 'data-no="' + no + '">';
            a += '</a>';
            return a;
        },
        restore: function (value, row, index) {
            var no = row.no ? row.no : value;
            var a = "";
            a += '<a href="javascript:void(0);" class="scc-icon-restore" title="还原" ';
            a += 'onclick="searchCommon.view.result.restore(this);" ';
            a += 'data-no="' + no + '">';
            a += '</a>';
            return a;
        }
    };
    //处理结果集
    searchCommon.view.result = {
        preview: function (viewData) {
            var t = $("#searchCommonViewResult");
            var tab = $("#rstViewBtn");

            $("em", tab).remove();
            tab.append('<em>' + viewData.length + '</em>');

            var lis="", cells=5, idx=0,
                count=parseInt(viewData.length/cells)+viewData.length%cells;

            var _height = t.parent()._outerHeight();
            lis += '<div class="search-list-header datagrid-header">';
                lis += '<div class="cell">';
                    lis += '<span>序号</span>';
                    lis += '<span>编码</span>';
                lis += '</div>';
                lis += '<div class="cell">';
                    lis += '<span>序号</span>';
                    lis += '<span>编码</span>';
                lis += '</div>';
                lis += '<div class="cell">';
                    lis += '<span>序号</span>';
                    lis += '<span>编码</span>';
                lis += '</div>';
                lis += '<div class="cell">';
                    lis += '<span>序号</span>';
                    lis += '<span>编码</span>';
                lis += '</div>';
                lis += '<div class="cell">';
                    lis += '<span>序号</span>';
                    lis += '<span>编码</span>';
                lis += '</div>';
            lis += '</div>';
            lis += '<div class="search-list-body" style="height:'+(_height-25)+'px;">';
            lis += '<ul class="search-list">';
            for(var i=0; i<count; i++){
                var D1=viewData[idx], D2=viewData[idx+1], D3=viewData[idx+2],
                    D4=viewData[idx+3], D5=viewData[idx+4];
                //1
                if(D1){
                    lis += '<li>';
                    lis += '<span>'+(idx+1)+'</span>';
                    lis += '<span>'+D1.code+'</span>';
                    lis += '<span class="i" data-no="'+D1.no+'"></span>';
                    lis += '</li>';
                    BIG_DATA_ARR[D1.no] = D1;
                }
                //2
                if(D2){
                    lis += '<li>';
                    lis += '<span>'+(idx+2)+'</span>';
                    lis += '<span>'+D2.code+'</span>';
                    lis += '<span class="i" data-no="'+D2.no+'"></span>';
                    lis += '</li>';
                    BIG_DATA_ARR[D2.no] = D2;
                }
                //3
                if(D3){
                    lis += '<li>';
                    lis += '<span>'+(idx+3)+'</span>';
                    lis += '<span>'+D3.code+'</span>';
                    lis += '<span class="i" data-no="'+D3.no+'"></span>';
                    lis += '</li>';
                    BIG_DATA_ARR[D3.no] = D3;
                }
                //4
                if(D4){
                    lis += '<li>';
                    lis += '<span>'+(idx+4)+'</span>';
                    lis += '<span>'+D4.code+'</span>';
                    lis += '<span class="i" data-no="'+D4.no+'"></span>';
                    lis += '</li>';
                    BIG_DATA_ARR[D4.no] = D4;
                }
                //5
                if(D5){
                    lis += '<li>';
                    lis += '<span>'+(idx+5)+'</span>';
                    lis += '<span>'+D5.code+'</span>';
                    lis += '<span class="i" data-no="'+D5.no+'"></span>';
                    lis += '</li>';
                    BIG_DATA_ARR[D5.no] = D5;
                }
                idx += cells;
            }
            lis += '</ul>';
            lis += '</div>';
            t[0].innerHTML = lis;

            $("ul.search-list>li>span.i", t).off().on('click', this.remove);

            this.recycle();
        },
        recycle: function () {
            var t = $("#searchCommonViewRecycle");
            var tab = $("#rstTrashBtn");
            var cdtId = searchCommon.condition.get.id();
            var viewData = [];
            if(!cdtId){
                viewData = [];
            }else if(isNaN(cdtId) && cdtId.indexOf("临时")>-1){
                /*var index = cdtId.substr(cdtId.indexOf("-")+1);
                var data = window.__temporary__.item.queryTemp[index];
                if(data && data.exclude)
                    viewData = data.exclude;*/
            }else{
                viewData = commonMdm.filterbuilder.getExItem(cdtId);
            }

            $("em", tab).remove();
            tab.append('<em>' + viewData.length + '</em>');
            t.datagrid({
                emptyMsg: '',
                idField: 'code',
                data: viewData
            });
        },
        //从结果集中删除商品
        remove: function (e) {
            /*var t = $("#searchCommonViewResult");
            var t2 = $("#searchCommonViewRecycle");
            var t3 = $("em", $("#rstViewBtn"));
            var t4 = $("em", $("#rstTrashBtn"));
            var self = $(this);
            var code = self.attr("data-code");
            var idx = getRowIndex(that);
            t.datagrid('selectRow', idx);

            var row = t.datagrid('getSelected');
            var v1 = parseInt(t3.text());
            var v2 = parseInt(t4.text());
            t.datagrid('deleteRow', idx);
            t2.datagrid('appendRow', row);
            t3.text(v1 - 1);
            t4.text(v2 + 1);*/
            var t = $("#searchCommonViewRecycle"), t2 = $("em", $("#rstViewBtn")), t3 = $("em", $("#rstTrashBtn"));
            var v1 = parseInt(t2.text()), v2 = parseInt(t3.text());
            var self = $(this), no = self.attr("data-no"), row=BIG_DATA_ARR[no];
            t2.text(v1 - 1); t3.text(v2 + 1);
            self.closest("li").remove(); t.datagrid('appendRow', row);
        },
        //从回收站中还原商品
        restore: function (that) {
            var self = $(that);
            var t = $("#searchCommonViewResult");
            var t2 = $("#searchCommonViewRecycle");
            var t3 = $("em", $("#rstViewBtn"));
            var t4 = $("em", $("#rstTrashBtn"));
            var idx = getRowIndex(that);
            var row = t2.datagrid('getRows')[idx];
            var v1 = parseInt(t3.text());
            var v2 = parseInt(t4.text());
            t2.datagrid('deleteRow', idx);
            t3.text(v1 + 1);
            t4.text(v2 - 1);

            var li = "";
            li += '<li>';
            li += '<span><i class="scc-icon-restore" title="从回收站还原回来的数据"></i></span>';
            li += '<span>'+row.code+'</span>';
            li += '<span class="i" data-no="'+row.no+'"></span>';
            li += '</li>';
            t.find("ul.search-list").append($(li));
        },
        filter: function () {
            /*var t = $("#searchCommonViewResult");
            var t1 = $("#searchCommonFilterValue");
            var val = t1.val();
            var field = 'code';

            t.datagrid("showRows", true);

            var rows = t.datagrid('getRows');
            if ($.string.isNullOrEmpty(val)) { t1.focus(); return; }
            var filterRows = $.array.filter(rows, function (row) { return (String(row["code"]).indexOf(val) == -1 && String(row["name"]).indexOf(val) == -1); });

            t.datagrid("hideRows", filterRows);
            t1.focus();*/

            var t = $("#searchCommonViewResult"), t1 = $("#searchCommonFilterValue"), t2 = $("em", $("#rstViewBtn"));
            var val = t1.val(), lis = $("ul.search-list>li",t);
            if ($.string.isNullOrEmpty(val)) { t1.focus(); lis.show(); t2.text(lis.length); return; } lis.hide();
            $("ul.search-list>li>span:nth-child(2):contains('"+val+"')",t).closest("li").show();//比对第二个span的内容，第二个span中的内容为货号，
            t2.text($("ul.search-list>li:visible",t).length);
        },
        getCodes: function () {
            var codesArr = [];
            try {
                var t = $("#searchCommonViewRecycle");
                var rows = t.datagrid('getData').rows;
                for (var i = 0; i < rows.length; i++) {
                    var row = rows[i];
                    codesArr.push(row.code);
                }
            } catch (e) {
                //console.log("Error: "+e.message);
            }
            return codesArr;
        }
    };
    //预览结果
    searchCommon.view.preview = function () {
        searchCommon.view.tabs.select(0);
    };
    //预览回收站
    searchCommon.view.recycle = function () {
        searchCommon.view.tabs.select(1);
    };
    //退出预览
    searchCommon.view.back = function () {
        var t = $("#searchCommonTabs");
        t.tabs('select', 0);
    };

    /**
     * 初始化页面数据
     */
    searchCommon.init = function () {
        //searchCommon._mdm = mdm;
        //初始化条件列表和对应的属性列表
        var div = $('#searchCommonMain')[0];
        var file = $('#searchCommonFile')[0];
        if( file.addEventListener)
            file.addEventListener('change', handleFile, false);
        if(div.addEventListener) {
            div.addEventListener('dragenter', handleDragover, false);
            div.addEventListener('dragover', handleDragover, false);
            div.addEventListener('drop', handleDrop, false);
        }
        $('#itemSearchText').on('keydown',function(){
            $.data($('#itemSearchText')[0],"subtype",0);
        });
        $.data($('#itemSearchText')[0],"subtype",0);
        var self = this;
        var interval = setInterval(function () {
            clearInterval(interval);
            self.condition();
            self.category();
            commonMdm.filterbuilder.datasource.load();
            //默认第一列加载品牌属性
            self.loadBrand();
            //若属性数据已全部加载完成，则还原上次所选择的条件
            if(commonMdm.filterbuilder.datasource._loaded){
                 //还原最近一次的查询模板
                var data = topWin.__temporary__.item.get();
                if(data)
                	searchCommon.condition.select("临时-0");
            }
            //事件监听
            $("#saveBtn").on('click', {type: 1}, self.save);
            $("#save2Btn").on('click', {type: 2}, self.save);
            $("#removeBtn").on('click', self.remove);
            $("#clearBtn").on('click', self.clear);
            $("#viewBtn").on('click', self.view);
            $("#rstViewBtn").on('click', self.view.preview);
            $("#rstTrashBtn").on('click', self.view.recycle);
            $("#rstBackBtn").on('click', self.view.back);
            $("#searchCommonViewResultFilter").on('click', self.view.result.filter);
        }, 100);
        
        // if($('#tabs-panels > .panel').eq(1).is(':visible')){
        //     $('#searchCommonTabs').tabs('select',0);
        //     $("#clearBtn").click();
        // }
    };
    
    /**
     * 还原选择的条件
     */
    searchCommon.category.initConditions = function(data){
        if(!data) return;
        
        if(data.id){
            var t = $("#searchCommonCondition");
            t.combobox('setValue', data.id);
        }
        
        var condition =  data.condition || {};
        var conditions = data.conditions || [];
        var extend = data.extend || [];
        
        searchCommon.category.condition(condition);
        searchCommon.category.conditions(conditions);
        searchCommon.category.extend(extend);
        
        searchCommon.data.condition = condition;
        searchCommon.data.extend = extend;
        searchCommon.data.conditions = [];
        $.each(conditions, function (i, item) {
            var obj = {
                    name: item.name,
                    op: item.op,
                    values: item.values
            };
            searchCommon.data.conditions.push(obj);
        });
    };
    
    function handleFiles(files){
        commonMdm.filterbuilder.handleFiles(files,function(items){
            var content = items.join(",");
            $('#itemSearchText').val(content);
            $.data($('#itemSearchText')[0],"subtype",1);
        });
    }
    function handleDrop(e) {
        e.stopPropagation();
        e.preventDefault();
        var callback = e.target.callback;
        var files = e.dataTransfer.files;
        handleFiles(files);
    }
    function handleDragover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }
    function handleFile(e){
        var files = e.target.files;
        handleFiles(files);
    }

    /**
     * 创建dom结构
     */
    function initCommonHtml(){
        var _html = '';
        _html += '<div id="searchCommonContainer" class="scc filterbuilder" style="width:720px;height:510px; display:none;">';
            _html += '<div class="easyui-layout" data-options="fit:true,border:false">';
                _html += '<div region="center" data-options="border:false">';
                    _html += '<div id="searchCommonTabs" class="easyui-tabs" data-options="fit:true,border:false,showHeader:false">';
                        _html += '<div title="searchCommonT1" id="searchCommonMain">';
                            _html += '<div class="easyui-layout" data-options="fit:true,border:false">';
                               _html += '<div region="north" style="height: 70px; border: 0 none;">';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div class="input-group fb-panel-import">';
                                            _html += '<div class="input-group-addon">其它条件</div>';
                                            _html += '<div class="input-group-content">';
                                                _html += '<input class="ipt" id="itemSearchText" placeholder="请输入商品编码，名称进行模糊查询，英文逗号分隔多个条件；或者通过导入按钮批量导入商品编码。" />';
                                            _html += '</div>';
                                            _html += '<div class="input-group-btn">';
                                                _html += '<div class="input-file l-btn">';
                                                    _html += '<i class="icon-import"></i>';
                                                    _html += '<span class="text">导入</span>';
                                                    _html += '<input type="file" id="searchCommonFile" value="导入" />';
                                                _html += '</div>';
                                            _html += '</div>';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                                _html += '<div region="center" data-options="border:false">';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div id="searchCommonCategory" class="sm-cells clearfix">';
                                            _html += '<div class="sm-categories loading16">';
                                            _html += '</div>';
                                            _html += '<div class="sm-others">';
                                                _html += '<div class="sm-organ">';
                                                    _html += '<span>参考机构：</span>';
                                                        _html += '<input id="searchCommonOrgan" style="width:160px" ';
                                                        _html += ' />';
                                                _html += '</div>';
                                                _html += '<div class="sm-price">';
                                                    _html += '<label>价格(<em class="unit">￥</em>)：</label>';
                                                    _html += '<input id="searchCommonPriceType" style="width:100px" />';
                                                    _html += ' <input class="ipt" type="text" />';
                                                    _html += ' - ';
                                                    _html += '<input class="ipt" type="text" />';
                                                _html += '</div>';
                                                _html += '<div class="sm-discount">';
                                                    _html += '<label>折扣(<em class="unit">%</em>)：</label>';
                                                    _html += '<input class="ipt" type="text" />';
                                                    _html += ' - ';
                                                    _html += '<input class="ipt" type="text" />';
                                                _html += '</div>';
                                                _html += '<div class="sm-cabinetDate">';
                                                    _html += '<label>上柜日：</label>';
                                                    _html += '<input id="searchCommonDateStart" class="easyui-datebox ipt" type="text" data-options="width:110, maxDate:\'searchCommonDateEnd\'" />';
                                                    _html += '-';
                                                    _html += '<input id="searchCommonDateEnd" class="easyui-datebox ipt" type="text" data-options="width:110, minDate:\'searchCommonDateStart\'" />';
                                                _html += '</div>';
                                            _html += '</div>';
                                        _html += '</div>';
                                        _html += '<div class="sm-btns">';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                                _html += '<div region="south" style="height: 60px; border: 0 none;">';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div class="input-group sc-panel-template">';
                                            _html += '<div class="input-group-addon">已保存方案</div>';
                                            _html += '<div class="input-group-content">';
                                                _html += '<select id="searchCommonCondition" style="width: 436px; height: 32px;" placeholder="请选择已保存模板"></select>';
                                            _html += '</div>';
                                            _html += '<div class="input-group-btn">';
                                                _html += '<a id="saveBtn" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:\'icon-save\'">保存</a>';
                                                _html += ' <a id="save2Btn" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:\'icon-saveTo\'">另存</a>';
                                                _html += ' <a id="removeBtn" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:\'icon-del\'">删除</a>';
                                                _html += ' <a id="clearBtn" href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:\'icon-empty\'">清空</a>';
                                                _html += '<button id="viewBtn" class="easyui-linkbutton" data-options="iconCls:\'icon-see\'">';
                                                    _html += '<span class="text">预览</span>';
                                                _html += '</button>';
                                            _html += '</div>';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                            _html += '</div>';
                        _html += '</div>';
                        _html += '<div title="searchCommonT2">';
                            _html += '<div class="easyui-layout" data-options="fit:true,border:false">';
                                _html += '<div region="north" data-options="border:false" style="height: 120px;">';
                                    _html += '<div class="sm-panel">';
                                        _html += '<h3 class="sm-title">预览结果<span id="maxRowNumHint" class="maxRowNumHint"></span></h3>';
                                        _html += '<div class="input-group sc-panel-preview">';
                                            _html += '<div class="input-group-content">';
                                                _html += '<input id="searchCommonFilterValue" class="ipt" placeholder="可以对预览结果进行筛选" />';
                                            _html += '</div>';
                                            _html += '<div class="input-group-btn">';
                                                _html += '<div id="searchCommonViewResultFilter" class="input-file c-btn">';
                                                    _html += '<i class="icon-search"></i>';
                                                    _html += '<span class="text">筛选</span>';
                                                _html += '</div>';
                                            _html += '</div>';
                                        _html += '</div>';
                                    _html += '</div>';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div id="searchCommonViewTabs" class="sm-tabs">';
                                            _html += '<a id="rstViewBtn" href="javascript:void(0);">';
                                                _html += '<i class="icon-see"></i>';
                                                _html += ' <span>预览结果</span> ';
                                            _html += '</a>';
                                            _html += '<a id="rstTrashBtn" href="javascript:void(0);">';
                                                _html += '<i class="icon-empty"></i>';
                                                _html += ' <span>回收站</span> ';
                                            _html += '</a>';
                                            _html += '<a id="rstBackBtn" href="javascript:void(0);">';
                                                _html += '<i class="icon-back"></i>';
                                                _html += ' <span>返回</span> ';
                                            _html += '</a>';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                                _html += '<div region="center" style="border-width: 1px 0 0;">';
                                    _html += '<div id="searchCommonResultTabs" class="easyui-tabs" data-options="fit:true,border:false,showHeader:false">';
                                        _html += '<div title="searchCommonResultT1">';
                                            _html += '<div id="searchCommonViewResult"></div>';
                                        _html += '</div>';
                                        _html += '<div title="searchCommonResultT2">';
                                            _html += '<table id="searchCommonViewRecycle" data-options="';
                                                    _html += 'rownumbers: true,';
                                                    _html += 'pagination: false,';
                                                    _html += 'fitColumns: true,';
                                                    _html += 'enableHeaderClickMenu: false,';
                                                    _html += 'enableHeaderContextMenu: false,';
                                                    _html += 'enableRowContextMenu: false';
                                                _html += '">';
                                                _html += '<thead>';
                                                _html += '<tr>';
                                                    _html += '<th data-options="field:\'code\',width:35,align:\'left\'">商品编码</th>';
                                                    _html += '<th data-options="field:\'name\',width:60,align:\'left\'">商品名称</th>';
                                                    _html += '<th data-options="field:\'itemNo\',formatter:searchCommon.view.formatter[\'restore\']">操作</th>';
                                                _html += '</tr>';
                                                _html += '</thead>';
                                            _html += '</table>';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                            _html += '</div>';
                        _html += '</div>';
                    _html += '</div>';
                _html += '</div>';
            _html += '</div>';
        _html += '</div>';
        $('body').append(_html);
    }

    jQuery(document).ready(function ($) {
        initCommonHtml();

        window.commonMdm = mdm;
        searchCommon.init(window.commonMdm);
    });

});
