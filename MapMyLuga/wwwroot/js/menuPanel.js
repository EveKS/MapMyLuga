$(function () {
    $('#menu').on('click', '#btn-exit-menu', function () {
        $('#menu-content').removeClass("info-map-panel-visible");
    });

    jQuery(function ($) {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '&#x3c;Пред',
            nextText: 'След&#x3e;',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'Среда', 'четверг', 'пятница', 'Суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'Срд', 'чтв', 'птн', 'Сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Нед',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
    });

    $('#datepicker, #datepicker-begin, #datepicker-end, #datepickerEdit').datepicker($.extend({
        inline: true,
        changeYear: true,
        changeMonth: true,
    },
        $.datepicker.regional['ru']
    ));

    $('#menu-input').change(function () {
        if (!$(this).is(":checked")) {
            clearMarkers();
        } else {
            addMarkerFromDate();
        }
    });

    $('#line-menu-input').change(function () {
        if (!$(this).is(":checked")) {
            clearPoly();
        } else {
            addLineFromDate();
        }
    });

    function MenuData() {
        this.datapicker = $('#datepicker').val();
        this.datapickerBegin = $('#datepicker-begin').val();
        this.datapickerEnd = $('#datepicker-end').val();
        this.groupId = $('#menu-group-id').val();
    }

    $('#datepicker-one').on('click', function () {
        ifChecked();
    });

    $('#datepicker-more').on('click', function () {
        ifChecked();
    });

    $('#menu-group-span').on('click', function () {
        ifChecked();
    });

    $('#datepicker').on('click', function () {
        $('#datepicker-begin').val('');
        $('#datepicker-end').val('');
    });

    $('#datepicker-begin, #datepicker-end').on('click', function () {
        $('#datepicker').val('');
    });

    function addMarkerFromDate() {
        clearMarkers();
        var menuData = new MenuData();
        var data = new FormData();
        data.append('Datepicker', menuData.datapicker);
        data.append('DatepickerBegin', menuData.datapickerBegin);
        data.append('DatepickerEnd', menuData.datapickerEnd);
        data.append('GroupId', menuData.groupId);

        $.ajax({
            type: "POST",
            url: '/Home/AddMarkers',
            contentType: false,
            processData: false,
            data: data,
            dataType: 'json',
            success: function (data) {
                $('#markers-script-id').remove();
                $.each(data, function (key, value) {
                    addMarker(value.markerMessageId, value.latitude, value.longitude, value.title, value.objectColor);
                });
            },
            error: function (err) {
            }
        });
    }

    function addLineFromDate() {
        clearPoly();
        var menuData = new MenuData();
        var data = new FormData();
        data.append('Datepicker', menuData.datapicker);
        data.append('DatepickerBegin', menuData.datapickerBegin);
        data.append('DatepickerEnd', menuData.datapickerEnd);
        data.append('GroupId', menuData.groupId);

        $.ajax({
            type: "POST",
            url: '/Home/AddLine',
            contentType: false,
            processData: false,
            data: data,
            dataType: 'json',
            success: function (data) {
                $('#markers-script-id').remove();
                $.each(data, function (key, value) {
                    addLine(value.messageId, value.title, value.coordinates, null, value.objectColor)
                });
            },
            error: function (err) {
            }
        });
    }

    function ifChecked() {
        if ($('#menu-input').is(":checked")) {
            addMarkerFromDate();
        }        
        if ($('#line-menu-input').is(":checked")) {   
            addLineFromDate();
        }
    }

    function clearPoly() {
        $.each(polygons, function (key, value) {
            value.setMap(null);
        });
    }

    function clearMarkers() {
        $.each(ids, function (key, value) {
            marker[value].setMap(null);
        });
    }
});