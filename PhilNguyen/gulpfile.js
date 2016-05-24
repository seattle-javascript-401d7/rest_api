'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const gulpProtractorAngular = require('gulp-angular-protractor');
const cp = require('child_process');
const mongoUri = 'mongodb://localhost/test_server';
const html = require('html-loader');
let children = [];

let files = ['api_server.js', 'gulpfile.js',
'routes/**/*.js'];

gulp.task('lint: dev', () => {
  return gulp.src(files)
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
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'html'
        }
      ]
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

gulp.task('sass:dev', function() {
  gulp.src('public/app/css/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('./build'));
});

gulp.task('startservers:test', () => {
  children.push(cp.fork('static_server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('api_server.js', [], { env: { MONGODB_URI: mongoUri } } ));
})
.on('end', () => {
  children.forEach((child) => {
    child.kill('SIGTERM');
  });
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

gulp.task('build:dev', ['webpack:dev', 'static:dev', 'sass:dev', 'css:dev']);
gulp.task('default', ['startservers:test', 'build:dev', 'lint: dev']);

gulp.task('sass:watch', function() {
  gulp.watch('./*.scss', ['sass:dev']);
});
