const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');
const protractor = require('gulp-protractor').protractor;
const childProcess = require('child_process');
const exec = require('child_process').exec();
var children = [];

var files = ['lib**/*.js', 'routes/**/*.js',
'models/**/*.js', 'gulpfile.js', 'server.js'];
var clientFiles = ['app/**/*.js'];
var testFiles = ['test/unit/pet_controller_test.js', 'test/unit/sandwich_controller_test.js', 'test/integration/*.js'];

gulp.task('lintServer', () => {
  return gulp.src(files)
  .pipe(eslint('./.eslintrc'))
  .pipe(eslint.format());
});

gulp.task('lintClient', () => {
  return gulp.src(clientFiles)
    .pipe(eslint('./app/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('lintTest', () => {
  return gulp.src(testFiles)
    .pipe(eslint('./test/unit/.eslintrc'))
    .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('./app/js/entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('./test/unit/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./test'));
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

gulp.task('integrationTest', ['startServer', 'webpack:dev'], function() {
  return gulp.src(['./test/integration/db-spec.js'])
  .pipe(protractor({
    configFile: './test/integration/config.js'
  }))
//   .on('', () => {
//     children.forEach((child) => {
//       child.kill('SIGTERM');
//   })
// })
  .on('end', () => {
    children.forEach((child) => {
      child.kill('SIGTERM');
    });
  });
});

gulp.task('default', ['lintServer', 'lintClient', 'lintTest', 'startServer',
 'webpack:dev', 'static']);
gulp.task('build', ['webpack:dev', 'static', 'webpack:test', ]);
