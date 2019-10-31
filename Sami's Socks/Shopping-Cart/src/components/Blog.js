import React, { Component } from "react";
import YouTube from "react-youtube";
//import "./Form.css";

const posts = {
  items: [
    {
      id: 1,
      videoid: "bQGj3F5KTB8",
      title: "The socks song"
    },
    {
      id: 2,
      videoid: "gfhhw_GyL0E",
      title: "22 old socks ideas"
    },
    {
      id: 3,
      videoid: "chucPcesBTc",
      title: "Waterproof socks? Take my money!"
    },
    {
      id: 4,
      videoid: "9bmK6_r7MAE",
      title: "Men guide for socks"
    },
    {
      id: 5,
      videoid: "LYnVCHWSscA",
      title: "Shoes & boots guide"
    }
  ]
};

export default class Blog extends Component {
  render() {
    const postitems = posts.items.map(post => (
      <div key={post.id} style={{ alignItems: "center" }}>
        <h5 style={{ alignContent: "center" }}>{post.title}</h5>
        <YouTube videoId={post.videoid} />
      </div>
    ));
    return (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ textAlign: "center" }}>Sami's blog</h3>
        {postitems}
      </div>
    );
  }
}
