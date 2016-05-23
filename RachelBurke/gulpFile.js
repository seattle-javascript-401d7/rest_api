const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');

var files = ['/nodecellar/**/*.js', '/models/**/*.js', '/routes/**/*.js', 'server.js'];
var clientFiles = ['app/**/*.js'];
var testFiles = ['test/unit/wine_controllertest.js',
'test/unit/cheese_controllertest.js', 'test/unit/*.js', 'test/test_api.js/'];

gulp.task('lintServer', () => {
  return gulp.src(files)
  .pipe(eslint('./.eslintrc'))
  .pipe(eslint.format( { reporter: 'nyan' } ));
});

gulp.task('lintClient', () => {
  return gulp.src(clientFiles)
  .pipe(eslint('./app/.eslintrc'))
  .pipe(eslint.format());
});
gulp.task('lintTest', () => {
  return gulp.src(testFiles)
  .pipe(eslint('./test/unit/.eslintrc'))
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('./app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('./test/unit/test_entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./test'));
});

gulp.task('static', () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
  gulp.src('app/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('default', ['lintServer', 'lintClient', 'lintTest', 'webpack:dev', 'static']);
gulp.task('build', ['webpack:dev', 'static', 'webpack:test']);
