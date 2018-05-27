import * as dl from 'download'
import * as fs from 'fs'
import * as path from 'path'
import * as fileType from 'file-type'
import { Comic } from '../typings'
import * as http from 'http'
import * as url from 'url'
import * as BufferList from 'bl'

export default async (
    uri: string,
    comic: Comic,
    imgName: string,
    reqHeader?: http.OutgoingHttpHeaders
): Promise<void> => {
    const {name, chapter} = comic

    const uriObj = url.parse(uri)
    const {protocol, host} = uriObj

    const options: http.RequestOptions = {
        protocol,
        host,
        path: uriObj.path,
        method: 'GET',
        timeout: 2000
    }
    if (reqHeader) {
        options.headers = reqHeader
    }
    const buf = await dl(uri, undefined, options)

    let ext: string
    const pathObj = path.parse(uriObj.pathname)
    ext = pathObj.ext ? pathObj.ext : fileType(buf).ext

    fs.writeFileSync(path.resolve(__dirname, `../../assets/image/${name}/${chapter}/${imgName}.${ext}`), buf)
}
