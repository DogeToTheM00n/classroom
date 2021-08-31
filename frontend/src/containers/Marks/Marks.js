import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import classes from "./Marks.module.css";
import Assignment from "./Assignment/Assignment.js";
import Accordion from "react-bootstrap/Accordion";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Marks extends Component {
  state = {
    title: "Assignment 1",
    postdate: "2021-08-29 14:12:08.000Z",
    points: 100,
    duedate: "2021-08-31 14:12:08.000Z",
    assignments: [
      {
        id: 1,
        username: "Ravi Chopra",
        marks: -1,
        urls: "",
        flag: 1, //1 - not submitted, 2 - Done late, 3- submitted before deadline
      },
      {
        id: 2,
        username: "Ravi Chopra",
        marks: 10,
        urls: "",
        flag: 2, //1 - not submitted, 2 - Done late, 3- submitted before deadline
      },
      {
        id: 3,
        username: "Ravi Chopra",
        marks: 10,
        urls: "",
        flag: 3, //1 - not submitted, 2 - Done late, 3- submitted before deadline
      },
    ],
  };
  componentDidMount() {}
  render() {
    const newPostDate = new Date(this.state.postdate);
    const newDueDate = new Date(this.state.duedate);
    return (
      <>
        {!this.props.auth && <Redirect to="/" />}
        {this.props.auth && (
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
  };
};

export default connect(mapStateToProps)(Marks);
