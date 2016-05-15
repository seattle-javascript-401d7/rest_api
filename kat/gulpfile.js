const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const childProcess = require('child_process');
const exec = require('child_process').exec();
var children = [];

var files = ['lib**/*.js', 'test/**/*.js', 'routes/**/*.js',
'models/**/*.js', 'gulpfile.js', 'server.js'];
var clientFiles = ['app/**/*.js'];

gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint('./.eslintrc'))
  .pipe(eslint.format());
});

gulp.task('lintClient', () => {
  return gulp.src(clientFiles)
    .pipe(eslint('./app/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('webpack', () => {
  gulp.src('./app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'))
    // put this onto your protractor test
    .on('end', () => {
      children.forEach((child) => {
        child.kill('SIGTERM');
      });
    });
});

gulp.task('static', () => {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('./build'));
  gulp.src('app/**/*.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('startServer', () => {
  children.push(childProcess.fork('client_server.js'));
  children.push(childProcess.spawn('webdriver-manager', ['start']));
  children.push(childProcess.spawn('mongod', ['--dbpath=./db']));
  children.push(childProcess.fork('server.js', [],
  { env: { MONGODB_URI: 'mongodb://localhost/test_server' } }));
});

gulp.task('default', ['lint', 'lintClient', 'startServer', 'webpack', 'static']);
gulp.task('build', ['startServer', 'webpack', 'static', 'webpack']);


gulp.task('default', ['lint']);
