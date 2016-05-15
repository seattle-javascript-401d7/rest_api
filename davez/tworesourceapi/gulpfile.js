const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const cp = require('child_process');
const webpack = require('webpack-stream');
const mongoUri = 'mongodb://localhost/movies_server';

var children = [];

var files = ['public/server.js', 'public/entry.js', 'server.js','gulpfile.js','routes/songsrouter.js','routes/moviesrouter.js','models/songs.js','models/movies.js','lib/servererror.js'];

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

gulp.task('webpack:dev', () => {
  gulp.src('public/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('static:dev', () => {
  gulp.src(['public/index.html', 'public/entry.css'])
  .pipe(gulp.dest('./build'));
});

gulp.task('startservers', () => {
  children.push(cp.fork('./public/server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('server', [], {env: {MONGO_URI: mongoUri}}));
});
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('lint', ['lint:notest', 'lint:test']);
gulp.task('lint-test', ['lint', 'mochatest'], function() {
  process.exit();
});
gulp.task('default', ['startservers', 'build:dev']);
