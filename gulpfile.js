"use strict";

// Plugins
const { src, dest, watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync");
const clean = require("gulp-clean");
const plumber = require("gulp-plumber");
const htmlmin = require("gulp-htmlmin");
const cleancss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");
const inject = require("gulp-inject");

// distribution folder file names
var cssFile = "stlye.css";
var jsFile = "scripts.js";

// browsersync
function sync() {
  var files = ["/*html", "./css/*.css", "./js/*.js", "./images/*.{png, svg}"];
  browserSync.init(files, {
    server: {
      baseDir: "./",
    },
  });
}

// del/clean dist folder
function del() {
  return src("./dist/*", { read: false }).pipe(clean());
}

//css
function css() {
  return src([
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
    "./css/*.css",
  ])
    .pipe(plumber())
    .pipe(concat(cssFile))
    .pipe(cleancss())
    .pipe(dest("./dist/css"));
}

// js
function js() {
  return src([
    "./node_modules/jquery/dist/jquery.slim.min.js",
    "./node_modules/popper.js/dist/umd/popper.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./js/*.js",
  ])
    .pipe(plumber())
    .pipe(concat(jsFile))
    .pipe(uglify())
    .pipe(dest("./dist/js"));
}

// html
function html() {
  var target = src("./*html");
  var sources = src(["./dist/js/*.js", "./dist/css/*.css"], { read: false });
  var transform = function (filepath) {
    if (filepath.slice(-3) === ".js") {
      return '<script src= "' + filepath + '" defer></script>';
    }
    return inject.transform.apply(inject.transform, arguments);
  };
  return target
    .pipe(plumber())
    .pipe(inject(sources, { transform: transform }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./dist"));
}

// images
function imgMin() {
  return src("./images**/*")
    .pipe(imagemin([imagemin.optipng({ optimizationLevel: 3 })]))
    .pipe(dest("./dist"));
}

exports.default = sync;
exports.build = series(del, parallel(css, js, imgMin), html);
