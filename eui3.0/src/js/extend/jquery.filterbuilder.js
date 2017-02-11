/* 通用查询模块封装接口 */
(function($){
    var search =function(opts){
        var url = opts.href || '';
        var title = opts.title;
        //var saveFn = opts.onSave || null;
        var width = opts.width || 720;
        var height = opts.height || 510;
        var enableSaveButton = opts.enableSaveButton;
        var enableCloseButton = opts.enableCloseButton;
        var dlg;
        var loadFn = function(){
            //TODO
        };
        var saveFn = function(win){
            var ifrDoc = $("iframe", dlg)[0];
            if(opts.onSave){
                opts.onSave(win, ifrDoc.contentWindow);
            }
        };
        dlg = ygDialog({
            title: title,
            href: url,
            width: width,
            height: height,
            isFrame: true,
            modal:true,
            showMask: true,
            enableSaveButton: enableSaveButton,
            enableCloseButton: enableCloseButton,
            onSave: saveFn,
            onLoad: loadFn
        });
    };

    function bind(jq, param) {
        var datasource = $.data(jq, 'filterbuilder');
        var options = datasource.options;
        var op = $.extend({}, options);
        op.href = options.url;
        op.onSave = function (panel,win) {
            if ($.isFunction(options.onSave)) {
                var that = win.searchCommon||win.searchOrgan;
                var flag = win.searchCommon?true:false;
                var show = win.searchCommon?"商品":"机构";
                var value = that.category.get.data();
                var condition = {};
                if(value && value.codeList){
                	condition = {"codeList":value.codeList};
                	if(flag && options.sqlFlag && options.sqlFlag == 1){//若是通用商品查询，判断用户设置的参数sqlFlag，若为1表示可以返回查询sql
                		condition.resultType = 0;//因为codeList已经有值，所以设置返回结果类型resultType为0，表示返回的是查询结果
                	}
                }else{
                	var rsp = flag?win.mdm.filterbuilder.validate(value):win.mdm.organSelector.validate(value);
                    datasource.mdm = win.mdm;
                    if(!rsp.state){
                        showInfo(rsp.msg);
                        return;
                    }
                    if(flag){//通用商品查询
                    	//判断用户设置的参数sqlFlag，若为1表示可以返回查询sql
                    	//判断是否选了扩展条件（折扣，价格，上柜日）若选了扩展条件则返回查询结果，否则返回查询条件
                    	if(options.sqlFlag && options.sqlFlag == 1 && !value.extendFlag){
                    		condition.resultType = 1;//设置返回结果类型resultType为1，表示返回的是查询sql
                    		condition.codeList = win.mdm.filterbuilder.getSql(value,options.mix);
                    	}else if(options.sqlFlag && options.sqlFlag == 1 && value.extendFlag){
                    		condition.resultType = 2;//设置返回结果类型resultType为2，表示返回的是查询结果
                    		condition.codeList = win.mdm.filterbuilder.getResult(value,options.mix);
                    	}else{
                    		condition = win.mdm.filterbuilder.getResult(value,options.mix);
                    	}
                    }else{//通用机构查询
                    	condition = win.mdm.organSelector.getResult(value,options.mix);
                    }
                }
                $.data(jq, 'filterbuilder').data = {value:value,condition:condition};
                if(condition.codeList && condition.codeList.length>0){
                	if(condition.codeList.length==1&&(condition.codeList[0]=="00000"||condition.codeList[0]=="00000000000000")){
                		$(jq).val('<无结果返回>');
                	}else if(condition.resultType && condition.resultType==1){
                		$(jq).val('<已设置查询语句>');
                	}else{
                		var sum = condition.codeList.length;
                    	$(jq).val('<已设置'+show+sum+'个>');
                	}
                }else{
                	$(jq).val('<无结果返回>');
                }
                
                options.onSave.call(jq, value);
                panel.close();
            }
        };

        //阻止反复生成组件
        if(!$(jq).parent().hasClass("ipt-search-box")) {
            //生成通用查询组件
            var eDiv = $('<div class="ipt-search-box" />')
                .width($(jq)._outerWidth()+22);
            $(jq).wrap(eDiv).after($('<i />'));
        }

        //触发通用查询
        $(jq).siblings("i")
            .unbind('click.iptSearch')
            .bind('click.iptSearch', function () {
                search(op);
        });

        //缓存filterbuilder的options属性，这样会造成跨域问题请慎重对待
        if(window.__cache__ && window.__cache__.filterbuilderOpts){
        	window.__cache__.filterbuilderOpts = $.extend(window.__cache__.filterbuilderOpts, options);
        }else{
        	window.__cache__ = {};
        	window.__cache__.filterbuilderOpts = options;
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

    function getData(jq){
        var datasoruce = $.data(jq[0],'filterbuilder');
        var data = datasoruce.data;
        if( data && data.condition )
            return data.condition;
        return null;
    }

    //解析页面data-options属性
    $.fn.filterbuilder.parseOptions = function(target){
        return $.parser.parseOptions(target);
    };

    $.fn.filterbuilder.methods = {
        options: function(jq){
            return jq.data('filterbuilder');
        },
        getData:function(jq){
            var el = jq[0];
            var options = $.data(el, 'filterbuilder').options;
            var data = $.data(el, 'filterbuilder').data;
            if( !data )
                return null;
            else
                return data.value;
        },
        getValue:function(jq){
        	var el = jq[0];
            var options = $.data(el, 'filterbuilder').options;
            var data = getData(jq);
            var value = jq.val();
            //若使用了通用查询，则返回查询的结果
            if( (value.match("无结果") || value.match("已设置")) && data && data.codeList ){
            	if(data.resultType){
            		if(data.resultType == 2)
            			data.codeList = data.codeList.join(",")||"";
            	}else{
            		data = data.codeList.join(",")||"";
            	}
            } else {//若未使用通用查询，则获取上级文本框中的输入值
            	//判断当前查询是通用商品查询还是通用机构查询
            	var options = $.data(jq[0],'filterbuilder').options; 
            	var flag = options.url.indexOf("searchCommon.html")>0?true:false;
            	if(flag){//若是通用商品查询，因为商品的code跟no不一样，所以需要取上级文本框中输入的货号到通用查询中查询出商品的no返回
            		if(value){
            			//组织商品查询条件
            			var sql = "code LIKE '%" + value + "%'";
            			if(options.sqlFlag && options.sqlFlag ==1){
            				var data = {};
            				data.resultType = 1;
            				data.codeList = sql;
            			}else{
            				var reParams = {
                	                "condition": sql
                	            };
                    		//根据组织的查询条件查询出商品
                			var local = window.location.origin;
                			var topWin = window;
                	        while( topWin != topWin.parent ){
                	        	local = topWin.parent.location.origin;
                	        	topWin = topWin.parent;
                	        }
                	        var url = "/mdm/item_filter/confirm";
                	        if (local.indexOf('dev') >= 0)
                	            url = 'http://dev.mdm.belle.net.cn/mdm/item_filter/confirm';
                	        else  url = local + url;
                	        $.ajax({
                	            type: 'GET',
                	            url: url,
                	            data: reParams,
                	            dataType: 'text',
                	            jsonp:"callback",
                	            cache: false,
                	            async: false,
                	            success: function(json){
                	            	data = $.parseJSON(json).codeList.join(",")||"";
                	            	},
                	            error: function(msg){
                	            	data="";
                	            	showInfo( "获取数据出现错误!");
                	            	}
                	        });
            			}
            			
            		} else{
            			data = "";
            		}
            		
            	}else{//若是通用机构查询，因为机构的code跟no是一样的，可以直接返回用户在上级文本框中输入的机构编码
            		data = value.split(/[\s,，\-]/g).join(",")||"";
            	}
            	jq.data('filterbuilder').data = null;
            }
            return data;
        },
        clear:function(jq){
            jq.each(function(i,d){
                $.data(d,'filterbuilder').data = null;
            });
            jq.val('');
        }
    };

    $.fn.filterbuilder.defaults = {
        title: '通用条件查询',
        //url: bootPATH+'modules/resources/filterbuilder.html',
        mix:false,
        enableSaveButton: true
    };

    //添加EasyUI插件
    if ($.parser) {
        $.parser.plugins.push('filterbuilder');
    }

})(jQuery);