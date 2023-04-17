// ==UserScript==
// @name         GM-map
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        https://www.geocaching.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stackoverflow.com
// @updateURL    https://gitlab.com/herrFamaxe/src/raw/main/GM-map.js
// @downloadURL  https://gitlab.com/herrFamaxe/src/raw/main/GM-map.js
// ==/UserScript==

var koordinater;
var kLatDec;
var kLonDec;
var ix1;
var ix2;

// Hämtar koordinaterna
koordinater = document.getElementById('uxLatLon').textContent;
koordinater = koordinater.replace(/°/g,'');
koordinater = koordinater.replace(' E ',', E').replace(' W ',', W')
koordinater = koordinater.replace('E0','E').replace('W0','W')
koordinater = koordinater.replace('N ','N').replace('S ','S')

// Konverterar koordinaterna till dec-format
ix1 = koordinater.indexOf(',')
if (ix1 > 0) {
    kLatDec = koordinater.substring(1, ix1);
    kLonDec = koordinater.substring(ix1+3, koordinater.length);
    ix2 = kLatDec.indexOf(' ')
    if (ix2 > 0) {
        kLatDec = (parseInt(kLatDec.substring(0,ix2+1)) + parseFloat(kLatDec.substring(ix2+1,ix2+7) / 60)).toFixed(6);
    }
    ix2 = kLonDec.indexOf(' ')
    if (ix2 > 0) {
        kLonDec = (parseInt(kLonDec.substring(0,ix2+1)) + parseFloat(kLonDec.substring(ix2+1,ix2+7) / 60)).toFixed(6);
    }
    if (koordinater.substr(0,1) == 'S') {
        kLatDec = kLatDec * -1;
    }
    if (koordinater.substr(ix1+2,1) == 'W') {
        kLonDec = kLonDec * -1;
    }
}

// Skapar google-maps länk
var googleUrl = "<a href='https://maps.google.com/?z=5&q=" + kLatDec + ',' + kLonDec + "' title='Länk till Google Maps' target='_blank'>" + kLatDec + "," + kLonDec + "</a>";

//var zNode       = document.createElement ('button');
//zNode.innerHTML = googleUrl;
//zNode.onclick = function()
//{
//    alert("hello, world");
//}

var clDiv = document.getElementById('ctl00_ContentBody_LocationSubPanel');
clDiv.innerHTML = googleUrl;

//document.getElementById("ctl00_ContentBody_LocationSubPanel").appendChild(zNode);
