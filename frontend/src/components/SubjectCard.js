import Card from "react-bootstrap/Card";
import cardImg from "../assets/img_reachout.jpg"
import Dropdown from "react-bootstrap/Dropdown";
const SubjectCard = (props) => {
    return (
        <Card style={{ width: '18rem', margin: '15px', border: '1px solid #06442027',
        boxShadow: '1px 4px 8px 1px rgba(0,0,0,0.2)',
        borderRadius: '1%' }}>
            <Card.Img variant="top" src={cardImg} className="cardImage" />
            <Dropdown className="threeDot">
                <Dropdown.Toggle variant="success" id="dropdown-basic" size="lg">
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Unenroll</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Card.Body style={{ color: "#064420" }}>
                <Card.Title>{props.subjectName}</Card.Title>
                <Card.Text>
                    {props.teacherName}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}


export default SubjectCard;