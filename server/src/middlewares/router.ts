import * as Router from 'koa-router'
import generator from '../controllers/generator'
import cacheList from '../controllers/cacheList'
import statics from '../controllers/static'

const router = new Router()

router.get('/', async ctx => {
    ctx.body = 'hello world'
})

// 输入 url 生成 mobi
router.post('/api/generator', generator)
// 缓存列表
router.get('/api/cacheList', cacheList)
// 下载 图片或者 mobi
router.get('/api/static', statics)

export default router
