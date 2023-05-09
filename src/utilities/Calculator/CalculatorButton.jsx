export default function CalculatorButton({button , buttonIndex, buttonClick}) {
  return(
    <div className="calculator-button" onClick={(e) => {buttonClick(e.target,buttonIndex)}} style={(button=="0") ? {flex: "calc(50% - 8px)"} : {}}>{button}</div>
  )
}