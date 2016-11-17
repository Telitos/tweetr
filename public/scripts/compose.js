"use strict"

$(function() {

  $("#nav-bar .button").on('click', function() {
    $("main.container .new-tweet").slideToggle(500)
  })
})