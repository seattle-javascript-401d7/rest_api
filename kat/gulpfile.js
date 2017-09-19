const gulp = require('gulp');
const eslint = require('gulp-eslint');


var files = ['lib**/*.js', 'test/**/*.js', 'routes/**/*.js',
'models/**/*.js', 'gulpfile.js', 'server.js'];


gulp.task('lint', () => {
  return gulp.src(files)
  .pipe(eslint({
    envs: [
      'mocha',
      'es6'
    ]
  }))
  .pipe(eslint.format());
});


gulp.task('default', ['lint']);
