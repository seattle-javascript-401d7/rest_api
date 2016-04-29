const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var files = ['server.js','gulpfile.js','routes/songsrouter.js','routes/moviesrouter.js','models/songs.js','models/movies.js','lib/servererror.js'];

gulp.task('mochatest', () => {
  return gulp.src('test/servertest.js')
  .pipe(mocha());
});
gulp.task('lint:notest', () => {
  return gulp.src(files)
  .pipe(eslint({
    rules: {
      'indent': ['error', 2]
    },
    envs: [
      'mocha',
      'es6'
    ]
  })).pipe(eslint.format());
});
gulp.task('lint:test', () => {
  return gulp.src('test/servertest.js')
  .pipe(eslint({
    rules: {
      'indent': ['error', 2]
    },
    envs: [
      'mocha',
      'es6'
    ]
  })).pipe(eslint.format());
});
gulp.task('lint', ['lint:notest', 'lint:test']);
gulp.task('default', ['lint', 'mochatest']);
