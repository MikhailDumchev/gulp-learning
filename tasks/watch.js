"use strict";
const gulp = require("gulp");
const del = require("del");
const $ = require("gulp-load-plugins")();
module.exports = (parameters) => {
    return () => {
        let watcher = gulp.watch(parameters.src, parameters.tasks);
            watcher.on("change", (event) => {
            if (event.type === "deleted") {
                let relativePath = $.path.relative($.path.resolve("app"), event.path);
                let targetPath = $.path.resolve("public", relativePath);
                del.sync(targetPath);
            }
        });
    };
};