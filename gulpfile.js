const gulp = require('gulp')
const babel = require('gulp-babel')
const cache = require('gulp-cached')
const remember = require('gulp-remember')

const SCRIPTS_GLOB = 'design-patterns/**/*.js'

gulp.task('build', () => {
  gulp.src(SCRIPTS_GLOB)
    .pipe(cache('scripts'))
    .pipe(babel())
    .pipe(remember('scripts'))
    .pipe(gulp.dest('./bundle'))
})

gulp.task('watch', () => {
  const watcher = gulp.watch(SCRIPTS_GLOB, ['build'])
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      delete cache.caches['scripts'][event.path]
      remember.forget('scripts', event.path)
    }
  })
})

gulp.task('default', ['build', 'watch'])
