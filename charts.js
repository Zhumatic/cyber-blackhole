//import jquery
import * as jQuery from "https://code.jquery.com/jquery-3.3.1.min.js";
window.$ = $;
window.jQuery = jQuery;

$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});

$.ajax({
  url: "gfw200.csv",
  dataType: "text",
}).done(createCharts);

function createCharts(data) {
  //parse csv file to array of objects
  let arr = data.split("\n");
  let objs = [];
  let headers = arr[0].split(",");
  for (var i = 1; i < arr.length; i++) {
    var data = arr[i].split(",");
    var obj = {};
    for (var j = 0; j < data.length; j++) {
      obj[headers[j].trim()] = data[j].trim();
    }
    objs.push(obj);
  }

  //count sites by language
  let muNum = 0;
  let zhNum = 0;
  let engNum = 0;
  let koNum = 0;
  let idlNum = 0;
  let rulNum = 0;
  let faNum = 0;
  let jalNum = 0;
  let ptNum = 0;
  let arNum = 0;
  for (const site of objs) {
    switch (site.lang) {
      case "mu":
        muNum += 1;
        break;
      case "zh":
        zhNum += 1;
        break;
      case "en":
        engNum += 1;
        break;
      case "ko":
        koNum += 1;
        break;
      case "id":
        idlNum += 1;
        break;
      case "ru":
        rulNum += 1;
        break;
      case "fa":
        faNum += 1;
        break;
      case "ja":
        jalNum += 1;
        break;
      case "pt":
        ptNum += 1;
        break;
      case "ar":
        arNum += 1;
    }
  }

  //count number of sites operated by Chinese company
  let cnNum = 0;
  for (const site of objs) {
    if (site.acc === "c") cnNum += 1;
  }

  //count number of foreign sites avaible for access
  let avaNum = 0;
  for (const site of objs) {
    if (site.acc === "a") avaNum += 1;
  }

  //calculate number of sites have limited access
  let limAcc = objs.length - cnNum - avaNum;

  //calculate limited access sites by category

  let limiArr = objs.filter(function (item) {
    if (item.acc === "b" || item.acc === "s" || item.acc === "p") {
      return true;
    } else {
      return false;
    }
  });

  let portalNum = 0;
  let sharingNum = 0;
  let tradingNum = 0;
  let comNum = 0;
  let enNum = 0;
  let newsNum = 0;
  let utiNum = 0;
  let illegalNum = 0;

  for (const site of limiArr) {
    switch (site.category) {
      case "portal":
        portalNum += 1;
        break;
      case "sharing":
        sharingNum += 1;
        break;
      case "trading":
        tradingNum += 1;
        break;
      case "commercial":
        comNum += 1;
        break;
      case "entertainment":
        enNum += 1;
        break;
      case "newswire":
        newsNum += 1;
        break;
      case "utility":
        utiNum += 1;
        break;
      case "illegal":
        illegalNum += 1;
    }
  }

  //calculate sites of limited access by based region

  let usNum = 0;
  let ruNum = 0;
  let euNum = 0;
  let jpNum = 0;
  let ukNum = 0;

  for (const site of limiArr) {
    switch (site.region) {
      case "us":
        usNum += 1;
        break;
      case "ru":
        ruNum += 1;
        break;
      case "eu":
        euNum += 1;
        break;
      case "jp":
        jpNum += 1;
        break;
      case "uk":
        ukNum += 1;
    }
  }

  //calculate foreign sites with unrestricted access
  let avaArr = objs.filter(function (item) {
    if (item.acc === "a") {
      return true;
    } else {
      return false;
    }
  });

  let portalNuma = 0;
  let sharingNuma = 0;
  let tradingNuma = 0;
  let comNuma = 0;
  let enNuma = 0;
  let newsNuma = 0;
  let utiNuma = 0;
  let illegalNuma = 0;

  for (const site of avaArr) {
    switch (site.category) {
      case "portal":
        portalNuma += 1;
        break;
      case "sharing":
        sharingNuma += 1;
        break;
      case "trading":
        tradingNuma += 1;
        break;
      case "commercial":
        comNuma += 1;
        break;
      case "entertainment":
        enNuma += 1;
        break;
      case "newswire":
        newsNuma += 1;
        break;
      case "utility":
        utiNuma += 1;
        break;
      case "illegal":
        illegalNuma += 1;
    }
  }

  let usNuma = 0;
  let ruNuma = 0;
  let euNuma = 0;
  let jpNuma = 0;
  let ukNuma = 0;
  let idNuma = 0;
  let brNuma = 0;
  for (const site of avaArr) {
    switch (site.region) {
      case "us":
        usNuma += 1;
        break;
      case "ru":
        ruNuma += 1;
        break;
      case "eu":
        euNuma += 1;
        break;
      case "jp":
        jpNuma += 1;
        break;
      case "uk":
        ukNuma += 1;
        break;
      case "id":
        idNuma += 1;
        break;
      case "br":
        brNuma += 1;
    }
  }

  //create charts using chart.js library
  const pie = document.getElementById("pieChart");
  const myChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: [
        "Chinese Websites",
        "Accessible Websites",
        "Websites with Limited Access",
      ],
      datasets: [
        {
          label: "# of Sites",
          data: [cnNum, avaNum, limAcc],
          backgroundColor: ["#3493eb", "#109166", "#eb4934"],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Overview of Web Service Accessibility within Mainland China",
        },
      },
    },
  });

  const bar = document.getElementById("barChart");
  const barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Portal",
        "Sharing",
        "Trading",
        "Commercial",
        "Entertainment",
        "Newswire",
        "Utility",
        "Illegal",
      ],
      datasets: [
        {
          label: "# of sites",
          backgroundColor: [
            "#383ea6",
            "#38728c",
            "#388c58",
            "#6f8c38",
            "#913c4d",
            "#917d3c",
            "#3c5491",
            "#400d0d",
          ],
          data: [
            portalNum,
            sharingNum,
            tradingNum,
            comNum,
            enNum,
            newsNum,
            utiNum,
            illegalNum,
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Foreign Web Service of Limited Access - by Category",
        },
      },
    },
  });

  const bar2 = document.getElementById("barChart2");
  const barChart2 = new Chart(bar2, {
    type: "bar",
    data: {
      labels: [
        "United States",
        "Russia",
        "Europe Union",
        "Japan",
        "United Kingdom",
      ],
      datasets: [
        {
          label: "# of sites",
          backgroundColor: [
            "#6f8c38",
            "#913c4d",
            "#917d3c",
            "#3c5491",
            "#400d0d",
          ],
          data: [usNum, ruNum, euNum, jpNum, ukNum],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Foreign Web Service of Limited Access - by Region",
        },
      },
    },
  });

  const bar3 = document.getElementById("barChart3");
  const barChart3 = new Chart(bar3, {
    type: "bar",
    data: {
      labels: [
        "Portal",
        "Sharing",
        "Trading",
        "Commercial",
        "Entertainment",
        "Newswire",
        "Utility",
        "Illegal",
      ],
      datasets: [
        {
          label: "# of sites",
          backgroundColor: [
            "#383ea6",
            "#38728c",
            "#388c58",
            "#6f8c38",
            "#913c4d",
            "#917d3c",
            "#3c5491",
            "#400d0d",
          ],
          data: [
            portalNuma,
            sharingNuma,
            tradingNuma,
            comNuma,
            enNuma,
            newsNuma,
            utiNuma,
            illegalNuma,
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Foreign Web Service of Unrestricted Access - by Category",
        },
      },
    },
  });

  const bar4 = document.getElementById("barChart4");
  const barChart4 = new Chart(bar4, {
    type: "bar",
    data: {
      labels: [
        "United States",
        "Russia",
        "Europe Union",
        "Indonesia",
        "Brazil",
      ],
      datasets: [
        {
          label: "# of sites",
          backgroundColor: [
            "#6f8c38",
            "#913c4d",
            "#917d3c",
            "#38728c",
            "#388c58",
          ],
          data: [usNuma, ruNuma, euNuma, idNuma, brNuma],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Foreign Web Service of Unrestricted Access - by Region",
        },
      },
    },
  });

//   let muNum = 0;
//   let zhNum = 0;
//   let engNum = 0;
//   let koNum = 0;
//   let idlNum = 0;
//   let rulNum = 0;
//   let faNum = 0;
//   let jalNum = 0;
//   let ptNum = 0;
//   let arNum = 0;

  const doughnut = document.getElementById("doughnut");
  const doughnutChart = new Chart(doughnut, {
    type: "doughnut",
    data: {
      labels: [
        "Multi Language",
        "Chinese",
        "English",
        "Korean",
        "Indonesian",
        "Russian",
        "Persian",
        "Japanese",
        "Portuguese",
        "Arabic"
      ],
      datasets: [
        {
          label: "# of sites",
          backgroundColor: [
            "#cc9439",
            "#917d3c",
            "#3987cc",
            "#38728c",
            "#388c58",
            "#6f8c38",
            "#913c4d",
            "#cc395b",
            "#420f57",
            "#35422a",
          ],
          data: [muNum, zhNum, engNum, koNum, idlNum, rulNum, faNum, jalNum, ptNum, arNum],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "World's 200 Most Visited Web Service - by Language",
        },
      },
    },
  });

}
