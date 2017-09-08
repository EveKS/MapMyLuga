var
    map, ids = [],
    marker = {};

function addMarker(markerId, latitude, longitude, title, color) {
    var
        coordinate, pinImage,
        pinColor = "#FE7569";

    if (typeof color !== undefined && color !== null
        && color !== '' && color !== 'undefined') {
        pinColor = color;
    }

    function pinSymbol(color) {
        return {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 2,
            scale: 1,
        };
    }

    ids.push(markerId);

    coordinate = new google.maps.LatLng(latitude, longitude);

    marker[markerId] = new google.maps.Marker({
        position: coordinate,
        icon: pinSymbol(pinColor),
        title: title,
        map: map,
        draggable: false,
        id: markerId,
        animation: google.maps.Animation.DROP
    });

    marker[markerId].addListener('click', function () {
        getPanelContent(marker[markerId].id);
    });
}

// Понель информации о метке
function getPanelContent(id) {
    var data = 'markerMessageId=' + id;
    //alert(data);
    var url = "/Home/InfoMapPanel";
    $.ajax({
        type: "GET",
        url: url,
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
            if (data !== null && data.search('error') === -1) {
                $("#image-modal").detach();
                $("#image-modal-one").detach();

                $('#panel-content')
                    .html(data)
                    .addClass("info-map-panel-visible");

                if ($("#image-modal")) {
                    $("#image-modal").appendTo("body");

                    imageSlider();
                }
                if ($("#image-modal-one")) {
                    $("#image-modal-one").appendTo("body");
                }
            }
        },
        error: function (err) {
        }
    });
}

function ControlBorder(controlDiv, id) {
    var controlUI = $("<div/>", {
        'id': id,
        'class': 'controlBorder',
    }).appendTo(controlDiv);

    return controlUI;
}

function ControlInterior(controlUI, html, tooltipText) {
    var controlText = $("<div/>", {
        'html': html,
        'class': 'controlInterior'
    })
        .appendTo(controlUI);

    return {
        ui: controlUI,
        text: controlText
    }
}

function ControlAction(controlUI, controlText, id, remove, removeClass) {
    controlUI.on('click', function () {
        $(id).toggleClass("clicable");
        if ($(id).is('.clicable')) {
            controlUI.css('background-color', 'rgba(194, 73, 73, 0.77)');
            controlText.css('color', '#fff');
        } else {
            controlUI.css('background-color', 'rgba(255, 255, 255, 0.77)');
            controlText.css('color', '#e84545');
        }
        if (remove) {
            $(remove).removeClass(removeClass);
            $(remove).css('background-color', 'rgba(255, 255, 255, 0.77)');
            $(remove).children('div').css('color', '#e84545');
        }
    });
}

function LeftControlCreator(controlDiv, id, html) {
    var controlUI = new ControlBorder(controlDiv, id);
    controlUI.css('margin-left', '15px');
    controlUI.css('margin-bottom', '7.5px');
    var result = new ControlInterior(controlUI, html);

    ControlAction(result.ui, result.text, '#click-onoff', '#click-line', 'clicable');
}

function LeftControlCreatorLine(controlDiv, id, html) {
    var controlUI = new ControlBorder(controlDiv, id);
    controlUI.css('margin-left', '15px');
    controlUI.css('margin-top', '7.5px');
    var result = new ControlInterior(controlUI, html);

    ControlAction(result.ui, result.text, '#click-line', '#click-onoff', 'clicable');
}

function RightControlCreator(controlDiv, id, html) {
    var controlUI = new ControlBorder(controlDiv, id);
    controlUI.css('margin-right', '15px');
    var result = new ControlInterior(controlUI, html);

    result.ui.on('click', function () {
        $("#menu-content").addClass('info-map-panel-visible');
    });
}

