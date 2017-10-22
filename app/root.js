import React,{ Component } from 'react'
import Header from './components/header'
import Player from './page/player'
import Musiclist from './page/musiclist'
import $ from 'jquery'
import jPlayer from 'jplayer'
import MUSICLIST from './config/musicList'
import { Router,IndexRoute,Link,Route,hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'

class app extends Component{
    constructor(props){
        super(props);
        this.state = {
            musicList: MUSICLIST,
            currentMusicItem: MUSICLIST[2],
        }
    };
    playMusic(item){
        $('#player').jPlayer('setMedia',{
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: item
        });
    };
    playNext(type = 'next'){
        let len = this.state.musicList.length;
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let temIndex;
        if(type = 'next'){
            temIndex = (index+1) % len;//防止越界
        }else{
            temIndex = (index-1 + len) % len;//防止越界
        }
        this.playMusic(this.state.musicList[temIndex]);
    };
    findMusicIndex(item){
        return this.state.musicList.indexOf(item);
    }
    componentDidMount(){
        let self = this;
        $('#player').jPlayer({//播放歌曲
            supplied: 'mp3',
            wmode: 'window'
        }); 
        this.playMusic(this.state.currentMusicItem);

        $('#player').bind($.jPlayer.event.ended,(e)=>{//播放完成
            this.playNext();
        });
        Pubsub.subscribe('MUSIC_PLAY',(msg,item)=>{//传入订阅参数
            this.playMusic(item);
            this.setState({
                currentMusicItem: item
            });
        });
        Pubsub.subscribe('MUSIC_DELETE',(msg,item)=>{
            this.setState({
                musicList : this.state.musicList.filter((musicItem)=>{
                    return musicItem != item ;
                })
            }); 
            if(this.state.currentMusicItem === item){
                this.playNext();
            } 
        });
        Pubsub.subscribe('NEXT',(msg,type)=>{
            this.playNext(type);
        });
    };
   componentWillUnmount(){
        Pubsub.unsubscribe('MUSIC_PLAYER');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('NEXT');
   };
    render(){
        return(
            <div>
                < Header />
                {React.cloneElement(this.props.children,this.state)}
            </div>
        );
    };
}
class Root extends Component{//路由管理
    render(){
        return(
            <Router history={ hashHistory }>
                <Route path='/' component={app}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path='/list' component={Musiclist}></Route>
                </Route>
            </Router>
        );
    };
};
export default Root;