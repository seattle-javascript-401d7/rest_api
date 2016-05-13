const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const cp = require('child_process');
const protractor = require('gulp-protractor').protractor;
var children = [];

var files = ['server.js', 'gulpfile.js', './routes/**/*.js', './models/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  return gulp.src('app/js/entry.js')
    .pipe(webpack({
      devtool: 'source-map',
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('start:server', () => {
  children.push(cp.fork('apiServer.js'));
  children.push(cp.fork('frontEndServer.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
});

gulp.task('protractor', ['start:server', 'build:dev'], () => {
  return gulp.src(['./src/test/integration/*spec.js'])
    .pipe(protractor({
      configFile: 'test/integration/config.js'
    }))
    .on('end', () => {
      children.forEach((child) => {
        child.kill('SIGTERM');
    });
  });
});

gulp.task('lint:test', () => {
  return gulp.src('./test/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', () => {
  return gulp.src('test/**/*.js')
  .pipe(mocha())
  .once('end', () => {
    process.exit();
  });
});

gulp.task('build:dev', ['lint', 'webpack:dev', 'static:dev', 'start:server']);
gulp.task('test', ['mocha', 'protractor']);
gulp.task('default', ['build:dev', 'protractor']);
