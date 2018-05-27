import * as fs from 'fs'
import * as _get from 'lodash.get'
import download from './download'
import { deductionImgType, createComicDir, createChapterDir } from '../utils'
import convert from './convert'
import * as url from 'url'
import * as qs from 'querystring'
import { Comic, WebsiteType, ParseUri } from '../typings'
import * as http from 'http'
import * as superagent from 'superagent'


interface Splider {
    [props: string]: (parsedUri: ParseUri, callBack: CallBack) => void
}

type CallBack = (imageList: string[], headers: http.OutgoingHttpHeaders, timeSpan: number) => Promise<void>

export default async function (websiteType: WebsiteType) {

    const ret: Splider = {

        async baidu (parsedUri, callBack) {


            let srcUri: string
            const headers: http.OutgoingHttpHeaders = {}
            let timeSpan = 0
            if (websiteType.cooper === 'netease') {
                // tslint:disable-next-line:max-line-length
                srcUri = `https://h5.manhua.163.com/api/comic/${parsedUri.query.comicId}/chapter/${parsedUri.query.partId}`
            } else if (websiteType.cooper === 'tecent') {
                // tslint:disable-next-line:max-line-length
                srcUri = `http://m.ac.qq.com/event/baiduMobile201704/action.php?comic=${parsedUri.query.comicId}&chapter=${parsedUri.query.partId}`

                timeSpan = 300
            } else if (websiteType.cooper === 'dmzj') {
                // tslint:disable-next-line:max-line-length
                srcUri = `http://open.dmzj.com/baiduReader/api/comic/${parsedUri.query.comicId}/chapter/${parsedUri.query.partId}`

                headers['Referer'] = 'http://open.dmzj.com/baiduReader/index.html'
            }

            const srcRes = await superagent(srcUri)
            let srcData: object = srcRes.body
            if (Object.keys(srcData).length === 0) {
                let parsed = false
                if (srcRes.text) {
                    try {
                        srcData = JSON.parse(srcRes.text)
                        parsed = true
                    } catch (error) {
                        //
                    }
                }
                if (!parsed) {
                    return
                }
            }

            const imageList = _get(srcData, 'data.imageList', [])
            const dealList: string[] = imageList.map(item => item.imageUrl)
            await callBack(dealList, headers, timeSpan)
        }
    }
    return ret
}

