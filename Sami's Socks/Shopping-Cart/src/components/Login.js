import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Auth from "./Auth";
//import "./Form.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      rememberMe: false,
      redirectToReferrer: false,
      invalidUserMsg: "",
      isAdmin: false
    };
  }

  validateForm() {
    return this.state.user.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleChecked = e => {
    this.setState({
      rememberMe: e.target.checked
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.user,
      password: this.state.password,
      rememberMe: this.state.rememberMe
    };

    axios
      .post(`http://localhost:8000/login/`, user)
      .then(res => {
        console.log("success!");
        console.log(res.data["uuid"]);
        var isAdmin = false;
        if (user.username === "admin") {
          this.setState({
            isAdmin: true
          });
          isAdmin = true;
        }
        Auth.authenticate(res.data["uuid"], user.username, isAdmin, user.rememberMe);
        this.setState({
          redirectToReferrer: true
        });
      })
      .catch(e => {
        console.log("invalid login attempt");
        this.setState({
          invalidUserMsg: "Invalid username or password!"
        });
      });
  };

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer === true) {
      if (this.state.isAdmin) {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="user" bssize="large">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <label>
            <input
              type="checkbox"
              ref="rememeberMe"
              onChange={this.handleChecked}
            />
            <span>Remember me</span>
          </label>
          <Button
            block
            bssize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "red" }}>{this.state.invalidUserMsg}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <p>
            Don't have an account?<a href="/Signup"> Sign up</a>
          </p>
        </div>
      </div>
    );
  }
}
