'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import urlAdjuster from 'gulp-css-url-adjuster';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import htmlhint from 'gulp-htmlmin';
import del from 'del';
import babel from 'gulp-babel';
import Cache from 'gulp-file-cache';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import cleanCss from 'gulp-clean-css';

let cache = new Cache();

const DIR = {
    SRC: 'src',
    DEST: 'dist'
};

const SRC = {
    JS: DIR.SRC + '/js/**/*.js',
    CSS: DIR.SRC + '/css',
    SASS: DIR.SRC + '/sass/**/*.scss',
    HTML: DIR.SRC + '/html/**/*.html',
    IMAGES: DIR.SRC + '/images/**/*',
    FONTS: DIR.SRC + '/fonts/*',
    SERVER: 'server/**/*.js'
};

const DEST = {
    JS: DIR.DEST + '/js',
    CSS: DIR.DEST + '/css',
    HTML: DIR.DEST + '/html',
    IMAGES: DIR.DEST + '/images',
    FONTS: DIR.DEST + '/fonts',
    SERVER: 'app'
 };

gulp.task('babel', () => {
    return gulp.src(SRC.SERVER)
        .pipe(cache.filter())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(cache.cache())
        .pipe(gulp.dest(DEST.SERVER));
});

gulp.task('start', ['babel'], () => {
    return nodemon({
        script: DEST.SERVER + '/main.js',
        watch: DEST.SERVER
    });
});

gulp.task('browser-sync', () => {
    browserSync.init(null, {
        proxy: "http://localhost:3000/html",
        files: ["dist/**/*.*"],
        port: 7000
    })
});

gulp.task('sass', () => {
    return gulp.src(SRC.SASS)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'IE 9'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(SRC.CSS))
        .pipe(gulp.dest(DEST.CSS));
});

gulp.task('js', () => {
    return gulp.src(SRC.JS)
        .pipe(uglify({
            mangle: false,
            compress: false,
            output: { beautify: true },
            preserveComments : 'all'
        }))
        .pipe(gulp.dest(DEST.JS));
});

gulp.task('html', () => {
    return gulp.src(SRC.HTML)
        .pipe(changed(DEST.HTML))
        .pipe(htmlmin({collapseWhitespace: false}))
        .pipe(gulp.dest(DEST.HTML))
});

gulp.task('images', () => {
    return gulp.src(SRC.IMAGES)
        .pipe(changed(DEST.IMAGES))
        .pipe(imagemin())
        .pipe(gulp.dest(DEST.IMAGES));
});

gulp.task('clean', () => {
    return del.sync([DIR.DEST]);
});

gulp.task('copy', () => {
    return gulp.src(SRC.FONTS)
        .pipe(gulp.dest(DEST.FONTS));
});

gulp.task('htmlhint', function() {
    gulp.src(DEST.HTML + '/**/*.html')
        .pipe(htmlhint('.htmlhintrc'));
});

gulp.task('watch', () => {
    let watcher = {
        js: gulp.watch(SRC.JS, ['js']),
        sass: gulp.watch(SRC.SASS, ['sass']),
        html: gulp.watch(SRC.HTML, ['html']),
        images: gulp.watch(SRC.IMAGES, ['images']),
        babel: gulp.watch(SRC.SERVER, ['babel'])
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});

gulp.task('default', ['clean', 'sass', 'js', 'html', 'images', 'copy', 'htmlhint', 'watch', 'start', 'browser-sync'], () => {
    gutil.log('Gulp is running');
});