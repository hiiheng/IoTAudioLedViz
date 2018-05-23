const gulp = require("gulp"),
      babel = require("gulp-babel");

const CONFIG = {
  presets: ["es2015"]
};

gulp.task("serverJS", () => {
  return gulp.src("src/*.js")
      .pipe(babel(CONFIG))
      .pipe(gulp.dest("build"));
});

gulp.task("routes", () => {
  return gulp.src("src/routes/*.js")
      .pipe(babel(CONFIG))
      .pipe(gulp.dest("build/routes"));
});

gulp.task("css", () => {
  return gulp.src("src/public/css/*.css")
      .pipe(gulp.dest("build/public/css"));
});

gulp.task("clientJS", () => {
  return gulp.src("src/public/js/*.js")
      .pipe(babel(CONFIG))
      .pipe(gulp.dest("build/public/js"));
})

gulp.task("default", ["serverJS", "routes", "css", "clientJS"], () => {
  gulp.watch(
    ["src/*.js", "src/routes/*.js", "src/public/css/*.css", "src/public/js/*.js"],
    ["serverJS", "routes", "css", "clientJS"]
  );
});
