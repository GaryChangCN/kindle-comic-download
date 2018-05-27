const kit = require('nokit')

module.exports = (task, option) => {
    task('default', ['dev'], 'default task', () => {
        kit.log('\n>>>>>>> start >>>>>>>\n')
    })

    task('dev', ['check-dev', 'tsc-w'], 'start app service', (opt) => {
        kit.spawn('./node_modules/.bin/noe', [
            '-w',
            'src/*.js',
            'src/index.js',
        ], {
            prefix: 'APP | :green'
        })
    })

    task('tsc-w', 'watch typescript', (opt) => {
        const args = [
            '-w',
            'src/index.ts',
            '--lib',
            'esnext,dom',
        
        ]
        kit.spawn('./node_modules/.bin/tsc', args, {
            prefix: 'TSC | :blue'
        })
    })

    task('check-dev', kit.async(function * () {
        let ret = yield kit.exec('git rev-parse --abbrev-ref HEAD')
        if (ret.stdout === 'master\n') {
            throw new Error(kit.log('git should be on dev branch'))
            process.exit()
        }
    }))

}