var exec = require('child_process').exec;
var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var jade = require('gulp-jade');


gulp.task('build_js', function() {
  gulp.src('app/**/*.ts')
    .pipe(ts({
      noImplicitAny: true,
      out: 'main.js'
    }))
    .js.pipe(gulp.dest('dist'));
});

gulp.task('build_stylesheet', function() {
  exec('sassc ./app/front/stylesheets/stylesheet.sass ./dist/front/stylesheet.css', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('build_html', function() {
  gulp.src("app/index.jade")
    .pipe(jade({
      locals: {}
    }))
    .pipe(gulp.dest("./dist") )
});

gulp.task('build', ['build_js', 'build_stylesheet', 'build_html'], function(){});

gulp.task('watch', function() {
  return gulp.watch('app/**/*', ['build']);
});

gulp.task('default');
