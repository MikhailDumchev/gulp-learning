const gulp = require("gulp");
//Копирование файлов без обработки;
module.exports = (parameters) => {
    return () => {
        return gulp.src(parameters.src, parameters.options)
            .pipe(gulp.dest(parameters.destination));
    };
};