const gulp = require('gulp');
const eslint = require('eslint');
const mocha = require('mocha');

var files = ['/nodecellar/**', '/models/**', '/routes/**', '/test/**', '/winecellar'];
console.log(__dirname);

gulp.task('eslint', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src(files)
  .pipe(mocha())
  .pipe(mocha.format());
});

gulp.task('default', ['eslint', 'mocha']);
