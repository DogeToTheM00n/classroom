import React, { Component } from "react";
import "./App.css";
import Signup from "./containers/Auth/Auth.js";
import Footer from "./components/Footer/Footer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Signup />
        <Footer />
      </div>
    );
  }
}

export default App;
