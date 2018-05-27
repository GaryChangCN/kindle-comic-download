import * as Router from 'koa-router'
import config from '../config'
import * as fs from 'fs'
import * as path from 'path'
import { CacheList } from '../typings'

const listDirDeep = (paths) => {
    const list = fs.readdirSync(paths)
    const result: CacheList[] = []
    list.forEach(name => {
        if (name === '.DS_Store' || name === '.gitkeep') {
            return
        }
        const stat = fs.statSync(path.join(paths, name))
        if (stat.isDirectory()) {
            result.push({
                name,
                child: listDirDeep(path.join(paths, name))
            })
        } else {
            result.push({
                name,
                time: stat.ctime,
                size: stat.size
            })
        }
    })
    return result
}

export default async (ctx: Router.IRouterContext) => {
    try {
        const imageList = listDirDeep(path.resolve(__dirname, '../../assets/image'))
        const mobiList = listDirDeep(path.resolve(__dirname, '../../assets/mobi'))
        ctx.body = {
            err: false,
            data: {
                image: imageList,
                mobi: mobiList
            }
        }

    } catch (error) {
        console.error(error)
        ctx.body = {
            err: true,
            msg: 'Server Error'
        }
    }
}
