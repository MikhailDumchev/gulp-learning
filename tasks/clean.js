const gulp = require("gulp");
const del = require("del");
//Очистка целевой директории (без её удаления);
module.exports = (parameters) => {
    return () => {
        return del([`${parameters.src}/**/*`, `!${parameters.src}`]);
    };
};