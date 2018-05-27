import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './view/app'

class Index extends React.Component<any, any> {
    render () {
        return <App/>
    }
}

ReactDOM.render(<Index/>, document.getElementById('app'))
