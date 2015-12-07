var concat = require('gulp-concat');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageminJpegtran = require('imagemin-jpegtran');
var merge = require('merge-stream');
var minifyCss = require('gulp-minify-css');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');

var optimizeImages = function() {
  var images = gulp.src([
    './assets/images/**/*',
  ], { base: './' })
    .pipe(imagemin({
      progressive: true,
      use: [
        pngquant(),
        imageminJpegtran(),
      ]
    }))
    .pipe(gulp.dest('dist'));

  return images;
}

var compileScripts = function() {
  return gulp.src([
    './node_modules/aja/src/aja.js',
    './assets/scripts/main.js',
  ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/scripts/'));
};

var compileStyles = function(source) {
  var styles = gulp.src([
    './node_modules/normalize.css/normalize.css',
    './assets/styles/vendor/**/*.css',
    './assets/styles/*.css',
  ])
    .pipe(minifyCss({
      keepSpecialComments: 0,
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/assets/styles/'));

  return styles;
};

gulp.task('default', function() {
  var images = optimizeImages();
  var styles = compileStyles();
  var scripts = compileScripts();
  return merge(styles, scripts, images);
});

gulp.task('watch', function (cb) {
    watch('assets/styles/**/*.css', function () {
        compileStyles();
    });

    watch('assets/scripts/**/*.js', function () {
        compileScripts();
    });

    watch('assets/images/**/*', function () {
        optimizeImages();
    });
});
