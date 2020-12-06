"use strict"

import {Canvas} from './modules/canvas.js';
import {Shape} from './modules/canvas.js';
import {$} from './modules/nQuery.js';


const img = document.getElementById("festivalsplads");
const pinImg = document.getElementById("pin");

let mapPosX = 0
let mapPosY = 0

let pinPosX;
let pinPosY;


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
    let imgWidth = img.width;
    let imgHeight = img.height;
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

      pin = new Shape(canvasMap, pinPosX, pinPosY, 20, 20);

      pins.push(pin);

      //repeater(canvasMap, pins);
      drawPin(canvasMap, pins);
    }
}

function drawImageCanvas (canvas, x, y, width, height) {
   canvas.context.drawImage(img, x, y, width, height);

   if (pin !== undefined) {
     drawPin(canvas, pins)
   }

  //repeater(canvas, pins);
  // console.log(pin)

}


let newPinPosX = pinPosX;
let newPinPosY = pinPosY;



function drawPin (canvas, arr) {



  newPinPosX = pinPosX - movedX;
  newPinPosY = pinPosY - movedY;

  //console.log(newPosX)

  newPinPosX;
  newPinPosY;


  if (pins.length >= 2 ) {
  
        canvas.clear();
        canvas.prep();
        pins = []
        arr.shift()
        console.log(pins)

        for (let shape of arr) {
            shape.draw(newPinPosX, newPinPosY);
            console.log(pins)
        }


  }else {
    for (let shape of arr) {
        shape.draw(newPinPosX, newPinPosY);
    }
  }

  //pin.draw(newPinPosX, newPinPosY);
  //console.log(pin)
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




function sizeTest() {
  let ogSizeW = 200;
  let ogSizeH = 100;

  let ogPosX = 10;
  let ogPosY = 10



  let newSizeW = 500;
  let newSizeH = 250;



  let wd = newSizeW / ogSizeW;
  let hd = newSizeW / ogSizeW;


  //console.log(wd)
  //console.log(hd)

  let newPosX = ogPosX*wd;
  let newPosY = ogPosX*wd

  //console.log(newPosX)
  //console.log(newPosY)
}

sizeTest()


let redraw = function (cv, arr) {

//console.log(pins)

  if (pins.length >= 2 ) {

        //drawImageCanvas(cv, mapPosX, mapPosY,newWidth, newHeight);
        cv.clear();
        cv.prep();
        pins = []
        console.log(pins)

        for (let shape of arr) {
            shape.draw();
            //console.log(shapes)
        }


  }else {
    for (let shape of arr) {
        shape.draw();
    }
  }
}

let repeater = function (cv, arr) {
    // if this is an animation build a setInterval loop here
    // if not, just draw
    redraw(cv, arr);
}






// Zoom







let currentZoom = 0;
let zoomMax = 50;



canvas.addEventListener('wheel', checkScrollDirection, {passive: true});
canvas.addEventListener('mousedown', dragging);
canvas.addEventListener('mouseup', notDragging);
canvas.addEventListener('mousemove', pan);
let scrollDirection;

function checkScrollDirection(event) {
  let mousePos = getMousePos(event.target, canvasMap);
  //console.log(mousePos.x + "," + mousePos.y);
  let x = mousePos.x;
  let y = mousePos.y;
  disableScroll()
  if (checkScrollDirectionIsUp(event)) {
    currentZoom++
    if (currentZoom < zoomMax) {
      zoomIn(x, y)

    } else if (currentZoom = zoomMax) {
      currentZoom = 50;
    }
    //console.log(currentZoom)


  } else {
    currentZoom--
    if (currentZoom >= 0) {
      zoomOut(x, y)

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
  zoomWidth = zoomWidth + 100
  zoomHeight = aspectRatio(newWidth, newHeight, zoomWidth);



  canvasMap.clear();
  canvasMap.prep();

  drawImageCanvas(canvasMap, -mapPosX, -mapPosY, zoomWidth, zoomHeight);
}


function zoomOut() {
  if (zoomWidth > newWidth) {
    zoomWidth = zoomWidth - 100
    zoomHeight = aspectRatio(newWidth, newHeight, zoomWidth);


    canvasMap.clear();
    canvasMap.prep();

    drawImageCanvas(canvasMap, -mapPosX, -mapPosY, zoomWidth, zoomHeight);
  }

}


let isDragging = false;
let dragStartPosition = { x: 0, y: 0 };
let currentTransformedCursor;


let lastPosX = mapPosX;
let lastPosY = mapPosY;





function getTransformedPoint(x, y) {
	const transform = context.getTransform();
  const inverseZoom = 1 / transform.a;

  const transformedX = inverseZoom * x - inverseZoom * transform.e;
  const transformedY = inverseZoom * y - inverseZoom * transform.f;
  return { x: transformedX, y: transformedY };
}






function dragging(ev) {
  isDragging = true;
  let mousePos = getMousePos(event.target, ev);

  dragStartPosition = { x: mousePos.x, y: mousePos.y };
}

function notDragging() {
  isDragging = false;
  lastPosX = mapPosX;
  lastPosY = mapPosY;
  //console.log(lastPosX)

}

let newPosX = mapPosX;
let newPosY = mapPosY;

let movedX = 0;
let movedY = 0;


function pan(ev) {
  currentTransformedCursor = getTransformedPoint(event.offsetX, event.offsetY);
  //console.log(`Original X: ${event.offsetX}, Y: ${event.offsetY}`)
  //console.log(`Transformed X: ${currentTransformedCursor.x}, Y: ${currentTransformedCursor.y}`);

  if (isDragging) {
    if (zoomWidth > newWidth) {



      canvasMap.clear();
      canvasMap.prep();
      let mousePos = getMousePos(event.target, ev);
      //console.log(mousePos.x)



      //let movedX = mousePos.x - dragStartPosition.x

      movedX = (dragStartPosition.x - mousePos.x)
      movedY = (dragStartPosition.y - mousePos.y)


      //console.log(`moved ${movedX}, ${movedY}`)
      //let movedY = mousePos.y - dragStartPosition.y


      newPosX = lastPosX + movedX;
      newPosY = lastPosY + movedY;

      //console.log(newPosX)

      mapPosX = newPosX;
      mapPosY = newPosY;


/*
      if (mapPosX < 0) {
        mapPosX = 0;
      }
      if (mapPosY < 0) {
        mapPosY = 0;
      }
      if (mapPosY > newWidth) {
        mapPosY = 0;
      }
      if (mapPosY > newHeight) {
        mapPosY = 0;
      }
*/
      //console.log(`start ${dragStartPosition.x}, ${dragStartPosition.y}`)

      //console.log(`new ${mousePos.x}, ${mousePos.y}`)


      //console.log(`mappos ${mapPosX}, ${mapPosY}`)

      //console.log(mapPosX)


      drawImageCanvas(canvasMap, -mapPosX, -mapPosY, zoomWidth, zoomHeight);

      //drawPin()
    }
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
