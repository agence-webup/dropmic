"use strict";

import gulp from 'gulp';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';


const reload = browserSync.reload;

/* config
---------------------------------------------------- */

gulp.task('css', () => {
    return gulp.src('src/*.css')
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 3 versions'],
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }));
});


gulp.task('js', () => {
    return browserify({
            entries: ['./src/dropmic.js'],
            standalone: 'Dropmic'
        })
        .transform('babelify', {
            presets: ['es2015'],
            global: true,
            ignore: /node_modules/
        })
        .bundle()
        .pipe(source('dropmic.js'))
        .pipe(gulp.dest('./dist'));
});

/**
 * Watch files for changes
 */
gulp.task('watch', () => {
    gulp.watch('src/*.css', ['css']);
    gulp.watch('src/*.js', ['js']);
});


gulp.task('default', ['css', 'js']);
