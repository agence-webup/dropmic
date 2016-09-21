"use strict";

const gulp = require('gulp');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


var reload = browserSync.reload;

/* config
---------------------------------------------------- */

gulp.task('css', function() {
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
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

/**
 * Watch files for changes
 */
gulp.task('watch', function() {
    gulp.watch('src/*.css', ['css']);
    gulp.watch('src/*.js', ['js']);
});


gulp.task('default', ['css', 'js']);
