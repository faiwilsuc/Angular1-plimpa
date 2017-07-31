'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
    browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles'], function() {
    var injectStyles = gulp.src([
        path.join(conf.paths.src, 'libs/**/*.css'),
        path.join(conf.paths.tmp, '/serve/app/**/*.css'),
        path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
    ], { read: false });

    var injectScripts = gulp.src([
            path.join(conf.paths.src, '/app/*.js'),
            path.join(conf.paths.src, '/app/main/**/*.js'),
            path.join(conf.paths.src, '/app/navigation/**/*.js'),
            path.join(conf.paths.src, '/app/core/**/*.js'),
            // path.join(conf.paths.src, '/app/**/*.module.js'),
            path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
            path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
            //
            path.join(conf.paths.src, '/libs/**/angular-ui-router.min.js'),
            path.join(conf.paths.src, '/libs/**/angular-spinners.min.js'),
            path.join(conf.paths.src, '/libs/**/angular-socialsharing.min.js'),
            path.join(conf.paths.src, '/libs/**/ng-file-upload.min.js'),
            path.join(conf.paths.src, '/libs/**/ng-file-upload-shim.min.js'),
            path.join(conf.paths.src, '/libs/**/ui-bootstrap-tpls-1.2.4.min.js'),
            path.join(conf.paths.src, '/libs/**/bootstrap.min.js'),
            path.join(conf.paths.src, '/libs/**/respond.min.js'),
            path.join(conf.paths.src, '/libs/**/html5shiv.js'),
            path.join(conf.paths.src, '/libs/**/jquery.ui.autocomplete.min.js'),
            path.join(conf.paths.src, '/libs/**/markerclusterer.min.js'),
            path.join(conf.paths.src, '/libs/**/jquery.geocomplete.min.js'),
            path.join(conf.paths.src, '/libs/**/owl.carousel.min.js'),
            path.join(conf.paths.src, '/libs/**/retina-1.1.0.min.js'),
            //
            path.join(conf.paths.src, '/libs/**/*.js'),
            path.join(conf.paths.src, '/libs/**/*.min.js')
        ])
        .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

    var injectOptions = {
        ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
        addRootSlash: true,
    };

    return gulp.src(path.join(conf.paths.src, '/*.html'))
        .pipe($.inject(injectStyles, injectOptions))
        .pipe($.inject(injectScripts, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep, { ignorePath: '..' })))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
