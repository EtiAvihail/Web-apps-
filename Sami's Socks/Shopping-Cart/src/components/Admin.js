import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      logsReady: false,
      searchQuery: ""
    };
    var c = Cookies.get("sessID");
    axios
      .post("http://localhost:8000/logs", { sessID: c })
      .then(res => {
        console.log("user logs fetched");
        this.setState({
          logs: res.data.logs,
          logsReady: true
        });
      })
      .catch(e => {
        console.log("can't retrieve user logs");
        console.log(e);
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    var query = this.state.searchQuery.toLowerCase();
    let filterredLogs = this.state.logs.filter( function (log) {
        return log.toLowerCase().includes(query);
    });
    return !this.state.logsReady ? (
      <div style={{ textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    ) : (
      <div className="container">
        <h3 className="center">Users activity</h3>
        <div className="box">
          <form onSubmit={(event => {event.preventDefault()})}>
            <FormGroup controlId="searchQuery">
              <FormLabel>Search</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.searchQuery}
                onChange={this.handleChange}
              />
            </FormGroup>
          </form>
          <ul>
            {filterredLogs.map(function(log) {
              return <li key={log}>{log}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Admin;

/*
import React from 'react';

class Users extends React.Component {
  render() {
    let friends = this.props.list.filter( function (user) {
      return user.friend === true
    });

    let nonFriends = this.props.list.filter( function (user) {
      return user.friend !== true
    });

    return (
      <div>
        <h1>Friends:</h1>
        <ul>
          {friends.map(function (user) {
            return <li key={user.name}>{user.name}</li>
          })}
        </ul>
        <h1>Non Friends:</h1>
        <ul>
          {nonFriends.map(function (user) {
            return <li key={user.name}>{user.name}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Users;*/
