/*!
 * Project Common Resource
 * Author wu.h1 (RTX 3832)
 * Email wu.han@wonhigh.cn
 * Date 2016/04/22
 * Description Common Resource v3.0.0 (http://www.wonhigh.cn/)
 */
var __CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");
    var path = "";
    var theRequest = new Object();
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            if (src.indexOf("?") != -1 && src.indexOf("theme") != -1) {
                var url = src;
                url = url.split('?')[1];
                var strs = url.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
                window.uiTheme = theRequest['theme'];
            }
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
};

var bootPATH = __CreateJSPath("boot.js");
var uiTheme = window.uiTheme || '';

document.write('<link href="' + bootPATH + 'assets/css/ui.min.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'assets/css/base.min.css" rel="stylesheet" type="text/css" />');
if(uiTheme){
    document.write('<link href="' + bootPATH + 'assets/themes/' + uiTheme + '/theme.min.css" rel="stylesheet" type="text/css" />');
}
document.write('<script src="' + bootPATH + 'assets/js/libs/jquery.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'assets/js/libs/jquery.extend.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'assets/js/ui.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'assets/js/base.min.js" type="text/javascript"></script>');
