import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "./actions/cartActions";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Form.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };
  }

  handleClick = id => {
    this.props.addToCart(id);
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    var query = this.state.searchQuery.toLowerCase();
    let filterredItems = this.props.items.filter( function (item) {
        return item.title.toLowerCase().includes(query);
    });
    let itemList = filterredItems.map(item => {
      return (
        <div className="card" key={item.id}>
          <div className="card-image">
            <img src={item.img} alt={item.title} height={300} />
            <br />
            <br />
            <br />
            <span className="card-title">{item.title}</span>
            <span
              to="/"
              className="btn-floating halfway-fab waves-effect waves-light red"
              onClick={() => {
                this.handleClick(item.id);
              }}
            >
              <i className="material-icons">add</i>
            </span>
          </div>

          <div className="card-content">
            <p>{item.desc}</p>
            <p>
              <b>Price: {item.price}$</b>
            </p>
          </div>
        </div>
      );
    });

    return (
      <div className="container">
        <h3 className="center">Welcome to Sami's Socks</h3>
        <div className="box center" style={{justifyContent: "center"}}>
          <form
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <FormGroup controlId="searchQuery">
              <FormLabel>Search</FormLabel>
              <FormControl
                type="text"
                value={this.state.searchQuery}
                onChange={this.handleChange}
              />
            </FormGroup>
          </form>
        </div>
        <div className="box">{itemList}</div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.items
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addToCart: id => {
      dispatch(addToCart(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
