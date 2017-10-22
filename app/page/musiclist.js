import React,{Component} from  'react';
import MusicItem from '../components/musicItem';

class Musiclist extends Component{
    render(){
        let musicList = this.props.musicList.map((item)=>{
            if(item === this.props.currentMusicItem)   console.log( item.title );
            return(
                <MusicItem key={item.id} title={item.title} 
                artist={item.artist} 
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