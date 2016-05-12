const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');


var files = ['lib**/*.js', 'test/**/*.js', 'routes/**/*.js',
'models/**/*.js', 'gulpfile.js', 'server.js'];
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

gulp.task('static', () => {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
  gulp.src('app/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['lint', 'lintClient', 'webpack', 'static']);


gulp.task('default', ['lint']);
