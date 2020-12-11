

fetch('data/incidents.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });


  /* mainContainer = div i html, hvor dataen bliver vist. Et forloop til at loope igennem dataen og vise det */
  function appendData(data) {
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.id = "inccident" + i;
    console.log(div)
    div.innerHTML = '<br>' + '<b>incident:</b> ' + '<br>' + '<br>' + '<b>Name:</b> ' + data[i].name + '<br>'
     + '<b>mobil: </b>' + data[i].mobil + '<br>'+ '<b>besked:</b> ' + data[i].besked + '<br>' + '<b>Fagperson:</b> ' + data[i].need + '<br>' + `<canvas id="myCanvas${i}"style="border:1px solid #d3d3d3;"></canvas>` +'<br>' + `<p id="positionX${i}" class="positionsX">${data[i].posX}</p>`+ '<br>' +  `<p id="positionY${i}" class="positionsY"> ${data[i].posY}</p>`+ '<br>' +'<button id="slet" onclick="clickFunc()">Marker som løst</button>' ;
    mainContainer.appendChild(div);

  }

/*document.getElementById("slet").addEventListener = ("click", clickFunc = function () {
console.log(data[3]);

});*/
}
