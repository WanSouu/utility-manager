import './stopwatchStyle.css'

// Function that converts the amount of seconds into a 00:00 string format
function stopwatchSecondsToTime(seconds) {
  var _time = [Math.floor(seconds/60),seconds%60] // 0 = mins, 1 = secs
  return (_time[0]<10 ? "0" : "") + _time[0] + ":" + (_time[1]<10 ? "0" : "") + _time[1];
}

export default function Stopwatch() {
  let stopwatch={ time : 0, state : false, timeout : null, e : null}
  //const [stopwatchInfo, setStopwatch] = useState({ time : 0 , state : false})
  // Function that toggles the stopwatch state
  function stopwatchStart(e) {
    console.log("Stopwatch started")
    stopwatch.timeout = setTimeout(stopwatchAddTime, 1000);
    stopwatch.state = true
    stopwatchUpdate(e);
  }
  function stopwatchStop(e) {
    console.log("Stopwatch stopped")
    clearTimeout(stopwatch.timeout)
    stopwatch.state = false
    stopwatchUpdate(e);
  }

  // Function that resets the stopwatch time & sets the stopwatch state to false, aswell as clear the stopwatch timeouts
  function stopwatchReset(e) {
    console.log("Stopwatch reset")
    clearTimeout(stopwatch.timeout)
    stopwatch.time = 0
    stopwatch.state = false
    stopwatchUpdate(e);
  }

  // Function that runs every 1 second and adds the time to the stopwatch time variable
  function stopwatchAddTime() {
    console.log("Stopwatch add time")
    stopwatch.time++;
    stopwatch.timeout = setTimeout(stopwatchAddTime, 1000);
    stopwatchUpdate(stopwatch.e);
  }

  function stopwatchUpdate(e) {
    console.log("Stopwatch update")
    var wrapper = findStopwatchWrapper(e.target);
    wrapper.getElementsByClassName("stopwatch-time")[0].innerHTML = stopwatchSecondsToTime(stopwatch.time)
    
    wrapper=wrapper.getElementsByClassName("stopwatch-button-wrapper")[0]
    wrapper.getElementsByClassName("toggle")[0].innerHTML = stopwatch.state ? "stop" : "start"

    stopwatch.e = e;
  }

  function findStopwatchWrapper(e) {
    console.log("finding")
    while(!(e.id=="stopwatch-wrapper")) {
      e=e.parentNode;
    }
    return(e)
  }

  return(
    <div id="stopwatch-wrapper">
      <div className="stopwatch-time">{stopwatchSecondsToTime(stopwatch.time)}</div>
      <div className="stopwatch-button-wrapper">
      <button className="stopwatch-button toggle" onClick={(e) => (stopwatch.state ? stopwatchStop(e) : stopwatchStart(e))}>{stopwatch.state ? "stop" : "start"}</button>
        <button className="stopwatch-button reset" onClick={(e) => stopwatchReset(e)}>reset</button>
      </div>
    </div>
  )
}