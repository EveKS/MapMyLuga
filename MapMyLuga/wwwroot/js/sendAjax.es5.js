'use strict';

function sendMessageTelegram($form, formData) {
    var btn = $form.find('input:submit');
    btn.button('loading');

    console.log('test');

    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: formData,
        cache: false,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function success(data) {
            if (data.redirect) {
                window.location = data.redirect;
            } else {
                $form.trigger('reset').find('.img-picker').html('').imagePicker({ name: 'images' });
            }
        },
        error: function error(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    }).always(function () {
        btn.button('reset');
    });
}

$('#createMessageForm, #messageEditForm, #sendMessageForm').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $form = $(this),
        inp,
        formData = new FormData($form.get(0));

    inp = $(this).find('input:file');
    $.each(inp.prop('files'), function (key, value) {
        if (value.type.match(/(.png)|(.jpeg)|(.jpg)|(.gif)|(.bmp)$/i)) {
            formData.append('UploadedFiles', value);
            console.log(value);
        }
    });

    sendMessageTelegram($form, formData);
});

