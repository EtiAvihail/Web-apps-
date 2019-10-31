import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Form.css"

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      passwordConfirm: "",
      redirectToLogin: false,
      invalidUserMsg: ""
    };
  }

  validateForm() {
    return this.state.user.length > 0 && this.state.password.length > 0 && this.state.password === this.state.passwordConfirm;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.user,
      password: this.state.password
    };

    axios
      .post(`http://localhost:8000/register/`, user)
      .then(res => {
        console.log("success signing up!");
        this.setState({
          redirectToLogin: true
        });
      })
      .catch(e => {
        console.log(e.response.data.errors[0])
        this.setState({
          invalidUserMsg: e.response.data.errors[0]
        });
      });
  }

  render() {
    const redirectToLogin = this.state.redirectToLogin;
    if (redirectToLogin === true) {
        return <Redirect to="/login" />;
    }
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="user">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel >Password</FormLabel >
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="passwordConfirm">
            <FormLabel >Confirm Password</FormLabel >
            <FormControl
              value={this.state.passwordConfirm}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Signup
          </Button>
        </form>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "red" }}>{this.state.invalidUserMsg}</p>
        </div>
      </div>
    );
  }
}