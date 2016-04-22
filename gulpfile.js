const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['server.js', 'gulpfile.js', './routes/**/*.js', './models/**/*.js'];

gulp.task('watch-mocha', () => {
  gulp.watch(['routes/**/*.js', 'test/**/*.js'], ['mocha']);
});

gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint())
  .pipe(eslint.format());
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

gulp.task('default', ['lint', 'lint:test', 'mocha']);
