import { Store } from 'zlp'
import { cacheList, generate } from './service'
import { ResCacheList } from '../typings'
import iApp from './app'

const FRESHSPAN = 3000

class Entry extends Store {
    listen = false
    constructor () {
        super ()
        setInterval(() => {
            if (this.listen) {
                this.freshCacheList()
            }
        }, 3000)
    }

    store = {
        cacheList: null as ResCacheList,
        state: {
            input: {
                value: ''
            }
        }
    }

    change (path, value) {
        this.setStore(path, value)
    }

    async init () {
        await this.freshCacheList()
        this.listen = true
    }

    async freshCacheList () {
        const ret: ResCacheList = await cacheList()
        this.change('cacheList', ret)
    }

    async download () {
        const link = this.store.state.input.value
        try {
            new URL(link)
        } catch (error) {
            iApp.toaster('请输入正确的 url', 'Danger', 2000)
            return
        }
        try {
            await generate(link)
            this.change('state.input.value', '')
            iApp.toaster('开始生成，稍后会处在在已下载中', 'Success')
        } catch (error) {
            iApp.toaster('下载失败 -> ' + error.message, 'Danger')
        }
    }
}

export default new Entry()
