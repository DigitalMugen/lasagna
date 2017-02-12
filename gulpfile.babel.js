/**
 * Gulpfile for Lasagna app
 */
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

const paths = {
  allScrJs: 'src/**/*.js?(x)',
  clientSrcJs: 'src/client/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  clientBundle: 'public/lasagna.bundle.js?(.map)',
  destDir: 'public',
};

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));

gulp.task('lint', () =>
  gulp.src([
    paths.allScrJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()),
);

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.allScrJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir)),
);

gulp.task('main', ['lint', 'clean'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.destDir)),
);

gulp.task('watch', () => {
  gulp.watch(paths.allScrJs, ['main']);
});

gulp.task('default', ['watch', 'main']);
