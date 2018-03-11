"use strict";
const gulp = require("gulp");

const destination = "public";
const staticResources = ["app/fonts/**/*","app/css/**/*.css"];
const styles = "app/scss/**/*.scss";
const scripts = "app/js/**/*.js";
const pages = "app/**/*.html";
const images = "app/img/**/*";

function lazyRequireTask(title, path, parameters, dependencies) {
    parameters = parameters || new Object();
    dependencies = dependencies || new Array();
    if (title && path) {
        gulp.task(title, dependencies, (callback) => {
            let task = require(path).call(this, parameters);
            return task(callback);
        });
    } else console.error("Не переданы все необходимые параметры;");
}
lazyRequireTask("default", "./tasks/default");
lazyRequireTask("copy", "./tasks/copy", {"src": staticResources, destination, "options": {"base": "app"}}, ["clean"]);
lazyRequireTask("compile:styles", "./tasks/compile-styles", {"src": styles, "destination": `${destination}/css`}, ["clean"]);
lazyRequireTask("compile:scripts", "./tasks/compile-scripts", {"src": scripts, "destination": `${destination}/js`}, ["clean"]);
lazyRequireTask("minimize:images", "./tasks/minimize-images", {"src": images, "destination": `${destination}/img`}, ["clean"]);
lazyRequireTask("minimize:html", "./tasks/minimize-html", {"src": pages, destination}, ["clean"]);
lazyRequireTask("clean", "./tasks/clean", {"src": destination});
lazyRequireTask("watch", "./tasks/watch", {"src": "app/**/*", "tasks": ["copy", "compile:styles", "compile:scripts", "minimize:html"]});
lazyRequireTask("reload", "./tasks/reload", {destination}, ["build"]);

gulp.task("build:watch", ["build", "watch"]);
gulp.task("build", ["minimize:html", "compile:styles", "compile:scripts", "minimize:images", "copy"]);