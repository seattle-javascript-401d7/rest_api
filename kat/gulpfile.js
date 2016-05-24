const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const html = require('html-loader'); // eslint-disable-line no-unused-vars


var files = ['lib**/*.js', 'routes/**/*.js',
'models/**/*.js', 'gulpfile.js', 'server.js'];
var clientFiles = ['app/**/*.js'];
var testFiles = ['test/unit/pet_controller_test.js', 'test/unit/sandwich_controller_test.js', 'test/integration/*.js'];

gulp.task('lintServer', () => {
  return gulp.src(files)
  .pipe(eslint('./.eslintrc'))
  .pipe(eslint.format());
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
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.html$/,
            loader: 'html'
          }
        ]
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
