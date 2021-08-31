import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "../../axiosClass";
import File from "../File/File";
import styles from "./YourWork.module.css";
import { useSelector } from "react-redux";
const YourWork = (props) => {
  const [selectedFiles, setselectedFiles] = useState(null);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const handleUpload = (event) => {
    event.preventDefault();
    console.log(selectedFiles);
    let formData = new FormData();
    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        formData.append(file.name, file);
      });

      formData.append("asg_id", props.assignmentId);
      formData.append("username", user.username);
      for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const req = async () => {
        const response = await axios.post("api/uploadAssignment", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data) {
          window.location.reload();
        } else {
          setError("*Something went wrong!!");
        }
      };
      if (auth) req();
    }
  };

  const submitHandler = () => {
    //change state of assignment for the student in database
    const req = async () => {
      const response = await axios.post("api/submitAssignment", {
        deadline: props.deadline,
        asg_id: props.assignmentId,
        username: user.username,
      });
      if (response.data) window.location.reload();
    };
    if (auth && props.submittedState == 1) req();
  };
  return (
    <Card
      style={{
        width: "18vw",
        margin: "15px",
        border: "1px solid #06442027",
        boxShadow: "1px 4px 8px 1px rgba(0,0,0,0.2)",
        borderRadius: "1%",
      }}
    >
      <Card.Body style={{ color: "#064420" }}>
        <Card.Title>Your Work</Card.Title>
        <Card.Text style={{ fontSize: "0.9vw" }}>
          {props.files.map((file) => (
            <File
              key={file.id}
              viewLink={file.viewLink}
              thumbnailLink={file.thumbnailLink}
              name={file.name}
              mimeType={file.mimeType}
            />
          ))}
          <Form style={{ marginTop: "1vh" }}>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Control
                type="file"
                onChange={(event) => {
                  setselectedFiles(event.target.files);
                }}
                style={{ fontSize: "1.8vh" }}
                multiple
              />
            </Form.Group>
            <div className="form-actions" style={{ marginBottom: "0.5vh" }}>
              <Button
                type="submit"
                className={styles.btn}
                onClick={handleUpload}
              >
                Upload
              </Button>
            </div>
          </Form>

          <div className="form-actions">
            <Button
              type="submit"
              className={styles.btn}
              onClick={submitHandler}
              className={
                props.submittedState == 3
                  ? styles.btnDisabled
                  : styles.btnActive
              }
            >
              {(props.submittedState == 3 || props.submittedState == 2) ? (
                <span>Submitted</span>
              ) : (
                <span>Hand In</span>
              )}
            </Button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default YourWork;
