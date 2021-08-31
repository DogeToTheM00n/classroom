import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import SingleFile from "../SingleFile/SingleFile";
import styles from "./YourWork.module.css";
const YourWork = () => {
  const [selectedFiles, setselectedFiles] = useState(null);

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  const handleUpload = (event) => {
    event.preventDefault();
    let formData = new FormData();
    if (selectedFiles) {
      [...selectedFiles].forEach((element) => {
        formData.append("file", element);
      });
      //   axios.post('/uploadFile', formdata, () => {

      //   })
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
    }
  };

  const submitHandler = () => {
    //change state of assignment for the student in database
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
          <SingleFile filename="File.pdf" />
          <SingleFile filename="File.pdf" />
          <Form style={{ marginTop: "1vh" }}>
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
            >
              Hand in
            </Button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default YourWork;
