import React, { Component } from "react";
import Menu from "./components/Menu.js";
import Auth from "./containers/Auth/Auth.js";
import "./App.css";
import Footer from "./components/Footer/Footer.js";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar.js";
import Subject from "./containers/Subject/Subject.js";
import Dashboard from "./containers/Dashboard.js";

class App extends Component {
  state = {
    auth: false,
  };
  UNSAFE_componentWillMount() {
    const user = localStorage.getItem("user");
    if (user) {
      this.setState({ auth: true });
      this.props.setAuthTrue(user);
    }
  }
  render() {
    return (
      <div>
        <Menu />
        {!this.props.auth && <Redirect to="/" />}
        <Switch>
          <Route path="/subject" component={Subject} />
          <Route path="/" component={this.props.auth ? Dashboard : Auth} />
        </Switch>
        {this.props.auth && <Sidebar />}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthTrue: (user) => dispatch({ type: "True_Auth", user: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
