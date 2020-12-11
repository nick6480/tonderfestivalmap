//"use strict"

import {Canvas} from './modules/canvas.js';
import {Shape} from './modules/canvas.js';
import {$} from './modules/nQuery.js';
import {aspectRatio} from './modules/nQuery.js';
//import {canvasArrFunc} from '../js/tfScript.js';

let canvasArr =  Array.from(document.getElementsByTagName("CANVAS"));


var posX = Array.from(document.querySelectorAll(".positionsX"));
var posY = Array.from(document.querySelectorAll(".positionsY"));

//console.log(posX)
//console.log(posY)


let img;


let imgWidth;
let imgHeight;

let hasInit;

let pinsPos = []

export let pinPosX;
export let pinPosY;

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

//let canvasArr = []

let canvas = [];

//const context = canvas.getContext('2d');








 function init () {
    img = document.getElementById("festivalsplads");
    imgWidth = img.width;
    imgHeight = img.height;
    newHeight = aspectRatio(imgWidth, imgHeight, newWidth);
    //console.log(canvasArr)

    //console.log(newHeight)


    for (var i = 0; i < canvasArr.length; i++) {
      canvasMap = new Canvas(`myCanvas${i}`, "transparent", newHeight);
      canvasMap.canvas.addEventListener("dblclick", hittest);
      canvasMap.canvas.pinX = posX[i];
      canvasMap.canvas.pinY = posY[i];


      drawImageCanvas(canvasMap, canvasMap.mapPosX, canvasMap.mapPosY, newWidth, newHeight);

      canvas.push(canvasMap)

      pin = new Shape(canvasMap, canvasMap.pinX, canvasMap.pinY);
      pins.push(pin);

      drawPinInit(canvas[i], pin, posX[i], posY[i])



    }
    hasInit = true;





    //console.log(canvas)
}


for (var i = 0; i < canvasArr.length; i++) {
  canvasArr[i].addEventListener("click", activeCanvas);
  canvasArr[i].addEventListener("mouseenter", activeCanvas);
  //console.log(canvasArr[i])


  canvasArr[i].addEventListener('wheel', checkScrollDirection, {passive: true});
  canvasArr[i].addEventListener('mousedown', dragging);
  canvasArr[i].addEventListener('mouseup', notDragging);
  canvasArr[i].addEventListener('mousemove', pan);
  canvasArr[i].addEventListener('mouseleave', enableScroll);
  canvasArr[i].addEventListener('mouseenter', disableScroll);


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

  if (posX.length == 0 && posY.length == 0) {

  clickedCanvas = findCanvas(canvas, this.id)
  clickedCanvasIndex = findIndex(canvas, this.id)
  //console.log(clickedCanvasIndex)

    let mousePos = getMousePos(event.target, ev);
    //console.log(mousePos.x + "," + mousePos.y);
    pinPosX = mousePos.x;
    pinPosY = mousePos.y;



    newPinPosX = mousePos.x;
    newPinPosY = mousePos.y;

    lastPinPosX = pinPosX;
    lastPinPosY = pinPosY;


    //console.log(`${pinPosX}, ${pinPosY}`)
    pin = new Shape(clickedCanvas, pinPosX, pinPosY, 20, 20);

    pins.push(pin);
    //console.log(pins)
    //repeater(canvasMap, pins);
    drawPin(clickedCanvas, pins, clickedCanvasIndex);
  }


}

function drawPinInit(cv, arr, movedX, movedY, zoomWidth, zoomHeight) {
  if (posX.length !== 0 && posY.length !== 0) {
        arr.draw(movedX.innerHTML, movedY.innerHTML, cv);
  }
}


function drawPin (cv, arr, movedX, movedY, zoomWidth, zoomHeight) {



    if (cv.isPanLimitedX || cv.isPanLimitedX1) {
      movedX = 0;
    } else {
      newPinPosX = lastPinPosX - movedX;
    }

    if (cv.isPanLimitedY || cv.isPanLimitedY1) {
      movedY = 0;
    } else {
      newPinPosY = lastPinPosY - movedY;
    }



if (posX.length == 0 && posY.length == 0) {

  if (pins.length >= 2 ) {

          cv.clear();
          cv.prep();
          pins = []
          arr.shift()
          //console.log(pins)

  for (var i = 0; i < arr.length; i++) {
    arr[i].draw(newPinPosX, newPinPosY, cv);
  }
          for (let shape of arr) {
              shape.draw(newPinPosX, newPinPosY, cv);
              //console.log(pins)
          }

    }else {
      for (let shape of arr) {
          shape.draw(newPinPosX, newPinPosY, cv);
      }
    }
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


/*
function drawPinZoomIn(arr, cv) {



  newPinPosX += cv.zoomAmount / cv.currentZoom
  newPinPosY += cv.zoomAmount / cv.currentZoom
    //console.log(`${newPinPosX}, ${newPinPosY}`)

    lastPinPosX = newPinPosX
    lastPinPosY = newPinPosY

  for (var i = 0; i < arr.length; i++) {
    arr[i].draw(newPinPosX, newPinPosY);
  }

}


function drawPinZoomOut(arr, cv) {

  mapPosX = mapPosX + zoomAmount / currentZoom
  mapPosY = mapPosY + zoomAmount / currentZoom

  //console.log(`${mapPosX}, ${mapPosY}`)

  newPinPosX -= zoomAmount/100 * currentZoom
  newPinPosY -= zoomAmount/100 * currentZoom
  //console.log(`${newPinPosX}, ${newPinPosY}`)

  lastPinPosX = newPinPosX
  lastPinPosY = newPinPosY

  for (let shape of arr) {
      shape.draw(newPinPosX, newPinPosY);
      //console.log(pins)
  }
}

*/











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

}




function zoomOut(cv) {

    let can = findCanvas(canvas, cv)
    let canIndex = findIndex(canvas, cv)
    //console.log(cv)

    //console.log(can)
    //console.log(canIndex)

    can.zoomWidth = can.zoomWidth - can.zoomAmount
    //console.log(zoomWidth)
    can.zoomHeight = aspectRatio(newWidth, newHeight, can.zoomWidth);


    //console.log(`W ${can.zoomWidth}, H ${can.zoomHeight}`)


    let mousePos = getMousePos(event.target, event);
    //console.log(mousePos.x)


    limitPan(can)

    can.clear();
    can.prep();


    drawImageCanvas(can, -can.mapPosX, -can.mapPosY, can.zoomWidth, can.zoomHeight);
    


}








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

    //lastPinPosX = newPinPosX;
    //lastPinPosY = newPinPosY;

  //console.log(lastPosX)

}







var timesPerSecond = 30; // how many times to fire the event per second
var wait = false;

function pan(ev) {
  let cv = findCanvas(canvas, currentCanvas.id)
  console.log(cv)
  // Throttle
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
          console.log(`${mousePos.x}, ${mousePos.y}`)

          cv.newPosX = cv.lastPosX + cv.movedX;
          cv.newPosY = cv.lastPosY + cv.movedY;

            console.log(`${cv.newPosX}, ${cv.newPosY}`)

          cv.mapPosX = cv.newPosX;
          cv.mapPosY = cv.newPosY;




          limitPan(cv)

          drawImageCanvas(cv, -cv.mapPosX, -cv.mapPosY, cv.zoomWidth, cv.zoomHeight);

          drawPin(cv, pins, cv.movedX, cv.movedY, cv.zoomWidth, cv.zoomHeight);
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
