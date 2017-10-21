import React,{ Component } from 'react'
import Header from './components/header'
import Player from './page/player'
import $ from 'jquery'
import jPlayer from 'jplayer'

class Root extends Component{
    componentDidMount(){
        $('#player').jPlayer({//播放歌曲
            ready: function(event){
                $('#player').jPlayer('setMedia',{
                    mp3: 'http://sc1.111ttt.com/2017/1/05/09/298092038446.mp3'
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
                < Player />               
            </div>
        );
    };
};
export default Root;