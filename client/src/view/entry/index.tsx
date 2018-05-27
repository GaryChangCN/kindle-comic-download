import * as React from 'react'
import { connect } from 'zlp'
import iEntry from '../../store/entry'
import './entry.less'
import { getImageLink, formatTime, getMobiLink } from '../../util'

interface BookList {
    name: string
    chapter: string
    cover: string
    size: number
    time: string
}

@connect([iEntry])
class Entry extends React.Component<any, any> {
    componentDidMount () {
        iEntry.init()
    }

    renderDownloaded () {
        const {cacheList} = iEntry.store
        if (!cacheList) {
            return (
                <div className="content-middle downloaded">
                    <div className="empty">
                        你还没有下载~
                    </div>
                </div>
            )
        }
        const {image, mobi} = cacheList
        let dealBook: BookList[] = []
        image.forEach(item => {
            if (!item.child) return
            item.child.forEach(e => {
                if (!e.child || !e.child[0]) return
                const size = e.child.reduce((a, b) => {
                    a.size += b.size
                    return a
                }).size
                dealBook.push({
                    name: item.name,
                    chapter: e.name,
                    cover: `${item.name}/${e.name}/${e.child[0].name}`,
                    size,
                    time: e.child[0].time
                })
            })
        })
        dealBook = dealBook.sort((a, b) => {
            return b.time.localeCompare(a.time)
        })

        return (
            <div className="content-middle downloaded">
                <div className="picture">
                    <div className="sub-title">
                        在线阅读
                    </div>
                    <div className="list">
                        {dealBook.map((book, i) => {
                            const name = book.name + '-' + book.chapter
                            return (
                                <div
                                    className="item"
                                    key={i}
                                >
                                    <div className="img">
                                        <img src={getImageLink(book.cover)} alt={name}/>
                                    </div>
                                    <div className="name">
                                        {name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mobi">
                    <div className="sub-title">
                        Mobi 下载
                    </div>
                    <div className="list">
                        {mobi.sort((a, b) => b.time.localeCompare(a.time)).map(item => {
                            return (
                                <div className="item" key={item.name}>
                                    <span className="label">{item.name}</span>
                                    <span className="time">{formatTime(item.time)}</span>
                                    <a href={getMobiLink(item.name)} download={item.name}>下载</a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    render () {
        const {state} = iEntry.store
        return (
            <div className="entry-container">
                <div className="url-link-container">
                    <div className="content-middle url-link-content">
                        <div className="input-wrap">
                            <input
                                type="text"
                                placeholder="输入漫画链接"
                                value={state.input.value}
                                onChange={e => {
                                    const val = e.target.value
                                    iEntry.change('state.input.value', val)
                                }}
                                onKeyDown={e => {
                                    if (e.keyCode === 13) {
                                        iEntry.download()
                                    }
                                }}
                            />
                            <div className="get-file-btn" onClick={() => iEntry.download()}>
                                下载
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cache-container">
                    <div className="content-middle title">
                        已下载
                    </div>
                    {this.renderDownloaded()}
                </div>
            </div>
        )
    }
}
export default Entry
