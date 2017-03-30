"use strict";

//The bare minimum height of the slides.
var MIN_SLIDE_HEIGHT_PX = 200;

//The minimum extra space to keep after the slides.
var EXTRA_SPACE_AFTER_SLIDES_PX = 35;

//Reference to the element that wraps all elements inside the page's body.
var wrapper = null;

//Reference to the page's header containing the logo.
var header = null;

//Reference to the page's media carousel/slider.
var carousel = null;

//Reference to the bxSlider component of the carousel.
var sliderHandler = null;

//Reference to the carousel's arrow controls.
var arrows = null;

//Reference to the element that fills space between the main content and the footer when the window is taller than the content.
var preFooterFiller = null;

var _ready = false;
$(document).ready(function ()
{
    _ready = true;

    wrapper = $("#wrapper");
    header = $("header");
    carousel = $("#media-show");
    preFooterFiller = $("#pre-footer-filler");

    carousel.css("display", "block");//Start displaying the carousel

    //Initialize the slider
    sliderHandler = carousel.bxSlider({
        moveSlides: 1,
        slideMargin: 30,
        speed: 300,
        keyboardEnabled: true
    });

    arrows = $("#media-show-container .bx-controls-direction");

    //Compute optimal element sizes and subscribe to window resize event (also recompute sizes automatically when window resize event isn't received)
    recomputeElementSizes(true);
    $(window).resize(function () { recomputeElementSizes(false); });
    setInterval(function () { recomputeElementSizes(false); }, 500);
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

var _lastWindowHeight = null, _lastWindowWidth = null;
//Readapts element sizes to optimal values, e.g. allowing the maximum height of the carousel's slides to reach the bottom of the page minus EXTRA_SPACE_AFTER_SLIDES_PX.
//Does not execute unless "forced" is true or the window's size changed since the last execution.
function recomputeElementSizes(forced)
{
    var currentWindowHeight = window.innerHeight, currentWindowWidth = window.innerWidth;
    if (forced || _lastWindowHeight != currentWindowHeight || _lastWindowWidth != currentWindowWidth)
    {
        _lastWindowHeight = currentWindowHeight;
        _lastWindowWidth = currentWindowWidth;

        var slide = $("#media-show img");
        var slide_height = Math.max(MIN_SLIDE_HEIGHT_PX, currentWindowHeight - header.outerHeight(true) - $("#media-show-container").outerHeight(true) - EXTRA_SPACE_AFTER_SLIDES_PX + slide.height());
        slide.css("max-height", slide_height + "px");
        sliderHandler.redrawSlider();

        var footerFillerHeight = Math.max(0, currentWindowHeight - wrapper.outerHeight(true) + preFooterFiller.height());
        preFooterFiller.css("height", footerFillerHeight + "px");

        recomputeElementSizes(false);
    }
}