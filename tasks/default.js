const gulp = require("gulp");
module.exports = () => {
    return (callback) => {
        console.log("Gulp is working!");
        console.log("Current directory: " + __dirname);
        callback();
    };
};
//let p = path.relative(path.resolve("app"), "/Users/PROVODNIK/Documents/projects/gulp-learning/app/img/arrow_1.png");
//console.log(path.resolve("public", p));