import UtilityNavigationManager from './managers/UtilityNavigationManager.jsx'
import UtilityWindowManager from './managers/UtilityWindowManager.jsx'
import Stopwatch from './utilities/Stopwatch/Stopwatch.jsx'
import Notepad from './utilities/Notepad/Notepad.jsx'
import { useState } from 'react';

let utilIds=[]
let utilNextId=0;
let newUtil=null;

export default function UtilityManager() {

  // This contains all the utility components that are currently on the screen
  const [currentUtils, setUtils] = useState([])

  // This contains all the utility components that are available to the user.
  const utils = [
    <Stopwatch />,
    <Notepad />
  ]

  function addCard(i) {
    newUtil=utilNextId;
    setUtils([...currentUtils, utils[i]]) 
    utilIds.push(utilNextId++)
  }

  function removeCard(i) {
    newUtil=null
    setUtils([...currentUtils.slice(0, i),...currentUtils.slice(i + 1)])
    utilIds=[...utilIds.slice(0, i),...utilIds.slice(i + 1)]
    
  }

  return(
    <>
    <UtilityNavigationManager displayUtils={utils} addCard={addCard}/>
    <UtilityWindowManager utils={currentUtils} utilIds={utilIds} removeCardElement={removeCard} newUtil={newUtil}>
      {currentUtils}
    </UtilityWindowManager>
    </>
 )
}
