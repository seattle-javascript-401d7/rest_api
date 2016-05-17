const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const protractor = require('gulp-protractor').protractor;
const cp = require('child_process');
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/wine_test';


var lintFiles = ['/nodecellar/**', '/models/**', '/routes/**', '/test/**', '/winecellar'];
var clientFiles = ['app/**/*.js'];

var children = [];

function killcp() {
  children.forEach((child) => {
    child.kill('SIGTERM');
  });
}

gulp.task('lint:dev', () => {
  return gulp.src(lintfiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('lintClient', () => {
  return gulp.src(clientFiles)
  .pipe(eslint('./app/.eslintrc'))
  .pipe(eslint.format());
});

gulp.task('webpack:dev', () => {
  gulp.src('./app/js/entry.js')
  .pipe(webpack({
    devtool: 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('./build'));
});

gulp.task('mocha', () => {
  return gulp.src(files)
  .pipe(mocha())
  .pipe(mocha( { reporter: 'nyan' }));
});

gulp.task('static:dev', () => {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('./build'));
  gulp.src('app/**/*.css')
  .pipe(gulp.dest('./build'));
});

gulp.task('mongoDb:test', (done) => {
  children.push(cp.spawn('mongod'));
  setTimeout(done, 1000);
});
gulp.task('dropDb:test', ['mongoDB:test'], (done) => {
  mongoose.connect(mongoUri, () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.disconnect(done);
    });
  });
});

gulp.task('startservers:test', (done) => {
  children.push(cp.fork('server.js'));
  children.push(cp.fork('../server/server.js', [], { env: { MONGODB_URI: mongoUri } } ));
  children.push(cp.spawn('webdriver-manager', ['start']));
  setTimeout(done, 1000);
});

gulp.task('protractor:test', ['build:dev', 'startservers:test', 'dropDb:test'], () => {
  gulp.src('test/integration/**/*spec.js')
  .pipe(protractor({
    configFile: 'test/integration/config.js'
  }))
  .on('end', () => {
    killcp();
  })
  .on('error', () => {
    killcp();
  });
});

gulp.task('default', ['lint', 'mocha', 'lintClient', 'webpack', 'static']);
gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('test', ['protractor:test', 'webpack:protractor']);
gulp.task('default', ['build:dev', 'lint', 'test']);
