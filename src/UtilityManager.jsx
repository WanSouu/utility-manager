import UtilityNavigationManager from './managers/UtilityNavigationManager.jsx'
import UtilityWindowManager from './managers/UtilityWindowManager.jsx'
import Stopwatch from './utilities/Stopwatch/Stopwatch.jsx'
import Notepad from './utilities/Notepad/Notepad.jsx'
import { useState } from 'react';


export default function UtilityManager() {
  // This contains all the utility components that are currently on the screen
  const [currentUtils, setUtils] = useState([])

  // This contains all the utility components that are available to the user.
  const utils = [
    <Stopwatch />,
    <Notepad />
  ]

  function addCard(i) {
    setUtils([...currentUtils, utils[i]])
  }

  return(
    <>
    <UtilityNavigationManager displayUtils={utils} addCard={addCard}/>
    <UtilityWindowManager utils={currentUtils}>
      {currentUtils}
    </UtilityWindowManager>
    </>
 )
}
