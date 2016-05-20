var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	plumber = require('gulp-plumber'),
	jshint = require('gulp-jshint'),
	jscs = require('gulp-jscs'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	concat = require('gulp-concat'),
	util = require('gulp-util'),
	beeper = require('beeper'),
	del = require('del'),
	config = require('./gulp.config')(),
	lessWatcher = require('gulp-less-watcher'),
	nodemon = require('gulp-nodemon'),
	jasmine = require('gulp-jasmine-phantom'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	connect = require('connect'),
	serve = require('serve-static'),
	sourcemaps = require('gulp-sourcemaps'),
	$ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;

// Error Helper 
function onError(err) {
	beeper(3); 
	console.log(err);
	// beeper --> http://stackoverflow.com/questions/3127977/how-to-make-the-hardware-beep-sound-in-mac-os-x-10-6
}

// Jshint Task
gulp.task('jshint', function() {
	gulp.src('./js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});

// Uglify Task
gulp.task('compress', function() {
  return gulp
  	.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});

// Concatenate Task
gulp.task('scripts', function() {
  return gulp
  	.src('./lib/**/*.js')
  	.pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename('all.cat.js'))
    .pipe(gulp.dest('./dist/maps'));
});

// Less Task
gulp.task('less', function () {
  return gulp
  	.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

// Watch-less Task
gulp.task('watch-less', function () {
	return gulp
		.src('less/file.less')
		.pipe(watchLess('less/file.less'))
		.pipe(less())
		.pipe(gulp.dest('dist'));
});

// Browserify Task 
gulp.task('browserify', function() {
	return browserify('src/js/app.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('dist'));
});

// Server Task
gulp.task('server', function() {
	return connect().use(serve(__dirname))
		.listen(8080)
		.on('listening', function() {
			console.log('Server Running: View at http://localhost:8080');
		});
});

// BrowserSync Task
gulp.task('browserSync', function(cb) {
	return browserSync({
		server: {
			baseDir: './'
		}
	}, cb);
});

// Watch Task
gulp.task('watch', function() {
	gulp.watch('less/**/*.less', gulp.series('styles', browserSync.reload));
	gulp.watch('src/js/*.js', gulp.series('scripts', browserSync.reload));
	// gulp.watch('src/img/*', gulp.series('images', browserSync.reload));	
});

// Default Task
// gulp.task('default', gulp.parallel('styles', 'scripts', 'images', 'browserSync', 'watch'));

// Vet Task
gulp.task('vet', function() {
	log('Analyzing source with jshint and jscs')
	return gulp
		.src('less/**/*.less')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(jscs())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish', {verbose: true}))
		.pipe(jshint.reporter('fail'))
		.pipe(gulp.dest('./css'));
});

// Styles Task
gulp.task('styles', function() {
	log('Compiling Less --> CSS');

	return gulp
		.src(config.less)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(concat('all.cat.css'))
		.pipe($.less())
		// .on('error', errorLogger)
		.pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
		.pipe(gulp.dest('dist'));
		// .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function(done) {
	var files = config.temp + '**/*.css';
	clean(files, done);
});

gulp.task('less-watcher', function() {
	gulp.watch([config.less], ['styles']);
});

gulp.task('serve-dev', function() {
	var isDev = true;

	var nodeOptions = {
		script: config.nodeServer, 
		delayTime: 1,
		env: {
			'PORT': port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		watch: [config.server]
	};

	return $.nodemon(nodeOptions)
		.on('restart', function() {
			log('*** nodemon restarted');
			log('files changed on restart:\n' + ev);
		})
		.on('start', function() {
			log('*** nodemon started');
		})
		.on('crash', function() {
			log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', function() {
			log('*** nodemon exited cleanly');
		});
});

gulp.task('tests', function() {
	gulp.src('tests/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true,
			vendor: 'js/**/*.js'
		}));
});

// functions

function clean(path, done) {
	log('Cleaning: ' + $.util.colors.red(path));
	del(path, done);
}

function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.red(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}



// delete 

// Error Helper 
// function onError(err) {
// 	beeper(3); 
// 	console.log(err);
// 	// beeper --> http://stackoverflow.com/questions/3127977/how-to-make-the-hardware-beep-sound-in-mac-os-x-10-6
// }

// browserSync.init({
//     server: "./"
// });
// browser Sync.stream();

// functions

// function errorLogger(error) {
// 	log('*** Start of Error ***');
// 	log(error);
// 	log('*** End of Error ***');
// 	this.emit('end');
// }