function initMap() {
    var retroMapStyle = new google.maps.StyledMapType(
        [
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f2ecdb"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ae9246"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e0d0a7"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ],
        { name: 'Ретро' });

    var nightMapStyle = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#587498"
                    },
                    {
                        "weight": 0.5
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#242f3e"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#263c3f"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6b9a76"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#38414e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#212a37"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9ca5b3"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#746855"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1f2835"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f3d19c"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#2f3948"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#d59563"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#515c6d"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#17263c"
                    }
                ]
            }
        ],
        { name: 'Ночной режим' });

    var townDetail = new google.maps.StyledMapType(
        [
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e8e3c8"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#818181"
                    },
                    {
                        "weight": 0.5
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#bdb066"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#1e1c0d"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fbfaf4"
                    }
                ]
            }
        ],
        { name: 'Выделить город' });

    var options = {
        zoom: 13,
        center: { lat: 58.74082496337921, lng: 29.850587099790573 },
        mapTypeControl: true,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'retro_map', 'town_detail'],
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_TOP
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },

        mapTypeId: google.maps.MapTypeId.ROADMAP // тип карты - ROADMAP, SATELLITE, HYBRID and TERRAIN
    };

    map = new google.maps.Map(document.getElementById("map"), options);

    //map.mapTypes.set('night_map', nightMapStyle);
    map.mapTypes.set('retro_map', retroMapStyle);
    map.mapTypes.set('town_detail', townDetail);

    // кнопка включить выключить метки
    var leftControlDiv = document.createElement('div');
    var leftControl = new LeftControlCreator(leftControlDiv, 'click-onoff', '<i class="fa fa-map-marker" aria-hidden="true"></i>');
    leftControlDiv.index = 1;
    leftControlDiv.setAttribute("title", "Поставить метку");
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(leftControlDiv);

    // линии кнопка
    var leftControlLineDiv = document.createElement('div');
    var leftControlLine = new LeftControlCreatorLine(leftControlLineDiv, 'click-line', '<i class="fa fa-arrows-h" aria-hidden="true"></i>');
    leftControlLineDiv.index = 1;
    leftControlLineDiv.setAttribute("title", "Выделить участок");
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(leftControlLineDiv);

    // фильтр
    var rightControlDiv = document.createElement('div');
    var rightControl = new RightControlCreator(rightControlDiv, 'click-menu', '<i class="fa fa-filter" aria-hidden="true"></i>');
    rightControlDiv.index = 1;
    rightControlDiv.setAttribute("title", "Фильтр");
    map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(rightControlDiv);

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });


    function getMap(pos) {
        var position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        };

        $("#message").html("Информация о вашем местоположении:<br/>Позиция определена с точностью в "
            + pos.coords.accuracy + " метров.<br/>"
            + "Ваши координаты: " +
            pos.coords.latitude + " широта, " +
            pos.coords.longitude + " долгота.");

        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found.');
        map.setCenter(position);
        map.getCenter();
    }

    $('#UploadedFilesTextLine').on('click', function () {
        $('#UploadedFilesLine').click();
    });

    $('#UploadedFilesText').on('click', function () {
        $('#UploadedFiles').click();
    });

    $('#getInfo, #getLineInfo').on('change', '#UploadedFiles, #UploadedFilesLine', function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $('#getInfo, #getLineInfo').on('fileselect', '#UploadedFiles, #UploadedFilesLine', function (event, numFiles, label) {
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' файлов выбрано' : label;

        if (input.length) {
            input.val(log);
        } else {
            if (log) console.log(log);
        }
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getMap, handleError, { enableHighAccuracy: true, timeout: 30000 }); //, maximumAge: 30000
    } else {
        map.setZoom(3);
        map.getCenter();
    }

    //$(function () {
    //    var data = $("#map").data();
    //    if (data['markers0']) {
    //        if (data['markers0'].latitude) {
    //            for (var key in data) {
    //                addMarker(data[key].markerId,
    //                    data[key].latitude,
    //                    data[key].longitude,
    //                    data[key].title,
    //                    map);
    //            }
    //        }

    //        if (data['markers0'].coordinates) {
    //            for (var key in data) {
    //                addLine(data[key].markerId,
    //                    data[key].title,
    //                    data[key].coordinates,
    //                    map);
    //            }
    //        }
    //    }
    //});
    AddPolygons();
}

function handleError(error) {
    switch (error.code) {
        case 0:
            updateStatus("При попытке определить местоположение возникала ошибка: " + error.message);
            break;
        case 1:
            updateStatus("Пользователь запретил получение данных о местоположении."); //updateStatus(error.message);
            break;
        case 2:
            updateStatus("Браузеру не удалось определить местоположение: " + error.message);
            break;
        case 3:
            updateStatus("Истекло доступное время ожидания.");
            break;
    }
}

function updateStatus(message) {
    document.getElementById("message").innerHTML = message;
}

function printLatLong(lat, long) {
    document.getElementById("latOutput").innerHTML = lat;
    document.getElementById("longOutput").innerHTML = long;
}

function error(msg) {
    $("#messageError").innerHTML = msg;
}

function locationRandom(location) {
    return { lat: location.lat + getRandomArbitary(-1, 1), lng: location.lng + getRandomArbitary(-1, 1) };
}

function getRandomArbitary(min, max) {
    return (Math.random() * (max - min) + min) / 100;
}

function CreateAdd(markerId, latitude, longitude, title) {
    this.markerId = markerId;
    this.latitude = latitude;
    this.longitude = longitude;
    this.title = title;
}

function CreateLine(markerId, title, coordinates) {
    this.markerId = markerId;
    this.title = title;
    this.coordinates = coordinates;
}

/// ДОБАВИТЬ МЕТКУ ПРИ КЛИКЕ
function createMark($form, formData) {
    var btn = $("#submitMarkers");
    btn.button('loading');

    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: formData,
        cache: false,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (respond) {
            if (typeof respond.error === 'undefined') {
                if (respond !== '') {
                    var title = respond.title;
                    var latitude = respond.latitude;
                    var longitude = respond.longitude;
                    var id = respond.markerMessageId;
                    var color = respond.objectColor;

                    if (title == null)
                        title = '';

                    $('#colorpicker>li>span').css('border', '1px solid #ddd');
                    resetForm();
                    addMarker(id, latitude, longitude, title, color);
                }
            }
            else {
                console.log(respond.error);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    }).always(function () {
        btn.button('reset')
    });

    return false;
}

function resetForm() {
    var form = document.forms["markerMessageForm"];
    form.reset();
    $('#getInfo').modal('hide');
}

$('#markerMessageForm').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $form = $(this),
        formData = new FormData($form.get(0));

    $input = $("#UploadedFiles");
    $.each($input.prop('files'), function (key, value) {
        if (value.type.match(/(.png)|(.jpeg)|(.jpg)|(.gif)$/i)) {
            formData.append('UploadedFiles', value);
        }
    });

    date = new Date();
    formData.append('DataAdd', date);
    createMark($form, formData);
});