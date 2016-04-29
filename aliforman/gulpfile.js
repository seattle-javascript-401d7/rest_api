'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var paths = ['**/*.js', '!node_modules/**', '!**/db/*'];

gulp.task('lint:test', () => {
  return gulp.src(paths)
  .pipe(eslint({
    envs: [
      'mocha',
      'es6'
    ]
  }))
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(paths)
    .pipe(eslint({
      envs: [
        'es6'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('mocha:test', () => {
  gulp.src('./test/**/*.js')
   .pipe(mocha());
});

gulp.task('default', ['lint:test', 'lint:nontest', 'mocha:test']);
