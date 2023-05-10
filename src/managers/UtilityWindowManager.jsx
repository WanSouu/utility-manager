const maxCards = 100;
let draggingCard={ element: null, index: null};
let draggingOffset={ x: 0, y: 0}
addEventListener("mouseup", (event) => {
  if (draggingCard.element!=null) {
    var _x = ((event.clientX - parseInt(draggingCard.element.style.width)/2) / event.view.window.innerWidth + draggingOffset.x)
    var _y = ((event.clientY - parseInt(draggingCard.element.style.height)/2) / event.view.window.innerHeight + draggingOffset.y)
    cardInfo.position.get(draggingCard.index).x=_x*100
    cardInfo.position.get(draggingCard.index).y=_y*100
    draggingCard.element=null;
  }
});
addEventListener("mousemove", (event) => {
  if (draggingCard.element!=null) {
    
    var _x = ((event.clientX - parseInt(draggingCard.element.style.width)/2) / event.view.window.innerWidth + draggingOffset.x)
    var _y = ((event.clientY - parseInt(draggingCard.element.style.height)/2) / event.view.window.innerHeight + draggingOffset.y)
    draggingCard.element.style.left=_x*100+"%";
    draggingCard.element.style.top=_y*100+"%";
    
    
  }
})

let cardLayers=[]
let cardInfo = { position: new Map(), size: new Map()}

export default function UtilityWindowManager({ children , utils, utilIds , removeCardElement, newUtil}) {
  if (newUtil!=null) {
    cardInfo.position.set(utilIds[children.length-1],{
      x : 10+Math.random()*10,
      y : 10+Math.random()*10
    })
    cardInfo.size.set(utilIds[children.length-1],{width: window.innerWidth*0.16, height: window.innerHeight*0.32})
  }
  for(var i = 0; i < children.length; i++) {
    if (cardLayers.indexOf(i)==-1) {
      cardLayers.push(i);
    }
  }

  function getUtilityCard(cardInfo) {
    var i = cardInfo;
    while(!(i.classList.contains("utility-card"))) {
      i = i.parentNode;
    }
    return i;
  }

  function moveCardToFront(index) {
    if (cardLayers.length<2) { cardLayers[0] = index; return; }
    for(var i = cardLayers.indexOf(index); i >= 0; i--) {
      cardLayers[i] = cardLayers[i-1];
    }
    cardLayers[0] = index;
  }

  function updateLayers() {
    var cards=document.getElementsByClassName("utility-card")
    for(var i = 0; i < cards.length; i++) {
      cards[i].style.zIndex = (maxCards-cardLayers.indexOf(i));
    }
  }

  function setDraggingCard(e, index) {
    draggingCard.element = getUtilityCard(e.target)
    draggingCard.index = index;

    draggingOffset.x = ((parseInt(draggingCard.element.style.left) / 100)+((parseInt(draggingCard.element.style.width)/2) / e.view.window.innerWidth)) - (e.clientX / e.view.window.innerWidth);
    draggingOffset.y = ((parseInt(draggingCard.element.style.top) / 100)+((parseInt(draggingCard.element.style.height)/2) / e.view.window.innerHeight)) - (e.clientY / e.view.window.innerHeight);

    if (document.getElementsByClassName("dragging-card").length>0) {
      document.getElementsByClassName("dragging-card")[0].classList.remove("dragging-card");
    }

    draggingCard.element.className=draggingCard.element.className + " dragging-card";
  }
  function removeCard(e, index) {
    var arrayPos=cardLayers.indexOf(index)
    for(var i = 0; i < cardLayers.length; i++) {
      if (cardLayers[i]>index) { cardLayers[i]-- };
    }
    cardLayers=[...cardLayers.slice(0, arrayPos),...cardLayers.slice(arrayPos + 1)]
    removeCardElement(index);
  }
  function focusCard(e,index) {
    if (e.target.classList.contains("card-close") && cardLayers[0]!=index) { return -1 }
    moveCardToFront(index)
    updateLayers();
  }
  return(
    <div id="utility-cards">
    {children.map((child, index) => {
      return(
        <div key={utilIds[index]} onMouseDown={(e) => {focusCard(e,index)}} className={"utility-card " + child.type.name.toLowerCase()} style={{
          left: cardInfo.position.get(utilIds[index]).x + "%",
          top: cardInfo.position.get(utilIds[index]).y + "%",
          width: cardInfo.size.get(utilIds[index]).width + "px",
          height: cardInfo.size.get(utilIds[index]).height + "px",
          zIndex: (maxCards-cardLayers.indexOf(index))
          }}
          >
          <div className="top-bar">
            <div className="card-drag-bar" onMouseDown={((e) => {setDraggingCard(e,index)})}>{child.type.name}</div>
            <div className="card-close" onClick={((e) => {removeCard(e, index)})}>X</div>
          </div>
          <div className={"utility-content"}>{child}</div>
        </div>
      )
    })}
    </div>
  )
}
