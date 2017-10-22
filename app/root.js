import React,{ Component } from 'react'
import Header from './components/header'
import Player from './page/player'
import Musiclist from './page/musiclist'
import $ from 'jquery'
import jPlayer from 'jplayer'
import MUSICLIST from './config/musicList'
import { Router,IndexRoute,Link,Route,hashHistory } from 'react-router'

class app extends Component{
    constructor(props){
        super(props);
        this.state = {
            musicList: MUSICLIST,
            currentMusicItem: MUSICLIST[5],
        }
    };
    componentDidMount(){
        let self = this;
        $('#player').jPlayer({//播放歌曲
            ready: function(event){
                $('#player').jPlayer('setMedia',{
                    //mp3: 'http://sc1.111ttt.com/2017/1/05/09/298092038446.mp3'
                    mp3: self.state.currentMusicItem.file
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        }); 
    };
   componentWillUnmount(){

   };
    render(){
        return(
            <div>
                < Header />
                {React.cloneElement(this.props.children,this.state)}
                {/* < Player currentMusicItem={this.state.currentMusicItem}/>               
                < Musiclist currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}/> */}
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