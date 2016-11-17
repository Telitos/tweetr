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
    $('#all-tweets').append($tweet);
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

    if (char < 0 || $("textarea").val() === "") {
      $('textarea').addClass('error')

      setTimeout(() => {
        $('textarea').removeClass('error');
      }, 150)
      // setTimeout(() => {
      //   $('textarea').val("")
      // }, 1000)
      // more code needed here
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data:  text,
        success: function() {
          loadTweets()
          $("textarea").val("")
          console.log("POST request made for tweet:", text)
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
    console.log("tweets loaded!")
  })
}

$('document').ready(function() {

uploadTweets()
loadTweets()

})