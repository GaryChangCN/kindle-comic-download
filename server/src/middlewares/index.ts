import router from './router'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'

const mount = (app: Koa) => {
    app.use(bodyParser())
    app.use(router.routes())
}

export default mount
