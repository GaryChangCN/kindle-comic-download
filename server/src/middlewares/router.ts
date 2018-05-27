import * as Router from 'koa-router'
import generator from '../controllers/generator'
import cacheList from '../controllers/cacheList'
import statics from '../controllers/static'

const router = new Router()

router.get('*', async (ctx, next) => {
    if (/^\/(api|static)/.test(ctx.path)) {
        next()
        return
    }
    ctx.status = 404
})

// 输入 url 生成 mobi
router.post('/api/generator', generator)
router.options('/api/generator', ctx => ctx.status = 200)
// 缓存列表
router.get('/api/cacheList', cacheList)
// 下载 图片或者 mobi
router.get('/static', statics)

export default router
