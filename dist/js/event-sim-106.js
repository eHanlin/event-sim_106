$(function() {
  var now = new Date();
  var rootPath = document.getElementById("rootPath").getAttribute("data-value");
  var getBoard = function() {
    var $this = $(this);
    var year = $this.data("year");
    var volume = $this.data("volume");
    var number = $this.data("number");
    Sim.getBoard(year, volume, number);
  };

  var ajaxGet = function(url, param, success, error) {
    return $.ajax({
      type: "GET",
      url: url,
      data: param,
      contentType: "application/json; charset=UTF-8",
      dataType: "json",
      cache: false,
      crossDomain: true,
      success: success,
      error: error
    });
  };

  var blockFunc = function(info) {
    $.blockUI({
      message:
        "<div class='leader-boards'><span class='spanA'>106學年模擬會考 第一次全科1-4冊<br><br>" +
        info +
        "</span>" +
        "<img class='listImgA' src='./img/英雄榜背景.png'>" +
        "</div>",
      css: {
        top: ($(window).height() - 490) / 2 + "px",
        left: ($(window).width() - 790) / 2 + "px",
        border: "1px solid rgb(95, 95, 95)",
        borderRadius: "10%",
        padding: "0px",
        boxShadow: "rgb(135, 135, 135) 0px 0px 8px 2px",
        width: "790",
        height: "490",
        cursor: "default"
      },
      overlayCSS: { backgroundColor: "#000", opacity: "0.4" },
      onOverlayClick: $.unblockUI
    });
  };

  $(".block0 .btnB").on("click", function() {
    console.log("===============> .block0 .btnB <================");
    ajaxGet(
      "https://www.ehanlin.com.tw/sim_106/hero?year=106&volume=7&number=1",
      null,
      function(jsonData) {
        let info;

        for (let index = 0; index < jsonData.length; index++) {
          var userName = jsonData[index].userName;
          var userSchool = jsonData[index].school;

          console.log(jsonData[index].userName);
          console.log(jsonData[index].school);

          let userInfoList = `<span class="number">第${index +
            1}名</span><p class='userList'> ${userName}&nbsp;&nbsp;${userSchool}</p>`;
          info += userInfoList;
          blockFunc(info.replace("undefined", ""));
        }
      },
      function() {}
    );
  });

  Sim.getTermtest(106, "complete", function(schedule) {
    _.each(schedule, function(it, idx) {
      if (now < it.start) {
        $(".block" + idx).append(
          "<span class='btnA'>" +
            "<img src=" +
            rootPath +
            "/img/尚未開始.png></span>" +
            "<span class='btnB'>" +
            "<input type='image' src=" +
            rootPath +
            "/img/尚未公布.png></span>"
        );
      } else if (now > it.start && now < it.end) {
        $(".block" + idx).append(
          "<span class='btnA' href='/key/MOCK106FEXAM/SalesPlans/productSets.html?check=false'>" +
            "<img src=" +
            rootPath +
            "/img/進入擂台.png></span>" +
            "<span class='btnB'>" +
            "<input type='image' src=" +
            rootPath +
            "/img/尚未公布.png></span>"
        );
      } else if (now > it.end && now < it.result) {
        $(".block" + idx).append(
          "<span class='btnA'>" +
            "<img src=" +
            rootPath +
            "/img/比試結束.png></span>" +
            "<span class='btnB'>" +
            "<input type='image' src=" +
            rootPath +
            "/img/尚未公布.png></span>"
        );
      } else if (now > it.result) {
        $(".block" + idx).append(
          "<span class='btnA'>" +
            "<img src=" +
            rootPath +
            "/img/比試結束.png></span>" +
            "<span class='btnB'>" +
            "<input type='image' src=" +
            rootPath +
            "/img/王者排行.png></span>"
        );
      }
    });
  });
});
