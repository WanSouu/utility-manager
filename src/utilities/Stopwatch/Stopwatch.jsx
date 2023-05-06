import { useState , useEffect } from 'react'
import './stopwatch_style.css'

// Function that converts the amount of seconds into a 00:00 string format
function stopwatchSecondsToTime(seconds) {
  var _time = [Math.floor(seconds/60),seconds%60] // 0 = mins, 1 = secs
  return (_time[0]<10 ? "0" : "") + _time[0] + ":" + (_time[1]<10 ? "0" : "") + _time[1];
}
let stopwatchTimeout=null;
export default function StopWatch() {
  const [stopwatchInfo, setStopwatch] = useState({ time : 0 , state : false})
  
  // Function that toggles the stopwatch state
  function stopwatchStart() {
    stopwatchTimeout = setTimeout(stopwatchAddTime, 1000);
    setStopwatch((current_info) => {return {time : current_info.time, state : true}});
  }
  function stopwatchStop() {
    clearTimeout(stopwatchTimeout)
    setStopwatch((current_info) => {return {time : current_info.time, state : false}});
  }

  // Function that resets the stopwatch time & sets the stopwatch state to false, aswell as clear the stopwatch timeouts
  function stopwatchReset() {
    setStopwatch({time : 0 , state : false});
    clearTimeout(stopwatchTimeout)
    stopwatchTimeout=null;
  }

  // Function that runs every 1 second and adds the time to the stopwatch time variable
  function stopwatchAddTime() {
    console.log("yeah");
    setStopwatch((current_info) => {return {time : current_info.time + 1, state : current_info.state}});
    stopwatchTimeout = setTimeout(stopwatchAddTime, 1000);
  }

  return(
    <div id="stopwatch-wrapper">
      <div className="stopwatch-title" contentEditable="true">Stopwatch Title</div>
      <div className="stopwatch-time">{stopwatchSecondsToTime(stopwatchInfo.time)}</div>
      <div id="stopwatch-button-wrapper">
        <button className="stopwatch-button reset" onClick={stopwatchReset}>reset</button>
        <button className="stopwatch-button toggle" onClick={(stopwatchInfo.state ? stopwatchStop : stopwatchStart)}>{stopwatchInfo.state ? "stop" : "start"}</button>
      </div>
    </div>
  )
}