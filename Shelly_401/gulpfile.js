const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

var files = ['lib/**/*.js',
 'test/**/*.js',
  'models/**/*.js',
  'lib/**/*.js',
  'routes/**/*.js',
  'gulpfile.js',
  'server.js',
'_server.js'];

gulp.task('mocha', () => {
  return gulp.src(['./test/**/*test.js'], { read: false })
  .pipe(mocha({
    reporter: 'nyan'
  }))
  .on('error', gutil.log);
});

gulp.task('lint:test', () => {
  return gulp.src('lint:test', () => {
    return gulp.src('./test/**/*.js')
    .pipe(eslint({
    }));
  });
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
  .pipe(eslint( {
    useEslintrc: false,
    warnFileIgnored: true,
    env: {
      'browser': true,
      'jquery': true,
      'es6': true,
      'node': true
    }
  }))
  .pipe(eslint.format());
});

gulp.task('watch-files', ['mocha'], () => {
  gulp.watch(files, ['mocha']);
  gulp.watch(files, ['lint:test']);
  gulp.watch(files, ['lint:nontest']);
});
gulp.task('server', ['watch-files']);
gulp.task('default', ['server']);
