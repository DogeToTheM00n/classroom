import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
const CreateLecture = () => {
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
              <Form.Label>Select Day</Form.Label>
              <Form.Control
                type="select"
                placeholder="Enter Classroom Name"
                value={state.classroomName}
                onChange={changeHandler}
                name="classroomName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Classroom Name</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Classroom Name"
                value={state.classroomName}
                onChange={changeHandler}
                name="classroomName"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="time"
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

export default CreateLecture;
