var map;

function initMap() {
  var device = {lat:59.938716, lng:30.323047};
  var map = new google.maps.Map(
      document.getElementById("map"), {center: device, zoom: 18})
      var pin = {
        url: "../source/img/map-pin.svg",
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
