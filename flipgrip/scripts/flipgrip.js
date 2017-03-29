"use strict";

var MIN_SLIDE_HEIGHT_PX = 200;
var EXTRA_SPACE_AFTER_SLIDES_PX = 35;

var carousel = null;

var _ready = false;
$(document).ready(function ()
{
    _ready = true;
    carousel = $("#media-show");

    carousel.slick({
        lazyLoad: "progressive",
        infinite: true,
        dots: true,
        waitForAnimate: false,
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px"
    });
    carousel.on("lazyLoaded", function (event, slick, image, imageSource)
    {
        image.css("display", "block");
        refreshCarousel();
    });

    recomputeMediaSize(true);
    setInterval(function () { recomputeMediaSize(false); }, 500);
    $(window).resize(function () { recomputeMediaSize(false); });
});

$(window).on("load", function ()
{
    if (_ready)
        recomputeMediaSize(true);
});

var _lastWindowHeight = null, _lastWindowWidth = null;
function recomputeMediaSize(forced)
{
    var currentWindowHeight = $(window).height(), currentWindowWidth = $(window).width();
    if (forced || _lastWindowHeight != currentWindowHeight || _lastWindowWidth != currentWindowWidth)
    {
        _lastWindowHeight = currentWindowHeight;
        _lastWindowWidth = currentWindowWidth;

        var slide = $("#media-show .slick-slide");
        var slide_height = Math.max(MIN_SLIDE_HEIGHT_PX, currentWindowHeight - $("#logo").outerHeight(true) - $("#media-show-container").outerHeight(true) - EXTRA_SPACE_AFTER_SLIDES_PX + slide.height());
        var carousel = $("#media-show");

        slide.css({
            "max-height": slide_height + "px",
            "max-width": carousel.width() + "px"
        });

        refreshCarousel();
    }
}

function refreshCarousel()
{
    carousel.slick("slickGoTo", carousel.slick("slickCurrentSlide"), true);
}