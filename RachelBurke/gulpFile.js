const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['/nodecellar/**', '/models/**', '/routes/**', '/test/**', '/winecellar'];
console.log(__dirname);

gulp.task('eslint', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint( { reporter: 'nyan' }));
});

gulp.task('mocha', () => {
  return gulp.src(files)
  .pipe(mocha())
  .pipe(mocha( { reporter: 'nyan' }));
});

gulp.task('default', ['eslint', 'mocha']);
