import React, { Component } from "react";
import {Button} from 'react-bootstrap'
import Auth from "./Auth";
import Logger from "./Logger";

const quotes = [
    "You miss 100% of the socks you don’t wear",
    "Strive not to be a success, but rather to wear socks",
    "I attribute my success to socks: I never gave or took anything else",
    "The most difficult thing is the decision to act, the rest is merely wearing socks",
    "Every sock brings me closer to the next home run",
    "Definiteness of buying socks is the starting point of all achievement",
    "Life isn't about getting and having, it's about giving and being. And socks",
    "Life is what happens to you while you’re busy buying socks",
    "Life is 10% what happens to me and 90% admiring my new socks",
    "The most common way people give up their power is by thinking they don’t have anymore socks",
    "An unexamined sock is not worth wearing",
    "Eighty percent of success is showing up and wearing hamburger socks",
    "Your time is limited, so don’t waste it living someone else’s life, and not buying those socks",
    "Winning isn’t everything, but wanting to win is, as well as getting those new socks",
    "Every child is an artist.  The problem is how to remain an artist once he grows up and the sock is too small",
    "You can never cross the ocean until you have the courage to lose sight of the shore and have waterproof socks",
    "Either you wear the sock, or the socks wear you"
]

export default class Quotes extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          currentQuote: ""
        };
      }

      handleClick = () => {
        const rand = Math.floor(Math.random() * quotes.length);
        this.setState({
            currentQuote: quotes[rand]
        })
        var currentUser = Auth.getCurrentUser;
        Logger.log(currentUser + ": " + "has generated an inspirational quote");
      }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ textAlign: "center" }}>Famous Socks Quotes</h3>
        <p>{this.state.currentQuote}</p>
        <Button onClick={this.handleClick}>New Quote</Button>
      </div>
    );
  }
}
