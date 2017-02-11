(function($){
	function creatDistrict(target){
		var opts = $.data(target, 'district').options;
        var t = $(target);
		var pSelect=$('<select />').attr('id','ProvinceSelect');
		var cSelect=$('<select />').attr('id','CitySelect');
		var aSelect=$('<select />').attr('id','AreaSelect');
		t.append(pSelect);
		
		pSelect.combobox({
			data:[{value:'',text:'请选择'},{value:'1',text:'广东省'},{value:'2',text:'广西省'}],
			textField:'text',
			valueField:'value',
			width:100,
			onChange:function(value){
				if($('#CitySelect',target)[0]){
					cSelect.combobox({
						disabled:false,
						value:'1'
					});
				}
			}
		});
		
		if(opts.level>1){
            t.append(cSelect);
            cSelect.combobox({
				data:[{value:'',text:'请选择'},{value:'1',text:'广州市'},{value:'2',text:'深圳市'}],
				textField:'text',
				valueField:'value',
				style:'margin-left:5px;',
				disabled:true,
				width:120,
				onChange:function(value){
					if($('#AreaSelect',target)[0]){
						aSelect.combobox({
							disabled:false,
							value:'1'
						});
					}
				}
			});
		}
		
		if(opts.level>2){
            t.append(aSelect);
            aSelect.combobox({
				data:[{value:'',text:'请选择'},{value:'1',text:'天河区'},{value:'2',text:'越秀区'},{value:'3',text:'白云区'}],
				textField:'text',
				valueField:'value',
				style:'margin-left:5px;',
				disabled:true,
				width:120
			});
		}
	}
	
	$.fn.district = function(options, param) {
		if (typeof options == 'string'){
			var method = $.fn.district.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.combo(options, param);
			}
		}
		options=options||{};
		return this.each(function() {
            var _this = this;
            var opt = $.data(_this, "district");
            if (opt) {
                $.extend(opt.options, options);
            } else {
                $.data(_this, "district", {
                options: $.extend({},
                    $.fn.district.defaults, $.fn.district.parseOptions(_this), options)
                });
                creatDistrict(_this);
            }
        });
	};
	
	$.fn.district.methods = {
        options: function(jq) {
          return $.data(jq[0], 'district').options;
        },
		getValue: function(jq){
			var p=$('#ProvinceSelect',jq).combobox('getValue');
			var c=$('#CitySelect',jq).combobox('getValue');
			var a=$('#AreaSelect',jq).combobox('getValue');
			return {"p":p,"c":c,"a":a};
		},
		setValue:function(jq,param){
			var p=param.p;
			var c=param.c;
			var a=param.a;
			if(p){
				$('#ProvinceSelect',jq).combobox('setValue',p)
			}
			if(c){
				$('#CitySelect',jq).combobox('setValue',c);
			}
			if(a){
				$('#AreaSelect',jq).combobox({disabled:false}).combobox('setValue',a);
			}
		}
    };

    $.fn.district.parseOptions = function(target) {
        return $.extend({},
            $.parser.parseOptions(target, ['level']));
    };

    $.fn.district.defaults = {
        id: null,
        level:3
    };
	
    if ($.parser) {
        $.parser.plugins.push('district');
    }
	
})(jQuery);
