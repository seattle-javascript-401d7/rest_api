const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var serverFiles = ['*.js', './lib/*.js', './models/*.js', './routes/*.js'];
var testFiles = ['./test/**/*test.js'];
var appFiles = ['./app/**/*.js'];

gulp.task('test:mocha', () => {
  return gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('lint:test', () => {
  return gulp.src(testFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:server', () => {
  return gulp.src(serverFiles)
    .pipe(eslint('./.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('lint:app', () => {
  return gulp.src(appFiles)
    .pipe(eslint('./app/.eslintrc.json'))
    .pipe(eslint.format());
});

gulp.task('test', ['test:mocha']);
gulp.task('lint', ['lint:test', 'lint:server', 'lint:app']);
gulp.task('watch', () => {
  gulp.watch(serverFiles, ['test', 'lint:server']);
  gulp.watch(testFiles, ['test', 'lint:test']);
  gulp.watch(appFiles, ['test', 'lint:app']);
});

gulp.task('default', ['watch', 'lint', 'test']);
