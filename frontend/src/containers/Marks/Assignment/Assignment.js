import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import classes from "./Assignment.module.css";
import File from "../../../components/File/File.js";
import axios from "../../../axiosClass.js";

class Assignment extends Component {
  state = {
    marks: this.props.marks,
  };
  changeMarks = (event) => {
    this.setState({ marks: event.target.value });
  };
  updateMarks = (event) => {
    axios
      .put("/api/marks", null, {
        params: {
          username: this.props.username,
          asg_id: this.props.assign_id,
          marks: event.target.value,
        },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ marks: event.target.value });
      });
  };
  render() {
    const date = new Date();
    const deadline = new Date(this.props.deadline);
    // .toLocaleTimeString
    return (
      <Accordion.Item eventKey={this.props.id}>
        <Accordion.Header>
          <div className={classes.Header} style={{ padding: "0 2vw" }}>
            <p>{this.props.username}</p>
            <p>
              <input
                className={classes.Input}
                onBlur={this.updateMarks}
                onChange={this.changeMarks}
                value={this.state.marks < 0 ? "" : this.state.marks}
              />
              /{this.props.points}
            </p>
            {this.props.flag === 1 && date > deadline && (
              <p className={classes.Red}>Missing</p>
            )}
            {this.props.flag === 1 && date < deadline && (
              <p className={classes.Grey}>Yet to Submit</p>
            )}
            {this.props.flag === 2 && <p className={classes.Red}>Done late</p>}
            {this.props.flag === 3 && (
              <p className={classes.Green}>Submitted</p>
            )}
          </div>
        </Accordion.Header>
        <Accordion.Body style={{ width: "30vw" }}>
          {this.props.urls.map((file) => (
            <File
              key={file.id}
              viewLink={file.viewLink}
              thumbnailLink={file.thumbnailLink}
              name={file.name}
              mimeType={file.mimeType}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    );
  }
}

export default Assignment;
