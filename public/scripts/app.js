/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

"use strict"
// Test / driver code (temporary). Eventually will get this from the server.
$("document").ready(function() {

//timeEllapsed function will print how long it has been since the tweet has been posted.
const timeEllapsed = function(publicationDate) {

  const millisecondsEllapsed = (Date.now() - publicationDate)
  const secondsEllpased = parseInt(millisecondsEllapsed/1000)%60
  const minutesEllapsed = parseInt(millisecondsEllapsed/(1000*60))%60
  const hoursEllapsed = parseInt(millisecondsEllapsed/(1000*60*60))%24
  const daysEllapsed = parseInt(millisecondsEllapsed/(1000*60*60*24))%24

  let timeEllapsed = "Posted "

  if (daysEllapsed === 1) {
    timeEllapsed += `yesterday`
  } else if (daysEllapsed > 1) {
    timeEllapsed += `${daysEllapsed} days ago`
  } else if (hoursEllapsed === 1) {
    timeEllapsed += `about an hour ago`
  } else if (hoursEllapsed > 1) {
    timeEllapsed += `about ${hoursEllapsed} hours ago`
  } else if (minutesEllapsed === 1) {
    timeEllapsed += `about a minute ago`
  } else if (minutesEllapsed > 1) {
    timeEllapsed += `about ${minutesEllapsed} minutes ago`
  } else {
    timeEllapsed += `less than a minute ago`
  }
  return timeEllapsed
}

//rendTweets will render each tweets stored in the database on the page, reversing the order
//of the array in the database.
const renderTweets = function (tweets) {

  tweets.forEach(function(tweet) {
    const $tweet = createTweetElement(tweet)
    $("#all-tweets").prepend($tweet);
  })
}

//createTweetElement will create the html tweet element
const createTweetElement = function(tweetData) {

  function escape(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const user = tweetData.user
  const content = tweetData.content
  const handle = tweetData.user.handle
  const date = timeEllapsed(tweetData.created_at)


  let $html = $("<article>").addClass("tweet");
  $html.html(`
    <header>
      <img src="${escape(user.avatars.regular)}" alt="user-icon">
      <content>
       ${escape(user.name)}
      </content>
      <div class="user-info">
        ${escape(user.handle)}
      </div>
    </header>
    <content class = "text">
      ${escape(content.text)}
    </content>
    <footer>
      <p class="_from">${(date)}</p>
      <i class="fa fa-flag"></i>
      <i class="fa fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </footer>`
    );
  return $html
}

//errorMessage function that will print an error message whenever the tweet
//does not comply with min and max characters limit.
const errorMessage = function ($element, message) {
  const $errorMessage = $("main.container .new-tweet .error-message")
  $element.addClass("error")
  $errorMessage.text(message)

  setTimeout(() => {
    $element.removeClass("error")
  }, 200)
  setTimeout(() => {
    $errorMessage.text("")
  }, 1500)
}

//clearTweets will clear the all-tweets section on index.html
const clearTweets = function() {
  let $section = $("main.container #all-tweets")
  $section.html("")
}

//loadTweets makes a get request to the server to obtain the tweets stored in the database
//and calls renderTweets
const loadTweets = function () {
  $.get("/tweets", function(data) {
    clearTweets()
    renderTweets(data)
  })
}

//uploadTweets makes a post request to the server to upload a new tweet and calls
//loadTweets upon success
const uploadTweets = function() {

  const $form = $("main.container .new-tweet form")

  $($form).on("submit", function(event) {

    event.preventDefault()

    const $char = $(".new-tweet .counter").html()
    const $text = $(this).serialize()
    const $textarea = $(".container .new-tweet textarea")

    if ($char < 0 ) {
     errorMessage($textarea, "You are over the charater limit!")
    } else if ($textarea.val().trim() === "") {
        errorMessage($textarea, "You didn't write anything!")
    } else {
        $.ajax({
          url: "/tweets",
          method: "POST",
          data:  $text,
          success: function() {
            loadTweets()
            $char.val("")
            $char.html(140)
            $char.removeClass("over")
          }
        })
      }
    })
}

uploadTweets()
loadTweets()

})