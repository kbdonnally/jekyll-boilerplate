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

var js_format = () => {
	return gulp.src('./assets/js/_partials/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify({ keep_fnames: true }))
		.pipe(insert.wrap('(function() {', '\n})();'))
		.pipe(gulp.dest('./assets/js'));
}

gulp.task('js_watch', () => {
	return gulp.watch('./assets/js/_partials/*.js', js_format);
});

gulp.task('js_clean', () => {
	return gulp.src('./assets/js/main.js', { allowEmpty: true })
		.pipe(clean());
});

gulp.task('js', gulp.series('js_clean', 'js_watch'));

// CSS:



var css_format = () => {
	return gulp.src('./assets/css/style.scss')
		.pipe(replace("---", "/* remove Jekyll frontmatter */"))
		.pipe(sass({
            includePaths: ['./assets/css/_sass'],
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
        	browsers: ['last 2 versions'],
        	grid: true
        }))
		.pipe(gulp.dest('./assets/css'))
		.pipe(gulp.dest('./_site/assets/css'));

};

gulp.task('css_watch', () => {
	return gulp.watch('./assets/css/_sass/*.scss', css_format);
});

gulp.task('css_clean', () => {
	return gulp.src('./assets/css/test/style.?(s)css', { allowEmpty: true })
		.pipe(clean());
});

gulp.task('css', gulp.series('css_clean', 'css_watch'));