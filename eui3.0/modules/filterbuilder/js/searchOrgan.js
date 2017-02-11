//通用查询方法
(function(fn){
    if(typeof seajs !== 'undefined'){
        define(function(require, exports, module){
            require('organFilter');
            module = fn(jQuery);
        });
    }else{
        fn(jQuery);
    }
})
(function ($) {
    if (typeof searchOrgan === "undefined") {
        var searchOrgan;
        window.searchOrgan = searchOrgan = {};
    }

    /**
     * 宏定义
     */
    var ORGAN_TYPE_SHOP_CODE = "21", //店铺
        ORGAN_TYPE_GENERAL_CODE = "1", //总仓
        ORGAN_TYPE_CITY_CODE = "2", //城市仓
        ORGAN_TYPE_CHECK_CODE = "4", //质检仓
        ORGAN_TYPE_EXP_CODE = "5" //样品仓
        ORGAN_TYPE_RETURN_CODE = "7"; //退货仓

    /**
     * 全局配置参数
     */
    var curOrgan;
    if(window.__cache__ 
            && window.__cache__[__currentOrganFilterID].filterbuilderOpts 
            && window.__cache__[__currentOrganFilterID].filterbuilderOpts.curOrgan)
        curOrgan = window.__cache__[__currentOrganFilterID].filterbuilderOpts.curOrgan;//当前机构
    var roleType = window.__cache__ ?(window.__cache__[__currentOrganFilterID].filterbuilderOpts.roleType||'orderUnitshop'):'orderUnitshop';//何种权限过滤店铺标识
    //查询机构类型标识 后面使用位运算判断 （0000 默认仓库与店铺类型都显示，0001 机构类型为仓库， 0010 机构类型为店铺， 0100 默认显示经营城市。通过或运算计算 0101 仓库+经营城市，0110 店铺+经营城市）
    var organFlag = window.__cache__ ?(window.__cache__[__currentOrganFilterID].filterbuilderOpts.organFlag||0):0;
        category_list = [];
        category_list[0] = ["brandNo","organNo"];
        category_list[1] = ["storageType","retailType","multi",
            "shopLevel","channelNo","mallNo","regionNo","cmcdistNo"];
        category_list[2] = ["store"];
        isStorehouse = false;//查询条件页是否显示仓库标识

    /**
     * 获取cache里当前的全局配置参数
     */
    searchOrgan.getOptions = function () {
        roleType = window.__cache__ ?(window.__cache__[__currentOrganFilterID].filterbuilderOpts.roleType||'orderUnitshop'):'orderUnitshop';//何种权限过滤店铺标识
        organFlag = window.__cache__ ?(window.__cache__[__currentOrganFilterID].filterbuilderOpts.organFlag||0):0;//查询机构类型标识
    }

    /**
     * 初始化属性列表
     */
    searchOrgan.category = function () {
        //初始化机构信息
        var organStatus = organMdm.organSelector.getStatus();
        $("#searchOrganArea").text(organStatus.zone);
        $.each(organStatus.status,function(i,item){
            $("#searchOrganState>li").eq(item).addClass("checked");
        });

        var $t, $tt, field, name, sData;

        //生成第一列筛选条件
        var t = $("#searchOrganCategory1"); t.empty();//清空节点，防止记忆恢复功能交错
        var cArr = category_list[0];
        var cStr = "";
            cStr += '<div class="sm-cell">';
            cStr += '<h4><em></em></h4>';
            cStr += '<div class="sm-cell-list"></div>';
            cStr += '</div>';
        $t = $(cStr);
        for(var i=0; i<cArr.length; i++){
            name = cArr[i];
            field = organMdm.organSelector.datasource.getField(name);
            $tt = $t.clone();
            $("h4>em", $tt).text(field.text);
            $("h4", $tt).attr({"data-field": field.datasource, "data-name": field.name});
            $(".sm-cell-list", $tt).attr("data-multiple", field.multiple); t.append($tt);
            sData = organMdm.organSelector.datasource.get(name);
            if(name=='brandNo'){
                initPanel($tt);
            }
            fillDiv($(".sm-cell-list", $tt), sData);
        }

        //经营城市和货管单位
        cStr = "";
        cStr += '<div class="sm-cell">';
        cStr += '<h4 data-field="orderUnit_bizCity" data-name="orderUnit_bizCity"></h4>';
        cStr += '<div class="sm-cell-list" data-multiple="true"></div>';
        cStr += '</div>';
        $t = $(cStr);
        var comboStr = "";
        comboStr += '<select id="searchOrganCategorySwitch" style="width:100px;" ';

        //修复以前combobox组件写法上存在的不规范导致初始化出现事件丢失的问题
        // comboStr += '<select id="searchOrganCategorySwitch" class="easyui-combobox" style="width:210px;" ';
        // comboStr += 'data-options="';
        // comboStr += 'valueField:\'name\',';
        // comboStr += 'textField: \'text\',';
        // comboStr += 'readonly: true,';
        // comboStr += 'data: searchOrgan.category.orderUnitCombo,';
        // comboStr += 'onSelect: searchOrgan.category.orderUnitComboSelect';
        // comboStr += '"';
        
        comboStr += '></select>';
        $("h4", $t).html(comboStr);
        t.append($t);
        // $.parser.parse($t);
        $("#searchOrganCategorySwitch").combobox({
            valueField: "name",
            textField: "text",
            readonly: true,
            data: searchOrgan.category.orderUnitCombo,
            onSelect: searchOrgan.category.orderUnitComboSelect
        });

        //生成第一列搜索框
        var searchBoxHtml = '';
        searchBoxHtml += '<div class="organ-search-box">';
        searchBoxHtml += '<input type="text" class="organ-search-text" />';
        searchBoxHtml += '</div>';
        $("h4", "#searchOrganCategory1").prepend(searchBoxHtml);

        //生成第二列筛选条件
        t = $("#searchOrganCategory2"); t.empty(); cArr = category_list[1]; cStr = "";
        cStr += '<div class="sm-cell organ-type-shop">';
        cStr += '<h4><em></em></h4>';
        cStr += '<ul class="sm-checkbox"></ul>';
        cStr += '</div>';
        $t = $(cStr);
        for(var j=0; j<cArr.length; j++){
            name = cArr[j]; sData = null;
            field = organMdm.organSelector.datasource.getField(name);
            $tt = $t.clone();
            $("h4>em", $tt).text(field.text);
            $("h4", $tt).attr({"data-field": field.datasource, "data-name": field.name});
            $(".sm-checkbox", $tt).attr("data-multiple", field.multiple); t.append($tt);
            //店铺类型与店铺分类数据另行处理，根据所选上级分类加载数据

            var isFillUl = false,
                isExtend = false;
            if(field.name==category_list[1][0]){ //机构类别
               sData = organMdm.organSelector.datasource.get(name);
               //若organFlag是1,则加载完机构类型属性后，直接返回，不再加载后面的店铺属性。
               if(organFlag & 1){
                    fillUl($(".sm-checkbox", $tt), sData, field.name);
                    break;
                }
                isFillUl = true;
                //fillUl($(".sm-checkbox", $tt), sData, field.name);
            }else if(field.name==category_list[1][1]){ //店铺类型
                searchOrgan.category.saleModeSelect();
            }else if(field.name==category_list[1][2]){ //店铺分类
                searchOrgan.category.retailTypeSelect();
            // }else if(field.name==category_list[1][3]){ //店铺级别
            //     isFillUl = true;
            // }else if(field.name==category_list[1][4]){ //销售渠道
            //     isFillUl = true;
            }else if(field.name==category_list[1][5]){ //所在商场
                searchOrgan.category.bizCitySelect();
            }else if(
                    field.name==category_list[1][3]|| //店铺级别
                    field.name==category_list[1][4]|| //销售渠道
                    field.name==category_list[1][6]|| //所在片区
                    field.name==category_list[1][7] //所在商圈
                ){
                sData = organMdm.organSelector.datasource.get(name);
                $tt.data("data", $.extend({},sData));
                isExtend = true;
            }

            //如果是扩展属性则需要通过浮层选择
            if(isExtend){
                initPanel($tt);
            }

            //填充下拉列表
            if(isFillUl){
                sData = sData ? sData : organMdm.organSelector.datasource.get(name);
                fillUl($(".sm-checkbox", $tt), sData, field.name);
            }
        }

        //默认触发第一个选中
        if( organFlag && (organFlag & 2))//机构类型只有店铺时默认选中店铺
            $("h4[data-name='storageType']+ul>li:first", t).addClass("checked");
        
        //加载仓库数据
        if(window.__cache__[__currentOrganFilterID].memory && window.__cache__[__currentOrganFilterID].memory.isStorehouse){
            isStorehouse = true;
            //隐藏店铺属性
            var tt3 = $("div.organ-type-shop:gt(0)", t);
                tt3.hide();
            //加载仓库数据
            var storehouseOpts = {
                params: window.__cache__[__currentOrganFilterID].memory
            };
            var storeObj = store(storehouseOpts);
                storeObj.init();
        }

        /**
         * 弹出属性框
         */
        function initPanel(target){
            $("h4", target).append('<span class="icon icon-extend"></span>');
            $("h4", target).find("span.icon").click(function(){
                var fieldName = $("h4", target).attr('data-name');
                var self = $(this), offset = self.offset(), p=$("#propertiesSelector");
                if(self.hasClass("icon-extend")){
                    self.removeClass("icon-extend").addClass("icon-collapse");
                    self.closest(".sm-cell").addClass("active");
                    if(p.length>0){
                        p.panel('destroy');
                    }
                    p = $('<div id="propertiesSelector" class="searchOrgan-panel" data-name="'+fieldName+'"></div>').appendTo("body");
                    var organPanel = $('body > .panel.window:visible').has('#searchOrganContainer');
                    var organPanelOffset = organPanel.offset();
                    var organPanelZIndex = organPanel.css('z-index');
                    var categoryPanel = fieldName=='brandNo' ? $('#searchOrganCategory1') : $('#searchOrganCategory2');
                    var panelWidth = categoryPanel.width() + 5;
                    var panelHeight = categoryPanel.height() - 28;
                    var panelOffsetLeft = categoryPanel.offset().left;
                    var panelOffsetTop = categoryPanel.offset().top + 31;
                    var boxZIndex = parseInt(organPanelZIndex) + 6;
                    p.panel({
                        width: panelWidth,
                        height: panelHeight,
                        left: panelOffsetLeft,
                        top: panelOffsetTop,
                        onDestroy: function(){
                            self.removeClass("icon-collapse").addClass("icon-extend");
                            self.closest(".sm-cell").removeClass("active");
                        }
                    });
                    p.parent().addClass('organ-prop-box').css({
                        'z-index':boxZIndex
                    });

                    var listStr = (fieldName=='brandNo') ? _createBrandList(self) : _createList(self);

                    var searchHeight = $('.prop-search-box').outerHeight();
                    var categoryHeight = panelHeight - searchHeight - 4;
                    $('.searchOrgan-category-list', '.searchOrgan-panel').height(categoryHeight);

                    $('.panel-tool-close').off('click.close').on('click.close', function(){
                        if($(this).closest('.panel').has('#searchOrganContainer')){
                            closePanel();
                        }
                    });
                } else if(self.hasClass("icon-collapse")){
                    self.removeClass("icon-collapse").addClass("icon-extend");
                    self.closest(".sm-cell").removeClass("active");
                    p.panel('destroy');
                }
            });
        }

        //获取机构类别属性的内部函数
        function _getClassfy(cArr){
            var _data = sData.data;
            var _len = _data.length;
            var _tmp = [];
            for(var i=0; i<_len; i++){
                for(var j=0; j<cArr.length; j++){
                    if(_data[i].code==cArr[j]){
                        _tmp.push(_data[i]);
                        break;
                    }
                }
            }
            return _tmp;
        }

        //创建选择列表
        function _createList(that){
            var source = $(that).closest("div.sm-cell");
            var data = source.data("data");
            var target = $("ul.sm-checkbox",source);
            var codes = [];
            var items = $.isArray(data)?data:data.data||[];

            //获取下拉框的code
            var checkList = $("li.checked",target);
            checkList.each(function(){
                codes.push($(this).attr("data-code"));
            });

            //获取选择数据
            var _getChecked = function(evt){
                setTimeout(function(){
                if(evt.target && evt.target.nodeName.toLowerCase()=="li"){
                    //收集被选择的数据
                    var lis = $("li.checked",wrapper);
                    var dataArr = [];
                    $.each(lis, function(i){
                        var item = $.data(lis[i], "item");
                        dataArr.push(item);
                    });

                    //填充到下拉列表
                    fillUl(target, dataArr, data.name);

                    //触发默认选中项
                    $("li",target).each(function(){
                        $(this).attr("data-property", "extend");
                        $(this).trigger('click');
                    })
                }},10);
            };

            var list = $('<div />');
            var wrapper = $('<ul class="sm-checkbox category-list" data-multiple="true" />');
            var searchBox = $('<p class="prop-search-box"><input type="text" class="prop-search-text" /></p>');
            var dataName = $(that).parent('h4').attr('data-name');
            var dataNos = ['cmcdistNo','regionNo'];
            if($.inArray(dataName, dataNos) != -1){
                list.append(searchBox);
            }
            list.append(wrapper);
            var content = list.children();
            $('#propertiesSelector').panel({content:content});
            var titleCount = 7; //超过部分title提示
            for(var i=0; i<items.length; i++){
                var item = items[i];
                var itemTitle = item.name.length>titleCount ? ' title="'+item.name+'"' : '';
                var li = $('<li'+itemTitle+'>'+item.name+'</li>');
                for(var j=0; j<codes.length; j++){
                    var code = codes[j];
                    if(item.code == code){
                        li.addClass("checked");
                        break;
                    }
                }
                wrapper.append(li);
                li.data("item",item);
            }

            wrapper.on('click.checkList', _getChecked);
        }

        //创建品牌列表
        function _createBrandList(target){
            var self = target.parent();
            var dataField = self.attr('data-field');
            var dataName = self.attr('data-name');
            var dataText = self.children('em').text();

            var div = $('<div />');
            var firstSearchBox = $('<p class="prop-search-box"><input type="text" class="prop-search-text" /></p>');
            var secondSearchBox = $('<p class="prop-search-box"><span class="prop-search-span"><i class="prop-search-checkbox"></i></span><input type="text" class="prop-search-text" /></p>');
            var panelLeft = $('<div class="searchOrgan-panel-left" />').append(firstSearchBox);
            var panelRight = $('<div class="searchOrgan-panel-right" />').append(secondSearchBox);
            var categoryFirst = $('<div class="searchOrgan-category-list category-list searchOrgan-category-first" />');
            panelLeft.append(categoryFirst);
            panelRight.append('<div class="searchOrgan-category-list category-list searchOrgan-category-second" />');
            div.append(panelLeft).append(panelRight);
            var content = div.children();
            $('#propertiesSelector').panel({content:content}).addClass('searchOrgan-brand-panel');

            var tData = {
                field: dataField,
                name: dataName,
                text: dataText
            };

            var t = $('.searchOrgan-category-first');
            var brandUnitData = {
                name: "brand_no",
                field: 'brand',
                text: "品牌"
            };
            var callbackBrandUnit = function(data){
                var sDataBrandUnit = [];
                sDataBrandUnit.data = data;
                searchOrgan.category.list(t, sDataBrandUnit, brandUnitData);
            }
            mdm.organSelector.getBrandUnit(callbackBrandUnit);

            var cData = [];
            var tt = $('.searchOrgan-category-second');
            var brandUnitNos = [];
            var smCellList = self.siblings('.sm-cell-list');
            smCellList.children('.selected').each(function(){
                var dataCode = $(this).attr('data-code');
                cData.push(dataCode);
            });
            var callback = function(data){
                var sDataBrand = [];
                sDataBrand.data = data;
                searchOrgan.category.list(tt, sDataBrand, tData, cData);
            }
            mdm.organSelector.getBrand(brandUnitNos,callback);
            window.searchOrganCData = [];
        }

        //查找过滤属性
        $('body').on('input.search', '.prop-search-text', function(){
            var keyword = $(this).val().toLowerCase();
            var children = $(this).parent().siblings('.category-list').children();
            $(children).each(function(){
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
        $('body').on('click.checkAll', '.prop-search-checkbox', function(){
            var secondCates = $('.searchOrgan-category-second').children();
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

    };
    //货管单位和经营城市
    searchOrgan.category.orderUnitCombo = [
        {name: "orderUnitNo", text: "货管单位", "selected": true}, {name: "bizCityNo", text: "经营城市"}
    ];
    //0100表示默认显示经营城市，通过organFlag按位与0100 判断是否默认显示经营城市
   if(organFlag & 4){
       searchOrgan.category.orderUnitCombo[0].selected = false;
       searchOrgan.category.orderUnitCombo[1].selected = true;
   }else{
       searchOrgan.category.orderUnitCombo[0].selected = true;
       searchOrgan.category.orderUnitCombo[1].selected = false;
   }

    //第一列搜索框筛选功能
    $('body').on('input', '.organ-search-text', function(){
        searchOrgan.category.categoryPropSearch(this);
    });

    /**
     * 检查是否选中checkbox
     */
    searchOrgan.category.propCheckbox = function () {
        var secondCates = $('span', '.searchOrgan-category-second');
        var secondCatesSelected = $('.selected', '.searchOrgan-category-second');
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
    searchOrgan.category.getChecked = function () {
        var t = $(".sm-cell.active", "#searchOrganCategory1").find(".sm-cell-list");
        var h4 = t.siblings("h4");
        var firstCate = $('div.selected', '.searchOrgan-category-first');
        var secondCate = $('.searchOrgan-category-second');
        var secondCates = $('span.selected', '.searchOrgan-category-second');
        var dataArr = [];
        var sData = {};
        var tData = {
            field: h4.attr("data-field"),
            name: h4.attr("data-name"),
            text: h4.children('em').text()
        };

        if(firstCate.length==0 && secondCates.length==0)
            return;

        var cData = [];
        var dataName = tData.name;
        sData = organMdm.organSelector.datasource.get(dataName);
        secondCates.each(function(){
            var dataCode = $(this).attr('data-code');
            cData.push(dataCode);
        });
        if(dataName=="brandNo"){
            var mergeData = $.merge(window.searchOrganCData,cData);
            var newCData = $.unique(mergeData);
            window.searchOrganCData = newCData;
            cData = newCData;
        }
        searchOrgan.category.list(t, sData, tData, cData);
    };

    /**
     * 列出属性的子类
     * @param t 显示列表的DIV对象
     * @param sData{Array} 根据field查询到的子类
     * @param tData{Object} 根目录的field(datasource)和text
     * @param cData{Array} 被选中子类的code
     */
    searchOrgan.category.list = function (t, sData, tData, cData) {
        var codeArr = cData || [];
        var spanWrapper = $('<div />');
        var items = sData.data || [];
        t.empty();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemCode = item.code ? item.code : item.no;
            var span = $('<span data-code="' + itemCode
                    + '" name="' + item.name
                    + '" data-field="' + tData.name + '">'
                    + item.name + '</span>');
            if(t.is('.searchOrgan-category-first')){
                span = $('<div class="category-item" data-field="' + itemCode
                    + '" data-name="' + item.name + '">'
                    + item.name + '</div>');
            }
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
        if($('.searchOrgan-panel').hasClass('searchOrgan-brand-panel')){
            var brandNode = $(".sm-cell.active>h4", "#searchOrganCategory1");
            dataAttr = {
                'data-field': brandNode.attr("data-field"),
                'data-name': brandNode.attr("data-name"),
                'data-text': brandNode.children('em').text()
            }
        }
        if(t.is('.searchOrgan-category-second')){
            t.attr(dataAttr);
        }

        searchOrgan.category.propCheckbox();

        var spans = spanWrapper.children();
        spans.appendTo(t);
        spans.on('click.list', function(){
            $(this).toggleClass("selected");
        });
        $('body').off('click.firstCate').on('click.firstCate', '.category-item', function(){
            $('.prop-search-checkbox').removeClass('checked');
            var brandUnitNos = [];
            $('.selected','.searchOrgan-category-first').each(function(){
                var code = $(this).attr('data-field');
                brandUnitNos.push(code);
            });
            var cData = [];
            var tt = $('.searchOrgan-category-second');
            tt.children('.selected').each(function(){
                var dataCode = $(this).attr('data-code');
                cData.push(dataCode);
            });
            var mergeData = $.merge(window.searchOrganCData,cData);
            var newCData = $.unique(mergeData);
            window.searchOrganCData = newCData;
            var callback = function(data){
                sData = [];
                sData.data = data;
                searchOrgan.category.list(tt, sData, tData, newCData);
            }
            mdm.organSelector.getBrand(brandUnitNos,callback);
        });
    }

    //切换货管单位和经营城市
    searchOrgan.category.categoryPropSearch = function(searchInput){
        var keyword = $(searchInput).val().toLowerCase();
        var list = $(searchInput).closest('h4').siblings('.sm-cell-list').children();
        $(list).each(function(){
            var _self = $(this);
            var text = _self.text().toLowerCase();
            if(text.indexOf(keyword)>=0){
                _self.show();
            }else{
                _self.hide();
            }
        });
    }

    //切换货管单位和经营城市
    searchOrgan.category.orderUnitComboSelect = function(record){
        var t = $("#searchOrganCategory1");
        var t2 = $(".sm-cell:last", t).find(".sm-cell-list");
        var t3 = $("h4[data-name='organNo']", t).siblings();
        var pno = [];
        $("span.selected", t3).each(function(){
            pno.push($(this).attr('data-code'));
        });//所选管理城市no
        var t4 = $("h4[data-name='brandNo']", t).siblings();
        var bno = [];
        $("span.selected", t4).each(function(){
            bno.push($(this).attr('data-code'));
        });//所选品牌no
        var callback = function(rsp){
            fillDiv(t2, rsp);
        };
        if(record.text == "货管单位"){
            organMdm.organSelector.getOrderUnit(bno, pno, callback);
        } else {
            organMdm.organSelector.getBusiness(pno, callback);
        }

        var searchInput = $(".sm-cell:last", t).find('.organ-search-text');
        searchOrgan.category.categoryPropSearch(searchInput);
    };

    //销售类型选择变化
    searchOrgan.category.saleModeSelect = function(){
        var t = $("#searchOrganCategory2");
        var t2 = $("h4[data-name='retailType']+ul", t).empty();
        /*var t3 = $("h4[data-name='saleMode']", t).siblings();
        var codes = [];
        t3.children("li.checked").each(function(){
            codes.push($(this).attr('data-code'));
        });*/
        var callback = function(rsp){
            fillUl(t2, rsp, "retailType");
        };
        organMdm.organSelector.getShopType(['01'],"retailType",callback);//默认01 - 零售
        //清空店铺分类
        $("h4[data-name='multi']+ul", t).empty();
    };
    
    //店铺类型选择变化
    searchOrgan.category.retailTypeSelect = function(){
        var t = $("#searchOrganCategory2");
        var t2 = $("h4[data-name='multi']+ul", t).empty();
        var t3 = $("h4[data-name='retailType']", t).siblings();
        var codes = [];
        t3.children("li.checked").each(function(){
            codes.push($(this).attr('data-code'));
        });//所选店铺类型no
        var callback = function(rsp){
            fillUl(t2, rsp, "multi");
        };
        organMdm.organSelector.getShopType(codes,"multi",callback);
    };
    
    //选择店铺属性后，自动勾选机构类型中的店铺类型
    searchOrgan.category.shopSelect = function(name){
        //若当前查询的机构类型是仓库类型或者店铺类型，则返回
        if(organFlag && ((organFlag & 1) || (organFlag & 2))) return;
        var t = $("#searchOrganCategory2");
        var tt = $("h4[data-name='storageType']+ul", t);
        var ttt = tt.children("li[data-code=21]");
        //不取消店铺类型的选择，因为有可能取消所有店铺属性的选择是为了达到全选的目的
            //ttt.removeClass("checked");
        //遍历店铺属性，若还有勾选的店铺属性，则选中店铺类型
        $("h4[data-name!='storageType']+ul", t).children("li.checked").each(function(){
            ttt.addClass("checked");
            return false;
        });
    };

    //机构类别选择变化
    searchOrgan.category.storageSelect = function(li){
        var t = $("#searchOrganCategory2");
        var t2 = $("h4[data-name='storageType']+ul", t);
        var t3 = $("div.organ-type-shop:gt(0)", t);
        var codes = [];
        t2.children("li.checked").each(function(){
            codes.push($(this).attr('data-code'));
        });

        //数据接口请求参数
        var storehouseOpts = {
            params: searchOrgan.category.get.organProperties()
        };

        //根据查询的机构类型判断
        if(organFlag && (organFlag & 1)){//仓库
            t3.hide();
            isStorehouse = true;
        }else if(organFlag && (organFlag & 2)){//店铺
            t3.show();
            isStorehouse = false;
            $('div.organ-type-store', t).hide();
            if(codes.length<1){
                //若当前操作是取消店铺类型的选择，则取消所有店铺属性的选择
                $("h4[data-name!='storageType']+ul", t).children("li.checked").each(function(){
                    $(this).removeClass("checked");
                    $("h4[data-name='multi']+ul", t).empty();//清空店铺分类
                });
            }
        }else{//仓店
            //根据选择的机构类型判断
            if(codes.length>0){
                if($.inArray(ORGAN_TYPE_SHOP_CODE,codes)>-1){
                    t3.show();
                    isStorehouse = false;
                    $('div.organ-type-store', t).hide();
                }else{
                    //若当前操作是取消店铺类型的选择，则取消所有店铺属性的选择
                    if(li.attr("data-code")=="21"){
                        $("h4[data-name!='storageType']+ul", t).children("li.checked").each(function(){
                            $(this).removeClass("checked");
                            $("h4[data-name='multi']+ul", t).empty();//清空店铺分类
                        });
                        //清空加号里面选出来的属性
                        $("h4:has('span.icon-extend')+ul",t).empty();
                    }
                    t3.hide();
                    isStorehouse = true;
                }
            }else{
                //若当前操作是取消店铺类型的选择，则取消所有店铺属性的选择
                if(li.attr("data-code")=="21"){
                    $("h4[data-name!='storageType']+ul", t).children("li.checked").each(function(){
                        $(this).removeClass("checked");
                        $("h4[data-name='multi']+ul", t).empty(); //清空店铺分类
                    });
                    //清空加号里面选出来的属性
                    $("h4:has('span.icon-extend')+ul",t).empty();
                }
                t3.show();
                isStorehouse = false;
                $('div.organ-type-store', t).hide();
            }
        }

        //仓库类别处理
        if(isStorehouse){
            var storeObj = store(storehouseOpts);
                storeObj.init();
        }
    };
    
    //经营城市选择变化
    searchOrgan.category.bizCitySelect = function(){
        var t = $("#searchOrganCategory2");
        var t2 = $("h4[data-name='mallNo']+ul", t);
        if($("#searchOrganCategorySwitch").combobox('getValue')=="bizCityNo"){
            var tt = $("#searchOrganCategory1");
            var tt2 = $(".sm-cell:last", tt).find(".sm-cell-list");
            var codes = [];
            tt2.children("span.selected").each(function(){
                codes.push($(this).attr('data-code'));
            });
            var callback = function(rsp){
                fillUl(t2, rsp, "mallNo");
            };
            window.organMdm.organSelector.getMall(codes,callback);
        }else{
            t2.empty();
        }
    };
    
    //获取条件
    searchOrgan.category.get = {
        organStatus: function(){
            var lis = $("#searchOrganState>li");
            var li = $("#searchOrganState>li.checked");
            var idx = [];
            $.each(li,function(i,item){
                idx.push(lis.index(item));
            });
            //var idx = lis.index(li[0]);
            return idx;
        },
        organProperties: function(){
            var obj = {};
            var list = $("h4[data-name]");
            $.each(list, function(){
                var self = $(this);
                var tself = self.siblings();
                var name = self.attr("data-name");
                if(name=="orderUnit_bizCity"){
                    name = $("#searchOrganCategorySwitch").combobox('getValue');
                }
                var codes = getCodes(tself);
                obj[name] = codes;
            });
            function getCodes(tself){
                var codes = [];
                tself.children("span.selected,li.checked").each(function(){
                    codes.push($(this).attr('data-code'));
                });
                return codes;
            }
            obj.status = searchOrgan.category.get.organStatus();
            return obj;
        },
        data: function(){
            var data = {};
            var tab = $("#searchOrganTabs").tabs('getSelected');
            var index = $('#searchOrganTabs').tabs('getTabIndex',tab);
            //组织界面选择的查询条件
            data.status = searchOrgan.category.get.organStatus();
            var properties = searchOrgan.category.get.organProperties();
            $.extend(data, properties);
            //只有选择了店铺分类，才默认查询零售类型
            if((data.retailType && data.retailType.length>0)||(data.multi && data.multi.length>0))
                data.saleMode = ["01"];//销售类型默认为零售
            //设置仓库标识
            data.isStorehouse = isStorehouse;
            data.organFlag = (organFlag & 1) || (organFlag & 2);//查询的机构类型标识
            data.roleType = roleType;//何种权限过滤店铺标识
            //判断当前处于哪个tab页，若处于筛选条件的tab页，则组织条件，若属于预览tab页，则组织选中的数据
            if(index==1){
                var noArray = [];
                var t1 = $("#searchOrganFilterValue2");
                var val = t1.val();//过滤条件
                
                //若快速查询文本框中有输入过滤信息，则预览界面的快速查询也需要从数据库中查询
                if(val){
                    //若预览界面快速查询有值，则清空原来设置的条件不再从结果集中查询，从所有机构中查询
                    $.each(data, function(i,node){
                        if(Object.prototype.toString.apply(node) === '[object Array]'){
                            data[i] = [];
                        }
                    });
                    if(escape(val).indexOf( "%u" )>=0){//含有中文，用name匹配
                        data.name = val;
                    }else{//否则用code匹配
                        data.code = val;
                    }
                    
                    $("#searchOrganFilterValue2").val("");//清空结果中筛选文本框内容，避免点击确定时再次查询
                    
                }else{//若快速查询文本框中没有输入过滤信息，则直接返回所有选择的
                    var noArray = [];
                    $.each($("#searchOrganViewResult").datagrid("getChecked"),function(i, item){
                        //过滤条件为空或者包含过滤条件的才加入返回列表中
                        //if($.string.isNullOrEmpty(val)||item.code.indexOf(val) > -1 || item.name.indexOf(val) > -1){
                            noArray.push(item.no);
                        //}
                    });
                    //若查询无结果返回则加入一个5个0的项返回，以使接收结果者增加这个无法查处结果的过滤条件
                    if(noArray.length==0){
                        noArray.push("00000");
                    }
                    data.codeList = noArray;
                }
            }else{
                var t = $("#organSearchText");
                
                //设置导入机构编码标识
                data.subtype = $.data(t[0],"subtype");
                if(t.val() !== ""){
                    if(data.subtype==1 || escape(t.val()).indexOf( "%u" )<0){//不含中文，用code匹配
                        data.code = t.val();
                    }else{//否则用name匹配
                        data.name = t.val();
                    }
                } 
                //若在查询条件界面列出了仓库且选择了仓库则获取选择的仓库
                if(isStorehouse){
                    data.codeList = data.store;
                }  
            }
                
            //window.organConditions = data;
            if(!window.__cache__){
                window.__cache__={};
                window.__cache__[__currentOrganFilterID] = {};
            }           
            window.__cache__[__currentOrganFilterID].memory = data;
            return data;
        }
    };

    /**
     * 普通查询预览 可合并查询条件筛选与高级查询
     */
    searchOrgan.view = function() {
        //$("#searchOrganFilterValue,#searchOrganFilterValue2").val("");
        $("#searchOrganFilterValue2").val("");//清空结果中筛选文本框内容
        searchOrgan.search();
    };

    /**
     * 快速查询预览
     */
    searchOrgan.search = function() {
        var data = searchOrgan.category.get.data();
        try{
            $("#searchOrganViewResult").datagrid('loadData',{total:0,rows:[]});
        } catch(e){}

        // closePanel();
        doTab(1);
        searchOrgan.view.result(data);
    };
    //预览结果
    searchOrgan.view.result = function(data){
        $("#searchOrganViewResult").datagrid({
            onLoadSuccess: function (data) {
                $('#searchOrganViewResult').datagrid('selectAll');
            } 
        });
        
        var callback = function(rsp){
            var total = rsp.length;
            var rows = rsp;
            $("#searchOrganTotal").text(total);
            //$("#searchOrganFilterValue2").val(data.name||data.code||"");//预览界面高级查询框中不用显示查询界面输入的高级查询条件
            $("#searchOrganViewResult").datagrid('loadData',{total:total,rows:rows});
            
        };
        organMdm.organSelector.getPreview(data, callback);
    };

    /**
     * 根据查询条件预览结果
     */
    searchOrgan.viewResult = function(){
        var data = {};
        var searchValue = $("#searchOrganFilterValue2").val();
        if(searchValue !== ""){
            if(escape(searchValue).indexOf( "%u" )>=0){//含有中文，用name匹配
                data.name = searchValue;
            }else{//否则用code匹配
                data.code = searchValue;
            }
            searchOrgan.view.result(data);
        }
        
        //对查询结果进行筛选
        /*var t = $("#searchOrganViewResult");
        var t1 = $("#searchOrganFilterValue2");
        var val = t1.val();
        //var field = "code";

        t.datagrid("showRows", true);

        var rows = t.datagrid('getRows');
        if ($.string.isNullOrEmpty(val)) { t1.focus(); return; }
        var filterRows = $.array.filter(rows, function (row) { 
                return (String(row["code"]).indexOf(val) == -1 && String(row["name"]).indexOf(val) == -1);
            });

        t.datagrid("hideRows", filterRows);

        //设置过滤出来的数据条数
        var total = rows.length-filterRows.length;
        $("#searchOrganTotal").text(total);
        t1.focus();*/
    };

    /**
     * 返回查询界面
     */
    searchOrgan.back = function(){
        doTab(0);
    };

    /**
     * 初始化页面数据
     */
    searchOrgan.init = function(){
        //加载初始化数据
        organMdm.organSelector.datasource.load(organFlag);

        //导入店铺信息
        var div = $('#searchOrganMain')[0];
        var file = $('#searchOrganFile')[0];
        if( file.addEventListener)
            file.addEventListener('change', handleFile, false);
        if(div.addEventListener) {
            div.addEventListener('dragenter', handleDragover, false);
            div.addEventListener('dragover', handleDragover, false);
            div.addEventListener('drop', handleDrop, false);
        }

        $('#organSearchText').bind('keydown',function(){
            $.data($('#organSearchText')[0],"subtype",0);
        });
        $.data($('#organSearchText')[0],"subtype",0);
        
        //初始化属性列表
        this.category();

        //动态监听checkbox的状态
        $('body').off('click.checkLi').on('click.checkLi', '#searchOrganState>li,#propertiesSelector li', function(){
            var self = $(this);
            var t = self.parent();
            
            if(t.attr("data-multiple")!=="true") {
                $("li",t).removeClass('checked');
            }
            self.toggleClass("checked");         
        });
        
        $('body').off('click.closePanel').on('click.closePanel', function(event){
            if(!$(event.target).is('.organ-type-shop .icon') && 
                !$(event.target).parent().is('.sm-checkbox') &&
                !$(event.target).is('#searchOrganCategory1 .icon') &&
                !$(event.target).is(".searchOrgan-category-first") && 
                !$(event.target).is(".searchOrgan-category-second") && 
                !$(event.target).is(".searchOrgan-category-first>div") && 
                !$(event.target).is(".searchOrgan-category-second>span") && 
                !$(event.target).is(".prop-search-box") && 
                !$(event.target).is(".prop-search-span") && 
                !$(event.target).is(".prop-search-checkbox") && 
                !$(event.target).is(".prop-search-text") && 
                $('#propertiesSelector').is(':visible') ){
                closePanel();
            }
        });

        $('#searchOrganBtnResult').off('click.btnresult').on('click.btnresult', this.view);
        $('#searchOrganBtnResult2').off('click.btnresult2').on('click.btnresult2', this.search);//预览界面中的快速查询在数据库中查询，不在结果集中查询
        $('#searchOrganBack').off('click.back').on('click.back', this.back);
        
        searchOrgan.category.initConditions(window.__cache__[__currentOrganFilterID].memory);
    };
    
    /**
     * 还原选择的条件
     */
    searchOrgan.category.initConditions = function(conditions){
        if(!conditions) return;
        var t = $("#searchOrganCategory1");
        var tt = $("#searchOrganCategory2");
        var tb2 = $(".sm-cell:last", t).find(".sm-cell-list");
        //还原高级查询条件
        if(conditions.code){
            $("#organSearchText").val(conditions.code);
        }else if(conditions.name){
            $("#organSearchText").val(conditions.name);
        }
        $.each(conditions,function(i,item){
            if($.inArray(i,category_list[0])>-1){//第一排属性
                var t2 = $("h4[data-name='"+i+"']+div", t);
                $.each(item,function(j,value){
                    t2.children("span[data-code='"+value+"']").addClass("selected");
                });
            }else if(i=="storageType" || (!isStorehouse && $.inArray(i,category_list[1])>-1)){//第二排属性
                var tt2 = $("h4[data-name='"+i+"']+ul", tt);
                $.each(item,function(j,value){
                    tt2.children("li[data-code='"+value+"']").addClass("checked");
                });
                //根据选择的店铺类型，加载相应的店铺分类
                if(i=="retailType"){
                    searchOrgan.category.retailTypeSelect();
                }
            }else if(i=="bizCityNo"){//经营城市
                $("#searchOrganCategorySwitch").combobox('setValue', "bizCityNo");
                searchOrgan.category.orderUnitComboSelect(searchOrgan.category.orderUnitCombo[1]);
                $.each(item,function(j,value){
                    tb2.children("span[data-code='"+value+"']").addClass("selected");
                });
                //根据经营城市加载经营城市对应的商场
                searchOrgan.category.bizCitySelect();
            }else if(i=="orderUnitNo"){//货管单位
                $("#searchOrganCategorySwitch").combobox('setValue', "orderUnitNo");
                searchOrgan.category.orderUnitComboSelect(searchOrgan.category.orderUnitCombo[0]);
                $.each(item,function(j,value){
                    tb2.children("span[data-code='"+value+"']").addClass("selected");
                });             
            }else if(i=="code"||i=="name"){//其它条件
                $("#searchOrganFilterValue").val(item);
            }else if(i=="status" && item.length>0){//状态
                $("#searchOrganState>li").siblings().removeClass("checked");
                $.each(item,function(j,value){
                    $("#searchOrganState>li").siblings().eq(value).addClass("checked");
                });
            }else if(isStorehouse && $.inArray(i,category_list[2])>-1){//仓库属性
                //还原所选项
                var tt2 = $("h4[data-name='"+i+"']+ul", tt);
                $.each(item,function(j,value){
                    tt2.children("li[data-code='"+value+"']").addClass("checked");
                });
            }
        });
        
    };
    
    /**
     * Tab页切换
     */
    function doTab(idx){
        var t = $("#searchOrganTabs");
        t.tabs('select', idx);
    }

    /**
     * 生成第一列分类
     * @param t是目标区域
     * @param sData目标数据
     */
    function fillDiv(t, sData){
        var items = $.isArray(sData)?sData:sData.data||[];
        var spans = "";
        var count = 11;
        var isMultiple = t.attr("data-multiple"); t.empty();
        var isCity = t.siblings("h4").attr("data-name");
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var span = '<span data-code="'+item.code
                + (item.name.length>count?'" title="'+item.name:'')
                + ((isCity=="organNo" || isCity=="brandNo")?'" for="searchOrganCategorySwitch':'')
                +'">'
                + item.name+'</span>';
            spans += span;
        }
        t.html(spans);
        spans = $("span",t);
        spans.bind('click', function () {
            var self = $(this);
            var forE = self.attr("for"), forT = $("#"+forE);
            if(isMultiple!=="true") {
                spans.removeClass('selected');
            }
            $(this).toggleClass("selected");
            if(forE){
                var value = forT.combobox('getValue');
                if(value == "") value = "orderUnitNo";
                forT.combobox('clear');
                forT.combobox('select', value);
            }
            if(isCity == "orderUnit_bizCity"){
                searchOrgan.category.bizCitySelect();
            }
        });
    }

    /**
     * 生成第二列分类
     * @param {jQuery} t
     * @param {JSON} sData
     * @param {String} name
     */
    function fillUl(t, sData, name){
        var items = $.isArray(sData)?sData:sData.data||[];
        var lis = "";
        var count = 4;
        t.empty();
       
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var li = '<li data-code="'+item.code
                + (item.name.length>count?'" title="'+item.name:'')
                /*+ ((name =="saleMode" && item.name == "零售")?'" class="checked':'')*/ //销售类型不加控制
                + '">'
                + (item.level?"<em style='color:red;font-size:10px;margin-right:2px;'>"+item.level+".</em>":"")+item.name+'</li>';
            lis += li;
        }
        t.html(lis);
        $li = $("li",t);

        //销售类型与店铺类型绑定点击事件
        /*if(name =="saleMode"){
            $li.click(function () { 
                var self = $(this);
                self.toggleClass("checked");
                searchOrgan.category.saleModeSelect(); 
                self.toggleClass("checked");
            });
        }else*/                 

        if(name == "store"){
            //仓库刷新功能
            $("span.icon.icon-refresh", t.siblings("h4")).click(function(){
                //数据接口请求参数
                var storehouseOpts = {
                    params: searchOrgan.category.get.organProperties()
                };
                var storeObj = store(storehouseOpts);
                    storeObj.init();
            });
            $li.click(function () { 
                var self = $(this);
                var t = self.parent();
                if(t.attr("data-multiple")!=="true") {
                    $("li",t).removeClass('checked');
                }
                self.toggleClass("checked");
            });
        }else if(name =="retailType"){
            $li.click(function () { 
                var self = $(this);
                var t = self.parent();
                if(t.attr("data-multiple")!=="true") {
                    $("li",t).removeClass('checked');
                }
                self.toggleClass("checked");
                searchOrgan.category.shopSelect();
                searchOrgan.category.retailTypeSelect();
            });
        }else if(name=="storageType"){//仓库类型
            if(organFlag && (organFlag & 2)) return;
            $li.click(function () { 
                var self = $(this);
                var t = self.parent();
                if(t.attr("data-multiple")!=="true") {
                    $("li",t).removeClass('checked');
                }
                self.toggleClass("checked");
                searchOrgan.category.storageSelect(self);
                if($('#organStoreList').children().length>0){
                    $('.sm-check-all','.organ-type-store').click();
                }
            });
        }else{//
            $li.click(function () { 
                var self = $(this);
                var t = self.parent();
                if(t.attr("data-multiple")!=="true") {
                    $("li",t).removeClass('checked');
                }
                self.toggleClass("checked");
                 //如果该条数据来自于panel选择，则勾选的时候直接删掉
                if(!self.hasClass("checked") && self.attr("data-property")=="extend"){
                    self.remove();
                }
                searchOrgan.category.shopSelect();
            });
        }
    }

    function handleFiles(files){
        organMdm.organSelector.handleFiles(files,function(items){
            var content = items.join(",");
            $('#organSearchText').val(content);
            $.data($('#organSearchText')[0],"subtype",1);
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
     * 仓库类型处理函数
     */
    function store(option){
        var params = option.params; //数据参数
        var api = organMdm.organSelector.getStore; //数据接口
        var callback = function(rst){
            var t = $("#searchOrganCategory2"),
                cArr = category_list[2],
                cStr = "";
                cStr += '<div class="sm-cell organ-type-store">';
                cStr += '<h4>';
                cStr += '<label class="sm-check-all"></label>';
                cStr += '<em></em><span class="icon icon-refresh" title="刷新"></span>';
                cStr += '</h4>';
                cStr += '<ul id="organStoreList" class="sm-checkbox"></ul>';
                cStr += '</div>';
            var $t = $(cStr), $tt, name, field;
            $("div.organ-type-store").remove(); //清空仓库列表
            for(var j=0; j<cArr.length; j++){
                name = cArr[j];
                field = organMdm.organSelector.datasource.getField(name);//||{text:"仓库类别",name:"storehouseType",multiple:true};
                $tt = $t.clone();
                $("h4>em", $tt).text(field.text);
                $("h4", $tt).attr({"data-field": field.datasource, "data-name": field.name});
                $(".sm-checkbox", $tt).attr("data-multiple", field.multiple); t.append($tt);

                sData = rst; //organMdm.organSelector.datasource.get(name);
                fillUl($(".sm-checkbox", $tt), sData, field.name);

                var storeListHeight = $('.sm-cell:eq(0)',t).find('.sm-checkbox').height();
                $('#organStoreList').height(storeListHeight);
            }
            $('.sm-check-all','.organ-type-store').bind('click',function(){
                var self = $(this);
                if(!self.hasClass('checked')){
                    self.addClass('checked');
                    $('.sm-checkbox li','.organ-type-store').addClass('checked');
                }else{
                    self.removeClass('checked');
                    $('.sm-checkbox li','.organ-type-store').removeClass('checked');
                }
            });
        };

        //函数对象
        var _store = function(){};

        //初始化数据
        _store.init = function(){
            api(params,callback);
        };

        return _store;
    }

    /**
     * 关闭弹出选择框
     */
    function closePanel() {
        var arrow = $('#searchOrganCategory1 .icon, .organ-type-shop .icon'), p=$('#propertiesSelector');
        if(arrow.hasClass('icon-collapse')){
            if($('.organ-prop-box').is(':visible')){
                searchOrgan.category.getChecked();
            }
            arrow.removeClass('icon-collapse').addClass('icon-extend');
            arrow.closest(".sm-cell").removeClass("active");
            p.panel('destroy');
        }
    }

    /**
     * 创建dom结构
     */
    function initOrganHtml(){
        var _html = '';
        _html += '<div id="searchOrganContainer" class="soc filterbuilder" style="width:720px;height:510px; display:none;">';
            _html += '<div class="easyui-layout" data-options="fit:true,border:false">';
                _html += '<div region="center" data-options="border:false">';
                    _html += '<div id="searchOrganTabs" class="easyui-tabs" data-options="fit:true,border:false,showHeader:false">';
                        _html += '<div title="searchOrganT1" id="searchOrganMain">';
                            _html += '<div class="easyui-layout" data-options="fit:true,border:false">';
                                _html += '<div region="north" data-options="border:false" style="height: 40px;  margin-top:10px">';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div class="input-group">';
                                            _html += '<div class="input-group-content">';
                                                _html += '<input class="ipt" id="organSearchText" placeholder="可输入机构编码，名称进行模糊查询，逗号分隔多个条件；或者通过导入按钮批量导入机构编码信息。" />';
                                            _html += '</div>';
                                            _html += '<div class="input-group-btn">';
                                                _html += '<div class="input-file l-btn">';
                                                    _html += '<i class="icon-import"></i>';
                                                    _html += '<span class="text">导入</span>';
                                                    _html += '<input type="file" id="searchOrganFile" value="导入" />';
                                                _html += '</div>';
                                                _html += '<button id="searchOrganBtnResult" class="easyui-linkbutton ml10" data-options="iconCls:\'icon-see\'">';
                                                    _html += '<span class="text">预览</span>';
                                                _html += '</button>';
                                            _html += '</div>';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                                _html += '<div region="center" data-options="border:false">';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div class="sm-cArea">';
                                            _html += '<h4><em>机构状态：</em></h4>';
                                            _html += '<ul id="searchOrganState" class="sm-checkbox" data-multiple="true">';
                                                _html += '<li>未生效</li>';
                                                _html += '<li>正常</li>';
                                                _html += '<li>撤柜</li>';
                                            _html += '</ul>';
                                        _html += '</div>';
                                    _html += '</div>';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div id="searchOrganCategory1" class="sm-cells clearfix">';
                                            _html += '<!--第一列筛选条件-->';
                                        _html += '</div>';
                                    _html += '</div>';
                                    _html += '<div class="sm-panel">';
                                        _html += '<div id="searchOrganCategory2" class="sm-cells clearfix">';
                                            _html += '<!--第二列筛选条件-->';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                            _html += '</div>';
                        _html += '</div>';
                        _html += '<div title="searchOrganT2">';
                            _html += '<div class="easyui-layout" data-options="fit:true,border:false">';
                                _html += '<div region="north" data-options="border:false" style="height:70px;">';
                                    _html += '<div class="sm-panel">';
                                        _html += '<h3 class="sm-title">';
                                            _html += '查询结果(共<em id="searchOrganTotal" style="margin: 0 5px; color: red;"></em>条记录)';
                                        _html += '</h3>';
                                        _html += '<div class="input-group sc-panel-preview">';
                                            _html += '<div class="input-group-content">';
                                                _html += '<input id="searchOrganFilterValue2" class="ipt" placeholder="可输入机构编码，名称进行模糊查询，逗号分隔多个条件" />';
                                            _html += '</div>';
                                            _html += '<div class="input-group-btn">';
                                                _html += '<div id="searchOrganBtnResult2" class="input-file c-btn">';
                                                    _html += '<i class="icon-search"></i>';
                                                    _html += '<span class="text">快速查询</span>';
                                                _html += '</div>';
                                            _html += '</div>';
                                            _html += '<div class="input-group-btn">';
                                                _html += '<a id="searchOrganBack" href="javascript:void(0);" class="easyui-linkbutton ml10" data-options="iconCls:\'icon-back\'">返回</a>';
                                            _html += '</div>';
                                        _html += '</div>';
                                    _html += '</div>';
                                _html += '</div>';
                                _html += '<div region="center" style="border-width: 1px 0 0;">';
                                    _html += '<table id="searchOrganViewResult" class="easyui-datagrid" data-options="';
                                            _html += 'emptyMsg: \'\',';
                                            _html += 'rownumbers: true,';
                                            _html += 'pagination: false,';
                                            _html += 'fitColumns: true,';
                                            _html += 'enableHeaderClickMenu: false,';
                                            _html += 'enableHeaderContextMenu: false,';
                                            _html += 'enableRowContextMenu: false,';
                                            _html += 'checkOnSelect: true,';
                                            _html += 'singleSelect: false';
                                        _html += '">';
                                        _html += '<thead>';
                                        _html += '<tr>';
                                            _html += '<th data-options="field:\'ck\',checkbox:true"></th>';
                                            _html += '<th data-options="field:\'no\',align:\'left\',hidden:true">机构代码</th>';
                                            _html += '<th data-options="field:\'code\',width:40,align:\'left\'">机构编码</th>';
                                            _html += '<th data-options="field:\'name\',width:50,align:\'left\'">机构名称</th>';
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
        $('body').append(_html);
    }
    
    jQuery(document).ready(function ($) {
        initOrganHtml();
        
        window.organMdm = mdm;
        searchOrgan.init();
    });

});
