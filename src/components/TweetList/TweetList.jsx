import React, {Component} from "react";
import socketIOClient from "socket.io-client";
import TweetEmbed from "react-tweet-embed";
import {API_URL} from "../../config";

class TweetList extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    const socket = socketIOClient(API_URL);
    socket.on("connect", () => {
      console.log("Socket Connected");
      socket.on("tweet", data => {
        let newList = [data].concat(this.state.items);
        this.setState({ items: newList });
      });
    });
    socket.on("disconnect", () => {
      socket.removeAllListeners("tweet");
      console.log("Socket Disconnected");
    });
  }

  render() {
    return (
      <div>
        {this.state.items.map(tweet => {
          return <TweetEmbed id={tweet.id_str} key={tweet.id} />;
        })}
      </div>
    );
  }
}
export default TweetList;
