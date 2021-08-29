import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const CreateClassModal = (props) => {

    const [state, setState] = useState({
        classroomName: "",
        description: ""
    })
    const handleClose = () => props.callback();
    const changeHandler = (evt) => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton style={{backgroundColor: "#FDFAF6" , color: "#064420"}}>
                    <Modal.Title>Join Classroom</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Classroom Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Classroom Name" value={state.className} onChange={changeHandler} name="classroomName"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="textarea" placeholder="Enter Classroom Description" value={state.description} onChange={changeHandler} name="description"/>
                        </Form.Group>
                        <div class="form-actions">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateClassModal