"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter" //do we need these here as well?

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  console.log("this is the db on the dataHelper side:", db)
  console.log("dmakedatahelper was called!")
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.tweets.push(newTweet);
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    // getTweets: function(callback) {
    //   simulateDelay(() => {
    //     const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    //     callback(null, db.tweets.sort(sortNewestFirst));
    //   });
    // }

    getTweets: function(callback) {
      console.log("that's the database:", db)
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err)
        }
        callback(null, tweets)
      })
    }
  };
}
