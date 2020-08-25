const fileinclude = require('gulp-file-include')
const gulp = require('gulp')
const browser = require('browser-sync')
const del = require('del')

// Start a server with LiveReload to preview the site in
function server (done) {
  browser.init({
    server: 'output'
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
    .pipe(gulp.dest('./output'))
    .pipe(
      browser.reload({
        stream: true
      })
    )
})

function clean () {
  return del('output')
}

function cleanFile () {
  return del('./output/email.html', '!./output/', '!./output/index.html')
}

gulp.task('watch', function () {
  gulp
    .watch('src/**/*.html')
    .on('all', gulp.series('include', cleanFile, browser.reload))
})

gulp.task('build', gulp.series(clean, 'include', cleanFile, 'watch'))

gulp.task('default', gulp.parallel('build', server, 'watch'))
