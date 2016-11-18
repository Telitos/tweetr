"use strict"


$(function() {

  $("main.container textarea").keydown(function() {


    const start = 140
    //the timeout here makes sure that the first iteration
    // of the loop only occurs once the dom has been updated

    setTimeout(() => {
      let charNumber = $(this).val().length
      let counter = start - charNumber
      //Find a way to store the element $(this).siblings('/coutner')
      //into a variable. Why did it not work?
      $(".counter").text(counter)

      if (counter < 1) {
        $('.counter').addClass('over')
      } else {
        $('.counter').removeClass('over')
      }
    })
  })
})