/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


'use strict'
// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

let createTweetElement = function(tweetData){

const user = tweetData.user
const content = tweetData.content
const handle = tweetData.user.handle
const date = tweetData.created_at

let $html = $("<article>").addClass("tweet");
$html.html(`<header>
                <img src="${user.avatars.regular}" alt="user-icon">
                <content>
                 ${user.name}
                </content>
                <div class="user-info">
                  ${user.handle}
                </div>
              </header>
              <content>
                ${content.text}
              </content>
              <footer>
                <p class="_from">${date}</p>
                <i class="fa fa-flag"></i>
                <i class="fa fa-retweet"></i>
                <i class="fa fa-heart"></i>
              </footer>`);
return $html
}

$('document').ready(function() {
var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#all-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});
