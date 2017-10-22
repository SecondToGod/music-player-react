import React,{Component} from 'react'
import Progress from '../components/progress'
import $ from 'jquery'
import jPlayer from 'jplayer'
import './player.less'
import {Link} from 'react-router'
import Pubsub from 'pubsub-js'

let duration = null;//音频总播放时间
class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            progress : 0 ,
            volume: 0,
            isPlay: true,
            playTime:0,
        };
    };
    componentDidMount(e){
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume*100 ,//乘100使其对应progress值
                playTime: this.format(duration*(e.jPlayer.status.currentPercentAbsolute/100)),
            });
        });
    };
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    };
    progressChangeHandler(progress){
        $('#player').jPlayer(this.state.isPlay?'play':'pause',duration*progress);
    };
    changeVolumeHandler(progress){
        $('#player').jPlayer('volume',progress);
    };
    play(){
        if(this.state.isPlay){
            $('#player').jPlayer('pause');
        }
        else $('#player').jPlayer('play');
        this.setState({
            isPlay : !this.state.isPlay
        });
    };
    next(type){
        Pubsub.publish('NEXT',type);
    };
    format(time){
        let Time = Math.round(time);
        let minute = Math.floor(Time/60);
        let second = Time%60;
        second = second < 10?`0${second}`: second;
        return `${minute} : ${second}`;
    }
    render(){
        return(
            <div>
                <Progress  progress = {this.state.progress}
                onProgressChange={this.progressChangeHandler.bind(this)}
                barColor='#4d1'>  
                </Progress>
                <div className='player-page'>
                    <h1 className='caption'><Link to='/list'>闻风 &gt;</Link></h1>
                    <div className='mt20 row'>
                        <div className="control-wrapper">
                            <h2 className='music-title mt5'>{this.props.currentMusicItem.title}</h2>
                            <h3 className='music-artist mt10'>{this.props.currentMusicItem.artist}</h3>
                            <div className='row mt20' >
                                <div className='-col-auto'>{this.state.playTime}</div>
                                <div className='volume-container'>
                                    <i className='icon-volume'></i>
                                    <div className='volume-wrapper' >
                                        <Progress progress={this.state.volume} 
                                        onProgressChange={this.changeVolumeHandler.bind(this)} 
                                        barColor = 'orange'/>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop:25 }}>
                                <Progress progress = {this.state.progress}
                                    onProgressChange={this.progressChangeHandler.bind(this)}
                                    barColor='#f41'/>
                            </div>
                            <div className='row mt35'>
                                <div>
                                    <i className='icon prev' onClick={this.next.bind(this,'prev')}></i>
                                    <i className={`ml20 icon ${this.state.isPlay?'pause':'play'}`} onClick={this.play.bind(this)}></i>
                                    <i className='ml20 icon next'  onClick={this.next.bind(this,'next')}></i>
                                </div>
                                <div className='-col-auto'>
                                    <i className='icon repeat-cycle'></i>
                                </div>
                            </div>
                        </div>
                        <div className='-col-auto cover '>
                            <img className='player-cover' src={this.props.currentMusicItem.cover} 
                            style={{animationPlayState:`${this.state.isPlay?'running':'paused'}`}}
                            alt={this.props.currentMusicItem.title} />
                        </div>
                    </div> 
                </div>
            </div>
        );
    };
};
export default Player;