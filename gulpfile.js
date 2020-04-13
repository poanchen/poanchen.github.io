var gulp        = require('gulp'),
	plumber     = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	stylus      = require('gulp-stylus'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	jeet        = require('jeet'),
	rupture     = require('rupture'),
	koutoSwiss  = require('kouto-swiss'),
	prefixer    = require('autoprefixer-stylus'),
	imagemin    = require('gulp-imagemin'),
	cp          = require('child_process');

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

/**
 * Build the Jekyll Site
 */
function jekyllBuild() {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'});
}

function reloadBrowserSync(done) {
	browserSync.reload();
	done();
}

function doBrowserSync(done) {
	browserSync.init({
    server: {
      baseDir: "./_site/"
    },
    port: 3000
  });
  done();
}

function runStylus() {
	return gulp.src('src/styl/main.styl')
		.pipe(plumber())
		.pipe(stylus({
			use:[koutoSwiss(), prefixer(), jeet(), rupture()],
			compress: true
		}))
		.pipe(gulp.dest('_site/assets/css/'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('assets/css'));
}

function runJs() {
	return gulp.src('src/js/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'));
}

function runImagemin() {
	return gulp.src('src/img/**/*.{jpg,png,gif,PNG,JPG}')
		.pipe(plumber())
		.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
		.pipe(gulp.dest('img/'));
}

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
function watch() {
	gulp.watch('src/styl/**/*.styl', runStylus);
	gulp.watch('src/js/**/*.js', runJs);
	gulp.watch('src/img/**/*.{jpg,png,gif,PNG,JPG}', runImagemin);
	gulp.watch(['*.html', 'about/index.html', 'blog/index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'],
		gulp.series(jekyllBuild, reloadBrowserSync));
}

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.series(runJs, runStylus, gulp.series(jekyllBuild, doBrowserSync), watch));
gulp.task('compileJsStylus', gulp.series(runJs, runStylus));
