"use strict";

//The default color of the background
var DEFAULT_BG_COLOR = "rgb(285, 185, 145)";

//The color of the background when the button to Flip Grip is hovered
var FLIPGRIP_BG_COLOR = "rgb(170, 0, 255)";

$(document).ready(function ()
{
    changeBG(null);//Set default BG color
});

//Adapts the color of the background to the specified game
function changeBG(game)
{
    $(document.body).css("background-color", game === "flipgrip" ? FLIPGRIP_BG_COLOR : DEFAULT_BG_COLOR);
}