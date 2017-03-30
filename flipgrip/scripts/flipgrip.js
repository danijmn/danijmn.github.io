"use strict";

//The bare minimum height of the slides.
var MIN_SLIDE_HEIGHT_PX = 200;

//The minimum extra space to keep after the slides.
var EXTRA_SPACE_AFTER_SLIDES_PX = 35;

//Reference to the page's media carousel/slider.
var carousel = null;

//Reference to the page's header containing the logo.
var header = null;

//Reference to the bxSlider component of the carousel.
var sliderHandler = null;

var _ready = false;
$(document).ready(function ()
{
    _ready = true;

    carousel = $("#media-show");
    header = $("header");

    carousel.css("display", "block");//Start displaying the carousel

    //Initialize the slider
    sliderHandler = carousel.bxSlider({
        moveSlides: 1,
        slideMargin: 30,
        speed: 300,
        keyboardEnabled: true
    });

    //Compute slider size and subscribe to window resize event (also recompute slider size automatically when window resize event isn't received)
    recomputeMediaSize(true);
    $(window).resize(function () { recomputeMediaSize(false); });
    setInterval(function () { recomputeMediaSize(false); }, 500);
});

$(window).on("load", function ()
{
    if (_ready)
        recomputeMediaSize(true);//Recompute slider size once all content is loaded (unless document.ready hasn't run yet)
});

var _lastWindowHeight = null, _lastWindowWidth = null;
//Readapts the maximum height of the carousel's slides to the bottom of the page minus EXTRA_SPACE_AFTER_SLIDES_PX.
//Does not execute unless "forced" is true or the window's size changed since the last execution.
function recomputeMediaSize(forced)
{
    var currentWindowHeight = $(window).height(), currentWindowWidth = $(window).width();
    if (forced || _lastWindowHeight != currentWindowHeight || _lastWindowWidth != currentWindowWidth)
    {
        _lastWindowHeight = currentWindowHeight;
        _lastWindowWidth = currentWindowWidth;

        var slide = $("#media-show img");
        var slide_height = Math.max(MIN_SLIDE_HEIGHT_PX, currentWindowHeight - header.outerHeight(true) - $("#media-show-container").outerHeight(true) - EXTRA_SPACE_AFTER_SLIDES_PX + slide.height());
        slide.css("max-height", slide_height + "px");
        sliderHandler.redrawSlider();
        recomputeMediaSize(false);
    }
}

//Shows/hides the arrow controls of the carousel.
function showArrows(show)
{
    $("#media-show-container .bx-controls-direction").css("opacity", show ? 1 : 0);
}