//"use strict"

import {Canvas} from './modules/canvas.js';
import {Shape} from './modules/canvas.js';
import {$} from './modules/nQuery.js';
import {aspectRatio} from './modules/nQuery.js';
//import {canvasArrFunc} from '../js/tfScript.js';

let canvasArr;



export var posX;
export var posY;

console.log(posX, posY)


let img;


let imgWidth;
let imgHeight;



//console.log(newWidth);
let newWidth;
let newHeight;
let canvasMap;
let map;

let pins = [];
let pin;

//let canvasArr = []

let canvas = [];

//const context = canvas.getContext('2d');




 export function init (canvasAjax, posXAjax, posYAjax) {
    img = document.getElementById("festivalsplads");
    imgWidth = img.width;
    imgHeight = img.height;

    newWidth = screen.width;
    newHeight = aspectRatio(imgWidth, imgHeight, newWidth);
    //console.log(canvasArr)
      console.log(canvasAjax);
    //console.log(newHeight)
    if (typeof canvasAjax !== 'object' && canvasAjax == null ) {
      canvasArr = canvasAjax
      posX = posXAjax;
      posY = posYAjax;
    } else {
      canvasArr =  Array.from(document.getElementsByTagName("CANVAS"));
      posX = Array.from(document.querySelectorAll(".positionsX"));
      posY = Array.from(document.querySelectorAll(".positionsY"));
    }




    for (var i = 0; i < canvasArr.length; i++) {
      canvasMap = new Canvas(`myCanvas${i}`, "transparent", newHeight, posX[i], posY[i]);
      console.log(posX[i], posY[i])


      drawImageCanvas(canvasMap, canvasMap.mapPosX, canvasMap.mapPosY, newWidth, newHeight);

      canvas.push(canvasMap)
      //console.log(canvas)

      pin = new Shape(canvasMap, canvasMap.pinX, canvasMap.pinY);
      pins.push(pin);

      drawPinInit(canvas[i], pin, posX[i], posY[i])


      //readIncidents()
    }



  for (var i = 0; i < canvasArr.length; i++) {
    canvasArr[i].addEventListener("click", activeCanvas);
    canvasArr[i].addEventListener("dblclick", hittest);
    canvasArr[i].addEventListener("mouseenter", activeCanvas);
    canvasArr[i].addEventListener('wheel', checkScrollDirection, {passive: true});
    canvasArr[i].addEventListener('mousedown', dragging);
    canvasArr[i].addEventListener('mouseup', notDragging);
    canvasArr[i].addEventListener('mousemove', pan);
    canvasArr[i].addEventListener('mouseleave', enableScroll);
    canvasArr[i].addEventListener('mouseenter', disableScroll);
    canvasArr[i].addEventListener('mousemove', disableScroll);
  }
}


let currentCanvas;
function activeCanvas(ev) {
  currentCanvas = this;
  //console.log(currentCanvas)
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  //console.log(`${el} position is ${rect.left},${rect.top}`)
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

if ($("butt") !== null) {
  let submitBtn = $("butt")
  submitBtn.addEventListener("click", calcFinalPinPos);

}



function calcFinalPinPos() {
  let cv = findCanvas(canvas, currentCanvas.id)

  cv.finalPinX = cv.lastPinPosX;
  cv.finalPinY = cv.lastPinPosY;

  finalPinX = cv.finalPinX
  finalPinY = cv.finalPinY

  console.log(cv.finalPinX, cv.finalPinY)
}





function drawImageCanvas (canvas, x, y, width, height) {
   canvas.context.drawImage(img, x, y, width, height);

}


function findCanvas(array, value) {
    for (var i = 0; i < array.length; i++) {
      //console.log(array[i])
        if (array[i].canvas.id == value) {
            return array[i];
        }
    }
    return null;
}

function findIndex(array, value) {
    for (var i = 0; i < array.length; i++) {
      //console.log(array[i])
        if (array[i].canvas.id == value) {
            return i;

        }
    }
    return null;
}





function getMousePos(canvas, ev) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top
    }
}




let clickedCanvas;
let clickedCanvasIndex

