"use strict";

var MIN_SLIDE_HEIGHT_PX = 200;
var EXTRA_SPACE_AFTER_SLIDES_PX = 35;

$(document).ready(function ()
{
    $("#media-show").slick({
        infinite: true,
        dots: true,
        waitForAnimate: false,
        variableWidth: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px"
    });

    recomputeMediaSize();
});

setInterval(function ()
{
    recomputeMediaSize();
}, 500);

$(window).resize(function ()
{
    recomputeMediaSize();
});

var _lastWindowHeight = null, _lastWindowWidth = null;
function recomputeMediaSize()
{
    var currentWindowHeight = $(window).height(), currentWindowWidth = $(window).width();
    if (_lastWindowHeight != currentWindowHeight || _lastWindowWidth != currentWindowWidth)
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

        carousel.slick("slickGoTo", carousel.slick("slickCurrentSlide"), true);
    }
}

