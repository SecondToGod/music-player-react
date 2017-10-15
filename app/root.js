import React,{ Component } from 'react'
import Header from './components/header'
import Progress from './components/progress'
import $ from 'jquery'
import jPlayer from 'jplayer'
class Root extends Component{
    getInitialState(){
        return{
            progress: '-'
        }
    };
    componentDidMount(){
        $('#player').jPlayer({
            ready: function(event){
                $(this).jPlayer('setMedia',{
                    mp3: 'http://sc1.111ttt.com/2017/1/05/09/298092038446.mp3'
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        });
    };
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    }
    render(){
        return(
            <div>
                < Header />
                <div id='player'></div>
                <Progress progress = {this.state.progress} >  
                </Progress>
            </div>
        );
    };
};
export default Root;