//import jquery as dependency;
import * as jQuery from "https://code.jquery.com/jquery-3.3.1.min.js";
window.$ = $;
window.jQuery = jQuery;

//page laoding animation;
$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});

//load scripts and stylesheets for components;
function importComponents() {
  let scripts = [
    "https://cdn.jsdelivr.net/npm/muuri@0.9.5/dist/muuri.min.js",
    "https://cdn.jsdelivr.net/npm/web-animations-js@2.3.2/web-animations.min.js",
    "./grid.js",
  ];

  scripts.forEach(function (url) {
    let script = document.createElement("script");
    script.src = url;
    script.async = false;
    document.head.appendChild(script);
  });

}

async function contentRender() {
  let rawData = await $.ajax({ url: "gfw200.csv", dataType: "text" });
  let source = csvToObj(rawData);
  deliver(source);
}
contentRender();
setTimeout(importComponents, 50);

function csvToObj(raw) {
  var arr = raw.split("\n");
  var jsonObj = [];
  var headers = arr[0].split(",");

  for (var i = 1; i < arr.length; i++) {
    var data = arr[i].split(",");
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    jsonObj.push(obj);
  }
  return jsonObj;
}

function deliver(source) {
  var sourceArr = Array.from(source);
  var str = "";
  for (var i = 0; i < sourceArr.length; i++) {
    var name = sourceArr[i].app;
    var cat = sourceArr[i].category;
    var loc = sourceArr[i].region;
    var acc = sourceArr[i].acc
    str += `<div class="item ${acc} ${loc}" data-title="${name}" data-category="${cat}" data-location="${loc}">
    <div class="item-content">${name}</div></div>`;
  }

  var waffle = document.getElementById("grid");
  waffle.innerHTML = str;
}
