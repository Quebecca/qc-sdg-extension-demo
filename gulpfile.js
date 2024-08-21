const
    gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),

// en théorie, il faut ici reprendre les mêmes options que celles de la trousse de dev SDG
// mais ici, on se focalise seulement sur le chemin d'incusion…
    scssOptions = {
        includePaths: [
            // … le premier chemin d'inclusion étant celui de ce projet d'extension
            // le compilateur sass se basera sur les fichiers dans src/scss
            // en priorité. cf ./scr/scss/settings/_settings.scss
            'src/scss',
            // ici les chemins pour une installation dans un projet node.js
            'node_modules/',
            'node_modules/qc-trousse-sdg/src/sdg/scss',
            // pour une installation comme dépendances dans un projet php avec composer
            // ce serait alors les chemins suivants :
            // 'vendor/qc/',
            // 'vendor/qc/qc-trousse-sdg/src/sdg/scss',
        ]
    };

exports.watch = gulp.parallel(
    () => gulp.watch(
        './src/scss/**/*.scss'
        , () =>  gulp
                .src('./src/scss/**/*.scss')
                .pipe(
                    sass(scssOptions)
                        .on('error', sass.logError)
                )
                .pipe( gulp.dest('./dist/css'))
    ))
