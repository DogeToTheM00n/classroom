import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "../axiosClass.js";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
const JoinModalForm = (props) => {
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("")
  const handleClose = () => props.callback();
  const changeHandler = (e) => {
    setClassCode(e.target.value);
  };
  const user = useSelector((state) => {
    return state.user;
  });
  const submit = () => {
    const req = async () => {
      const response = await axios.post("/api/joinClass", {
        _id: classCode,
        username: user.username,
      });
      if (response.data === "-1") {
        setError("*You are already enrolled!");
      }
      if (response.data === "-2") {
        setError("*Invalid Class Code");
      }
      document.querySelector(".btn-close").click();
    };
    req();
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
          <Modal.Title>Join Classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Class Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Class Code"
                value={classCode}
                onChange={changeHandler}
              />
            </Form.Group>
            {error?<p>{error}</p>:null}
            <div className="form-actions">
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

export default JoinModalForm;
