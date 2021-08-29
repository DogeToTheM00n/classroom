import { useState } from "react"
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const JoinModalForm = (props) => {
    const [classCode, setClassCode] = useState("")
    const handleClose = () => props.callback();
    const changeHandler = (e) => {
        setClassCode(e.target.value)
        console.log(classCode)
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
                            <Form.Label>Class Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter Class Code" value={classCode} onChange={changeHandler} />
                        </Form.Group>
                        <div className="form-actions">
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

export default JoinModalForm