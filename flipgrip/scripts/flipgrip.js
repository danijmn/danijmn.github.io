$(document).ready(function ()
{
    $("#media-show").slick({
        lazyLoad: "progressive",
        infinite: true,
        dots: true,
        waitForAnimate: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "60px"
    });
});