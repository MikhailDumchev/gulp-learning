const gulp = require("gulp");
const browserSync = require("browser-sync").create();
//Перезагрузка браузеров при внесении изменений;
module.exports = (parameters) => {
    return () => {
        browserSync.init({
            "server": parameters.destination
        });
        browserSync.watch(`${parameters.destination}/**/*`).on("change", browserSync.reload);
    };
};