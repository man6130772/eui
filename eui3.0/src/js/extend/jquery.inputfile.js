(function($) {
  function createInputFile(target) {
        if($(target).hasClass('jqfile')) return;
        var w=$(target).width();
        var wrapper = $("<div>").addClass('file-button');
        var filename = $('<input class="ipt">').addClass($(target).attr("class")).css({"display": "inline","float":"left",width: w + "px"});
      $(target).before(filename);
			//$(wrapper).append('<a class=button style="margin-left:2px;"><span>浏览</span></a>');
      $(target).wrap(wrapper);
      $(target).css({"float":"left","position": "relative","cursor": "pointer","opacity": "0.0"}).addClass('jqfile');
      $(target).css({"margin-left":-w+50+'px'});
      $(target).bind("change", function () {
      		filename.val($(target).val());
       });
  }

  $.fn.inputfile = function(options, param) {
    if (typeof options === 'string') {
      return $(this).inputfile.methods[options].call(this, params);
    }
    options = options || {};
    return this.each(function() {
      var _this = this;
      var opt = $.data(_this, "inputfile");
      if (opt) {
        $.extend(opt.options, options);
      } else {
        $.data(_this, "inputfile", {
          options: $.extend({},
          $.fn.inputfile.defaults, $.fn.inputfile.parseOptions(_this), options)
        });
        createInputFile(_this);
      }
    });
  };

  $.fn.inputfile.methods = {
    options: function(jq) {
      return $.data(jq[0], 'inputfile').options;
    }
  };

  $.fn.inputfile.parseOptions = function(target) {
    var t = $(target);
    return $.extend({},
    $.parser.parseOptions(target, ['id']));
  };

  $.fn.inputfile.defaults = {
    id: null
  };
  if ($.parser) {
    $.parser.plugins.push('inputfile');
  }
})(jQuery);