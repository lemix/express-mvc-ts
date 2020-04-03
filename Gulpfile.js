var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var run = require('gulp-run');
var rename = require('gulp-rename');
var dotter = require('./gulp/gulp-dot-codegen');
var dts = require('./gulp/declare-module');
var gulpSequence = require('gulp-sequence')

gulp.task('compile', shell.task(['tsc -p .']));

gulp.task('clean', function () {
    return del([
        'build/*',
        'declarations/*',
        'index.js',
        'index.d.ts'
    ]);
});

gulp.task('rollup', function () {
    return gulp.src(['src/index.ts'])
        .pipe(run('rollup <%= file.path %> --format cjs --config', { silent: true }))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('.'));
});

gulp.task('dts', function () {
    return gulp.src(['declarations/*.d.ts'])
        .pipe(dts.stripDeclares())
        .pipe(concat('index.d.ts'))
        .pipe(dts.wrapModule('express-mvc-ts'))
        .pipe(dts.variousHacks())
        .pipe(gulp.dest('.'));
});

gulp.task('build', gulpSequence("clean", "compile", "rollup", "dts"))

