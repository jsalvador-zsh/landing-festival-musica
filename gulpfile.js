const { src, dest, watch, parallel, series } = require("gulp");

// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// Javascript
const terser = require("gulp-terser-js");

// HTML
const htmlmin = require("gulp-htmlmin");

// Imagenes
const cache = require("gulp-cache");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const imagemin = require("gulp-imagemin");

// Función para procesar CSS
function css(done) {
    src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css"));

    done();
}

// Función para procesar imágenes
function imagenes(done) {
    const options = {
        optimizationLevel: 4,
    };
    src("src/img/**/*.{png,jpg,svg}")
        .pipe(cache(imagemin(options)))
        .pipe(dest("build/img"));
    done();
}

// Función para procesar videos
function videos(done) {
    src("src/video/**/*.{mp4,ogg,webm}")  // Selecciona todos los videos en los formatos indicados
        .pipe(dest("build/video"));  // Copia los videos a la carpeta build/video
    done();
}

// Función para convertir imágenes a WebP
function versionWebp(done) {
    const option = { quality: 50 };
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(option))
        .pipe(dest("build/img"));
    done();
}

// Función para convertir imágenes a AVIF
function versionAvif(done) {
    const option = { quality: 50 };
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(option))
        .pipe(dest("build/img"));
    done();
}

// Función para procesar Javascript
function javascript(done) {
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/js"));
    done();
}

// Función para minificar HTML
function html(done) {
    src("src/index.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("build"));
    done();
}

// Función para copiar el icono SVG
function svg(done) {
    src("src/icon.svg")
        .pipe(dest("build/img"));
    done();
}

// Función para limpiar el cache
function clearCache(done) {
    return cache.clearAll(done);
}

// Función para observar cambios durante el desarrollo
function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    watch("src/index.html", html);
    watch("src/icon.svg", svg);
    done();
}

// Tarea para construir todo
exports.build = series(
    clearCache, 
    parallel(css, javascript, html, svg, imagenes, versionWebp, versionAvif, videos)
);

// Tarea por defecto para desarrollo
exports.dev = parallel(dev);

// Tarea por defecto (completa)
exports.default = exports.build;
