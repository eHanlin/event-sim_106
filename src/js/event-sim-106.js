$(function() {
  var now = new Date();
  var getBoard = function() {
    var $this = $(this);
    var year = $this.data("year");
    var volume = $this.data("volume");
    var number = $this.data("number");
    Sim.getBoard(year, volume, number);
  };

  Sim.getTermtest(106, "complete", function(schedule) {
    _.each(schedule, function(it, idx) {
      if (now < it.start) {
        $(".block" + idx).append(
          "<a class='btnA'>" +
            "<img src=" +
            rootPath +
            "'/img/尚未開始.png'></a>" +
            "<a class='btnB'>" +
            "<img src=" +
            rootPath +
            "'/img/尚未公布.png'></a>"
        );
      } else if (now > it.start && now < it.end) {
        $(".block" + idx).append(
          "<a class='btnA' href='/key/MOCK106FEXAM/SalesPlans/productSets.html?check=false'>" +
            "<img src=" +
            rootPath +
            "'/img/進入擂台.png'></a>" +
            "<a class='btnB'>" +
            "<img src=" +
            rootPath +
            "'/img/尚未公布.png'></a>"
        );
      } else if (now > it.end && now < it.result) {
        $(".block" + idx).append(
          "<a class='btnA'>" +
            "<img src=" +
            rootPath +
            "'/img/比試結束.png'></a>" +
            "<a class='btnB'>" +
            "<img src=" +
            rootPath +
            "'/img/尚未公布.png'></a>"
        );
      } else if (now > it.result) {
        $(".block" + idx).append(
          "<a class='btnA'>" +
            "<img src=" +
            rootPath +
            "'/img/比試結束.png'></a>" +
            "<a class='btnB'>" +
            "<img src=" +
            rootPath +
            "'/img/王者排行.png'></a>"
        );
      }
    });
  });
});
