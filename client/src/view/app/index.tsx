import * as React from 'react'
import Header from '../../components/header'
import Portal from '../../components/portal'
import Entry from '../entry'

import './app.less'
class App extends React.Component<any, any> {
    render () {
        return (
            <div id="main-content">
                <Header/>
                <Entry/>
                <Portal/>
            </div>
        )
    }
}
export default App
