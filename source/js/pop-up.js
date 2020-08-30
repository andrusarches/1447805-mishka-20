var popupOverlay = document.querySelector(".pop-up-overlay");
var popup = document.querySelector(".pop-up");
var orderButtons = document.querySelectorAll(".product-card__to-cart, .product-promo__order");

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
