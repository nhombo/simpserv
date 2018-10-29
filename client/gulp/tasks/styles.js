var gulp = require('gulp'),
postcss = require('gulp-postcss'),
 postcssImport = require('postcss-import'),
 simpleVars = require('postcss-simple-vars'),
 nested = require('postcss-nested'),
 autoprefixer = require('autoprefixer'),
 postcssMixins = require('postcss-mixins'),
 postcssHexrgba = require('postcss-hexrgba');

 gulp.task('html', () => {
     console.log('Le fichier html est modifié');
 })

 gulp.task('partStyles', () => {
    return gulp.src('./src/styles/styles.css')
    .pipe(postcss([postcssImport, postcssMixins, simpleVars, nested, postcssHexrgba, autoprefixer]))
    .on('error', (infoErreur) => {
        console.log(infoErreur.toString());
    })
    .pipe(gulp.dest('./src/temp/styles'));
})