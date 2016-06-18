const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const cp = require('child_process');
const webpack = require('webpack-stream');
const mongoUri = 'mongodb://localhost/movies_server';
const exec = require('child_process').exec;
const maps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

var children = [];

function runCommand(command) {
  return function(cb) {
    exec(command, function(err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
}

var files = ['public/server.js', 'public/js/entry.js', 'server.js','gulpfile.js','routes/songsrouter.js','routes/moviesrouter.js','models/songs.js','models/movies.js','lib/servererror.js'];

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


gulp.task('sass:dev', () => {
  gulp.src('public/scss/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('webpack:dev', () => {
  gulp.src('public/js/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('webpack:test', () => {
  gulp.src('test/unit/test_entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./test'));
});

gulp.task('static:dev', () => {
  gulp.src(['public/**/*.html', 'public/css/style.css'])
  .pipe(gulp.dest('./build'));
});

gulp.task('startservers', () => {
  children.push(cp.fork('./public/server.js'));
  children.push(cp.spawn('webdriver-manager', ['start']));
  children.push(cp.spawn('mongod', ['--dbpath=./db']));
  children.push(cp.fork('server', [], {env: {APP_SECRET:'booyah', MONGO_URI: mongoUri}}));
});

gulp.task('start-mongo', runCommand('sudo mongod --dbpath=./db --smallfiles'));

gulp.task('aaa', runCommand('pwd'));

gulp.task('build:dev', ['sass:dev', 'webpack:dev', 'static:dev']);
gulp.task('lint', ['lint:notest', 'lint:test']);
gulp.task('lint-test', ['lint', 'mochatest'], function() {
  process.exit();
});

gulp.task('default', ['startservers', 'build:dev', 'lint']);
