import CalculatorButton from './CalculatorButton.jsx';
import './calculatorStyle.css'

const allButtons =
[
  "C", "CE","<<<","/",
  "1", "2", "3",  "*",
  "4", "5", "6",  "+",
  "7", "8", "9",  "-",
      "0" , ".",  "="
]
export default function Calculator() {
  let cur = {
    input : "",
    ans : ""
  }
  
  function buttonClick(e,buttonIndex) {
    var cur = allButtons[buttonIndex]
    if (buttonIndex>2 && buttonIndex < 18) { addInput(cur) }
    else if (buttonIndex==1) { clearInput() }
    else if (buttonIndex==2) { removeLastInput() }
    else if (buttonIndex==0) { clearInput(); clearAns() }
    else if (buttonIndex==18) { evaluateInput() }
    
    updateInput(e);
  }

  function addInput(input) {
    cur.input += input;
  }

  function evaluateInput() {
    console.log("praseInt: ", parseInt(cur.input[0]))
    if (isNaN(parseInt(cur.input[0]))) { cur.ans=eval((cur.ans + cur.input)) }
    else { cur.ans=eval(cur.input) }
    cur.input = "";
  }

  function removeLastInput() {
    cur.input = cur.input.slice(0,-1);
  }

  function clearInput() {
    cur.input = ""; 
  }
  function clearAns() {
    cur.ans = null;
  }

  function updateInput(e) {
    e=getWrapper(e);
    e.getElementsByClassName("calculator-result")[0].innerHTML = cur.input;
    e.getElementsByClassName("calculator-answer")[0].innerHTML = cur.ans;
    
  }

  function getWrapper(e) {
    while(e.id!="calculator-wrapper") {
      e=e.parentNode
      console.log("new e:", e);
    }
    return (e)
  }

  return(
  <div id="calculator-wrapper">
    <div className="calculator-answer" placeholder="0"></div>
    <div className="calculator-result" placeholder="0"></div>
    <div className="calculator-button-wrapper">
      {allButtons.map((button, index) => {return (<CalculatorButton key={index} button={button} buttonIndex={index} buttonClick={buttonClick}/>)})}
    </div>
  </div>
  )
}