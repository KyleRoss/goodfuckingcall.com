"use strict";
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const copy = require('gulp-copy');
const gls = require('gulp-live-server');
const iife = require('gulp-iife');
const moment = require('moment');
const sm = require('sitemap');
const path = require('path');
const fs = require('fs-extra');

const CATEGORIES_DIR = path.join(__dirname, 'categories');
const CATEGORIES_JSON = path.join(__dirname, 'categories.json');
const ALL_JSON = path.join(CATEGORIES_DIR, 'all.json');
const BYCAT_JSON = path.join(__dirname, 'byCategory.json');
const REDIRECTS_FILE = path.join(__dirname, '_redirects');
const SITEMAP = path.join(__dirname, 'sitemap.xml');

const copyFiles = [
    'robots.txt',
    'humans.txt',
    'index.html',
    '404.html',
    'categories/*',
    'categories.json',
    'sitemap.xml',
    '_redirects',
    'assets/*'
];

let categories = fs.readdirSync(CATEGORIES_DIR);
let cats = ['all'],
    byCat = {},
    all = [];

categories.forEach(cat => {
    if(cat === 'README.md' || cat === 'all.json') return;
    let catName = path.basename(cat, '.json');
    cats.push(catName);
    
    let content = fs.readJSONSync(path.join(CATEGORIES_DIR, cat));
    all = all.concat(content);
    byCat[catName] = content;
});

gulp.task('categories', function(done) {
    console.log('Writing categories.json...');
    fs.outputJSONSync(CATEGORIES_JSON, cats);
    
    console.log('Writing all.json...');
    fs.outputJSONSync(ALL_JSON, all);
    
    console.log('Writing byCategory.json...');
    fs.outputJSONSync(BYCAT_JSON, byCat);

    let redirects = cats.map(category => `/${category} /index.html 200`);
    console.log('Writing _redirects file...');
    fs.outputFileSync(REDIRECTS_FILE, redirects.join("\n"));
    
    done();
});

gulp.task('sitemap', function(done) {
    let lastmod = moment().format('YYYY-MM-DD');
    let urls = [
        { url: '/', changefreq: 'daily', priority: 0.7, lastmod }
    ];
    
    cats.forEach(cat => {
        if(cat === 'all') return;
        urls.push({
            url: `/${cat}`,
            changefreq: 'daily',
            priority: 0.5,
            lastmod
        });
    });
    
    let sitemap = sm.createSitemap ({
        hostname: 'https://goodfuckingcall.com',
        cacheTime: 600000,
        urls: urls
    });
    
    fs.outputFileSync(SITEMAP, sitemap.toString());
    done();
});

gulp.task('js', function() {
    return gulp.src(['./src/vendor/*.js', './src/components/*.js', './src/*.js'])
        .pipe(concat('app.js'))
        .pipe(iife({
            params: ['window', 'Vue']
        }))
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

gulp.task('favicon', function() {
    return gulp.src('./favicon/*')
        .pipe(copy('./dist', { prefix: 1 }));
});

gulp.task('server', ['build'], function() {
    let server = gls.static('dist', 8888);
    server.start();
    
    gulp.watch('./(assets|src)/**/*.(js|css)', function(file) {
        server.notify.apply(server, [file]);
    });
    
    gulp.watch(copyFiles, function(file) {
        server.notify.apply(server, [file]);
    });
});

gulp.task('watch', ['build'], function() {
    gulp.watch('./src/**/*.js', ['js']);
    gulp.watch('./categories/*.json', ['categories']);
    gulp.watch(copyFiles, ['copy']);
});

// build task
gulp.task('build', ['categories', 'sitemap', 'js', 'copy', 'favicon']);

// serve task
gulp.task('serve', ['build', 'server', 'watch']);

gulp.task('default', ['build']);
