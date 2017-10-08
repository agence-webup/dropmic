"use strict";

import gulp from 'gulp';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';


const reload = browserSync.reload;

const paths = {
    css: {
        src: 'src/*.css',
        dest: './dist/',
        watch: 'src/*.css'
    },
    js: {
        src: 'src/dropmic.js',
        dest: './dist/',
        watch: 'src/*.js'
    }
};

/* config
---------------------------------------------------- */

gulp.task('css', () => {
    return gulp.src(paths.css.src)
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 3 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.css.dest))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('js', () => {
    return browserify({
            entries: [paths.js.src],
            standalone: 'Dropmic'
        })
        .transform('babelify', {
            presets: ['env'],
            global: true,
            ignore: /node_modules/
        })
        .bundle()
        .pipe(source('dropmic.js'))
        .pipe(gulp.dest(paths.js.dest));
});

/**
 * Watch files for changes
 */
gulp.task('watch', () => {
    gulp.watch(paths.css.watch, ['css']);
    gulp.watch(paths.js.watch, ['js']);
});


gulp.task('default', ['css', 'js']);
