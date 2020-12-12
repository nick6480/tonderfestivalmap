import {$} from './nQuery.js';
import {aspectRatio} from './nQuery.js';

let newWidth = screen.width;
let newHeight = 0





export class Canvas {
    constructor(canvasId, color, newHeight, pinX, pinY) {
        this.canvas = $(canvasId);
        this.context = this.canvas.getContext("2d");
        this.color = color;

        this.canvas.width = screen.width;
        this.canvas.height = newHeight;


        // Position
        this.mapPosX = 0
        this.mapPosY = 0

        this.lastPosX = 0
        this.lastPosY = 0

        this.newPosX = 0
        this.newPosY = 0



        // Zoom
        this.currentZoom = 0;
        this.lastZoom = 0;
        this.zoomMax = 50;
        this.zoomAmount = 125;

        this.zoomWidth = newWidth;
        this.zoomHeight;
        this.newHeight;

        // Pan
        this.isDragging = false;
        this.dragStartPosition = { x: 0, y: 0 };

        this.movedX = 0;
        this.movedY = 0;


        this.isPanLimitedX1 = false;
        this.isPanLimitedY1 = false;
        this.isPanLimitedX = false;
        this.isPanLimitedY = false;









        // Pin position
        this.pinX = parseFloat(pinX.innerHTML);
        this.pinY = parseFloat(pinY.innerHTML);


        this.newPinPosX = this.pinX;
        this.newPinPosY = this.pinY;


        this.lastPinPosX = this.newPinPosX;
        this.lastPinPosY = this.newPinPosY;;


        this.percentX = this.pinX / this.getWidth() * 100
        this.percentY = this.pinY / this.getHeight() * 100



        this.prep();
    }
    prep() {
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    getContext() {
        return this.context;
    }
    getHeight() {
        return this.canvas.height;
    }
    getWidth() {
        return this.canvas.width;
    }




};


export class Shape {
    constructor(cv, x, y, width, height) {
         this.ctx = cv.context;
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
        //  this.ctx.beginPath();
        //  this.ctx.rect(x, y, 150, 100);
      //    this.ctx.stroke();


          this.ctx.save();
          this.ctx.translate(x,y);
          this.ctx.beginPath();
          this.ctx.moveTo(0,0);
          this.ctx.bezierCurveTo(2,-10,-20,-25,0,-30);
          this.ctx.bezierCurveTo(20,-25,-2,-10,0,0);
          this.ctx.fillStyle= "red";
          this.ctx.fill();
          this.ctx.strokeStyle="black";
          this.ctx.lineWidth=1.5;
          this.ctx.stroke();
          this.ctx.beginPath();
          this.ctx.arc(0,-21,3,0,Math.PI*2);
          this.ctx.closePath();

          this.ctx.fillStyle="black";
          this.ctx.fill();

          this.ctx.restore();


    }

    draw(x, y, cv) {
      this.ctx = cv.context;
      this.x = x;
      this.y = y;

      this.ctx.save();
      this.ctx.translate(x,y);
      this.ctx.beginPath();
      this.ctx.moveTo(0,0);
      this.ctx.bezierCurveTo(2,-10,-20,-25,0,-30);
      this.ctx.bezierCurveTo(20,-25,-2,-10,0,0);
      this.ctx.fillStyle= "red";
      this.ctx.fill();
      this.ctx.strokeStyle="black";
      this.ctx.lineWidth=1.5;
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(0,-21,3,0,Math.PI*2);
      this.ctx.closePath();

      this.ctx.fillStyle="black";
      this.ctx.fill();

      this.ctx.restore();


    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
};
