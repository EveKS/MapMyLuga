var
    polygons = {}, isClicable = [];

function AddPolygons() {
    var poly;
    function resetLine() {
        var form = document.forms["markerMessageFormLine"];
        form.reset();
        $('#getLineInfo').modal('hide');
    }

    function CreateMenu(className, html) {
        this.div_ = document.createElement('div');
        this.div_.className = className;
        this.div_.innerHTML = html;

        var menu = this;
        google.maps.event.addDomListener(this.div_, 'click', function () {
            menu.removeVertex();
        });
    }

    CreateMenu.prototype = new google.maps.OverlayView();

    CreateMenu.prototype.onAdd = function () {
        var createMenu = this;
        var map = this.getMap();
        this.getPanes().floatPane.appendChild(this.div_);

        this.divListener_ = google.maps.event.addDomListener(map.getDiv(), 'click', function (e) {
            if (e.target != createMenu.div_) {
                createMenu.close();
            }
        }, false);
    };

    CreateMenu.prototype.onRemove = function () {
        google.maps.event.removeListener(this.divListener_);
        this.div_.parentNode.removeChild(this.div_);

        this.set('position');
        this.set('path');
        this.set('vertex');
    };

    CreateMenu.prototype.close = function () {
        this.setMap(null);
        return;
    };

    CreateMenu.prototype.draw = function () {
        var position = this.get('position');
        var projection = this.getProjection();

        if (!position || !projection) {
            return;
        }

        var point = projection.fromLatLngToDivPixel(position);
        this.div_.style.top = point.y + 'px';
        this.div_.style.left = point.x + 'px';
    };

    CreateMenu.prototype.open = function (map, path, vertex, poly) {
        this.set('position', path.getAt(vertex));
        this.set('path', path);
        this.set('vertex', vertex);
        this.set('poly', poly);
        this.setMap(map);
        this.draw();
    };

    /* ОТПРАВКА ИНФОРМАЦИИ О ЛИНИИ НА СЕРВЕР */
    CreateMenu.prototype.removeVertex = function () {
        var
            coordinate, path = this.get('path'),
            vertex = this.get('vertex'),
            menu = this;

        if (!path || vertex == undefined) {
            this.close();
        }

        if (this.get('poly')) {
            lineAjaxAppend();
        }
        else {
            path.removeAt(vertex);
        }

        this.close();
    };

    var
        listener, isClicable = true;
    var leftSendMenu = new CreateMenu('delete-menu delete-menu-left',
        '<i class="fa fa-check" aria-hidden="true"></i>');
    var rightDeleteMenu = new CreateMenu('delete-menu delete-menu-right',
        '<i class="fa fa-times" aria-hidden="true"></i>');

    function CreatePoli() {
        poly = new google.maps.Polyline({
            strokeColor: '#555555',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            editable: true
        });

        poly.setMap(map);

        //poly.addListener('rightclick', function () {
        //    alert(poly.getPath().getArray().toString());
        //});

        listener = google.maps.event.addListener(poly, 'click', function (e) {
            if (e.vertex == undefined) {
                return;
            }

            leftSendMenu
                .open(map, poly.getPath(), e.vertex, poly);
            rightDeleteMenu
                .open(map, poly.getPath(), e.vertex);
            
            isClicable = false;
        });
    }

    CreatePoli();

    function lineAjaxAppend() {
        var coordinate = poly.getPath().getArray();
        $("#getLineInfo").modal('show');
        $("#MarcerCoordinateLine").val(coordinate);
        $("#MarcerCoordinateLine").hide();

        $("#submitLine").on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var
                fileUpload, data, $input,
                $form, formData, date;

            data = new FormData();

            $input = $("#UploadedFilesLine");
            $.each($input.prop('files'), function (key, value) {
                if (value.type.match(/(.png)|(.jpeg)|(.jpg)|(.gif)$/i)) {
                    data.append('UploadedFiles', value);
                }
            });

            $form = $(this).closest('form');
            formData = $form.serializeArray();

            $.each(formData, function (key, input) {
                data.append(input.name, input.value);
            });

            date = new Date();
            data.append('DataAdd', date);
            CreateLine(data, poly);
        });        
    }

    function CreateLine(data, poly) {
        var btn = $("#submitLine");
        btn.button('loading');

        $.ajax({
            type: "POST",
            url: "/Home/SetLine",
            contentType: false,
            processData: false,
            data: data,
            dataType: 'json',
            success: function (respond) {
                if (typeof respond.error === 'undefined') {
                    if (respond !== '') {
                        $('#colorpickerLine>li>span').css('border', '1px solid #ddd');
                        addLine(respond.messageId, respond.title, '', poly.getPath(), respond.objectColor);
                        google.maps.event.removeListener(listener);

                        $("#submitLine").unbind();
                        poly.setMap(null);
                        poly = null;

                        resetLine();
                        CreatePoli();
                    }
                } else {
                    console.log(respond.error);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        }).always(function () {
            btn.button('reset')
        });
    }

    /* КЛИК ПО КАРТЕ */
    google.maps.event.addListener(map, 'click', function (event) {
        if ($('#click-onoff').is('.clicable')) {
            var markerCoordinate = event.latLng;
            $("#getInfo").modal('show');

            $("#MarcerCoordinate").val(markerCoordinate);
            $("#MarcerCoordinate").hide();
        }

        if ($('#click-line').is('.clicable') && isClicable) {
            var path = poly.getPath();
            path.push(event.latLng);
        }
        isClicable = true;
    });
}

function addLine(markerId, title, coordinates, polyPath, color) {
    var strokeColor = '#555555';

    if (typeof color !== undefined && color !== null && color !== '' && color !== 'undefined') {
        strokeColor = color;
        //console.log(color);
    }

    polygons[markerId] = new google.maps.Polyline({
        strokeColor: strokeColor,
        strokeOpacity: 0.8,
        strokeWeight: 4,
        id: markerId,
        title: title,
    });

    if (polyPath) {
        polygons[markerId].setPath(polyPath);
    } else {
        var path = polygons[markerId].getPath();
        $.each(coordinates, function (key, value) {
            path.push(new google.maps.LatLng(value.latitude, value.longitude));
        });
    }

    polygons[markerId].setMap(map);

    polygons[markerId].addListener('click', function (e) {
        getPanelContent(polygons[markerId].id);
    });

    //polygons[markerId].addListener('rightclick', function () {
    //    alert(polygons[markerId].getPath().getArray().toString());
    //});
}