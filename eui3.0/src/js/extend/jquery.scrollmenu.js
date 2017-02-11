/*!
 * Scroll Menu
 * Author wu.han (RTX 3832)
 * Email wu.han@wonhigh.cn
 * Date 2015/06/19
 */
(function($) {
    scrollMenu = {
        init: function(menu, opts) {
            this.opts = opts;
            this.menu = menu;
            this.initNav();
            this.setWidth();
            this.bindEvents();
        },
        initNav: function() {
            var _self = this;
            // menu
            $(_self.menu).addClass('scrollmenu').css({
                'position': 'relative',
                'height': _self.opts.height + 'px',
                'overflow': 'hidden'
            });
            // container
            $(_self.menu).wrapInner('<div class="' + _self.opts.content + '"></div>');
            $('.' + _self.opts.content).wrap('<div class="' + _self.opts.container + '"></div>');
            // arrow
            var leftArrow = $('<div class="scrollmenu-arrow scrollmenu-arrow-l"></div>');
            var rightArrow = $('<div class="scrollmenu-arrow scrollmenu-arrow-r"></div>');
            $('.' + _self.opts.container).after(rightArrow).after(leftArrow);
        },
        setWidth: function() {
            var _self = this;
            var windowWidth = $(window).width();
            var logoWdith = $(_self.menu).parent().siblings('.logo').outerWidth();
            var flagWidth = 100;
            var menuWidth = windowWidth - logoWdith - flagWidth;
            var contentWidth = $('.' + _self.opts.content).width();

            if (_self.opts.menuBar) {
                $(_self.menu).addClass('menuBar');
                menuWidth = windowWidth;
            }
            if (contentWidth > menuWidth) {
                // content style
                $('.' + _self.opts.content).css({
                    'position': 'absolute',
                    'left': '0',
                    'top': '0',
                    'z-index': '5',
                    'white-space': 'nowrap'
                });
                // container style
                $('.' + _self.opts.container).css({
                    'position': 'relative',
                    'height': _self.opts.height + 'px',
                    'margin': '0 20px',
                    'overflow': 'hidden'
                });
                // menu style
                if (!_self.opts.menuBar) {
                    $(_self.menu).css({
                        'width': menuWidth + 'px'
                    });
                }
                $('.scrollmenu-arrow-r').show();
            } else {
                // menu style
                $('.' + _self.opts.container).css({
                    'margin': '0'
                });
                if (!_self.opts.menuBar) {
                    $(_self.menu).css({
                        'width': contentWidth + 'px'
                    });
                }
                $('.scrollmenu-arrow').hide();
                return false;
            }
        },
        bindEvents: function() {
            var _self = this;
            //left arrow
            $('.scrollmenu').on('click', '.scrollmenu-arrow-l', function() {
                _self.move('right');
            });
            //right arrow
            $('.scrollmenu').on('click', '.scrollmenu-arrow-r', function() {
                _self.move('left');
            });
            //window resize
            $(window).resize(function() {
                setTimeout(function() {
                    _self.setWidth();
                }, 200);
                var contentWidth = $('.' + _self.opts.content).width();
                var menuWidth = $(_self.menu).width();
                if (contentWidth > menuWidth) {
                    _self.move('right');
                }
            });
        },
        move: function(direction) {
            var _self = this;
            var content = $('.' + _self.opts.content);
            var leftArrow = $('.scrollmenu-arrow-l', _self.menu);
            var rightArrow = $('.scrollmenu-arrow-r', _self.menu);
            var menuContentWidth = content.outerWidth();
            var menuContainerWidth = $('.' + _self.opts.container).width();
            var menuContentLeft = content.position().left;
            var absLeft = Math.abs(menuContentLeft);
            var distance = _self.opts.distance;
            var maxDistance = menuContainerWidth - menuContentWidth;
            var moveLeftDistance = menuContentWidth - Math.abs(menuContentLeft) - menuContainerWidth;

            if (direction == 'left') {
                if (moveLeftDistance < distance) {
                    distance = moveLeftDistance;
                    rightArrow.hide();
                }
                distance = menuContentLeft - distance;
            }
            if (direction == 'right') {
                if (absLeft < distance) {
                    distance = absLeft;
                }
                distance = menuContentLeft + distance;
            }

            // show or hide arrow
            if (distance == 0) {
                leftArrow.hide();
                rightArrow.show();
            }
            if (moveLeftDistance <= 0)
                rightArrow.show();
            if (distance < 0)
                leftArrow.show();

            // is animate
            if (content.is(':animated'))
                return false;

            // animate the content
            content.animate({
                left: distance + 'px'
            }, _self.opts.speed);
        }
    };

    $.fn.scrollmenu = function(options) {
        var options = $.extend({}, $.fn.scrollmenu.defaults, options);
        this.each(function() {
            scrollMenu.init(this, options);
        });
    };

    //defaults
    $.fn.scrollmenu.defaults = {
        container: 'scrollmenu-inner',
        content: 'scrollmenu-content',
        menuBar: false,
        height: 30,
        speed: 600,
        distance: 200,
        delay: 20
    };
})(jQuery);
