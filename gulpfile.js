var gulp = require('gulp');

//clean files
var clean = require('gulp-clean');

//less
var less = require('gulp-less');
var path = require('path');

//js
var uglify = require('gulp-uglify');
var pump = require('pump');

//minify css
var cleanCSS = require('gulp-clean-css');

//uglify js
gulp.task('compressJs', function(cb){
  pump([
    gulp.src('assets/src/js/*.js'),
    uglify(),
    gulp.dest('assets/dist/js')
  ]),
  cb
});

//less task
gulp.task('less', function(){
  return gulp.src('assets/src/css/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('assets/src/css/css'));
});

//clean css files task
gulp.task('cleanFiles', function(){
  return gulp.src('assets/dist/css/*', {read: false, force: true})
  .pipe(clean());
});

//minify css task
gulp.task('minify-css', ['less', 'cleanFiles'], function(){
  return gulp.src('assets/src/css/css/*.css')
  //.pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
  }))
  .pipe(gulp.dest('assets/dist/css'))
});



gulp.task('default', ['compressJs', 'minify-css']);
