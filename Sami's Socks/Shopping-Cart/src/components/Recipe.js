import React, { Component } from "react";
import { connect } from "react-redux";
import Checkout from "../components/Checkout";
//import { addShipping } from './actions/cartActions'
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToCart: false
    };
  }

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.substractShipping();
    }
  };

  onClick = e => {
    this.setState({
      redirectToCart: true
    });
  };

  validateForm() {
    return this.props.addedItems.length > 0;
  }

  render() {
    if (this.state.redirectToCart) {
      return <Checkout />;
    }
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input
                type="checkbox"
                ref="shipping"
                onChange={this.handleChecked}
              />
              <span>Shipping(+6$)</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total: {this.props.total} $</b>
          </li>
        </div>
        <div className="checkout">
          <button
            className="waves-effect waves-light btn"
            onClick={this.onClick}
            disabled={!this.validateForm()}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.addedItems,
    total: state.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShipping: () => {
      dispatch({ type: "ADD_SHIPPING" });
    },
    substractShipping: () => {
      dispatch({ type: "SUB_SHIPPING" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
