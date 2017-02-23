const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');

var files = ['/nodecellar/**', '/models/**', '/routes/**', '/test/**', '/winecellar'];
var clientFiles = ['app/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint('./.eslintrc'))
  .pipe(eslint.format());
});

gulp.task('lintClient', () => {
  return gulp.src(clientFiles)
  .pipe(eslint('./app/.eslintrc'))
  .pipe(eslint.format());
});

gulp.task('webpack', () => {
  gulp.src('./app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('mocha', () => {
  return gulp.src(files)
  .pipe(mocha())
  .pipe(mocha( { reporter: 'nyan' }));
});

gulp.task('static', () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
  gulp.src('app/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['lint', 'mocha', 'lintClient', 'webpack', 'static']);
gulp.task('build', ['webpack', 'static']);
