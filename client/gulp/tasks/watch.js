var gulp = require('gulp'),
 watch = require('gulp-watch');

gulp.task('watch', () => {
    watch('./src/App.js', () => {
        gulp.start('html');
    })
    watch('./src/styles/**/*.css', () => {
        gulp.start('partStyles');
    })
})

