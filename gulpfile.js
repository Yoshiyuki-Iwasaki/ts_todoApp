const gulp = require("gulp");
pug = require("gulp-pug");
sass = require("gulp-sass");
typescript = require("gulp-typescript");
browserSync = require("browser-sync");

const paths = {
  src: "src",
  dist: "dist",
};

// サーバー起動
gulp.task("browser-sync", done => {
  browserSync({
    port: 3000,
    server: {
      baseDir: "./dist",
      index: "index.html",
    },
    startPath: "",
    reloadOnRestart: true,
  });
  done();
});

gulp.task("html", () => {
  // .pugファイルを取得
  // return gulp.watch('./src/**/*.pug', function(){
  // gulp.src('取得するファイル') タスクの対象となるファイルを取得
  return (
    gulp
      .src(["./src/**/*.pug", "!./src/**/_*.pug"])
      // pipe() 1つ一つの処理をつなげる。
      .pipe(
        pug({
          pretty: true,
        })
      )
      // gulp.dest('保存先フォルダー') 処理を行ったファイルを指定の場所に保存
      .pipe(gulp.dest("./dist"))
  );
  // })
});
// style.scssをタスクを作成する
gulp.task("css", function () {
  // return gulp.watch('./src/sass/*.scss', function(){
  // style.scssファイルを取得
  return (
    gulp
      .src("./src/sass/*.scss")
      // Sassのコンパイルを実行
      .pipe(sass())
      // cssフォルダー以下に保存
      .pipe(gulp.dest("./dist/css"))
  );
  // })
});

gulp.task("js", function () {
  // return gulp.watch('./src/ts/*.ts', function(){
  return gulp
    .src("./src/ts/*.ts")
    .pipe(typescript({ target: "ES6" }))
    .pipe(gulp.dest("./dist/js"));
  // })
});

//Watch
gulp.task("watch", function (done) {
  const reload = () => {
    browserSync.reload(); //リロード
    done();
  };
  gulp.watch(paths.src + "/**.pug").on("change", gulp.series("html", reload));
  gulp
    .watch(paths.src + "/sass/**.scss")
    .on("change", gulp.series("css", reload));
  gulp.watch(paths.src + "/ts/**.ts").on("change", gulp.series("js", reload));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("html", "css", "js", "watch", "browser-sync"))
);
