import React , {Component} from 'react';
import './musicItem.less';

class MusicItem extends Component{
    render(){
        return(
            <li className={`component-musicItem ${this.props.focus ? "focus":" "}`}>
                <strong>{this.props.title}</strong>——{this.props.artist}
                <p className="delete"></p>
            </li>
        );
    };
};
export default MusicItem;