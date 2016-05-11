const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['./lib/**/*.js', './models/**/*.js', './routes/**/*.js', 'gulpfile.js'];

gulp.task('lint:test', () => {
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
gulp.task('default', ['lint:test', 'lint:nontest']);
