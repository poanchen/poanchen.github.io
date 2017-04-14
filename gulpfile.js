var gulp      = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify    = require('gulp-uglify');
var deploy    = require('gulp-gh-pages');
var rename    = require('gulp-rename');

// minimized all the css files
gulp.task('minify-css', function() {
  gulp.src('./src/css/*.css')
  .pipe(minifyCss())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/css'));
});

// minimized all the js files
gulp.task('minify-js', function() {
  gulp.src('./src/js/*.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('app/js'));
});

// minimized all the css/js files
gulp.task('watch-all', function() {
  gulp.watch('src/css/*.css', ['minify-css']);
  gulp.watch('src/js/*.js', ['minify-js']);
});

gulp.task('deploy', function () {
  return gulp.src("./_site/**/*")
    .pipe(deploy({ 
      remoteUrl: "https://github.com/poanchen/poanchen.github.io.git",
      branch: "master"
    }))
});

gulp.task('default', ['minify-css', 'minify-js', 'watch-all']);
