/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


'use strict'
// Test / driver code (temporary). Eventually will get this from the server.


const renderTweets = function (tweets) {

  tweets.forEach(function(tweet) {
    const $tweet = createTweetElement(tweet)
    $('#all-tweets').prepend($tweet);
  })
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
}


const createTweetElement = function(tweetData){

  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  const user = tweetData.user
  const content = tweetData.content
  const handle = tweetData.user.handle
  const date = tweetData.created_at


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
    <content>
      ${escape(content.text)}
    </content>
    <footer>
      <p class="_from">${escape(date)}</p>
      <i class="fa fa-flag"></i>
      <i class="fa fa-retweet"></i>
      <i class="fa fa-heart"></i>
    </footer>`
    );
  return $html
}

const uploadTweets = function() {

  let $form = $("main.container .new-tweet form")

  $($form).on('submit', function(event) {

    event.preventDefault()

    const char = $(this).text()
    const text = $(this).serialize()

//something is wrong with this code, double clicking on tweet will let the tweet go thru even if its over character
    if (char < 0 ) {
      $('textarea').addClass('error')
      $('main.container .new-tweet .error-message').text("You are over the charater limit!")

      setTimeout(() => {
        $('textarea').removeClass('error');
      }, 200)
      setTimeout(() => {
        $('main.container .new-tweet .error-message').text("")
      }, 1500)
    } else if ($("textarea").val() === "") {
        $('textarea').addClass('error')
        $('main.container .new-tweet .error-message').text("You didn't write anything!")

        setTimeout(() => {
          $('textarea').removeClass('error');
        }, 200)
        setTimeout(() => {
          $('main.container .new-tweet .error-message').text("")}, 1500)
      } else {
          $.ajax({
            url: "/tweets",
            method: "POST",
            data:  text,
            success: function() {
              loadTweets()
              $("textarea").val("")
              $(".counter").text(140)
              $(".counter").removeClass("over")
            }
          });
        }
      })
}
// when do you load the tweets? clear page first? then load tweets?
const clearTweets = function() {
    let $section = $("main.container #all-tweets")
    $section.html("")
  }

const loadTweets = function () {
  $.get("/tweets", function(data) {
    clearTweets()
    renderTweets(data)
  })
}

$('document').ready(function() {

uploadTweets()
loadTweets()

})