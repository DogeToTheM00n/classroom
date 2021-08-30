import React, { Component } from "react";
import classes from "./Subject.module.css";
import Post from "./Post/Post.js";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../axiosClass.js";

class Subject extends Component {
  state = {
    id: "",
    name: "",
    teacher: "",
    description: "",
    content: [],
    link: "",
    assignments: [],
    tests: [],
    filter: 1,
  };
  componentDidMount() {
    // API call to /subject GET
    const searchParams = new URLSearchParams(this.props.location.search);
    let id;
    for (const [, value] of searchParams) {
      console.log(value);
      id = value;
      this.setState({ id: value });
    }
    axios
      .get("/api/subject", {
        params: { _id: id },
      })
      .then((res) => {
        this.setState({
          id: res.data._id,
          name: res.data.name,
          teacher: res.data.teachersName,
          description: res.data.description,
          content: res.data.contentSchemaArray,
          link: res.data.videoLectureLink,
        });
        let assignments = [];
        let tests = [];
        for (let item of res.data.assignmentsSchemaArray) {
          if (item.type) {
            tests.push(item);
          } else {
            assignments.push(item);
          }
        }
        this.setState({ tests: tests, assignments: assignments });
      });
  }
  render() {
    return (
      <>
        {!this.props.auth && <Redirect to="/" />}
        <div>
          <div className={classes.Parent}>
            <div className={classes.Main}>
              <div className={classes.Header}>
                <h2>{this.state.name}</h2>
                <div className={classes.Icons}>
                  <i class="far fa-calendar-plus"></i>
                  <Link to={this.state.link}>
                    <i class="fas fa-video"></i>
                  </Link>
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Subject);
