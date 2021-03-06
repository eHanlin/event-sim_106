$(function () {
  var now = new Date()
  var rootPath = `https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/event-sim_106`
  var getBoard = function () {
    var $this = $(this)
    var year = $this.data('year')
    var volume = $this.data('volume')
    var number = $this.data('number')
    Sim.getBoard(year, volume, number)
  }

  var ajaxGet = function (url, param, success, error) {
    return $.ajax({
      type: 'GET',
      url: url,
      data: param,
      contentType: 'application/json; charset=UTF-8',
      dataType: 'json',
      cache: false,
      crossDomain: true,
      success: success,
      error: error
    })
  }

  var blockFunc = function (info) {
    $.blockUI({
      message: "<div class='leader-boards'><span class='spanA'>106學年模擬會考 第一次全科1-4冊<br><br>" +
        info +
        '</span>' +
        "<img class='listImgA' src='" +
        rootPath +
        "/img/英雄榜背景.png'>" +
        '</div>',
      css: {
        top: ($(window).height() - 490) / 2 + 'px',
        left: ($(window).width() - 790) / 2 + 'px',
        border: '1px solid rgb(95, 95, 95)',
        borderRadius: '10%',
        padding: '0px',
        boxShadow: 'rgb(135, 135, 135) 0px 0px 8px 2px',
        width: '790',
        height: '490',
        cursor: 'default'
      },
      overlayCSS: {
        backgroundColor: '#000',
        opacity: '0.4'
      },
      onOverlayClick: $.unblockUI
    })
  }

  Sim.getTermtest(106, 'complete', function (schedule) {
    _.each(schedule, function (it, idx) {
      if (now < it.start) {
        $('.block' + idx).append(
          `
          <a class='btnA'>
          <img src='${rootPath}/img/尚未開始.png'></a>
          <a class='btnB'>
          <img src='${rootPath}/img/尚未公布.png'></a>
          `
        )
      } else if (now > it.start && now < it.end) {
        $('.block' + idx).append(`
          <a class='btnA' href='/key/MOCK106FEXAM/SalesPlans/productSets.html?check=false'>
            <img style="hover:box-shadow: 2px 2px 1px grey;" src='${rootPath}/img/進入擂台.png'></a> 
          <a class='btnB'>
            <img src='${rootPath}/img/尚未公布.png'></a>
          `)
      } else if (now > it.end && now < it.result) {
        $('.block' + idx).append(
          `
          <a class='btnA'>
          <img src='${rootPath}/img/比試結束.png'></a>
          <a class='btnB'>
          <img src='${rootPath}/img/尚未公布.png'></a>
          `
        )
      } else if (now > it.result) {
        $('.block' + idx).append(`
          <a class='btnA'>
          <img src='${rootPath}/img/比試結束.png'></a>
          <a class='btnB'>
          <img style="hover:box-shadow: 2px 2px 1px grey;" src='${rootPath}/img/王者排行.png'></a>
          `)
      }
    })

    let ajaxFunc = function (num) {
      ajaxGet(
        `https://www.ehanlin.com.tw/sim_106/hero?year=106&volume=7&number=${num}`,
        null,
        function (jsonData) {
          let info

          for (let index = 0; index < jsonData.length; index++) {
            var userName = jsonData[index].userName
            var userSchool = jsonData[index].school
            let userInfoList = `<span class="number">第${index +
              1}名</span><p class='userList'> ${userName}&nbsp;&nbsp;${userSchool}</p>`
            info += userInfoList
            blockFunc(info.replace('undefined', ''))
          }
        },
        function () {}
      )
    }
    $('.block0 .btnB img').on('click', function () {
      ajaxFunc(1)
    })

    $('.block1 .btnB img').on('click', function () {
      ajaxFunc(2)
    })

    $('.block2 .btnB img').on('click', function () {
      ajaxFunc(3)
    })
  })
})
