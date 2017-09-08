'use strict';

$(function () {
    $("#findMarkInput").on('input', function () {
        var $item = $(this),
            value = $item.val();

        if (value !== '' && value !== ' ') {
            $("#findMark").prop('disabled', false);
        } else {
            $("#findMark").prop('disabled', true);
        }
    });

    //(function ($) {
    //    $.fn.imagePicker = function (options) {

    //        // Define plugin options
    //        var settings = $.extend({
    //            // Input name attribute
    //            name: "",
    //            // Classes for styling the input
    //            class: "form-control btn btn-default btn-block",
    //            // Icon which displays in center of input
    //            icon: "glyphicon glyphicon-plus"
    //        }, options);

    //        // Create an input inside each matched element
    //        return this.each(function () {
    //            $(this).html(create_btn(this, settings));
    //        });

    //    };

    //    // Private function for creating the input element
    //    function create_btn(that, settings) {
    //        // The input icon element
    //        var picker_btn_icon = $('<i class="' + settings.icon + '"></i>');

    //        // The actual file input which stays hidden
    //        var picker_btn_input = $('<input type="file" name="' + settings.name + '" />');

    //        // The actual element displayed
    //        var picker_btn = $('<div class="' + settings.class + ' img-upload-btn"></div>')
    //            .append(picker_btn_icon)
    //            .append(picker_btn_input);

    //        // File load listener
    //        picker_btn_input.change(function () {
    //            if ($(this).prop('files')[0]) {
    //                // Use FileReader to get file
    //                var reader = new FileReader();

    //                // Create a preview once image has loaded
    //                reader.onload = function (e) {
    //                    var preview = create_preview(that, e.target.result, settings);
    //                    $(that).html(preview);
    //                }

    //                // Load image
    //                reader.readAsDataURL(picker_btn_input.prop('files')[0]);
    //            }
    //        });

    //        return picker_btn
    //    };

    //    // Private function for creating a preview element
    //    function create_preview(that, src, settings) {

    //        // The preview image
    //        var picker_preview_image = $('<img src="' + src + '" class="img-responsive img-rounded" />');

    //        // The remove image button
    //        var picker_preview_remove = $('<button class="btn btn-link"><small>Удалить</small></button>');

    //        // The preview element
    //        var picker_preview = $('<div class="text-center"></div>')
    //            .append(picker_preview_image)
    //            .append(picker_preview_remove);

    //        // Remove image listener
    //        picker_preview_remove.click(function () {
    //            var btn = create_btn(that, settings);
    //            $(that).html(btn);
    //        });

    //        return picker_preview;
    //    };

    //}(jQuery));

    //$('.img-picker').imagePicker({ name: 'images' });

    //$('#btn-add-hidden').on('click', function () {
    //    $('#main-navbar').addClass('navbar-collapse')
    //        .addClass('collapse');
    //})

    //$('#btn-remove-hidden').on('click', function () {
    //    setTimeout(function () {
    //        $('#main-navbar').removeClass('navbar-collapse')
    //            .removeClass('collapse')
    //    }, 350);
    //})

    var colorpicker = $('#colorpicker>li>span');
    for (var i = 0; i < colorpicker.length; i++) {
        var colorBtn = colorpicker.eq(i);
        var color = colorBtn.attr('_color');

        colorBtn.css('background-color', color);
    }

    colorpicker.on('click', function (e) {
        var color,
            target = $(e.target) || $(e.srcElement);

        colorpicker.css('border', '1px solid #ddd');
        if (color = target.attr('_color')) {
            $('#ObjectColor').val(color);
            target.css('border', '1px solid #f00');
            //console.log($('#ObjectColor').val());
        }
    });

    var colorpickerLine = $('#colorpickerLine>li>span');
    for (var i = 0; i < colorpickerLine.length; i++) {
        var colorBtn = colorpickerLine.eq(i);
        var color = colorBtn.attr('_color');

        colorBtn.css('background-color', color);
    }

    colorpickerLine.on('click', function (e) {
        var color,
            target = $(e.target) || $(e.srcElement);

        colorpickerLine.css('border', '1px solid #ddd');
        if (color = target.attr('_color')) {
            $('#ObjectColorLine').val(color);
            target.css('border', '1px solid #f00');
            //console.log($('#ObjectColorLine').val());
        }
    });

    /*
        SORT
    */

    //$('#check-all').change(function () {
    //    var checkboxes = $('input[name="checkbox"]');
    //    if ($(this).is(":checked")) {
    //        checkboxes.prop('checked', true);
    //    } else {
    //        checkboxes.prop('checked', false);
    //    }
    //}).change();

    $("#message-input").keyup(function () {
        var messages = $('.message-container'),
            title,
            description,
            group,
            text,
            i;

        for (i = 0; i < messages.length; i++) {
            if (title = messages.eq(i).find('.message-title')) text = title.text();
            if (description = messages.eq(i).find('.message-description')) text += description.text();
            if (group = messages.eq(i).find('.message-group')) text += group.text();

            if (text.length > 0) {
                var filter = new RegExp($("#message-input").val(), 'i');
                messages.eq(i)[filter.test(text) ? 'show' : 'hide']();
            }
        }
    });

    $("#btn-sort-by-index").on('click', function () {
        reclass($(this));
        messageSort('.message-index', $(this));
    });

    $("#btn-sort-by-title").on('click', function () {
        reclass($(this));
        messageSort('.message-title', $(this));
    });

    $("#btn-sort-by-discription").on('click', function () {
        reclass($(this));
        messageSort('.message-description', $(this));
    });

    $("#btn-sort-by-group").on('click', function () {
        reclass($(this));
        messageSort('.message-group', $(this));
    });

    function reclass(id) {
        var child = id.children('i');
        if (child.is('.up')) {
            child.removeClass('up');
            child.addClass('down');
        } else {
            child.addClass('up');
            child.removeClass('down');
        }
    }

    function messageSort(sortBy, id) {
        var messages,
            messagesF,
            messagesS,
            i,
            switching = true,
            shouldSwitch,
            child = id.children('i');

        while (switching) {
            switching = false;
            messages = $('.message-container');
            for (i = 0; i < messages.length - 1; i++) {
                shouldSwitch = false;
                messagesF = messages.eq(i).find(sortBy).text();
                messagesS = messages.eq(i + 1).find(sortBy).text();

                if (sortBy === '.message-index') {
                    if (child.is('.up')) {
                        if (parseInt(messagesF) > parseInt(messagesS)) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (parseInt(messagesF) < parseInt(messagesS)) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                } else {
                    if (child.is('.up')) {
                        if (messagesF.toUpperCase() > messagesS.toUpperCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    } else {
                        if (messagesF.toUpperCase() < messagesS.toUpperCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
            }
            if (shouldSwitch) {
                messages[i].parentNode.insertBefore(messages[i + 1], messages[i]);
                switching = true;
            }
        }
    }
});

