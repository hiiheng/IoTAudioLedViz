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
});

gulp.task("util", () => {
  return gulp.src("src/util/*.js")
    .pipe(babel(CONFIG))
    .pipe(gulp.dest("build/util"));
});

gulp.task("vendor", () => {
  return gulp.src("src/public/vendor/*.js")
    .pipe(gulp.dest("build/public/vendor"));
});

gulp.task("audiofiles", () => {
  return gulp.src("src/public/audio/*.mp3")
    .pipe(gulp.dest("build/public/audio"));
});

gulp.task("default", ["serverJS", "routes", "css", "clientJS", "vendor", "audiofiles", "util"], () => {
  gulp.watch(
    ["src/*.js", "src/routes/*.js", "src/public/css/*.css", "src/public/js/*.js", "src/util/*.js"],
    ["serverJS", "routes", "css", "clientJS", "vendor", "audiofiles", "util"]
  );
});
