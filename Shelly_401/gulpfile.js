const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

var files = ['lib/**/*.js', 'test/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'gulpfile.js', 'server.js'];

gulp.task('mocha', () => {
  return gulp.src(['./test/**/*test.js'], { read: false })
  .pipe(mocha({
    reporter: 'nyan'
  }))
  .on('error', gutil.log);
});

gulp.task('lint:test', () => {
  return gulp.src('lint:test', () => {
    return gulp.src('./test/**/image_test.js')
    .pipe(eslint({
    }));
  });
});

gulp.task('lint:nontest', () => {
  return gulp.src(files)
  .pipe(eslint( {
    useEslintrc: false,
    warnFileIgnored: true,
    // rules: {
    //   'semi': 1,
    //   'indent': ['error', 2],
    //   'quotes': [1, 'single']
    // },
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
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
  gulp.watch(['lib/**', 'test/**'], ['lint:test']);
  gulp.watch(['lib/**', 'test/**'], ['lint:nontest']);
});

gulp.task('gulpfile.js', ['watch-files']);
gulp.task('default', ['server']);
