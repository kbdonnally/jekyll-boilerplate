// gulpfile.js

// --------------------------------------------------
// 				 Import modules:
// --------------------------------------------------

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
	return gulp.watch('_assets/css/**/*.scss', css_main_format);
});

// delete compiled file -> start over
gulp.task('css_main_clean', () => {
	return gulp.src('assets/css/style.css', { allowEmpty: true })
		.pipe(clean());
});

// clear compiled folder -> rewrite when SCSS partials change
gulp.task('css_main', gulp.series('css_main_clean', 'css_main_watch'));

// --------------------------------------------------
// 					Tasks: Images
// --------------------------------------------------

// not processing the images rn, so just
// passing them to the right directory
var img_all_format = () => {
	return gulp.src(paths.imgSrc)
		.pipe(gulp.dest('_site/assets/img'))
		.pipe(gulp.dest('assets/img'));
};

// watch -> change -> send files
gulp.task('img_all_watch', () => {
	return gulp.watch(paths.imgSrc, img_all_format);
});

// delete folder the site reads
gulp.task('img_all_clean', () => {
	return gulp.src('assets/img', { allowEmpty: true })
		.pipe(clean());
});

// clear site-read folder -> rewrite when images change
gulp.task('img_all', gulp.series('img_all_clean', 'img_all_watch'));

// --------------------------------------------------
// 			  Tasks: Build main assets
// --------------------------------------------------

gulp.task('assets_main', gulp.parallel('js_main', 'css_main', 'img_all'));