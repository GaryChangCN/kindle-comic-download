import * as path from 'path'
import img2mobi from 'img2mobi'
import { Comic } from '../typings'

export default async function (comic: Comic) {
    const {
        name,
        chapter
    } = comic
    await img2mobi(
        path.resolve(__dirname, `../../assets/image/${name}/${chapter}`),
        path.resolve(__dirname, `../../assets/mobi/${name + chapter}.mobi`),
        {
            title: name + chapter
        }
    )
}
