import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "../axiosClass.js";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
const JoinModalForm = (props) => {
    const [classCode, setClassCode] = useState("");
    const [error, setError] = useState("")
    const handleClose = () => props.callback();
    const history = useHistory()
    const changeHandler = (e) => {
        setClassCode(e.target.value);
    };
    const user = useSelector((state) => {
        return state.user;
    });
    const submit = (event) => {
        event.preventDefault()
        if (!classCode) {
            setError("*Enter Class Code")
        }
        const req = async () => {
            const config = {
                _id: classCode,
                username: user.username,
            }
            console.log(config)
            const response = await axios.post("/api/joinClass", config);
            console.log(response.data)
            if (response.data === "-1") {
                setError("*You are already enrolled!");
            } else if (response.data === "-2") {
                setError("*Invalid Class Code");
            } else{
                history.push(`/subject?id=${response.data._id}`);
                document.querySelector(".btn-close").click();
                
            }
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
                        {error ? <p style={{ color: 'red' }}>{error}</p> : null}
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
