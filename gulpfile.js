'use strict';

var gulp = require('gulp');
var typescript = require('typescript');
var ts = require('gulp-typescript');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

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

gulp.task('reload:jsx', ['bundle'], done => {reload(); done();});

gulp.task('watch', ['bundle'], () => {
    gulp.watch('src/**/*{ts,tsx}', ['reload:jsx']);
});

gulp.task('clean', done => del(['tmp'], done.bind(this)));


gulp.task('default', ['watch'], () => {
    browserSync.init({
        proxy: 'localhost:3000',
    });

});
