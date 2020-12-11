//"use strict"

import {Canvas} from './modules/canvas.js';
import {Shape} from './modules/canvas.js';
import {$} from './modules/nQuery.js';


const img = document.getElementById("festivalsplads");
const pinImg = document.getElementById("pin");

let imgWidth;
let imgHeight;

let mapPosX = 0
let mapPosY = 0

let pinPosX;
let pinPosY;

let newPinPosX;
let newPinPosY;

let lastPinPosX;
let lastPinPosY;





let newWidth = screen.width;
//console.log(newWidth);
let newHeight;
let canvasMap;
let map;

let pins = [];
let pin;

const canvas = $('myCanvas');
const context = canvas.getContext('2d');



 function init () {
    imgWidth = img.width;
    imgHeight = img.height;
    newHeight = aspectRatio(imgWidth, imgHeight, newWidth);
    //console.log(newHeight)
    canvasMap = new Canvas("myCanvas", "transparent", newHeight);
    canvasMap.canvas.addEventListener("dblclick", hittest);


    drawImageCanvas(canvasMap, mapPosX, mapPosY, newWidth, newHeight);

    //console.log(canvasMap.getWidth());
    //console.log(img.width);
}


function hittest(ev) {
    if (event.target.id == "myCanvas") {
      let mousePos = getMousePos(event.target, ev);
      //console.log(mousePos.x + "," + mousePos.y);
      let x = mousePos.x;
      let y = mousePos.y;
      //console.log(mousePos)
      document.getElementById("position").innerHTML ="X="+x+"][Y="+y;

      pinPosX = mousePos.x;
      pinPosY = mousePos.y;

      newPinPosX = mousePos.x;
      newPinPosY = mousePos.y;

      lastPinPosX = pinPosX;
      lastPinPosY = pinPosY;


      //console.log(`${pinPosX}, ${pinPosY}`)
      pin = new Shape(canvasMap, pinPosX, pinPosY, 20, 20);

      pins.push(pin);

      //repeater(canvasMap, pins);
      drawPin(canvasMap, pins);
    }
}

function drawImageCanvas (canvas, x, y, width, height) {
   canvas.context.drawImage(img, x, y, width, height);

}




function drawPin (canvas, arr, movedX, movedY, zoomWidth, zoomHeight) {



    if (isPanLimitedX || isPanLimitedX1) {
      movedX = 0;
    } else {
      newPinPosX = lastPinPosX - movedX;
    }

    if (isPanLimitedY || isPanLimitedY1) {
      movedY = 0;
    } else {
      newPinPosY = lastPinPosY - movedY;
    }




  if (pins.length >= 2 ) {

        canvas.clear();
        canvas.prep();
        pins = []
        arr.shift()
        //console.log(pins)

        for (let shape of arr) {
            shape.draw(newPinPosX, newPinPosY);
            //console.log(pins)
        }


  }else {
    for (let shape of arr) {
        shape.draw(newPinPosX, newPinPosY);
    }
  }

  //pin.draw(newPinPosX, newPinPosY);
  //console.log(pin)
}


function drawPinZoomIn(arr) {

  newPinPosX += zoomAmount / currentZoom
  newPinPosY += zoomAmount / currentZoom
    console.log(`${newPinPosX}, ${newPinPosY}`)

    lastPinPosX = newPinPosX
    lastPinPosY = newPinPosY


  for (let shape of arr) {
      shape.draw(newPinPosX, newPinPosY);
      //console.log(pins)
  }
}


function drawPinZoomOut(arr) {

  mapPosX = mapPosX + zoomAmount / currentZoom
  mapPosY = mapPosY + zoomAmount / currentZoom

  console.log(`${mapPosX}, ${mapPosY}`)

  newPinPosX -= zoomAmount/100 * currentZoom
  newPinPosY -= zoomAmount/100 * currentZoom
  
  console.log(`${newPinPosX}, ${newPinPosY}`)

  lastPinPosX = newPinPosX
  lastPinPosY = newPinPosY

  for (let shape of arr) {
      shape.draw(newPinPosX, newPinPosY);
      //console.log(pins)
  }
}


function getMousePos(canvas, ev) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top
    }
}


function aspectRatio(w, h, nW) {
  //(original height / original width) x new width = new height
  let newHeight = (h / w) * nW;
  return newHeight;
}








// Zoom

let currentZoom = 0;
let lastZoom = 0;
let zoomMax = 50;
let zoomAmount = 100;


canvas.addEventListener('wheel', checkScrollDirection, {passive: true});
canvas.addEventListener('mousedown', dragging);
canvas.addEventListener('mouseup', notDragging);
canvas.addEventListener('mousemove', pan);
canvas.addEventListener('mouseleave', enableScroll);
canvas.addEventListener('mouseenter', disableScroll);
let scrollDirection;




