const Twitter = require("twitter");

let twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = function socket(io) {
  io.of("tweet");
  twitter.stream("statuses/filter", { track: "lyon" }, function(stream) {
    stream.on("data", function(data) {
      io.sockets.emit("tweet", data);
    });
  });
};
