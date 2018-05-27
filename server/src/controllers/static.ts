import * as Router from 'koa-router'
import config from '../config'
import * as fs from 'fs'
import * as path from 'path'
import * as fileType from 'file-type'
import * as zlib from 'zlib'

export default async (ctx: Router.IRouterContext) => {
    try {
        // get filePath=image/海贼王/700/5.jpg
        // get filePath=mobi/海贼王700.mobi
        let filePath = ctx.query.filePath
        if (!filePath) {
            ctx.status = 404
            ctx.body = 'no such file'
            return
        }
        filePath = decodeURIComponent(filePath)
        const truePath = path.resolve(__dirname, '../../assets/', filePath)
        const readStream = fs.createReadStream(truePath)
        const gzipStream = readStream.pipe(zlib.createGzip())
        let setHeader = false
        readStream.on('data', chunk => {
            if (setHeader) return
            const type = fileType(chunk)
            ctx.set('Content-type', type.mime)
            setHeader = true
        })
        ctx.set('Content-Encoding', 'gzip')
        ctx.body = gzipStream
    } catch (error) {
        console.error(error)
        ctx.body = {
            err: true,
            msg: 'Server Error'
        }
    }
}
