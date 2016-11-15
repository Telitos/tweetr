"use strict"


$(function() {

  $("main.container textarea").keydown(function() {
    const start = 140
    let charNumber = $(this).val().length
    let counter = start - charNumber
    //Find a way to store the element $(this).siblings('/coutner')
    //into a variable. Why did it not work?
    $(this).siblings('.counter').text(counter)

    if ($(this).siblings('.counter').text() < 1) {
      $(this).siblings('.counter').css("color","red")
    } else {
      $(this).siblings('.counter').css("color","blue")
    }
  })
})