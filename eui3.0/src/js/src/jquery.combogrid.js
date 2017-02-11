/**
 * jQuery EasyUI 1.4.3
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the commercial license: http://www.jeasyui.com/license_commercial.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
/**
 * combogrid - jQuery EasyUI
 * 
 * Dependencies:
 *   combo
 *   datagrid
 * 
 */
(function($) {
    /**
     * create this component.
     */
    function create(target) {
        var state = $.data(target, 'combogrid');
        var opts = state.options;
        var grid = state.grid;

        $(target).addClass('combogrid-f').combo($.extend({}, opts, {
            onShowPanel: function() {
                var p = $(this).combogrid('panel');
                var distance = p.outerHeight() - p.height();
                var minHeight = p._size('minHeight');
                var maxHeight = p._size('maxHeight');
                var dg = $(this).combogrid('grid');
                dg.datagrid('resize', {
                    width: '100%',
                    height: (isNaN(parseInt(opts.panelHeight)) ? 'auto' : '100%'),
                    minHeight: (minHeight ? minHeight - distance : ''),
                    maxHeight: (maxHeight ? maxHeight - distance : '')
                });
                var row = dg.datagrid('getSelected');
                if (row) {
                    dg.datagrid('scrollTo', dg.datagrid('getRowIndex', row));
                }
                opts.onShowPanel.call(this);
            }
        }));
        var panel = $(target).combo('panel');
        if (!grid) {
            grid = $('<table></table>').appendTo(panel);
            state.grid = grid;
        }
        grid.datagrid($.extend({}, opts, {
            border: false,
            singleSelect: (!opts.multiple),
            onLoadSuccess: function(data) {
                var values = $(target).combo('getValues');
                // prevent from firing onSelect event.
                var oldOnSelect = opts.onSelect;
                opts.onSelect = function() {};
                setValues(target, values, state.remainText);
                opts.onSelect = oldOnSelect;

                opts.onLoadSuccess.apply(target, arguments);
            },
            onClickRow: onClickRow,
            onSelect: function(index, row) {
                retrieveValues();
                /**
                 * set value of textbox when select the first row
                 * Author: he.ff
                 * Date: 2015/04/14
                 */
                state.remainText = false;
                /* Modify End */
                opts.onSelect.call(this, index, row);
            },
            onUnselect: function(index, row) {
                retrieveValues();
                opts.onUnselect.call(this, index, row);
            },
            onSelectAll: function(rows) {
                retrieveValues();
                /**
                 * set value of textbox when select the first row
                 * Author: he.ff
                 * Date: 2015/04/14
                 */
                state.remainText = false;
                /* Modify End */
                opts.onSelectAll.call(this, rows);
            },
            onUnselectAll: function(rows) {
                if (opts.multiple) retrieveValues();
                opts.onUnselectAll.call(this, rows);
            }
        }));

        function onClickRow(index, row) {
            state.remainText = false;
            retrieveValues();
            if (!opts.multiple) {
                $(target).combo('hidePanel');
            }
            opts.onClickRow.call(this, index, row);
        }

        /**
         * retrieve values from datagrid panel.
         */
        function retrieveValues() {
            var vv = $.map(grid.datagrid('getSelections'), function(row) {
                return row[opts.idField];
            });
            vv = vv.concat(opts.unselectedValues);
            if (!opts.multiple) {
                vv = vv.length ? [vv[0]] : [''];
            }
            setValues(target, vv, state.remainText);
        }
    }

    function nav(target, dir) {
        var state = $.data(target, 'combogrid');
        var opts = state.options;
        var grid = state.grid;
        var rowCount = grid.datagrid('getRows').length;
        if (!rowCount) {
            return
        }

        var tr = opts.finder.getTr(grid[0], null, 'highlight');
        if (!tr.length) {
            tr = opts.finder.getTr(grid[0], null, 'selected');;
        }
        var index;
        if (!tr.length) {
            index = (dir == 'next' ? 0 : rowCount - 1);
        } else {
            var index = parseInt(tr.attr('datagrid-row-index'));
            index += (dir == 'next' ? 1 : -1);
            if (index < 0) { index = rowCount - 1 }
            if (index >= rowCount) { index = 0 }
        }

        grid.datagrid('highlightRow', index);
        if (opts.selectOnNavigation) {
            state.remainText = false;
            grid.datagrid('selectRow', index);
        }
    }

    /**
     * set combogrid values
     */
    function setValues(target, values, remainText) {
        var state = $.data(target, 'combogrid');
        var opts = state.options;
        var grid = state.grid;

        var oldValues = $(target).combo('getValues');
        var cOpts = $(target).combo('options');
        var onChange = cOpts.onChange;
        cOpts.onChange = function() {}; // prevent from triggering onChange event
        var gOpts = grid.datagrid('options');
        var onSelect = gOpts.onSelect;
        var onUnselectAll = gOpts.onUnselectAll;
        gOpts.onSelect = gOpts.onUnselectAll = function() {};

        if (!$.isArray(values)) { values = values.split(opts.separator) }
        var selectedRows = [];
        $.map(grid.datagrid('getSelections'), function(row) {
            if ($.inArray(row[opts.idField], values) >= 0) {
                selectedRows.push(row);
            }
        });
        grid.datagrid('clearSelections');
        grid.data('datagrid').selectedRows = selectedRows;

        var ss = [];
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var index = grid.datagrid('getRowIndex', value);
            if (index >= 0) {
                grid.datagrid('selectRow', index);
            }
            ss.push(findText(value, grid.datagrid('getRows')) ||
                findText(value, grid.datagrid('getSelections')) ||
                findText(value, opts.mappingRows) ||
                value
            );
        }

        opts.unselectedValues = [];
        var selectedValues = $.map(selectedRows, function(row) {
            return row[opts.idField];
        });
        $.map(values, function(value) {
            if ($.inArray(value, selectedValues) == -1) {
                opts.unselectedValues.push(value);
            }
        });

        $(target).combo('setValues', oldValues);
        cOpts.onChange = onChange; // restore to trigger onChange event
        gOpts.onSelect = onSelect;
        gOpts.onUnselectAll = onUnselectAll;

        if (!remainText) {
            var s = ss.join(opts.separator);
            if ($(target).combo('getText') != s) {
                $(target).combo('setText', s);
            }
        }
        $(target).combo('setValues', values);

        function findText(value, a) {
            for (var i = 0; i < a.length; i++) {
                if (value == a[i][opts.idField]) {
                    return a[i][opts.textField];
                }
            }
            return undefined;
        }
    }

    /**
     * do the query action
     */
    function doQuery(target, q) {
        var state = $.data(target, 'combogrid');
        var opts = state.options;
        var grid = state.grid;
        state.remainText = true;

        if (opts.multiple && !q) {
            setValues(target, [], true);
        } else {
            setValues(target, [q], true);
        }

        if (opts.mode == 'remote') {
            grid.datagrid('clearSelections');
            /**
             * loadQuery function: whether to load data from backend
             * Return: true/false - true is load and false is not load
             * Author: wu.han
             * Date: 2015/10/25
             */
            var isLoadQuery = opts.loadQuery(q) == false ? false : true;
            if (isLoadQuery)
            /* Modify End */
                grid.datagrid('load', $.extend({}, opts.queryParams, { q: q }));
        } else {
            if (!q) return;
            grid.datagrid('clearSelections').datagrid('highlightRow', -1);
            var rows = grid.datagrid('getRows');
            var qq = opts.multiple ? q.split(opts.separator) : [q];
            $.map(qq, function(q) {
                q = $.trim(q);
                if (q) {
                    $.map(rows, function(row, i) {
                        if (q == row[opts.textField]) {
                            grid.datagrid('selectRow', i);
                        } else if (opts.filter.call(target, q, row)) {
                            grid.datagrid('highlightRow', i);
                        }
                    });
                }
            });
        }
    }

    function doEnter(target) {
        var state = $.data(target, 'combogrid');
        var opts = state.options;
        var grid = state.grid;
        var tr = opts.finder.getTr(grid[0], null, 'highlight');
        state.remainText = false;
        if (tr.length) {
            var index = parseInt(tr.attr('datagrid-row-index'));
            if (opts.multiple) {
                if (tr.hasClass('datagrid-row-selected')) {
                    grid.datagrid('unselectRow', index);
                } else {
                    grid.datagrid('selectRow', index);
                }
            } else {
                grid.datagrid('selectRow', index);
            }
        }
        var vv = [];
        $.map(grid.datagrid('getSelections'), function(row) {
            vv.push(row[opts.idField]);
        });
        $(target).combogrid('setValues', vv);
        if (!opts.multiple) {
            $(target).combogrid('hidePanel');
        }
    }

    $.fn.combogrid = function(options, param) {
        if (typeof options == 'string') {
            var method = $.fn.combogrid.methods[options];
            if (method){
            	return method(this, param);
            } else {
            	return this.combo(options, param);
            	// return $.fn.combo.methods[options](this, param);
            }
        }

        options = options || {};
        return this.each(function() {
            var state = $.data(this, 'combogrid');
            if (state) {
                $.extend(state.options, options);
            } else {
                state = $.data(this, 'combogrid', {
                    options: $.extend({}, $.fn.combogrid.defaults, $.fn.combogrid.parseOptions(this), options)
                });
            }

            create(this);
        });
    };

    $.fn.combogrid.methods = {
        options: function(jq) {
            var copts = jq.combo('options');
            return $.extend($.data(jq[0], 'combogrid').options, {
                width: copts.width,
                height: copts.height,
                originalValue: copts.originalValue,
                disabled: copts.disabled,
                readonly: copts.readonly
            });
        },
        // get the datagrid object.
        grid: function(jq) {
            return $.data(jq[0], 'combogrid').grid;
        },
        setValues: function(jq, values) {
            return jq.each(function() {
                var opts = $(this).combogrid('options');
                if ($.isArray(values)) {
                    values = $.map(values, function(value) {
                        if (typeof value == 'object') {
                            var v = value[opts.idField];
                            (function() {
                                for (var i = 0; i < opts.mappingRows.length; i++) {
                                    if (v == opts.mappingRows[i][opts.idField]) {
                                        return;
                                    }
                                }
                                opts.mappingRows.push(value);
                            })();
                            return v;
                        } else {
                            return value;
                        }
                    });
                }
                setValues(this, values);
            });
        },
        setValue: function(jq, value) {
            return jq.each(function() {
                $(this).combogrid('setValues', [value]);
                //				setValues(this, [value]);
            });
        },
        clear: function(jq) {
            return jq.each(function() {
                $(this).combogrid('grid').datagrid('clearSelections');
                $(this).combo('clear');
            });
        },
        reset: function(jq) {
            return jq.each(function() {
                var opts = $(this).combogrid('options');
                if (opts.multiple) {
                    $(this).combogrid('setValues', opts.originalValue);
                } else {
                    $(this).combogrid('setValue', opts.originalValue);
                }
            });
        }
    };

    $.fn.combogrid.parseOptions = function(target) {
        var t = $(target);
        return $.extend({}, $.fn.combo.parseOptions(target), $.fn.datagrid.parseOptions(target),
            $.parser.parseOptions(target, ['idField', 'textField', 'mode']));
    };

    $.fn.combogrid.defaults = $.extend({}, $.fn.combo.defaults, $.fn.datagrid.defaults, {
        height: 22,
        /**
         * set panel height
         * Author: Unknown
         * Date: 2015/09/24
         */
        panelHeight: 350,
        /* Modify End */
        loadMsg: null,
        idField: null,
        textField: null, // the text field to display.
        unselectedValues: [],
        mappingRows: [],
        mode: 'local', // or 'remote'

        keyHandler: {
            up: function(e) {
                nav(this, 'prev');
                e.preventDefault()
            },
            down: function(e) {
                nav(this, 'next');
                e.preventDefault()
            },
            left: function(e) {},
            right: function(e) {},
            enter: function(e) { doEnter(this) },
            query: function(q, e) { doQuery(this, q) }
        },
        /**
         * loadQuery function: whether to load data from backend
         * Return: true/false - true is load and false is not load
         * Author: wu.han
         * Date: 2015/10/25
         */
        loadQuery: function(q) {},
        /* Modify End */
        filter: function(q, row) {
            var opts = $(this).combogrid('options');
            return (row[opts.textField] || '').toLowerCase().indexOf(q.toLowerCase()) == 0;
        },
        /**
         * 重置继承自$.fn.datagrid.defaults的属性，解决combogrid样式计算异常
         * Author: wu.hao
         * Date: 2016/1/25
         */
        fit: false
            /* Modify End */
    });
})(jQuery);
