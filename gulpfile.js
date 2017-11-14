/**
 * @author shiro
 */

var host = 'page/login00/';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    cache = require('gulp-cache'),
    html = require('gulp-htmlmin'),
    map = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    base64 = require('gulp-base64'),
    concat = require('gulp-concat');

gulp.task('sass', function() {
  return gulp.src(host + 'scss/!(_)*.scss')
    .pipe(map.init())
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer({browsers:['last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}))
    .pipe(base64({extensions: ['png'], maxImageSize: 20480, debug: false}))
    .pipe(cssnano())
    .pipe(map.write('/'))
    .pipe(gulp.dest(host + 'css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('script', function() {
  return gulp.src(host + 'script/**/!(_)*.js')
    .pipe(map.init())
    .pipe(babel({ presets: ['es2015']}))
    .pipe(uglify())
    .pipe(map.write('/'))
    .pipe(gulp.dest(host + 'js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', function() {
  gulp.watch(host + 'scss/*.scss', ['sass']);
  gulp.watch(host + 'script/*.js', ['script']);
});

gulp.task('default', function() {
  gulp.start('sass', 'script');
});









