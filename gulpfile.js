const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const optipng = require("imagemin-optipng");
const svgo = require("imagemin-svgo");
const mozjpeg = require("imagemin-mozjpeg");
const webp = require("gulp-webp");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const del = require("del");
const terser = require("gulp-terser");
const posthtml = require("gulp-posthtml");
const posthtmlIinclude = require("posthtml-include");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({
      basename: "style",
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// JS Compress

const scripts = () => {
  return gulp.src("source/js/script.js")
  .pipe(terser())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}

exports.scripts = scripts;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

// Imagemin

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({quality: 90, progressive: true}),
    imagemin.optipng({optimizationLevel: 7}),
    imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
      })
  ]))
  // .pipe(gulp.dest("dist/images"));
}

exports.images = images;

// createWebp

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
          .pipe(webp({quality: 90}))
          .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

// SvgStore - Spritesheet

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite;

// Copy to /build/

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

// Clean /build/

const clean = () => {
  return del("build");
}

exports.clean = clean;

// posthtml

const html = () => {
  return gulp.src([
    "source/*.html",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.html = html;

// Build

const build = gulp.series(
  clean,
  styles,
  copy,
  scripts,
  html
);

exports.build = build;

// start

exports.default = gulp.series(
  clean, styles, copy, scripts, html, server, watcher
);
