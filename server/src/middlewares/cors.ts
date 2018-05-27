import * as Koa from 'koa'

const cors = (ctx: Koa.Context, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

export default cors
