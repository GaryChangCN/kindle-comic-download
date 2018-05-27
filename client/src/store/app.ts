import { Store } from 'zlp'
import { Intent, Toaster } from '../typings'

interface ToasterStore {
    [props: string]: Toaster
}

class App extends Store {
    toasterId: number = 0
    store = {
        portal: {
            toaster: {} as ToasterStore
        }
    }

    toaster (msg: string, intent: Intent = 'Primary', time: number = 3000) {
        this.setStore(`portal.toaster.${this.toasterId}`, {
            msg,
            intent
        })
        const id = 'toaster' + this.toasterId
        const toasterId = this.toasterId
        const timer = setTimeout(() => {
            delete this.store.portal.toaster[toasterId]
            this.setStore('', '')
            clearTimeout(this[id])
        }, time)
        this[id] = timer
        // TODO: 真正的间隔删除
        this.toasterId ++
    }
}

export default new App()
