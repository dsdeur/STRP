// Includes
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
stringify = require('stringify');


// Set the paths
var paths = {
    styles: {
        src: './src/css/*.css',
        watch: './src/css/**/*.css',
        dest: './build/css'
    },
    scripts: {
        src: './src/js/**/*.{js,jsx,vs,fs}',
        dest: './build/js'
    },
    images: {
        src: './src/img/*',
        dest: './build/img'
    },
    html: {
        src: './src/*.html',
        dest: './build/'
    },
    audio: {
        src: './src/sound/*.mp3',
        dest: './build/sound'
    }
};

// Process images
gulp.task('images', function() {
    return gulp.src(paths.images.src)
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(paths.images.dest));
});

// Process html files
gulp.task('html', function() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest));
});

// Process html files
gulp.task('audio', function() {
    return gulp.src(paths.audio.src)
        .pipe(gulp.dest(paths.audio.dest));
});

// Build the javascript
// Browserify
gulp.task('build-js', function() {
    var stream = browserify({
            debug: true,
            entries: './src/js/app.js',
        })
        .transform(stringify(['.fs', '.vs']))
        .bundle()
        .on('error', function(err) {
            gutil.log(err);
            stream.end();
            this.emit('end');
        });

    return stream
        .pipe(source('app.js'))
        .pipe(gulp.dest(paths.scripts.dest));
});

// Starts development local server
gulp.task('serve', function() {
    // Start server
    browserSync.init(
        // Reload on build change
        ['build/css/**/*.css', 'build/js/**/*.js', 'build/*.html'], {
        server: {
            baseDir: './build'
        },
        notify: false,
        open: true,
        port: 8520
    });
});

gulp.task('css', function(){
    return gulp.src(paths.styles.src)
        .pipe(gulp.dest(paths.styles.dest));
})

// Watches files for changes
gulp.task('watcher', function() {
    // Watch files
    gulp.watch(paths.scripts.src, ['build-js']);
    gulp.watch(paths.images.src, ['images']);
    gulp.watch(paths.html.src, ['html']);
    gulp.watch(paths.styles.src, ['css']);
});

// Create tasks
gulp.task('build', ['css', 'build-js', 'images', 'html', 'audio']);
gulp.task('default', ['serve', 'watch']);
gulp.task('watch', ['build', 'watcher']);
