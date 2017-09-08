(function ($) {
    $.fn.imagePicker = function (options) {

        // Define plugin options
        var settings = $.extend({
            // Input name attribute
            name: "",
            // Classes for styling the input
            class: "form-control btn btn-default btn-block",
            // Icon which displays in center of input
            icon: "glyphicon glyphicon-plus"
        }, options);

        if ($(this).children().eq(0).is('img')) {
            return this.each(function () {
                var src = $(this).children().eq(0).attr('src');
                var picker_btn_input = $('<input type="file" name="' + settings.name + '" />');

                $(this).html(create_preview(this, src, settings, picker_btn_input));
            })
        } else {
            return this.each(function () {
                $(this).html(create_btn(this, settings));
            });
        }
    };

    // Private function for creating the input element
    function create_btn(that, settings) {
        // The input icon element
        var picker_btn_icon = $('<i class="' + settings.icon + '"></i>');

        // The actual file input which stays hidden
        var picker_btn_input = $('<input type="file" name="' + settings.name + '" />');

        // The actual element displayed
        var picker_btn = $('<div class="' + settings.class + ' img-upload-btn"></div>')
            .append(picker_btn_icon)
            .append(picker_btn_input);

        // File load listener
        picker_btn_input.change(function () {
            picker_btn_input.show();
            if ($(this).prop('files')[0]) {
                // Use FileReader to get file
                var reader = new FileReader();

                // Create a preview once image has loaded
                reader.onload = function (e) {
                    var preview = create_preview(that, e.target.result, settings, picker_btn_input);
                    $(that).html(preview);
                }

                // Load image
                reader.readAsDataURL(picker_btn_input.prop('files')[0]);
            }
        });

        return picker_btn
    };

    // Private function for creating a preview element
    function create_preview(that, src, settings, picker_btn_input) {
        picker_btn_input.hide();

        // The preview image
        var picker_preview_image = $('<div><img src="' + src + '" class="img-rounded img-responsive" style="display: initial;" /></div>');

        // The remove image button
        var picker_preview_remove = $('<div><button class="btn btn-link"><small>Удалить</small></button></div>');

        // The preview element
        var picker_preview = $('<div class="text-center center-block"></div>')
            .append(picker_preview_image)
            .append(picker_preview_remove)
            .append(picker_btn_input);

        // Remove image listener
        picker_preview_remove.click(function () {
            var btn = create_btn(that, settings);
            picker_btn_input.val("");
            $('#FileIsDelet').val('true');

            $(that).html(btn);
        });

        return picker_preview;
    };

}(jQuery));

$('.img-picker').imagePicker({ name: 'images' });