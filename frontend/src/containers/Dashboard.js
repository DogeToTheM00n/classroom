import SubjectCard from "../components/SubjectCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../axiosClass";
import { Redirect } from "react-router";
const Dashboard = () => {
  const [Subjects, setSubjects] = useState([]);
  const user = useSelector((state) => {
    return (state.user);
  });
  const auth = useSelector((state) => {
    return state.auth;
  });
  useEffect(() => {
    //axios call for setting state{
    const req = async () => {
      const response = await axios.get("/api/dashboard", {
        params: {
          username: user.username,
          role: user.role,
        },
      });
      setSubjects(response.data.SubjectsArray);
    };
    if (auth) {
      req();
    }
  }, []);
  return (
    <>
      {!auth ? (
        <Redirect to="/" />
      ) : (
        <div
          className="topContainer"
          style={{ width: "90%", margin: "auto", marginTop: "3%" }}
        >
          {Subjects.map((item) => (
            <SubjectCard
              subjectID={item.subjectID}
              subjectName={item.name}
              teacherName={item.teachersName}
              key={item.subjectID}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Dashboard;
