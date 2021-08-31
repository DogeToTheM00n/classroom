import Card from "react-bootstrap/Card";
import YourWork from "../YourWork/YourWork";
import TeacherEditOptions from "../TeacherEditOptions/TeacherEditOptions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axiosClass";
import classes from "./AssignmentDetail.module.css";
import { Redirect } from "react-router-dom";

const AssignmentDetail = (props) => {
  const [state, setState] = useState({
    title: '',
    date: '',
    deadline: '',
    description: '',
    marks: '',
    maxmarks: '',
    files: [],
  });
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const searchParams = new URLSearchParams(props.location.search);
  const params = {};
  for (const [key, value] of searchParams) {
    params[key] = value;
  }
  console.log(params);
  useEffect(() => {
    const req = async () => {
      console.log("Hi");
      const response = await axios.get("/api/assignments", {
        params: {
          asg_id: params["id"],
          sub_id: params["sub"],
          username: user.username,
          role: user.role,
        },
      });
      setState({
        title: response.data.Asg_array.asg.title,
        date: new Date(response.data.Asg_array.asg.date),
        deadline: new Date(response.data.Asg_array.asg.deadline),
        description: response.data.Asg_array.asg.body,
        marks: response.data.User_makrs.marks,
        maxmarks: response.data.Asg_array.asg.points,
        files: response.data.Asg_array.asg.files,
      });
    };
    req();
  }, []);
  return (
    <>
      {!auth && <Redirect to="/" />}
      {auth && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: "3% 0",
            }}
          >
            <div>
              <Card
                style={{
                  width: "40vw",
                  margin: "15px",
                  border: "1px solid #06442027",
                  boxShadow: "1px 4px 8px 1px rgba(0,0,0,0.2)",
                  borderRadius: "1%",
                }}
              >
                <Card.Body style={{ color: "#064420" }}>
                  <Card.Title>{state.title}</Card.Title>
                  <div
                    style={{
                      height: "0.5vh",
                      backgroundColor: "#E4EFE7",
                      margin: "0.5vh 0",
                    }}
                  ></div>
                  <Card.Text style={{ fontSize: "0.9vw" }}>
                    <div>
                      <div>Posted on: {state.date.toLocaleString()}</div>
                      <div>
                        <span>
                          {state.marks<0?"__":useState} / {state.maxmarks}
                        </span>{" "}
                        <span style={{ float: "right" }}>Due: {state.deadline.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card
                style={{
                  width: "40vw",
                  margin: "15px",
                  border: "1px solid #06442027",
                  boxShadow: "1px 4px 8px 1px rgba(0,0,0,0.2)",
                  borderRadius: "1%",
                }}
              >
                <Card.Body style={{ color: "#064420" }}>
                  <Card.Text style={{ fontSize: "0.9vw" }}>
                    <div>{state.description}</div>
                  </Card.Text>
                  <div>
                    {state.files.map((file) => {
                      return file.name.substr(file.name.length - 3) ===
                        "pdf" ? (
                        <div className={classes.Icon} key={file.name}>
                          <i className="far fa-file-pdf"></i>
                        </div>
                      ) : (
                        <div className={classes.Icon} key={file.name}>
                          <i className="far fa-images"></i>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div>
              {user.role ? (
                <YourWork />
              ) : (
                <TeacherEditOptions
                  subjectId={props.subjectId}
                  assignmentId={props.assignmentId}
                />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AssignmentDetail;
