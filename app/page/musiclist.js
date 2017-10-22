import React,{Component} from  'react';
import MusicItem from '../components/musicItem';

class Musiclist extends Component{
    render(){
        let musicList = this.props.musicList.map((item)=>{
            return(
                <MusicItem key={item.id}
                item={ item } 
                focus={item === this.props.currentMusicItem ? true:false}/>
            )
        });
        return(
            <ul>
                {musicList}
            </ul>
        )
    }
};

export default Musiclist;