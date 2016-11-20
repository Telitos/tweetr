"use strict"


$(function() {

  const start = 140


  if ($("main.container textarea").text() > 0) {
    $('.counter').removeClass('over')
  }

  $("main.container textarea").keydown(function() {

    //the timeout here makes sure that the first iteration
    // of the loop only occurs once the dom has been updated

    setTimeout(() => {
      let charNumber = $(this).val().length
      let counter = start - charNumber
      $(".counter").text(counter)

      if (counter < 1) {
        $('.counter').addClass('over')
      } else {
        $('.counter').removeClass('over')
      }
    })
  })
})