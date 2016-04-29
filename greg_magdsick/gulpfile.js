'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

const scripts = ['index.js', 'gulpfile.js', 'lib/*.js', 'test/*_test.js', 'models/*.js'];

gulp.task('lint', () => {
  return gulp.src(scripts)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src('test/**/*_test.js')
  .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(scripts, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test']);
