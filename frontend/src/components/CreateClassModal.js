import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../axiosClass.js";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
const CreateClassModal = (props) => {
  const [state, setState] = useState({
    classroomName: "",
    description: "",
  });
  const user = useSelector((state) => {
    return state.user;
  });
  const handleClose = () => props.callback();
  const changeHandler = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };
  let history = useHistory();
  const submit = (event) => {
    event.preventDefault();
    axios
      .post("/api/subject", {
        name: state.classroomName,
        teachersName: user.username,
        teachersUsername: user.username,
        description: state.description,
      })
      .then((res) => {
        if (res.data._id) {
          document.querySelector(".btn-close").click();
          history.push(`/subject?id=${res.data._id}`);
        }
      });
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#FDFAF6", color: "#064420" }}
        >
          <Modal.Title>Create Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Classroom Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Classroom Name"
                value={state.classroomName}
                onChange={changeHandler}
                name="classroomName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Enter Classroom Description"
                value={state.description}
                onChange={changeHandler}
                name="description"
              />
            </Form.Group>
            <div class="form-actions">
              <Button variant="primary" type="submit" onClick={submit}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateClassModal;
