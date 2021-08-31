import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import classes from "./PostTeacher.module.css";
import Form from "react-bootstrap/Form";
import axios from "../../axiosClass.js";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";

class PostTeacher extends Component {
  state = {
    active: 1, // 1 - Announcement, 2 - Assignment
    body: "",
    files: "",
    title: "",
    point: 50,
    deadline: "",
    flag: false,
    time: "",
  };
  handleFiles = (event) => {
    this.setState({ files: event.target.files });
    console.log(event.target.files);
  };
  changeHandler = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };
  change1 = () => {
    this.setState({ active: 1 });
  };
  change2 = () => {
    this.setState({ active: 2 });
  };
  submit = (event) => {
    event.preventDefault();
    if (this.state.active === 1) {
      let formData = new FormData();
      for (const value in this.state) {
        if (value === "body" || value === "files") {
          if (value === "files") {
            // Files
            Array.from(this.state.files).forEach((file) => {
              formData.append(file.name, file);
            });
          } else {
            formData.append(value, this.state[value]);
          }
        }
      }
      formData.append("username", this.props.user.username);
      formData.append("sub_id", this.props.subID);
      axios
        .post("/api/content", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          window.location.reload();
        });
    } else {
      this.setState(
        {
          deadline: new Date(`${this.state.deadline}T${this.state.time}-05:30`),
        },
        () => {
          let formData = new FormData();
          for (const value in this.state) {
            if (!(value === "active")) {
              if (value === "files") {
                // Files
                Array.from(this.state.files).forEach((file) => {
                  formData.append(file.name, file);
                });
              } else {
                formData.append(value, this.state[value]);
              }
            }
          }
          formData.append("subjectId", this.props.subID);
          for (var pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
          }
          axios
            .post("/api/assignments", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
              window.location.reload();
            });
        }
      );
    }
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title className={classes.Header}>
            <p
              onClick={this.change1}
              className={this.state.active === 1 && classes.Active}
            >
              Announcement
            </p>
            {this.props.user.role === false && (
              <>
                <p style={{ color: "#064420", fontWeight: "bold" }}>|</p>
                <p
                  onClick={this.change2}
                  className={this.state.active === 2 && classes.Active}
                >
                  Assignment
                </p>
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        {this.state.active === 1 ? (
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Body"
                  value={this.state.body}
                  onChange={this.changeHandler}
                  name="body"
                  style={{ height: "25vh" }}
                />
              </Form.Group>
              <Form style={{ marginTop: "1vh" }}>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={this.handleFiles}
                    style={{ fontSize: "1.8vh" }}
                    multiple
                  />
                </Form.Group>
                <div
                  className="form-actions"
                  style={{
                    marginBottom: "0.5vh",
                    display: "flex",
                    width: "30%",
                    justifyContent: "space-around",
                    margin: "auto",
                  }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={this.submit}
                    className={classes.Btn}
                  >
                    <i class="fas fa-check"></i> Submit
                  </Button>
                </div>
              </Form>
            </Form>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={this.state.title}
                  onChange={this.changeHandler}
                  name="title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Body"
                  value={this.state.body}
                  onChange={this.changeHandler}
                  name="body"
                  style={{ height: "25vh" }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Max points: {this.state.point}</Form.Label>
                <Form.Range
                  value={this.state.point}
                  onChange={this.changeHandler}
                  name="point"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Deadline"
                  value={this.state.deadline}
                  onChange={this.changeHandler}
                  name="deadline"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Deadline Time</Form.Label>
                <Form.Control
                  type="time"
                  value={this.state.time}
                  onChange={this.changeHandler}
                  name="time"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Test/Assignment</Form.Label>
                <Form.Select
                  name="flag"
                  onChange={this.changeHandler}
                  value={this.state.flag}
                >
                  <option value={false}>Assignment</option>
                  <option value={true}>Test</option>
                </Form.Select>
              </Form.Group>
              <Form style={{ marginTop: "1vh" }}>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={this.handleFiles}
                    style={{ fontSize: "1.8vh" }}
                    multiple
                  />
                </Form.Group>
                <div
                  className="form-actions"
                  style={{
                    marginBottom: "0.5vh",
                    display: "flex",
                    width: "30%",
                    justifyContent: "space-around",
                    margin: "auto",
                  }}
                >
                  <Button
                    type="submit"
                    onClick={this.submit}
                    className={classes.Btn}
                  >
                    <i class="fas fa-check"></i> Submit
                  </Button>
                </div>
              </Form>
            </Form>
          </Modal.Body>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(PostTeacher);
