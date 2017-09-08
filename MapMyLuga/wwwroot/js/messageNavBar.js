$("#message-input").keyup(function () {
    var
        messages = $('.message-container'),
        title, description, group, text, i,
        position;

    for (i = 0; i < messages.length; i++) {
        if (title = messages.eq(i).find('.message-title'))
            text = title.text();
        if (description = messages.eq(i).find('.message-description'))
            text += description.text();
        if (group = messages.eq(i).find('.message-group'))
            text += group.text();
        if (position = messages.eq(i).find('.message-position'))
            text += position.text();

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
    var
        messages, messagesF, messagesS, i,
        switching = true, shouldSwitch,
        child = id.children('i');

    while (switching) {
        switching = false;
        messages = $('.message-container');
        for (i = 0; i < (messages.length - 1); i++) {
            shouldSwitch = false;
            messagesF = messages.eq(i).find(sortBy).text();
            messagesS = messages.eq(i + 1).find(sortBy).text();

            if (sortBy === '.message-index') {
                if (child.is('.down')) {
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
                if (child.is('.down')) {
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
            (messages)[i].parentNode.insertBefore(messages[i + 1], messages[i]);
            switching = true;
        }
    }
}