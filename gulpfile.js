const fileinclude = require('gulp-file-include')
const gulp = require('gulp')
const browser = require('browser-sync')
const del = require('del')

// Start a server with LiveReload to preview the site in
function server (done) {
  browser.init({
    server: './'
  })
  done()
}

gulp.task('include', function () {
  return gulp
    .src(['src/index.html', 'src/email.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest('./'))
    .pipe(
      browser.reload({
        stream: true
      })
    )
})

function clean () {
  return del('./*.html')
}

function cleanFile () {
  return del('./email.html')
}

gulp.task('watch', function () {
  gulp
    .watch('src/email.html')
    .on('all', gulp.series('include', cleanFile, browser.reload))
})

gulp.task('build', gulp.series(clean, 'include', cleanFile, 'watch'))

gulp.task('default', gulp.parallel('build', server, 'watch'))
