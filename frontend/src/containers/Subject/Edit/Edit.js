import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../../axiosClass.js";

class Edit extends Component {
  state = {
    title: "",
    description: "",
  };
  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  submit = (event) => {
    event.preventDefault();
    axios
      .put("/api/subject", null, {
        params: {
          _id: this.props.id,
          name: this.state.title,
          description: this.state.description,
        },
      })
      .then((response) => {
        if (response.data) {
          window.location.reload();
        }
      });
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#FDFAF6", color: "#064420" }}
        >
          <Modal.Title>Update Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Classroom Name"
                value={this.state.title}
                onChange={this.changeHandler}
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Classroom Description"
                value={this.state.description}
                onChange={this.changeHandler}
                name="description"
              />
            </Form.Group>
            <div class="form-actions">
              <Button variant="primary" type="submit" onClick={this.submit}>
                <i class="fas fa-check"></i> Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Edit;
