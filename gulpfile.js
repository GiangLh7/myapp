const fs = require('fs');
const conf = require('./src/conf/settings');
const gulp = require('gulp');
const sass = require('gulp-sass');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const css = { src: 'src/app/styles/**/*.scss', dest: 'src/app/dist/css/' };
const nodeJs = { src: ['src/**/*.js', '!src/public/**'] };
const vendorJs = conf.get('vendorJs').map(function(js) {
  return `src/${js}`;
});
const angularAppJs = conf.get('appJs').map(function(js) {
  return `src/${js}`;
});

gulp.task('vendorJs-compress', () => {
  gulp.src(vendorJs)
    .pipe(concat('vendor.js'))
    .pipe(minify({
      compress: false,
      mangle: false,
      noSource: true,
    }))
    .pipe(gulp.dest('src/app/min'));
});
gulp.task('appJs-compress', () => {
  gulp.src(angularAppJs)
    .pipe(concat('app.js'))
    .pipe(minify({
      compress: false,
      mangle: false,
      noSource: true,
    }))
    .pipe(gulp.dest('src/app/min'));
});
gulp.task('compress', ['vendorJs-compress', 'appJs-compress']);

gulp.task('lint', () =>
  gulp.src(nodeJs.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

// Tests
const testsPath = 'test/unit/**/*-test.js';

gulp.task('pre-test', () =>
  gulp.src(nodeJs.src)
    // Covering files
    .pipe(istanbul({ includeUntested: true }))
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
);

gulp.task('test-ci', ['pre-test'], () =>
    gulp.src([testsPath])
      .pipe(mocha({ reporter: 'xunit-file' }))
      // Creating the reports after tests ran
      .pipe(istanbul.writeReports({ dir: 'build/logs/coverage' }))
  // Enforce a coverage of at least 10%
  //.pipe(istanbul.enforceThresholds({ thresholds: { global: 10 } }))
);

gulp.task('test', () =>
  gulp.src(testsPath, { read: false })
    // gulp-mocha needs filepaths so you can't have any plugins before it
    .pipe(mocha({ reporter: 'nyan' }))
);

gulp.task('sass', function() {
  gulp.src(css.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest(css.dest))
});

gulp.task('watch-test', () => {
  gulp.watch([nodeJs.src, testsPath], ['test']);
});

gulp.task('watch-sass', function() {
  gulp.watch(css.src, ['sass']);
});

gulp.task('default', ['lint', 'compress']);

gulp.task('ci', ['lint', 'test-ci', 'compress']);
