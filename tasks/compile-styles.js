const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const cleanCSS = require("gulp-clean-css");
//Компилирует и минимизирует sass-стили;
module.exports = (parameters) => {
    return () => {
        return gulp.src(parameters.src, parameters.options)
                .pipe($.sourcemaps.init())
                .pipe($.sass().on("error", $.sass.logError))
                .pipe($.debug({title: "Компиляция sass-файлов;"}))
                .pipe($.sourcemaps.write("."))
                .pipe(cleanCSS())
                .pipe($.debug({title: "Минимизация стилей;"}))
                .pipe(gulp.dest(parameters.destination));
    };
};