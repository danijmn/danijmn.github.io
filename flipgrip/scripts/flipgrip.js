"use strict";

var MIN_SLIDE_HEIGHT_PX = 200;
var EXTRA_SPACE_AFTER_SLIDES_PX = 35;

var carousel = null;
var logo = null;
var sliderHandler = null;

var _ready = false;
$(document).ready(function ()
{
    _ready = true;

    carousel = $("#media-show");
    logo = $("#logo");

    sliderHandler = carousel.bxSlider({
        moveSlides: 1,
        slideMargin: 30,
        speed: 300,
        pagerType: "short",
        keyboardEnabled: true
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

        var slide = $("#media-show img");
        var slide_height = Math.max(MIN_SLIDE_HEIGHT_PX, currentWindowHeight - logo.outerHeight(true) - $("#media-show-container").outerHeight(true) - EXTRA_SPACE_AFTER_SLIDES_PX + slide.height());
        slide.css("max-height", slide_height + "px");
        sliderHandler.redrawSlider();
    }
}