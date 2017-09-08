$(function () {
    $('#panel-content').on('click', '#btn-exit-panel', function () {        
        $('#panel-content').removeClass("info-map-panel-visible");
    });
});

function imageSlider() {
    var slideIndex = 1;
    showSlides(slideIndex);

    $('body').on('click', '#image-prev', function () {
        plusSlides(-1);
    });
    $("#image-next").click(function () {
        plusSlides(1);
    });

    /* СОБЫТИЯ НА ТЕЛЕФОНЕ */
    $('body #image-modal').on('swipeleft', function () {
        plusSlides(-1);
    });

    $('body #image-modal').on('swiperight', function () {
        plusSlides(1);
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        var i, slides;

        slides = $("body .image-slider");
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }

        for (i = 0; i < slides.length; i++) {
            slides.eq(i).css('display', 'none');
        }

        slides.eq(slideIndex - 1).css('display', 'block');
    }
}
