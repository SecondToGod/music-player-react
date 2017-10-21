import React,{Component} from 'react'
import Progress from '../components/progress'
import $ from 'jquery'
import jPlayer from 'jplayer'
import './player.less'

let duration = null;//音频总播放时间
class Player extends Component{
    constructor(props){
        super(props);
        this.state = {
            progress : 0 
        };
    };
    componentDidMount(){
        $('#player').bind($.jPlayer.event.timeupdate,(e)=>{
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            });
        })
    };
    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
    };
    progressChangeHandler(progress){
        $('#player').jPlayer('play',duration*progress);
    };
    render(){
        return(
            <div className='player-page'>
            <Progress  progress = {this.state.progress}
                onProgressChange={this.progressChangeHandler}
                barColor='red'>  
            </Progress>
                <h1 className='caption'>闻风</h1>
                <div className='mt20 row'>
                    <div className="control-wrapper">
                        <h2 className='music-title'>歌曲名称</h2>
                        <h3 className='music-artist mt10'>歌手</h3>
                        <div className='row mt20'>
                            <div className='-col-auto'>-2：00</div>
                            <div className='volume-container'>
                                <i className='icon-volume rt' style={{top:5,left:-5}}></i>
                                <div className='volume-wrapper'>
                                    音量控制
                                </div>
                            </div>
                        </div>
                        <div style={{ height:'10px',lineHewight:'10px' }}>播放进度</div>
                        <div className='row mt35'>
                            <div className=''>
                                <i className='icon prev'></i>
                                <i className='icon ml20 play'></i>
                                <i className='icon next ml20'></i>
                            </div>
                            <div className='-col-auto'>
                                <i className='icon repeat-cycle'></i>
                            </div>
                        </div>
                    </div>
                    <div className='-col-auto cover'>
                        <img src="" alt="歌曲名称" />
                    </div>
                </div> 
            </div>
        );
    };
};
export default Player;