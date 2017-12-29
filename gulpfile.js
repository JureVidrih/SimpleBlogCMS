let gulp = require('gulp');
let watch = require('gulp-watch');

let browserSync = require('browser-sync');

let postcss = require('gulp-postcss');
let postcssImport = require('postcss-import');
let postcssNested = require('postcss-nested');
let postcssVars = require('postcss-simple-vars');

browserSync.init({
    notify: true,
    server: {
        baseDir: "."
    }
});

gulp.task("watch", function() {
    watch(["*.html", "*.css", "*.js", "!gulpfile.js"], function() {
        gulp.start("build");
    });
});

gulp.task("cssinject", ["styles"], function() {
    return gulp.src("./build/style.css").pipe(browserSync.stream());
});

gulp.task("build", function() {
    gulp.start("cssinject");
});

gulp.task("styles", function() {
    return gulp.src("style.css")
        .pipe(postcss([postcssImport, postcssNested, postcssVars]))
        .on('error', function(err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest("./build/"));
});