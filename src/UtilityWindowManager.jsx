let draggingCard={ element: null, index: null};
let draggingOffset={ x: 0, y: 0}
addEventListener("mouseup", (event) => {
  draggingCard.element=null;
});
addEventListener("mousemove", (event) => {
  if (draggingCard.element!=null) {
    draggingCard.element.style.left=(event.clientX - parseInt(draggingCard.element.style.width)/2 + draggingOffset.x)+"px";
    draggingCard.element.style.top=(event.clientY - parseInt(draggingCard.element.style.height)/2 + draggingOffset.y)+"px";
  }2
});
function setDefaultInfo(objects) {
  var positions = Array(objects.length).fill(null);
  var sizes = Array(objects.length).fill(Array(2).fill(300));
  var init_sep = 32
  var init_pos = [init_sep,init_sep]
  var max_width = window.innerWidth;
  for(var i = 0; i < objects.length; i++) {

    if (init_pos[0] + sizes[i][0] > max_width) {
      init_pos[0]=init_sep;
      init_pos[1]+=sizes[i][1] + init_sep;
    }

    positions[i]=[init_pos[0], init_pos[1]];
    
    init_pos[0]+=sizes[i][0] + init_sep  
    
  }
  return([positions,sizes])
}

export default function UtilityWindowManager({ children , utils}) {
  //const [cardInfo, setCardInfo] = useState(setDefaultInfo(children))
  let cardInfo=setDefaultInfo(children);
  let cardLayers=Array(children.length)
  cardLayers=children.map((c, i) => i)

  function getUtilityCard(cardInfo) {
    var i = cardInfo;
    while(!(i.classList.contains("utility-card"))) {
      i = i.parentNode;
    }
    return i;
  }

  function moveCardToFront(index) {
    for(var i = cardLayers.indexOf(index); i >= 0; i--) {
      cardLayers[i] = cardLayers[i-1];
    }
    cardLayers[0] = index;
  }

  function updateLayers() {
    var cards=document.getElementsByClassName("utility-card")
    for(var i = 0; i < cards.length; i++) {
      cards[i].style.zIndex = (cards.length-cardLayers.indexOf(i));
    }
  }
  function setDraggingCard(e, index) {
    draggingCard.element = getUtilityCard(e.target)
    draggingCard.index = index;

    draggingOffset.x = (parseInt(draggingCard.element.style.left)+parseInt(draggingCard.element.style.width)/2) - e.clientX;
    draggingOffset.y = (parseInt(draggingCard.element.style.top)+parseInt(draggingCard.element.style.height)/2) - e.clientY;

    if (document.getElementsByClassName("dragging-card").length>0) {
      document.getElementsByClassName("dragging-card")[0].classList.remove("dragging-card");
    }
    
    moveCardToFront(index)
    updateLayers();

    draggingCard.element.className=draggingCard.element.className + " dragging-card";
  }

  return(
    <>
    {children.map((child, index) => {
      return(
        <div key={index} className="utility-card" style={{
          left: cardInfo[0][index][0] + "px",
          top: cardInfo[0][index][1] + "px",
          width: cardInfo[1][index][0] + "px",
          height: cardInfo[1][index][1] + "px",
          zIndex: cardLayers[index]
          }}
          
          >
          <div className="top-bar">
            <div className="card-drag-bar" onMouseDown={((e) => {setDraggingCard(e,index)})}>{child.type.name}</div>
            <div className="card-close">X</div>
          </div>
          <div className="utility-content">{child}</div>
        </div>
      )
    })}
    </>
  )
}
