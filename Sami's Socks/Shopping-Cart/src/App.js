import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Auth from "./components/Auth";
import Admin from "./components/Admin";
import Blog from "./components/Blog";
import Quotes from "./components/Quotes";
import Checkout from "./components/Checkout";
import ReadMe from "./components/ReadMe";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <AdminRoute exact path="/admin" component={Admin} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/blog" component={Blog} />
            <PrivateRoute path="/quotes" component={Quotes} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/readme" component={ReadMe} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.isAdmin() ? (
        <Component {...props} />
      ) : (
        <div>
          <p>
            Oops, it seems like you don't have permissions to access this page!
          </p>
        </div>
      )
    }
  />
);

export default App;
