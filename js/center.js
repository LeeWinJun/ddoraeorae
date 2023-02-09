/* ----- TAB ----- */

let tabMenu = $(".tab-menu li"),
  tabMap = $(".map_img img"),
  tabContent = $("#tab-content > div");

tabContent.hide();
tabContent.eq(0).show();

tabMenu.click(function (e) {
  e.preventDefault();

  let targetIdx = $(this).index();

  tabMenu.removeClass("active");
  $(this).addClass("active");

  tabContent.hide();
  tabContent.eq(targetIdx).show();
  tabContent.removeClass("active");
  tabContent.eq(targetIdx).addClass("active");

  tabMap.removeClass("active");
  tabMap.eq(targetIdx).addClass("active");

  //탭 클릭 시 이전 탭의 아코디언 해제
  $(".center_accordion .center_map").slideUp();
  $(".center_accordion .center_name").removeClass("active");
});

/* ----- ACCORDION ----- */

let centerWarp = $(".center_accordion");

centerWarp.each(function () {
  let title = $(this).find(".center_name");

  title.click(function () {
    $(this).next().slideToggle();
    $(this).parent("li").siblings().find(".center_map").slideUp();

    $(this).toggleClass("active");
    $(this).parent("li").siblings().find(".center_name").removeClass("active");
  });
});

/* ----- MAP-LOAD ----- */

let maps = [];
let markers = [];

//함수 initMap 생성
function initMap() {
  let $maps = $(".center_map");
  $.each($maps, function (i, value) {
    //console.log("lat: "+$(value).attr('data-lat'));
    let coordinate = {
      lat: parseFloat($(value).attr("data-lat")),
      lng: parseFloat($(value).attr("data-lng")),
    }; //지도 위도 경도 정보 저장

    let mapAttrId = $(value).attr("id"); //지도를 로드할 id명 저장

    maps[mapAttrId] = new google.maps.Map(document.getElementById(mapAttrId), {
      zoom: 15,
      center: coordinate,
    });

    markers[mapAttrId] = new google.maps.Marker({
      position: coordinate,
      map: maps[mapAttrId],
      animation: google.maps.Animation.BOUNCE,
    });
  });
}

/* ----- header scroll ----- */

let offsetTop = $("#tab-content").offset().top;
header = $("header");
menuText_1 = header.find($(".menu_title p"));
menuText_2 = header.find($(".menu_title a"));
function bannerWhite() {
  $(".sub-title").css({ color: "#fff" });
  header.css({ color: "#fff" });
  menuText_1.css({ color: "#fff" });
  menuText_2.css({ color: "#fff" });
}
bannerWhite();
$window.scroll(function () {
  console.log(offsetTop);
  console.log($(this).scrollTop());
  //header color change
  if ($(this).scrollTop() >= offsetTop) {
    $(".sub-title").css({ color: "#333" });
    header.css({ color: "#333" });
    menuText_1.css({ color: "#333" });
    menuText_2.css({ color: "#333" });
  } else {
    bannerWhite();
  }
});
