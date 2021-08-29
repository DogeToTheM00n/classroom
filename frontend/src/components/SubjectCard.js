import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
const SubjectCard = (props) => {
  const images = [
    "https://gstatic.com/classroom/themes/img_read.jpg",
    "https://gstatic.com/classroom/themes/img_reachout.jpg",
    "https://gstatic.com/classroom/themes/img_learnlanguage.jpg",
    "https://gstatic.com/classroom/themes/img_bookclub.jpg",
    "https://gstatic.com/classroom/themes/Psychology.jpg",
    "https://gstatic.com/classroom/themes/img_breakfast.jpg",
    "https://gstatic.com/classroom/themes/Chemistry.jpg",
  ];
  return (
    <Link
      to={`/subject?id=${props.subjectID}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        style={{
          width: "18rem",
          margin: "15px",
          border: "1px solid #06442027",
          boxShadow: "1px 4px 8px 1px rgba(0,0,0,0.2)",
          borderRadius: "1%",
        }}
      >
        <Card.Img
          variant="top"
          src={images[Math.floor(Math.random() * 7)]}
          className="cardImage"
        />
        <Dropdown className="threeDot">
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            size="lg"
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Unenroll</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Card.Body style={{ color: "#064420" }}>
          <Card.Title>{props.subjectName}</Card.Title>
          <Card.Text>{props.teacherName}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default SubjectCard;
