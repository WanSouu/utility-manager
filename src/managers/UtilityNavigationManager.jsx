export default function UtilityNavigationManager({ displayUtils , addCard }) {
  return(
  <div id="utility-nav">
    {
    displayUtils.map((util, index) => {
      return (<button key={index} className="utility-nav-button" onClick={() => {addCard(index)}}>{util.type.name}</button>)
    })
    }
  </div>
  )
}