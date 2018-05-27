import * as React from 'react'
import {connect} from 'zlp'
import iApp from '../../store/app'

import './portal.less'

@connect([iApp])
class Portal extends React.Component<any, any> {
    render () {
        const {toaster} = iApp.store.portal
        return (
            <div className="portal">
                <div className="toaster">
                    {Object.keys(toaster).map((key, i) => {
                        const item = toaster[key]
                        return (
                            <div
                                className="item"
                                key={key}
                                data-intent={item.intent}
                            >
                                {item.msg}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default Portal