function hittest(ev) {

  let cv = findCanvas(canvas, currentCanvas.id)
  let cvIndex = findIndex(canvas, currentCanvas.id)

  if (posX.length == 0 && posY.length == 0) {

  cv = findCanvas(canvas, this.id)
  cvIndex = findIndex(canvas, this.id)
  //console.log(clickedCanvasIndex)

    let mousePos = getMousePos(event.target, ev);
    //console.log(mousePos.x + "," + mousePos.y);
    cv.pinX = mousePos.x;
    cv.pinY = mousePos.y;
    //console.log(cv.pinX, cv.pinY)


    cv.newPinPosX = mousePos.x;
    cv.newPinPosY = mousePos.y;

    cv.lastPinPosX = cv.pinX;
    cv.lastPinPosY = cv.pinY;







    pin = new Shape(cv, cv.pinX, cv.pinY);
    pins.push(pin);



    //cv.clear();
    //cv.prep();

    limitPan(cv)
    drawImageCanvas(cv, -cv.mapPosX, -cv.mapPosY, cv.zoomWidth, cv.zoomHeight);
    drawPin(cv, pins);




    if (pins.length >= 2 ) {

        pins.shift()

    }
  }
}




function drawPin(cv, arr) {

  //cv.clear();
  //cv.prep();


  //cv.zoomHeight = aspectRatio(newWidth, newHeight, cv.zoomWidth);

  //drawImageCanvas(cv, cv.lastPosX, cv.lastPosX, cv.zoomWidth, cv.zoomHeight);

  //console.log(cv.lastPosX, cv.lastPosX, cv.zoomWidth, cv.zoomHeight)


  let cvIndex = findIndex(canvas, currentCanvas.id)
  //console.log(cvIndex);


  if (cv.isPanLimitedX || cv.isPanLimitedX1) {
    cv.movedX = 0;
  } else {
    cv.newPinPosX = cv.lastPinPosX - cv.movedX;
  }

  if (cv.isPanLimitedY || cv.isPanLimitedY1) {
    cv.movedY = 0;
  } else {
    cv.newPinPosY = cv.lastPinPosY - cv.movedY;
  }


  arr[cvIndex].draw(cv.newPinPosX, cv.newPinPosY, cv)


}









function drawPinInit(cv, arr, movedX, movedY, zoomWidth, zoomHeight) {
  if (posX.length !== 0 && posY.length !== 0) {
        arr.draw(movedX.innerHTML, movedY.innerHTML, cv);
  }
}





  function limitPan(cv) {


    if (cv.mapPosX <= 0) {
      cv.isPanLimitedX1 = true;
      //console.log(isPanLimitedX)
      cv.mapPosX = 0;
      //console.log("1")
    }  else {
      cv.isPanLimitedX1 = false
    }
    if (cv.mapPosY <= 0) {
      cv.isPanLimitedY1 = true;
      cv.mapPosY = 0;
      //console.log("2")
    } else {
      cv.isPanLimitedY1 = false
    }

    if (cv.zoomAmount*cv.currentZoom <= cv.mapPosX) {
      cv.isPanLimitedX = true;
      //console.log("3")
      cv.mapPosX = cv.zoomAmount*cv.currentZoom;

    } else {
      cv.isPanLimitedX = false
    }


    if ((cv.zoomAmount*cv.currentZoom) * (imgHeight / imgWidth / 1) <= cv.mapPosY ) {
        cv.isPanLimitedY = true;
      cv.mapPosY = (cv.zoomAmount*cv.currentZoom) * (imgHeight / imgWidth / 1);
      //console.log("4")
    } else {
       cv.isPanLimitedY = false
    }
    //console.log(isPanLimitedX)
}







// Zoom

let scrollDirection;


