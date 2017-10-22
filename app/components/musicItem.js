import React , {Component} from 'react';
import './musicItem.less';
import Pubsub from 'pubsub-js'

class MusicItem extends Component{
    playMusic(item){
        Pubsub.publish('MUSIC_PLAY',item);
    };
    deleteMusic(item,e){
        e.stopPropagation();
        Pubsub.publish('MUSIC_DELETE',item);
    };
    render(){
        let item = this.props.item;
        return(
            <li onClick={this.playMusic.bind(this,item)}
                className={`component-musicItem ${this.props.focus ? "focus":" "}`}>
                <strong>{item.title}</strong>——{item.artist}
                <p onClick={this.deleteMusic.bind(this,item)} className="delete"></p>
            </li>
        );
    };
};
export default MusicItem;