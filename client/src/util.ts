import config from './store/config'

export function getImageLink (link: string) {
    const s = config.static
    const query = encodeURIComponent(`${s.image}/${link}`)
    return `${config.protocol}${config.host}${s.path}?${s.queryKey}=${query}`
}

export function getMobiLink (name: string) {
    const s = config.static
    const query = encodeURIComponent(`${s.mobi}/${name}`)
    return `${config.protocol}${config.host}${s.path}?${s.queryKey}=${query}`
}

export function formatTime (date: string) {
    const d = new Date(date)
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
