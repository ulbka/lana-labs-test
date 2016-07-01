var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
    var files = [
        'dist/*.html',
        'dist/*.css',
        'dist/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: './dist'
        },
        browser: "google chrome"
    });
});
gulp.task('bower', function(){
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('dist'))
});
gulp.task('js', function () {
    gulp.src('*.js')
        .pipe(gulp.dest('dist'))
});
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(gulp.dest('dist'))
});
gulp.task('css', function () {
    gulp.src('*.css')
        .pipe(gulp.dest('dist'))
});
gulp.task('watch', function () {
    gulp.watch("style.css", ['css']);
    gulp.watch("index.html", ['html']);
    gulp.watch("script.js", ['js']);
});
gulp.task('default', ['browser-sync', 'bower', 'html', 'js', 'css', 'watch']);