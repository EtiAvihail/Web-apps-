
import React, { Component } from "react";

export default class ReadMe extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h3 style={{ textAlign: "center" }}>Read Me - Eti Avihail</h3>
        <h4>ID -311143911</h4>
        <p>Store name - Sami's Socks</p>
        <p>We sell socks</p>
          <p>
        in addition to the requested pages, we added also a page with random quoits, whenever you press on the "" bottom a new random quoit appears.<br>
              the second page we added is a page with different videos about socks.
          </p>
          <p>
          The hardest part of the project for me was understanding what exactly should be part of the front-end and what should be part of the back-end.
        </p>
        <p>
          My partner is Alon Rabinovich, 205667249, my part was mainly the server-side with a bit of the login and register
            screens and Alon was in charge of client-side
        </p>
        <p>
          <b>Routes:</b>
          <br />
          /login - login screen
          <br />
          /register - register screen
          <br />
          /admin - admin screen for user activity
          <br />
          / - main store screen
          <br />
          /cart - cart screen
          <br />
          /blog - additional component - blog screen
          <br />
          /quotes - additional component - inspritional quotes screen
          <br />
          /checkout - checkout screen
          <br />
        </p>
        <p>
          For security we used express-rate-limit to prevent DDOS and also the
          helmet package, in addition, we managed sessions and cookies both on
          client and the server side
        </p>
          <p>yes, we did use react.js</p>
      </div>
    );
  }
  }
