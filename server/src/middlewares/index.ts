import router from './router'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import cors from './cors'

const mount = (app: Koa) => {
    app.use(bodyParser())
    app.use(cors)
    app.use(router.routes())
}

export default mount
