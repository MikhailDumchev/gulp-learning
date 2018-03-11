"use strict";
const gulp = require("gulp");
const path = require("path");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const debug = require("gulp-debug");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

const destination = "public";
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

gulp.task("gulp:test", function(callback) {
    console.log("Gulp is working!");
    //let p = path.relative(path.resolve("app"), "/Users/PROVODNIK/Documents/projects/gulp-learning/app/img/arrow_1.png");
    //console.log(path.resolve("public", p));
    console.log("Current directory: " + __dirname);
    callback();
});
gulp.task("default", function() {
    return gulp.src("app/**/*{.js,.css}")
            .pipe(gulp.dest("public"));
});
gulp.task("copy", function() {
    return gulp.src(["app/fonts/**/*","app/**/*.html"], {base: "app/"})
            .pipe(gulp.dest(destination));
});
gulp.task("compile:styles", function() {
    return gulp.src("app/scss/**/*.scss", {base: "app/scss/"})
            .pipe(sourcemaps.init())
            .pipe(sass().on("error", function() {
                sass.logError;
                notify.onError(function(error) {
                    return {
                        title: "SASS",
                        message: error.message,
                        icon: path.join(__dirname, "icon.png")
                    };
                });
            }))
            .pipe(debug({title: "compile:styles"}))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("public/css/"));
});
gulp.task("compile:scripts", function() {
    return gulp.src("app/js/**/*.js")
            .pipe(uglify())
            .pipe(debug({title: "Минимизация файлов;"}))
            .pipe(concat("main.js"))
            .pipe(debug({title: "Конкатенация файлов;"}))
            .pipe(gulp.dest("public/js"));
});
gulp.task("minimization:images", function() {
    gulp.src("app/img/**/*", {base: "app"})
            .pipe(imagemin())
            .pipe(gulp.dest(destination));
});
//Очистка целевой директории (без её удаления);
gulp.task("clean", function() {
    return del([destination + "/**/*", "!" + destination]);
});
gulp.task("build", ["clean", "compile:styles", "compile:scripts", "copy", "minimization:images"]);
gulp.task("build:watch", ["build", "watch"]);

gulp.task("watch", function() {
    gulp.watch("app/scss/**/*.scss", ["compile:styles"]);
    let watcher = gulp.watch(["app/img/**/*", "app/fonts/**/*"], ["copy"]);
    watcher.on("change", function(event) {
        if (event.type === "deleted") {
            let relativePath = path.relative(path.resolve("app"), event.path);
            let targetPath = path.resolve("public", relativePath);
            del.sync(targetPath);
        }
    });
});