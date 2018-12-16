var gulp = require("gulp");
var pkg = require("./package.json");
var uglify = require("gulp-uglify");
var minifycss = require('gulp-minify-css');
var del = require('del');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var header = require('gulp-header');
var clean = require('gulp-clean');

var banner = ['/**',
	' * <%= name %> - <%= description %>',
	' * @version v<%= version %>',
	' * @link <%= homepage %>',
	' * @author <%= author %>',
	' * @license <%= license %>',
	' */',
	''
].join('\r\n');

gulp.task('clear', function(cb) {
	console.log('清空构建目录......');
	del(['build',
	'../app/android/app/src/main/assets/apps/H506913D2/',
	'../app/ios/HBuilder/HBuilder/Pandora/apps/H506913D2'],
	{force:true},
	cb);
	
	console.log('清空android目录和IOS目录！');
});

//构建./app/www目录
gulp.task('build', ["clear"], function() {
	console.log('开始输出到build目录.....');
	//www 排除unpackage **文件
	gulp.src(["./www/**/*.*",'!./www/unpackage/**'])
		.pipe(gulp.dest("../app/www/",{force:true}))
		.pipe(gulp.dest("../app/android/app/src/main/assets/apps/H506913D2/www/",{force:true}))
		.pipe(gulp.dest("../app/ios/HBuilder/HBuilder/Pandora/apps/H506913D2/www/",{force:true}));
		
	console.log('构建完毕！');
});


gulp.task('default', ["clear", "build"]);