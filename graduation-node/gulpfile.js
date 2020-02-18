const browserSync = require('browser-sync').create()
const nodemon = require('gulp-nodemon')
const reload = browserSync.reload


const nodemonConfig = {
    script: './bin/www',
    env: { 'NODE_ENV': 'development' },
}

function defaultTask() {
    nodemon(nodemonConfig)
        .on('start', () =>
            browserSync.init({
                proxy: 'http://localhost:3000',
                port: 3001
            }, () => reload())
        )
}


exports.default = defaultTask
