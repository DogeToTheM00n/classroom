import React, { Component } from "react";
import classes from "./Subject.module.css";
import Post from "./Post/Post.js";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "../../axiosClass.js";
import Modal from "../../components/PostTeacher/PostTeacher.js";
import Edit from "./Edit/Edit.js";
import CreateLecture from "../../components/CreateLecture";

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
    filter: 0,
    showTeacherModal: false,
    showEditModal: false,
    showCreateLectureModal: false
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
          if (item.asg.flag) {
            tests.push(item);
          } else {
            assignments.push(item);
          }
        }
        this.setState({ tests: tests, assignments: assignments });
      });
  }
  showTeacherModal = () => {
    this.setState({ showTeacherModal: true });
  };
  showEditModal = () => {
    this.setState({ showEditModal: true });
  };
  showCreateLectureModal = () => {
    this.setState({ showCreateLectureModal: true});
  }
  handleCloseEdit = () => {
    this.setState({ showEditModal: false });
  };
  handleCloseTeacher = () => {
    this.setState({ showTeacherModal: false });
  };
  handleCloseCreateLecture = () => {
    this.setState({ showCreateLectureModal: false});
  }
  filter = (value) => {
    this.setState({ filter: value });
  };
  render() {
    return (
      <>
        {!this.props.auth && <Redirect to="/" />}
        {this.props.auth && (
          <>
            <div>
              <div className={classes.Parent}>
                <div className={classes.Main}>
                  <div className={classes.Header}>
                    <h2>{this.state.name}</h2>
                    <div className={classes.Icons}>
                      <i class="far fa-edit" onClick={this.showEditModal}></i>
                      <i class="far fa-calendar-plus" onClick={this.showCreateLectureModal}></i>
                      <Link to={this.state.link}>
                        <i class="fas fa-video"></i>
                      </Link>
                    </div>
                  </div>
                  <p className={classes.Code}>Code: {this.state.id}</p>
                  <p className={classes.Description}>
                    {this.state.description}
                  </p>
                </div>
                <div className={classes.Posts}>
                  {this.state.filter === 0 &&
                    this.state.content
                      .slice(0)
                      .reverse()
                      .map((post) => {
                        return (
                          <Post
                            username={post.username}
                            date={post.date}
                            body={post.body}
                            urls={post.files}
                            type={post.type}
                            key={post.body}
                          />
                        );
                      })}
                  {this.state.filter === 1 &&
                    this.state.assignments
                      .slice(0)
                      .reverse()
                      .map((post) => {
                        console.log(post);
                        return (
                          <Post
                            username={this.state.teacher}
                            date={post.asg.date}
                            body={post.asg.body}
                            urls={post.asg.files}
                            type={post.asg.flag}
                            key={post._id}
                            id={post._id}
                            subId={this.state.id}
                            deadline={post.asg.deadline}
                            title={post.asg.title}
                          />
                        );
                      })}
                  {this.state.filter === 2 &&
                    this.state.tests
                      .slice(0)
                      .reverse()
                      .map((post) => {
                        return (
                          <Post
                            username={this.state.teacher}
                            date={post.asg.date}
                            body={post.asg.body}
                            urls={post.asg.files}
                            type={post.asg.flag}
                            key={post._id}
                            id={post._id}
                            subId={this.state.id}
                            deadline={post.asg.deadline}
                            title={post.asg.title}
                          />
                        );
                      })}
                </div>
              </div>
              <div className={classes.Right}>
                <button
                  className={classes.PostButton}
                  onClick={this.showTeacherModal}
                >
                  <i class="fas fa-upload"></i> Post
                </button>
                <div className={classes.ButtonsGroup}>
                  <button
                    style={
                      this.state.filter === 0
                        ? { backgroundColor: "#064420", color: "white" }
                        : null
                    }
                    onClick={() => this.filter(0)}
                  >
                    Content
                  </button>
                  <button
                    style={
                      this.state.filter === 1
                        ? { backgroundColor: "#064420", color: "white" }
                        : null
                    }
                    onClick={() => this.filter(1)}
                  >
                    Assignments
                  </button>
                  <button
                    style={
                      this.state.filter === 2
                        ? { backgroundColor: "#064420", color: "white" }
                        : null
                    }
                    onClick={() => this.filter(2)}
                  >
                    Tests
                  </button>
                </div>
              </div>
            </div>
            <Edit
              show={this.state.showEditModal}
              handleClose={this.handleCloseEdit}
              title={this.state.name}
              id={this.state.id}
              description={this.state.description}
            />
            <Modal
              show={this.state.showTeacherModal}
              handleClose={this.handleCloseTeacher}
              subID={this.state.id}
            />
            <CreateLecture
              show={this.state.showCreateLectureModal}
              callback={this.handleCloseCreateLecture}
              subID={this.state.id}
            />
          </>
        )}
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
