const { src, dest, task, series, watch, parallel } = require('gulp')
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;
sass.compiler = require('node-sass');


task('clean', () => {
    return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm())
})

task('copy:html', () => {
    return src(`${SRC_PATH}/*.html`).pipe(dest(DIST_PATH)).pipe(reload({ stream: true }));
});

task('styles', () => {
    return src([...STYLES_LIBS, "src/styles/main.scss"])
        .pipe(gulpif(env == 'dev', sourcemaps.init()))
        .pipe(concat('main.min.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))

        .pipe(gulpif(env == 'dev',
            autoprefixer({
                cascade: false
            }))

        )
        .pipe(gulpif(env == 'prod', gcmq()))
        .pipe(gulpif(env == 'prod', cleanCSS()))
        .pipe(gulpif(env == 'dev', sourcemaps.write()))
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
});

task('scripts', () => {
    return src([...JS_LIBS, "src/scripts/*.js"])
        .pipe(gulpif(env == 'dev', sourcemaps.init()))
        .pipe(concat('main.min.js', { newLine: ";" }))
        .pipe(gulpif(env == 'dev', babel({ presets: ['@babel/env'] })))
        .pipe(gulpif(env == 'prod', uglify()))
        .pipe(sourcemaps.write())
        .pipe(dest(DIST_PATH))
        .pipe(reload({ stream: true }));
})

task('img', () =>{
    return src(`${SRC_PATH}/img/*.png`).pipe(dest(`${DIST_PATH}/img`))
})

task('mp', () =>{
    return src(`${SRC_PATH}/mp4/*.mp4`).pipe(dest(`${DIST_PATH}/mp4`))
})

task('svg', () =>{
    return src(`${SRC_PATH}/svg/*.svg`).pipe(dest(`${DIST_PATH}/svg`))
})

task('server', () => {
    browserSync.init({
        server: {
            baseDir: "./${DIST_PATH}"
        },
        open: false
    });
});

task('watch', () => {
    watch('./src/styles/**/*.scss', series('styles'));
    watch('src/*.html', series('copy:html'));
    watch('src/scripts/*.js', series('scripts'));
    watch('src/img', series('img'));
})



task('default', series('clean', parallel('copy:html', 'styles', 'scripts', 'img', 'mp', 'svg'),parallel('watch', 'server')))

task('build', series('clean', parallel('copy:html', 'styles', 'scripts', 'img',  'mp', 'svg')))
