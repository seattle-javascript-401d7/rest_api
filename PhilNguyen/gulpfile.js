'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const gulpProtractorAngular = require('gulp-angular-protractor');
const cp = require('child_process');
const mongoUri = 'mongodb://localhost/test_server';
let children = [];

let files = ['test/**/*.js', 'api_server.js', 'gulpfile.js',
'routes/**/*.js'];

let staticFiles = ['public/app/html/**/*.html'];

gulp.task('lint: test', () => {
  return gulp.src(files)
  .pipe(eslint({
    'useEslintrc': true
  }))
  .pipe(eslint.format());
});

gulp.task('lint:static', () => {
  return gulp.src(staticFiles)
  .pipe(eslint({
    'useEslintrc': true
  }))
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('public/app/js/entry.js')
  .pipe(webpack({
    watch: true,
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('test/unit/test_entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', () => {
  gulp.src('public/app/**/*.html')
  .pipe(gulp.dest('./build'));
});

gulp.task('css:dev', () => {
  gulp.src('public/app/css/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('startservers:test', () => {
  children.push(cp.fork('static_server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('api_server.js', [], { env: { MONGODB_URI: mongoUri } } ));
});

gulp.task('protractor:test', ['startservers:test', 'build:dev'], () => {
  gulp.src(['test/integration/heroes_spec.js', 'test/integration/villains_spec.js'])
  .pipe(gulpProtractorAngular({
    'configFile': 'test/integration/config.js',
    'debug': false,
    'autoStartStopServer': false
  }))
  .on('error', (error) => {
    console.log(error);
  })
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGTERM');
    });
  });
});

gulp.task('mocha: test', () => {
  return gulp.src(files)
  .pipe(mocha());
});

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'css:dev']);
gulp.task('default', ['startservers:test', 'build:dev', 'lint: test', 'lint:static']);
