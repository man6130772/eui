(function($) {
  function createFieldSet(target) {
    var opts = $.data(target, 'fieldset').options;
    var t = $(target);
    var hd = $('<div class="hd">');
    var bd = $('<div class="bd">');
    var tt = opts.title;
    var c = opts.content;
    var _plain = opts.plain;

    t.addClass('fieldset');
    //t.find('.bd').remove();
    if (_plain) {
      t.addClass('fieldset-plain');
    }
    if (tt) {
      hd.html('<a class="toggle"></a>' + tt);
    }
    if (opts.bdCls) {
      bd.addClass(opts.bdCls);
    }
    if (opts.bdStyle) {
      bd.attr('style', opts.bdStyle);
    }

    if (t.html() != '') {
      t.wrapInner(bd);
      t.append(hd);
    }
		

    if (c) {
      bd.html(c);
      t.append(bd);
    }
		
		var tbls=t.find('table');
		$(window).resize(function(){
			if(tbls[0]){
				tbls.each(function(){
					if($(this).is(":hidden")&& $(this).attr("id")!=""){
						$(this).datagrid('resize');
					}
				});
				
			}
			});

    if (typeof(opts.loaded) == "function") {
      opts.loaded();
    }
		if(typeof(editRowIndex)!="undefined" && typeof(tbgrid)!="undefined" && tbgrid){
    	tbgrid.datagrid('fixDetailRowHeight', editRowIndex);
		}
    hd.click(function() {
      var b = t.find('.bd');
      if (b.is(":visible")) {
        b.hide();
        t.addClass("fieldset-collapsed");
      } else {
        b.show();
        t.removeClass("fieldset-collapsed");
      }
    });

  }

  $.fn.fieldset = function(options, param) {

    if (typeof options === 'string') {
      return $(this).fieldset.methods[options].call(this, params);
    }
    options = options || {};
    return this.each(function() {
      var _this = this;
      var opt = $.data(_this, "fieldset");
      if (opt) {
        $.extend(opt.options, options);
      } else {
        $.data(_this, "fieldset", {
          options: $.extend({},
          $.fn.fieldset.defaults, $.fn.fieldset.parseOptions(_this), options)
        });
        createFieldSet(_this);
      }
    });
  };

  $.fn.fieldset.methods = {
    options: function(jq) {
      return $.data(jq[0], 'fieldset').options;
    }
  };

  $.fn.fieldset.parseOptions = function(target) {
    var t = $(target);
    return $.extend({},
    $.parser.parseOptions(target, ['title', 'content', 'id', 'plain', 'bdCls', 'bdStyle']));
  };

  $.fn.fieldset.defaults = {
    id: null,
    title: '',
    toggle: false,
    plain: true,
    content: null,
    bdCls: null,
    loaded: null
  };
  if ($.parser) {
    $.parser.plugins.push('fieldset');
  }
})(jQuery);