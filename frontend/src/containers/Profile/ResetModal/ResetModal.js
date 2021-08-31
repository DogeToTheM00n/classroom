import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class ResetModal extends Component {
  state = {
    currentPassword: "",
    newPassword: "",
    error: false
  };
  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = (event) => {
      event.preventDefault();
      // Axios call
  }
  render() {
    return (
      <>
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
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Current Password"
                  value={this.state.currentPassword}
                  name="currentPassword"
                  onChange={this.changeHandler}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="New Password"
                  value={this.state.newPassword}
                  name="newPassword"
                  onChange={this.changeHandler}
                />
              </Form.Group>
              {this.state.error ? <p style={{ color: "red" }}>{this.state.error}</p> : null}
              <div className="form-actions">
                <Button variant="primary" type="submit" onClick={this.submit}>
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ResetModal;
