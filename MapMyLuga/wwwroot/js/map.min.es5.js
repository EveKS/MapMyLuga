"use strict";function addMarker(n, t, i, r, u) {
  function o(n) {
    return { path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0", fillColor: n, fillOpacity: 1, strokeColor: "#000", strokeWeight: 2, scale: 1 };
  }var f,
      e = "#FE7569";typeof u !== undefined && u !== null && u !== "" && u !== "undefined" && (e = u);ids.push(n);f = new google.maps.LatLng(t, i);marker[n] = new google.maps.Marker({ position: f, icon: o(e), title: r, map: map, draggable: !1, id: n, animation: google.maps.Animation.DROP });marker[n].addListener("click", function () {
    getPanelContent(marker[n].id);
  });
}function getPanelContent(n) {
  var t = "markerMessageId=" + n;$.ajax({ type: "GET", url: "/Home/InfoMapPanel", contentType: !1, processData: !1, data: t, success: function success(n) {
      n !== null && n.search("error") === -1 && ($("#image-modal").detach(), $("#image-modal-one").detach(), $("#panel-content").html(n).addClass("info-map-panel-visible"), $("#image-modal") && ($("#image-modal").appendTo("body"), imageSlider()), $("#image-modal-one") && $("#image-modal-one").appendTo("body"));
    }, error: function error() {} });
}function ControlBorder(n, t) {
  return $("<div/>", { id: t, "class": "controlBorder" }).appendTo(n);
}function ControlInterior(n, t) {
  var i = $("<div/>", { html: t, "class": "controlInterior" }).appendTo(n);return { ui: n, text: i };
}function ControlAction(n, t, i, r, u) {
  n.on("click", function () {
    $(i).toggleClass("clicable");$(i).is(".clicable") ? (n.css("background-color", "rgba(194, 73, 73, 0.77)"), t.css("color", "#fff")) : (n.css("background-color", "rgba(255, 255, 255, 0.77)"), t.css("color", "#e84545"));r && ($(r).removeClass(u), $(r).css("background-color", "rgba(255, 255, 255, 0.77)"), $(r).children("div").css("color", "#e84545"));
  });
}function LeftControlCreator(n, t, i) {
  var r = new ControlBorder(n, t),
      u;r.css("margin-left", "15px");r.css("margin-bottom", "7.5px");u = new ControlInterior(r, i);ControlAction(u.ui, u.text, "#click-onoff", "#click-line", "clicable");
}function LeftControlCreatorLine(n, t, i) {
  var r = new ControlBorder(n, t),
      u;r.css("margin-left", "15px");r.css("margin-top", "7.5px");u = new ControlInterior(r, i);ControlAction(u.ui, u.text, "#click-line", "#click-onoff", "clicable");
}function RightControlCreator(n, t, i) {
  var r = new ControlBorder(n, t),
      u;r.css("margin-right", "15px");u = new ControlInterior(r, i);u.ui.on("click", function () {
    $("#menu-content").addClass("info-map-panel-visible");
  });
}function initMap() {
  function e(n) {
    var t = { lat: n.coords.latitude, lng: n.coords.longitude };$("#message").html("Информация о вашем местоположении:<br/>Позиция определена с точностью в " + n.coords.accuracy + " метров.<br/>Ваши координаты: " + n.coords.latitude + " широта, " + n.coords.longitude + " долгота.");map.setCenter(t);map.getCenter();
  }var o = new google.maps.StyledMapType([{ elementType: "labels.text.fill", stylers: [{ color: "#523735" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] }, { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9b2a6" }] }, { featureType: "administrative.land_parcel", elementType: "geometry.stroke", stylers: [{ color: "#dcd2be" }] }, { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#ae9e90" }] }, { featureType: "landscape", elementType: "geometry.fill", stylers: [{ color: "#f2ecdb" }] }, { featureType: "landscape", elementType: "geometry.stroke", stylers: [{ color: "#ae9246" }] }, { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#93817c" }] }, { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#a5b076" }] }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#447530" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] }, { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#e0d0a7" }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fdfcf8" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f8c967" }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e9bc62" }] }, { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#e98d58" }] }, { featureType: "road.highway.controlled_access", elementType: "geometry.stroke", stylers: [{ color: "#db8555" }] }, { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#806b63" }] }, { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "transit.line", elementType: "labels.text.fill", stylers: [{ color: "#8f7d77" }] }, { featureType: "transit.line", elementType: "labels.text.stroke", stylers: [{ color: "#ebe3cd" }] }, { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] }, { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#92998d" }] }], { name: "Ретро" }),
      v = new google.maps.StyledMapType([{ elementType: "geometry.fill", stylers: [{ color: "#242f3e" }] }, { elementType: "geometry.stroke", stylers: [{ color: "#587498" }, { weight: .5 }] }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] }, { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] }, { featureType: "landscape.man_made", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }] }, { featureType: "landscape.natural", elementType: "geometry.stroke", stylers: [{ color: "#ffffff" }] }, { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] }, { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] }, { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] }, { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] }, { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] }, { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] }, { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] }, { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] }, { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] }, { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }], { name: "Ночной режим" }),
      s = new google.maps.StyledMapType([{ featureType: "landscape.man_made", elementType: "geometry.fill", stylers: [{ color: "#e8e3c8" }] }, { featureType: "landscape.man_made", elementType: "geometry.stroke", stylers: [{ color: "#818181" }, { weight: .5 }] }, { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#bdb066" }] }, { featureType: "road.arterial", elementType: "geometry.stroke", stylers: [{ color: "#1e1c0d" }] }, { featureType: "road.local", elementType: "geometry.fill", stylers: [{ color: "#fbfaf4" }] }], { name: "Выделить город" }),
      h = { zoom: 13, center: { lat: 58.740824963379211, lng: 29.850587099790573 }, mapTypeControl: !0, mapTypeControlOptions: { mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "retro_map", "town_detail"], style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position: google.maps.ControlPosition.LEFT_TOP }, zoomControl: !0, zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_TOP }, scaleControl: !0, streetViewControl: !0, streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_BOTTOM }, mapTypeId: google.maps.MapTypeId.ROADMAP },
      n,
      c,
      t,
      l,
      i,
      a,
      f,
      r,
      u;map = new google.maps.Map(document.getElementById("map"), h);map.mapTypes.set("retro_map", o);map.mapTypes.set("town_detail", s);n = document.createElement("div");c = new LeftControlCreator(n, "click-onoff", '<i class="fa fa-map-marker" aria-hidden="true"><\/i>');n.index = 1;n.setAttribute("title", "Поставить метку");map.controls[google.maps.ControlPosition.LEFT_CENTER].push(n);t = document.createElement("div");l = new LeftControlCreatorLine(t, "click-line", '<i class="fa fa-arrows-h" aria-hidden="true"><\/i>');t.index = 1;t.setAttribute("title", "Выделить участок");map.controls[google.maps.ControlPosition.LEFT_CENTER].push(t);i = document.createElement("div");a = new RightControlCreator(i, "click-menu", '<i class="fa fa-filter" aria-hidden="true"><\/i>');i.index = 1;i.setAttribute("title", "Фильтр");map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(i);f = document.getElementById("pac-input");r = new google.maps.places.SearchBox(f);map.controls[google.maps.ControlPosition.TOP_LEFT].push(f);map.addListener("bounds_changed", function () {
    r.setBounds(map.getBounds());
  });u = [];r.addListener("places_changed", function () {
    var t = r.getPlaces(),
        n;t.length !== 0 && (u.forEach(function (n) {
      n.setMap(null);
    }), u = [], n = new google.maps.LatLngBounds(), t.forEach(function (t) {
      if (!t.geometry) {
        console.log("Returned place contains no geometry");return;
      }var i = { url: t.icon, size: new google.maps.Size(71, 71), origin: new google.maps.Point(0, 0), anchor: new google.maps.Point(17, 34), scaledSize: new google.maps.Size(25, 25) };u.push(new google.maps.Marker({ map: map, icon: i, title: t.name, position: t.geometry.location }));t.geometry.viewport ? n.union(t.geometry.viewport) : n.extend(t.geometry.location);
    }), map.fitBounds(n));
  });$("#UploadedFilesTextLine").on("click", function () {
    $("#UploadedFilesLine").click();
  });$("#UploadedFilesText").on("click", function () {
    $("#UploadedFiles").click();
  });$("#getInfo, #getLineInfo").on("change", "#UploadedFiles, #UploadedFilesLine", function () {
    var n = $(this),
        t = n.get(0).files ? n.get(0).files.length : 1,
        i = n.val().replace(/\\/g, "/").replace(/.*\//, "");n.trigger("fileselect", [t, i]);
  });$("#getInfo, #getLineInfo").on("fileselect", "#UploadedFiles, #UploadedFilesLine", function (n, t, i) {
    var u = $(this).parents(".input-group").find(":text"),
        r = t > 1 ? t + " файлов выбрано" : i;u.length ? u.val(r) : r && console.log(r);
  });navigator.geolocation ? navigator.geolocation.getCurrentPosition(e, handleError, { enableHighAccuracy: !0, timeout: 3e4 }) : (map.setZoom(3), map.getCenter());AddPolygons();
}function handleError(n) {
  switch (n.code) {case 0:
      updateStatus("При попытке определить местоположение возникала ошибка: " + n.message);break;case 1:
      updateStatus("Пользователь запретил получение данных о местоположении.");break;case 2:
      updateStatus("Браузеру не удалось определить местоположение: " + n.message);break;case 3:
      updateStatus("Истекло доступное время ожидания.");}
}function updateStatus(n) {
  document.getElementById("message").innerHTML = n;
}function printLatLong(n, t) {
  document.getElementById("latOutput").innerHTML = n;document.getElementById("longOutput").innerHTML = t;
}function error(n) {
  $("#messageError").innerHTML = n;
}function locationRandom(n) {
  return { lat: n.lat + getRandomArbitary(-1, 1), lng: n.lng + getRandomArbitary(-1, 1) };
}function getRandomArbitary(n, t) {
  return (Math.random() * (t - n) + n) / 100;
}function CreateAdd(n, t, i, r) {
  this.markerId = n;this.latitude = t;this.longitude = i;this.title = r;
}function CreateLine(n, t, i) {
  this.markerId = n;this.title = t;this.coordinates = i;
}function createMark(n, t) {
  var i = $("#submitMarkers");return i.button("loading"), $.ajax({ url: n.attr("action"), type: n.attr("method"), data: t, cache: !1, dataType: "json", contentType: !1, processData: !1, success: function success(n) {
      if (typeof n.error == "undefined") {
        if (n !== "") {
          var t = n.title,
              i = n.latitude,
              r = n.longitude,
              u = n.markerMessageId,
              f = n.objectColor;t == null && (t = "");$("#colorpicker>li>span").css("border", "1px solid #ddd");resetForm();addMarker(u, i, r, t, f);
        }
      } else console.log(n.error);
    }, error: function error(n, t) {
      console.log(t);
    } }).always(function () {
    i.button("reset");
  }), !1;
}function resetForm() {
  var n = document.forms.markerMessageForm;n.reset();$("#getInfo").modal("hide");
}function AddPolygons() {
  function f() {
    var n = document.forms.markerMessageFormLine;n.reset();$("#getLineInfo").modal("hide");
  }function n(n, t) {
    this.div_ = document.createElement("div");this.div_.className = n;this.div_.innerHTML = t;var i = this;google.maps.event.addDomListener(this.div_, "click", function () {
      i.removeVertex();
    });
  }function r() {
    t = new google.maps.Polyline({ strokeColor: "#555555", strokeOpacity: .8, strokeWeight: 3, editable: !0 });t.setMap(map);u = google.maps.event.addListener(t, "click", function (n) {
      n.vertex != undefined && (s.open(map, t.getPath(), n.vertex, t), h.open(map, t.getPath(), n.vertex), i = !1);
    });
  }function e() {
    var n = t.getPath().getArray();$("#getLineInfo").modal("show");$("#MarcerCoordinateLine").val(n);$("#MarcerCoordinateLine").hide();$("#submitLine").on("click", function (n) {
      n.preventDefault();n.stopPropagation();var i, r, u, f, e;i = new FormData();r = $("#UploadedFilesLine");$.each(r.prop("files"), function (n, t) {
        t.type.match(/(.png)|(.jpeg)|(.jpg)|(.gif)$/i) && i.append("UploadedFiles", t);
      });u = $(this).closest("form");f = u.serializeArray();$.each(f, function (n, t) {
        i.append(t.name, t.value);
      });e = new Date();i.append("DataAdd", e);o(i, t);
    });
  }function o(n, t) {
    var i = $("#submitLine");i.button("loading");$.ajax({ type: "POST", url: "/Home/SetLine", contentType: !1, processData: !1, data: n, dataType: "json", success: function success(n) {
        typeof n.error == "undefined" ? n !== "" && ($("#colorpickerLine>li>span").css("border", "1px solid #ddd"), addLine(n.messageId, n.title, "", t.getPath(), n.objectColor), google.maps.event.removeListener(u), $("#submitLine").unbind(), t.setMap(null), t = null, f(), r()) : console.log(n.error);
      }, error: function error(n, t) {
        console.log(t);
      } }).always(function () {
      i.button("reset");
    });
  }var t;n.prototype = new google.maps.OverlayView();n.prototype.onAdd = function () {
    var n = this,
        t = this.getMap();this.getPanes().floatPane.appendChild(this.div_);this.divListener_ = google.maps.event.addDomListener(t.getDiv(), "click", function (t) {
      t.target != n.div_ && n.close();
    }, !1);
  };n.prototype.onRemove = function () {
    google.maps.event.removeListener(this.divListener_);this.div_.parentNode.removeChild(this.div_);this.set("position");this.set("path");this.set("vertex");
  };n.prototype.close = function () {
    this.setMap(null);return;
  };n.prototype.draw = function () {
    var t = this.get("position"),
        i = this.getProjection(),
        n;t && i && (n = i.fromLatLngToDivPixel(t), this.div_.style.top = n.y + "px", this.div_.style.left = n.x + "px");
  };n.prototype.open = function (n, t, i, r) {
    this.set("position", t.getAt(i));this.set("path", t);this.set("vertex", i);this.set("poly", r);this.setMap(n);this.draw();
  };n.prototype.removeVertex = function () {
    var n = this.get("path"),
        t = this.get("vertex"),
        i = this;n && t != undefined || this.close();this.get("poly") ? e() : n.removeAt(t);this.close();
  };var u,
      i = !0,
      s = new n("delete-menu delete-menu-left", '<i class="fa fa-check" aria-hidden="true"><\/i>'),
      h = new n("delete-menu delete-menu-right", '<i class="fa fa-times" aria-hidden="true"><\/i>');r();google.maps.event.addListener(map, "click", function (n) {
    var r, u;$("#click-onoff").is(".clicable") && (r = n.latLng, $("#getInfo").modal("show"), $("#MarcerCoordinate").val(r), $("#MarcerCoordinate").hide());$("#click-line").is(".clicable") && i && (u = t.getPath(), u.push(n.latLng));i = !0;
  });
}function addLine(n, t, i, r, u) {
  var f = "#555555",
      e;typeof u !== undefined && u !== null && u !== "" && u !== "undefined" && (f = u);polygons[n] = new google.maps.Polyline({ strokeColor: f, strokeOpacity: .8, strokeWeight: 4, id: n, title: t });r ? polygons[n].setPath(r) : (e = polygons[n].getPath(), $.each(i, function (n, t) {
    e.push(new google.maps.LatLng(t.latitude, t.longitude));
  }));polygons[n].setMap(map);polygons[n].addListener("click", function () {
    getPanelContent(polygons[n].id);
  });
}var map,
    ids = [],
    marker = {},
    polygons,
    isClicable;$("#markerMessageForm").on("submit", function (n) {
  n.preventDefault();n.stopPropagation();var i = $(this),
      r,
      u,
      t = new FormData(i.get(0));u = $("#UploadedFiles");$.each(u.prop("files"), function (n, i) {
    i.type.match(/(.png)|(.jpeg)|(.jpg)|(.gif)$/i) && t.append("UploadedFiles", i);
  });r = new Date();t.append("DataAdd", r);createMark(i, t);
});polygons = {};isClicable = [];

