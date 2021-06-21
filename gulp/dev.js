const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();
const sass          = require('gulp-sass');
const path          = require('./paths.json');
const inject        = require('gulp-inject');

var args = {
    relative: true,
    name: 'vendor',
    addSuffix: '?v=' + new Date().getTime()
};

gulp.task('vendor', function() {
    return gulp.src(path.main)
        .pipe(inject(gulp.src(path.vendor), args))
        .pipe(gulp.dest(path.root))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    args.name = 'app';

    return gulp.src(path.main)
        .pipe(inject(gulp.src(path.js), args))
        .pipe(gulp.dest(path.root))
        .pipe(browserSync.stream());
});

gulp.task('sass', function() {
    return gulp.src(path.sass)
        .pipe(sass())
        .pipe(gulp.dest(path.css))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: {
            baseDir: path.root,
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });

    gulp.watch(path.watchSass, gulp.series('sass'));
    gulp.watch(path.html).on('change', browserSync.reload);
    gulp.watch(path.js).on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('vendor', 'js', 'serve'));