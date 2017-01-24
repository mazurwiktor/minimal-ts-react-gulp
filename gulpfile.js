'use strict';

var gulp = require('gulp');
var typescript = require('typescript');
var ts = require('gulp-typescript');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');


var project = ts.createProject('src/tsconfig.json', {typescript: typescript});
var tsReporter = ts.reporter.defaultReporter;

gulp.task('html', () => 
    gulp.src(['src/index.html'])
    .pipe(gulp.dest('dist'))
);

gulp.task('compile', () =>
    gulp.src('src/**/*{ts,tsx}')
    .pipe(project(tsReporter())).js
    .pipe(gulp.dest('.tmp'))
)

gulp.task('bundle', ['html', 'compile'], () => {
    var b = browserify('.tmp/bootstrap.js');
       return b.bundle()
           .pipe(source('bundle.js'))
           .pipe(gulp.dest('dist'));

});

gulp.task('clean', done => del(['tmp'], done.bind(this)));