function checkScrollDirection(event) {
  let mousePos = getMousePos(event.target, canvasMap);
  //console.log(mousePos.x + "," + mousePos.y);
  let x = mousePos.x;
  let y = mousePos.y;
  //disableScroll()

  if (checkScrollDirectionIsUp(event)) {
    currentZoom++

    if (currentZoom < zoomMax) {
      zoomIn()
      scrollDirection = "zoomIn"
    } else if (currentZoom = zoomMax) {
      currentZoom = 50;
    }
    //console.log(currentZoom)


  } else {
    currentZoom--

    if (currentZoom >= 0) {
      zoomOut()
      scrollDirection = "zoomOut"
    } else if (currentZoom < 0) {
      currentZoom = 0;
    }
    //console.log(currentZoom)
  }
}

function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  }
  return event.deltaY < 0;
}



let zoomWidth = newWidth;
let zoomHeight = newHeight;











function zoomIn(x, y) {
  console.log(zoomWidth)
  console.log(zoomAmount)
  zoomWidth = zoomWidth + zoomAmount
  console.log(zoomWidth)
  zoomHeight = aspectRatio(newWidth, newHeight, zoomWidth);



  let mousePos = getMousePos(event.target, event);
  //console.log(mousePos.x)




  limitPan()

  canvasMap.clear();
  canvasMap.prep();



  newPosX = mapPosX
  newPosY = mapPosY

  drawImageCanvas(canvasMap, -mapPosX, -mapPosY, zoomWidth, zoomHeight);
  //drawPin(canvasMap, pins, movedX, movedY, zoomWidth, zoomHeight);
  drawPinZoomIn(pins)
}












function zoomOut() {
  if (zoomWidth > newWidth) {
    zoomWidth = zoomWidth - zoomAmount
    zoomHeight = aspectRatio(newWidth, newHeight, zoomWidth);

    let mousePos = getMousePos(event.target, event);

    //mapPosX += mousePos.x / 2
    //mapPosY += mousePos.y / 2

    canvasMap.clear();
    canvasMap.prep();

    drawImageCanvas(canvasMap, -mapPosX, -mapPosY, zoomWidth, zoomHeight);
    //drawPin(canvasMap, pins, movedX, movedY, zoomWidth, zoomHeight);
    drawPinZoomOut(pins)
  }

}




let isDragging = false;
let dragStartPosition = { x: 0, y: 0 };
let currentTransformedCursor;


let lastPosX = mapPosX;
let lastPosY = mapPosY;





function dragging(ev) {
  isDragging = true;
  let mousePos = getMousePos(event.target, ev);

  dragStartPosition = { x: mousePos.x, y: mousePos.y };
}

function notDragging() {
  isDragging = false;
  lastPosX = mapPosX;
  lastPosY = mapPosY;

    lastPinPosX = newPinPosX;
    lastPinPosY = newPinPosY;




  //console.log(lastPosX)

}
let isPanLimitedX1 = false;
let isPanLimitedY1 = false;
let isPanLimitedX = false;
let isPanLimitedY = false;

function limitPan() {
  if (mapPosX <= 0) {
    isPanLimitedX1 = true;
    //console.log(isPanLimitedX)
    mapPosX = 0;
    //console.log("1")
  }  else {
    isPanLimitedX1 = false
  }
  if (mapPosY <= 0) {
    isPanLimitedY1 = true;
    mapPosY = 0;
    //console.log("2")
  } else {
    isPanLimitedY1 = false
  }

  if (zoomAmount*currentZoom <= mapPosX) {
    isPanLimitedX = true;
    //console.log("3")
    mapPosX = zoomAmount*currentZoom;

  } else {
    isPanLimitedX = false
  }


  if ((zoomAmount*currentZoom) * (imgHeight / imgWidth / 1) <= mapPosY ) {
      isPanLimitedY = true;
    mapPosY = (zoomAmount*currentZoom) * (imgHeight / imgWidth / 1);
    //console.log("4")
  } else {
     isPanLimitedY = false
  }
  //console.log(isPanLimitedX)
}



let newPosX = mapPosX;
let newPosY = mapPosY;

let movedX = 0;
let movedY = 0;

var timesPerSecond = 30; // how many times to fire the event per second
var wait = false;

function pan(ev) {

  // Throttle
  if (!wait) {
      // fire the event
      if (isDragging) {
        if (zoomWidth > newWidth) {

          canvasMap.clear();
          canvasMap.prep();
          let mousePos = getMousePos(event.target, ev);
          //console.log(mousePos.x)


          movedX = (dragStartPosition.x - mousePos.x)
          movedY = (dragStartPosition.y - mousePos.y)


          newPosX = lastPosX + movedX;
          newPosY = lastPosY + movedY;

          //console.log(newPosX)

          mapPosX = newPosX;
          mapPosY = newPosY;




          limitPan()

          drawImageCanvas(canvasMap, -mapPosX, -mapPosY, zoomWidth, zoomHeight);

          drawPin(canvasMap, pins, movedX, movedY, zoomWidth, zoomHeight);
        }
      }
      // stop any further events
      wait = true;
      // after a fraction of a second, allow events again
      setTimeout(function () {
          wait = false;
      }, 1000 / timesPerSecond);


  }

}

//console.log()
function disableScroll() {
    document.body.classList.add("stop-scrolling");
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}





window.addEventListener("load", init);
