// gulpfile.js

// require modules:
var gulp 		 = require('gulp'),
	clean 		 = require('gulp-clean'),
	concat 		 = require('gulp-concat'),
	uglify 		 = require('gulp-uglify-es').default,
	insert 		 = require('gulp-insert');
	sass 		 = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	replace 	 = require('gulp-replace'),
	paths 		 = require('./_assets/gulp_config/paths');


// --------------------------------------------------
// 				 Tasks: JavaScript
// --------------------------------------------------

// concatenate + minify + wrap in IIFE
var js_main_format = () => {
	return gulp.src('_assets/js/_partials/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify({ keep_fnames: true }))
		.pipe(insert.wrap('(function() {', '\n})();'))
		.pipe(gulp.dest('_site/assets/js'))
		.pipe(gulp.dest('assets/js'));
}

// watch -> change -> format
gulp.task('js_main_watch', () => {
	return gulp.watch('_assets/js/_partials/*.js', js_main_format);
});

// delete compiled file -> start over
gulp.task('js_main_clean', () => {
	return gulp.src('assets/js/main.js', { allowEmpty: true })
		.pipe(clean());
});

// clear compiled JS -> rewrite whenever JS partial changes
gulp.task('js_main', gulp.series('js_main_clean', 'js_main_watch'));

// --------------------------------------------------
// 					Tasks: CSS
// --------------------------------------------------

// compile + minify + autoprefix
var css_main_format = () => {
	return gulp.src('_assets/css/style.scss')
		.pipe(sass({
			includePaths: ['./_assets/css/_sass'],
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			grid: true
		}))
		.pipe(gulp.dest('_site/assets/css'))
		.pipe(gulp.dest('assets/css'))
};

// watch -> change -> format
gulp.task('css_main_watch', () => {
	return gulp.watch('_assets/css/_sass/*.scss', css_main_format);
});

// delete compiled file -> start over
gulp.task('css_main_clean', () => {
	return gulp.src('assets/css/style.css', { allowEmpty: true })
		.pipe(clean());
});

// clear compiled folder -> rewrite when SCSS partials change
gulp.task('css_main', gulp.series('css_main_clean', 'css_main_watch'));