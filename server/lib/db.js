"use strict";

const initialTweets = require("./tweets");

const db = { tweets: initialTweets };

// below is a database method (what to do to the database that is being passed as an argument.)
const dbMethods = {

  saveTweet: (data) => {
    db.tweets.push(data);//could we modity this line to push the data in a different order?
    return true;
  },

  getTweets: () => {
    // sorts tweets in chron. order.// I'm going to reverse this just to see what happens
    return db.tweets.sort(function(a, b) { return a.created_at - b.created_at });
  }

}

module.exports = {
  // call connect to apply a function to dbMethods. What kind of function though?
  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
