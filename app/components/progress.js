import React,{Component} from 'react'
import './progress.less'

class Progress extends Component{
    render(){
        return(
            <div className="component-progress row">
                <div className="progress" style={{ width:`${this.props.progress}%` }}>
                </div>            
            </div>
        )
    }
}

export default Progress;