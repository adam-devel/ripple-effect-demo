const { watch, src, dest } = require("gulp");
const sass = require("gulp-dart-sass");

const watchGlob = "./style/src/**/*.scss";
const srcFile = "./style/src/index.scss";
const destFile = "./style/dist/final.css";

module.exports = {
  "sass:watch": watchSass,
  "sass:compile": compileSass,
  default: watchSass,
};

function watchSass() {
  watch(watchGlob, compileSass);
}
function compileSass() {
  return src(srcFile)
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(dest(destFile));
}
