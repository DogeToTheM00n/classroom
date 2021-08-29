import React, { Component } from "react";
import "./App.css";
import Signup from "./containers/Auth/Auth.js";
import Post from "./containers/Subject/Post/Post.js";
import Footer from "./components/Footer/Footer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Post
          username="Ravi Chopra"
          date="20/12/1204"
          urls={["uijuifjiof.jpg", "juiajauijau.pdf"]}
          body="nyuhjsuiojsio"
        />
        {/* <Signup /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
