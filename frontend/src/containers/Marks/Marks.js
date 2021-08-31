import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import classes from "./Marks.module.css";
import Assignment from "./Assignment/Assignment.js";
import Accordion from "react-bootstrap/Accordion";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "../../axiosClass.js";

class Marks extends Component {
  state = {
    title: "",
    postdate: "",
    points: 0,
    duedate: "",
    assignments: [],
  };
  componentDidMount() {
    // axios call
    const searchParams = new URLSearchParams(this.props.location.search);
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    axios
      .get("/api/markAssignments", {
        params: {
          sub_id: params["sub"],
          asg_id: params["asg"],
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          title: res.data.asg_details.asg.title,
          postdate: res.data.asg_details.asg.date,
          points: res.data.asg_details.asg.points,
          duedate: res.data.asg_details.asg.deadline,
        });
        const assignments = [];
        res.data.marks_array.forEach((item) => {
          assignments.push({
            id: item.marks._id,
            assign_id: item.marks.assignmentId,
            username: item.username,
            marks: item.marks.marks,
            urls: item.marks.files,
            flag: item.marks.flag,
          });
        });
        this.setState({ assignments: assignments });
      });
  }
  render() {
    const newPostDate = new Date(this.state.postdate);
    const newDueDate = new Date(this.state.duedate);
    return (
      <>
        {(!this.props.auth || this.props.user.role) && <Redirect to="/" />}
        {this.props.auth && !this.props.user.role && (
          <>
            <div className={classes.Parent}>
              <Card
                style={{
                  width: "40vw",
                  margin: "3vw",
                  border: "1px solid #06442027",
                  boxShadow: "1px 4px 8px 1px rgba(0,0,0,0.2)",
                  borderRadius: "1%",
                }}
              >
                <Card.Body style={{ color: "#064420" }}>
                  <Card.Title style={{ fontSize: "2vw" }}>
                    {this.state.title}
                  </Card.Title>
                  <div
                    style={{
                      height: "0.5vh",
                      backgroundColor: "#E4EFE7",
                      margin: "0.5vh 0",
                    }}
                  ></div>
                  <Card.Text style={{ fontSize: "1.2vw", marginTop: "2.5vh" }}>
                    <div>
                      <div>{newPostDate.toLocaleString()}</div>
                      <div>
                        <span>{this.state.points} points</span>{" "}
                        <span style={{ float: "right" }}>
                          Due Date: {newDueDate.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Accordion>
                {this.state.assignments.map((assignment) => {
                  return (
                    <Assignment
                      assign_id={assignment.assign_id}
                      key={assignment.id}
                      id={assignment.id}
                      username={assignment.username}
                      marks={assignment.marks}
                      points={this.state.points}
                      flag={assignment.flag}
                      urls={assignment.urls}
                      deadline={this.state.duedate}
                    />
                  );
                })}
              </Accordion>
            </div>{" "}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Marks);
