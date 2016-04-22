/* eslint-env mocha */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var allFiles = ['bin/**/*, lib/**/*.js, test/**/*.js, gulpfile.js, index.js'];
var testFiles = ['test/**/*test.js'];

gulp.task('lint', () => {
  return gulp.src(allFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src(testFiles)
  .pipe(mocha);
});

gulp.task('default', ['lint', 'mocha']);
