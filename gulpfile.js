"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const copy = require('gulp-copy');
const gls = require('gulp-live-server');
const path = require('path');
const fs = require('fs-extra');

const CATEGORIES_DIR = path.join(__dirname, 'categories');
const CATEGORIES_JSON = path.join(__dirname, 'categories.json');
const REDIRECTS_FILE = path.join(__dirname, '_redirects');

const copyFiles = [
    'robots.txt',
    'humans.txt',
    'index.html',
    'categories/*',
    'categories.json',
    '_redirects',
    'assets/*'
];


gulp.task('categories', function(done) {
    let categories = fs.readdirSync(CATEGORIES_DIR);
    console.log(`Found ${categories.length} categories`);
    categories = categories.map(category => path.basename(category, '.json'));
    console.log('Writing categories.json...');
    fs.outputJSONSync(CATEGORIES_JSON, categories);

    let redirects = categories.map(category => `/${category} /index.html 200`);
    console.log('Writing _redirects file...');
    fs.outputFileSync(REDIRECTS_FILE, redirects.join("\n"));
    
    done();
});

gulp.task('js', function() {
    return gulp.src(['./src/vendor/*.js', './src/*.js'])
        .pipe(concat('app.js'))
        .pipe(babel({
            compact: false,
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('copy', function() {
    return gulp.src(copyFiles)
        .pipe(copy('./dist'));
});

gulp.task('server', ['build'], function() {
    let server = gls.static('dist', 8888);
    server.start();
    
    gulp.watch('./(assets|src)/**/*.(js|css)', function(file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('watch', ['build'], function() {
    gulp.watch('./src/*.js', ['js']);
    gulp.watch('./categories/*.json', ['categories']);
});

// build task
gulp.task('build', ['categories', 'js', 'copy']);

// serve task
gulp.task('serve', ['build', 'server', 'watch']);

gulp.task('default', ['build']);
