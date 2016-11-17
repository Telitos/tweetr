"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();//???

module.exports = function(db) {

  tweets.get("/", function(req, res) {
    //what is this getTweets() function?
    let tweets = db.getTweets();
    // simulate delay (why simulate delay? try playing around with it)
    setTimeout(() => {
      return res.json(tweets);
    }, 300);
  });

  tweets.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    //is the line above just faking, since we do not have any registered users?
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.saveTweet(tweet);
    return res.send();
  });

  return tweets;

}


