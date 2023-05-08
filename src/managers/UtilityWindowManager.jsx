const maxCards = 100;
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
})

let cardLayers=[]
let cardInfo = { position: new Array(maxCards), size: new Array(maxCards)}



function getPosition(index, axis) {
  return {
    x : null,
    y : null
  }
}

function setDefaultInfo(objects) {
  if (objects.length==0) { return; }
  var position=new Array(objects.length).fill(null).map((c, i) => { ; return getPosition(i); });
  var size=new Array(objects.length).fill(null).map(() => { return { width : 300 , height : 300 }; }); // those are the dimensions of a default card
  var seperation= 64 // separation between cards

  var goback=0;
  var row=0;
  for(var i = 0; i < objects.length; i++) {
    if (i<cardLayers.length-1) { console.log(i, "yea"); continue; };
    if (i>0 && position[i-1].x + (size[i].width * 2 + seperation) > window.innerWidth) {
      goback=i
      row++;
    }
    
    position[i].x=seperation + (((size[i].width + seperation) * i) - ((size[i].width + seperation) * goback));
    position[i].y=seperation + ((size[i].height + seperation) * row);
  }
  return({position : position, size : size})
}



export default function UtilityWindowManager({ children , utils, utilIds , removeCardElement, newUtil}) {
  if (newUtil!=null) {
    cardInfo.position[children.length-1]={
      x : 100+Math.random()*100,
      y : 100+Math.random()*100
    }
    cardInfo.size[children.length-1]={width: 300, height: 300}
    
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

    draggingOffset.x = (parseInt(draggingCard.element.style.left)+parseInt(draggingCard.element.style.width)/2) - e.clientX;
    draggingOffset.y = (parseInt(draggingCard.element.style.top)+parseInt(draggingCard.element.style.height)/2) - e.clientY;

    if (document.getElementsByClassName("dragging-card").length>0) {
      document.getElementsByClassName("dragging-card")[0].classList.remove("dragging-card");
    }
    
    moveCardToFront(index)
    updateLayers();

    draggingCard.element.className=draggingCard.element.className + " dragging-card";
  }

  function removeCard(e, index) {
    console.log("removing: ", index);
    console.log(...cardLayers);
    var arrayPos=cardLayers.indexOf(index)
    for(var i = 0; i < cardLayers.length; i++) {
      if (cardLayers[i]>index) { cardLayers[i]-- };
    }
    cardLayers=[...cardLayers.slice(0, arrayPos),...cardLayers.slice(arrayPos + 1)]
    console.log(...cardLayers);

    removeCardElement(index);
  }


  console.log("current layers: ", ...cardLayers)
  console.log(maxCards)
  return(
    <div id="utility-cards">
    {children.map((child, index) => {
      return(
        <div key={utilIds[index]} className={"utility-card " + index} style={{
          left: cardInfo.position[index].x + "px",
          top: cardInfo.position[index].y + "px",
          width: cardInfo.size[index].width + "px",
          height: cardInfo.size[index].height + "px",
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
