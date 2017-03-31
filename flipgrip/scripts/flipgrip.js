"use strict";

//The bare minimum height of the slides.
var MIN_SLIDE_HEIGHT_PX = 200;

//The minimum extra space to keep after the slides.
var EXTRA_SPACE_AFTER_SLIDES_PX = 35;

//Reference to the page's header containing the logo.
var header = null;

//Reference to the page's media carousel/slider.
var carousel = null;

//Reference to the bxSlider component of the carousel.
var sliderHandler = null;

//Reference to the carousel's arrow controls.
var arrows = null;

//Reference to the carousel's container whose max-width will be adjusted so as to never exceed the width of the window minus the width of the scrollbar.
var carouselAdjuster = null;

var _ready = false;
$(document).ready(function ()
{
    _ready = true;

    header = $("header");
    carousel = $("#media-show");
    carouselAdjuster = $("#media-show-adjuster");

    carousel.css("display", "block");//Start displaying the carousel

    //Initialize the slider
    sliderHandler = carousel.bxSlider({
        moveSlides: 1,
        slideMargin: 30,
        speed: 300,
        keyboardEnabled: true,
        responsive: false//We'll handle responsiveness ourselves and ask the slider to redraw when appropriate
    });

    arrows = $("#media-show-container .bx-controls-direction");

    //Compute optimal element sizes and subscribe to window resize event (also recompute sizes automatically when window resize event isn't received)
    recomputeElementSizes(true);
    $(window).resize(function () { recomputeElementSizes(false); });
    setInterval(function () { recomputeElementSizes(false); }, 250);
});

$(window).on("load", function ()
{
    if (_ready)
        recomputeElementSizes(true);//Recompute sizes once all content is loaded (unless document.ready hasn't run yet)
});

//Shows/hides the arrow controls of the carousel.
function showArrows(show)
{
    arrows.css("opacity", show ? 1 : 0);
}

var _lastWindowHeight = null, _lastWindowWidth = null, _lastWindowWidthWithScrollbar = null, _lastCarouselWidth = null;
//Readapts element sizes to optimal values, e.g. allowing the maximum height of the carousel's slides to reach the bottom of the page minus EXTRA_SPACE_AFTER_SLIDES_PX.
//Does not execute unless "forced" is true or the window's size changed since the last execution.
function recomputeElementSizes(forced)
{
    var currentWindowHeight = $(window).height(), currentWindowWidth = $(window).width(), currentWindowWidthWithScrollbar = window.innerWidth;
    if (forced || _lastWindowHeight != currentWindowHeight || _lastWindowWidth != currentWindowWidth)
    {
        if (_lastCarouselWidth != null && _lastWindowWidthWithScrollbar == currentWindowWidthWithScrollbar)
            _lastCarouselWidth = Math.min(_lastCarouselWidth, currentWindowWidth);
        else
            _lastCarouselWidth = currentWindowWidth;

        _lastWindowHeight = currentWindowHeight;
        _lastWindowWidth = currentWindowWidth;
        _lastWindowWidthWithScrollbar = currentWindowWidthWithScrollbar;

        carouselAdjuster.css("max-width", _lastCarouselWidth + "px");

        var slide = $("#media-show img");
        var slide_height = Math.max(MIN_SLIDE_HEIGHT_PX, currentWindowHeight - header.outerHeight(true) - $("#media-show-container").outerHeight(true) - EXTRA_SPACE_AFTER_SLIDES_PX + slide.height());
        slide.css("max-height", slide_height + "px");
        sliderHandler.redrawSlider();
    }
}