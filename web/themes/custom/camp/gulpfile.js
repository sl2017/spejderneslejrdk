/*eslint no-undef: "error"*/
/*eslint-env node*/

// Get modules.
var gulp = require('gulp');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// Sass.
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-neat').includePaths,
      outputStyle: 'expanded'
    }).on('error', notify.onError(function (error) {
      return 'SASS error: ' + error.message;
    })))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('./css'));
});

// Sass watch.
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

// JsHint.
gulp.task('jshint', function() {
  return gulp.src(['gulpfile.js', './js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JsHint watch.
gulp.task('jshint:watch', function () {
  gulp.watch(['gulpfile.js', './js/*.js'], ['jshint']);
});

// Register workers.
gulp.task('default', ['jshint', 'sass', 'jshint:watch', 'sass:watch']);
