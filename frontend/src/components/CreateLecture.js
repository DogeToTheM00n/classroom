import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react"
import Button from "react-bootstrap/Button";
import axios from "../axiosClass"
import {useHistory} from "react-router"
const CreateLecture = (props) => {
  const [state, setState] = useState({ startTime: "", endTime: "", day: "", error: "" })
  const history = useHistory()
  const handleClose = () => {
    props.callback();
  }
  const changeHandler = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const submit = (evt) => {
    evt.preventDefault();
    console.log(state)
    const req = async () => {
      const response = await axios.post('api/lecture', {
        day: state.day,
        startTime: state.startTime,
        endTime: state.endTime,
        sub_id: 'tcT1L4'

      })
      console.log(response)
      if(response.data){
        document.querySelector(".btn-close").click();
        history.push('/calendar')
      }
      else{
        setState({...state, error: "*Something went wrong!!"})
      }
    }
    req()

  }
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
          <Modal.Title>Create Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Day</Form.Label>
              <Form.Select value={state.day} aria-label="Default select example" name="day" onChange={changeHandler}>
                <option>Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select Start Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Start Time"
                value={state.startTime}
                onChange={changeHandler}
                name="startTime"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Select End Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter End Time"
                value={state.endTime}
                onChange={changeHandler}
                name="endTime"
              />
            </Form.Group>
            {state.error?<p style={{color: "red"}}>{state.error}</p>:null}
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

export default CreateLecture;
