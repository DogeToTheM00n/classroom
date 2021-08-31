import React, { Component } from "react";
import Menu from "./components/Menu.js";
import Auth from "./containers/Auth/Auth.js";
import "./App.css";
import Footer from "./components/Footer/Footer.js";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "./components/Sidebar.js";
import Subject from "./containers/Subject/Subject.js";
import Dashboard from "./containers/Dashboard.js";
import Marks from "./containers/Marks/Marks.js";
import Assignment from "./components/AssignmentDetail/AssignmenDetail.js";
import File from "./components/File/File.js";

class App extends Component {
  state = {
    auth: false,
  };
  UNSAFE_componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.setState({ auth: true });
      this.props.setAuthTrue(user);
    }
  }
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route path="/score" component={Marks} />
          <Route path="/subject" component={Subject} />
          <Route path="/assignment" component={Assignment} />
          <Route path="/home" component={Dashboard} />
          <Route path="*" component={Auth} />
        </Switch>
        {this.props.auth && <Sidebar />}
        <Footer />
        <File
          viewLink="https://drive.google.com/file/d/1KsT3Bv8cz7t31PXehlt5NjsSO6gEgNIG/view?usp=drivesdk"
          thumbnailLink="https://lh3.googleusercontent.com/HGg9efHaLUv3A34wTfrfwHfqtwHp7Fce_mtiYRUlr3XO75Zzupr9k79Ed8LWezQlmw-oMzrSvCIBpbI"
          name="Q4(6 link derivation).pdf"
          mimeType="application/pdf"

        />
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
