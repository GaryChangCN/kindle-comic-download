export interface BaseCacheList {
    name: string
    time?: string
    size?: number
}

export interface CacheList extends BaseCacheList {
    child?: CacheList[]
}

export interface ResCacheList {
    image: CacheList[]
    mobi: BaseCacheList[]
}

export type Intent = 'Success' | 'Warn' | 'Danger' | 'Primary'

export interface Toaster {
    msg: string
    intent: Intent
    timer?: number
}
