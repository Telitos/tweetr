"use strict"

$(function() {

  const start = 140
  const $textarea = $("main.container textarea")
  const $counter = $(".new-tweet .counter")

  if ($textarea.text() > 0) {
    $counter.removeClass("over")
  }

  $textarea.keydown(function() {

    //set a timeout so that the first character is counted
    //otherwise the lenght is only updated after the first keydown
    setTimeout(() => {
      let charNumber = $(this).val().length
      let counter = start - charNumber
      $counter.text(counter)

      if (counter < 1) {
        $counter.addClass("over")
      } else {
        $counter.removeClass("over")
      }
    })
  })
})