"use strict"

$(function() {

  //defines behavior of compose button
  $("#nav-bar .button").on("click", function() {
    $("main.container .new-tweet").slideToggle(500)
  })
})