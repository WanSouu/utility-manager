import { useState , useEffect } from 'react'

// This function gets all the positions (css left & top) of the objects
// unless init=true, then it sets all the positions of the objects to be next to each other with a small margin.
// idk how responsive is this going to be rofl
// but it returns an array of positions.
function setDefaultInfo(objects) {
  var positions = Array(objects.length).fill(null);
  var sizes = Array(objects.length).fill(Array(2).fill(300));
  var init_sep = 32
  var init_pos = [init_sep,init_sep]
  console.log("len ", sizes);
  for(var i = 0; i < objects.length; i++) {
    positions[i]=[init_pos[0], init_pos[1]];
    init_pos[0]+=sizes[i][0] + init_sep  
    //init_pos[1] += objects[i].offsetHeight
    
  }
  return([positions,sizes])
}

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



export default function UtilityWindowManager({ children }) {
  //const [cardInfo, setCardInfo] = useState(setDefaultInfo(children))
  let cardInfo=setDefaultInfo(children);
  
  function getUtilityCard(cardInfo) {
    var i = cardInfo;
    while(i.className != "utility-card") {
      i = i.parentNode;
    }
    return i;
  }

  function setDraggingCard(e, index) {
    draggingCard.element = getUtilityCard(e.target)
    draggingCard.index = index;

    draggingOffset.x = (parseInt(draggingCard.element.style.left)+parseInt(draggingCard.element.style.width)/2) - e.clientX;
    draggingOffset.y = (parseInt(draggingCard.element.style.top)+parseInt(draggingCard.element.style.height)/2) - e.clientY;
  }


  return(
    <>
    {children.map((child, index) => {
      return(
        <div key={index} className="utility-card" style={{
          left: cardInfo[0][index][0] + "px",
          top: cardInfo[0][index][1] + "px",
          width: cardInfo[1][index][0] + "px",
          height: cardInfo[1][index][1] + "px"
          }}
          
          >
          <div class="top-bar">
            <div class="card-drag-bar" onMouseDown={((e) => {setDraggingCard(e,index)})}>DRAG</div>
            <div class="card-close">X</div>
          </div>
          <div>{child}</div>
        </div>
      )
    })}
    </>
  )
}
