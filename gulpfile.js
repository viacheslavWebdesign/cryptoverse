// Импортируем модули
import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import browserSync from "browser-sync";

const sass = gulpSass(dartSass);

const paths = {
  html: "app/**/*.html",
  scss: "app/assets/css/**/*.scss",
  js: "app/assets/js/**/*.js",
  cssOutput: "app/assets/css",
};

const server = browserSync.create();

const reload = (done) => {
  server.reload();
  done();
};

const serve = (done) => {
  server.init({
    server: {
      baseDir: "app",
    },
    notify: false,
    open: true,
  });
  done();
};

const styles = () => {
  return gulp
    .src(["app/assets/css/assistant.scss", "app/assets/css/style.scss"])
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions", "> 0.2%", "IE 11"],
        cascade: false,
      })
    )
    .pipe(gulp.dest(paths.cssOutput))
    .pipe(server.stream());
};

const watchFiles = () => {
  gulp.watch(paths.scss, styles);
  gulp.watch([paths.html, paths.js], reload);
};

const dev = gulp.series(styles, serve, watchFiles);
export default dev;
