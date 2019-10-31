import React, { Component } from "react";
import { Button, Col, Form } from "react-bootstrap";
import "./Form.css";
import Logger from "./Logger"
import Auth from "./Auth"

export default class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedOut: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    var currentUser = Auth.getCurrentUser();
    this.setState({
      checkedOut: true
    })
    Logger.log(currentUser + ": has successfully ordered his items");
  }

  render() {
    if (this.state.checkedOut) {
      return (
        <h3 style={{color: "green"}}>Your order is on the way!</h3>
      )
    }
    return (
      <div className="box" style={{justifyContent:"center"}}>
      <Form onSubmit={this.handleSubmit}>

        <Form.Group controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select">
              <option>Choose...</option>
              <option>...</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    );
  }
}
