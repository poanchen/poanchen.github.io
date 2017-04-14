var gulp      = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify    = require('gulp-uglify');
var deploy    = require('gulp-gh-pages');

// minimized all the css files
gulp.task('minify-css', function() {
  gulp.src('./src/css/*.css')
  .pipe(minifyCss())
  .pipe(gulp.dest('app/css'));
});

// minimized all the js files
gulp.task('minify-js', function() {
  gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('app/js'));
});

// minimized all the css/js files
gulp.task('watch-all', function() {
  gulp.watch('src/css/*.css', ['minify-css']);
  gulp.watch('src/js/*.js', ['minify-js']);
});

gulp.task('deploy', function () {
  return gulp.src("./_site/**/*")
    .pipe(deploy())
});

gulp.task('default', ['minify-css', 'minify-js', 'watch-all']);
