const gulp = require('gulp');
const eslint = require('gulp-eslint');


var files = ['lib**/*.js', 'test/**/*.js', 'routes/**/*.js',
'models/**/*.js', 'gulpfile.js', 'server.js'];
var clientFiles = ['./client/app**/*.js'];

gulp.task('lintServer', () => {
  return gulp.src(files)
  .pipe(eslint('./.eslintrc'))
  .pipe(eslint.format());
});


gulp.task('lintClient', () => {
  return gulp.src(clientFiles)
  .pipe(eslint('./client/app/.eslintrc'))
  .pipe(eslint.format());
});

gulp.task('default', ['lintServer', 'lintClient']);
