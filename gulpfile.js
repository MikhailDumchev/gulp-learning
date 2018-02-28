"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const debug = require("gulp-debug");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

gulp.task("gulp:test", function(callback) {
    console.log("Gulp is working!");
    callback();
});
gulp.task("default", function() {
    return gulp.src("app/**/*{.js,.css}")
            .pipe(gulp.dest("public"));
});
gulp.task("copy", function() {
    return gulp.src(["app/img/**/*","app/fonts/**/*"], {base: "app/"})
            .pipe(gulp.dest("public"));
});
gulp.task("compile:styles", function() {
    return gulp.src("app/scss/**/*.scss", {base: "app/scss/"})
            .pipe(sourcemaps.init())
            .pipe(sass().on("error", sass.logError))
            .pipe(debug({title: "compile:styles"}))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("public/css/"));
});
gulp.task("compile:scripts", function() {
    return gulp.src("app/js/**/*.js")
            .pipe(concat("main.js"))
            .pipe(debug({title: "compile:scripts"}))
            .pipe(gulp.dest("public/js"));
});
gulp.task("clean", function() {
    return del(["public/**/*", "!public"]);
});
gulp.task("build", ["clean", "compile:styles", "compile:scripts", "copy"]);