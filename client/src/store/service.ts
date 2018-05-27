import config from './config'
import { CacheList, ResCacheList } from '../typings'

const HOST = `${config.protocol}${config.host}`

export async function cacheList () {
    const res = await fetch(`${HOST}/api/cacheList`)
    const json = await res.json()
    if (json.err) {
        throw new Error('500')
    }
    return json.data as ResCacheList
}

export async function generate (url: string) {
    const res = await fetch(`${HOST}/api/generator`, {
        method: 'POST',
        body: JSON.stringify({
            url
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const json = await res.json()
    if (json.err) {
        throw new Error(json.message)
    }
}
