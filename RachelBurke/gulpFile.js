const gulp = require('gulp');
const eslint = require('gulp-eslint');

var files = ['/nodecellar/**', '/models/**', '/routes/**', '/test_api/**', '/winecellar'];
console.log(__dirname);

gulp.task('eslint', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('default', ['eslint']);
