'use strict';

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const path          = require('./paths.json');
const inject        = require('gulp-inject');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const autoprefixer  = require('gulp-autoprefixer');
const csso          = require('gulp-csso');
const sourcemaps    = require('gulp-sourcemaps');
const htmlmin       = require('gulp-htmlmin');
const jshint        = require('gulp-jshint');
const ngAnnotate    = require('gulp-ng-annotate');
const clean         = require('gulp-clean');
const replace       = require('gulp-replace');

const prefixerBrowser = [
	'ie >= 9',
	'ie_mob >= 10',
	'ff >= 30',
	'chrome >= 34',
	'safari >= 7',
	'opera >= 23',
	'ios >= 7',
	'android >= 4.4',
	'bb >= 10'
];

const uglifyOptions = {
	compress: true
};

gulp.task('clean', function() {
    return gulp.src(path.dist, { allowEmpty: true })
        .pipe(clean());
});

gulp.task('build:vendor', function() {
    return gulp.src(path.vendor)
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.dist_vendor))
});

gulp.task('build:css', function() {
    return gulp.src(path.sass)
        .pipe(sass())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer(prefixerBrowser))
        .pipe(csso({ debug: false }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.dist_css))
});

gulp.task('build:js', function() {
    return gulp.src([
            "./src/app/**/*.module.js",
            "./src/app/**/*.js",
            "!./src/app/github",
            "!./src/app/**/*.spec.js"
        ])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(ngAnnotate())
        .pipe(jshint())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.dist_js));
});

gulp.task('build:modules', function() {
    return gulp.src([
            "./src/app/github/*.controller.js"
        ])
        .pipe(ngAnnotate())
        .pipe(jshint())
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest(path.dist + '/app/github'));
});

gulp.task('build:templates', function() {
    return gulp.src([
            './src/**/*.html',
            '!./src/index.html',
        ])
        .pipe(htmlmin())
        .pipe(gulp.dest(path.dist))
});

gulp.task('build:inject', function() {
    return gulp.src(path.main)
        .pipe(inject(gulp.src('./dist/js/vendor.min.js'), {
            name: 'vendor',
            relative: true,
            addSuffix: '?v=' + new Date().getTime()
        }))
        .pipe(inject(gulp.src('./dist/js/app.min.js'), {
            name: 'app',
            relative: true,
            addSuffix: '?v=' + new Date().getTime()
        }))
        .pipe(inject(gulp.src('./dist/css/app.css'), {
            name: 'styles',
            relative: true,
            addSuffix: '?v=' + new Date().getTime()
        }))
        .pipe(replace('../dist/', ''))
        .pipe(htmlmin())
        .pipe(gulp.dest(path.dist))
});

gulp.task('build', gulp.series(
    'clean', 
    'build:vendor', 
    'build:css', 
    'build:js', 
    'build:inject', 
    'build:modules',
    'build:templates'
));