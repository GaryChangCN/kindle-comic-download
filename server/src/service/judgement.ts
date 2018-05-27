import * as url from 'url'
import * as qs from 'querystring'
import { deductionUriType } from '../utils'
import { Judgement, WebsiteType, ParseUri } from '../typings'
import config from '../config'

export default (parsedUri: ParseUri): Judgement => {
    if (!parsedUri.originalUri) {
        return {
            err: true,
            msg: '错误的url'
        }
    }
    const websiteType = deductionUriType(parsedUri.originalUri)

    interface Result {
        [props: string]: () => Judgement
    }
    const result: Result = {
        baidu () {
            if (!config.support.baidu[websiteType.cooper]) {
                return {
                    err: true,
                    message: '暂不支持此百度漫画的合作网站'
                }
            }
            const uriObj = parsedUri.url
            const query = parsedUri.query
            if (!query.h5Title || !query.h5ChapterIndex || !query.comicId || !query.partId) {
                return {
                    err: true,
                    msg: 'url 解析策略失效，请更新到最新版'
                }
            }
            return {
                err: false,
                data: {
                    comic: {
                        name: decodeURIComponent(query.h5Title),
                        chapter: query.h5ChapterIndex,
                    },
                    websiteType
                }
            }
        }
    }

    if (!config.support[websiteType.type]) {
        return {
            err: true,
            msg: '该网站还不支持，请尝试升到最新版'
        }
    }
    return result[websiteType.type]()
}
