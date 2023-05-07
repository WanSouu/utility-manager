import UtilityWindowManager from './UtilityWindowManager.jsx'
import StopWatch from './utilities/Stopwatch/Stopwatch.jsx'
import Notepad from './utilities/Notepad/Notepad.jsx'


function UtilityManager() {
  return(
    <UtilityWindowManager>
      <StopWatch />
      <Notepad />
    </UtilityWindowManager>
 )
}

export default UtilityManager
