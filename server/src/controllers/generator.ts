import * as Router from 'koa-router'
import Splider from '../service/splider'
import judgement from '../service/judgement'
import config from '../config'
import { WebsiteType, Comic } from '../typings'
import {createChapterDir, parseUri, sleep} from '../utils'
import download from '../service/download'
import convert from '../service/convert'
import * as http from 'http'

function generate (comic: Comic) {
    return async (imageList: string[], headers: http.OutgoingHttpHeaders, timeSpan: number) => {
        console.info('Generate start')
        try {
            await createChapterDir(comic)
            await createChapterDir(comic)
            if (timeSpan === 0) {
                const list = []
                imageList.forEach((imageUrl, i) => {
                    list.push(download(imageUrl, comic, i + '', headers))
                })
                await Promise.all(list)
            } else {
                let i = 0
                for (const imageUrl of imageList) {
                    try {
                        await download(imageUrl, comic, i + '', headers)
                    } catch (error) {
                        //
                    }
                    await sleep(timeSpan)
                    i ++
                }
            }
            await convert(comic)
        } catch (error) {
            console.error(error)
        }
    }
}

export default async (ctx: Router.IRouterContext) => {
    try {

        const reqBody: {
            url: string
        } = ctx.request.body

        const url = reqBody.url
        if (!url) {
            ctx.status = 403
            return
        }
        const parsedUri = parseUri(url)
        const judgeRet = judgement(parsedUri)


        if (judgeRet.err) {
            ctx.body = judgeRet
        } else {
            // 初始化 splider
            const splider = await Splider(judgeRet.data.websiteType)
            splider[judgeRet.data.websiteType.type](parsedUri, generate(judgeRet.data.comic))
            ctx.body = {
                data: Object.assign({}, judgeRet.data.comic, judgeRet.data.websiteType)
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
