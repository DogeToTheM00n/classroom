import React, { Component } from "react";
import classes from "./Subject.module.css";
import Post from "./Post/Post.js";

class Subject extends Component {
  state = {
    id: "axbyz", //""
    name: "Computer Networks", //""
    teacher: "Ravi Chopra", //""
    description:
      "Lorem Ipsum is simply dummy text of the printing and types unc", //""
    content: [
      {
        username: "Ravi Chopra",
        date: "12/21/2021",
        body: "Lorem Ipsum is simply dummy text of the printing",
        urls: ["nbjss.pdf", "bjsb.jpg"],
        type: "assignment",
      },
      {
        username: "Ravi Chopra",
        date: "12/21/2021",
        body: "Lorem Ipsum is simply dummy text of the printing",
        urls: ["nbjss.pdf", "bjsb.jpg"],
        type: "assignment",
      },
      {
        username: "Ravi Chopra",
        date: "12/21/2021",
        body: "Lorem Ipsum is simply dummy text of the printing",
        urls: ["nbjss.pdf", "bjsb.jpg"],
        type: "assignment",
      }, // []
    ],
    link: "link", //""
    assignments: [],
    tests: [],
    filter: 1,
  };
  componentDidMount() {
    // API call to /subject GET
  }
  render() {
    console.log(this.state.filter === 0);
    return (
      <div>
        <div className={classes.Parent}>
          <div className={classes.Main}>
            <div className={classes.Header}>
              <h2>{this.state.name}</h2>
              <div className={classes.Icons}>
                <i class="far fa-calendar-plus"></i>
                <i class="fas fa-video"></i>
              </div>
            </div>
            <p className={classes.Code}>Code: {this.state.id}</p>
            <p className={classes.Description}>{this.state.description}</p>
          </div>
          <div className={classes.Posts}>
            {this.state.content.map((post) => {
              return (
                <Post
                  username={post.username}
                  date={post.date}
                  body={post.body}
                  urls={post.urls}
                  type={post.type}
                  key={post.body}
                />
              );
            })}
          </div>
        </div>
        <div className={classes.Right}>
          <button className={classes.PostButton}>
            <i class="fas fa-upload"></i> Post
          </button>
          <div className={classes.ButtonsGroup}>
            <button
              style={
                this.state.filter === 0
                  ? { backgroundColor: "#064420", color: "white" }
                  : null
              }
            >
              Content
            </button>
            <button
              style={
                this.state.filter === 1
                  ? { backgroundColor: "#064420", color: "white" }
                  : null
              }
            >
              Assignments
            </button>
            <button
              style={
                this.state.filter === 2
                  ? { backgroundColor: "#064420", color: "white" }
                  : null
              }
            >
              Tests
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Subject;
