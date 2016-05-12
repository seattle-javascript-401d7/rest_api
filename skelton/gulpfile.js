const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');

var files = ['./lib/**/*.js', './models/**/*.js', './routes/**/*.js', 'gulpfile.js'];

gulp.task('lint:test', ['lint:nontest'], () => {
  return gulp
  .src('./test/**/*test.js')
  .pipe(mocha({reporter: 'nyan'}))
  .pipe(eslint())
  .pipe(eslint.format());
});
gulp.task('lint:nontest', () => {
  return gulp
  .src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack:dev', ['lint:test'], () => {
  gulp.src('./app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', ['webpack:dev'], () => {
  gulp.src('/app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', ['webpack:dev'], () => {
  gulp.src('/app/css/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('builder', ['webpack:dev', 'static:dev', 'css:dev'])
gulp.task('default', ['lint:test', 'lint:nontest', 'builder']);
