module.exports = function(grunt) {
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
            ' * Project <%= pkg.project %>\n' +
            ' * Author <%= pkg.author %> (RTX <%= pkg.rtx %>)\n' +
            ' * Email <%= pkg.email %>\n' +
            ' * Date <%= grunt.template.today("yyyy/mm/dd") %>\n' +
            ' * Description <%= pkg.description %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' */\n',
		srcPATH: "./src",
		destPATH: "./assets",
        concat : {
			options: {
				banner: '<%= banner %>',
				stripBanners: true,
				process: function(src, filepath) {
		          	return'/*! Source: ' + filepath + ' */\n' + src + '\n';
		        }
			},
			JQExtend: {
				src: [
					'<%= srcPATH %>/js/extend/jquery.extend.js',
					'<%= srcPATH %>/js/extend/jquery.hotkeys.plugin.js'
				],
				dest: '<%= destPATH %>/js/libs/jquery.extend.js'
			},
			uijs : {
                src: [
						'<%= srcPATH %>/js/src/jquery.parser.js',
						'<%= srcPATH %>/js/src/jquery.resizable.js',
						'<%= srcPATH %>/js/extend/jquery.toolbar.js',
						'<%= srcPATH %>/js/src/jquery.panel.js',
						'<%= srcPATH %>/js/src/jquery.layout.js',
						'<%= srcPATH %>/js/src/jquery.linkbutton.js',
						'<%= srcPATH %>/js/extend/jquery.linkmore.js',
						'<%= srcPATH %>/js/src/jquery.pagination.js',
						'<%= srcPATH %>/js/src/jquery.datagrid.js',
						'<%= srcPATH %>/js/extend/jquery.datagrid.detailview.js',
						'<%= srcPATH %>/js/src/jquery.menu.js',
						'<%= srcPATH %>/js/src/jquery.menubutton.js',
						//'<%= srcPATH %>/js/src/jquery.calendar.js',
						'<%= srcPATH %>/js/src/jquery.tooltip.js',
						'<%= srcPATH %>/js/src/jquery.validatebox.js',
						'<%= srcPATH %>/js/src/jquery.textbox.js',// new in 1.4.3
						'<%= srcPATH %>/js/src/jquery.searchbox.js',
						'<%= srcPATH %>/js/src/jquery.combo.js',
						'<%= srcPATH %>/js/src/jquery.combobox.js',
						'<%= srcPATH %>/js/src/jquery.spinner.js',
						'<%= srcPATH %>/js/src/jquery.draggable.js',
						'<%= srcPATH %>/js/src/jquery.droppable.js',
						'<%= srcPATH %>/js/src/jquery.splitbutton.js',
						'<%= srcPATH %>/js/src/jquery.progressbar.js',
						'<%= srcPATH %>/js/src/jquery.tree.js',
						'<%= srcPATH %>/js/src/jquery.combotree.js',
						'<%= srcPATH %>/js/src/jquery.combogrid.js',
						'<%= srcPATH %>/js/src/jquery.numberbox.js',
						'<%= srcPATH %>/js/src/jquery.timespinner.js',
						'<%= srcPATH %>/js/src/jquery.numberspinner.js',
						//'<%= srcPATH %>/js/src/jquery.datetimebox.js',
						//'<%= srcPATH %>/js/src/jquery.slider.js',
						'<%= srcPATH %>/js/src/jquery.propertygrid.js',
						'<%= srcPATH %>/js/src/jquery.treegrid.js',
						'<%= srcPATH %>/js/src/jquery.tabs.js',
						'<%= srcPATH %>/js/src/jquery.accordion.js',
						'<%= srcPATH %>/js/src/jquery.window.js',
						'<%= srcPATH %>/js/src/jquery.messager.js',

						// new in 1.4.3
						'<%= srcPATH %>/js/src/jquery.datalist.js',
						'<%= srcPATH %>/js/src/jquery.datetimespinner.js',
						'<%= srcPATH %>/js/src/jquery.filebox.js',
						'<%= srcPATH %>/js/src/jquery.switchbutton.js',

						//extend
						'<%= srcPATH %>/js/src/jquery.dialog.js',
						'<%= srcPATH %>/js/extend/jquery.inputfile.js',
						'<%= srcPATH %>/js/extend/jquery.district.js',
						'<%= srcPATH %>/js/src/jquery.form.js',
						// '<%= srcPATH %>/js/extend/jquery.fieldset.js',
						//'<%= srcPATH %>/js/extend/jquery.editor.js',
						'<%= srcPATH %>/js/extend/jquery.iptsearch.js',
						// '<%= srcPATH %>/js/extend/jquery.filterbuilder.js',
						'<%= srcPATH %>/js/extend/jquery.keyboard.js',
						// '<%= srcPATH %>/js/extend/jquery.upload.js',
						'<%= srcPATH %>/js/extend/jquery.my97.js',
						
						'<%= srcPATH %>/js/extend/jquery.my97.extend.js',
						'<%= srcPATH %>/js/extend/jquery.combotree.extend.js',
						'<%= srcPATH %>/js/extend/jquery.layout.extend.js',
						'<%= srcPATH %>/js/extend/jquery.mask.extend.js',
						'<%= srcPATH %>/js/extend/jquery.tabs.extend.js',
						'<%= srcPATH %>/js/extend/jquery.form.extend.js',
						'<%= srcPATH %>/js/extend/jquery.validatebox.extend.js',
						'<%= srcPATH %>/js/extend/jquery.combo.extend.js',
						//'<%= srcPATH %>/js/extend/jquery.combogrid.extend.js',
						'<%= srcPATH %>/js/extend/jquery.searchbar.js',
						// '<%= srcPATH %>/js/extend/jquery.accordion.extend.js',
						'<%= srcPATH %>/js/extend/jquery.window.extend.js',
						'<%= srcPATH %>/js/extend/jquery.datagrid.extend.js',
						'<%= srcPATH %>/js/extend/jquery.panel.extend.js',
                       	'<%= srcPATH %>/js/extend/jqeasyui.extend.js',
                        '<%= srcPATH %>/js/extend/jquery.menu.extend.js',
                        '<%= srcPATH %>/js/extend/jquery.scrollmenu.js',
                        '<%= srcPATH %>/js/extend/jquery.subsystem.js',

						'<%= srcPATH %>/js/src/easyui-lang-zh_CN.js'
					],
                dest: '<%= destPATH %>/js/ui.js'
            },
			basejs: {
				src: [
					'<%= srcPATH %>/js/_global/global.conf.js',
					'<%= srcPATH %>/js/_global/global.event.js',
					'<%= srcPATH %>/js/_global/global.func.js',
					'<%= srcPATH %>/js/_global/global.func.dgSelector.js',
					'<%= srcPATH %>/js/_global/global.func.ygDialog.js',
					'<%= srcPATH %>/js/_global/global.func.ygHotkeys.js',
					'<%= srcPATH %>/js/_global/global.utils.system.js',
					'<%= srcPATH %>/js/_global/global.utils.search.js',
					'<%= srcPATH %>/js/_global/global.utils.tab.js',
					'<%= srcPATH %>/js/_global/global.utils.build.js'
				],
				dest: '<%= destPATH %>/js/base.js'
			},
			uicss: {
				src: [
					// core
					'<%= srcPATH %>/css/themes/dev/panel.css',
					'<%= srcPATH %>/css/themes/dev/window.css',
					'<%= srcPATH %>/css/themes/dev/tabs.css',
					'<%= srcPATH %>/css/themes/dev/layout.css',
					'<%= srcPATH %>/css/themes/dev/dialog.css',
					'<%= srcPATH %>/css/themes/dev/datagrid.css',
					'<%= srcPATH %>/css/themes/dev/accordion.css',
					//'<%= srcPATH %>/css/themes/dev/calendar.css',
					'<%= srcPATH %>/css/themes/dev/combo.css',
					'<%= srcPATH %>/css/themes/dev/combobox.css',
					//'<%= srcPATH %>/css/themes/dev/datebox.css',
					'<%= srcPATH %>/css/themes/dev/linkbutton.css',
					'<%= srcPATH %>/css/themes/dev/menu.css',
					'<%= srcPATH %>/css/themes/dev/menubutton.css',
					'<%= srcPATH %>/css/themes/dev/messager.css',
					'<%= srcPATH %>/css/themes/dev/pagination.css',
					'<%= srcPATH %>/css/themes/dev/progressbar.css',
					'<%= srcPATH %>/css/themes/dev/propertygrid.css',
					'<%= srcPATH %>/css/themes/dev/searchbox.css',
					//'<%= srcPATH %>/css/themes/dev/slider.css',
					'<%= srcPATH %>/css/themes/dev/spinner.css',
					'<%= srcPATH %>/css/themes/dev/splitbutton.css',
					//'<%= srcPATH %>/css/themes/dev/toolbar.css',
					'<%= srcPATH %>/css/themes/dev/tooltip.css',
					'<%= srcPATH %>/css/themes/dev/tree.css',
					'<%= srcPATH %>/css/themes/dev/validatebox.css',

					// new components
					'<%= srcPATH %>/css/themes/dev/datalist.css',
					'<%= srcPATH %>/css/themes/dev/filebox.css',
					'<%= srcPATH %>/css/themes/dev/numberbox.css',
					'<%= srcPATH %>/css/themes/dev/switchbutton.css',
					'<%= srcPATH %>/css/themes/dev/textbox.css',

					// extend
					'<%= srcPATH %>/css/extend/easyui.extend.css',
					'<%= srcPATH %>/css/extend/accordion.extend.css',
					'<%= srcPATH %>/css/extend/combotree.extend.css',
					'<%= srcPATH %>/css/extend/jquery.scrollmenu.css',

					// icon
					'<%= srcPATH %>/css/themes/icon.css'

				],
				dest: '<%= destPATH %>/css/ui.css'
			},
			basecss: {
				src: [
					'<%= srcPATH %>/css/_global/public.css',
					'<%= srcPATH %>/css/_global/base.css',
					'<%= srcPATH %>/css/_global/color.css',
					'<%= srcPATH %>/css/_global/header.css',
					'<%= srcPATH %>/css/_global/form.css',
					'<%= srcPATH %>/css/_global/search.css'
				],
				dest: '<%= destPATH %>/css/base.css'
			}
        },
		uglify: {
			options: {
				banner: '<%= banner %>',
				sourceMap: true
			},
			JQExtend: {
				src: "<%= destPATH %>/js/libs/jquery.extend.js",
				dest: "<%= destPATH %>/js/libs/jquery.extend.min.js"
            },
			uijs: {
				src: "<%= destPATH %>/js/ui.js",
				dest: "<%= destPATH %>/js/ui.min.js"
            },
			uijsbeautify: {
				options: {
					beautify: true,
					sourceMap: false
				},
				files: {
					"<%= destPATH %>/js/ui.js" : "<%= destPATH %>/js/ui.js"
				}
            },
			basejs: {
				src: "<%= destPATH %>/js/base.js",
				dest: "<%= destPATH %>/js/base.min.js"
			}
		},
		cssmin:{
			options: {
				stripBanners: true
			},
			uicss: {
				src: '<%= destPATH %>/css/ui.css',
                dest: '<%= destPATH %>/css/ui.min.css'
			},
			basecss: {
				src: '<%= destPATH %>/css/base.css',
                dest: '<%= destPATH %>/css/base.min.css'
			},
			logisticscss: {
				src: '<%= destPATH %>/themes/logistics/theme.css',
                dest: '<%= destPATH %>/themes/logistics/theme.min.css'
			}
		},
	    imagemin: {
	      dist: {
	        files: [{
	          expand: true,
	          cwd: '<%= distPATH %>/images',
	          src: '{,*/}*.{png,jpg,jpeg,gif}',
	          dest: '<%= distPATH %>/images.min'
	        }]
	      }
        },
        // sprite
		sprite: {
		    options: {
		        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
		        imagepath: '<%= distPATH %>/css/images/',
		        // 映射CSS中背景路径，支持函数和数组，默认为 null
		        imagepath_map: null,
		        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
		        spritedest: '<%= distPATH %>/publish/images/',
		        // 替换后的背景路径，默认 ../images/
		        spritepath: '../images/',
		        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
		        padding: 2,
		        // 是否使用 image-set 作为2x图片实现，默认不使用
		        useimageset: false,
		        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
		        newsprite: false,
		        // 给雪碧图追加时间戳，默认不追加
		        spritestamp: true,
		        // 在CSS文件末尾追加时间戳，默认不追加
		        cssstamp: true,
		        // 默认使用二叉树最优排列算法
		        algorithm: 'binary-tree',
		        // 默认使用`pixelsmith`图像处理引擎
		        engine: 'pixelsmith'
		    },
		    autoSprite: {
		        files: [{
		            // 启用动态扩展
		            expand: true,
		            // css文件源的文件夹
		            cwd: '<%= distPATH %>/css/',
		            // 匹配规则
		            src: '*.css',
		            // 导出css和sprite的路径地址
		            dest: '<%= distPATH %>/publish/css/',
		            // 导出的css名
		            ext: '.sprite.css'
		        }]
		    }
	    },
		clean: {
			js: ["<%= destPATH %>/js/ui.js", "<%= destPATH %>/js/ui.min.js"],
			css: ["<%= destPATH %>/css/ui.css", "<%= destPATH %>/css/ui.min.css"],
			ext: ["<%= destPATH %>/js/libs/jquery.extend.js", "<%= destPATH %>/js/libs/jquery.extend.min.js"],
			basejs: ["<%= destPATH %>/js/base.js", "<%= destPATH %>/js/base.min.js"],
			basecss: ["<%= destPATH %>/css/base.css","<%= destPATH %>/css/base.min.css"]
		},
        watch: {
            options: {
                dateFormat: function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            extendJS: {
                files: '<%= srcPATH %>/js/extend/**/*.js',
                tasks: ['tar-ext','tar-js']
            },
            globalJS: {
                files: '<%= srcPATH %>/js/_global/**/*.js',
                tasks: ['tar-basejs']
            },
            srcJS: {
                files: '<%= srcPATH %>/js/src/**/*.js',
                tasks: ['tar-js']
            },
            css: {
                files: '<%= srcPATH %>/css/**/*.css',
                tasks: ['tar-css','tar-basecss','tar-css']
            }
        },
		//JS check
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                //newcap: true,
                noarg: true,
                sub: true,
                undef: true,
				unused: true,
                boss: true,
                node: true
            },
            globals: {
                //exports: true
            },
			files: ["<%= srcPATH %>/js/src/*.js"]
        },
		//FTP上传文件
		ftpscript: {
            upload: {
                options: {
                    host: '172.17.210.162',
					port: 21,
					passive: true,
					mkdirs: true
                },
                files: [
                    {
						expand: true,
						cwd: '<%= destPATH %>/css/',
						src: ['*.css'],
						dest: '/retail-resources/common/assets/css'
					},
					{
						expand: true,
						cwd: '<%= destPATH %>/js/libs/',
						src: ['jquery.extend.js', 'jquery.extend.min.js'],
						dest: '/retail-resources/common/assets/js/libs'
					},
					{
						expand: true,
						cwd: '<%= destPATH %>/js/',
						src: ['*.js'], 
						dest: '/retail-resources/common/assets/js'
					}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
	
    grunt.loadNpmTasks('grunt-ftpscript');

    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-css-sprite');
	
    grunt.loadNpmTasks('grunt-contrib-watch');
 
	
	//for easyui
	grunt.registerTask('tar-ext', ['concat:JQExtend']);
    grunt.registerTask('min-ext', ['uglify:JQExtend']);
    grunt.registerTask('tar-basejs', ['concat:basejs']);
    grunt.registerTask('min-basejs', ['uglify:basejs']);
	grunt.registerTask('tar-js', ['concat:uijs']);
    grunt.registerTask('min-js', ['uglify:uijs']);
    grunt.registerTask('uglify-uijs', ['uglify:uijsbeautify']);
	grunt.registerTask('tar-css', ['concat:uicss']);
    grunt.registerTask('min-css', ['cssmin:uicss']);
	grunt.registerTask('tar-basecss', ['concat:basecss']);
    grunt.registerTask('min-basecss', ['cssmin:basecss']);
    grunt.registerTask('min-logisticscss', ['cssmin:logisticscss']);
	
    grunt.registerTask('build-ext', ['tar-ext','min-ext']);
    grunt.registerTask('build-js', ['tar-js','min-js','uglify-uijs']);
    grunt.registerTask('build-basejs', ['tar-basejs','min-basejs']);
    grunt.registerTask('build-css', ['tar-css','min-css']);
    grunt.registerTask('build-basecss', ['tar-basecss','min-basecss']);
    grunt.registerTask('build-all', ['build-ext','build-js','build-basejs','build-css','build-basecss','min-logisticscss']);//,'ftp-upload'
	
    grunt.registerTask('clean-js', ['clean:js']);
    grunt.registerTask('clean-css', ['clean:css']);
    grunt.registerTask('clean-ext', ['clean:ext']);
    grunt.registerTask('clean-basejs', ['clean:basejs']);
    grunt.registerTask('clean-basecss', ['clean:basecss']);
    grunt.registerTask('clean-all', ['clean-ext','clean-js','clean-basejs','clean-css','clean-basecss']);
	
	//check js
	grunt.registerTask('check-js', 'jshint');
	
	//FTP
	grunt.registerTask('ftp-upload', ['ftpscript:upload']);

	
    grunt.registerTask('watch-extendJS', ['watch:extendJS']);
    grunt.registerTask('watch-globalJS', ['watch:globalJS']);
    grunt.registerTask('watch-srcJS', ['watch:srcJS']);
    grunt.registerTask('watch-css', ['watch:css']);


    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
	

	
    var taskName = grunt.option('taskname');
	if(taskName){
		grunt.registerTask('default', [taskName]);
	}
};