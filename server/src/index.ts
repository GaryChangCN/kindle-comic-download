import * as Koa from 'koa'
import * as kit from 'nokit'
import config from './config'
import middlewares from './middlewares'

const app = new Koa()

async function main () {

    // 挂载中间件
    middlewares(app)

    app.listen(config.port, () => {
        kit.log('[ Service listen on ] -> ' + config.port)
    })
}

process.on('unhandledRejection', err => {
    console.error('unhandledRejection -> ', err)
})

main()
