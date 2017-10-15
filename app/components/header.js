import React ,{ Component } from 'react'
import './header.less'

class Header extends Component{
    render(){
        return (
            <div className = "component-header">
                <img src='./static/images/logo.png'  width="40" alt="" />
                <h1 className='caption'>Music Player</h1>
            </div>
        );
    }
};
 export default Header;