function checkScrollDirection(event) {

  let can = findCanvas(canvas, currentCanvas.id)
  //console.log(can)

  let mousePos = getMousePos(event.target, canvasMap);
  //console.log(mousePos.x + "," + mousePos.y);
  let x = mousePos.x;
  let y = mousePos.y;
  //disableScroll()

  if (checkScrollDirectionIsUp(event)) {
      can.currentZoom++

    if (can.currentZoom < can.zoomMax) {
      zoomIn(this.id)
      scrollDirection = "zoomIn"
    } else if (can.currentZoom = can.zoomMax) {
      can.currentZoom = 50;
    }
    //console.log(currentZoom)


  } else {
    can.currentZoom--

    if (can.currentZoom >= 0) {
      zoomOut(this.id)
      scrollDirection = "zoomOut"
    } else if (can.currentZoom < 0) {
      can.currentZoom = 0;
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



function zoomIn(cv, x, y) {
  //console.log(zoomWidth)
  //console.log(zoomAmount)

  let can = findCanvas(canvas, cv)
  let canIndex = findIndex(canvas, cv)
  //console.log(cv)

  //console.log(can)
  //console.log(canIndex)

  can.zoomWidth = can.zoomWidth + can.zoomAmount
  //console.log(zoomWidth)
  can.zoomHeight = aspectRatio(newWidth, newHeight, can.zoomWidth);


  //console.log(`W ${can.zoomWidth}, H ${can.zoomHeight}`)


  let mousePos = getMousePos(event.target, event);
  //console.log(mousePos.x)


  limitPan(can)

  can.clear();
  can.prep();


  drawImageCanvas(can, -can.mapPosX, -can.mapPosY, can.zoomWidth, can.zoomHeight);
  drawPinZoom(pins, can)
}




function zoomOut(cv) {

    let can = findCanvas(canvas, cv)
    let canIndex = findIndex(canvas, cv)



    can.zoomWidth = can.zoomWidth - can.zoomAmount
    can.zoomHeight = aspectRatio(newWidth, newHeight, can.zoomWidth);





    let mousePos = getMousePos(event.target, event);
    //console.log(mousePos.x)


    limitPan(can)

    can.clear();
    can.prep();


    drawImageCanvas(can, -can.mapPosX, -can.mapPosY, can.zoomWidth, can.zoomHeight);
    drawPinZoom(pins, can)


}



function drawPinZoom(arr, cv) {

  let cvIndex = findIndex(canvas, currentCanvas.id)


  cv.newPinPosX = cv.getPercent().x * cv.zoomWidth / 100;
  cv.newPinPosY = cv.getPercent().y * cv.zoomHeight / 100;
  //console.log(cv.pinX, cv.pinY)
  //console.log(cv.getPercent().x)


  cv.newPinPosX -= cv.mapPosX
  cv.newPinPosY -= cv.mapPosY

  cv.lastPinPosX = cv.newPinPosX;
  cv.lastPinPosY = cv.newPinPosY;

  //console.log(cv.newPinPosX, cv.newPinPosY)
  arr[cvIndex].draw(cv.newPinPosX, cv.newPinPosY, cv);

  cv.newPinPosX = cv.lastPinPosX;
  cv.newPinPosY = cv.lastPinPosY;
}



// Pan


function dragging(ev) {
  let cv = findCanvas(canvas, currentCanvas.id)

  cv.isDragging = true;
  let mousePos = getMousePos(event.target, ev);

  cv.dragStartPosition = { x: mousePos.x, y: mousePos.y };

}

function notDragging() {
  let cv = findCanvas(canvas, currentCanvas.id)

  cv.isDragging = false;
  cv.lastPosX = cv.mapPosX;
  cv.lastPosY = cv.mapPosY;

  cv.lastPinPosX = cv.newPinPosX;
  cv.lastPinPosY = cv.newPinPosY;

  cv.newPinPosX = cv.lastPinPosX;
  cv.newPinPosY = cv.lastPinPosY;

  //console.log(cv.lastPosX)

}







var timesPerSecond = 30; // how many times to fire the event per second
var wait = false;

function pan(ev) {
  let cv = findCanvas(canvas, currentCanvas.id)

  if (!wait) {
      // fire the event
      if (cv.isDragging) {
        if (cv.zoomWidth > newWidth) {

          cv.clear();
          cv.prep();
          let mousePos = getMousePos(event.target, ev);
          //console.log(mousePos.x)


          cv.movedX = (cv.dragStartPosition.x - mousePos.x)
          cv.movedY = (cv.dragStartPosition.y - mousePos.y)
          //console.log(`${mousePos.x}, ${mousePos.y}`)

          cv.newPosX = cv.lastPosX + cv.movedX;
          cv.newPosY = cv.lastPosY + cv.movedY;

            //console.log(`${cv.newPosX}, ${cv.newPosY}`)

          cv.mapPosX = cv.newPosX;
          cv.mapPosY = cv.newPosY;




          limitPan(cv)

          drawImageCanvas(cv, -cv.mapPosX, -cv.mapPosY, cv.zoomWidth, cv.zoomHeight);

          drawPin(cv, pins);
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

export let finalPinX;
export let finalPinY;



window.addEventListener("load", init);
