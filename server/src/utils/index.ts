import * as fs from 'fs'
import * as path from 'path'
import config from '../config'
import { SupportType, Comic, WebsiteType, CooperType, ParseUri } from '../typings'
import * as url from 'url'
import * as qs from 'querystring'

export function deductionImgType (contentType: string) {
    const match = contentType.match(/\/[^;]+/)
    if (!match || !match[0]) {
        return 'jpg'
    }
    return match[0].slice(1)
}

export function createComicDir (comic: Comic) {
    try {
        fs.mkdirSync(path.resolve(__dirname, `../../assets/image/${comic.name}`))
    // tslint:disable-next-line:no-empty
    } catch (error) {
    }
    return comic
}

export function createChapterDir (comic: Comic) {
    try {
        createComicDir(comic)
        fs.mkdirSync(path.resolve(__dirname, `../../assets/image/${comic.name}/${comic.chapter}`))
    // tslint:disable-next-line:no-empty
    } catch (error) {
    }
    return comic
}

export function deductionUriType (uri: string): WebsiteType {
    if (uri.indexOf('baiduReader') > -1 || uri.indexOf('baiduMobile') > -1) {
        const ret = <WebsiteType> {
            type: 'baidu',
            cooper: 'not-support'
        }
        if (uri.indexOf('163.com') > -1) {
            ret.cooper = 'netease'
            return ret
        }
        if (uri.indexOf('ac.qq.com') > -1) {
            ret.cooper = 'tecent'
            return ret
        }
        if (uri.indexOf('dmzj.com') > -1) {
            ret.cooper = 'dmzj'
            return ret
        }
        return ret
    }

    return {
        type: 'not-support' as SupportType
    }
}

export function parseUri (uri: string): ParseUri {
    const uriObj = url.parse(uri)
    const query = qs.parse(uriObj.search.slice(1))

    return {
        originalUri: uri,
        query,
        url: uriObj
    }
}

export async function sleep (time: number) {
    return new Promise (resolve => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}
