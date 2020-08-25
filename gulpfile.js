const include = require('gulp-file-include')
const gulp = require('gulp')
const browserSync = require('browser-sync')

gulp.task('watch', function () {
  //Следим за изменениями в файлах и директориях и запускаем задачи, если эти изменения произошли
  gulp.watch('src/**/*.html', gulp.parallel('html'))
})

gulp.task('html', function () {
  //собираем html из кусочков
  return gulp
    .src(['src/index.html', 'src/email.html'])
    .pipe(
      include({
        //импортируем файлы с префиксом @@. ПРефикс можно настроить под себя.
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest('output/'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    )
})

gulp.task('fileinclude', function () {
  return gulp
    .src(['index.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest('./output'))
})

gulp.task('default', gulp.parallel('watch'))
