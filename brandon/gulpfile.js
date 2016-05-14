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
  children.push(cp.fork('api_server.js'));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('front_end_server.js', [], { env: {
    MONGODB_URI: 'mongodb://localhost/jedi_sith_test_db' } }));
  children.push(cp.spawn('webdriver-manager', ['start']));
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

gulp.task('protractor', ['start:server', 'build:dev'], () => {
  return gulp.src(['test/integration/db_spec.js'])
  .pipe(protractor({
    configFile: 'test/integration/config.js'
  }))
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGINT');
    });
  });
});

gulp.task('build:test', ['webpack:dev', 'static:dev']);
gulp.task('build:dev', ['lint', 'webpack:dev', 'static:dev', 'start:server']);
gulp.task('test', ['protractor']);
gulp.task('default', ['build:dev', 'test']);
