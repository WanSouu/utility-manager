import UtilityWindowManager from './UtilityWindowManager.jsx'
import Stopwatch from './utilities/Stopwatch/Stopwatch.jsx'
import Notepad from './utilities/Notepad/Notepad.jsx'


export default function UtilityManager() {

  // This will contain all the utility components that are currently on the screen
  // Currently it has no real use but act as a placeholder
  const utils = [
    <Stopwatch />,
    <Notepad />
  ]

  return(
    <UtilityWindowManager utils={utils}>
      {utils}
    </UtilityWindowManager>
 )
}
