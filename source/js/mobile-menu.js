var pageBody = document.querySelector(".page-body");
var navMain = document.querySelector(".page-header__nav");
var navToggle = document.querySelector(".page-header__toggler");

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
