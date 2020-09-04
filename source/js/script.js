var pageBody = document.querySelector(".page-body");
var navMain = document.querySelector(".page-header__nav");
var navToggle = document.querySelector(".page-header__toggler");
var popupOverlay = document.querySelector(".pop-up-overlay");
var popup = document.querySelector(".pop-up");
var orderButtons = document.querySelectorAll(".product-card__to-cart, .product-promo__order");
var map;

function initMap() {
  var device = {lat:59.938716, lng:30.323047};
  var map = new google.maps.Map(
      document.querySelector(".contacts__google-maps"), {center: device, zoom: 18})
      var pin = {
        url: "../img/map-pin.svg",
        size: new google.maps.Size(67, 100),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(34, 100)
      };

      var marker = new google.maps.Marker({
          position: device,
          map: map,
          icon: pin,
          title: "Mishka"
        });
};

pageBody.classList.remove("page-body--nojs");

navToggle.addEventListener("click", function() {
  navToggle.classList.toggle("page-header__toggler--is-active");
  if (navMain.classList.contains("page-header__nav--closed")) {
    navMain.classList.remove("page-header__nav--closed");
    navMain.classList.add("page-header__nav--opened");
  } else {
    navMain.classList.add("page-header__nav--closed");
    navMain.classList.remove("page-header__nav--opened");
  }
});

orderButtons.forEach(item => {
  item.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup.classList.add("pop-up--active");
    popupOverlay.classList.add("pop-up-overlay--active");
  });
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode == 27) {
    if (popup.classList.contains("pop-up--active") || popupOverlay.classlist.contains("pop-up-overlay--active")) {
      popup.classList.remove("pop-up--active");
      popupOverlay.classList.remove("pop-up-overlay--active");
    }
  }
});

popupOverlay.addEventListener("click", function(evt) {
    if (popup.classList.contains("pop-up--active") || popupOverlay.classlist.contains("pop-up-overlay--active")) {
      popup.classList.remove("pop-up--active");
      popupOverlay.classList.remove("pop-up-overlay--active");
    }
});
