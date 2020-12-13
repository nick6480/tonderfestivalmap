let mainContainer;
let incidents = [];

let a;


import {init} from '../map/festivalmap.js';











//Wait to run your initialization code until the DOM is fully loaded. This is needed
// when wanting to access elements that are later in the HTML than the <script>.
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', afterLoaded);
} else {
    //The DOMContentLoaded event has already fired. Just run the code.
    afterLoaded();
}

function afterLoaded() {
  mainContainer = document.getElementById("myData");
  //console.log(mainContainer)

}





const readIncidents = function () {
        // læs m ajax
        let oReq = new XMLHttpRequest();
        oReq.addEventListener("load", function () {
            if (this.responseText.length > 0)
                incidents = JSON.parse(this.responseText); // get and objectify


                hasLoaded(incidents)

        });
        oReq.open("GET", "./getIncidents.php");
        oReq.send();
    };

    function hasLoaded(incidents) {
      a = incidents
      generateePage(a);
      canvasArrFunc()
      let canvasArr =  Array.from(document.getElementsByTagName("CANVAS"));
      let posX = Array.from(document.querySelectorAll(".positionsX"));
      let posY = Array.from(document.querySelectorAll(".positionsY"));

      init(canvasArr, posX, posY)

      console.log(canvasArr)

      //console.log(a)
    }


export function canvasArrFunc() {
      return
    }













    function clickFunc(i) {
        removeFromPage(i, a)
        };


    const doThis = function () {
        headAndShoulders('Receive');
        feet(2020);
        readIncidents();
    };


    window.addEventListener('load', doThis);




    function generateePage(incidents) {
      for (var i = 0; i < incidents.length; i++) {
          //console.log(incidents)


          var div = document.createElement("div");
          div.id = "incident" + i;
          //console.log(div.id);
          div.innerHTML = '<b>incident:</b> ' + '<br>' + '<br>' + '<b>Name:</b> ' + incidents[i].name + '<br>'+'<b>mobil: </b>' + incidents[i].mobil + '<br>'+'<b>besked:</b> ' + incidents[i].besked + '<br>' +'<b>Fagperson:</b> ' + incidents[i].need + '<br>' +`<canvas id="myCanvas${i}"style="border:1px solid #d3d3d3;"></canvas>` +'<br>' +`<p id="positionX${i}" class="positionsX">${incidents[i].posX}</p>`+ '<br>' +`<p id="positionY${i}" class="positionsY"> ${incidents[i].posY}</p>`+ '<br>' +'<button id="slet" onclick="clickFunc()">Marker som løst</button>' ;


          mainContainer.appendChild(div);

      }
    }


    function removeFromPage(i, incidents) {
      incidents.splice(i, 1);

      removeFromJSON(i, incidents)

      //console.log(incidents)



      while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.lastChild);
      }

        generateePage(incidents)
    }

let hentet2 = [];

function saveArr(arr) {
  let hentet = arr;
  //console.log(hentet)
  return hentet;
}

function removeFromJSON(i, incidents, e) {
  //e.preventDefault();
  // læs m ajax

  let iReq = new XMLHttpRequest();
  iReq.addEventListener("load", function () {
    let hentet = [];
    //console.warn(iReq.responseText)


     if (this.responseText.length > 0)
          hentet = JSON.parse(this.responseText); // get and objectify
        let hentet2 = saveArr(hentet)
      //console.log(i)
      let b = {
          a: "A",
          b: "B",
          c: "C",
          d: "D",
      };


      hentet.push(b)
      let asd = JSON.stringify(hentet);


      var f = document.createElement("form");
      f.setAttribute('action',"./receiveAndStore.php");
      f.setAttribute('method',"post");

      //var textNode = document.createTextNode(asd);
      //console.log(asd)
      //f.appendChild(textNode);

      document.body.appendChild(f);
      //console.log(f)
      f.submit();








  });
  iReq.open("GET", "./getIncidents.php");
  iReq.send();
}
